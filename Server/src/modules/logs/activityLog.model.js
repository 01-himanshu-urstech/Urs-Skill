import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
      // CREATE_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER, CREATE_ADMIN, etc.
    },

    performedBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      role: {
        type: String,
        enum: ['SUPERADMIN', 'SUBADMIN', 'CUSTOMER'],
        required: true
      }
    },

    target: {
      entity: {
        type: String
        // CUSTOMER, ADMIN, SUBADMIN
      },
      entityId: {
        type: mongoose.Schema.Types.ObjectId
      }
    },

    metadata: {
      type: Object
      // optional extra info (email, phone, role assigned, etc.)
    }
  },
  { timestamps: true }
);

export const ActivityLog = mongoose.model(
  'ActivityLog',
  activityLogSchema
);
