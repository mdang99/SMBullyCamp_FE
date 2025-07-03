// components/UserTableRow.jsx
import ConfirmDeleteDialog from "components/ConfirmDeleteDialog";

export default function UserTableRow({ user, index, onDeleteUser }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors md:table-row flex flex-col md:flex-row border-b md:border-0">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 md:table-cell">
        {index + 1}
      </td>

      <td className="px-6 py-4 text-sm text-gray-900 font-medium md:table-cell">
        {user.username}
      </td>

      <td className="px-6 py-4 text-sm text-gray-900 font-medium md:table-cell">
        {user.email}
      </td>

      <td className="px-6 py-4 text-sm text-gray-700 font-mono md:table-cell">
        {user.role}
      </td>

      <td className="px-6 py-4 text-right md:table-cell flex justify-end md:block">
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
