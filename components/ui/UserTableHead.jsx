export default function UserTableHead() {
  return (
    <thead className="bg-gray-100 md:table-header-group hidden">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
          ID
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Username
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Email
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Role
        </th>
        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Actions
        </th>
      </tr>
    </thead>
  );
}
