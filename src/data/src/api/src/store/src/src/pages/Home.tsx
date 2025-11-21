import React from 'react';
import { StoryList } from '../components/Story/StoryList';
import { useStore } from '../store/useStore';

export const Home: React.FC = () => {
  const { stories, isLoading } = useStore();
  
  if (isLoading) {
    return <div className="p-10 text-center text-gray-500">Đang tải dữ liệu từ máy chủ...</div>;
  }

  if (!stories || stories.length === 0) {
    return <div className="p-10 text-center text-gray-500">Chưa có truyện nào.</div>;
  }

  const popularStories = [...stories].sort((a, b) => b.views - a.views);
  const newStories = [...stories].sort((a, b) => b.id.localeCompare(a.id));

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      {popularStories.length > 0 && (
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] hidden md:block">
          <img 
            src={popularStories[0].cover} 
            alt={popularStories[0].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-12">
            <div className="max-w-xl text-white space-y-4">
              <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-bold">Nổi bật nhất</span>
              <h1 className="text-4xl font-bold">{popularStories[0].title}</h1>
              <p className="text-gray-200 line-clamp-2">{popularStories[0].description}</p>
              <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors">
                Đọc ngay
              </button>
            </div>
          </div>
        </div>
      )}

      <StoryList title="Truyện Hot" stories={popularStories} />
      <StoryList title="Mới Cập Nhật" stories={newStories} />
    </div>
  );
};
