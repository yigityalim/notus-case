import { Swap } from "@/components/swap";
import { SelectedTokenContextProvider } from "@/context/selected-token";

export default function App() {
  return (
    <div className="w-full min-h-dvh grid place-items-center p-6 bg-[#C8C8DD]">
      <SelectedTokenContextProvider>
        <Swap />
      </SelectedTokenContextProvider>
    </div>
  );
}
