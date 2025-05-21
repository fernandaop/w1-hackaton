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
import { userService } from "@/services/api";

const PostRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [progress] = useState(0);
  const [loading, setLoading] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [industrySegment, setIndustrySegment] = useState("");
  const [estimatedWealth, setEstimatedWealth] = useState("");
  const [assetGoals, setAssetGoals] = useState("");
  const [companyFoundationDate, setCompanyFoundationDate] = useState("");
  const [numberOfPartners, setNumberOfPartners] = useState("");
  const [mainAssets, setMainAssets] = useState("");
  const [hasInternationalAssets, setHasInternationalAssets] = useState(false);
  const [hasFamilyProtocol, setHasFamilyProtocol] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast({
        title: "Erro",
        description: "Usuário não encontrado. Refaça o cadastro.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await userService.saveAdditionalInfo(userId, {
        companyName,
        cnpj,
        industrySegment,
        estimatedWealth,
        assetGoals,
        companyFoundationDate,
        numberOfPartners,
        mainAssets,
        hasInternationalAssets,
        hasFamilyProtocol
      });

      toast({
        title: "Informações enviadas",
        description: "Suas informações foram salvas com sucesso.",
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro ao enviar informações adicionais:", err);
      toast({
        title: "Erro",
        description: "Não foi possível salvar os dados.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Sua jornada de construção da Holding</h1>
          <Separator className="mb-6" />
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-medium">{progress}%</span>
              <span className="text-sm text-gray-500">Etapa atual: Informações adicionais</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
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
                    <Input id="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="segment">Segmento de atuação</Label>
                    <Input id="segment" value={industrySegment} onChange={(e) => setIndustrySegment(e.target.value)} required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="assets">Patrimônio estimado</Label>
                    <Input id="assets" value={estimatedWealth} onChange={(e) => setEstimatedWealth(e.target.value)} required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="objectives">Objetivos patrimoniais</Label>
                    <Textarea id="objectives" value={assetGoals} onChange={(e) => setAssetGoals(e.target.value)} className="min-h-[100px]" required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="foundation">Data de Fundação da Empresa</Label>
                    <Input id="foundation" type="date" value={companyFoundationDate} onChange={(e) => setCompanyFoundationDate(e.target.value)} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="partners">Número de Sócios</Label>
                    <Input id="partners" type="number" value={numberOfPartners} onChange={(e) => setNumberOfPartners(e.target.value)} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="mainAssets">Principais Ativos</Label>
                    <Textarea id="mainAssets" value={mainAssets} onChange={(e) => setMainAssets(e.target.value)} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="internationalAssets" checked={hasInternationalAssets} onCheckedChange={() => setHasInternationalAssets(!hasInternationalAssets)} />
                    <Label htmlFor="internationalAssets">Possui ativos no exterior</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="familyProtocol" checked={hasFamilyProtocol} onCheckedChange={() => setHasFamilyProtocol(!hasFamilyProtocol)} />
                    <Label htmlFor="familyProtocol">Possui protocolo familiar</Label>
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
              <Button variant="outline" onClick={() => navigate("/")}>Voltar</Button>
              <Button type="submit" form="post-registration-form" disabled={loading}>{loading ? "Enviando..." : "Enviar informações"}</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas etapas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <StepItem icon={<Folder className="h-6 w-6" />} title="Organização de documentos" status="Em desenvolvimento" />
                <StepItem icon={<Building className="h-6 w-6" />} title="Estruturação Jurídica" status="Em desenvolvimento" />
                <StepItem icon={<FileCheck className="h-6 w-6" />} title="Execução e registro" status="Em desenvolvimento"  />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};


interface StepItemProps {
  icon: React.ReactNode;
  title: string;
  status: "Concluído" | "Em desenvolvimento" | "Pendente";
  subtasks?: { label: string; checked: boolean }[];
}

const StepItem = ({ icon, title, status, subtasks }: StepItemProps) => (
  <div className="flex">
    <div className="mr-4 bg-gray-200 p-3 rounded-full">{icon}</div>
    <div className="flex-1">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg">{title}</h3>
      </div>
      <p className={`text-sm ${status === "Concluído" ? "text-green-600" : status === "Em desenvolvimento" ? "text-blue-600" : "text-gray-500"}`}>{status}</p>
      {subtasks && (
        <div className="mt-2 space-y-1">
          {subtasks.map((task, index) => (
            <div key={index} className="flex items-center">
              <Checkbox id={`task-${index}`} checked={task.checked} className="mr-2" />
              <Label htmlFor={`task-${index}`} className="text-sm font-normal">{task.label}</Label>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default PostRegistration;
