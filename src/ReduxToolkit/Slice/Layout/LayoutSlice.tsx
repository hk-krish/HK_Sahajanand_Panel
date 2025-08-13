import { LayoutStateProps } from "@/Types/Layout";
import { createSlice } from "@reduxjs/toolkit";

const initialState: LayoutStateProps = {
  pinedMenu: [],
  responsiveSearch: false,
};

const LayoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setPinedMenu: (state, action) => {
      state.pinedMenu = action.payload;
    },
    setResponsiveSearch: (state) => {
      state.responsiveSearch = !state.responsiveSearch;
    },
  },
});

export const { setPinedMenu, setResponsiveSearch } = LayoutSlice.actions;
export default LayoutSlice.reducer;
