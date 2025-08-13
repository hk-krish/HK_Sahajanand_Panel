export interface EnquiryType {
  _id: string;
  name: string;
  email: string;
  message: string;
  type: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryApiResponse {
  enquiry_data: EnquiryType[];
  totalData: number;
  state: {
    page: number;
    limit: number;
    page_limit: number;
  };
}

export interface EnquirySliceType {
  isAddEnquiryModal: boolean;
  allEnquiry: EnquiryApiResponse;
  isLoadingEnquiry: boolean;
  singleEditingEnquiry: EnquiryType;
}


export interface AddEnquiryModalType {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
  getAllEnquiry: () => void;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  message: string;
  type:string
}