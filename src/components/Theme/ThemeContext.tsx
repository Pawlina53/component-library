import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  ActionType,
  TActionType,
  TColor,
  TInitialStateType,
} from "./Theme.types";
import allColours from "./ThemeColours.json";

let initialState: TInitialStateType = {
  themeColor: "",
  darkTheme: "",
  colorName: "",
  colorList: [],
  getThemeColor: () => {},
  getThemeMode: () => {},
  updateThemeColor: (themecolor: string, colorName: string) => {},
  updateDarkMode: (darkTheme: boolean) => {},
  updateColorList: (colorList: TColor[]) => {},
};

const ThemeContext = createContext<TInitialStateType>(initialState);

const { Provider, Consumer: ThemeContextConsumer } = ThemeContext;

const reducer = (state: TInitialStateType, action: TActionType) => {
  const { type, themeColor, colorName, darkTheme, colorList } = action;
  switch (type) {
    case ActionType.updateColor:
      themeColor && localStorage.setItem("theme-colour", themeColor);
      colorName && localStorage.setItem("theme-colour-name", colorName);
      return { ...state, themeColor: themeColor, colorName: colorName };
    case ActionType.updateMode:
      darkTheme && localStorage.setItem("dark-mode", darkTheme);
      return { ...state, darkTheme: darkTheme };
    case ActionType.updateColorsList:
      return { ...state, colorList };
    case ActionType.getTheme:
      let theme = localStorage.getItem("theme-colour");
      let color = localStorage.getItem("theme-colour-name");
      //select a random color if no color is found in local storage
      let randomColor = colorList[Math.floor(Math.random() * colorList.length)];
      return {
        ...state,
        themeColor: theme || randomColor.value,
        colorName: color || randomColor.name,
      };
    case ActionType.getMode:
      let mode = localStorage.getItem("dark-mode");
      return { ...state, darkTheme: mode || "light" };
    default:
      throw new Error("Invalid action");
  }
};

const ThemeProvider = ({ children }: { children: React.ReactElement }) => {
  let themeDetails = {
    themeColor: initialState.themeColor,
    colorName: initialState.colorName,
    darkTheme: initialState.darkTheme,
    colorList: initialState.colorList,
  };

  initialState = {
    darkTheme: localStorage.getItem("dark-mode") || "",
    themeColor: localStorage.getItem("theme-colour") || "",
    colorName: localStorage.getItem("theme-colour-name") || "",
    colorList: allColours,
    getThemeColor: () => {
      const theme: TActionType = { ...themeDetails, type: ActionType.getTheme };
      dispatch(theme);
    },
    getThemeMode: () => {
      const theme: TActionType = { ...themeDetails, type: ActionType.getMode };
      dispatch(theme);
    },
    updateThemeColor: (themeColor: string, colorName: string) => {
      const theme: TActionType = {
        ...themeDetails,
        type: ActionType.updateColor,
        themeColor,
        colorName,
      };
      dispatch(theme);
    },
    updateDarkMode: (darkTheme: boolean) => {
      const theme: TActionType = {
        ...themeDetails,
        type: ActionType.updateMode,
        darkTheme: darkTheme ? "dark" : "light",
      };
      dispatch(theme);
    },
    updateColorList: (colorList: TColor[]) => {
      const theme: TActionType = {
        ...themeDetails,
        type: ActionType.updateColorsList,
        colorList,
      };
      dispatch(theme);
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const theme: TActionType = { ...themeDetails, type: ActionType.getTheme };
    dispatch(theme);
  }, [state.themeColor]);

  useEffect(() => {
    const theme: TActionType = { ...themeDetails, type: ActionType.getMode };
    dispatch(theme);
  }, [state.darkTheme]);

  return <Provider value={state}>{children}</Provider>;
};

const useTheme = () => useContext(ThemeContext);

export { ThemeContextConsumer, ThemeProvider, useTheme };
