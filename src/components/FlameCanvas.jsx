import React, { useEffect, useRef } from 'react';

/**
 * FlameCanvas renders an animated, scientifically grounded microgravity flame.
 * Transforms dynamically between:
 * - 0g: Spherical / hemispherical, translucent blue-tinted diffusion dome, steady
 * - 0.16g (Moon): Mildly elongated, incipient orange soot tip, slow flutter
 * - 0.38g (Mars): Distinct teardrop, buoyant draft, orange core
 * - 1g (Earth): Tall flickering orange/yellow buoyant plume with soot convection
 */
export default function FlameCanvas({
  gravity = 0,
  material = "PMMA",
  oxygen = 21,
  airflow = 10,
  spreadRate = 1.0,
  isExtinguished = false
}) {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;

    const render = () => {
      time += 0.035;
      const width = canvas.width;
      const height = canvas.height;

      // Clear with dark mission-control background
      ctx.clearRect(0, 0, width, height);

      // Base coordinates for fuel sample
      const centerX = width / 2;
      const fuelBaseY = height - 45;

      // Draw fuel sample slab
      ctx.save();
      // Fuel substrate
      const slabGrad = ctx.createLinearGradient(centerX - 80, fuelBaseY, centerX + 80, fuelBaseY + 25);
      slabGrad.addColorStop(0, '#1e293b');
      slabGrad.addColorStop(0.5, '#334155');
      slabGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = slabGrad;
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(centerX - 85, fuelBaseY, 170, 20, 4);
      ctx.fill();
      ctx.stroke();

      // Material texture label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${material.toUpperCase()} SUBSTRATE`, centerX, fuelBaseY + 14);

      // Airflow vector indicator
      const flowArrowLen = Math.min(65, Math.max(15, airflow * 2.2));
      const flowY = fuelBaseY - 12;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(centerX - 110, flowY);
      ctx.lineTo(centerX - 110 + flowArrowLen, flowY);
      ctx.stroke();
      // Arrowhead
      ctx.beginPath();
      ctx.moveTo(centerX - 110 + flowArrowLen - 4, flowY - 3);
      ctx.lineTo(centerX - 110 + flowArrowLen, flowY);
      ctx.lineTo(centerX - 110 + flowArrowLen - 4, flowY + 3);
      ctx.stroke();

      ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`${airflow} cm/s airflow`, centerX - 110, flowY - 6);
      ctx.restore();

      // IF EXTINGUISHED
      if (isExtinguished || spreadRate <= 0.05) {
        ctx.save();
        // Faint smoke wisp
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, fuelBaseY - 2);
        ctx.bezierCurveTo(
          centerX - 10 + Math.sin(time) * 12, fuelBaseY - 30,
          centerX + 15 + Math.cos(time) * 15, fuelBaseY - 60,
          centerX + Math.sin(time * 0.8) * 20, fuelBaseY - 100
        );
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 12px "Orbitron", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('EXTINGUISHED / SUB-CRITICAL', centerX, fuelBaseY - 45);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText('Radiative / chemical quenching limit active', centerX, fuelBaseY - 30);
        ctx.restore();

        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      // ACTIVE FLAME RENDERING
      const g = Math.max(0, Math.min(1.0, gravity));
      
      // Calculate dynamic dimensions
      // At 0g: base radius ~ 38px, height ~ 38px (semi-sphere)
      // At 1g: base radius ~ 24px, height ~ 130px (tall teardrop)
      const baseRadius = 40 - g * 16;
      const flameHeight = 42 + g * 85 + Math.min(40, spreadRate * 12);
      
      // Flicker modulation
      // 0g has NO flicker (0 Hz); 1g has high flutter (~12 Hz)
      const flickerAmp = g * 6.5;
      const flicker1 = Math.sin(time * (1 + g * 7)) * flickerAmp;
      const flicker2 = Math.cos(time * (1.5 + g * 9)) * (flickerAmp * 0.6);
      const tipX = centerX + flicker1 * 0.8 + (airflow * 0.4);
      const tipY = fuelBaseY - flameHeight + flicker2;

      // Color balance: Blue fraction vs Orange/Yellow soot fraction
      const blueFraction = Math.max(0.12, 0.90 - 0.78 * Math.pow(g, 0.7));
      const orangeFraction = 1.0 - blueFraction;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // 1. OUTER DIFFUSION / CHEMILUMINESCENCE HALO (Blue/Cyan in 0g)
      const outerGrad = ctx.createRadialGradient(
        centerX, fuelBaseY - (flameHeight * 0.35), 5,
        centerX, fuelBaseY - (flameHeight * 0.35), Math.max(baseRadius * 1.6, flameHeight * 0.7)
      );
      if (g < 0.1) {
        // Pure deep blue & violet for 0g
        outerGrad.addColorStop(0, 'rgba(14, 165, 233, 0.5)');
        outerGrad.addColorStop(0.5, 'rgba(2, 132, 199, 0.35)');
        outerGrad.addColorStop(0.85, 'rgba(99, 102, 241, 0.15)');
        outerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        // Transitional orange / amber halo
        outerGrad.addColorStop(0, `rgba(249, 115, 22, ${0.4 * orangeFraction})`);
        outerGrad.addColorStop(0.5, `rgba(56, 189, 248, ${0.3 * blueFraction})`);
        outerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.arc(centerX, fuelBaseY - (flameHeight * 0.35), Math.max(baseRadius * 1.5, flameHeight * 0.65), 0, Math.PI * 2);
      ctx.fill();

      // 2. MAIN FLAME ENVELOPE (Shape transitions with g)
      ctx.beginPath();
      ctx.moveTo(centerX - baseRadius, fuelBaseY);

      if (g < 0.08) {
        // 0g: Hemispherical dome
        ctx.bezierCurveTo(
          centerX - baseRadius * 1.1, fuelBaseY - flameHeight * 0.9,
          centerX + baseRadius * 1.1, fuelBaseY - flameHeight * 0.9,
          centerX + baseRadius, fuelBaseY
        );
      } else {
        // Partial-g to 1g: Pinched teardrop plume
        const pinchLeft = centerX - baseRadius * (0.85 - g * 0.3);
        const pinchRight = centerX + baseRadius * (0.85 - g * 0.3);
        ctx.bezierCurveTo(
          pinchLeft, fuelBaseY - flameHeight * 0.45,
          tipX - 12 - flicker1, tipY + flameHeight * 0.25,
          tipX, tipY
        );
        ctx.bezierCurveTo(
          tipX + 12 - flicker1, tipY + flameHeight * 0.25,
          pinchRight, fuelBaseY - flameHeight * 0.45,
          centerX + baseRadius, fuelBaseY
        );
      }
      ctx.closePath();

      // Gradient fill for main flame
      const mainGrad = ctx.createLinearGradient(centerX, fuelBaseY, tipX, tipY);
      if (g < 0.08) {
        // 0g: Pure cobalt blue base, cyan middle, faint violet rim
        mainGrad.addColorStop(0, 'rgba(6, 182, 212, 0.85)');
        mainGrad.addColorStop(0.4, 'rgba(2, 132, 199, 0.7)');
        mainGrad.addColorStop(0.85, 'rgba(79, 70, 229, 0.5)');
        mainGrad.addColorStop(1, 'rgba(129, 140, 248, 0.15)');
      } else {
        // Partial-g to 1g: Blue anchor base -> Yellow/White core -> Orange/Red tip
        mainGrad.addColorStop(0, 'rgba(6, 182, 212, 0.95)');
        mainGrad.addColorStop(0.2, 'rgba(14, 165, 233, 0.8)');
        mainGrad.addColorStop(0.45, `rgba(254, 240, 138, ${0.9 * orangeFraction + 0.3})`);
        mainGrad.addColorStop(0.75, `rgba(249, 115, 22, ${0.95 * orangeFraction})`);
        mainGrad.addColorStop(1, `rgba(239, 68, 68, ${0.85 * orangeFraction})`);
      }
      ctx.fillStyle = mainGrad;
      ctx.fill();

      // 3. INNER HOT CORE
      const coreRadius = baseRadius * 0.55;
      const coreHeight = flameHeight * (g < 0.08 ? 0.6 : 0.45);
      ctx.beginPath();
      ctx.moveTo(centerX - coreRadius, fuelBaseY);
      if (g < 0.08) {
        ctx.bezierCurveTo(
          centerX - coreRadius, fuelBaseY - coreHeight,
          centerX + coreRadius, fuelBaseY - coreHeight,
          centerX + coreRadius, fuelBaseY
        );
      } else {
        ctx.bezierCurveTo(
          centerX - coreRadius * 0.7, fuelBaseY - coreHeight * 0.5,
          tipX - 5, fuelBaseY - coreHeight,
          tipX, fuelBaseY - coreHeight
        );
        ctx.bezierCurveTo(
          tipX + 5, fuelBaseY - coreHeight,
          centerX + coreRadius * 0.7, fuelBaseY - coreHeight * 0.5,
          centerX + coreRadius, fuelBaseY
        );
      }
      ctx.closePath();

      const coreGrad = ctx.createLinearGradient(centerX, fuelBaseY, centerX, fuelBaseY - coreHeight);
      if (g < 0.08) {
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        coreGrad.addColorStop(0.4, 'rgba(165, 243, 252, 0.7)');
        coreGrad.addColorStop(1, 'rgba(6, 182, 212, 0.2)');
      } else {
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        coreGrad.addColorStop(0.4, 'rgba(254, 240, 138, 0.85)');
        coreGrad.addColorStop(1, 'rgba(249, 115, 22, 0.3)');
      }
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // 4. MICROGRAVITY SOOT & EMBER PARTICLES (Only in partial-g & 1g)
      if (g > 0.12) {
        ctx.fillStyle = 'rgba(251, 146, 60, 0.8)';
        for (let i = 0; i < 6; i++) {
          const pOffset = (time * 18 + i * 27) % flameHeight;
          const px = tipX + Math.sin(time * 3 + i) * (8 * g);
          const py = fuelBaseY - coreHeight - pOffset;
          if (py < fuelBaseY) {
            ctx.beginPath();
            ctx.arc(px, py, Math.max(0.8, 2.2 * g * (1 - pOffset / flameHeight)), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.restore();

      // DIAGNOSTIC LABELS ON CANVAS
      ctx.save();
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`g-Vector: ${gravity.toFixed(2)}g`, width - 14, 20);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Flame Morph: ${g < 0.08 ? 'Spherical 0g Dome' : g <= 0.25 ? 'Low-Buoyancy Plume' : 'Buoyant Teardrop'}`, width - 14, 36);
      ctx.fillText(`Blue Emission: ${(blueFraction * 100).toFixed(0)}%`, width - 14, 52);
      ctx.fillText(`Soot Radiation: ${(orangeFraction * 100).toFixed(0)}%`, width - 14, 68);
      ctx.restore();

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [gravity, material, oxygen, airflow, spreadRate, isExtinguished]);

  return (
    <div className="relative w-full h-[260px] bg-[#070d1b] rounded-xl overflow-hidden border border-cyan-500/20 hud-card shadow-inner">
      <div className="absolute top-2 left-3 flex items-center space-x-2 z-10">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          Live Combustion Morphology Feed
        </span>
      </div>

      <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-400 z-10 flex space-x-4">
        <span>O₂: {oxygen}%</span>
        <span>Flow: {airflow} cm/s</span>
        <span>Rate: {spreadRate.toFixed(2)} mm/s</span>
      </div>

      <canvas
        ref={canvasRef}
        width={420}
        height={260}
        className="w-full h-full block"
      />
    </div>
  );
}
