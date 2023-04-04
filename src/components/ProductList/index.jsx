import { Box } from "@mui/joy";
import React, { useContext } from "react";
import ProductCard from "../ProductCard";
import ProductSkeletons from "../ProductSkeletons";
import { AuthContext } from "../../context/auth/AuthContext";

const ProductList = ({ products = [], productsPending = false }) => {
  const { userLikes } = useContext(AuthContext)

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "space-between",
        padding: "20px 40px",
      }}
    >
      {productsPending ? (
        <ProductSkeletons />
      ) : products?.length ? (
        products.map((product) => {
          const userIsLike = userLikes?.some(productIsLikeId => productIsLikeId == product.id)
          return <ProductCard key={product.id} product={product} userIsLike={userIsLike}/>;
        })
      ) : (
        <div>Продуктов нету пока что</div>
      )}
    </Box>
  );
};

export default ProductList;
