interface CodeBlockProps {
  code: string;
  title?: string;
}

export function CodeBlock({ code, title }: CodeBlockProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-900 overflow-hidden">
      {title && (
        <div className="bg-zinc-800 px-4 py-2 text-xs text-zinc-400 border-b border-zinc-700">
          {title}
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-zinc-100 font-mono whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}
