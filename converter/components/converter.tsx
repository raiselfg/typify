"use client";

import { useState } from "react";
import { generate } from "@/converter/lib/generate";
import { Lib, EXAMPLE } from "@/converter/constants";
import { ConverterToolbar } from "./converter-toolbar";
import { ConverterInput } from "./converter-input";
import { ConverterOutput } from "./converter-output";

export default function Converter() {
  const [input, setInput] = useState(EXAMPLE);
  const [lib, setLib] = useState<Lib>("zod");
  const [name, setName] = useState<string>("");

  const result = generate(input, lib, name);

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-lg">
      <ConverterToolbar
        lib={lib}
        setLib={setLib}
        name={name}
        setName={setName}
        setInput={setInput}
        result={result}
      />

      <div className="grid min-h-120 grid-cols-1 md:grid-cols-2">
        <ConverterInput input={input} setInput={setInput} />
        <ConverterOutput result={result} input={input} lib={lib} />
      </div>
    </div>
  );
}
