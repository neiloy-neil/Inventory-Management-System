import Card from "react-bootstrap/Card";
import Button from "../../core/Button/Button";
import "./productCard.scss";
import { ProductCardTypes } from "./types";
import { useNavigate } from "react-router-dom";
import useAdminPermission from "../../../hooks/permission/useAdminPermission";

const ProductCard = ({
  product,
  quantity,
  setDeletingProductId,
  setDeletionModelOpen,
  setEditingModelOpen,
  setEditingProductId,
  setEditingProduct,
  setQuantityModelOpen,
  hideQty,
  showTotalStock,
}: ProductCardTypes) => {
  const isAdmin = useAdminPermission();

  const onDeleteClick = () => {
    setDeletingProductId(product._id);
    setDeletionModelOpen(true);
  };

  const navigate = useNavigate();

  const onEditClick = () => {
    setEditingModelOpen(true);
    setEditingProductId(product._id);
    if (setEditingProduct) setEditingProduct(product);
  };

  const onQuantityChange = () => {
    if (!setQuantityModelOpen) return;
    setQuantityModelOpen(true);
    setEditingProductId(product._id);
    if (setEditingProduct) setEditingProduct(product);
  };

  return (
    <Card className="modern-product-card modern-fade-in">
      <Card.Img
        className="modern-product-image"
        variant="top"
        src={`${product.photo}`}
        onClick={() => navigate(`/product/${product.productId}`)}
      />
      <Card.Body className="modern-product-body">
        <div onClick={() => navigate(`/product/${product.productId}`)}>
          <Card.Title className="modern-product-title">{product.name}</Card.Title>
          <Card.Text className="modern-product-id">
            Id: <span className="fw-bold">{product.productId}</span>
          </Card.Text>
          {hideQty ? (
            <></>
          ) : (
            <Card.Text>
              Quantity: <span className="fw-bold">{quantity}</span>
            </Card.Text>
          )}
          {isAdmin && <Card.Text>Cost Price: {product.costPrice}</Card.Text>}
          <Card.Text className="modern-product-price">
            Sell Price: {product.sellPrice}
          </Card.Text>

          {showTotalStock && (
            <Card.Text>
              Total Stock: {product?.totalStock}
            </Card.Text>
          )}
          {isAdmin && (
            <Card.Text>
              Total Sale: {product?.sales}
            </Card.Text>
          )}
        </div>
        <div className="modern-product-actions">
          {isAdmin && (
            <Button
              title="Delete"
              className="modern-product-btn modern-product-btn-danger"
              onClick={onDeleteClick}
            />
          )}
          <Button 
            title="Edit" 
            className="modern-product-btn modern-product-btn-primary" 
            onClick={onEditClick} 
          />
        </div>
        {setQuantityModelOpen && isAdmin && (
          <Button
            title="Change Quantity"
            className="modern-product-btn modern-btn-outline mt-2"
            onClick={onQuantityChange}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;