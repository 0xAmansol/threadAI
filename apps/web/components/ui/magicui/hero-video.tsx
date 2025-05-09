import Safari from "../Safari";
import HeroVideoDialog from "./hero-video-dialog";

export function HeroVideoDialogDemo() {
  return (
    <div className="flex z-50 pt-5 w-6xl">
      <Safari
        url="thread-ai.vercel.app"
        className="size-full shadow-2xl shadow-yellow-500"
        srcDark={"/Dashboard2.png.png"}
        srcLight={"/Dashboard2.png.png"}
      />
    </div>
  );
}
