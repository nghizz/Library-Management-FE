export interface User {
  IdUser?: string; // Kiểu dữ liệu của IdUser là string
  Username: string;
  Email?: string; 
  FullName?: string;
  Role?: 'admin' | 'user'; 
  PhoneNumber?: string;
  Address?: string;
  AccessToken?: string;
  Expiration?: string;
  Roles?: string[];
}