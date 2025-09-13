import React from "react";
import { Card, Table } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { userColumns } from "../config";
import { useColors } from "../config/color";
import { UserLayout } from "../component/partial/Layout/User";

const ClassDetails: React.FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const colors = useColors();

    return (
        <UserLayout>
            <div className="container mx-auto min-h-screen bg-white text-[#084734] p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Class Details</h1>
                </div>
                <Card className="shadow-md mb-6" style={{ boxShadow: colors.boxshadow, backgroundColor: colors.backgroundColor }}>
                    <h2 className="font-bold text-lg">{state._id.substring(0, 6)} - {state.name}</h2>
                    <p>Teacher: <span className="font-medium">{state.teacher.name}</span></p>
                    <p>Total Students: <span className="font-medium">{state.students.length}</span></p>
                </Card>
                <Card className="shadow-md" style={{ boxShadow: colors.boxshadow, backgroundColor: colors.backgroundColor }}>
                    <h2 className="font-semibold mb-4">Student</h2>
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
                                    navigate(`/student/${record._id}`, { state: record })
                                    // you can navigate or do any action here
                                },
                                style: { cursor: "pointer" }, // show pointer cursor
                            };
                        }}
                        dataSource={state.students}
                        columns={userColumns(() => { },() => { }, true)}
                        pagination={{ pageSize: 10 }}
                        bordered
                    />
                </Card>
            </div>
        </UserLayout>
    );
};

export default ClassDetails;
