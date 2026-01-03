import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

type BreadcrumbProps = {
  segments: string[];
};

const BreadcrumbC = ({ segments }: BreadcrumbProps) => {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-4 bg-gray-100">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-2 text-sm text-muted-foreground">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={'/'} className="hover:text-foreground transition">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((seg, idx) => {
            const path = '/' + segments.slice(0, idx + 1).join('/');
            const isLast = idx === segments.length - 1;

            return (
              <div key={path} className="flex items-center gap-2">
                <BreadcrumbSeparator />

                {isLast ? (
                  <span className="font-medium text-foreground capitalize">{seg}</span>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={path} className="capitalize hover:text-foreground transition">
                        {seg}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbC;
