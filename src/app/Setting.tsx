import React from "react";
import { Card, Form, Input, Button, Switch, Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import LayoutAdmin from "../component/partial/Layout/Admin";

const { Title } = Typography;

const Settings: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Settings values:", values);
    // Implement settings save logic here
  };

  return (
    <LayoutAdmin>
      <div className="p-6 min-h-screen">
        <Title level={2} className="mb-4">
          Settings
        </Title>
        <Card className="w-full max-w-md">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Site Name"
              name="siteName"
              rules={[
                { required: true, message: "Please input the site name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input the email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Enable Notifications"
              name="notifications"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </LayoutAdmin>
  );
};

export default Settings;
