import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { quotesService } from '../services/quotes';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '../components/ui/Table';
import { Pagination } from '../components/ui/Pagination';
import type { QuoteStatus } from '../types';

const STATUS_OPTIONS = [
  { value: '',          label: 'Wszystkie statusy' },
  { value: 'NEW',       label: 'Nowe' },
  { value: 'REVIEWING', label: 'W trakcie' },
  { value: 'QUOTED',    label: 'Wycenione' },
  { value: 'ACCEPTED',  label: 'Zaakceptowane' },
  { value: 'REJECTED',  label: 'Odrzucone' },
  { value: 'EXPIRED',   label: 'Wygasle' },
  { value: 'SPAM',      label: 'Spam' },
];

const STATUS_VARIANT: Record<QuoteStatus, 'default'|'success'|'warning'|'danger'|'info'> = {
  NEW:       'info',
  REVIEWING: 'warning',
  QUOTED:    'default',
  ACCEPTED:  'success',
  REJECTED:  'danger',
  EXPIRED:   'default',
  SPAM:      'danger',
};

export function QuotesListPage() {
  const [status, setStatus] = useState<string>('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const size = 20;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-quotes', { status, search, page, size }],
    queryFn: () => quotesService.getQuotes({
      status: (status || undefined) as QuoteStatus | undefined,
      search: search || undefined,
      page, size,
      sortBy: 'createdAt',
      sortDirection: 'desc',
    }),
  });

  return (
    <div className="p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Wyceny</h1>
        {data && <p className="text-sm text-gray-600">{data.totalElements} wpisow</p>}
      </header>

      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            value={status}
            options={STATUS_OPTIONS}
            onChange={(e) => { setStatus(e.target.value); setPage(0); }}
          />
          <Input
            type="search"
            placeholder="Szukaj po imieniu lub email"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          />
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        {isLoading && <div className="p-6 text-sm text-gray-500">Ladowanie...</div>}
        {isError && <div className="p-6 text-sm text-red-600">Blad pobierania wycen.</div>}
        {data && data.quotes.length === 0 && (
          <div className="p-6 text-sm text-gray-500">Brak wycen.</div>
        )}
        {data && data.quotes.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Imie</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Usluga</TableHead>
                <TableHead>Rozmiar</TableHead>
                <TableHead>Kwota</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.quotes.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(q.createdAt).toLocaleString('pl-PL')}
                  </TableCell>
                  <TableCell className="text-sm font-medium">{q.name}</TableCell>
                  <TableCell className="text-sm text-gray-600">{q.email}</TableCell>
                  <TableCell className="text-sm text-gray-600">{q.serviceType}</TableCell>
                  <TableCell className="text-sm text-gray-600">{q.projectSize ?? '—'}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {q.quotedAmount != null
                      ? `${q.quotedAmount.toLocaleString('pl-PL')} ${q.quotedCurrency ?? 'PLN'}`
                      : '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[q.status]}>{q.status}</Badge>
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
