import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { userService } from "@/services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      // Chamada à API para login
      const response = await userService.login({ email, password });

      const { id, token, name } = response;

      // Armazenar informações do usuário
      localStorage.setItem("userId", id);
      localStorage.setItem("userToken", token);
      localStorage.setItem("userName", name);

      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Credenciais inválidas ou erro no servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo com imagem */}
      <div
        className="hidden lg:flex lg:w-1/2 items-center justify-center bg-[#192E36] relative overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)",
        }}
      >
        <img
          src="/logo2.png"
          alt="Imagem W1"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Lado direito com formulário */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-16 xl:px-28 py-12">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="flex items-center justify-center lg:hidden mb-12">
            <div className="bg-[#192E36] rounded-xl w-16 h-16 flex items-center justify-center">
              <span className="text-white font-display font-bold text-3xl">W1</span>
            </div>
          </div>

          <h1 className="text-3xl font-display font-bold text-gray-900 text-center lg:text-left">
            Acessar conta
          </h1>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg px-4 py-2 bg-gray-100"
              />

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg px-4 py-2 bg-gray-100"
              />

              <div className="flex justify-end">
                <Link to="/recuperar-senha" className="text-sm text-green-600 hover:text-green-500">
                  Recuperar senha
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#192E36] hover:bg-[#0f1a1f] text-white py-2 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Carregando..." : "Login"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Ainda não tem uma conta? </span>
              <Link to="/cadastro" className="text-green-600 hover:text-green-500">
                Cadastre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
