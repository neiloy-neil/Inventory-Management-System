import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import BranchSelector from "../../components/sections/Branch/BranchSelector/BranchSelector";
import { useEffect, useState } from "react";
import ProductSection from "../../components/sections/Sale/ProductSection/ProductSection";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux/redux";
import "./sale.scss";
import { getBranch } from "../../redux/actions/branch/branchAction";
import { useForm } from "react-hook-form";
import { rearrangeCart } from "../../utils/cart/rearrangeCart";
import { addSale } from "../../redux/actions/sale/sale";
import { toast } from "react-hot-toast";
import { CLEAR_SALE_MESSAGE } from "../../constants/reduxActionsNames/sale";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import { useNavigate } from "react-router-dom";
import { CLEAR_CART } from "../../constants/reduxActionsNames/cart";
import SaleInfo from "../../components/sections/Sale/SaleInfo/SaleInfo";

const Sale = () => {
  const navigate = useNavigate();
  const { error, message, success, sale } = useSelector(
    (state: StateType) => state.sale
  );
  const { user } = useSelector((state: StateType) => state.user);
  const { cart } = useSelector((state: StateType) => state.cart);
  const [branchId, setBranchId] = useState<string>(
    user.branch ? user.branch : ""
  );

  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (error) toast.error(error);
    if (message) {
      toast.success(message);
      dispatch({ type: CLEAR_CART });
    }
    dispatch({ type: CLEAR_SALE_MESSAGE });
  }, [error, message, dispatch]);

  useEffect(() => {
    if (branchId) {
      dispatch(getBranch(branchId));
      console.log(branchId, "branchID");
    }
  }, [dispatch, branchId, setValue]);

  useEffect(() => {
    const { rearrangedCart, totalPrice } = rearrangeCart(cart);
    setValue("items", rearrangedCart);
    setValue("total", totalPrice);
    setValue("branch", branchId);
  }, [cart, setValue, branchId]);

  // Handle successful sale - open invoice in new tab and reload sale page
  useEffect(() => {
    if (success && sale && sale._id) {
      // Open invoice in new tab
      window.open(`/invoice/${sale._id}`, '_blank');
      
      // Reload the sale page after a short delay
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [success, sale]);

  const submitSale = async (data: object) => {
    await dispatch(addSale(data));
  };

  return (
    <Pagewrapper hideBar>
      <div className="sale-page modern-sale-page">
        <div className="selector-side p-4 modern-selector-side">
          {!user.branch && <BranchSelector setBranchId={setBranchId} />}
          <div className="modern-card">
            <div className="modern-card-header">
              <h2 className="modern-card-title">Products</h2>
            </div>
            <div className="modern-card-body">
              <ProductSection />
            </div>
          </div>
        </div>
        <div className="sale__info-side pt-3 p-4 modern-sale-info-side">
          <div className="modern-card">
            <div className="modern-card-header">
              <h2 className="modern-card-title">Create Order</h2>
            </div>
            <div className="modern-card-body">
              {!branchId ? (
                <AlertPopup message="Please Select A Branch First" type="warning" />
              ) : (
                <>
                  {success ? (
                    <AlertPopup
                      message="Sale Success! Invoice opening in new tab..."
                      type="success"
                    />
                  ) : (
                    <SaleInfo
                      handleSubmit={handleSubmit}
                      register={register}
                      submitSale={submitSale}
                      watch={watch}
                      errors={errors}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Pagewrapper>
  );
};

export default Sale;