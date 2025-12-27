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
  categoryId: string; // 👈 STRING (NUNCA undefined)
  categoryName: string;
  type: "Entrada" | "Saída";
  amount: number;
  date: string; // yyyy-mm-dd
  hour: string; // HH:mm
}

interface CreateTransactionDTO {
  description: string;
  categoryId: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
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
   API
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
  const date = t.occurredAt ?? "";

  return {
    id: t.id,
    description: t.description ?? "",
    categoryId: t.category?.id ? String(t.category.id) : "",
    categoryName: t.category?.name ?? "",
    type: t.type === "INCOME" ? "Entrada" : "Saída",
    amount: Number(t.amount ?? 0),
    date,
    hour: "00:00" // 👈 UI apenas
  };
}

/* =======================
   PROVIDER
======================= */

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchTransactions() {
    setLoading(true);
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data.map(normalizeTransaction));
    } catch (err) {
      console.error("Erro ao buscar transações", err);
    } finally {
      setLoading(false);
    }
  }

  async function addTransaction(data: CreateTransactionDTO) {
    try {
      await api.post("/transactions", {
        description: data.description,
        amount: data.amount,
        type: data.type,
        categoryId: Number(data.categoryId), // 👈 BACKEND
        occurredAt: new Date().toISOString().split("T")[0] // 👈 LocalDate
      });

      await fetchTransactions();
    } catch (err) {
      console.error("Erro ao criar transação", err);
    }
  }

  async function updateTransaction(t: Transaction) {
    try {
      await api.put(`/transactions/${t.id}`, {
        description: t.description,
        amount: t.amount,
        type: t.type === "Entrada" ? "INCOME" : "EXPENSE",
        categoryId: Number(t.categoryId),
        occurredAt: t.date // 👈 SEM "T"
      });

      await fetchTransactions();
    } catch (err) {
      console.error("Erro ao atualizar transação", err);
    }
  }

  async function deleteTransaction(id: number) {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Erro ao deletar transação", err);
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
