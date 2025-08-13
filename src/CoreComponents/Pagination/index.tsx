import { Primary } from "@/Constant";
import { LimitOptions } from "@/Data/CoreComponents";
import { PaginationProps } from "@/Types/CoreComponents";
import { FC } from "react";
import Select from "react-select";
import { Col } from "reactstrap";
import PaginationList from "./PaginationList";

export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: "0.375rem",
    borderColor: "#cca270",
    borderStyle:"dashed",
    boxShadow: "none",
    "&:hover": {
      borderColor: Primary,
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? Primary : "white",
    color: state.isSelected ? "white" : "#4B5563",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: state.isSelected ? Primary : "#cca2704d",
      color: state.isSelected ? "white" : "#4B5563",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#4B5563",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "#4B5563",
    "&:hover": {
      color: Primary,
    },
  }),
};

const Pagination: FC<PaginationProps> = ({ pageCount, selectedPageLimit, onPageLimitChange, onPageChange, page }) => {
  return (
    <div className="pagination-custom">
      {pageCount > 0 && (
        <div className="d-flex">
          <Col sm="6" lg="3">
            <div className="pageLimit">
              <label htmlFor="pageLimit" className="pe-3 m-0">
                Page Limit :-
              </label>
              <Select value={LimitOptions.find((option) => option.value === selectedPageLimit)} onChange={(e) => e && onPageLimitChange(e.value)} options={LimitOptions} styles={customStyles} menuPlacement="top" />
            </div>
          </Col>
          <Col sm="6" lg="9" className="d-flex align-items-end justify-content-end pagination-box">
            <PaginationList pageCount={pageCount} onPageChange={onPageChange} page={page} />
          </Col>
        </div>
      )}
    </div>
  );
};

export default Pagination;
