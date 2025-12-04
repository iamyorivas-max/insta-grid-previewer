import React, { useState } from 'react';
import { Grid } from './components/Grid';
import { Controls } from './components/Controls';
import { ProfileHeader } from './components/ProfileHeader';
import { FeedImage, GridGap, UserProfile } from './types';
import { downloadGrid } from './utils/download';
import { generateAestheticImage } from './services/geminiService';
import { Info } from 'lucide-react';

const App: React.FC = () => {
  const [images, setImages] = useState<FeedImage[]>([]);
  const [gap, setGap] = useState<GridGap>(GridGap.THIN);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    username: 'aavax_call',
    name: 'AAVAX',
    bio: 'Entrepreneuriat\n🎧 AAVAX CALL – Your new work place\n💼 Formation + accompagnement + évolution\n✨ Ambiance jeune & pro\n📩 Postule ici 👉 : aavax.contact@gmail.com',
    link: 'aavaxcallcenter.com/pages/recrutement',
    avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    postsCount: '6',
    followersCount: '490',
    followingCount: '6',
    highlights: [
      { id: '1', title: 'Formation', coverUrl: '' },
      { id: '2', title: 'Événements', coverUrl: '' },
      { id: '3', title: 'Nos valeurs', coverUrl: '' },
      { id: '4', title: 'FAQ', coverUrl: '' },
      { id: '5', title: 'Success', coverUrl: '' },
    ]
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages: FeedImage[] = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file as File),
      }));
      setImages(prev => [...prev, ...newImages]);
      setError(null);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
       const url = URL.createObjectURL(e.target.files[0] as File);
       setProfile(prev => ({ ...prev, avatarUrl: url }));
    }
  };

  const handleHighlightUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const url = URL.createObjectURL(e.target.files[0] as File);
        const newHighlights = [...profile.highlights];
        newHighlights[index] = { ...newHighlights[index], coverUrl: url };
        setProfile(prev => ({ ...prev, highlights: newHighlights }));
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the grid?')) {
        setImages([]);
        setError(null);
    }
  };

  const handleDownload = () => {
    downloadGrid('instagram-feed-preview');
  };

  const handleGenerateAI = async () => {
    if (!process.env.API_KEY) {
        setError("API Key is missing. Please configure the environment.");
        return;
    }
    
    setIsGenerating(true);
    setError(null);
    try {
      const imageUrl = await generateAestheticImage();
      const newImage: FeedImage = {
        id: Math.random().toString(36).substr(2, 9),
        url: imageUrl,
        isAiGenerated: true
      };
      setImages(prev => [...prev, newImage]);
    } catch (err) {
      console.error(err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Left Sidebar / Bottom Sheet for Controls */}
      <div className="w-full md:w-96 p-6 flex flex-col gap-6 border-r border-gray-200 bg-white z-10 md:h-screen md:sticky md:top-0 shadow-sm overflow-y-auto order-2 md:order-1">
        <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">InstaGrid</h1>
            <p className="text-gray-500 text-sm">Plan your aesthetic.</p>
        </div>

        <Controls 
          onUpload={handleFileUpload}
          onDownload={handleDownload}
          onClear={handleClear}
          onGenerateAI={handleGenerateAI}
          isGenerating={isGenerating}
          currentGap={gap}
          setGap={setGap}
          count={images.length}
          profile={profile}
          setProfile={setProfile}
          onAvatarUpload={handleAvatarUpload}
          onHighlightUpload={handleHighlightUpload}
        />

        {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2">
                <Info size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
            </div>
        )}

        <div className="mt-auto pt-6 text-xs text-gray-400 border-t border-gray-100">
           <p>Images are processed locally. AI features powered by Google Gemini.</p>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col items-center p-4 md:p-12 overflow-y-auto order-1 md:order-2 bg-[#fafafa]">
        
        {/* Container that gets downloaded */}
        <div className="w-full max-w-md bg-white shadow-xl ring-1 ring-black/5 overflow-hidden" id="instagram-feed-preview">
            
            {/* Header (Top Nav Mockup) */}
            <div className="hidden md:flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-20">
                <span className="font-semibold text-lg text-gray-900">{profile.username}</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Profile</span>
            </div>
            
            {/* Profile Section */}
            <ProfileHeader profile={profile} />

            {/* The Grid */}
            <div className="bg-white min-h-[300px]">
                <Grid 
                    id="inner-grid"
                    images={images} 
                    gap={gap} 
                    onRemove={handleRemoveImage}
                />
            </div>
        </div>

        {/* Hint */}
        <div className="mt-8 text-center text-gray-400 text-sm">
           <p>Grid items set to 4:5 (1080x1350) aspect ratio.</p>
        </div>

      </div>
    </div>
  );
};

export default App;
