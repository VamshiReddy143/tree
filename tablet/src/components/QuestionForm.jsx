"use client";

import React, { useState } from 'react';

const QuestionForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
    region: '',
    newsletter: false,
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.question.trim()) newErrors.question = 'Question is required';
    if (!formData.region) newErrors.region = 'Region is required';
    if (!formData.newsletter) newErrors.newsletter = 'You must subscribe to the newsletter';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Simulate submission without backend
    setSubmissionStatus({ type: 'success', message: 'Thank you' });
    setFormData({ name: '', email: '', question: '', region: '', newsletter: false });
    if (onClose) setTimeout(onClose, 2000);

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-auto font-sans">
      <h2 className="text-3xl font-bold text-teal-800 mb-6 text-center tracking-tight">
        Submit Your Question
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-800">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 shadow-sm transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:outline-none focus:ring-teal-500 focus:ring-opacity-50 ${
              errors.name ? 'border-red-400' : ''
            }`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-800">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 shadow-sm transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:outline-none focus:ring-teal-500 focus:ring-opacity-50 ${
              errors.email ? 'border-red-400' : ''
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-800">
            Region
          </label>
          <div className="relative">
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className={`mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 shadow-sm transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:outline-none focus:ring-teal-500 focus:ring-opacity-50 appearance-none ${
                errors.region ? 'border-red-400' : ''
              }`}
            >
              <option value="" disabled>Select a region</option>
              <option value="West Coast">West Coast</option>
              <option value="Central Canada">Central Canada</option>
              <option value="Ottawa Region">Ottawa Region</option>
              <option value="East Coast">East Coast</option>
              <option value="Northern Territories">Northern Territories</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {errors.region && (
            <p className="text-red-500 text-xs mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.region}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-800">
            Your Question
          </label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            rows={5}
            className={`mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 shadow-sm transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:outline-none focus:ring-teal-500 focus:ring-opacity-50 ${
              errors.question ? 'border-red-400' : ''
            }`}
            placeholder="Type your question here..."
          ></textarea>
          {errors.question && (
            <p className="text-red-500 text-xs mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.question}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className={`h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded transition-all duration-200 ${
              errors.newsletter ? 'border-red-400' : ''
            }`}
          />
          <label htmlFor="newsletter" className="ml-3 block text-sm font-medium text-gray-800">
            I am over 16 and wish to subscribe to the newsletter
          </label>
        </div>
        {errors.newsletter && (
          <p className="text-red-500 text-xs mt-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.newsletter}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg shadow-md hover:from-teal-700 hover:to-teal-800 transition-all duration-300 flex items-center justify-center ${
            isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
      {submissionStatus && (
        <p
          className={`mt-6 text-center text-sm flex items-center justify-center ${
            submissionStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {submissionStatus.type === 'success' && (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {submissionStatus.message}
        </p>
      )}
    </div>
  );
};

export default QuestionForm;