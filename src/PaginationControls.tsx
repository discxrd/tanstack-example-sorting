import { Button } from "./components/ui/button";

interface PaginationControlsProps {
  page: number;
  pageSize: number;
  total: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export const PaginationControls = ({
  page,
  pageSize,
  total,
  onNextPage,
  onPreviousPage,
}: PaginationControlsProps) => {
  return (
    <div className="flex justify-end mt-4">
      <Button
        className="btn btn-primary"
        onClick={onPreviousPage}
        disabled={page === 1}
      >
        Previous
      </Button>
      <span>
        Page {page} of {Math.ceil(total / pageSize)}
      </span>
      <Button
        className="btn btn-primary ml-2"
        onClick={onNextPage}
        disabled={page === Math.ceil(total / pageSize)}
      >
        Next
      </Button>
    </div>
  );
};
