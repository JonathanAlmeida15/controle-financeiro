import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/transactions.css";
import { useTransactions } from "../context/TransactionsContext";

/* 🔹 TIPAGEM ALINHADA COM O CONTEXT */
interface Transaction {
  id: number;
  description: string;
  categoryId: number | null;
  categoryName?: string;
  type: "Entrada" | "Saída";
  amount: number;
  date: string;
  hour: string;
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
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");

  /* FORM */
  const [form, setForm] = useState({
    description: "",
    categoryName: "",
    type: "Entrada",
    amount: ""
  });

  function openNew() {
    setEditingId(null);
    setForm({
      description: "",
      categoryName: "",
      type: "Entrada",
      amount: ""
    });
    setShowModal(true);
  }

  function openEdit(t: Transaction) {
    setEditingId(t.id);
    setForm({
      description: t.description,
      categoryName: t.categoryName ?? "",
      type: t.type,
      amount: String(t.amount)
    });
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.description || !form.amount) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    if (editingId) {
      const original = transactions.find(t => t.id === editingId);
      if (!original) return;

      await updateTransaction({
        ...original,
        description: form.description,
        type: form.type as "Entrada" | "Saída",
        amount: Number(form.amount)
        // ⚠️ categoria NÃO é alterada aqui porque o backend não suporta ainda
      });
    } else {
      const now = new Date();
      const date = now.toISOString().split("T")[0]; // yyyy-MM-dd
      const hour = now.toTimeString().slice(0, 5);  // HH:mm

      await addTransaction({
        description: form.description,
        categoryId: null, // backend ainda não resolve categoria por nome
        type: form.type === "Entrada" ? "INCOME" : "EXPENSE",
        amount: Number(form.amount),
        date,
        hour
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
      (filterCategory ? t.categoryName === filterCategory : true) &&
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

          <select onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">Categoria</option>
            {[...new Set(transactions.map(t => t.categoryName))].map(
              (c) =>
                c && <option key={c}>{c}</option>
            )}
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
                <td>{t.categoryName ?? "—"}</td>
                <td>{t.type}</td>
                <td>R$ {t.amount.toFixed(2)}</td>
                <td>{t.date}</td>
                <td>{t.hour}</td>
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
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              placeholder="Categoria"
              value={form.categoryName}
              onChange={(e) =>
                setForm({ ...form, categoryName: e.target.value })
              }
            />

            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option>Entrada</option>
              <option>Saída</option>
            </select>

            <input
              type="number"
              placeholder="Valor"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
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
