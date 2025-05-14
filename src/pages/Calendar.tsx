
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Vencimento IPTU",
    date: new Date(2025, 4, 15),
    type: "payment",
    description: "Pagamento referente ao imóvel na Rua Augusta",
    amount: "R$ 3.200,00"
  },
  {
    id: 2,
    title: "Dividendos PETR4",
    date: new Date(2025, 4, 16),
    type: "dividend",
    description: "Pagamento de dividendos de ações Petrobras",
    amount: "R$ 1.850,00"
  },
  {
    id: 3,
    title: "Reunião Consultoria",
    date: new Date(2025, 4, 18),
    type: "meeting",
    description: "Revisão de estratégia tributária com consultor",
    location: "Online - Zoom"
  },
  {
    id: 4,
    title: "Vencimento Seguro",
    date: new Date(2025, 4, 22),
    type: "payment",
    description: "Renovação anual do seguro residencial",
    amount: "R$ 2.400,00"
  },
  {
    id: 5,
    title: "Distribuição de Lucros",
    date: new Date(2025, 4, 28),
    type: "dividend",
    description: "Distribuição de lucros da Empresa ABC Ltda",
    amount: "R$ 15.000,00"
  }
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState("month");

  const getEventsByDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Get events for the selected date
  const selectedDateEvents = date ? getEventsByDate(date) : [];

  // Get events for the current month
  const currentMonthEvents = events.filter(event => 
    event.date.getMonth() === (date?.getMonth() || new Date().getMonth())
  ).sort((a, b) => a.date.getTime() - b.date.getTime());

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "payment":
        return "bg-red-500";
      case "dividend":
        return "bg-green-500";
      case "meeting":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Calendário Financeiro</h1>
        <p className="text-muted-foreground">
          Acompanhe vencimentos, recebimentos e eventos importantes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Calendário de Eventos</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => {
                    if (!date) return;
                    const newDate = new Date(date);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setDate(newDate);
                  }}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="min-w-[120px]">
                    {date ? new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date) : '-'}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => {
                    if (!date) return;
                    const newDate = new Date(date);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setDate(newDate);
                  }}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={view} onValueChange={setView}>
                <TabsList className="mb-4 grid w-full grid-cols-3">
                  <TabsTrigger value="month">Mês</TabsTrigger>
                  <TabsTrigger value="week">Semana</TabsTrigger>
                  <TabsTrigger value="day">Dia</TabsTrigger>
                </TabsList>

                <TabsContent value="month" className="mt-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    modifiers={{
                      hasEvent: (date) => getEventsByDate(date).length > 0
                    }}
                    modifiersStyles={{
                      hasEvent: {
                        fontWeight: "bold",
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                        textDecorationColor: "#3B7DED",
                      },
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="week" className="mt-0">
                  <div className="flex items-center justify-center h-72 border rounded-md">
                    <p className="text-muted-foreground">Visão semanal em desenvolvimento</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="day" className="mt-0">
                  <div className="flex items-center justify-center h-72 border rounded-md">
                    <p className="text-muted-foreground">Visão diária em desenvolvimento</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Eventos do Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentMonthEvents.length > 0 ? (
                  currentMonthEvents.map((event) => (
                    <div key={event.id} className="flex p-3 border rounded-md">
                      <div className="mr-3 text-center min-w-[40px]">
                        <p className="text-sm font-bold">
                          {event.date.getDate()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(event.date)}
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{event.title}</p>
                          <Badge className={getEventBadgeColor(event.type)}>
                            {event.type === "payment" && "Pagamento"}
                            {event.type === "dividend" && "Dividendo"}
                            {event.type === "meeting" && "Reunião"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {event.description}
                        </p>
                        {event.amount && (
                          <p className={`text-sm ${event.type === "dividend" ? "text-green-600" : "text-red-600"}`}>
                            {event.amount}
                          </p>
                        )}
                        {event.location && (
                          <p className="text-sm text-muted-foreground">
                            Local: {event.location}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center p-8 border rounded-md border-dashed">
                    <p className="text-muted-foreground text-center">
                      Nenhum evento no mês atual
                    </p>
                  </div>
                )}

                {selectedDateEvents.length > 0 && (
                  <div className="pt-4 mt-4 border-t">
                    <h3 className="font-medium mb-2">
                      Eventos para {date?.toLocaleDateString('pt-BR')}
                    </h3>
                    <div className="space-y-2">
                      {selectedDateEvents.map((event) => (
                        <div key={`selected-${event.id}`} className="p-2 bg-muted rounded-md">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{event.title}</p>
                            <Badge className={getEventBadgeColor(event.type)}>
                              {event.type === "payment" && "Pagamento"}
                              {event.type === "dividend" && "Dividendo"}
                              {event.type === "meeting" && "Reunião"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {event.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CalendarPage;
