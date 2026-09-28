'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// --- ACCIÓN DE LOGIN ---
export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || 'Credenciales inválidas' };
    }

    const cookieStore = await cookies();
    cookieStore.set('auth_token', data.token || data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  } catch (err: any) {
    return { error: err.message || 'Error de conexión con la API' };
  }

  revalidatePath('/');
  redirect('/');
}

// --- ACCIÓN DE REGISTRO ---
export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || 'Error en el registro' };
    }

    const cookieStore = await cookies();
    cookieStore.set('auth_token', data.token || data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  } catch (err: any) {
    return { error: err.message || 'Error al conectar con el servidor' };
  }

  revalidatePath('/');
  redirect('/');
}

// --- ACCIÓN DE LOGOUT ---
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  revalidatePath('/');
  redirect('/login');
}

// --- ACCIÓN DE CREAR ORDEN Y PAGO ---
export async function createOrderAction(items: { product_id: number; quantity: number }[]) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return { error: 'Debes iniciar sesión para realizar la compra' };
  }

  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || 'Error al crear la orden' };
    }

    revalidatePath('/orders');
    return { success: true, checkout_url: data.checkout_url || data.url, order: data };
  } catch (err: any) {
    return { error: err.message || 'Error al procesar el pedido' };
  }
}