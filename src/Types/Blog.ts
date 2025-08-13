import { SelectOption } from "./Product";

export interface BlogType {
  _id: string;
  title: string;
  content: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  category: string;
  image: string;
  tags: string[];
  scheduledAt: string;
  status: string;
  isDeleted: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPaginationState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface BlogApiResponse {
  blog_data: BlogType[];
  totalData: number;
  state: BlogPaginationState;
}

export interface BlogFormData {
  title: string;
  content: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: SelectOption[];
  category: string;
  tags: SelectOption[];
  scheduledAt: Date;
  image: File[];
  status: string;
}

export interface BlogSliceType {
  allBlog: BlogApiResponse;
  isLoadingBlog: boolean;
  isBlogSearchData: string;
  singleEditingBlog: BlogType;
}
