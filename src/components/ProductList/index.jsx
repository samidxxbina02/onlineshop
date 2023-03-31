import { Box } from "@mui/joy";
import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/store/StoreContext";
import ProductCard from "../ProductCard";
import ProductSkeletons from "../ProductSkeletons";

const ProductList = () => {
  const { getProductsRequest, products, productsPending } =
    useContext(StoreContext);

  useEffect(() => {
    getProductsRequest();
  }, []);

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
          const { id, title, description, img, price, likes } = product;

          return (
            <ProductCard
              key={id}
              title={title}
              description={description}
              img={img}
              price={price}
              likes={likes}
            />
          );
        })
      ) : (
        <div>Продуктов нету пока что</div>
      )}
    </Box>
  );
};

export default ProductList;
