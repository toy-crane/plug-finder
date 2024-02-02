import { de } from "date-fns/locale";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const PRIMARY_DEFAULT = "모델 3";
const SECONDARY_DEFAULT = "모델 Y";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const primary = decodeURIComponent(
    searchParams.get("primary") ?? PRIMARY_DEFAULT
  );
  const primary_trim = decodeURIComponent(
    searchParams.get("primary_trim") ?? "Standard Range Plus"
  );

  const secondary = decodeURIComponent(
    searchParams.get("secondary") ?? SECONDARY_DEFAULT
  );

  const secondary_trim = decodeURIComponent(
    searchParams.get("secondary_trim") ?? "Long Range"
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#C455F7",
        }}
      >
        <svg
          width="938"
          height="938"
          viewBox="0 0 938 938"
          style={{
            width: "14rem",
            height: "14rem",
            marginBottom: "1rem",
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M204.297 546.875V625H156.25V318.516L240.703 78.125H696.797L781.25 318.516V625H733.203V546.875H204.297ZM211.523 279.453H725.977L668.437 117.188H269.063L211.523 279.453ZM290.156 456.719C302.292 456.719 312.552 452.474 320.937 443.984C329.323 435.469 333.516 425.13 333.516 412.969C333.516 400.807 329.271 390.547 320.781 382.188C312.266 373.802 301.94 369.609 289.805 369.609C277.669 369.609 267.383 373.854 258.945 382.344C250.586 390.859 246.406 401.185 246.406 413.32C246.406 425.456 250.651 435.742 259.141 444.18C267.656 452.539 277.995 456.719 290.156 456.719ZM647.695 456.719C659.857 456.719 670.143 452.474 678.555 443.984C686.914 435.469 691.094 425.13 691.094 412.969C691.094 400.807 686.849 390.547 678.359 382.188C669.844 373.802 659.505 369.609 647.344 369.609C635.182 369.609 624.922 373.854 616.563 382.344C608.177 390.859 603.984 401.185 603.984 413.32C603.984 425.456 608.229 435.742 616.719 444.18C625.234 452.539 635.56 456.719 647.695 456.719ZM502.539 884.922L302.734 784.258H434.961V716.68L634.766 817.305H502.539V884.922Z"
            fill="white"
          />
        </svg>
        <div tw="flex text-[36px] text-white mb-2">전기차 스펙 비교</div>
        <div tw="text-white mb-5 leading-none w-full flex items-center px-40">
          <div tw="flex flex-col flex-1">
            <span tw="text-[92px] self-center">{primary}</span>
            <div tw="flex text-[24px] font-semibold self-center">
              {primary_trim}
            </div>
          </div>
          <div tw="text-[54px] flex flex-basis">VS</div>
          <div tw="flex flex-col flex-1">
            <span tw="text-[92px] self-center">{secondary}</span>
            <div tw="flex text-[24px] font-semibold self-center">
              {secondary_trim}
            </div>
          </div>
        </div>
        <svg
          width="641"
          height="126"
          viewBox="0 0 641 126"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "8rem",
            height: "2rem",
          }}
        >
          <path
            d="M17.6875 125.5H0.5V33.0625H4.625L11.4375 41.125C12.9792 39.6667 14.6667 38.2917 16.5 37C18.3333 35.7083 20.2292 34.6042 22.1875 33.6875C24.1875 32.7292 26.25 31.9792 28.375 31.4375C30.5 30.8958 32.6458 30.625 34.8125 30.625C39.5208 30.625 43.9375 31.4792 48.0625 33.1875C52.2292 34.8542 55.8542 37.2292 58.9375 40.3125C62.0625 43.3958 64.5208 47.125 66.3125 51.5C68.1042 55.8333 69 60.6458 69 65.9375C69 71.4375 68.1042 76.3958 66.3125 80.8125C64.5208 85.1875 62.0625 88.9167 58.9375 92C55.8542 95.0417 52.2292 97.375 48.0625 99C43.9375 100.625 39.5208 101.438 34.8125 101.438C33.3125 101.438 31.8125 101.271 30.3125 100.938C28.8542 100.604 27.3958 100.167 25.9375 99.625C24.5208 99.0417 23.1042 98.3958 21.6875 97.6875C20.3125 96.9792 18.9792 96.25 17.6875 95.5V125.5ZM51.875 65.9375C51.875 63.1042 51.4167 60.5625 50.5 58.3125C49.625 56.0625 48.4167 54.1667 46.875 52.625C45.3333 51.0417 43.5208 49.8333 41.4375 49C39.3542 48.1667 37.1458 47.75 34.8125 47.75C32.4792 47.75 30.2708 48.1667 28.1875 49C26.1458 49.8333 24.3542 51.0417 22.8125 52.625C21.2708 54.1667 20.0417 56.0625 19.125 58.3125C18.25 60.5625 17.8125 63.1042 17.8125 65.9375C17.8125 68.6458 18.25 71.125 19.125 73.375C20.0417 75.625 21.2708 77.5417 22.8125 79.125C24.3542 80.7083 26.1458 81.9375 28.1875 82.8125C30.2708 83.6875 32.4792 84.125 34.8125 84.125C37.1458 84.125 39.3542 83.6875 41.4375 82.8125C43.5208 81.9375 45.3333 80.7083 46.875 79.125C48.4167 77.5417 49.625 75.625 50.5 73.375C51.4167 71.125 51.875 68.6458 51.875 65.9375ZM95.6875 100H78.5V6.4375H95.6875V100ZM157.938 92.1875C156.562 93.4375 155.083 94.625 153.5 95.75C151.958 96.8333 150.333 97.7917 148.625 98.625C146.917 99.4167 145.146 100.042 143.312 100.5C141.521 101 139.688 101.25 137.812 101.25C133.688 101.25 129.812 100.521 126.188 99.0625C122.562 97.6042 119.375 95.5417 116.625 92.875C113.917 90.1667 111.771 86.8958 110.188 83.0625C108.646 79.1875 107.875 74.8542 107.875 70.0625V33.0625H124.875V70.0625C124.875 72.3125 125.208 74.3333 125.875 76.125C126.583 77.875 127.521 79.3542 128.688 80.5625C129.854 81.7708 131.208 82.6875 132.75 83.3125C134.333 83.9375 136.021 84.25 137.812 84.25C139.562 84.25 141.208 83.8542 142.75 83.0625C144.333 82.2292 145.708 81.1458 146.875 79.8125C148.042 78.4792 148.958 76.9792 149.625 75.3125C150.292 73.6042 150.625 71.8542 150.625 70.0625V33.0625H167.688V100H163.562L157.938 92.1875ZM228.375 65.9375C228.375 63.6042 227.917 61.3542 227 59.1875C226.125 56.9792 224.917 55.0417 223.375 53.375C221.833 51.6667 220.021 50.3125 217.938 49.3125C215.896 48.2708 213.708 47.75 211.375 47.75C209.042 47.75 206.833 48.1458 204.75 48.9375C202.708 49.7292 200.917 50.8958 199.375 52.4375C197.875 53.9792 196.688 55.8958 195.812 58.1875C194.938 60.4375 194.5 63.0208 194.5 65.9375C194.5 68.7292 194.938 71.25 195.812 73.5C196.688 75.7083 197.875 77.6042 199.375 79.1875C200.917 80.7708 202.708 82 204.75 82.875C206.833 83.7083 209.042 84.125 211.375 84.125C213.708 84.125 215.896 83.625 217.938 82.625C220.021 81.5833 221.833 80.2292 223.375 78.5625C224.917 76.8542 226.125 74.9167 227 72.75C227.917 70.5417 228.375 68.2708 228.375 65.9375ZM245.562 91.5625C245.562 96.2708 244.667 100.688 242.875 104.812C241.083 108.938 238.625 112.542 235.5 115.625C232.417 118.708 228.792 121.146 224.625 122.938C220.5 124.729 216.083 125.625 211.375 125.625L202.812 125.5V108.438L211.25 108.562C213.917 108.562 216.188 108.208 218.062 107.5C219.938 106.833 221.521 105.896 222.812 104.688C224.104 103.521 225.125 102.167 225.875 100.625C226.667 99.0833 227.292 97.4583 227.75 95.75C227.083 96.8333 226.125 97.7292 224.875 98.4375C223.625 99.1042 222.229 99.6458 220.688 100.062C219.188 100.521 217.604 100.833 215.938 101C214.312 101.167 212.792 101.25 211.375 101.25C206.667 101.25 202.229 100.438 198.062 98.8125C193.938 97.1875 190.312 94.875 187.188 91.875C184.104 88.8333 181.667 85.125 179.875 80.75C178.083 76.375 177.188 71.4375 177.188 65.9375C177.188 60.8958 178.083 56.2083 179.875 51.875C181.667 47.5417 184.104 43.7917 187.188 40.625C190.312 37.4583 193.938 34.9792 198.062 33.1875C202.229 31.3958 206.667 30.5 211.375 30.5C213.542 30.5 215.688 30.7708 217.812 31.3125C219.938 31.8542 222 32.6042 224 33.5625C226 34.5208 227.896 35.6458 229.688 36.9375C231.521 38.2292 233.229 39.625 234.812 41.125L241.438 33.1875H245.562V91.5625ZM316.188 100H299.125V50.0625H290.812V33.0625H299.125V29.875C299.125 25.75 299.896 21.875 301.438 18.25C303.021 14.625 305.167 11.4792 307.875 8.8125C310.625 6.10417 313.812 3.97917 317.438 2.4375C321.062 0.854167 324.938 0.0625 329.062 0.0625H341.875V17.0625H329.062C327.229 17.0625 325.521 17.3958 323.938 18.0625C322.396 18.6875 321.042 19.5833 319.875 20.75C318.75 21.875 317.854 23.2292 317.188 24.8125C316.521 26.3542 316.188 28.0417 316.188 29.875V33.0625H337.125V50.0625H316.188V100ZM367.875 14.875C367.875 16.4583 367.562 17.9375 366.938 19.3125C366.354 20.6875 365.542 21.8958 364.5 22.9375C363.458 23.9375 362.229 24.75 360.812 25.375C359.438 25.9583 357.958 26.25 356.375 26.25C354.792 26.25 353.292 25.9583 351.875 25.375C350.5 24.75 349.292 23.9375 348.25 22.9375C347.25 21.8958 346.438 20.6875 345.812 19.3125C345.229 17.9375 344.938 16.4583 344.938 14.875C344.938 13.3333 345.229 11.875 345.812 10.5C346.438 9.08333 347.25 7.875 348.25 6.875C349.292 5.83333 350.5 5.02083 351.875 4.4375C353.292 3.8125 354.792 3.5 356.375 3.5C357.958 3.5 359.438 3.8125 360.812 4.4375C362.229 5.02083 363.458 5.83333 364.5 6.875C365.542 7.875 366.354 9.08333 366.938 10.5C367.562 11.875 367.875 13.3333 367.875 14.875ZM364.938 100H347.75V33.0625H364.938V100ZM395.062 100H378V33.0625H382.125L387.75 39.5625C390.5 37.0625 393.604 35.1458 397.062 33.8125C400.562 32.4375 404.208 31.75 408 31.75C412.083 31.75 415.938 32.5417 419.562 34.125C423.188 35.6667 426.354 37.8125 429.062 40.5625C431.771 43.2708 433.896 46.4583 435.438 50.125C437.021 53.75 437.812 57.625 437.812 61.75V100H420.75V61.75C420.75 60 420.417 58.3542 419.75 56.8125C419.083 55.2292 418.167 53.8542 417 52.6875C415.833 51.5208 414.479 50.6042 412.938 49.9375C411.396 49.2708 409.75 48.9375 408 48.9375C406.208 48.9375 404.521 49.2708 402.938 49.9375C401.354 50.6042 399.979 51.5208 398.812 52.6875C397.646 53.8542 396.729 55.2292 396.062 56.8125C395.396 58.3542 395.062 60 395.062 61.75V100ZM514.688 100H510.562L503.938 90.8125C502.312 92.2708 500.583 93.6458 498.75 94.9375C496.958 96.1875 495.062 97.2917 493.062 98.25C491.062 99.1667 489 99.8958 486.875 100.438C484.792 100.979 482.667 101.25 480.5 101.25C475.792 101.25 471.354 100.375 467.188 98.625C463.062 96.8333 459.438 94.375 456.312 91.25C453.229 88.0833 450.792 84.3542 449 80.0625C447.208 75.7292 446.312 71.0208 446.312 65.9375C446.312 60.8958 447.208 56.2083 449 51.875C450.792 47.5417 453.229 43.7917 456.312 40.625C459.438 37.4583 463.062 34.9792 467.188 33.1875C471.354 31.3958 475.792 30.5 480.5 30.5C482 30.5 483.542 30.625 485.125 30.875C486.75 31.125 488.312 31.5417 489.812 32.125C491.354 32.6667 492.792 33.3958 494.125 34.3125C495.458 35.2292 496.583 36.3542 497.5 37.6875V6.4375H514.688V100ZM497.5 65.9375C497.5 63.6042 497.042 61.3542 496.125 59.1875C495.25 56.9792 494.042 55.0417 492.5 53.375C490.958 51.6667 489.146 50.3125 487.062 49.3125C485.021 48.2708 482.833 47.75 480.5 47.75C478.167 47.75 475.958 48.1667 473.875 49C471.833 49.8333 470.042 51.0417 468.5 52.625C467 54.1667 465.812 56.0625 464.938 58.3125C464.062 60.5625 463.625 63.1042 463.625 65.9375C463.625 68.3958 464.062 70.7292 464.938 72.9375C465.812 75.1458 467 77.0833 468.5 78.75C470.042 80.4167 471.833 81.7292 473.875 82.6875C475.958 83.6458 478.167 84.125 480.5 84.125C482.833 84.125 485.021 83.625 487.062 82.625C489.146 81.5833 490.958 80.2292 492.5 78.5625C494.042 76.8542 495.25 74.9167 496.125 72.75C497.042 70.5417 497.5 68.2708 497.5 65.9375ZM554.375 83.625C555.042 83.8333 555.708 83.9792 556.375 84.0625C557.042 84.1042 557.708 84.125 558.375 84.125C560.042 84.125 561.646 83.8958 563.188 83.4375C564.729 82.9792 566.167 82.3333 567.5 81.5C568.875 80.625 570.083 79.5833 571.125 78.375C572.208 77.125 573.083 75.75 573.75 74.25L586.25 86.8125C584.667 89.0625 582.833 91.0833 580.75 92.875C578.708 94.6667 576.479 96.1875 574.062 97.4375C571.688 98.6875 569.167 99.625 566.5 100.25C563.875 100.917 561.167 101.25 558.375 101.25C553.667 101.25 549.229 100.375 545.062 98.625C540.938 96.875 537.312 94.4375 534.188 91.3125C531.104 88.1875 528.667 84.4792 526.875 80.1875C525.083 75.8542 524.188 71.1042 524.188 65.9375C524.188 60.6458 525.083 55.8125 526.875 51.4375C528.667 47.0625 531.104 43.3333 534.188 40.25C537.312 37.1667 540.938 34.7708 545.062 33.0625C549.229 31.3542 553.667 30.5 558.375 30.5C561.167 30.5 563.896 30.8333 566.562 31.5C569.229 32.1667 571.75 33.125 574.125 34.375C576.542 35.625 578.792 37.1667 580.875 39C582.958 40.7917 584.792 42.8125 586.375 45.0625L554.375 83.625ZM563.125 48.4375C562.333 48.1458 561.542 47.9583 560.75 47.875C560 47.7917 559.208 47.75 558.375 47.75C556.042 47.75 553.833 48.1875 551.75 49.0625C549.708 49.8958 547.917 51.1042 546.375 52.6875C544.875 54.2708 543.688 56.1875 542.812 58.4375C541.938 60.6458 541.5 63.1458 541.5 65.9375C541.5 66.5625 541.521 67.2708 541.562 68.0625C541.646 68.8542 541.75 69.6667 541.875 70.5C542.042 71.2917 542.229 72.0625 542.438 72.8125C542.646 73.5625 542.917 74.2292 543.25 74.8125L563.125 48.4375ZM612.062 100H595V33.0625H599.125L604.75 41C607.5 38.5 610.625 36.5833 614.125 35.25C617.625 33.875 621.25 33.1875 625 33.1875H640.062V50.1875H625C623.208 50.1875 621.521 50.5208 619.938 51.1875C618.354 51.8542 616.979 52.7708 615.812 53.9375C614.646 55.1042 613.729 56.4792 613.062 58.0625C612.396 59.6458 612.062 61.3333 612.062 63.125V100Z"
            fill="white"
          />
        </svg>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
