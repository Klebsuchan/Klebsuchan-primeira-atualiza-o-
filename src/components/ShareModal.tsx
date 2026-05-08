import React, { useEffect, useState } from 'react';
import { X, Facebook, Twitter, Link as LinkIcon, Instagram, MessageCircle, Send } from 'lucide-react';

interface ShareModalProps {
  post: any;
  isOpen: boolean;
  onClose: () => void;
  getPostImage: (post: any) => string;
}

export function ShareModal({ post, isOpen, onClose, getPostImage }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCopied(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !post) return null;

  const url = `${window.location.origin}${window.location.pathname}?post=${post.id}`;
  const title = post.title.rendered;
  const imageUrl = getPostImage(post);
  // Extract a brief synopsis
  const excerptRaw = post.excerpt?.rendered || post.content?.rendered || '';
  const excerptText = excerptRaw.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...';

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={20} />,
      color: 'bg-[#25D366] hover:bg-[#1DA851] text-white border-transparent',
      action: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + '\n\n' + excerptText + '\n\n' + url)}`, '_blank')
    },
    {
      name: 'Twitter / X',
      icon: <X size={20} />, /* Use X logo if available or just Twitter icon */
      color: 'bg-black hover:bg-gray-800 text-white border-transparent',
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
    },
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      color: 'bg-[#1877F2] hover:bg-[#166FE5] text-white border-transparent',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    },
    {
      name: 'Telegram',
      icon: <Send size={20} />,
      color: 'bg-[#229ED9] hover:bg-[#1E8CC0] text-white border-transparent',
      action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
    },
    {
      name: 'Copiar Link',
      icon: <LinkIcon size={20} />,
      color: 'bg-accent text-bg hover:bg-highlight border-transparent',
      action: () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  ];

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: excerptText,
          url: url
        });
      }
    } catch (err) {
      console.log('Error sharing naturally', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" onClick={onClose} />
      
      <div className="relative bg-bg rounded-xl shadow-2xl w-full max-w-md border border-border border-b-4 border-b-highlight overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-bold font-serif text-lg text-accent uppercase tracking-wider">Compartilhar Artigo</h3>
          <button onClick={onClose} className="p-2 bg-card-bg text-muted hover:text-highlight rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Card Preview */}
        <div className="p-5 bg-card-bg/50">
          <div className="bg-bg border border-border rounded-lg overflow-hidden shadow-sm">
            {imageUrl && (
              <div className="w-full h-40 bg-zinc-800 overflow-hidden relative">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                  <div className="p-3">
                    <div className="inline-block px-2 py-1 mb-2 bg-highlight text-black text-[10px] font-bold uppercase tracking-wider rounded-sm">
                      Klebsuchan
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="p-4">
              <h4 className="font-bold text-accent mb-2 text-sm leading-tight line-clamp-2" dangerouslySetInnerHTML={{ __html: title }} />
              <p className="text-muted text-xs line-clamp-3">{excerptText}</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-4 text-center">Escolha onde compartilhar</p>
          
          <div className="grid grid-cols-5 gap-2 mb-4">
            {shareOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={opt.action}
                title={opt.name}
                className={`flex items-center justify-center p-3 rounded-xl border transition-all duration-200 transform hover:scale-105 active:scale-95 ${opt.color}`}
              >
                {opt.icon}
              </button>
            ))}
          </div>

          {copied && (
            <div className="text-center text-sm font-bold text-[#25D366] mt-2 mb-2 animate-in fade-in slide-in-from-bottom-2">
              Link copiado para a área de transferência!
            </div>
          )}

          {typeof navigator.share !== 'undefined' && (
            <button 
              onClick={handleNativeShare}
              className="w-full py-3 bg-card-bg hover:bg-hover-bg text-accent font-bold uppercase tracking-wider text-sm rounded-lg border border-border transition-colors flex items-center justify-center gap-2"
            >
              <LinkIcon size={16} />
              Mais opções (Padrão do dispositivo)
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
