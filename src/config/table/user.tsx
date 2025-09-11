import { Switch } from "antd";
import { request } from "../../repositories";
import { EditOutlined } from '@ant-design/icons'

export const userColumns = (onEditClick: (params: { [key: string]: never }) => void, hideActions?: boolean) => {
  const onSwithClick = (record: { [key: string]: never }) => {
    request('user', 'patch')
      .setRouteParams(`${record._id}`)
      .setBody({ status: !record.status }, 'json')
      .call()
  }
  const array: any[] = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Mobile no.", dataIndex: "mobile_no" },
    { title: "Address", dataIndex: "address", },
  ];
  if (!hideActions) {
    array.push({
      title: "Action",
      render: (_: string, record: { [key: string]: never }) => (
        <div className="flex gap-4">
          <EditOutlined onClick={() => onEditClick(record)} size={25} />
          <Switch
            onChange={() => onSwithClick(record)}
            defaultValue={record.status}
          />
        </div>
      ),
    })
  }
  return array;
};
