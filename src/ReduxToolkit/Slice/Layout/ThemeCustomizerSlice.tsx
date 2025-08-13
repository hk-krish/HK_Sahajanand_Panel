import ConfigDB from "@/Config/Theme";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarTypes: "compact-wrapper",
  sideBarToggle: false,
};

const ThemeCustomizerSlice = createSlice({
  name: "ThemeCustomizer",
  initialState,
  reducers: {
    addSidebarTypes: (state, action) => {
      ConfigDB.settings.sidebar.type = action.payload;
      state.sidebarTypes = action.payload;
    },
    setSideBarToggle: (state, action) => {
      state.sideBarToggle = action.payload;
    },
    toggleSidebar: (state) => {
      state.sideBarToggle = !state.sideBarToggle;
    },
  },
});

export const { addSidebarTypes, setSideBarToggle, toggleSidebar } = ThemeCustomizerSlice.actions;

export default ThemeCustomizerSlice.reducer;
