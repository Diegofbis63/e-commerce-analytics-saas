# E-commerce Analytics SaaS

Dashboard de análisis de datos con IA para e-commerce.

## Características

- **Dashboard con Gráficos Interactivos** - Visualizaciones en tiempo real usando Recharts
- **Predicciones de Ventas** - IA que predice ventas futuras
- **Análisis de Stock Crítico** - Alertas automáticas de inventario bajo
- **Segmentación de Clientes VIP** - CLV (Customer Lifetime Value) por segmento
- **Diseño Liquid Luxury** - Glassmorphism extremo con modo oscuro futurista

## Tech Stack

- Next.js 14 (App Router)
- Supabase (PostgreSQL + Auth + RLS)
- Recharts
- Tailwind CSS
- Framer Motion
- TypeScript

## Getting Started

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase
```

3. Ejecutar el servidor de desarrollo:
```bash
npm run dev
```

4. Abrir [http://localhost:3000](http://localhost:3000)

## Configuración de Supabase

1. Crear un proyecto en [Supabase](https://supabase.com)
2. Ejecutar el schema:
```bash
psql -h your-project-host -U postgres -d postgres -f supabase/schema.sql
```
3. Obtener las credenciales y guardarlas en `.env.local`

## Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Dashboard principal
│   ├── layout.tsx         # Layout raíz
│   └── globals.css        # Estilos globales
├── components/
│   ├── dashboard/         # Componentes del dashboard
│   └── layout/            # Componentes de layout
└── lib/
    └── supabase.ts        # Cliente de Supabase
```

## Licencia

MIT
