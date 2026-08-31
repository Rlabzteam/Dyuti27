import React, { useId } from 'react';
import { cn } from '@/lib/utils';

export type ShapePresetType =
  | 'hexagon'
  | 'pentagon'
  | 'trapezoid'
  | 'parallelogram'
  | 'star'
  | 'decagon'
  | 'bevel'
  | 'shield'
  | 'arrow-left'
  | 'arrow-right'
  | 'rhombus'
  | 'chevron'
  | 'message-bubble'
  | 'blob-1'
  | 'blob-2'
  | 'blob-3'
  | 'custom';

// Predefined CSS clip-path polygon presets
export const SHAPE_POLYGONS: Record<Exclude<ShapePresetType, 'blob-1' | 'blob-2' | 'blob-3' | 'custom'>, string> = {
  hexagon: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
  pentagon: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
  trapezoid: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
  parallelogram: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
  star: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  decagon: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
  bevel: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
  shield: 'polygon(50% 0%, 100% 15%, 85% 80%, 50% 100%, 15% 80%, 0% 15%)',
  'arrow-left': 'polygon(30% 0%, 30% 25%, 100% 25%, 100% 75%, 30% 75%, 30% 100%, 0% 50%)',
  'arrow-right': 'polygon(0% 25%, 70% 25%, 70% 0%, 100% 50%, 70% 100%, 70% 75%, 0% 75%)',
  rhombus: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  chevron: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)',
  'message-bubble': 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)',
};

// Predefined SVG path presets for responsive objectBoundingBox clipping
export const SHAPE_SVG_PATHS: Record<'blob-1' | 'blob-2' | 'blob-3', string> = {
  'blob-1': 'M 0.22 0.08 C 0.5 0.02, 0.85 -0.05, 0.95 0.2 C 1.05 0.45, 0.98 0.75, 0.82 0.88 C 0.65 1.0, 0.35 0.98, 0.18 0.88 C 0.02 0.78, -0.05 0.55, 0.05 0.35 C 0.15 0.15, 0.08 0.12, 0.22 0.08 Z',
  'blob-2': 'M 0.25 0.12 C 0.6 0.02, 0.9 0.08, 0.95 0.32 C 1.0 0.55, 0.92 0.78, 0.75 0.9 C 0.58 1.02, 0.25 0.92, 0.12 0.78 C -0.01 0.64, -0.05 0.35, 0.08 0.22 C 0.18 0.1, 0.1 0.18, 0.25 0.12 Z',
  'blob-3': 'M 0.15 0.22 C 0.32 0.05, 0.72 -0.02, 0.88 0.15 C 1.02 0.32, 0.98 0.65, 0.85 0.82 C 0.72 0.98, 0.42 1.02, 0.22 0.92 C 0.02 0.82, -0.05 0.6, 0.02 0.42 C 0.08 0.25, 0.02 0.35, 0.15 0.22 Z',
};

// Safe Zone scale guides (approximate percentage scale for inner safe container)
export const SHAPE_SAFE_ZONES: Record<ShapePresetType, string> = {
  hexagon: 'scale-[0.72] translate-y-0',
  pentagon: 'scale-[0.68] translate-y-[8%]',
  trapezoid: 'scale-x-[0.68] scale-y-[0.8] translate-y-0',
  parallelogram: 'scale-x-[0.62] scale-y-[0.9] translate-y-0',
  star: 'scale-[0.45] translate-y-[3%]',
  decagon: 'scale-[0.8] translate-y-0',
  bevel: 'scale-[0.82] translate-y-0',
  shield: 'scale-x-[0.72] scale-y-[0.78] translate-y-[-5%]',
  'arrow-left': 'scale-x-[0.65] scale-y-[0.8] translate-x-[15%]',
  'arrow-right': 'scale-x-[0.65] scale-y-[0.8] translate-x-[-15%]',
  rhombus: 'scale-[0.52] translate-y-0',
  chevron: 'scale-x-[0.55] scale-y-[0.9] translate-x-[-8%]',
  'message-bubble': 'scale-x-[0.85] scale-y-[0.65] translate-y-[-10%]',
  'blob-1': 'scale-[0.62] translate-y-0',
  'blob-2': 'scale-[0.6] translate-y-0',
  'blob-3': 'scale-[0.6] translate-y-0',
  custom: 'scale-[0.7] translate-y-0',
};

export interface ClipPathWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  shape: ShapePresetType;
  customPolygonPoints?: string; // e.g. "50% 0%, 100% 38%, ..."
  hoverEffect?: 'none' | 'scale' | 'zoom' | 'both';
  showSafeZone?: boolean;
}

export const ClipPathWrapper: React.FC<ClipPathWrapperProps> = ({
  shape,
  customPolygonPoints,
  hoverEffect = 'none',
  showSafeZone = false,
  children,
  className,
  style,
  ...props
}) => {
  const uniqueId = useId().replace(/:/g, ''); // Remove colons to make it a valid HTML ID
  const clipPathId = `svg-clip-${uniqueId}`;

  const isSvgBlob = shape.startsWith('blob-');
  const isCustom = shape === 'custom';

  // Resolve clip path string
  let clipPathValue = '';
  let svgPathD = '';

  if (isSvgBlob) {
    clipPathValue = `url(#${clipPathId})`;
    svgPathD = SHAPE_SVG_PATHS[shape as keyof typeof SHAPE_SVG_PATHS];
  } else if (isCustom && customPolygonPoints) {
    clipPathValue = `polygon(${customPolygonPoints})`;
  } else {
    const presetKey = shape as Exclude<ShapePresetType, 'blob-1' | 'blob-2' | 'blob-3' | 'custom'>;
    clipPathValue = SHAPE_POLYGONS[presetKey] || 'none';
  }

  // Animation hover classes
  const containerHoverClass =
    hoverEffect === 'scale' || hoverEffect === 'both'
      ? 'hover:scale-[1.03] active:scale-[0.99] transition-transform duration-300 ease-out'
      : '';

  const childHoverClass =
    hoverEffect === 'zoom' || hoverEffect === 'both'
      ? 'group-hover:scale-105 transition-transform duration-500 ease-out'
      : '';

  // Safe zone indicator class
  const safeZoneClass = SHAPE_SAFE_ZONES[shape] || 'scale-[0.75]';

  return (
    <div className="relative group shrink-0 w-full h-full">
      {/* Dynamic inline SVG definitions for organic blobs */}
      {isSvgBlob && (
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
              <path d={svgPathD} />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Main Clipped Container */}
      <div
        className={cn(
          'relative w-full h-full overflow-hidden select-none bg-slate-900 border border-transparent',
          '[clip-path:var(--clip-path-val)] [@supports(clip-path:polygon(0_0))]:border-0',
          containerHoverClass,
          className
        )}
        style={{
          ...style,
          '--clip-path-val': clipPathValue,
          clipPath: clipPathValue,
        } as React.CSSProperties}
        {...props}
      >
        {/* Inner Content Zoom Container */}
        <div className={cn('w-full h-full relative', childHoverClass)}>
          {children}
        </div>

        {/* Development / Editor Safe Zone Overlay */}
        {showSafeZone && (
          <div
            className={cn(
              'absolute inset-0 border-2 border-dashed border-red-500/60 rounded-lg pointer-events-none flex items-center justify-center bg-red-500/5',
              safeZoneClass
            )}
          >
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-red-400 bg-slate-950 px-2 py-0.5 rounded border border-red-500/30">
              Safe Zone
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
