'use client';

import ErrorUI from '@/components/ui/error-ui/ErrorUI';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center">
      <ErrorUI error={error.message} reset={reset} />
    </div>
  );
}
