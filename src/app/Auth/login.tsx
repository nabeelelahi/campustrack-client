import { Form, Checkbox } from "antd";
import AuthButton from "../../component/partial/AuthButton";
import { Link } from "react-router-dom";
import AuthLayout from "../../component/shared/AuthLayout";
import BaseInput from "../../component/shared/BaseInput";
import { loginFields } from "../../config/index";
import { useAuth } from "../../hooks/useAuth";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { RouteTypes } from "../../types";

function Login() {
  const { login, loading } = useAuth();
  return (
    <AuthLayout heading={"Welcome Back"} subheading={"Login to continue"}>
      <div>
        <Form
          layout="vertical"
          onFinish={(values: any) => {
            login(values);
            console.log(values);
          }}
        >
          {loginFields.map((item: any) => {
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
          <div className="flex justify-between items-center">
            <Checkbox className="text-[#5F697D] text-[11px] roboto-regular">
              Remember me
            </Checkbox>
            <Link
              to={"/forgot-password"}
              className="text-[#1173FF] text-[11px] roboto-regular"
            >
              Forgot Password ?
            </Link>
          </div>
          <AuthButton htmlType="submit" text={"Login"} loading={loading} />
        </Form>
      </div>
    </AuthLayout>
  );
}

export default withAuthGuard(Login, RouteTypes.AUTH);
