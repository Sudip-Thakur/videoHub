import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants.js';

const Create = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    description: '',
    isPublished: 'public',
    video: null,
    thumbnail: null
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('isPublished', values.isPublished);
    formData.append('video', values.video);
    formData.append('thumbnail', values.thumbnail);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/videos/upload-video`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true // Ensure cookies are sent with the request
      });
      console.log(response.data);

      setSuccessMessage('Video uploaded successfully! Redirecting to home...');
      
      // Redirect after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Error uploading video:', error.response ? error.response.data : error.message);
      setSuccessMessage('Failed to upload video');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <h2 className="text-2xl font-bold mb-6">Upload Video</h2>

            <div>
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">Title</label>
              <Field
                id="title"
                name="title"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="title" component="span" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">Description</label>
              <Field
                id="description"
                name="description"
                as="textarea"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="description" component="span" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="isPublished" className="block text-gray-700 font-semibold mb-1">Publication Status</label>
              <Field
                id="isPublished"
                name="isPublished"
                as="select"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </Field>
              <ErrorMessage name="isPublished" component="span" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="video" className="block text-gray-700 font-semibold mb-1">Video</label>
              <input
                id="video"
                name="video"
                type="file"
                accept="video/*"
                onChange={(event) => setFieldValue('video', event.currentTarget.files[0])}
                className="block w-full text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-100 file:text-sm file:font-semibold hover:file:bg-gray-200"
              />
              <ErrorMessage name="video" component="span" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="thumbnail" className="block text-gray-700 font-semibold mb-1">Thumbnail</label>
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={(event) => setFieldValue('thumbnail', event.currentTarget.files[0])}
                className="block w-full text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-100 file:text-sm file:font-semibold hover:file:bg-gray-200"
              />
              <ErrorMessage name="thumbnail" component="span" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Uploading...' : 'Upload Video'}
            </button>
          </Form>
        )}
      </Formik>

      {/* Display success message */}
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Create;
