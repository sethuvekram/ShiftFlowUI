// Simple validation schemas for API functions
export const insertLogEntrySchema = {
  parse: (data: any) => {
    // Simple validation - in production, use proper validation library
    if (!data.shiftId || !data.userId || !data.taskDescription) {
      throw new Error('Missing required fields');
    }
    return {
      shiftId: data.shiftId,
      userId: data.userId,
      taskDescription: data.taskDescription,
      remarks: data.remarks || null,
      timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
      priority: data.priority || 'Medium',
      status: data.status || 'Pending'
    };
  }
};

export const insertHandoverSchema = {
  parse: (data: any) => {
    // Simple validation - in production, use proper validation library
    if (!data.shiftId || !data.fromUserId) {
      throw new Error('Missing required fields');
    }
    return {
      shiftId: data.shiftId,
      fromUserId: data.fromUserId,
      toUserId: data.toUserId || null,
      status: data.status || 'pending',
      approvedAt: data.approvedAt ? new Date(data.approvedAt) : null,
      remarks: data.remarks || null,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date()
    };
  }
};
