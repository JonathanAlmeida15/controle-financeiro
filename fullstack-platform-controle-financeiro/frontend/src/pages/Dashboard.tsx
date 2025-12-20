import Navbar from "../components/Navbar";
import PieChartCard from "../components/charts/PieChartCard";
import BarChartYear from "../components/charts/BarChartYear";
import "../styles/dashboard.css";

export default function Dashboard() {
  const receitas = [
    { name: "Salário", value: 7000 },
    { name: "Extras", value: 1500 }
  ];

  const despesas = [
    { name: "Aluguel", value: 2500 },
    { name: "Cartão", value: 1800 },
    { name: "Outros", value: 900 }
  ];

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="charts-row">
          <PieChartCard
            title="💰 Receitas do Mês"
            data={receitas}
            colors={["#00E676", "#1DE9B6"]}
          />

          <PieChartCard
            title="💸 Despesas do Mês"
            data={despesas}
            colors={["#FF5252", "#FF9100", "#FF1744"]}
          />
        </div>

        <div className="chart-full">
          <BarChartYear />
        </div>
      </div>
    </>
  );
}
