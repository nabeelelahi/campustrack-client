import { Button, Modal } from "antd";
import Text from "../higherOrder/Text";
import React from "react";
// import { useAuth } from '../../hooks'

function LogoutPopup({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const {logout} = useAuth();
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={400}
      centered
    >
      <div className="flex flex-col gap-4">
        <img
          className="w-[98.76px] h-[98.76px] mx-auto"
          src="/images/logout-icon.png"
          alt=""
        />
        <Text
          className="text-[18px] text-[#0F0F0] roboto-medium text-center"
          text={"logout"}
        />
        <div className="flex lg:flex-row flex-col gap-4 mt-5">
          <Button
            onClick={() => setOpen(false)}
            className="lg:w-[275px] w-full h-[50px] border border-[#232323] bg-transparent rounded-[5px] text-[14px] text-[#232323] roboto-regular"
          >
            No
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className="lg:w-[275px] w-full h-[50px] bg-[#1173FF] rounded-[5px] text-[14px] text-white roboto-regular"
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default LogoutPopup;
