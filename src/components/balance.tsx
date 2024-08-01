/**
 * @fileoverview balance.tsx file
 * Balance component
 *
 * @author [Mehmet Yiğit Yalım](https://mehmetyigityalim.com)
 * @licence MIT
 * @version 1.0
 */

export function Balance({
  balance,
  symbol,
}: {
  balance: number;
  symbol: string;
}) {
  return (
    <p className="text-sm text-patara-black text-overflow-hidden text-ellipsis">
      Balance:{" "}
      {new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 4,
      }).format(balance)}{" "}
      {symbol}
    </p>
  );
}
