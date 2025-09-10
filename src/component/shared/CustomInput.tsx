import { Form, Input } from "antd";
import React from "react";
import { useColors } from "../../config/color";
// import { inputprops } from '../../type'

function CustomInput({ name, message, icon, label, initialvalue }: any) {
  const colors = useColors();
  return (
    <Form.Item
      key={name}
      name={name}
      initialValue={initialvalue}
      rules={[{ required: true, message: message }]}
    >
      <div>
        <p
          className="text-[14px] poppins-regular mb-1"
          style={{ color: colors.TextColor }}
        >
          {label}
        </p>
        <Input
          className="h-[40px] rounded-[10px]"
          defaultValue={initialvalue}
          prefix={icon}
        />
      </div>
    </Form.Item>
  );
}

export default React.memo(CustomInput);
