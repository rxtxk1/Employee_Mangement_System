// import path from 'path';
// import Employee from '../models/Employee.js';
// import Leave from '../models/Leave.js';

// const addLeave = async (req, res) => {
//     try {
//   const { userId, leaveType, startDate, endDate, reason} = req.body;
//   const employee = await Employee.findOne({ userId });

//   const newLeave = new Leave({
//     employeeId: employee._id, leaveType, startDate, endDate, reason
//   });

// await newLeave.save();

//   return res.status(200).json({ success: true});

// } catch (error) {
//   return res.status(500).json({ success: false, error: 'leave add server error' });
// }

// }

// const getLeave = async (req, res) => {
//   try {
//     const {id} = req.params;
//     const employee = await Employee.findOne({ userId: id });

//     const leaves = await Leave.find({ employeeId: employee._id });
//     return res.status(200).json({ success: true, leaves });

//   }catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ success: false, error: 'leave add server error' });
//   }
// }

// const getLeaves = async (req, res) => {
//   try {
//     const leaves = await Leave.find().populate({
//       path: 'employeeId',
//       populate: [
//         {
//               path: 'department',
//               select: 'dep_name'
//         },
//         {
//               path: 'userId',
//               select: 'name'
//         },
//       ]
//     })

//     return res.status(200).json({ success: true, leaves });

//   }catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ success: false, error: 'leave add server error' });
//   }
// }

// export {addLeave, getLeave, getLeaves};



import path from 'path';
import Employee from '../models/Employee.js';
import Leave from '../models/Leave.js';
import { profile } from 'console';

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'leave add server error' });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id).populate({
      path: 'employeeId',
      populate: [
        {
          path: 'department',
          select: 'dep_name',
        },
        {
          path: 'userId',
          select: 'name profileImage dob gender maritalStatus',
        },
      ],
    });

    if (!leave) {
      return res.status(404).json({ success: false, error: 'Leave not found' });
    }

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: 'employeeId',
      populate: [
        {
          path: 'department',
          select: 'dep_name',
        },
        {
          path: 'userId',
          select: 'name',
        },
      ],
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: 'leave add server error' });
  }
};

const getLeaveDetail = async (req, res) => {
  try {
    const {id} = req.params;
    const leave = await Leave.findById().populate({
      path: 'employeeId',
      populate: [
        {
          path: 'department',
          select: 'dep_name',
        },
        {
          path: 'userId',
          select: 'name, profileImage'
        },
      ],
    });

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: 'leave add server error' });
  }

};


export { addLeave, getLeave, getLeaves, getLeaveDetail };
