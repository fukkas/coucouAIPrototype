"use client"
import React, { useState } from 'react';
import './home.css';

const ImageDropZone = () => {
  const [images, setImages] = useState<{ name: string; type: string; data: string }[]>([]);

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile && droppedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async () => {
        const newImage = {
          name: droppedFile.name,
          type: droppedFile.type,
          data: reader.result as string,
        };
        setImages((prevImages) => [newImage, ...prevImages]);

        // Appel à l'API de prédiction
        try {
          const response = await fetch('/pages/api/predict', {
            method: 'POST',
            body: droppedFile,
          });

          const result = await response.text();
          console.log('Résultat de la prédiction :', result);
          // Mettez à jour votre interface avec les résultats de la prédiction
        } catch (error) {
          console.error('Erreur lors de la prédiction :', error);
        }
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <main className='main-container'>
       <div
        className='drop-zone'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {images.length > 0 ? (
          <img
            src={images[0].data}
            alt={images[0].name}
            className='main-image'
          />
        ) : (
          <p>Drag and drop picture here</p>
        )}
      </div>
      <div className='image-table-container'>
        <table className='image-table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={image.data}
                    alt={image.name}
                    className='table-image'
                  />
                </td>
                <td>{image.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ImageDropZone;
