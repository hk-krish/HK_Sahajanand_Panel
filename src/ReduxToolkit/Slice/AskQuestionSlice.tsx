import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { FetchApiParams } from "@/Types/Product";
import { AskQuestionApiResponse, AskQuestionSliceType } from "@/Types/AskQuestion";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AskQuestionSliceType = {
  isAddAskQuestionModal: false,
  allAskQuestion: null,
  isLoadingAskQuestion: true,
  singleEditingAskQuestion: null,
};

export const fetchAskQuestionApiData = createAsyncThunk<AskQuestionApiResponse, FetchApiParams>("web/news-letter", async ({ page, limit, search }) => {
  let url = Url_Keys.AskQuestion.AskQuestion;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<AskQuestionApiResponse>(url);
  return response?.data;
});

const AskQuestionSlice = createSlice({
  name: "Ask A Question",
  initialState,
  reducers: {
    setAddAskQuestionModal: (state) => {
      state.isAddAskQuestionModal = !state.isAddAskQuestionModal;
    },
    setSingleEditingAskQuestion(state, action) {
      state.singleEditingAskQuestion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAskQuestionApiData.fulfilled, (state, action) => {
      state.allAskQuestion = action.payload;
      state.isLoadingAskQuestion = false;
    });
  },
});

export const { setAddAskQuestionModal, setSingleEditingAskQuestion } = AskQuestionSlice.actions;
export default AskQuestionSlice.reducer;
