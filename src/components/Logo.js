// He usado: https://react-svgr.com/playground/
function Logo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={50}
      viewBox="0 0 200 200"

      {...props}
    >
      <g filter="url(#prefix__filter0_d_51_37)">
        <circle cx={82} cy={85} r={80} fill="#E8E8E8" />
      </g>
      <path
        fill="#41E0A7"
        d="M84.899 82.602L72.383 69.594V35h-13.5v102.375h13.5V86.75l45.492 50.625h16.313l-40.29-45.21L137.353 35H121.18L84.899 82.602z"
      />
      <path
        fill="#E8E8E8"
        d="M71 71l14.483 10.914L64.545 109.7 50.062 98.786z"
      />
      <path fill="#E8E8E8" d="M56 31h19v108H56z" />
      <path
        fill="#0000C9"
        d="M58.898 82.602L46.383 69.594V35h-13.5v102.375h13.5V86.75l45.492 50.625h16.313l-40.29-45.21L111.352 35H95.18L58.898 82.602z"
      />
      <defs>
        <filter
          id="prefix__filter0_d_51_37"
          width={170}
          height={170}
          x={0}
          y={3}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={3} dy={3} />
          <feGaussianBlur stdDeviation={2.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.584314 0 0 0 0 1 0 0 0 1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_51_37" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_51_37"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default Logo
