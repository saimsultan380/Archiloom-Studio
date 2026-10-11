import { locations, routes } from "@/data/locations";
import { mapDots } from "@/data/map-dots";

function project(lon: number, lat: number) {
  return {
    x: ((lon + 180) / 360) * 1000,
    y: ((90 - lat) / 180) * 500,
  };
}

function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const mag = Math.min(90, len * 0.16);
  const ox = (-dy / len) * mag;
  const oy = (dx / len) * mag;
  const c1 = { x: mx + ox, y: my + oy };
  const c2 = { x: mx - ox, y: my - oy };
  const c = c1.y < c2.y ? c1 : c2;
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${c.x.toFixed(1)} ${c.y.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

const points = Object.fromEntries(locations.map((location) => [location.id, project(location.lon, location.lat)]));

export function WorldMap({ decorative = false }: { decorative?: boolean }) {
  return (
    <svg
      viewBox="0 0 1000 500"
      className="h-full w-full"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : "world-map-title"}
    >
      {decorative ? null : (
        <title id="world-map-title">Dotted world map marking North America, the United Kingdom, the Middle East and Australia</title>
      )}
      <g aria-hidden>
        {mapDots.map((dot, index) => (
          <circle key={index} cx={dot.x} cy={dot.y} r="1.45" fill="#ffffff" fillOpacity="0.34" />
        ))}
        {routes.map(([from, to], index) => (
          <path
            key={`${from}-${to}`}
            d={arc(points[from], points[to])}
            className="route"
            vectorEffect="non-scaling-stroke"
            style={{ animationDelay: `${index * -4}s` }}
          />
        ))}
      </g>
      {locations.map((location) => {
        const point = points[location.id];
        const label = `${location.name} — ${location.note}`;
        const width = Math.max(220, label.length * 7.6);
        const tipX = Math.min(780, Math.max(16, point.x - width / 2));
        const tipY = point.y > 80 ? point.y - 48 : point.y + 18;
        if (decorative) {
          return (
            <g key={location.id} aria-hidden>
              <circle className="pin-pulse" cx={point.x} cy={point.y} r="6" fill="#7ED957" />
              <circle cx={point.x} cy={point.y} r="3.4" fill="#7ED957" />
            </g>
          );
        }
        return (
          <g key={location.id} className="pin" tabIndex={0} role="img" aria-label={label}>
            <circle className="pin-pulse" cx={point.x} cy={point.y} r="6" fill="#7ED957" />
            <circle className="pin-core" cx={point.x} cy={point.y} r="3.4" fill="#7ED957" />
            <circle cx={point.x} cy={point.y} r="16" fill="transparent" />
            <g className="tip">
              <rect x={tipX} y={tipY} width={width} height="32" rx="2" fill="#1D1D1D" stroke="rgba(255,255,255,0.18)" />
              <text x={tipX + 12} y={tipY + 21} fill="#ffffff" fontSize="13" fontFamily="Poppins, sans-serif">
                {label}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
