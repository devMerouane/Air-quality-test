import { Schema, Document, model } from 'mongoose';

import { AirQualityCreateDto } from './dtos/air-quality-create.dto';

interface AirQualityDoc extends AirQualityCreateDto, Document {
  createdAt: Date;
  updatedAt: Date;
}

const AirQualitySchema = new Schema(
  {
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    ts: {
      type: Date,
    },
    aqius: {
      type: Number,
    },
    mainus: {
      type: String,
    },
    aqicn: {
      type: Number,
    },
    maincn: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

AirQualitySchema.index({ city: 1, state: 1, coutry: 1 });

const AirQuality = model<AirQualityDoc>('airqualities', AirQualitySchema);

export { AirQuality, AirQualityDoc };
