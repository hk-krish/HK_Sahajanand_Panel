export interface OrderApiResponse {
  order_data: OrderType[];
  totalData: number;
  state: {
    page: number;
    limit: number;
    page_limit: number;
  };
}

export interface OrderType {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  products: ProductItem[];
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  shippingAddressId: ShippingAddress;
  trackingId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductItem {
  productId: Product;
  quantity: number;
  price: number;
  size: string;
  color: string;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
}

export interface ShippingAddress {
  _id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderHistorySliceType {
  isOrderHistoryDetailModal: boolean;
  allOrderHistory: OrderApiResponse | null;
  isLoadingOrderHistory: boolean;
  singleEditingOrderHistory: OrderType | null;
}
