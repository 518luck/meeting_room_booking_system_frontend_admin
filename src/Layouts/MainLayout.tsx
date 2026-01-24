import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div>MainLayout</div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default MainLayout;
