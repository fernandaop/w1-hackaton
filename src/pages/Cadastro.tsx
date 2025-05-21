import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { userService } from "@/services/api";

const Cadastro = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    try {
      // Enviar dados para a API
      const userData = await userService.register({
        name,
        email,
        phone,
        password
      });
      
      // Armazenar ID do usuário para uso na próxima tela
      localStorage.setItem('userId', userData.id);
      
      toast.success("Cadastro realizado com sucesso!");
      navigate("/post-registration");
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Dados do erro:", error.response.data);
        toast.error(error.response.data?.message || "Erro ao cadastrar. Tente novamente.");
      } else if (error.request) {
        console.log("Sem resposta da API:", error.request);
        toast.error("Sem resposta do servidor. Verifique a API.");
      } else {
        console.log("Erro inesperado:", error.message);
        toast.error("Erro inesperado. Verifique sua conexão.");
      }
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
            Criar conta
          </h1>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-lg px-4 py-2 bg-gray-100"
              />

              <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="rounded-lg px-4 py-2 bg-gray-100"
              />  
                
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="joao@exemplo.com"
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

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="rounded-lg px-4 py-2 bg-gray-100"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#192E36] hover:bg-[#0f1a1f] text-white py-2 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Carregando..." : "Cadastrar"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">
                Já tem uma conta?{" "}
              </span>
              <Link to="/login" className="text-green-600 hover:text-green-500">
                Faça login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;