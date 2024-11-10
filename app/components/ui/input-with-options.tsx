import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { IDropdownOptions } from "~/lib/types";
import { Input } from "./input";
import { Label } from "@radix-ui/react-dropdown-menu";

export function InputWithOptions({
  opts,
  placeholder,
  label,
  onChange,
  value,
}: {
  opts: IDropdownOptions[] | undefined;
  placeholder: string;
  label: string;
  onChange?: (selectedOption: IDropdownOptions) => void;
  value: IDropdownOptions | undefined;
}) {
  const [open, setOpen] = React.useState(false);

  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const [options, setOptions] = React.useState<IDropdownOptions[] | undefined>(
    opts ?? undefined
  );
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prevIndex) => {
        const newIndex =
          prevIndex === null
            ? 0
            : Math.min(prevIndex + 1, opts?.length ?? 0 - 1);
        return newIndex;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prevIndex) => {
        const newIndex = prevIndex === null ? 0 : Math.max(prevIndex - 1, -1);
        return newIndex;
      });
    }
  };

  React.useEffect(() => {
    if (focusedIndex !== null && open) {
      const focusedItem = document.getElementById(
        `dropdown-item-${focusedIndex}`
      );
      if (focusedIndex === -1) {
        document.getElementById(`${label}`)?.focus();
      } else if (focusedItem) {
        focusedItem.focus();
      }
    }
  }, [focusedIndex, open]);

  React.useEffect(() => {
    setOptions(opts);
  }, [opts]);

  return (
    <>
      <div className="h-fit">
        <Popover open={open} onOpenChange={setOpen}>
          <Label className="text-xs font-medium">{label}</Label>
          <PopoverTrigger>
            <Input
              id={label}
              type="text"
              name="search"
              className="rounded-xl max-w-sm text-sm mt-1"
              placeholder={placeholder}
              autoComplete="off"
              onKeyDown={handleKeyDown}
              onBlur={() => setFocusedIndex(null)}
              onChange={(e) => {
                const selectedOption = {
                  value: e.target.value,
                  label: e.target.value,
                };
                if (onChange) {
                  onChange(selectedOption);

                  const newOptions = opts?.filter((opt) => {
                    if (
                      opt.label
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    ) {
                      return opt;
                    }
                  });
                  setOptions(newOptions);
                }
              }}
              value={value?.label}
            />
          </PopoverTrigger>
          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            align="start"
          >
            <div className="max-h-64 overflow-y-scroll">
              <ul>
                {options?.map((opt, i) => (
                  <li key={opt.value}>
                    <button
                      id={`dropdown-item-${i}`}
                      onKeyDown={handleKeyDown as React.KeyboardEventHandler}
                      className="flex items-center justify-between px-3 py-2 w-full pr-8 hover:bg-gray-100 focus:bg-gray-100"
                      onClick={() => {
                        const selectedOption = {
                          value: opt.value,
                          label: opt.label,
                        };

                        if (onChange) {
                          onChange(selectedOption);
                          setOpen(false);
                        }
                      }}
                    >
                      <span>{opt.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
