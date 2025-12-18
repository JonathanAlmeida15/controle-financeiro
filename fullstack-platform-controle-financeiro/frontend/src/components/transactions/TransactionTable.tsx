const transactions = [
  {
    id: 1,
    description: "Salário",
    category: "Receita",
    type: "Entrada",
    value: 7000
  },
  {
    id: 2,
    description: "Aluguel",
    category: "Moradia",
    type: "Saída",
    value: 2500
  }
];

export default function TransactionTable() {
  return (
    <table className="transactions-table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Tipo</th>
          <th>Valor</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td>{t.description}</td>
            <td>{t.category}</td>
            <td className={t.type === "Entrada" ? "in" : "out"}>
              {t.type}
            </td>
            <td>R$ {t.value}</td>
            <td>
              <button className="edit">Editar</button>
              <button className="delete">Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
