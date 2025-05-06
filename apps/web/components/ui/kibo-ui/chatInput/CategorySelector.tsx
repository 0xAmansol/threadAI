import { SiCultura } from "@icons-pack/react-simple-icons";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { CpuIcon } from "@workspace/ui/components/cpu";
import { EarthIcon } from "@workspace/ui/components/earth";
import { CircleDollarSignIcon } from "@workspace/ui/components/circle-dollar-sign";

import { useId } from "react";

const categories = [
  "Tech & Science",
  "Finance",
  "Arts & Culture",
  "Sports",
  "Business",
];

function CategorySelector({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (val: string) => void;
}) {
  const id = useId();

  return (
    <div className="space-y-2 min-w-[300px]">
      <Label htmlFor={id}>Category</Label>
      <Select
        value={value}
        onValueChange={onValueChange}
        defaultValue={categories[0]}
      >
        <SelectTrigger
          id={id}
          className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80"
        >
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:flex [&_*[role=option]>span]:gap-2">
          {categories.map((category) => {
            return (
              <SelectItem key={category} value={category}>
                <span className="flex items-center gap-2">
                  {category === "Tech & Science" && <CpuIcon size={15} />}
                  {category === "Finance" && <CircleDollarSignIcon size={15} />}
                  {category === "Arts & Culture" && <EarthIcon size={15} />}
                  {category === "Sports" && <span>🏆</span>}
                  {category === "Business" && <span>📊</span>}
                  <span className="truncate">{category}</span>
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export { CategorySelector };
