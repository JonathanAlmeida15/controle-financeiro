import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";
import axios from "axios";

/* =======================
   TYPES
======================= */

export interface Transaction {
  id: number;
  title: string;
  category?: string;
  type: "Entrada" | "Saída";
  amount: number;
  date: string;
  hour: string;
  occurredAt?: string;
}

interface CreateTransactionDTO {
  title: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  category?: string | null;
  occurredAt?: string;
}

/* =======================
   CONTEXT
======================= */

interface TransactionsContextType {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
  addTransaction: (data: CreateTransactionDTO) => Promise<void>;
  updateTransaction: (t: Transaction) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
}

const TransactionsContext = createContext({} as TransactionsContextType);

/* =======================
   API
======================= */

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* =======================
   NORMALIZER
======================= */

function normalizeTransaction(t: any): Transaction {
  const dateTime = t.occurredAt ?? t.createdAt ?? "";
  const [date = "", time = ""] = dateTime.split("T");

  return {
    id: t.id,
    title: t.title ?? "",
    category: t.category ?? "—",
    type: t.type === "INCOME" ? "Entrada" : "Saída",
    amount: Number(t.amount ?? 0),
    date,
    hour: time.substring(0, 5),
    occurredAt: t.occurredAt ?? undefined
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
    } finally {
      setLoading(false);
    }
  }

  async function addTransaction(data: CreateTransactionDTO) {
    await api.post("/transactions", data);
    await fetchTransactions();
  }

  async function updateTransaction(t: Transaction) {
    await api.put(`/transactions/${t.id}`, {
      title: t.title,
      amount: t.amount,
      type: t.type === "Entrada" ? "INCOME" : "EXPENSE",
      category: t.category,
      occurredAt: t.occurredAt
    });

    await fetchTransactions();
  }

  async function deleteTransaction(id: number) {
    await api.delete(`/transactions/${id}`);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
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
