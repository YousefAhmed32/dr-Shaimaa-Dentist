import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const CasesPage = lazy(() => import("./pages/CasesPage"));
const CredentialsPage = lazy(() => import("./pages/CredentialsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));

export default function App() {
  return (
    <Suspense fallback={<div className="route-loader" aria-label="Loading"><span /></div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cases" element={<CasesPage />} />
          <Route path="credentials" element={<CredentialsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="admin" element={<ProtectedRoute admin><AdminPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
