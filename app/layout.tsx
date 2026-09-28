import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce Frontend Next.js',
  description: 'E-Commerce optimizado con Web Vitals y Server Actions',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get('auth_token')?.value;

  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <CartProvider>
          <Navbar isAuthenticated={isAuthenticated} />
          <div className="flex-1">{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}