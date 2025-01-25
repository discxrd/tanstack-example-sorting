import { ColumnDef } from "@tanstack/react-table";
import { User } from "./api.dto";
import { Button } from "./components/ui/button";

export const UserColumns: ColumnDef<User>[] = [
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
