import React, { useEffect, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, CircularProgress, IconButton, Tooltip, TextField } from "@mui/material";
import { FiDownload, FiInfo } from "react-icons/fi";
import useUserStore from "../../../Zustand_State/UserStore";
import useAuthStore from "../../../Zustand_State/AuthStore";
import InfoTooltip from "../../ReusableComponents/InfoToolTip/InfoTooltip";
import "./Download.css"; // <-- Import your CSS

const Download = () => {
  const { downloads, downloadsLoading, fetchDownloads, getAndDownloadFile } = useUserStore();
  const { authUser } = useAuthStore();
  const [downloadingId, setDownloadingId] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (authUser) {
      fetchDownloads();
    }
  }, [authUser, fetchDownloads]);

  const handleDownload = async (filename, fileId) => {
    setDownloadingId(fileId);
    await getAndDownloadFile(filename, fileId);
    setDownloadingId(null);
  };

  const columns = useMemo(() => [
    {
      field: "index",
      headerName: "Index",
      width: 80,
      sortable: false,
    },
    { field: "language", headerName: "Language", flex: 1, sortable: true },
    { field: "created_at", headerName: "Date & Time", flex: 1.5, sortable: true },
    {
      field: "filename",
      headerName: "File Name",
      flex: 2,
      sortable: true,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <span className="filename-cell">
            {params.value}
          </span>
          {params.row.sub_file_details?.length > 0 && (
            <Tooltip
              title={<InfoTooltip fileName={params.value} details={params.row.sub_file_details} />}
              placement="top"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#fff",
                    color: "#000",
                    border: "1px solid #e3e7fd",
                    boxShadow: 3,
                    p: 1,
                    minWidth: 200,
                    maxWidth: 320,
                    whiteSpace: "normal",
                    fontSize: "0.65rem",
                  }
                }
              }}
            >
              <IconButton size="small">
                <FiInfo />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
    { field: "file_size", headerName: "File Size", flex: 1, sortable: true },
    { field: "code_lines", headerName: "Lines of Code", flex: 1, sortable: true },
    {
      field: "total_credit_used",
      headerName: "Credit Used",
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        const value = params.row?.total_credit_used;
        return value !== undefined && value !== null && value !== ""
          ? value
          : <span style={{ color: "#aaa" }}>N/A</span>;
      },
    },

    {
      field: "download",
      headerName: "Download",
        flex: 1,
        sortable: false,
      renderCell: (params) =>
        params.row.url ? (
          <Button
            className="Download_Button"
            variant="contained"
            color="primary"
            size="small"
            startIcon={
              downloadingId === params.row.file_id ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <FiDownload size={18} />
              )
            }
            disabled={downloadingId === params.row.file_id}
            onClick={() => handleDownload(params.row.filename, params.row.file_id)}
          >
          </Button>
        ) : (
          <span style={{ color: "#aaa" }}>N/A</span>
        ),
    },
  ], [downloadingId]);

  const rows = useMemo(
    () =>
      downloads.map((entry, idx) => ({
        ...entry,
        id: entry.file_id || idx,
        index: idx + 1,
      })),
    [downloads]
  );

  const filteredRows = useMemo(
    () =>
      rows.filter(row =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ),
    [rows, searchText]
  );

  useEffect(() => {
    setPage(0);
  }, [filteredRows]);

  return (
    <Box sx={{ p: { xs: 1, md: 4 }, background: "#f8fafc", minHeight: "80vh" }}>
      <Box sx={{ maxWidth: 1100, mx: "auto", background: "#fff", borderRadius: 2, boxShadow: 3, p: 3 }}>
        <div className="downloads-header">
          <h2 className="downloads-title">Documents</h2>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search…"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="downloads-search"
          />
        </div>
        <div style={{ width: "100%" }}>
          <DataGrid
            autoHeight
            rows={filteredRows}
            columns={columns}
            pagination
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={({ page, pageSize }) => {
              setPage(page);
              setPageSize(pageSize);
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            loading={downloadsLoading}
            disableSelectionOnClick
            sx={{
              background: "#fff",
              borderRadius: 2,
              "& .MuiDataGrid-columnHeaders": { background: "#e3e7fd", color: "#1a237e", fontWeight: 700 },
              "& .MuiDataGrid-row": { fontSize: "1rem" },
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            slots={{
              toolbar: true,
            }}
          />
        </div>
      </Box>
    </Box>
  );
};

export default Download;
