"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Ruler } from "lucide-react";
import { useState } from "react";

const categories = ["tops", "bottoms", "dresses", "shoes"] as const;

const sizeData = {
  tops: [
    { size: "XS", bust: "32-33", waist: "24-25", hips: "34-35" },
    { size: "S", bust: "34-35", waist: "26-27", hips: "36-37" },
    { size: "M", bust: "36-37", waist: "28-29", hips: "38-39" },
    { size: "L", bust: "38-40", waist: "30-32", hips: "40-42" },
    { size: "XL", bust: "42-44", waist: "34-36", hips: "44-46" },
  ],
  bottoms: [
    { size: "XS", waist: "24-25", hips: "34-35", inseam: "30" },
    { size: "S", waist: "26-27", hips: "36-37", inseam: "30.5" },
    { size: "M", waist: "28-29", hips: "38-39", inseam: "31" },
    { size: "L", waist: "30-32", hips: "40-42", inseam: "31.5" },
    { size: "XL", waist: "34-36", hips: "44-46", inseam: "32" },
  ],
  dresses: [
    { size: "XS", bust: "32-33", waist: "24-25", hips: "34-35", length: "38" },
    { size: "S", bust: "34-35", waist: "26-27", hips: "36-37", length: "38.5" },
    { size: "M", bust: "36-37", waist: "28-29", hips: "38-39", length: "39" },
    { size: "L", bust: "38-40", waist: "30-32", hips: "40-42", length: "39.5" },
    { size: "XL", bust: "42-44", waist: "34-36", hips: "44-46", length: "40" },
  ],
  shoes: [
    { us: "5", eu: "35", uk: "2.5", cm: "22.5" },
    { us: "6", eu: "36", uk: "3.5", cm: "23" },
    { us: "7", eu: "37", uk: "4.5", cm: "23.5" },
    { us: "8", eu: "38", uk: "5.5", cm: "24.5" },
    { us: "9", eu: "39", uk: "6.5", cm: "25" },
    { us: "10", eu: "40", uk: "7.5", cm: "25.5" },
    { us: "11", eu: "41", uk: "8.5", cm: "26.5" },
  ],
};

export function FashionSizeGuide() {
  const t = useTranslations("showcase.fashion-store.sizeGuide");
  const [activeTab, setActiveTab] = useState<typeof categories[number]>("tops");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FAFAFA] rounded-full mb-6">
            <Ruler className="w-7 h-7 text-[#D4A5A5]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-[#0A0A0A] mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base text-[#666666]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-3 text-sm tracking-wider uppercase transition-all ${
                activeTab === category
                  ? "bg-[#0A0A0A] text-white"
                  : "bg-[#FAFAFA] text-[#666666] hover:bg-[#F0F0F0]"
              }`}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </motion.div>

        {/* Size Tables */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-[#0A0A0A]">
                {activeTab === "shoes" ? (
                  <>
                    <th
                      className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {t("measurements.us")}
                    </th>
                    <th
                      className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {t("measurements.eu")}
                    </th>
                    <th
                      className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {t("measurements.uk")}
                    </th>
                    <th
                      className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {t("measurements.cm")}
                    </th>
                  </>
                ) : (
                  <>
                    <th
                      className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {t("measurements.size")}
                    </th>
                    {activeTab === "tops" && (
                      <>
                        <th
                          className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {t("measurements.bust")}
                        </th>
                        <th
                          className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {t("measurements.waist")}
                        </th>
                        <th
                          className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {t("measurements.hips")}
                        </th>
                      </>
                    )}
                    {activeTab === "bottoms" && (
                      <>
                        <th
                          className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {t("measurements.waist")}
                        </th>
                        <th
                          className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {t("measurements.hips")}
                        </th>
                        <th
                          className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {t("measurements.inseam")}
                        </th>
                      </>
                    )}
                    {activeTab === "dresses" && (
                      <>
                        <th
                          className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {t("measurements.bust")}
                        </th>
                        <th
                          className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {t("measurements.waist")}
                        </th>
                        <th
                          className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {t("measurements.hips")}
                        </th>
                        <th
                          className="text-left py-4 px-4 text-xs tracking-wider uppercase text-[#0A0A0A]"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {t("measurements.length")}
                        </th>
                      </>
                    )}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {sizeData[activeTab].map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA] transition-colors"
                >
                  {Object.values(row).map((value, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="py-4 px-4 text-sm text-[#666666]"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {value}
                      {cellIndex > 0 && activeTab !== "shoes" && '"'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm text-[#999999] text-center mt-8 italic"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {t("note")}
        </motion.p>
      </div>
    </section>
  );
}
