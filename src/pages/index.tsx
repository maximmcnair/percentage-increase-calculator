import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClipboardCopyIcon, CheckIcon } from "@radix-ui/react-icons";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [startingValue, setStartingValue] = useState(0);
  const [endingValue, setEndingValue] = useState(0);

  const [percentageChange, setPercentageChange] = useState<number | null>(null);
  const [multiplier, setMultiplier] = useState<number | null>(null);

  const [percentageChangeCopied, setPercentageChangeCopied] = useState(false);
  const [percentageChangeCopyShow, setPercentageChangeCopyShow] =
    useState(false);
  const [multiplierCopied, setMultiplierCopied] = useState(false);
  const [multiplierCopyShow, setMultiplierCopyShow] = useState(false);

  function copyPercentageChange() {
    setPercentageChangeCopied(true);
    navigator.clipboard.writeText(String(percentageChange) + "%");

    setTimeout(() => {
      setPercentageChangeCopied(false);
    }, 1000);
  }

  function copyMultiplier() {
    setMultiplierCopied(true);
    navigator.clipboard.writeText(String(multiplier) + "x");

    setTimeout(() => {
      setMultiplierCopied(false);
    }, 1000);
  }

  useEffect(() => {
    const change = ((endingValue - startingValue) / startingValue) * 100;
    setPercentageChange(change);

    if (change === null) return;

    if (change < 0) {
      setMultiplier(1 - Math.abs(change / 100));
    } else {
      setMultiplier(1 + change / 100);
    }
  }, [startingValue, endingValue]);

  return (
    <TooltipProvider>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div>
          <h1 className="text-center mb-7 text-3xl text-extrabold">
            Percentage Increase Calculator
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <label className="bg-zinc-900 p-2 rounded">
              <strong className="block mb-2 text-center">Starting Value</strong>
              <Input
                className="text-center bg-zinc-950"
                style={{ paddingTop: 3, minHeight: 47 }}
                value={startingValue}
                type="number"
                onChange={(evt) =>
                  setStartingValue(parseFloat(evt.target.value))
                }
              />
            </label>

            <label className="bg-zinc-900 p-2 rounded">
              <strong className="block mb-2 text-center">Ending Value</strong>
              <Input
                className="text-center bg-zinc-950"
                style={{ paddingTop: 3, minHeight: 47 }}
                value={endingValue}
                type="number"
                onChange={(evt) => setEndingValue(parseFloat(evt.target.value))}
              />
            </label>

            <div className="bg-zinc-900 p-2 rounded">
              <span
                className="block text-center bg-zinc-950 mb-2 px-3 py-1 border rounded-md cursor-pointer hover:border-white relative"
                style={{ paddingTop: 10, minHeight: 47 }}
                onClick={copyPercentageChange}
                onMouseEnter={() => {
                  setPercentageChangeCopyShow(true);
                }}
                onMouseLeave={() => {
                  setPercentageChangeCopyShow(false);
                }}
              >
                {percentageChange === null ||
                isNaN(percentageChange) ||
                multiplier === Infinity
                  ? "-"
                  : +percentageChange.toFixed(2) + "%"}

                {percentageChangeCopyShow ? (
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-1 top-1"
                  >
                    {percentageChangeCopied ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <ClipboardCopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                ) : null}
              </span>
              <strong className="block text-center">Percentage Change</strong>
            </div>

            <div className="bg-zinc-900 p-2 rounded">
              <span
                className="block text-center bg-zinc-950 mb-2 px-3 py-1 border rounded-md cursor-pointer hover:border-white relative"
                style={{ paddingTop: 10, minHeight: 47 }}
                onClick={copyMultiplier}
                onMouseEnter={() => {
                  setMultiplierCopyShow(true);
                }}
                onMouseLeave={() => {
                  setMultiplierCopyShow(false);
                }}
              >
                {multiplier === null ||
                isNaN(multiplier) ||
                multiplier === Infinity
                  ? "-"
                  : +multiplier.toFixed(2) + "x"}

                {multiplierCopyShow ? (
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-1 top-1"
                  >
                    {multiplierCopied ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <ClipboardCopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                ) : null}
              </span>
              <strong className="block text-center">Multiplier</strong>
            </div>
          </div>
        </div>
      </main>
    </TooltipProvider>
  );
}
