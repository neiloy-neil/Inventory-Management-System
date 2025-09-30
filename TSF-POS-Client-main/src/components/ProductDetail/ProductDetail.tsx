import { Col, Container, Row } from "react-bootstrap";
import { SearchedProduct } from "../../types/Product/searchProductTypes";
import useAdminPermission from "../../hooks/permission/useAdminPermission";
import moment from "moment";
import { useEffect, useState } from "react";

const ProductDetail = ({
  product,
  branchDetail,
}: {
  product: SearchedProduct;
  branchDetail?: boolean;
}) => {
  const [totalSale, setTotalSale] = useState(0);
  const isAdmin = useAdminPermission();

  useEffect(() => {
    let totalSaleOfProduct = 0;
    product.sales.map((sale) => {
      // Match product by productId (number) since SaleItem.id is a number
      const matchedProduct = sale.items.find(
        (item) => item.id === product.productId
      );

      if (matchedProduct) totalSaleOfProduct += matchedProduct.quantity;
    });
    setTotalSale(totalSaleOfProduct);
  }, [product]);

  return (
    <Container>
      <Row style={{ gap: 15 }}>
        <Col lg={5}>
          <img
            src={`${product?.photo}`}
            alt={product?.name}
            className="product__image"
          />
        </Col>
        <Col lg={6} className="product__details">
          <p className="fs-4 fw-bold">{product?.name}</p>
          <p className="fw-semibold badge-pill badge badge-secondary">
            Product Id: {product?.productId}
          </p>
          <p>Color : {product?.color}</p>
          <p>Wood : {product?.wood}</p>
          {isAdmin && (
            <p className="fw-semibold badge badge-pill badge-primary">
              Cost Price: {product?.costPrice}
            </p>
          )}
          <br />
          <p className="fw-semibold badge badge-pill badge-success">
            Sell Price: {product?.sellPrice}
          </p>
          <p>Description : {`${product?.description}`}</p>
          {branchDetail && (
            <div>
              <p className="fs- my-2 mb-3 badge badge-pill badge-info">
                Available Branches:{" "}
              </p>
              <div className="gap-3 d-flex flex-column">
                {product.branches.map((branch, key) => (
                  <div className="card" key={key}>
                    <div className="card-body">
                      <h5 className="fs-6 mb-3 w-100">{branch.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Quantity : {branch.quantity}
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Col>
      </Row>
      <div className="container mt-4 pb-4">
        <h2 className="mb-4 font-weight-bold">Sales For This Product</h2>
        <h6 className="mb-4 font-weight-bold">
          Total Sale quantity of this product : {totalSale}
        </h6>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sale ID</th>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Branch</th>
              <th>Quantity</th>
              <th>Sale Date</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {product.sales.map((sale, key) => {
              // Match product by productId (number) since SaleItem.id is a number
              const matchedProduct = sale.items.find(
                (item) => item.id === product.productId
              );

              return (
                <tr key={key}>
                  <td>{sale.saleId}</td>
                  <td>{sale.customerName}</td>
                  <td>{sale.phone}</td>
                  <td>{sale.branch.name}</td>
                  <td>{matchedProduct?.quantity}</td>
                  <td>{moment(sale.createdAt).format("DD-MM-YYYY")}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        window.open(`invoice/${sale._id}`, "_blank")
                      }
                    >
                      Invoice
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default ProductDetail;