import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { BannerApiResponse, BannersSliceType } from "@/Types/Banner";
import { FetchApiParams } from "@/Types/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: BannersSliceType = {
  isAddBannerModal: false,
  allBanner: null,
  isLoadingBanner: true,
  isBannerSearchData: null,
  singleEditingBanner:null
};

export const fetchBannerApiData = createAsyncThunk<BannerApiResponse, FetchApiParams>("admin/banner", async ({ page, limit, search ,typeFilter}) => {
  let url = Url_Keys.Banner.Banner;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  if (typeFilter) url += `&typeFilter=${typeFilter}`;
  const response = await Get<BannerApiResponse>(url);
  return response?.data;
});

const BannersSlice = createSlice({
  name: "Banners",
  initialState,
  reducers: {
    setAddBannerModal: (state) => {
      state.isAddBannerModal = !state.isAddBannerModal;
    },
    setBannerSearchData(state, action) {
      state.isBannerSearchData = action.payload;
    },
    setSingleEditingBanner(state, action) {
      state.singleEditingBanner = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBannerApiData.fulfilled, (state, action) => {
      state.allBanner = action.payload;
      state.isLoadingBanner = false;
    });
  },
});

export const { setAddBannerModal, setSingleEditingBanner ,setBannerSearchData} = BannersSlice.actions;
export default BannersSlice.reducer;
