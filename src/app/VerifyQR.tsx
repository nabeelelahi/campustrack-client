import React, { useEffect, useState } from "react";
import { UserLayout } from "../component/partial/Layout/User";
import { Card } from "antd";
import { getStorageData } from "../helper";
import { request } from "../repositories";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Loader from "../component/shared/Loader";

const VerifyQR: React.FC = () => {
    const { _id, action } = useParams();
    const [loading, setLoading] = useState(false)
    const [user] = useState(getStorageData('user'));
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.values(user ?? {}).length) {
            setLoading(true)
            request('attendance', 'POST')
                .setAuth(true)
                .setBody({ class: _id, action })
                .onSuccess(() => {
                    setLoading(false)
                    setTimeout(() => {
                        navigate(`/${user.role}/dashboard`)
                    }, 1000)
                })
                .call()
        }
        else {
            alert('Please login here to check-in')
            localStorage.clear();
            location.href = '/login'
        }
    }, [user])

    return (
        <UserLayout>
            {
                loading ?
                    <Loader />
                    :
                    <div className="min-h-screen bg-white text-[#333333] p-6">
                        {/* Parent Info */}
                        <img src="https://img.freepik.com/free-psd/check-symbol-isolated_23-2150500363.jpg?semt=ais_hybrid&w=740&q=80"></img>
                        <Card className="shadow-md mb-6 flex items-center gap-6">
                            <h3>Check-in Successfull</h3>
                        </Card>
                    </div>
            }
        </UserLayout>
    );
};

export default VerifyQR;
