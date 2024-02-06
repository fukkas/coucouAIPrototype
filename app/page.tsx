"use client"
import React, { useState } from 'react';
import './home.css';


const ImageDropZone = () => {
  const [images, setImages] = useState<{ name: string; type: string; data: string }[]>([]);
  const [imageNotUpload, setImageNotUpload] = useState<{ name: string; type: string; data: string } | undefined>();

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
        setImageNotUpload(newImage);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const uploadFile = async () => {
    if (imageNotUpload != null) {
      try {
        const response = await fetch('/pages/api/', {
          method: 'POST',
          body: new Blob([imageNotUpload.data]),
        });

        const result = await response.text();
        console.log('Résultat de la prédiction :', result);

        // Mettez à jour votre interface avec les résultats de la prédiction
        setImages((prevImages) => [imageNotUpload, ...prevImages]);
        setImageNotUpload(undefined);
      } catch (error) {
        console.error('Erreur lors de la prédiction :', error);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <main className='main-container'>
      <div className='dropContainer'>
        <div
          className='drop-zone'
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {imageNotUpload ? (
            <img
              src={imageNotUpload.data}
              alt={imageNotUpload.name}
              className='main-image'
            />
          ) : (
            <div></div>
          )}
          <div>
            <p>Drag and drop picture here</p>
          </div>
        </div>
        <button className="uploadBtn" onClick={uploadFile}><span className="uploadBtnSpan">Upload</span></button>
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
