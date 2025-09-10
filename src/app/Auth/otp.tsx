import { useState } from "react";
import { Form, notification } from "antd";
import { OtpInput } from "reactjs-otp-input";
import AuthButton from "../../component/partial/AuthButton";
import AuthLayout from "../../component/shared/AuthLayout";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { RouteTypes } from "../../types";

function Otp() {
  const [otp, setOtp] = useState<string>("");
  // const { loading, verifyCode } = useAuth();
  const handleChange = (otp: string) => {
    setOtp(otp);
  };
  const onFinish = () => {
    if (otp.length < 4) {
      notification.info({
        message: "Invalid Code",
        description: "Code should be 4 digit",
      });
    } else {
      // verifyCode({ code: otp })
    }
    console.log("Success:", otp);
  };
  return (
    <AuthLayout heading={"verification"} subheading={"email here"}>
      <div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            rules={[{ required: true, message: "Please input your otp!" }]}
          >
            <OtpInput
              inputStyle={{
                width: "71.6px",
                height: "71.6px",
                background: "#E7F1FF",
                borderRadius: "10.76px",
              }}
              containerStyle={{ justifyContent: "space-evenly" }}
              focusStyle={{ background: "#fff" }}
              value={otp}
              onChange={handleChange}
              numInputs={4}
            />
          </Form.Item>
          <AuthButton htmlType="submit" text={"verify"} />
        </Form>
      </div>
    </AuthLayout>
  );
}

export default withAuthGuard(Otp, RouteTypes.AUTH);
