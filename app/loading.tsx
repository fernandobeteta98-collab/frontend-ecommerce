export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-600 font-medium animate-pulse">Cargando datos...</p>
    </div>
  );
}