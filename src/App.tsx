import "./index.css";
import { useRequest } from "./api";
import { DataTable } from "./DataTable";
import { UserColumns } from "./columns";
import { useMemo, useState } from "react";
import { PaginationControls } from "./PaginationControls";
import { RowSelectionState } from "@tanstack/react-table";
import { User } from "./api.dto";

function App() {
  const [page, setPage] = useState(1);

  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data, total } = useRequest({
    page: page,
    sortBy: sorting.length ? sorting[0].id : "username", // По умолчанию сортировка по username
    sortOrder: sorting.length ? (sorting[0].desc ? "desc" : "asc") : "asc", // По умолчанию порядок asc
    pageSize: 10,
  });

  const columns = useMemo(() => UserColumns, []);
  const getRowId = (row: User) => row.id;

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        rowSelection={rowSelection}
        getRowId={getRowId}
        setRowSelection={setRowSelection}
        sorting={sorting}
        setSorting={setSorting}
      />
      <PaginationControls
        page={page}
        pageSize={10}
        total={total}
        onNextPage={() => setPage(page + 1)}
        onPreviousPage={() => setPage(page - 1)}
      />
      <div className="flex flex-col">
        <span>Page: {page}</span>
        <span>SortBy:{sorting.length ? sorting[0].id : "username"}</span>
        <span>
          SortOrder:
          {sorting.length ? (sorting[0].desc ? "desc" : "asc") : "asc"}
        </span>
        <span>
          SelectedRows:
          {JSON.stringify(rowSelection)}
        </span>
      </div>
    </>
  );
}

export default App;
