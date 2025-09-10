import { Button } from "antd";
import React from "react";
import { useColors } from "../../config/color";
// import { CustomButtonProps } from '../../type';

function CustomButton(props: any) {
  const colors = useColors();
  const { color, onClick, icon, title } = props;
  const primaryColor = color || colors.primary;

  return (
    <Button
      htmlType="submit"
      className={`rounded-[8px] h-[40px] roboto-medium px-8 text-white border-0 hover:!text-white`}
      style={{ backgroundColor: primaryColor }}
      onClick={onClick}
      icon={icon}
    >
      {title}
    </Button>
  );
}

export default React.memo(CustomButton);
