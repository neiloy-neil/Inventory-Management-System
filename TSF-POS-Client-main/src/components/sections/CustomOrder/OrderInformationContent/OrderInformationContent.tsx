import moment from "moment";
import {
  CustomOrderFromServer,
  CustomOrderType,
} from "../../../../types/CustomOrder/CustomOrderTypes";
import Button from "../../../core/Button/Button";
import FormModal from "../../../Modals/FormModal/FormModal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ORDER_EDIT_FIELDS from "./OrderEditFields";
import { useDispatch } from "react-redux";
import {
  editCustomOrder,
  fetchSingleOrder,
} from "../../../../redux/actions/customOrder/customOrderAction";

const OrderInformationContent = ({
  order,
}: {
  order: CustomOrderFromServer;
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit: any = async (submittedValues: CustomOrderType) => {
    console.log(submittedValues, "submitted values")
    const formData = new FormData();

    for (const [key, value] of Object.entries(submittedValues)) {
      if (key !== "photos") formData.append(key, value);
    }

    for (let i = 0; i < submittedValues.photos.length; i++) {
      formData.append("photos", submittedValues.photos[i]);
    }

    setLoading(true);
    await dispatch(editCustomOrder(formData, order._id));
    setLoading(false);
    setOpen(false);
    await dispatch(fetchSingleOrder(order._id));
  };

  return (
    <>
      <FormModal
        title="Edit Order"
        loading={loading}
        errors={errors}
        fields={ORDER_EDIT_FIELDS}
        open={open}
        register={register}
        setOpen={setOpen}
        submitFields={handleSubmit(onSubmit)}
        defaultValues={order}
      />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Order Information</h1>
        <div className="d-flex gap-2">
          <Button title="Edit Order" onClick={() => setOpen(true)} />
          <Button
            title="Print Invoice"
            className="mb-4 btn-success"
            onClick={() => window.open(`/custom-order-invoice/${order._id}`)}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header text-white">
                <h4 className="mb-0">Customer Details</h4>
              </div>
              <div className="card-body">
                <p className="mb-2">
                  <strong>Name:</strong> {order.customerName}
                </p>
                <p className="mb-2">
                  <strong>Phone:</strong> {order.customerPhone}
                </p>
                <p className="mb-2">
                  <strong>Branch:</strong> {order.branch.name}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header text-white">
                <h4 className="mb-0">Order Details</h4>
              </div>
              <div className="card-body">
                <p className="mb-2">
                  <strong>Description:</strong> {order.description}
                </p>
                <p className="mb-2">
                  <strong>Color:</strong> {order.color}
                </p>
                <p className="mb-2">
                  <strong>Wood:</strong> {order.wood}
                </p>
                <p className="mb-2">
                  <strong>Total Price:</strong> {order.totalPrice}
                </p>
                <p className="mb-2">
                  <strong>Status:</strong> {order.status}
                </p>
                <p className="mb-2">
                  <strong>Advance Payment:</strong> {order.advancePayment}
                </p>
                <p className="mb-2">
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p className="mb-0">
                  <strong>Order Date:</strong>{" "}
                  {moment(order.createdAt).format("Do MMMM YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          {order.photos.map((photo, index) => (
            <img
              src={photo}
              alt=""
              key={index}
              style={{ width: "300px", objectFit: "contain" }}
            />
          ))}
        </div>

        {order.products.length > 0 && (
          <div className="card-body">
            <table className="table table-bordered mb-0">
              <thead className="card-header">
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.product?.name}</td>
                    <td>{product?.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderInformationContent;
