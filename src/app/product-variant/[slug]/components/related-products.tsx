import ProductList from "@/components/common/product-list";
import { getProductsByCategoryId } from "@/db/queries";

type RelatedProductsProps = {
  categoryId: string;
  /** Product id to exclude (the one being viewed). */
  excludeProductId: string;
};

/**
 * Streams below the main product info via Suspense, so the critical PDP content
 * paints without waiting on this secondary query.
 */
const RelatedProducts = async ({
  categoryId,
  excludeProductId,
}: RelatedProductsProps) => {
  const products = (await getProductsByCategoryId(categoryId)).filter(
    (product) => product.id !== excludeProductId,
  );

  if (products.length === 0) {
    return null;
  }

  return <ProductList title="You might also like" products={products} />;
};

export default RelatedProducts;
