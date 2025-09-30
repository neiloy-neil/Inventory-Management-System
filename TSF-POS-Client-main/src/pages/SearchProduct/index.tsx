import { useForm } from "react-hook-form";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import InputField from "../../components/core/InputField/InputField";
import SEARCH_PRODUCT_FIELD from "../../constants/InputFields/product/searchProduct";
import Button from "../../components/core/Button/Button";
import { SearchProductData } from "./types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../redux/redux";
import { getProduct } from "../../redux/actions/product/productAction";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import { CLEAR_PRODUCT_MESSAGE } from "../../constants/reduxActionsNames/product";
import BigSpaceLoader from "../../components/loader/BigSpaceLoder/BigSpaceLoader";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
// import { yupResolver } from "@hookform/resolvers/yup";
// import SEARCH_PRODUCT_VALIDATION from "../../constants/InputValidation/Product/searchProductValidation";

const SearchProduct = () => {
  const { loading, error, product } = useSelector(
    (state: StateType) => state.product
  );
  const { register, handleSubmit } = useForm<SearchProductData>();

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const searchProduct = (data: SearchProductData) => {
    dispatch({ type: CLEAR_PRODUCT_MESSAGE });
    navigate(`/search?search=true`);
    dispatch(getProduct(data.productId));
  };

  return (
    <Pagewrapper title="Search Product">
      <form
        action=""
        onSubmit={handleSubmit(searchProduct)}
        className="d-flex align-items-end gap-2 mb-4"
      >
        {SEARCH_PRODUCT_FIELD.map((field, key) => (
          <InputField
            key={key}
            label={field.label}
            placeholder={field.placeholder}
            register={register}
            type={field.type}
            name={field.name}
            // error={errors[field.name as keyof typeof errors]?.message}
          />
        ))}
        <Button
          title="Search"
          type="submit"
          onClick={handleSubmit(searchProduct)}
        />
      </form>
      {error ? (
        <AlertPopup message={error} />
      ) : (
        <>
          {loading ? (
            <BigSpaceLoader />
          ) : (
            <>{product && <ProductDetail product={product} branchDetail />}</>
          )}
        </>
      )}
    </Pagewrapper>
  );
};

export default SearchProduct;
