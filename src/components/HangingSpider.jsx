import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * Computes 8 fully articulated arachnid leg paths.
 * - Dynamic walking gait driven directly by page scrolling.
 * - Metachronal / tripod wave: all 8 legs lift, reach, step, and pull.
 * - Gentle idle breathing and feeler twitches when stationary.
 */
function computeLegs(walkPhase, walkIntensity, idleTime, isStartled) {
  // Idle breathing cycle
  const breath = Math.sin(idleTime * 2.2) * 0.9;

  // Occasional feeler twitch when resting
  const twitchCycle = idleTime % 3.6;
  const isTwitching = walkIntensity < 0.1 && twitchCycle < 0.25;
  const twitchOffset = isTwitching ? Math.sin(twitchCycle * 32) * 2.5 : 0;

  // Effective walking intensity (spikes when startled)
  const intensity = isStartled ? 1.0 : Math.min(walkIntensity, 1.0);

  // Metachronal phase offsets for natural arachnid walking:
  // L1 & R3, R1 & L3, L2 & R4, R2 & L4
  const phases = {
    l1: walkPhase + 0.0 * Math.PI,
    r1: walkPhase + 1.0 * Math.PI,
    l2: walkPhase + 0.6 * Math.PI,
    r2: walkPhase + 1.6 * Math.PI,
    l3: walkPhase + 1.2 * Math.PI,
    r3: walkPhase + 0.2 * Math.PI,
    l4: walkPhase + 1.7 * Math.PI,
    r4: walkPhase + 0.7 * Math.PI,
  };

  const getStep = (phi) => ({
    lift: Math.max(0, Math.sin(phi)) * intensity,
    stride: Math.cos(phi) * intensity,
  });

  const sL1 = getStep(phases.l1);
  const sR1 = getStep(phases.r1);
  const sL2 = getStep(phases.l2);
  const sR2 = getStep(phases.r2);
  const sL3 = getStep(phases.l3);
  const sR3 = getStep(phases.r3);
  const sL4 = getStep(phases.l4);
  const sR4 = getStep(phases.r4);

  const makePath = (rX, rY, kX, kY, aX, aY, tX, tY) =>
    `M ${rX.toFixed(1)} ${rY.toFixed(1)} L ${kX.toFixed(1)} ${kY.toFixed(1)} L ${aX.toFixed(1)} ${aY.toFixed(1)} L ${tX.toFixed(1)} ${tY.toFixed(1)}`;

  return [
    // L1 (Rear leg holding/climbing thread)
    makePath(
      45, 40,
      22 - sL1.lift * 4, 20 - sL1.stride * 6 - breath,
      28 - sL1.stride * 3, 10 - sL1.stride * 8,
      36 + sL1.lift * 3, 4 - sL1.stride * 7
    ),
    // R1 (Rear leg holding/climbing thread)
    makePath(
      55, 40,
      78 + sR1.lift * 4, 20 - sR1.stride * 6 - breath,
      72 + sR1.stride * 3, 10 - sR1.stride * 8,
      64 - sR1.lift * 3, 4 - sR1.stride * 7
    ),

    // L2 (Upper arched leg)
    makePath(
      43, 47,
      12 - sL2.lift * 6, 34 - sL2.lift * 6,
      6 - sL2.lift * 4, 46 - sL2.stride * 7,
      4 + sL2.stride * 3, 58 - sL2.stride * 8 + breath
    ),
    // R2 (Upper arched leg)
    makePath(
      57, 47,
      88 + sR2.lift * 6, 34 - sR2.lift * 6,
      94 + sR2.lift * 4, 46 - sR2.stride * 7,
      96 - sR2.stride * 3, 58 - sR2.stride * 8 + breath
    ),

    // L3 (Mid-lower arched leg)
    makePath(
      44, 55,
      14 - sL3.lift * 5, 66 - sL3.lift * 5,
      10 - sL3.lift * 3, 80 - sL3.stride * 7,
      14 - sL3.stride * 3, 94 - sL3.stride * 8 - breath
    ),
    // R3 (Mid-lower arched leg)
    makePath(
      56, 55,
      86 + sR3.lift * 5, 66 - sR3.lift * 5,
      90 + sR3.lift * 3, 80 - sR3.stride * 7,
      86 + sR3.stride * 3, 94 - sR3.stride * 8 - breath
    ),

    // L4 (Front reaching leg)
    makePath(
      46, 64,
      24 - sL4.lift * 4, 84 - sL4.lift * 6,
      30 - sL4.lift * 3, 100 - sL4.stride * 7 + twitchOffset,
      36 - sL4.stride * 4, 116 - sL4.stride * 9 + twitchOffset * 1.5
    ),
    // R4 (Front reaching leg)
    makePath(
      54, 64,
      76 + sR4.lift * 4, 84 - sR4.lift * 6,
      70 + sR4.lift * 3, 100 - sR4.stride * 7 - twitchOffset,
      64 + sR4.stride * 4, 116 - sR4.stride * 9 - twitchOffset * 1.5
    ),
  ];
}

