import React from 'react';

const BotonFlotante = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
    >
      +
    </button>
  );
};

export default BotonFlotante;
