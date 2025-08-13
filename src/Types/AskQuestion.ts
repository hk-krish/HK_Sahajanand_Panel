export interface AskAQuestionType {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
  productId: {
    _id: string;
    name: string;
  };
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AskAQuestionApiState {
  page: number;
  limit: number;
  page_limit: number | null;
}

export interface AskQuestionApiResponse {
  ask_a_question_data: AskAQuestionType[];
  totalData: number;
  state: AskAQuestionApiState;
}

export interface AskQuestionSliceType {
  isAddAskQuestionModal: boolean;
  allAskQuestion: AskQuestionApiResponse | null;
  isLoadingAskQuestion: boolean;
  singleEditingAskQuestion: AskAQuestionType | null;
}

export interface AddAskQuestionModalType {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
  getAllAskQuestion: () => void;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  message: string;
  type: string;
}

export interface AskQuestionFormData {
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
}
