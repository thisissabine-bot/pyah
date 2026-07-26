import type { Docent, Tarief } from "./testdata";
import { DOCENTEN_TESTDATA, getDocentBySlug as getDocentBySlugFromTestdata } from "./testdata";

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "";

export async function getAllDocenten(): Promise<Docent[]> {
  if (!supabaseConfigured) return DOCENTEN_TESTDATA;

  const { createServerClient } = await import("./supabase/server");
  const supabase = createServerClient();

  const { data: docenten, error } = await supabase
    .from("docenten")
    .select("*, tarieven(*)")
    .eq("actief", true)
    .order("naam");

  if (error || !docenten) {
    console.error("[docenten] Supabase error, fallback op testdata:", error?.message ?? error?.code ?? JSON.stringify(error));
    return DOCENTEN_TESTDATA;
  }

  return docenten.map(mapSupabaseDocent);
}

export async function getDocent(slug: string): Promise<Docent | null> {
  if (!supabaseConfigured) {
    return getDocentBySlugFromTestdata(slug) ?? null;
  }

  const { createServerClient } = await import("./supabase/server");
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("docenten")
    .select("*, tarieven(*)")
    .eq("slug", slug)
    .eq("actief", true)
    .single();

  if (error || !data) {
    console.error("[docenten] Supabase error voor slug", slug, error?.message ?? error?.code ?? JSON.stringify(error));
    return getDocentBySlugFromTestdata(slug) ?? null;
  }

  return mapSupabaseDocent(data);
}

export async function getAllSlugs(): Promise<string[]> {
  if (!supabaseConfigured) {
    return DOCENTEN_TESTDATA.map((d) => d.slug);
  }

  const { createServerClient } = await import("./supabase/server");
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("docenten")
    .select("slug")
    .eq("actief", true);

  if (error || !data) return DOCENTEN_TESTDATA.map((d) => d.slug);
  return (data as { slug: string }[]).map((d) => d.slug);
}

function mapSupabaseDocent(row: {
  id: string;
  slug: string;
  naam: string;
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
  tarieven?: {
    id: string;
    naam: "Introductieles" | "Losse les";
    duur_minuten: number;
    prijs_cent: number;
    actief: boolean;
  }[];
}): Docent {
  const tarieven: Tarief[] = (row.tarieven ?? [])
    .filter((t) => t.actief)
    .map((t) => ({
      id: t.id,
      naam: t.naam,
      duur_minuten: t.duur_minuten as 60 | 75,
      prijs_cent: t.prijs_cent,
    }));

  return {
    id: row.id,
    slug: row.slug,
    naam: row.naam,
    bio: row.bio ?? "",
    foto_urls: row.foto_url ? [row.foto_url] : [],
    video_url: row.video_url,
    locatie: row.locatie,
    reisafstand_km: row.reisafstand_km,
    yogastijlen: row.yogastijlen,
    specialisaties: row.specialisaties,
    ervaringsniveau: row.ervaringsniveau ?? "startend",
    jaren_ervaring: row.jaren_ervaring ?? 0,
    opleiding: row.opleiding ?? "",
    certificering: row.certificering ?? "",
    tarieven,
  };
}
