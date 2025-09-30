import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ProductListViewType } from "./type";
import { Box } from "@mui/material";

const ProductListView = ({ products }: ProductListViewType) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "photo",
      headerName: "Photo",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value} // Assuming the photo link is available as params.value
          alt={`Photo ${params.row.name}`} // Assuming the name of the item is present in the "name" field
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "costPrice",
      headerName: "Cost Price",
      width: 150,
    },
    {
      field: "sellPrice",
      headerName: "Cost Price",
      width: 150,
    },
    {
      field: "totalStock",
      headerName: "Total Stock",
      width: 150,
    },
    {
      field: "sales",
      headerName: "Total Sales",
      width: 150,
    },
  ];

  const rows: any[] = [];

  products?.map((product) => {
    rows.push({ id: product.productId, ...product });
  });

  return (
    <div>
      <Box sx={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
        />
      </Box>
    </div>
  );
};

export default ProductListView;
