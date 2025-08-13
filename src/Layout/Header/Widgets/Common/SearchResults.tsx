import { Fragment } from "react/jsx-runtime";
import Link from "next/link";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import { FC } from "react";
import { SearchListProps } from "@/Types/Layout";
import { useAppDispatch } from "@/ReduxToolkit/Hooks";
import { setResponsiveSearch } from "@/ReduxToolkit/Slice/Layout/LayoutSlice";
import SvgIcon from "@/CoreComponents/SvgIcon";

const SearchResults: FC<SearchListProps> = ({ searchedArray, setSearchedWord , onItemClick}) => {
  const dispatch = useAppDispatch();
  const handleSearch = (url: string) => {
    setSearchedWord("");
    dispatch(setResponsiveSearch());
    if (onItemClick) onItemClick(url);
  };
  return (
    <Fragment>
      {searchedArray?.map((item, index) => (
        <div className="Profile-Card u-cf" key={index}>
          <Link className="realname w-auto d-flex justify-content-start gap-2" href={item.url || ""} onClick={() => handleSearch(item.url || "")}>
            <div className="Profile-Card-details">
              <div className="Profile-Card-avatar">
                <SvgIcon className="stroke-icon svg-color" iconId={`stroke-${item.icon}`} />
              </div>
              <div className="Profile-Card-realName">{item.title}</div>
            </div>
          </Link>
        </div>
      ))}
      {!searchedArray?.length && <SearchNotFoundClass word="Page" />}
    </Fragment>
  );
};

export default SearchResults;
