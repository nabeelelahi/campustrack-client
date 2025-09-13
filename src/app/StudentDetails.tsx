import { Tabs, Card, Table } from "antd";
import { UserLayout } from "../component/partial/Layout/User";
import { useLocation, useParams } from "react-router-dom";
import { useRequest } from "../hooks/useRequest";
import { useColors } from "../config/color";
import Loader from "../component/shared/Loader";
import { transactionColumns } from "../config/table/transaction";

const { TabPane } = Tabs;

export default function StudentDetail() {

    const { _id } = useParams();
    const colors = useColors();
    const { state } = useLocation()
    const { data: classes, loading: classLoading } = useRequest<any[]>(
        'class',
        'GET',
        { type: "mount", params: { students: _id } }
    )
    const { loading: transactionLoading, data: transactions } = useRequest(
        'order',
        'GET',
        {
            type: 'mount',
            params: { student: _id, limit: 100 }
        }
    )

    return (
        <UserLayout>
            <div className="p-6 container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Student Details</h1>
                <Card className="shadow-md mb-6">
                    <h2 className="font-bold text-lg">{state.name}</h2>
                    <p>Email: <span className="font-medium">{state.email}</span></p>
                    <p>Classes Enrolled: <span className="font-medium">{(classes ?? []).length}</span></p>
                </Card>
                <Card className="shadow-md rounded-2xl">
                    <Tabs defaultActiveKey="1" className="custom-tabs">
                        <TabPane tab="Cafeteria Bill" key="1">
                            <div className="p-4">
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
                            </div>
                        </TabPane>

                        <TabPane tab="Classes" key="2">
                            {
                                classLoading ?
                                    <Loader />
                                    :
                                    <div className="grid grid-cols-2 gap-4">
                                        {classes?.map((cls) => (
                                            <Card key={cls._id} className="shadow-md hover:shadow-lg transition" style={{ boxShadow: colors.boxshadow, backgroundColor: colors.backgroundColor }}>
                                                <h2 className="font-semibold text-lg">{cls._id.substring(0, 6)} - {cls.name}</h2>
                                                <p>{cls.students.length} Students</p>
                                                <p>Teacher: {cls.teacher.name}</p>
                                                {/* <Button onClick={() => navigate(`/class/${cls._id}`, { state: cls })} className="text-white bg-[#084734] px-3 py-2 rounded">View Details</Button> */}
                                            </Card>
                                        ))}
                                    </div>
                            }
                        </TabPane>

                        <TabPane tab="Check Ins/Outs" key="3">
                            <div className="p-4">
                                {/* Check In/Out Content */}
                                <h2 className="text-lg font-medium mb-2">Check Ins/Outs</h2>
                                <p className="text-gray-600">Show student entry and exit logs here.</p>
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        </UserLayout>
    );
}
