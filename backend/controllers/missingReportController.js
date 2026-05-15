const CheckRecord = require('../models/CheckRecord');
const StaffDevice = require('../models/StaffDevice');
const LabDevice = require('../models/LabDevice');

// Get all missing items with details
exports.getMissingItems = async (req, res) => {
  try {
    // Find all check records where isMissing is true
    const missingRecords = await CheckRecord.find({ 
      isMissing: true 
    }).sort({ checkedDate: -1 });

    // Get detailed information for each missing item
    const missingItemsWithDetails = await Promise.all(
      missingRecords.map(async (record) => {
        let deviceDetails = null;
        
        if (record.itemType === 'staff') {
          deviceDetails = await StaffDevice.findById(record.itemId);
        } else {
          deviceDetails = await LabDevice.findById(record.itemId);
        }
        
        return {
          recordId: record._id,
          itemType: record.itemType,
          itemId: record.itemId,
          itemName: record.itemName,
          checkedBy: record.checkedBy,
          checkedDate: record.checkedDate,
          remarks: record.remarks,
          deviceDetails: deviceDetails
        };
      })
    );

    res.status(200).json({
      success: true,
      count: missingItemsWithDetails.length,
      data: missingItemsWithDetails
    });
  } catch (error) {
    console.error('Error fetching missing items:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching missing items',
      error: error.message
    });
  }
};

// Get missing items by date range
exports.getMissingItemsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    
    const missingRecords = await CheckRecord.find({
      isMissing: true,
      checkedDate: {
        $gte: start,
        $lte: end
      }
    }).sort({ checkedDate: -1 });
    
    const missingItemsWithDetails = await Promise.all(
      missingRecords.map(async (record) => {
        let deviceDetails = null;
        
        if (record.itemType === 'staff') {
          deviceDetails = await StaffDevice.findById(record.itemId);
        } else {
          deviceDetails = await LabDevice.findById(record.itemId);
        }
        
        return {
          recordId: record._id,
          itemType: record.itemType,
          itemId: record.itemId,
          itemName: record.itemName,
          checkedBy: record.checkedBy,
          checkedDate: record.checkedDate,
          remarks: record.remarks,
          deviceDetails: deviceDetails
        };
      })
    );
    
    res.status(200).json({
      success: true,
      count: missingItemsWithDetails.length,
      data: missingItemsWithDetails
    });
  } catch (error) {
    console.error('Error fetching missing items by date:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching missing items',
      error: error.message
    });
  }
};

// Get missing items summary statistics
exports.getMissingItemsSummary = async (req, res) => {
  try {
    const totalMissing = await CheckRecord.countDocuments({ isMissing: true });
    
    const missingByType = await CheckRecord.aggregate([
      { $match: { isMissing: true } },
      { $group: {
          _id: '$itemType',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const recentMissing = await CheckRecord.find({ 
      isMissing: true,
      checkedDate: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
      }
    }).countDocuments();
    
    res.status(200).json({
      success: true,
      data: {
        totalMissing,
        recentMissing,
        missingByType: {
          staff: missingByType.find(t => t._id === 'staff')?.count || 0,
          lab: missingByType.find(t => t._id === 'lab')?.count || 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching missing items summary:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching summary',
      error: error.message
    });
  }
};