import { fetchAPI } from '@/lib/api';

export default async function OrdersPage() {
  let orders = [];

  try {
    const res = await fetchAPI('/orders');
    orders = Array.isArray(res) ? res : res.data || [];
  } catch (err) {
    return (
      <div className="max-w-4xl mx-auto p-4 my-8 bg-red-50 text-red-700 rounded-xl">
        Error al recuperar el historial. Asegúrate de iniciar sesión.
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Historial de Compras</h1>

      {orders.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center text-slate-500">
          Aún no has realizado ninguna orden.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-white border rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center border-b pb-3 mb-3">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">Orden #{order.id}</span>
                  <p className="text-sm text-slate-600">
                    {new Date(order.created_at || Date.now()).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  {order.status || 'Completada'}
                </span>
              </div>

              <div className="space-y-2">
                {order.items?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm text-slate-700">
                    <span>
                      {item.product?.name || item.name || `Producto #${item.product_id}`} (x{item.quantity})
                    </span>
                    <span className="font-medium">${Number(item.price || 0).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 mt-3 flex justify-between items-center font-bold text-slate-900">
                <span>Total Pagado:</span>
                <span className="text-indigo-600 text-lg">${Number(order.total || 0).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}