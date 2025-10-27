"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ServiceType = "nextjs" | "wordpress" | "woocommerce" | "prestashop" | "webapp";
type ProjectSize = "small" | "medium" | "large" | "enterprise";

const services: { id: ServiceType; label: string; description: string }[] = [
  { id: "nextjs", label: "Next.js", description: "Nowoczesna aplikacja" },
  { id: "wordpress", label: "WordPress", description: "Strona CMS" },
  { id: "woocommerce", label: "WooCommerce", description: "Sklep WordPress" },
  { id: "prestashop", label: "PrestaShop", description: "Sklep e-commerce" },
  { id: "webapp", label: "Web App", description: "Aplikacja dedykowana" },
];

const projectSizes: { id: ProjectSize; label: string; description: string; price: string }[] = [
  { id: "small", label: "Mały", description: "Wizytówka, landing page", price: "od 3000 PLN" },
  { id: "medium", label: "Średni", description: "Strona firmowa, blog", price: "od 6000 PLN" },
  { id: "large", label: "Duży", description: "Sklep, platforma", price: "od 12000 PLN" },
  { id: "enterprise", label: "Enterprise", description: "Zaawansowana platforma", price: "od 25000 PLN" },
];

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    service: "" as ServiceType | "",
    projectSize: "" as ProjectSize | "",
    name: "",
    email: "",
    phone: "",
    company: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const handleServiceSelect = (service: ServiceType) => {
    setFormData({ ...formData, service });
  };

  const handleSizeSelect = (size: ProjectSize) => {
    setFormData({ ...formData, projectSize: size });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Quote submitted:", result);

      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting quote:", error);
      // You could show an error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = formData.service !== "";
  const isStep2Valid = formData.projectSize !== "" && formData.name !== "" && formData.email !== "";

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  s === step
                    ? "bg-primary text-primary-foreground"
                    : s < step
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
          <Badge variant="outline">
            Krok {step} z 3
          </Badge>
        </div>
        <CardTitle>
          {step === 1 && "Wybierz rodzaj projektu"}
          {step === 2 && "Szczegóły projektu"}
          {step === 3 && "Dane kontaktowe"}
        </CardTitle>
        <CardDescription>
          {step === 1 && "Jaki typ projektu chcesz zrealizować?"}
          {step === 2 && "Powiedz nam więcej o swoim projekcie"}
          {step === 3 && "Jak możemy się z Tobą skontaktować?"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                          formData.service === service.id
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{service.label}</h3>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                          {formData.service === service.id && (
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button onClick={handleNext} disabled={!isStep1Valid}>
                      Dalej
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {step === 2 && (
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Rozmiar projektu
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {projectSizes.map((size) => (
                        <div
                          key={size.id}
                          onClick={() => handleSizeSelect(size.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                            formData.projectSize === size.id
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold">{size.label}</h4>
                            {formData.projectSize === size.id && (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{size.description}</p>
                          <p className="text-sm font-medium text-primary">{size.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Imię i Nazwisko *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Jan Kowalski"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jan@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                      Opis projektu
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Opisz swój projekt, jego cel i wymagania..."
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Wstecz
                    </Button>
                    <Button type="button" onClick={handleNext} disabled={!isStep2Valid}>
                      Dalej
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </form>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Telefon
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+48 123 456 789"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Firma
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Nazwa firmy"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-2">
                        Budżet (PLN)
                      </label>
                      <Input
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="np. 10000"
                      />
                    </div>
                    <div>
                      <label htmlFor="deadline" className="block text-sm font-medium mb-2">
                        Termin realizacji
                      </label>
                      <Input
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        placeholder="np. 2 miesiące"
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Podsumowanie:</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><span className="font-medium">Usługa:</span> {services.find(s => s.id === formData.service)?.label}</p>
                      <p><span className="font-medium">Rozmiar:</span> {projectSizes.find(s => s.id === formData.projectSize)?.label}</p>
                      <p><span className="font-medium">Kontakt:</span> {formData.name} ({formData.email})</p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Wstecz
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Wysyłanie...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Wyślij zapytanie
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Zapytanie wysłane!</h3>
              <p className="text-muted-foreground mb-6">
                Dziękujemy za przesłanie formularza. Skontaktujemy się z Tobą w ciągu 24 godzin.
              </p>
              <Button onClick={() => { setIsSuccess(false); setStep(1); setFormData({ service: "", projectSize: "", name: "", email: "", phone: "", company: "", description: "", budget: "", deadline: "" }); }}>
                Wyślij kolejne zapytanie
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
