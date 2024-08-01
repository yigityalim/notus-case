/**
 * @fileoverview validations.ts file
 * Validation schema for the application
 *
 * @author [Mehmet Yiğit Yalım](https://mehmetyigityalim.com)
 * @licence MIT
 * @version 1.0
 */

import { z } from "zod";

export const tokenSchema = z.object({
  address: z.string(),
  chainId: z.number(),
  decimals: z.number(),
  logoURI: z.string(),
  name: z.string(),
  symbol: z.string(),
  priceUSD: z.number(),
});

export type Token = z.infer<typeof tokenSchema>;

export const formSchema = z.object({
  fromToken: tokenSchema,
  toToken: tokenSchema,
  balance: z.number(),
  amount: z.number().min(0.01, "Minimum bakiye 0.01 olmalıdır"),
  toggle: z.boolean().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
formSchema;
