"use client";

import { useCallback, useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { DemoLayout } from "@/components/DemoLayout";
import { EventLog, useEventLog } from "@/components/EventLog";

const codeExample = `// 子をクリックすると親のonClickも発火する
<div onClick={() => console.log('親')}>
  <button onClick={() => console.log('子')}>
    クリック
  </button>
</div>
// 結果: '子' → '親'`;

const phases = [
  {
    phase: "1. キャプチャリング",
    direction: "親 → 子",
    description: "DOMツリーを下に向かって伝播",
  },
  {
    phase: "2. ターゲット",
    direction: "—",
    description: "実際にクリックされた要素",
  },
  {
    phase: "3. バブリング",
    direction: "子 → 親",
    description: "DOMツリーを上に向かって伝播",
  },
];

type HighlightedElement = "outer" | "middle" | "inner" | null;

export default function Demo3() {
  const [highlighted, setHighlighted] = useState<HighlightedElement[]>([]);
  const { logs, addLog, clearLogs } = useEventLog();

  const handleClick = useCallback(
    (element: HighlightedElement) => {
      return () => {
        setHighlighted((prev) => [...prev, element]);
        addLog("click", `<${element}>`);

        setTimeout(() => {
          setHighlighted([]);
        }, 1500);
      };
    },
    [addLog],
  );

  const isHighlighted = (element: HighlightedElement) =>
    highlighted.includes(element);

  const getHighlightClass = (element: HighlightedElement) => {
    if (!isHighlighted(element)) return "";
    const index = highlighted.indexOf(element);
    const colors = ["ring-blue-500", "ring-green-500", "ring-orange-500"];
    return `ring-4 ${colors[index] || "ring-blue-500"}`;
  };

  return (
    <DemoLayout
      title="Demo 3: イベントの伝播"
      description="クリックイベントが親要素へ伝わる仕組み"
      prevHref="/demo2"
      prevLabel="Demo 2"
      nextHref="/demo4"
      nextLabel="Demo 4"
      materialContent={
        <>
          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">バブリングとは</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              子要素で発生したイベントが、親要素へと順番に伝播していく仕組みです。
              泡（バブル）が水面に向かって上がっていく様子に例えられます。
            </p>
            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
              子要素をクリック → 親要素のイベントハンドラも発火
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">
              イベント伝播の3フェーズ
            </h3>
            <div className="rounded border border-zinc-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      フェーズ
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      方向
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      説明
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {phases.map((item) => (
                    <tr key={item.phase}>
                      <td className="px-3 py-2 font-medium text-zinc-800">
                        {item.phase}
                      </td>
                      <td className="px-3 py-2 font-mono text-blue-600">
                        {item.direction}
                      </td>
                      <td className="px-3 py-2 text-zinc-600">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-500">
              ※
              Reactのイベントハンドラはデフォルトでバブリングフェーズで発火します
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">コード例</h3>
            <CodeBlock code={codeExample} />
          </div>
        </>
      }
      demoContent={
        <>
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-zinc-700">
                バブリングの可視化
              </h3>
              <p className="mb-4 text-xs text-zinc-500">
                内側の要素をクリックすると、イベントが親に伝播する様子が見えます
              </p>

              {/* biome-ignore lint/a11y/useKeyWithClickEvents: バブリングデモ用 */}
              {/* biome-ignore lint/a11y/noStaticElementInteractions: バブリングデモ用 */}
              <div
                onClick={handleClick("outer")}
                className={`rounded-lg border-2 border-zinc-300 bg-zinc-100 p-4 transition-all ${getHighlightClass("outer")}`}
              >
                <div className="mb-2 text-xs font-medium text-zinc-500">
                  外側（outer）
                </div>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: バブリングデモ用 */}
                {/* biome-ignore lint/a11y/noStaticElementInteractions: バブリングデモ用 */}
                <div
                  onClick={handleClick("middle")}
                  className={`rounded-lg border-2 border-zinc-400 bg-zinc-200 p-4 transition-all ${getHighlightClass("middle")}`}
                >
                  <div className="mb-2 text-xs font-medium text-zinc-600">
                    中間（middle）
                  </div>
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: バブリングデモ用 */}
                  {/* biome-ignore lint/a11y/noStaticElementInteractions: バブリングデモ用 */}
                  <div
                    onClick={handleClick("inner")}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border-2 border-blue-400 bg-blue-100 p-4 transition-all hover:bg-blue-200 ${getHighlightClass("inner")}`}
                  >
                    <span className="text-sm font-medium text-blue-700">
                      内側（inner）をクリック
                    </span>
                  </div>
                </div>
              </div>

              {highlighted.length > 0 && (
                <div className="mt-4 rounded-lg bg-zinc-50 p-3">
                  <div className="text-xs font-medium text-zinc-500 mb-2">
                    伝播の順序:
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {highlighted.map((el, i) => (
                      <span key={el} className="flex items-center gap-2">
                        {i > 0 && <span className="text-zinc-400">→</span>}
                        <span className="rounded bg-zinc-200 px-2 py-1 font-mono text-zinc-700">
                          {el}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <EventLog logs={logs} onClear={clearLogs} />
        </>
      }
    />
  );
}
