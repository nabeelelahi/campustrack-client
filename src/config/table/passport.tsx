import { EditOutlined } from "@ant-design/icons";
import { request } from "../../repositories";
import { Switch } from "antd";

export const passportColumns = (onEditClick: (params: { [key: string]: never }) => void) => {
  const onSwithClick = (record: { [key: string]: never }) => {
    request('passport', 'patch')
      .setRouteParams(`${record._id}`)
      .setBody({ status: !record.status }, 'json')
      .call()
  }
  return [{
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Action",
    key: "_id",
    render: (_: string, record: { [key: string]: never }) => (
      <div className="flex gap-4">
        <EditOutlined onClick={() => onEditClick(record)} size={25} />
        <Switch
          onChange={() => onSwithClick(record)}
          defaultValue={record.status}
        />
      </div>
    ),
  },
  ];
}
