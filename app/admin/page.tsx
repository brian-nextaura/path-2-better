'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const isAuth = sessionStorage.getItem('admin_auth');
    if (isAuth === 'true') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'path2better2025') {
      sessionStorage.setItem('admin_auth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-neutral-charcoal mb-2">Admin Access</h1>
          <p className="text-neutral-gray mb-8">Enter your password to access the dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-neutral-charcoal mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Logging in...' : 'Access Dashboard'}
            </Button>
          </form>

          <p className="text-xs text-neutral-gray mt-6 text-center">
            This area is restricted to authorized agency staff only.
          </p>
        </div>
      </div>
    </div>
  );
}
