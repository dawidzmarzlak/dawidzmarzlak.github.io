import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { ContactsListPage } from './pages/ContactsListPage'
import { ContactDetailPage } from './pages/ContactDetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/contacts" element={<ContactsListPage />} />
        <Route path="/contacts/:id" element={<ContactDetailPage />} />
        {/* Stubs - fleshed out in D3 */}
        <Route path="/quotes" element={<DashboardPage />} />
        <Route path="/leads" element={<DashboardPage />} />
        <Route path="/chats" element={<DashboardPage />} />
        <Route path="/settings" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
