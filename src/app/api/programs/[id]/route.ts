// API route for specific health program

import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { db } = await connectToDatabase();
    const collection = db.collection('programs');
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid program ID' }, { status: 400 });
    }
    
    const objectId = new ObjectId(id);
    const program = await collection.findOne({ _id: objectId });
    
    if (!program) {
      return NextResponse.json({ message: 'Program not found' }, { status: 404 });
    }
    
    return NextResponse.json(program);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { db } = await connectToDatabase();
    const collection = db.collection('programs');
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid program ID' }, { status: 400 });
    }
    
    const objectId = new ObjectId(id);
    const body = await request.json();
    
    const updatedData = {
      name: body.name,
      description: body.description,
      startDate: new Date(body.startDate),
      active: body.active
    };
    
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: updatedData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Program not found' }, { status: 404 });
    }
    
    const updatedProgram = await collection.findOne({ _id: objectId });
    return NextResponse.json(updatedProgram);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}