/**
 * Interactive Hanging Spider
 * - STATIONARY BODY: Body stays anchored at its hanging spot (not dragged by scroll).
 * - WALKING LEGS ON SCROLL: As the user scrolls, all 8 legs walk in a fluid climbing gait.
 * - DYNAMIC SILK THREAD: String vibrates and ripples elastically with the spider's walking steps.
 * - INTERACTIVE CLICK: Quick startle scramble on click.
 */
export default function HangingSpider() {
  const [animState, setAnimState] = useState({
    walkPhase: 0,
    walkIntensity: 0,
    stringWave: 0,
    idleTime: 0,
    isStartled: false,
  });

  const physicsRef = useRef({
    walkVelocity: 0,
    walkPhase: 0,
    walkIntensity: 0,
    stringWave: 0,
    idleTime: 0,
    lastScrollY: 0,
    startled: false,
    clickTimer: null,
  });

  // Stationary hanging height
  const fixedY = 160;
  const fixedX = 60;

  useEffect(() => {
    let animId;

    const handleScroll = () => {
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      const scrollDelta = currentScroll - physicsRef.current.lastScrollY;
      physicsRef.current.lastScrollY = currentScroll;

      if (Math.abs(scrollDelta) < 0.5) return;

      // Highly damped, gentle scroll impulse for an ultra-slow, deliberate creeping pace
      const walkDelta = Math.sign(scrollDelta) * Math.min(Math.abs(scrollDelta) * 0.008, 1.2);
      physicsRef.current.walkVelocity += walkDelta;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 60FPS Animation Loop
    const loop = () => {
      const p = physicsRef.current;
      p.idleTime += 0.016;

      if (p.startled) {
        // Slow, controlled startle scramble
        p.walkPhase += 0.06;
        p.walkIntensity = 0.7;
        p.stringWave = Math.sin(p.walkPhase * 2.0) * 2.0;
      } else {
        // Strict low-speed ceiling: slow, majestic arachnid crawl
        p.walkVelocity = Math.max(-1.5, Math.min(p.walkVelocity, 1.5));

        // Advance walking cycle at ~10x slower pace
        p.walkPhase += p.walkVelocity * 0.012;

        // Smooth gradual intensity
        const targetIntensity = Math.min(Math.abs(p.walkVelocity) * 0.5, 0.85);
        p.walkIntensity += (targetIntensity - p.walkIntensity) * 0.1;

        // Very gentle string ripple matching the slow footsteps
        const targetWave = Math.sin(p.walkPhase * 2.0) * (p.walkIntensity * 1.8);
        p.stringWave += (targetWave - p.stringWave) * 0.15;

        // Snappy deceleration so it pauses gracefully
        p.walkVelocity *= 0.85;
        if (Math.abs(p.walkVelocity) < 0.01) {
          p.walkVelocity = 0;
        }
      }

      setAnimState({
        walkPhase: p.walkPhase,
        walkIntensity: p.walkIntensity,
        stringWave: p.stringWave,
        idleTime: p.idleTime,
        isStartled: p.startled,
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
      if (physicsRef.current.clickTimer) {
        clearTimeout(physicsRef.current.clickTimer);
      }
    };
  }, []);

  // Click interaction: fast startled leg scramble and string buzz
  const handleClick = (e) => {
    e.stopPropagation();
    const p = physicsRef.current;
    if (p.startled) return;

    p.startled = true;
    p.clickTimer = setTimeout(() => {
      p.startled = false;
      p.walkVelocity = 3; // soft step out of startle
    }, 650);
  };

  const { walkPhase, walkIntensity, stringWave, idleTime, isStartled } = animState;

  // Compute 8 articulated leg paths
  const legPaths = useMemo(
    () => computeLegs(walkPhase, walkIntensity, idleTime, isStartled),
    [walkPhase, walkIntensity, idleTime, isStartled]
  );

  // Subtle mouth feeler twitches
  const palpTwitch = Math.sin(idleTime * 3.8) * 1.8 + walkIntensity * 1.5;

  // Dynamic silk thread path (straight when stationary, vibrating wave when walking)
  const threadPath = `M ${fixedX} 0 Q ${fixedX + stringWave} ${fixedY * 0.5} ${fixedX} ${fixedY}`;

  return (
    <aside
      className="fixed top-0 right-8 sm:right-14 w-[120px] h-screen pointer-events-none z-[100] select-none overflow-visible"
      aria-label="Interactive Spider Easter Egg"
    >
      {/* 1. DYNAMIC SILK THREAD (Vibrates and ripples with walking steps) */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ceiling anchor bead */}
        <circle cx={fixedX} cy="0" r="3.5" className="fill-slate-700 dark:fill-slate-300" />

        {/* Soft dark drop-shadow line */}
        <path
          d={threadPath}
          stroke="rgba(15, 23, 42, 0.45)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Solid Main Silk Strand */}
        <path
          d={threadPath}
          className="stroke-slate-700 dark:stroke-slate-300"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Crisp White Silk Sheen Core */}
        <path
          d={threadPath}
          stroke="rgba(255, 255, 255, 0.95)"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* 2. STATIONARY SPIDER WITH WALKING LEGS (Clickable) */}
      <div
        onClick={handleClick}
        title="Startle me!"
        className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-110 active:scale-95"
        style={{
          left: `${fixedX}px`,
          top: `${fixedY}px`,
          transform: 'translate(-50%, -4px)',
          width: '56px',
          height: '66px',
        }}
      >
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)]"
        >
          {/* Leg Shadows for Depth */}
          <g
            stroke="rgba(15, 23, 42, 0.22)"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            transform="translate(0, 3)"
          >
            {legPaths.map((d, i) => (
              <path key={`shadow-${i}`} d={d} />
            ))}
          </g>

          {/* 8 Articulated Walking Spider Legs */}
          <g
            stroke="#090d16"
            className="dark:stroke-slate-900"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            {legPaths.map((d, i) => (
              <path key={`leg-${i}`} d={d} />
            ))}
          </g>

          {/* Abdomen (connected to thread) */}
          <ellipse cx="50" cy="40" rx="14" ry="18" fill="#0f172a" />

          {/* Abdomen glossy light reflection */}
          <ellipse cx="47" cy="36" rx="6" ry="10" fill="rgba(255, 255, 255, 0.14)" />

          {/* Stylized Red Widow Hourglass Mark */}
          <path
            d="M 48 34 L 52 34 L 50 38 Z M 48 44 L 52 44 L 50 40 Z"
            fill="#ef4444"
          />

          {/* Cephalothorax (Head) */}
          <circle cx="50" cy="63" r="9.5" fill="#090d16" />

          {/* White Glossy Eyes */}
          <circle cx="47" cy="65.5" r="1.6" fill="#f8fafc" />
          <circle cx="53" cy="65.5" r="1.6" fill="#f8fafc" />

          {/* Dynamic Pedipalps (Twitching Feelers) */}
          <path
            d={`M 46 72 Q 43 ${76 + palpTwitch} 44 ${80 + palpTwitch}`}
            stroke="#090d16"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={`M 54 72 Q 57 ${76 - palpTwitch} 56 ${80 - palpTwitch}`}
            stroke="#090d16"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </aside>
  );
}