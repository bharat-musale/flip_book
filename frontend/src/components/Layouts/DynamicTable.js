import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  TablePagination,
} from "@mui/material";

export default function DynamicTable({
  columns,
  loading = false,
  data = [],
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onCertificate = () => {},
  onPublish = () => {},
  isView = false,
  isEdit = false,
  isDelete = false,
  isCertificate = false,
  isPublish = false,
  isPagination = false,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const paginatedData = isPagination
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : data;

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "800px", overflowX: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  minWidth: col.minWidth || 100,
                  cursor: col.editable ? "pointer" : "default",
                  color: col.color || "inherit",
                }}
              >
                {col.label}
              </TableCell>
            ))}
            <TableCell
              sx={{
                position: "sticky",
                right: 0,
                background: "white",
                fontWeight: "bold",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                <CircularProgress size={24} />
              </TableCell>
            </TableRow>
          ) : paginatedData?.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <TableRow key={row.id || rowIndex}>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    onClick={() => col.onClick && col.onClick(row)}
                  >
                    {col.render
                      ? col.render(row[col.key], row, rowIndex)
                      : row[col.key]}
                  </TableCell>
                ))}
                <TableCell
                  sx={{ position: "sticky", right: 0, background: "white" }}
                >
                  {isView && <IconButton color="primary" onClick={() => onView(row)}>
                    V
                  </IconButton>}
                  {isEdit && <IconButton color="secondary" onClick={() => onEdit(row)}>
                    E
                  </IconButton>}
                  {(isDelete || row?.isDeleted) && <IconButton color="warning" onClick={() => onDelete(row)}>
                    D
                  </IconButton>}
                  {isCertificate && <IconButton color="info" onClick={() => onCertificate(row)}>
                    C
                  </IconButton>}
                 {isPublish && <IconButton color={`${row.isPublished ? "success" : "error"}`} onClick={() => onPublish(row)}>
                    P
                  </IconButton>}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isPagination && (
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      )}
    </TableContainer>
  );
}
