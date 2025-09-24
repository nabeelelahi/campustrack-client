import React, { useEffect, useState } from "react";
import { Card, Table, Tabs, Statistic, Button, Select } from "antd";
import { UserLayout } from "../component/partial/Layout/User";
import { useRequest } from "../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import { useColors } from "../config/color";
import Loader from "../component/shared/Loader";
import { transactionColumns } from "../config/table/transaction";
import { PlusOutlined } from "@ant-design/icons";
import { attendanceColumns } from "../config/table/attendance";
import { getStorageData } from "../helper";

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
    const { loading: attendanceLoading, data: attendance } = useRequest<any[]>(
        'attendance',
        'GET',
        {
            type: 'mount',
            params: { limit: 100, student: getStorageData('user')?._id }
        }
    )
    const colors = useColors();

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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
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
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {
                                            data?.map((cls) => (
                                                <Card key={cls._id} className="shadow-md hover:shadow-lg transition" style={{ boxShadow: colors.boxshadow, backgroundColor: colors.backgroundColor }}>
                                                    <div className="flex items-center">
                                                        <div className="ms-3">
                                                            <h2 className="font-semibold text-lg">{cls._id.substring(0, 6)} - {cls.name}</h2>
                                                            <p className="mb-3">{cls.students.length} Students</p>
                                                            <Button onClick={() => navigate(`/class/${cls._id}`, { state: cls })} className="text-white bg-[#084734] px-3 py-2 rounded">View Details</Button>
                                                            <Button onClick={() => navigate(`/qr-code/${cls._id}`)} className="text-white bg-[#084734] px-3 py-2 rounded ms-2">QR's</Button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))
                                        }
                                    </div>
                            }
                        </Card>
                    </TabPane>

                    {/* Attendance */}
                    <TabPane tab="📊 Attendance" key="2">
                        <Card className="shadow-md">
                            {
                                attendanceLoading ?
                                    <Loader />
                                    :
                                    <Table
                                        // @ts-ignore
                                        dataSource={attendance}
                                        columns={attendanceColumns}
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
