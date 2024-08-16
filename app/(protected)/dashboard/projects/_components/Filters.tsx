"use client";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";

const Filters = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Category
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Science</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Technology</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Engineering</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Arts</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Mathematics</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Institution
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Institution</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>
              RP/IPRC Tumba
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>RP/IPRC Huye</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>RP/IPRC Musanze</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>RP/IPRC Kigali</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>RP/IPRC Ngoma</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>RP/IPRC Kitabi</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>RP/IPRC Kalongi</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Sort by
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>
              Most Recent
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Most Viewed</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Highly Rated</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DateRangePicker />
      </div>
    </div>
  );
};

export default Filters;
