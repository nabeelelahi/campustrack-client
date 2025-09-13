import { Button } from "antd";
import React from "react";
import { ButtonComponentProps } from "../../types";

function AuthButton({
  text,
  onClick,
  htmlType,
  loading,
}: ButtonComponentProps) {
  return (
    <Button
      htmlType={htmlType}
      loading={loading}
      onClick={onClick}
      className="w-full h-[54px] bg-[#084734] rounded-[5px] text-[16px] text-white my-[25px]"
    >
      <p>{text}</p>
    </Button>
  );
}

export default React.memo(AuthButton);
