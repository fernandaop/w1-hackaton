
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-w1.light to-white dark:from-w1.dark dark:to-black p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="bg-w1.primary rounded-2xl w-16 h-16 mx-auto flex items-center justify-center mb-6">
            <span className="text-white font-display font-bold text-2xl">W1</span>
          </div>
          <h1 className="text-4xl font-display font-bold mb-2">Página não encontrada</h1>
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full bg-w1.purple hover:bg-purple-600">
              Voltar para a página inicial
            </Button>
          </Link>
          
          <Link to="/dashboard">
            <Button variant="outline" className="w-full">
              Ir para o Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
