import { useContext, useEffect, useState } from "react";
import { GithubContext } from "./github.config";
import { DataGrid } from '@mui/x-data-grid';

export function GithubSearchResults({ count, pageIndex, items, onPageChange }) {
  const githubSettings = useContext(GithubContext);
  const [paginationModel, setPaginationModel] = useState({
    perPage: githubSettings.perPage,
    pageSize: githubSettings.perPage,
    page: pageIndex || 0,
  });

  useEffect(() => {
    setPaginationModel({
      perPage: githubSettings.perPage,
      pageSize: githubSettings.perPage,
      page: pageIndex || 0,
    });
  }, [githubSettings.perPage, pageIndex]);

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 400, align: "left" },
    { field: "pages", headerName: "Pages URL", width: 200 },
  ];

  return (
    <DataGrid
      rows={items || []}
      columns={columns}
      rowCount={count}
      
      paginationModel={paginationModel}
      onPaginationModelChange={(v) => {
        onPageChange(v.page);
      }}
      paginationMode="server"
    />
  );
}
