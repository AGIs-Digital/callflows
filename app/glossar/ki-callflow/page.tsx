import Head from "next/head";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function KICallflowPage() {
  return (
    <>
      <Head>
        <title>Was ist ein KI‑callflow? Definition, Unterschiede, Vorteile</title>
        <meta name="description" content="KI‑callflow: lernfähiger Gesprächs- und Prozessfluss. Unterschiede zum klassischen Callflow und zu Voice Agents, Vorteile und Einsatz." />
      </Head>
      <main className="bg-background">
        <SiteHeader />
        <div className="relative overflow-hidden">
        <section className="py-20 bg-gradient-to-b from-background via-accent/10 to-primary/5">
          <div className="container max-w-6xl">
            <div className="relative rounded-2xl border bg-card/60 backdrop-blur p-10 md:p-14">
              <div className="absolute -top-24 -right-24 h-64 w-64 rotate-12 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 blur-3xl rounded-full" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">KI‑callflow</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Ein KI‑callflow ist ein lernfähiger Gesprächs‑ und Prozessfluss, der Anliegen versteht,
                Dialoge führt und Systeme anbindet. Er vereint Intent‑Erkennung, Business‑Logik,
                Automationen und Integrationen.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container max-w-6xl grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Unterschied zum klassischen Callflow</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Dynamisch statt statisch: erkennt Absichten, entscheidet kontextabhängig</li>
                <li>• Mehrstufige Prozesse inkl. Rückfragen, Validierungen, Übergaben</li>
                <li>• Nahtlose System‑Integrationen (CRM/ERP/Helpdesk)</li>
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Abgrenzung zu „Voice Agents“</h2>
              <p className="text-muted-foreground">Ein Voice Agent ist die Stimme. Der KI‑callflow orchestriert den gesamten Prozess inkl. Logik, Daten und Aktionen.</p>
            </div>
          </div>
        </section>

        <section className="py-12 pb-20">
          <div className="container max-w-6xl">
            <div className="rounded-xl border bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 p-6">
              <h2 className="text-2xl font-semibold mb-3">Vorteile</h2>
              <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
                <div>24/7 Erreichbarkeit und kürzere Wartezeiten</div>
                <div>Höhere Abschlussquote durch strukturierte Prozessführung</div>
                <div>Transparente, sekundengenaue Abrechnung</div>
              </div>
            </div>
          </div>
        </section>
        </div>
        <SiteFooter />
      </main>
    </>
  );
}


