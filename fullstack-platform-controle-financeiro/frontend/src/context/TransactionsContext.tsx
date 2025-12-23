import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface Transaction {
  id: number;
  description: string;
  category: string;
  type: "Entrada" | "Saída";
  value: number;
  month: string;
  date: string;
  time: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: number) => void;
}

const TransactionsContext = createContext<TransactionsContextType>(
  {} as TransactionsContextType
);

const STORAGE_KEY = "@finance-control:transactions";

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  /* 🔥 CARREGA DO LOCALSTORAGE AO INICIAR */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  /* 🔥 SALVA AUTOMATICAMENTE SEMPRE QUE MUDAR */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(transaction: Transaction) {
    setTransactions((prev) => [...prev, transaction]);
  }

  function updateTransaction(updated: Transaction) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  }

  function deleteTransaction(id: number) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, updateTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
