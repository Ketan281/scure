// src/types/interfaces.ts
export interface Credentials {
    email: string;
    password: string;
    remember: boolean;
  }
  
  export interface FormErrors {
    email: string;
    password: string;
  }
  
  export interface CyberCardProps {
    ismobile: boolean;
  }