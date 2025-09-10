import React from "react";
import { Form, Input, Select, DatePicker } from "antd";
// import { DynamicFormProps } from '../../type';
const { Option } = Select;

const DynamicForm = ({ fields, form, uploadImage, image }: any) => {
  return (
    <Form layout="vertical" form={form}>
      {fields.map((field: any) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules}
        >
          {field.type === "image" && (
            <div>
              <input type="file" onChange={uploadImage} />
              {image && (
                <img
                  src={image}
                  alt="User"
                  className="mt-2 w-20 h-20 rounded-full"
                />
              )}
            </div>
          )}
          {field.type === "text" && <Input />}
          {field.type === "password" && <Input.Password />}
          {field.type === "textarea" && <Input.TextArea />}
          {field.type === "select" && (
            <Select placeholder={`Select ${field.label}`}>
              {field.options?.map((option: any) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )}
          {field.type === "date" && <DatePicker style={{ width: "100%" }} />}
        </Form.Item>
      ))}
    </Form>
  );
};

export default React.memo(DynamicForm);
