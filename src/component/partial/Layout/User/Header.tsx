import React, { Dispatch, SetStateAction, useState } from "react";
import { Layout, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined, LockOutlined } from "@ant-design/icons";
import ChangePassword from "../../Modals/ChangrPassword";

const { Header } = Layout;

const menu = (setOpen: Dispatch<SetStateAction<boolean>>) => (
  <Menu
    items={[
      {
        key: "1",
        label: "Change Password",
        icon: <LockOutlined />,
        onClick: () => {
          setOpen(true)
        },
      },
      {
        key: "2",
        label: "Logout",
        icon: <LogoutOutlined />,
        onClick: () => {
          localStorage.clear()
          location.href = '/'
        },
      },
    ]}
  />
);

const UserHeader: React.FC = () => {
  const [open, setOpen] = useState(false)


  return (
    <Header className="flex justify-between items-center px-6" style={{ background: "#084734" }}>
      {/* Left: App Title */}
      <h1 className="text-white text-xl font-bold tracking-wide">
        CampusTrack
      </h1>
      <Dropdown overlay={menu(setOpen)} trigger={['click']} placement="bottomRight">
        <Avatar
          size="large"
          icon={<UserOutlined style={{ color: "#084734" }} />}
          className="cursor-pointer bg-[#CEEDB2]"
        />
      </Dropdown>
      <ChangePassword
        open={open}
        setOpen={setOpen}
      />
    </Header>
  );
};

export default UserHeader;
