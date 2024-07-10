import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useStore from "@/lib/store";
import {
  DownloadIcon,
  ImageIcon,
  Link2Icon,
  Share2Icon,
} from "@radix-ui/react-icons";
import { toBlob, toPng, toSvg } from "html-to-image";
import { RefObject } from "react";
import { toast } from "react-hot-toast";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "../ui/button";

interface ExportOptionsProps {
  targetRef: RefObject<HTMLElement>;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ targetRef }) => {
  const title = useStore((state) => state.title);

  const copyImage = async () => {
    const loading = toast.loading("Copying...");

    try {
      if (targetRef.current) {
        const imgBlob = await toBlob(targetRef.current, {
          pixelRatio: 2,
        });
        if (imgBlob) {
          const img = new ClipboardItem({ "image/png": imgBlob });
          await navigator.clipboard.write([img]);
        }

        toast.remove(loading);
        toast.success("Image copied to clipboard!");
      }
    } catch (error) {
      toast.remove(loading);
      toast.error("Something went wrong!");
    }
  };

  const copyLink = () => {
    try {
      const state = useStore.getState();
      const queryParams = new URLSearchParams({
        code: btoa(state.code),
        title: state.title,
        theme: state.theme,
        darkMode: state.darkMode.toString(),
        showBackground: state.showBackground.toString(),
        language: state.language,
        autoDetectLanguage: state.autoDetectLanguage.toString(),
        fontSize: state.fontSize.toString(),
        fontStyle: state.fontStyle,
        padding: state.padding.toString(),
      }).toString();
      navigator.clipboard.writeText(`${location.href}?${queryParams}`);

      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const saveImage = async (name: string, format: "PNG" | "SVG") => {
    const loading = toast.loading(`Exporting ${format} image...`);

    try {
      if (targetRef.current) {
        let imgUrl: string | undefined;
        let filename: string;

        switch (format) {
          case "PNG":
            imgUrl = await toPng(targetRef.current, { pixelRatio: 2 });
            filename = `${name}.png`;
            break;
          case "SVG":
            imgUrl = await toSvg(targetRef.current, { pixelRatio: 2 });
            filename = `${name}.svg`;
            break;
          default:
            return;
        }

        if (imgUrl) {
          const a = document.createElement("a");
          a.href = imgUrl;
          a.download = filename;
          a.click();
        }

        toast.remove(loading);
        toast.success("Exported successfully!");
      }
    } catch (error) {
      toast.remove(loading);
      toast.error("Something went wrong!");
    }
  };

  useHotkeys("ctrl+c", copyImage);
  useHotkeys("shift+ctrl+c", copyLink);
  useHotkeys("ctrl+s", () => saveImage(title, "PNG"));
  useHotkeys("shift+ctrl+s", () => saveImage(title, "SVG"));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Share2Icon className="mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark">
        <DropdownMenuItem className="gap-2" onClick={copyImage}>
          <ImageIcon />
          Copy Image
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2" onClick={copyLink}>
          <Link2Icon />
          Copy Link
          <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage(title, "PNG")}
        >
          <DownloadIcon />
          Save as PNG
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage(title, "SVG")}
        >
          <DownloadIcon />
          Save as SVG
          <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptions;
