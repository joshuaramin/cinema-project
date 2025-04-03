import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export interface SendGrid {
  to: string;
  from: string;
  bcc?: string[];
  cc?: string[];
  subject: string;
  html: string;
}

export interface User {
  user_id?: string;
  account_no?: string;
  email: string;
  password: string;
  is_deleted: boolean;
}

export interface Login {
  message: string;
  user_id: string;
  user: {};
}

export interface User_Role {
  name: string;
  description?: string;
  is_deleted: boolean;
  created_at: any;
  updated_at: any;
}

export interface Media {
  media_id: string;
  url: string;
  file_name: string;
  mimetype: string;
  description: string;
  is_deleted: boolean;
  created_at: any;
  updated_at: any;
}

export interface Permission {
  permission_id: string;
  value: string;
  is_deleted: boolean;
  created_at: any;
  updated_at: any;
}
export interface Profile {
  profile_id: string;
  first_name: string;
  last_name: string;
  contact_no: string;
  created_at: any;
  updated_at: any;
}

export interface Address {
  address_id: string;
  country: string;
  city: string;
  address_line_1: string;
  address_line_2: string;
  is_deleted: boolean;
  zipcode: string;
  created_at: any;
  updated_at: any;
}

export interface Message {
  message: string;
}

export interface ResultUserRole {
  item: User_Role[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ResultUser {
  item: User[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface Context {
  req: Request;
  res: Response;
  prisma: PrismaClient;
}
