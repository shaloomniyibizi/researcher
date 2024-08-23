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
import { Department } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getDepartments } from "../_actions/department.actions";
import DepartmentDialog from "./DepartmentDialog";

interface DepartmentPickerProps {
  collegeId: string;
  onChange: (value: string) => void;
}

function DepartmentPicker({ collegeId, onChange }: DepartmentPickerProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!value) return;
    onChange(value);
  }, [onChange, value]);

  const departmentsQuery = useQuery({
    queryKey: ["departments", collegeId],
    queryFn: async () => getDepartments(),
  });

  const selectedDepartment = departmentsQuery.data?.find(
    (department: Department) => department.name === value,
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
          {selectedDepartment ? (
            <DepartmentRow department={selectedDepartment} />
          ) : (
            "Select department"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-4">
        <Command onSubmit={(e) => e.preventDefault()}>
          <CommandInput placeholder="Search department..." />
          <DepartmentDialog />
          <CommandEmpty>
            <p>Department not Found</p>
            <p className="text-xs text-muted-foreground">
              Tips: Create new department
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {departmentsQuery.data &&
                departmentsQuery.data.map((department: Department) => (
                  <CommandItem
                    key={department.id}
                    onSelect={() => {
                      setValue(department.name);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <div className="flex w-full items-center justify-between">
                      <DepartmentRow department={department} />
                      <Check
                        className={cn(
                          "h-4 w-4 opacity-0",
                          value === department.name && "opacity-100",
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

export default DepartmentPicker;

function DepartmentRow({ department }: { department: Department }) {
  return <span className="whitespace-nowrap">{department.name}</span>;
}
