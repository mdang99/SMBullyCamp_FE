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
}) {
  return (
    <div className="p-8 w-full mx-auto flex-grow">
      <h1 className="text-2xl font-bold mb-4">
        {activeTab === 'users' && 'User management'}
        {activeTab === 'family' && 'Pet catalog management'}
      </h1>
      {activeTab === 'users' && (
        <UserManagement
          users={users}
          onAddUser={onAddUser}
          onDeleteUser={onDeleteUser}
        />
      )}

      {activeTab === 'family' && (
        <FamilyManagement
          families={families}
          onAddFamily={onAddFamily}
          onDeleteFamily={onDeleteFamily}
        />
      )}
    </div>
  )
}
