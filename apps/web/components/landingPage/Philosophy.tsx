import React from "react";
import { GradientTracing } from "../ui/hexta-ui/GradientTracing";
import { MagicText } from "../ui/hexta-ui/MagicText";
import { Zap } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";

type Props = {};

const Philosophy = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className=" flex justify-center ">
        <Badge className="gap-1 text-xl px-3 py-1 h-14 w-xs bg-neutral-800 text-white border-r rounded-4xl border-gray-900">
          <div>
            <Zap
              className="-ms-0.5 opacity-60 text-yellow-500"
              size={32}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
          Features
        </Badge>
      </div>
      <div className="mb-6 pt-10">
        <GradientTracing
          width={300}
          height={100}
          path="M0,50 C25,0 50,100 75,50 S125,0 150,50 S200,100 225,50 S275,0 300,50 M0,50 C25,100 50,0 75,50 S125,100 150,50 S200,0 225,50 S275,100 300,50"
          gradientColors={["#FF6B6B", "#FF6B6B", "#4ECDC4"]}
        />
      </div>
      <div className="max-w-4xl w-full text-center">
        <MagicText text={"You Read. You Watch. But You Don’t Share. Why?"} />
        <MagicText
          text={
            "We believe that curating, remixing, and expanding on powerful ideas is how knowledge grows.Turn the content you learn from into content you lead with, In seconds."
          }
        />
      </div>
    </div>
  );
};

export default Philosophy;
