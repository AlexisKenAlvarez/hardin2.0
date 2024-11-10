"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "./ui/button";
import { PageOptions } from "~/lib/types";
import { useSearchParams } from "@remix-run/react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageOptions: PageOptions;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageOptions,
}: DataTableProps<TData, TValue>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleNextPage = (range: "single" | "max") => {
    const params = new URLSearchParams(searchParams);

    if (range === "single") {
      params.set("page", String(page + 1));
    } else {
      params.set("page", String(pageOptions.pages));
    }
    setSearchParams(params);
  };

  const handlePreviousPage = (range: "single" | "min") => {
    const params = new URLSearchParams(searchParams);

    if (range === "single") {
      params.set("page", String(page - 1));
    } else {
      params.set("page", "1");
    }
    setSearchParams(params);
  };

  return (
    <>
      <div className="rounded-md border font-primary">
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
                            header.getContext()
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
                        cell.getContext()
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
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreviousPage("min")}
            disabled={page <= 1}
          >
            &lt;&lt;
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreviousPage("single")}
            disabled={page <= 1}
          >
            Previous
          </Button>
        </div>

        <div className="flex text-xs gap-2 items-center">
          <p className="">{pageOptions.page}</p>
          <span>of</span>
          <p className="">{pageOptions.pages}</p>
        </div>

        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNextPage("single")}
            disabled={page >= (pageOptions.pages ?? 1)}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNextPage("max")}
            disabled={page >= (pageOptions.pages ?? 1)}
          >
            &gt;&gt;
          </Button>
        </div>
      </div>
    </>
  );
}
