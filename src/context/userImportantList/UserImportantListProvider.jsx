import React, { useReducer } from 'react';
import { UserImportantListContext } from "./UserImportantListContext";
import axios from "axios";
import { implementErrorWithAction, implementSuccessWithAction } from '../store/helpers';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:8080'

const USERS = 'users'

const GET_USER_IMPORTANT_LIST = 'GET_USER_IMPORTANT_LIST'
const ADD_TO_IMPORTANT_LIST = 'ADD_TO_IMPORTANT_LIST'
const REQUEST_ERROR = 'REQUEST_ERROR'

const initialState = {
  userImportantList: [],
  error: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_IMPORTANT_LIST: {
      return {
        ...state,
        userImportantList: action.payload
      }
    }
    case ADD_TO_IMPORTANT_LIST: {
      return {
        ...state,
        userImportantList: action.payload
      }
    }
    case REQUEST_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    default: {
      return state
    }
  }
}

const UserImportantListProvider = ({ children }) => {
  const [userImportantState, dispatch] = useReducer(reducer, initialState)

  const getUserImportantList = async (userId) => {
    try {
      const { data } = await axios(`${API_URL}/${USERS}/${userId}`)

      implementSuccessWithAction(dispatch, GET_USER_IMPORTANT_LIST, data.userImportantList)
    } catch (error) {
      implementErrorWithAction(dispatch, REQUEST_ERROR, error)
    }
  }

  const addToUserImportantList = async (userId, product) => {
    try {
      const { data } = await axios.patch(`${API_URL}/${USERS}/${userId}`, { userImportantList: [...userImportantState.userImportantList, product] });
      implementSuccessWithAction(dispatch, ADD_TO_IMPORTANT_LIST, data.userImportantList)
      toast.success('Вы добавили товар в корзину')
    } catch (error) {
      implementErrorWithAction(dispatch, REQUEST_ERROR, error)
    }
  };

  const deleteToUserImportantList = async (userId, product) => {
    try {
      const { data } = await axios.patch(`${API_URL}/${USERS}/${userId}`, { userImportantList: userImportantState.userImportantList.filter(impProduct => impProduct.id != product.id) });
      implementSuccessWithAction(dispatch, ADD_TO_IMPORTANT_LIST, data.userImportantList)
      toast.success('Вы удалили товар из корзины')
    } catch (error) {
      implementErrorWithAction(dispatch, REQUEST_ERROR, error)
    }
  };

  const defaultValue = {
    getUserImportantList,
    addToUserImportantList,
    deleteToUserImportantList,
    userImportantList: userImportantState.userImportantList
  }

  return (
    <UserImportantListContext.Provider value={defaultValue}>
      {children}
    </UserImportantListContext.Provider>
  );
};

export default UserImportantListProvider;