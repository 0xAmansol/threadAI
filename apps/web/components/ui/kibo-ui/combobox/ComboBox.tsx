"use client";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/kibo-ui/combobox";
import { useState } from "react";
const ThreadLength = [
  {
    value: "1",
    label: "1 Tweet",
  },
  {
    value: "2",
    label: "2 Posts Tweet",
  },
  {
    value: "3",
    label: "3 Posts Thread",
  },
  {
    value: "4",
    label: "4 Posts Thread",
  },
  {
    value: "5",
    label: "5 Posts Thread",
  },
];
const ComboBoxButton = ({
  value,
  onValueChange,
}: {
  value: number;
  onValueChange: (val: number) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Combobox
      data={ThreadLength}
      type="Tweet Length"
      open={open}
      onOpenChange={setOpen}
      value={value.toString()} // Ensures the combobox shows the current selection
      onValueChange={(val: string) => {
        const num = parseInt(val, 10);
        if (!isNaN(num)) onValueChange(num);
      }}
    >
      <ComboboxTrigger />
      <ComboboxContent>
        <ComboboxInput />
        <ComboboxEmpty />
        <ComboboxList>
          <ComboboxGroup>
            {ThreadLength.map((thread) => (
              <ComboboxItem key={thread.value} value={thread.value}>
                {thread.label}
              </ComboboxItem>
            ))}
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default ComboBoxButton;
