"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Leaf, User, Phone, Mail, Check } from "lucide-react";

const treatments = ["massage", "facial", "body", "package"];
const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

export function SpaBooking() {
  const t = useTranslations("showcase.spa-wellness.booking");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    treatment: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.treatment !== "";
      case 2:
        return formData.date !== "" && formData.time !== "";
      case 3:
        return formData.name !== "" && formData.email !== "" && formData.phone !== "";
      default:
        return false;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#FEFEFE] to-[#F5F0E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#9CAF88]" />
            <Leaf className="w-5 h-5 text-[#9CAF88]" />
            <div className="w-12 h-px bg-[#9CAF88]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-[#3A3A3A] mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#3A3A3A]/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Progress Steps */}
        {!isSubmitted && (
          <div className="flex justify-center mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step >= s
                      ? "bg-[#9CAF88] text-white"
                      : "bg-[#E8DFD0] text-[#3A3A3A]/50"
                  }`}
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-24 h-0.5 mx-2 transition-colors ${
                      step > s ? "bg-[#9CAF88]" : "bg-[#E8DFD0]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Form */}
        {!isSubmitted ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
          >
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div>
                  <h3
                    className="text-2xl text-[#3A3A3A] mb-6"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    {t("step1.title")}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {treatments.map((treatment) => (
                      <button
                        key={treatment}
                        type="button"
                        onClick={() => setFormData({ ...formData, treatment })}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                          formData.treatment === treatment
                            ? "border-[#9CAF88] bg-[#9CAF88]/5"
                            : "border-[#E8DFD0] hover:border-[#9CAF88]/50"
                        }`}
                      >
                        <p
                          className="text-lg text-[#3A3A3A] mb-1"
                          style={{ fontFamily: "var(--font-nunito)" }}
                        >
                          {t(`treatments.${treatment}.name`)}
                        </p>
                        <p
                          className="text-sm text-[#3A3A3A]/50"
                          style={{ fontFamily: "var(--font-nunito)" }}
                        >
                          {t(`treatments.${treatment}.duration`)}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3
                    className="text-2xl text-[#3A3A3A] mb-6"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    {t("step2.title")}
                  </h3>

                  {/* Date picker */}
                  <div className="mb-6">
                    <label
                      className="block text-sm text-[#3A3A3A]/70 mb-2"
                      style={{ fontFamily: "var(--font-nunito)" }}
                    >
                      <Calendar className="w-4 h-4 inline mr-2" />
                      {t("step2.date")}
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-4 rounded-xl border-2 border-[#E8DFD0] focus:border-[#9CAF88] outline-none transition-colors"
                      style={{ fontFamily: "var(--font-nunito)" }}
                    />
                  </div>

                  {/* Time slots */}
                  <div>
                    <label
                      className="block text-sm text-[#3A3A3A]/70 mb-2"
                      style={{ fontFamily: "var(--font-nunito)" }}
                    >
                      <Clock className="w-4 h-4 inline mr-2" />
                      {t("step2.time")}
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({ ...formData, time })}
                          className={`p-3 rounded-xl text-sm transition-all ${
                            formData.time === time
                              ? "bg-[#9CAF88] text-white"
                              : "bg-[#F5F0E8] text-[#3A3A3A] hover:bg-[#9CAF88]/20"
                          }`}
                          style={{ fontFamily: "var(--font-nunito)" }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3
                    className="text-2xl text-[#3A3A3A] mb-6"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    {t("step3.title")}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-[#3A3A3A]/70 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        {t("step3.name")}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-4 rounded-xl border-2 border-[#E8DFD0] focus:border-[#9CAF88] outline-none"
                        style={{ fontFamily: "var(--font-nunito)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#3A3A3A]/70 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        {t("step3.email")}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-4 rounded-xl border-2 border-[#E8DFD0] focus:border-[#9CAF88] outline-none"
                        style={{ fontFamily: "var(--font-nunito)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#3A3A3A]/70 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        {t("step3.phone")}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-4 rounded-xl border-2 border-[#E8DFD0] focus:border-[#9CAF88] outline-none"
                        style={{ fontFamily: "var(--font-nunito)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#3A3A3A]/70 mb-2">
                        {t("step3.notes")}
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                        className="w-full p-4 rounded-xl border-2 border-[#E8DFD0] focus:border-[#9CAF88] outline-none resize-none"
                        style={{ fontFamily: "var(--font-nunito)" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="rounded-full px-6"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    {t("back")}
                  </Button>
                )}
                <div className={step === 1 ? "ml-auto" : ""}>
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      disabled={!isStepValid()}
                      className="bg-[#9CAF88] hover:bg-[#8A9D78] rounded-full px-8"
                      style={{ fontFamily: "var(--font-nunito)" }}
                    >
                      {t("next")}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!isStepValid()}
                      className="bg-[#9CAF88] hover:bg-[#8A9D78] rounded-full px-8"
                      style={{ fontFamily: "var(--font-nunito)" }}
                    >
                      {t("submit")}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-12 shadow-lg text-center"
          >
            <div className="w-20 h-20 bg-[#9CAF88] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3
              className="text-3xl text-[#3A3A3A] mb-4"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {t("success.title")}
            </h3>
            <p
              className="text-[#3A3A3A]/60 mb-8"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {t("success.message")}
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
                setFormData({ treatment: "", date: "", time: "", name: "", email: "", phone: "", notes: "" });
              }}
              variant="outline"
              className="rounded-full px-8 border-[#9CAF88] text-[#9CAF88]"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              {t("success.newBooking")}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
