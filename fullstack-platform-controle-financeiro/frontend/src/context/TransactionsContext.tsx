import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";
import axios from "axios";

/* =======================
   TYPES (UI)
======================= */

export interface Transaction {
  id: number;
  description: string;
  categoryId: number | null;
  categoryName?: string;
  type: "Entrada" | "Saída";
  amount: number;
  date: string; // yyyy-MM-dd
  hour: string; // HH:mm
}

interface CreateTransactionDTO {
  description: string;
  categoryId: number | null;
  type: "INCOME" | "EXPENSE";
  amount: number;
  date: string;
  hour: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
  addTransaction: (t: CreateTransactionDTO) => Promise<void>;
  updateTransaction: (t: Transaction) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

/* =======================
   CONTEXT
======================= */

const TransactionsContext = createContext<TransactionsContextType>(
  {} as TransactionsContextType
);

/* =======================
   API CONFIG
======================= */

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =======================
   NORMALIZER (API → UI)
======================= */

function normalizeTransaction(t: any): Transaction {
  const dateTime = t.occurredAt || t.createdAt || "";

  const [date = "", time = ""] = dateTime.split("T");

  return {
    id: t.id,
    description: t.description ?? "",
    categoryId: t.category?.id ?? null,
    categoryName: t.category?.name ?? "—",
    type: t.type === "INCOME" ? "Entrada" : "Saída",
    amount: Number(t.amount ?? 0),
    date,
    hour: time.substring(0, 5)
  };
}

/* =======================
   PROVIDER
======================= */

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  /* 🔹 FETCH */
  async function fetchTransactions() {
    setLoading(true);
    try {
      const response = await api.get<any[]>("/transactions");
      setTransactions(response.data.map(normalizeTransaction));
    } catch (error) {
      console.error("Erro ao buscar transações", error);
    } finally {
      setLoading(false);
    }
  }

  /* 🔹 CREATE */
  async function addTransaction(data: CreateTransactionDTO) {
    try {
      await api.post("/transactions", {
        description: data.description,
        amount: data.amount,
        type: data.type,
        categoryId: data.categoryId,
        occurredAt: data.date // ✅ LocalDate correto
      });

      await fetchTransactions();
    } catch (error) {
      console.error("Erro ao criar transação", error);
    }
  }

  /* 🔹 UPDATE */
  async function updateTransaction(transaction: Transaction) {
    try {
      await api.put(`/transactions/${transaction.id}`, {
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type === "Entrada" ? "INCOME" : "EXPENSE",
        categoryId: transaction.categoryId,
        occurredAt: transaction.date // ✅ nunca undefined
      });

      await fetchTransactions();
    } catch (error) {
      console.error("Erro ao atualizar transação", error);
    }
  }

  /* 🔹 DELETE */
  async function deleteTransaction(id: number) {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erro ao deletar transação", error);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        loading,
        fetchTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
