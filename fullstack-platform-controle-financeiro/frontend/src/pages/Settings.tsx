import Navbar from "../components/Navbar";
import "../styles/Settings.css";

export default function Settings() {
  return (
    <>
      <Navbar />

      <div className="settings-container">
        <h1>⚙️ Configurações</h1>

        <section className="settings-section">
          <h2>Categorias Financeiras</h2>
          <p className="settings-description">
            Cadastre categorias para usar nas transações e personalize cores
            que serão aplicadas no Controle de Transações e no Dashboard.
          </p>

          <div className="settings-grid">
            <div className="settings-card">
              <h3>Cadastro de categorias</h3>
              <label>
                Nome da categoria
                <input type="text" placeholder="Ex: Alimentação" />
              </label>
              <label>
                Cor da categoria
                <input type="color" defaultValue="#22d3ee" />
              </label>
              <button type="button">Adicionar categoria</button>
            </div>

            <div className="settings-card">
              <h3>Percentual por categoria</h3>
              <p>
                Os percentuais de gastos por categoria aparecerão nos gráficos
                do Dashboard para facilitar o acompanhamento.
              </p>
              <div className="settings-placeholder">
                Nenhuma categoria cadastrada.
              </div>
            </div>
          </div>

          <div className="settings-alert">
            Alerta: quando uma categoria ultrapassar o valor definido, um aviso
            em vermelho será exibido no Dashboard.
          </div>
        </section>

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
                <input type="number" placeholder="R$ 0,00" />
              </label>
              <button type="button">Salvar orçamento</button>
            </div>

            <div className="settings-card">
              <h3>Orçamento por categoria</h3>
              <label>
                Categoria
                <input type="text" placeholder="Selecione ou digite" />
              </label>
              <label>
                Valor
                <input type="number" placeholder="R$ 0,00" />
              </label>
              <button type="button">Definir orçamento</button>
            </div>
          </div>

          <div className="settings-progress">
            <div className="settings-progress-label">
              Progresso do orçamento mensal
            </div>
            <div className="settings-progress-bar">
              <div className="settings-progress-fill" style={{ width: "35%" }} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
