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
import { Card, CardContent } from "@/components/ui/card";
import { fonts, themes } from "@/constant/options";
import useStore from "@/lib/store";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export default function Home() {
  const [width, setWidth] = useState<string>("auto");
  const [showWidth, setShowWidth] = useState<boolean>(false);

  const theme = useStore((state) => state.theme);
  const padding = useStore((state) => state.padding);
  const fontStyle = useStore((state) => state.fontStyle);
  const showBackground = useStore((state) => state.showBackground);

  const editorRef = useRef(null);

  return (
    <main className="dark min-h-screen flex justify-center items-center bg-neutral-950 text-white">
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

      <div
        className={cn(
          "overflow-hidden mb-2 transition-all ease-out",
          showBackground ? themes[theme].background : "ring ring-neutral-900"
        )}
        style={{ padding }}
        ref={editorRef}
      >
        <CodeEditor />
      </div>

      <Card className="fixed bottom-16 py-6 px-8 mx-6 bg-neutral-900/90 backdrop-blur">
        <CardContent className="flex flex-wrap gap-6 p-0">
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
  );
}
