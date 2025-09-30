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
  const { id } = useParams();

  const dispatch: AppDispatch = useDispatch();
  const {
    loading = true,
    error,
    product,
  } = useSelector((state: StateType) => state.product);

  useEffect(() => {
    if (id) dispatch(getProduct(id));
  }, [dispatch, id]);

  if (error) {
    return (
      <Pagewrapper>
        <AlertPopup message={error} />;
      </Pagewrapper>
    );
  }

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
