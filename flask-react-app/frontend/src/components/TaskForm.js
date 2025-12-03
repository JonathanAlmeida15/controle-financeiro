function TaskForm() {
  return (
    <form style={{
      background: '#020617',
      padding: '30px',
      borderRadius: '12px',
      maxWidth: '600px'
    }}>
      <div style={{ display: 'grid', gap: '18px' }}>
        <div>
          <label>Nome da Anotação</label>
          <input type="text" placeholder="Ex: Estudar React" />
        </div>

        <div>
          <label>Horário</label>
          <input type="time" />
        </div>

        <div>
          <label>Descrição</label>
          <textarea rows="4" placeholder="Detalhes da anotação..." />
        </div>

        <div>
          <label>Relevância</label>
          <select>
            <option>Pequeno</option>
            <option>Médio</option>
            <option>Alto</option>
          </select>
        </div>

        <button className="btn">💾 Salvar Anotação</button>
      </div>
    </form>
  );
}

export default TaskForm;
