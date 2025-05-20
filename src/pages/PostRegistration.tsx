import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Folder, Building, FileCheck } from "lucide-react";

const PostRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [progress] = useState(35);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Informações enviadas",
        description: "Suas informações foram enviadas com sucesso. Nossa equipe entrará em contato em breve.",
        variant: "default",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <SidebarNav />
      
      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Sua jornada de construção da Holding</h1>
          <Separator className="mb-6" />
          
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-medium">{progress}%</span>
              <span className="text-sm text-gray-500">Etapa atual: Informações adicionais</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Form card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informações adicionais</CardTitle>
              <CardDescription>
                Por favor, forneça informações adicionais para personalizarmos nossos serviços
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} id="post-registration-form">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="company">Nome da empresa</Label>
                    <Input id="company" placeholder="Digite o nome da sua empresa" required />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" placeholder="00.000.000/0000-00" required />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="segment">Segmento de atuação</Label>
                    <Input id="segment" placeholder="Ex: Tecnologia, Saúde, Varejo" required />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="assets">Patrimônio estimado</Label>
                    <Input id="assets" placeholder="R$ 0,00" required />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="objectives">Objetivos patrimoniais</Label>
                    <Textarea
                      id="objectives"
                      placeholder="Descreva os principais objetivos para a estruturação patrimonial"
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      Autorizo o tratamento dos meus dados de acordo com a Política de Privacidade
                    </Label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => navigate("/")}>
                Voltar
              </Button>
              <Button type="submit" form="post-registration-form" disabled={loading}>
                {loading ? "Enviando..." : "Enviar informações"}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Steps card */}
          <Card>
            <CardHeader>
              <CardTitle>Próximas etapas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <StepItem 
                  icon={<Folder className="h-6 w-6" />}
                  title="Organização de documentos"
                  status="Pendente"
                />
                <StepItem 
                  icon={<Building className="h-6 w-6" />}
                  title="Estruturação Jurídica"
                  status="Pendente"
                  subtasks={[
                    { label: "Desenho da estrutura societária", checked: false },
                    { label: "Aprovação do plano patrimonial", checked: false }
                  ]}
                />
                <StepItem 
                  icon={<FileCheck className="h-6 w-6" />}
                  title="Execução e registro"
                  status="Pendente"
                  subtasks={[
                    { label: "Formalização organizacional", checked: false }
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

// Component for sidebar navigation
const SidebarNav = () => {
  return (
    <aside className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all">
      <div className="p-6 border-b border-gray-800">
        <h2 className="font-semibold text-xl">W1 Consultoria Patrimonial</h2>
      </div>
      <nav className="p-4">
        <NavItem icon="📋" label="Minha jornada" active />
      </nav>
    </aside>
  );
};

// Component for navigation items
const NavItem = ({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) => {
  return (
    <div className={`flex items-center p-2 rounded my-1 cursor-pointer ${active ? 'bg-blue-900' : 'hover:bg-gray-800'}`}>
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </div>
  );
};

// Component for steps
interface StepItemProps {
  icon: React.ReactNode;
  title: string;
  status: "Concluído" | "Em andamento" | "Pendente";
  subtasks?: { label: string; checked: boolean }[];
}

const StepItem = ({ icon, title, status, subtasks }: StepItemProps) => {
  return (
    <div className="flex">
      <div className="mr-4 bg-gray-200 p-3 rounded-full">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">{title}</h3>
          <Button variant="outline" size="sm">Ver detalhes</Button>
        </div>
        <p className={`text-sm ${
          status === "Concluído" ? "text-green-600" : 
          status === "Em andamento" ? "text-blue-600" : "text-gray-500"
        }`}>
          {status}
        </p>
        {subtasks && (
          <div className="mt-2 space-y-1">
            {subtasks.map((task, index) => (
              <div key={index} className="flex items-center">
                <Checkbox id={`task-${index}`} checked={task.checked} className="mr-2" />
                <Label htmlFor={`task-${index}`} className="text-sm font-normal">
                  {task.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostRegistration;