import { PricingPlan, MinutePackage } from "@/lib/types/pricing";

export const monthlyPlans: PricingPlan[] = [
  {
    name: "Starter",
    type: "starter",
    subtitle: "Für kleine Betriebe",
    price: 0.89,
    minutesIncluded: 1000,
    highlights: [
      "Ideal für geringe Inbound-/Outbound-Kommunikation",
      "Perfekt für den Einstieg in die KI-Telefonie",
      "Für kleine Teams geeignet"
    ],
    cta: "Jetzt beraten lassen",
    popular: false,
    discounts: {
      sixMonths: 0,  // 0% Rabatt bei 6-Monats-Vertrag
      twelveMonths: 10  // 10% Rabatt bei 12-Monats-Vertrag
    }
  },
  {
    name: "Professional",
    type: "professional",
    subtitle: "Für mittelständische Betriebe",
    price: 0.79,
    minutesIncluded: 3000,
    highlights: [
      "Ideal für moderate Inbound-/Outbound-Kommunikation",
      "Kann eine Vollzeitkraft im Telefonbereich ersetzen",
      "Perfekt um Ihr Unternehmen zu unterstützen"
    ],
    cta: "Jetzt beraten lassen",
    popular: false,
    discounts: {
      sixMonths: 0,  // 0% Rabatt bei 6-Monats-Vertrag
      twelveMonths: 10  // 10% Rabatt bei 12-Monats-Vertrag
    }
  },
  {
    name: "Corporate",
    type: "corporate",
    subtitle: "Für höhere Anrufvolumina",
    price: 0.69,
    minutesIncluded: 12000,
    highlights: [
      "Für Zeitarbeitsunternehmen, Vertriebsteams, Kundendienst",
      "Automatisiert eine ganze Abteilung oder einen Standort",
      "Ideal für Unternehmen mit hohem Telefonaufkommen"
    ],
    cta: "Jetzt beraten lassen",
    popular: false,
    discounts: {
      sixMonths: 0,  // 0% Rabatt bei 6-Monats-Vertrag
      twelveMonths: 10  // 10% Rabatt bei 12-Monats-Vertrag
    }
  },
  {
    name: "Individuell",
    type: "custom",
    subtitle: "Maßgeschneiderte Lösungen",
    price: 0, // Preis auf Anfrage
    minutesIncluded: 0, // Kontingent auf Anfrage
    highlights: [
      "Für Unternehmen mit speziellen Anforderungen",
      "Individuelles Minutenkontingent nach Bedarf",
      "Persönliche Beratung und maßgeschneiderte Lösung",
      "Optimale Skalierung für große Unternehmen"
    ],
    cta: "Individuelles Angebot",
    popular: true,
    isCustom: true
  }
];

export const minutePackages: MinutePackage[] = [
  {
    name: "Zusatzminuten 1.000",
    minutes: 1000,
    pricePerMinute: 0.90,
    totalPrice: 900,
    savings: "ca. 9%",
    description: "Entspricht einer Sekretärin halbtags"
  },
  {
    name: "Zusatzminuten 5.000",
    minutes: 5000,
    pricePerMinute: 0.85,
    totalPrice: 4250,
    savings: "ca. 14%",
    description: "Entspricht einem kleinen Vertriebsteam"
  },
  {
    name: "Zusatzminuten 10.000",
    minutes: 10000,
    pricePerMinute: 0.82,
    totalPrice: 8200,
    savings: "ca. 17%",
    description: "Entspricht einem größeren Vertriebsteam"
  },
  {
    name: "Individuelles Paket",
    minutes: 0,
    pricePerMinute: 0,
    totalPrice: 0,
    savings: "Auf Anfrage",
    description: "Maßgeschneiderte Lösung für Ihr Unternehmen",
    isCustom: true
  }
];