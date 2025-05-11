import React from 'react';
import { Checkbox } from 'flowbite-react';

const Distributetoguard = ({
  data = [],
  isCheckedad = {},
  handleCheckboxClickad = () => {}
}) => {
  const uniformItems = [
    { key: 'set', label: 'All Set' },
    { key: 'jacket', label: 'Jackets' },
    { key: 'shirt', label: 'Shirt' },
    { key: 'pant', label: 'Pant' },
    { key: 'shoes', label: 'Shoes' },
    { key: 'belt', label: 'Belt' },
    { key: 'badges', label: 'Badges' },
    { key: 'hat', label: 'Hat' },
    { key: 'caps', label: 'Caps' },
    { key: 'stick', label: 'Stick' },
    { key: 'torch', label: 'Torch' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Guard Dress Distribution</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Employee Name</th>
              {uniformItems.map((item) => (
                <th key={item.key} className="px-2 py-2 whitespace-nowrap">
                  {item.label}
                </th>
              ))}
              <th className="px-3 py-2">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((employee, index) => (
              <tr
                key={employee.id || index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
              >
                <td className="px-2 py-2 font-medium text-gray-900 dark:text-white">{index + 1}</td>
                <td className="px-2 py-2 font-medium text-gray-900 dark:text-white">
                  {employee.name || 'Unknown'}
                </td>
                {uniformItems.map((item) => (
                  <td key={item.key} className="px-1 py-1">
                    <Checkbox
                      id={`${employee.id || index}-${item.key}`}
                      checked={isCheckedad[`${employee.id || index}-${item.key}`] || false}
                      onChange={() => handleCheckboxClickad(employee.id || index, item.key)}
                    />
                  </td>
                ))}
                <td className="px-2 py-2 text-green-600 font-semibold">
                  Rs. {employee.totalCost || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Distributetoguard;
