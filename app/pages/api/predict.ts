// pages/api/predict.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const file = req.body;

    // Effectuez l'appel à l'API Custom Vision ici avec le fichier image
    // Utilisez les clés et l'URL de prédiction

    const apiKey = '0b7c44517f024fa7bfbccd8080fea1c4';
    const endpoint = 'https://catsvsdogsprototype-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/39fe0cd0-a9dc-4b79-8d41-fa8c0064385f/classify/iterations/CatsVsDogsModel-1/image';

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Prediction-Key': apiKey,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const result = await response.json();
    res.status(200).json(result);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
