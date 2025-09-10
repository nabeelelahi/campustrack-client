import React, { useState } from "react";
import { Layout } from "antd";
import { useColors } from "../../../config/color";
import Headers from "./Header";
import Sidebar from "./Sidebar";
import Drawers from "./Drawer";

const { Content } = Layout;

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  const colors = useColors();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  // Media query for responsive layout: max-width 768px (mobile)
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <Layout>
      {isMobile ? (
        <Drawers
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
        />
      ) : (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}
      <Layout style={{ backgroundColor: colors.background }}>
        <Headers
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
          isMobile={isMobile}
        />
        <Content
          style={{
            minHeight: 280,
            backgroundColor: colors.background,
          }}
          className="!min-h-screen m-6 !bg-white lg:p-8 rounded-[30px] p-4"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
