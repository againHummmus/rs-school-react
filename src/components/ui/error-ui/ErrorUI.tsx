import { useRouteError } from "react-router";

export default function ErrorUI({ error, className = "" }: { error?: string | null; className?: string }) {
  const routeError = useRouteError();
  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <div className="rounded-3xl max-w-xl border border-red-900 p-8 bg-red-950/20 backdrop-blur-lg shadow-2xl">
        <h1 className="text-4xl font-display text-white mb-2">
          Something went wrong
        </h1>

        <p className="text-red-300 text-sm mb-6 rounded">
          Error: {String(error ?? routeError)}
        </p>

        <blockquote className="text-gray-300 italic mb-8 border-l-2pl-4 leading-relaxed">
          To encounter an error is to realize that the design of the
          universe is not a static script, but a dialogue. It is the moment
          the world gently reminds you that the map is not the territory,
          and perfection is merely the absence of experience.
        </blockquote>

        <div className="flex items-center gap-4">
          <button
            className="cursor-pointer bg-red-700/40 border border-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700/60 transition-all font-semibold"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
