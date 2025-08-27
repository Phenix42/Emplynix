export interface Job {
  _id: string ;            // From MongoDB
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  posted?: string;   
benefits: string[];  // Fixed typo from 'benifts' to 'benefits'ß
status: string; 
   createdAt: string;     // Optional, in case some APIs provide it
}
