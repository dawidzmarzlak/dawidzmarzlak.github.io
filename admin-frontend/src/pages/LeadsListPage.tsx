import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { leadsService } from '../services/leads';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '../components/ui/Table';
import { Pagination } from '../components/ui/Pagination';
import type { LeadStatus, LeadSource } from '../types';

const STATUS_OPTIONS = [
  { value: '',              label: 'Wszystkie statusy' },
  { value: 'NEW',           label: 'Nowy' },
  { value: 'CONTACTED',     label: 'Skontaktowany' },
  { value: 'QUALIFIED',     label: 'Zakwalifikowany' },
  { value: 'PROPOSAL_SENT', label: 'Oferta wyslana' },
  { value: 'CONVERTED',     label: 'Przekonwertowany' },
  { value: 'LOST',          label: 'Stracony' },
  { value: 'SPAM',          label: 'Spam' },
];

const SOURCE_OPTIONS = [
  { value: '',             label: 'Wszystkie zrodla' },
  { value: 'CHAT',         label: 'Czat' },
  { value: 'CONTACT_FORM', label: 'Formularz kontaktowy' },
  { value: 'QUOTE_FORM',   label: 'Formularz wyceny' },
  { value: 'MANUAL',       label: 'Recznie' },
  { value: 'REFERRAL',     label: 'Polecenie' },
  { value: 'OTHER',        label: 'Inne' },
];

const STATUS_VARIANT: Record<LeadStatus, 'default'|'success'|'warning'|'danger'|'info'> = {
  NEW:           'info',
  CONTACTED:     'warning',
  QUALIFIED:     'warning',
  PROPOSAL_SENT: 'default',
  CONVERTED:     'success',
  LOST:          'danger',
  SPAM:          'danger',
};

export function LeadsListPage() {
  const [status, setStatus] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const size = 20;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-leads', { status, source, search, page, size }],
    queryFn: () => leadsService.getLeads({
      status: (status || undefined) as LeadStatus | undefined,
      source: (source || undefined) as LeadSource | undefined,
      search: search || undefined,
      page, size,
      sortBy: 'createdAt',
      sortDirection: 'desc',
    }),
  });

  return (
    <div className="p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Leady</h1>
        {data && <p className="text-sm text-gray-600">{data.totalElements} wpisow</p>}
      </header>

      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            value={status}
            options={STATUS_OPTIONS}
            onChange={(e) => { setStatus(e.target.value); setPage(0); }}
          />
          <Select
            value={source}
            options={SOURCE_OPTIONS}
            onChange={(e) => { setSource(e.target.value); setPage(0); }}
          />
          <Input
            type="search"
            placeholder="Szukaj po imieniu, email, firmie"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          />
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        {isLoading && <div className="p-6 text-sm text-gray-500">Ladowanie...</div>}
        {isError && <div className="p-6 text-sm text-red-600">Blad pobierania leadow.</div>}
        {data && data.leads.length === 0 && (
          <div className="p-6 text-sm text-gray-500">Brak leadow.</div>
        )}
        {data && data.leads.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Imie</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Zrodlo</TableHead>
                <TableHead>Wartosc</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.leads.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(l.createdAt).toLocaleString('pl-PL')}
                  </TableCell>
                  <TableCell className="text-sm font-medium">{l.name}</TableCell>
                  <TableCell className="text-sm text-gray-600">{l.email}</TableCell>
                  <TableCell className="text-sm text-gray-600">{l.company ?? '—'}</TableCell>
                  <TableCell className="text-sm text-gray-600">{l.source}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {l.estimatedValue != null
                      ? `${l.estimatedValue.toLocaleString('pl-PL')} ${l.currency ?? 'PLN'}`
                      : '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[l.status]}>{l.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
