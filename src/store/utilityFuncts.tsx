const GEO_APIFY_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;


export async function fetchGeoapifyData(address:string) {
    
    const apiUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&format=json&apiKey=${GEO_APIFY_KEY}`;
    
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`Error fetching Geoapify data: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error fetching Geoapify data:', error.message);
      throw error;
    }
  }



// utils/geoapify.js
export async function fetchGeoapifyIsochrones(lat:number, lon:number, mode:string, time:number) {
  const apiUrl =`https://api.geoapify.com/v1/isoline?lat=${lat}&lon=${lon}&type=time&mode=${mode}&range=${time}&apiKey=${GEO_APIFY_KEY!}`

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching Geoapify data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching Geoapify data:', error.message);
    throw error;
  }
}
  