import React from 'react';

interface CardProps {
  id: number;
  title: string;
  imageSrc: string;
}

const Card: React.FC<CardProps> = ({ id, title, imageSrc }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={imageSrc} alt={title} />
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">{title}</p>
      </div>
    </div>
  );
};

export default Card;
