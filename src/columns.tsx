import { ColumnDef } from "@tanstack/react-table";
import { User } from "./api.dto";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";

export const UserColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          username
        </Button>
      );
    },
    enableSorting: true, // Включаем сортировку для этой колонки
  },
  {
    accessorKey: "totalTurnover",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Turnover
        </Button>
      );
    },
    enableSorting: true, // Включаем сортировку для этой колонки
  },
];
