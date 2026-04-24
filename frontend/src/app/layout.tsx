import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zimple Barbería',
  description: 'Sistema de reservas para barbería',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
