import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";
import axios from "axios";

/* =======================
   TYPES (UI FRIENDLY)
======================= */

export interface Transaction {
  id: number;
  description: string;
  category: string;
  type: "Entrada" | "Saída";
  amount: number;
  date: string; // yyyy-mm-dd
  hour: string; // HH:mm
}

interface TransactionsContextType {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
  addTransaction: (t: {
    description: string;
    category: string;
    type: "INCOME" | "EXPENSE";
    amount: number;
    occurredAt?: string;
  }) => Promise<void>;
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
   API CONFIG (JWT)
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
   NORMALIZER (🔥 CHAVE)
======================= */

function normalizeTransaction(t: any): Transaction {
  const dateTime = t.occurredAt || t.createdAt;

  return {
    id: t.id,
    description: t.description ?? "",
    category: t.category ?? "—",
    type: t.type === "INCOME" ? "Entrada" : "Saída",
    amount: Number(t.amount ?? 0),
    date: dateTime ? dateTime.split("T")[0] : "",
    hour: dateTime ? dateTime.split("T")[1]?.substring(0, 5) ?? "" : ""
  };
}

/* =======================
   PROVIDER
======================= */

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  /* 🔹 BUSCAR TODAS */
  async function fetchTransactions() {
    setLoading(true);
    try {
      const response = await api.get<any[]>("/transactions");
      setTransactions(response.data.map(normalizeTransaction));
    } catch (error) {
      console.error("❌ Erro ao buscar transações", error);
    } finally {
      setLoading(false);
    }
  }

  /* 🔹 CRIAR */
  async function addTransaction(transaction: {
    description: string;
    category: string;
    type: "INCOME" | "EXPENSE";
    amount: number;
    occurredAt?: string;
  }) {
    try {
      await api.post("/transactions", {
        ...transaction,
        occurredAt:
          transaction.occurredAt ||
          new Date().toISOString()
      });

      // 🔥 sempre recarrega dados completos
      await fetchTransactions();
    } catch (error) {
      console.error("❌ Erro ao criar transação", error);
    }
  }

  /* 🔹 ATUALIZAR */
  async function updateTransaction(transaction: Transaction) {
    try {
      await api.put(`/transactions/${transaction.id}`, transaction);
      await fetchTransactions();
    } catch (error) {
      console.error("❌ Erro ao atualizar transação", error);
    }
  }

  /* 🔹 DELETAR */
  async function deleteTransaction(id: number) {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("❌ Erro ao deletar transação", error);
    }
  }

  /* 🔹 INIT */
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

/* =======================
   HOOK
======================= */

export function useTransactions() {
  return useContext(TransactionsContext);
}
