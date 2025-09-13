import React from "react";
import { Card, Statistic, Table } from "antd";
import { UserLayout } from "../component/partial/Layout/User";
import { useRequest } from "../hooks/useRequest";
import { userColumns } from "../config";
import { useColors } from "../config/color";
import { getStorageData } from "../helper";
import Text from "../component/higherOrder/Text";
import { useNavigate } from "react-router-dom";
import Loader from "../component/shared/Loader";

const ParentDashboard: React.FC = () => {
    const colors = useColors();
    const { data, loading } = useRequest<any[]>('user', 'GET', { type: 'mount', params: { role: 'student', parent: getStorageData('user')._id } })
    const navigate = useNavigate();

    return (
        <UserLayout>
            {
                loading ?
                    <Loader />
                    :
                    <div className="container mx-auto min-h-screen bg-white text-[#084734] p-6">
                        {/* Overview Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <Card className='mb-6 shadow-md' >
                                <Statistic title="Children Enrolled" value={data?.length} />
                            </Card>
                        </div>
                        <Card className="shadow-md">
                            <Text text={'My Children'} className="text-2xl  roboto-semibold mb-2" />
                            <Table
                                className={"w-full overflow-auto table-light-mode"}
                                style={{
                                    color: colors.TextColor,
                                    backgroundColor: colors.backgroundColor,
                                    borderColor: colors.boxshadow,
                                }}
                                onRow={(record) => {
                                    return {
                                        onClick: () => {
                                            navigate(`/student/${record._id}`, {state: record})
                                            // you can navigate or do any action here
                                        },
                                        style: { cursor: "pointer" }, // show pointer cursor
                                    };
                                }}
                                dataSource={data ?? []}
                                columns={userColumns(() => { },() => { }, true)}
                                pagination={{ pageSize: 10 }}
                                bordered
                            />
                        </Card>
                    </div>
            }
        </UserLayout>
    );
};

export default ParentDashboard;
