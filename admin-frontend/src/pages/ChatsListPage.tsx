import { Card } from '../components/ui/Card';

export function ChatsListPage() {
  return (
    <div className="p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Czaty</h1>
        <p className="text-sm text-gray-600">Lista konwersacji z chatbotem.</p>
      </header>

      <Card className="p-8 text-center">
        <p className="text-sm text-gray-600">
          Wkrotce. Endpoint <code>GET /api/v1/admin/chats</code> nie zostal jeszcze zaimplementowany
          po stronie backendu — ChatRepository ma juz metody listujace, ale brakuje AdminChatController.
        </p>
        <p className="text-xs text-gray-500 mt-3">
          Wszystkie nowe czaty sa zapisywane do bazy (chat_sessions + chat_messages) i beda widoczne
          tutaj po wdrozeniu kontrolera.
        </p>
      </Card>
    </div>
  );
}
