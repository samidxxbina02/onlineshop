import React, { useReducer } from "react";

import { StoreContext } from "./StoreContext";
import { useProductsRequests } from "./reducers/productsReducer/reducer";
import { useUsersRequests } from "./reducers/userReducer/reducer";

import productsReducer from './reducers/productsReducer/reducer'
import userReducer from "./reducers/userReducer/reducer";

import { initialState } from "./initialState";

const StoreProvider = ({ children }) => {
  const [productsState, productsDispatch] = useReducer(
    productsReducer,
    initialState
  );
  const [userState, userDispatch] = useReducer(userReducer, initialState);

  const { getProductsRequest, createProduct, deleteProduct } =
    useProductsRequests(productsDispatch);

  const { registerUser, loginUser } = useUsersRequests(userDispatch);

  const productsValue = {
    getProductsRequest,
    createProduct,
    deleteProduct,
    productsPending: productsState.products.pending,
    productsError: productsState.products.error,
    products: productsState.products.data,
    productsTotalCount: productsState.products.totalCount,
    createPending: productsState.products.createPending,
  };

  const userValue = {
    registerUser,
    loginUser,
    userPending: userState.user.pending,
    userError: userState.user.error,
    user: userState.user.data || {},
    authIsExist: userState.user.authIsExist
  };

  const defaultValue = {
    ...productsValue,
    ...userValue,
  };

  return (
    <StoreContext.Provider value={defaultValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
