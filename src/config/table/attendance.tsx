export const attendanceColumns = [
    {
        title: "ID",
        dataIndex: "_id",
        key: "_id",
    },
    {
        title: "Class",
        dataIndex: "class",
        key: "student",
        render: (_: any) => _.name
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
    },
    { title: "Created at", dataIndex: "created_at", key: "created_at", render: (_: number) => _ },
];