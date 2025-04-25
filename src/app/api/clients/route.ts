import {  NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { NextRequest } from 'next/server';

interface Client {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  contactNumber: string;
  address: string;
  registrationDate: Date;
  enrolledPrograms: string[];
}


export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('clients');
    
    const clients = await collection.find({}).toArray();
    return NextResponse.json(clients);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('clients');

    const body = await request.json(); // get the data sent from frontend
    const newClient: Client = {
      firstName: body.firstName,
      lastName: body.lastName,
      dateOfBirth: new Date(body.dateOfBirth),
      gender: body.gender,
      contactNumber: body.contactNumber,
      address: body.address,
      registrationDate: new Date(), // Automatically set registration date
      enrolledPrograms: body.enrolledPrograms || [], // Default to empty array if not provided
    };

    const result = await collection.insertOne(newClient);

    return NextResponse.json({ success: true, clientId: result.insertedId });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
