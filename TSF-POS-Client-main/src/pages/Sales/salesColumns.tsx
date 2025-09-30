import Button from "../../components/core/Button/Button";

export const saleColumns = [
  { field: "id", headerName: "Sale Id", width: 90 },
  {
    field: "customerName",
    headerName: "Customer name",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "productIds",
    headerName: "Product Id's",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "branch",
    headerName: "Branch",
    minWidth: 200,
  },

  {
    field: "total",
    headerName: "Total",
    minWidth: 100,
  },
  {
    field: "date",
    headerName: "Date",
    minWidth: 100,
  },
  {
    field: "paymentMethod",
    headerName: "Payment Method",
    minWidth: 100,
  },
  {
    field: "Invoice",
    headerName: "Invoice",
    flex: 1,
    renderCell: (params: any) => {
      console.log(params);
      return (
        <>
          <Button
            title={"Invoice"}
            onClick={() => window.open(`/invoice/${params.row._id}`)}
          />
        </>
      );
    },
  },
];
