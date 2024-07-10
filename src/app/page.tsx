"use client";

import CodeEditor from "@/components/CodeEditor";
import BackgroundSwitch from "@/components/controls/BackgroundSwitch";
import DarkModeSwitch from "@/components/controls/DarkModeSwitch";
import ExportOptions from "@/components/controls/ExportOptions";
import FontSelect from "@/components/controls/FontSelect";
import FontSizeInput from "@/components/controls/FontSizeInput";
import LanguageSelect from "@/components/controls/LanguageSelect";
import PaddingSlider from "@/components/controls/PaddingSlider";
import ThemeSelect from "@/components/controls/ThemeSelect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WidthMeasurement from "@/components/WidthMeasurement";
import { fonts, themes } from "@/constant/options";
import useStore from "@/lib/store";
import { cn } from "@/lib/utils";
import { ResetIcon } from "@radix-ui/react-icons";
import { Resizable } from "re-resizable";
import { useRef, useState } from "react";

export default function Home() {
  const [width, setWidth] = useState<string | number>("auto");
  const [showWidth, setShowWidth] = useState<boolean>(false);

  const theme = useStore((state) => state.theme);
  const padding = useStore((state) => state.padding);
  const fontStyle = useStore((state) => state.fontStyle);
  const showBackground = useStore((state) => state.showBackground);

  const editorRef = useRef(null);

  return (
    <>
      <main className="dark min-h-screen sm:flex justify-center items-center bg-neutral-950 text-white hidden">
        <BackgroundBeams />
        <link
          rel="stylesheet"
          href={themes[theme].theme}
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href={fonts[fontStyle].src}
          crossOrigin="anonymous"
        />

        <Resizable
          enable={{ left: true, right: true }}
          minWidth={padding * 2 + 400}
          size={{ width }}
          onResize={(e, dir, ref) => setWidth(ref.offsetWidth)}
          onResizeStart={() => setShowWidth(true)}
          onResizeStop={() => setShowWidth(false)}
        >
          <div
            className={cn(
              "overflow-hidden mb-2 transition-all ease-out -mt-8 rounded-sm sm:max-w-full max-w-[90%]",
              showBackground
                ? themes[theme].background
                : "ring ring-neutral-900"
            )}
            style={{ padding }}
            ref={editorRef}
          >
            <CodeEditor />
          </div>
          <WidthMeasurement showWidth={showWidth} width={width} />
          <div
            className={cn(
              "transition-opacity w-fit mx-auto -mt-4",
              showWidth || width === "auto"
                ? "invisible opacity-0"
                : "visible opacity-100"
            )}
          >
            <Button size="sm" onClick={() => setWidth("auto")} variant="ghost">
              <ResetIcon className="mr-2" />
              Reset width
            </Button>
          </div>
        </Resizable>

        <Card className="fixed bottom-16 py-6 px-8 mx-6 bg-neutral-900/90 backdrop-blur whitespace-nowrap overflow-x-auto">
          <CardContent className="flex gap-6 p-0">
            <ThemeSelect />
            <LanguageSelect />
            <FontSelect />
            <FontSizeInput />
            <PaddingSlider />
            <BackgroundSwitch />
            <DarkModeSwitch />
            <div className="w-px bg-neutral-800" />
            <div className="place-self-center">
              <ExportOptions targetRef={editorRef} />
            </div>
          </CardContent>
        </Card>
      </main>

      <main className="dark min-h-screen flex justify-center items-center bg-neutral-950 text-white sm:hidden">
        <BackgroundBeams />

        <Card className="bg-neutral-900/90 backdrop-blur max-w-[75%]">
          <CardContent>
            <h1 className="mt-8 mb-2 text-slate-200 font-medium text-lg text-center">
              I am in the process of fine-tuning the mobile view 📱. Stay tuned
              for updates! 🌟
            </h1>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
