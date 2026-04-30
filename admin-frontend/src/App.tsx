import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { ContactsListPage } from './pages/ContactsListPage'
import { ContactDetailPage } from './pages/ContactDetailPage'
import { QuotesListPage } from './pages/QuotesListPage'
import { LeadsListPage } from './pages/LeadsListPage'
import { ChatsListPage } from './pages/ChatsListPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/contacts" element={<ContactsListPage />} />
        <Route path="/contacts/:id" element={<ContactDetailPage />} />
        <Route path="/quotes" element={<QuotesListPage />} />
        <Route path="/leads" element={<LeadsListPage />} />
        <Route path="/chats" element={<ChatsListPage />} />
        <Route path="/settings" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
