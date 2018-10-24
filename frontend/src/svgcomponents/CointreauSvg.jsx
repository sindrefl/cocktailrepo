import React from 'react'

const getStop = (offset, percent, color) => {
  return <stop offset={offset} stopColor={color}>
          <animate
            attributeName="offset"
            values={`${offset};${percent + offset};${percent + offset}`}
            dur={`${percent*10}s`}
            begin="0s"
            fill="freeze"
          />
        </stop>
    }



const CointreauSvg = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="210mm"
    height="297mm"
    viewBox="0 0 210 297"
    {...props}
  >
    <defs>
      <linearGradient id="cointreau-flow">
        {getStop(0.03,props.percent, '#a40')}
        {getStop(0.04,props.percent, '#d45500')}
        {getStop(0.06,props.percent, '#fff')}
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <clipPath clipPathUnits="userSpaceOnUse" id="c">
        <use xlinkHref="#a" width="100%" height="100%" />
      </clipPath>
      <linearGradient
        xlinkHref="#cointreau-flow"
        id="cointreau-gradient"
        x1={-949.828}
        y1={-173.078}
        x2={-951.344}
        y2={-748.358}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.48481 0 0 .51099 -829.147 134.878)"
      />
    </defs>
    <g transform="matrix(.48481 0 0 .3062 435.78 134.03)" fill="#fca">
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
    <rect
      width={49.11}
      height={99.107}
      x={78.412}
      y={118.285}
      rx={1.992}
      ry={2.585}
      fill="#ffe6d5"
      strokeWidth={0.125}
    />
    <path
      d="M68.898 127.886s71.823-29.345 70.402-4.25c-1.421 25.094-.92 16.866-.92 16.866s-22.236-7.87-68.946 12.886"
      fill="#ff7f2a"
      stroke="#000"
      strokeWidth={0.119}
    />
    <path
      d="M69.286 139.363l-.699 20.787"
      fill="none"
      stroke="#000"
      strokeWidth={0.132}
    />
    <rect
      width={22.68}
      height={20.19}
      x={91.276}
      y={52.062}
      ry={1.634}
      rx={2.777}
      fill="#a40"
      stroke="#000"
      strokeWidth={0.015}
    />
    <path
      d="M-1301.026-177.182l1.196-70.343h22.496l-.366 70.342s.482 15.392 15.73 7.336c15.249-8.056 21.92 32.838 21.92 32.838l.256 183.446h-98.219l.164-183.446s5.125-42 21.092-32.838c15.968 9.163 15.731-7.335 15.731-7.335z"
      fill="url(#cointreau-gradient)"
      strokeWidth={1.286}
      strokeOpacity={0}
      transform="matrix(1 0 0 .59921 1392.065 200.383)"
    />
  </svg>
)

export default CointreauSvg
