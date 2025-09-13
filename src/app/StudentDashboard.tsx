import React, { useEffect, useState } from "react";
import { Card, Table, Tabs, Statistic, Button } from "antd";
import { UserLayout } from "../component/partial/Layout/User";
import { useRequest } from "../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import { useColors } from "../config/color";
import Loader from "../component/shared/Loader";
import { transactionColumns } from "../config/table/transaction";

const { TabPane } = Tabs;

const StudentDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [totalSales, setTotalSales] = useState<number>(0)
    const { data, loading } = useRequest<any[]>('class?limit=1000', 'GET', { type: 'mount' });
    const { loading: transactionLoading, data: transactions } = useRequest<any[]>(
        'order',
        'GET',
        {
            type: 'mount',
            params: { limit: 100 }
        }
    )
    const colors = useColors();

    const attendanceColumns = [
        { title: "Date", dataIndex: "date", key: "date" },
        { title: "Subject", dataIndex: "subject", key: "subject" },
        { title: "Status", dataIndex: "status", key: "status" },
    ];

    useEffect(() => {
        // @ts-ignore
        if (transactions?.length) {
            // @ts-ignore
            const total = transactions.reduce((sum, t) => sum + Number(t.price), 0);
            setTotalSales(total)

        }
    }, [transactions])


    return (
        <UserLayout>
            <div className="container mx-auto min-h-screen bg-white text-[#084734] p-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card className="shadow-md">
                        <Statistic title="Attendance %" value="82%" />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic title="Cafeteria Spending" value={`${totalSales} PKR`} />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic title="Enrolled Classes" value={data?.length} />
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultActiveKey="1">
                    {/* Today’s Classes */}
                    <TabPane tab="📚 Classes Enrolled" key="1">
                        <Card className="shadow-md">
                            {
                                loading ?
                                    <Loader />
                                    :
                                    <div className="grid grid-cols-2 gap-4">
                                        {
                                            data?.map((cls) => (
                                                <Card key={cls._id} className="shadow-md hover:shadow-lg transition" style={{ boxShadow: colors.boxshadow, backgroundColor: colors.backgroundColor }}>
                                                    <h2 className="font-semibold text-lg">{cls._id.substring(0, 6)} - {cls.name}</h2>
                                                    <p className="mb-3">{cls.students.length} Students</p>
                                                    <Button onClick={() => navigate(`/class/${cls._id}`, { state: cls })} className="text-white bg-[#084734] px-3 py-2 rounded">View Details</Button>
                                                </Card>
                                            ))
                                        }
                                    </div>
                            }
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
                                dataSource={[]}
                                columns={attendanceColumns}
                                pagination={{ pageSize: 5 }}
                                bordered
                            />
                        </Card>
                    </TabPane>

                    {/* Cafeteria */}
                    <TabPane tab="🍴 Cafeteria Bills" key="3">
                        <Card className="shadow-md">
                            {
                                transactionLoading ?
                                    <Loader />
                                    :
                                    <Table
                                        // @ts-ignore
                                        dataSource={transactions}
                                        columns={transactionColumns}
                                        className={`w-full overflow-auto table-light-mode`}
                                        style={{
                                            color: colors.TextColor,
                                            backgroundColor: colors.backgroundColor,
                                            borderColor: colors.boxshadow,
                                        }}
                                        scroll={{ x: 800 }}
                                    />
                            }
                        </Card>
                    </TabPane>

                </Tabs>
            </div>
        </UserLayout>
    );
};

export default StudentDashboard;
