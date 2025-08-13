import { Href } from "@/Constant";
import { Maximize2 } from "iconsax-react";
import { useState } from "react";
import { NavLink } from "reactstrap";

const FullScreen = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const fullScreenHandler = (isFullScreen: boolean) => {
    setFullScreen(isFullScreen);
    if (isFullScreen) document.documentElement.requestFullscreen();
    else document?.exitFullscreen();
  };

  return (
    <li onClick={() => fullScreenHandler(!fullScreen)}>
      <NavLink href={Href}>
        <Maximize2 />
      </NavLink>
    </li>
  );
};

export default FullScreen;
