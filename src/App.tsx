import "./index.css";
import { useRequest } from "./api";
import { DataTable } from "./DataTable";
import { UserColumns } from "./columns";
import { useMemo, useState } from "react";
import { PaginationControls } from "./PaginationControls";

function App() {
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);

  const { data, total } = useRequest({
    page: page,
    sortBy: sorting.length ? sorting[0].id : "username", // По умолчанию сортировка по username
    sortOrder: sorting.length ? (sorting[0].desc ? "desc" : "asc") : "asc", // По умолчанию порядок asc
    pageSize: 10,
  });

  const columns = useMemo(() => UserColumns, []);

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
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
      <div>
        Page: {page} SortBy:{sorting.length ? sorting[0].id : "username"}{" "}
        SortOrder:{sorting.length ? (sorting[0].desc ? "desc" : "asc") : "asc"}
      </div>
    </>
  );
}

export default App;
