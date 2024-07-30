import React from "react";
import * as Dialog from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Switch } from "./ui/switch";

const choose_slippage = ["Auto", "Fixed"] as const;
type ChooseSlippage = (typeof choose_slippage)[number];

const rates = ["0.3%", "0.5%", "1%", "Custom"] as const;
type Rates = (typeof rates)[number];

export function Settings() {
  const [choose, setChoose] = React.useState<ChooseSlippage>(
    choose_slippage[0],
  );

  const [rate, setRate] = React.useState<Rates>(rates[0]);

  return (
    <Dialog.Dialog>
      <Dialog.DialogTrigger className="p-1.5 bg-patara-gray-100 rounded-lg inline-flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.25 10.2025C18.2538 10.0675 18.2538 9.9325 18.25 9.7975L19.6488 8.05C19.7221 7.95824 19.7729 7.85055 19.797 7.73558C19.8211 7.62062 19.8179 7.5016 19.7875 7.38812C19.5578 6.52632 19.2148 5.6988 18.7675 4.92718C18.7089 4.82623 18.6275 4.74036 18.5299 4.67639C18.4322 4.61243 18.321 4.57215 18.205 4.55875L15.9813 4.31125C15.8888 4.21375 15.795 4.12 15.7 4.03L15.4375 1.80062C15.424 1.68457 15.3836 1.57328 15.3195 1.47562C15.2554 1.37796 15.1693 1.29663 15.0682 1.23812C14.2966 0.791168 13.469 0.448792 12.6072 0.219997C12.4937 0.189678 12.3747 0.186439 12.2598 0.210539C12.1448 0.234639 12.0371 0.285405 11.9454 0.358747L10.2025 1.75C10.0675 1.75 9.93254 1.75 9.79754 1.75L8.05004 0.35406C7.95829 0.280717 7.85059 0.229951 7.73563 0.205851C7.62067 0.181751 7.50165 0.184991 7.38817 0.215309C6.52637 0.445022 5.69884 0.788012 4.92723 1.23531C4.82628 1.29393 4.7404 1.3753 4.67644 1.47296C4.61248 1.57061 4.57219 1.68184 4.55879 1.79781L4.31129 4.02531C4.21379 4.11843 4.12004 4.21218 4.03004 4.30656L1.80067 4.5625C1.68462 4.576 1.57332 4.61643 1.47566 4.68056C1.37801 4.74469 1.29668 4.83075 1.23817 4.93187C0.791305 5.70359 0.448637 6.5311 0.219105 7.39281C0.188915 7.50636 0.185827 7.62542 0.210091 7.74039C0.234354 7.85536 0.28529 7.96301 0.358793 8.05468L1.75004 9.7975C1.75004 9.9325 1.75004 10.0675 1.75004 10.2025L0.354105 11.95C0.280763 12.0417 0.229997 12.1494 0.205897 12.2644C0.181797 12.3794 0.185037 12.4984 0.215355 12.6119C0.445068 13.4737 0.788058 14.3012 1.23536 15.0728C1.29397 15.1738 1.37535 15.2596 1.473 15.3236C1.57065 15.3876 1.68189 15.4278 1.79785 15.4412L4.02161 15.6887C4.11473 15.7862 4.20848 15.88 4.30286 15.97L4.56254 18.1994C4.57604 18.3154 4.61647 18.4267 4.6806 18.5244C4.74473 18.622 4.83079 18.7034 4.93192 18.7619C5.70363 19.2087 6.53114 19.5514 7.39286 19.7809C7.50641 19.8111 7.62547 19.8142 7.74044 19.7899C7.8554 19.7657 7.96306 19.7147 8.05473 19.6412L9.79754 18.25C9.93254 18.2537 10.0675 18.2537 10.2025 18.25L11.95 19.6487C12.0418 19.7221 12.1495 19.7729 12.2645 19.797C12.3794 19.8211 12.4984 19.8178 12.6119 19.7875C13.4739 19.5582 14.3014 19.2152 15.0729 18.7675C15.1738 18.7089 15.2597 18.6275 15.3236 18.5299C15.3876 18.4322 15.4279 18.321 15.4413 18.205L15.6888 15.9812C15.7863 15.8887 15.88 15.795 15.97 15.7L18.1994 15.4375C18.3155 15.424 18.4268 15.3836 18.5244 15.3194C18.6221 15.2553 18.7034 15.1692 18.7619 15.0681C19.2088 14.2964 19.5514 13.4689 19.781 12.6072C19.8112 12.4936 19.8143 12.3746 19.79 12.2596C19.7657 12.1446 19.7148 12.037 19.6413 11.9453L18.25 10.2025ZM10 13.75C9.25836 13.75 8.53334 13.5301 7.91665 13.118C7.29997 12.706 6.81932 12.1203 6.53549 11.4351C6.25167 10.7498 6.1774 9.99584 6.3221 9.26841C6.46679 8.54098 6.82395 7.87279 7.34839 7.34835C7.87284 6.8239 8.54103 6.46675 9.26845 6.32205C9.99588 6.17736 10.7499 6.25162 11.4351 6.53545C12.1203 6.81928 12.706 7.29992 13.1181 7.91661C13.5301 8.53329 13.75 9.25832 13.75 10C13.75 10.9946 13.355 11.9484 12.6517 12.6516C11.9484 13.3549 10.9946 13.75 10 13.75Z"
            fill="#0C0C14"
          />
        </svg>
      </Dialog.DialogTrigger>
      <Dialog.DialogContent className="max-w-md bg-patara-gray-50">
        <Dialog.DialogHeader className="">
          <Dialog.DialogTitle className="w-full text-center pb-4">
            General Settings
          </Dialog.DialogTitle>
          <div className="flex w-full flex-col gap-3 items-center justify-center">
            <div className="w-full bg-patara-gray-75 p-2 border border-patara-75 flex flex-col gap-3 items-center justify-between rounded-lg">
              <div className="w-full flex flex-row items-center justify-between">
                <h3 className="text-patara-black text-sm p-2">Slippage Mode</h3>
                <div className="gap-2 flex items-center justify-center">
                  {choose_slippage.map((slippage) => (
                    <Button
                      key={slippage}
                      variant={choose === slippage ? "success" : "secondary"}
                      size="sm"
                      onClick={() => setChoose(slippage)}
                    >
                      {slippage}
                    </Button>
                  ))}
                </div>
              </div>
              <AnimatePresence mode="wait">
                {choose === "Fixed" && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, height: 0 },
                      visible: { opacity: 1, height: "auto" },
                    }}
                    className="w-full flex flex-row items-center justify-between"
                  >
                    <h3 className="text-patara-black text-sm p-2">
                      Slippage Rate
                    </h3>
                    <div className="gap-2 flex items-center justify-center">
                      {rates.map((r) => (
                        <Button
                          key={r}
                          variant={rate === r ? "primary" : "secondary"}
                          size="sm"
                          className="px-2"
                          onClick={() => setRate(r)}
                        >
                          {r}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="w-full bg-patara-gray-75 p-2 border border-patara-75 flex flex-row gap-3 items-center justify-between rounded-lg">
              Direct Route Only
              <Switch onCheckedChange={(e) => console.log(e)} />
            </div>
            <Button variant="primary" size="lg" className="w-full">
              Save Settings
            </Button>
          </div>
        </Dialog.DialogHeader>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
