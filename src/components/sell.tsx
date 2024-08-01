/**
 * @fileoverview sell.tsx
 * Sell Card Component
 *
 * @author [Mehmet Yiğit Yalım](https://mehmetyigityalim.com)
 * @licence MIT
 * @version 1.0
 */

import { SelectToken } from "@/components/select-token";
import { USD_CURRENCY_VALUE } from "@/lib/constants";
import { Token } from "@/lib/validations";

export function SellCard({
  token,
  balance,
  fromToken,
  onSelectToken,
}: {
  token: Token;
  balance: number;
  fromToken: Token;
  onSelectToken: (token: Token) => void;
}) {
  const tokenPriceUSD =
    token.symbol.startsWith("USD") || fromToken.symbol.startsWith("USD")
      ? USD_CURRENCY_VALUE
      : token.priceUSD;

  return (
    <div
      key={token.name}
      className="w-full flex flex-row items-center justify-between bg-patara-gray-75 rounded-lg p-4 border border-transparent hover:border-patara-blue focus:border-patara-blue"
    >
      <SelectToken
        image={token.logoURI}
        symbol={token.symbol}
        onSelectToken={onSelectToken}
      />
      <div className="flex flex-col items-end justify-between gap-3">
        <span className="text-patara-gray-600 text-xs">SELL</span>
        <span className="text-patara-gray-600 text-lg">
          {new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 0,
          }).format(balance)}
        </span>
        <span className="text-patara-black text-sm">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(balance * tokenPriceUSD)}
        </span>
      </div>
    </div>
  );
}
