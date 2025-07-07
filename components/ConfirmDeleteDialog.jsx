"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function ConfirmDeleteDialog({
  item,
  type,
  labelKey = "name",
  onConfirm,
}) {
  const label = item?.[labelKey] || "this item";
  const itemType =
    type === "user" ? "người dùng" : type === "pet" ? "thú cưng" : "thú cưng";

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          className="inline-block rounded bg-red-500 hover:bg-red-600 text-white px-3 py-1 shadow transition text-sm"
          aria-label={`Delete ${itemType}`}
        >
          Delete
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <AlertDialog.Content className="fixed z-[1000] top-1/2 left-1/2 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg focus:outline-none">
          <AlertDialog.Title className="text-lg font-semibold text-gray-800">
            Xác nhận xoá
          </AlertDialog.Title>

          <AlertDialog.Description className="mt-2 text-sm text-gray-600 leading-relaxed">
            Bạn có chắc chắn muốn xoá{" "}
            <span className="font-semibold text-red-600">{itemType}</span>{" "}
            <span className="font-semibold">{label}</span> không? <br />
            <span className="text-xs text-gray-500">
              Thao tác này không thể hoàn tác.
            </span>
          </AlertDialog.Description>

          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-3 gap-2">
            <AlertDialog.Cancel asChild>
              <button className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition text-sm">
                Huỷ
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                className="w-full sm:w-auto px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition text-sm"
                onClick={() => onConfirm(item._id)}
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
