export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      featured: {
        Row: {
          created_at: string
          id: number
          product: number
        }
        Insert: {
          created_at?: string
          id?: number
          product: number
        }
        Update: {
          created_at?: string
          id?: number
          product?: number
        }
        Relationships: [
          {
            foreignKeyName: "featured_product_fkey"
            columns: ["product"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: number
          created_at: string
          id: number
          image_url: string
          is_active: boolean
          is_best_seller: boolean
          name: string
          sub_category: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          category: number
          created_at?: string
          id?: number
          image_url: string
          is_active?: boolean
          is_best_seller?: boolean
          name: string
          sub_category?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          category?: number
          created_at?: string
          id?: number
          image_url?: string
          is_active?: boolean
          is_best_seller?: boolean
          name?: string
          sub_category?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "products_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_sub_category_fkey"
            columns: ["sub_category"]
            isOneToOne: false
            referencedRelation: "sub_category"
            referencedColumns: ["id"]
          },
        ]
      }
      products_category: {
        Row: {
          created_at: string
          id: number
          is_active: boolean
          label: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_active?: boolean
          label?: string
        }
        Update: {
          created_at?: string
          id?: number
          is_active?: boolean
          label?: string
        }
        Relationships: []
      }
      products_prices: {
        Row: {
          created_at: string
          description: string | null
          id: number
          price: number
          product: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          price: number
          product: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          price?: number
          product?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_prices_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_category: {
        Row: {
          category: number
          created_at: string
          id: number
          is_active: boolean | null
          label: string
        }
        Insert: {
          category: number
          created_at?: string
          id?: number
          is_active?: boolean | null
          label: string
        }
        Update: {
          category?: number
          created_at?: string
          id?: number
          is_active?: boolean | null
          label?: string
        }
        Relationships: [
          {
            foreignKeyName: "sub_category_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "products_category"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: number
          id_url: string | null
          image_url: string | null
          is_active: boolean
          is_admin: boolean
          is_verified: boolean
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          id_url?: string | null
          image_url?: string | null
          is_active?: boolean
          is_admin?: boolean
          is_verified?: boolean
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          id_url?: string | null
          image_url?: string | null
          is_active?: boolean
          is_admin?: boolean
          is_verified?: boolean
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      filter_products:
        | {
            Args: {
              name_filter: string
              price_filter: string
              bestseller: boolean
              active: boolean
              order: string
              category_filter: string
              sub_category_filter: string
            }
            Returns: {
              id: number
              name: string
              image_url: string
              is_best_seller: boolean
              is_active: boolean
              category: number
              label: string
              sub_category: string
              sub_category_id: number
              prices: Json
            }[]
          }
        | {
            Args: {
              name_filter: string
              price_filter: string
              bestseller: boolean
              active: boolean
              order: string
              category_filter: string
              sub_category_filter: string
              id_filter: string
            }
            Returns: {
              id: number
              name: string
              image_url: string
              is_best_seller: boolean
              is_active: boolean
              category: number
              label: string
              sub_category: string
              sub_category_id: number
              prices: Json
            }[]
          }
        | {
            Args: {
              name_filter: string
              price_filter: string
              bestseller: boolean
              active: boolean
              order: string
              sub_category_filter: string
            }
            Returns: {
              id: number
              name: string
              image_url: string
              price: number
              is_best_seller: boolean
              is_active: boolean
              category: number
              label: string
              sub_category: string
              sub_category_id: number
            }[]
          }
      get_name_opts: {
        Args: {
          category_filter: string
        }
        Returns: {
          label: string
          value: string
        }[]
      }
      get_price_opts: {
        Args: {
          category_filter: string
        }
        Returns: {
          label: string
          value: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

