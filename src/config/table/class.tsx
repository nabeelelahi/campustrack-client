import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { request } from "../../repositories";
import { Button, Image, Switch } from "antd";
import { Link } from "react-router-dom";

export const classColumns = (onEditClick: (params: { [key: string]: never }) => void) => {
  const onSwithClick = (record: { [key: string]: never }) => {
    request('class', 'patch')
      .setRouteParams(`${record._id}`)
      .setBody({ status: !record.status }, 'json')
      .call()
  }
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "_id",
      render: (_: string, record: { [key: string]: never }) => (
        <div className="flex items-center gap-4">
          <Link to={`/class/${record._id}?title=${record.title}`} className="rounded-[8px] h-[40px] bg-[#333333] flex items-center roboto-medium px-4 text-white border-0 hover:!bg-[#333333]">
            <EyeOutlined color="#fff" size={25} />
          </Link>
          <Button onClick={() => onEditClick(record)} className="rounded-[8px] h-[40px] bg-[#333333] roboto-medium px-4 text-white border-0 hover:!bg-[#333333]">
            <EditOutlined color="#fff" size={25} />
          </Button>
          <Switch
            onChange={() => onSwithClick(record)}
            defaultValue={record.status}
          />
        </div>
      ),
    },
  ];
}
