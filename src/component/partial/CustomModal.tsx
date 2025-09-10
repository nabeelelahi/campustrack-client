import React from "react";
import { Modal } from "antd";
// import { CustomModalProps } from "../../type";

function CustomModal({ children, title, visible, onCancel, onOk }: any) {
  return (
    <Modal open={visible} title={title} onOk={onOk} onCancel={onCancel}>
      {children}
    </Modal>
  );
}

export default React.memo(CustomModal);
