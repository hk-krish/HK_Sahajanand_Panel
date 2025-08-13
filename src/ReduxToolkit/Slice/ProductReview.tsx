import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { FetchApiParams } from "@/Types/Product";
import { ProductReviewApiResponse, ProductReviewSliceType } from "@/Types/ProductReview";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ProductReviewSliceType = {
  isAddProductReviewModal: false,
  allProductReview: null,
  isLoadingProductReview: true,
  singleEditingProductReview:null
};

export const fetchProductReviewApiData = createAsyncThunk<ProductReviewApiResponse, FetchApiParams>("admin/product-review", async ({ page, limit, search}) => {
  let url = Url_Keys.ProductReview.ProductReview;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<ProductReviewApiResponse>(url);
  return response?.data;
});

const ProductReviewSlice = createSlice({
  name: "ProductReview",
  initialState,
  reducers: {
    setAddProductReviewModal: (state) => {
      state.isAddProductReviewModal = !state.isAddProductReviewModal;
    },
    setSingleEditingProductReview(state, action) {
      state.singleEditingProductReview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductReviewApiData.fulfilled, (state, action) => {
      state.allProductReview = action.payload;
      state.isLoadingProductReview = false;
    });
  },
});

export const { setAddProductReviewModal, setSingleEditingProductReview} = ProductReviewSlice.actions;
export default ProductReviewSlice.reducer;
