interface LoaderProps {
  size?: "small" | "medium" | "large";
}

export const Loader = ({size = "medium"}: LoaderProps) => {
  const sizeClasses = {
    small: "h-12 w-12 border-4 border-t-4",
    medium: "h-20 w-20 border-4 border-t-4",
    large: "h-28 w-28 border-4 border-t-4",
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div
        className={`border-primary border-t-secondary animate-spin rounded-full ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};
