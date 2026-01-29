import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Settings.css";

const TOTAL_BUDGET_KEY = "monthlyBudget";
const CATEGORY_BUDGET_KEY = "budgetByCategory";
const GOALS_KEY = "financialGoals";

type BudgetMap = Record<string, number>;
type Goal = {
  id: string;
  title: string;
  target: number;
  deadline: string;
  saved: number;
};

export default function Settings() {
  const [totalBudget, setTotalBudget] = useState(
    localStorage.getItem(TOTAL_BUDGET_KEY) ?? ""
  );
  const [categoryName, setCategoryName] = useState("");
  const [categoryBudget, setCategoryBudget] = useState("");
  const [feedback, setFeedback] = useState("");
  const [categoryBudgets, setCategoryBudgets] = useState<BudgetMap>(() => (
    JSON.parse(localStorage.getItem(CATEGORY_BUDGET_KEY) ?? "{}")
  ));
  const [goals, setGoals] = useState<Goal[]>(() => (
    JSON.parse(localStorage.getItem(GOALS_KEY) ?? "[]")
  ));
  const [goalTitle, setGoalTitle] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");
  const [goalSaved, setGoalSaved] = useState("");

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
      ...categoryBudgets,
      [trimmedName]: value
    };

    localStorage.setItem(CATEGORY_BUDGET_KEY, JSON.stringify(updatedBudgets));
    setCategoryBudgets(updatedBudgets);
    setCategoryName("");
    setCategoryBudget("");
    setFeedback("Orçamento por categoria atualizado.");
  };

  const handleAddGoal = () => {
    const trimmedTitle = goalTitle.trim();
    const targetValue = Number(goalTarget);
    const savedValue = Number(goalSaved || 0);
    if (!trimmedTitle || !goalDeadline || targetValue <= 0) {
      setFeedback("Preencha título, valor e prazo da meta.");
      return;
    }

    const newGoal: Goal = {
      id: `${Date.now()}`,
      title: trimmedTitle,
      target: targetValue,
      deadline: goalDeadline,
      saved: savedValue
    };

    const updatedGoals = [...goals, newGoal];
    localStorage.setItem(GOALS_KEY, JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
    setGoalTitle("");
    setGoalTarget("");
    setGoalDeadline("");
    setGoalSaved("");
    setFeedback("Meta financeira adicionada.");
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
            {Object.keys(categoryBudgets).length === 0 ? (
              <div className="settings-placeholder">
                Nenhum orçamento por categoria cadastrado.
              </div>
            ) : (
              <ul>
                {Object.entries(categoryBudgets).map(([name, value]) => (
                  <li key={name}>
                    {name}: R$ {value.toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {feedback && <div className="settings-feedback">{feedback}</div>}
        </section>

        <section className="settings-section">
          <h2>Metas Financeiras</h2>
          <p className="settings-description">
            Crie metas para acompanhar objetivos como juntar dinheiro ou pagar
            dívidas. Acompanhe o progresso e veja quando cada meta for concluída.
          </p>

          <div className="settings-grid">
            <div className="settings-card">
              <h3>Criar meta</h3>
              <label>
                Objetivo
                <input
                  type="text"
                  placeholder="Ex: Juntar dinheiro"
                  value={goalTitle}
                  onChange={(event) => setGoalTitle(event.target.value)}
                />
              </label>
              <label>
                Valor da meta
                <input
                  type="number"
                  placeholder="R$ 0,00"
                  value={goalTarget}
                  onChange={(event) => setGoalTarget(event.target.value)}
                />
              </label>
              <label>
                Valor já guardado
                <input
                  type="number"
                  placeholder="R$ 0,00"
                  value={goalSaved}
                  onChange={(event) => setGoalSaved(event.target.value)}
                />
              </label>
              <label>
                Prazo
                <input
                  type="date"
                  value={goalDeadline}
                  onChange={(event) => setGoalDeadline(event.target.value)}
                />
              </label>
              <button type="button" onClick={handleAddGoal}>
                Salvar meta
              </button>
            </div>

            <div className="settings-card">
              <h3>Metas cadastradas</h3>
              {goals.length === 0 ? (
                <div className="settings-placeholder">
                  Nenhuma meta cadastrada.
                </div>
              ) : (
                <div className="goals-list">
                  {goals.map((goal) => {
                    const progress = Math.min(
                      (goal.saved / goal.target) * 100,
                      100
                    );
                    const isComplete = goal.saved >= goal.target;

                    return (
                      <div
                        key={goal.id}
                        className={`goal-card ${isComplete ? "goal-complete" : ""}`}
                      >
                        <div className="goal-header">
                          <strong>{goal.title}</strong>
                          <span>{goal.deadline}</span>
                        </div>
                        <div className="goal-values">
                          R$ {goal.saved.toFixed(2)} / R$ {goal.target.toFixed(2)}
                        </div>
                        <div className="goal-progress">
                          <div
                            className="goal-progress-fill"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        {isComplete && (
                          <div className="goal-badge">Meta concluída</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
