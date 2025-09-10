import LayoutAdmin from "../component/partial/Layout";
import CustomTable from "../component/shared/Table";
import AddArticleModal from "../component/partial/Modals/AddArticle";
import { articleColumns } from "../config/table/article";
import useTableOperations from "../hooks/useTableOperations";

export default function Article() {
  const {
    open,
    onButtonClick,
    onEditClick,
    data,
    loading,
    cbCancel,
    cbSuccess,
    updateData
  } = useTableOperations('article')
  return (
    <LayoutAdmin>
      <CustomTable
        title="Article Management"
        columns={articleColumns(onEditClick)}
        data={data}
        loading={loading}
        buttonText="Add Article"
        onButtonClick={onButtonClick}
      />
      {(open === 'post' || open === 'patch') && (
        <AddArticleModal
          open={open}
          cbCancel={cbCancel}
          cbSuccess={cbSuccess}
          updateData={updateData as { [key: string]: never; }}
        />
      )}
    </LayoutAdmin>
  );
}
