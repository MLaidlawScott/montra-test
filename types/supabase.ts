export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Author: {
        Row: {
          created_at: string
          description: string
          id: number
          name: string
          thumbnail_uri: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          name: string
          thumbnail_uri: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          name?: string
          thumbnail_uri?: string
        }
      }
      Book: {
        Row: {
          author_id: number
          created_at: string | null
          description: string
          id: number
          isbn: string
          price: number
          thumbnail_uri: string
          title: string
        }
        Insert: {
          author_id: number
          created_at?: string | null
          description: string
          id?: number
          isbn: string
          price: number
          thumbnail_uri: string
          title: string
        }
        Update: {
          author_id?: number
          created_at?: string | null
          description?: string
          id?: number
          isbn?: string
          price?: number
          thumbnail_uri?: string
          title?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

