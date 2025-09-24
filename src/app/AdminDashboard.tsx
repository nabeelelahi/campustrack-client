import React, { useEffect, useState } from "react";
import { Card, Table, Tabs, Statistic, Button, Select } from "antd";
import { FilePdfOutlined, FileExcelOutlined, PlusOutlined } from "@ant-design/icons";
import { UserLayout } from "../component/partial/Layout/User";
import useTableOperations from "../hooks/useTableOperations";
import { useColors } from "../config/color";
import { useNavigate } from "react-router-dom";
import { userColumns } from "../config";
import AddUserModal from "../component/partial/Modals/AddUser";
import { classColumns } from "../config/table/class";
import Loader from "../component/shared/Loader";
import AddClassModal from "../component/partial/Modals/AddClass";
import { useRequest } from "../hooks/useRequest";
import { menuColumns } from "../config/table/menuItem";
import { transactionColumns } from "../config/table/transaction";

const { TabPane } = Tabs;

const AdminDashboard: React.FC = () => {
    const colors = useColors()
    const [stats, setStats] = useState<{ [key: string]: number }>({
        student: 0,
        teacher: 0,
        sales: 0,
        classes: 0
    });
    const {
        open,
        onButtonClick,
        onEditClick,
        data,
        loading,
        cbCancel,
        cbSuccess,
        updateData,
        onFilterChange
    } = useTableOperations('user')
    const {
        open: classOpen,
        onButtonClick: onClassButtonClick,
        onEditClick: onClassEditClick,
        data: classes,
        loading: classLoading,
        cbCancel: classCbCancel,
        cbSuccess: classCbSuccess,
        updateData: classUpdateData,
    } = useTableOperations('class')
    const {
        data: menu,
        loading: menuLoading
    } = useRequest<any[]>('menu-item', 'GET', { type: 'mount' })
    const { loading: transactionLoading, data: transactions } = useRequest<any[]>(
        'order',
        'GET',
        {
            type: 'mount', params: { limit: 100 }
        }
    )

    const navigate = useNavigate()

    const onViewClick = (record: any) => {
        navigate(`/class/${record._id}`, { state: record })
    }

    const onUserViewClick = (record: any) => {
        navigate(`/${record.role}/${record._id}`, { state: record })
    }

    const onRoleChange = (value: string) => {
        console.log(value)
        onFilterChange({ role: value })
    }

    useEffect(() => {
        // @ts-ignore
        if (data.length) {
            setStats(p => ({
                ...p,
                // @ts-ignore
                student: (data.filter(i => i.role === "student") ?? []).length,
                // @ts-ignore
                teacher: (data.filter(i => i.role === 'teacher') ?? []).length
            }))
        }
    }, [data])

    useEffect(() => {
        // @ts-ignore
        if (classes.length) {
            setStats(p => ({
                ...p,
                // @ts-ignore
                classes: classes.length
            }))
        }
    }, [classes])

    useEffect(() => {
        // @ts-ignore
        if (transactions?.length) {
            // @ts-ignore
            const total = (transactions.reduce((sum, t) => sum + Number(t.price), 0) ?? 0);
            setStats(p => ({ ...p, sales: total }))

        }
    }, [transactions])


    return (
        <UserLayout>
            <div className="mx-auto container min-h-screen bg-white text-[#333333] p-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <Card className="shadow-md">
                        <Statistic title="Total Students" value={stats.student} />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic title="Total Teachers" value={stats.teacher} />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic title="Total Classes" value={stats.classes} />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic title="Cafetaria Sales" value={`${stats.sales} PKR`} />
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultActiveKey="1">
                    {/* Students Tab */}
                    <TabPane tab="👨‍🎓 User" key="1">
                        <Card className="shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold">Manage Users</h2>
                                <div>
                                    <Select
                                        options={[
                                            { label: 'Teacher', value: 'teacher' },
                                            { label: 'Student', value: 'student' },
                                            { label: 'Parent', value: 'parent' },
                                            { label: 'Staff', value: 'staff' },
                                        ]}
                                        onChange={onRoleChange}
                                        placeholder='Please select a role'
                                        className="mx-2"
                                    />
                                    <Button onClick={onButtonClick} icon={<PlusOutlined />} className="bg-[#333333] text-white">
                                        Add User
                                    </Button>
                                </div>
                            </div>
                            {
                                loading ?
                                    <Loader />
                                    :
                                    <Table
                                        className={"w-full overflow-auto table-light-mode"}
                                        style={{
                                            color: colors.TextColor,
                                            backgroundColor: colors.backgroundColor,
                                            borderColor: colors.boxshadow,
                                        }}
                                        // @ts-ignore
                                        dataSource={data}
                                        columns={userColumns(onEditClick, onUserViewClick, false)}
                                        pagination={{ pageSize: 10 }}
                                        bordered
                                    />
                            }
                        </Card>
                        {(open === 'post' || open === 'patch') && (
                            <AddUserModal
                                open={open}
                                cbCancel={cbCancel}
                                cbSuccess={cbSuccess}
                                updateData={updateData as { [key: string]: never; }}
                            />
                        )}
                    </TabPane>

                    {/* Classes Tab */}
                    <TabPane tab="🏫 Classes" key="3">
                        <Card className="shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold">Manage Classes</h2>
                                <Button onClick={onClassButtonClick} icon={<PlusOutlined />} className="bg-[#333333] text-white">
                                    Add Class
                                </Button>
                            </div>
                            {
                                classLoading ?
                                    <Loader />
                                    :
                                    <Table
                                        className={"w-full overflow-auto table-light-mode"}
                                        style={{
                                            color: colors.TextColor,
                                            backgroundColor: colors.backgroundColor,
                                            borderColor: colors.boxshadow,
                                        }}
                                        // @ts-ignore
                                        dataSource={classes}
                                        columns={classColumns(onClassEditClick, onViewClick)}
                                        pagination={{ pageSize: 10 }}
                                        bordered
                                    />
                            }
                        </Card>
                        {(classOpen === 'post' || classOpen === 'patch') && (
                            <AddClassModal
                                open={classOpen}
                                cbCancel={classCbCancel}
                                cbSuccess={classCbSuccess}
                                updateData={classUpdateData as { [key: string]: never; }}
                            />
                        )}
                    </TabPane>

                    {/* Cafeteria Tab */}
                    <TabPane tab="🍴 Menu" key="4">
                        <Card className="shadow-md">
                            <h2 className="font-semibold mb-4">Menu Items</h2>
                            {
                                menuLoading ?
                                    <Loader />
                                    :
                                    <Table
                                        className={`w-full overflow-auto table-light-mode`}
                                        style={{
                                            color: colors.TextColor,
                                            backgroundColor: colors.backgroundColor,
                                            borderColor: colors.boxshadow,
                                        }}
                                        scroll={{ x: 800 }}
                                        dataSource={(menu ?? []) as any[]}
                                        columns={menuColumns(onEditClick, true)}
                                    />
                            }
                        </Card>
                    </TabPane>

                    {/* Reports Tab */}
                    <TabPane tab="📊 Orders" key="5">
                        <Card className="shadow-md">
                            <h2 className="font-semibold mb-4">Recent Transactions</h2>
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

export default AdminDashboard;
