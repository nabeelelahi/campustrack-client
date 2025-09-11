import LayoutAdmin from "../component/partial/Layout/Admin";
import { userColumns } from "../config";
import AddUserModal from "../component/partial/Modals/AddUser";
import CustomTable from "../component/shared/Table";
import useTableOperations from "../hooks/useTableOperations";
import { Select } from "antd";
import BaseInput from "../component/shared/BaseInput";

function UserManagment() {
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
  return (
    <LayoutAdmin>
      <CustomTable
        title={'User Management'}
        buttonText={'Add User'}
        onButtonClick={onButtonClick}
        columns={userColumns(onEditClick)}
        data={data}
        loading={loading}
        filterOptions={
          <div className="d-flex">
            <Select
              placeholder="Please select a role to filter"
              className="w-[350px] !rounded-[10px] h-[44px]"
              options={[
                { value: 'student', student: 'Student' },
                { value: 'teacher', student: 'Teacher' },
                { value: 'parent', student: 'Parent' },
                { value: 'staff', student: 'Staff' },
              ]}
              onChange={(value) => onFilterChange({ role: value })} />
          </div>}
      />
      {(open === 'post' || open === 'patch') && (
        <AddUserModal
          open={open}
          cbCancel={cbCancel}
          cbSuccess={cbSuccess}
          updateData={updateData as { [key: string]: never; }}
        />
      )}
    </LayoutAdmin>
  );
}

export default UserManagment;
