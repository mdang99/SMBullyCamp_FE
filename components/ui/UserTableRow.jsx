import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

export default function UserTableRow({ user, index, onDeleteUser, isMobile }) {
  if (isMobile) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
        <div className="text-sm">
          <div className="flex justify-between mb-1">
            <span className="font-semibold text-gray-500">ID:</span>
            <span>{index + 1}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold text-gray-500">Username:</span>
            <span>{user.username}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold text-gray-500">Email:</span>
            <span className="break-all text-right">{user.email}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-500">Role:</span>
            <span>{user.role}</span>
          </div>
        </div>
        <div className="text-right">
          <ConfirmDeleteDialog
            item={user}
            type="user"
            labelKey="username"
            onConfirm={onDeleteUser}
          />
        </div>
      </div>
    );
  }

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
        {user.username}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
      <td className="px-6 py-4 text-sm text-gray-700 font-mono">{user.role}</td>
      <td className="px-6 py-4 text-right">
        <ConfirmDeleteDialog
          item={user}
          type="user"
          labelKey="username"
          onConfirm={onDeleteUser}
        />
      </td>
    </tr>
  );
}
