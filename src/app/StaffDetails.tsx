import React from "react";
import { Card, Table } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { useRequest } from "../hooks/useRequest";
import { transactionColumns } from "../config/table/transaction";
import { useColors } from "../config/color";
import Loader from "../component/shared/Loader";

const StaffDetails: React.FC = () => {
  const { state } = useLocation()
  const { _id } = useParams()
  const colors = useColors()
  const { data, loading } = useRequest<any[]>(
    'order',
    'GET',
    { type: "mount", params: { staff_member: _id } }
  )

  return (
    <div className="min-h-screen bg-white text-[#333333] p-6">
      {/* Staff Info */}
      <Card className="shadow-md mb-6 flex items-center gap-6">
        <h1 className="text-2xl font-bold">{state.name}</h1>
        <p className="text-sm text-gray-600">{state.email}</p>
        <p className="text-sm font-medium">Orders Created: {data?.length}</p>  
          {/* <p className="text-sm font-medium">Menu Items Added: {staff.menuItemsCount}</p> */} 
      </Card>

      {/* Orders List */}
      <Card className="shadow-md mb-6">
        <h2 className="font-semibold mb-4">Orders Created</h2>
        {
          loading ?
            <Loader />
            :
            <Table
              columns={transactionColumns}
              className={`w-full overflow-auto table-light-mode`}
              style={{
                color: colors.TextColor,
                backgroundColor: colors.backgroundColor,
                borderColor: colors.boxshadow,
              }}
              // @ts-ignore
              dataSource={data}
              // @ts-ignore
              columns={transactionColumns}
              pagination={{ pageSize: 5 }}
              bordered
            />
        }
      </Card>
    </div>
  );
};

export default StaffDetails;
