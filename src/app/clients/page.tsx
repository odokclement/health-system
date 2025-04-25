'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Client } from '../../models/types';

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch('/api/clients');
        const data = await res.json();
        setClients(data);
        setFilteredClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchClients();
  }, []);

  useEffect(() => {
    // Filter clients based on search term
    if (searchTerm.trim() === '') {
      setFilteredClients(clients);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = clients.filter(client => 
      client.firstName.toLowerCase().includes(term) || 
      client.lastName.toLowerCase().includes(term) ||
      client.contactNumber.includes(term)
    );
    
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
      <button className='bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 cursor-pointer'>
        Back
      </button>
      </Link>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Link href="/clients/register">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Register New Client
          </button>
        </Link>
      </div>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search clients by name or contact number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border rounded"
        />
      </div>
      
      {loading ? (
        <p>Loading clients...</p>
      ) : filteredClients.length === 0 ? (
        <p>No clients found. Register your first client.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <thead>
              <tr className="bg-transparent">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Gender</th>
                <th className="py-2 px-4 text-left">Contact</th>
                <th className="py-2 px-4 text-left">Registered On</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client._id} className="border-b hover:bg-gray-800">
                  <td className="py-2 px-4">{client.firstName} {client.lastName}</td>
                  <td className="py-2 px-4">{client.gender}</td>
                  <td className="py-2 px-4">{client.contactNumber}</td>
                  <td className="py-2 px-4">
                    {new Date(client.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    <Link href={`/clients/${client._id}`}>
                      <span className="text-blue-500 hover:underline cursor-pointer">View Profile</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
// client page 