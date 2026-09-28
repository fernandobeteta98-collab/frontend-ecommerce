import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="max-w-md mx-auto my-16 p-8 bg-white border rounded-2xl text-center shadow-sm">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl mb-4 font-bold">
        ✓
      </div>
      <h1 className="text-2xl font-bold text-slate-900">¡Pago Confirmado!</h1>
      <p className="text-slate-600 text-sm mt-2">
        Tu orden ha sido procesada exitosamente en Stripe.
      </p>
      <div className="mt-6 space-y-2">
        <Link
          href="/orders"
          className="block w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition"
        >
          Ver Historial de Compras
        </Link>
        <Link
          href="/"
          className="block w-full border border-slate-300 text-slate-700 font-semibold py-2.5 rounded-xl text-sm hover:bg-slate-50 transition"
        >
          Volver al Catálogo
        </Link>
      </div>
    </main>
  );
}