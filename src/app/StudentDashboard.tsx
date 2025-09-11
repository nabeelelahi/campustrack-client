import React from "react";
import { Card, Table, Tabs, Statistic } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { UserLayout } from "../component/partial/Layout/User";

const { TabPane } = Tabs;

const StudentDashboard: React.FC = () => {
    // Dummy Data
    const todaysClasses = [
        { key: "1", time: "9-10 AM", subject: "Programming Basics", teacher: "Mr. Smith", status: "Ongoing" },
        { key: "2", time: "10-11 AM", subject: "Data Structures", teacher: "Ms. Jane", status: "Upcoming" },
        { key: "3", time: "12-1 PM", subject: "Mathematics", teacher: "Dr. Ali", status: "Upcoming" },
    ];

    const attendanceTrend = [
        { month: "Jan", value: 85 },
        { month: "Feb", value: 78 },
        { month: "Mar", value: 82 },
        { month: "Apr", value: 88 },
        { month: "May", value: 80 },
    ];

    const attendanceRecords = [
        { key: "1", date: "2025-09-01", subject: "Programming Basics", status: "Present" },
        { key: "2", date: "2025-09-02", subject: "Data Structures", status: "Absent" },
        { key: "3", date: "2025-09-03", subject: "Mathematics", status: "Present" },
    ];

    const cafeteriaRecords = [
        { key: "1", date: "2025-09-01", items: "Burger, Fries", amount: "$4.0" },
        { key: "2", date: "2025-09-02", items: "Pizza, Coke", amount: "$5.5" },
    ];

    const notifications = [
        { key: "1", message: "⚠️ Low attendance in Mathematics (68%)" },
        { key: "2", message: "📢 Midterm exams start from Oct 10" },
    ];

    // Table Columns
    const classColumns = [
        { title: "Time", dataIndex: "time", key: "time" },
        { title: "Subject", dataIndex: "subject", key: "subject" },
        { title: "Teacher", dataIndex: "teacher", key: "teacher" },
        { title: "Status", dataIndex: "status", key: "status" },
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
                        <Statistic title="Attendance %" value="82%" />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic title="Cafeteria Balance" value="$20.00" />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic title="Classes Today" value={3} />
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultActiveKey="1">
                    {/* Today’s Classes */}
                    <TabPane tab="📚 Today’s Classes" key="1">
                        <Card className="shadow-md">
                            <Table
                                dataSource={todaysClasses}
                                columns={classColumns}
                                pagination={false}
                                bordered
                            />
                        </Card>
                    </TabPane>

                    {/* Attendance */}
                    <TabPane tab="📊 Attendance" key="2">
                        <Card className="shadow-md mb-6">
                            <h2 className="font-semibold mb-4">Monthly Attendance Trend</h2>
                            {/* <Line data={attendanceTrend} xField="month" yField="value" smooth autoFit /> */}
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

                    {/* Cafeteria */}
                    <TabPane tab="🍴 Cafeteria" key="3">
                        <Card className="shadow-md">
                            <Table
                                dataSource={cafeteriaRecords}
                                columns={cafeteriaColumns}
                                pagination={{ pageSize: 5 }}
                                bordered
                            />
                        </Card>
                    </TabPane>

                    {/* Notifications */}
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

export default StudentDashboard;
