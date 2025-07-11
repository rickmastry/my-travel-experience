"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function geocodeAddress(address: string) {
    const apiKey = process.env.ACCESS_TOKEN!;
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiKey}`
    );

    const data = await response.json();

    console.log("Mapbox API response:", JSON.stringify(data, null, 2)); // 🔍 full response
    if (!data.features || data.features.length === 0) {
        throw new Error("No location data returned from Mapbox.");
    }

    const center = data.features[0].center;
    if (!Array.isArray(center) || center.length !== 2) {
        throw new Error("Invalid center array.");
    }

    const [lng, lat] = center;
    console.log("Parsed coordinates:", { lng, lat });

    return { lng, lat };
}

export async function addLocation(formData: FormData, tripId: string) {
    const session = await auth();
    if (!session) {
        throw new Error("Not authenticated")
    }

    const address = formData.get("address")?.toString();
    if (!address) {
        throw new Error("Missing address")
    }
    const { lng, lat } = await geocodeAddress(address);
    console.log("Creating Prisma location with:", { lng, lat });

    const count = await prisma.location.count({
        where: { tripId },
    });

    await prisma.location.create({
        data: {
            locationTitle: address,
            lng,
            lat,
            tripId,
            order: count,
        },
    });

    redirect(`/trips/${tripId}`)

}