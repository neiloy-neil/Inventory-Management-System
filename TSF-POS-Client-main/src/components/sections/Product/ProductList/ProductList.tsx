import React, { useState } from "react";
import { Product } from "../../../../types/Product/ProductTypes";
import ProductCard from "../../../cards/ProductCard/ProductCard";
import AddProduct from "../AddProduct/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../../../redux/redux";
import { deleteProduct } from "../../../../redux/actions/product/productAction";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import "./productList.scss";
import EditProduct from "../EditProduct/EditProduct";
import ProductListView from "../ProductListView/ProductListView";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import Button from "../../../core/Button/Button";

const ProductList = ({ products }: { products: Product[] }) => {
  const { loading } = useSelector((state: StateType) => state.product);
  const [deletingProductId, setDeletingProductId] = useState<string>("");
  const [deletingProductModal, setDeletingProductModal] =
    useState<boolean>(false);
  const [editingModalOpen, setEditingModelOpen] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<string>("");
  console.log(editingProductId);
  const [editingProduct, setEditingProduct] = useState<Product>();
  const [listView, setListView] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const handleDeleteProduct = async () => {
    await dispatch(deleteProduct(deletingProductId));
    setDeletingProductModal(false);
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-list-title">Product Management</h1>
        <div className="view-toggle">
          <AddProduct />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setListView(event.target.checked);
                  }}
                />
              }
              label="List View"
            />
          </FormGroup>
        </div>
      </div>
      
      <DeleteProduct
        deletingProductModal={deletingProductModal}
        loading={loading}
        handleDeleteProduct={handleDeleteProduct}
        setDeletingProductModal={setDeletingProductModal}
      />
      <EditProduct
        open={editingModalOpen}
        setOpen={setEditingModelOpen}
        editingProduct={editingProduct}
      />
      
      {listView ? (
        <div className="modern-card modern-mb-lg">
          <div className="modern-card-body">
            <ProductListView products={products} />
          </div>
        </div>
      ) : (
        <div className="product__list">
          {products?.map((product, index) => {
            if (product.branchStocks?.length !== 0) {
              let totalStock = 0;
              product.branchStocks?.forEach((branch) => {
                totalStock += branch.stock;
              });

              if (totalStock === 0) return <></>;
            }
            return (
              <ProductCard
                sales={product.sales}
                product={product}
                showTotalStock
                setDeletingProductId={setDeletingProductId}
                setDeletionModelOpen={setDeletingProductModal}
                setEditingModelOpen={setEditingModelOpen}
                setEditingProductId={setEditingProductId}
                setEditingProduct={setEditingProduct}
                key={index}
                hideQty
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;