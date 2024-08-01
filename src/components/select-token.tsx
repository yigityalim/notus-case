/**
 * @fileoverview select-token.tsx file
 * Select token component
 *
 * @author [Mehmet Yiğit Yalım](https://mehmetyigityalim.com)
 * @licence MIT
 * @version 1.0
 */

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as Dialog from "@/components/ui/dialog";
import { tokens } from "@/lib/tokens";
import { Token } from "@/lib/validations";
import { motion } from "framer-motion";
import { Image } from "@/components/image";
import { toast } from "sonner";

type SelectTokenProps = Readonly<{
  image: string;
  symbol: string;
  onSelectToken: (token: Token) => void;
}>;

interface FormValues {
  selectedTokenNames: string[];
  searchTerm: string;
}

export function SelectToken({
  image,
  symbol,
  onSelectToken,
}: SelectTokenProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      selectedTokenNames: JSON.parse(
        localStorage.getItem("selectedTokenNames") || "[]",
      ),
      searchTerm: "",
    },
  });

  const selectedTokenNames = watch("selectedTokenNames");
  const searchTerm = watch("searchTerm");

  const handleTokenSelect = (token: Token) => {
    if (selectedTokenNames.includes(token.symbol)) {
      toast.error("Token already selected");
      return;
    }

    onSelectToken(token);
    const newSelectedTokenNames = [...selectedTokenNames, token.symbol];
    setValue("selectedTokenNames", newSelectedTokenNames);
    localStorage.setItem(
      "selectedTokenNames",
      JSON.stringify(newSelectedTokenNames),
    );
  };

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const lastSelectedTokens = tokens.filter((token) =>
    selectedTokenNames.includes(token.symbol),
  );

  return (
    <Dialog.Dialog>
      <Dialog.DialogTrigger className="inline-flex cursor-pointer items-center justify-center gap-2 bg-patara-gray-50 rounded-full p-1 border border-patara-gray-100">
        <Image
          src={image}
          alt={symbol}
          className="size-6 rounded-full bg-patara-gray-100"
        />
        <span className="text-patara-black text-base select-none">
          {symbol}
        </span>
        <ChevronDown size={20} className="pr-1" />
      </Dialog.DialogTrigger>
      <Dialog.DialogContent className="p-0">
        <Dialog.DialogTitle className="w-full text-center pb-4 pt-6">
          Select Token
        </Dialog.DialogTitle>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full flex flex-row gap-2 px-6">
            <div className="w-full relative">
              <Search
                size={20}
                className="stroke-[#8C8C8F] absolute left-2 top-2"
              />
              <Controller
                control={control}
                name="searchTerm"
                render={({ field }) => (
                  <Input
                    {...field}
                    ref={inputRef}
                    className="w-full rounded-full pl-10 border-patara-gray-100"
                    placeholder="Search name or address"
                  />
                )}
              />
            </div>
          </div>
          <div className="pt-4 w-full px-6 flex flex-col gap-2 flex-wrap">
            <div className="w-full flex flex-row items-center justify-between gap-x-2">
              <h2 className="text-patara-gray-600 text-sm">Last Choices</h2>
              <span
                className="text-patara-gray-600 text-xs cursor-pointer"
                onClick={() => {
                  setValue("selectedTokenNames", []);
                  localStorage.setItem(
                    "selectedTokenNames",
                    JSON.stringify([]),
                  );
                }}
              >
                Clear
              </span>
            </div>
            <div className="flex flex-row flex-wrap gap-2 w-full">
              {lastSelectedTokens.length > 0 ? (
                lastSelectedTokens.map((token) => (
                  <div
                    className="p-1 rounded-full bg-patara-gray-100 inline-flex flex-row gap-2 items-center justify-center cursor-pointer"
                    key={token.address}
                    onClick={() => handleTokenSelect(token)}
                  >
                    <Image
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
                <h3 className="text-patara-gray-600 font-medium text-xs">
                  No token selected
                </h3>
              )}
            </div>
          </div>
          <div className="pt-4 border-t border-patara-gray-100 w-full mt-4 px-6 pb-6">
            <Dialog.DialogDescription asChild>
              <div className="w-full inline-flex items-center justify-between mb-4">
                <h2 className="text-patara-gray-600 text-base">Token</h2>
                <h2 className="text-patara-gray-600 text-base">Balance</h2>
              </div>
            </Dialog.DialogDescription>
            <ScrollArea className="h-[400px] w-full flex flex-col items-center justify-center gap-3 no-scroll">
              {filteredTokens.filter(
                (token) => !selectedTokenNames.includes(token.symbol),
              ).length > 0 ? (
                filteredTokens.map((token) => (
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0 }}
                    className="w-full bg-patara-gray-100 hover:bg-patara-gray-75 transition-colors cursor-pointer flex flex-row items-center justify-between gap-4 rounded-full p-1 pr-4 pl-2 mt-4"
                    key={token.address}
                    onClick={() => handleTokenSelect(token)}
                  >
                    <div className="flex gap-2 items-center justify-center">
                      <Image
                        src={token.logoURI}
                        alt={token.symbol}
                        className="size-10 rounded-full bg-patara-gray-100"
                      />
                      <div className="inline-flex flex-col gap-1 items-start justify-center">
                        <h3 className="text-patara-black text-sm select-none">
                          {token.symbol}
                        </h3>
                        <h4 className="text-patara-gray-600 text-xs select-none">
                          {token.name}
                        </h4>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center gap-1">
                      <h3 className="text-patara-black text-sm select-none">
                        {new Intl.NumberFormat("en-US", {
                          style: "decimal",
                          minimumFractionDigits: 0,
                        }).format(token.priceUSD)}
                      </h3>
                      <h4 className="text-patara-gray-600 text-xs select-none">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(token.priceUSD)}
                      </h4>
                    </div>
                  </motion.div>
                ))
              ) : (
                <h3 className="text-patara-gray-600 font-medium text-xs">
                  No token found{" "}
                  <button
                    className="text-patara-blue"
                    onClick={() => {
                      setValue("searchTerm", "");
                      inputRef.current?.focus();
                    }}
                  >
                    Clear search
                  </button>
                </h3>
              )}
            </ScrollArea>
          </div>
        </div>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
