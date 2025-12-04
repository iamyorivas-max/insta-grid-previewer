import React from 'react';
import { FeedImage, GridGap } from '../types';
import { Trash2 } from 'lucide-react';

interface GridProps {
  images: FeedImage[];
  gap: GridGap;
  id: string;
  onRemove: (id: string) => void;
  isExporting?: boolean;
}

export const Grid: React.FC<GridProps> = ({ images, gap, id, onRemove, isExporting = false }) => {
  return (
    <div 
      id={id} 
      className={`grid grid-cols-3 ${gap} bg-white w-full max-w-md mx-auto aspect-auto overflow-hidden pb-12`}
      style={{ minHeight: images.length === 0 ? '300px' : 'auto' }}
    >
      {images.map((img) => (
        <div 
          key={img.id} 
          className="relative group aspect-[4/5] bg-gray-100 overflow-hidden"
        >
          <img 
            src={img.url} 
            alt="Feed item" 
            className="w-full h-full object-cover block"
            crossOrigin="anonymous" 
          />
          
          {/* Hover overlay for delete - Hidden during export */}
          {!isExporting && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => onRemove(img.id)}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors"
                title="Remove image"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
          
          {/* AI Badge - Hidden during export */}
          {img.isAiGenerated && !isExporting && (
             <div className="absolute top-1 right-1 bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm pointer-events-none">
               AI
             </div>
          )}
        </div>
      ))}
      
      {/* Empty State Placeholders */}
      {images.length === 0 && (
         <div className="col-span-3 flex flex-col items-center justify-center h-48 text-gray-400 text-sm">
            <p>No images uploaded yet.</p>
         </div>
      )}
    </div>
  );
};
