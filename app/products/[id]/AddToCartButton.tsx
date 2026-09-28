'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name || product.title,
      price: Number(product.price),
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-3 rounded-xl font-bold text-white transition ${
        added ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700'
      }`}
    >
      {added ? '✓ ¡Añadido al Carrito!' : 'Agregar al Carrito'}
    </button>
  );
}