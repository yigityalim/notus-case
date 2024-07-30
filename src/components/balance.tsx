import React from "react";
import { SelectedTokenContext } from "@/context/selected-token";

export function Balance() {
  const { originalBalance } = React.useContext(SelectedTokenContext);
  return (
    <p className="text-sm text-patara-black">
      Balance: {originalBalance.toFixed(5)} ETH
    </p>
  );
}
