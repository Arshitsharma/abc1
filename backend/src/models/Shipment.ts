import { Point } from 'geojson';
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IDeliveryAssociate } from './DeliveryAssociate';
import PointSchema from './PointSchema';

export enum ShipmentStatus {
  requested = 'requested',
  deliveryAssociateAssigned = 'deliveryAssociateAssigned',
  pickupLocationReached = 'pickupLocationReached',
  transporting = 'transporting',
  dropLocationReached = 'dropLocationReached',
  delivered = 'delivered',
  cancelled = 'cancelled',
}
export interface IShipment {
  price: any;
  pickupLocation: Point;
  dropLocation: Point;
  userId: string | IUser;
  deliveryAssociateId?: string | IDeliveryAssociate;
  status: ShipmentStatus;
}

export interface IShipmentSchema extends IShipment, Document {}

const ShipmentSchema: Schema = new Schema(
  {
    pickupLocation: {
      type: PointSchema,
      required: true,
    },
    dropLocation: {
      type: PointSchema,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ShipmentStatus),
      required: true,
    },
    deliveryAssociateId: {
      type: Schema.Types.ObjectId,
      ref: 'deliveryassociate',
      required: false,
    },
    price: {
      type: Number, // Add price field to the schema
      required: false, // Not required at the time of creation, as it will be calculated
    }
  },
  { timestamps: true }
);

const ShipmentModel = mongoose.model<IShipmentSchema>(
  'shipment',
  ShipmentSchema
);
export default ShipmentModel;
