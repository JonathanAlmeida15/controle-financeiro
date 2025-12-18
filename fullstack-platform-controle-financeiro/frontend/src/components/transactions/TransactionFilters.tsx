export default function TransactionFilters() {
  return (
    <div className="filters">
      <input type="text" placeholder="Buscar descrição..." />

      <select>
        <option>Mês</option>
        <option>Janeiro</option>
        <option>Fevereiro</option>
      </select>

      <select>
        <option>Categoria</option>
        <option>Salário</option>
        <option>Aluguel</option>
        <option>Cartão</option>
      </select>

      <select>
        <option>Tipo</option>
        <option>Entrada</option>
        <option>Saída</option>
      </select>

      <button>+ Nova Transação</button>
    </div>
  );
}
