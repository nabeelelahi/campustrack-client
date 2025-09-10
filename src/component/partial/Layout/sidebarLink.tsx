import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useColors } from "../../../config/color";
import { MenuProps } from "antd";
import { useState } from "react";
import { menuItems } from "../../../config";
import { useTheme } from "../../../context/Themeprovider";

export const renderMenu = () => {
  const colors = useColors();
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedKeys = [location.pathname];
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // Handle menu item clicks
  const handleClick: MenuProps["onClick"] = ({ key, keyPath }) => {
    navigate(key);

    const parentKey = keyPath[keyPath.length - 1];
    if (!openKeys.includes(parentKey)) {
      setOpenKeys((prev) => [...new Set([...prev, parentKey])]); // Keep parent open
    }
  };
  return (
    <Menu
      theme="dark"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      mode="inline"
      style={{ background: colors.backgroundColor, color: colors.TextColor }}
      items={menuItems.map((item) => {
        const active = item.key === location.pathname;
        return {
          ...item,
          label: (
            <p
              className={`roboto-regular ${isDarkMode
                  ? active
                    ? "text-[#fff] roboto-medium"
                    : "text-[#fff] roboto-regular"
                  : active
                    ? "text-[#fff] roboto-medium"
                    : "text-[#000] roboto-regular"
                }`}
            >
              {item.label}
            </p>
          ),
        };
      })}
      onClick={handleClick}
      className="poppins-regular table-dark-mode"
    />
  );
};

export const menu = (
  <Menu>
    <Menu.Item key="1" icon={<UserOutlined />}>
      Profile
    </Menu.Item>
    <Menu.Item key="2" icon={<LogoutOutlined />}>
      Logout
    </Menu.Item>
  </Menu>
);
