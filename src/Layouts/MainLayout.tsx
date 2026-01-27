import React, { useState } from "react";
import { Layout, Menu, theme, Avatar } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import mainRoutes from "@/routers/main";
import userRoutes from "@/routers/user";

const { Header, Content, Sider } = Layout;

/** 将路由数组映射为 antd Menu items */
const mapRoutesToMenuItems = (
  routes: typeof mainRoutes,
  basePath: string = "",
): MenuProps["items"] => {
  return routes
    .filter((route) => route.handle?.label)
    .map((route) => ({
      key: basePath ? `${basePath}/${route.path}` : (route.path as string),
      label: route.handle?.label as string,
    }));
};

const mainMenuItems = mapRoutesToMenuItems(mainRoutes);
const userMenuItems = mapRoutesToMenuItems(userRoutes, "/user");

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 判断当前是否在用户相关页面
  const isUserPage = location.pathname.startsWith("/user");

  // 当前显示的菜单项
  const [currentMenuItems, setCurrentMenuItems] = useState<MenuProps["items"]>(
    isUserPage ? userMenuItems : mainMenuItems,
  );

  // 从 antd 中取出 token，用于保持 与 antd 默认背景色的一致性
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const selectedKey = location.pathname.startsWith("/user")
    ? location.pathname
    : location.pathname.split("/").filter(Boolean).pop() || "";

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  // 点击头像切换到用户菜单
  const handleAvatarClick = () => {
    setCurrentMenuItems(userMenuItems);
    navigate("/user/info_modify");
  };

  // 点击标题切换回主菜单
  const handleTitleClick = () => {
    setCurrentMenuItems(mainMenuItems);
    navigate("/");
  };

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between h-16 px-6 bg-[#001529]">
        <h1
          className="text-white text-lg font-bold cursor-pointer"
          onClick={handleTitleClick}
        >
          会议室订阅系统-后台管理
        </h1>
        <Avatar
          size="large"
          icon={<UserOutlined />}
          className="cursor-pointer bg-blue-500 hover:bg-blue-400 transition-colors"
          onClick={handleAvatarClick}
        />
      </Header>

      <Layout>
        {/* Sider: 使用 style 动态注入 token 背景色，其余用 Tailwind */}
        <Sider
          width={200}
          style={{ background: colorBgContainer }}
          className="overflow-auto border-r border-gray-100"
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            className="h-full border-none"
            items={currentMenuItems}
            onClick={handleMenuClick}
          />
        </Sider>

        <Layout className="p-6 bg-gray-50">
          <Content
            style={{ background: colorBgContainer }}
            className="m-0 p-6 min-h-[280px] rounded-lg shadow-sm"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
