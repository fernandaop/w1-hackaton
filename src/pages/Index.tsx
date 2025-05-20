
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
          <img
            src="/W1 Tagline.png"
            alt="Logo W1"
            className="w-36 h-auto object-contain"
          />
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="#features" className="text-white hover:text-gray-200">Recursos</Link>
            <Link to="#benefits" className="text-white hover:text-gray-200">Benefícios</Link>
            <Link to="#contact" className="text-white hover:text-gray-200">Contato</Link>
          </div>
          
          <Link to="/login">
          <Button className="bg-white text-w1-navy hover:bg-gray-100">
            Acessar Plataforma
          </Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-hero-pattern bg-cover bg-center py-16 md:py-24 text-white">
          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black/60 z-0" />

          {/* Conteúdo acima da imagem + overlay */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                  Gerencie seu patrimônio com inteligência
                </h1>
                <p className="text-xl mb-8 text-white">
                  Uma plataforma completa para consultoria patrimonial, simulação de holdings e monitoramento de ativos em tempo real.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/login">
                    <Button
                      size="lg"
                      className="bg-w1-navy_clear hover:bg-w1-navy_clear_click text-black"
                    >
                      Começar Agora
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
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
              <p className="text-muted-foreground mx-auto">
                Nossa plataforma oferece ferramentas para acompanhamento e planejamento patrimonial
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

        {/* CTA Section */}
        <section className="bg-w1-navy py-16 md:py-24 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Revolucione a gestão do seu patrimônio
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Entre na plataforma agora e descubra como podemos ajudar a proteger e otimizar seus ativos.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Acessar Plataforma
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-w1.dark text-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
            <h3 className="text-lg font-semibold mb-4">Atendimento W1</h3>
            </div>
            
            <div>
              <p className="text-black font-semibold">Telefone</p>
              <p className="text-blck-300 mb-2">+55 (11) 4301-7007</p>
              <p className="text-black font-semibold">WhatsApp</p>
              <p className="text-black-300 mb-2">
                <a href="https://wa.me/551143017007" target="_blank" rel="noopener noreferrer" className="underline">
                  +55 (11) 4301-7007
                </a>
              </p>
            </div>
            
            <div>

            
            <div className="mb-4">
              <p className="text-black font-semibold">Ouvidoria XP</p>
              <p className="text-black-300 mb-2">0800-722-3730</p>
            </div>

            <p className="text-black-300">
              Segunda a sexta-feira (exceto feriados),
            </p>
            <p className="text-black-300 mb-2">das 9h às 18h</p>
          </div>

          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-black-400">© 2025 W1 Consultoria. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
