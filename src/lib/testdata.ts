export type Ervaringsniveau = "startend" | "ervaren";

export interface Tarief {
  id: string;
  naam: "Introductieles" | "Losse les";
  duur_minuten: 60 | 75;
  prijs_cent: number;
}

export interface Docent {
  id: string;
  slug: string;
  naam: string;
  locatie: string;
  reisafstand_km: number;
  yogastijlen: string[];
  specialisaties: string[];
  ervaringsniveau: Ervaringsniveau;
  jaren_ervaring: number;
  opleiding: string;
  certificering: string;
  bio: string;
  foto_url: string | null;
  video_url: string | null;
  tarieven: Tarief[];
}

export const DOCENTEN_TESTDATA: Docent[] = [
  {
    id: "1",
    slug: "anne-de-vries",
    naam: "Anne de Vries",
    locatie: "Amsterdam",
    reisafstand_km: 15,
    yogastijlen: ["Hatha", "Yin"],
    specialisaties: ["Senioren", "Stressreductie", "Chronische pijn"],
    ervaringsniveau: "ervaren",
    jaren_ervaring: 11,
    opleiding: "Yoga Alliance 500-uur opleiding, Yin Yoga Teacher Training",
    certificering: "E-RYT 500, Yoga Alliance",
    bio: "Met meer dan tien jaar ervaring als yogadocent begeleid ik je graag naar meer rust en balans in je dagelijks leven. Ik werk veel met mensen die last hebben van stress of chronische klachten — yoga helpt het zenuwstelsel te kalmeren en het lichaam te herstellen. Mijn lessen zijn rustig maar bewust: aandacht voor ademhaling, beweging en aanwezig zijn in het moment.\n\nIk kom bij je thuis in Amsterdam en omstreken. Zo heb jij geen reistijd en kun je na de les gewoon ontspannen in je eigen ruimte.",
    foto_url: "/Docentprofielen_01.jpg",
    video_url: null,
    tarieven: [
      { id: "1a", naam: "Introductieles", duur_minuten: 75, prijs_cent: 9000 },
      { id: "1b", naam: "Losse les", duur_minuten: 60, prijs_cent: 8500 },
      { id: "1c", naam: "Losse les", duur_minuten: 75, prijs_cent: 9500 },
    ],
  },
  {
    id: "2",
    slug: "lisa-van-den-berg",
    naam: "Lisa van den Berg",
    locatie: "Haarlem",
    reisafstand_km: 20,
    yogastijlen: ["Vinyasa", "Restorative"],
    specialisaties: ["Burnout herstel", "Ademwerk", "Atleten"],
    ervaringsniveau: "ervaren",
    jaren_ervaring: 8,
    opleiding: "Yoga Works Teacher Training 200-uur, Restorative Yoga Verdieping",
    certificering: "RYT 200, Yoga Alliance",
    bio: "Yoga is voor iedereen. In mijn lessen combineer ik beweging en ademhaling voor een volledige mentale en fysieke reset. Ik werk veel met mensen die herstellen van een burnout of die hun stress een uitlaatklep willen geven.\n\nMijn Vinyasa lessen zijn dynamisch en energiek — perfect voor mensen die willen bewegen. Mijn Restorative lessen zijn het tegenovergestelde: diepe ontspanning met veel gebruik van props. Samen kijken we wat op dat moment het meest past bij wat je nodig hebt.",
    foto_url: "/Docentprofielen_02.jpg",
    video_url: null,
    tarieven: [
      { id: "2a", naam: "Introductieles", duur_minuten: 75, prijs_cent: 9000 },
      { id: "2b", naam: "Losse les", duur_minuten: 60, prijs_cent: 8500 },
      { id: "2c", naam: "Losse les", duur_minuten: 75, prijs_cent: 9500 },
    ],
  },
  {
    id: "3",
    slug: "sara-bakker",
    naam: "Sara Bakker",
    locatie: "Utrecht",
    reisafstand_km: 10,
    yogastijlen: ["Hatha", "Zwangerschapsyoga", "Yin"],
    specialisaties: ["Zwangerschap", "Postnataal", "Beginners"],
    ervaringsniveau: "startend",
    jaren_ervaring: 2,
    opleiding: "Yoga Academy Nederland 200-uur, Zwangerschapsyoga Specialisatie",
    certificering: "RYT 200, Yoga Alliance",
    bio: "Als gecertificeerd yogadocent specialiseer ik me in zwangerschapsyoga en postnatale yoga. Ik geloof dat yoga tijdens en na de zwangerschap het verschil kan maken — voor je lichaam, maar ook voor je hoofd.\n\nMijn lessen zijn zacht, veilig en volledig aangepast aan jouw fase. Beginners zijn van harte welkom — bij mij hoef je niks te kunnen. Ik kom bij je thuis zodat je niet hoeft te sjouwen met een yogamat als je al zwanger bent of net bevallen.",
    foto_url: "/Docentprofielen_03.jpg",
    video_url: null,
    tarieven: [
      { id: "3a", naam: "Introductieles", duur_minuten: 75, prijs_cent: 7000 },
      { id: "3b", naam: "Losse les", duur_minuten: 60, prijs_cent: 6500 },
      { id: "3c", naam: "Losse les", duur_minuten: 75, prijs_cent: 7500 },
    ],
  },
  {
    id: "4",
    slug: "maya-de-groot",
    naam: "Maya de Groot",
    locatie: "Rotterdam",
    reisafstand_km: 15,
    yogastijlen: ["Ashtanga", "Vinyasa", "Hatha"],
    specialisaties: ["Flexibiliteit", "Kracht", "Gevorderden"],
    ervaringsniveau: "ervaren",
    jaren_ervaring: 14,
    opleiding: "Mysore Ashtanga Training India, Vinyasa Teacher Training 300-uur",
    certificering: "E-RYT 500, Yoga Alliance",
    bio: "Yoga is mijn leven — ik geef al veertien jaar les en ben twee keer naar Mysore gereisd om Ashtanga te verdiepen bij de bron. Mijn lessen zijn uitdagend en precies: ik help je verder in je practice, verder dan je denkt dat je kunt.\n\nIk werk het liefst met mensen die al wat ervaring hebben en echt willen groeien. Maar ook beginners met een sportachtergrond zijn welkom — ik pas de les aan op jouw niveau en ambities.",
    foto_url: "/Docentprofielen_04.jpg",
    video_url: null,
    tarieven: [
      { id: "4a", naam: "Introductieles", duur_minuten: 75, prijs_cent: 9000 },
      { id: "4b", naam: "Losse les", duur_minuten: 60, prijs_cent: 8500 },
      { id: "4c", naam: "Losse les", duur_minuten: 75, prijs_cent: 9500 },
    ],
  },
  {
    id: "5",
    slug: "emma-van-dijk",
    naam: "Emma van Dijk",
    locatie: "Haarlem",
    reisafstand_km: 12,
    yogastijlen: ["Yin", "Restorative", "Yoga Nidra"],
    specialisaties: ["Slaapproblemen", "Angst", "Overprikkeling"],
    ervaringsniveau: "ervaren",
    jaren_ervaring: 6,
    opleiding: "Yin Yoga Teacher Training 50-uur, Yoga Nidra Facilitator opleiding",
    certificering: "RYT 200, Yoga Alliance",
    bio: "Ik geef les aan mensen die zichzelf zijn kwijtgeraakt in de drukte van het dagelijks leven. Yin en Yoga Nidra zijn de stilste vormen van yoga — en vaak de krachtigste. Je hoeft niks te doen, alleen aanwezig te zijn.\n\nVeel van mijn leerlingen komen bij mij omdat ze slecht slapen, veel piekeren of zich chronisch uitgeput voelen. We werken langzaam, maar de verandering is diep. Ik kom graag bij je thuis in Haarlem en omgeving.",
    foto_url: "/Docentprofielen_05.jpg",
    video_url: null,
    tarieven: [
      { id: "5a", naam: "Introductieles", duur_minuten: 75, prijs_cent: 9000 },
      { id: "5b", naam: "Losse les", duur_minuten: 60, prijs_cent: 8500 },
      { id: "5c", naam: "Losse les", duur_minuten: 75, prijs_cent: 9500 },
    ],
  },
  {
    id: "6",
    slug: "nora-hendriks",
    naam: "Nora Hendriks",
    locatie: "Utrecht",
    reisafstand_km: 18,
    yogastijlen: ["Hatha", "Vinyasa"],
    specialisaties: ["Rugklachten", "Blessurepreventie", "Beginners"],
    ervaringsniveau: "startend",
    jaren_ervaring: 3,
    opleiding: "Yoga Academy Nederland 200-uur, Anatomie & Blessurepreventie Verdieping",
    certificering: "RYT 200, Yoga Alliance",
    bio: "Na jaren last te hebben gehad van mijn rug werd yoga mijn redding — en uiteindelijk mijn roeping. Ik ben gespecialiseerd in beweging die je lichaam ondersteunt in plaats van belast. Geen ingewikkelde poses, wel veel aandacht voor hoe jouw lichaam specifiek in elkaar zit.\n\nIk werk graag met mensen die voor het eerst met yoga beginnen of die voorzichtig willen bewegen na een blessure. Mijn lessen zijn rustig en opbouwend, met veel uitleg.",
    foto_url: "/Docentprofielen_06.jpg",
    video_url: null,
    tarieven: [
      { id: "6a", naam: "Introductieles", duur_minuten: 75, prijs_cent: 7000 },
      { id: "6b", naam: "Losse les", duur_minuten: 60, prijs_cent: 6500 },
      { id: "6c", naam: "Losse les", duur_minuten: 75, prijs_cent: 7500 },
    ],
  },
  {
    id: "7",
    slug: "fleur-de-jong",
    naam: "Fleur de Jong",
    locatie: "Amsterdam",
    reisafstand_km: 10,
    yogastijlen: ["Vinyasa", "Hatha", "Meditatie"],
    specialisaties: ["Stress & herstel", "Concentratie", "Werkende professionals"],
    ervaringsniveau: "ervaren",
    jaren_ervaring: 9,
    opleiding: "Vinyasa Yoga Teacher Training 300-uur, Mindfulness Based Stress Reduction (MBSR)",
    certificering: "E-RYT 200, Yoga Alliance",
    bio: "Ik geef les aan drukke mensen. Mensen met een vol hoofd, een volle agenda en weinig tijd voor zichzelf. Mijn lessen zijn kort en krachtig — in 60 minuten geef ik je een volledige reset, zodat je er daarna weer tegenaan kunt.\n\nAls voormalig marketingmanager weet ik hoe het voelt om 'aan' te staan. Yoga heeft mij geleerd om dat bewust los te laten. Dat wil ik ook voor jou. Ik kom bij je thuis of op kantoor in Amsterdam.",
    foto_url: "/Docentprofielen_07.jpg",
    video_url: null,
    tarieven: [
      { id: "7a", naam: "Introductieles", duur_minuten: 75, prijs_cent: 9000 },
      { id: "7b", naam: "Losse les", duur_minuten: 60, prijs_cent: 8500 },
      { id: "7c", naam: "Losse les", duur_minuten: 75, prijs_cent: 9500 },
    ],
  },
];

export const ALLE_YOGASTIJLEN = [
  "Hatha",
  "Yin",
  "Vinyasa",
  "Restorative",
  "Ashtanga",
  "Zwangerschapsyoga",
];

export const ALLE_LOCATIES = ["Amsterdam", "Haarlem", "Utrecht", "Rotterdam"];

export function getDocentBySlug(slug: string): Docent | undefined {
  return DOCENTEN_TESTDATA.find((d) => d.slug === slug);
}

export function getStartprijs(docent: Docent): number {
  return Math.min(...docent.tarieven.map((t) => t.prijs_cent));
}
