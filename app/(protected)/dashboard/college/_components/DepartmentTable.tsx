"use client";

import { DataTableColumnHeader } from "@/components/datatable/ColumnHeader";
import { ColumnToggle } from "@/components/datatable/ColumnToggle";
import { DataTableFacetedFilter } from "@/components/datatable/FacetedFilter";
import SkeletonWrapper from "@/components/shared/SkeletonWrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { MoreHorizontal, PlusCircle, TrashIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  getDepartmentsByCollegeId,
  GetDepartmentsType,
} from "../_actions/department.actions";
import DeleteDepartmentDialog from "./DeleteDepartmentDialog";
import DepartmentDialog from "./DepartmentDialog";
import FieldDialog from "./FieldDialog";

interface DepartmentTableProps {
  collegeId: string;
}

const emptyData: any[] = [];

type DepartmentRow = GetDepartmentsType[0];

const columns: ColumnDef<DepartmentRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => (
      <div className="text-nowrap capitalize">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "field",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Field" />
    ),
    cell: ({ row }) => (
      <p className="text-nowrap rounded p-2 font-medium">
        {row.original.field.map((f, i) => (
          <p key={i}>{f.name}</p>
        ))}
      </p>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowActions department={row.original} />,
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

function DepartmentTable({ collegeId }: DepartmentTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: departments, isLoading } = useQuery<GetDepartmentsType>({
    queryKey: ["faculity", "departments"],
    queryFn: async () => await getDepartmentsByCollegeId(collegeId),
  });

  const handleExportCSV = (data: any[]) => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useReactTable({
    data: departments || emptyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const nameOptions = useMemo(() => {
    const nameMap = new Map();
    departments?.forEach((department) => {
      nameMap.set(department.name, {
        value: department.name,
        label: `${department.name}`,
      });
    });
    const uniquName = new Set(nameMap.values());
    return Array.from(uniquName);
  }, [departments]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-2 py-4">
        <div className="flex gap-2">
          <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
            {table.getColumn("title") && (
              <DataTableFacetedFilter
                options={nameOptions}
                title="Title"
                column={table.getColumn("title")}
              />
            )}
          </SkeletonWrapper>
        </div>
        <div className="flex flex-wrap gap-2">
          <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
            <ColumnToggle table={table} />
          </SkeletonWrapper>
          <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
            <FieldDialog
              trigger={
                <Button
                  variant={"outline"}
                  className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add New Field
                  </span>
                </Button>
              }
            />
          </SkeletonWrapper>
          <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
            <DepartmentDialog
              trigger={
                <Button
                  variant={"outline"}
                  className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add New Department
                  </span>
                </Button>
              }
            />
          </SkeletonWrapper>
        </div>
      </div>
      <SkeletonWrapper isLoading={isLoading}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </SkeletonWrapper>
    </div>
  );
}

export default DepartmentTable;

function RowActions({ department }: { department: DepartmentRow }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DeleteDepartmentDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        departmentId={department.id}
      />
      <DropdownMenu>
        <div className="flex w-full items-center justify-center">
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev);
            }}
          >
            <TrashIcon className="h-4 w-4 text-muted-foreground text-red-500" />{" "}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
