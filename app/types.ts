// app/types.ts
export interface User {
  id: number
  username: string;
}

export interface SuccessfulAuth {
  access_token: string;
  is_admin: boolean;
}

export interface Transports {
  items: Transport[]
  total: number
}

export interface Transport {
  id: number;
  manufacturer: string;
  model: string;
  color: string;
  number: string;
}

export interface Code {
  code: number;
}

export interface GuestLink {
  guest_link: string
}