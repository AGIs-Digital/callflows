"use client";

import { Check, X, Clock, Users, Phone, Headphones, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

type SolutionProps = {
  title: React.ReactNode;
  icon: React.ReactNode;
  description: string;
  pros: string[];
  cons: string[];
  isHighlighted?: boolean;
};

const Solution = ({ title, icon, description, pros, cons, isHighlighted = false }: SolutionProps) => {
  const { t } = useI18n();
  
  return (
    <div 
      className={cn(
        "relative rounded-xl border border-border p-6 transition-all",
        isHighlighted 
          ? "bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg" 
          : "bg-card hover:shadow-md"
      )}
    >
      {isHighlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
          {t('comparison.modernSolution')}
        </div>
      )}
      <div className="flex items-center gap-4 mb-4">
        <div className={cn(
          "p-3 rounded-full",
          isHighlighted ? "bg-primary text-white" : "bg-muted"
        )}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">{t('comparison.pros')}</h4>
          <ul className="space-y-2">
            {pros.map((pro, index) => (
              <li key={`pro-${index}`} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {cons.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">{t('comparison.cons')}</h4>
            <ul className="space-y-2">
              {cons.map((con, index) => (
                <li key={`con-${index}`} className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export function PricingComparisonSection() {
  const { t, locale } = useI18n();
  
  const getSolutionData = (type: string) => {
    const solutions = {
      de: {
        inhouse: {
          title: "Inhouse-Mitarbeiter",
          description: "Eigene Mitarbeiter übernehmen die Telefonie im Unternehmen.",
          pros: ["Persönlicher Kontakt", "Direkte Kontrolle", "Tiefes Produktwissen"],
          cons: ["Hohe Personalkosten", "Begrenzte Verfügbarkeit", "Krankheits-/Urlaubsvertretung nötig", "Skalierungsprobleme bei Spitzen"]
        },
        phone: {
          title: "Telefonanlage",
          description: "Klassische Telefonanlagen mit Menüführung und Warteschleifen.",
          pros: ["Geringe laufende Kosten", "24/7 Verfügbarkeit", "Einfache Implementierung"],
          cons: ["Keine echte Interaktion", "Frustrierende Benutzererfahrung", "Keine Problemlösung", "Verpasste Verkaufschancen"]
        },
        callcenter: {
          title: "Externes Callcenter",
          description: "Ausgelagerte Telefonie an spezialisierte Dienstleister.",
          pros: ["Flexibel skalierbar", "Erweiterte Verfügbarkeit", "Keine Personalverantwortung"],
          cons: ["Hohe Kosten pro Gespräch", "Qualitätsschwankungen", "Geringeres Produktwissen", "Komplexe Vertragsgestaltung"]
        },
        callflows: {
          title: "callflows",
          description: "KI-basierte Sprachagenten für automatisierte Telefonie.",
          pros: ["Eigenständig denken und handeln", "Natürliche Gesprächsführung", "Automation von Routineaufgaben", "Nahtlose Systemintegration", "Kostengünstig und unkompliziert", "24/7 Verfügbarkeit", "Kein Vorwissen notwendig"],
          cons: []
        }
      },
      en: {
        inhouse: {
          title: "In-house Staff",
          description: "Own employees handle telephony within the company.",
          pros: ["Personal contact", "Direct control", "Deep product knowledge"],
          cons: ["High personnel costs", "Limited availability", "Sick/vacation coverage needed", "Scaling problems during peaks"]
        },
        phone: {
          title: "Phone System",
          description: "Classic phone systems with menu navigation and hold queues.",
          pros: ["Low running costs", "24/7 availability", "Simple implementation"],
          cons: ["No real interaction", "Frustrating user experience", "No problem solving", "Missed sales opportunities"]
        },
        callcenter: {
          title: "External Call Center",
          description: "Outsourced telephony to specialized service providers.",
          pros: ["Flexibly scalable", "Extended availability", "No personnel responsibility"],
          cons: ["High costs per call", "Quality fluctuations", "Less product knowledge", "Complex contract design"]
        },
        callflows: {
          title: "callflows",
          description: "AI-based voice agents for automated telephony.",
          pros: ["Think and act independently", "Natural conversation", "Automation of routine tasks", "Seamless system integration", "Cost-effective and uncomplicated", "24/7 availability", "No prior knowledge required"],
          cons: []
        }
      },
      fr: {
        inhouse: {
          title: "Personnel interne",
          description: "Les propres employés gèrent la téléphonie dans l'entreprise.",
          pros: ["Contact personnel", "Contrôle direct", "Connaissance produit approfondie"],
          cons: ["Coûts de personnel élevés", "Disponibilité limitée", "Remplacement maladie/vacances nécessaire", "Problèmes d'échelle lors des pics"]
        },
        phone: {
          title: "Système téléphonique",
          description: "Systèmes téléphoniques classiques avec navigation menu et files d'attente.",
          pros: ["Faibles coûts de fonctionnement", "Disponibilité 24/7", "Implémentation simple"],
          cons: ["Pas d'interaction réelle", "Expérience utilisateur frustrante", "Pas de résolution de problème", "Opportunités de vente manquées"]
        },
        callcenter: {
          title: "Centre d'appels externe",
          description: "Téléphonie externalisée vers des prestataires spécialisés.",
          pros: ["Évolutivité flexible", "Disponibilité étendue", "Pas de responsabilité personnel"],
          cons: ["Coûts élevés par appel", "Fluctuations de qualité", "Moins de connaissance produit", "Conception contractuelle complexe"]
        },
        callflows: {
          title: "callflows",
          description: "Agents vocaux basés sur l'IA pour la téléphonie automatisée.",
          pros: ["Penser et agir de manière autonome", "Conversation naturelle", "Automatisation des tâches routinières", "Intégration système transparente", "Rentable et simple", "Disponibilité 24/7", "Aucune connaissance préalable requise"],
          cons: []
        }
      },
      es: {
        inhouse: {
          title: "Personal interno",
          description: "Los propios empleados manejan la telefonía dentro de la empresa.",
          pros: ["Contacto personal", "Control directo", "Conocimiento profundo del producto"],
          cons: ["Altos costos de personal", "Disponibilidad limitada", "Cobertura por enfermedad/vacaciones necesaria", "Problemas de escalabilidad en picos"]
        },
        phone: {
          title: "Sistema telefónico",
          description: "Sistemas telefónicos clásicos con navegación de menú y colas de espera.",
          pros: ["Bajos costos operativos", "Disponibilidad 24/7", "Implementación simple"],
          cons: ["Sin interacción real", "Experiencia de usuario frustrante", "Sin resolución de problemas", "Oportunidades de venta perdidas"]
        },
        callcenter: {
          title: "Centro de llamadas externo",
          description: "Telefonía subcontratada a proveedores de servicios especializados.",
          pros: ["Escalabilidad flexible", "Disponibilidad extendida", "Sin responsabilidad de personal"],
          cons: ["Altos costos por llamada", "Fluctuaciones de calidad", "Menor conocimiento del producto", "Diseño contractual complejo"]
        },
        callflows: {
          title: "callflows",
          description: "Agentes de voz basados en IA para telefonía automatizada.",
          pros: ["Pensar y actuar de forma independiente", "Conversación natural", "Automatización de tareas rutinarias", "Integración de sistema sin problemas", "Rentable y sin complicaciones", "Disponibilidad 24/7", "No se requiere conocimiento previo"],
          cons: []
        }
      }
    };
    
    return solutions[locale]?.[type as keyof typeof solutions['de']] || solutions.de[type as keyof typeof solutions['de']];
  };
  
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/10 via-background to-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary dark:text-white mb-6">
            {t('comparison.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('comparison.description')} <strong className="text-primary"> {t('comparison.callflowsText')}</strong>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Solution 
            title={getSolutionData('inhouse').title}
            icon={<Users className="w-5 h-5" />}
            description={getSolutionData('inhouse').description}
            pros={getSolutionData('inhouse').pros}
            cons={getSolutionData('inhouse').cons}
          />
          
          <Solution 
            title={getSolutionData('phone').title}
            icon={<Phone className="w-5 h-5" />}
            description={getSolutionData('phone').description}
            pros={getSolutionData('phone').pros}
            cons={getSolutionData('phone').cons}
          />
          
          <Solution 
            title={getSolutionData('callcenter').title}
            icon={<Headphones className="w-5 h-5" />}
            description={getSolutionData('callcenter').description}
            pros={getSolutionData('callcenter').pros}
            cons={getSolutionData('callcenter').cons}
          />
          
          <Solution 
            title={<strong className='text-primary'>{getSolutionData('callflows').title}</strong>}
            icon={<Bot className="w-5 h-5" />}
            description={getSolutionData('callflows').description}
            pros={getSolutionData('callflows').pros}
            cons={getSolutionData('callflows').cons}
            isHighlighted={true}
          />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('comparison.conclusion')}
          </p>
          
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary font-medium px-4 py-2 rounded-full">
            <Clock className="w-5 h-5" />
            <span>{t('comparison.benefit')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}