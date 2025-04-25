// src/models/program.ts

import  { Schema, Document, models, model } from 'mongoose';

export interface HealthProgram extends Document {
  name: string;
  description: string;
  startDate: Date;
  active: boolean;
}

const ProgramSchema = new Schema<HealthProgram>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Check if the model already exists (important for Next.js hot-reloading!)
export const Program = models.Program || model<HealthProgram>('Program', ProgramSchema);
