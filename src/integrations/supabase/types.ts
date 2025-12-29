export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_activity_log: {
        Row: {
          actor_id: string | null
          actor_name: string | null
          actor_type: string | null
          created_at: string | null
          entity_id: string | null
          entity_name: string | null
          entity_type: string | null
          event_category: string
          event_type: string
          id: string
          metadata: Json | null
          school_id: string | null
        }
        Insert: {
          actor_id?: string | null
          actor_name?: string | null
          actor_type?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_name?: string | null
          entity_type?: string | null
          event_category: string
          event_type: string
          id?: string
          metadata?: Json | null
          school_id?: string | null
        }
        Update: {
          actor_id?: string | null
          actor_name?: string | null
          actor_type?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_name?: string | null
          entity_type?: string | null
          event_category?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          school_id?: string | null
        }
        Relationships: []
      }
      ai_coach_knowledge: {
        Row: {
          category: string
          content: string
          created_at: string | null
          id: string
          is_active: boolean | null
          priority: number | null
          source_url: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          priority?: number | null
          source_url?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          priority?: number | null
          source_url?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_rate_limits: {
        Row: {
          created_at: string | null
          daily_limit: number | null
          feature: string
          id: string
          is_active: boolean | null
          monthly_limit: number | null
          updated_at: string | null
          weekly_limit: number | null
        }
        Insert: {
          created_at?: string | null
          daily_limit?: number | null
          feature: string
          id?: string
          is_active?: boolean | null
          monthly_limit?: number | null
          updated_at?: string | null
          weekly_limit?: number | null
        }
        Update: {
          created_at?: string | null
          daily_limit?: number | null
          feature?: string
          id?: string
          is_active?: boolean | null
          monthly_limit?: number | null
          updated_at?: string | null
          weekly_limit?: number | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          priority: string | null
          published_at: string | null
          target_cohort_id: string | null
          target_programs: string[] | null
          target_roles: Database["public"]["Enums"]["app_role"][] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          priority?: string | null
          published_at?: string | null
          target_cohort_id?: string | null
          target_programs?: string[] | null
          target_roles?: Database["public"]["Enums"]["app_role"][] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          priority?: string | null
          published_at?: string | null
          target_cohort_id?: string | null
          target_programs?: string[] | null
          target_roles?: Database["public"]["Enums"]["app_role"][] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_target_cohort_id_fkey"
            columns: ["target_cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          age: number
          ai_feedback: Json | null
          ai_score: number | null
          city: string | null
          city_other: string | null
          clarity_score: number | null
          counselor_email: string | null
          counselor_name: string | null
          country: string
          created_at: string | null
          email: string
          feasibility_score: number | null
          final_score: number | null
          founder_confidence_score: number | null
          founder_name: string
          grade: string | null
          id: string
          is_top_10: boolean | null
          is_top_20: boolean | null
          motivation: string | null
          onboarding_completed: boolean | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          payment_status: string | null
          phone: string | null
          pitch_deck_url: string | null
          pitch_description: string
          problem_statement: string
          rank: number | null
          resume_url: string | null
          round: number | null
          school_id: string | null
          school_name: string | null
          school_other: string | null
          scored_at: string | null
          solution_description: string
          startup_name: string
          status: Database["public"]["Enums"]["application_status"] | null
          submitted_at: string | null
          target_market: string | null
          updated_at: string | null
          user_id: string | null
          video_duration: number | null
          video_submitted_at: string | null
          video_thumbnail_url: string | null
          video_url: string | null
        }
        Insert: {
          age: number
          ai_feedback?: Json | null
          ai_score?: number | null
          city?: string | null
          city_other?: string | null
          clarity_score?: number | null
          counselor_email?: string | null
          counselor_name?: string | null
          country: string
          created_at?: string | null
          email: string
          feasibility_score?: number | null
          final_score?: number | null
          founder_confidence_score?: number | null
          founder_name: string
          grade?: string | null
          id?: string
          is_top_10?: boolean | null
          is_top_20?: boolean | null
          motivation?: string | null
          onboarding_completed?: boolean | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_status?: string | null
          phone?: string | null
          pitch_deck_url?: string | null
          pitch_description: string
          problem_statement: string
          rank?: number | null
          resume_url?: string | null
          round?: number | null
          school_id?: string | null
          school_name?: string | null
          school_other?: string | null
          scored_at?: string | null
          solution_description: string
          startup_name: string
          status?: Database["public"]["Enums"]["application_status"] | null
          submitted_at?: string | null
          target_market?: string | null
          updated_at?: string | null
          user_id?: string | null
          video_duration?: number | null
          video_submitted_at?: string | null
          video_thumbnail_url?: string | null
          video_url?: string | null
        }
        Update: {
          age?: number
          ai_feedback?: Json | null
          ai_score?: number | null
          city?: string | null
          city_other?: string | null
          clarity_score?: number | null
          counselor_email?: string | null
          counselor_name?: string | null
          country?: string
          created_at?: string | null
          email?: string
          feasibility_score?: number | null
          final_score?: number | null
          founder_confidence_score?: number | null
          founder_name?: string
          grade?: string | null
          id?: string
          is_top_10?: boolean | null
          is_top_20?: boolean | null
          motivation?: string | null
          onboarding_completed?: boolean | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          payment_status?: string | null
          phone?: string | null
          pitch_deck_url?: string | null
          pitch_description?: string
          problem_statement?: string
          rank?: number | null
          resume_url?: string | null
          round?: number | null
          school_id?: string | null
          school_name?: string | null
          school_other?: string | null
          scored_at?: string | null
          solution_description?: string
          startup_name?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          submitted_at?: string | null
          target_market?: string | null
          updated_at?: string | null
          user_id?: string | null
          video_duration?: number | null
          video_submitted_at?: string | null
          video_thumbnail_url?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      artifacts: {
        Row: {
          artifact_type: Database["public"]["Enums"]["artifact_type"]
          content: Json
          created_at: string | null
          id: string
          is_ai_generated: boolean | null
          mission_id: string | null
          student_id: string
          title: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          artifact_type: Database["public"]["Enums"]["artifact_type"]
          content?: Json
          created_at?: string | null
          id?: string
          is_ai_generated?: boolean | null
          mission_id?: string | null
          student_id: string
          title: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          artifact_type?: Database["public"]["Enums"]["artifact_type"]
          content?: Json
          created_at?: string | null
          id?: string
          is_ai_generated?: boolean | null
          mission_id?: string | null
          student_id?: string
          title?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "artifacts_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artifacts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      behavioral_signals: {
        Row: {
          context: Json | null
          id: string
          mission_id: string | null
          recorded_at: string | null
          signal_type: string
          signal_value: number
          student_id: string
        }
        Insert: {
          context?: Json | null
          id?: string
          mission_id?: string | null
          recorded_at?: string | null
          signal_type: string
          signal_value: number
          student_id: string
        }
        Update: {
          context?: Json | null
          id?: string
          mission_id?: string | null
          recorded_at?: string | null
          signal_type?: string
          signal_value?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "behavioral_signals_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "behavioral_signals_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      bonus_credits_log: {
        Row: {
          awarded_by: string | null
          created_at: string | null
          credits_awarded: number
          id: string
          reason: string
          team_id: string
        }
        Insert: {
          awarded_by?: string | null
          created_at?: string | null
          credits_awarded: number
          id?: string
          reason: string
          team_id: string
        }
        Update: {
          awarded_by?: string | null
          created_at?: string | null
          credits_awarded?: number
          id?: string
          reason?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bonus_credits_log_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      case_studies: {
        Row: {
          build_journey: string | null
          code_journey: string | null
          created_at: string | null
          creator_quote: string | null
          design_journey: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          is_project_of_week: boolean | null
          is_published: boolean | null
          key_learnings: string | null
          launch_story: string | null
          outcome: string | null
          outcome_story: string | null
          problem_found: string | null
          problem_story: string | null
          program: string | null
          prompts_used: Json | null
          slug: string
          story_depth: string | null
          student_age: number | null
          student_name: string
          thumbnail_url: string | null
          title: string
          tools_used: string[] | null
          updated_at: string | null
          users_context: string | null
          users_count: number | null
        }
        Insert: {
          build_journey?: string | null
          code_journey?: string | null
          created_at?: string | null
          creator_quote?: string | null
          design_journey?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_project_of_week?: boolean | null
          is_published?: boolean | null
          key_learnings?: string | null
          launch_story?: string | null
          outcome?: string | null
          outcome_story?: string | null
          problem_found?: string | null
          problem_story?: string | null
          program?: string | null
          prompts_used?: Json | null
          slug: string
          story_depth?: string | null
          student_age?: number | null
          student_name: string
          thumbnail_url?: string | null
          title: string
          tools_used?: string[] | null
          updated_at?: string | null
          users_context?: string | null
          users_count?: number | null
        }
        Update: {
          build_journey?: string | null
          code_journey?: string | null
          created_at?: string | null
          creator_quote?: string | null
          design_journey?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_project_of_week?: boolean | null
          is_published?: boolean | null
          key_learnings?: string | null
          launch_story?: string | null
          outcome?: string | null
          outcome_story?: string | null
          problem_found?: string | null
          problem_story?: string | null
          program?: string | null
          prompts_used?: Json | null
          slug?: string
          story_depth?: string | null
          student_age?: number | null
          student_name?: string
          thumbnail_url?: string | null
          title?: string
          tools_used?: string[] | null
          updated_at?: string | null
          users_context?: string | null
          users_count?: number | null
        }
        Relationships: []
      }
      certification_lesson_sprints: {
        Row: {
          age_track: string
          content: string
          created_at: string | null
          estimated_seconds: number
          id: string
          is_advanced_technique: boolean | null
          lesson_id: string
          quiz_questions: Json | null
          sprint_order: number
          title: string
        }
        Insert: {
          age_track?: string
          content: string
          created_at?: string | null
          estimated_seconds?: number
          id?: string
          is_advanced_technique?: boolean | null
          lesson_id: string
          quiz_questions?: Json | null
          sprint_order: number
          title: string
        }
        Update: {
          age_track?: string
          content?: string
          created_at?: string | null
          estimated_seconds?: number
          id?: string
          is_advanced_technique?: boolean | null
          lesson_id?: string
          quiz_questions?: Json | null
          sprint_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "certification_lesson_sprints_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "certification_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      certification_lessons: {
        Row: {
          certification_id: string
          content: string | null
          created_at: string | null
          description: string | null
          estimated_minutes: number | null
          id: string
          learning_objectives: string[] | null
          lesson_order: number
          quiz_questions: Json | null
          sprint_count: number | null
          title: string
          video_url: string | null
        }
        Insert: {
          certification_id: string
          content?: string | null
          created_at?: string | null
          description?: string | null
          estimated_minutes?: number | null
          id?: string
          learning_objectives?: string[] | null
          lesson_order: number
          quiz_questions?: Json | null
          sprint_count?: number | null
          title: string
          video_url?: string | null
        }
        Update: {
          certification_id?: string
          content?: string | null
          created_at?: string | null
          description?: string | null
          estimated_minutes?: number | null
          id?: string
          learning_objectives?: string[] | null
          lesson_order?: number
          quiz_questions?: Json | null
          sprint_count?: number | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certification_lessons_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      certification_progress: {
        Row: {
          completed_at: string | null
          id: string
          lesson_id: string
          quiz_attempts: number | null
          quiz_score: number | null
          student_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          lesson_id: string
          quiz_attempts?: number | null
          quiz_score?: number | null
          student_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          lesson_id?: string
          quiz_attempts?: number | null
          quiz_score?: number | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certification_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "certification_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certification_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          badge_image_url: string | null
          created_at: string | null
          description: string | null
          estimated_hours: number | null
          id: string
          is_active: boolean | null
          is_free: boolean | null
          lessons_count: number | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          badge_image_url?: string | null
          created_at?: string | null
          description?: string | null
          estimated_hours?: number | null
          id?: string
          is_active?: boolean | null
          is_free?: boolean | null
          lessons_count?: number | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          badge_image_url?: string | null
          created_at?: string | null
          description?: string | null
          estimated_hours?: number | null
          id?: string
          is_active?: boolean | null
          is_free?: boolean | null
          lessons_count?: number | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      challenge_attempts: {
        Row: {
          ai_feedback: string | null
          archetype: string | null
          challenge_id: string
          completed_at: string | null
          created_at: string | null
          id: string
          response: string
          role_feedback: string | null
          score: number | null
          skills_awarded: Json | null
          student_id: string
          time_spent_seconds: number | null
          xp_earned: number | null
        }
        Insert: {
          ai_feedback?: string | null
          archetype?: string | null
          challenge_id: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          response: string
          role_feedback?: string | null
          score?: number | null
          skills_awarded?: Json | null
          student_id: string
          time_spent_seconds?: number | null
          xp_earned?: number | null
        }
        Update: {
          ai_feedback?: string | null
          archetype?: string | null
          challenge_id?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          response?: string
          role_feedback?: string | null
          score?: number | null
          skills_awarded?: Json | null
          student_id?: string
          time_spent_seconds?: number | null
          xp_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_attempts_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          age_range: string
          bloom_level: string | null
          category: string
          created_at: string | null
          difficulty_level: string
          display_order: number | null
          estimated_minutes: number
          id: string
          industry_track_id: string | null
          is_active: boolean | null
          is_daily_eligible: boolean | null
          learning_framework: string | null
          pillar: string | null
          question: string
          real_world_context: Json | null
          response_options: Json | null
          response_type: string | null
          role_metadata: Json | null
          role_type: string | null
          scenario: string
          skills_developed: Json
          success_criteria: Json
          title: string
          updated_at: string | null
          xp_reward: number
        }
        Insert: {
          age_range?: string
          bloom_level?: string | null
          category: string
          created_at?: string | null
          difficulty_level?: string
          display_order?: number | null
          estimated_minutes?: number
          id?: string
          industry_track_id?: string | null
          is_active?: boolean | null
          is_daily_eligible?: boolean | null
          learning_framework?: string | null
          pillar?: string | null
          question: string
          real_world_context?: Json | null
          response_options?: Json | null
          response_type?: string | null
          role_metadata?: Json | null
          role_type?: string | null
          scenario: string
          skills_developed?: Json
          success_criteria?: Json
          title: string
          updated_at?: string | null
          xp_reward?: number
        }
        Update: {
          age_range?: string
          bloom_level?: string | null
          category?: string
          created_at?: string | null
          difficulty_level?: string
          display_order?: number | null
          estimated_minutes?: number
          id?: string
          industry_track_id?: string | null
          is_active?: boolean | null
          is_daily_eligible?: boolean | null
          learning_framework?: string | null
          pillar?: string | null
          question?: string
          real_world_context?: Json | null
          response_options?: Json | null
          response_type?: string | null
          role_metadata?: Json | null
          role_type?: string | null
          scenario?: string
          skills_developed?: Json
          success_criteria?: Json
          title?: string
          updated_at?: string | null
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "challenges_industry_track_id_fkey"
            columns: ["industry_track_id"]
            isOneToOne: false
            referencedRelation: "industry_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          created_at: string | null
          id: string
          needs_attention: boolean | null
          stuck_indicators: Json | null
          student_id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          needs_attention?: boolean | null
          stuck_indicators?: Json | null
          student_id: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          needs_attention?: boolean | null
          stuck_indicators?: Json | null
          student_id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_conversations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      club_members: {
        Row: {
          club_id: string
          id: string
          joined_at: string | null
          role: string | null
          student_id: string
        }
        Insert: {
          club_id: string
          id?: string
          joined_at?: string | null
          role?: string | null
          student_id: string
        }
        Update: {
          club_id?: string
          id?: string
          joined_at?: string | null
          role?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_members_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      clubs: {
        Row: {
          advisor_user_id: string | null
          club_type: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          max_members: number | null
          meeting_schedule: string | null
          name: string
          school_id: string | null
          updated_at: string | null
        }
        Insert: {
          advisor_user_id?: string | null
          club_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_members?: number | null
          meeting_schedule?: string | null
          name: string
          school_id?: string | null
          updated_at?: string | null
        }
        Update: {
          advisor_user_id?: string | null
          club_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_members?: number | null
          meeting_schedule?: string | null
          name?: string
          school_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clubs_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      cohorts: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          name: string
          program: string
          start_date: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          name: string
          program: string
          start_date: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          name?: string
          program?: string
          start_date?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      curriculum_evaluations: {
        Row: {
          age_appropriateness_score: number | null
          ai_integration_score: number | null
          artifact_score: number | null
          created_at: string | null
          evaluated_at: string | null
          evaluated_by: string | null
          flags: Json | null
          id: string
          improved_version: Json | null
          learning_outcome_score: number | null
          mission_id: string | null
          overall_score: number | null
          privacy_score: number | null
          progression_score: number | null
          skill_value_score: number | null
          suggestions: Json | null
          time_efficiency_score: number | null
          updated_at: string | null
        }
        Insert: {
          age_appropriateness_score?: number | null
          ai_integration_score?: number | null
          artifact_score?: number | null
          created_at?: string | null
          evaluated_at?: string | null
          evaluated_by?: string | null
          flags?: Json | null
          id?: string
          improved_version?: Json | null
          learning_outcome_score?: number | null
          mission_id?: string | null
          overall_score?: number | null
          privacy_score?: number | null
          progression_score?: number | null
          skill_value_score?: number | null
          suggestions?: Json | null
          time_efficiency_score?: number | null
          updated_at?: string | null
        }
        Update: {
          age_appropriateness_score?: number | null
          ai_integration_score?: number | null
          artifact_score?: number | null
          created_at?: string | null
          evaluated_at?: string | null
          evaluated_by?: string | null
          flags?: Json | null
          id?: string
          improved_version?: Json | null
          learning_outcome_score?: number | null
          mission_id?: string | null
          overall_score?: number | null
          privacy_score?: number | null
          progression_score?: number | null
          skill_value_score?: number | null
          suggestions?: Json | null
          time_efficiency_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "curriculum_evaluations_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: true
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      curriculum_weeks: {
        Row: {
          created_at: string | null
          description: string | null
          homework_description: string | null
          id: string
          program: string
          template_url: string | null
          title: string
          unlock_date: string | null
          updated_at: string | null
          video_url: string | null
          week_number: number
          workflow_json: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          homework_description?: string | null
          id?: string
          program: string
          template_url?: string | null
          title: string
          unlock_date?: string | null
          updated_at?: string | null
          video_url?: string | null
          week_number: number
          workflow_json?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          homework_description?: string | null
          id?: string
          program?: string
          template_url?: string | null
          title?: string
          unlock_date?: string | null
          updated_at?: string | null
          video_url?: string | null
          week_number?: number
          workflow_json?: string | null
        }
        Relationships: []
      }
      deal_activities: {
        Row: {
          activity_type: string
          created_at: string | null
          created_by: string | null
          deal_id: string
          description: string | null
          id: string
          title: string
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          created_by?: string | null
          deal_id: string
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          created_by?: string | null
          deal_id?: string
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_activities_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          actual_close_date: string | null
          assigned_to: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          contact_role: string | null
          created_at: string | null
          created_by: string | null
          deal_value: number | null
          expected_close_date: string | null
          id: string
          license_type: string | null
          lost_reason: string | null
          notes: string | null
          priority: string | null
          school_id: string | null
          school_name: string
          source: string | null
          stage: string
          student_count: number | null
          updated_at: string | null
        }
        Insert: {
          actual_close_date?: string | null
          assigned_to?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contact_role?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_value?: number | null
          expected_close_date?: string | null
          id?: string
          license_type?: string | null
          lost_reason?: string | null
          notes?: string | null
          priority?: string | null
          school_id?: string | null
          school_name: string
          source?: string | null
          stage?: string
          student_count?: number | null
          updated_at?: string | null
        }
        Update: {
          actual_close_date?: string | null
          assigned_to?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contact_role?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_value?: number | null
          expected_close_date?: string | null
          id?: string
          license_type?: string | null
          lost_reason?: string | null
          notes?: string | null
          priority?: string | null
          school_id?: string | null
          school_name?: string
          source?: string | null
          stage?: string
          student_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          scheduled_at: string | null
          sent_count: number | null
          sequence: string
          started_at: string | null
          status: string | null
          total_recipients: number | null
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          scheduled_at?: string | null
          sent_count?: number | null
          sequence: string
          started_at?: string | null
          status?: string | null
          total_recipients?: number | null
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          scheduled_at?: string | null
          sent_count?: number | null
          sequence?: string
          started_at?: string | null
          status?: string | null
          total_recipients?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      email_sends: {
        Row: {
          bounced_at: string | null
          campaign_id: string | null
          clicked_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          opened_at: string | null
          recipient_email: string
          recipient_name: string | null
          recipient_type: string | null
          resend_id: string | null
          sent_at: string | null
          status: string | null
          template_id: string | null
        }
        Insert: {
          bounced_at?: string | null
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          opened_at?: string | null
          recipient_email: string
          recipient_name?: string | null
          recipient_type?: string | null
          resend_id?: string | null
          sent_at?: string | null
          status?: string | null
          template_id?: string | null
        }
        Update: {
          bounced_at?: string | null
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          opened_at?: string | null
          recipient_email?: string
          recipient_name?: string | null
          recipient_type?: string | null
          resend_id?: string | null
          sent_at?: string | null
          status?: string | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_sends_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sends_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          created_at: string | null
          html_content: string
          id: string
          is_active: boolean | null
          name: string
          order_in_sequence: number | null
          preview_text: string | null
          sequence: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          html_content: string
          id?: string
          is_active?: boolean | null
          name: string
          order_in_sequence?: number | null
          preview_text?: string | null
          sequence: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          html_content?: string
          id?: string
          is_active?: boolean | null
          name?: string
          order_in_sequence?: number | null
          preview_text?: string | null
          sequence?: string
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          amount_paid: number | null
          application_id: string | null
          created_at: string | null
          discount_applied: number | null
          ends_at: string | null
          enrolled_at: string | null
          id: string
          payment_type: string | null
          pricing_tier_id: string | null
          scholarship_id: string | null
          school_license_id: string | null
          starts_at: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          student_id: string | null
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount_paid?: number | null
          application_id?: string | null
          created_at?: string | null
          discount_applied?: number | null
          ends_at?: string | null
          enrolled_at?: string | null
          id?: string
          payment_type?: string | null
          pricing_tier_id?: string | null
          scholarship_id?: string | null
          school_license_id?: string | null
          starts_at?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          student_id?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount_paid?: number | null
          application_id?: string | null
          created_at?: string | null
          discount_applied?: number | null
          ends_at?: string | null
          enrolled_at?: string | null
          id?: string
          payment_type?: string | null
          pricing_tier_id?: string | null
          scholarship_id?: string | null
          school_license_id?: string | null
          starts_at?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          student_id?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "public_leaderboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_pricing_tier_id_fkey"
            columns: ["pricing_tier_id"]
            isOneToOne: false
            referencedRelation: "pricing_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_school_license_id_fkey"
            columns: ["school_license_id"]
            isOneToOne: false
            referencedRelation: "school_licenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      enterprise_admins: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          organization_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          organization_id: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          organization_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enterprise_admins_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "enterprise_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      enterprise_learners: {
        Row: {
          completed_at: string | null
          created_at: string | null
          department: string | null
          email: string
          enrolled_at: string | null
          full_name: string | null
          id: string
          job_title: string | null
          organization_id: string
          status: string | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          enrolled_at?: string | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          organization_id: string
          status?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          enrolled_at?: string | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          organization_id?: string
          status?: string | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enterprise_learners_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "enterprise_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enterprise_learners_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      enterprise_organizations: {
        Row: {
          created_at: string | null
          id: string
          industry: string | null
          is_active: boolean | null
          license_end_date: string | null
          license_start_date: string | null
          logo_url: string | null
          max_seats: number | null
          name: string
          primary_contact_email: string | null
          primary_contact_name: string | null
          primary_contact_phone: string | null
          settings: Json | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          license_end_date?: string | null
          license_start_date?: string | null
          logo_url?: string | null
          max_seats?: number | null
          name: string
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          settings?: Json | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          license_end_date?: string | null
          license_start_date?: string | null
          logo_url?: string | null
          max_seats?: number | null
          name?: string
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          settings?: Json | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      guardian_students: {
        Row: {
          can_contact_mentor: boolean | null
          can_view_payments: boolean | null
          can_view_progress: boolean | null
          created_at: string | null
          guardian_user_id: string
          id: string
          is_primary: boolean | null
          relationship: string | null
          student_id: string
          verified_at: string | null
        }
        Insert: {
          can_contact_mentor?: boolean | null
          can_view_payments?: boolean | null
          can_view_progress?: boolean | null
          created_at?: string | null
          guardian_user_id: string
          id?: string
          is_primary?: boolean | null
          relationship?: string | null
          student_id: string
          verified_at?: string | null
        }
        Update: {
          can_contact_mentor?: boolean | null
          can_view_payments?: boolean | null
          can_view_progress?: boolean | null
          created_at?: string | null
          guardian_user_id?: string
          id?: string
          is_primary?: boolean | null
          relationship?: string | null
          student_id?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guardian_students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      homework_feedback: {
        Row: {
          created_at: string | null
          feedback: string
          id: string
          improvements: string | null
          mentor_id: string
          progress_id: string
          rating: number | null
          strengths: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          feedback: string
          id?: string
          improvements?: string | null
          mentor_id: string
          progress_id: string
          rating?: number | null
          strengths?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          feedback?: string
          id?: string
          improvements?: string | null
          mentor_id?: string
          progress_id?: string
          rating?: number | null
          strengths?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "homework_feedback_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "homework_feedback_progress_id_fkey"
            columns: ["progress_id"]
            isOneToOne: false
            referencedRelation: "student_progress"
            referencedColumns: ["id"]
          },
        ]
      }
      idea_boards: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          student_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          student_id: string
          title?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          student_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "idea_boards_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      idea_cards: {
        Row: {
          board_id: string
          card_type: string
          color: string | null
          content: string | null
          created_at: string | null
          id: string
          is_ai_generated: boolean | null
          position_x: number | null
          position_y: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          board_id: string
          card_type: string
          color?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          is_ai_generated?: boolean | null
          position_x?: number | null
          position_y?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          board_id?: string
          card_type?: string
          color?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          is_ai_generated?: boolean | null
          position_x?: number | null
          position_y?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "idea_cards_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "idea_boards"
            referencedColumns: ["id"]
          },
        ]
      }
      industry_certifications: {
        Row: {
          career_paths: Json | null
          color_theme: string
          created_at: string | null
          description: string | null
          display_order: number | null
          estimated_hours: number | null
          hero_image_url: string | null
          icon: string
          id: string
          is_active: boolean | null
          modules_count: number | null
          name: string
          prerequisites: string[] | null
          real_world_companies: Json | null
          skill_focus_areas: Json | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          career_paths?: Json | null
          color_theme?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          estimated_hours?: number | null
          hero_image_url?: string | null
          icon: string
          id?: string
          is_active?: boolean | null
          modules_count?: number | null
          name: string
          prerequisites?: string[] | null
          real_world_companies?: Json | null
          skill_focus_areas?: Json | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          career_paths?: Json | null
          color_theme?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          estimated_hours?: number | null
          hero_image_url?: string | null
          icon?: string
          id?: string
          is_active?: boolean | null
          modules_count?: number | null
          name?: string
          prerequisites?: string[] | null
          real_world_companies?: Json | null
          skill_focus_areas?: Json | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      industry_modules: {
        Row: {
          bloom_levels: string[] | null
          case_study_company: string | null
          case_study_description: string | null
          certification_id: string
          created_at: string | null
          description: string | null
          estimated_minutes: number | null
          id: string
          learning_objectives: string[] | null
          module_number: number
          sprints_count: number | null
          title: string
        }
        Insert: {
          bloom_levels?: string[] | null
          case_study_company?: string | null
          case_study_description?: string | null
          certification_id: string
          created_at?: string | null
          description?: string | null
          estimated_minutes?: number | null
          id?: string
          learning_objectives?: string[] | null
          module_number: number
          sprints_count?: number | null
          title: string
        }
        Update: {
          bloom_levels?: string[] | null
          case_study_company?: string | null
          case_study_description?: string | null
          certification_id?: string
          created_at?: string | null
          description?: string | null
          estimated_minutes?: number | null
          id?: string
          learning_objectives?: string[] | null
          module_number?: number
          sprints_count?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "industry_modules_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "industry_certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      industry_sprints: {
        Row: {
          bloom_level: string | null
          content: string
          created_at: string | null
          estimated_seconds: number | null
          id: string
          learning_framework: string | null
          module_id: string
          quiz_questions: Json | null
          real_world_example: string | null
          reflection_prompt: string | null
          sprint_number: number
          title: string
        }
        Insert: {
          bloom_level?: string | null
          content: string
          created_at?: string | null
          estimated_seconds?: number | null
          id?: string
          learning_framework?: string | null
          module_id: string
          quiz_questions?: Json | null
          real_world_example?: string | null
          reflection_prompt?: string | null
          sprint_number: number
          title: string
        }
        Update: {
          bloom_level?: string | null
          content?: string
          created_at?: string | null
          estimated_seconds?: number | null
          id?: string
          learning_framework?: string | null
          module_id?: string
          quiz_questions?: Json | null
          real_world_example?: string | null
          reflection_prompt?: string | null
          sprint_number?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "industry_sprints_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "industry_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      industry_tracks: {
        Row: {
          color_theme: string
          created_at: string | null
          description: string
          display_order: number | null
          hero_image_url: string | null
          icon: string
          id: string
          is_active: boolean | null
          name: string
          skill_focus_areas: Json | null
          slug: string
          target_age_range: string | null
          updated_at: string | null
        }
        Insert: {
          color_theme?: string
          created_at?: string | null
          description: string
          display_order?: number | null
          hero_image_url?: string | null
          icon: string
          id?: string
          is_active?: boolean | null
          name: string
          skill_focus_areas?: Json | null
          slug: string
          target_age_range?: string | null
          updated_at?: string | null
        }
        Update: {
          color_theme?: string
          created_at?: string | null
          description?: string
          display_order?: number | null
          hero_image_url?: string | null
          icon?: string
          id?: string
          is_active?: boolean | null
          name?: string
          skill_focus_areas?: Json | null
          slug?: string
          target_age_range?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      launch_checklists: {
        Row: {
          checklist_items: Json
          completed_count: number | null
          created_at: string | null
          id: string
          student_id: string
          total_count: number | null
          updated_at: string | null
        }
        Insert: {
          checklist_items?: Json
          completed_count?: number | null
          created_at?: string | null
          id?: string
          student_id: string
          total_count?: number | null
          updated_at?: string | null
        }
        Update: {
          checklist_items?: Json
          completed_count?: number | null
          created_at?: string | null
          id?: string
          student_id?: string
          total_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "launch_checklists_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string | null
          email: string
          id: string
          interested_program: string | null
          last_contact_at: string | null
          lead_score: number | null
          name: string | null
          notes: string | null
          source: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          interested_program?: string | null
          last_contact_at?: string | null
          lead_score?: number | null
          name?: string | null
          notes?: string | null
          source?: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          interested_program?: string | null
          last_contact_at?: string | null
          lead_score?: number | null
          name?: string | null
          notes?: string | null
          source?: string
          status?: string | null
        }
        Relationships: []
      }
      learning_objectives: {
        Row: {
          bloom_level: string | null
          certificate_type: string
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          lesson_id: string | null
          measurable_outcome: string
          objective: string
          phase: number | null
          skill_category: string | null
          updated_at: string | null
          week: number | null
        }
        Insert: {
          bloom_level?: string | null
          certificate_type: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          lesson_id?: string | null
          measurable_outcome: string
          objective: string
          phase?: number | null
          skill_category?: string | null
          updated_at?: string | null
          week?: number | null
        }
        Update: {
          bloom_level?: string | null
          certificate_type?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          lesson_id?: string | null
          measurable_outcome?: string
          objective?: string
          phase?: number | null
          skill_category?: string | null
          updated_at?: string | null
          week?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_objectives_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "certification_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_sprints: {
        Row: {
          bloom_level: string | null
          content: string
          created_at: string | null
          estimated_seconds: number
          id: string
          learning_framework: string | null
          lesson_id: string
          quiz_questions: Json | null
          sprint_order: number
          title: string
        }
        Insert: {
          bloom_level?: string | null
          content: string
          created_at?: string | null
          estimated_seconds?: number
          id?: string
          learning_framework?: string | null
          lesson_id: string
          quiz_questions?: Json | null
          sprint_order: number
          title: string
        }
        Update: {
          bloom_level?: string | null
          content?: string
          created_at?: string | null
          estimated_seconds?: number
          id?: string
          learning_framework?: string | null
          lesson_id?: string
          quiz_questions?: Json | null
          sprint_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_sprints_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "certification_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      live_classes: {
        Row: {
          class_type: string | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_recurring: boolean | null
          program: string
          recording_url: string | null
          scheduled_at: string
          title: string
          updated_at: string | null
          week_number: number | null
          zoom_link: string
          zoom_meeting_id: string | null
          zoom_passcode: string | null
        }
        Insert: {
          class_type?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_recurring?: boolean | null
          program: string
          recording_url?: string | null
          scheduled_at: string
          title: string
          updated_at?: string | null
          week_number?: number | null
          zoom_link: string
          zoom_meeting_id?: string | null
          zoom_passcode?: string | null
        }
        Update: {
          class_type?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_recurring?: boolean | null
          program?: string
          recording_url?: string | null
          scheduled_at?: string
          title?: string
          updated_at?: string | null
          week_number?: number | null
          zoom_link?: string
          zoom_meeting_id?: string | null
          zoom_passcode?: string | null
        }
        Relationships: []
      }
      mentor_availability: {
        Row: {
          created_at: string | null
          day_of_week: number
          end_time: string
          id: string
          is_active: boolean | null
          mentor_id: string
          start_time: string
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          end_time: string
          id?: string
          is_active?: boolean | null
          mentor_id: string
          start_time: string
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          id?: string
          is_active?: boolean | null
          mentor_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentor_availability_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_blocked_dates: {
        Row: {
          blocked_date: string
          created_at: string | null
          id: string
          mentor_id: string
          reason: string | null
        }
        Insert: {
          blocked_date: string
          created_at?: string | null
          id?: string
          mentor_id: string
          reason?: string | null
        }
        Update: {
          blocked_date?: string
          created_at?: string | null
          id?: string
          mentor_id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentor_blocked_dates_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_bookings: {
        Row: {
          agenda: string | null
          booked_by: string
          cancelled_by: string | null
          cancelled_reason: string | null
          created_at: string | null
          credits_used: number | null
          duration_minutes: number | null
          id: string
          meeting_link: string | null
          mentor_id: string
          mentor_notes: string | null
          mentor_rating: number | null
          questions: string | null
          scheduled_at: string
          status: string | null
          team_feedback: string | null
          team_id: string
          team_rating: number | null
          updated_at: string | null
        }
        Insert: {
          agenda?: string | null
          booked_by: string
          cancelled_by?: string | null
          cancelled_reason?: string | null
          created_at?: string | null
          credits_used?: number | null
          duration_minutes?: number | null
          id?: string
          meeting_link?: string | null
          mentor_id: string
          mentor_notes?: string | null
          mentor_rating?: number | null
          questions?: string | null
          scheduled_at: string
          status?: string | null
          team_feedback?: string | null
          team_id: string
          team_rating?: number | null
          updated_at?: string | null
        }
        Update: {
          agenda?: string | null
          booked_by?: string
          cancelled_by?: string | null
          cancelled_reason?: string | null
          created_at?: string | null
          credits_used?: number | null
          duration_minutes?: number | null
          id?: string
          meeting_link?: string | null
          mentor_id?: string
          mentor_notes?: string | null
          mentor_rating?: number | null
          questions?: string | null
          scheduled_at?: string
          status?: string | null
          team_feedback?: string | null
          team_id?: string
          team_rating?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentor_bookings_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_bookings_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string | null
          email: string
          expertise: string[] | null
          full_name: string
          id: string
          industries: string[] | null
          is_accepting_teams: boolean | null
          is_active: boolean | null
          job_title: string | null
          languages: string[] | null
          linkedin_url: string | null
          max_teams: number | null
          timezone: string | null
          updated_at: string | null
          user_id: string
          years_experience: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          expertise?: string[] | null
          full_name: string
          id?: string
          industries?: string[] | null
          is_accepting_teams?: boolean | null
          is_active?: boolean | null
          job_title?: string | null
          languages?: string[] | null
          linkedin_url?: string | null
          max_teams?: number | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
          years_experience?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          expertise?: string[] | null
          full_name?: string
          id?: string
          industries?: string[] | null
          is_accepting_teams?: boolean | null
          is_active?: boolean | null
          job_title?: string | null
          languages?: string[] | null
          linkedin_url?: string | null
          max_teams?: number | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      mission_sprint_progress: {
        Row: {
          completed_at: string | null
          id: string
          quiz_score: number | null
          sprint_id: string
          student_id: string
          time_spent_seconds: number | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          quiz_score?: number | null
          sprint_id: string
          student_id: string
          time_spent_seconds?: number | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          quiz_score?: number | null
          sprint_id?: string
          student_id?: string
          time_spent_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mission_sprint_progress_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "mission_sprints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mission_sprint_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_sprints: {
        Row: {
          bloom_level: string | null
          content: string
          created_at: string | null
          estimated_seconds: number
          id: string
          lab_instructions: string | null
          learning_framework: string | null
          mission_id: string
          quiz_questions: Json | null
          sprint_order: number
          sprint_type: string
          title: string
        }
        Insert: {
          bloom_level?: string | null
          content: string
          created_at?: string | null
          estimated_seconds?: number
          id?: string
          lab_instructions?: string | null
          learning_framework?: string | null
          mission_id: string
          quiz_questions?: Json | null
          sprint_order: number
          sprint_type?: string
          title: string
        }
        Update: {
          bloom_level?: string | null
          content?: string
          created_at?: string | null
          estimated_seconds?: number
          id?: string
          lab_instructions?: string | null
          learning_framework?: string | null
          mission_id?: string
          quiz_questions?: Json | null
          sprint_order?: number
          sprint_type?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_sprints_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_steps: {
        Row: {
          created_at: string | null
          example_output: string | null
          id: string
          input_placeholder: string | null
          input_type: string
          instruction: string
          is_required: boolean | null
          mission_id: string
          prompt_help: string | null
          step_number: number
          title: string
        }
        Insert: {
          created_at?: string | null
          example_output?: string | null
          id?: string
          input_placeholder?: string | null
          input_type?: string
          instruction: string
          is_required?: boolean | null
          mission_id: string
          prompt_help?: string | null
          step_number: number
          title: string
        }
        Update: {
          created_at?: string | null
          example_output?: string | null
          id?: string
          input_placeholder?: string | null
          input_type?: string
          instruction?: string
          is_required?: boolean | null
          mission_id?: string
          prompt_help?: string | null
          step_number?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_steps_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      missions: {
        Row: {
          ai_tool_used: string | null
          artifact_type: Database["public"]["Enums"]["artifact_type"] | null
          created_at: string | null
          day: number
          day_number: number
          estimated_minutes: number
          id: string
          lab_prompt: string
          micro_content: string
          phase: number
          sprint_count: number | null
          subtitle: string | null
          title: string
          track: string
          updated_at: string | null
          video_url: string | null
          week: number
        }
        Insert: {
          ai_tool_used?: string | null
          artifact_type?: Database["public"]["Enums"]["artifact_type"] | null
          created_at?: string | null
          day: number
          day_number: number
          estimated_minutes?: number
          id?: string
          lab_prompt: string
          micro_content: string
          phase: number
          sprint_count?: number | null
          subtitle?: string | null
          title: string
          track: string
          updated_at?: string | null
          video_url?: string | null
          week: number
        }
        Update: {
          ai_tool_used?: string | null
          artifact_type?: Database["public"]["Enums"]["artifact_type"] | null
          created_at?: string | null
          day?: number
          day_number?: number
          estimated_minutes?: number
          id?: string
          lab_prompt?: string
          micro_content?: string
          phase?: number
          sprint_count?: number | null
          subtitle?: string | null
          title?: string
          track?: string
          updated_at?: string | null
          video_url?: string | null
          week?: number
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          enrollment_id: string
          failure_reason: string | null
          id: string
          paid_at: string | null
          payment_method: string | null
          payment_number: number | null
          refunded_at: string | null
          status: string | null
          stripe_charge_id: string | null
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          enrollment_id: string
          failure_reason?: string | null
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          payment_number?: number | null
          refunded_at?: string | null
          status?: string | null
          stripe_charge_id?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          enrollment_id?: string
          failure_reason?: string | null
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          payment_number?: number | null
          refunded_at?: string | null
          status?: string | null
          stripe_charge_id?: string | null
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
        ]
      }
      pitch_attempts: {
        Row: {
          ai_feedback: Json | null
          created_at: string | null
          duration_seconds: number | null
          id: string
          investor_persona: string | null
          is_public: boolean | null
          mission_id: string | null
          questions_asked: Json | null
          score: number | null
          scores: Json | null
          student_id: string
          total_xp_earned: number | null
          transcript: string | null
          video_url: string | null
        }
        Insert: {
          ai_feedback?: Json | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          investor_persona?: string | null
          is_public?: boolean | null
          mission_id?: string | null
          questions_asked?: Json | null
          score?: number | null
          scores?: Json | null
          student_id: string
          total_xp_earned?: number | null
          transcript?: string | null
          video_url?: string | null
        }
        Update: {
          ai_feedback?: Json | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          investor_persona?: string | null
          is_public?: boolean | null
          mission_id?: string | null
          questions_asked?: Json | null
          score?: number | null
          scores?: Json | null
          student_id?: string
          total_xp_earned?: number | null
          transcript?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pitch_attempts_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pitch_attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_changes_log: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          field_changed: string
          id: string
          new_value: string | null
          old_value: string | null
          tier_id: string | null
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          field_changed: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          tier_id?: string | null
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          field_changed?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          tier_id?: string | null
        }
        Relationships: []
      }
      pricing_tiers: {
        Row: {
          badge_text: string | null
          billing_period: string | null
          certificates_included: string[] | null
          created_at: string | null
          current_price: number | null
          display_order: number | null
          duration_months: number
          features: Json | null
          id: string
          includes_yearly_access: boolean | null
          is_active: boolean | null
          is_featured: boolean | null
          max_students: number | null
          min_students: number | null
          monthly_price: number
          name: string
          original_price: number | null
          program: string
          slug: string | null
          tier_type: string
          trial_days: number | null
          type: string | null
          updated_at: string | null
          upfront_price: number
        }
        Insert: {
          badge_text?: string | null
          billing_period?: string | null
          certificates_included?: string[] | null
          created_at?: string | null
          current_price?: number | null
          display_order?: number | null
          duration_months?: number
          features?: Json | null
          id?: string
          includes_yearly_access?: boolean | null
          is_active?: boolean | null
          is_featured?: boolean | null
          max_students?: number | null
          min_students?: number | null
          monthly_price?: number
          name: string
          original_price?: number | null
          program: string
          slug?: string | null
          tier_type: string
          trial_days?: number | null
          type?: string | null
          updated_at?: string | null
          upfront_price?: number
        }
        Update: {
          badge_text?: string | null
          billing_period?: string | null
          certificates_included?: string[] | null
          created_at?: string | null
          current_price?: number | null
          display_order?: number | null
          duration_months?: number
          features?: Json | null
          id?: string
          includes_yearly_access?: boolean | null
          is_active?: boolean | null
          is_featured?: boolean | null
          max_students?: number | null
          min_students?: number | null
          monthly_price?: number
          name?: string
          original_price?: number | null
          program?: string
          slug?: string | null
          tier_type?: string
          trial_days?: number | null
          type?: string | null
          updated_at?: string | null
          upfront_price?: number
        }
        Relationships: []
      }
      prompts: {
        Row: {
          created_at: string | null
          description: string
          difficulty: Database["public"]["Enums"]["prompt_difficulty"]
          id: string
          kid_category: Database["public"]["Enums"]["prompt_kid_category"]
          program_track: string | null
          prompt_template: string
          stage: Database["public"]["Enums"]["prompt_stage"]
          title: string
          updated_at: string | null
          usage_count: number | null
          week_relevant: number[] | null
        }
        Insert: {
          created_at?: string | null
          description: string
          difficulty?: Database["public"]["Enums"]["prompt_difficulty"]
          id?: string
          kid_category: Database["public"]["Enums"]["prompt_kid_category"]
          program_track?: string | null
          prompt_template: string
          stage: Database["public"]["Enums"]["prompt_stage"]
          title: string
          updated_at?: string | null
          usage_count?: number | null
          week_relevant?: number[] | null
        }
        Update: {
          created_at?: string | null
          description?: string
          difficulty?: Database["public"]["Enums"]["prompt_difficulty"]
          id?: string
          kid_category?: Database["public"]["Enums"]["prompt_kid_category"]
          program_track?: string | null
          prompt_template?: string
          stage?: Database["public"]["Enums"]["prompt_stage"]
          title?: string
          updated_at?: string | null
          usage_count?: number | null
          week_relevant?: number[] | null
        }
        Relationships: []
      }
      reflections: {
        Row: {
          created_at: string | null
          id: string
          mission_id: string
          mood: number | null
          student_id: string
          what_learned: string | null
          what_next: string | null
          what_surprised: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          mission_id: string
          mood?: number | null
          student_id: string
          what_learned?: string | null
          what_next?: string | null
          what_surprised?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          mission_id?: string
          mood?: number | null
          student_id?: string
          what_learned?: string | null
          what_next?: string | null
          what_surprised?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reflections_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reflections_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          age_groups: string[] | null
          category: string
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          id: string
          intent_tags: string[] | null
          is_featured: boolean | null
          program: string | null
          resource_type: string
          thumbnail_url: string | null
          title: string
          url: string
          video_embed_url: string | null
          week_number: number | null
          week_relevance: number[] | null
        }
        Insert: {
          age_groups?: string[] | null
          category: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: string
          intent_tags?: string[] | null
          is_featured?: boolean | null
          program?: string | null
          resource_type: string
          thumbnail_url?: string | null
          title: string
          url: string
          video_embed_url?: string | null
          week_number?: number | null
          week_relevance?: number[] | null
        }
        Update: {
          age_groups?: string[] | null
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          id?: string
          intent_tags?: string[] | null
          is_featured?: boolean | null
          program?: string | null
          resource_type?: string
          thumbnail_url?: string | null
          title?: string
          url?: string
          video_embed_url?: string | null
          week_number?: number | null
          week_relevance?: number[] | null
        }
        Relationships: []
      }
      sales_conversations: {
        Row: {
          budget_range: string | null
          child_age: number | null
          child_name: string | null
          created_at: string | null
          id: string
          interested_program: string | null
          lead_id: string | null
          lead_score: number | null
          objections: string[] | null
          pain_points: string[] | null
          parent_name: string | null
          qualified_at: string | null
          session_id: string
          status: string | null
          timeline: string | null
          updated_at: string | null
        }
        Insert: {
          budget_range?: string | null
          child_age?: number | null
          child_name?: string | null
          created_at?: string | null
          id?: string
          interested_program?: string | null
          lead_id?: string | null
          lead_score?: number | null
          objections?: string[] | null
          pain_points?: string[] | null
          parent_name?: string | null
          qualified_at?: string | null
          session_id: string
          status?: string | null
          timeline?: string | null
          updated_at?: string | null
        }
        Update: {
          budget_range?: string | null
          child_age?: number | null
          child_name?: string | null
          created_at?: string | null
          id?: string
          interested_program?: string | null
          lead_id?: string | null
          lead_score?: number | null
          objections?: string[] | null
          pain_points?: string[] | null
          parent_name?: string | null
          qualified_at?: string | null
          session_id?: string
          status?: string | null
          timeline?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_meetings: {
        Row: {
          attendee_email: string
          attendee_name: string | null
          attendee_phone: string | null
          conversation_id: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          lead_id: string | null
          meeting_link: string | null
          meeting_type: string | null
          notes: string | null
          reminder_sent: boolean | null
          scheduled_at: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          attendee_email: string
          attendee_name?: string | null
          attendee_phone?: string | null
          conversation_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          lead_id?: string | null
          meeting_link?: string | null
          meeting_type?: string | null
          notes?: string | null
          reminder_sent?: boolean | null
          scheduled_at: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          attendee_email?: string
          attendee_name?: string | null
          attendee_phone?: string | null
          conversation_id?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          lead_id?: string | null
          meeting_link?: string | null
          meeting_type?: string | null
          notes?: string | null
          reminder_sent?: boolean | null
          scheduled_at?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_meetings_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "sales_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_meetings_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          intent: string | null
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          intent?: string | null
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          intent?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "sales_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarship_codes: {
        Row: {
          applicable_tiers: string[] | null
          code: string
          created_at: string | null
          created_by: string | null
          current_uses: number | null
          discount_amount: number | null
          discount_type: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
        }
        Insert: {
          applicable_tiers?: string[] | null
          code: string
          created_at?: string | null
          created_by?: string | null
          current_uses?: number | null
          discount_amount?: number | null
          discount_type?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
        }
        Update: {
          applicable_tiers?: string[] | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          current_uses?: number | null
          discount_amount?: number | null
          discount_type?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
        }
        Relationships: []
      }
      scholarships: {
        Row: {
          application_id: string | null
          applied_at: string | null
          approved_by: string | null
          created_at: string | null
          discount_percentage: number
          id: string
          reason: string | null
          reviewed_at: string | null
          status: string | null
        }
        Insert: {
          application_id?: string | null
          applied_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          discount_percentage?: number
          id?: string
          reason?: string | null
          reviewed_at?: string | null
          status?: string | null
        }
        Update: {
          application_id?: string | null
          applied_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          discount_percentage?: number
          id?: string
          reason?: string | null
          reviewed_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scholarships_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scholarships_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "public_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      school_admins: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          role: string | null
          school_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          role?: string | null
          school_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          role?: string | null
          school_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_admins_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_invites: {
        Row: {
          code: string
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          grade: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          program: string
          school_id: string
          updated_at: string | null
          uses_count: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          grade?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          program: string
          school_id: string
          updated_at?: string | null
          uses_count?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          grade?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          program?: string
          school_id?: string
          updated_at?: string | null
          uses_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "school_invites_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_licenses: {
        Row: {
          case_study_agreed: boolean | null
          created_at: string | null
          enrolled_students: number | null
          expires_at: string | null
          id: string
          invoice_url: string | null
          is_pilot: boolean | null
          license_type: string
          max_students: number
          notes: string | null
          pilot_end_date: string | null
          price_per_student: number | null
          school_id: string | null
          starts_at: string | null
          status: string | null
          stripe_subscription_id: string | null
          total_annual_price: number
          updated_at: string | null
        }
        Insert: {
          case_study_agreed?: boolean | null
          created_at?: string | null
          enrolled_students?: number | null
          expires_at?: string | null
          id?: string
          invoice_url?: string | null
          is_pilot?: boolean | null
          license_type?: string
          max_students?: number
          notes?: string | null
          pilot_end_date?: string | null
          price_per_student?: number | null
          school_id?: string | null
          starts_at?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          total_annual_price?: number
          updated_at?: string | null
        }
        Update: {
          case_study_agreed?: boolean | null
          created_at?: string | null
          enrolled_students?: number | null
          expires_at?: string | null
          id?: string
          invoice_url?: string | null
          is_pilot?: boolean | null
          license_type?: string
          max_students?: number
          notes?: string | null
          pilot_end_date?: string | null
          price_per_student?: number | null
          school_id?: string | null
          starts_at?: string | null
          status?: string | null
          stripe_subscription_id?: string | null
          total_annual_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "school_licenses_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_name_mappings: {
        Row: {
          confidence_score: number | null
          created_at: string
          created_by: string | null
          id: string
          mapping_source: string
          original_name: string
          standardized_name: string
          times_used: number | null
          updated_at: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          created_by?: string | null
          id?: string
          mapping_source?: string
          original_name: string
          standardized_name: string
          times_used?: number | null
          updated_at?: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          created_by?: string | null
          id?: string
          mapping_source?: string
          original_name?: string
          standardized_name?: string
          times_used?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      school_student_enrollments: {
        Row: {
          created_at: string | null
          enrolled_at: string | null
          enrolled_by: string | null
          enrollment_method: string
          id: string
          invite_id: string | null
          license_id: string | null
          school_id: string
          status: string | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          enrolled_at?: string | null
          enrolled_by?: string | null
          enrollment_method: string
          id?: string
          invite_id?: string | null
          license_id?: string | null
          school_id: string
          status?: string | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          enrolled_at?: string | null
          enrolled_by?: string | null
          enrollment_method?: string
          id?: string
          invite_id?: string | null
          license_id?: string | null
          school_id?: string
          status?: string | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "school_student_enrollments_invite_id_fkey"
            columns: ["invite_id"]
            isOneToOne: false
            referencedRelation: "school_invites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "school_student_enrollments_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "school_licenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "school_student_enrollments_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "school_student_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          address: string | null
          city: string | null
          code: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          country: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          max_students: number | null
          name: string
          plan_type: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          code?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          max_students?: number | null
          name: string
          plan_type?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          code?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          max_students?: number | null
          name?: string
          plan_type?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      skill_assessments: {
        Row: {
          behavioral_score: number | null
          combined_score: number | null
          created_at: string | null
          current_level: string
          id: string
          last_assessment_at: string | null
          momentum: string | null
          momentum_change: number | null
          performance_score: number | null
          signature_strength: boolean | null
          skill_category: string
          student_id: string
          updated_at: string | null
        }
        Insert: {
          behavioral_score?: number | null
          combined_score?: number | null
          created_at?: string | null
          current_level?: string
          id?: string
          last_assessment_at?: string | null
          momentum?: string | null
          momentum_change?: number | null
          performance_score?: number | null
          signature_strength?: boolean | null
          skill_category: string
          student_id: string
          updated_at?: string | null
        }
        Update: {
          behavioral_score?: number | null
          combined_score?: number | null
          created_at?: string | null
          current_level?: string
          id?: string
          last_assessment_at?: string | null
          momentum?: string | null
          momentum_change?: number | null
          performance_score?: number | null
          signature_strength?: boolean | null
          skill_category?: string
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_assessments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_insights: {
        Row: {
          at_risk_indicators: Json | null
          created_at: string | null
          engagement_score: number | null
          growth_tips: string[] | null
          id: string
          learning_style: string | null
          signature_strength_description: string | null
          signature_strength_name: string | null
          student_id: string
          team_role_suggestion: string | null
          updated_at: string | null
          weekly_recommendations: Json | null
        }
        Insert: {
          at_risk_indicators?: Json | null
          created_at?: string | null
          engagement_score?: number | null
          growth_tips?: string[] | null
          id?: string
          learning_style?: string | null
          signature_strength_description?: string | null
          signature_strength_name?: string | null
          student_id: string
          team_role_suggestion?: string | null
          updated_at?: string | null
          weekly_recommendations?: Json | null
        }
        Update: {
          at_risk_indicators?: Json | null
          created_at?: string | null
          engagement_score?: number | null
          growth_tips?: string[] | null
          id?: string
          learning_style?: string | null
          signature_strength_description?: string | null
          signature_strength_name?: string | null
          student_id?: string
          team_role_suggestion?: string | null
          updated_at?: string | null
          weekly_recommendations?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_insights_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_mappings: {
        Row: {
          created_at: string | null
          id: string
          mission_id: string
          points: number
          skill: Database["public"]["Enums"]["skill_type"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          mission_id: string
          points?: number
          skill: Database["public"]["Enums"]["skill_type"]
        }
        Update: {
          created_at?: string | null
          id?: string
          mission_id?: string
          points?: number
          skill?: Database["public"]["Enums"]["skill_type"]
        }
        Relationships: [
          {
            foreignKeyName: "skill_mappings_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_scores: {
        Row: {
          created_at: string | null
          id: string
          last_earned_at: string | null
          missions_completed: number
          skill: Database["public"]["Enums"]["skill_type"]
          student_id: string
          total_points: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_earned_at?: string | null
          missions_completed?: number
          skill: Database["public"]["Enums"]["skill_type"]
          student_id: string
          total_points?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_earned_at?: string | null
          missions_completed?: number
          skill?: Database["public"]["Enums"]["skill_type"]
          student_id?: string
          total_points?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_scores_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      sprint_progress: {
        Row: {
          completed_at: string | null
          id: string
          quiz_score: number | null
          sprint_id: string
          student_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          quiz_score?: number | null
          sprint_id: string
          student_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          quiz_score?: number | null
          sprint_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sprint_progress_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "lesson_sprints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprint_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      strength_history: {
        Row: {
          created_at: string | null
          founder_type: string | null
          id: string
          missions_completed: number | null
          role_fit: Json | null
          skill_snapshot: Json | null
          student_id: string
          total_xp: number | null
          week_number: number
        }
        Insert: {
          created_at?: string | null
          founder_type?: string | null
          id?: string
          missions_completed?: number | null
          role_fit?: Json | null
          skill_snapshot?: Json | null
          student_id: string
          total_xp?: number | null
          week_number: number
        }
        Update: {
          created_at?: string | null
          founder_type?: string | null
          id?: string
          missions_completed?: number | null
          role_fit?: Json | null
          skill_snapshot?: Json | null
          student_id?: string
          total_xp?: number | null
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "strength_history_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      strength_profiles: {
        Row: {
          analysis_data: Json | null
          created_at: string | null
          founder_type: string
          founder_type_description: string | null
          growth_edges: string[] | null
          id: string
          personalized_insight: string | null
          recommended_focus: string | null
          role_fit: Json | null
          student_id: string
          superpowers: string[] | null
          updated_at: string | null
        }
        Insert: {
          analysis_data?: Json | null
          created_at?: string | null
          founder_type: string
          founder_type_description?: string | null
          growth_edges?: string[] | null
          id?: string
          personalized_insight?: string | null
          recommended_focus?: string | null
          role_fit?: Json | null
          student_id: string
          superpowers?: string[] | null
          updated_at?: string | null
        }
        Update: {
          analysis_data?: Json | null
          created_at?: string | null
          founder_type?: string
          founder_type_description?: string | null
          growth_edges?: string[] | null
          id?: string
          personalized_insight?: string | null
          recommended_focus?: string | null
          role_fit?: Json | null
          student_id?: string
          superpowers?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strength_profiles_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_ai_usage: {
        Row: {
          created_at: string | null
          feature: string
          id: string
          student_id: string
          tokens_input: number | null
          tokens_output: number | null
        }
        Insert: {
          created_at?: string | null
          feature: string
          id?: string
          student_id: string
          tokens_input?: number | null
          tokens_output?: number | null
        }
        Update: {
          created_at?: string | null
          feature?: string
          id?: string
          student_id?: string
          tokens_input?: number | null
          tokens_output?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_ai_usage_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_certifications: {
        Row: {
          certificate_number: string | null
          certificate_url: string | null
          certification_id: string
          completed_at: string | null
          id: string
          linkedin_shared: boolean | null
          linkedin_shared_at: string | null
          started_at: string | null
          student_id: string
        }
        Insert: {
          certificate_number?: string | null
          certificate_url?: string | null
          certification_id: string
          completed_at?: string | null
          id?: string
          linkedin_shared?: boolean | null
          linkedin_shared_at?: string | null
          started_at?: string | null
          student_id: string
        }
        Update: {
          certificate_number?: string | null
          certificate_url?: string | null
          certification_id?: string
          completed_at?: string | null
          id?: string
          linkedin_shared?: boolean | null
          linkedin_shared_at?: string | null
          started_at?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_certifications_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_certifications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_industry_progress: {
        Row: {
          certificate_number: string | null
          certification_id: string
          completed_at: string | null
          current_module_id: string | null
          id: string
          modules_completed: number | null
          sprints_completed: number | null
          started_at: string | null
          student_id: string
        }
        Insert: {
          certificate_number?: string | null
          certification_id: string
          completed_at?: string | null
          current_module_id?: string | null
          id?: string
          modules_completed?: number | null
          sprints_completed?: number | null
          started_at?: string | null
          student_id: string
        }
        Update: {
          certificate_number?: string | null
          certification_id?: string
          completed_at?: string | null
          current_module_id?: string | null
          id?: string
          modules_completed?: number | null
          sprints_completed?: number | null
          started_at?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_industry_progress_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "industry_certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_industry_progress_current_module_id_fkey"
            columns: ["current_module_id"]
            isOneToOne: false
            referencedRelation: "industry_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_industry_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_industry_sprint_progress: {
        Row: {
          completed_at: string | null
          id: string
          quiz_score: number | null
          sprint_id: string
          student_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          quiz_score?: number | null
          sprint_id: string
          student_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          quiz_score?: number | null
          sprint_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_industry_sprint_progress_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "industry_sprints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_industry_sprint_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_issues: {
        Row: {
          ai_response: string | null
          created_at: string | null
          description: string | null
          id: string
          resolved_at: string | null
          screenshot_url: string | null
          status: string | null
          student_id: string
          title: string
          tool_name: string | null
        }
        Insert: {
          ai_response?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          resolved_at?: string | null
          screenshot_url?: string | null
          status?: string | null
          student_id: string
          title: string
          tool_name?: string | null
        }
        Update: {
          ai_response?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          resolved_at?: string | null
          screenshot_url?: string | null
          status?: string | null
          student_id?: string
          title?: string
          tool_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_issues_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_missions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          mission_id: string
          started_at: string | null
          status: Database["public"]["Enums"]["mission_status"]
          student_id: string
          time_spent_minutes: number | null
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          mission_id: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["mission_status"]
          student_id: string
          time_spent_minutes?: number | null
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          mission_id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["mission_status"]
          student_id?: string
          time_spent_minutes?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_missions_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_missions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          homework_submitted: boolean | null
          homework_url: string | null
          id: string
          mentor_feedback: string | null
          started_at: string | null
          student_id: string
          updated_at: string | null
          week_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          homework_submitted?: boolean | null
          homework_url?: string | null
          id?: string
          mentor_feedback?: string | null
          started_at?: string | null
          student_id: string
          updated_at?: string | null
          week_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          homework_submitted?: boolean | null
          homework_url?: string | null
          id?: string
          mentor_feedback?: string | null
          started_at?: string | null
          student_id?: string
          updated_at?: string | null
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "curriculum_weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      student_prompt_favorites: {
        Row: {
          id: string
          prompt_id: string
          saved_at: string | null
          student_id: string
        }
        Insert: {
          id?: string
          prompt_id: string
          saved_at?: string | null
          student_id: string
        }
        Update: {
          id?: string
          prompt_id?: string
          saved_at?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_prompt_favorites_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_prompt_favorites_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_prompt_history: {
        Row: {
          context: string | null
          id: string
          prompt_id: string
          student_id: string
          used_at: string | null
        }
        Insert: {
          context?: string | null
          id?: string
          prompt_id: string
          student_id: string
          used_at?: string | null
        }
        Update: {
          context?: string | null
          id?: string
          prompt_id?: string
          student_id?: string
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_prompt_history_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_prompt_history_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_revenue: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          recorded_at: string | null
          source: string
          student_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          recorded_at?: string | null
          source: string
          student_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          recorded_at?: string | null
          source?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_revenue_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_streaks: {
        Row: {
          created_at: string | null
          current_streak: number
          id: string
          last_challenge_date: string | null
          longest_streak: number
          streak_freezes_available: number
          streak_frozen_until: string | null
          student_id: string
          total_challenges_completed: number
          total_xp_earned: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_streak?: number
          id?: string
          last_challenge_date?: string | null
          longest_streak?: number
          streak_freezes_available?: number
          streak_frozen_until?: string | null
          student_id: string
          total_challenges_completed?: number
          total_xp_earned?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_streak?: number
          id?: string
          last_challenge_date?: string | null
          longest_streak?: number
          streak_freezes_available?: number
          streak_frozen_until?: string | null
          student_id?: string
          total_challenges_completed?: number
          total_xp_earned?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_streaks_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_tool_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          student_id: string
          tool_name: string
          tutorial_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          student_id: string
          tool_name: string
          tutorial_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          student_id?: string
          tool_name?: string
          tutorial_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_tool_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_tool_progress_tutorial_id_fkey"
            columns: ["tutorial_id"]
            isOneToOne: false
            referencedRelation: "tool_tutorials"
            referencedColumns: ["id"]
          },
        ]
      }
      student_track_interests: {
        Row: {
          created_at: string | null
          id: string
          interest_level: number | null
          student_id: string
          track_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interest_level?: number | null
          student_id: string
          track_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interest_level?: number | null
          student_id?: string
          track_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_track_interests_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_track_interests_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "industry_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      student_track_progress: {
        Row: {
          build_completed: number | null
          challenges_completed: number | null
          created_at: string | null
          design_completed: number | null
          discover_completed: number | null
          explore_completed: number | null
          id: string
          student_id: string
          total_xp: number | null
          track_id: string
          updated_at: string | null
        }
        Insert: {
          build_completed?: number | null
          challenges_completed?: number | null
          created_at?: string | null
          design_completed?: number | null
          discover_completed?: number | null
          explore_completed?: number | null
          id?: string
          student_id: string
          total_xp?: number | null
          track_id: string
          updated_at?: string | null
        }
        Update: {
          build_completed?: number | null
          challenges_completed?: number | null
          created_at?: string | null
          design_completed?: number | null
          discover_completed?: number | null
          explore_completed?: number | null
          id?: string
          student_id?: string
          total_xp?: number | null
          track_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_track_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_track_progress_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "industry_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          age: number
          audience_type: string | null
          builder_type: string | null
          city: string | null
          cohort_id: string | null
          country: string | null
          created_at: string | null
          enrolled_at: string | null
          free_coach_uses: number | null
          free_tank_uses: number | null
          full_name: string
          grade: string | null
          has_idea: boolean | null
          id: string
          idea_stage: string | null
          idea_summary: string | null
          industry: string | null
          marketing_consent: boolean | null
          onboarding_completed: boolean | null
          parent_consent_at: string | null
          parent_consent_requested_at: string | null
          parent_consent_token: string | null
          parent_consent_verified: boolean | null
          parent_email: string | null
          parent_name: string | null
          parent_phone: string | null
          parent_relationship: string | null
          pitch_level: number | null
          pitch_total_xp: number | null
          pricing_tier_id: string | null
          pro_onboarding_completed: boolean | null
          profile_completed_at: string | null
          program: string
          registration_type: string | null
          scholarship_code_used: string | null
          school_id: string | null
          school_name: string | null
          status: string | null
          subscription_status: string | null
          terms_accepted_at: string | null
          trial_ends_at: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          age: number
          audience_type?: string | null
          builder_type?: string | null
          city?: string | null
          cohort_id?: string | null
          country?: string | null
          created_at?: string | null
          enrolled_at?: string | null
          free_coach_uses?: number | null
          free_tank_uses?: number | null
          full_name: string
          grade?: string | null
          has_idea?: boolean | null
          id?: string
          idea_stage?: string | null
          idea_summary?: string | null
          industry?: string | null
          marketing_consent?: boolean | null
          onboarding_completed?: boolean | null
          parent_consent_at?: string | null
          parent_consent_requested_at?: string | null
          parent_consent_token?: string | null
          parent_consent_verified?: boolean | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          parent_relationship?: string | null
          pitch_level?: number | null
          pitch_total_xp?: number | null
          pricing_tier_id?: string | null
          pro_onboarding_completed?: boolean | null
          profile_completed_at?: string | null
          program: string
          registration_type?: string | null
          scholarship_code_used?: string | null
          school_id?: string | null
          school_name?: string | null
          status?: string | null
          subscription_status?: string | null
          terms_accepted_at?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          age?: number
          audience_type?: string | null
          builder_type?: string | null
          city?: string | null
          cohort_id?: string | null
          country?: string | null
          created_at?: string | null
          enrolled_at?: string | null
          free_coach_uses?: number | null
          free_tank_uses?: number | null
          full_name?: string
          grade?: string | null
          has_idea?: boolean | null
          id?: string
          idea_stage?: string | null
          idea_summary?: string | null
          industry?: string | null
          marketing_consent?: boolean | null
          onboarding_completed?: boolean | null
          parent_consent_at?: string | null
          parent_consent_requested_at?: string | null
          parent_consent_token?: string | null
          parent_consent_verified?: boolean | null
          parent_email?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          parent_relationship?: string | null
          pitch_level?: number | null
          pitch_total_xp?: number | null
          pricing_tier_id?: string | null
          pro_onboarding_completed?: boolean | null
          profile_completed_at?: string | null
          program?: string
          registration_type?: string | null
          scholarship_code_used?: string | null
          school_id?: string | null
          school_name?: string | null
          status?: string | null
          subscription_status?: string | null
          terms_accepted_at?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_students_cohort"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_pricing_tier_id_fkey"
            columns: ["pricing_tier_id"]
            isOneToOne: false
            referencedRelation: "pricing_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      system_error_logs: {
        Row: {
          category: string
          context: Json | null
          created_at: string
          id: string
          message: string
          route: string | null
          severity: string
          stack: string | null
          timestamp: string
          url: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          category?: string
          context?: Json | null
          created_at?: string
          id?: string
          message: string
          route?: string | null
          severity: string
          stack?: string | null
          timestamp?: string
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string
          context?: Json | null
          created_at?: string
          id?: string
          message?: string
          route?: string | null
          severity?: string
          stack?: string | null
          timestamp?: string
          url?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      team_booking_credits: {
        Row: {
          bonus_credits: number | null
          created_at: string | null
          id: string
          team_id: string
          total_credits: number | null
          updated_at: string | null
          used_credits: number | null
        }
        Insert: {
          bonus_credits?: number | null
          created_at?: string | null
          id?: string
          team_id: string
          total_credits?: number | null
          updated_at?: string | null
          used_credits?: number | null
        }
        Update: {
          bonus_credits?: number | null
          created_at?: string | null
          id?: string
          team_id?: string
          total_credits?: number | null
          updated_at?: string | null
          used_credits?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "team_booking_credits_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: true
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string | null
          student_id: string
          team_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role?: string | null
          student_id: string
          team_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string | null
          student_id?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_mentor_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          is_primary: boolean | null
          mentor_id: string
          notes: string | null
          status: string | null
          team_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          is_primary?: boolean | null
          mentor_id: string
          notes?: string | null
          status?: string | null
          team_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          is_primary?: boolean | null
          mentor_id?: string
          notes?: string | null
          status?: string | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_mentor_assignments_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_mentor_assignments_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_notes: {
        Row: {
          content: string | null
          created_at: string | null
          created_by: string | null
          id: string
          team_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          team_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          team_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_notes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_notes_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          cohort_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          join_code: string
          name: string
          program: string
          updated_at: string | null
        }
        Insert: {
          cohort_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          join_code: string
          name: string
          program: string
          updated_at?: string | null
        }
        Update: {
          cohort_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          join_code?: string
          name?: string
          program?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_tutorials: {
        Row: {
          age_max: number | null
          age_min: number | null
          category: string
          created_at: string | null
          description: string | null
          difficulty: string
          estimated_minutes: number | null
          id: string
          sequence_order: number
          title: string
          tool_name: string
          tutorial_url: string | null
          video_url: string | null
        }
        Insert: {
          age_max?: number | null
          age_min?: number | null
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty?: string
          estimated_minutes?: number | null
          id?: string
          sequence_order?: number
          title: string
          tool_name: string
          tutorial_url?: string | null
          video_url?: string | null
        }
        Update: {
          age_max?: number | null
          age_min?: number | null
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty?: string
          estimated_minutes?: number | null
          id?: string
          sequence_order?: number
          title?: string
          tool_name?: string
          tutorial_url?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_leaderboard: {
        Row: {
          country: string | null
          final_score: number | null
          founder_name: string | null
          grade: string | null
          id: string | null
          is_top_10: boolean | null
          is_top_20: boolean | null
          rank: number | null
          round: number | null
          school_name: string | null
          scored_at: string | null
          startup_name: string | null
        }
        Insert: {
          country?: string | null
          final_score?: number | null
          founder_name?: string | null
          grade?: string | null
          id?: string | null
          is_top_10?: boolean | null
          is_top_20?: boolean | null
          rank?: number | null
          round?: number | null
          school_name?: string | null
          scored_at?: string | null
          startup_name?: string | null
        }
        Update: {
          country?: string | null
          final_score?: number | null
          founder_name?: string | null
          grade?: string | null
          id?: string | null
          is_top_10?: boolean | null
          is_top_20?: boolean | null
          rank?: number | null
          round?: number | null
          school_name?: string | null
          scored_at?: string | null
          startup_name?: string | null
        }
        Relationships: []
      }
      round_statistics: {
        Row: {
          avg_score: number | null
          max_score: number | null
          min_score: number | null
          round: number | null
          scored_count: number | null
          total_applications: number | null
        }
        Relationships: []
      }
      school_stats: {
        Row: {
          avg_score: number | null
          school_name: string | null
          scored_students: number | null
          total_students: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_ai_rate_limit: {
        Args: { p_feature: string; p_student_id: string }
        Returns: Json
      }
      get_user_enterprise_orgs: {
        Args: { check_user_id: string }
        Returns: string[]
      }
      get_user_school_ids: {
        Args: { check_user_id: string }
        Returns: string[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_enterprise_admin: {
        Args: { check_org_id: string; check_user_id: string }
        Returns: boolean
      }
      is_primary_school_admin: {
        Args: { check_school_id: string; check_user_id: string }
        Returns: boolean
      }
      is_school_admin: {
        Args: { check_school_id: string; check_user_id: string }
        Returns: boolean
      }
      update_application_ranks: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role:
        | "student"
        | "mentor"
        | "admin"
        | "investor"
        | "guardian"
        | "school_admin"
        | "club_advisor"
      application_status:
        | "draft"
        | "submitted"
        | "ai_scored"
        | "stress_test"
        | "finalist"
        | "rejected"
        | "registered"
        | "video_submitted"
        | "processing"
        | "advanced"
        | "eliminated"
      artifact_type:
        | "problem_card"
        | "interview_notes"
        | "customer_persona"
        | "solution_sketch"
        | "value_proposition"
        | "landing_page"
        | "prototype"
        | "business_model"
        | "pitch_deck"
        | "pitch_video"
        | "user_feedback"
        | "reflection"
        | "customer_email"
        | "mvp_prototype"
        | "business_name"
        | "logo"
        | "brand_kit"
        | "prd_document"
        | "app_link"
        | "marketing_plan"
        | "wireframe"
        | "poster"
        | "drawing"
        | "video_diary"
        | "investor_memo"
        | "financial_model"
        | "competitive_analysis"
      mission_status: "locked" | "available" | "in_progress" | "completed"
      prompt_difficulty: "beginner" | "intermediate" | "advanced"
      prompt_kid_category:
        | "design_help"
        | "customer_conversations"
        | "content_creation"
        | "technical_help"
        | "business_model"
        | "marketing"
      prompt_stage: "idea" | "validation" | "mvp" | "launch" | "scale"
      skill_type:
        | "problem_analysis"
        | "creative_thinking"
        | "research"
        | "communication"
        | "ai_collaboration"
        | "technical_building"
        | "business_thinking"
        | "presentation"
        | "resilience"
        | "user_empathy"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "student",
        "mentor",
        "admin",
        "investor",
        "guardian",
        "school_admin",
        "club_advisor",
      ],
      application_status: [
        "draft",
        "submitted",
        "ai_scored",
        "stress_test",
        "finalist",
        "rejected",
        "registered",
        "video_submitted",
        "processing",
        "advanced",
        "eliminated",
      ],
      artifact_type: [
        "problem_card",
        "interview_notes",
        "customer_persona",
        "solution_sketch",
        "value_proposition",
        "landing_page",
        "prototype",
        "business_model",
        "pitch_deck",
        "pitch_video",
        "user_feedback",
        "reflection",
        "customer_email",
        "mvp_prototype",
        "business_name",
        "logo",
        "brand_kit",
        "prd_document",
        "app_link",
        "marketing_plan",
        "wireframe",
        "poster",
        "drawing",
        "video_diary",
        "investor_memo",
        "financial_model",
        "competitive_analysis",
      ],
      mission_status: ["locked", "available", "in_progress", "completed"],
      prompt_difficulty: ["beginner", "intermediate", "advanced"],
      prompt_kid_category: [
        "design_help",
        "customer_conversations",
        "content_creation",
        "technical_help",
        "business_model",
        "marketing",
      ],
      prompt_stage: ["idea", "validation", "mvp", "launch", "scale"],
      skill_type: [
        "problem_analysis",
        "creative_thinking",
        "research",
        "communication",
        "ai_collaboration",
        "technical_building",
        "business_thinking",
        "presentation",
        "resilience",
        "user_empathy",
      ],
    },
  },
} as const
