import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { chatsService } from '../services/chats';
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
import type { ChatSessionStatus } from '../types';

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Wszystkie' },
  { value: 'ACTIVE', label: 'Aktywne' },
  { value: 'ARCHIVED', label: 'Zarchiwizowane' },
  { value: 'SPAM', label: 'Spam' },
];

const STATUS_VARIANT: Record<ChatSessionStatus, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  ACTIVE: 'info',
  ARCHIVED: 'default',
  SPAM: 'danger',
};

export function ChatsListPage() {
  const [status, setStatus] = useState<ChatSessionStatus | ''>('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const size = 20;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-chats', { status, search, page, size }],
    queryFn: () =>
      chatsService.getChats({
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
          <h1 className="text-2xl font-bold">Czaty</h1>
          {data && (
            <p className="text-sm text-gray-600">
              {data.totalElements} {data.totalElements === 1 ? 'sesja' : 'sesji'}
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
              setStatus(e.target.value as ChatSessionStatus | '');
              setPage(0);
            }}
          />
          <Input
            type="search"
            placeholder="Szukaj po visitor ID lub provider"
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
        {isError && <div className="p-6 text-sm text-red-600">Blad pobierania czatow.</div>}
        {data && data.sessions.length === 0 && (
          <div className="p-6 text-sm text-gray-500">Brak czatow.</div>
        )}
        {data && data.sessions.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Visitor ID</TableHead>
                <TableHead>Locale</TableHead>
                <TableHead>Provider / model</TableHead>
                <TableHead>Tokeny</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.sessions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(s.createdAt).toLocaleString('pl-PL')}
                  </TableCell>
                  <TableCell className="text-sm font-mono">{s.visitorId ?? '-'}</TableCell>
                  <TableCell className="text-sm text-gray-600">{s.locale}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {s.llmProvider}
                    {s.llmModel ? ` / ${s.llmModel}` : ''}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{s.totalTokens}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[s.status]}>{s.status}</Badge>
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
