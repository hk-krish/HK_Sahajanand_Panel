export interface NewsLetterType {
  _id: string;
  email: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface NewsLetterApiResponse {
  newsletter_data: NewsLetterType[];
  totalData: number;
  state: NewsletterState;
}

export interface NewsLetterSliceType {
  isAddNewsLetterModal: boolean;
  allNewsLetter: NewsLetterApiResponse;
  isLoadingNewsLetter: boolean;
  singleEditingNewsLetter: NewsLetterType;
}

export interface AddNewsLetterModalType {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
  getAllNewsLetter: () => void;
}

export interface NewsLetterFormData{
  email:string
}