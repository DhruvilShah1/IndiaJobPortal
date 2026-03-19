import React from "react";

const Modal = ({ children, close }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="relative w-200 bg-white border rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">

        {children}

      </div>

    </div>
  );
};

export default Modal;