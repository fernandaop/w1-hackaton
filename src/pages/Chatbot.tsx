import { AppLayout } from "@/components/layout/AppLayout";
import { VirtualAssistant } from "@/components/assistant/VirtualAssistant";

const Chatbot = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Consultor Virtual</h1>
        <p className="text-muted-foreground">
          Tire dúvidas e receba orientações do nosso assistente inteligente
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <VirtualAssistant />
      </div>
    </AppLayout>
  );
};

export default Chatbot;
