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
import { Download, MoreHorizontal, PlusCircle, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getAllProjectsByDate,
  GetAllProjectsType,
} from "../_actions/project.actions";
import AcceptProjectDialog from "./AcceptProjectDialog";
import DeleteProjectDialog from "./DeleteProjectDialog";
import RejectProjectDialog from "./RejectProjectDialog";

interface ProjectTableProps {
  from: Date;
  to: Date;
  collegeId: string;
}

const emptyData: any[] = [];

type ProjectRow = GetAllProjectsType[0];

const columns: ColumnDef<ProjectRow>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <Image
        width={1200}
        height={1200}
        src={row.original.image!}
        alt="image"
        className="hidden h-16 w-16 rounded object-contain md:block"
      />
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => (
      <div className="text-nowrap capitalize">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div
        className="line-clamp-3 text-justify"
        dangerouslySetInnerHTML={{ __html: row.original.description! }}
      ></div>
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
          row.original.user.Department!.name === "ICT" &&
            "bg-emerald-400/10 text-emerald-500",
          row.original.user.Department!.name !== "ICT" &&
            "bg-red-400/10 text-red-500",
        )}
      >
        {row.original.user.Department!.name}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => (
      <div
        className={cn(
          "rounded-lg p-2 text-center capitalize",
          row.original.status === "accepted" &&
            "bg-emerald-400/10 text-emerald-500",
          row.original.status === "pedding" && "bg-red-400/10 text-red-200",
          row.original.status === "rejected" && "bg-red-400/10 text-red-500",
        )}
      >
        {row.original.status}
      </div>
    ),
  },
  {
    accessorKey: "Author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => (
      <p className="text-nowrap rounded p-2 text-center font-medium">
        {row.original.user.name}
      </p>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowActions project={row.original} />,
  },
];

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

function ProjectTable({ from, to, collegeId }: ProjectTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: project, isLoading } = useQuery<GetAllProjectsType>({
    queryKey: ["repository", "projects", from, to],
    queryFn: async () =>
      await getAllProjectsByDate(
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
    data: project || emptyData,
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

  const titleOptions = useMemo(() => {
    const titleMap = new Map();
    project?.forEach((project) => {
      titleMap.set(project.title, {
        value: project.title,
        label: `${project.title}`,
      });
    });
    const uniquTitle = new Set(titleMap.values());
    return Array.from(uniquTitle);
  }, [project]);

  const departmentOptions = useMemo(() => {
    const departmentMap = new Map();
    project?.forEach((project) => {
      departmentMap.set(project.user.Department!.name, {
        value: project.user.Department!.name,
        label: project.user.Department!.name,
      });
    });
    const uniquDepartment = new Set(departmentMap.values());
    return Array.from(uniquDepartment);
  }, [project]);
  const statusOptions = useMemo(() => {
    const statusMap = new Map();
    project?.forEach((project) => {
      statusMap.set(project.status, {
        value: project.status,
        label: project.status,
      });
    });
    const uniquStatus = new Set(statusMap.values());
    return Array.from(uniquStatus);
  }, [project]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-2 py-4">
        <div className="flex gap-2">
          <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
            {table.getColumn("title") && (
              <DataTableFacetedFilter
                options={titleOptions}
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
            {table.getColumn("status") && (
              <DataTableFacetedFilter
                options={statusOptions}
                title="Status"
                column={table.getColumn("status")}
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
                  TITLE: row.original.title,
                  DESCRIPTION: row.original.description,
                  STUTUS: row.original.status,
                  DEPARTMENT: row.original.user.Department.name,
                  AUTHOR: row.original.user.name,
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
              <Link href={"/dashboard/projects/add"}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Project
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

export default ProjectTable;

function RowActions({ project }: { project: ProjectRow }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  return (
    <>
      <DeleteProjectDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        projectId={project.id}
      />
      <AcceptProjectDialog
        open={showAcceptDialog}
        setOpen={setShowAcceptDialog}
        projectId={project.id}
      />
      <RejectProjectDialog
        open={showRejectDialog}
        setOpen={setShowRejectDialog}
        projectId={project.id}
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
              setShowAcceptDialog((prev) => !prev);
            }}
          >
            <TrashIcon className="h-4 w-4 text-muted-foreground text-red-500" />{" "}
            Accept
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={() => {
              setShowRejectDialog((prev) => !prev);
            }}
          >
            <TrashIcon className="h-4 w-4 text-muted-foreground text-red-500" />{" "}
            Reject
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
