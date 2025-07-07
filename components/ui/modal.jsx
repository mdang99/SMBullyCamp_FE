import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        </Transition.Child>

        {/* Panel */}
        <div className="fixed inset-0 z-50 overflow-y-auto px-4 sm:px-6">
          <div className="flex min-h-full items-center justify-center py-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-xl p-6 relative">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none"
                >
                  <span className="text-xl">×</span>
                </button>

                {/* Slot content */}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
