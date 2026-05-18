import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <h1 className="text-text font-display text-8xl">404</h1>
      <p className="text-foreground/70 text-xl">Page not found</p>
      <Link
        to="/"
        className="text-accent font-semibold hover:opacity-70 transition-opacity underline"
      >
        Go home!
      </Link>
    </div>
  );
}
