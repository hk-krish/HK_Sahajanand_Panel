import { CustomCheckboxType } from "@/Types/CoreComponents";
import { FC } from "react";
import { Col, Label } from "reactstrap";

const CustomCheckbox: FC<CustomCheckboxType> = ({ register, title, name }) => {
  return (
    <Col sm="6" md="2">
      <div className="input-box">
        <div className="d-flex">
          <Label className="col-form-label m-r-10" htmlFor={name}>
            {title}
          </Label>
          <div className="text-end switch-sm">
            <Label className="switch">
              <input type="checkbox" id={name} {...register(name)} />
              <span className="switch-state"></span>
            </Label>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CustomCheckbox;
