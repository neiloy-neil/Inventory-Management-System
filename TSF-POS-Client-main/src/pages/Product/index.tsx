import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../redux/redux";
import { getProduct } from "../../redux/actions/product/productAction";
import BigSpaceLoader from "../../components/loader/BigSpaceLoder/BigSpaceLoader";
import "./product.scss";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import ProductDetail from "../../components/ProductDetail/ProductDetail";

const Product = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch: AppDispatch = useDispatch();
  const {
    loading = true,
    error,
    product,
  } = useSelector((state: StateType) => state.product);

  useEffect(() => {
    if (id) {
      console.log("Product page mounted with ID parameter:", id);
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  if (error) {
    console.log("Product page rendering error state:", error);
    return (
      <Pagewrapper>
        <AlertPopup message={`Error loading product: ${error}`} type="error" onClose={() => {}} />
      </Pagewrapper>
    );
  }

  console.log("Product page rendering:", { loading, product: product?._id });

  return (
    <Pagewrapper>
      {loading || !product ? (
        <BigSpaceLoader />
      ) : (
        <ProductDetail product={product} />
      )}
    </Pagewrapper>
  );
};

export default Product;