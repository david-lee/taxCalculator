import React from "react";

interface ErrorFallbackProps {
  error: { message: string };
  resetErrorBoundary?: () => void;
}
const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>    
  );
}

export default ErrorFallback;
