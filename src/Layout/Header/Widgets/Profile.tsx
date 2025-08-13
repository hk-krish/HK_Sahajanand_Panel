/* eslint-disable @next/next/no-img-element */
import { Href, ImagePath, RouteList } from "@/Constant";
import SvgIcon from "@/CoreComponents/SvgIcon";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { logout } from "@/ReduxToolkit/Slice/Layout/AuthSlice";
import { fetchSingleUserApiData } from "@/ReduxToolkit/Slice/UserSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { singleUser } = useAppSelector((state) => state.users);
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const getSingleUser = useCallback(async () => {
    try {
      await dispatch(fetchSingleUserApiData({ search: user?._id }));
    } catch (error) {}
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (user?._id) getSingleUser();
  }, [getSingleUser, user?._id]);

  const LogOut = () => {
    dispatch(logout());
    router.push(RouteList.Auth.Login);
  };

  return (
    <li className="profile-nav onhover-dropdown p-0 m-0">
      <div className="d-flex profile-media align-items-center">
        <img className="b-r-6 img-40" src={singleUser?.profilePhoto ? singleUser?.profilePhoto : `${ImagePath}user/user.png`} alt="profile" />
        <div className="flex-grow-1">
          <span>
            {singleUser?.firstName} {singleUser?.lastName}
          </span>
          <p className="mb-0">
            Admin
            <SvgIcon iconId="header-arrow-down" />
          </p>
        </div>
      </div>
      <ul className="profile-dropdown onhover-show-div">
        <li>
          <Link href={RouteList.ChangePassword}>
            <span>Change Password</span>
          </Link>
        </li>
        <li onClick={() => LogOut()}>
          <Link href={Href}>
            <span>LogOut</span>
          </Link>
        </li>
      </ul>
    </li>
  );
};
export default Profile;
