"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { DemoLayout } from "@/components/DemoLayout";
import { EventLog, useEventLog } from "@/components/EventLog";

const codeExampleMouse = `const handleClick = (e: React.MouseEvent) => {
  console.log(e.target);    // クリックされた要素
  console.log(e.clientX);   // X座標
  console.log(e.clientY);   // Y座標
};`;

const codeExampleKey = `const handleKeyDown = (e: React.KeyboardEvent) => {
  console.log(e.key);       // 押されたキー
  console.log(e.code);      // キーコード
};`;

const properties = [
  { name: "target", description: "イベントが発生した要素" },
  { name: "currentTarget", description: "イベントハンドラが設定された要素" },
  { name: "type", description: "イベントの種類（click, keydownなど）" },
  {
    name: "clientX / clientY",
    description: "マウスのX/Y座標（ビューポート基準）",
  },
  { name: "key", description: "押されたキーの値" },
  { name: "code", description: "押されたキーのコード" },
];

interface ClickPosition {
  x: number;
  y: number;
}

export default function Demo2() {
  const [clickPosition, setClickPosition] = useState<ClickPosition | null>(
    null,
  );
  const [pressedKey, setPressedKey] = useState<string>("");
  const [targetInfo, setTargetInfo] = useState<string>("");
  const { logs, addLog, clearLogs } = useEventLog();

  const handleAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setClickPosition({ x, y });
    addLog("click", `position: (${x}, ${y})`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setPressedKey(e.key);
    addLog("keydown", `key: "${e.key}"`);
  };

  const handleTargetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    setTargetInfo(
      `tagName: ${target.tagName}, className: "${target.className.slice(0, 30)}..."`,
    );
    addLog("click", `target: <${target.tagName.toLowerCase()}>`);
  };

  return (
    <DemoLayout
      title="Demo 2: イベントオブジェクト"
      description="イベント発生時に渡される情報の塊"
      prevHref="/demo1"
      prevLabel="Demo 1"
      nextHref="/demo3"
      nextLabel="Demo 3"
      materialContent={
        <>
          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">
              イベントオブジェクトとは
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              イベントが発生すると、ブラウザは自動的に
              <strong>イベントオブジェクト</strong>を生成し、
              イベントハンドラに渡します。このオブジェクトには、
              イベントに関する様々な情報が含まれています。
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">主要なプロパティ</h3>
            <div className="rounded border border-zinc-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      プロパティ
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      説明
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {properties.map((prop) => (
                    <tr key={prop.name}>
                      <td className="px-3 py-2 font-mono text-blue-600">
                        {prop.name}
                      </td>
                      <td className="px-3 py-2 text-zinc-600">
                        {prop.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">マウスイベント</h3>
            <CodeBlock code={codeExampleMouse} />
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">キーボードイベント</h3>
            <CodeBlock code={codeExampleKey} />
          </div>
        </>
      }
      demoContent={
        <>
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-zinc-700">
                クリック位置（clientX / clientY）
              </h3>
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: マウスクリック位置デモ用 */}
              {/* biome-ignore lint/a11y/noStaticElementInteractions: マウスクリック位置デモ用 */}
              <div
                onClick={handleAreaClick}
                className="relative h-32 cursor-crosshair rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50"
              >
                <span className="absolute inset-0 flex items-center justify-center text-sm text-zinc-400">
                  この領域をクリック
                </span>
                {clickPosition && (
                  <span
                    className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600"
                    style={{ left: clickPosition.x, top: clickPosition.y }}
                  />
                )}
              </div>
              {clickPosition && (
                <p className="mt-2 text-sm text-zinc-600">
                  位置:{" "}
                  <strong className="font-mono text-zinc-900">
                    ({clickPosition.x}, {clickPosition.y})
                  </strong>
                </p>
              )}
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-zinc-700">
                押されたキー（event.key）
              </h3>
              <input
                type="text"
                onKeyDown={handleKeyDown}
                placeholder="ここでキーを押してください"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              {pressedKey && (
                <p className="mt-2 text-sm text-zinc-600">
                  押されたキー:{" "}
                  <strong className="font-mono text-zinc-900">
                    "{pressedKey}"
                  </strong>
                </p>
              )}
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-zinc-700">
                event.target の情報
              </h3>
              <button
                type="button"
                onClick={handleTargetClick}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                クリックして target を確認
              </button>
              {targetInfo && (
                <p className="mt-2 text-sm text-zinc-600 font-mono break-all">
                  {targetInfo}
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
