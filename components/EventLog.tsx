"use client";

import { useCallback, useState } from "react";

export interface LogEntry {
  id: string;
  eventType: string;
  target: string;
  timestamp: Date;
}

interface EventLogProps {
  logs: LogEntry[];
  onClear?: () => void;
}

export function EventLog({ logs, onClear }: EventLogProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2">
        <span className="text-sm font-medium text-zinc-700">Event Log</span>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-zinc-500 hover:text-zinc-700"
          >
            Clear
          </button>
        )}
      </div>
      <div className="h-48 overflow-y-auto p-2 font-mono text-sm">
        {logs.length === 0 ? (
          <p className="text-zinc-400 text-center py-4">
            No events yet. Interact with the demo above.
          </p>
        ) : (
          <ul className="space-y-1">
            {logs.map((log) => (
              <li key={log.id} className="flex gap-2 text-xs">
                <span className="text-zinc-400">
                  {log.timestamp.toLocaleTimeString()}
                </span>
                <span className="font-semibold text-blue-600">
                  {log.eventType}
                </span>
                <span className="text-zinc-600">{log.target}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function useEventLog() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((eventType: string, target: string) => {
    setLogs((prev) => [
      { id: crypto.randomUUID(), eventType, target, timestamp: new Date() },
      ...prev,
    ]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return { logs, addLog, clearLogs };
}
