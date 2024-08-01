/**
 * @fileoverview tokens.ts file
 * Token list for the application
 *
 * @author [Mehmet Yiğit Yalım](https://mehmetyigityalim.com)
 * @licence MIT
 * @version 1.0
 */

import allTokens from "@sonarwatch/token-lists/build/sonarwatch.sui.tokenlist.json";
import { Token } from "@/lib/validations";
import { USD_CURRENCY_VALUE } from "@/lib/constants";

export const minPrice = 10.0;
export const maxPrice = 50.0;

export const tokens = allTokens.tokens.map((token) => {
  const priceUSD = token.symbol.toUpperCase().startsWith("USD")
    ? USD_CURRENCY_VALUE
    : parseFloat((Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2));

  return {
    ...token,
    priceUSD,
  };
}) satisfies Token[];
