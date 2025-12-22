import { createContext, useContext, useState, ReactNode } from "react";

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

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      description: "Salário",
      category: "Renda",
      type: "Entrada",
      value: 7000,
      month: "Maio",
      date: "10/05/2025",
      time: "09:00"
    },
    {
      id: 2,
      description: "Aluguel",
      category: "Moradia",
      type: "Saída",
      value: 2500,
      month: "Maio",
      date: "05/05/2025",
      time: "14:30"
    }
  ]);

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
