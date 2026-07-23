import React from 'react';

interface AdBannerProps {
  type: 'leaderboard' | 'sidebar' | 'in-content' | 'sticky-bottom';
  pubId?: string;
  slotId?: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  type,
  pubId = '',
  slotId = '1234567890',
  className = ''
}) => {
  // Only render if a real AdSense Publisher ID is configured by the user
  if (!pubId || pubId.trim().length === 0) {
    return null;
  }

  return (
    <div className={`ad-slot-wrapper flex flex-col items-center justify-center p-2 text-center my-4 overflow-hidden ${className}`}>
      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1 self-start">
        ADVERTISEMENT
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: type === 'sidebar' ? '250px' : '90px' }}
        data-ad-client={pubId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
