/**
 * @fileoverview App component
 * Main component of the application
 *
 * @author [Mehmet Yiğit Yalım](https://mehmetyigityalim.com)
 * @licence MIT
 * @version 1.0
 */

import { Swap } from "@/components/swap";

export default function App() {
  return (
    <div className="w-full min-h-dvh flex flex-col items-center justify-start gap-4 p-6 bg-[#C8C8DD]">
      <h1 className="text-3xl font-bold text-pink-400">Notus Task Case</h1>
      <Swap />
      <a
        href="https://mehmetyigityalim.com"
        className="text-patara-black font-bold inline-flex gap-x-2 items-center"
        target="_blank"
        rel="noreferrer"
      >
        Developed by{" "}
        <span className="text-patara-blue">Mehmet Yigit Yalim</span>
      </a>
    </div>
  );
}
