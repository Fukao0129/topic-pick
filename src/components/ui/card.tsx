export function Card({
  className = "",
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={`rounded bg-white shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
}
