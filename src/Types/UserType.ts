export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePhoto: string;
  password: string;
  roleId: string;
  userType: string;
  isDeleted: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  wishlists?: string[];
  mapLink: string;
  newsLetterImage: string;
  whatsappNumber: number;
  whatsappMessage: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  freeShippingThreshold: number;
  shippingCharge: number;
}

export interface UserListState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface UserApiResponse {
  user_data: UserType[];
  totalData: number;
  state: UserListState;
}

export interface SettingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  facebook: string;
  twitter: string;
  instagram: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: number;
  mapLink: string;
  headerOffer: string[];
  whatsappNumber: number;
  whatsappMessage: string;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  freeShippingThreshold: number;
  shippingCharge: number;
}
