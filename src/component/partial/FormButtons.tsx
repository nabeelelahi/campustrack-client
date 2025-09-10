import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function FormButtons({ onSubmit, path, title = "submit" }: any) {
  const navigate = useNavigate();
  return (
    <div className="flex lg:flex-row flex-col gap-4 mt-5">
      <Button
        onClick={() => navigate(path)}
        className="lg:w-[275px] w-full h-[45px] border border-[#232323] bg-transparent rounded-[5px] text-[14px] text-[#232323] roboto-regular"
      >
        Cancel
      </Button>
      <Button
        onClick={onSubmit}
        className="lg:w-[275px] w-full h-[45px] bg-[#333333] rounded-[5px] text-[14px] text-white roboto-regular"
      >
        {title}
      </Button>
    </div>
  );
}
