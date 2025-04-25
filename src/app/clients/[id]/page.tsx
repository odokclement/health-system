// Client profile page showing details and program enrollments

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Client, HealthProgram } from '../../../models/types';

export default function ClientProfile() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [client, setClient] = useState<Client | null>(null);
  const [programs, setPrograms] = useState<HealthProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      
      try {
        // Fetch client data
        const clientRes = await fetch(`/api/clients/${id}`);
        const clientData = await clientRes.json();
        setClient(clientData);
        
        // Fetch all available programs
        const programsRes = await fetch('/api/programs');
        const programsData = await programsRes.json();
        setPrograms(programsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [id]);

  const handleEnrollProgram = async () => {
    if (!selectedProgram || !client) return;
    
    try {
      const res = await fetch(`/api/clients/${client._id}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ programId: selectedProgram }),
      });
      
      if (res.ok) {
        const updatedClient = await res.json();
        setClient(updatedClient);
        setSelectedProgram('');
      } else {
        const error = await res.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Failed to enroll client:', error);
      alert('Failed to enroll client in program. Please try again.');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading client profile...</div>;
  }

  if (!client) {
    return <div className="container mx-auto px-4 py-8">Client not found</div>;
  }

  const enrolledPrograms = programs.filter(program => 
    client.enrolledPrograms.includes(program._id as string)
  );
  
  const availablePrograms = programs.filter(program => 
    !client.enrolledPrograms.includes(program._id as string) && program.active
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Profile</h1>
        <button
          onClick={() => router.back()}
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-800"
        >
          Back
        </button>
      </div>
      
      <div className="p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">{client.firstName} {client.lastName}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Date of Birth</p>
            <p>{new Date(client.dateOfBirth).toLocaleDateString()}</p>
          </div>
          
          <div>
            <p className="text-gray-600">Gender</p>
            <p>{client.gender}</p>
          </div>
          
          <div>
            <p className="text-gray-600">Contact Number</p>
            <p>{client.contactNumber}</p>
          </div>
          
          <div>
            <p className="text-gray-600">Registration Date</p>
            <p>{new Date(client.registrationDate).toLocaleDateString()}</p>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-gray-600">Address</p>
            <p>{client.address}</p>
          </div>
        </div>
      </div>
      
      <div className=" p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Enrolled Programs</h2>
        
        {enrolledPrograms.length === 0 ? (
          <p className="text-gray-500">Not enrolled in any programs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledPrograms.map(program => (
              <div key={program._id} className="border p-4 rounded-lg ">
                <h3 className="font-medium">{program.name}</h3>
                <p className="text-sm text-gray-600">{program.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {availablePrograms.length > 0 && (
        <div className=" p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Enroll in a Program</h2>
          
          <div className="flex space-x-4">
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="flex-grow px-3 py-2 border rounded bg-gray-800"
            >
              <option value="">Select a program</option>
              {availablePrograms.map(program => (
                <option key={program._id} value={program._id}>
                  {program.name}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleEnrollProgram}
              disabled={!selectedProgram}
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              Enroll
            </button>
          </div>
        </div>
      )}
    </div>
  );
}