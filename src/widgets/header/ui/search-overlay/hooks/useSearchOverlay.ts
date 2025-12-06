import { useEffect, useState } from 'react';

interface UseSearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export const useSearchOverlay = ({ open, onClose }: UseSearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle overlay state and escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setDebouncedQuery('');
    }
  }, [open]);

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
  };
};
