import LayoutAdmin from "../component/partial/Layout";
import CustomTable from "../component/shared/Table";
import AddClassModal from "../component/partial/Modals/AddClass";
import { classColumns } from "../config/table/class";
import useTableOperations from "../hooks/useTableOperations";

export default function Class() {
  const {
    open,
    onButtonClick,
    onEditClick,
    data,
    loading,
    cbCancel,
    cbSuccess,
    updateData
  } = useTableOperations('class')

  return (
    <LayoutAdmin>
      <CustomTable
        title="Classes"
        columns={classColumns(onEditClick)}
        data={data}
        loading={loading}
        buttonText="Add Class"
        onButtonClick={onButtonClick}
      />
      {(open === 'post' || open === 'patch') && (
        <AddClassModal
          open={open}
          cbCancel={cbCancel}
          cbSuccess={cbSuccess}
          updateData={updateData as { [key: string]: never; }}
        />
      )}
    </LayoutAdmin>
  );
}
