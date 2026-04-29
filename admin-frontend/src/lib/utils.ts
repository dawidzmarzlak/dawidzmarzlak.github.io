import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return format(new Date(date), 'dd MMM yyyy, HH:mm', { locale: pl });
}

export function formatRelativeDate(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: pl });
}

export function formatCurrency(amount: number, currency = 'PLN') {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // Contact statuses
    NEW: 'bg-blue-100 text-blue-800',
    READ: 'bg-gray-100 text-gray-800',
    REPLIED: 'bg-green-100 text-green-800',
    ARCHIVED: 'bg-gray-100 text-gray-600',
    SPAM: 'bg-red-100 text-red-800',
    // Quote statuses
    REVIEWING: 'bg-yellow-100 text-yellow-800',
    QUOTED: 'bg-purple-100 text-purple-800',
    ACCEPTED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    EXPIRED: 'bg-gray-100 text-gray-600',
    // Lead statuses
    CONTACTED: 'bg-blue-100 text-blue-800',
    QUALIFIED: 'bg-indigo-100 text-indigo-800',
    PROPOSAL_SENT: 'bg-purple-100 text-purple-800',
    CONVERTED: 'bg-green-100 text-green-800',
    LOST: 'bg-red-100 text-red-800',
    // Chat statuses
    ACTIVE: 'bg-green-100 text-green-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getServiceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    WEBSITE: 'Strona WWW',
    ECOMMERCE: 'E-commerce',
    WEBAPP: 'Aplikacja webowa',
    MOBILE: 'Aplikacja mobilna',
    DESIGN: 'UI/UX Design',
    SEO: 'SEO / Marketing',
    MAINTENANCE: 'Utrzymanie',
    CONSULTING: 'Konsulting',
    OTHER: 'Inne',
  };
  return labels[type] || type;
}

export function getProjectSizeLabel(size: string): string {
  const labels: Record<string, string> = {
    SMALL: 'Mały',
    MEDIUM: 'Średni',
    LARGE: 'Duży',
    ENTERPRISE: 'Enterprise',
  };
  return labels[size] || size;
}

export function getLeadSourceLabel(source: string): string {
  const labels: Record<string, string> = {
    CHAT: 'Chat',
    CONTACT_FORM: 'Formularz kontaktowy',
    QUOTE_FORM: 'Formularz wyceny',
    MANUAL: 'Ręczny',
    REFERRAL: 'Polecenie',
    OTHER: 'Inne',
  };
  return labels[source] || source;
}
