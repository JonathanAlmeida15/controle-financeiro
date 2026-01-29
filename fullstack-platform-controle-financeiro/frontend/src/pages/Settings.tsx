import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Settings.css";

const TOTAL_BUDGET_KEY = "monthlyBudget";
const CATEGORY_BUDGET_KEY = "budgetByCategory";

type BudgetMap = Record<string, number>;

export default function Settings() {
  const [totalBudget, setTotalBudget] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryBudget, setCategoryBudget] = useState("");
  const [feedback, setFeedback] = useState("");

  const parsedCategoryBudgets: BudgetMap = JSON.parse(
    localStorage.getItem(CATEGORY_BUDGET_KEY) ?? "{}"
  );

  const handleSaveTotal = () => {
    const value = Number(totalBudget);
    if (!value || value <= 0) {
      setFeedback("Informe um valor válido para o orçamento mensal.");
      return;
    }
    localStorage.setItem(TOTAL_BUDGET_KEY, String(value));
    setFeedback("Orçamento mensal salvo com sucesso.");
  };

  const handleSaveCategory = () => {
    const trimmedName = categoryName.trim();
    const value = Number(categoryBudget);
    if (!trimmedName || !value || value <= 0) {
      setFeedback("Preencha categoria e valor para salvar.");
      return;
    }

    const updatedBudgets = {
      ...parsedCategoryBudgets,
      [trimmedName]: value
    };

    localStorage.setItem(CATEGORY_BUDGET_KEY, JSON.stringify(updatedBudgets));
    setCategoryName("");
    setCategoryBudget("");
    setFeedback("Orçamento por categoria atualizado.");
  };

  return (
    <>
      <Navbar />

      <div className="settings-container">
        <h1>⚙️ Configurações</h1>

        <section className="settings-section">
          <h2>Orçamento Mensal</h2>
          <p className="settings-description">
            Defina o orçamento mensal total e por categoria. O progresso ficará
            disponível no Dashboard.
          </p>

          <div className="settings-grid">
            <div className="settings-card">
              <h3>Orçamento total</h3>
              <label>
                Valor mensal
                <input
                  type="number"
                  placeholder="R$ 0,00"
                  value={totalBudget}
                  onChange={(event) => setTotalBudget(event.target.value)}
                />
              </label>
              <button type="button" onClick={handleSaveTotal}>
                Salvar orçamento
              </button>
            </div>

            <div className="settings-card">
              <h3>Orçamento por categoria</h3>
              <label>
                Categoria
                <input
                  type="text"
                  placeholder="Ex: Transporte"
                  value={categoryName}
                  onChange={(event) => setCategoryName(event.target.value)}
                />
              </label>
              <label>
                Valor
                <input
                  type="number"
                  placeholder="R$ 0,00"
                  value={categoryBudget}
                  onChange={(event) => setCategoryBudget(event.target.value)}
                />
              </label>
              <button type="button" onClick={handleSaveCategory}>
                Definir orçamento
              </button>
            </div>
          </div>

          <div className="settings-budget-list">
            <h3>Orçamentos cadastrados</h3>
            {Object.keys(parsedCategoryBudgets).length === 0 ? (
              <div className="settings-placeholder">
                Nenhum orçamento por categoria cadastrado.
              </div>
            ) : (
              <ul>
                {Object.entries(parsedCategoryBudgets).map(([name, value]) => (
                  <li key={name}>
                    {name}: R$ {value.toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {feedback && <div className="settings-feedback">{feedback}</div>}
        </section>
      </div>
    </>
  );
}
