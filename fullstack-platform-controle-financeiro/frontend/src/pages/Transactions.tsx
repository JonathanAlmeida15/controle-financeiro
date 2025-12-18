import "../styles/transactions.css";

export default function Transactions() {
  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h1>🧾 Controle de Transações</h1>
        <button>+ Nova Transação</button>
      </div>

      <div className="filters">
        <input placeholder="Buscar descrição..." />
        <select>
          <option>Mês</option>
        </select>
        <select>
          <option>Categoria</option>
        </select>
        <select>
          <option>Tipo</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>05/01</td>
            <td>Salário</td>
            <td>Renda</td>
            <td className="entrada">Entrada</td>
            <td className="entrada">R$ 7.000</td>
            <td>
              <button>✏️</button>
              <button>🗑️</button>
            </td>
          </tr>

          <tr>
            <td>10/01</td>
            <td>Aluguel</td>
            <td>Moradia</td>
            <td className="saida">Saída</td>
            <td className="saida">R$ 2.500</td>
            <td>
              <button>✏️</button>
              <button>🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
