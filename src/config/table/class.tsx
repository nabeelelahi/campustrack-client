import { request } from "../../repositories";
import { Button, Switch } from "antd";

export const classColumns = (onEditClick: (params: { [key: string]: never }) => void, onViewClick: (params: any) => void) => {
  const onSwithClick = (record: { [key: string]: never }) => {
    request('class', 'patch')
      .setRouteParams(`${record._id}`)
      .setBody({ status: !record.status }, 'json')
      .call()
  }
  return [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Students",
      dataIndex: "students",
      key: "students",
      render: (_: any[]) => _.length
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
      render: (_: any) => _.name
    },
    {
      title: "Action",
      key: "_id",
      render: (_: string, record: { [key: string]: never }) => (
        <div className="flex items-center gap-4">
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
    },
  ];
}
