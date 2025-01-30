"use client";

import { Timestamp } from "firebase/firestore";
import { authStore } from "@/_store/auth.store";
import { loadingStore } from "@/_store/loading.store";
import { TokenUtil } from "@/_shared/utils/token.util";
import { UserService } from "../firebase/services/user.service";
import React, { createContext, useContext, useEffect } from "react";
import { IUserRegister } from "@/_shared/interface/user.interface";

interface IAuthContext {
  signOut: () => void;
  signUp: (data: IUserRegister) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  signIn: () => new Promise<void>(() => {}),
  signUp: () => new Promise<void>(() => {}),
  signOut: () => {},
});

const _userService = new UserService();

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const _authStore = authStore((state) => state);
  const _loadingStore = loadingStore((state) => state);

  const signIn = async (email: string, password: string) => {
    try {
      _loadingStore.setShow(true);

      const response = await _userService.signIn({
        email,
        password,
      });

      const { refreshToken, accessToken, data } = response.user;

      _authStore.setAccessToken(accessToken);
      _authStore.setRefreshToken(refreshToken);
      _authStore.setUser(_userService._model.buildItem(data));

      _loadingStore.setShow(false);
    } catch (error) {
      _loadingStore.setShow(false);
      throw error;
    }
  };

  const signUp = async (data: IUserRegister) => {
    try {
      _loadingStore.setShow(true);

      await _userService.signUp({
        ...data,
        uid: "",
        creationDate: Timestamp.now(),
      });

      _loadingStore.setShow(false);
    } catch (error) {
      _loadingStore.setShow(false);
      throw error;
    }
  };

  const signOut = () => {
    _authStore.reset();
    _userService.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a provider");

  return context;
};
