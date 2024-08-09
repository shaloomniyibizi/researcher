"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllColleges } from "@/lib/data/collage.actions";
import { cn } from "@/lib/utils";
import { College } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

interface CollegePickerProps {
  onChange: (value: string) => void;
}

function CollegePicker({ onChange }: CollegePickerProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!value) return;
    onChange(value);
  }, [onChange, value]);

  const { data } = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => await getAllColleges(),
  });

  const selectedCollege = data?.find(
    (college: College) => college.name === value,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={true}
          className="w-[200px] justify-between"
        >
          {selectedCollege ? (
            <CollegeRow college={selectedCollege} />
          ) : (
            "Select college"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-4">
        <Command onSubmit={(e) => e.preventDefault()}>
          <CommandInput placeholder="Search college..." />
          <CommandEmpty>
            <p>Categoty not Found</p>
            <p className="text-xs text-muted-foreground">
              Tips: Create new college
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {data &&
                data.map((college: College) => (
                  <CommandItem
                    key={college.name}
                    onSelect={() => {
                      setValue(college.name);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <div className="flex w-full items-center justify-between">
                      <CollegeRow college={college} />
                      <Check
                        className={cn(
                          "h-4 w-4 opacity-0",
                          value === college.name && "opacity-100",
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CollegePicker;

function CollegeRow({ college }: { college: College }) {
  return (
    <div className="flex items-center gap-2">
      <span className="whitespace-nowrap">{college.name}</span>
    </div>
  );
}
