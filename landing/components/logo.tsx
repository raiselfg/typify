interface Props {
  className?: string;
}

export function Logo({ className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-baseline font-mono font-bold tracking-tight ${className}`}
    >
      <span className="text-indigo-400">t</span>ypify
      <span className="typify-caret ml-1 inline-block h-[0.85em] w-[0.45em] translate-y-[0.1em] bg-indigo-400 shadow-[0_0_10px] shadow-indigo-500/50" />
    </span>
  );
}
