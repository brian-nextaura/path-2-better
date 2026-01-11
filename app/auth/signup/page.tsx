import { SignupForm } from '@/components/auth/SignupForm';

export const metadata = {
  title: 'Sign Up - Path2Better',
  description: 'Create your Path2Better account',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full">
        <SignupForm />
      </div>
    </div>
  );
}
