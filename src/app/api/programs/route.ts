// API routes for health programs using App Router

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { OptionalId, Document } from 'mongodb';
import { HealthProgram } from '@/models/programs';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('programs');
    
    const programs = await collection.find({}).toArray();
    return NextResponse.json(programs);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('programs');
    
    const body = await request.json();
    
    const program: Partial<HealthProgram> = {
      name: body.name,
      description: body.description,
      startDate: new Date(body.startDate),
      active: body.active
    };
    
    // Validate required fields
    if (!program.name || !program.startDate) {
      return NextResponse.json({ message: 'Name and start date are required' }, { status: 400 });
    }
    
    const result = await collection.insertOne(program as OptionalId<Document>);
    const createdProgram = await collection.findOne({ _id: result.insertedId });
    
    return NextResponse.json(createdProgram, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}