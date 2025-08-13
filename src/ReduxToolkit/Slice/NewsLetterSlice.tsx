import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { FetchApiParams } from "@/Types/Product";
import { NewsLetterApiResponse, NewsLetterSliceType } from "@/Types/NewsLetter";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: NewsLetterSliceType = {
  isAddNewsLetterModal: false,
  allNewsLetter: null,
  isLoadingNewsLetter: true,
  singleEditingNewsLetter: null,
};

export const fetchNewsLetterApiData = createAsyncThunk<NewsLetterApiResponse, FetchApiParams>("web/news-letter", async ({ page, limit, search }) => {
  let url = Url_Keys.NewsLetter.NewsLetter;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<NewsLetterApiResponse>(url);
  return response?.data;
});

const NewsLetterSlice = createSlice({
  name: "NewsLetter",
  initialState,
  reducers: {
    setAddNewsLetterModal: (state) => {
      state.isAddNewsLetterModal = !state.isAddNewsLetterModal;
    },
    setSingleEditingNewsLetter(state, action) {
      state.singleEditingNewsLetter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewsLetterApiData.fulfilled, (state, action) => {
      state.allNewsLetter = action.payload;
      state.isLoadingNewsLetter = false;
    });
  },
});

export const { setAddNewsLetterModal, setSingleEditingNewsLetter } = NewsLetterSlice.actions;
export default NewsLetterSlice.reducer;
