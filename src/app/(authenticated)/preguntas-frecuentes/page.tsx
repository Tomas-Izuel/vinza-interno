import { getFaqs } from "@/api/faq/faq.service";
import { ListaFaq } from "@/components/faq/ListaFaq";
import { NewFaq } from "@/components/faq/NewFaq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinza - Preguntas frecuentes",
  description: "Gestión de preguntas frecuentes",
};

export const dynamic = "force-dynamic";

export default async function PreguntasFrecuentesPage() {
  const faqs = await getFaqs();

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Preguntas frecuentes</h1>
        <NewFaq />
      </header>
      <main>
        <ListaFaq faqs={faqs} />
      </main>
    </>
  );
}
