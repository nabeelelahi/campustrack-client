import { Tag } from "antd";

    export const transactionColumns = [
        { 
            title: "ID", 
            dataIndex: "_id", 
            key: "_id",
         },
        { 
            title: "Student", 
            dataIndex: "student", 
            key: "student",
            render: (_: any) => _.name
         },
        { 
            title: "Items", 
            dataIndex: "items", 
            key: "items",
            render: (_:any) => (
                <div>
                    {
                        _.map((i:any) => (<Tag color="green">{i.name}</Tag>))
                    }
                </div>
            )
         },
        { title: "Total", dataIndex: "price", key: "price", render: (_:number) => _},
    ];