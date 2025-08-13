import { Col, Row } from "reactstrap";
import FullScreen from "./Widgets/FullScreen";
import LogoWrapper from "./Widgets/LogoWrapper";
import Profile from "./Widgets/Profile";
import SearchBar from "./Widgets/SearchBar";
import SearchInput from "./Widgets/SearchInput";
import { useAppSelector } from "@/ReduxToolkit/Hooks";

const Header = () => {

  const { sideBarToggle } = useAppSelector((state) => state.themeCustomizer);

  return (
    <div className={`page-header ${sideBarToggle ? 'close_icon' : ''}`}>
      <Row className="header-wrapper m-0">
        <LogoWrapper />
        <SearchBar />
        <Col xs="auto" lg="7" md="6" className="nav-right box-col-6 pull-right right-header p-0 ms-auto">
          <ul className="nav-menus">
            <SearchInput />
            <FullScreen />
            <Profile/>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
