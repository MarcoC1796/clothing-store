import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";

import ProductCard from "../../components/product-card/product-card.component";

import "./category.style.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

  // will set products to an empty object at the beggining
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  // We use the products && to protect against the async code when fetching products
  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
