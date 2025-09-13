import React from "react";
import { Card, Table, Avatar, Tag, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRequest } from "../hooks/useRequest";
import { classColumns } from "../config/table/class";
import Loader from "../component/shared/Loader";
import { useColors } from "../config/color";
import { userColumns } from "../config";

const TeacherDetails: React.FC = () => {
  const { state } = useLocation()
  const { _id } = useParams()
  const navigate = useNavigate()
  const { data, loading } = useRequest<any[]>('class', 'GET', { type: 'mount', params: { teacher: _id, limit: 100 } })

  return (
    <div className="min-h-screen bg-white text-[#333333] p-6">
      <Card className="shadow-md mb-6 flex items-center gap-6">
        <h1 className="text-2xl font-bold">{state.name}</h1>
        <p className="text-sm text-gray-600">{state.email}</p>
        <p className="text-sm font-medium">Total Classes: {data?.length}</p>
      </Card>

      {/* Classes List */}
      <Card className="shadow-md">
        <h2 className="font-semibold mb-4">Assigned Classes</h2>
        {
          loading ?
            <Loader />
            :
            <div className="grid grid-cols-2 gap-4">
              {
                data?.map((cls) => (
                  <Card key={cls._id} className="shadow-md transition">
                    <h2 className="font-semibold text-lg">{cls._id.substring(0, 6)} - {cls.name}</h2>
                    <p className="mb-3">{cls.students.length} Students</p>
                    <Button onClick={() => navigate(`/class/${cls._id}`, { state: cls })} className="text-white bg-[#084734] px-3 py-2 rounded">View Details</Button>
                  </Card>
                ))
              }
            </div>
        }
      </Card>
    </div>
  );
};

export default TeacherDetails;
