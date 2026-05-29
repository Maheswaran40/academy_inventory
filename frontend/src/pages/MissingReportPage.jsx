import React, { useState, useEffect } from "react";
import { useMissingReport } from "../context/MissingReportContext";

const MissingReportPage = () => {
  const {
    missingItems,
    summary,
    loading,
    loadMissingItems,
    loadSummary,
    loadMissingItemsByDateRange,
  } = useMissingReport();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    loadMissingItems();
    loadSummary();
  }, []);

  const handleDateFilter = async () => {
    if (startDate && endDate) {
      await loadMissingItemsByDateRange(startDate, endDate);
      setFilterApplied(true);
    } else {
      alert("Please select both start and end dates");
    }
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilterApplied(false);
    loadMissingItems();
  };

  const getDeviceDetails = (item) => {
    if (item.itemType === "staff") {
      const details = [];
      if (item.deviceDetails?.laptop === "Yes") details.push("Laptop");
      if (item.deviceDetails?.mouse === "Yes") details.push("Mouse");
      if (item.deviceDetails?.systemDesktop === "Yes") details.push("System");
      if (item.deviceDetails?.charger === "Yes") details.push("Charger");
      return details.join(", ") || "No devices assigned";
    } else {
      const details = [];
      if (item.deviceDetails?.numberOfSystems > 0)
        details.push(`${item.deviceDetails.numberOfSystems} Systems`);
      if (item.deviceDetails?.numberOfMice > 0)
        details.push(`${item.deviceDetails.numberOfMice} Mice`);
      if (item.deviceDetails?.numberOfLaptops > 0)
        details.push(`${item.deviceDetails.numberOfLaptops} Laptops`);
      if (item.deviceDetails?.numberOfChargers > 0)
        details.push(`${item.deviceDetails.numberOfChargers} Chargers`);
      return details.join(", ") || "No devices assigned";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-red-50 to-orange-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Missing Items Report
        </h1>
        <p className="text-gray-600">
          Track and manage all reported missing devices
        </p>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Missing Items
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {summary.totalMissing}
                </p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                {/* <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg> */}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Staff Devices Missing
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {summary.missingByType?.staff || 0}
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                {/* <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg> */}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Lab Devices Missing
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {summary.missingByType?.lab || 0}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                {/* <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg> */}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Last 30 Days
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {summary.recentMissing || 0}
                </p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                {/* <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg> */}
              </div>
            </div>
          </div>
        </div>
      )}
<hr />
      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          {/* <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg> */}
          Filter by Date Range
        </h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              style={{ margin: "10px 0 10px 5px" }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-gray-700 mb-2 ">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              style={{ margin: "10px 0 10px 10px" }}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full  px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button
              style={{margin:"10px 0px"}}
            onClick={handleDateFilter}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg> */}
            Apply Filter
          </button>
          {filterApplied && (
            <button
              onClick={handleReset}
              className="bg-gray-500  hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg> */}
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Missing Items Table */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-red-50 to-orange-50 border-b-2 border-gray-200">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name/User
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Device Details
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Checked By
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Remarks
                  </th>
                  <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {missingItems.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        {/* <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg> */}
                        <p className="text-gray-500 font-medium">
                          No missing items found
                        </p>
                        <p className="text-gray-400 text-sm">
                          All devices are accounted for
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  missingItems.map((item) => (
                    <tr
                      key={item.recordId}
                      className="hover:bg-red-50 transition-colors duration-150"
                    >
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(item.checkedDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">
                          {item.itemName}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {item.itemId}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            item.itemType === "staff"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {item.itemType === "staff"
                            ? "Staff Device"
                            : "Lab Device"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        <div className="max-w-md">{getDeviceDetails(item)}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {item.checkedBy}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 max-w-xs">
                        {item.remarks || "-"}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            ></path>
                          </svg>
                          Missing
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissingReportPage;
