import React from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined, LockOutlined } from "@ant-design/icons";

const { Header } = Layout;

const UserHeader: React.FC = () => {
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: "Change Password",
          icon: <LockOutlined />,
          onClick: () => {
            console.log("Change Password clicked");
            // navigate("/change-password") or open modal
          },
        },
        {
          key: "2",
          label: "Logout",
          icon: <LogoutOutlined />,
          onClick: () => {
            console.log("Logout clicked");
            // handle logout logic here
          },
        },
      ]}
    />
  );

  return (
    <Header className="flex justify-between items-center px-6" style={{ background: "#333333" }}>
      {/* Left: App Title */}
      <h1 className="text-white text-xl font-bold tracking-wide">
        CampusTrack
      </h1>

      {/* Right: User Avatar with Dropdown */}
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <Avatar
          size="large"
          icon={<UserOutlined />}
          className="cursor-pointer bg-gray-500"
        />
      </Dropdown>
    </Header>
  );
};

export default UserHeader;
