import { Link } from 'react-router-dom';
import { Mail, FileText, Users, MessageSquare } from 'lucide-react';
import { Card } from '../components/ui/Card';

const tiles = [
  { to: '/contacts', label: 'Kontakty', icon: Mail, description: 'Zapytania z formularza kontaktowego' },
  { to: '/quotes', label: 'Wyceny', icon: FileText, description: 'Zapytania o wycene projektu' },
  { to: '/leads', label: 'Leady', icon: Users, description: 'Potencjalni klienci ze wszystkich zrodel' },
  { to: '/chats', label: 'Czaty', icon: MessageSquare, description: 'Konwersacje z chatbotem' },
];

export function DashboardPage() {
  return (
    <div className="p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Panel administracyjny</h1>
        <p className="text-sm text-gray-600">Wybierz sekcje, aby zobaczyc szczegoly.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {tiles.map((tile) => (
          <Link key={tile.to} to={tile.to} className="block">
            <Card className="p-6 hover:shadow-md transition cursor-pointer">
              <tile.icon className="w-8 h-8 text-primary-600 mb-3" />
              <h2 className="text-lg font-semibold">{tile.label}</h2>
              <p className="text-sm text-gray-600 mt-1">{tile.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
