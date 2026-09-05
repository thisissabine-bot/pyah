import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

interface Body {
  actie?: "geopend" | "bevestigd";
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as Body | null;

  if (!body || (body.actie !== "geopend" && body.actie !== "bevestigd")) {
    return NextResponse.json({ error: "Ongeldige actie." }, { status: 400 });
  }

  const supabase = createServerClient();

  if (body.actie === "geopend") {
    // Elke keer dat de modal opent wordt dit gelogd, ongeacht of er al eerder is
    // bevestigd — puur registratie dat de content zichtbaar is geweest.
    const { error } = await supabase.from("info_meerdere_opdrachtgevers_log").insert({ docent_id: id });

    if (error) {
      console.error("[info-meerdere-opdrachtgevers] Supabase insert-fout:", error.message);
      return NextResponse.json({ error: "Kon niet worden gelogd." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  }

  // actie === "bevestigd": eenmalig, wordt nooit overschreven zodra gezet.
  const { data: docent, error: fetchError } = await supabase
    .from("docenten")
    .select("info_meerdere_opdrachtgevers_bevestigd_op")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !docent) {
    return NextResponse.json({ error: "Docent niet gevonden." }, { status: 404 });
  }

  if (docent.info_meerdere_opdrachtgevers_bevestigd_op) {
    return NextResponse.json({ ok: true, bevestigd_op: docent.info_meerdere_opdrachtgevers_bevestigd_op });
  }

  const nu = new Date().toISOString();
  const { error: updateError } = await supabase
    .from("docenten")
    .update({ info_meerdere_opdrachtgevers_bevestigd_op: nu })
    .eq("id", id);

  if (updateError) {
    console.error("[info-meerdere-opdrachtgevers] Supabase update-fout:", updateError.message);
    return NextResponse.json({ error: "Bevestiging kon niet worden opgeslagen." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, bevestigd_op: nu });
}
