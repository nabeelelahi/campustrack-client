import React from "react";
import Sider from "antd/es/layout/Sider";
import { renderMenu } from "./sidebarLink";
import { useColors } from "../../../config/color";

function Sidebar({ collapsed, setCollapsed }: any) {
  const colors = useColors();
  return !collapsed ? (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      // className="bg-gray-900"
      width={235}
      style={{
        backgroundColor: colors.backgroundColor,
        color: colors.TextColor,
        boxShadow: colors.boxshadow,
      }}
    >
      <div
        className="text-center py-4 text-xl roboto-bold"
        style={{ color: colors.TextColor }}
      >
        {collapsed ? "" : "CampusTrack"}
      </div>
      {renderMenu()}
    </Sider>
  ) : null;
}

export default React.memo(Sidebar);
