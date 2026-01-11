'use client';

import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

function LoginContent() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <LoginContent />;
}
