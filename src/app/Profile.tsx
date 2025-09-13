import React from "react";
import { Avatar, Form, Input, DatePicker } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useColors } from "../config/color";
import CustomInput from "../component/shared/CustomInput";
import CustomButton from "../component/shared/CustomButton";
import {UserLayout} from "../component/partial/Layout/User";

interface ProfileProps {
  user: {
    name: string;
    email: string;
    phone: string;
    avatarUrl?: string;
    bio?: string;
    dob?: string; // Date of Birth
    location?: string;
    privacy?: boolean;
  };
}

const Profile = ({ user }: ProfileProps) => {
  const colors = useColors();

  console.log(user);

  const onFinish = (values: any) => {
    console.log("Updated values:", values);
    // Implement the profile update logic here
  };

  return (
    <UserLayout>
      <div className="flex justify-center">
        <div
          className="w-full lg:w-1/2 bg-white p-8 rounded-[20px]"
          style={{
            boxShadow: colors.boxshadow,
            backgroundColor: colors.backgroundColor,
          }}
        >
          <div className="flex items-center mb-6">
            <Avatar
              size={64}
              src={user.avatarUrl}
              icon={!user.avatarUrl && <UserOutlined />}
              className="mr-4"
            />
            <div>
              <p
                className="poppins-medium text-xl"
                style={{ color: colors.TextColor }}
              >
                {user.name}
              </p>
              <p
                className="text-[14px] poppins-regular"
                style={{ color: colors.TextColor }}
              >
                {user.email}
              </p>
            </div>
          </div>
          <Form name="profile" onFinish={onFinish} layout="vertical">
            <div className="lg:grid grid-cols-2 gap-4">
              <CustomInput
                label={"Name"}
                name={"name"}
                message={"Please input your name!"}
                icon={<UserOutlined />}
                initialvalue={user.name}
              />
              <CustomInput
                label={"Email"}
                name={"email"}
                message={"Please input your email!"}
                icon={<MailOutlined />}
                initialvalue={user?.email}
              />
            </div>
            <div className="lg:grid grid-cols-2 gap-4">
              <CustomInput
                label={"Phone"}
                name={"phone"}
                message={"Please input your phone number!"}
                icon={<PhoneOutlined />}
                initialvalue={user?.phone}
              />
              <Form.Item
                name="dob"
                initialValue={user.dob ? moment(user.dob, "YYYY-MM-DD") : null}
              >
                <div>
                  <p
                    className="text-[14px] poppins-regular mb-1"
                    style={{ color: colors.TextColor }}
                  >
                    Date of Birth
                  </p>
                  <DatePicker
                    format="YYYY-MM-DD"
                    placeholder="Select Date of Birth"
                    style={{ width: "100%" }}
                    className="h-[40px] rounded-[10px]"
                    defaultValue={
                      user.dob ? moment(user.dob, "YYYY-MM-DD") : null
                    }
                  />
                </div>
              </Form.Item>
            </div>
            <CustomInput
              label={"Location"}
              name={"location"}
              message={"Please input your location!"}
              icon={<GlobalOutlined />}
              initialvalue={user?.location}
            />
            <Form.Item name="bio" initialValue={user.bio}>
              <div>
                <p
                  className="text-[14px] poppins-regular mb-1"
                  style={{ color: colors.TextColor }}
                >
                  Tell us about yourself
                </p>
                <Input.TextArea className="h-[40px] rounded-[10px]" rows={4} />
              </div>
            </Form.Item>
            <CustomButton title="Update Profile" />
          </Form>
        </div>
      </div>
    </UserLayout>
  );
};

export default React.memo(Profile);
