import Navbar from "../components/Navbar";
import PieChartCard from "../components/charts/PieChartCard";
import BarChartYear from "../components/charts/BarChartYear";
import "../styles/Dashboard.css";
import { useTransactions } from "../context/TransactionsContext";

export default function Dashboard() {
  const { transactions } = useTransactions();

  const currentMonth = new Date().toLocaleString("pt-BR", { month: "long" });
  const monthFormatted =
    currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  const getMonthName = (dateValue: string) => {
    if (!dateValue) return "";
    const parsed = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return "";
    const monthName = parsed.toLocaleString("pt-BR", { month: "long" });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  };

  /* RECEITAS DO MÊS */
  const receitas = transactions
    .filter((t) => t.type === "Entrada" && getMonthName(t.date) === monthFormatted)
    .reduce<{ name: string; value: number }[]>((acc, t) => {
      const categoryName = t.category ?? "Sem categoria";
      const found = acc.find((i) => i.name === categoryName);
      if (found) found.value += t.amount;
      else acc.push({ name: categoryName, value: t.amount });
      return acc;
    }, []);

  /* DESPESAS DO MÊS */
  const despesas = transactions
    .filter((t) => t.type === "Saída" && getMonthName(t.date) === monthFormatted)
    .reduce<{ name: string; value: number }[]>((acc, t) => {
      const categoryName = t.category ?? "Sem categoria";
      const found = acc.find((i) => i.name === categoryName);
      if (found) found.value += t.amount;
      else acc.push({ name: categoryName, value: t.amount });
      return acc;
    }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="charts-row">
          <PieChartCard
            title="💰 Receitas do Mês"
            data={receitas}
            colors={["#00E676", "#1DE9B6", "#64FFDA"]}
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
