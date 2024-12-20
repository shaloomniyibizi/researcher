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
import { cn, dateToUTCDate } from "@/lib/utils";
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
import {
  Download,
  MoreHorizontal,
  PenBox,
  PlusCircle,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getUsersByColleId, GetUsersType } from "../_actions/user.actions";
import DeleteUserDialog from "./DeleteUserDialog";
import EditUserDialog from "./EditUserDialog";

interface UserTableProps {
  from: Date;
  to: Date;
  collegeId: string;
}

const emptyData: any[] = [];

type UserRow = GetUsersType[0];

const columns: ColumnDef<UserRow>[] = [
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-3 text-justify">{row.original.email!}</div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formatedDate = date.toLocaleDateString("default", {
        timeZone: "UTC",
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
      return <div className="text-nowrap capitalize">{formatedDate}</div>;
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => (
      <div
        className={cn(
          "rounded-lg p-2 text-center capitalize",
          row.original.Department?.name === "ICT" &&
            "bg-emerald-400/10 text-emerald-500",
          row.original.Department?.name !== "ICT" &&
            "bg-red-400/10 text-red-500",
        )}
      >
        {row.original.Department?.name}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => (
      <div
        className={cn(
          "rounded-lg p-2 text-center capitalize",
          row.original.role === "FACULTY" &&
            "bg-emerald-400/10 text-emerald-500",
          row.original.role === "ADMIN" && "bg-red-400/10 text-red-200",
          row.original.role === "STUDENT" && "bg-red-400/10 text-red-500",
        )}
      >
        {row.original.role}
      </div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="phoneNumber" />
    ),
    cell: ({ row }) => (
      <p className="text-nowrap rounded p-2 text-center font-medium">
        {row.original.phoneNumber}
      </p>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowActions user={row.original} />,
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

function UserTable({ from, to, collegeId }: UserTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: users, isLoading } = useQuery<GetUsersType>({
    queryKey: ["faculity", "users", from, to],
    queryFn: async () =>
      await getUsersByColleId(
        dateToUTCDate(from),
        dateToUTCDate(to),
        collegeId,
      ),
  });

  const handleExportCSV = (data: any[]) => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useReactTable({
    data: users || emptyData,
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
    users?.forEach((user) => {
      nameMap.set(user.name, {
        value: user.name,
        label: `${user.name}`,
      });
    });
    const uniquName = new Set(nameMap.values());
    return Array.from(uniquName);
  }, [users]);

  const departmentOptions = useMemo(() => {
    const departmentMap = new Map();
    users?.forEach((user) => {
      departmentMap.set(user.Department?.name, {
        value: user.Department?.name,
        label: user.Department?.name,
      });
    });
    const uniquDepartment = new Set(departmentMap.values());
    return Array.from(uniquDepartment);
  }, [users]);
  const roleOptions = useMemo(() => {
    const roleMap = new Map();
    users?.forEach((user) => {
      roleMap.set(user.role, {
        value: user.role,
        label: user.role,
      });
    });
    const uniquRole = new Set(roleMap.values());
    return Array.from(uniquRole);
  }, [users]);

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
          <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
            {table.getColumn("department") && (
              <DataTableFacetedFilter
                options={departmentOptions}
                title="Department"
                column={table.getColumn("department")}
              />
            )}
          </SkeletonWrapper>
          <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
            {table.getColumn("role") && (
              <DataTableFacetedFilter
                options={roleOptions}
                title="Role"
                column={table.getColumn("role")}
              />
            )}
          </SkeletonWrapper>
        </div>
        <div className="flex flex-wrap gap-2">
          <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
            <ColumnToggle table={table} />
          </SkeletonWrapper>
          <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
            <Button
              variant={"outline"}
              size={"sm"}
              className="ml-auto h-8 lg:flex"
              onClick={() => {
                const data = table.getFilteredRowModel().rows.map((row) => ({
                  NO: row.original.id,
                  TITLE: row.original.name,
                  EMAIL: row.original.email,
                  STUTUS: row.original.role,
                  DEPARTMENT: row.original.Department.name,
                  PHONE: row.original.phoneNumber,
                  DATE: row.original.createdAt,
                }));
                handleExportCSV(data);
              }}
            >
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </SkeletonWrapper>
          <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
            <Button asChild size="sm" className="h-8 gap-1">
              <Link href={"/dashboard/users/add"}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add User
                </span>
              </Link>
            </Button>
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

export default UserTable;

function RowActions({ user }: { user: UserRow }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      <DeleteUserDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        userId={user.id}
      />
      <EditUserDialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        userId={user.id}
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
              setShowEditDialog((prev) => !prev);
            }}
          >
            <PenBox className="h-4 w-4 text-emerald-600" /> Edit
          </DropdownMenuItem>
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
