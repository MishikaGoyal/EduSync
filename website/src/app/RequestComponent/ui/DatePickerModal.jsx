import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import 'react-day-picker/dist/style.css';

export function DatePickerModal({ isOpen, onClose, onSelect, resourceName }) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleSelect = () => {
    onSelect(format(selectedDate, 'yyyy-MM-dd'));
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Set Delivery Date for {resourceName}
            </Dialog.Title>
            <Dialog.Close className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="h-5 w-5 text-gray-500" />
            </Dialog.Close>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-4">
              Select the maximum delivery date for this resource
            </p>
            <div className="border rounded-lg p-4 bg-gray-50">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date || new Date())}
                disabled={{ before: new Date() }}
                className="mx-auto"
                classNames={{
                  day_selected: "bg-blue-600 text-white hover:bg-blue-600",
                  day_today: "font-bold text-blue-600",
                }}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSelect}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Confirm Date
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}