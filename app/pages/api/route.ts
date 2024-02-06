import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import axios from 'axios';

// Named export for handling POST requests
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const file = req.body;

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
  const iterationId = process.env.NEXT_PUBLIC_ITERATIONID;
  console.log("hello");
  try {
    const response = await axios.post(
      `${endpoint}/predict?iterationId=${iterationId}`,
      file,
      {
        headers: {
          'Prediction-Key': apiKey,
          'Content-Type': 'application/octet-stream',
        },
      }
    );

    const result = response.data;
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error during prediction:', error);
    return NextResponse.json({ error: 'Internal Server Error ss' });
  }
}

// Additional named exports for other HTTP methods can be added as needed
