import Text from "../higherOrder/Text";

type IconButton = {
  onClick: () => void;
  text: string;
  icon: string;
};

export default function IconButton({ onClick, text, icon }: IconButton) {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <img className="w-[25.29px] h-[25.29px] mb-1" src={icon} alt="" />
      <Text
        className="text-[12.48px] text-[#232323] roboto-medium"
        text={text}
      />
    </div>
  );
}
