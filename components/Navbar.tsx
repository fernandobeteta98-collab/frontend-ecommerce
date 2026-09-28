'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { logoutAction } from '@/lib/actions';

export default function Navbar({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-400">
          ⚡ NextShop
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/" className="hover:text-indigo-300 transition">
            Catálogo
          </Link>

          <Link href="/checkout" className="relative hover:text-indigo-300 transition">
            🛒 Carrito
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-indigo-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/orders" className="hover:text-indigo-300 transition">
                Historial
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1.5 rounded transition"
                >
                  Cerrar Sesión
                </button>
              </form>
            </>
          ) : (
            <div className="space-x-3">
              <Link href="/login" className="hover:text-indigo-300 transition">
                Ingresar
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-xs px-3 py-1.5 rounded font-semibold transition"
              >
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}