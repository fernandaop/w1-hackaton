
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    try {
      // This would be replaced with an actual API call in production
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Login realizado com sucesso!");
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with logo and background */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#192E36] items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#192E36]/80 to-[#192E36]"></div>
        <div className="w-full h-full absolute flex items-center justify-center">
          <div className="relative z-10 animate-pulse">
            <div className="w-72 h-72 rounded-full bg-[#45CFD8]/20 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"></div>
            <div className="w-56 h-56 rounded-full bg-[#45CFD8]/30 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"></div>
            <div className="w-40 h-40 rounded-full bg-[#45CFD8]/40 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"></div>
            <div className="text-white text-9xl font-display font-bold">W1</div>
          </div>
        </div>
      </div>

      {/* Right side with login form */}
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
              <div>
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
              </div>
              
              <div>
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
              </div>
              
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
              <span className="text-gray-600">
                Ainda não tem uma conta?{" "}
              </span>
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
