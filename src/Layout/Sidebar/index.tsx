import { ImagePath, RouteList } from "@/Constant";
import Image from "next/image";
import Link from "next/link";
import LogoWrapper from "./Widgets/LogoWrapper";
import MenuList from "./Widgets/MenuList";
import ConfigDB from "@/Config/Theme";
import { useAppSelector } from "@/ReduxToolkit/Hooks";

const Sidebar = () => {
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const { sideBarToggle } = useAppSelector((state) => state.themeCustomizer);
  const sideBarIcon = ConfigDB.settings.sidebar.iconType;
  return (
    <div className={`sidebar-wrapper ${sideBarToggle ? "close_icon" : ""}`} data-layout={`${sideBarIcon}-svg`}>
      <div>
        <LogoWrapper />
        <nav className="sidebar-main">
          <div id="sidebar-menu">
            <ul className="sidebar-links custom-scrollbar" id="simple-bar">
              <div className="simplebar-wrapper">
                <div className="simplebar-mask">
                  <div className="simplebar-offset">
                    <div className="simplebar-content-wrapper">
                      <div className="simplebar-content">
                        <li className="back-btn">
                          <Link href={RouteList.Dashboard}>
                            <Image width={32} height={32} className="img-fluid" src={`${ImagePath}/logo/logo-icon.png`} alt="" />
                          </Link>
                          <div className="mobile-back text-end">
                            <span>Back </span>
                            <i className="fa fa-angle-right ps-2"/>
                          </div>
                        </li>
                        <li className={`pin-title sidebar-main-title ${pinedMenu.length > 0 ? "show" : ""} `}>
                          <div>
                            <h6>Pinned</h6>
                          </div>
                        </li>
                        <MenuList />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
