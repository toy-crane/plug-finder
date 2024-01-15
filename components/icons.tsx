type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  starOutline: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g data-name="Layer 2">
        <g data-name="star">
          <rect
            width="24"
            height="24"
            transform="rotate(90 12 12)"
            opacity="0"
          />
          <path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18zM12 16.1a.92.92 0 0 1 .46.11l3.77 2-.72-4.21a1 1 0 0 1 .29-.89l3-2.93-4.2-.62a1 1 0 0 1-.71-.56L12 5.25 10.11 9a1 1 0 0 1-.75.54l-4.2.62 3 2.93a1 1 0 0 1 .29.89l-.72 4.16 3.77-2a.92.92 0 0 1 .5-.04z" />
        </g>
      </g>
    </svg>
  ),
  starFilled: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      fill="#FCD53F"
    >
      <g data-name="Layer 2">
        <g data-name="star">
          <rect
            width="24"
            height="24"
            transform="rotate(90 12 12)"
            opacity="0"
          />
          <path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18z" />
        </g>
      </g>
    </svg>
  ),
  EvCharger: (props: IconProps) => (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="m11.3 20l5-9.75h-3.5V4l-5 9.75h3.5zm.7 2q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"></path>
    </svg>
  ),
  Naver: (props: IconProps) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_403_243)">
        <path
          d="M18 20H2C0.9 20 0 19.1 0 18V2C0 0.9 0.9 0 2 0H18C19.1 0 20 0.9 20 2V18C20 19.1 19.1 20 18 20Z"
          fill="#03C75A"
        />
        <path
          d="M11.35 10.25L8.50002 6.19995H6.15002V13.8H8.65002V9.74995L11.5 13.8H13.85V6.19995H11.35V10.25Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_403_243">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  TMap: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_967_6870)">
        <mask
          id="mask0_967_6870"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <path d="M0 0H24V24H0V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_967_6870)">
          <path d="M0.0327148 0.0327148H23.9671V23.9671H0.0327148V0.0327148Z" />
          <path
            d="M4.55713 4.68848H19.2129V8.09831H4.55713V4.68848Z"
            fill="url(#paint0_linear_967_6870)"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.6641 4.68848H19.213V8.08835H17.0461V8.0892L17.0274 8.08831C15.2398 8.08831 13.7697 9.33271 13.593 10.9274L13.588 11.0132C13.5838 13.8339 13.5795 16.6546 13.5749 19.4754H10.2949V11.0132L10.3321 10.4333C10.627 7.75077 12.6478 5.53959 15.3526 4.76244L15.6641 4.68848Z"
            fill="url(#paint1_linear_967_6870)"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_967_6870"
          x1="4.55713"
          y1="6.39339"
          x2="19.2129"
          y2="6.39339"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F645B9" />
          <stop offset="0.61" stop-color="#783BFF" />
          <stop offset="1" stop-color="#783BFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_967_6870"
          x1="20.2369"
          y1="5.54762"
          x2="9.27102"
          y2="18.6162"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#33E6AF" />
          <stop offset="0.85" stop-color="#0264FF" />
          <stop offset="1" stop-color="#0264FF" />
        </linearGradient>
        <clipPath id="clip0_967_6870">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
};
