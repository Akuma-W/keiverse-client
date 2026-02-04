import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateGradient = (seed: string) => {
  // Simple deterministic gradient generator for demo
  const gradients = [
    'bg-gradient-to-r from-blue-600 to-indigo-600',
    'bg-gradient-to-r from-emerald-500 to-teal-500',
    'bg-gradient-to-r from-purple-600 to-pink-600',
    'bg-gradient-to-r from-orange-500 to-red-500',
  ];
  return gradients[seed.length % gradients.length];
};
