import React from "react";
import { Row } from "antd";
// import SalesChart from "../component/partial/Chart";
// import { useColors } from "../config/color";
import Statistics from "../component/partial/Statistics";
import { statistics } from "../config/dummy-data/home";
// import { PieChart } from "react-minimal-pie-chart";
import LayoutAdmin from "../component/partial/Layout";
import Text from "../component/higherOrder/Text";
import { userColumns } from "../config";
import CustomTable from "../component/shared/Table";
import useTableOperations from "../hooks/useTableOperations";
import Loader from "../component/shared/Loader";

const Dashboard: React.FC = () => {
  const {
    onButtonClick,
    onEditClick,
    data,
    loading,
  } = useTableOperations('user')
  const {
    data: stats,
    loading: statsLoading,
  } = useTableOperations('dashboard')

  console.log(stats, statsLoading)
  return (
    <LayoutAdmin>
      <Text text="Dashboard" className="text-2xl roboto-semibold mb-4" />
      <Row gutter={16}>
        {
          statsLoading ?
            <Loader />
            :
            statistics.map((stat) => (
              // @ts-expect-error @ts-ignore
              <Statistics value={stats?.[stat.key] as number} key={stat.key} {...stat} />
            ))
        }
      </Row>
      <CustomTable
        title={'Users'}
        onButtonClick={onButtonClick}
        columns={userColumns(onEditClick)}
        data={data}
        loading={loading}
      />
      {/* <div className="grid lg:grid-cols-2 gap-4">
        <div
          className="p-6 rounded-[20px] mb-6"
          style={{
            boxShadow: colors.boxshadow,
            backgroundColor: colors.backgroundColor,
          }}
        >
          <Text text="Users" className="text-xl mb-4 roboto-semibold" />
          <SalesChart />
        </div>
        <div
          className="p-6 rounded-[20px] mb-6"
          style={{
            boxShadow: colors.boxshadow,
            backgroundColor: colors.backgroundColor,
          }}
        >
          <Text text="Passports" className="text-xl mb-4 roboto-semibold" />
          <SalesChart />
        </div>
      </div> */}
      {/* <div className="grid lg:grid-cols-2 gap-4">
        <div
          className="p-6 rounded-[20px] mb-6 "
          style={{
            boxShadow: colors.boxshadow,
            backgroundColor: colors.backgroundColor,
          }}
        >
          <Text text="Users" className="text-xl mb-4 roboto-semibold" />
          <PieChart
            className="w-[400px] h-[400px] mx-auto"
            data={[
              { title: "One", value: 10, color: "#E38627" },
              { title: "Two", value: 15, color: "#C13C37" },
              { title: "Three", value: 20, color: "#6A2135" },
            ]}
          />
        </div>
      </div> */}
    </LayoutAdmin>
  );
};

export default Dashboard;
