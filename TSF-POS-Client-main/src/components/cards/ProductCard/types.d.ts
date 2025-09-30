import { Product } from "../../../types/Product/ProductTypes";

interface ProductCardTypes {
  product: Product;
  sales?: number;
  quantity?: number;
  setEditingModelOpen: React.Dispatch<SetStateAction<boolean>>;
  setQuantityModelOpen?: React.Dispatch<SetStateAction<boolean>>;
  setEditingProductId: React.Dispatch<SetStateAction<string>>;
  setDeletingProductId: React.Dispatch<SetStateAction<string>>;
  setDeletionModelOpen: React.Dispatch<SetStateAction<boolean>>;
  setEditingProduct?: React.Dispatch<SetStateAction<Product>>;
  showTotalStock?: boolean;
  hideQty?: true;
}
