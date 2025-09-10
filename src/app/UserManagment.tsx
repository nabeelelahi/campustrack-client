import LayoutAdmin from "../component/partial/Layout";
import { userColumns } from "../config";
import AddUserModal from "../component/partial/Modals/AddUser";
import CustomTable from "../component/shared/Table";
import useTableOperations from "../hooks/useTableOperations";

function UserManagment() {
  const {
    open,
    onButtonClick,
    onEditClick,
    data,
    loading,
    cbCancel,
    cbSuccess,
    updateData
  } = useTableOperations('user?role=student')
  return (
    <LayoutAdmin>
      <CustomTable
        title={'Student Management'}
        buttonText={'Add Student'}
        onButtonClick={onButtonClick}
        columns={userColumns(onEditClick)}
        data={data}
        loading={loading}
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
