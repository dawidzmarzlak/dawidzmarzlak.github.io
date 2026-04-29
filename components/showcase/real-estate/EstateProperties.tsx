"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, ArrowRight } from "lucide-react";
import Image from "next/image";

const properties = [
  { name: "Riverside Villa", location: "Waterfront District", beds: 5, baths: 4, area: 450, price: "$3,200,000", image: "/showcase/real-estate/property-1.jpg", isNew: true },
  { name: "Urban Loft", location: "Arts Quarter", beds: 2, baths: 2, area: 120, price: "$680,000", image: "/showcase/real-estate/property-2.jpg", isNew: false },
  { name: "Garden Apartment", location: "Green Valley", beds: 3, baths: 2, area: 180, price: "$890,000", image: "/showcase/real-estate/property-3.jpg", isNew: true },
  { name: "Skyline Penthouse", location: "Financial District", beds: 4, baths: 3, area: 320, price: "$4,500,000", image: "/showcase/real-estate/property-4.jpg", isNew: false },
];

export function EstateProperties() {
  const t = useTranslations("showcase.real-estate.properties");

  return (
    <section className="py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <h2
              className="text-4xl md:text-5xl font-semibold text-[#0C1E3C] mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("title")}
            </h2>
            <p
              className="text-base text-[#0C1E3C]/60"
              style={{ fontFamily: "var(--font-source-sans)" }}
            >
              {t("subtitle")}
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-6 md:mt-0 border-[#0C1E3C] text-[#0C1E3C] hover:bg-[#0C1E3C] hover:text-white rounded-lg"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* Properties grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {property.isNew && (
                  <div className="absolute top-4 left-4 z-10 bg-[#C5A572] text-white text-xs font-medium px-3 py-1 rounded">
                    {t("new")}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className="text-xl font-semibold text-[#0C1E3C] mb-1 group-hover:text-[#C5A572] transition-colors"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {property.name}
                    </h3>
                    <p
                      className="text-sm text-[#0C1E3C]/60"
                      style={{ fontFamily: "var(--font-source-sans)" }}
                    >
                      {property.location}
                    </p>
                  </div>
                  <span
                    className="text-xl font-bold text-[#0C1E3C]"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {property.price}
                  </span>
                </div>

                {/* Features */}
                <div className="flex gap-6 text-sm text-[#0C1E3C]/60 pt-4 border-t border-[#E5E5E5]">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span>{property.beds} {t("bedrooms")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4" />
                    <span>{property.baths} {t("bathrooms")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-4 h-4" />
                    <span>{property.area} m²</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
