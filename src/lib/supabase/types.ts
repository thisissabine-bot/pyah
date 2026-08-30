export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      docenten: {
        Row: {
          id: string;
          user_id: string | null;
          naam: string;
          slug: string;
          bio: string | null;
          foto_url: string | null;
          video_url: string | null;
          locatie: string;
          reisafstand_km: number;
          yogastijlen: string[];
          specialisaties: string[];
          ervaringsniveau: "startend" | "ervaren" | null;
          jaren_ervaring: number | null;
          opleiding: string | null;
          certificering: string | null;
          actief: boolean;
          abonnement: "startend" | "ervaren";
          stripe_account_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["docenten"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["docenten"]["Insert"]>;
        Relationships: [];
      };
      tarieven: {
        Row: {
          id: string;
          docent_id: string;
          naam: "Introductieles" | "Losse les";
          duur_minuten: number;
          prijs_cent: number;
          actief: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["tarieven"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["tarieven"]["Insert"]>;
        Relationships: [];
      };
      boekingen: {
        Row: {
          id: string;
          klant_naam: string;
          klant_email: string;
          klant_telefoon: string | null;
          docent_id: string | null;
          tarief_id: string | null;
          status: "aangevraagd" | "bevestigd" | "voltooid" | "geannuleerd";
          stripe_payment_intent: string | null;
          stripe_betaald: boolean;
          bedrag_cent: number | null;
          commissie_cent: number | null;
          uitbetaling_cent: number | null;
          afspraak_datum: string | null;
          notities: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["boekingen"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["boekingen"]["Insert"]>;
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          docent_id: string | null;
          boeking_id: string | null;
          score: number | null;
          tekst: string | null;
          publiek: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["reviews"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
        Relationships: [];
      };
      aanmeldingen: {
        Row: {
          id: string;
          naam: string;
          email: string;
          woonplaats: string | null;
          opleiding: string | null;
          trainingsuren: string | null;
          jaren_leservaring: string | null;
          recente_lespraktijk: string | null;
          ervaring_privelessen: string | null;
          yogastijlen: string | null;
          andere_disciplines: string | null;
          motivatie: string | null;
          toelichting: string | null;
          regio: string | null;
          akkoord_erkende_opleiding: boolean;
          akkoord_geen_garantie: boolean;
          akkoord_avb: boolean;
          akkoord_privacyverklaring: boolean;
          type: "docent" | "klant";
          verwerkt: boolean;
          niveau_inschatting: "startend" | "ervaren" | null;
          match_beslissing: "ja" | "nee" | "wachtlijst" | null;
          beoordeeld_op: string | null;
          mail_verzonden_op: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["aanmeldingen"]["Row"],
          "id" | "created_at" | "niveau_inschatting" | "match_beslissing" | "beoordeeld_op" | "mail_verzonden_op"
        > &
          Partial<
            Pick<
              Database["public"]["Tables"]["aanmeldingen"]["Row"],
              "niveau_inschatting" | "match_beslissing" | "beoordeeld_op" | "mail_verzonden_op"
            >
          >;
        Update: Partial<Database["public"]["Tables"]["aanmeldingen"]["Insert"]>;
        Relationships: [];
      };
      toetsingen: {
        Row: {
          id: string;
          aanmelding_id: string;
          datum_gesprek: string | null;
          geboortedatum: string | null;
          kvk_nummer: string | null;
          kor_van_toepassing_per: string | null;
          kor_verdiend_cent: number | null;
          verzekering_geldig_tot: string | null;
          niveau_definitief: "startend" | "ervaren" | null;
          ytt_200u_in_orde: "ja" | "nee" | "twijfel" | null;
          verzekering_in_orde: "ja" | "nee" | "twijfel" | null;
          geschikt_1op1: "ja" | "nee" | "twijfel" | null;
          regio_passend: "ja" | "nee" | "twijfel" | null;
          houding_passend_pyah: "ja" | "nee" | "twijfel" | null;
          veiligheid_professionaliteit: "ja" | "nee" | "twijfel" | null;
          community_gevoel: "ja" | "nee" | "twijfel" | null;
          intuitieve_match: "ja" | "nee" | "twijfel" | null;
          checklist_opmerkingen: string | null;
          vak_intake_ervaring: string | null;
          vak_werkwijze_verwoorden: string | null;
          vak_grenzen_doorverwijzing: string | null;
          vak_rust_aandacht: string | null;
          vak_veilig_zonder_groep: string | null;
          vak_flexibiliteit: string | null;
          vak_certificering_vs_ervaring: string | null;
          houding_feedback_ontwikkeling: string | null;
          houding_samenwerkingsstructuur: string | null;
          houding_community_bereidheid: string | null;
          houding_respect_platform: string | null;
          energie_gelijkwaardig_zuiver: string | null;
          energie_samenwerken_niet_halen: string | null;
          energie_aanraden_dierbare: string | null;
          ingevuld_door: string;
          extra_notities: string | null;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["toetsingen"]["Row"], "id" | "updated_at"> &
          Partial<Pick<Database["public"]["Tables"]["toetsingen"]["Row"], "id" | "updated_at">>;
        Update: Partial<Database["public"]["Tables"]["toetsingen"]["Insert"]>;
        Relationships: [];
      };
      uitbetalingen: {
        Row: {
          id: string;
          docent_id: string | null;
          periode: string;
          aantal_lessen: number | null;
          bruto_cent: number | null;
          commissie_cent: number | null;
          btw_over_commissie_cent: number | null;
          uitbetaling_cent: number | null;
          uitbetaald_op: string | null;
          stripe_transfer_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["uitbetalingen"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["uitbetalingen"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
