import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendAvailable = process.env.BACKEND_AVAILABLE === "true";

    if (!backendAvailable) {
      // Mock response for development/testing
      console.log("Using mock backend response for intent:", body);
      return NextResponse.json(
        {
          success: true,
          data: {
            message: "Mock response - backend not available",
            intentId: `mock-${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
            sourceChain: body.sourceChain,
            destChain: body.destChain,
            token: body.token,
            amount: body.amount,
            address: body.address,
            receivingAddress: body.receivingAddress || null,
          },
        },
        { status: 200 }
      );
    }

    // Validate required fields
    const { sourceChain, destChain, token, amount, address } = body;

    if (!sourceChain || !destChain || !token || !amount || !address) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Forward to your Bun backend
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
    console.log(`Attempting to connect to backend at: ${backendUrl}/intent`);

    const response = await fetch(`${backendUrl}/intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any auth headers if needed
        // 'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Backend error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Bridge API error:", error);

    // Check if it's a connection error and suggest using mock mode
    if (
      error instanceof Error &&
      error.cause &&
      typeof error.cause === "object" &&
      "code" in error.cause &&
      (error.cause as { code: string }).code === "ECONNREFUSED"
    ) {
      console.log(
        "Backend connection refused. Consider setting BACKEND_AVAILABLE=false for development."
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Backend server is not available. Please ensure the backend is running or enable mock mode.",
          suggestion:
            "Set BACKEND_AVAILABLE=false in your .env.local file to use mock responses during development.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
