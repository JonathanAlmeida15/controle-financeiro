// import { useContext } from 'react';
// import { TaskContext } from '../context/TaskContext';

// export default function TaskList() {
//   const { tasks, loading, updateTask, deleteTask } =
//     useContext(TaskContext);

//   if (loading) return <p>Carregando...</p>;
//   if (!tasks.length) return <p>Sem tarefas.</p>;

//   return (
//     <ul>
//       {tasks.map(task => (
//         <li key={task.id}>
//           <input
//             type="checkbox"
//             checked={task.done}
//             onChange={() =>
//               updateTask(task.id, {
//                 ...task,
//                 done: !task.done,
//               })
//             }
//           />
//           {task.title}
//           <button onClick={() => deleteTask(task.id)}>X</button>
//         </li>
//       ))}
//     </ul>
//   );
// }
