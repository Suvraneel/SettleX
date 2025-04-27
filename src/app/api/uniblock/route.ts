import {NextResponse} from 'next/server';
import {tokens} from "@lib/tokens";

export async function GET() {
    try {
        const queryParams = new URLSearchParams({
            symbol: tokens.map(token => token.name.toUpperCase()).join(","),
            includeAllCurrencies: 'false',
            includeRaw: 'false'
        });
        const queryString = queryParams.toString();
        console.log(`Query String: ${queryString}`);
        const apiUrl = process.env.UNI_MARKET_DATA_API_URL;
        const apiKey = process.env.UNIBLOCK_API_KEY;

        if (!apiUrl || !apiKey) {
            throw new Error("Missing required environment variable: UNI_MARKET_DATA_API_URL or UNIBLOCK_API_KEY");
        }

        const fullUrl = `${apiUrl}?${queryString}`;
        console.log(`Request URL: ${fullUrl}`);
        const res = await fetch(fullUrl, {
            method: "GET",
            headers: {
                accept: "application/json",
                "X-API-KEY": apiKey
            }
        });

        if (!res.ok) {
            throw new Error(`External API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        return NextResponse.json({success: true, data}, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {success: false, error: (error as Error).message},
            {status: 500}
        );
    }
}