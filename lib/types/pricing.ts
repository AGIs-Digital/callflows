// Pricing Types
import { DivideIcon as LucideIcon } from "lucide-react";

export interface PricingPlan {
  name: string;
  type: 'starter' | 'business' | 'enterprise';
  subtitle: string;
  price: number;
  earlyBirdPrice?: number;
  minutesIncluded: number;
  highlights: string[];
  cta: string;
  popular: boolean;
}

export interface MinutePackage {
  name: string;
  minutes: number;
  pricePerMinute: number;
  totalPrice: number;
  savings: string;
  description: string;
}

export interface PricingFeature {
  icon: typeof LucideIcon;
  title: string;
  description: string;
}

export interface PricingFAQ {
  question: string;
  answer: string;
}