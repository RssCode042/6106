import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Smartphone, Copy, Check, ExternalLink, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export function getQrRedirectUrl(): string {
  const envUrl = import.meta.env.VITE_QR_REDIRECT_URL;
  if (envUrl && (envUrl.startsWith('http://') || envUrl.startsWith('https://'))) {
    return envUrl;
  }
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin;
    if (origin && origin !== 'null' && origin !== 'about:srcdoc' && (origin.startsWith('http://') || origin.startsWith('https://'))) {
      return `${origin}/download-app`;
    }
  }
  return import.meta.env.VITE_QR_REDIRECT_URL || 'https://6106.bg/download-app';
}

export default function QRCodeSection() {
  const { t, lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const redirectUrl = getQrRedirectUrl();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(redirectUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-950 dark:from-slate-900 dark:to-slate-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl border border-blue-800/40 dark:border-slate-800 relative overflow-hidden my-12">
      {/* Background Decorative Pattern */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
        {/* Information text */}
        <div className="md:col-span-2 text-left space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 dark:bg-amber-500/30 dark:text-amber-400 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            <QrCode className="w-4 h-4" />
            <span>{t('qrCodeBadge')}</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
            {t('qrCodeTitle')}
          </h2>

          <p className="text-blue-100 dark:text-slate-300 text-sm md:text-base leading-relaxed">
            {t('qrCodeDesc')}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 active:scale-95 flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <QrCode className="w-4 h-4" />
              <span>{lang === 'en' ? 'Enlarge QR Code' : 'Увеличи QR Кода'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t('copied') : (lang === 'en' ? 'Copy Smart Link' : 'Копирай интелигентна връзка')}</span>
            </button>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center">
          <div 
            onClick={() => setShowModal(true)}
            className="bg-white p-4 rounded-2xl shadow-2xl border-4 border-amber-400/80 cursor-pointer hover:scale-105 transition-transform duration-300 group relative"
          >
            <QRCodeSVG
              value={redirectUrl}
              size={160}
              level="H"
              includeMargin={false}
              imageSettings={{
                src: '/favicon.svg',
                x: undefined,
                y: undefined,
                height: 32,
                width: 32,
                excavate: true,
              }}
            />
            <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white font-bold text-xs gap-1">
              <ExternalLink className="w-4 h-4" />
              <span>{lang === 'en' ? 'Click to zoom' : 'Увеличи'}</span>
            </div>
          </div>
          <span className="text-xs text-amber-300 dark:text-amber-400 font-semibold mt-3 flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t('scanWithPhone')}</span>
          </span>
        </div>
      </div>

      {/* QR Code Enlarge Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative text-center border border-gray-100 dark:border-slate-800">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-extrabold mb-1">{t('qrCodeTitle')}</h3>
            <p className="text-xs text-gray-600 dark:text-slate-300 mb-6">{t('qrCodeDesc')}</p>

            <div className="bg-white p-6 rounded-2xl shadow-inner border border-gray-200 mx-auto inline-block mb-4">
              <QRCodeSVG
                value={redirectUrl}
                size={220}
                level="H"
                includeMargin={false}
                imageSettings={{
                  src: '/icon.svg',
                  x: undefined,
                  y: undefined,
                  height: 40,
                  width: 40,
                  excavate: true,
                }}
              />
            </div>

            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 mb-4 flex items-center justify-center gap-1">
              <Smartphone className="w-4 h-4 text-blue-900 dark:text-amber-400" />
              <span>iOS (App Store) & Android (Google Play)</span>
            </p>

            <button
              onClick={handleCopyLink}
              className="w-full bg-blue-900 dark:bg-amber-500 text-white dark:text-slate-950 font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400 dark:text-slate-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t('copied') : (lang === 'en' ? 'Copy Link' : 'Копирай линк')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
