#  Frontend E-Commerce - Next.js (App Router) & Web Vitals

Aplicación web frontend desarrollada con **Next.js 16+ (App Router)**, **TypeScript** y **Tailwind CSS**. Consume de manera segura y eficiente la API REST de E-Commerce creada en **Laravel 12 + Swagger + Stripe**, integrando autenticación por cookies `httpOnly`, mutaciones asíncronas mediante Server Actions, manejo de resiliencia con `loading.tsx` / `error.tsx`, e integración con la pasarela de pagos de Stripe.

---

##  Stack Tecnológico

- **Framework:** Next.js 16+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Estrategia de Renderizado:** 
  - **Server Components:** Peticiones `fetch` en el servidor para lectura eficiente del catálogo e historial.
  - **Server Actions:** Mutaciones asíncronas seguras (Login, Registro, Creación de órdenes y procesamiento de pago).
- **Autenticación:** Tokens almacenados en cookies de servidor `httpOnly` gestionadas mediante `next/headers` y resguardadas con `middleware.ts`.
- **Rendimiento:** Optimización de Web Vitals mediante `<Suspense>`, revalidación con `revalidatePath()`, e imágenes optimizadas.

---

##  Configuración de Variables de Entorno (`.env.example`)

Crea un archivo `.env.local` en la raíz del proyecto basándote en la siguiente plantilla:

```env
# URL Base de la API REST en Laravel
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Clave pública de Stripe para el checkout
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51UKVEr6MaU4HdMaqbkLyKxH0F3b6O6uRK1O94DTzu1wdWit5KoC76yM1OleOn5KycAvaag6wrxGBQ29zoPGhBeYQ00sj6WWGPn