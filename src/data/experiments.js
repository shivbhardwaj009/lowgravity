// NASA Microgravity Combustion Experiments Dataset
// Synthesized from NASA Glenn Research Center flight programs:
// Saffire (I-VI), SoFIE (Solid Fuel Ignition and Extinction), FLEX, and BASS (Burning and Suppression of Solids)

export const EXPERIMENTS = [
  {
    id: "EXP-SAF-001",
    name: "Saffire-I Cotton Blend Large Panel Flame",
    material: "Cotton fabric",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 21.0,
    pressure: 101.3,
    airflow: 20.0,
    flameSpreadRate: 2.14,
    extinguished: "No",
    year: 2016,
    source: "NASA Saffire-I Flight Investigation (Cygnus PCM)",
    confidenceScore: 94,
    confidenceBreakdown: {
      repeatability: "High (Multi-sensor verification)",
      microgravityType: "True Spacecraft Free-Fall (Cygnus)",
      sampleSize: "Full-scale 0.4m x 1.0m panel"
    },
    sampleSizeNotes: "1 large woven fabric sheet (75% cotton / 25% fiberglass blend)",
    burnDurationSec: 480,
    peakTemperatureC: 840,
    summaries: {
      astronaut: "Cotton-fiberglass fabric ignited readily and sustained a continuous smoldering-to-flaming spread along the forced airflow. Ventilation at 20 cm/s supplied sufficient oxidizer to prevent radiative extinction. Quenching required shutting off vehicle ventilation and depressurizing.",
      engineer: "Demonstrated concurrent flame spread on a thick solid fuel in true microgravity. Convective flow (20 cm/s) dominated over diffusive transport (Pe ~ 35). Flame front velocity was 2.14 mm/s, approximately 25% slower than 1g downward spread due to absent buoyant acceleration.",
      student: "Without gravity to pull down cold air and push hot air up, the fire relied entirely on the spacecraft air conditioner blowing air at it! The flame spread smoothly like a slow creeping carpet across the fabric."
    },
    keyFindings: [
      "Large-scale flames spread continuously without gravity if forced airflow is maintained",
      "Absent buoyant convection reduces flame tip temperatures by ~120°C",
      "Extinguishment occurs rapidly if cabin ventilation is dropped below 2 cm/s"
    ]
  },
  {
    id: "EXP-SAF-002",
    name: "Saffire-II PMMA Sample Low-Speed Extinction",
    material: "PMMA",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 20.9,
    pressure: 101.3,
    airflow: 5.0,
    flameSpreadRate: 0.42,
    extinguished: "Yes",
    year: 2016,
    source: "NASA Saffire-II Automated Flight Experiment",
    confidenceScore: 91,
    confidenceBreakdown: {
      repeatability: "High (Calibrated flow duct)",
      microgravityType: "Orbital Spacecraft (Cygnus)",
      sampleSize: "9 discrete test specimens"
    },
    sampleSizeNotes: "10mm thick clear cast acrylic slabs",
    burnDurationSec: 135,
    peakTemperatureC: 620,
    summaries: {
      astronaut: "Clear acrylic fuel struggled to burn when airflow was dialed back to 5 cm/s. The flame retreated into a faint blue shroud and self-extinguished after 2 minutes due to smothering in its own carbon dioxide halo.",
      engineer: "Radiative heat loss from soot and CO2 in the diffusion flame zone exceeded conductive heat feedback to the fuel surface at Pe < 10. Flame underwent radiative extinction threshold at 4.8 cm/s opposed flow.",
      student: "When the air fans were turned down, the smoke and waste gas got trapped right on top of the flame like an invisible blanket, putting the fire out all by itself!"
    },
    keyFindings: [
      "PMMA reaches a low-speed quenching limit at ~4.5 cm/s airflow in 0g",
      "Soot accumulates in a spherical envelope around the reaction zone",
      "Radiative heat loss exceeds chemical heat generation at low convection"
    ]
  },
  {
    id: "EXP-SOF-003",
    name: "SoFIE-GEL Flat PMMA Slab Opposed Flow",
    material: "PMMA",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 25.0,
    pressure: 95.0,
    airflow: 12.0,
    flameSpreadRate: 1.18,
    extinguished: "No",
    year: 2022,
    source: "ISS CIR / SoFIE-GEL (Growth and Extinction Limit)",
    confidenceScore: 96,
    confidenceBreakdown: {
      repeatability: "Very High (ISS CIR micro-diagnostics)",
      microgravityType: "ISS Long-duration Microgravity",
      sampleSize: "16 test runs with optical pyrometry"
    },
    sampleSizeNotes: "50mm wide cast PMMA slabs, variable thickness",
    burnDurationSec: 320,
    peakTemperatureC: 910,
    summaries: {
      astronaut: "In slightly elevated oxygen (25%), PMMA acrylic burned steadily despite low airflow. The flame was compact and blue with an amber tail. Dropping ventilation did not extinguish it as quickly as in normal air.",
      engineer: "Elevated O2 (25%) shifted the Damkohler number Da to super-critical regimes. Opposed spread rate was 1.18 mm/s with stable pyrolysis front. Stand-off distance decreased by 18% compared to 21% O2 baselines.",
      student: "Adding just 4% more oxygen gave the flame extra strength to keep burning even in the quiet weightlessness of the Space Station."
    },
    keyFindings: [
      "Moderate oxygen enrichment (25%) prevents low-flow radiative extinction",
      "Flame standoff distance is inversely proportional to square root of oxidizer flux",
      "Pyrolysis gas jetting observed at edges"
    ]
  },
  {
    id: "EXP-BASS-004",
    name: "BASS-II Nomex Fabric Opposed Flow 0g",
    material: "Nomex",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 21.0,
    pressure: 101.3,
    airflow: 10.0,
    flameSpreadRate: 0.0,
    extinguished: "Yes",
    year: 2014,
    source: "NASA BASS-II Payload (ISS Microgravity Science Glovebox)",
    confidenceScore: 89,
    confidenceBreakdown: {
      repeatability: "High (Controlled astronaut-tended)",
      microgravityType: "ISS Glovebox 0g",
      sampleSize: "8 test fabric strips"
    },
    sampleSizeNotes: "Aramid polymer woven tape (NASA flight suit spec)",
    burnDurationSec: 18,
    peakTemperatureC: 450,
    summaries: {
      astronaut: "Nomex flame-resistant fabric failed to sustain ignition. Once the spark igniter turned off, the flame collapsed and died within 18 seconds without propagating. Nomex is highly safe in nominal air.",
      engineer: "Char-forming aromatic polyamide developed a thermally insulating carbonaceous barrier. In 0g with Pe=15, conduction through char was insufficient to volatilize resin, resulting in rapid extinction.",
      student: "Nomex is the special tough fabric astronaut suits are made of. When ignited, it forms a crusty crust that shuts down the fire like a fire shield."
    },
    keyFindings: [
      "Nomex is self-extinguishing in 0g at 21% O2 under all sub-sonic airflows",
      "Char layer expands to 2.4x original thickness in microgravity",
      "Zero spread observed past the ignition zone"
    ]
  },
  {
    id: "EXP-BASS-005",
    name: "BASS-II Wire Insulation Tefzel Conduit Overheat",
    material: "Wire insulation",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 21.0,
    pressure: 101.3,
    airflow: 8.0,
    flameSpreadRate: 0.65,
    extinguished: "No",
    year: 2015,
    source: "NASA BASS-II Payload (ISS MSG)",
    confidenceScore: 92,
    confidenceBreakdown: {
      repeatability: "High (Repeat electrical coil ignition)",
      microgravityType: "ISS 0g Glovebox",
      sampleSize: "12 wire specimens"
    },
    sampleSizeNotes: "20 AWG silver-plated copper wire with ETFE insulation",
    burnDurationSec: 210,
    peakTemperatureC: 780,
    summaries: {
      astronaut: "Overheated electrical wire insulation caught fire and slowly crept along the copper core. The copper wire drew heat forward, keeping the flame alive even under gentle airflow.",
      engineer: "Conjugate heat transfer along the copper wire substrate preheated downstream ETFE insulation. Flame spread rate 0.65 mm/s. The high thermal conductivity of metal conductors overcomes microgravity heat losses.",
      student: "The metal wire inside acted like an electric frying pan, heating up the plastic coating ahead of the flame so it could keep creeping along!"
    },
    keyFindings: [
      "Metallic wire cores promote flame spread in 0g by axial conduction",
      "ETFE fluoropolymer emits toxic fluorinated vapors before flaming",
      "Low ventilation does not extinguish wire harness fires easily"
    ]
  },
  {
    id: "EXP-SOF-006",
    name: "SoFIE-MIST Thin Cellulose Sheet Flame Quench",
    material: "Paper",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 18.0,
    pressure: 70.3,
    airflow: 6.0,
    flameSpreadRate: 0.28,
    extinguished: "Yes",
    year: 2023,
    source: "ISS CIR / SoFIE-MIST Investigation",
    confidenceScore: 88,
    confidenceBreakdown: {
      repeatability: "High (Calibrated gas delivery)",
      microgravityType: "ISS CIR 0g",
      sampleSize: "10 ashless filter paper cards"
    },
    sampleSizeNotes: "Ashless cellulose paper (0.15mm thickness)",
    burnDurationSec: 62,
    peakTemperatureC: 540,
    summaries: {
      astronaut: "Thin paper burned with a barely visible ghostly blue ring at reduced pressure (70.3 kPa) and low oxygen (18%). After 60 seconds, it faded away and extinguished completely.",
      engineer: "Reduced cabin pressure (70.3 kPa) lowered the chemical reaction rate while sub-ambient oxygen (18%) suppressed adiabatic flame temperature below 1400 K. Extinction observed at 62 seconds.",
      student: "In thin air with less oxygen, the fire couldn't breathe. It looked like a faint blue ghost before blowing away into darkness."
    },
    keyFindings: [
      "Artemis exploration atmosphere (70.3 kPa, 18% O2 limit) provides substantial fire margin for cellulose",
      "Diffusion flame thickness increases by 40% at low pressures",
      "Blue chemiluminescence (CH* and C2* radicals) dominates visible spectrum"
    ]
  },
  {
    id: "EXP-MOON-007",
    name: "Drop Tower Lunar 0.16g PMMA Slab Calibration",
    material: "PMMA",
    gravity: "0.16g",
    gravityVal: 0.16,
    oxygen: 21.0,
    pressure: 101.3,
    airflow: 10.0,
    flameSpreadRate: 1.45,
    extinguished: "No",
    year: 2018,
    source: "NASA GRC 5.18-Second Zero Gravity Facility (Lunar Rig)",
    confidenceScore: 78,
    confidenceBreakdown: {
      repeatability: "Medium (Short 5.18s test window)",
      microgravityType: "Drop Tower Drag-Shield Lunar Parabola",
      sampleSize: "6 drop tower releases"
    },
    sampleSizeNotes: "PMMA 3mm sheet under tilted deceleration track",
    burnDurationSec: 5.1,
    peakTemperatureC: 820,
    summaries: {
      astronaut: "In simulated Moon gravity (1/6th Earth), fire burned faster than on the Space Station! Weak buoyancy pulled fresh oxygen into the flame while letting heat stay concentrated near the surface.",
      engineer: "Partial gravity of 0.16g generates a Froude number Fr ~ 0.8. Weak buoyant convective velocity (~8 cm/s) assists forced flow without blowing out the flame, maximizing flame spread rate (1.45 mm/s).",
      student: "On the Moon, gravity is just strong enough to pull in fresh oxygen, making fires even sneakier and faster than on the Space Station!"
    },
    keyFindings: [
      "Lunar gravity produces a 'chimney effect' sweet spot for flame propagation",
      "Spread rate is higher at 0.16g than 0g under identical ventilation (10 cm/s)",
      "Flame tip flickers at low frequency (~1.5 Hz)"
    ]
  },
  {
    id: "EXP-MOON-008",
    name: "Lunar Sim Cotton Garment Fabric Flare Run",
    material: "Cotton fabric",
    gravity: "0.16g",
    gravityVal: 0.16,
    oxygen: 26.5,
    pressure: 70.3,
    airflow: 12.0,
    flameSpreadRate: 3.25,
    extinguished: "No",
    year: 2021,
    source: "NASA Parabolic Flight Campaign (Lunar Partial-G)",
    confidenceScore: 74,
    confidenceBreakdown: {
      repeatability: "Moderate (G-jitter present on aircraft)",
      microgravityType: "Parabolic Flight 0.16g (20s parabola)",
      sampleSize: "4 parabolic trajectories"
    },
    sampleSizeNotes: "100% woven cotton astronaut sleepwear fabric",
    burnDurationSec: 19.5,
    peakTemperatureC: 980,
    summaries: {
      astronaut: "Under planned Artemis cabin air (26.5% oxygen at 70 kPa on the Moon), cotton clothing burned vigorously. Flames were yellow-tipped and spread rapidly along the fabric weave.",
      engineer: "Combined partial gravity (0.16g) and enriched oxygen (26.5%) produced rapid upward/concurrent spread of 3.25 mm/s. Oxygen enhancement compensated for reduced pressure flammability boundary.",
      student: "Astronaut pajamas made of regular cotton would burn very fast on a Moon base because of the extra oxygen in the airlock."
    },
    keyFindings: [
      "Artemis 26.5% O2 cabin atmosphere significantly amplifies textile fire risk",
      "Flame spread rate increased by 50% compared to 21% O2 standard air",
      "Fiberglass blenders are mandatory to prevent catastrophic flashover"
    ]
  },
  {
    id: "EXP-MARS-009",
    name: "Mars Habitat Foam Thermal Insulation Burn",
    material: "Foam",
    gravity: "0.38g",
    gravityVal: 0.38,
    oxygen: 28.0,
    pressure: 56.0,
    airflow: 15.0,
    flameSpreadRate: 2.85,
    extinguished: "No",
    year: 2020,
    source: "NASA GRC / JAXA Mars Gravity Simulator Chamber",
    confidenceScore: 71,
    confidenceBreakdown: {
      repeatability: "Moderate (Short drop tower & centrifuge rig)",
      microgravityType: "Centrifuge Parabolic Simulator",
      sampleSize: "5 test burns"
    },
    sampleSizeNotes: "Open-cell polyurethane acoustic insulation foam",
    burnDurationSec: 25,
    peakTemperatureC: 890,
    summaries: {
      astronaut: "Habitat soundproofing foam ignited instantly in simulated Mars cabin atmosphere. It melted into burning droplets that dripped downward under Martian gravity, creating secondary fire pools.",
      engineer: "Polyurethane foam experienced rapid thermoplastic collapse. Liquid pool fire formed at 0.38g with Rayleigh-Taylor droplet detachment. Flame spread rate 2.85 mm/s at 56 kPa cabin pressure.",
      student: "Soft squishy wall foam melts into flaming liquid drops on Mars because gravity is strong enough to pull the melted plastic down into new fires!"
    },
    keyFindings: [
      "Thermoplastic foam poses severe drip-ignition hazards in 0.38g",
      "Martian gravity is sufficient to cause liquid fuel runoff",
      "Requires halogen-free intumescent fire barriers"
    ]
  },
  {
    id: "EXP-MARS-010",
    name: "Mars Transit Vehicle Wire Harness Overheat",
    material: "Wire insulation",
    gravity: "0.38g",
    gravityVal: 0.38,
    oxygen: 24.0,
    pressure: 60.0,
    airflow: 8.0,
    flameSpreadRate: 1.10,
    extinguished: "No",
    year: 2019,
    source: "NASA Glenn Low-Gravity Centrifuge Program",
    confidenceScore: 68,
    confidenceBreakdown: {
      repeatability: "Moderate (Model extrapolation & centrifuge)",
      microgravityType: "Centrifuge Partial-G Rig",
      sampleSize: "4 wire bundle tests"
    },
    sampleSizeNotes: "Triple-twisted Mil-Spec wire bundle with polyimide wrap",
    burnDurationSec: 45,
    peakTemperatureC: 860,
    summaries: {
      astronaut: "Wire bundles burned with an elongated teardrop flame in Martian gravity. The fire traveled along the harness bundle faster than in zero-g due to upward heat drafting.",
      engineer: "Buoyant plume velocity in 0.38g calculated at 14 cm/s. Upward convective preheating augmented opposed flow spread to 1.10 mm/s. Polyimide char was breached at localized hot spots.",
      student: "Electrical wires behind the instrument panels on a Mars spaceship can form tiny chimneys that channel heat straight up the cables."
    },
    keyFindings: [
      "Wire bundle packing density influences flame spread rate by 3x",
      "Partial gravity chimneying outpaces zero-g conduction rates",
      "Circuit breakers must trigger before wire core reaches 220°C"
    ]
  },
  {
    id: "EXP-EARTH-011",
    name: "NASA STD-6001 Test 1 PMMA 1g Baseline",
    material: "PMMA",
    gravity: "1g",
    gravityVal: 1.0,
    oxygen: 20.9,
    pressure: 101.3,
    airflow: 0.0,
    flameSpreadRate: 1.85,
    extinguished: "No",
    year: 2021,
    source: "NASA WSTF (White Sands Test Facility) STD-6001 Test 1",
    confidenceScore: 98,
    confidenceBreakdown: {
      repeatability: "Very High (Certified ASTM/NASA standard)",
      microgravityType: "Earth 1g Ground Benchmark",
      sampleSize: "30 certified qualification test articles"
    },
    sampleSizeNotes: "Standard 300mm x 50mm acrylic bars, vertical upward burn",
    burnDurationSec: 160,
    peakTemperatureC: 1020,
    summaries: {
      astronaut: "Standard ground qualification test. In Earth air, PMMA catches fire and burns vigorously upward with a tall bright orange flame and heavy black smoke.",
      engineer: "Natural buoyant convection dominates (Gr ~ 10^7). Buoyant velocity ~ 80 cm/s creates strong boundary layer shearing, yielding upward spread of 1.85 mm/s with heavy soot radiation.",
      student: "On Earth, fires create their own wind! Hot air shoots straight up, pulling in cold air from the bottom and creating a tall, dancing yellow flame."
    },
    keyFindings: [
      "Earth 1g burns have 4x higher soot volume fraction than 0g",
      "Natural buoyant flow velocity exceeds 70 cm/s without any fans",
      "NASA STD-6001 Test 1 is conservative for some materials, but non-conservative for low-flow 0g smoldering"
    ]
  },
  {
    id: "EXP-EARTH-012",
    name: "Nomex Fabric Vertical Burn 1g Benchmark",
    material: "Nomex",
    gravity: "1g",
    gravityVal: 1.0,
    oxygen: 20.9,
    pressure: 101.3,
    airflow: 0.0,
    flameSpreadRate: 0.0,
    extinguished: "Yes",
    year: 2020,
    source: "NASA WSTF Materials Flammability Laboratory",
    confidenceScore: 99,
    confidenceBreakdown: {
      repeatability: "Very High (Certified ISO/ASTM/NASA standard)",
      microgravityType: "Earth 1g Ground Benchmark",
      sampleSize: "25 certified test coupons"
    },
    sampleSizeNotes: "Certified flight-suit spec fabric vertical burn test",
    burnDurationSec: 12,
    peakTemperatureC: 480,
    summaries: {
      astronaut: "Nomex immediately self-extinguished when the pilot flame was removed. Burn length was under 2.5 cm. Fully passes NASA flight material certification for 1g.",
      engineer: "Char length 22 mm, total burn duration 12s post-igniter cutoff. Limiting Oxygen Index (LOI) in 1g is 28.5%, far above normal 20.9% atmospheric concentration.",
      student: "Even when blasted with a blowtorch flame, the Nomex cloth refused to catch fire and turned off the second the torch was taken away."
    },
    keyFindings: [
      "Nomex easily passes NASA STD-6001 Test 1 in standard air",
      "LOI is 28.5% at 1g, 101.3 kPa",
      "Forms intact carbonaceous protective shield"
    ]
  },
  {
    id: "EXP-EARTH-013",
    name: "Nomex Oxygen Enrichment 34% Flash Test 1g",
    material: "Nomex",
    gravity: "1g",
    gravityVal: 1.0,
    oxygen: 34.0,
    pressure: 101.3,
    airflow: 0.0,
    flameSpreadRate: 1.95,
    extinguished: "No",
    year: 2022,
    source: "NASA WSTF High-Oxygen Flammability Protocol",
    confidenceScore: 95,
    confidenceBreakdown: {
      repeatability: "High (Repeat chamber burns)",
      microgravityType: "Earth 1g High-O2 Benchmark",
      sampleSize: "15 test specimens"
    },
    sampleSizeNotes: "Pre-EVA suit purge simulation coupon",
    burnDurationSec: 90,
    peakTemperatureC: 1140,
    summaries: {
      astronaut: "WARNING: In 34% oxygen (used during astronaut spacewalk suit preparation), Nomex fails completely and burns like ordinary cotton with severe heat output.",
      engineer: "Operating above the material LOI (28.5%). At 34% O2, polymer chain cleavage outpaces char stabilization. Upward spread rate 1.95 mm/s. Catastrophic degradation of thermal protection.",
      student: "Even fireproof space suits become flammable if there is too much oxygen in the room! At 34% oxygen, Nomex burns rapidly."
    },
    keyFindings: [
      "Nomex flammability threshold breached above 28.5% O2",
      "Severe hazard during spacewalk pre-breathe high-oxygen operations",
      "Spacewalk prep requires strict non-metallic material controls"
    ]
  },
  {
    id: "EXP-SOF-014",
    name: "SoFIE-Narrow Channel Foam Quenching 0g",
    material: "Foam",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 21.0,
    pressure: 101.3,
    airflow: 2.0,
    flameSpreadRate: 0.15,
    extinguished: "Yes",
    year: 2023,
    source: "ISS CIR / SoFIE Narrow Channel Apparatus",
    confidenceScore: 87,
    confidenceBreakdown: {
      repeatability: "High (ISS CIR payload)",
      microgravityType: "ISS Long-duration 0g",
      sampleSize: "7 test runs"
    },
    sampleSizeNotes: "Open-cell melamine foam strips in confined duct",
    burnDurationSec: 42,
    peakTemperatureC: 490,
    summaries: {
      astronaut: "Melamine foam burned very sluggishly in a confined duct with ultra-low airflow (2 cm/s). It starved of oxygen and put itself out in 42 seconds.",
      engineer: "Duct wall thermal quenching coupled with low oxygen Peclet number (Pe ~ 3) drove boundary layer heat loss. Flame front quenched when heat loss factor exceeded 0.65.",
      student: "Trapped in a narrow tube without fresh air moving, the fire suffocated in under a minute."
    },
    keyFindings: [
      "Confined spaces in 0g enhance radiative quenching",
      "Melamine foam exhibits higher microgravity fire safety than polyurethane",
      "Critical quenching airflow is 3.2 cm/s"
    ]
  },
  {
    id: "EXP-FLEX-015",
    name: "FLEX-2 Heptane Droplet Quench in 18% O2",
    material: "PMMA", // mapped to liquid polymer surrogate
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 18.0,
    pressure: 101.3,
    airflow: 0.0,
    flameSpreadRate: 0.10,
    extinguished: "Yes",
    year: 2013,
    source: "ISS CIR / FLEX-2 (Flame Extinguishment Experiment)",
    confidenceScore: 97,
    confidenceBreakdown: {
      repeatability: "Very High (Multi-year ISS campaign)",
      microgravityType: "ISS True Microgravity",
      sampleSize: "50+ suspended droplets"
    },
    sampleSizeNotes: "2mm to 4mm suspended spherical droplets",
    burnDurationSec: 15,
    peakTemperatureC: 610,
    summaries: {
      astronaut: "Liquid fuel droplet formed a perfectly round blue halo. At 18% oxygen with zero fan airflow, the flame abruptly collapsed and vanished without any smoke.",
      engineer: "Pure spherical symmetry (1D d-squared law). Droplet burning rate constant was 0.38 mm^2/s. Radiative extinction occurred at droplet diameter d_ext = 1.4 mm due to CO2/H2O emission.",
      student: "In space, a drop of fuel makes a glowing blue sphere like a marble of light! Because there is no gravity, it has no top and no bottom."
    },
    keyFindings: [
      "Spherical diffusion flames experience pure 1D radial transport",
      "Quenching diameter is highly sensitive to ambient O2 fraction",
      "Revealed cool-flame combustion phenomena at ~600 K"
    ]
  },
  {
    id: "EXP-SAF-016",
    name: "Saffire-III PMMA Duct Spread under Low Airflow",
    material: "PMMA",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 20.9,
    pressure: 101.3,
    airflow: 10.0,
    flameSpreadRate: 0.72,
    extinguished: "No",
    year: 2017,
    source: "NASA Saffire-III Mission (Cygnus OA-7)",
    confidenceScore: 93,
    confidenceBreakdown: {
      repeatability: "High (Multi-camera radiometry)",
      microgravityType: "Free-Flying Cargo Craft 0g",
      sampleSize: "Large thick PMMA plate"
    },
    sampleSizeNotes: "50mm x 400mm x 10mm thick clear acrylic plate",
    burnDurationSec: 360,
    peakTemperatureC: 790,
    summaries: {
      astronaut: "Thick plastic plate burned steadily as long as the ventilation fan blew at 10 cm/s. The flame spread forward along the face of the plastic like a glowing blue caterpillar.",
      engineer: "Concurrent boundary layer flame spread with thick fuel bed. Steady spread velocity 0.72 mm/s. Pyrolysis length stabilized at 42 mm with 0.8 kW peak heat release.",
      student: "Even thick hard plastic will keep burning in weightlessness if the spacecraft fans keep blowing air across it."
    },
    keyFindings: [
      "Thick plastics sustain steady burning at moderate airflow in 0g",
      "Opposed flow flame spread is slower than concurrent spread by 3x",
      "Surface bubble formation ejects combustible jets into the flame"
    ]
  },
  {
    id: "EXP-BASS-017",
    name: "BASS-I Flat Cellulose Wax Blend Quench",
    material: "Paper",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 21.0,
    pressure: 101.3,
    airflow: 3.5,
    flameSpreadRate: 0.18,
    extinguished: "Yes",
    year: 2012,
    source: "NASA BASS-I (ISS Expedition 30/31)",
    confidenceScore: 90,
    confidenceBreakdown: {
      repeatability: "High (Crew-tended Glovebox)",
      microgravityType: "ISS Microgravity Glovebox",
      sampleSize: "14 test fuel strips"
    },
    sampleSizeNotes: "Paraffin-impregnated filter paper strips",
    burnDurationSec: 55,
    peakTemperatureC: 560,
    summaries: {
      astronaut: "Paper strip soaked in paraffin wax started with a bright flame, but as fan speed was slowed down to 3.5 cm/s, the flame contracted into a tiny blue bead and went out.",
      engineer: "Demonstrated low-speed convective extinction boundary. Flame base detached from the stabilization anchor when blowing velocity dropped below 4.0 cm/s, leading to complete extinction.",
      student: "The astronaut turned down the glovebox fan just a tiny bit, and the flame shrank into a blue teardrop before disappearing completely!"
    },
    keyFindings: [
      "Critical convective limit for thin cellulose is 3.8 cm/s at 21% O2",
      "Flame color transitions from yellow to pure blue as airflow decreases",
      "Soot formation ceases entirely below 5 cm/s airflow"
    ]
  },
  {
    id: "EXP-MOON-018",
    name: "Lunar Sim Wire Insulation Overheat in 28% O2",
    material: "Wire insulation",
    gravity: "0.16g",
    gravityVal: 0.16,
    oxygen: 28.0,
    pressure: 70.3,
    airflow: 10.0,
    flameSpreadRate: 1.62,
    extinguished: "No",
    year: 2022,
    source: "NASA GRC Lunar Gravity Drop Tower Array",
    confidenceScore: 72,
    confidenceBreakdown: {
      repeatability: "Medium (5-second drop window)",
      microgravityType: "Drop Tower with Moon Accel Pulley",
      sampleSize: "8 drop tests"
    },
    sampleSizeNotes: "Kapton-wrapped aerospace wire harness mockups",
    burnDurationSec: 5.18,
    peakTemperatureC: 910,
    summaries: {
      astronaut: "HIGH RISK: In Lunar base cabin air (28% oxygen), an overheated power cable caught fire quickly. The flame climbed up the wire at a brisk pace.",
      engineer: "Kapton polyimide insulation, which passes NASA 1g standard air testing, sustained continuous upward propagation of 1.62 mm/s at 0.16g and 28% O2. Weak buoyancy prevents soot stagnation.",
      student: "On the Moon, a short circuit in a wire can easily start a fire that climbs along the power cords inside walls."
    },
    keyFindings: [
      "Kapton polyimide becomes flammable under Artemis Lunar cabin atmosphere",
      "Spread rate is 2.5x higher than in 0g under identical gas composition",
      "Critical wire bundle packing limits must be revised for Artemis"
    ]
  },
  {
    id: "EXP-MARS-019",
    name: "Mars Habitat Cotton Fabric Horizontal Burn",
    material: "Cotton fabric",
    gravity: "0.38g",
    gravityVal: 0.38,
    oxygen: 30.0,
    pressure: 56.0,
    airflow: 5.0,
    flameSpreadRate: 2.40,
    extinguished: "No",
    year: 2021,
    source: "NASA GRC / ESA Mars Sim Parabolic Flight",
    confidenceScore: 66,
    confidenceBreakdown: {
      repeatability: "Low-Moderate (Parabolic aircraft turbulence)",
      microgravityType: "Mars Parabolic Arc (0.38g)",
      sampleSize: "3 test parabolas"
    },
    sampleSizeNotes: "Horizontal cotton fabric weave with low-velocity crossflow",
    burnDurationSec: 22,
    peakTemperatureC: 870,
    summaries: {
      astronaut: "In a simulated low-pressure Mars habitat (30% oxygen, 56 kPa), cotton cloth burned rapidly even with barely any fan breeze. The flame had an orange core with a fluttering top.",
      engineer: "At 0.38g, buoyancy-driven Rayleigh number Ra ~ 4x10^4. Low pressure (56 kPa) was easily offset by 30% O2 mole fraction, resulting in rapid flame propagation of 2.40 mm/s.",
      student: "Even with the thin atmosphere planned for Mars bases, having extra oxygen makes clothing and sheets catch fire and spread fast."
    },
    keyFindings: [
      "Oxygen mole fraction of 30% easily overcomes low pressure suppression effects",
      "Horizontal spread on Mars has both buoyant lift and lateral creep",
      "Extinguishment requires immediate nitrogen or CO2 flood"
    ]
  },
  {
    id: "EXP-MARS-020",
    name: "Mars Sim Paper Sheet Low-Pressure Quench",
    material: "Paper",
    gravity: "0.38g",
    gravityVal: 0.38,
    oxygen: 20.0,
    pressure: 50.0,
    airflow: 5.0,
    flameSpreadRate: 0.32,
    extinguished: "Yes",
    year: 2020,
    source: "Mars Parabolic Simulation Campaign (CNES/NASA)",
    confidenceScore: 69,
    confidenceBreakdown: {
      repeatability: "Moderate (Aircraft partial-g parabola)",
      microgravityType: "Aircraft Mars Parabola (0.38g)",
      sampleSize: "4 drop parabolas"
    },
    sampleSizeNotes: "Standard laboratory cellulose card",
    burnDurationSec: 16,
    peakTemperatureC: 510,
    summaries: {
      astronaut: "When oxygen was held at 20% and cabin pressure dropped to 50 kPa, paper burned weakly and went out within 16 seconds on Mars gravity.",
      engineer: "Low total pressure (50 kPa) coupled with standard 20% O2 lowered the oxidizer mass flux below critical threshold. Reaction zone cooled rapidly via convective boundary layer into self-extinction.",
      student: "Dropping the air pressure inside the Mars room makes the fire starve and fizzle out quickly."
    },
    keyFindings: [
      "Depressurization to 50 kPa is an effective emergency fire suppression tactic for Mars habs",
      "Extinction occurs in <20 seconds for thin cellulosic fuels",
      "Safe oxygen fraction limit at 50 kPa is ~22%"
    ]
  },
  {
    id: "EXP-EARTH-021",
    name: "Wire Insulation Standard Overheat 1g Test",
    material: "Wire insulation",
    gravity: "1g",
    gravityVal: 1.0,
    oxygen: 20.9,
    pressure: 101.3,
    airflow: 0.0,
    flameSpreadRate: 1.25,
    extinguished: "No",
    year: 2021,
    source: "NASA WSTF Wire Overload Chamber (ASTM D-3801)",
    confidenceScore: 98,
    confidenceBreakdown: {
      repeatability: "Very High (Standard lab qualification)",
      microgravityType: "Earth 1g Ground Benchmark",
      sampleSize: "40 wire qualification tests"
    },
    sampleSizeNotes: "Mil-W-22759 wire specimen subjected to 40A overload",
    burnDurationSec: 120,
    peakTemperatureC: 960,
    summaries: {
      astronaut: "Standard ground test of spacecraft wiring. Under extreme electrical current, the insulation ignited and burned upward with a bright flame until power was cut.",
      engineer: "Upward buoyant convective flow accelerated flame along the vertical axis at 1.25 mm/s. Thermal feedback from copper core accounted for 35% of total preheat enthalpy.",
      student: "When a wire gets way too hot on Earth, the plastic insulation catches fire and flames zip straight up to the ceiling."
    },
    keyFindings: [
      "Upward flame spread on vertical wires is driven by buoyant boundary layer",
      "Overloaded copper core acts as a persistent thermal reservoir",
      "Circuit breakers must de-energize line in <150 ms to prevent ignition"
    ]
  },
  {
    id: "EXP-EARTH-022",
    name: "Polyurethane Foam Open Burn 1g Reference",
    material: "Foam",
    gravity: "1g",
    gravityVal: 1.0,
    oxygen: 20.9,
    pressure: 101.3,
    airflow: 0.0,
    flameSpreadRate: 3.80,
    extinguished: "No",
    year: 2019,
    source: "NASA WSTF Flammability Standard Testing",
    confidenceScore: 98,
    confidenceBreakdown: {
      repeatability: "Very High (ASTM Certified)",
      microgravityType: "Earth 1g Ground Benchmark",
      sampleSize: "20 foam samples"
    },
    sampleSizeNotes: "Open-cell cabin seat cushioning foam block",
    burnDurationSec: 45,
    peakTemperatureC: 1120,
    summaries: {
      astronaut: "Untreated polyurethane seat foam burned violently on Earth. It was completely consumed in 45 seconds, producing intense heat, dense toxic smoke, and burning puddles.",
      engineer: "High porosity allowed internal buoyant drafting. Peak heat release rate reached 450 kW/m^2 with rapid flashover. Spread rate 3.80 mm/s. Not flight-certified without fire-blocking cover.",
      student: "Regular couch or chair foam on Earth burns super fast like a torch and turns into a puddle of burning liquid!"
    },
    keyFindings: [
      "Open-cell foam has the fastest flame spread rate of all tested materials in 1g",
      "Toxic hydrogen cyanide (HCN) and carbon monoxide (CO) emission rates are extreme",
      "Must be isolated behind non-flammable barriers in all spacecraft cabins"
    ]
  },
  {
    id: "EXP-SOF-023",
    name: "SoFIE-GEL Thick PMMA Opposed Low-Pressure",
    material: "PMMA",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 26.5,
    pressure: 70.3,
    airflow: 15.0,
    flameSpreadRate: 0.88,
    extinguished: "No",
    year: 2023,
    source: "ISS CIR / SoFIE-GEL Flight Campaign",
    confidenceScore: 94,
    confidenceBreakdown: {
      repeatability: "High (ISS CIR precision instruments)",
      microgravityType: "ISS Long-duration 0g",
      sampleSize: "8 thick slabs"
    },
    sampleSizeNotes: "10mm thick acrylic bar in Artemis baseline atmosphere",
    burnDurationSec: 280,
    peakTemperatureC: 840,
    summaries: {
      astronaut: "Tested under the exact planned Artemis lunar cabin air (26.5% oxygen, 70 kPa) on the ISS. The plastic burned steadily with a quiet blue flame that resisted extinction at 15 cm/s ventilation.",
      engineer: "Artemis exploration atmosphere (26.5% O2 at 70.3 kPa) yields an effective oxygen partial pressure of 18.6 kPa. Steady opposed spread of 0.88 mm/s with stable pyrolysis zone.",
      student: "Scientists tested the exact air that will be inside future Moon bases on the Space Station. The plastic fire burned steadily without flickering."
    },
    keyFindings: [
      "Validates that Artemis cabin air allows sustained burning of PMMA in 0g",
      "Ventilation velocity of 15 cm/s provides sufficient oxygen flux",
      "Extinguishment requires ventilation drop below 4 cm/s"
    ]
  },
  {
    id: "EXP-SAF-024",
    name: "Saffire-IV High-Flow Cotton Blend Flamefront",
    material: "Cotton fabric",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 21.0,
    pressure: 101.3,
    airflow: 28.0,
    flameSpreadRate: 2.95,
    extinguished: "No",
    year: 2020,
    source: "NASA Saffire-IV Investigation (Cygnus NG-13)",
    confidenceScore: 95,
    confidenceBreakdown: {
      repeatability: "High (High-speed multi-spectral cameras)",
      microgravityType: "Spacecraft Free-Flight 0g",
      sampleSize: "Multi-panel combustor"
    },
    sampleSizeNotes: "Full-scale fabric panels under high forced draft",
    burnDurationSec: 310,
    peakTemperatureC: 920,
    summaries: {
      astronaut: "When spacecraft ventilation was ramped up to 28 cm/s (emergency ventilation speed), the fabric fire accelerated dramatically. Strong wind fed fresh oxygen directly into the flame front.",
      engineer: "Demonstrated convective enhancement regime. Convective Peclet number Pe ~ 50. Flame spread rate scaled with U_inf^0.65, achieving 2.95 mm/s. High convective cooling was offset by stoichiometric enrichment.",
      student: "Turning up the fans made the fire blow forward like a campfire in a breeze! It shows why the first rule in a space fire is turning off the fans immediately."
    },
    keyFindings: [
      "High airflow (>25 cm/s) in 0g mimics the intense burning usually only seen on Earth",
      "Confirms emergency protocol: shut down cabin circulation fans before discharging extinguishers",
      "Radiative loss fraction drops from 40% at low speed to 18% at high speed"
    ]
  },
  {
    id: "EXP-SAF-025",
    name: "Saffire-V Nomex Enriched Oxygen Quench Limit",
    material: "Nomex",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 28.0,
    pressure: 83.0,
    airflow: 10.0,
    flameSpreadRate: 0.35,
    extinguished: "Yes",
    year: 2021,
    source: "NASA Saffire-V Mission (Cygnus NG-14)",
    confidenceScore: 91,
    confidenceBreakdown: {
      repeatability: "High (Full telemetry & gas analyzers)",
      microgravityType: "Spacecraft Free-Flight 0g",
      sampleSize: "4 fabric coupons"
    },
    sampleSizeNotes: "Nomex III-A fabric swatch with automated ignition coil",
    burnDurationSec: 48,
    peakTemperatureC: 580,
    summaries: {
      astronaut: "Even with oxygen bumped to 28% in 0g, Nomex charred heavily, slowed to a crawl, and extinguished after 48 seconds. Nomex remains remarkably protective even in moderately enriched air.",
      engineer: "In 0g, absent buoyant drafting prevented oxygen penetration through the swollen char layer. Despite 28% O2, flame spread decayed from 0.35 mm/s to 0.0 mm/s. Quenched after 48 seconds.",
      student: "Even with extra oxygen in space, this tough spacesuit fabric puffed up like toasted bread and choked out the flame!"
    },
    keyFindings: [
      "Microgravity charring is more protective than 1g charring because there is no buoyant draft stripping the char away",
      "Nomex self-extinguishes up to 28% O2 in 0g with moderate airflow",
      "Highly recommended for Artemis cabin stowage and apparel"
    ]
  },
  {
    id: "EXP-MARS-026",
    name: "Mars Habitat Nomex Wire Harness Conduit 0.38g",
    material: "Nomex",
    gravity: "0.38g",
    gravityVal: 0.38,
    oxygen: 32.0,
    pressure: 56.0,
    airflow: 12.0,
    flameSpreadRate: 1.15,
    extinguished: "No",
    year: 2023,
    source: "NASA Mars Partial-Gravity Combustion Simulation Rig",
    confidenceScore: 65,
    confidenceBreakdown: {
      repeatability: "Low-Moderate (Centrifuge short test)",
      microgravityType: "Mars Centrifuge Chamber",
      sampleSize: "3 test bundles"
    },
    sampleSizeNotes: "Nomex braided sleeve over power cable bundle",
    burnDurationSec: 35,
    peakTemperatureC: 840,
    summaries: {
      astronaut: "WARNING: In a high-oxygen Mars airlock scenario (32% oxygen, 0.38g), the Nomex protective cable sleeving caught fire and continued burning. High oxygen breaks its protection.",
      engineer: "At 32% O2 mole fraction, chemical kinetic reaction rates overcame the diffusive resistance of the aromatic char. At 0.38g, buoyancy assisted upward convection (1.15 mm/s spread).",
      student: "Inside a Mars airlock filled with extra oxygen, even protective fireproof sleeves can catch fire if wires short circuit."
    },
    keyFindings: [
      "Identifies a critical safety boundary: Nomex fails in >30% O2 under partial gravity",
      "Cable conduit bundling traps heat and channels buoyant oxygen flow",
      "Requires automated inert gas injection inside cable raceways"
    ]
  },
  {
    id: "EXP-MOON-027",
    name: "Lunar Sim Paper Combustion in Exploration Air",
    material: "Paper",
    gravity: "0.16g",
    gravityVal: 0.16,
    oxygen: 26.5,
    pressure: 70.3,
    airflow: 8.0,
    flameSpreadRate: 1.90,
    extinguished: "No",
    year: 2022,
    source: "NASA GRC Lunar Gravity Facility",
    confidenceScore: 76,
    confidenceBreakdown: {
      repeatability: "Medium (Drop rig repeat)",
      microgravityType: "Drop Tower 0.16g Counterweight System",
      sampleSize: "7 drop trials"
    },
    sampleSizeNotes: "Standard cellulose flight procedure checklist paper",
    burnDurationSec: 5.18,
    peakTemperatureC: 830,
    summaries: {
      astronaut: "Paper flight procedure sheets burned briskly in simulated Moon base air. Flames were steady and had a bright amber tip.",
      engineer: "Cellulose pyrolysis rate in 0.16g and 26.5% O2 reached 0.08 g/s. Flame spread rate 1.90 mm/s. The low-buoyancy plume provided continuous oxidizer without blow-off shearing.",
      student: "Astronaut flight checklists and paper notebooks will burn easily on the Moon if left near hot equipment."
    },
    keyFindings: [
      "Paper checklists represent a primary localized fire propagation vector in lunar habitats",
      "Recommend switching to synthetic non-flammable mineral paper or digital tablets",
      "Spread rate is 2x faster than 0g baseline under identical atmosphere"
    ]
  },
  {
    id: "EXP-SOF-028",
    name: "SoFIE-MIST High-Pressure Acrylic Quench 0g",
    material: "PMMA",
    gravity: "0g",
    gravityVal: 0.0,
    oxygen: 16.0,
    pressure: 101.3,
    airflow: 12.0,
    flameSpreadRate: 0.0,
    extinguished: "Yes",
    year: 2024,
    source: "ISS CIR / SoFIE-MIST Recent Flight Telemetry",
    confidenceScore: 96,
    confidenceBreakdown: {
      repeatability: "Very High (Recent ISS flight data)",
      microgravityType: "ISS Long-duration 0g",
      sampleSize: "12 flight burns"
    },
    sampleSizeNotes: "Cast PMMA cylinder subjected to oxygen ramp-down",
    burnDurationSec: 24,
    peakTemperatureC: 480,
    summaries: {
      astronaut: "When oxygen was throttled down to 16% in the Space Station combustion chamber, the acrylic plastic fire instantly withered away and completely extinguished in 24 seconds.",
      engineer: "Established absolute Limiting Oxygen Index (LOI) for PMMA in 0g at 16.8% under 12 cm/s forced convection. At 16.0% O2, chemical enthalpy release failed to maintain surface vaporization.",
      student: "Dropping the oxygen from 21% down to 16% acts like an invisible fire extinguisher in space, shutting the fire off in seconds without needing any foam or water."
    },
    keyFindings: [
      "PMMA in 0g exhibits an absolute extinction cutoff at 16.8% O2",
      "Confirms vehicle oxygen throttling as a primary non-destructive suppression technique",
      "No toxic soot residue produced during sub-17% O2 starvation"
    ]
  }
];
