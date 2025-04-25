// POST /api/clients/[id]/enroll
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('clients');

    const { programId } = await request.json();

    if (!programId) {
      return NextResponse.json({ message: 'Program ID is required' }, { status: 400 });
    }

    const updatedClient = await collection.findOneAndUpdate(
      { _id: new ObjectId( (await params).id) },
      { $addToSet: { enrolledPrograms: programId } },
      { returnDocument: 'after' } // or use `{ returnDocument: 'after' }` for MongoDB driver v4
    );

    if (!updatedClient || !updatedClient.value) {
      return NextResponse.json({ message: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json(updatedClient.value);
  } catch (error) {
    console.error('Error enrolling client:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

