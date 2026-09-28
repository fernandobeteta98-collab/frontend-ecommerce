'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-xl mx-auto my-16 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
      <h2 className="text-xl font-bold text-red-700 mb-2">Error de Segmento</h2>
      <p className="text-slate-600 text-sm mb-4">
        {error.message || 'Ocurrió un problema al obtener los datos de la API.'}
      </p>
      <button
        onClick={() => reset()}
        className="bg-red-600 text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Reintentar
      </button>
    </div>
  );
}