import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/transactions.css";
import { useTransactions } from "../context/TransactionsContext";

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
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
  } = useTransactions();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  /* FILTROS */
  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");

  const [form, setForm] = useState({
    description: "",
    category: "",
    type: "Entrada",
    value: "",
    month: "",
  });

  function openNew() {
    setEditingId(null);
    setForm({
      description: "",
      category: "",
      type: "Entrada",
      value: "",
      month: "",
    });
    setShowModal(true);
  }

  function openEdit(t: Transaction) {
    setEditingId(t.id);
    setForm({
      description: t.description,
      category: t.category,
      type: t.type,
      value: String(t.value),
      month: t.month,
    });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.description || !form.category || !form.value || !form.month) {
      alert("Preencha todos os campos");
      return;
    }

    const now = new Date();

    if (editingId) {
      const original = transactions.find(t => t.id === editingId);
      if (!original) return;

      updateTransaction({
        ...original,
        description: form.description,
        category: form.category,
        type: form.type as "Entrada" | "Saída",
        value: Number(form.value),
        month: form.month,
      });
    } else {
      addTransaction({
        id: Date.now(),
        description: form.description,
        category: form.category,
        type: form.type as "Entrada" | "Saída",
        value: Number(form.value),
        month: form.month,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString().slice(0, 5),
      });
    }

    setShowModal(false);
  }

  function handleDelete(id: number) {
    if (confirm("Deseja realmente excluir esta transação?")) {
      deleteTransaction(id);
    }
  }

  const filteredTransactions = transactions.filter((t) => {
    return (
      t.description.toLowerCase().includes(search.toLowerCase()) &&
      (filterMonth ? t.month === filterMonth : true) &&
      (filterCategory ? t.category === filterCategory : true) &&
      (filterType ? t.type === filterType : true)
    );
  });

  return (
    <>
      <Navbar />

      <div className="transactions-container">
        <h1>📋 Controle de Transações</h1>

        {/* FILTROS */}
        <div className="filters">
          <input
            placeholder="Buscar descrição..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setFilterMonth(e.target.value)}>
            <option value="">Mês</option>
            {[
              "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
              "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
            ].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <select onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">Categoria</option>
            <option>Renda</option>
            <option>Moradia</option>
            <option>Alimentação</option>
            <option>Lazer</option>
          </select>

          <select onChange={(e) => setFilterType(e.target.value)}>
            <option value="">Tipo</option>
            <option>Entrada</option>
            <option>Saída</option>
          </select>

          <button onClick={openNew}>+ Nova Transação</button>
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
            {filteredTransactions.map((t) => (
              <tr key={t.id}>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>
                <td>R$ {t.value}</td>
                <td>{t.date}</td>
                <td>{t.time}</td>
                <td>
                  <button onClick={() => openEdit(t)}>✏️</button>
                  <button onClick={() => handleDelete(t.id)}>🗑️</button>
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
            <h2>{editingId ? "✏️ Editar Transação" : "➕ Nova Transação"}</h2>

            <input
              placeholder="Descrição"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <input
              placeholder="Categoria"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Entrada</option>
              <option>Saída</option>
            </select>

            <input
              type="number"
              placeholder="Valor"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
            />

            <select
              value={form.month}
              onChange={(e) => setForm({ ...form, month: e.target.value })}
            >
              <option value="">Mês</option>
              {[
                "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
                "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
              ].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="save-btn" onClick={handleSave}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
