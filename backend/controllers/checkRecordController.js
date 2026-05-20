const CheckRecord = require('../models/CheckRecord');
const StaffDevice = require('../models/StaffDevice'); // Adjust path as needed
const LabDevice = require('../models/LabDevice'); // Adjust path as needed
const ExcelJS = require('exceljs');
// Create new check record
exports.createCheckRecord = async (req, res) => {
  try {
    const { 
      itemType, 
      itemId, 
      itemName, 
      checkedBy, 
      checkedDate,
      isChecked,
      isWorking,
      isMissing,
      remarks 
    } = req.body;

    const checkRecord = new CheckRecord({
      itemType,
      itemId,
      itemName,
      checkedBy,
      checkedDate: checkedDate || new Date(),
      isChecked,
      isWorking,
      isMissing,
      remarks
    });

    await checkRecord.save();
    res.status(201).json({
      success: true,
      message: 'Check record created successfully',
      data: checkRecord
    });
  } catch (error) {
    console.error('Error creating check record:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating check record',
      error: error.message
    });
  }
};

// Get all check records
exports.getAllCheckRecords = async (req, res) => {
  try {
    const checkRecords = await CheckRecord.find().sort({ checkedDate: -1 });
    res.status(200).json({
      success: true,
      data: checkRecords
    });
  } catch (error) {
    console.error('Error fetching check records:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching check records',
      error: error.message
    });
  }
};

// Get check records by date
exports.getCheckRecordsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    
    // Create date range for the specified date
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    const checkRecords = await CheckRecord.find({
      checkedDate: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ checkedDate: -1 });
    
    res.status(200).json({
      success: true,
      data: checkRecords
    });
  } catch (error) {
    console.error('Error fetching check records by date:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching check records',
      error: error.message
    });
  }
};

// Delete check record
exports.deleteCheckRecord = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedRecord = await CheckRecord.findByIdAndDelete(id);
    
    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Check record not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Check record deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting check record:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting check record',
      error: error.message
    });
  }
};


exports.exportCheckRecordsExcel = async (req, res) => {
  try {
    const records = await CheckRecord.find().sort({ checkedDate: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Check Records');

    worksheet.columns = [
      { header: 'Item Name', key: 'itemName', width: 20 },
      { header: 'Item Type', key: 'itemType', width: 15 },
      { header: 'Checked By', key: 'checkedBy', width: 20 },
      { header: 'Checked Date', key: 'checkedDate', width: 20 },
      { header: 'Checked', key: 'isChecked', width: 12 },
      { header: 'Working', key: 'isWorking', width: 12 },
      { header: 'Missing', key: 'isMissing', width: 12 },
      { header: 'Remarks', key: 'remarks', width: 25 },
    ];

    records.forEach((record) => {
      worksheet.addRow({
        itemName: record.itemName,
        itemType: record.itemType,
        checkedBy: record.checkedBy,
        checkedDate: record.checkedDate
          ? new Date(record.checkedDate).toLocaleDateString()
          : '',
        isChecked: record.isChecked ? 'Yes' : 'No',
        isWorking: record.isWorking ? 'Yes' : 'No',
        isMissing: record.isMissing ? 'Yes' : 'No',
        remarks: record.remarks || '',
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=check-records.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};