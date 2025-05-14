
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BarChart, Calendar, ChartPie, ArrowRight, Check, Shield, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-w1.light dark:bg-w1.dark">
      {/* Hero Section */}
      <header className="w-full bg-w1.primary py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-md w-8 h-8 flex items-center justify-center">
              <span className="text-w1.primary font-display font-bold text-lg">W1</span>
            </div>
            <span className="font-display font-semibold text-xl text-white">W1 Consult</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="#features" className="text-white hover:text-gray-200">Recursos</Link>
            <Link to="#benefits" className="text-white hover:text-gray-200">Benefícios</Link>
            <Link to="#contact" className="text-white hover:text-gray-200">Contato</Link>
          </div>
          
          <Link to="/dashboard">
            <Button className="bg-white text-w1.primary hover:bg-gray-100">
              Acessar Plataforma
            </Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-w1.dark to-w1.primary py-16 md:py-24 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                  Gerencie seu patrimônio com inteligência
                </h1>
                <p className="text-xl mb-8 text-gray-200 max-w-xl">
                  Uma plataforma completa para consultoria patrimonial, simulação de holdings e monitoramento de ativos em tempo real.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-w1.purple hover:bg-purple-600">
                      Começar Agora
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="#features">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Conhecer Recursos
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <img
                    src="/lovable-uploads/1182d4c6-19b5-4b76-b0b1-7281be6b7e6a.png"
                    alt="W1 Case - Mind Map"
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white dark:bg-w1.dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Recursos Principais
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nossa plataforma oferece ferramentas poderosas para acompanhamento e planejamento patrimonial
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="feature-card">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-w1.blue/10 p-3 rounded-full mb-4">
                    <BarChart className="h-6 w-6 text-w1.blue" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Dashboard Completo</h3>
                  <p className="text-muted-foreground">
                    Visualize todos seus ativos e indicadores em um único painel personalizado.
                  </p>
                </div>
              </Card>
              
              <Card className="feature-card">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-w1.purple/10 p-3 rounded-full mb-4">
                    <ChartPie className="h-6 w-6 text-w1.purple" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Simulador Avançado</h3>
                  <p className="text-muted-foreground">
                    Compare diferentes cenários de estruturação patrimonial e fiscais.
                  </p>
                </div>
              </Card>
              
              <Card className="feature-card">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-w1.green/10 p-3 rounded-full mb-4">
                    <Users className="h-6 w-6 text-w1.green" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Assistente Virtual</h3>
                  <p className="text-muted-foreground">
                    Tire dúvidas e receba análises rápidas com nossa IA especializada.
                  </p>
                </div>
              </Card>
              
              <Card className="feature-card">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-w1.coral/10 p-3 rounded-full mb-4">
                    <Calendar className="h-6 w-6 text-w1.coral" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Calendário Financeiro</h3>
                  <p className="text-muted-foreground">
                    Acompanhe eventos, vencimentos e obrigações importantes.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 bg-gray-50 dark:bg-w1.primary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Benefícios da Plataforma
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Otimize seu planejamento patrimonial e aumente a proteção dos seus ativos
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-w1.green rounded-full p-1 mt-1">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Otimização Fiscal</h3>
                  <p className="text-muted-foreground">
                    Reduza significativamente a carga tributária sobre seu patrimônio com estratégias legais e seguras.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-w1.green rounded-full p-1 mt-1">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Planejamento Sucessório</h3>
                  <p className="text-muted-foreground">
                    Garanta a transferência eficiente e segura do patrimônio para as próximas gerações.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-w1.green rounded-full p-1 mt-1">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Proteção Patrimonial</h3>
                  <p className="text-muted-foreground">
                    Proteja seus bens contra riscos empresariais e pessoais através de estruturas jurídicas adequadas.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-w1.green rounded-full p-1 mt-1">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Gestão Integrada</h3>
                  <p className="text-muted-foreground">
                    Centralize todas as informações e obtenha uma visão completa do seu patrimônio em um só lugar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 animated-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Revolucione a gestão do seu patrimônio
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Entre na plataforma agora e descubra como podemos ajudar a proteger e otimizar seus ativos.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-w1.primary hover:bg-gray-100">
                Acessar Plataforma
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-w1.dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white rounded-md w-8 h-8 flex items-center justify-center">
                  <span className="text-w1.primary font-display font-bold text-lg">W1</span>
                </div>
                <span className="font-display font-semibold text-xl">W1 Consult</span>
              </div>
              <p className="text-gray-300 mb-4">
                Soluções inovadoras em consultoria patrimonial e estruturação de holdings.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><Link to="#features" className="text-gray-300 hover:text-white">Recursos</Link></li>
                <li><Link to="#benefits" className="text-gray-300 hover:text-white">Benefícios</Link></li>
                <li><Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>
                <li><Link to="/simulator" className="text-gray-300 hover:text-white">Simulador</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <p className="text-gray-300 mb-2">contato@w1consult.com.br</p>
              <p className="text-gray-300 mb-2">+55 (11) 3456-7890</p>
              <p className="text-gray-300">São Paulo, SP - Brasil</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 W1 Consultoria. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
