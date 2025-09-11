import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "antd";
import Text from "../component/higherOrder/Text";
import { useColors } from '../config/color';
import { UserLayout } from "../component/partial/Layout/User";
import { useRequest } from "../hooks/useRequest";
import Loader from "../component/shared/Loader";
import { useNavigate } from "react-router-dom";

const TeacherDashboard: React.FC = () => {
    const colors = useColors();
    const navigate = useNavigate();
    const [counts, setCounts] = useState({ students: 0, classes: 0 })
    const { data, loading } = useRequest<any[]>('class?limit=1000', 'GET', { type: 'mount' })

    useEffect(() => {
        if (!data?.length) return
        setCounts({
            students: data.map(i => i.students).flat().length,
            classes: data.length
        })
    }, [data])

    return (
        <UserLayout>
            {
                loading ?
                    <Loader />
                    :
                    <div className="min-h-screen bg-white text-[#333333] p-6 container mx-auto">
                        {/* Header Stats */}
                        <Row gutter={16}>
                            <Col xs={24} sm={12} lg={12}>
                                <Card className='mb-6' style={{ boxShadow: colors.boxshadow, backgroundColor: colors.backgroundColor }} >
                                    <h2 className='text-xl font-semibold mb-4' style={{ color: colors.TextColor }}>{'Total Class'}</h2>
                                    <p className="text-3xl font-bold" style={{ color: colors.TextColor }}>{counts.classes}</p>
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} lg={12}>
                                <Card className='mb-6' style={{ boxShadow: colors.boxshadow, backgroundColor: colors.backgroundColor }} >
                                    <h2 className='text-xl font-semibold mb-4' style={{ color: colors.TextColor }}>{'Total Students'}</h2>
                                    <p className="text-3xl font-bold" style={{ color: colors.TextColor }}>{counts.students}</p>
                                </Card>
                            </Col>
                        </Row>

                        <Text text={'Classes'} className="text-2xl  roboto-semibold" />
                        <div className="grid grid-cols-2 gap-4">
                            {data?.map((cls) => (
                                <Card key={cls._id} className="shadow-md hover:shadow-lg transition" style={{ boxShadow: colors.boxshadow, backgroundColor: colors.backgroundColor }}>
                                    <h2 className="font-semibold text-lg">{cls._id.substring(0, 6)} - {cls.name}</h2>
                                    <p className="mb-3">{cls.students.length} Students</p>
                                    <Button onClick={() => navigate(`/class/${cls._id}`, { state: cls })} className="text-white bg-[#333333] px-3 py-2 rounded">View Details</Button>
                                </Card>
                            ))}
                        </div>
                    </div>
            }
        </UserLayout>
    );
};

export default TeacherDashboard;
