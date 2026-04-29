"use client";
import { useState } from "react";
import { StackTabs } from "@/components/sections/services/StackTabs";
import { StackDetailCard } from "@/components/sections/services/StackDetailCard";
import { STACKS, type StackKey } from "@/lib/design/services-stacks";

export function ServicesPageClient() {
  const [active, setActive] = useState<StackKey>("next");
  const stack = STACKS[active];
  return (
    <>
      <StackTabs active={active} onChange={setActive} />
      <StackDetailCard stack={stack} />
    </>
  );
}
