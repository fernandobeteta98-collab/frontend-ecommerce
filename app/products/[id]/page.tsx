import Link from 'next/link';

const MOCK_PRODUCTS: Record<string, any> = {
  '1': { id: 1, name: 'Camiseta Premium Next.js', price: 29.99, description: 'Camiseta de algodón de alta calidad con logo de Next.js.' },
  '2': { id: 2, name: 'Sudadera Laravel 12', price: 49.99, description: 'Sudadera cómoda y cálida para desarrolladores backend.' },
  '3': { id: 3, name: 'Taza de Café Web Vitals', price: 14.99, description: 'Taza cerámica ideal para tus jornadas de optimización.' },
  '4': { id: 4, name: 'Gorra Developer Pro', price: 19.99, description: 'Gorra bordada con visera curva de alta durabilidad.' },
};

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = MOCK_PRODUCTS[id] || MOCK_PRODUCTS['1'];

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-indigo-600 font-medium hover:underline mb-6 inline-block">
        ← Volver al catálogo
      </Link>
      
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-100 rounded-xl h-64 flex items-center justify-center text-6xl">
          📦
        </div>
        
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
            <p className="text-3xl font-black text-indigo-600 mt-2">${product.price.toFixed(2)}</p>
            <p className="text-slate-600 mt-4 text-sm leading-relaxed">{product.description}</p>
          </div>
          
          <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition mt-6">
            Agregar al Carrito 🛒
          </button>
        </div>
      </div>
    </main>
  );
}