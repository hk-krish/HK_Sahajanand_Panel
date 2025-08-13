import { Get } from "@/Api";
import { Url_Keys } from "@/Constant";
import { ColorApiResponse, FabricApiResponse, MaterialApiResponse, MaterialSliceType, OccasionApiResponse, SizeApiResponse } from "@/Types/Attribute";
import { FetchApiParams } from "@/Types/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MaterialSliceType = {
  isAddMaterialModal: false,
  allMaterial: null,
  isLoadingMaterial: true,
  singleEditingMaterial: null,
  isAddColorModal: false,
  allColor: null,
  isLoadingColor: true,
  singleEditingColor: null,
  isAddOccasionModal: false,
  allOccasion: null,
  isLoadingOccasion: true,
  singleEditingOccasion: null,
  isAddFabricModal: false,
  allFabric: null,
  isLoadingFabric: true,
  singleEditingFabric: null,
  isAddSizeModal: false,
  allSize: null,
  isLoadingSize: true,
  singleEditingSize: null,
};

export const fetchMaterialApiData = createAsyncThunk<MaterialApiResponse, FetchApiParams>("web/material", async ({ page, limit }) => {
  let url = Url_Keys.Material.Material;
  if (page) url += `?page=${page}&limit=${limit}`;
  const response = await Get<MaterialApiResponse>(url);
  return response?.data;
});

export const fetchColorApiData = createAsyncThunk<ColorApiResponse, FetchApiParams>("web/color", async ({ page, limit }) => {
  let url = Url_Keys.Color.Color;
  if (page) url += `?page=${page}&limit=${limit}`;
  const response = await Get<ColorApiResponse>(url);
  return response?.data;
});

export const fetchOccasionApiData = createAsyncThunk<OccasionApiResponse, FetchApiParams>("web/occasion", async ({ page, limit }) => {
  let url = Url_Keys.Occasion.Occasion;
  if (page) url += `?page=${page}&limit=${limit}`;
  const response = await Get<OccasionApiResponse>(url);
  return response?.data;
});

export const fetchFabricApiData = createAsyncThunk<FabricApiResponse, FetchApiParams>("web/fabric", async ({ page, limit }) => {
  let url = Url_Keys.Fabric.Fabric;
  if (page) url += `?page=${page}&limit=${limit}`;
  const response = await Get<FabricApiResponse>(url);
  return response?.data;
});

export const fetchSizeApiData = createAsyncThunk<SizeApiResponse, FetchApiParams>("web/size", async ({ page, limit }) => {
  let url = Url_Keys.Size.Size;
  if (page) url += `?page=${page}&limit=${limit}`;
  const response = await Get<SizeApiResponse>(url);
  return response?.data;
});

const AttributeSlice = createSlice({
  name: "Attribute",
  initialState,
  reducers: {
    setAddMaterialModal: (state) => {
      state.isAddMaterialModal = !state.isAddMaterialModal;
    },
    setSingleEditingMaterial(state, action) {
      state.singleEditingMaterial = action.payload;
    },
    setAddColorModal: (state) => {
      state.isAddColorModal = !state.isAddColorModal;
    },
    setSingleEditingColor(state, action) {
      state.singleEditingColor = action.payload;
    },
    setAddOccasionModal: (state) => {
      state.isAddOccasionModal = !state.isAddOccasionModal;
    },
    setSingleEditingOccasion(state, action) {
      state.singleEditingOccasion = action.payload;
    },
    setAddFabricModal: (state) => {
      state.isAddFabricModal = !state.isAddFabricModal;
    },
    setSingleEditingFabric(state, action) {
      state.singleEditingFabric = action.payload;
    },
    setAddSizeModal: (state) => {
      state.isAddSizeModal = !state.isAddSizeModal;
    },
    setSingleEditingSize(state, action) {
      state.singleEditingSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMaterialApiData.fulfilled, (state, action) => {
      state.allMaterial = action.payload;
      state.isLoadingMaterial = false;
    });
    builder.addCase(fetchColorApiData.fulfilled, (state, action) => {
      state.allColor = action.payload;
      state.isLoadingColor = false;
    });
    builder.addCase(fetchOccasionApiData.fulfilled, (state, action) => {
      state.allOccasion = action.payload;
      state.isLoadingOccasion = false;
    });
    builder.addCase(fetchFabricApiData.fulfilled, (state, action) => {
      state.allFabric = action.payload;
      state.isLoadingFabric = false;
    });
    builder.addCase(fetchSizeApiData.fulfilled, (state, action) => {
      state.allSize = action.payload;
      state.isLoadingSize = false;
    });
  },
});

export const { setAddSizeModal, setSingleEditingSize, setAddFabricModal, setSingleEditingFabric, setAddOccasionModal, setSingleEditingOccasion, setAddColorModal, setSingleEditingColor, setAddMaterialModal, setSingleEditingMaterial } = AttributeSlice.actions;
export default AttributeSlice.reducer;
