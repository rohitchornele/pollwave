import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Public pages
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

// Auth utilities
import ForgotPassword from './components/utils/ForgotPassword'
import ResetPassword from './components/utils/ResetPassword'
import VerifyEmail from './components/utils/VerifyEmail'
import VerificationSent from './components/utils/VerificationSent'

// Routing guards
import ProtectedRoute from './components/routing/ProtectedRoute'
import DashboardHome from './pages/dashboard/DashboardHome'
import MyPolls from './components/dashboard/MyPolls'
import CreatePoll from './components/dashboard/CreatePoll'
import DashboardLayout from './layout/DashboardLayout'
import PollDetail from './components/dashboard/PollDetail'
import PollVote from './components/polling/Pollvote'

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* ── Public routes ── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification-sent" element={<VerificationSent />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Dashboard routes  */}
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="polls" element={<MyPolls />} />
          <Route path="polls/create" element={<CreatePoll />} />
          {/* <Route path="polls/:id" element={<PollDetail />} /> */}
          <Route path="polls/:pollId"     element={<PollDetail />} />

        </Route>

        {/* ── 404 ── */}

        <Route path="/poll/:pollId" element={<PollVote />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </AuthProvider>
  );
}

export default App