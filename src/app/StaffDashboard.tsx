import React, { useState, useEffect } from "react";
import { Card, Table, Button, Tabs, Form, Select, Statistic } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UserLayout } from "../component/partial/Layout/User";
import AddMenuItem from "../component/partial/Modals/AddMenuItem";
import useTableOperations from "../hooks/useTableOperations";
import { useColors } from "../config/color";
import { transactionColumns } from "../config/table/transaction";
import { menuColumns } from "../config/table/menuItem";
import Loader from "../component/shared/Loader";
import { useRequest } from "../hooks/useRequest";

const { TabPane } = Tabs;
const { Option } = Select;

const StaffDashboard: React.FC = () => {
    const {
        open,
        onButtonClick,
        onEditClick,
        data: menuItems,
        loading: menuItemLoading,
        cbCancel,
        cbSuccess,
        updateData
    } = useTableOperations('menu-item')
    const colors = useColors();
    const [form] = Form.useForm()
    const [price, setPrice] = useState(0);
    const [totalSales, setTotalSales] = useState<number>(0)
    const onFinish = (value: object) => {
        execute({
            // @ts-ignore
            body: { ...value, price },
            cbSuccess: (res) => {
                setTransactions((p: any) => [res, ...p])
                form.resetFields()
                setPrice(0)
            }
        })
    }
    const { data: students, loading: studentLoading } = useRequest(
        'user',
        'GET',
        {
            type: 'mount',
            params: { role: 'student', limit: 100 }
        }
    )
    const { loading: formLoading, execute } = useRequest(
        'order',
        'POST',
        {
            type: 'delay'
        }
    )
    const { loading: transactionLoading, data: transactions, setData: setTransactions } = useRequest<any[]>(
        'order',
        'GET',
        {
            type: 'mount', params: { limit: 100 }
        }
    )

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
                {/* Header Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card className="shadow-md">
                        <Statistic title="Total Orders" value={(transactions?.length ?? 0)} />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic title="Total Sales" value={`${totalSales} PKR`} />
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultActiveKey="1">
                    {/* Point of Sale */}
                    <TabPane tab="💳 Point of Sale" key="1">
                        <Card className="shadow-md">
                            <h2 className="font-semibold mb-4">Record Transaction</h2>
                            {
                                (studentLoading || menuItemLoading) ?
                                    <Loader />
                                    :
                                    <Form form={form} onFinish={onFinish} className="grid grid-cols-2 gap-x-4">
                                        <Form.Item name="student" rules={[{ required: true, message: 'Please select a student!' }]}>
                                            <Select placeholder="Select Items" className="w-2/3">
                                                {/* @ts-ignore */}
                                                {students?.map((item) => (
                                                    <Option key={item.key} value={item._id}>
                                                        {item.name} ({item._id})
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name="items" rules={[{ required: true, message: 'Please select an item!' }]}>
                                            <Select
                                                mode="multiple"
                                                placeholder="Select Items"
                                                className="w-2/3"
                                                onChange={(value) => {
                                                    const total = ((menuItems ?? []) as any[])
                                                        ?.filter((item: any) => ((value ?? []) as any[]).includes(item._id))
                                                        .reduce((sum: number, item: any) => sum + Number(item.price), 0);
                                                    setPrice(total)
                                                }}
                                            >
                                                {/* @ts-ignore */}
                                                {menuItems?.map((item) => (
                                                    <Option key={item.key} value={item._id}>
                                                        {item.name} (${item.price})
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <div className="col-span-2 flex justify-between items-center">
                                            <h3 className="font-bold">Total: {price} PKR</h3>
                                            <Button loading={formLoading} htmlType="submit" type="primary" className="bg-[#084734] text-white">
                                                Submit Transaction
                                            </Button>
                                        </div>
                                    </Form>
                            }

                        </Card>
                    </TabPane>

                    {/* Menu Management */}
                    <TabPane tab="🍔 Menu Management" key="2">
                        <Card className="shadow-md">
                            {
                                menuItemLoading ?
                                    <Loader />
                                    :
                                    <>
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="font-semibold">Manage Menu</h2>
                                            <Button onClick={onButtonClick} icon={<PlusOutlined />} className="bg-[#084734] text-white">
                                                Add Item
                                            </Button>
                                        </div>
                                        <Table
                                            className={`w-full overflow-auto table-light-mode`}
                                            style={{
                                                color: colors.TextColor,
                                                backgroundColor: colors.backgroundColor,
                                                borderColor: colors.boxshadow,
                                            }}
                                            scroll={{ x: 800 }}
                                            dataSource={(menuItems ?? []) as any[]}
                                            columns={menuColumns(onEditClick)}
                                        /></>
                            }
                        </Card>
                        {(open === 'post' || open === 'patch') && (
                            <AddMenuItem
                                open={open}
                                cbCancel={cbCancel}
                                cbSuccess={cbSuccess}
                                updateData={updateData as { [key: string]: never; }}
                            />
                        )}
                    </TabPane>

                    {/* Transaction History */}
                    <TabPane tab="📜 Transaction History" key="3">
                        <h2 className="font-semibold">Recent Transactions</h2>
                        <Card className="shadow-md mb-4">
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

export default StaffDashboard;
