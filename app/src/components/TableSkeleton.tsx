import React from "react";

const TableSkeleton = () => {
    return (
        <div className="p-6 mx-10">
            <div className="mb-4 flex justify-between items-center">
                <div className="border px-4 py-2 text-lg rounded-sm w-full sm:w-auto">
                    <div className="bg-gray-300 h-8 w-1/3 rounded-sm animate-pulse"></div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2 border-b text-lg">
                                <div className="bg-gray-300 h-6 w-24 rounded-sm animate-pulse"></div>
                            </th>
                            <th className="px-4 py-2 border-b text-lg">
                                <div className="bg-gray-300 h-6 w-32 rounded-sm animate-pulse"></div>
                            </th>
                            <th className="px-4 py-2 border-b text-lg">
                                <div className="bg-gray-300 h-6 w-48 rounded-sm animate-pulse"></div>
                            </th>
                            <th className="px-4 py-2 border-b text-lg">
                                <div className="bg-gray-300 h-6 w-24 rounded-sm animate-pulse"></div>
                            </th>
                            <th className="px-4 py-2 border-b text-lg">
                                <div className="bg-gray-300 h-6 w-32 rounded-sm animate-pulse"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(10)].map((_, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-2">
                                    <div className="bg-gray-300 h-6 w-12 rounded-sm animate-pulse"></div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="bg-gray-300 h-6 w-32 rounded-sm animate-pulse"></div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="bg-gray-300 h-6 w-48 rounded-sm animate-pulse"></div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="bg-gray-300 h-6 w-24 rounded-sm animate-pulse"></div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="bg-gray-300 h-6 w-32 rounded-sm animate-pulse"></div>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="bg-gray-300 h-6 w-32 rounded-sm animate-pulse"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* <div className="mt-4 flex justify-between items-center">
                <div className="bg-gray-300 h-6 w-24 rounded-sm animate-pulse"></div>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                    <div className="bg-gray-300 h-8 w-24 rounded-sm animate-pulse"></div>
                    <div className="bg-gray-300 h-8 w-24 rounded-sm animate-pulse"></div>
                </div>
            </div> */}
        </div>
    );
};

export default TableSkeleton;
