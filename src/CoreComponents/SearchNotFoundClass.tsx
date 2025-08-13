import { ImagePath } from "@/Constant";
import RatioImage from "@/Utils/RatioImage";
import { FC } from "react";

const SearchNotFoundClass: FC<{ word: string }> = ({ word }) => {
  return (
    <div className="no-found-item text-center">
      <RatioImage src={`${ImagePath}other-images/not-found.svg`} alt="not-found" className="img-fluid" />
      <div className="no-found-content">
        <h3>{word}</h3>
      </div>
    </div>
  );
};

export default SearchNotFoundClass;
