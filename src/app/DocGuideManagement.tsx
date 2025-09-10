import LayoutAdmin from "../component/partial/Layout";
import CustomTable from "../component/shared/Table";
import AddDocGuide from "../component/partial/Modals/AddDocGuide";
import { docGuideColumns } from "../config/table/docGuide";
import useTableOperations from "../hooks/useTableOperations";

export default function DocGuide() {
  const {
    open,
    onButtonClick,
    data,
    loading,
    cbCancel,
    cbSuccess,
    updateData
  } = useTableOperations('doc-guide')
  return (
    <LayoutAdmin>
      <CustomTable
        title="Doc/Guide"
        columns={docGuideColumns}
        data={data}
        loading={loading}
        buttonText="Add Doc/Guide"
        onButtonClick={onButtonClick}
      />
      {(open === 'post' || open === 'patch') && (
        <AddDocGuide
          open={open}
          cbCancel={cbCancel}
          cbSuccess={cbSuccess}
          updateData={updateData as { [key: string]: never; }}
        />
      )}
    </LayoutAdmin>
  );
}
