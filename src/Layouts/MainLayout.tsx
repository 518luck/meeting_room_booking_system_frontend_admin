import React from "react";
import { Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import mainRoutes from "@/routers/main";

const { Header, Content, Sider } = Layout;

/** 将路由数组映射为 antd Menu items */
const mapRoutesToMenuItems = (): MenuProps["items"] => {
  return mainRoutes
    .filter((route) => route.handle?.label)
    .map((route) => ({
      key: route.path as string,
      label: route.handle?.label as string,
    }));
};

const menuItems = mapRoutesToMenuItems();

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 从 antd 中取出 token，用于保持 与 antd 默认背景色的一致性
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const selectedKey = location.pathname.split("/").filter(Boolean).pop() || "";

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center h-16 px-6 bg-[#001529]">
        <h1 className="text-white text-lg font-bold">
          会议室订阅系统-后台管理
        </h1>
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
            items={menuItems}
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
