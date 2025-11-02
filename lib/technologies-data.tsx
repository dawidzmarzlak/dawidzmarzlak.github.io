export interface Technology {
  name: string;
  icon: string; // SVG URL from Devicon CDN
  colorFrom: string;
  colorTo: string;
}

export interface TechnologyCategory {
  key: string;
  technologies: Technology[];
}

export const technologiesData: TechnologyCategory[] = [
  {
    key: "frontend",
    technologies: [
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        colorFrom: "#000000",
        colorTo: "#1f2937",
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        colorFrom: "#22d3ee",
        colorTo: "#3b82f6",
      },
      {
        name: "Vue.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
        colorFrom: "#34d399",
        colorTo: "#0d9488",
      },
      {
        name: "Angular",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
        colorFrom: "#ef4444",
        colorTo: "#db2777",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        colorFrom: "#3b82f6",
        colorTo: "#1d4ed8",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        colorFrom: "#22d3ee",
        colorTo: "#60a5fa",
      },
    ],
  },
  {
    key: "backend",
    technologies: [
      {
        name: "Spring Boot",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        colorFrom: "#22c55e",
        colorTo: "#059669",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        colorFrom: "#4ade80",
        colorTo: "#16a34a",
      },
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        colorFrom: "#60a5fa",
        colorTo: "#facc15",
      },
      {
        name: "PHP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        colorFrom: "#818cf8",
        colorTo: "#a855f7",
      },
      {
        name: "Laravel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
        colorFrom: "#ef4444",
        colorTo: "#f97316",
      },
    ],
  },
  {
    key: "cms",
    technologies: [
      {
        name: "WordPress",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
        colorFrom: "#3b82f6",
        colorTo: "#1d4ed8",
      },
      {
        name: "WooCommerce",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg",
        colorFrom: "#a855f7",
        colorTo: "#7e22ce",
      },
      {
        name: "PrestaShop",
        icon: "https://cdn.simpleicons.org/prestashop/DF0067",
        colorFrom: "#ec4899",
        colorTo: "#e11d48",
      },
      {
        name: "Shopify",
        icon: "https://cdn.simpleicons.org/shopify/96BF48",
        colorFrom: "#22c55e",
        colorTo: "#059669",
      },
      {
        name: "Strapi",
        icon: "https://cdn.simpleicons.org/strapi/4945FF",
        colorFrom: "#6366f1",
        colorTo: "#9333ea",
      },
    ],
  },
  {
    key: "database",
    technologies: [
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        colorFrom: "#60a5fa",
        colorTo: "#2563eb",
      },
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        colorFrom: "#3b82f6",
        colorTo: "#fb923c",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        colorFrom: "#22c55e",
        colorTo: "#15803d",
      },
      {
        name: "Redis",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
        colorFrom: "#ef4444",
        colorTo: "#b91c1c",
      },
    ],
  },
  {
    key: "cloud",
    technologies: [
      {
        name: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        colorFrom: "#fb923c",
        colorTo: "#ca8a04",
      },
      {
        name: "Azure",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        colorFrom: "#3b82f6",
        colorTo: "#1d4ed8",
      },
      {
        name: "Google Cloud",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
        colorFrom: "#60a5fa",
        colorTo: "#facc15",
      },
      {
        name: "Vercel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
        colorFrom: "#000000",
        colorTo: "#374151",
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        colorFrom: "#60a5fa",
        colorTo: "#2563eb",
      },
    ],
  },
];
