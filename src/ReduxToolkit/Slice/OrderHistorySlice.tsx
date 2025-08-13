import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { FetchApiParams } from "@/Types/Product";
import { OrderApiResponse, OrderHistorySliceType } from "@/Types/OrderHistory";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: OrderHistorySliceType = {
  isOrderHistoryDetailModal: false,
  allOrderHistory: null,
  isLoadingOrderHistory: true,
  singleEditingOrderHistory:null
};

export const fetchOrderHistoryApiData = createAsyncThunk<OrderApiResponse, FetchApiParams>("admin/order-history", async ({ page, limit}) => {
  let url = Url_Keys.Order.Order;
  if (page) url += `?page=${page}&limit=${limit}`;
  const response = await Get<OrderApiResponse>(url);
  return response?.data;
});

const OrderHistorySlice = createSlice({
  name: "OrderHistory",
  initialState,
  reducers: {
    setOrderHistoryDetailModal: (state) => {
      state.isOrderHistoryDetailModal = !state.isOrderHistoryDetailModal;
    },
    setSingleEditingOrderHistory(state, action) {
      state.singleEditingOrderHistory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderHistoryApiData.fulfilled, (state, action) => {
      state.allOrderHistory = action.payload;
      state.isLoadingOrderHistory = false;
    });
  },
});

export const { setOrderHistoryDetailModal, setSingleEditingOrderHistory} = OrderHistorySlice.actions;
export default OrderHistorySlice.reducer;
