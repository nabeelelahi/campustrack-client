import React from "react";
import { Card, Table, Tabs, Statistic, Button } from "antd";
// import { Line } from "@ant-design/charts";
import { FilePdfOutlined, FileExcelOutlined, BellOutlined } from "@ant-design/icons";
import { UserLayout } from "../component/partial/Layout/User";

const { TabPane } = Tabs;

const ParentDashboard: React.FC = () => {
    // Dummy Data
    const attendanceTrend = [
        { week: "Week 1", value: 90 },
        { week: "Week 2", value: 85 },
        { week: "Week 3", value: 72 },
        { week: "Week 4", value: 75 },
    ];

    const attendanceRecords = [
        { key: "1", date: "2025-09-01", subject: "Programming Basics", status: "Present" },
        { key: "2", date: "2025-09-02", subject: "Data Structures", status: "Absent" },
        { key: "3", date: "2025-09-03", subject: "Programming Basics", status: "Present" },
    ];

    const cafeteriaRecords = [
        { key: "1", date: "2025-09-01", items: "Burger, Fries", amount: "$4.0" },
        { key: "2", date: "2025-09-02", items: "Pizza, Coke", amount: "$5.5" },
    ];

    const notifications = [
        { key: "1", message: "⚠️ Low attendance in Data Structures (60%)" },
        { key: "2", message: "⚠️ Pending cafeteria bill: $15" },
    ];

    const attendanceColumns = [
        { title: "Date", dataIndex: "date", key: "date" },
        { title: "Subject", dataIndex: "subject", key: "subject" },
        { title: "Status", dataIndex: "status", key: "status" },
    ];

    const cafeteriaColumns = [
        { title: "Date", dataIndex: "date", key: "date" },
        { title: "Items", dataIndex: "items", key: "items" },
        { title: "Amount", dataIndex: "amount", key: "amount" },
    ];

    return (
        <UserLayout>
            <div className="container mx-auto min-h-screen bg-white text-[#333333] p-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card className="shadow-md">
                        <Statistic title="Child" value="Ali Khan (ID: 1002)" />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic title="Attendance %" value="72%" />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic title="Cafeteria Due" value="$15" />
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultActiveKey="1">
                    {/* Attendance Tab */}
                    <TabPane tab="📊 Attendance" key="1">
                        <Card className="shadow-md mb-6">
                            <h2 className="font-semibold mb-4">Weekly Attendance Trend</h2>
                            {/* <Line data={attendanceTrend} xField="week" yField="value" smooth autoFit /> */}
                        </Card>
                        <Card className="shadow-md">
                            <Table
                                dataSource={attendanceRecords}
                                columns={attendanceColumns}
                                pagination={{ pageSize: 5 }}
                                bordered
                            />
                        </Card>
                    </TabPane>

                    {/* Cafeteria Tab */}
                    <TabPane tab="🍴 Cafeteria" key="2">
                        <Card className="shadow-md">
                            <Table
                                dataSource={cafeteriaRecords}
                                columns={cafeteriaColumns}
                                pagination={{ pageSize: 5 }}
                                bordered
                            />
                        </Card>
                    </TabPane>

                    {/* Reports Tab */}
                    <TabPane tab="📜 Reports" key="3">
                        <Card className="shadow-md">
                            <h2 className="font-semibold mb-4">Download Reports</h2>
                            <div className="flex gap-4">
                                <Button icon={<FilePdfOutlined />} className="bg-[#333333] text-white">
                                    Attendance PDF
                                </Button>
                                <Button icon={<FileExcelOutlined />} className="bg-green-600 text-white">
                                    Cafeteria Excel
                                </Button>
                            </div>
                        </Card>
                    </TabPane>

                    {/* Notifications Tab */}
                    <TabPane tab={<span><BellOutlined /> Notifications</span>} key="4">
                        <Card className="shadow-md">
                            <ul className="list-disc pl-6">
                                {notifications.map((note) => (
                                    <li key={note.key} className="mb-2">{note.message}</li>
                                ))}
                            </ul>
                        </Card>
                    </TabPane>
                </Tabs>
            </div>
        </UserLayout>
    );
};

export default ParentDashboard;
