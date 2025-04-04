// src/components/RequireAuth.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // 토큰이 없으면 로그인 페이지로 이동
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default RequireAuth;
