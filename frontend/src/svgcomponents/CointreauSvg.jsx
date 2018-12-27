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
  
  
  const SvgComponent = props => (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      viewBox="0 0 210 297"
      {...props}
    >
      <defs>
        <linearGradient id="cointreau-linear">
        {getStop(0.,props.percent, '#a40',1)}
        {getStop(0.03,props.percent, '#d45500',1)}
        {getStop(0.04,props.percent, '#dfff', 0)}
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <clipPath clipPathUnits="userSpaceOnUse" id="d">
          <use xlinkHref="#cointreau-a" width="100%" height="100%" />
        </clipPath>
      <linearGradient
        xlinkHref="#cointreau-linear"
        id="cointreau-c"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(1.01853 0 0 .51906 1073.955 387.593)"
        x1={-949.828}
        y1={-173.078}
        x2={-951.344}
        y2={-748.358}
      />
    </defs>
    <g transform="matrix(1.01853 0 0 .51906 806.855 138.103)" fill="#fca">
      <rect
        ry={9.393}
        rx={0}
        y={-58.298}
        x={-787.374}
        height={365.881}
        width={202.592}
        strokeWidth={0.228}
      />
      <rect
        ry={9.393}
        rx={1.979}
        y={-267.696}
        x={-710.595}
        height={506.488}
        width={48.381}
        strokeWidth={0.168}
      />
      <path
        d="M-585.311-51.418s-12.765-76.62-45.212-64.263c-32.447 12.358-32.447-14.356-32.447-14.356l-1.187 78.619zM-788.741-51.418s12.764-76.62 45.211-64.263c32.448 12.358 32.448-14.356 32.448-14.356l1.186 78.619z"
        strokeWidth={0.444}
      />
    </g>
    <path
      d="M82.595 70.606L85.107-.847h47.262l-.77 71.453s1.014 15.634 33.048 7.451c32.035-8.183 46.05 33.356 46.05 33.356l.539 186.343H4.89l.343-186.343S16.001 68.75 49.546 78.057c33.545 9.307 33.049-7.451 33.049-7.451z"
      fill="url(#cointreau-c)"
      strokeWidth={1.879}
      strokeOpacity={0}
    />
    <rect
      width={103.175}
      height={168.007}
      x={56.065}
      y={111.413}
      rx={4.186}
      ry={4.381}
      fill="#ffe6d5"
      strokeWidth={0.236}
    />
    <path
      d="M36.077 127.688s150.892-49.746 147.907-7.205c-2.985 42.54-1.934 28.591-1.934 28.591s-46.713-13.34-144.845 21.847"
      fill="#ff7f2a"
      stroke="#000"
      strokeWidth={0.225}
    />
    <path
      d="M36.893 147.145l-1.467 35.238"
      fill="none"
      stroke="#000"
      strokeWidth={0.249}
    />
    <rect
      width={47.648}
      height={34.227}
      x={83.091}
      y={-0.849}
      ry={2.77}
      rx={5.834}
      fill="#a40"
      stroke="#000"
      strokeWidth={0.028}
    />
  </svg>
)

export default SvgComponent
