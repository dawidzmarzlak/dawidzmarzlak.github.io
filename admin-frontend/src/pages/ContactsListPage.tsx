import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { contactsService } from '../services/contacts';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../components/ui/Table';
import { Pagination } from '../components/ui/Pagination';
import type { ContactStatus } from '../types';

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Wszystkie' },
  { value: 'NEW', label: 'Nowe' },
  { value: 'READ', label: 'Przeczytane' },
  { value: 'REPLIED', label: 'Odpowiedziane' },
  { value: 'ARCHIVED', label: 'Zarchiwizowane' },
  { value: 'SPAM', label: 'Spam' },
];

const STATUS_VARIANT: Record<ContactStatus, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  NEW: 'info',
  READ: 'default',
  REPLIED: 'success',
  ARCHIVED: 'default',
  SPAM: 'danger',
};

export function ContactsListPage() {
  const [status, setStatus] = useState<ContactStatus | ''>('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const size = 20;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-contacts', { status, search, page, size }],
    queryFn: () =>
      contactsService.getContacts({
        status: status || undefined,
        search: search || undefined,
        page,
        size,
        sortBy: 'createdAt',
        sortDirection: 'desc',
      }),
  });

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kontakty</h1>
          {data && (
            <p className="text-sm text-gray-600">
              {data.totalElements} {data.totalElements === 1 ? 'wpis' : 'wpisow'}
            </p>
          )}
        </div>
      </header>

      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            options={STATUS_OPTIONS}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as ContactStatus | '');
              setPage(0);
            }}
          />
          <Input
            type="search"
            placeholder="Szukaj po imieniu lub email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        {isLoading && <div className="p-6 text-sm text-gray-500">Ladowanie...</div>}
        {isError && <div className="p-6 text-sm text-red-600">Blad podczas pobierania kontaktow.</div>}
        {data && data.contacts.length === 0 && (
          <div className="p-6 text-sm text-gray-500">Brak kontaktow.</div>
        )}
        {data && data.contacts.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Imie</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.contacts.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(c.createdAt).toLocaleString('pl-PL')}
                  </TableCell>
                  <TableCell className="text-sm font-medium">{c.name}</TableCell>
                  <TableCell className="text-sm text-gray-600">{c.email}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[c.status]}>{c.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/contacts/${c.id}`}
                      className="text-primary-600 hover:underline text-sm font-medium"
                    >
                      Otworz
                    </Link>
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
