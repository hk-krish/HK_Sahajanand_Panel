import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { FetchApiParams } from "@/Types/Product";
import { EnquiryApiResponse, EnquirySliceType } from "@/Types/Enquiry";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: EnquirySliceType = {
  isAddEnquiryModal: false,
  allEnquiry: null,
  isLoadingEnquiry: true,
  singleEditingEnquiry:null
};

export const fetchEnquiryApiData = createAsyncThunk<EnquiryApiResponse, FetchApiParams>("admin/enquiry", async ({ page, limit,typeFilter}) => {
  let url = Url_Keys.Enquiry.Enquiry;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (typeFilter) url += `&typeFilter=${typeFilter}`;
  const response = await Get<EnquiryApiResponse>(url);
  return response?.data;
});

const EnquirySlice = createSlice({
  name: "Enquiry",
  initialState,
  reducers: {
    setAddEnquiryModal: (state) => {
      state.isAddEnquiryModal = !state.isAddEnquiryModal;
    },
    setSingleEditingEnquiry(state, action) {
      state.singleEditingEnquiry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEnquiryApiData.fulfilled, (state, action) => {
      state.allEnquiry = action.payload;
      state.isLoadingEnquiry = false;
    });
  },
});

export const { setAddEnquiryModal, setSingleEditingEnquiry} = EnquirySlice.actions;
export default EnquirySlice.reducer;
