import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { StoreContext } from "../../context/store/StoreContext";

const jsonServerPageField = '_page'

const ProductsPagination = () => {
  const [params, setParams] = useSearchParams()
  const { productsTotalCount, getProductsRequest } = useContext(StoreContext);

  const handlePageClick = (event, page) => {
    setParams({ [jsonServerPageField]: page })


    const searchParams = params?.get(jsonServerPageField)

    if (searchParams == page) {
        return
    }

    getProductsRequest();
  };

  return (
    <React.Fragment>
      {!!productsTotalCount && (
        <Pagination
          onChange={handlePageClick}
          count={Math.ceil(productsTotalCount / 8)}
        />
      )}
    </React.Fragment>
  );
};

export default ProductsPagination;
