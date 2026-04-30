import { useState, type FormEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (authService.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await authService.login({ email, password });
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      setError(
        status === 401
          ? 'Nieprawidlowy email lub haslo.'
          : 'Logowanie nie powiodlo sie. Sprobuj ponownie.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md p-8 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">IT Solutions Admin</h1>
          <p className="text-sm text-gray-600">Zaloguj sie do panelu administracyjnego.</p>
        </header>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <Input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Haslo</span>
            <Input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </label>

          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Logowanie...' : 'Zaloguj sie'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
