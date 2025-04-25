# Health System

## Overview

This repository contains a basic health management system built with Next.js and MongoDB. The system allows healthcare providers to manage client records and enroll clients in various health programs.

## Features

- Client management (create, read, update, delete)
- Program enrollment functionality
- RESTful API endpoints
- MongoDB integration for data persistence

## Technical Stack

- **Frontend**: Next.js (React framework)
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: [Implementation details to be added]

## API Endpoints

### Clients

#### Get All Clients
```
GET /api/clients
```
Returns a list of all clients in the system.

#### Get Client by ID
```
GET /api/clients/[id]
```
Returns detailed information about a specific client.

#### Create Client
```
POST /api/clients
```
Creates a new client record in the system.

Body:
```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "123-456-7890",
  "dateOfBirth": "1990-01-01",
  "address": "123 Main St, City, State, ZIP"
}
```

#### Update Client
```
PUT /api/clients/[id]
```
Updates information for an existing client.

#### Delete Client
```
DELETE /api/clients/[id]
```
Removes a client from the system.

### Program Enrollment

#### Enroll Client in Program
```
POST /api/clients/[id]/enroll
```
Enrolls a client in a specific health program.

Body:
```json
{
  "programId": "program_id_here"
}
```

## Database Schema

### Clients Collection
```
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  dateOfBirth: Date,
  address: String,
  enrolledPrograms: [String] // Array of program IDs
}
```

### Programs Collection
```
{
  _id: ObjectId,
  name: String,
  description: String,
  duration: Number, // in weeks
  cost: Number
}
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud-based)

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/health-system.git
   cd health-system
   ```

2. Install dependencies:
   ```
   npm install
   ```
   
3. Configure environment variables:
   Create a `.env.local` file in the project root and add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB=your_database_name
   ```

4. Run the development server:
   ```
   npm run dev
   ```
   
5. Access the application at `http://localhost:3000`

## Common Issues and Solutions

### MongoDB Connection Issues

If you encounter MongoDB connection errors:
1. Verify that your MongoDB instance is running
2. Check that your connection string in the `.env.local` file is correct
3. Ensure your IP address is whitelisted if using MongoDB Atlas

### Next.js API Route Params Issues

When working with dynamic route parameters in Next.js App Router:
```javascript
// Important: In App Router, params must be awaited before accessing its properties
const clientId = (await params).id;
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

[License information to be added]

## Contact

[Contact information to be added]
