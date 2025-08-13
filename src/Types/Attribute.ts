export interface AttributeType {
  _id: string;
  name: string;
  colorCode?: string;
  priority: number;
  isDeleted: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PageState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface MaterialApiResponse {
  material_data: AttributeType[];
  totalData: number;
  state: PageState;
}

export interface ColorApiResponse {
  color_data: AttributeType[];
  totalData: number;
  state: PageState;
}

export interface OccasionApiResponse {
  occasion_data: AttributeType[];
  totalData: number;
  state: PageState;
}

export interface FabricApiResponse {
  fabric_data: AttributeType[];
  totalData: number;
  state: PageState;
}

export interface SizeApiResponse {
  size_data: AttributeType[];
  totalData: number;
  state: PageState;
}

export interface MaterialSliceType {
  isAddMaterialModal: boolean;
  allMaterial: MaterialApiResponse | null;
  isLoadingMaterial: boolean;
  singleEditingMaterial: AttributeType | null;
  isAddColorModal: boolean;
  allColor: ColorApiResponse | null;
  isLoadingColor: boolean;
  singleEditingColor: AttributeType | null;
  isAddOccasionModal: boolean;
  allOccasion: OccasionApiResponse | null;
  isLoadingOccasion: boolean;
  singleEditingOccasion: AttributeType | null;
  isAddFabricModal: boolean;
  allFabric: FabricApiResponse | null;
  isLoadingFabric: boolean;
  singleEditingFabric: AttributeType | null;
  isAddSizeModal: boolean;
  allSize: SizeApiResponse | null;
  isLoadingSize: boolean;
  singleEditingSize: AttributeType | null;
}

export interface AddAttributeModalType {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
  getAllAttribute: () => void;
}

export interface AttributeFormData {
  name: string;
  priority: number;
  colorCode?: string;
}
