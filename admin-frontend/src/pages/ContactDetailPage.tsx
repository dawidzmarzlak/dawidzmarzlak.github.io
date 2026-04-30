import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contactsService } from '../services/contacts';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import type { ContactStatus } from '../types';

const STATUS_VARIANT: Record<ContactStatus, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  NEW: 'info',
  READ: 'default',
  REPLIED: 'success',
  ARCHIVED: 'default',
  SPAM: 'danger',
};

export function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [showReply, setShowReply] = useState(false);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [actionError, setActionError] = useState<string | null>(null);

  const { data: contact, isLoading, isError } = useQuery({
    queryKey: ['admin-contact', id],
    queryFn: () => contactsService.getContact(id!),
    enabled: !!id,
  });

  const updateStatusMut = useMutation({
    mutationFn: (status: ContactStatus) => contactsService.updateStatus(id!, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-contact', id] });
      qc.invalidateQueries({ queryKey: ['admin-contacts'] });
    },
    onError: () => setActionError('Nie udalo sie zaktualizowac statusu.'),
  });

  const replyMut = useMutation({
    mutationFn: () => contactsService.reply(id!, replySubject, replyMessage),
    onSuccess: () => {
      setShowReply(false);
      setReplyMessage('');
      qc.invalidateQueries({ queryKey: ['admin-contact', id] });
      qc.invalidateQueries({ queryKey: ['admin-contacts'] });
    },
    onError: () => setActionError('Nie udalo sie wyslac odpowiedzi.'),
  });

  if (isLoading) return <div className="p-8 text-sm text-gray-500">Ladowanie...</div>;
  if (isError || !contact)
    return <div className="p-8 text-sm text-red-600">Nie znaleziono kontaktu.</div>;

  const handleOpenReply = () => {
    setReplySubject(contact.subject ? `Re: ${contact.subject}` : 'Re: Twoja wiadomosc');
    setShowReply(true);
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <header className="flex items-start justify-between gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 hover:underline mb-1"
          >
            ← Wroc
          </button>
          <h1 className="text-2xl font-bold">{contact.name}</h1>
          <p className="text-sm text-gray-600">
            {contact.email}
            {contact.phone ? ` · ${contact.phone}` : ''}
            {contact.company ? ` · ${contact.company}` : ''}
          </p>
        </div>
        <Badge variant={STATUS_VARIANT[contact.status]}>{contact.status}</Badge>
      </header>

      <Card className="p-6 space-y-4">
        {contact.subject && (
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Temat</p>
            <p className="text-sm font-medium">{contact.subject}</p>
          </div>
        )}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Wiadomosc</p>
          <p className="text-sm whitespace-pre-wrap mt-1">{contact.message}</p>
        </div>
        <div className="text-xs text-gray-500">
          Otrzymano {new Date(contact.createdAt).toLocaleString('pl-PL')} · locale: {contact.locale}
        </div>
      </Card>

      {contact.status === 'REPLIED' && contact.replyContent && (
        <Card className="p-6 bg-green-50">
          <p className="text-xs uppercase tracking-wide text-gray-500">Twoja odpowiedz</p>
          <p className="text-sm whitespace-pre-wrap mt-1">{contact.replyContent}</p>
          {contact.repliedAt && (
            <p className="text-xs text-gray-500 mt-2">
              Wyslano {new Date(contact.repliedAt).toLocaleString('pl-PL')}
            </p>
          )}
        </Card>
      )}

      {actionError && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {actionError}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleOpenReply}
          disabled={contact.status === 'SPAM' || contact.status === 'ARCHIVED'}
        >
          Odpowiedz
        </Button>
        <Button
          variant="secondary"
          onClick={() => updateStatusMut.mutate('ARCHIVED')}
          disabled={contact.status === 'ARCHIVED' || updateStatusMut.isPending}
        >
          Archiwizuj
        </Button>
        <Button
          variant="secondary"
          onClick={() => updateStatusMut.mutate('SPAM')}
          disabled={contact.status === 'SPAM' || updateStatusMut.isPending}
        >
          Oznacz jako spam
        </Button>
      </div>

      <Modal isOpen={showReply} onClose={() => setShowReply(false)} title="Odpowiedz">
        <div className="space-y-4">
          <Input
            label="Temat"
            value={replySubject}
            onChange={(e) => setReplySubject(e.target.value)}
          />
          <Textarea
            label="Tresc"
            rows={8}
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowReply(false)}>
              Anuluj
            </Button>
            <Button
              onClick={() => replyMut.mutate()}
              disabled={!replySubject || !replyMessage || replyMut.isPending}
              isLoading={replyMut.isPending}
            >
              Wyslij
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
