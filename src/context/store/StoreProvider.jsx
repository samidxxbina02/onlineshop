import React, { useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { StoreContext } from "./StoreContext";
import {
  API,
  API_URL,
  PRODUCTS_ACTION,
  USER_ACTION,
  AUTH_METHOD,
  defaultGetProductsParams,
} from "./const";

const { PRODUCTS, USER } = API;

const {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_ERROR,
  SET_PRODUCTS_COUNT,
  CREATE_PRODUCTS_SUCCESS,
  CREATE_PRODUCTS_PENDING,
  CREATE_PRODUCTS_ERROR,
} = PRODUCTS_ACTION;

const { GET_USER_SUCCESS, GET_USER_ERROR, GET_USER_PENDING } = USER_ACTION;

const { REGISTER, LOGIN } = AUTH_METHOD;

const initialState = {
  products: {
    pending: false,
    data: [],
    error: null,
    createPending: false,
    totalCount: 0,
  },
  user: {
    pending: false,
    data: {},
    error: null,
  },
};

// ACTION = {
//    type: ТО_ЧТО_ТЕБЕ_НУЖНО_СДЕЛАТЬ,
//    payload: ДАННЫЕ_НА_КОТОРЫЕ_СОБИРАЕШЬСЯ_ПОМЕНЯТЬ
// }

// REDUCER - только ОН имеет право менять состояние
// (он его не мутирует, то есть не удаляет что то, делает всегда то что ожидалось)

// DISPATCH - вызывает REDUCER - диспетчер который посредник
// между каким то дейстием (ACTION) и состоянием (state) которое нужно изменить через reducer

// NEW STATE - новое изменененное состояние от какого-то одного действия

// DISPATCH(ACTION)
// => REDUCER
// => ACTION.TYPE
// => return {
//    ...state,
//    (ЗДЕСЬ ТО ЧТО НУЖНО ИЗМЕНЯТЬ НАПРИМЕР)
//      products: {...state.products, pending}
//    }
// => NEW STATE

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_PENDING: {
      return {
        ...state,
        products: {
          ...state.products,
          pending: action.payload,
        },
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: {
          ...state.products,
          data: action.payload,
          pending: false,
        },
      };
    }
    case GET_PRODUCTS_ERROR: {
      return {
        ...state,
        products: {
          ...state.products,
          error: action.payload,
          pending: false,
        },
      };
    }
    case SET_PRODUCTS_COUNT: {
      return {
        ...state,
        products: {
          ...state.products,
          totalCount: action.payload,
        },
      };
    }
    case CREATE_PRODUCTS_PENDING: {
      return {
        ...state,
        products: {
          ...state.products,
          createPending: action.payload,
        },
      };
    }
    case CREATE_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: {
          ...state.products,
          data: [...state.products.data, action.payload],
          createPending: false,
        },
      };
    }
    case CREATE_PRODUCTS_ERROR: {
      return {
        ...state,
        products: {
          ...state.products,
          error: action.payload,
          createPending: false,
        },
      };
    }
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PENDING: {
      return {
        ...state,
        user: {
          ...state.user,
          pending: action.payload,
        },
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          data: action.payload,
          pending: false,
        },
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        user: {
          ...state.user,
          error: action.payload,
          pending: false,
        },
      };
    }
  }
};

const StoreProvider = ({ children }) => {
  const [productsState, productsDispatch] = useReducer(
    productsReducer,
    initialState
  );
  const [userState, userDispatch] = useReducer(userReducer, initialState);

  const registerUser = async (newUser) => {
    try {
      const getUserPendingAction = {
        type: GET_USER_PENDING,
        payload: true,
      };

      userDispatch(getUserPendingAction);

      const { data } = await axios.post(`${API_URL}/${REGISTER}`, newUser);

      localStorage.setItem("token", data.accessToken);

      const getUserSuccessAction = {
        type: GET_USER_SUCCESS,
        payload: data.user,
      };

      userDispatch(getUserSuccessAction);
    } catch (error) {
      const getUserErrorAction = {
        type: GET_USER_ERROR,
        payload: error,
      };
      toast.error("Неизвестная ошибка с сервера");
      userDispatch(getUserErrorAction);
    }
  };

  const getProductsRequest = async (params = defaultGetProductsParams) => {
    try {
      const getProductsPendingAction = {
        type: GET_PRODUCTS_PENDING,
        payload: true,
      };

      productsDispatch(getProductsPendingAction);

      const query = new URLSearchParams(params);

      const res = await axios(`${API_URL}/${PRODUCTS}?${query}`);

      const { data } = res;

      const setProductsCount = {
        type: SET_PRODUCTS_COUNT,
        payload: res.headers["x-total-count"],
      };

      productsDispatch(setProductsCount);

      const getProductsSuccessAction = {
        type: GET_PRODUCTS_SUCCESS,
        payload: data,
      };

      setTimeout(() => {
        productsDispatch(getProductsSuccessAction);
      }, 1500);
    } catch (error) {
      const getProductsErrorAction = {
        type: GET_PRODUCTS_ERROR,
        payload: error,
      };
      toast.error("Неизвестная ошибка с сервера");
      productsDispatch(getProductsErrorAction);
    }
  };

  const createProduct = async (newProduct) => {
    try {
      const createProductsPendingAction = {
        type: CREATE_PRODUCTS_PENDING,
        payload: true,
      };
      productsDispatch(createProductsPendingAction);
      const { data } = await axios.post(`${API_URL}/${PRODUCTS}`, newProduct);
      const createProductsSuccessAction = {
        type: CREATE_PRODUCTS_SUCCESS,
        payload: data,
      };

      setTimeout(() => {
        productsDispatch(createProductsSuccessAction);
        toast.success("Продукт добавлен");
      }, 1500);
    } catch (error) {
      const createProductsErrorAction = {
        type: CREATE_PRODUCTS_ERROR,
        payload: error,
      };
      toast.error("Неизвестная ошибка с сервера");
      productsDispatch(createProductsErrorAction);
    }
  };

  const productsValue = {
    getProductsRequest,
    createProduct,
    productsPending: productsState.products.pending,
    productsError: productsState.products.error,
    products: productsState.products.data,
    productsTotalCount: productsState.products.totalCount,
    createPending: productsState.products.createPending,
  };

  const userValue = {
    registerUser,
    userPending: userState.user.pending,
    userError: userState.user.error,
    user: userState.user.data,
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
