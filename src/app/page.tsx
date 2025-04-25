import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8">Health Information System</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link href="/programs">
        <div className="p-6 border rounded-lg hover:bg-gray-800  cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Health Programs</h2>
          <p>Create and manage health programs (TB, Malaria, HIV, etc.)</p>
        </div>
      </Link>
      
      <Link href="/clients">
        <div className="p-6 border rounded-lg hover:bg-gray-800  cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Clients</h2>
          <p>Register new clients and manage their program enrollments</p>
        </div>
      </Link>
    </div>
  </div>
  );
}
