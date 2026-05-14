import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-navy-950">
      <div className="text-center max-w-md">
        <div className="text-7xl font-bold text-accent/15 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-lightest mb-3">
          Page not found
        </h1>
        <p className="text-slate text-sm mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          <span className="relative z-10">Go Home</span>
        </Link>
      </div>
    </div>
  );
}
