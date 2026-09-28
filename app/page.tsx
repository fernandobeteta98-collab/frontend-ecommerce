import { Suspense } from 'react';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Camiseta Premium Next.js', price: 29.99, description: 'Camiseta de algodón de alta calidad con logo de Next.js.' },
  { id: 2, name: 'Sudadera Laravel 12', price: 49.99, description: 'Sudadera cómoda y cálida para desarrolladores backend.' },
  { id: 3, name: 'Taza de Café Web Vitals', price: 14.99, description: 'Taza cerámica ideal para tus jornadas de optimización.' },
  { id: 4, name: 'Gorra Developer Pro', price: 19.99, description: 'Gorra bordada con visera curva de alta durabilidad.' },
];

async function ProductList() {
  let products = [];
  try {
    const response = await fetchAPI('/products', { next: { revalidate: 60, tags: ['products'] } });
    products = Array.isArray(response) ? response : response.data || [];
  } catch (err) {
    products = MOCK_PRODUCTS;
  }

  if (products.length === 0) {
    products = MOCK_PRODUCTS;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p: any) => (
        <div
          key={p.id}
          className="border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white"
        >
          <div>
            <div className="w-full h-40 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-3xl">
              📦
            </div>
            <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{p.name || p.title}</h3>
            <p className="text-slate-500 text-sm mt-1 line-clamp-2">
              {p.description || 'Producto en catálogo.'}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xl font-black text-indigo-600">${Number(p.price).toFixed(2)}</span>
            <Link
              href={`/products/${p.id}`}
              className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg font-medium hover:bg-slate-800 transition"
            >
              Ver Detalle →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="border border-slate-200 rounded-xl p-5 h-72 bg-slate-100" />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Catálogo de Productos</h1>
        <p className="text-slate-600 text-sm mt-1">Renderizado desde Server Components con Suspense.</p>
      </div>

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductList />
      </Suspense>
    </main>
  );
}