export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OldUser {
  idn: number;
  names: string;
  emails: string;
  passwords: string;
  roles: string;
  createdAt: string;
  updatedAt: string;
}
