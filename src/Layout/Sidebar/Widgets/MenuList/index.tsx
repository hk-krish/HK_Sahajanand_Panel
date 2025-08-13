import { useState, Fragment } from "react";
import SubMenu from "./SubMenu";
import { menuList } from "@/Data/Layout/SidebarMenuList";
import { MenuItem } from "@/Types/Layout";
import { useAppSelector } from "@/ReduxToolkit/Hooks";

const MenuList = () => {
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const [activeMenu, setActiveMenu] = useState<MenuItem[]>([]);
  const shouldHideMenu = (mainMenu: MenuItem) => mainMenu?.Items?.map((data) => data.title).every((titles) => pinedMenu.includes(titles));

  return (
    <Fragment>
      {menuList &&
        menuList.map((mainMenu, index) => (
          <Fragment key={index}>
            <li className={`sidebar-main-title ${shouldHideMenu(mainMenu) ? "d-none" : ""}`}>
              <div>
                <h6>{`${mainMenu.title}`}</h6>
              </div>
            </li>
            <SubMenu menu={mainMenu.Items} activeMenu={activeMenu} setActiveMenu={setActiveMenu} level={0} />
          </Fragment>
        ))}
    </Fragment>
  );
};

export default MenuList;
