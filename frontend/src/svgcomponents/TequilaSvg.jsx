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

const TequilaSvg = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="100%"
    height="100%"
    viewBox="0 0 210 297"
    {...props}
  >
    <defs>
      <linearGradient id="teq-j">
        <stop offset={0} stopColor="#e80300" />
        <stop offset={0.6} stopColor="#fff" />
        <stop offset={1} stopColor="#34ff2b" stopOpacity={0.867} />
      </linearGradient>
      <linearGradient id="teq-i">
        <stop offset={0} stopColor="#040300" />
        <stop offset={0.423} stopColor="#a69752" stopOpacity={0.576} />
        <stop offset={1} stopColor="#ffe680" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="teq-h">
        <stop offset={0} stopColor="#ffe680" />
        <stop offset={1} stopColor="#ffe680" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="teq-g">
        <stop offset={0} stopColor="#0a0a0a" stopOpacity={0} />
        <stop offset={1} stopColor="#1e0000" />
      </linearGradient>
      <linearGradient id="teq-f">
        <stop offset={0} stopColor="#ffeda0" />
        <stop offset={0.321} stopColor="#fde172" stopOpacity={0.957} />
        <stop offset={0.73} stopColor="#c7a92b" stopOpacity={0.933} />
        <stop offset={0.881} stopColor="#a58e2d" stopOpacity={0.929} />
        <stop offset={1} stopColor="#0f0f0f" stopOpacity={0.976} />
      </linearGradient>
      <linearGradient id="teq-e-anim">
        <stop offset={0} stopColor="#ffe26d" />
        {getStop(0.03,props.percent, '#d8ac00',0.922)}
        {getStop(0.04,props.percent, '#fc0',0)}
        <stop offset={1} stopColor="#fc0" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="teq-d">
        <stop offset={0} stopColor="#050704" />
        <stop offset={1} stopColor="#050704" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="teq-c">
        <stop offset={0} stopColor="#635000" />
        <stop offset={1} stopColor="#ffe680" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="teq-b">
        <stop offset={0} stopColor="#070500" />
        <stop offset={1} stopColor="#fc0" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="teq-a">
        <stop offset={0} stopColor="#fc0" />
        <stop offset={0.523} stopColor="#c09800" stopOpacity={0.663} />
        <stop offset={1} stopOpacity={0.594} />
      </linearGradient>
      <linearGradient
        xlinkHref="#teq-a"
        id="teq-n"
        x1={1945.441}
        y1={-2151.766}
        x2={1945.988}
        y2={-2271.766}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.09232 0 0 .0529 -74.532 199.99)"
      />
      <linearGradient
        xlinkHref="#teq-b"
        id="teq-o"
        x1={1004.664}
        y1={-2610.015}
        x2={1143.915}
        y2={-2444.301}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.07846 0 0 .08075 -10.806 308.66)"
      />
      <linearGradient
        xlinkHref="#teq-b"
        id="teq-p"
        x1={1004.664}
        y1={-2610.015}
        x2={1143.915}
        y2={-2444.301}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(-.07846 0 0 .08075 220.978 308.66)"
      />
      <linearGradient
        xlinkHref="#teq-c"
        id="teq-q"
        x1={402.697}
        y1={-234.435}
        x2={493.862}
        y2={-231.411}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.29653 0 0 .3052 -72.002 272.23)"
      />
      <linearGradient
        gradientTransform="matrix(-.29653 0 0 .3052 282.174 272.23)"
        xlinkHref="#teq-c"
        id="teq-r"
        x1={402.697}
        y1={-234.435}
        x2={493.862}
        y2={-231.411}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#teq-d"
        id="teq-l"
        x1={341.937}
        y1={-136.161}
        x2={725.468}
        y2={-136.161}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.29653 0 0 .3052 -52.386 190.414)"
      />
      <linearGradient
        xlinkHref="#teq-e-anim"
        id="teq-k"
        x1={538.994}
        y1={337.065}
        x2={533.703}
        y2={-611.676}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.29653 0 0 .3052 -52.386 190.414)"
      />
      <radialGradient
        xlinkHref="#teq-f"
        id="teq-m"
        cx={-1152.539}
        cy={-34.677}
        fx={-1152.539}
        fy={-34.677}
        r={194.039}
        gradientTransform="matrix(.29652 -.00295 .00231 .24577 447.36 160.12)"
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#teq-i"
        id="teq-s"
        x1={-4246.563}
        y1={-1527.137}
        x2={-4477.143}
        y2={-1468.909}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.07846 0 0 .08075 460.608 184.833)"
      />
      <linearGradient
        gradientTransform="matrix(-.07846 0 0 .08075 -250.436 184.833)"
        xlinkHref="#teq-i"
        id="teq-t"
        x1={-4246.563}
        y1={-1527.137}
        x2={-4477.143}
        y2={-1468.909}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        xlinkHref="#teq-j"
        id="teq-u"
        x1={-4215.208}
        y1={-1060.372}
        x2={-4297.143}
        y2={-1274.623}
        gradientUnits="userSpaceOnUse"
      />
      <linearGradient
        gradientTransform="matrix(-.26458 0 0 .26458 -2112.13 0)"
        xlinkHref="#teq-j"
        id="teq-v"
        x1={-4215.208}
        y1={-1060.372}
        x2={-4297.143}
        y2={-1274.623}
        gradientUnits="userSpaceOnUse"
      />
    </defs>
    <path
      d="M104.331 1.14v.024a19.137 28.233 0 0 0-12.592 7.95 19.137 28.233 0 0 0-5.794 20.237h-13.57c-2.4 0-4.33 1.51-4.33 3.384v1.109a25.397 12.152 0 0 0 20.667 10.532h3.389l-2.826 5.908-3.986 4.23-2.554 7.004 2.215 4.13 6.447 3.797-4.33 14.217c-8.103 1.948-2.284 5.258-8.15 9.538-10.474 7.643-29.777 18.378-29.78 29.974.01.556.036 1.11.077 1.665a8.133 8.133 0 0 0-.854 3.613v153.283c0 5.362 5.306 9.678 11.896 9.678h89.66c6.59 0 11.896-4.316 11.896-9.678V128.452a8.133 8.133 0 0 0-.854-3.613c.04-.554.066-1.11.078-1.665-.003-11.596-19.307-22.331-29.78-29.974-5.867-4.28-.048-7.59-8.15-9.538l-4.331-14.217 6.447-3.798 2.215-4.13-2.554-7.002-3.985-4.23-2.827-5.91h3.389a25.397 12.152 0 0 0 20.668-10.531v-1.11c0-1.874-1.931-3.383-4.33-3.383h-13.571a19.137 28.233 0 0 0-5.793-20.238 19.137 28.233 0 0 0-12.594-7.95v-.022a19.137 28.233 0 0 0-.754.011 19.137 28.233 0 0 0-.755-.011zm.755 28.058l.005.153v.458h-.01v-.458z"
      fill="#ffe680"
      stroke="#050704"
      strokeWidth={0.28}
      strokeOpacity={0.349}
    />
    <path
      d="M101.412 107.312c-16.593.018-32.209 5.242-42.16 14.105-6.501.083-11.704 4.365-11.704 9.674v153.283c0 5.362 5.305 9.678 11.896 9.678h91.284c6.59 0 11.896-4.316 11.896-9.678V131.091c0-5.31-5.203-9.59-11.703-9.674-9.952-8.863-25.568-14.087-42.161-14.105-1.23.001-2.456.032-3.674.09a78.995 78.995 0 0 0-3.674-.09z"
      fill="#ffe680"
      stroke="#050704"
      strokeWidth={0.28}
      strokeOpacity={0.349}
    />
    <path
      d="M105.118 3.723v.023a19.137 28.233 0 0 0-12.593 7.95 19.137 28.233 0 0 0-5.793 20.238h-13.57c-2.4 0-4.331 1.509-4.331 3.383v1.11a25.397 12.152 0 0 0 20.668 10.532h3.389l-2.827 5.908-3.985 4.23-2.554 7.003 2.215 4.13 6.447 3.798-4.33 14.217c-8.103 1.947-2.284 5.258-8.15 9.538-10.475 7.642-29.777 18.378-29.78 29.974.01.555.036 1.11.076 1.665a8.134 8.134 0 0 0-.853 3.613v153.283c0 5.362 5.305 9.678 11.896 9.678h89.66c6.59 0 11.896-4.316 11.896-9.678V131.035a8.134 8.134 0 0 0-.854-3.613c.04-.554.066-1.11.078-1.665-.003-11.596-19.307-22.332-29.78-29.974-5.868-4.28-.048-7.59-8.15-9.538l-4.331-14.217 6.447-3.798 2.214-4.13-2.553-7.002-3.986-4.231-2.826-5.908h3.389a25.397 12.152 0 0 0 20.668-10.532v-1.11c0-1.874-1.932-3.383-4.33-3.383h-13.572a19.137 28.233 0 0 0-5.793-20.238 19.137 28.233 0 0 0-12.593-7.95v-.023a19.137 28.233 0 0 0-.754.012 19.137 28.233 0 0 0-.755-.012zm.755 28.057l.005.154v.457h-.01v-.457z"
      fill="url(#teq-k)"
      stroke="url(#teq-l)"
      strokeWidth={0.28}
      strokeOpacity={0.349}
    />
    <path
      d="M101.412 107.313c-16.593.017-32.209 5.24-42.16 14.104-6.501.083-11.704 4.365-11.704 9.674v16.297h115.076V131.09c0-5.31-5.203-9.59-11.703-9.674-9.952-8.863-25.568-14.087-42.161-14.104-1.23 0-2.456.03-3.674.088a78.995 78.995 0 0 0-3.674-.088z"
      fill="url(#teq-m)"
      strokeWidth={0.28}
      strokeOpacity={0.349}
    />
    <path
      d="M104.331 1.14l.001.024a19.137 28.233 0 0 0-12.593 7.95 19.137 28.233 0 0 0-5.793 20.237H72.375c-2.4 0-4.33 1.51-4.33 3.384v1.109a25.397 12.152 0 0 0 20.667 10.532h3.389l-.627 1.31h27.224l-.627-1.31h3.389a25.397 12.152 0 0 0 20.668-10.532v-1.11c0-1.874-1.931-3.383-4.33-3.383h-13.571a19.137 28.233 0 0 0-5.793-20.238 19.137 28.233 0 0 0-12.594-7.95l.001-.022a19.137 28.233 0 0 0-.755.011 19.137 28.233 0 0 0-.754-.011zm.755 28.058l.005.153v.458h-.01v-.458z"
      fill="#a80"
      stroke="#050704"
      strokeWidth={0.28}
      strokeOpacity={0.349}
    />
    <path
      d="M88.979 78.443l-4.796 8.767h41.809l-4.796-8.767z"
      fill="url(#teq-n)"
      strokeWidth={0.246}
      strokeOpacity={0.349}
    />
    <path
      d="M87.48 82.304l-.413 1.358c-8.103 1.948-2.283 5.258-8.15 9.538-10.474 7.642-29.777 18.378-29.78 29.974.01.556.036 1.11.077 1.665a8.232 8.232 0 0 0-.787 2.582c1.748-3.485 5.916-5.941 10.824-6.004 9.952-8.863 25.568-14.087 42.161-14.105 1.23.001 2.456.032 3.674.09a78.995 78.995 0 0 1 3.674-.09c16.593.018 32.209 5.242 42.16 14.105 4.91.063 9.078 2.52 10.825 6.005a8.231 8.231 0 0 0-.786-2.583c.04-.554.066-1.11.077-1.665-.003-11.596-19.306-22.331-29.78-29.974-5.867-4.28-.047-7.59-8.15-9.538l-.414-1.358z"
      fill="url(#teq-o)"
      strokeWidth={0.28}
      strokeOpacity={0.349}
    />
    <path
      d="M122.692 82.304l.413 1.358c8.103 1.948 2.283 5.258 8.15 9.538 10.474 7.642 29.777 18.378 29.78 29.974-.01.556-.036 1.11-.077 1.665.4.812.669 1.678.786 2.582-1.747-3.485-5.915-5.941-10.823-6.004-9.952-8.863-25.568-14.087-42.161-14.105-1.231.001-2.456.032-3.674.09a78.995 78.995 0 0 0-3.674-.09c-16.593.018-32.209 5.242-42.16 14.105-4.91.063-9.078 2.52-10.825 6.005.117-.904.387-1.77.786-2.583-.04-.554-.066-1.11-.077-1.665.004-11.596 19.306-22.331 29.78-29.974 5.867-4.28.048-7.59 8.15-9.538l.414-1.358z"
      fill="url(#teq-p)"
      strokeWidth={0.28}
      strokeOpacity={0.349}
    />
    <path
      d="M101.412 107.312c-16.593.018-32.209 5.242-42.16 14.105-6.501.083-11.704 4.365-11.704 9.674v153.283c0 5.362 5.305 9.678 11.896 9.678h91.284c6.59 0 11.896-4.316 11.896-9.678V131.091c0-5.31-5.203-9.59-11.703-9.674-9.952-8.863-25.568-14.087-42.161-14.105-1.23.001-2.456.032-3.674.09a78.995 78.995 0 0 0-3.674-.09z"
      fill="url(#teq-q)"
      strokeWidth={0.28}
      strokeOpacity={0.349}
    />
    <path
      d="M108.76 107.312c16.593.018 32.209 5.242 42.16 14.105 6.501.083 11.704 4.365 11.704 9.674v153.283c0 5.362-5.305 9.678-11.896 9.678H59.444c-6.59 0-11.896-4.316-11.896-9.678V131.091c0-5.31 5.203-9.59 11.703-9.674 9.952-8.863 25.568-14.087 42.161-14.105 1.23.001 2.456.032 3.674.09a78.995 78.995 0 0 1 3.674-.09z"
      fill="url(#teq-r)"
      strokeWidth={0.28}
      strokeOpacity={0.349}
    />
    <path
      d="M105.532 124.094a39.9 33.732 0 0 0-39.901 33.731 39.9 33.732 0 0 0 .037.877c-.024.326-.037.656-.037.992v95.245c0 4.712 2.37 8.504 5.315 8.504h68.723c2.945 0 5.315-3.792 5.315-8.504v-92.353a39.9 33.732 0 0 0 .449-4.761 39.9 33.732 0 0 0-39.901-33.731z"
      opacity={0.976}
      fill="#ffe680"
      fillOpacity={0.929}
      strokeWidth={0.659}
    />
    <path
      d="M92.026 44.533l-2.751 5.751-3.986 4.23-2.554 7.004 2.215 4.13 6.447 3.797-4.33 14.217c-.125.03-.247.06-.365.092h36.768c-.118-.031-.24-.062-.364-.092l-4.331-14.217 6.447-3.798 2.215-4.13-2.554-7.002-3.986-4.23-2.75-5.752z"
      fill="url(#teq-s)"
      stroke="#0a0a0a"
      strokeWidth={0.28}
      strokeOpacity={0}
    />
    <path
      d="M118.146 44.533l2.751 5.751 3.986 4.23 2.554 7.004-2.215 4.13-6.447 3.797 4.33 14.217c.126.03.247.06.365.092H86.702c.118-.031.24-.062.364-.092l4.331-14.217-6.447-3.798-2.215-4.13 2.554-7.002 3.986-4.23 2.75-5.752z"
      fill="url(#teq-t)"
      stroke="#0a0a0a"
      strokeWidth={0.28}
      strokeOpacity={0}
    />
    <g strokeOpacity={0.976}>
      <path
        transform="matrix(.08058 0 0 .12564 426.947 284.961)"
        d="M-3994.285-1280.338a471.429 240 0 0 0-471.43 240 471.429 240 0 0 0 .463 6.664 518.139 242.424 0 0 1 470.967-141.945 518.139 242.424 0 0 1 2.857.068v-104.736a471.429 240 0 0 0-2.857-.051z"
        opacity={0.749}
        fill="url(#teq-u)"
        strokeWidth={7.559}
      />
      <path
        d="M-1055.31-338.756a124.732 63.5 0 0 1 124.733 63.5 124.732 63.5 0 0 1-.122 1.763 137.09 64.141 0 0 0-124.61-37.556 137.09 64.141 0 0 0-.756.018v-27.712a124.732 63.5 0 0 1 .756-.013z"
        opacity={0.749}
        fill="url(#teq-v)"
        strokeWidth={2}
        transform="matrix(.30457 0 0 .47488 426.947 284.961)"
      />
    </g>
  </svg>
)

export default TequilaSvg
