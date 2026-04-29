"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

interface Token {
  symbol: string;
  name: string;
  price: number;
  change: number;
  icon: string;
}

const tokens: Token[] = [
  { symbol: "BTC", name: "Bitcoin", price: 67432.50, change: 2.34, icon: "₿" },
  { symbol: "ETH", name: "Ethereum", price: 3521.80, change: -1.23, icon: "Ξ" },
  { symbol: "SOL", name: "Solana", price: 142.65, change: 5.67, icon: "◎" },
  { symbol: "AVAX", name: "Avalanche", price: 38.92, change: 3.45, icon: "🔺" },
  { symbol: "MATIC", name: "Polygon", price: 0.89, change: -0.56, icon: "⬡" },
  { symbol: "DOT", name: "Polkadot", price: 7.23, change: 1.89, icon: "●" },
  { symbol: "LINK", name: "Chainlink", price: 14.56, change: 4.21, icon: "⬡" },
  { symbol: "UNI", name: "Uniswap", price: 9.87, change: -2.10, icon: "🦄" },
];

function TokenCard({ token }: { token: Token }) {
  const isPositive = token.change >= 0;

  return (
    <div className="flex items-center gap-4 px-6 py-3 bg-[#1A1A2E] rounded-xl border border-[#8B5CF6]/20 min-w-[200px]">
      <div className="text-2xl">{token.icon}</div>
      <div>
        <div className="flex items-center gap-2">
          <span
            className="font-bold text-white"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {token.symbol}
          </span>
          <span
            className="text-xs text-gray-500"
            style={{ fontFamily: "var(--font-exo)" }}
          >
            {token.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-sm text-gray-300"
            style={{ fontFamily: "var(--font-exo)" }}
          >
            ${token.price.toLocaleString()}
          </span>
          <span
            className={`text-xs flex items-center gap-1 ${
              isPositive ? "text-[#06FFA5]" : "text-[#FF006E]"
            }`}
            style={{ fontFamily: "var(--font-exo)" }}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {isPositive ? "+" : ""}
            {token.change}%
          </span>
        </div>
      </div>
    </div>
  );
}

export function CryptoTicker() {
  const [prices, setPrices] = useState(tokens);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((token) => ({
          ...token,
          price: token.price * (1 + (Math.random() - 0.5) * 0.002),
          change: token.change + (Math.random() - 0.5) * 0.1,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-4 bg-[#0A0A0F] border-y border-[#8B5CF6]/20 overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...prices, ...prices].map((token, i) => (
          <TokenCard key={`${token.symbol}-${i}`} token={token} />
        ))}
      </motion.div>
    </section>
  );
}
