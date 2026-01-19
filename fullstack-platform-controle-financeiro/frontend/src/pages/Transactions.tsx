import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/transactions.css";
import { useTransactions, Transaction as TransactionItem } from "../context/TransactionsContext";

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
    title: "",
    category: "",
    type: "Entrada",
    amount: ""
  });

  function openNew() {
    setEditingId(null);
    setForm({
      title: "",
      category: "",
      type: "Entrada",
      amount: ""
    });
    setShowModal(true);
  }

  function openEdit(t: TransactionItem) {
    setEditingId(t.id);
    setForm({
      title: t.title,
      category: t.category ?? "",
      type: t.type,
      amount: String(t.amount)
    });
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.title || !form.amount) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    if (editingId) {
      const original = transactions.find(t => t.id === editingId);
      if (!original) return;

      await updateTransaction({
        ...original,
        title: form.title,
        category: form.category || null,
        type: form.type,
        amount: Number(form.amount)
      });
    } else {
      await addTransaction({
        title: form.title,
        category: form.category || null,
        type: form.type === "Entrada" ? "INCOME" : "EXPENSE",
        amount: Number(form.amount)
      });
    }

    setShowModal(false);
  }

  function handleDelete(id: number) {
    if (confirm("Deseja realmente excluir esta transação?")) {
      deleteTransaction(id);
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const title = transaction.title ?? "";
    const category = transaction.category ?? "";
    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory
      ? category === filterCategory
      : true;
    const matchesType = filterType ? transaction.type === filterType : true;

    return matchesSearch && matchesCategory && matchesType;
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
            {[...new Set(transactions.map(t => t.category))].map(
              c => c && <option key={c}>{c}</option>
            )}
          </select>

          <select onChange={(e) => setFilterType(e.target.value)}>
            <option value="">Tipo</option>
            <option>Entrada</option>
            <option>Saída</option>
          </select>

          <button className="new-btn" onClick={openNew}>
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
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.category ?? "—"}</td>
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
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              placeholder="Categoria"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
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
