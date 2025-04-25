// This file contains TypeScript interfaces for our data models

export interface Client {
    _id?: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    contactNumber: string;
    address: string;
    registrationDate: Date;
    enrolledPrograms: string[]; // Array of program IDs
  }
  
  export interface HealthProgram {
    _id?: string;
    name: string;
    description: string;
    startDate: Date;
    active: boolean;
  }