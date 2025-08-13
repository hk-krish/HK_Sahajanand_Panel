import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { AboutSliceType, AboutUsType, OurStoryType, PrivacyPolicyType, ReturnPolicyType, TermsConditionType } from "@/Types/AboutUs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AboutSliceType = {
  allPrivacyPolicy: null,
  allAboutUs: null,
  allReturnPolicy: null,
  allTermsCondition: null,
  allOurStory: null,
};

export const fetchPrivacyPoliciesApiData = createAsyncThunk<PrivacyPolicyType, void>("admin/privacy-policy", async () => {
  const response = await Get<PrivacyPolicyType>(Url_Keys.PrivacyPolicy.PrivacyPolicy);
  return response?.data!;
});

export const fetchAboutUsApiData = createAsyncThunk<AboutUsType, void>("admin/about-us", async () => {
  const response = await Get<AboutUsType>(Url_Keys.AboutUs.AboutUs);
  return response?.data!;
});

export const fetchReturnPoliciesApiData = createAsyncThunk<ReturnPolicyType, void>("admin/return-policy", async () => {
  const response = await Get<ReturnPolicyType>(Url_Keys.ReturnPolicy.ReturnPolicy);
  return response?.data!;
});

export const fetchTermsConditionApiData = createAsyncThunk<TermsConditionType, void>("admin/terms-condition", async () => {
  const response = await Get<TermsConditionType>(Url_Keys.TermsCondition.TermsCondition);
  return response?.data!;
});

export const fetchOurStoryApiData = createAsyncThunk<OurStoryType, void>("admin/our-story", async () => {
  const response = await Get<OurStoryType>(Url_Keys.OurStory.OurStory);
  return response?.data!;
});

const AboutSlice = createSlice({
  name: "aboutUs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrivacyPoliciesApiData.fulfilled, (state, action) => {
      state.allPrivacyPolicy = action.payload;
    });
    builder.addCase(fetchAboutUsApiData.fulfilled, (state, action) => {
      state.allAboutUs = action.payload;
    });
    builder.addCase(fetchReturnPoliciesApiData.fulfilled, (state, action) => {
      state.allReturnPolicy = action.payload;
    });
    builder.addCase(fetchTermsConditionApiData.fulfilled, (state, action) => {
      state.allTermsCondition = action.payload;
    });
    builder.addCase(fetchOurStoryApiData.fulfilled, (state, action) => {
      state.allOurStory = action.payload;
    });
  },
});

export default AboutSlice.reducer;
