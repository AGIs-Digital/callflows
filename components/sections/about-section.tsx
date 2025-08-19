"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "@/lib/icons";
import { useI18n } from "@/lib/i18n";

export function AboutSection() {
  const { t, locale } = useI18n();
  
  const getFeatures = () => {
    const features = {
      de: [
        "Individuelle Prozessmodellierung",
        "Persönliches Prompting & Finetuning",
        "Transparente Minutenabrechnung ohne versteckte Kosten",
        "Unbegrenzte Anzahl an Agents",
        "Regelmäßige Check-ins zur Optimierung",
        "Setup, Support und Telefonnummer inklusive"
      ],
      en: [
        "Individual process modeling",
        "Personal prompting & fine-tuning",
        "Transparent per-minute billing without hidden costs",
        "Unlimited number of agents",
        "Regular check-ins for optimization",
        "Setup, support, and phone number included"
      ],
      fr: [
        "Modélisation de processus individuelle",
        "Prompting personnel & ajustement fin",
        "Facturation transparente à la minute sans coûts cachés",
        "Nombre illimité d'agents",
        "Check-ins réguliers pour l'optimisation",
        "Configuration, support et numéro de téléphone inclus"
      ],
      es: [
        "Modelado de procesos individual",
        "Prompting personal y ajuste fino",
        "Facturación transparente por minuto sin costos ocultos",
        "Número ilimitado de agentes",
        "Check-ins regulares para optimización",
        "Configuración, soporte y número de teléfono incluidos"
      ]
    };
    
    return features[locale] || features.de;
  };

  const getMissionPoints = () => {
    const missions = {
      de: [
        "KI greifbar machen.",
        "Kundenkontakt automatisieren – ohne Qualität zu verlieren.",
        "Unternehmen dabei helfen, schneller, schlanker und gleichzeitig menschlicher zu kommunizieren."
      ],
      en: [
        "Make AI tangible.",
        "Automate customer contact – without losing quality.",
        "Help companies communicate faster, leaner, and more humanely at the same time."
      ],
      fr: [
        "Rendre l'IA tangible.",
        "Automatiser le contact client – sans perdre en qualité.",
        "Aider les entreprises à communiquer plus rapidement, plus efficacement et plus humainement à la fois."
      ],
      es: [
        "Hacer la IA tangible.",
        "Automatizar el contacto con el cliente sin perder calidad.",
        "Ayudar a las empresas a comunicarse más rápido, más eficientemente y más humanamente al mismo tiempo."
      ]
    };
    
    return missions[locale] || missions.de;
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-secondary via-secondary/50 to-accent/20">
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Linke Spalte - Überschrift, Text und Bild */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-primary mb-2 underline decoration-accent dark:text-primary">
              {t('about.title')}
            </h2>
            
            <div className="space-y-4">
              <p className="text-lg text-black/75 dark:text-foreground">
                {t('about.intro1')}
              </p>
              <p className="text-lg text-black/75 dark:text-foreground">
                {t('about.intro2')}
              </p>
              <p className="text-lg text-black/75 dark:text-foreground">
                {t('about.intro3')}
              </p>
            </div>
            
            {/* Bild nach dem Text */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mt-6 max-w-md">
              <Image
                src="/images/team.webp"
                alt="Die callflows Gründer"
                title="Das Team von callflows – Experten für KI‑callflows"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Rechte Spalte - Mission & Features */}
          <div className="space-y-8">
            {/* Unsere Mission zuerst */}
            <div className="bg-warm-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-primary dark:text-primary mb-4">
                {t('about.mission')}
              </h3>
              <ul className="space-y-3">
                {getMissionPoints().map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">👉</span>
                    <span className="text-black/75 dark:text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Was uns besonders macht danach */}
            <div className="bg-warm-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-primary dark:text-primary mb-4">
                {t('about.special')}
              </h3>
              <p className="text-black/75 dark:text-foreground mb-4">
                {t('about.specialDescription')}
              </p>
              
              <ul className="space-y-3 mt-4">
                {getFeatures().map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check size={18} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-medium text-black/75 dark:text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xl text-black/75 dark:text-foreground font-medium">
                <strong className="text-primary">callflows</strong> {t('about.teamDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 