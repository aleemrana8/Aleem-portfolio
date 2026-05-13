'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Profile', href: '/admin/profile' },
  { label: 'Experience', href: '/admin/experience' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Skills', href: '/admin/skills' },
  { label: 'Blog', href: '/admin/blog' },
  { label: 'Testimonials', href: '/admin/testimonials' },
  { label: 'Messages', href: '/admin/messages' },
  { label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, logout, hydrate } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    hydrate();
    setHydrated(true);
  }, [hydrate]);

  useEffect(() => {
    if (hydrated && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [hydrated, isAuthenticated, pathname, router]);

  if (!hydrated) return null;

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex bg-navy">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-light border-r border-navy-light flex flex-col">
        <div className="p-4 border-b border-navy-light">
          <h2 className="text-accent font-bold text-lg">Portfolio Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-accent/10 text-accent'
                  : 'text-slate hover:text-slate-lightest hover:bg-navy'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-navy-light">
          <p className="text-slate-light text-sm truncate">{user?.email}</p>
          <button
            onClick={() => { logout(); router.push('/admin/login'); }}
            className="mt-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
