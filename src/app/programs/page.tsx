'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HealthProgram } from '@/models/programs';

export default function Programs() {
  const [programs, setPrograms] = useState<HealthProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const res = await fetch('/api/programs');
        const data = await res.json();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPrograms();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
      <button className='border-none px-4 py-2 rounded cursor-pointer bg-blue-500 hover:bg-blue-700'>
        back
      </button>
      </Link>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Health Programs</h1>
        <Link href="/programs/new">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create New Program
          </button>
        </Link>
      </div>
      
      {loading ? (
        <p>Loading programs...</p>
      ) : programs.length === 0 ? (
        <p>No health programs found. Create your first program.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program) => (
            <div key={String(program._id)} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{program.name}</h2>
              <p className="text-gray-600 mb-2">{program.description}</p>
              <p className="text-sm">
                Start Date: {new Date(program.startDate).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Status: <span className={program.active ? "text-green-500" : "text-red-500"}>
                  {program.active ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// This code defines a React component that fetches and displays health programs from an API.
// It uses the useState and useEffect hooks to manage state and side effects.
// The component fetches the programs when it mounts and displays them in a grid.
// If there are no programs, it prompts the user to create a new one.