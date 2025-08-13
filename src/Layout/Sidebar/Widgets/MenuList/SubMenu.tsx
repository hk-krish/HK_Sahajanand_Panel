/* eslint-disable react-hooks/exhaustive-deps */
import ConfigDB from "@/Config/Theme";
import { Href } from "@/Constant";
import SvgIcon from "@/CoreComponents/SvgIcon";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setPinedMenu } from "@/ReduxToolkit/Slice/Layout/LayoutSlice";
import { MenuItem, MenuListProps } from "@/Types/Layout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Fragment, useEffect } from "react";

const SubMenu: FC<MenuListProps> = ({ menu, setActiveMenu, activeMenu, level }) => {
  const dispatch = useAppDispatch();
  const location = usePathname();
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const sideBarIcon = ConfigDB.settings.sidebar.iconType;
  const handlePined = (value: string) => {
    if (!pinedMenu.includes(value)) {
      dispatch(setPinedMenu([...pinedMenu, value]));
    } else {
      let filterMenu = pinedMenu.filter((item) => item !== value);
      dispatch(setPinedMenu(filterMenu));
    }
  };
  const ActiveNavLinkUrl = (path?: string) => {
    return location === path ? true : "";
  };
  const shouldSetActive = ({ item }: { item: MenuItem }): boolean => {
    var returnValue = false;
    if (item?.url === location) {
      returnValue = true;
    }
    if (!returnValue && item?.menu) {
      item?.menu.every((subItem: MenuItem) => {
        returnValue = shouldSetActive({ item: subItem });
        return !returnValue;
      });
    }
    return returnValue;
  };
  useEffect(() => {
    menu?.forEach((item) => {
      let gotValue = shouldSetActive({ item });
      if (gotValue) {
        let temp = [...activeMenu];
        temp[level] = item;
        setActiveMenu(temp);
      }
    });
  }, []);
  return (
    <Fragment>
      {menu?.map((item, i) => (
        <li key={i} className={`${level === 0 ? "sidebar-list" : ""} ${item.title && pinedMenu.includes(item.title) ? "pined" : ""} ${(item.menu ? item.menu.map((innerItem) => ActiveNavLinkUrl(innerItem.url)).includes(true) : ActiveNavLinkUrl(item.url)) || activeMenu[level]?.title === item.title ? "active" : ""}`}>
          {level === 0 && <i className="fa fa-thumbtack" onClick={() => item.title && handlePined(item.title)}></i>}
          <Link
            className={`${level === 0 ? "sidebar-link sidebar-title" : ""} ${(item.menu ? item.menu.map((innerItem) => ActiveNavLinkUrl(innerItem.url)).includes(true) : ActiveNavLinkUrl(item.url)) || activeMenu[level]?.title === item.title ? "active" : ""}`}
            href={item.url ? item.url : Href}
            onClick={() => {
              const temp = [...activeMenu]; 
              temp[level] = temp[level]?.title !== item.title ? item : ({} as MenuItem); 
              setActiveMenu(temp);
            }}
          >
            {item.icon && <SvgIcon className={`${sideBarIcon}-icon`} iconId={`${sideBarIcon}-${item.icon}`} />}
            {level === 0 ? <span>{`${item.title}`}</span> : `${item.title}`}
            {item.menu && <div className="according-menu">{activeMenu[level]?.title === item.title ? <i className="fa fa-angle-down" /> : <i className="fa fa-angle-right" />}</div>}
          </Link>
          {item.menu && (
            <ul className={level !== 0 ? "submenu-content open-sub-mega-menu" : "sidebar-submenu"} style={{ display: `${(item.menu ? item.menu.map((innerItem) => ActiveNavLinkUrl(innerItem.url)).includes(true) : ActiveNavLinkUrl(item.url)) || activeMenu[level]?.title === item.title ? "block" : "none"}` }}>
              <SubMenu menu={item.menu} activeMenu={activeMenu} setActiveMenu={setActiveMenu} level={level + 1} />
            </ul>
          )}
        </li>
      ))}
    </Fragment>
  );
};
export default SubMenu;
