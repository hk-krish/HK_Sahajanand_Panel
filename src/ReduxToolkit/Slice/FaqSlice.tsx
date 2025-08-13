import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { FaqApiResponse, FaqSliceType } from "@/Types/Faq";
import { FetchApiParams } from "@/Types/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: FaqSliceType = {
  isAddFaqModal: false,
  allFaq: null,
  isLoadingFaq: true,
  isFaqSearchData: null,
  singleEditingFaq: null,
};

export const fetchFaqApiData = createAsyncThunk<FaqApiResponse, FetchApiParams>("admin/faq", async ({ page, limit, search, category }) => {
  let url = Url_Keys.Faq.Faq;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  if (category) url += `&category=${category}`;
  const response = await Get<FaqApiResponse>(url);
  return response?.data;
});

const FaqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setAddFaqModal: (state) => {
      state.isAddFaqModal = !state.isAddFaqModal;
    },
    setFaqSearchData(state, action) {
      state.isFaqSearchData = action.payload;
    },
    setSingleEditingFaq(state, action) {
      state.singleEditingFaq = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFaqApiData.fulfilled, (state, action) => {
      state.allFaq = action.payload;
      state.isLoadingFaq = false;
    });
  },
});

export const { setAddFaqModal, setFaqSearchData, setSingleEditingFaq } = FaqSlice.actions;
export default FaqSlice.reducer;
