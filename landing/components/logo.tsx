interface Props {
  className?: string;
}

export function Logo({ className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-baseline font-mono font-bold tracking-tight ${className}`}
    >
      <span className="text-indigo-400">t</span>ypify
    </span>
  );
}
