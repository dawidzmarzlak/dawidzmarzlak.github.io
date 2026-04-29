"use client";
import { useState } from "react";
import { PortfolioFilters } from "./PortfolioFilters";
import { PortfolioBento } from "./PortfolioBento";
import { filterProjects, type FilterKey } from "@/lib/design/portfolio-data";

export function PortfolioPageClient() {
  const [filter, setFilter] = useState<FilterKey>("all");
  return (
    <>
      <PortfolioFilters filter={filter} onChange={setFilter} />
      <PortfolioBento projects={filterProjects(filter)} />
    </>
  );
}
