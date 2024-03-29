import { Photo } from "./Photo";

export interface User {
  dateOfBirth: string;
  id:number;
  username: string;
  knownAs: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: string;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];
}
