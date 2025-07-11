"use client";

import { Location } from "@/app/generated/prisma";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMemo } from "react";


interface MapProps {
    itineraries: Location[];
}

export default function TripMap({ itineraries = [] }: MapProps) {
    const center = useMemo(() => {
        if (itineraries.length === 0) return { longitude: 0, latitude: 0 };
        return {
            longitude: itineraries[0].lng,
            latitude: itineraries[0].lat,
        };
    }, [itineraries]);

    return (
        <div className="w-full h-[500px]">
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                    longitude: center.longitude,
                    latitude: center.latitude,
                    zoom: 8,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                style={{ width: "100%", height: "100%" }}
            >
                {itineraries.map((point, i) => (
                    <Marker
                        key={point.id}
                        longitude={point.lng}
                        latitude={point.lat}
                        anchor="bottom"
                    >
                        <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
                            {i + 1}
                        </div>
                    </Marker>
                ))}
            </Map>
        </div>
    );
}