import { SelectedTokenContext } from "@/context/selected-token";
import React from "react";
import { SelectToken } from "@/components/select-token";
import { cn } from "@/lib/utils";

export function SellCard() {
  const { tokens, balance } = React.useContext(SelectedTokenContext);
  return (
    <div
      key={tokens[0].name}
      className="w-full flex flex-row items-center justify-between bg-patara-gray-75 rounded-lg p-4 border border-transparent hover:border-patara-blue focus:border-patara-blue"
    >
      <SelectToken image={tokens[1].logoURI} symbol={tokens[1].symbol} />
      <div className="flex flex-col items-end justify-between gap-3">
        <span className="text-patara-gray-600 text-xs">SELL</span>
        <span className={cn("text-patara-gray-600 text-lg")}>
          {balance.toFixed(5)}
        </span>
        <span className="text-patara-black text-sm">$1.0645945</span>
      </div>
    </div>
  );
}
