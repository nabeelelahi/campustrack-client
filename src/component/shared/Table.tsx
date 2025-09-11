// CustomTable.tsx
import { Table } from "antd";
import { useColors } from "../../config/color";
import { useTheme } from "../../context/Themeprovider";
// import { TableProps } from '../../type';
import Text from "../higherOrder/Text";
import CustomButton from "./CustomButton";

type CustomTableProps = {
  columns?: any;
  loading?: boolean;
  pagination?: any;
  onPaginationChange?: any;
  title?: string | undefined;
  onClick?: (record: any) => void;
  onButtonClick?: () => void;
  buttonText?: string;
  data: any,
  filterOptions?: React.JSX.Element
};

const CustomTable = ({
  title,
  columns,
  loading,
  pagination,
  onPaginationChange,
  onClick,
  onButtonClick,
  buttonText,
  data,
  filterOptions
}: CustomTableProps) => {
  const colors = useColors();
  const { isDarkMode } = useTheme();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Text text={title ?? ""} className="text-2xl  roboto-semibold" />
        {filterOptions ? filterOptions : null}
        {buttonText && (
          <CustomButton
            color={colors.primary}
            title={buttonText}
            onClick={onButtonClick}
          />
        )}
      </div>
      {
        loading ?
          <div>Loading...</div>
          :
          <Table
            className={`w-full overflow-auto ${isDarkMode ? "table-dark-mode" : "table-light-mode"
              }`}
            style={{
              color: colors.TextColor,
              backgroundColor: colors.backgroundColor,
              borderColor: colors.boxshadow,
            }}
            scroll={{ x: 800 }}
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
            onChange={onPaginationChange}
            onRow={(record) => {
              return {
                onClick: () => {
                  onClick?.(record);
                },
              };
            }}
          />
      }
    </div>
  );
};

export default CustomTable;
