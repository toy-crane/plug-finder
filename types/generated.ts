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
      car_batteries: {
        Row: {
          battery_type: Database["public"]["Enums"]["battery_type"]
          capacity: number
          charging_type: Database["public"]["Enums"]["charging_type"]
          created_at: string
          id: string
        }
        Insert: {
          battery_type: Database["public"]["Enums"]["battery_type"]
          capacity: number
          charging_type: Database["public"]["Enums"]["charging_type"]
          created_at?: string
          id: string
        }
        Update: {
          battery_type?: Database["public"]["Enums"]["battery_type"]
          capacity?: number
          charging_type?: Database["public"]["Enums"]["charging_type"]
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "car_batteries_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "cars"
            referencedColumns: ["id"]
          }
        ]
      }
      car_performances: {
        Row: {
          created_at: string
          drag_coefficient: number | null
          drive_type: Database["public"]["Enums"]["drive_type"]
          efficiency: number
          id: string
          max_power: number
          max_range: number
          max_torque: number
          motor_type: Database["public"]["Enums"]["motor_type"]
          top_speed: number
          winter_range: number | null
          zero_to_hundred: number
        }
        Insert: {
          created_at?: string
          drag_coefficient?: number | null
          drive_type: Database["public"]["Enums"]["drive_type"]
          efficiency: number
          id: string
          max_power: number
          max_range: number
          max_torque: number
          motor_type: Database["public"]["Enums"]["motor_type"]
          top_speed: number
          winter_range?: number | null
          zero_to_hundred: number
        }
        Update: {
          created_at?: string
          drag_coefficient?: number | null
          drive_type?: Database["public"]["Enums"]["drive_type"]
          efficiency?: number
          id?: string
          max_power?: number
          max_range?: number
          max_torque?: number
          motor_type?: Database["public"]["Enums"]["motor_type"]
          top_speed?: number
          winter_range?: number | null
          zero_to_hundred?: number
        }
        Relationships: [
          {
            foreignKeyName: "car_performances_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "cars"
            referencedColumns: ["id"]
          }
        ]
      }
      cars: {
        Row: {
          brand: Database["public"]["Enums"]["car_maker"]
          created_at: string
          display_model: string | null
          id: string
          image_url: string
          model: string
          slug: string
          trim: string
          year: number
        }
        Insert: {
          brand: Database["public"]["Enums"]["car_maker"]
          created_at?: string
          display_model?: string | null
          id?: string
          image_url: string
          model: string
          slug: string
          trim: string
          year: number
        }
        Update: {
          brand?: Database["public"]["Enums"]["car_maker"]
          created_at?: string
          display_model?: string | null
          id?: string
          image_url?: string
          model?: string
          slug?: string
          trim?: string
          year?: number
        }
        Relationships: []
      }
      chargers: {
        Row: {
          charger_type: string
          created_at: string
          external_charger_id: string
          external_station_id: string
          id: string
          method: string
          output: string
          station_id: string
        }
        Insert: {
          charger_type: string
          created_at?: string
          external_charger_id: string
          external_station_id: string
          id?: string
          method: string
          output: string
          station_id: string
        }
        Update: {
          charger_type?: string
          created_at?: string
          external_charger_id?: string
          external_station_id?: string
          id?: string
          method?: string
          output?: string
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
      district_station_statistics: {
        Row: {
          count: number
          created_at: string
          id: number
          zs_code: string
        }
        Insert: {
          count: number
          created_at?: string
          id?: number
          zs_code: string
        }
        Update: {
          count?: number
          created_at?: string
          id?: number
          zs_code?: string
        }
        Relationships: []
      }
      region_station_statistics: {
        Row: {
          count: number
          created_at: string
          id: number
          z_code: string
        }
        Insert: {
          count: number
          created_at?: string
          id?: number
          z_code: string
        }
        Update: {
          count?: number
          created_at?: string
          id?: number
          z_code?: string
        }
        Relationships: []
      }
      stations: {
        Row: {
          address: string
          available: boolean
          available_detail: string | null
          charger_type: string
          created_at: string
          detail_location: string | null
          display_station_name: string
          external_station_id: string
          id: string
          is_deleted: boolean
          is_deleted_detail: string | null
          lat: number
          lng: number
          location: unknown
          note: string | null
          org_contact: string | null
          org_id: string
          org_name: string
          output: string
          parking_free: boolean
          slug: string
          station_name: string
          usable_time: string
          z_code: string
          zs_code: string
        }
        Insert: {
          address: string
          available: boolean
          available_detail?: string | null
          charger_type: string
          created_at?: string
          detail_location?: string | null
          display_station_name: string
          external_station_id: string
          id?: string
          is_deleted?: boolean
          is_deleted_detail?: string | null
          lat: number
          lng: number
          location: unknown
          note?: string | null
          org_contact?: string | null
          org_id: string
          org_name: string
          output: string
          parking_free: boolean
          slug: string
          station_name: string
          usable_time: string
          z_code: string
          zs_code: string
        }
        Update: {
          address?: string
          available?: boolean
          available_detail?: string | null
          charger_type?: string
          created_at?: string
          detail_location?: string | null
          display_station_name?: string
          external_station_id?: string
          id?: string
          is_deleted?: boolean
          is_deleted_detail?: string | null
          lat?: number
          lng?: number
          location?: unknown
          note?: string | null
          org_contact?: string | null
          org_id?: string
          org_name?: string
          output?: string
          parking_free?: boolean
          slug?: string
          station_name?: string
          usable_time?: string
          z_code?: string
          zs_code?: string
        }
        Relationships: []
      }
    }
    Views: {
      grouped_station_by_zcode: {
        Row: {
          count: number | null
          z_code: string | null
        }
        Relationships: []
      }
      grouped_station_by_zscode: {
        Row: {
          count: number | null
          zs_code: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      insert_or_update_stations_and_chargers: {
        Args: {
          data: Json
        }
        Returns: undefined
      }
      nearby_stations: {
        Args: {
          latitude: number
          longitude: number
          max_results: number
        }
        Returns: {
          id: string
          station_name: string
          dist_meters: number
          z_code: string
          zs_code: string
          charger_type: string
          slug: string
          address: string
          output: string
          charger_count: number
        }[]
      }
      stations_in_view: {
        Args: {
          min_lat: number
          min_long: number
          max_lat: number
          max_long: number
        }
        Returns: {
          id: string
          station_name: string
          lat: number
          lng: number
          z_code: string
          zs_code: string
          slug: string
        }[]
      }
    }
    Enums: {
      battery_type: "NCM" | "LFP"
      car_maker: "tesla"
      charging_type: "NACS" | "DC_COMBO"
      drive_type: "AWD" | "FWD" | "RWD"
      motor_type: "single-motor" | "dual-motor" | "tri-motor"
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
