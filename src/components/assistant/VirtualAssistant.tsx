import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Send } from "lucide-react";
import { userService } from "@/services/api";
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
    },
  ]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        const errorMsg: Message = {
          id: messages.length + 2,
          content: "Usuário não autenticado.",
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMsg]);
        return;
      }

    // Respostas manuais para perguntas frequentes
    const manualAnswers: Record<string, string> = {
      "como funciona uma holding": "Uma holding é uma empresa criada para controlar outras empresas ou bens, facilitando a gestão patrimonial, sucessão familiar e planejamento tributário.",
      "redução de impostos": "A redução de impostos pode ser feita por meio de planejamento tributário, como criação de holding, escolha do regime adequado e aproveitamento de incentivos fiscais.",
      "analisar investimentos": "Para analisar investimentos, verifique rentabilidade histórica, risco, liquidez e se está alinhado aos seus objetivos patrimoniais.",
    };

    const lowerInput = input.toLowerCase().trim();
    for (const key in manualAnswers) {
      if (lowerInput.includes(key)) {
        const assistantMessage: Message = {
          id: messages.length + 2,
          content: manualAnswers[key],
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        return;
      }
    }

    // Se não houver resposta manual, segue com a IA
    const res = await userService.askAssistant(userId, input);
    const assistantMessage: Message = {
      id: messages.length + 2,
      content: res.answer || "Desculpe, não encontrei uma resposta.",
      sender: "assistant",
      timestamp: new Date(),
    };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Erro ao buscar resposta da IA:", err);
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
          content: "Ocorreu um erro ao tentar obter a resposta da assistente.",
          sender: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="bg-w1.coral rounded-full p-1">
            <Lightbulb className="h-4 w-4 text-black" />
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
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-w1.blue text-black" : "bg-muted"
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
                  <p className={`text-sm ${message.sender === "user" ? "text-white" : ""}`}>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="border-t p-4">
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setInput("Como funciona uma holding?")}>Como funciona uma holding?</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setInput("Redução de impostos")}>Redução de impostos</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setInput("Analisar investimentos")}>Analisar investimentos</Badge>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua pergunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="bg-purple-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
