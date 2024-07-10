import useStore from "@/lib/store";
import { Slider } from "../ui/slider";

const PaddingSlider = () => {
  const padding = useStore((state) => state.padding);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Padding
      </label>
      <Slider
        className="w-44 my-5"
        value={[padding]}
        onValueChange={([padding]: [number]) => useStore.setState({ padding })}
        max={128}
        step={8}
      />
    </div>
  );
};

export default PaddingSlider;
