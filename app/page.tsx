import Link from "next/link";

const demos = [
  {
    href: "/demo1",
    number: 1,
    title: "イベントとは？",
    description: "基本概念とReactでの書き方",
  },
  {
    href: "/demo2",
    number: 2,
    title: "イベントオブジェクト",
    description: "target, type, key, clientX/clientY",
  },
  {
    href: "/demo3",
    number: 3,
    title: "イベントの伝播",
    description: "バブリングとキャプチャリング",
  },
  {
    href: "/demo4",
    number: 4,
    title: "伝播で困る場面",
    description: "バブリングが引き起こすバグを体験",
  },
  {
    href: "/demo5",
    number: 5,
    title: "stopPropagationで解決",
    description: "伝播を止めてバグを修正する",
  },
  {
    href: "/demo6",
    number: 6,
    title: "preventDefaultとの違い",
    description: "似ているけど全く別の機能",
  },
  {
    href: "/demo7",
    number: 7,
    title: "まとめ",
    description: "学んだことの整理と使い分け",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-zinc-200 bg-linear-to-b from-blue-50 to-white px-8 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-zinc-900">
            JavaScript イベント入門
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            実際に動くデモを通じて、JavaScriptのイベントを学ぶ
          </p>
        </div>
      </section>

      <section className="px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-zinc-900">イベントとは？</h2>
          <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-6">
            <p className="text-zinc-700 leading-relaxed">
              イベントとは、Webページ上で発生する<strong>「出来事」</strong>
              のことです。
              ユーザーがボタンをクリックしたり、キーボードを押したり、
              フォームを送信したりすると、ブラウザは対応するイベントを発火します。
            </p>
            <p className="mt-4 text-zinc-700 leading-relaxed">
              JavaScriptでは、これらのイベントに対して
              <strong>「イベントハンドラ」</strong>
              という関数を設定することで、ユーザーの操作に応じた処理を実行できます。
            </p>
          </div>
        </div>
      </section>

      <section className="px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-zinc-900">目次</h2>
          <ul className="mt-6 space-y-3">
            {demos.map((demo) => (
              <li key={demo.href}>
                <Link
                  href={demo.href}
                  className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-blue-300 hover:bg-blue-50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                    {demo.number}
                  </span>
                  <div>
                    <span className="font-semibold text-zinc-900">
                      {demo.title}
                    </span>
                    <p className="text-sm text-zinc-500">{demo.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 px-8 py-8">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/demo1"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
          >
            はじめる <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
