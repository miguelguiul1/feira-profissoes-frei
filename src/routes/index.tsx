import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/site-header";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { InstituteSection } from "@/components/landing/institute-section";
import { CoursesSection } from "@/components/landing/courses-section";
import { ReasonsSection } from "@/components/landing/reasons-section";
import { ScheduleSection } from "@/components/landing/schedule-section";
import { PartnersSection } from "@/components/landing/partners-section";
import { InscriptionSection } from "@/components/landing/inscription-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { AdminLoginDialog } from "@/components/landing/admin-login-dialog";

const TITLE = "6ª Feira das Profissões FREI | Instituto Social Nossa Senhora de Fátima";
const DESCRIPTION =
  "Participe da 6ª Feira das Profissões do Instituto Social Nossa Senhora de Fátima em 19/09/2026. Evento gratuito com cursos técnicos, palestras e oficinas em São Paulo.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onOpenAdmin={() => setAdminOpen(true)} />
      <main>
        <HeroCarousel />
        <InstituteSection />
        <CoursesSection />
        <ReasonsSection />
        <ScheduleSection />
        <PartnersSection />
        <InscriptionSection />
      </main>
      <SiteFooter />
      <AdminLoginDialog open={adminOpen} onOpenChange={setAdminOpen} />
    </div>
  );
}
