interface LoadingSpinnerProps {
  size?: number; // default 24
  color?: string; // tailwind color class
}

export default function LoadingSpinner({
  size = 24,
  color = "border-red-500",
}: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className={`inline-block animate-spin rounded-full border-2 border-t-transparent ${color}`}
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
}
