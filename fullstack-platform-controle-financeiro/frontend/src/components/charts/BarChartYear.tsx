import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useTransactions } from "../../context/TransactionsContext";

const months = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

export default function BarChartYear() {
  const { transactions } = useTransactions();

  const data = months.map((month) => {
    const entradas = transactions
      .filter((t) => t.month === month && t.type === "Entrada")
      .reduce((sum, t) => sum + t.value, 0);

    const saidas = transactions
      .filter((t) => t.month === month && t.type === "Saída")
      .reduce((sum, t) => sum + t.value, 0);

    return { month, entradas, saidas };
  });

  return (
    <div className="chart-card">
      <h3>📊 Entradas x Saídas no Ano</h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="entradas" fill="#00E676" radius={[6, 6, 0, 0]} />
          <Bar dataKey="saidas" fill="#FF5252" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
