import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useUserStore } from '@/store/useUserStore'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const token = useUserStore((state) => state.token)
  const location = useLocation()

  // 如果没有 token 且不在登录页，跳转到登录
  if (!token && location.pathname !== '/login') {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 如果有 token 且在登录页，跳转到首页
  if (token && location.pathname === '/login') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default AuthGuard
