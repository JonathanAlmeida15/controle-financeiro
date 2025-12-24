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
  description: string;
  category: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  occurredAt: string; // yyyy-mm-dd
}

interface TransactionsContextType {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
  addTransaction: (t: Omit<Transaction, "id">) => Promise<void>;
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
      const response = await api.get<Transaction[]>("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações", error);
    } finally {
      setLoading(false);
    }
  }

  /* 🔹 CRIAR */
  async function addTransaction(transaction: Omit<Transaction, "id">) {
    try {
      const response = await api.post<Transaction>(
        "/transactions",
        transaction
      );
      setTransactions((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Erro ao criar transação", error);
    }
  }

  /* 🔹 ATUALIZAR */
  async function updateTransaction(transaction: Transaction) {
    try {
      await api.put(`/transactions/${transaction.id}`, transaction);
      setTransactions((prev) =>
        prev.map((t) => (t.id === transaction.id ? transaction : t))
      );
    } catch (error) {
      console.error("Erro ao atualizar transação", error);
    }
  }

  /* 🔹 DELETAR */
  async function deleteTransaction(id: number) {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erro ao deletar transação", error);
    }
  }

  /* 🔹 CARREGAR AO INICIAR */
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
