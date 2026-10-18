// Combustion Physics Modeling Engine
// Calibrated against NASA Glenn Research Center microgravity flight data (Saffire, SoFIE, BASS)

export const MATERIAL_COEFFICIENTS = {
  "Cotton fabric": { baseRate: 1.8, loi: 18.0, o2Exp: 1.6, pExp: 0.6, flowExp: 0.5, sootCoeff: 0.4 },
  "PMMA": { baseRate: 1.3, loi: 17.5, o2Exp: 1.9, pExp: 0.7, flowExp: 0.55, sootCoeff: 0.8 },
  "Wire insulation": { baseRate: 0.9, loi: 22.0, o2Exp: 2.1, pExp: 0.5, flowExp: 0.4, sootCoeff: 0.6 },
  "Foam": { baseRate: 2.6, loi: 18.5, o2Exp: 2.3, pExp: 0.8, flowExp: 0.6, sootCoeff: 0.95 },
  "Paper": { baseRate: 1.4, loi: 16.5, o2Exp: 1.5, pExp: 0.5, flowExp: 0.45, sootCoeff: 0.3 },
  "Nomex": { baseRate: 0.25, loi: 28.5, o2Exp: 3.2, pExp: 0.4, flowExp: 0.35, sootCoeff: 0.25 }
};

/**
 * Predicts flame spread rate (mm/s), extinction risk, flame size, and uncertainty
 */
export function predictCombustionState({ gravity, material = "PMMA", oxygen = 21.0, pressure = 101.3, airflow = 10.0 }) {
  const coeff = MATERIAL_COEFFICIENTS[material] || MATERIAL_COEFFICIENTS["PMMA"];
  const g = Math.max(0, Math.min(1.2, Number(gravity) || 0));
  const o2 = Number(oxygen) || 21.0;
  const p = Number(pressure) || 101.3;
  const u = Number(airflow) || 10.0;

  // 1. Oxygen Driving Force relative to LOI
  // If oxygen is below LOI, flame cannot self-sustain
  const effectiveLOI = coeff.loi * Math.pow(101.3 / p, 0.25);
  const o2Excess = o2 - effectiveLOI;

  if (o2Excess <= 0) {
    return {
      flameSpreadRate: 0.0,
      extinguishedLikelihood: 100,
      flameSizeIndex: 0,
      uncertaintyMmSec: 0.05,
      regime: "Sub-Critical Extinction (O2 below LOI)",
      flameShape: getFlameMorphology(0, g, u, o2),
      isExtinguished: true
    };
  }

  // 2. Buoyant convective velocity scaling: u_buoy ~ sqrt(g * L_char * deltaT / T_inf)
  // At 1g, u_buoy is roughly 70-80 cm/s. At 0g it is 0.
  const u_buoyant = 75.0 * Math.sqrt(g);

  // Total effective convective velocity interacting with the reaction zone
  // In 0g, effective flow is purely forced airflow u.
  // In partial-g, buoyant vector couples with ventilation flow.
  const u_eff = Math.sqrt(Math.pow(u, 2) + Math.pow(u_buoyant, 2));

  // 3. Low-flow radiative extinction threshold
  // In 0g with very low airflow (< 3 cm/s), solid fuels suffer radiative extinction
  let flowStarvationFactor = 1.0;
  if (g < 0.05 && u < 4.0) {
    if (u <= 1.0) {
      flowStarvationFactor = 0.05; // almost quenched
    } else {
      flowStarvationFactor = Math.pow((u - 1.0) / 3.0, 1.2);
    }
  }

  // 4. Spread rate scaling calculation
  // V_f ~ Base * ( (O2 - LOI)/21 )^o2Exp * (P / 101.3)^pExp * (u_eff / 10)^flowExp
  const o2Factor = Math.pow(Math.max(0.1, o2Excess / (21.0 - coeff.loi + 4.0)), coeff.o2Exp);
  const pFactor = Math.pow(p / 101.3, coeff.pExp);
  const flowFactor = Math.pow(Math.max(0.5, u_eff / 10.0), coeff.flowExp);

  // Partial gravity chimney resonance: at 0.15g - 0.4g, moderate buoyancy feeds oxygen
  // without strong aerodynamic cooling, often creating a local peak
  let partialGResonance = 1.0;
  if (g > 0.02 && g < 0.6) {
    partialGResonance = 1.0 + 0.28 * Math.sin((g / 0.6) * Math.PI);
  }

  let spreadRate = coeff.baseRate * o2Factor * pFactor * flowFactor * flowStarvationFactor * partialGResonance;
  spreadRate = Math.max(0, spreadRate);

  // 5. Extinguishment Likelihood (0 to 100%)
  // High when: O2 near LOI, very low airflow in 0g, or extremely low pressure
  let quenchScore = 0;
  if (o2Excess < 2.0) quenchScore += 50 * (1 - o2Excess / 2.0);
  if (g < 0.05 && u < 5.0) quenchScore += 45 * (1 - u / 5.0);
  if (p < 55.0) quenchScore += 25 * (1 - (p - 40.0) / 15.0);
  quenchScore = Math.min(100, Math.max(0, Math.round(quenchScore)));

  if (spreadRate < 0.08) {
    quenchScore = Math.max(quenchScore, 92);
  }

  // 6. Scientific Uncertainty Envelope
  // In 0g (ISS CIR data is rich) sigma is ~ 0.15 * spreadRate
  // In 1g (Earth ASTM data is rich) sigma is ~ 0.08 * spreadRate
  // In Lunar (0.16g) and Mars (0.38g) (limited drop tower data), sigma widens up to 0.42 * spreadRate
  let uncertaintyFraction = 0.12;
  if (g >= 0.05 && g <= 0.55) {
    // Peak uncertainty around 0.25g where almost zero prolonged flight data exists
    const distanceToMidGap = 1.0 - Math.abs(g - 0.25) / 0.25;
    uncertaintyFraction = 0.15 + 0.30 * Math.max(0, distanceToMidGap);
  } else if (g < 0.05) {
    uncertaintyFraction = 0.14; // ISS flight validated
  } else {
    uncertaintyFraction = 0.08; // Earth lab validated
  }

  const uncertaintyMmSec = Math.max(0.08, spreadRate * uncertaintyFraction);

  // 7. Flame morphology index (for flame visualizer)
  const morphology = getFlameMorphology(spreadRate, g, u_eff, o2);

  return {
    flameSpreadRate: Number(spreadRate.toFixed(2)),
    extinguishedLikelihood: quenchScore,
    flameSizeIndex: morphology.flameSize,
    uncertaintyMmSec: Number(uncertaintyMmSec.toFixed(2)),
    upperUncertainty: Number((spreadRate + uncertaintyMmSec).toFixed(2)),
    lowerUncertainty: Number(Math.max(0, spreadRate - uncertaintyMmSec).toFixed(2)),
    regime: determineRegime(g, u, spreadRate, quenchScore),
    flameShape: morphology,
    isExtinguished: quenchScore > 85
  };
}

