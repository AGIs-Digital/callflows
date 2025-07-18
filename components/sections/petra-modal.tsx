"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, ExternalLink, Phone, Target, Search, TrendingUp, MessageSquare, Calendar, CheckCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import Image from "next/image";

interface PetraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PetraModal({ isOpen, onClose }: PetraModalProps) {
  const { t, locale } = useI18n();
  const isGerman = locale === 'de';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="p-8">
            {/* Header with Logo */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <div className="mb-6">
                  <Image
                    src="/images/petra-logo.png"
                    alt="Petra Abeln Logo"
                    width={200}
                    height={80}
                    className="h-16 w-auto"
                  />
                </div>
                
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-primary mb-4">
                    {t('petraUsp.modalTitle')}
                  </DialogTitle>
                </DialogHeader>
              </div>
            </div>

            {/* Content with floating image */}
            <div className="relative">
              {/* Floating Image */}
              <div className="float-right ml-6 mb-4 w-48 flex-shrink-0">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/images/petra-abeln.jpeg"
                    alt="Petra Abeln"
                    width={192}
                    height={240}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-foreground">Petra Abeln</p>
                  <p className="text-xs text-muted-foreground">Unternehmensberaterin</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-xs"
                    onClick={() => window.open('https://www.petra-abeln.de', '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {t('petraUsp.websiteButton')}
                  </Button>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-6 text-justify">
                <p className="text-lg text-foreground leading-relaxed">
                  <strong>{t('petraUsp.modalIntro')}</strong>
                </p>
                
                <p className="text-base text-muted-foreground leading-relaxed">
                  {isGerman ? (
                    "In diesem Seminar zeigen wir, wie moderne Vertriebsteams mithilfe von Telefon-KI gezielt, motiviert und effizient telefonieren – mit echten Chancen statt blinder Kaltakquise."
                  ) : (
                    t('petraUsp.modalDescription')
                  )}
                </p>

                {/* Non-German Language Notice */}
                {!isGerman && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800 font-medium">
                      {t('petraUsp.germanOnlyNotice')}
                    </p>
                  </div>
                )}

                {isGerman && (
                  <>
                    <div className="bg-accent/5 p-6 rounded-lg border-l-4 border-accent">
                      <h3 className="font-semibold text-foreground mb-3">Die Telefon-KI kontaktiert im Vorfeld den Markt:</h3>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-center gap-3">
                          <Search className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>Wer nutzt Zeitarbeit?</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Target className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>Wo gibt es akuten Bedarf?</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <TrendingUp className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>Welche Qualifikationen werden gesucht?</span>
                        </li>
                      </ul>
                    </div>

                <p className="text-base text-muted-foreground leading-relaxed">
                  So entstehen qualifizierte Leads, mit denen Ihre Mitarbeitenden direkt ins Gespräch einsteigen können – 
                  vorbereitet, fokussiert und mit spürbar mehr Motivation.
                </p>

                <p className="text-base text-muted-foreground leading-relaxed">
                  Die KI liefert strukturierte Transkripte aller Gespräche – inklusive Gesprächsinhalten, Reaktionen und 
                  Bedarfsansätzen. Diese Informationen müssen allerdings richtig gelesen und interpretiert werden, um die 
                  passenden Maßnahmen einzuleiten: Nachfassen? Terminvereinbarung? Angebotsversand?
                </p>

                <p className="text-base text-muted-foreground leading-relaxed">
                  Im Seminar trainieren Ihre Mitarbeitenden nicht nur den Umgang mit diesen Daten, sondern auch die 
                  entscheidende nächste Phase: das qualifizierte, persönliche Gespräch.
                </p>

                <div className="bg-accent/5 p-6 rounded-lg">
                  <p className="text-base text-foreground leading-relaxed font-medium">
                    <strong>Denn hier ist die KI (noch) am Ende</strong> – Vertrauen aufbauen, Einwände klären und 
                    zielgerichtet zum Abschluss führen bleibt Aufgabe des Menschen.
                  </p>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed">
                  Ziel ist es, die Brücke zu schlagen zwischen datengestütztem Vertrieb und menschlicher Verkaufskompetenz. 
                  Damit aus Chancen echte Kundenbeziehungen werden – effizient, professionell und erfolgreich.
                </p>

                {/* Seminar Contents */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-primary mb-6">Seminarinhalte auf einen Blick</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-card p-4 rounded-lg border">
                        <h4 className="font-semibold text-foreground mb-3 text-left">KI im Vertriebsprozess gezielt einsetzen</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <TrendingUp className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>Marktanalyse automatisieren: Wer nutzt Zeitarbeit, wo besteht Bedarf?</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>Qualifizierte Leads statt Streuverlust</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-card p-4 rounded-lg border">
                        <h4 className="font-semibold text-foreground mb-3 text-left">KI-Transkripte richtig lesen und nutzen</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <MessageSquare className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>Gesprächsinhalte und Reaktionen auswerten</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Calendar className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>Passende Maßnahmen ableiten: nachfassen, terminieren, strategische Kontaktkette, abschließen</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-card p-4 rounded-lg border">
                        <h4 className="font-semibold text-foreground mb-3 text-left">Gezielte Gesprächseinstiege trainieren</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>Aufhänger nutzen, Bedarfe direkt ansprechen</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-card p-4 rounded-lg border">
                        <h4 className="font-semibold text-foreground mb-3 text-left">Souveräne Gesprächsführung mit Abschlussorientierung</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <Users className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>Vertrauen aufbauen und Gespräche lenken</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>Einwände erkennen, entkräften und zum Abschluss führen</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-card p-4 rounded-lg border">
                        <h4 className="font-semibold text-foreground mb-3 text-left">Mitarbeitermotivation stärken</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li className="flex items-start gap-2">
                            <TrendingUp className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>Fokus auf relevante Kontakte steigert Wirksamkeit und Zufriedenheit</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>Erfolgreiche Gespräche statt frustrierende Kaltakquise</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 