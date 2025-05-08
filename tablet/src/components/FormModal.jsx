"use client";

import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import QuestionForm from './QuestionForm';

const FormModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl mx-4 overflow-hidden transform transition-all duration-300 ease-in-out"
      >
        <div className="flex items-center justify-between border-t-7 border-teal-800 p-4">
          <h3 className="text-[22px] font-semibold text-teal-700">Ask Your Question</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-7">
          <QuestionForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default FormModal;