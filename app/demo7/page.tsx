"use client";

import { DemoLayout } from "@/components/DemoLayout";

const summary = [
  {
    method: "stopPropagation()",
    when: "親要素のハンドラを発火させたくない",
    examples: [
      "モーダル内のボタン",
      "ドロップダウンメニュー",
      "カード内のアクション",
    ],
  },
  {
    method: "preventDefault()",
    when: "ブラウザの標準動作を止めたい",
    examples: ["フォーム送信", "リンクの遷移", "右クリックメニュー"],
  },
];

const flowchart = [
  {
    condition: "親のハンドラが意図せず発火する",
    action: "→ stopPropagation()",
  },
  {
    condition: "ページがリロード/遷移してしまう",
    action: "→ preventDefault()",
  },
  { condition: "両方起きている", action: "→ 両方呼ぶ" },
];

export default function Demo7() {
  return (
    <DemoLayout
      title="Demo 7: まとめ"
      description="イベント制御の使い分けを整理"
      prevHref="/demo6"
      prevLabel="Demo 6"
      nextHref="/"
      nextLabel="トップへ"
      materialContent={
        <>
          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">学んだこと</h3>
            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  イベントは子から親へ<strong>伝播（バブリング）</strong>する
                </li>
                <li>
                  伝播が<strong>意図しない動作</strong>を引き起こすことがある
                </li>
                <li>
                  <code className="rounded bg-blue-100 px-1">
                    stopPropagation()
                  </code>{" "}
                  で伝播を止められる
                </li>
                <li>
                  <code className="rounded bg-blue-100 px-1">
                    preventDefault()
                  </code>{" "}
                  は別物（標準動作を止める）
                </li>
              </ol>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">使い分けの判断</h3>
            <div className="rounded border border-zinc-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      こんな時は
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-zinc-700">
                      使うメソッド
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {flowchart.map((item) => (
                    <tr key={item.condition}>
                      <td className="px-3 py-2 text-zinc-600">
                        {item.condition}
                      </td>
                      <td className="px-3 py-2 font-mono text-blue-600">
                        {item.action}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-zinc-800">メソッド早見表</h3>
            <div className="space-y-3">
              {summary.map((item) => (
                <div
                  key={item.method}
                  className="rounded-lg border border-zinc-200 p-3"
                >
                  <div className="font-mono text-sm font-medium text-blue-600">
                    {item.method}
                  </div>
                  <div className="mt-1 text-sm text-zinc-600">{item.when}</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.examples.map((ex) => (
                      <span
                        key={ex}
                        className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      }
      demoContent={
        <div className="space-y-6">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-lg font-bold text-zinc-800 mb-2">
              お疲れさまでした！
            </h3>
            <p className="text-sm text-zinc-600 mb-4">
              イベントの伝播と制御について学習完了です。
            </p>
            <div className="inline-flex flex-col gap-2 text-left text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-zinc-600">イベント伝播の仕組み</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-zinc-600">バブリングで起きる問題</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-zinc-600">stopPropagation()の使い方</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-zinc-600">preventDefault()との違い</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-100 p-4">
            <h4 className="text-sm font-medium text-zinc-700 mb-3">
              次のステップ
            </h4>
            <ul className="text-sm text-zinc-600 space-y-2">
              <li>
                <span className="font-medium">復習:</span>{" "}
                各デモをもう一度試して、動作を確認
              </li>
              <li>
                <span className="font-medium">実践:</span>{" "}
                自分のプロジェクトで同様のバグがないかチェック
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
