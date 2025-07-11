interface GeocodeResult {
    country: string;
    formattedAddress: string
}



export async function getCountryFromCoordinates(lat: number, lng: number): Promise<GeocodeResult> {
    const apiKey = process.env.ACCESS_TOKEN!;
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${apiKey}`
    );

    const data = await response.json()

    const result = data.features[0].place_name

    return { country: result || "Unknown", formattedAddress: result.formattedAddress }
};

