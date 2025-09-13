import { Button, Switch } from "antd";
import { request } from "../../repositories";

export const userColumns = (onEditClick: (params: { [key: string]: never }) => void, onViewClick: (params: any) => void, hideActions?: boolean) => {
  const onSwithClick = (record: { [key: string]: never }) => {
    request('user', 'patch')
      .setRouteParams(`${record._id}`)
      .setBody({ status: !record.status }, 'json')
      .call()
  }
  const array: any[] = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Mobile no.", dataIndex: "mobile_no" },
    { title: "Role", dataIndex: "role", render: (_: string) => _.toUpperCase() },
    { title: "Address", dataIndex: "address", },
  ];
  if (!hideActions) {
    array.push({
      title: "Action",
      render: (_: string, record: { [key: string]: never }) => (
        <div className="flex gap-4">
          <Button onClick={() => onViewClick(record)}>
            View
          </Button>
          <Button onClick={() => onEditClick(record)}>
            Edit
          </Button>
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
