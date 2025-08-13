import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { BlogApiResponse, BlogSliceType } from "@/Types/Blog";
import { FetchApiParams } from "@/Types/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: BlogSliceType = {
  allBlog: null,
  isLoadingBlog: true,
  isBlogSearchData: null,
  singleEditingBlog:null
};

export const fetchBlogApiData = createAsyncThunk<BlogApiResponse, FetchApiParams>("admin/blog", async ({ page, limit, search }) => {
  let url = Url_Keys.Blog.Blog;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<BlogApiResponse>(url);
  return response?.data;
});

const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogSearchData: (state, action) => {
      state.isBlogSearchData = action.payload;
    },
    setSingleEditingBlog(state, action) {
      state.singleEditingBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogApiData.fulfilled, (state, action) => {
      state.allBlog = action.payload;
      state.isLoadingBlog = false;
    });
  },
});

export const { setBlogSearchData ,setSingleEditingBlog} = BlogSlice.actions;
export default BlogSlice.reducer;
