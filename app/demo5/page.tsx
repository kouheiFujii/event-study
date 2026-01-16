"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { DemoLayout } from "@/components/DemoLayout";
import { EventLog, useEventLog } from "@/components/EventLog";
import { Modal } from "@/components/Modal";

const codeBuggy = `// 🐛 バグあり（前章の復習）
<div onClick={handleClose}>
  <button onClick={() => setIsOpen(true)}>
    開く
  </button>
</div>`;

const codeFixed = `// ✅ 修正版
<div onClick={handleClose}>
  <button onClick={(e) => {
    e.stopPropagation();  // ← これを追加！
    setIsOpen(true);
  }}>
    開く
  </button>
</div>`;

const codeExplanation = `// stopPropagation() の効果
e.stopPropagation();

// イベントの伝播をここで止める
// → 親要素の onClick は発火しない`;

export default function Demo5() {
  const [buggyModalOpen, setBuggyModalOpen] = useState(false);
  const [fixedModalOpen, setFixedModalOpen] = useState(false);
  const { logs, addLog, clearLogs } = useEventLog();

  // バグあり版
  const handleOpenBuggyModal = () => {
    setBuggyModalOpen(true);
    addLog("click", "「開く」ボタン → モーダルを開く");
  };

  const handleCloseBuggyModal = () => {
    setBuggyModalOpen(false);
    addLog("click", "親要素 → モーダルを閉じる（バブリング）");
  };

  // 修正版
  const handleOpenFixedModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // ← これが重要！
    setFixedModalOpen(true);
    addLog("click", "「開く」ボタン（stopPropagation）→ 親には伝播しない");
  };

  const handleCloseFixedModal = () => {
    setFixedModalOpen(false);
    addLog("click", "overlay/ボタン → モーダルを閉じる");
  };

  return (
    <DemoLayout
      title="Demo 5: stopPropagationで解決"
      description="伝播を止めてバグを修正する"
      prevHref="/demo4"
      prevLabel="Demo 4"
      nextHref="/demo6"
      nextLabel="Demo 6"
      materialContent={
        <>
          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">
              解決策: stopPropagation()
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              前章で体験したバグは、
              <code className="rounded bg-zinc-100 px-1">
                e.stopPropagation()
              </code>
              を使えば解決できます。 このメソッドは
              <strong>イベントの伝播（バブリング）を止める</strong>
              ためのものです。
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">Before / After</h3>
            <div className="grid gap-3">
              <div>
                <p className="mb-1 text-xs font-medium text-red-600">
                  Before（バグあり）
                </p>
                <CodeBlock code={codeBuggy} />
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-green-600">
                  After（修正版）
                </p>
                <CodeBlock code={codeFixed} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">
              stopPropagation()とは
            </h3>
            <CodeBlock code={codeExplanation} />
            <p className="text-sm text-zinc-600 leading-relaxed">
              イベントオブジェクトの{" "}
              <code className="rounded bg-zinc-100 px-1">
                stopPropagation()
              </code>{" "}
              メソッドを呼ぶと、 そのイベントは親要素へ伝播しなくなります。
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">動作の違い</h3>
            <div className="rounded-lg bg-zinc-50 p-3 text-sm">
              <div className="mb-2">
                <span className="font-medium text-red-600">
                  stopPropagationなし:
                </span>
                <div className="ml-4 text-zinc-600">
                  ボタン → 親 → さらに親 → ... と伝播
                </div>
              </div>
              <div>
                <span className="font-medium text-green-600">
                  stopPropagationあり:
                </span>
                <div className="ml-4 text-zinc-600">
                  ボタン で止まる（親には行かない）
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
            <strong>ポイント:</strong> 子要素のイベントハンドラ内で
            <code className="rounded bg-green-100 px-1 mx-1">
              e.stopPropagation()
            </code>
            を呼ぶことで、親要素のハンドラが発火するのを防げます。
          </div>
        </>
      }
      demoContent={
        <>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* バグあり版 */}
              <div className="rounded-lg border border-zinc-200 bg-white p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-red-700">
                  <span>🐛</span> バグあり版
                </h3>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: バグデモ用 */}
                {/* biome-ignore lint/a11y/noStaticElementInteractions: バグデモ用 */}
                <div
                  className="rounded-lg border-2 border-red-200 bg-red-50 p-3"
                  onClick={handleCloseBuggyModal}
                >
                  <p className="mb-2 text-xs text-red-600">
                    親（閉じるハンドラ）
                  </p>
                  <button
                    type="button"
                    onClick={handleOpenBuggyModal}
                    className="w-full rounded bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
                  >
                    モーダルを開く
                  </button>
                </div>
                <p className="mt-2 text-xs text-red-500">即閉じする</p>
              </div>

              {/* 修正版 */}
              <div className="rounded-lg border border-zinc-200 bg-white p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-green-700">
                  <span>✅</span> 修正版
                </h3>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: 修正版デモ用 */}
                {/* biome-ignore lint/a11y/noStaticElementInteractions: 修正版デモ用 */}
                <div
                  className="rounded-lg border-2 border-green-200 bg-green-50 p-3"
                  onClick={handleCloseFixedModal}
                >
                  <p className="mb-2 text-xs text-green-600">
                    親（閉じるハンドラ）
                  </p>
                  <button
                    type="button"
                    onClick={handleOpenFixedModal}
                    className="w-full rounded bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700"
                  >
                    モーダルを開く
                  </button>
                </div>
                <p className="mt-2 text-xs text-green-500">正常に開閉できる</p>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-100 p-3">
              <p className="text-xs text-zinc-600">
                <strong>比較してみよう:</strong> 左右のボタンを押して、
                イベントログの違いを確認してください。
                修正版では「親要素」のログが出ないことがわかります。
              </p>
            </div>
          </div>

          <EventLog logs={logs} onClear={clearLogs} />

          <Modal isOpen={buggyModalOpen} onClose={handleCloseBuggyModal}>
            <h2 className="text-lg font-bold text-zinc-900">
              🐛 バグあり版モーダル
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              このモーダルは本来見えないはずです...
            </p>
            <button
              type="button"
              onClick={handleCloseBuggyModal}
              className="mt-4 rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-300"
            >
              閉じる
            </button>
          </Modal>

          <Modal isOpen={fixedModalOpen} onClose={handleCloseFixedModal}>
            <h2 className="text-lg font-bold text-zinc-900">
              ✅ 修正版モーダル
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              stopPropagation のおかげで正常に表示されています！
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              背景（overlay）をクリックすると閉じます
            </p>
            <button
              type="button"
              onClick={handleCloseFixedModal}
              className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              閉じる
            </button>
          </Modal>
        </>
      }
    />
  );
}
