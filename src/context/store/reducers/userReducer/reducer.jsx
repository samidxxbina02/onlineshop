import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { initialState } from "../../initialState";
import { API_URL } from "../../const";
import { USER_ACTION, AUTH_METHOD } from "./const";
import {
  implementErrorWithAction,
  implementPendingWithAction,
  implementSuccessWithAction,
} from "../../helpers";

const {
  USER_SUCCESS,
  USER_ERROR,
  USER_PENDING,
} = USER_ACTION;
const { REGISTER, LOGIN } = AUTH_METHOD;

const userReducer = (state = initialState, action) => {
    console.log(action)
  switch (action.type) {
    case USER_PENDING: {
      return {
        ...state,
        user: {
          ...state.user,
          pending: action.payload,
        },
      };
    }
    case USER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          data: action.payload,
          pending: false,
        },
      };
    }
    case USER_ERROR: {
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

export const useUsersRequests = (userDispatch) => {
  const navigate = useNavigate()

  const registerUser = async (newUser) => {
    try {
      implementPendingWithAction(userDispatch, USER_PENDING);

      const { data } = await axios.post(`${API_URL}/${REGISTER}`, newUser);

      implementSuccessWithAction(
        userDispatch,
        USER_SUCCESS,
        data.user
      );
    } catch (error) {
      implementErrorWithAction(userDispatch, USER_ERROR, error);

      toast.error("Неизвестная ошибка с сервера");
    }
  };

  const loginUser = async (userData) => {
    try {
      implementPendingWithAction(userDispatch, USER_PENDING);

      const { data } = await axios.post(`${API_URL}/${LOGIN}`, userData);

      localStorage.setItem("token", data.accessToken);


      implementSuccessWithAction(
        userDispatch,
        USER_SUCCESS,
        data.user
      );

      navigate('/')
    } catch (error) {
      implementErrorWithAction(userDispatch, USER_ERROR, error);

      toast.error("Неизвестная ошибка с сервера");
    }
  };

  return {
    registerUser,
    loginUser,
  };
};

export default userReducer;