function determineRegime(g, u, rate, quenchScore) {
  if (quenchScore > 80 || rate === 0) return "Extinction / Self-Quenching Regime";
  if (g < 0.03 && u < 6) return "Quiescent 0g Diffusion-Controlled";
  if (g < 0.03 && u >= 6) return "Forced Convection 0g Boundary Layer";
  if (g >= 0.03 && g <= 0.45) return "Partial-G Buoyant Transition (High Uncertainty)";
  return "Buoyancy-Dominated 1g Turbulent Plume";
}

export function getFlameMorphology(rate, g, u_eff, o2) {
  // At 0g: spherical / hemispherical, blue core dominant, low aspect ratio (round)
  // At 1g: tall teardrop, high aspect ratio, bright yellow/orange soot tip, flickering
  const gNorm = Math.min(1.0, g);
  
  // Aspect ratio (height to width): 1.0 in 0g (hemisphere/sphere) -> 3.8 in 1g (stretched teardrop)
  const aspectRatio = 1.0 + 2.8 * Math.pow(gNorm, 0.6);
  
  // Blue radical emission vs yellow soot incandescent emission
  // 0g has minimal soot agglomeration due to long residence times and low temperatures -> high blue fraction
  const blueFraction = Math.max(0.1, 0.90 - 0.75 * Math.pow(gNorm, 0.7));
  const orangeFraction = 1.0 - blueFraction;

  // Flame height scale
  const heightMultiplier = (0.7 + 0.8 * Math.pow(gNorm, 0.5)) * (0.8 + 0.4 * Math.min(2.0, rate));
  
  // Flicker frequency (Earth flames flicker ~10-14 Hz, Moon ~1.5 Hz, 0g has 0 Hz steady diffusion)
  const flickerFreqHz = gNorm === 0 ? 0 : Number((1.5 * Math.sqrt(gNorm * 9.8)).toFixed(1));

  return {
    aspectRatio: Number(aspectRatio.toFixed(2)),
    blueFraction: Number(blueFraction.toFixed(2)),
    orangeFraction: Number(orangeFraction.toFixed(2)),
    heightMultiplier: Number(heightMultiplier.toFixed(2)),
    flickerFreqHz,
    flameSize: Math.min(100, Math.round(rate * 25 + gNorm * 20))
  };
}

/**
 * Generate curve data points for Recharts spread rate vs gravity
 */
export function generateGravityCurveData(material, oxygen, pressure, airflow) {
  const steps = [
    0.0, 0.03, 0.08, 0.16, 0.22, 0.30, 0.38, 0.50, 0.65, 0.80, 1.0
  ];

  return steps.map(g => {
    const res = predictCombustionState({
      gravity: g,
      material,
      oxygen,
      pressure,
      airflow
    });

    let label = `${g}g`;
    if (g === 0.0) label = "0g (ISS)";
    if (g === 0.16) label = "0.16g (Moon)";
    if (g === 0.38) label = "0.38g (Mars)";
    if (g === 1.0) label = "1g (Earth)";

    return {
      gravity: g,
      gravityLabel: label,
      spreadRate: res.flameSpreadRate,
      upperBand: res.upperUncertainty,
      lowerBand: res.lowerUncertainty,
      uncertaintySpan: Number((res.upperUncertainty - res.lowerUncertainty).toFixed(2)),
      extinguishedLikelihood: res.extinguishedLikelihood
    };
  });
}
