'use client';

import { useCart } from '@/context/CartContext';
import { createOrderAction } from '@/lib/actions';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setError(null);

    const items = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const result = await createOrderAction(items);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.checkout_url) {
      clearCart();
      window.location.href = result.checkout_url;
    } else {
      clearCart();
      window.location.href = '/checkout/success';
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Tu Carrito de Compras</h1>

      {cart.length === 0 ? (
        <div className="p-8 text-center bg-white border rounded-xl text-slate-500">
          Tu carrito está vacío.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded-xl bg-white shadow-sm">
                <div>
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-xs text-slate-500">
                    Cantidad: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-indigo-600">${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xs font-semibold hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border rounded-xl p-6 h-fit space-y-4 shadow-sm">
            <h2 className="text-lg font-bold border-b pb-2">Resumen de Orden</h2>
            <div className="flex justify-between font-extrabold text-xl">
              <span>Total:</span>
              <span className="text-indigo-600">${total.toFixed(2)}</span>
            </div>

            {error && <p className="text-red-600 text-xs bg-red-50 p-2 rounded">{error}</p>}

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {loading ? 'Procesando Pago...' : 'Pagar con Stripe 💳'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}