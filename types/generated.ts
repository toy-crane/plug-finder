export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chargers: {
        Row: {
          charger_type: string | null
          created_at: string
          external_charger_id: string
          external_station_id: string
          id: string
          method: string | null
          output: string | null
          station_id: string
        }
        Insert: {
          charger_type?: string | null
          created_at?: string
          external_charger_id: string
          external_station_id: string
          id?: string
          method?: string | null
          output?: string | null
          station_id: string
        }
        Update: {
          charger_type?: string | null
          created_at?: string
          external_charger_id?: string
          external_station_id?: string
          id?: string
          method?: string | null
          output?: string | null
          station_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chargers_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "stations"
            referencedColumns: ["id"]
          }
        ]
      }
      stations: {
        Row: {
          address: string
          available: boolean
          available_detail: string | null
          created_at: string
          detail_location: string | null
          display_station_name: string
          external_station_id: string
          id: string
          is_deleted: boolean
          is_deleted_detail: string | null
          lat: number
          lng: number
          note: string | null
          org_contact: string | null
          org_id: string
          org_name: string
          parking_free: boolean
          slug: string
          station_name: string
          usable_time: string | null
          z_code: string
          zs_code: string
        }
        Insert: {
          address: string
          available: boolean
          available_detail?: string | null
          created_at?: string
          detail_location?: string | null
          display_station_name: string
          external_station_id: string
          id?: string
          is_deleted?: boolean
          is_deleted_detail?: string | null
          lat: number
          lng: number
          note?: string | null
          org_contact?: string | null
          org_id: string
          org_name: string
          parking_free: boolean
          slug: string
          station_name: string
          usable_time?: string | null
          z_code: string
          zs_code: string
        }
        Update: {
          address?: string
          available?: boolean
          available_detail?: string | null
          created_at?: string
          detail_location?: string | null
          display_station_name?: string
          external_station_id?: string
          id?: string
          is_deleted?: boolean
          is_deleted_detail?: string | null
          lat?: number
          lng?: number
          note?: string | null
          org_contact?: string | null
          org_id?: string
          org_name?: string
          parking_free?: boolean
          slug?: string
          station_name?: string
          usable_time?: string | null
          z_code?: string
          zs_code?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_or_update_stations_and_chargers: {
        Args: {
          data: Json
        }
        Returns: undefined
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
