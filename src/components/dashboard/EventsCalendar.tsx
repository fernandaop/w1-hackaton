
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

interface CalendarEvent {
  date: Date;
  type: "dividend" | "payment" | "meeting" | "report";
  title: string;
}

const events: CalendarEvent[] = [
  {
    date: new Date(2025, 4, 16),
    type: "dividend",
    title: "Dividendos PETR4",
  },
  {
    date: new Date(2025, 4, 20),
    type: "payment",
    title: "Pagamento IPTU",
  },
  {
    date: new Date(2025, 4, 25),
    type: "meeting",
    title: "Reunião Anual",
  },
];

export function EventsCalendar() {
  const eventsByDate = events.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    const dateKey = event.date.toISOString().split('T')[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});

  const todaysEvents = events.filter(
    event => event.date.toDateString() === new Date().toDateString()
  );

  const getBadgeColor = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "dividend":
        return "bg-green-500";
      case "payment":
        return "bg-red-500";
      case "meeting":
        return "bg-blue-500";
      case "report":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Calendário Financeiro</CardTitle>
        <CardDescription>Eventos e vencimentos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2">
            <Calendar
              mode="single"
              className="border rounded-md p-3"
              modifiers={{
                hasEvent: (date) => {
                  const dateKey = date.toISOString().split('T')[0];
                  return !!eventsByDate[dateKey];
                },
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
          </div>
          <div className="lg:w-1/2">
            <h3 className="font-medium text-base mb-3">Próximos eventos</h3>
            
            {todaysEvents.length > 0 ? (
              <div className="space-y-3">
                {todaysEvents.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 border rounded-md">
                    <Badge className={getBadgeColor(event.type)}>
                      {event.type === "dividend" && "Dividendo"}
                      {event.type === "payment" && "Pagamento"}
                      {event.type === "meeting" && "Reunião"}
                      {event.type === "report" && "Relatório"}
                    </Badge>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date.toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center p-6 border rounded-md border-dashed">
                <p className="text-muted-foreground">Nenhum evento para hoje</p>
              </div>
            )}
            
            <div className="mt-4">
              <button className="text-sm text-w1.blue hover:underline">
                Ver todos os eventos
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
