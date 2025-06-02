'use client';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

export default function ConfirmDeleteDialog({ user, onConfirm }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          className="inline-block bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 transition"
          aria-label={`Delete user ${user.username}`}
        >
          Delete
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
          <AlertDialog.Title className="text-lg font-semibold">Xác nhận xoá</AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-gray-600">
            Bạn có chắc chắn muốn xoá người dùng <strong>{user.username}</strong> không? Thao tác này không thể hoàn tác.
          </AlertDialog.Description>

          <div className="mt-4 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100">
                Huỷ
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                onClick={() => onConfirm(user._id)}
              >
                Xoá
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
