import React from "react";
import { Card, Table, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ParentDetails: React.FC = () => {
  // Dummy Parent Data
  const parent = {
    name: "Mr. Ahmed Khan",
    email: "ahmed.khan@example.com",
    mobile: "+92 300 9876543",
    address: "House 45, Gulberg, Lahore",
    childrenCount: 2,
    image: "",
  };

  // Dummy Children Data
  const children = [
    { key: "1", name: "Ali Khan", rollNo: "STU1001", class: "CSC101", attendance: "85%" },
    { key: "2", name: "Sara Khan", rollNo: "STU1002", class: "CSC102", attendance: "90%" },
  ];

  const childColumns = [
    { title: "Student Name", dataIndex: "name", key: "name" },
    { title: "Roll No", dataIndex: "rollNo", key: "rollNo" },
    { title: "Class", dataIndex: "class", key: "class" },
    { title: "Attendance %", dataIndex: "attendance", key: "attendance" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#333333] p-6">
      {/* Parent Info */}
      <Card className="shadow-md mb-6 flex items-center gap-6">
        <Avatar
          size={100}
          src={parent.image || undefined}
          icon={!parent.image ? <UserOutlined /> : undefined}
          className="bg-gray-500"
        />
        <div>
          <h1 className="text-2xl font-bold">{parent.name}</h1>
          <p className="text-sm text-gray-600">{parent.email}</p>
          <p className="text-sm text-gray-600">{parent.mobile}</p>
          <p className="text-sm text-gray-600">Address: {parent.address}</p>
          <p className="text-sm font-medium">Total Children: {parent.childrenCount}</p>
        </div>
      </Card>

      {/* Children List */}
      <Card className="shadow-md">
        <h2 className="font-semibold mb-4">Registered Students</h2>
        <Table
          dataSource={children}
          columns={childColumns}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default ParentDetails;
