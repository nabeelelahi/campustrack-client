import React from "react";
import { Card, Table, Button, Tabs, Input, Select, Statistic } from "antd";
import { FileExcelOutlined, FilePdfOutlined, PlusOutlined } from "@ant-design/icons";
import { UserLayout } from "../component/partial/Layout/User";

const { TabPane } = Tabs;
const { Option } = Select;

const StaffDashboard: React.FC = () => {
    // Dummy Data
    const menuItems = [
        { key: "1", name: "Burger", price: 2.5, status: "Available" },
        { key: "2", name: "Fries", price: 1.5, status: "Available" },
        { key: "3", name: "Pizza", price: 3.0, status: "Out of Stock" },
    ];

    const transactions = [
        { key: "1", student: "John Doe", items: "Burger, Coke", total: "$4.0", time: "10:30 AM" },
        { key: "2", student: "Ali Khan", items: "Fries", total: "$1.5", time: "11:00 AM" },
    ];

    const menuColumns = [
        { title: "Item", dataIndex: "name", key: "name" },
        { title: "Price", dataIndex: "price", key: "price" },
        { title: "Status", dataIndex: "status", key: "status" },
        {
            title: "Actions",
            render: () => (
                <div className="flex gap-2">
                    <Button size="small">Edit</Button>
                    <Button size="small" danger>
                        Toggle
                    </Button>
                </div>
            ),
        },
    ];

    const transactionColumns = [
        { title: "Student", dataIndex: "student", key: "student" },
        { title: "Items", dataIndex: "items", key: "items" },
        { title: "Total", dataIndex: "total", key: "total" },
        { title: "Time", dataIndex: "time", key: "time" },
    ];

    return (
        <UserLayout>
            <div className="container mx-auto min-h-screen bg-white text-[#333333] p-6">
                {/* Header Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card className="shadow-md">
                        <Statistic title="Orders Today" value={58} />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic title="Sales Today" value="$240.50" />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic title="Top Item" value="Burger" />
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultActiveKey="1">
                    {/* Point of Sale */}
                    <TabPane tab="💳 Point of Sale" key="1">
                        <Card className="shadow-md">
                            <h2 className="font-semibold mb-4">Record Transaction</h2>

                            <div className="flex gap-4 mb-4">
                                <Input placeholder="Enter Student ID or Scan QR" className="w-1/3" />
                                <Select mode="multiple" placeholder="Select Items" className="w-2/3">
                                    {menuItems.map((item) => (
                                        <Option key={item.key} value={item.name}>
                                            {item.name} (${item.price})
                                        </Option>
                                    ))}
                                </Select>
                            </div>

                            <div className="flex justify-between items-center">
                                <h3 className="font-bold">Total: $5.50</h3>
                                <Button type="primary" className="bg-[#333333] text-white">
                                    Submit Transaction
                                </Button>
                            </div>
                        </Card>
                    </TabPane>

                    {/* Menu Management */}
                    <TabPane tab="🍔 Menu Management" key="2">
                        <Card className="shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold">Manage Menu</h2>
                                <Button icon={<PlusOutlined />} className="bg-[#333333] text-white">
                                    Add Item
                                </Button>
                            </div>
                            <Table dataSource={menuItems} columns={menuColumns} pagination={false} bordered />
                        </Card>
                    </TabPane>

                    {/* Transaction History */}
                    <TabPane tab="📜 Transaction History" key="3">
                        <Card className="shadow-md mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold">Recent Transactions</h2>
                                <div className="flex gap-3">
                                    <Button icon={<FilePdfOutlined />} className="bg-[#333333] text-white">
                                        Export PDF
                                    </Button>
                                    <Button icon={<FileExcelOutlined />} className="bg-green-600 text-white">
                                        Export Excel
                                    </Button>
                                </div>
                            </div>
                            <Table dataSource={transactions} columns={transactionColumns} pagination={{ pageSize: 5 }} bordered />
                        </Card>
                    </TabPane>
                </Tabs>
            </div>
        </UserLayout>
    );
};

export default StaffDashboard;
