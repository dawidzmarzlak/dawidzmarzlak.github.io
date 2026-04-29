"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ArchitectureContact() {
  const t = useTranslations("showcase.architecture-studio");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#FF4D00]" />
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {t("contact.title")}
            </h2>
            <div className="w-12 h-px bg-[#FF4D00]" />
          </div>
          <p
            className="text-lg text-black/60 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-ibm-plex)" }}
          >
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FF4D00]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#FF4D00]" />
                </div>
                <div>
                  <h3
                    className="font-bold mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t("contact.addressLabel")}
                  </h3>
                  <p
                    className="text-black/60"
                    style={{ fontFamily: "var(--font-ibm-plex)" }}
                  >
                    {t("contact.address")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FF4D00]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#FF4D00]" />
                </div>
                <div>
                  <h3
                    className="font-bold mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t("contact.phoneLabel")}
                  </h3>
                  <p
                    className="text-black/60"
                    style={{ fontFamily: "var(--font-ibm-plex)" }}
                  >
                    {t("contact.phone")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FF4D00]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#FF4D00]" />
                </div>
                <div>
                  <h3
                    className="font-bold mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t("contact.emailLabel")}
                  </h3>
                  <p
                    className="text-black/60"
                    style={{ fontFamily: "var(--font-ibm-plex)" }}
                  >
                    {t("contact.email")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FF4D00]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#FF4D00]" />
                </div>
                <div>
                  <h3
                    className="font-bold mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t("contact.hoursLabel")}
                  </h3>
                  <p
                    className="text-black/60"
                    style={{ fontFamily: "var(--font-ibm-plex)" }}
                  >
                    {t("contact.hours")}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-80 bg-black/5 border-2 border-black/10 overflow-hidden group">
              {/* Grid background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #000 1px, transparent 1px),
                    linear-gradient(to bottom, #000 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Map marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MapPin className="w-12 h-12 text-[#FF4D00] drop-shadow-lg" />
                </motion.div>
              </div>

              {/* Overlay with coordinates */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm p-4">
                <p
                  className="text-white/60 text-sm"
                  style={{ fontFamily: "var(--font-ibm-plex)" }}
                >
                  {t("contact.coordinates")}
                </p>
                <p
                  className="text-white font-mono text-xs mt-1"
                  style={{ fontFamily: "var(--font-ibm-plex)" }}
                >
                  40.7589° N, 73.9851° W
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#FF4D00]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  className="bg-white text-black hover:bg-[#FF4D00] hover:text-white font-medium"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t("contact.viewMap")}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black/10 focus:border-[#FF4D00] outline-none transition-colors"
                  style={{ fontFamily: "var(--font-ibm-plex)" }}
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black/10 focus:border-[#FF4D00] outline-none transition-colors"
                    style={{ fontFamily: "var(--font-ibm-plex)" }}
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-black/10 focus:border-[#FF4D00] outline-none transition-colors"
                    style={{ fontFamily: "var(--font-ibm-plex)" }}
                    placeholder={t("contact.form.phonePlaceholder")}
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t("contact.form.projectType")}
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black/10 focus:border-[#FF4D00] outline-none transition-colors bg-white"
                  style={{ fontFamily: "var(--font-ibm-plex)" }}
                >
                  <option value="">
                    {t("contact.form.projectTypePlaceholder")}
                  </option>
                  <option value="residential">
                    {t("contact.form.projectTypes.residential")}
                  </option>
                  <option value="commercial">
                    {t("contact.form.projectTypes.commercial")}
                  </option>
                  <option value="renovation">
                    {t("contact.form.projectTypes.renovation")}
                  </option>
                  <option value="consultation">
                    {t("contact.form.projectTypes.consultation")}
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-black/10 focus:border-[#FF4D00] outline-none transition-colors resize-none"
                  style={{ fontFamily: "var(--font-ibm-plex)" }}
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-black hover:bg-[#FF4D00] text-white font-medium py-6 group"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {t("contact.form.submit")}
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
