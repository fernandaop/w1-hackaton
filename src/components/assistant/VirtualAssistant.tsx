
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Lightbulb, Send } from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export function VirtualAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Olá! Sou a assistente virtual da W1 Consultoria. Como posso ajudá-lo hoje?",
      sender: "assistant",
      timestamp: new Date(),
    }
  ]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput("");
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        content: getAssistantResponse(input),
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    }, 1000);
  };

  const getAssistantResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("holding") || lowerQuery.includes("estrutura")) {
      return "Uma holding pode otimizar sua estrutura patrimonial de várias formas. Posso ajudar com uma simulação personalizada ou agendar uma reunião com um consultor para discutir detalhes específicos do seu caso.";
    } else if (lowerQuery.includes("imposto") || lowerQuery.includes("tributação")) {
      return "A estruturação adequada pode reduzir significativamente sua carga tributária. Nossa análise inicial mostra oportunidades de economia em ITCMD e IR. Gostaria de uma simulação detalhada?";
    } else if (lowerQuery.includes("investimento") || lowerQuery.includes("aplicação")) {
      return "Seu perfil de investimentos atual tem um bom balanço, mas identificamos oportunidades para melhorar o rendimento em renda fixa e diversificar mais seu portfólio internacional.";
    } else {
      return "Entendi sua pergunta. Posso ajudar com informações sobre estruturação patrimonial, planejamento sucessório, otimização fiscal ou análise de investimentos. Por favor, me diga mais sobre o que você precisa.";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="bg-w1.coral rounded-full p-1">
            <Lightbulb className="h-4 w-4 text-white" />
          </div>
          Assistente Virtual
        </CardTitle>
        <CardDescription>
          Consulte informações e análises instantâneas
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[360px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" 
                      ? "bg-w1.blue text-white" 
                      : "bg-muted"
                  }`}
                >
                  {message.sender === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <div className="bg-w1.coral rounded-full w-full h-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">W1</span>
                        </div>
                      </Avatar>
                      <span className="text-xs font-medium">Assistente W1</span>
                    </div>
                  )}
                  <p className={`text-sm ${message.sender === "user" ? "text-white" : ""}`}>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Como funciona uma holding?</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Redução de impostos</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">Analisar investimentos</Badge>
          </div>
          <div className="flex gap-2">
            <Input 
              placeholder="Digite sua pergunta..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="bg-w1.purple hover:bg-purple-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
