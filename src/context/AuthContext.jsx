import React, { createContext, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

function authReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case ACTIONS.LOGOUT:
      return {
        isAuthenticated: false,
        token: null,
        name: '',
      };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    token: localStorage.getItem('token') || null,
    name: '',
  });

  const navigate = useNavigate();

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    dispatch({ type: ACTIONS.LOGIN, payload: userData });
    navigate('/main');
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: ACTIONS.LOGOUT });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
