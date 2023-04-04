import React, {useContext, useReducer} from 'react';
import { AuthContext } from "./AuthContext";
import axios from "axios";
import {implementErrorWithAction, implementSuccessWithAction} from "../store/helpers"
import {AppContext} from "../app/AppContext";

const API_URL = 'http://localhost:8080'
const API = 'users'

const LOGIN = 'login'
const REGISTER = 'register'
const IS_AUTH = 'IS_AUTH'
const LIKES_CHANGE = 'LIKES_CHANGE'
const USERS = 'users'
const SET_USER_LIKES = 'SET_USER_LIKES'
const REQUEST_ERROR = 'REQUEST_ERROR'


const TOKEN_FIELD = 'token'
const USER_FIELD = 'user'


const initialState = {
  user: {},
  error: {},
  isAuth: !!localStorage.getItem('token'),
  likes: []
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        user: action.payload
      }
    }
    case REQUEST_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case IS_AUTH: {
      return {
        ...state,
        isAuth: action.payload
      }
    }
    case SET_USER_LIKES: {
      return {
        ...state,
        likes: action.payload
      }
    }
    case LIKES_CHANGE: {
      return {
        ...state,
        likes: action.payload
      }
    }
    default: {
      return state
    }
  }
}

const AuthProvider = ({ children }) => {
  const { localStorageSetItem, localStorageRemoveAll } = useContext(AppContext)
  const [userState, dispatch] = useReducer(reducer, initialState)

  const initAuth = async (userId) => {
    try {
      const { data } = await axios.get(`${API_URL}/${USERS}/${userId}`)
      implementSuccessWithAction(dispatch, SET_USER_LIKES, data.likedList)
    } catch (error) {
      console.log(error)
    }
  }

  const registerRequest = async (newUser, onSuccess) => {
    try {
      const { data } = await axios.post(`${API_URL}/${REGISTER}`, newUser)
      implementSuccessWithAction(dispatch, REGISTER, data.user)

      localStorageSetItem(TOKEN_FIELD, data.accessToken)
      localStorageSetItem(USER_FIELD, JSON.stringify(data.user))

      implementSuccessWithAction(dispatch, IS_AUTH, true)
      implementSuccessWithAction(dispatch, SET_USER_LIKES, data.user.likedList)
      
      onSuccess()
    } catch (error) {
      implementErrorWithAction(dispatch, REQUEST_ERROR, error)
    }
  }

  const loginRequest = async (userCredentials, onSuccess) => {
    try {
      const { data } = await axios.post(`${API_URL}/${LOGIN}`, userCredentials)
      implementSuccessWithAction(dispatch, LOGIN, data.user)

      localStorageSetItem(TOKEN_FIELD, data.accessToken)
      localStorageSetItem(USER_FIELD, JSON.stringify(data.user))

      implementSuccessWithAction(dispatch, IS_AUTH, true)
      implementSuccessWithAction(dispatch, SET_USER_LIKES, data.user.likedList)

      onSuccess()
    } catch (error) {
      implementErrorWithAction(dispatch, REQUEST_ERROR, error)
    }
  }

  const logOut = () => {
    localStorageRemoveAll()
    implementSuccessWithAction(dispatch, IS_AUTH, false)
  }

  const toggleToUserLikeProduct = async (userId, likeId, unLike = false) => {
    try {
      const newLikeList = !unLike ? [...userState.likes, likeId] : userState.likes.filter(productId => productId != likeId)

      const { data } = await axios.patch(`${API_URL}/${USERS}/${userId}`, { likedList: newLikeList })

      console.log(data)

      implementSuccessWithAction(dispatch, LIKES_CHANGE, data.likedList)
    } catch (error) {
      implementErrorWithAction(dispatch, REQUEST_ERROR, error)
    }
  }

  const defaultValue = {
    registerRequest,
    loginRequest,
    logOut,
    toggleToUserLikeProduct,
    initAuth,
    user: userState.user,
    isAuth: userState.isAuth,
    userLikes: userState.likes,
  }

  return (
    <AuthContext.Provider value={defaultValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;