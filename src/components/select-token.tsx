import React from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as Dialog from "@/components/ui/dialog";
import mock from "@sonarwatch/token-lists/build/sonarwatch.sui.tokenlist.json";

type Token = (typeof mock.tokens)[number];

export type SelectTokenProps = Readonly<{
  image: string;
  symbol: string;
}>;

export function SelectToken({ image, symbol }: SelectTokenProps) {
  const [selectedTokens, setSelectedTokens] = React.useState<Token[] | null>(
    null,
  );
  const [text, setText] = React.useState("");

  return (
    <Dialog.Dialog>
      <Dialog.DialogTrigger className="inline-flex cursor-pointer items-center justify-center gap-2 bg-patara-gray-50 rounded-full px-2 py-1 border border-patara-gray-100">
        <img
          src={image}
          alt={symbol}
          className="size-6 rounded-full bg-patara-gray-100"
        />
        <span className="text-patara-black text-base selct-none">{symbol}</span>
        <ChevronDown size={20} className="pr-1" />
      </Dialog.DialogTrigger>
      <Dialog.DialogContent className="p-0">
        <Dialog.DialogTitle className="w-full text-center pb-4 pt-6">
          Select Token
        </Dialog.DialogTitle>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full flex flex-row gap-2 px-6 ">
            <div className="w-full relative">
              <Search
                size={20}
                className="stroke-[#8C8C8F] absolute left-2 top-2"
              />
              <Input
                className="w-full rounded-full pl-10 border-patara-gray-100"
                placeholder="Search name or address"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </div>
          <div className="pt-4 w-full px-6 flex flex-col gap-2 flex-wrap">
            <h2 className="text-patara-gray-600 text-sm">Last Choises</h2>
            <div className="flex flex-row flex-wrap gap-2 w-full">
              {selectedTokens ? (
                selectedTokens.map((token) => (
                  <div
                    className="p-2 rounded-full bg-patara-gray-100 inline-flex flex-row gap-1 items-center justify-center"
                    key={token.address}
                    onClick={() => console.log("seçilen token: ", token.symbol)}
                  >
                    <img
                      src={token.logoURI}
                      alt={token.symbol}
                      className="size-6 rounded-full bg-patara-gray-100"
                    />
                    <h3 className="text-patara-black text-sm pr-2">
                      {token.symbol}
                    </h3>
                  </div>
                ))
              ) : (
                <h3 className="text-patara-gray-600 font-bold text-sm">
                  No token selected
                </h3>
              )}
            </div>
          </div>
          <div className="pt-4 border-t border-patara-gray-100 w-full mt-4 px-6 pb-6">
            <div className="w-full inline-flex items-center justify-between mb-4">
              <h2 className="text-patara-gray-600 text-base">Token</h2>
              <h2 className="text-patara-gray-600 text-base">Balance</h2>
            </div>
            <ScrollArea className="h-[400px] w-full flex flex-col items-center justify-center gap-3 no-scroll">
              {mock.tokens
                .filter(
                  (token) =>
                    !selectedTokens?.some(
                      (selectedToken) =>
                        selectedToken.address === token.address,
                    ),
                )
                .map((token) => (
                  <div
                    className="w-full bg-patara-gray-100 cursor-pointer flex flex-row items-center justify-between gap-4 rounded-lg p-2 mt-4"
                    key={token.address}
                    onClick={() => {
                      setSelectedTokens((prev) => [...(prev || []), token]);
                    }}
                  >
                    <div className="flex gap-2 items-center justify-center">
                      <img
                        src={token.logoURI}
                        alt={token.symbol}
                        className="size-10 rounded-full bg-patara-gray-100"
                      />
                      <div className="inline-flex flex-col gap-1 items-start justify-center">
                        <h3 className="text-patara-black text-sm">
                          {token.symbol}
                        </h3>
                        <h4 className="text-patara-gray-600 text-xs">
                          {token.name}
                        </h4>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center gap-1">
                      <h3 className="text-patara-black text-sm">789</h3>
                      <h4 className="text-patara-gray-600 text-xs">$725.124</h4>
                    </div>
                  </div>
                ))}
            </ScrollArea>
          </div>
        </div>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
