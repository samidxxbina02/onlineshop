import React, { useReducer } from "react";

import { StoreContext } from "./StoreContext";
import { useProductsRequests } from "./reducers/productsReducer/reducer";

import productsReducer from './reducers/productsReducer/reducer'

import { initialState } from "./initialState";

const StoreProvider = ({ children }) => {
  const [productsState, productsDispatch] = useReducer(
    productsReducer,
    initialState
  );

  const { getProductsRequest, userHandleLikeProductRequest, createProduct, deleteProduct, getProductsByIdRequest, editProduct } =
    useProductsRequests(productsDispatch);


  const productsValue = {
    getProductsRequest,
    createProduct,
    deleteProduct,
    getProductsByIdRequest,
    editProduct,
    userHandleLikeProductRequest,
    productsPending: productsState.products.pending,
    productsError: productsState.products.error,
    products: productsState.products.data,
    productsTotalCount: productsState.products.totalCount,
    createPending: productsState.products.createPending,
    editedProduct: productsState.products.editedProduct,
  };


  const defaultValue = {
    ...productsValue,
  };


  // console.log(productsState.products.data)

  return (
    <StoreContext.Provider value={defaultValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
