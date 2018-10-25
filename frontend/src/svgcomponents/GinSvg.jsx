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

const GinSvg = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="15em"
    height="15em"
    viewBox="0 0 210 297"
    {...props}
  >
    <defs>
      <linearGradient id="gin-e">
        <stop offset={0} stopColor="#071500" />
        <stop offset={0.058} stopColor="#216400" stopOpacity={0.894} />
        <stop offset={0.105} stopColor="#37a600" stopOpacity={0.808} />
        <stop offset={0.151} stopColor="#349e00" stopOpacity={0.541} />
        <stop offset={1} stopColor="#071500" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="gin-d">
        <stop offset={0} stopColor="#b3ff80" stopOpacity={0} />
        <stop offset={0.603} stopColor="#9cc87f" stopOpacity={0.333} />
        <stop offset={1} stopColor="#597f41" stopOpacity={0.349} />
        <stop offset={1} stopColor="#225600" stopOpacity={0.227} />
      </linearGradient>
      <linearGradient id="gin-c-alcoholline">
        <stop offset={0} stopColor="#37c837" stopOpacity={0.497} />
        {getStop(0.03,props.percent, '#21af21',0.702)}
        {getStop(0.04,props.percent, '#4cce4c',0.052)}
        <stop offset={1} stopColor="#37c837" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="gin-b">
        <stop offset={0} stopOpacity={0.18} />
        <stop offset={0.438} stopOpacity={0.184} />
        <stop offset={0.647} stopOpacity={0.259} />
        <stop offset={1} stopOpacity={0} />
      </linearGradient>
      <linearGradient id="gin-a">
        <stop offset={0} stopColor="#090500" stopOpacity={0.18} />
        <stop offset={1} stopColor="#45bd5d" stopOpacity={0.569} />
      </linearGradient>
      <radialGradient
        xlinkHref="#gin-a"
        id="gin-g"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(1 0 0 1.02087 484.565 169.527)"
        cx={-947.208}
        cy={-81.732}
        fx={-947.208}
        fy={-81.732}
        r={36.229}
      />
      <radialGradient
        xlinkHref="#gin-b"
        id="f"
        cx={-919.238}
        cy={98.94}
        fx={-919.238}
        fy={98.94}
        r={36.229}
        gradientTransform="matrix(1 0 0 1.02087 456.595 -14.916)"
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#gin-c-alcoholline"
        id="gin-h"
        x1={-74.327}
        y1={482.964}
        x2={-73.84}
        y2={-50.738}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-390.072 -24.604)"
      />
      <radialGradient
        xlinkHref="#gin-d"
        id="gin-i"
        cx={-128.512}
        cy={251.643}
        fx={-128.512}
        fy={251.643}
        r={116.867}
        gradientTransform="matrix(1 0 0 .23484 -335.917 107.07)"
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        gradientTransform="matrix(-.26458 0 0 .26458 -1504.345 -169.76)"
        xlinkHref="#gin-e"
        id="gin-j"
        x1={-4339.998}
        y1={1394.995}
        x2={-3545.715}
        y2={1394.995}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        gradientTransform="matrix(.26458 0 0 .26458 579.06 -168.413)"
        xlinkHref="#gin-e"
        id="gin-k"
        x1={-4339.998}
        y1={1394.995}
        x2={-3545.715}
        y2={1394.995}
        gradientUnits="userSpaceOnUse"
      />
    </defs>
    <g transform="matrix(.52775 0 0 .55388 355.187 37.564)">
      <path
        d="M-484.421-66.632a9.62 9.62 0 0 0-9.637 9.646V4.916l-16.63 24.43c-42.842 12.78-55.992 42.804-58.088 84.463a10.662 10.662 0 0 0-.456 3.093v342.013c0 5.869 4.72 10.593 10.583 10.593h192.011a10.565 10.565 0 0 0 10.584-10.593V116.902c0-1.077-.16-2.115-.456-3.093-2.096-41.659-15.246-71.684-58.087-84.463l-16.631-24.43v-61.902a9.62 9.62 0 0 0-9.637-9.646h-21.778z"
        fill="#b3ff80"
        stroke="#e3e2db"
        strokeWidth={2.001}
        strokeOpacity={0}
      />
      <rect
        rx={21.624}
        y={139.341}
        x={-580.675}
        height={53.649}
        width={232.492}
        opacity={0.47}
        fill="#b3ff80"
        stroke="#050404"
        strokeWidth={1.242}
        strokeOpacity={0.242}
      />
      <g
        transform="translate(485.321 168.577)"
        stroke="#050404"
        strokeOpacity={0.242}
      >
        <circle
          cx={-947.208}
          cy={-82.488}
          r={34.774}
          fill="#d40000"
          strokeWidth={1.399}
        />
        <ellipse
          cx={-947.208}
          cy={-82.488}
          rx={25.635}
          ry={24.123}
          fill="#d40000"
          strokeWidth={1.534}
        />
        <ellipse
          cx={-947.208}
          cy={-82.488}
          rx={19.655}
          ry={20.411}
          fill="#280b0b"
          strokeWidth={1.399}
        />
        <ellipse
          cx={-947.208}
          cy={-82.488}
          rx={17.034}
          ry={18.168}
          fill="#a00"
          strokeWidth={0.592}
        />
      </g>
      <ellipse
        ry={36.205}
        rx={35.449}
        cy={86.089}
        cx={-462.643}
        opacity={0.876}
        fill="url(#gin-f)"
        stroke="url(#gin-g)"
        strokeWidth={1.56}
        strokeOpacity={0.242}
      />
      <circle
        r={42.925}
        cy={86.089}
        cx={-462.643}
        opacity={0.184}
        fill="none"
        stroke="#090500"
        strokeWidth={1.727}
      />
      <path
        d="M-485.933-74.04a9.616 9.616 0 0 0-9.636 9.637V-2.56l-16.632 24.408c-42.84 12.767-55.991 42.763-58.087 84.383a10.643 10.643 0 0 0-.456 3.09v341.69a10.56 10.56 0 0 0 10.584 10.584h192.011a10.56 10.56 0 0 0 10.583-10.583v-341.69c0-1.077-.16-2.114-.456-3.091-2.096-41.62-15.246-71.616-58.087-84.383L-432.74-2.56v-61.843a9.616 9.616 0 0 0-9.637-9.637h-21.778z"
        fill="url(#gin-h)"
        stroke="#e3e2db"
        strokeWidth={2}
        strokeOpacity={0}
      />
      <rect
        rx={16.612}
        y={224.394}
        x={-531.17}
        height={165.622}
        width={137.053}
        opacity={0.702}
        fill="#e3f4d7"
        fillOpacity={0.702}
        stroke="#090500"
        strokeWidth={1.162}
      />
      <rect
        rx={21.624}
        y={139.341}
        x={-580.675}
        height={53.649}
        width={232.492}
        fill="url(#gin-i)"
        strokeWidth={1.242}
        strokeOpacity={0.242}
      />
      <path
        d="M-440.865-69.51c5.339 0 9.637 4.372 9.637 9.8V3.18l16.63 24.82c42.842 12.982 55.992 43.486 58.088 85.81.296.993.456 2.047.456 3.142v344.165a13.181 13.181 0 0 1-11.702 7.058h-185.239a13.185 13.185 0 0 1-13.213-13.214V90.76c5.681-30.35 20.911-52.273 55.52-62.76l16.63-24.82v-62.89c0-5.428 4.298-9.8 9.637-9.8h21.778z"
        opacity={0.345}
        fill="url(#gin-j)"
        strokeWidth={1.611}
      />
      <path
        d="M-484.421-68.162c-5.339 0-9.637 4.371-9.637 9.8V4.527l-16.63 24.82c-42.842 12.982-55.992 43.486-58.088 85.81a10.99 10.99 0 0 0-.456 3.142v344.165a13.181 13.181 0 0 0 11.702 7.058h185.239c7.32 0 13.213-5.894 13.213-13.214V92.107c-5.681-30.35-20.912-52.273-55.52-62.76l-16.63-24.82v-62.889c0-5.429-4.298-9.8-9.637-9.8h-21.778z"
        opacity={0.345}
        fill="url(#gin-k)"
        strokeWidth={1.611}
      />
      <path
        d="M-493.492-66.632v45.136a32.506 12.851 0 0 0-1.657 4.02 32.506 12.851 0 0 0 1.657 3.999v1.292h1.27a32.506 12.851 0 0 0 29.579 7.56 32.506 12.851 0 0 0 29.59-7.56h1.404v-1.428a32.506 12.851 0 0 0 1.512-3.863 32.506 12.851 0 0 0-1.512-3.827v-45.329z"
        fill="#dee3db"
        fillOpacity={0.894}
        strokeWidth={2.569}
      />
    </g>
  </svg>
)

export default GinSvg
