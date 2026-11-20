export const circuitPath =
  "M126 314 C99 333 64 316 71 286 L97 186 Q101 170 120 171 L190 177 Q211 179 218 160 L242 96 Q248 80 265 85 L367 113 Q384 118 373 135 L339 188 Q329 202 346 214 L424 258 Q445 273 427 290 L389 327 Q376 340 360 327 L288 276 Q275 267 263 278 L214 329 Q202 342 186 332 L160 315 Q144 303 126 314Z";

export function Circuit({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={compact ? "circuit circuit-compact" : "circuit"}
      viewBox="0 0 510 430"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={compact ? "small-grid" : "track-grid"}
          width="34"
          height="34"
          patternUnits="userSpaceOnUse"
        >
          <path d="M34 0H0V34" stroke="#34373e" strokeWidth=".6" />
        </pattern>
        <linearGradient
          id={compact ? "small-track" : "track-light"}
          x1="80"
          y1="80"
          x2="390"
          y2="350"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e4e5e8" />
          <stop offset=".45" stopColor="#666b76" />
          <stop offset="1" stopColor="#b1b4bc" />
        </linearGradient>
      </defs>
      <rect
        width="510"
        height="430"
        fill={`url(#${compact ? "small-grid" : "track-grid"})`}
        opacity=".38"
      />
      <g className="track-drawing">
        <path d={circuitPath} stroke="#23262c" strokeWidth="21" />
        <path
          d={circuitPath}
          stroke={`url(#${compact ? "small-track" : "track-light"})`}
          strokeWidth="10"
        />
        <path d={circuitPath} stroke="#0c0e12" strokeWidth="7" />
        <path
          d={circuitPath}
          stroke="#6b707b"
          strokeWidth=".6"
          strokeDasharray="3 7"
        />
        <path
          d="M263 278 214 329 Q202 342 186 332 L160 315 Q144 303 126 314"
          stroke="#E10600"
          strokeWidth="5"
          className="track-red"
        />
        {!compact && (
          <circle
            r="5"
            cx="126"
            cy="314"
            fill="#ff3029"
            className="circuit-marker"
          />
        )}
        <path
          d="m89 245 16 4m-14-10 16 4m-14-10 16 4"
          stroke="#f5f5f5"
          strokeWidth="3"
        />
        <circle cx="265" cy="85" r="4" fill="#e10600" />
        <circle cx="428" cy="279" r="4" fill="#e10600" />
        <g stroke="#515560" strokeWidth=".8">
          <path d="m265 78 19-29h84M436 279h40M88 241H38v-37" />
          <path d="M220 355v30h-68" />
        </g>
        <g
          fill="#9297a2"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="10"
          letterSpacing="1"
        >
          <text x="286" y="40">
            IDEATE
          </text>
          <text x="431" y="303">
            BUILD
          </text>
          <text x="37" y="195">
            START / FINISH
          </text>
          <text x="152" y="403">
            ITERATE
          </text>
        </g>
        <g fill="#474c56" fontFamily="IBM Plex Mono, monospace" fontSize="10">
          <text x="179" y="209">
            SECTOR 01
          </text>
          <text x="309" y="253">
            SECTOR 02
          </text>
          <text x="105" y="299">
            SECTOR 03
          </text>
        </g>
      </g>
    </svg>
  );
}
