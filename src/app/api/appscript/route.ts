import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const appScriptUrl = process.env.GOOGLE_SHEETS_APPSCRIPT_URL;
    if (!appScriptUrl) {
      throw new Error(
        "Environment variable GOOGLE_SHEETS_APPSCRIPT_URL is not defined."
      );
    }
    const res = await fetch(appScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("AppScript response:", data);

    if (data.status === "success") {
      return NextResponse.json(
        {
          success: true,
          message: data.message || "Data submitted successfully",
          data,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: data.message || "AppScript returned an error",
          data,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
