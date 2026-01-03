import { WEBSITE } from '@/config';
import { Link } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';

const NotFound = () => {
  usePageTitle({ title: 'Not Found' });
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-gray-800">
      {/* Logo */}
      <img src={WEBSITE.logo} alt="Logo" className="mb-8 w-40 rounded-full" />

      {/* Message */}
      <h1 className="mb-4 text-6xl font-extrabold">404</h1>
      <p className="mb-6 text-center text-xl md:text-2xl">
        Oops! Trang bạn đang tìm kiếm không tồn tại.
      </p>

      {/* Back to Home */}
      <Link
        to={'/'}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow transition hover:bg-blue-700"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
