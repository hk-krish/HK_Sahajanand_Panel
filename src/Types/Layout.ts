import { ReactNode } from "react";

export interface ChildrenType {
  children: ReactNode;
}

export interface MenuItem {
  title: string;
  lanClass?: string;
  Items?: MenuItem[];
  id?: number;
  icon?: string;
  type?: string;
  active?: boolean;
  menu?: MenuItem[];
  url?: string;
  badge?: boolean;
  badgeName?: string;
  badgeColor?: string;
}

export interface MenuListProps {
  menu: MenuItem[] | undefined;
  setActiveMenu: (temp: MenuItem[]) => void;
  activeMenu: MenuItem[];
  level: number;
}

export interface LayoutStateProps {
  pinedMenu: string[];
  responsiveSearch: boolean;
}

export interface SearchItems {
  icon: string | undefined;
  title: string;
  url: string;
  id?: number;
  bookmarked?: boolean;
}

export interface SearchListProps {
  searchedArray: SearchItems[];
  setSearchedWord: (key: string) => void;
  onItemClick?: (url: string) => void;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface ForgotPasswordType {
  email: string;
  password: string;
  confirmPassword: string;
}
