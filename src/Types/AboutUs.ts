export interface PrivacyPolicyType {
  _id: string;
  isDeleted: boolean;
  createdAt: string;
  privacyPolicy: string;
  updatedAt: string;
}

export interface AboutUsType {
  _id: string;
  isDeleted: boolean;
  aboutUs: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReturnPolicyType {
  _id: string;
  isDeleted: boolean;
  returnPolicy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TermsConditionType {
  _id: string;
  isDeleted: boolean;
  termsCondition: string;
  createdAt: string;
  updatedAt: string;
}

export interface OurStoryType {
  _id: string;
  isDeleted: boolean;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutSliceType {
  allPrivacyPolicy: PrivacyPolicyType | null;
  allAboutUs: AboutUsType | null;
  allReturnPolicy: ReturnPolicyType | null;
  allTermsCondition: TermsConditionType | null;
  allOurStory: OurStoryType | null;
}
