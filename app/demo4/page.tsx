"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { DemoLayout } from "@/components/DemoLayout";
import { EventLog, useEventLog } from "@/components/EventLog";
import { Modal } from "@/components/Modal";

const codeBuggy = `// このコード、何が問題でしょう？
<div onClick={handleClose}>
  <button onClick={() => setIsOpen(true)}>
    開く
  </button>
</div>`;

const problemCases = [
  {
    case: "モーダル即閉じ",
    description: "開くボタンを押しても即座に閉じてしまう",
  },
  {
    case: "ドロップダウン",
    description: "メニュー項目を選ぶとメニューごと閉じる",
  },
  {
    case: "カード内ボタン",
    description: "ボタンを押すとカード全体のクリックも発火",
  },
];

export default function Demo4() {
  const [buggyModalOpen, setBuggyModalOpen] = useState(false);
  const { logs, addLog, clearLogs } = useEventLog();

  const handleOpenBuggyModal = () => {
    setBuggyModalOpen(true);
    addLog("click", "「開く」ボタン → モーダルを開く");
  };

  const handleCloseBuggyModal = () => {
    setBuggyModalOpen(false);
    addLog("click", "親要素 → モーダルを閉じる（バブリング！）");
  };

  return (
    <DemoLayout
      title="Demo 4: 伝播で困る場面"
      description="バブリングが引き起こす実務でよくあるバグを体験"
      prevHref="/demo3"
      prevLabel="Demo 3"
      nextHref="/demo5"
      nextLabel="Demo 5"
      materialContent={
        <>
          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">困る場面とは？</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              イベントの伝播（バブリング）は便利な仕組みですが、
              <strong>意図しない動作</strong>を引き起こすことがあります。
              実務でよく遭遇するバグを体験してみましょう。
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">
              よくある問題パターン
            </h3>
            <div className="rounded border border-zinc-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      ケース
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      症状
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {problemCases.map((item) => (
                    <tr key={item.case}>
                      <td className="px-3 py-2 font-medium text-zinc-800">
                        {item.case}
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
            <h3 className="font-semibold text-zinc-800">問題のコード</h3>
            <CodeBlock code={codeBuggy} />
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">なぜ起きる？</h3>
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
              <ol className="list-decimal list-inside space-y-1">
                <li>「開く」ボタンをクリック</li>
                <li>ボタンの onClick が発火 → モーダルが開く</li>
                <li>
                  クリックイベントが親へ<strong>バブリング</strong>
                </li>
                <li>親の onClick（= handleClose）が発火</li>
                <li>モーダルが閉じる</li>
              </ol>
              <p className="mt-3 font-medium">→ 開いた瞬間に閉じてしまう！</p>
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            <strong>考えてみよう:</strong> このバグをどうやって直しますか？
            答えは次のデモで！
          </div>
        </>
      }
      demoContent={
        <>
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-zinc-700">
                モーダル即閉じバグを体験
              </h3>
              <p className="mb-4 text-xs text-zinc-500">
                下のボタンを押してみてください。モーダルが開かない（開いた瞬間に閉じる）はずです。
              </p>

              {/* バグあり版: ボタンが閉じるハンドラを持つ親の中にある */}
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: バグデモ用 */}
              {/* biome-ignore lint/a11y/noStaticElementInteractions: バグデモ用 */}
              <div
                className="rounded-lg border-2 border-red-200 bg-red-50 p-4"
                onClick={handleCloseBuggyModal}
              >
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-red-700">
                  <span>🐛</span>
                  <span>親要素（onClickでモーダルを閉じる）</span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenBuggyModal}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  モーダルを開く
                </button>
              </div>

              <div className="mt-4 rounded-lg bg-zinc-100 p-3">
                <p className="text-xs text-zinc-600">
                  <strong>ヒント:</strong> イベントログを見ると、
                  「開く」と「閉じる」が連続して発火しているのがわかります。
                </p>
              </div>
            </div>
          </div>

          <EventLog logs={logs} onClear={clearLogs} />

          <Modal isOpen={buggyModalOpen} onClose={handleCloseBuggyModal}>
            <h2 className="text-lg font-bold text-zinc-900">
              🐛 バグあり版モーダル
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              このモーダルは本来見えないはずです...
              もし見えているなら、ブラウザのタイミングによるものです。
            </p>
            <button
              type="button"
              onClick={handleCloseBuggyModal}
              className="mt-4 rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-300"
            >
              閉じる
            </button>
          </Modal>
        </>
      }
    />
  );
}
