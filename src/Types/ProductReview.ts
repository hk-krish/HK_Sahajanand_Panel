export interface AddProductReviewModalType {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
  getAllProductReview: () => void;
}

export interface ProductReviewType {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string;
    userType: string;
  };
  product: {
    _id: string;
    name: string;
    images: string[];
  };
}

export interface ProductReviewState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface ProductReviewApiResponse {
  review_data: ProductReviewType[];
  totalData: number;
  state: ProductReviewState;
}

export interface ProductReviewSliceType {
  isAddProductReviewModal: boolean;
  allProductReview: ProductReviewApiResponse;
  isLoadingProductReview: boolean;
  singleEditingProductReview: ProductReviewType;
}

export interface ProductReviewFormData {
  productId: string;
  rating: number;
  comment: string;
}