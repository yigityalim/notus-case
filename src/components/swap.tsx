import { SelectToken } from "@/components/select-token";
import { Settings } from "@/components/settings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import React from "react";
import { SelectedTokenContext } from "@/context/selected-token";
import { Balance } from "@/components/balance";
import { SellCard } from "./sell";
import { BuyCard } from "./buy";

const fromCurrencyAmounts = ["%25", "%50", "%75", "MAX"] as const;
export type FromCurrencyAmount = (typeof fromCurrencyAmounts)[number];

export function Swap() {
  const { toggle, setToggle, setBalance } =
    React.useContext(SelectedTokenContext);

  return (
    <div className="flex w-full max-w-lg mx-auto gap-2">
      <div className="w-full flex flex-col items-center justify-between gap-4 p-3 rounded-lg bg-patara-gray-50">
        <div className="w-full flex flex-row items-center justify-between">
          <Balance />
          <div className="flex gap-x-2 items-center justify-center">
            {fromCurrencyAmounts.map((label) => (
              <Button
                key={label}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setBalance((prev) => {
                    if (label === "MAX") return 100;
                    return prev * (parseInt(label.slice(1)) / 100);
                  });
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
              "absolute transform transition-transform -translate-x-1/2 bg-patara-gray-100 border-4 border-patara-gray-50 -translate-y-1/2 top-1/2 left-1/2 rounded-full p-2",
              toggle ? "rotate-180" : "rotate-0",
            )}
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          >
            <ArrowDown size={24} />
          </button>
          <BuyCard />
          <SellCard />
        </div>
        <Button variant="primary" size="lg" className="w-full">
          Swap
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <Settings />
        <button className="p-1 bg-patara-gray-100 rounded-lg inline-flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.5 5.25V9.75C22.5 9.94891 22.421 10.1397 22.2803 10.2803C22.1397 10.421 21.9489 10.5 21.75 10.5H17.25C17.1016 10.5001 16.9565 10.4562 16.833 10.3738C16.7096 10.2914 16.6134 10.1742 16.5565 10.0371C16.4997 9.89997 16.4849 9.74908 16.5139 9.60352C16.5428 9.45795 16.6144 9.32426 16.7194 9.21937L18.3131 7.62562L17.3241 6.72093L17.3006 6.69843C16.2582 5.65639 14.9318 4.94461 13.4872 4.65201C12.0426 4.3594 10.5438 4.49895 9.17803 5.05321C7.81227 5.60748 6.6401 6.55189 5.80795 7.76846C4.9758 8.98503 4.52057 10.4198 4.49913 11.8936C4.47769 13.3674 4.89098 14.8149 5.68738 16.0551C6.48378 17.2954 7.62798 18.2735 8.97704 18.8673C10.3261 19.461 11.8202 19.6441 13.2727 19.3937C14.7252 19.1432 16.0718 18.4703 17.1441 17.4591C17.2157 17.3913 17.2999 17.3384 17.3919 17.3032C17.484 17.2681 17.5821 17.2514 17.6806 17.2541C17.7791 17.2569 17.8761 17.279 17.966 17.3192C18.056 17.3594 18.1371 17.417 18.2049 17.4886C18.2726 17.5602 18.3255 17.6444 18.3607 17.7365C18.3958 17.8285 18.4125 17.9266 18.4098 18.0251C18.407 18.1236 18.3849 18.2206 18.3447 18.3106C18.3045 18.4005 18.2469 18.4817 18.1753 18.5494C16.5077 20.1285 14.2967 21.0059 12 21H11.8763C10.4023 20.9798 8.95579 20.5979 7.66397 19.8877C6.37216 19.1776 5.27455 18.161 4.46762 16.9274C3.6607 15.6937 3.16915 14.2807 3.0362 12.8126C2.90324 11.3445 3.13294 9.86614 3.70511 8.50758C4.27728 7.14902 5.1744 5.9518 6.31762 5.02115C7.46085 4.09049 8.81517 3.4549 10.2616 3.17024C11.7079 2.88557 13.2021 2.96055 14.6127 3.38858C16.0234 3.8166 17.3073 4.58458 18.3516 5.625L19.3763 6.5625L21.2194 4.71562C21.3245 4.61038 21.4585 4.53878 21.6045 4.50991C21.7504 4.48104 21.9016 4.49621 22.0388 4.55349C22.1761 4.61077 22.2933 4.70757 22.3754 4.83159C22.4575 4.95562 22.5009 5.10125 22.5 5.25Z"
              fill="#0C0C14"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
