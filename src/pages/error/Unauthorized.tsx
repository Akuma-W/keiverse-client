import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
      <p className="mb-6">You do not have permission to access this page.</p>
      <Button
        variant={'link'}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => navigate('/')}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default Unauthorized;
