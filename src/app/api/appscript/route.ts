import {NextResponse} from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const appScriptUrl = process.env.GOOGLE_SHEETS_APPSCRIPT_URL;
        if (!appScriptUrl) {
            throw new Error("Environment variable GOOGLE_SHEETS_APPSCRIPT_URL is not defined.");
        }
        const res = await fetch(appScriptUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        return NextResponse.json({success: true, data}, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {success: false, error: (error as Error).message},
            {status: 500}
        );
    }
}
