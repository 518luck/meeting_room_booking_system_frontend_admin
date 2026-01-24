import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div>AuthLayout</div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default AuthLayout;
