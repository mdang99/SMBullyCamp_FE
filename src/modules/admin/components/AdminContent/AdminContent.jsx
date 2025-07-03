import Pagination from "components/ui/Pagination";
import FamilyManagement from "../FamilyManagement/FamilyManagement";
import UserManagement from "../UserManagement/UserManagement";

export default function AdminContent({
  activeTab,
  users,
  families,
  onAddUser,
  onDeleteUser,
  onAddFamily,
  onDeleteFamily,
  setFamilies,
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="p-8 w-full mx-auto flex-grow">
      <h1 className="text-2xl font-bold mb-4">
        {activeTab === "users" && "Quản lý người dùng"}
        {activeTab === "family" && "Quản lý danh sách thú cưng"}
      </h1>
      {activeTab === "users" && (
        <UserManagement
          users={users}
          onAddUser={onAddUser}
          onDeleteUser={onDeleteUser}
            currentPage={currentPage}
            totalPages={totalPages}
        />
      )}

      {activeTab === "family" && (
        <FamilyManagement
          families={families}
          onAddFamily={onAddFamily}
          onDeleteFamily={onDeleteFamily}
          setFamilies={setFamilies}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
      <div className="p-8 w-full mx-auto flex-grow relative z-50">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
