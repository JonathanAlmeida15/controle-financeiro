import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/nova-tarefa" element={<CreateTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
