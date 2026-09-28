'use client';

import { loginAction } from '@/lib/actions';
import { useActionState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <main className="max-w-md mx-auto my-16 px-4">
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">Iniciar Sesión</h1>

        {state?.error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-4">{state.error}</div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-indigo-600"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg text-sm hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isPending ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-6">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="text-indigo-600 font-bold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </main>
  );
}