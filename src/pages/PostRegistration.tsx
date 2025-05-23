import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Folder, Building, FileCheck } from "lucide-react";
import { userService } from "@/services/api";

const PostRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState("");
  const [investedAmount, setInvestedAmount] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventAmount, setEventAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast({ title: "Erro", description: "Usuário não encontrado.", variant: "destructive" });
      setLoading(false);
      return;
    }
    try {
      await userService.saveAdditionalInfo(userId, {
        companyName, cnpj, industrySegment, estimatedWealth, assetGoals,
        companyFoundationDate, numberOfPartners, mainAssets,
        hasInternationalAssets, hasFamilyProtocol
      });
      toast({ title: "Informações enviadas", description: "Sucesso." });
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro:", err);
      toast({ title: "Erro", description: "Não foi possível salvar.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleInvestmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      const payload = {
        assetName, category, investedAmount, currentValue,
        eventDate, eventType, eventDescription, eventAmount,
      };
      Object.keys(payload).forEach(key => {
        if (payload[key] === "" || payload[key] === null) delete payload[key];
      });
      await userService.saveInvestment(userId, payload);
      toast({ title: "Investimento salvo", description: "Sucesso." });
      setAssetName(""); setCategory(""); setInvestedAmount("");
      setCurrentValue(""); setEventDate(""); setEventType("");
      setEventDescription(""); setEventAmount("");
    } catch (err) {
      console.error("Erro:", err);
      toast({ title: "Erro", description: "Não foi possível salvar investimento", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 p-6">
        <div className="pt-10 pb-10">
          <h1 className="text-3xl font-bold mb-1 tracking-tight leading-snug">Sua jornada de construção da Holding</h1>
          <Separator className="mb-6" />

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informações adicionais</CardTitle>
              <CardDescription>Personalize nossos serviços</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} id="post-registration-form">
                <div className="grid gap-6">
                  <Input id="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Nome da empresa" />
                  <Input id="cnpj" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="CNPJ" />
                  <Input id="segment" value={industrySegment} onChange={(e) => setIndustrySegment(e.target.value)} placeholder="Segmento" />
                  <Input id="assets" value={estimatedWealth} onChange={(e) => setEstimatedWealth(e.target.value)} placeholder="Patrimônio estimado" />
                  <Textarea id="objectives" value={assetGoals} onChange={(e) => setAssetGoals(e.target.value)} className="min-h-[100px]" placeholder="Objetivos" />
                  <Input id="foundation" type="date" value={companyFoundationDate} onChange={(e) => setCompanyFoundationDate(e.target.value)} />
                  <Input id="partners" type="number" value={numberOfPartners} onChange={(e) => setNumberOfPartners(e.target.value)} placeholder="Número de sócios" />
                  <Textarea id="mainAssets" value={mainAssets} onChange={(e) => setMainAssets(e.target.value)} placeholder="Principais ativos" />
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
                    <Label htmlFor="terms" className="text-sm font-normal">Autorizo o tratamento de dados</Label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => navigate("/")}>Voltar</Button>
              <Button type="submit" form="post-registration-form" disabled={loading}>{loading ? "Enviando..." : "Enviar"}</Button>
            </CardFooter>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Adicionar Investimentos</CardTitle>
              <CardDescription>Cadastre seus ativos</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInvestmentSubmit} id="investment-form">
                <div className="grid gap-6">
                  <Input id="assetName" value={assetName} onChange={(e) => setAssetName(e.target.value)} placeholder="Nome do ativo" />
                  <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Categoria" />
                  <Input id="investedAmount" type="number" value={investedAmount} onChange={(e) => setInvestedAmount(e.target.value)} placeholder="Valor investido" />
                  <Input id="currentValue" type="number" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} placeholder="Valor atual" />
                  <Input id="eventDate" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                  <Input id="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)} placeholder="Tipo do evento" />
                  <Textarea id="eventDescription" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="Descrição do evento" />
                  <Input id="eventAmount" type="number" value={eventAmount} onChange={(e) => setEventAmount(e.target.value)} placeholder="Valor do evento" />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button type="submit" form="investment-form" disabled={loading}>{loading ? "Salvando..." : "Salvar Investimento"}</Button>
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
                <StepItem icon={<FileCheck className="h-6 w-6" />} title="Execução e registro" status="Em desenvolvimento" />
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