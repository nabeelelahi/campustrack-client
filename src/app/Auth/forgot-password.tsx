import { Form } from "antd";
import AuthButton from "../../component/partial/AuthButton";
import AuthLayout from "../../component/shared/AuthLayout";
import { forgotPasswordFields } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { RouteTypes } from "../../types";

function Forgotpassword() {
  // const { forgotPassword, loading } = useAuth();

  // const onFinish = (values: any) => {
  //     forgotPassword(values);
  // }

  return (
    <AuthLayout heading={"Forgot Password"} subheading={"email here"}>
      <Form
        layout="vertical"
        // onFinish={onFinish}
      >
        {forgotPasswordFields.map((item: any) => {
          return (
            <Form.Item
              label={item.title}
              key={item.name}
              name={item.name}
              rules={item.rules}
            >
              <BaseInput {...item} />
            </Form.Item>
          );
        })}
        <AuthButton htmlType="submit" text={"verify"} />
      </Form>
    </AuthLayout>
  );
}

export default withAuthGuard(Forgotpassword, RouteTypes.AUTH);
