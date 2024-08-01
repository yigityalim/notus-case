/**
 * @fileoverview swap.tsx file
 * Swap Component
 *
 * @author [Mehmet Yiğit Yalım](https://mehmetyigityalim.com)
 * @licence MIT
 * @version 1.0
 */

import React from "react";
import { Settings } from "@/components/settings";
import { Balance } from "@/components/balance";
import { SellCard } from "@/components/sell";
import { BuyCard } from "@/components/buy";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { formSchema } from "@/lib/validations";
import { ArrowDown, RotateCcw } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fromCurrencyAmounts,
  mockBalance,
  USD_CURRENCY_VALUE,
} from "@/lib/constants";
import { tokens } from "@/lib/tokens";

const mockTokens = [
  tokens.find((t) => t.symbol === "SUI")!,
  tokens.find((t) => t.symbol === "USDC")!,
];

export function Swap() {
  const { setValue, watch, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromToken: mockTokens[0],
      toToken: mockTokens[1],
      balance: mockBalance,
      amount: 0,
      toggle: false,
    },
  });

  const [amount, balance, fromToken, toToken, toggle] = watch([
    "amount",
    "balance",
    "fromToken",
    "toToken",
    "toggle",
  ]);

  const handleSwap = React.useCallback(() => {
    try {
      const fromTokenPriceUSD =
        fromToken.symbol === "USDC" ? USD_CURRENCY_VALUE : fromToken.priceUSD;
      const toTokenPriceUSD =
        toToken.symbol === "USDC" ? USD_CURRENCY_VALUE : toToken.priceUSD;

      const amountInUSD = amount * fromTokenPriceUSD;

      const convertedAmount = amountInUSD / toTokenPriceUSD;
      const profit = convertedAmount - amount;

      const newBalance = balance + profit;

      setValue("balance", newBalance);
      setValue("amount", 0);
      toast.success(
        `Swapping ${amount} ${fromToken.symbol} (${fromTokenPriceUSD} USD each) to ${convertedAmount.toFixed(2)} ${toToken.symbol} (${toTokenPriceUSD} USD each) - Profit: ${profit.toFixed(2)} ${toToken.symbol}`,
      );
      setValue("toggle", !toggle);
    } catch (error) {
      toast.error("An error occurred while swapping tokens.");
      console.error(error);
    }
  }, [amount, balance, fromToken, toToken, toggle, setValue]);

  return (
    <div className="flex flex-col md:flex-row w-full max-w-lg mx-auto gap-2 relative">
      <div className="w-full flex flex-col items-center justify-between gap-4 p-3 rounded-lg bg-patara-gray-50">
        <div className="w-full flex flex-row items-center justify-between gap-x-4">
          <Balance balance={balance} symbol={fromToken.symbol} />
          <div className="flex gap-x-2 items-center justify-center">
            {fromCurrencyAmounts.map((label) => (
              <Button
                key={label}
                variant="outline"
                size="sm"
                className="text-xs"
                disabled={balance === 0}
                onClick={() => {
                  const percentage =
                    label === "MAX" ? 1 : parseInt(label.slice(1)) / 100;
                  toast.info(`Setting amount to ${balance * percentage}`);

                  setValue("amount", balance * percentage);
                }}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 relative">
          <button
            className={cn(
              "absolute transform transition-transform -translate-x-1/2 bg-patara-gray-100 border-4 border-patara-gray-50 -translate-y-1/2 top-[calc(50%-1.5rem)] left-1/2 rounded-full p-2",
              toggle ? "rotate-180" : "rotate-0",
            )}
            type="button"
            onClick={() => {
              setValue("toggle", !toggle);
              setValue("fromToken", toToken);
              setValue("toToken", fromToken);
              setValue("amount", 0);
            }}
          >
            <ArrowDown size={24} />
          </button>
          <SellCard
            token={fromToken}
            balance={amount}
            fromToken={fromToken}
            onSelectToken={(token) => void setValue("fromToken", token)}
          />
          <BuyCard
            token={toToken}
            balance={amount}
            fromToken={fromToken}
            onSelectToken={(token) => void setValue("toToken", token)}
          />
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={amount === 0}
            onClick={handleSwap}
          >
            Swap
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center justify-end md:flex-col md:-right-10 md:absolute">
        <Settings />
        <button
          className="p-1 bg-patara-gray-100 rounded-lg hover:bg-patara-gray-75"
          onClick={() => reset()}
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}
