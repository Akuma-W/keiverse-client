import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchMyClassroomsThunk } from '@/features/classrooms/classrooms.slice';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userRole } = useAuth();
  const { myClassrooms } = useAppSelector((state) => state.classrooms);

  const [search, setSearch] = useState('');

  // Fetch user's classrooms
  useEffect(() => {
    dispatch(fetchMyClassroomsThunk());
  }, [dispatch]);

  // Filter by title
  const filtered = myClassrooms.filter((cls) =>
    cls.title.toLowerCase().includes(search.toLowerCase().trim()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>

        <div className="flex gap-2">
          <Input
            placeholder="Search classes..."
            className="w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {userRole === 'teacher' && <Button>Create Class</Button>}
        </div>
      </div>

      {/* List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cls) => (
          <Link key={cls.id} to={`/class/${cls.id}`} className="group block">
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              {/* Thumbnail */}
              <div className="h-32 w-full bg-blue-500 relative">
                <Badge className="absolute right-2 top-2 bg-white/20 backdrop-blur-md">
                  Active
                </Badge>
              </div>

              <CardContent className="pt-4">
                <h3 className="text-lg font-bold group-hover:text-primary-600 transition-colors">
                  {cls.title}
                </h3>

                <p className="text-sm text-slate-500 line-clamp-2">
                  {cls.description || 'No description'}
                </p>
              </CardContent>

              <CardFooter className="flex justify-between border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800">
                <span>Code: {cls.code}</span>
                <span>{new Date(cls.createdAt).toLocaleDateString()}</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-center text-slate-500 text-sm">No classes found.</p>
      )}
    </div>
  );
};

export default Dashboard;
