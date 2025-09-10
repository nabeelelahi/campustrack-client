import LayoutAdmin from "../component/partial/Layout";
import { passportColumns } from "../config/table/passport";
import CustomTable from "../component/shared/Table";
import useTableOperations from "../hooks/useTableOperations";
import AddPassportModal from "../component/partial/Modals/AddPassport";

function Passport() {
  const {
    open,
    onButtonClick,
    onEditClick,
    data,
    loading,
    cbCancel,
    cbSuccess,
    updateData
  } = useTableOperations('passport')
  return (
    <LayoutAdmin>
      <CustomTable
        title={'Passports Management'}
        buttonText={'Add Passports'}
        onButtonClick={onButtonClick}
        columns={passportColumns(onEditClick)}
        data={data}
        loading={loading}
      />
      {(open === 'post' || open === 'patch') && (
        <AddPassportModal
          open={open}
          cbCancel={cbCancel}
          cbSuccess={cbSuccess}
          updateData={updateData as { [key: string]: never; }}
        />
      )}
    </LayoutAdmin>
  );
}

export default Passport;
