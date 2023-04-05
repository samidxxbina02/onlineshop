import axios from "axios";
import { toast } from "react-toastify";
import { initialState } from "../../initialState";
import { PRODUCTS_ACTION } from "./const";
import { API_URL, API } from "../../const";
import {
  implementErrorWithAction,
  implementPendingWithAction,
  implementSuccessWithAction,
} from "../../helpers";
import { useSearchParams } from "react-router-dom";
import { async } from "q";

const { PRODUCTS } = API;
const {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_BY_ID_SUCCESS,
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_ERROR,
  SET_PRODUCTS_COUNT,
  CREATE_PRODUCTS_SUCCESS,
  CREATE_PRODUCTS_PENDING,
  CREATE_PRODUCTS_ERROR,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_PENDING,
  DELETE_PRODUCTS_ERROR,
  EDIT_PRODUCTS_SUCCESS,
  EDIT_PRODUCTS_ERROR,
  LIKE_PRODUCTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  GET_PRODUCTS_BY_ID_DETAILS_SUCCESS
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
    case GET_PRODUCTS_BY_ID_DETAILS_SUCCESS: {
      return {
        ...state,
        products: {
          ...state.products,
          currentProduct: action.payload,
        },
      };
    }
    case DELETE_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: {
          ...state.products,
          data: state.products.data.filter(
            (product) => product.id != action.payload
          ),
        },
      };
    }
    case DELETE_PRODUCTS_ERROR: {
      return {
        ...state,
        products: {
          ...state.products,
          error: action.payload,
        },
      };
    }

    case EDIT_PRODUCTS_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        products: {
          ...state.products.data,
          data: state.products.data.map((product) =>
            product.id == action.payload.id ? action.payload : product
          ),
        },
      };
    }

    case EDIT_PRODUCTS_ERROR: {
      return {
        ...state,
        products: {
          ...state.products,
          error: action.payload,
        },
      };
    }

    case GET_PRODUCTS_BY_ID_SUCCESS: {
      return {
        ...state,
        products: {
          ...state.products,
          editedProduct: action.payload,
        },
      };
    }

    case LIKE_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: {
          ...state.products.data,
          data: state.products.data.map((product) =>
            product.id == action.payload.id ? action.payload : product
          ),
        },
      };
    }
    case ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        products: {
          ...state.products.data,
          data: state.products.data.map((product) =>
            product.id == action.payload.id ? action.payload : product
          ),
        },
      }
    }
  }
};

const filtersField = "type";
const pageField = '_page'
const limitField = '_limit'

export const useProductsRequests = (productsDispatch) => {
  const filters = useSearchParams()[0].get(filtersField);
  const page = useSearchParams()[0].get(pageField)

  const getProductsRequest = async () => {
    try {
      implementPendingWithAction(productsDispatch, GET_PRODUCTS_PENDING);

      const query = new URLSearchParams({});
      if (filters) {
        query.set(filtersField, filters);
      }

      query.set(pageField, page || 1)
      query.set(limitField, 8)

      const res = await axios(`${API_URL}/${PRODUCTS}?${query}`);

      const { data } = res;

      implementSuccessWithAction(
        productsDispatch,
        SET_PRODUCTS_COUNT,
        res.headers["x-total-count"]
      );

      setTimeout(() => {
        implementSuccessWithAction(
          productsDispatch,
          GET_PRODUCTS_SUCCESS,
          data
        );
      }, 500);
    } catch (error) {
      implementErrorWithAction(productsDispatch, GET_PRODUCTS_ERROR, error);
      toast.error("Неизвестная ошибка с сервера");
    }
  };

  const getProductsByIdRequest = async (id, details = false) => {
    try {
      const res = await axios(`${API_URL}/${PRODUCTS}/${id}`);

      const { data } = res;

      if (details) {
        implementSuccessWithAction(
          productsDispatch,
          GET_PRODUCTS_BY_ID_DETAILS_SUCCESS,
          data
        );
      } else {
        implementSuccessWithAction(
          productsDispatch,
          GET_PRODUCTS_BY_ID_SUCCESS,
          data
        );
      }

      
    } catch (error) {
      implementErrorWithAction(productsDispatch, GET_PRODUCTS_ERROR, error);
      toast.error("Неизвестная ошибка с сервера");
    }
  };

  const createProduct = async (newProduct, onSuccess) => {
    try {
      implementPendingWithAction(productsDispatch, CREATE_PRODUCTS_PENDING);

      const { data } = await axios.post(`${API_URL}/${PRODUCTS}`, newProduct);

      setTimeout(() => {
        implementSuccessWithAction(
          productsDispatch,
          CREATE_PRODUCTS_SUCCESS,
          data
        );
        toast.success("Продукт добавлен");
        onSuccess();
      }, 1500);
    } catch (error) {
      implementErrorWithAction(productsDispatch, CREATE_PRODUCTS_ERROR, error);
      toast.error("Неизвестная ошибка с сервера");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${PRODUCTS}/${id}`);

      implementSuccessWithAction(productsDispatch, DELETE_PRODUCTS_SUCCESS, id);
      const searchParams = new URLSearchParams(document.location.search);
      const page = searchParams.get("_page");

      getProductsRequest({ _page: page, _limit: 8 });
      toast.success("Товар удален");
    } catch (error) {
      implementErrorWithAction(productsDispatch, DELETE_PRODUCTS_ERROR, error);
      toast.error("Не получилось удалить товар");
    }
  };

  const editProduct = async (editedProduct, id, onSuccess) => {
    try {
      const { data } = await axios.patch(
        `${API_URL}/${PRODUCTS}/${id}`,
        editedProduct
      );
      onSuccess();
      implementSuccessWithAction(productsDispatch, EDIT_PRODUCTS_SUCCESS, data);
      toast.success("Товар изменен");
    } catch (error) {
      implementErrorWithAction(productsDispatch, EDIT_PRODUCTS_ERROR, error);
      toast.error("Не удалось изменить товар");
    }
  };

  const userHandleLikeProductRequest = async (product, unLike = false) => {
    try {
      const likeCount = !unLike ? product.likes + 1 : product.likes - 1 

      console.log(likeCount)

      const { data } = await axios.patch(
        `${API_URL}/${PRODUCTS}/${product.id}`,
        { likes: likeCount }
      );

      implementSuccessWithAction(productsDispatch, LIKE_PRODUCTS_SUCCESS, data);

      if(!unLike) {
        toast.success("Вы поставили лайк!)");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const addCommentInProduct = async (productId, oldComments, newComment, onSuccess) => {

    try {
      const newCommentList = [...oldComments, newComment]

      const { data } = await axios.patch(`${API_URL}/${PRODUCTS}/${productId}`, { comments: newCommentList })
      implementSuccessWithAction(productsDispatch, ADD_COMMENT_SUCCESS, data);
      onSuccess()
    } catch (error) {
      console.log(error)
    }

  }

  return {
    getProductsRequest,
    createProduct,
    deleteProduct,
    editProduct,
    getProductsByIdRequest,
    userHandleLikeProductRequest,
    addCommentInProduct
  };
};

export default productsReducer;
