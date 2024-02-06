import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    const file = req.body;

    const apiKey = process.env.NEXT_APP_API_KEY;
    const endpoint = process.env.NEXT_APP_ENDPOINT;
    const iterationId = process.env.NEXT_APP_ITERATIONID;

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
      res.status(200).json(result);
    } catch (error) {
      console.error('Error during prediction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;

