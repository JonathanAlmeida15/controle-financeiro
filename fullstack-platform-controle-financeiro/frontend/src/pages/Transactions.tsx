import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/transactions.css";

interface Transaction {
  id: number;
  description: string;
  category: string;
  type: "Entrada" | "Saída";
  value: number;
  month: string;
  date: string;
  time: string;
}

export default function Transactions() {
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

  const [showModal, setShowModal] = useState(false);

  const [newTransaction, setNewTransaction] = useState({
    description: "",
    category: "",
    type: "Entrada",
    value: "",
    month: ""
  });

  function handleSave() {
    if (
      !newTransaction.description ||
      !newTransaction.category ||
      !newTransaction.value ||
      !newTransaction.month
    ) {
      alert("Preencha todos os campos");
      return;
    }

    const now = new Date();

    const transaction: Transaction = {
      id: Date.now(),
      description: newTransaction.description,
      category: newTransaction.category,
      type: newTransaction.type as "Entrada" | "Saída",
      value: Number(newTransaction.value),
      month: newTransaction.month,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString().slice(0, 5)
    };

    setTransactions([...transactions, transaction]);
    setShowModal(false);

    setNewTransaction({
      description: "",
      category: "",
      type: "Entrada",
      value: "",
      month: ""
    });
  }

  return (
    <>
      <Navbar />

      <div className="transactions-container">
        <h1>📋 Controle de Transações</h1>

        {/* FILTROS */}
        <div className="filters">
          <input placeholder="Buscar descrição..." />

          <select>
            <option>Mês</option>
            <option>Janeiro</option>
            <option>Fevereiro</option>
            <option>Março</option>
            <option>Abril</option>
            <option>Maio</option>
            <option>Junho</option>
            <option>Julho</option>
            <option>Agosto</option>
            <option>Setembro</option>
            <option>Outubro</option>
            <option>Novembro</option>
            <option>Dezembro</option>
          </select>

          <select>
            <option>Categoria</option>
            <option>Renda</option>
            <option>Moradia</option>
            <option>Alimentação</option>
            <option>Lazer</option>
          </select>

          <select>
            <option>Tipo</option>
            <option>Entrada</option>
            <option>Saída</option>
          </select>

          <button onClick={() => setShowModal(true)}>
            + Nova Transação
          </button>
        </div>

        {/* TABELA */}
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>
                <td>R$ {t.value}</td>
                <td>{t.date}</td>
                <td>{t.time}</td>
                <td>
                  <button>✏️</button>
                  <button>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>➕ Nova Transação</h2>

            <input
              placeholder="Descrição"
              value={newTransaction.description}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, description: e.target.value })
              }
            />

            <input
              placeholder="Categoria"
              value={newTransaction.category}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, category: e.target.value })
              }
            />

            <select
              value={newTransaction.type}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, type: e.target.value })
              }
            >
              <option>Entrada</option>
              <option>Saída</option>
            </select>

            <input
              type="number"
              placeholder="Valor"
              value={newTransaction.value}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, value: e.target.value })
              }
            />

            <select
              value={newTransaction.month}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, month: e.target.value })
              }
            >
              <option value="">Mês</option>
              <option>Janeiro</option>
              <option>Fevereiro</option>
              <option>Março</option>
              <option>Abril</option>
              <option>Maio</option>
              <option>Junho</option>
              <option>Julho</option>
              <option>Agosto</option>
              <option>Setembro</option>
              <option>Outubro</option>
              <option>Novembro</option>
              <option>Dezembro</option>
            </select>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
