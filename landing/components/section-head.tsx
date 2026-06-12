interface Props {
  kicker: string;
  title: string;
  sub?: string;
  center?: boolean;
}

export function SectionHead({ kicker, title, sub, center = false }: Props) {
  return (
    <div className={`mb-11 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <div className="mb-3.5 font-mono text-[13px] tracking-[0.06em] text-indigo-400 uppercase">
        {kicker}
      </div>
      <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl md:text-[44px]">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-[17px] text-pretty text-muted-foreground">
          {sub}
        </p>
      )}
    </div>
  );
}
