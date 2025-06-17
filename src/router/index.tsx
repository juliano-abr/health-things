import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import PhotoUpload from '../pages/PhotoUpload';
import Questions from '../pages/Questions';
import Success from '../pages/Success';

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/photo-upload', element: <PhotoUpload /> },
  { path: '/questions', element: <Questions /> },
  { path: '/success', element: <Success /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default router;