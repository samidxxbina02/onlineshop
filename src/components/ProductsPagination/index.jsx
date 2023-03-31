import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { StoreContext } from "../../context/store/StoreContext";


const jsonServerPageField = '_page'

const ProductsPagination = () => {
  const navigate = useNavigate();
  const { search } = useLocation()
  const { productsTotalCount, getProductsRequest } = useContext(StoreContext);

  const handlePageClick = (event, page) => {

    const searchParams = new URLSearchParams(document.location.search)

    if (searchParams.get(jsonServerPageField) == page) {
        return
    }

    const params = {
      _page: page,
      _limit: 8,
    };

    

    navigate({
        search: `${jsonServerPageField}=${page}`
    })

    getProductsRequest(params);
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
