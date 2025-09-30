import { Product } from "../../../types/Product/ProductTypes";
import { Card } from "react-bootstrap";
import Button from "../../core/Button/Button";
import "./productsalecard.scss";

const ProductSaleCard = ({
  product,
  onClick,
}: {
  product: { id: Product; quantity: number };
  onClick?: () => void;
}) => {
  return (
    <Card className="sale-product__card">
      <Card.Img
        className="product__image "
        variant="top"
        src={`${product.id?.photo}`}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fs-6 fw-semibold">
            {product.id?.name}
          </Card.Title>
          <Card.Text>
            Id: <span className="fw-bold">{product.id?.productId}</span>
          </Card.Text>

          <Card.Text>
            Quantity: <span className="fw-bold">{product.quantity}</span>
          </Card.Text>
          {/* 
          <Card.Text>Cost Price: {product.id.costPrice}</Card.Text>
          <Card.Text className="mb-3">
            Sell Price: {product.id.costPrice}
          </Card.Text> */}
        </div>
        <Button
          title="Add +"
          className="btn-primary w-100 mt-3"
          onClick={onClick}
        />
      </Card.Body>
    </Card>
  );
};

export default ProductSaleCard;
