import * as React from "react";
import mockTokens from "@sonarwatch/token-lists/build/sonarwatch.sui.tokenlist.json";

type ContextType = {
  selectedToken: string | null;
  setSelectedToken: React.Dispatch<React.SetStateAction<string | null>>;
  tokens: typeof mockTokens.tokens;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  originalBalance: number;
  setOriginalBalance: React.Dispatch<React.SetStateAction<number>>;
};

export const SelectedTokenContext = React.createContext<ContextType>(
  {} as ContextType,
);

export function SelectedTokenContextProvider({
  children,
}: Readonly<React.PropsWithChildren>) {
  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [balance, setBalance] = React.useState<number>(153.123);
  const [originalBalance, setOriginalBalance] = React.useState<number>(balance);

  const value = React.useMemo(
    () => ({
      selectedToken,
      setSelectedToken,
      tokens: mockTokens.tokens,
      toggle,
      setToggle,
      balance,
      setBalance,
      originalBalance,
      setOriginalBalance,
    }),
    [selectedToken, balance, originalBalance, toggle],
  );

  return (
    <SelectedTokenContext.Provider value={value}>
      {children}
    </SelectedTokenContext.Provider>
  );
}
