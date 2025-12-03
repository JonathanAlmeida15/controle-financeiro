import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Estudar React',
      time: '20:00',
      description: 'Revisar Hooks e Context API',
      relevance: 'Alto'
    },
    {
      id: 2,
      title: 'Revisar Flask',
      time: '18:00',
      description: 'Ver autenticação JWT',
      relevance: 'Médio'
    }
  ]);

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1 className="title">🗒️ Anotações</h1>

        <Link to="/nova-tarefa" className="btn">
          ➕ Nova Anotação
        </Link>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '20px'
      }}>
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
