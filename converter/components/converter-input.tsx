import { Textarea } from "@/shared/components/ui/textarea";

interface InputProps {
  input: string;
  setInput: (val: string) => void;
}

function plural(n: number, one: string, other: string) {
  return n === 1 ? one : other;
}

export function ConverterInput({ input, setInput }: InputProps) {
  const lineCount = input ? input.split("\n").length : 0;

  return (
    <div className="flex flex-col border-b md:border-r md:border-b-0">
      <div className="flex items-center justify-between border-b px-4 py-2.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-sky-400" /> JSON
        </span>
        <span>
          {lineCount} {plural(lineCount, "line", "lines")}
          {input.trim() && (
            <button
              onClick={() => setInput("")}
              className="ml-1 hover:text-destructive"
            >
              · clear
            </button>
          )}
        </span>
      </div>
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
        placeholder={'{\n  "name": "Ada",\n  "age": 36\n}'}
        className="flex-1 resize-none border-0 bg-transparent p-4 font-mono text-sm focus-visible:ring-0"
      />
    </div>
  );
}
