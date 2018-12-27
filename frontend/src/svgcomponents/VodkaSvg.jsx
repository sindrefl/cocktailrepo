import React from 'react'


const getStop = (offset, percent, color, opacity) => {
    return <stop offset={offset} stopColor={color} stopOpacity={opacity}>
            <animate
              attributeName="offset"
              values={`${offset};${percent + offset};${percent + offset}`}
              dur={`${percent*10}s`}
              begin="0s"
              fill="freeze"
            />
          </stop>
      }

const VodkaSvg = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="100%"
    height="100%"
    viewBox="0 0 210 297"
    {...props}
  >
    <defs>
      <linearGradient id="vodka-a">
        {getStop(0.,props.percent, '#c8beb7',1)}
        {getStop(0.03,props.percent, '#ac9d93',1)}
        {getStop(0.04,props.percent, '#e3e2db', 0)}
        <stop offset={1} stopColor="#e3e2db" stopOpacity={0} />
      </linearGradient>
      <filter
        id="vodka-b"
        x={-0.1}
        width={1.201}
        y={-1.717}
        height={4.435}
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation={6.885} />
      </filter>
      <linearGradient
        xlinkHref="#vodka-a"
        id="vodka-c"
        x1={-128.238}
        y1={210.707}
        x2={-130.253}
        y2={-164.539}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.59308 0 0 .63105 177.625 154.823)"
      />
    </defs>
    <rect
      width={27.797}
      height={137.389}
      x={87.175}
      y={0.471}
      ry={6.414}
      rx={13.899}
      fill="#a02c2c"
      strokeWidth={1.224}
      strokeOpacity={0}
    />
    <g fill="#e3e2db">
      <path
        d="M62.337 79.804l25.107-27.669 26.901-.954 27.797 28.623z"
        strokeWidth={0.265}
      />
      <path
        d="M79.437 69.404c-9.548 0-17.234 8.18-17.234 18.339v27.461L71.164 275.3l-5.004 6.143c3.054 5.102 7.148 6.448 13.277 6.448h45.336c6.398 0 10.691-.3 13.665-5.779l-5.155-4.788 8.725-143.996V87.743c0-10.16-7.687-18.339-17.235-18.339z"
        strokeWidth={8.094}
        strokeOpacity={0}
      />
    </g>
    <path
      d="M141.708 121.002l-.006 3.327M61.875 121.002l.007 3.327"
      fill="none"
      stroke="#000"
      strokeWidth={0.162}
    />
    <path
      d="M103.397 92.353a44.444 21.723 0 0 0-41.522 13.997v14.652a44.444 21.723 0 0 1 40.896-13.299 44.444 21.723 0 0 1 40.897 13.331v-16.09a44.444 21.723 0 0 0-40.27-12.591z"
      fill="#c83737"
      strokeWidth={0.92}
      strokeOpacity={0}
    />
    <path
      d="M103.12 74.913a43.065 8.438 0 0 0-40.235 5.437v5.692a43.065 8.438 0 0 1 39.629-5.166 43.065 8.438 0 0 1 39.628 5.178v-6.25a43.065 8.438 0 0 0-39.022-4.89z"
      fill="#c8c4b7"
      strokeWidth={0.564}
      strokeOpacity={0}
    />
    <ellipse
      cx={-453.829}
      cy={286.341}
      rx={82.319}
      ry={4.811}
      transform="matrix(.54646 0 0 .45148 349.825 161.74)"
      fill="#2b1100"
      strokeWidth={2}
      strokeOpacity={0}
      filter="url(#b)"
    />
    <ellipse
      cx={-828.536}
      cy={264.393}
      rx={1.069}
      ry={0.535}
      fill="#c8c4b7"
      strokeWidth={2}
      strokeOpacity={0}
    />
    <ellipse
      cx={-921.545}
      cy={282.567}
      rx={1.069}
      ry={0.535}
      fill="#c8c4b7"
      strokeWidth={2}
      strokeOpacity={0}
    />
    <path
      d="M87.444 52.135L62.337 79.804l2.426 87.708L71.164 275.3l-5.004 6.143 10.016 6.83 56.431-1.349 5.831-4.812-5.155-4.788 6.933-107.113 1.926-90.407-27.797-28.623z"
      fill="url(#vodka-c)"
      stroke="#000"
      strokeWidth={0.162}
    />
  </svg>
)

export default VodkaSvg
