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

const RumSvg = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="100%"
    height="100%"
    viewBox="0 0 210 297"
    {...props}
  >
    <defs>
      <linearGradient id="rum-b">
        <stop offset={0} stopColor="#170900" />
        <stop offset={0.22} stopColor="#412410" stopOpacity={0.502} />
        <stop offset={0.34} stopColor="#5f371c" stopOpacity={0.259} />
        <stop offset={0.517} stopColor="#8a532e" stopOpacity={0.082} />
        <stop offset={1} stopColor="#ff9f5d" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="rum-a-anim">
        <stop offset={0} stopColor="#ff9f5d" />
        {getStop(0.03,props.percent, '#763000',1)}
        {getStop(0.04,props.percent, '#ffe6d5',0)}
        <stop offset={1} stopColor="#ffe6d5" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        xlinkHref="#rum-a-anim"
        id="rum-c"
        x1={-83.911}
        y1={783.38}
        x2={-82.325}
        y2={374.305}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.54255 0 0 .65396 149.847 -231.543)"
      />
      <linearGradient
        xlinkHref="#rum-b"
        id="rum-d"
        x1={-171.554}
        y1={368.06}
        x2={3.732}
        y2={368.06}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.54255 0 0 .65396 149.847 -99.548)"
      />
      <linearGradient
        xlinkHref="#rum-b"
        id="rum-e"
        x1={-171.554}
        y1={368.06}
        x2={3.732}
        y2={368.06}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(-.54255 0 0 .65396 58.796 -99.548)"
      />
      <filter
        id="rum-f"
        x={-0.081}
        width={1.163}
        y={-1.059}
        height={3.119}
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation={5.673} />
      </filter>
    </defs>
    <g stroke="#050704" strokeOpacity={0.349}>
      <path
        d="M92.069 1.534c-2.663-.009-5.625.612-7.342 2.979-1.849 2.548.191 10.068.64 15.027 2.77 1.173 7.15 1.719 6.922 6.988l-7.358 58.39-6.375 7.742-15.866 4.944c-2.583.805-5.78 6.549-5.637 9.76l7.949 103.1 2.715 46.697c.186 3.209-8.515 23.603-5.847 23.603h42.248c.072 0 .138-.003.203-.007.065.004.132.007.203.007h42.249c2.668 0-6.034-20.394-5.847-23.603l2.714-46.696 7.95-103.1c.143-3.212-3.054-8.956-5.638-9.761l-15.865-4.944-6.376-7.742-7.358-58.39c-.227-5.27 4.152-5.815 6.922-6.988.45-4.959 2.49-12.479.64-15.027-3.662-5.05-12.991-2.151-12.991-2.151H97.719s-2.633-.818-5.65-.828z"
        opacity={0.87}
        fill="#ffe6d5"
        fillOpacity={0.894}
        strokeWidth={0.61}
      />
      <path
        d="M92.069 1.534c-2.663-.009-5.625.612-7.342 2.979-1.849 2.548.191 10.068.64 15.027 2.77 1.173 7.15 1.719 6.922 6.988l-7.358 58.39-6.375 7.742-15.866 4.944c-2.583.805-5.78 6.549-5.637 9.76l7.949 103.1 2.715 46.697c.186 3.209-8.515 23.603-5.847 23.603h42.248c.072 0 .138-.003.203-.007.065.004.131.007.203.007h42.249c2.668 0-6.034-20.394-5.847-23.603l2.714-46.696 7.95-103.1c.143-3.212-3.054-8.956-5.638-9.761l-15.865-4.944-6.376-7.742-7.358-58.39c-.227-5.27 4.152-5.815 6.922-6.988.45-4.959 2.49-12.479.64-15.027-3.662-5.05-12.991-2.151-12.991-2.151H97.719s-2.633-.818-5.65-.828z"
        opacity={0.87}
        fill="url(#rum-c)"
        strokeWidth={0.61}
      />
      <path
        d="M92.069 1.534c-2.663-.009-5.625.612-7.342 2.979-1.849 2.548.191 10.068.64 15.027 2.77 1.173 7.15 1.719 6.922 6.988l-7.358 58.39-6.375 7.742-15.866 4.944c-2.583.805-5.78 6.549-5.637 9.76l7.949 103.1 2.715 46.697c.186 3.209-8.515 23.603-5.847 23.603h42.248c.072 0 .138-.003.203-.007.065.004.131.007.203.007h42.249c2.668 0-6.034-20.394-5.847-23.603l2.714-46.696 7.95-103.1c.143-3.212-3.054-8.956-5.638-9.761l-15.865-4.944-6.376-7.742-7.358-58.39c-.227-5.27 4.152-5.815 6.922-6.988.45-4.959 2.49-12.479.64-15.027-3.662-5.05-12.991-2.151-12.991-2.151H97.719s-2.633-.818-5.65-.828z"
        opacity={0.87}
        fill="url(#rum-d)"
        strokeWidth={0.61}
      />
      <path
        d="M116.574 1.534c2.662-.009 5.625.612 7.342 2.979 1.848 2.548-.192 10.068-.641 15.027-2.77 1.173-7.15 1.719-6.922 6.988l7.358 58.39 6.375 7.742 15.866 4.944c2.584.805 5.781 6.549 5.637 9.76l-7.949 103.1-2.714 46.697c-.187 3.209 8.515 23.603 5.847 23.603h-42.25c-.07 0-.137-.003-.202-.007a3.246 3.246 0 0 1-.202.007h-42.25c-2.667 0 6.034-20.394 5.848-23.603l-2.715-46.696-7.949-103.1c-.144-3.212 3.054-8.956 5.637-9.761l15.866-4.944 6.375-7.742 7.358-58.39c.228-5.27-4.151-5.815-6.922-6.988-.449-4.959-2.489-12.479-.64-15.027 3.663-5.05 12.992-2.151 12.992-2.151H110.924s2.632-.818 5.65-.828z"
        opacity={0.87}
        fill="url(#rum-e)"
        strokeWidth={0.61}
      />
      <rect
        width={0.756}
        height={3.024}
        x={579.815}
        y={375.619}
        rx={16.612}
        opacity={0.87}
        fill="#fca"
        fillOpacity={0.894}
        strokeWidth={1.399}
      />
      <rect
        width={86.344}
        height={7.018}
        x={61.149}
        y={185.526}
        rx={6.95}
        opacity={0.87}
        fill="#ff2a2a"
        fillOpacity={0.894}
        strokeWidth={0.139}
      />
      <path
        d="M92.069 1.534c-2.663-.009-5.625.612-7.342 2.979-1.849 2.548.191 10.068.64 15.027 2.77 1.173 7.15 1.719 6.922 6.988l-2.582 20.493a14.608 6.485 0 0 0-.65 1.912 14.608 6.485 0 0 0 .258 1.193l-.204 1.625h1.41a14.608 6.485 0 0 0 13.144 3.667 14.608 6.485 0 0 0 13.137-3.667h2.73l-3.178-25.223c-.228-5.27 4.15-5.815 6.921-6.988.45-4.959 2.49-12.479.64-15.027-3.662-5.05-12.991-2.151-12.991-2.151H97.719s-2.633-.818-5.65-.828z"
        opacity={0.87}
        fill="#010100"
        fillOpacity={0.894}
        strokeWidth={0.61}
      />
      <path
        d="M66.05 192.578c-.864 0-1.674.27-2.376.743l1.328 17.225 1.21 20.821h76.218l1.21-20.82 1.329-17.226a4.226 4.226 0 0 0-2.376-.743z"
        opacity={0.87}
        fill="#fff6d5"
        strokeWidth={0.61}
      />
      <ellipse
        cx={-158.372}
        cy={435.717}
        rx={83.533}
        ry={6.426}
        transform="matrix(.60064 0 0 .55614 195.969 40.843)"
        fill="#202020"
        strokeWidth={0.434}
        filter="url(#rum-f)"
      />
    </g>
  </svg>
)

export default RumSvg
