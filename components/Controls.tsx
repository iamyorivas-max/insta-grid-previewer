import React, { useState } from 'react';
import { Upload, Download, Sparkles, Trash, Grid3X3, UserCircle, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react';
import { GridGap, UserProfile } from '../types';

interface ControlsProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
  onClear: () => void;
  onGenerateAI: () => void;
  isGenerating: boolean;
  currentGap: GridGap;
  setGap: (gap: GridGap) => void;
  count: number;
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHighlightUpload: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  onUpload, 
  onDownload, 
  onClear, 
  onGenerateAI, 
  isGenerating,
  currentGap,
  setGap,
  count,
  profile,
  setProfile,
  onAvatarUpload,
  onHighlightUpload
}) => {
  const [showProfileEdit, setShowProfileEdit] = useState(true);
  const [showHighlightEdit, setShowHighlightEdit] = useState(false);

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };
  
  const handleHighlightTitleChange = (index: number, title: string) => {
      const newHighlights = [...profile.highlights];
      newHighlights[index] = { ...newHighlights[index], title };
      setProfile({ ...profile, highlights: newHighlights });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      
      {/* Profile Editor */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button 
          onClick={() => setShowProfileEdit(!showProfileEdit)}
          className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <UserCircle size={18} />
            Edit Profile Info
          </div>
          {showProfileEdit ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {showProfileEdit && (
          <div className="p-4 space-y-4 bg-white">
            <div className="flex items-center gap-4">
               <div className="relative shrink-0 w-16 h-16 rounded-full bg-gray-100 overflow-hidden border border-gray-200 group cursor-pointer">
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Upload size={20} className="text-white opacity-80" />
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={onAvatarUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    title="Change Avatar"
                  />
               </div>
               <div className="flex-1">
                 <label className="block text-xs text-gray-500 mb-1">Handle</label>
                 <input 
                   type="text" 
                   value={profile.username}
                   onChange={(e) => handleProfileChange('username', e.target.value)}
                   className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-blue-500"
                 />
               </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
               <div>
                 <label className="block text-xs text-gray-500 mb-1">Posts</label>
                 <input 
                   type="text" 
                   value={profile.postsCount}
                   onChange={(e) => handleProfileChange('postsCount', e.target.value)}
                   className="w-full text-sm border border-gray-300 rounded px-2 py-1.5"
                 />
               </div>
               <div>
                 <label className="block text-xs text-gray-500 mb-1">Followers</label>
                 <input 
                   type="text" 
                   value={profile.followersCount}
                   onChange={(e) => handleProfileChange('followersCount', e.target.value)}
                   className="w-full text-sm border border-gray-300 rounded px-2 py-1.5"
                 />
               </div>
               <div>
                 <label className="block text-xs text-gray-500 mb-1">Following</label>
                 <input 
                   type="text" 
                   value={profile.followingCount}
                   onChange={(e) => handleProfileChange('followingCount', e.target.value)}
                   className="w-full text-sm border border-gray-300 rounded px-2 py-1.5"
                 />
               </div>
            </div>

            <div>
                 <label className="block text-xs text-gray-500 mb-1">Name</label>
                 <input 
                   type="text" 
                   value={profile.name}
                   onChange={(e) => handleProfileChange('name', e.target.value)}
                   className="w-full text-sm border border-gray-300 rounded px-2 py-1.5"
                 />
            </div>
            
            <div>
                 <label className="block text-xs text-gray-500 mb-1">Bio</label>
                 <textarea 
                   rows={4}
                   value={profile.bio}
                   onChange={(e) => handleProfileChange('bio', e.target.value)}
                   className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 resize-none font-sans"
                 />
            </div>
            
            <div>
                 <label className="block text-xs text-gray-500 mb-1">Link</label>
                 <input 
                   type="text" 
                   value={profile.link}
                   onChange={(e) => handleProfileChange('link', e.target.value)}
                   className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 text-blue-600"
                 />
            </div>

            {/* Highlights Editor Accordion */}
            <div className="border-t border-gray-100 pt-3 mt-1">
                <button 
                  onClick={() => setShowHighlightEdit(!showHighlightEdit)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-gray-600 mb-2 hover:text-gray-900"
                >
                   <span>Edit Highlights ({profile.highlights.length})</span>
                   {showHighlightEdit ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                
                {showHighlightEdit && (
                    <div className="grid gap-3">
                        {profile.highlights.map((h, idx) => (
                            <div key={h.id} className="flex items-center gap-2">
                                <div className="relative w-10 h-10 rounded-full bg-gray-100 border border-gray-200 shrink-0 overflow-hidden hover:opacity-80 transition-opacity">
                                    {h.coverUrl ? (
                                        <img src={h.coverUrl} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <PlusCircle size={16} className="text-gray-400" />
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => onHighlightUpload(idx, e)}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                                <input 
                                    type="text" 
                                    value={h.title}
                                    onChange={(e) => handleHighlightTitleChange(idx, e.target.value)}
                                    className="flex-1 text-xs border border-gray-200 rounded px-2 py-1.5"
                                    placeholder="Title"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

          </div>
        )}
      </div>

      {/* Primary Actions */}
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-all group">
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={onUpload} 
            className="hidden" 
          />
          <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
          <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">Add Grid Photos</span>
        </label>

        <button 
          onClick={onGenerateAI}
          disabled={isGenerating}
          className="flex flex-col items-center justify-center gap-2 p-4 border border-purple-100 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 hover:border-purple-200 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Sparkles className="w-6 h-6 text-purple-500 group-hover:text-purple-600" />
          )}
          <span className="text-sm font-medium text-purple-700">AI Aesthetic Fill</span>
        </button>
      </div>

      {/* Spacing Controls */}
      <div className="flex items-center justify-between border-t border-b border-gray-100 py-4">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <Grid3X3 size={14} />
            Grid Spacing
        </span>
        <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
                onClick={() => setGap(GridGap.NONE)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${currentGap === GridGap.NONE ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
            >
                None
            </button>
            <button 
                onClick={() => setGap(GridGap.THIN)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${currentGap === GridGap.THIN ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Thin
            </button>
            <button 
                onClick={() => setGap(GridGap.STANDARD)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${currentGap === GridGap.STANDARD ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
            >
                Std
            </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex gap-3">
        <button 
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Download size={18} />
          Download Mockup
        </button>
        
        <button 
          onClick={onClear}
          disabled={count === 0}
          className="px-4 py-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Clear all"
        >
          <Trash size={18} />
        </button>
      </div>

    </div>
  );
};
