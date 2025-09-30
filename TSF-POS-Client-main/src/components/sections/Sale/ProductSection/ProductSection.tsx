import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../../../redux/redux";
import ProductSaleCard from "../../../cards/ProductSaleCard/ProductSaleCard";
import { ADD_TO_CART } from "../../../../constants/reduxActionsNames/cart";
import { toast } from "react-hot-toast";
import { BranchProduct } from "../../Branch/BranchProducts/BranchProducts";
import "./productSection.scss";
import AlertPopup from "../../../AlertPopup/AlertPopup";
import { ChangeEvent, useEffect, useState } from "react";

const ProductSection = () => {
  const dispatch = useDispatch();
  const [searchedProductId, setSearchedProductId] = useState<number>(0);
  const { branch, loading } = useSelector((state: StateType) => state.branch);
  const [products, setProducts] = useState<BranchProduct[]>([]); // Updated initial state to an empty array
  const { cart } = useSelector((state: StateType) => state.cart);

  const handleAddToCart = (product: BranchProduct) => {
    // checking if there is any duplicate product
    const duplicate = cart.find((pd) => pd._id === product._id);
    if (duplicate) return toast.error("Product already on cart");
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...product.id,
        quantity: 1,
        availableQuantity: product.quantity,
      },
    });
  };

  useEffect(() => {
    setProducts(branch?.products.slice().reverse());
  }, [branch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchedProductId(Number(event.target.value));
  };

  const handleProductSearch = () => {
    const product = branch.products.find(
      (pd) => Number(pd.id.productId) === searchedProductId
    );

    if (!product) toast.error("No Product Available With This Id");

    if (product) setProducts([product]);
  };

  if (!branch?.products && loading) return <>loading...</>;
  if (!branch?.products)
    return <AlertPopup message="Please Select a Branch First" />;
  if (branch?.products.length === 0)
    return <AlertPopup message="No Products Available on This Branch" />;

  return (
    <div className="product__section my-4 px-2">
      <div className="d-flex gap-2 my-4">
        <input
          type="number"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Product Id"
          onChange={handleInputChange}
          style={{ maxWidth: 150 }}
        />
        <button
          className="btn btn-info text-white"
          onClick={handleProductSearch}
        >
          Search
        </button>
        <button
          className="btn btn-danger"
          onClick={() => setProducts(branch?.products)}
        >
          Clear Search
        </button>
      </div>
      <div className="sale-product__list">
        {products?.map((product, key) => {
          if (product.quantity === 0) return <></>;
          return (
            <ProductSaleCard
              product={product}
              key={key}
              onClick={() => handleAddToCart(product)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductSection;
