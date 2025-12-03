const relevanceColors = {
  Pequeno: '#22c55e',
  Médio: '#eab308',
  Alto: '#ef4444',
};

function TaskCard({ task, onDelete }) {
  const { id, title, time, description, relevance } = task;

  const handleEdit = () => {
    alert(`Editar anotação: ${title}`);
  };

  return (
    <div style={{
      background: '#020617',
      borderRadius: '12px',
      padding: '18px',
      boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <h3 style={{ margin: '0 0 10px 0' }}>{title}</h3>

        {/* ✅ AJUSTE 3 — LABEL DE RELEVÂNCIA */}
        <p style={{ fontSize: '0.85rem', margin: 0 }}>
          <strong>Relevância:</strong>{' '}
          <span style={{
            color: relevanceColors[relevance],
            fontWeight: 'bold'
          }}>
            {relevance}
          </span>
        </p>

        <p style={{
          marginTop: '12px',
          fontSize: '0.95rem',
          color: '#cbd5f5'
        }}>
          {description}
        </p>

        <p style={{
          fontSize: '0.8rem',
          color: '#94a3b8'
        }}>
          ⏰ {time}
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '10px',
        marginTop: '18px'
      }}>
        <button
          className="btn btn-secondary"
          onClick={handleEdit}
        >
          ✏️ Editar
        </button>

        <button
          className="btn btn-danger"
          onClick={() => onDelete(id)}
        >
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
