export interface BannerType {
  _id: string;
  type: string;
  title: string;
  imageDesktop: string;
  imageMobile: string;
  priority: number;
  linkType: string;
  linkId?: string;
  isDeleted: boolean;
  isBlocked: boolean;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
  description: string;
  buttonText: string;
  percentage: number;
  buttonVisible: boolean;
}

export interface BannerState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface BannerApiResponse {
  banner_data: BannerType[];
  totalData: number;
  state: BannerState;
}

export interface BannersSliceType {
  isAddBannerModal: boolean;
  allBanner: BannerApiResponse;
  isLoadingBanner: boolean;
  isBannerSearchData: string;
  singleEditingBanner: BannerType;
}

export interface BannerFormData {
  type: string;
  title: string;
  priority: number;
  linkType: string;
  linkId: string;
  description: string;
  buttonText: string;
  percentage: number;
  buttonVisible: boolean;
}

export interface AddBannersModalType {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
  getAllBanner: () => void;
}
