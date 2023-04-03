import axios from "axios";
import { toast } from "react-toastify";
import { initialState } from "../../initialState";
import { defaultGetProductsParams } from "./const";
import { PRODUCTS_ACTION } from "./const";
import { API_URL, API } from "../../const";
import { implementErrorWithAction, implementPendingWithAction, implementSuccessWithAction } from "../../helpers";

const { PRODUCTS } = API;
const {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_ERROR,
  SET_PRODUCTS_COUNT,
  CREATE_PRODUCTS_SUCCESS,
  CREATE_PRODUCTS_PENDING,
  CREATE_PRODUCTS_ERROR,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_PENDING,
  DELETE_PRODUCTS_ERROR,
} = PRODUCTS_ACTION;


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
    case  DELETE_PRODUCTS_SUCCESS: {
      return{
        ...state,
        products:{
          ...state.products,
          data: state.products.data.filter((product) => product.id != action.payload )
        }
      }
    }
    case  DELETE_PRODUCTS_ERROR: {
      return{
        ...state,
        products:{
          ...state.products,
          error: action.payload
        }
      }
    }
  }
};

export const useProductsRequests = (productsDispatch) => {
  const getProductsRequest = async (params = defaultGetProductsParams) => {
    try {
      implementPendingWithAction(productsDispatch, GET_PRODUCTS_PENDING)

      const query = new URLSearchParams(params);
      const res = await axios(`${API_URL}/${PRODUCTS}?${query}`);

      const { data } = res;

      implementSuccessWithAction(productsDispatch, SET_PRODUCTS_COUNT, res.headers["x-total-count"])

      setTimeout(() => {
        implementSuccessWithAction(productsDispatch, GET_PRODUCTS_SUCCESS, data)
      }, 500);
    } catch (error) {
      implementErrorWithAction(productsDispatch, GET_PRODUCTS_ERROR, error)
      toast.error("Неизвестная ошибка с сервера");
    }
  };

  const createProduct = async (newProduct) => {
    try {
      implementPendingWithAction(productsDispatch, CREATE_PRODUCTS_PENDING)
   
      const { data } = await axios.post(`${API_URL}/${PRODUCTS}`, newProduct);

      setTimeout(() => {
        implementSuccessWithAction(productsDispatch, CREATE_PRODUCTS_SUCCESS, data)
        toast.success("Продукт добавлен");
      }, 1500);
    } catch (error) {
      implementErrorWithAction(productsDispatch, CREATE_PRODUCTS_ERROR, error)
      toast.error("Неизвестная ошибка с сервера");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${PRODUCTS}/${id}`);

      implementSuccessWithAction(productsDispatch, DELETE_PRODUCTS_SUCCESS, id)
      const searchParams = new URLSearchParams(document.location.search)
      const page = searchParams.get('_page')

      getProductsRequest({ _page: page, _limit: 8 })
      toast.success("Товар удален");

    } catch (error) {
      implementErrorWithAction(productsDispatch, DELETE_PRODUCTS_ERROR, error)
      toast.error("Не получилось удалить товар");
    }
  };

  return {
    getProductsRequest,
    createProduct,
    deleteProduct,
  };
};

export default productsReducer;
