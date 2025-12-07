import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://127.0.0.1:8000/api/register/", formData);
      setSuccess("Conta criada com sucesso!");
    } catch (err) {
      setError("Erro ao criar conta. Verifique os dados.");
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
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          📝 Criar Conta
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Preencha os dados abaixo para criar sua conta.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-300 font-medium">Usuário</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-800 text-gray-100 
                         border border-gray-700 focus:border-indigo-500 
                         focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="text-gray-300 font-medium">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-800 text-gray-100 
                         border border-gray-700 focus:border-indigo-500 
                         focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="text-gray-300 font-medium">Senha</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-800 text-gray-100 
                         border border-gray-700 focus:border-indigo-500 
                         focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm text-center">{success}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl 
                       text-white font-semibold shadow-lg shadow-indigo-500/30 transition"
          >
            Criar Conta
          </motion.button>
        </form>

        <p className="text-gray-400 text-center text-sm mt-6">
          Já possui conta?{" "}
          <a
            href="http://localhost:3000"
            className="text-indigo-400 hover:underline font-semibold"
          >
            Faça login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
