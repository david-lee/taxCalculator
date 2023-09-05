import { Button } from "@mui/material";

interface ErrorFallbackProps {
  error: { message: string };
  resetErrorBoundary?: () => void;
}

// It is a fallback component to show an error message. It will be called from ErroBoundary component
const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div role="alert">
      <p>
        Thank you for making us aware of the issue. We hope to solve the problem as soon as possible.
      </p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try Again</Button>
    </div>    
  );
}

export default ErrorFallback;
