import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../pages/AuthPage";
import { MarksPage } from "../pages/MarksPage";
import { Dashboard } from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import { MarksProvider } from "../context/MarksContext";
import {Logout} from "../components/Logout";
import {LeftTopBar} from "../components/LeftTopBar";

export default function AppRoutes() {

  return (
    <MarksProvider>
      <Routes>
        <Route path="/" element={<AuthPage />} />


        <Route element={
          <ProtectedRoute>
            <LeftTopBar />
          </ProtectedRoute>
        }>
          <Route path="/markspage" element={<MarksPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </MarksProvider>
  );
}
