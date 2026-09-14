'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Camera, HardDrive, Zap, Check, Folder } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  secure_url: string;
  created_at: string;
  bytes: number;
  format: string;
  width: number;
  height: number;
  folder: string;
  filename: string;
  tags: string[];
}

// Fast Cloudinary thumbnail generator to prevent downloading full-res images in gallery grid
const getCloudinaryThumbUrl = (url: string, width = 360) => {
  if (!url) return '';
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/c_limit,w_${width},q_auto,f_auto/`);
  }
  return url;
};

export default function CloudinaryGalleryClient() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storedPassword, setStoredPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [totalBytes, setTotalBytes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Search, Filters & Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'size_desc' | 'size_asc' | 'name'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain'); // Default contain for passport photos
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  // Pagination
  const [pageSize, setPageSize] = useState<number>(36);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Selection & Actions
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<Set<string>>(new Set());
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [batchDownloading, setBatchDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    const savedPwd = sessionStorage.getItem('cloudinary_gallery_auth');
    if (savedPwd) {
      setStoredPassword(savedPwd);
      fetchPhotos(savedPwd);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const trimmed = password.trim();
    if (!trimmed) {
      setAuthError('Please enter password');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/cloudinary-gallery/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: trimmed }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || 'Incorrect password. Please try again.');
        setLoading(false);
        return;
      }

      sessionStorage.setItem('cloudinary_gallery_auth', trimmed);
      setIsAuthenticated(true);
      setStoredPassword(trimmed);
      setPhotos(data.photos || []);
      setTotalBytes(data.totalBytes || 0);
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('cloudinary_gallery_auth');
    setIsAuthenticated(false);
    setStoredPassword('');
    setPassword('');
    setPhotos([]);
    setSelectedPhotoIds(new Set());
  };

  const fetchPhotos = async (pwd: string, forceRefresh = false) => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await fetch('/api/cloudinary-gallery/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd, refresh: forceRefresh }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch photos');
      }

      setPhotos(data.photos || []);
      setTotalBytes(data.totalBytes || 0);
    } catch (err: any) {
      setFetchError(err.message || 'An error occurred while loading images');
      if (err.message.includes('password') || err.message.includes('Unauthorized')) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('cloudinary_gallery_auth');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (isoString: string): { exact: string; relative: string } => {
    if (!isoString) return { exact: 'Unknown date', relative: 'Unknown' };
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return { exact: isoString, relative: 'Unknown' };

    const formattedExact = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let relativeTime = '';
    if (diffMins < 1) relativeTime = 'Just now';
    else if (diffMins < 60) relativeTime = `${diffMins}m ago`;
    else if (diffHours < 24) relativeTime = `${diffHours}h ago`;
    else relativeTime = `${diffDays}d ago`;

    return { exact: formattedExact, relative: relativeTime };
  };

  const handleSingleDownload = async (photo: Photo) => {
    setDownloadingId(photo.id);
    try {
      const downloadUrl = `/api/cloudinary-gallery/download?url=${encodeURIComponent(
        photo.secure_url || photo.url
      )}&filename=${encodeURIComponent(photo.filename)}&pwd=${encodeURIComponent(storedPassword)}`;

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = photo.filename.includes('.')
        ? photo.filename
        : `${photo.filename}.${photo.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast(`Downloading ${photo.filename}...`);
    } catch (error) {
      showToast('Download failed. Try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleBatchDownload = async () => {
    if (selectedPhotoIds.size === 0) return;
    setBatchDownloading(true);
    showToast(`Starting batch download of ${selectedPhotoIds.size} images...`);

    const selectedPhotos = photos.filter((p) => selectedPhotoIds.has(p.id));

    for (let i = 0; i < selectedPhotos.length; i++) {
      const photo = selectedPhotos[i];
      await handleSingleDownload(photo);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    setBatchDownloading(false);
    showToast('Batch download complete!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied URL to clipboard!');
  };

  const toggleSelectPhoto = (id: string) => {
    const next = new Set(selectedPhotoIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedPhotoIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedPhotoIds.size === filteredPhotos.length) {
      setSelectedPhotoIds(new Set());
    } else {
      setSelectedPhotoIds(new Set(filteredPhotos.map((p) => p.id)));
    }
  };

  // Distinct Folders & Formats for Filtering
  const availableFolders = useMemo(() => {
    const set = new Set<string>();
    photos.forEach((p) => {
      if (p.folder) set.add(p.folder);
    });
    return Array.from(set).sort();
  }, [photos]);

  const availableFormats = useMemo(() => {
    const set = new Set<string>();
    photos.forEach((p) => {
      if (p.format) set.add(p.format.toUpperCase());
    });
    return Array.from(set).sort();
  }, [photos]);

  // Filtering & Sorting
  const filteredPhotos = useMemo(() => {
    let result = [...photos];

    if (selectedFolder !== 'all') {
      result = result.filter((p) => p.folder === selectedFolder);
    }

    if (selectedFormat !== 'all') {
      result = result.filter((p) => p.format.toUpperCase() === selectedFormat);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.filename.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.folder.toLowerCase().includes(q) ||
          p.format.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sortBy === 'size_desc') {
        return b.bytes - a.bytes;
      }
      if (sortBy === 'size_asc') {
        return a.bytes - b.bytes;
      }
      if (sortBy === 'name') {
        return a.filename.localeCompare(b.filename);
      }
      return 0;
    });

    return result;
  }, [photos, searchQuery, sortBy, selectedFolder, selectedFormat]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, selectedFolder, selectedFormat, pageSize]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredPhotos.length / pageSize);
  const paginatedPhotos = useMemo(() => {
    if (pageSize === 0) return filteredPhotos; // All
    const start = (currentPage - 1) * pageSize;
    return filteredPhotos.slice(start, start + pageSize);
  }, [filteredPhotos, currentPage, pageSize]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === 'Escape') {
        setActivePhoto(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
        if (currentIndex < filteredPhotos.length - 1) {
          setActivePhoto(filteredPhotos[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
        if (currentIndex > 0) {
          setActivePhoto(filteredPhotos[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, filteredPhotos]);

  // Canvas background pattern style for transparent PNGs
  const checkeredBgStyle = {
    background: 'repeating-conic-gradient(#f1f5f9 0% 25%, #ffffff 0% 50%) 50% / 16px 16px',
  };

  // Render Password Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-xl p-6 sm:p-8 transition-all">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 mb-4 shadow-sm">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Cloudinary Vault</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Enter password to access stored photos
            </p>
            <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Google No-Index Protected
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Access Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all pr-12 text-sm font-medium"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1.5"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.03 10.03 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-4.692-4.692a3 3 0 00-4.243-4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs sm:text-sm flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Unlock Vault</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Unlocked Gallery Interface
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 sm:pb-16 antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-slate-900 text-white px-4 sm:px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-5">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Logo & Title */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm shadow-indigo-600/30">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight truncate">
                    Cloudinary Vault
                  </h1>
                  <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                    NO-INDEX
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 truncate hidden sm:block">
                  Live Cloudinary asset manager with timestamps & responsive viewport controls
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => fetchPhotos(storedPassword, true)}
                disabled={loading}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
                title="Refresh Cloudinary images"
              >
                <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="hidden xs:inline">Refresh</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-700 hover:text-rose-700 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5"
                title="Lock and sign out"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden xs:inline">Lock</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* KPI Dashboard Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Total Images</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
                <Camera className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 mt-1">{photos.length}</div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Storage Size</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs">
                <HardDrive className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-lg sm:text-2xl lg:text-3xl font-black text-indigo-600 mt-1 truncate">{formatFileSize(totalBytes)}</div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Latest Upload</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs">
                <Zap className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-sm sm:text-lg lg:text-xl font-bold text-emerald-600 mt-1 truncate">
              {photos.length > 0 ? formatDate(photos[0].created_at).relative : 'N/A'}
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Selected</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
                <Check className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="text-lg sm:text-2xl lg:text-3xl font-black text-amber-600 mt-1">{selectedPhotoIds.size}</div>
          </div>
        </div>

        {/* Toolbar & Filter Panel */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-xs space-y-3 sm:space-y-4">
          {/* Top Row: Search & Action Buttons */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 min-w-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by filename, folder, or format..."
                className="w-full pl-10 sm:pl-11 pr-14 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-semibold px-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[11px] sm:text-xs font-semibold text-slate-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="size_desc">Largest Size</option>
                  <option value="size_asc">Smallest Size</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              {/* Fit Mode Toggle (Contain / Cover) */}
              <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setFitMode('contain')}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1 ${
                    fitMode === 'contain' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Fit whole image without cropping heads or faces (Passport Mode)"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>Fit (Full)</span>
                </button>
                <button
                  onClick={() => setFitMode('cover')}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1 ${
                    fitMode === 'cover' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Fill card edge to edge"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
                  </svg>
                  <span>Fill</span>
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'list' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="List View"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Select All */}
              <button
                onClick={toggleSelectAll}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all shrink-0"
              >
                {selectedPhotoIds.size === filteredPhotos.length && filteredPhotos.length > 0
                  ? 'Deselect All'
                  : `Select All (${filteredPhotos.length})`}
              </button>

              {/* Batch Download Button on Desktop */}
              {selectedPhotoIds.size > 0 && (
                <button
                  onClick={handleBatchDownload}
                  disabled={batchDownloading}
                  className="hidden sm:inline-flex px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all items-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download ({selectedPhotoIds.size})</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Chips: Folders & Formats */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Folder:</span>
            <button
              onClick={() => setSelectedFolder('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedFolder === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              All Folders
            </button>
            {availableFolders.map((folder) => (
              <button
                key={folder}
                onClick={() => setSelectedFolder(folder)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all truncate max-w-[160px] sm:max-w-none flex items-center gap-1.5 ${
                  selectedFolder === folder
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
                title={folder}
              >
                <Folder className="w-3 h-3 text-indigo-500 shrink-0" />
                <span>{folder}</span>
              </button>
            ))}

            {availableFormats.length > 1 && (
              <>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-2 mr-1">Format:</span>
                <button
                  onClick={() => setSelectedFormat('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedFormat === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  All
                </button>
                {availableFormats.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                      selectedFormat === fmt
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent mb-4"></div>
            <p className="text-slate-500 font-medium text-sm">Fetching images from Cloudinary...</p>
          </div>
        )}

        {/* Error Alert */}
        {fetchError && !loading && (
          <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center my-8">
            <p className="text-rose-700 font-bold mb-1">Error Loading Images</p>
            <p className="text-slate-600 text-sm mb-4">{fetchError}</p>
            <button
              onClick={() => fetchPhotos(storedPassword, true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !fetchError && filteredPhotos.length === 0 && (
          <div className="py-16 text-center bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xs">
            <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-bold text-slate-900">No Images Found</h3>
            <p className="text-slate-500 text-sm mt-1">
              {searchQuery || selectedFolder !== 'all' || selectedFormat !== 'all'
                ? 'No images match your current search and filter criteria.'
                : 'Your Cloudinary bucket contains no images.'}
            </p>
          </div>
        )}

        {/* Grid View */}
        {!loading && !fetchError && viewMode === 'grid' && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 sm:gap-4 md:gap-5">
            {paginatedPhotos.map((photo) => {
              const dateInfo = formatDate(photo.created_at);
              const isSelected = selectedPhotoIds.has(photo.id);
              const isDownloading = downloadingId === photo.id;

              return (
                <div
                  key={photo.id}
                  className={`group relative bg-white border rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-600/30 bg-indigo-50/10'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  {/* Select Checkbox Overlay */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelectPhoto(photo.id);
                    }}
                    className="absolute top-2 left-2 z-20 p-1 sm:p-1.5 rounded-lg bg-white/90 backdrop-blur-md hover:bg-white border border-slate-200/80 transition-all shadow-xs"
                    title={isSelected ? 'Deselect photo' : 'Select photo'}
                  >
                    <div
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded flex items-center justify-center transition-all ${
                        isSelected ? 'bg-indigo-600 text-white' : 'border border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Format Badge Overlay */}
                  <div className="absolute top-2 right-2 z-20">
                    <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase rounded-md bg-slate-900/80 text-white backdrop-blur-md shadow-xs">
                      {photo.format}
                    </span>
                  </div>

                  {/* Image Container with Smart Aspect Ratio & Checkered Canvas for Transparent Cutouts */}
                  <div
                    onClick={() => setActivePhoto(photo)}
                    style={checkeredBgStyle}
                    className="relative aspect-[3/4] cursor-pointer overflow-hidden flex items-center justify-center group-hover:opacity-95 transition-opacity"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getCloudinaryThumbUrl(photo.secure_url || photo.url, 400)}
                      alt={photo.filename}
                      className={`w-full h-full transition-transform duration-300 group-hover:scale-102 ${
                        fitMode === 'contain'
                          ? 'object-contain p-2 sm:p-2.5'
                          : 'object-cover'
                      }`}
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Hover Overlay on Desktop */}
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[1.5px] pointer-events-none sm:pointer-events-auto">
                      <span className="px-3 py-1.5 rounded-xl bg-white/95 text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 border border-slate-200">
                        <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview
                      </span>
                    </div>
                  </div>

                  {/* Card Metadata & Actions */}
                  <div className="p-2.5 sm:p-3.5 space-y-2 sm:space-y-2.5 bg-white flex-1 flex flex-col justify-between">
                    {/* Filename & Folder */}
                    <div>
                      <h4
                        className="text-xs sm:text-sm font-bold text-slate-900 truncate leading-tight"
                        title={photo.filename}
                      >
                        {photo.filename}
                      </h4>
                      {photo.folder ? (
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 flex items-center gap-1 truncate mt-0.5">
                          <Folder className="w-3 h-3 text-slate-400 shrink-0" /> {photo.folder}
                        </span>
                      ) : (
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 flex items-center gap-1 truncate mt-0.5">
                          <Folder className="w-3 h-3 text-slate-400 shrink-0" /> root
                        </span>
                      )}
                    </div>

                    {/* Timestamp & Technical Specs */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-1.5 sm:p-2 space-y-0.5 sm:space-y-1">
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
                        <span className="text-slate-500 font-medium truncate">Uploaded:</span>
                        <span className="text-indigo-600 font-extrabold truncate ml-1">{dateInfo.relative}</span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-500 font-medium">
                        <span className="truncate">{photo.width} × {photo.height}</span>
                        <span className="font-mono truncate ml-1">{formatFileSize(photo.bytes)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-slate-100">
                      {/* Direct Download Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSingleDownload(photo);
                        }}
                        disabled={isDownloading}
                        className="py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 disabled:opacity-50 shadow-xs"
                        title="Download original file"
                      >
                        {isDownloading ? (
                          <span className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        )}
                        <span className="truncate">Download</span>
                      </button>

                      {/* Copy Link Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(photo.secure_url || photo.url);
                        }}
                        className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center gap-1 truncate"
                        title="Copy direct Cloudinary URL"
                      >
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        <span className="truncate">Copy</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Responsive List View */}
        {!loading && !fetchError && viewMode === 'list' && filteredPhotos.length > 0 && (
          <div className="space-y-3">
            {/* Desktop Table (hidden on mobile) */}
            <div className="hidden md:block bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-3.5 w-10">
                        <input
                          type="checkbox"
                          checked={selectedPhotoIds.size === filteredPhotos.length && filteredPhotos.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </th>
                      <th className="p-3.5 w-16">Preview</th>
                      <th className="p-3.5">Filename</th>
                      <th className="p-3.5">Folder</th>
                      <th className="p-3.5">Uploaded</th>
                      <th className="p-3.5">Dimensions</th>
                      <th className="p-3.5">Size</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedPhotos.map((photo) => {
                      const dateInfo = formatDate(photo.created_at);
                      const isSelected = selectedPhotoIds.has(photo.id);

                      return (
                        <tr
                          key={photo.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isSelected ? 'bg-indigo-50/40' : ''
                          }`}
                        >
                          <td className="p-3.5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectPhoto(photo.id)}
                              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </td>
                          <td className="p-3.5">
                            <div
                              onClick={() => setActivePhoto(photo)}
                              style={checkeredBgStyle}
                              className="w-12 h-14 rounded-lg overflow-hidden cursor-pointer border border-slate-200 flex items-center justify-center shrink-0"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={getCloudinaryThumbUrl(photo.secure_url || photo.url, 120)}
                                alt={photo.filename}
                                className="w-full h-full object-contain p-1"
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 max-w-[220px] truncate" title={photo.filename}>
                              {photo.filename}
                            </div>
                            <div className="text-xs text-slate-400 font-mono uppercase">
                              {photo.format}
                            </div>
                          </td>
                          <td className="p-3.5 whitespace-nowrap text-slate-600 font-medium text-xs">
                            <span className="inline-flex items-center gap-1">
                              <Folder className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{photo.folder ? photo.folder : 'root'}</span>
                            </span>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <div className="text-xs font-bold text-indigo-600">
                              {dateInfo.relative}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {dateInfo.exact}
                            </div>
                          </td>
                          <td className="p-3.5 whitespace-nowrap text-slate-600 font-medium text-xs">
                            {photo.width} × {photo.height}
                          </td>
                          <td className="p-3.5 whitespace-nowrap text-slate-600 font-medium text-xs font-mono">
                            {formatFileSize(photo.bytes)}
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                            <button
                              onClick={() => handleSingleDownload(photo)}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1 shadow-xs"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              <span>Download</span>
                            </button>

                            <button
                              onClick={() => copyToClipboard(photo.secure_url || photo.url)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all"
                            >
                              Copy Link
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile List Cards (smooth on small viewports without horizontal scroll) */}
            <div className="block md:hidden space-y-2.5">
              {paginatedPhotos.map((photo) => {
                const dateInfo = formatDate(photo.created_at);
                const isSelected = selectedPhotoIds.has(photo.id);

                return (
                  <div
                    key={photo.id}
                    className={`bg-white border rounded-2xl p-3 flex items-center gap-3 transition-all ${
                      isSelected ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-200/90'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectPhoto(photo.id)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
                    />

                    {/* Thumbnail */}
                    <div
                      onClick={() => setActivePhoto(photo)}
                      style={checkeredBgStyle}
                      className="w-14 h-16 rounded-xl overflow-hidden cursor-pointer border border-slate-200 flex items-center justify-center shrink-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getCloudinaryThumbUrl(photo.secure_url || photo.url, 150)}
                        alt={photo.filename}
                        className="w-full h-full object-contain p-1"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs text-slate-900 truncate" title={photo.filename}>
                        {photo.filename}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5 truncate">
                        <span className="font-bold text-indigo-600">{dateInfo.relative}</span>
                        <span>•</span>
                        <span>{formatFileSize(photo.bytes)}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate mt-0.5">
                        {photo.width}×{photo.height} • {photo.format.toUpperCase()}
                      </div>
                    </div>

                    {/* Quick Download / Copy */}
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => handleSingleDownload(photo)}
                        className="p-2 bg-indigo-600 text-white rounded-lg transition-all"
                        title="Download"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button
                        onClick={() => copyToClipboard(photo.secure_url || photo.url)}
                        className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all"
                        title="Copy Link"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Responsive Pagination Controls */}
        {!loading && !fetchError && filteredPhotos.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            {/* Range info & Page size selector */}
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span>
                Showing{' '}
                <strong className="text-slate-900">
                  {pageSize === 0 ? filteredPhotos.length : Math.min(filteredPhotos.length, (currentPage - 1) * pageSize + 1)}
                  -
                  {pageSize === 0 ? filteredPhotos.length : Math.min(filteredPhotos.length, currentPage * pageSize)}
                </strong>{' '}
                of <strong className="text-slate-900">{filteredPhotos.length}</strong> photos
              </span>

              <div className="flex items-center gap-1">
                <span className="text-slate-400">|</span>
                <span className="text-[11px] font-semibold text-slate-500">Per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                >
                  <option value={24}>24</option>
                  <option value={36}>36</option>
                  <option value={60}>60</option>
                  <option value={120}>120</option>
                  <option value={0}>All</option>
                </select>
              </div>
            </div>

            {/* Pagination Navigation */}
            {pageSize > 0 && totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-bold transition-all"
                >
                  Prev
                </button>

                <div className="px-2 text-xs font-bold text-slate-700">
                  Page {currentPage} of {totalPages}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-bold transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Bottom Action Bar on Mobile for Selected Items */}
      {selectedPhotoIds.size > 0 && (
        <div className="fixed bottom-3 inset-x-3 sm:hidden z-40 bg-slate-900/95 text-white p-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between gap-2 border border-slate-700/80 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center">
              {selectedPhotoIds.size}
            </span>
            <span className="text-xs font-semibold">Selected</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedPhotoIds(new Set())}
              className="px-2.5 py-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-medium"
            >
              Clear
            </button>

            <button
              onClick={handleBatchDownload}
              disabled={batchDownloading}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      )}

      {/* Lightbox / Fullscreen Image Viewer Modal (Mobile-First Responsive Design) */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
          <div className="relative w-full h-full sm:h-auto sm:max-h-[92vh] max-w-5xl bg-white sm:border sm:border-slate-200 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 rounded-full bg-slate-900/80 sm:bg-white text-white sm:text-slate-600 hover:text-slate-900 border border-slate-700 sm:border-slate-200 transition-all shadow-md"
              title="Close viewer (Esc)"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Preview Theater */}
            <div className="flex-1 bg-slate-950 p-4 sm:p-6 flex items-center justify-center relative min-h-[260px] sm:min-h-[360px] md:min-h-[500px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePhoto.secure_url || activePhoto.url}
                alt={activePhoto.filename}
                className="max-w-full max-h-[42vh] sm:max-h-[55vh] md:max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={() => {
                  const idx = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
                  if (idx > 0) setActivePhoto(filteredPhotos[idx - 1]);
                }}
                disabled={filteredPhotos.findIndex((p) => p.id === activePhoto.id) === 0}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-slate-900/80 text-white border border-slate-700 hover:bg-slate-800 disabled:opacity-30 transition-all shadow-md"
                title="Previous photo (Left Arrow)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => {
                  const idx = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
                  if (idx < filteredPhotos.length - 1) setActivePhoto(filteredPhotos[idx + 1]);
                }}
                disabled={filteredPhotos.findIndex((p) => p.id === activePhoto.id) === filteredPhotos.length - 1}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-slate-900/80 text-white border border-slate-700 hover:bg-slate-800 disabled:opacity-30 transition-all shadow-md"
                title="Next photo (Right Arrow)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Sidebar Details Panel */}
            <div className="w-full md:w-80 p-4 sm:p-6 bg-white border-t md:border-t-0 md:border-l border-slate-200 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-none">
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 break-all leading-snug">
                    {activePhoto.filename}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono mt-1 block truncate">
                    ID: {activePhoto.id}
                  </span>
                </div>

                {/* Upload Timestamp Info */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-3.5 space-y-1">
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Upload Timestamp
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-indigo-600">
                    {formatDate(activePhoto.created_at).relative}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-mono">
                    {formatDate(activePhoto.created_at).exact}
                  </div>
                </div>

                {/* Metadata Table */}
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Format</span>
                    <span className="text-slate-900 font-bold uppercase">{activePhoto.format}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Resolution</span>
                    <span className="text-slate-900 font-bold">{activePhoto.width} × {activePhoto.height} px</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">File Size</span>
                    <span className="text-slate-900 font-bold">{formatFileSize(activePhoto.bytes)}</span>
                  </div>

                  {activePhoto.folder && (
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Folder</span>
                      <span className="text-slate-900 font-bold truncate max-w-[150px]">{activePhoto.folder}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons inside Lightbox */}
              <div className="pt-4 sm:pt-6 space-y-2 sm:space-y-2.5">
                <button
                  onClick={() => handleSingleDownload(activePhoto)}
                  className="w-full py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 text-xs sm:text-sm"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Image</span>
                </button>

                <button
                  onClick={() => copyToClipboard(activePhoto.secure_url || activePhoto.url)}
                  className="w-full py-2 sm:py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-semibold rounded-xl transition-all text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>Copy Cloudinary URL</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
