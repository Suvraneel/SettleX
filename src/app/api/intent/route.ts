import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const mockBackend = !process.env.BACKEND_AVAILABLE;

        if (mockBackend) {
            // Mock response for development/testing
            return NextResponse.json(
                {
                    success: true,
                    data: {
                        message: 'Mock response - backend not available',
                        intentId: 'mock-intent-id',
                        sourceChain: body.sourceChain,
                        destChain: body.destChain,
                        token: body.token,
                        amount: body.amount,
                        address: body.address,
                        receivingAddress: body.receivingAddress || null
                    }
                },
                {status: 200}
            );
        }

        // Validate required fields
        const {sourceChain, destChain, token, amount, address} = body;

        if (!sourceChain || !destChain || !token || !amount || !address) {
            return NextResponse.json(
                {success: false, error: 'Missing required fields'},
                {status: 400}
            );
        }

        // Forward to your Bun backend
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
        const response = await fetch(`${backendUrl}/intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any auth headers if needed
                // 'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Backend error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json({success: true, data}, {status: 200});

    } catch (error) {
        console.error('Bridge API error:', error);
        return NextResponse.json(
            {success: false, error: (error as Error).message},
            {status: 500}
        );
    }
}