import React from 'react';
import { UserProfile } from '../types';
import { Grid3X3, Film, UserSquare2, ChevronDown, Link as LinkIcon, Lock } from 'lucide-react';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className="bg-white pb-0 text-sm md:text-base text-gray-900 font-sans">
      
      {/* Mobile Top Bar */}
      <div className="flex justify-between items-center py-2 px-4 border-b border-gray-100 md:hidden">
        <div className="flex items-center gap-1">
            <Lock size={14} className="text-gray-800" />
            <span className="font-bold text-lg leading-none">{profile.username}</span>
            <ChevronDown size={16} />
        </div>
        <div className="flex gap-4">
            {/* Icons placeholders */}
            <div className="w-6 h-6 rounded-md border-2 border-gray-800"></div>
            <div className="w-6 h-6 border-b-2 border-r-2 border-gray-800"></div>
        </div>
      </div>

      <div className="px-4 pt-4 md:px-8 md:pt-8">
        
        {/* Top Section: Avatar + Stats */}
        <div className="flex items-center">
            {/* Avatar */}
            <div className="shrink-0 mr-6 md:mr-10">
                <div className="w-20 h-20 md:w-36 md:h-36 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                    <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-50">
                        <img 
                        src={profile.avatarUrl || "https://via.placeholder.com/150"} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        />
                    </div>
                </div>
            </div>

            {/* Stats (Mobile & Desktop Unified Layout for Preview) */}
            <div className="flex-1 flex justify-around md:justify-start md:gap-12">
                <div className="flex flex-col items-center md:items-start">
                    <span className="font-semibold text-lg md:text-xl text-gray-900">{profile.postsCount}</span>
                    <span className="text-sm text-gray-600">publications</span>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <span className="font-semibold text-lg md:text-xl text-gray-900">{profile.followersCount}</span>
                    <span className="text-sm text-gray-600">followers</span>
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <span className="font-semibold text-lg md:text-xl text-gray-900">{profile.followingCount}</span>
                    <span className="text-sm text-gray-600">suivi(e)s</span>
                </div>
            </div>
        </div>

        {/* Bio Section */}
        <div className="mt-3">
            <div className="font-semibold text-sm md:text-base">{profile.name}</div>
            <div className="whitespace-pre-wrap text-sm leading-snug mt-1">{profile.bio}</div>
            {profile.link && (
                <div className="flex items-center gap-1 text-[#00376b] text-sm font-semibold mt-1">
                   <LinkIcon size={12} />
                   <span>{profile.link}</span>
                </div>
            )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 text-sm font-semibold">
             <button className="flex-1 bg-gray-100 hover:bg-gray-200 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
                Suivi(e) <ChevronDown size={14} />
             </button>
             <button className="flex-1 bg-gray-100 hover:bg-gray-200 py-1.5 rounded-lg transition-colors">
                Écrire
             </button>
             <button className="flex-1 bg-gray-100 hover:bg-gray-200 py-1.5 rounded-lg transition-colors">
                Adresse e-mail
             </button>
        </div>
        
        {/* Story Highlights */}
        <div className="flex gap-4 overflow-x-auto pb-4 mt-6 scrollbar-hide">
          {profile.highlights && profile.highlights.length > 0 ? (
            profile.highlights.map((highlight) => (
              <div key={highlight.id} className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer">
                 <div className="w-16 h-16 rounded-full border border-gray-200 bg-gray-50 p-0.5">
                   <div className="w-full h-full rounded-full border border-gray-100 bg-gray-200 overflow-hidden">
                      {highlight.coverUrl ? (
                          <img src={highlight.coverUrl} className="w-full h-full object-cover" alt={highlight.title} />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                             <div className="w-8 h-8 rounded-full border-2 border-gray-300"></div>
                          </div>
                      )}
                   </div>
                 </div>
                 <div className="text-xs text-center truncate w-16">{highlight.title}</div>
              </div>
            ))
          ) : (
             // Fallback
             [1,2,3,4,5].map(i => (
                <div key={i} className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer opacity-60">
                   <div className="w-16 h-16 rounded-full border border-gray-200 bg-gray-50 p-1">
                     <div className="w-full h-full rounded-full bg-gray-200"></div>
                   </div>
                   <div className="h-2 w-8 bg-gray-100 rounded"></div>
                </div>
             ))
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-t border-gray-200 mt-2">
           <div className="flex-1 flex justify-center items-center py-2.5 border-b-2 border-black -mb-[1px] gap-2 cursor-pointer">
             <Grid3X3 size={24} strokeWidth={1.5} />
           </div>
           <div className="flex-1 flex justify-center items-center py-2.5 text-gray-400 gap-2 cursor-pointer">
             <Film size={24} strokeWidth={1.5} />
           </div>
           <div className="flex-1 flex justify-center items-center py-2.5 text-gray-400 gap-2 cursor-pointer">
             <UserSquare2 size={24} strokeWidth={1.5} />
           </div>
        </div>
      </div>
    </div>
  );
};
