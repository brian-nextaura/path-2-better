'use client';

import { useState, useCallback, useEffect } from 'react';
import { User } from '@/lib/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Check if user is logged in on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setState({ user: data.user, isLoading: false, error: null });
        } else {
          setState({ user: null, isLoading: false, error: null });
        }
      } catch {
        setState({ user: null, isLoading: false, error: null });
      }
    }

    checkAuth();
  }, []);

  const signup = useCallback(
    async (email: string, password: string, firstName: string, lastName: string, userType: 'donor' | 'agency_admin' = 'donor') => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, firstName, lastName, userType }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Signup failed');
        }

        const data = await response.json();
        setState({ user: data.user, isLoading: false, error: null });
        return data.user;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Signup failed';
        setState({ user: null, isLoading: false, error: errorMessage });
        throw error;
      }
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Login failed');
        }

        const data = await response.json();
        setState({ user: data.user, isLoading: false, error: null });
        return data.user;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed';
        setState({ user: null, isLoading: false, error: errorMessage });
        throw error;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setState({ user: null, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      setState({ user: null, isLoading: false, error: errorMessage });
    }
  }, []);

  return {
    ...state,
    signup,
    login,
    logout,
    isAuthenticated: state.user !== null,
  };
}
