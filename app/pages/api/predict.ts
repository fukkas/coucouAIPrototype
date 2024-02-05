import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    const file = req.body;

    const apiKey = '0b7c44517f024fa7bfbccd8080fea1c4';
    const endpoint = 'https://catsvsdogsprototype-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/39fe0cd0-a9dc-4b79-8d41-fa8c0064385f/classify/iterations/CatsVsDogsModel-1/image';
    const iterationId = '3c465be5-82ea-4b37-b21c-05e15529553f';

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

