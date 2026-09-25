import React from 'react';

interface UaeFlagProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  rounded?: boolean | string;
  border?: boolean;
  shadow?: boolean;
  aspectRatio?: string;
}

/**
 * Pixel-perfect SVG United Arab Emirates National Flag
 * Official 1:2 aspect ratio following UAE Flag Law:
 * - Red vertical stripe at hoist (1/4 of total length)
 * - Three equal horizontal stripes: Green (top), White (middle), Black (bottom)
 */
export function UaeFlag({
  className = "w-8 h-4",
  width,
  height,
  rounded = true,
  border = true,
  shadow = true,
  aspectRatio
}: UaeFlagProps) {
  const roundedClass = typeof rounded === 'string' ? rounded : rounded ? 'rounded-xs' : '';
  const borderClass = border ? 'border border-amber-300/60' : '';
  const shadowClass = shadow ? 'shadow-2xs' : '';

  const styleObj: React.CSSProperties = { width, height };
  if (aspectRatio !== undefined) {
    if (aspectRatio !== 'none') {
      styleObj.aspectRatio = aspectRatio;
    }
  } else if (!height) {
    styleObj.aspectRatio = '2 / 1';
  }

  return (
    <div 
      className={`inline-block overflow-hidden shrink-0 ${roundedClass} ${borderClass} ${shadowClass} ${className}`}
      style={styleObj}
      title="Flag of the United Arab Emirates (علم دولة الإمارات العربية المتحدة)"
      role="img"
      aria-label="Flag of the United Arab Emirates"
    >
      <svg
        viewBox="0 0 1200 600"
        className="w-full h-full block"
        preserveAspectRatio={aspectRatio === 'none' ? 'none' : undefined}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horizontal stripes (3/4 of the width) */}
        {/* Top: Green */}
        <rect x="300" y="0" width="900" height="200" fill="#00732F" />
        {/* Middle: White */}
        <rect x="300" y="200" width="900" height="200" fill="#FFFFFF" />
        {/* Bottom: Black */}
        <rect x="300" y="400" width="900" height="200" fill="#000000" />
        {/* Hoist: Red (1/4 of width, full height) */}
        <rect x="0" y="0" width="300" height="600" fill="#FE0000" />
      </svg>
    </div>
  );
}

/**
 * Official UAE Flag Logo Badge with gold trim and national insignia
 */
export function UaeFlagLogo({
  variant = 'default',
  size = 'md',
  className = ''
}: {
  variant?: 'default' | 'compact' | 'pill' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  if (variant === 'pill') {
    return (
      <div 
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white border border-amber-400/80 shadow-sm ${className}`}
        title="Proudly Operating in the United Arab Emirates"
      >
        <UaeFlag className="w-5 h-2.5 rounded-[2px]" border={false} shadow={false} />
        <span className="text-[11px] font-extrabold tracking-wide uppercase text-amber-300">
          U.A.E. <span className="text-white/80 font-normal">Abu Dhabi</span>
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-50/90 border border-amber-300/80 text-amber-950 font-bold text-xs shadow-2xs select-none ${className}`}
        title="United Arab Emirates"
      >
        <UaeFlag className="w-4 h-2 rounded-[2px]" border={false} />
        <span className="text-[11px] font-black tracking-tight text-slate-900">UAE</span>
      </div>
    );
  }

  // Default / Gold Logo Variant
  return (
    <div 
      className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white border-2 border-amber-400 shadow-md ${className}`}
      title="Proudly Rooted in the United Arab Emirates • Abu Dhabi Since 1992"
    >
      <div className="relative">
        <UaeFlag className="w-7 h-3.5 rounded-xs" border={true} />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-slate-900 animate-pulse" />
      </div>
      <div className="flex flex-col leading-none text-left">
        <div className="flex items-center gap-1 text-[11px] font-black text-amber-300 tracking-wider uppercase">
          <span>U.A.E.</span>
          <span className="text-[9px] text-emerald-400 font-bold">• أبوظبي</span>
        </div>
        <span className="text-[9px] text-slate-300 font-semibold mt-0.5">Musaffah, Abu Dhabi</span>
      </div>
    </div>
  );
}

/**
 * Golden Falcon Emblem of the UAE
 */
export function UaeFalconEmblem({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Emblem_of_the_United_Arab_Emirates.svg/512px-Emblem_of_the_United_Arab_Emirates.svg.png"
        alt="Emblem of the United Arab Emirates"
        className="w-full h-full object-contain filter drop-shadow-sm"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // If external CDN fails, hide or fallback cleanly
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}
