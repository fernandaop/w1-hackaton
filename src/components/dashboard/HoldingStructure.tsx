
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function HoldingStructure() {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Estrutura de Holdings</CardTitle>
        <CardDescription>Visualização atual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative border rounded-lg p-6 min-h-[200px] flex items-center justify-center">
          <div className="text-center bg-w1.primary text-white p-4 rounded-full w-40 h-40 flex items-center justify-center">
            <div>
              <p className="font-bold">Holding Principal</p>
              <p className="text-sm">W1 Patrimonial</p>
            </div>
          </div>
          
          {/* Conectores e sub-holdings */}
          <div className="absolute top-1/2 left-[calc(50%-140px)] h-0.5 w-20 bg-border"></div>
          <div className="absolute top-1/2 right-[calc(50%-140px)] h-0.5 w-20 bg-border"></div>
          <div className="absolute top-[calc(50%-20px)] left-[calc(50%-160px)] h-40 w-0.5 bg-border"></div>
          <div className="absolute top-[calc(50%-20px)] right-[calc(50%-160px)] h-40 w-0.5 bg-border"></div>
          
          <div className="absolute top-1/4 left-10 bg-w1.blue text-white p-3 rounded-lg">
            <p className="font-semibold">Imobiliária</p>
            <p className="text-xs">3 imóveis</p>
          </div>
          
          <div className="absolute bottom-1/4 left-10 bg-w1.green text-white p-3 rounded-lg">
            <p className="font-semibold">Investimentos</p>
            <p className="text-xs">Ações e RF</p>
          </div>
          
          <div className="absolute top-1/4 right-10 bg-w1.purple text-white p-3 rounded-lg">
            <p className="font-semibold">Internacional</p>
            <p className="text-xs">Offshore</p>
          </div>
          
          <div className="absolute bottom-1/4 right-10 bg-w1.coral text-white p-3 rounded-lg">
            <p className="font-semibold">Participações</p>
            <p className="text-xs">Empresas</p>
          </div>
        </div>
        <div className="mt-4">
          <button className="text-sm text-w1.blue hover:underline">
            Ver estrutura detalhada
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
