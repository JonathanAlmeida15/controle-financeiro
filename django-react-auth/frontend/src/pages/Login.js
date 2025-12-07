import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      // 🔥 DEBUG – LOG DO SERVIDOR
      console.log("RESPOSTA DO LOGIN:", response.data);

      // Armazenar tokens
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      // 🔥 Redireciona automaticamente
      window.location.href = "/dashboard";

    } catch (err) {
      console.log("ERRO DETALHADO:", err);
      setError("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700 p-8"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          🔐 Login
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="text-gray-300 font-medium">Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="text-gray-300 font-medium">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold shadow-lg shadow-indigo-500/30 transition"
          >
            Entrar
          </motion.button>
        </form>

        <p className="text-gray-400 text-center text-sm mt-6">
          Desenvolvido com Django + React 🔥
        </p>

        {/* 🔽 BOTÃO CRIAR CONTA 🔽 */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => (window.location.href = "/register")}
          className="w-full mt-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 
                     rounded-xl text-indigo-300 font-semibold shadow-lg transition"
        >
          Criar uma conta
        </motion.button>
        {/* 🔼 FIM DO BOTÃO 🔼 */}

      </motion.div>
    </div>
  );
}
