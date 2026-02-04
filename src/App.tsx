import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { fetchProfileThunk } from './features/auth/auth.slice';
import { router } from './routes';
import { useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(fetchProfileThunk());
    }
  }, [dispatch]);
  return (
    <>
      <Toaster richColors position="top-right" duration={1500} closeButton />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
