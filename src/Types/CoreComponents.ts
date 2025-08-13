import { FormEvent, ReactNode } from "react";

export interface SvgProps {
  iconId?: string | undefined;
  className?: string;
  style?: {
    height?: string;
    width?: string;
    fill?: string;
    marginRight?: string;
  };
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  mainTitle: string;
  parent: string;
}

export interface CardSubtitle {
  text?: string;
  code?: string;
  mark?: string;
}

export interface TypeFilterData {
  value?: string;
  label?: string;
}

export interface CardHeaderProp {
  title?: string;
  headClass?: string;
  tagClass?: string;
  isEditing?: boolean;
  setIsEditing?: (val: boolean) => void;
  Search?: (key: string) => void;
  searchClass?: string;
  btnTitle?: string;
  btnClick?: () => void;
  btnLink?: string;
  typeFilter?: (id: string) => void;
  typeFilterData?: TypeFilterData[];
  rowClass?: string;
}

export interface InformationProp {
  headerTitle?: string;
  editorContent: string;
  setEditorContent: (content: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}

export interface RatioImageProp {
  className?: string;
  src: string;
  alt?: string;
  style?: { height: number };
}

export interface CommonImageUploadProps {
  multiple?: boolean;
  errors?: any;
  setValue?: any;
  setPhoto?: (photo: string[]) => void;
  photo?: string[];
  trigger?: any;
  name?: string;
  type?: string;
  disabled?: boolean;
}

export interface PaginationListProps {
  pageCount: number;
  onPageChange: (data: { selected: number }) => void;
  page: number;
}

export interface PaginationProps {
  pageCount: number;
  selectedPageLimit: number;
  onPageLimitChange: (limit: number) => void;
  onPageChange: (data: { selected: number }) => void;
  page: number;
}

export interface CustomCheckboxType {
  register: any;
  name: string;
  title?: string;
}

export interface CustomTypeaheadType {
  errors: any;
  control: any;
  title?: string;
  name?: string;
  options?: any;
  disabled?: boolean;
  required?: boolean;
}

export interface ProductImageProps {
  image: string | string[];
}

export interface NoSsrProps {
  children: ReactNode;
}

export interface PostApiResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export interface GetApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
}

export interface DeleteApiResponse {
  status: number;
  message?: string;
}
