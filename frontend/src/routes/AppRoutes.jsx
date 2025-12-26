// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../pages/AuthPage";
import { MarksPage } from "../pages/MarksPage";
import { Dashboard } from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import { MarksProvider } from "../context/MarksContext";

export default function AppRoutes() {
  return (
    <MarksProvider>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route
          path="/markspage"
          element={
            <ProtectedRoute>
              <MarksPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MarksProvider>
  );
}
