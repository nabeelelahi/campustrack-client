import { EditOutlined } from "@ant-design/icons";
import { request } from "../../repositories";
import { Button, Image, Switch } from "antd";

export const articleColumns = (
  onEditClick: (params: { [key: string]: never }) => void
) => {
  const onSwithClick = (record: { [key: string]: never }) => {
    request('article', 'patch')
      .setRouteParams(`${record._id}`)
      .setBody({ status: !record.status }, 'json')
      .call()
  }
  return [
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (_: string, record: { [key: string]: never }) => (
        <Image src={record.image_url} height={100} />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "_id",
      render: (_: string, record: { [key: string]: never }) => (
        <div className="flex items-center gap-4">
          <Button className="rounded-[8px] h-[40px] bg-[#333333] roboto-medium px-4 text-white border-0 hover:!bg-[#333333]">
            <EditOutlined color="#fff" onClick={() => onEditClick(record)} size={25} />
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
