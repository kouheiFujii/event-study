"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { DemoLayout } from "@/components/DemoLayout";
import { EventLog, useEventLog } from "@/components/EventLog";

const codeStopPropagation = `// stopPropagation: 親への伝播を止める
<button onClick={(e) => {
  e.stopPropagation();
  // 親のonClickは発火しない
}}>`;

const codePreventDefault = `// preventDefault: ブラウザの標準動作を止める
<form onSubmit={(e) => {
  e.preventDefault();  // ページリロードを防ぐ
  // 自前の送信処理
}}>

<a href="/page" onClick={(e) => {
  e.preventDefault();  // ページ遷移を防ぐ
  // 自前の処理
}}>`;

const comparison = [
  {
    method: "stopPropagation()",
    what: "イベントの伝播",
    target: "親要素のハンドラ",
    example: "モーダル即閉じ防止",
  },
  {
    method: "preventDefault()",
    what: "ブラウザの標準動作",
    target: "リロード、遷移など",
    example: "SPA内のフォーム送信",
  },
];

export default function Demo6() {
  const [formSubmittedWithPrevent, setFormSubmittedWithPrevent] =
    useState(false);
  const { logs, addLog, clearLogs } = useEventLog();

  const handleFormSubmit = () => {
    addLog("submit", "フォーム（通常）→ リロードされます");
  };

  const handleFormSubmitWithPrevent = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmittedWithPrevent(true);
    addLog("submit", "フォーム（preventDefault）→ リロードなし");
    setTimeout(() => setFormSubmittedWithPrevent(false), 1500);
  };

  const handleLinkClick = () => {
    addLog("click", "リンク（通常）→ ページ遷移します");
  };

  const handleLinkClickWithPrevent = (e: React.MouseEvent) => {
    e.preventDefault();
    addLog("click", "リンク（preventDefault）→ 遷移せず処理だけ実行");
  };

  return (
    <DemoLayout
      title="Demo 6: preventDefaultとの違い"
      description="stopPropagationと似ているけど全く別の機能"
      prevHref="/demo5"
      prevLabel="Demo 5"
      nextHref="/demo7"
      nextLabel="Demo 7"
      materialContent={
        <>
          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">似ているけど別物</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              前章で{" "}
              <code className="rounded bg-zinc-100 px-1">
                stopPropagation()
              </code>{" "}
              を学びました。 実は似た名前のメソッドに{" "}
              <code className="rounded bg-zinc-100 px-1">preventDefault()</code>{" "}
              があります。 混同しやすいですが、<strong>全く別の機能</strong>
              です。
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">比較表</h3>
            <div className="rounded border border-zinc-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      メソッド
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      何を止める？
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      対象
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      例
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {comparison.map((item) => (
                    <tr key={item.method}>
                      <td className="px-3 py-2 font-mono text-blue-600 whitespace-nowrap">
                        {item.method}
                      </td>
                      <td className="px-3 py-2 text-zinc-600">{item.what}</td>
                      <td className="px-3 py-2 text-zinc-600">{item.target}</td>
                      <td className="px-3 py-2 text-zinc-600">
                        {item.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">
              stopPropagation（復習）
            </h3>
            <CodeBlock code={codeStopPropagation} />
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">preventDefault</h3>
            <CodeBlock code={codePreventDefault} />
          </div>

          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            <strong>重要:</strong> この2つは独立した機能です。
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>伝播を止めても標準動作は止まらない</li>
              <li>標準動作を止めても伝播は止まらない</li>
              <li>両方止めたいなら両方呼ぶ必要がある</li>
            </ul>
          </div>
        </>
      }
      demoContent={
        <>
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-zinc-700">
                フォーム送信の標準動作
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-2 text-xs text-zinc-500">
                    通常（リロードする）
                  </p>
                  <form onSubmit={handleFormSubmit}>
                    <button
                      type="submit"
                      className="w-full rounded bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      送信
                    </button>
                  </form>
                  <p className="mt-2 text-xs text-zinc-400">
                    ※ ページがリロードされます
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs text-zinc-500">preventDefault</p>
                  <form onSubmit={handleFormSubmitWithPrevent}>
                    <button
                      type="submit"
                      className={`w-full rounded px-3 py-2 text-xs font-medium text-white transition-all ${
                        formSubmittedWithPrevent
                          ? "bg-green-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {formSubmittedWithPrevent
                        ? "送信成功！"
                        : "送信（リロードなし）"}
                    </button>
                  </form>
                  <p className="mt-2 text-xs text-green-600">
                    リロードせずに処理できる
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-zinc-700">
                リンククリックの標準動作
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-2 text-xs text-zinc-500">通常（遷移する）</p>
                  <a
                    href="https://example.com"
                    onClick={handleLinkClick}
                    className="inline-block w-full rounded bg-blue-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-700"
                  >
                    外部リンク
                  </a>
                  <p className="mt-2 text-xs text-zinc-400">
                    ※ 別サイトへ遷移します
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs text-zinc-500">preventDefault</p>
                  <a
                    href="https://example.com"
                    onClick={handleLinkClickWithPrevent}
                    className="inline-block w-full rounded bg-green-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-green-700"
                  >
                    外部リンク（遷移なし）
                  </a>
                  <p className="mt-2 text-xs text-green-600">
                    遷移せずログだけ記録
                  </p>
                </div>
              </div>
            </div>
          </div>

          <EventLog logs={logs} onClear={clearLogs} />
        </>
      }
    />
  );
}
