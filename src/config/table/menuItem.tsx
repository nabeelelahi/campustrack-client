import { request } from "../../repositories";
import { Tag, Switch, Button } from "antd";

export const menuColumns = (
    onEditClick: (params: { [key: string]: never }) => void,
    hideLoading?: boolean
) => {
    const onSwithClick = (record: { [key: string]: never }) => {
        request('menu-item', 'PATCH')
            .setRouteParams(`${record._id}`)
            .setBody({ status: !record.status }, 'json')
            .call()
    }
    const record: any =  [
        {
            title: "ID",
            dataIndex: "_id",
            key: "_id",
        },
        { title: "Item", dataIndex: "name", key: "name" },
        { title: "Price", dataIndex: "price", key: "price" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_: boolean) => _ ? <Tag color='green'>Active</Tag> : <Tag color="red" >In-Active</Tag>,
        },
    ]
    if(!hideLoading){
        record.push({
            title: "Action",
            key: "_id",
            render: (_: string, record: { [key: string]: never }) => (
                <div className="flex items-center gap-4">
                    <Button onClick={() => onEditClick(record)}>
                        Edit
                    </Button>
                    <Switch
                        onChange={() => onSwithClick(record)}
                        defaultValue={record.status}
                    />
                </div>
            ),
        },)
    }
    return record;
};