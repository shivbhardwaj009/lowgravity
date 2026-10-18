// Habitat Risk Presets and Suppression Protocols

export const HABITAT_PRESETS = [
  {
    id: "gateway",
    name: "Lunar Gateway Station",
    location: "Near-Rectilinear Halo Orbit (Cislunar)",
    gravity: 0.0,
    gravityLabel: "0.00g (Microgravity)",
    oxygen: 21.0,
    pressure: 101.3,
    airflow: 12.0,
    evaFrequency: "Low",
    crewCapacity: 4,
    description: "Deep space staging post in lunar orbit. Operating at sea-level pressure with forced ventilation. Total absence of buoyant thermal convection.",
    primaryRisks: "Quiescent diffusion flames can smolder undetected in zero-flow voids behind equipment racks.",
    recommendedExtinguisher: "Fine Water Mist Extinguisher (PFE-WM) with gas barrier"
  },
  {
    id: "lunar_base",
    name: "Artemis Lunar Surface Base",
    location: "Moon South Pole (Shackleton Rim)",
    gravity: 0.16,
    gravityLabel: "0.16g (Lunar Gravity)",
    oxygen: 26.5,
    pressure: 70.3,
    airflow: 10.0,
    evaFrequency: "High (Daily EVAs)",
    crewCapacity: 4,
    description: "Surface outpost operating at Exploration Atmosphere (70.3 kPa / 10.2 psi, 26.5% O2) to eliminate astronaut pre-breathe times before surface excursions.",
    primaryRisks: "Weak 0.16g buoyancy channels fresh oxidizer into flame without blowing it out; 26.5% O2 lowers material ignition thresholds.",
    recommendedExtinguisher: "Automated Nitrogen Inerting + High-Pressure Fine Mist"
  },
  {
    id: "mars_transit",
    name: "Mars Transit Vehicle (MTV)",
    location: "Interplanetary Deep Space Cruise",
    gravity: 0.0,
    gravityLabel: "0.00g (Microgravity)",
    oxygen: 30.0,
    pressure: 55.0,
    airflow: 8.0,
    evaFrequency: "Emergency Only",
    crewCapacity: 6,
    description: "Nine-month transit vehicle in microgravity. Lightweight hull utilizing 55 kPa low pressure with enriched 30% oxygen atmosphere to minimize structural mass.",
    primaryRisks: "Elevated 30% oxygen causes materials like Nomex and wire insulation to burn vigorously if electrical short circuits occur.",
    recommendedExtinguisher: "Compartment Isolation + Rapid Depressurization to 40 kPa"
  },
  {
    id: "mars_surface",
    name: "Mars Surface Habitat (Alpha Base)",
    location: "Mars Surface (Elysium Planitia)",
    gravity: 0.38,
    gravityLabel: "0.38g (Martian Gravity)",
    oxygen: 28.0,
    pressure: 56.0,
    airflow: 10.0,
    evaFrequency: "Frequent (Surface sorties)",
    crewCapacity: 6,
    description: "Pressurized surface habitat in 0.38g gravity. Partial gravity promotes vertical flame elongation and downward liquid thermoplastic dripping.",
    primaryRisks: "Thermoplastic foams melt and drip downhill; vertical cable raceways act as natural updraft chimneys.",
    recommendedExtinguisher: "CO2 Total Flooding with overhead mist sweep"
  }
];

