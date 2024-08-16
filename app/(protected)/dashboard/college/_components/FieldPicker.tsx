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
import { cn } from "@/lib/utils";
import { Field } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getFields } from "../_actions/field.actions";
import FieldDialog from "./FieldDialog";

interface FieldPickerProps {
  departmentId: string;
  onChange: (value: string) => void;
}

function FieldPicker({ departmentId, onChange }: FieldPickerProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!value) return;
    onChange(value);
  }, [onChange, value]);

  const fieldsQuery = useQuery({
    queryKey: ["fields", departmentId],
    queryFn: async () => getFields(),
  });

  const selectedField = fieldsQuery.data?.find(
    (field: Field) => field.name === value,
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
          {selectedField ? <FieldRow field={selectedField} /> : "Select field"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-4">
        <Command onSubmit={(e) => e.preventDefault()}>
          <CommandInput placeholder="Search field..." />
          <FieldDialog />
          <CommandEmpty>
            <p>Field not Found</p>
            <p className="text-xs text-muted-foreground">
              Tips: Create new field
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {fieldsQuery.data &&
                fieldsQuery.data.map((field: Field) => (
                  <CommandItem
                    key={field.id}
                    onSelect={() => {
                      setValue(field.name);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <div className="flex w-full items-center justify-between">
                      <FieldRow field={field} />
                      <Check
                        className={cn(
                          "h-4 w-4 opacity-0",
                          value === field.name && "opacity-100",
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

export default FieldPicker;

function FieldRow({ field }: { field: Field }) {
  return <span className="whitespace-nowrap">{field.name}</span>;
}
