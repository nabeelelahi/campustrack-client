import { Form, Input, Modal } from "antd";
import ImageUploader from "../shared/ImageUploader";
import CustomButton from "../shared/CustomButton";
import { useState } from "react";
import { createCategory, updateCategory } from "../../repositories";
import { useRequest } from "../../hooks/useRequest";

interface CategoryModalProps {
  onCancel: () => void;
  open: boolean;
  setFetch: React.Dispatch<React.SetStateAction<boolean>>;
  record?: {
    _id: string;
    name: string;
    icon: string;
  };
  setRecord?: any;
}

export default function CategoryModal({
  onCancel,
  open,
  setFetch,
  record,
  setRecord,
}: CategoryModalProps) {
  const [icon, setIcon] = useState("");
  const [isEdit] = useState(record);
  const [form] = Form.useForm();

  const { execute: addCategory, loading } = useRequest(
    createCategory.url,
    createCategory.method,
    {
      type: "delay",
    }
  );

  const { execute: editCategory } = useRequest(
    updateCategory.url,
    updateCategory.method,
    {
      type: "delay",
    }
  );

  const onFinish = () => {
    form.validateFields().then((values) => {
      if (record) {
        editCategory({
          body: {
            ...values,
            icon: icon ? icon : record.icon,
          },
          body_type: "formData",
          routeParams: record._id,
          cbSuccess: () => {
            setFetch(true);
            onClose();
          },
        });
      } else {
        addCategory({
          body: {
            ...values,
            icon: icon,
          },
          body_type: "formData",
          cbSuccess: () => {
            setFetch(true);
            onClose();
          },
        });
      }
    });
  };

  const onClose = () => {
    onCancel();
    setRecord(null);
  };

  return (
    <div>
      <Modal title="Add Category" open={open} onCancel={onClose} footer={null}>
        <Form layout="vertical" form={form}>
          <ImageUploader
            onChange={(e) => setIcon(e)}
            initialImgSrc={isEdit ? record?.icon : ""}
          />
          <Form.Item
            name="name"
            label="Name"
            initialValue={isEdit ? record?.name : ""}
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input className="w-full h-[40px] rounded-[10px]" />
          </Form.Item>

          <CustomButton loading={loading} title="Submit" onClick={onFinish} />
        </Form>
      </Modal>
    </div>
  );
}
