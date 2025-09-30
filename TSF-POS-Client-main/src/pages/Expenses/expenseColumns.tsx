// import Button from "../../components/core/Button/Button";

export const expenseColumns = [
  { field: "id", headerName: "Id", width: 90 },
  {
    field: "createdAt",
    headerName: "Date",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "type",
    headerName: "Expense Type",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "employeeName",
    headerName: "Employee Name",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "amount",
    headerName: "Expense Amount",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "branch",
    headerName: "Branch",
    minWidth: 200,
  },
  // {
  //   field: "Invoice",
  //   headerName: "Invoice",
  //   flex: 1,
  //   renderCell: (params: any) => {
  //     console.log(params);
  //     return (
  //       <>
  //         <Button
  //           title={"Invoice"}
  //           onClick={() => window.open(`/invoice/${params.row._id}`)}
  //         />
  //       </>
  //     );
  //   },
  // },
];
