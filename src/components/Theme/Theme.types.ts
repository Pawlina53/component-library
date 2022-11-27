export type TInitialStateType = {
  themeColor: string;
  darkTheme: string;
  colorName: string;
  colorList: TColor[];
  getThemeColor: () => void;
  getThemeMode: () => void;
  updateThemeColor: (themecolor: string, colorName: string) => void;
  updateDarkMode: (darkTheme: boolean) => void;
  updateColorList: (colorList: TColor[]) => void;
};

export type TColor = {
  name: string;
  value: string;
};

export enum ActionType {
  updateColor = "updateColor",
  updateMode = "updateMode",
  updateColorsList = "updateColorsList",
  getTheme = "getTheme",
  getMode = "getMode",
}

export type TActionType = {
  type: ActionType;
  themeColor: string;
  colorName: string;
  darkTheme: string;
  colorList: TColor[];
};
