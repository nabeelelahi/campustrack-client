import { Button, Switch } from "antd";
import { request } from "../../repositories";
import { EyeOutlined } from "@ant-design/icons";

const onSwithClick = (record: { [key: string]: never }) => {
  request("doc-guide", "patch")
    .setRouteParams(`${record._id}`)
    .setBody({ status: !record.status }, "json")
    .call();
};

export const docGuideColumns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Sub Title",
    dataIndex: "sub_title",
    key: "sub_title",
  },
  {
    title: "Action",
    key: "_id",
    render: (_: string, record: { [key: string]: never }) => (
      <div className="flex items-center gap-4">
        <Switch
          onChange={() => onSwithClick(record)}
          defaultValue={record.status}
        />
        <Button onClick={() => window.open(record.file_url)} className="rounded-[8px] h-[40px] bg-[#333333] roboto-medium px-4 text-white border-0 hover:!bg-[#333333]">
          <EyeOutlined color="#fff" size={25} />
        </Button>
      </div>
    ),
  },
];
