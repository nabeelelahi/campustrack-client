import { Form } from "antd";
import AuthButton from "../../component/partial/AuthButton";
import AuthLayout from "../../component/shared/AuthLayout";
import BaseInput from "../../component/shared/BaseInput";
import { resetPasswordFields } from "../../config";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { RouteTypes } from "../../types";
function Resetpassword() {
  const [form] = Form.useForm();

  // const onFinish = (values: { password: string, confirm_password: string }) => {
  //     resetPassword(values);
  // }
  return (
    <AuthLayout heading={"reset password"} subheading={""}>
      <Form
        layout="vertical"
        form={form}
        // onFinish={onFinish}
      >
        <Form.Item
          label={"New password"}
          name={"password"}
          rules={[
            { required: true, message: "Please enter your password!" },
            {
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must include uppercase, lowercase, number, and special character!",
            },
          ]}
        >
          <BaseInput {...resetPasswordFields[0]} />
        </Form.Item>
        <Form.Item
          label={"Confirm password"}
          name={"confirm_password"}
          rules={[
            { required: true, message: "Please confirm your password!" },
            {
              validator: (_, value) => {
                const password = form.getFieldValue("password");
                if (!value || password === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            },
          ]}
        >
          <BaseInput {...resetPasswordFields[1]} />
        </Form.Item>
        <AuthButton text={"verify"} htmlType="submit" />
      </Form>
    </AuthLayout>
  );
}

export default withAuthGuard(Resetpassword, RouteTypes.AUTH);
