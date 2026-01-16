"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { DemoLayout } from "@/components/DemoLayout";
import { EventLog, useEventLog } from "@/components/EventLog";

const codeExample = `// Reactでのイベントハンドリング
<button onClick={handleClick}>クリック</button>
<input onChange={handleChange} />
<form onSubmit={handleSubmit}>`;

const eventList = [
  { event: "click", description: "要素がクリックされた" },
  { event: "change", description: "入力値が変更された" },
  { event: "input", description: "入力中（リアルタイム）" },
  { event: "submit", description: "フォームが送信された" },
  { event: "keydown", description: "キーが押された" },
  { event: "keyup", description: "キーが離された" },
  { event: "focus", description: "要素にフォーカスが当たった" },
  { event: "blur", description: "要素からフォーカスが外れた" },
];

export default function Demo1() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const { logs, addLog, clearLogs } = useEventLog();

  const handleClick = () => {
    setCount((prev) => prev + 1);
    addLog("click", "button");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    addLog("change", "input");
  };

  return (
    <DemoLayout
      title="Demo 1: イベントとは？"
      description="ユーザー操作をきっかけに処理を実行する仕組み"
      prevHref="/"
      prevLabel="トップ"
      nextHref="/demo2"
      nextLabel="Demo 2"
      materialContent={
        <>
          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">イベントとは</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              イベントとは、ブラウザ上で発生する「出来事」のことです。
              ユーザーがクリックしたり、キーを押したりすると、
              ブラウザはそれをイベントとして検知します。
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">代表的なイベント</h3>
            <div className="rounded border border-zinc-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      イベント
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      発火タイミング
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {eventList.map((item) => (
                    <tr key={item.event}>
                      <td className="px-3 py-2 font-mono text-blue-600">
                        {item.event}
                      </td>
                      <td className="px-3 py-2 text-zinc-600">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">Reactでの書き方</h3>
            <CodeBlock code={codeExample} />
          </div>
        </>
      }
      demoContent={
        <>
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-zinc-700">
                クリックイベント
              </h3>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleClick}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  クリック
                </button>
                <span className="text-zinc-600">
                  カウント: <strong className="text-zinc-900">{count}</strong>
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-zinc-700">
                入力イベント
              </h3>
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="何か入力してください"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              {inputValue && (
                <p className="mt-2 text-sm text-zinc-600">
                  入力値:{" "}
                  <strong className="text-zinc-900">{inputValue}</strong>
                </p>
              )}
            </div>
          </div>

          <EventLog logs={logs} onClear={clearLogs} />
        </>
      }
    />
  );
}
