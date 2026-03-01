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
      dodo_pricing_plans: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          price: number
          credits: number
          currency: string
          dodo_product_id: string | null
          is_active: boolean
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          price: number
          credits: number
          currency?: string
          dodo_product_id?: string | null
          is_active?: boolean
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          price?: number
          credits?: number
          currency?: string
          dodo_product_id?: string | null
          is_active?: boolean
          metadata?: Json | null
        }
      }
      dodo_subscriptions: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          dodo_subscription_id: string | null
          pricing_plan_id: string
          status: string
          metadata: Json | null
          cancel_at_period_end: boolean
          current_period_end: string | null
          next_billing_date: string | null
          canceled_at: string | null
          price_snapshot?: number | null
          currency_snapshot?: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          dodo_subscription_id?: string | null
          pricing_plan_id: string
          status?: string
          metadata?: Json | null
          cancel_at_period_end?: boolean
          current_period_end?: string | null
          next_billing_date?: string | null
          canceled_at?: string | null
          price_snapshot?: number | null
          currency_snapshot?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          dodo_subscription_id?: string | null
          pricing_plan_id?: string
          status?: string
          metadata?: Json | null
          cancel_at_period_end?: boolean
          current_period_end?: string | null
          next_billing_date?: string | null
          canceled_at?: string | null
          price_snapshot?: number | null
          currency_snapshot?: string | null
        }
      }
      dodo_subscription_changes: {
        Row: {
          id: string
          created_at: string
          user_id: string
          from_plan_id: string | null
          to_plan_id: string | null
          checkout_session_id: string | null
          status: string
          change_type: string
          reason: string | null
          completed_at: string | null
          error_message: string | null
          metadata: Json | null
          proration_billing_mode: string | null
          immediate_charge: number | null
          credit_amount: number | null
          invoice_id: string | null
          payment_id: string | null
          effective_date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          from_plan_id?: string | null
          to_plan_id?: string | null
          checkout_session_id?: string | null
          status: string
          change_type: string
          reason?: string | null
          completed_at?: string | null
          error_message?: string | null
          metadata?: Json | null
          proration_billing_mode?: string | null
          immediate_charge?: number | null
          credit_amount?: number | null
          invoice_id?: string | null
          payment_id?: string | null
          effective_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          from_plan_id?: string | null
          to_plan_id?: string | null
          checkout_session_id?: string | null
          status?: string
          change_type?: string
          reason?: string | null
          completed_at?: string | null
          error_message?: string | null
          metadata?: Json | null
          proration_billing_mode?: string | null
          immediate_charge?: number | null
          credit_amount?: number | null
          invoice_id?: string | null
          payment_id?: string | null
          effective_date?: string | null
        }
      }
      dodo_subscription_history: {
        Row: {
          id: string
          created_at: string
          user_id: string
          dodo_subscription_id: string
          from_plan_id: string | null
          to_plan_id: string | null
          proration_billing_mode: string | null
          immediate_charge: number | null
          credit_amount: number | null
          invoice_id: string | null
          payment_id: string | null
          effective_date: string | null
          event_type: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          dodo_subscription_id: string
          from_plan_id?: string | null
          to_plan_id?: string | null
          proration_billing_mode?: string | null
          immediate_charge?: number | null
          credit_amount?: number | null
          invoice_id?: string | null
          payment_id?: string | null
          effective_date?: string | null
          event_type?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          dodo_subscription_id?: string
          from_plan_id?: string | null
          to_plan_id?: string | null
          proration_billing_mode?: string | null
          immediate_charge?: number | null
          credit_amount?: number | null
          invoice_id?: string | null
          payment_id?: string | null
          effective_date?: string | null
          event_type?: string
          metadata?: Json | null
        }
      }
      dodo_webhook_events: {
        Row: {
          id: string
          created_at: string
          dodo_event_id: string
          event_type: string
          processed: boolean
          processed_at: string | null
          data: Json
          error_message: string | null
          retry_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          dodo_event_id: string
          event_type: string
          processed?: boolean
          processed_at?: string | null
          data: Json
          error_message?: string | null
          retry_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          dodo_event_id?: string
          event_type?: string
          processed?: boolean
          processed_at?: string | null
          data?: Json
          error_message?: string | null
          retry_count?: number
        }
      }
      dodo_payments: {
        Row: {
          dodo_payment_id: string
          user_id: string
          pricing_plan_id: string | null
          amount: number
          currency: string
          status: string
          credits: number
          metadata: Json | null
        }
        Insert: {
          dodo_payment_id: string
          user_id: string
          pricing_plan_id?: string | null
          amount: number
          currency: string
          status?: string
          credits?: number
          metadata?: Json | null
        }
        Update: {
          dodo_payment_id?: string
          user_id?: string
          pricing_plan_id?: string | null
          amount?: number
          currency?: string
          status?: string
          credits?: number
          metadata?: Json | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
        }
        Insert: {
          id: string
          email: string
        }
        Update: {
          id?: string
          email?: string
        }
      }
      credits: {
        Row: {
          id: number
          created_at: string
          credits: number
          user_id: string
        }
        Insert: {
          id?: number
          created_at?: string
          credits?: number
          user_id: string
        }
        Update: {
          id?: number
          created_at?: string
          credits?: number
          user_id?: string
        }
      }
      followup_email_logs: {
        Row: {
          id: string
          created_at: string
          user_id: string
          email_type: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          email_type: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          email_type?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
