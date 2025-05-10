import { ReactNode } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import Link from 'next/link';

interface PremiumFeatureProps {
  children: ReactNode;
  featureName: string;
}

export function PremiumFeature({ children, featureName }: PremiumFeatureProps) {
  const { hasAccess, loading } = useSubscription();

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg"></div>
        <div className="relative p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {featureName} is a premium feature
          </div>
          <Link
            href="/pricing"
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 