import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Janeiro", entradas: 7000, saidas: 5200 },
  { month: "Fevereiro", entradas: 7200, saidas: 4800 },
  { month: "Março", entradas: 6800, saidas: 5000 },
  { month: "Abri", entradas: 7500, saidas: 6200 },
  { month: "Maio", entradas: 8000, saidas: 6000 },
  { month: "Junho", entradas: 8000, saidas: 6000 },
  { month: "Julho", entradas: 8000, saidas: 6000 },
  { month: "Agosto", entradas: 8000, saidas: 6000 },
  { month: "Setembro", entradas: 8000, saidas: 6000 },
  { month: "Outubro", entradas: 8000, saidas: 6000 },
  { month: "Novembro", entradas: 8000, saidas: 6000 },
  { month: "Dezembro", entradas: 10000, saidas: 6000 }
];

export default function BarChartYear() {
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
