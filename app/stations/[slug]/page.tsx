// Set your API key here
const serviceKey =
  "KZ2gsvilf6x8JPRU61b%2Frh%2BzkLv5YiCpEF%2Fm%2F0bTRJttrEnFaps5QmeWFQi9qb%2BIIKtLGpCmC57B%2Fw4Jpio9PA%3D%3D";

// API endpoint for getting charger information
const url = "http://apis.data.go.kr/B552584/EvCharger/getChargerInfo";
const params = {
  numOfRows: "9999",
  pageNo: "1",
  zscode: "46110",
};

// Create a URLSearchParams object from the params object
const searchParams = new URLSearchParams(params);

// Append serviceKey without encoding
const queryString = `${searchParams.toString()}&serviceKey=${serviceKey}&dataType=JSON`;

export async function generateStaticParams() {
  try {
    const response = await fetch(`${url}?${queryString}`);
    const responseBody = await response.text(); // Get the response body as text

    if (response.status !== 200) {
      return [];
    }
    const data = JSON.parse(responseBody); // Parse the response body
    const stations = data.items.item;
    console.log(stations);
    const slugs = stations.map((st) =>
      st.statNm.replace(/\s/g, "-").toLowerCase()
    );
    return slugs;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

const Page = ({ params }: { params: { slug: string } }) => {
  console.log(params);
  return <div>{params.slug}</div>;
};
export default Page;