export const MATERIAL_SPECS = {
  "PMMA": {
    name: "PMMA (Acrylic Glass)",
    category: "Structural Polymers & Display Windows",
    baseFlammability: 82,
    ignitionTempC: 380,
    loiStandard: 17.5, // Limiting Oxygen Index %
    toxicProducts: "Methyl methacrylate vapor, CO, CO2",
    extinguishingDifficulty: "High",
    hazardNote: "Boils and bubbles under thermal radiation, ejecting micro-jets of flammable gas that sustain satellite flames."
  },
  "Foam": {
    name: "Polyurethane / Melamine Foam",
    category: "Acoustic Insulation & Crew Rest Padding",
    baseFlammability: 94,
    ignitionTempC: 310,
    loiStandard: 19.0,
    toxicProducts: "Hydrogen Cyanide (HCN), CO, Isocyanates, dense soot",
    extinguishingDifficulty: "Very High",
    hazardNote: "Highest flame spread rate. Melts into burning liquid drops that migrate downhill in 0.16g and 0.38g."
  },
  "Cotton fabric": {
    name: "Cotton Blend Textiles",
    category: "Crew Flight Garments & Linens",
    baseFlammability: 76,
    ignitionTempC: 250,
    loiStandard: 18.0,
    toxicProducts: "CO, Acrolein, Formaldehyde",
    extinguishingDifficulty: "Moderate",
    hazardNote: "Readily transitions from smoldering to rapid open flaming under forced ventilation in microgravity."
  },
  "Wire insulation": {
    name: "ETFE / Kapton Wire Insulation",
    category: "Avionics & Power Distribution Harnesses",
    baseFlammability: 70,
    ignitionTempC: 450,
    loiStandard: 24.0,
    toxicProducts: "Hydrogen Fluoride (HF), Carbonyl Fluoride, Fluorocarbons",
    extinguishingDifficulty: "High",
    hazardNote: "Internal copper conductor acts as thermal pre-heater. Concealed inside equipment bays where sensors have blind spots."
  },
  "Paper": {
    name: "Cellulose Paper Checklists",
    category: "Documentation & Packaging Materials",
    baseFlammability: 68,
    ignitionTempC: 230,
    loiStandard: 17.0,
    toxicProducts: "CO, Organic condensates",
    extinguishingDifficulty: "Low",
    hazardNote: "Low thermal mass ignites in <0.5 seconds from contact with hot surfaces; spreads quickly across workbenches."
  },
  "Nomex": {
    name: "Nomex Aramid Fabric",
    category: "Flight Suits & Thermal Protective Stowage",
    baseFlammability: 32,
    ignitionTempC: 520,
    loiStandard: 28.5,
    toxicProducts: "Trace HCN, CO",
    extinguishingDifficulty: "Low (in air) / High (in >30% O2)",
    hazardNote: "Excellent fire blocker under nominal air, but flammability escalates sharply when oxygen exceeds 28%."
  }
};

export const SUPPRESSION_STRATEGIES = [
  {
    id: "vent_shutoff",
    title: "Ventilation Rapid Shutoff & Zone Isolation",
    tier: "Tier 1: Immediate Automated Response",
    icon: "FanOff",
    mechanism: "Starvation of convective oxidizer flux",
    effectiveness0g: "96%",
    effectivenessPartialG: "72%",
    description: "In microgravity (0g), shutting off ventilation fans stops the flow of fresh oxygen, causing the diffusion flame to suffocate in its own CO2 blanket within 15–45 seconds.",
    operationalGuideline: "Automated trigger from smoke optical density > 0.05 m^-1. Seal duct fire dampers before releasing chemical extinguishing agents to prevent toxic gas circulation."
  },
  {
    id: "water_mist",
    title: "Fine Water Mist Injection (NASA PFE-WM)",
    tier: "Tier 2: Primary Suppression Agent",
    icon: "Droplets",
    mechanism: "Latent heat cooling + local steam inerting displacement",
    effectiveness0g: "92%",
    effectivenessPartialG: "88%",
    description: "Discharges 30-50 micron water droplets with non-toxic surfactant. In zero-g, droplets remain suspended in air rather than falling, coating burning surfaces evenly without conductive pooling.",
    operationalGuideline: "Safe for crew in pressurized cabins. Leaves minimal corrosive residue compared to dry chemical powders. Highly effective on cotton, PMMA, and paper fires."
  },
  {
    id: "co2_flood",
    title: "CO2 Total Flooding / Local Discharge",
    tier: "Tier 2: Avionics Bay Extinguishment",
    icon: "Wind",
    mechanism: "Thermal heat capacity cooling and oxygen dilution below 14%",
    effectiveness0g: "89%",
    effectivenessPartialG: "85%",
    description: "Primary choice for sealed electronics and cable chases. Inert gas displaces oxygen inside equipment racks without liquid conductive hazards.",
    operationalGuideline: "Crew must don Emergency Mask Units (EMUs) prior to discharge in open volume. Requires scrubber regeneration or overboard venting post-incident."
  },
  {
    id: "depressurization",
    title: "Emergency Cabin Depressurization / Oxygen Throttle",
    tier: "Tier 3: Catastrophic Containment Protocol",
    icon: "Gauge",
    mechanism: "Suppression of chemical reaction kinetics via sub-critical pressure",
    effectiveness0g: "99%",
    effectivenessPartialG: "99%",
    description: "Emergency venting of the compartment to below 40 kPa (or reducing O2 partial pressure below 14 kPa) quenches all known solid and plastic combustion within seconds.",
    operationalGuideline: "Crew must be suited and locked in adjacent safe-haven module or suit life support before opening overboard dump valves."
  }
];
