import { useEffect, useState } from 'react';
import { Smartphone,  CheckCircle2, QrCode, Clock, AlertCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import SEO from '../components/SEO';
import { useLanguage } from '../lib/LanguageContext';

export function isStoreUrlValid(url?: string | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed === '' || trimmed === '#' || trimmed === 'javascript:void(0)') {
    return false;
  }
  return trimmed.startsWith('http://') || trimmed.startsWith('https://');
}

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

export default function AppRedirectPage() {
  const { t, lang } = useLanguage();
  const [detectedOS, setDetectedOS] = useState<'ios' | 'android' | 'desktop'>('desktop');
  const [redirecting, setRedirecting] = useState(false);
  const [inDevelopmentMessage, setInDevelopmentMessage] = useState<string | null>(null);

  const qrRedirectUrl = getQrRedirectUrl();
  const onlineLink = import.meta.env.VITE_ONLINE_LINK || '';

  const appStoreUrl = import.meta.env.VITE_APP_STORE_URL || '';
  const googlePlayUrl = import.meta.env.VITE_GOOGLE_PLAY_URL || '';

  const isIosValid = isStoreUrlValid(appStoreUrl);
  const isAndroidValid = isStoreUrlValid(googlePlayUrl);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    const ua = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
    const isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(ua);

    if (isIOS) {
      setDetectedOS('ios');
      if (isIosValid) {
        setRedirecting(true);
        window.location.replace(appStoreUrl);
        setTimeout(() => {
          window.location.href = appStoreUrl;
        }, 300);
      } else {
        setInDevelopmentMessage(t('iosInDevelopment'));
      }
    } else if (isAndroid) {
      setDetectedOS('android');
      if (isAndroidValid) {
        setRedirecting(true);
        window.location.replace(googlePlayUrl);
        setTimeout(() => {
          window.location.href = googlePlayUrl;
        }, 300);
      } else {
        setInDevelopmentMessage(t('androidInDevelopment'));
      }
    } else {
      setDetectedOS('desktop');
    }
  }, [isIosValid, isAndroidValid, t, appStoreUrl, googlePlayUrl]);

  return (
    <div className="px-4 py-12 md:py-16 max-w-4xl mx-auto text-center">
      <SEO
        title={lang === 'en' ? 'Download En Taxi App | App Store & Google Play' : 'Свали Ен Такси Приложение | App Store & Google Play'}
        description={lang === 'en' ? 'Smart download page for En Taxi Stara Zagora mobile application for iOS and Android.' : 'Универсална страница за сваляне на мобилното приложение Ен Такси Стара Загора за iOS и Android.'}
        canonicalUrl={qrRedirectUrl}
      />

      <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
        <QrCode className="w-4 h-4" />
        <span>{t('qrCodeBadge')}</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-slate-100 mb-4 tracking-tight">
        {t('qrCodeTitle')}
      </h1>
      <p className="text-base md:text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
        {t('qrCodeDesc')}
      </p>

      {/* Auto-redirect Status Banner for Mobile Scanners when link IS valid */}
      {redirecting && (
        <div className="mb-8 p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg max-w-lg mx-auto text-emerald-900 dark:text-emerald-200 animate-pulse shadow-md">
          <div className="flex items-center justify-center gap-3 font-bold text-lg mb-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>{t('redirectingToStore')}</span>
          </div>
          <p className="text-sm">
            {detectedOS === 'ios' ? t('iosDetected') : t('androidDetected')}
          </p>
        </div>
      )}

      {/* Under Development Status Banner for Mobile Scanners when link IS NOT provided yet */}
      {inDevelopmentMessage && (
        <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-lg max-w-lg mx-auto text-amber-950 dark:text-amber-200 shadow-md">
          <div className="flex items-center justify-center gap-3 font-bold text-lg mb-2">
            <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400 animate-spin-slow" />
            <span>{t('inDevelopmentBadge')}</span>
          </div>
          <p className="text-sm font-medium leading-relaxed">
            {inDevelopmentMessage}
          </p>
        </div>
      )}

      {/* Smart Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-slate-900 p-8 rounded-lg border border-gray-100 dark:border-slate-800 shadow-xl">
        {/* Left: QR Code Display */}
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-slate-800/80 rounded-lg border border-gray-100 dark:border-slate-700">
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 mb-4">
            <QRCodeSVG
              value={qrRedirectUrl}
              size={200}
              level="H"
              includeMargin={false}
              imageSettings={{
                src: '/favicon.svg',
                x: undefined,
                y: undefined,
                height: 36,
                width: 36,
                excavate: true,
              }}
            />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-blue-900 dark:text-amber-400" />
            <span>{t('scanWithPhone')}</span>
          </span>
          <span className="text-[11px] text-gray-400 dark:text-slate-500 mt-1 font-mono">
            {qrRedirectUrl}
          </span>
        </div>

        {/* Right: Direct Store Buttons & Info */}
        <div className="text-left space-y-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">
            {detectedOS === 'desktop' ? t('desktopDetected') : (lang === 'en' ? 'Direct Store Links:' : 'Директни връзки към магазините:')}
          </h2>

          {/* App Store Button */}
          {isIosValid ? (
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full p-4 rounded-lg flex items-center justify-between transition-all duration-200 border ${
                detectedOS === 'ios'
                  ? 'justify-center w-full  mt-3 text-white bg-black dark:bg-white dark:text-black h-14 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-xl hover:shadow-blue-900/20'
                  : ' justify-center w-full  mt-3 text-white bg-black dark:bg-white dark:text-black h-14 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-xl hover:shadow-blue-900/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 384 512" width="30">
                       <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                       </path>
                   </svg>
                <div>
                  <div className="text-[10px] uppercase font-medium opacity-80">{t('downloadOn')}</div>
                  <div className="text-base font-bold">App Store (iOS)</div>
                </div>
              </div>
            </a>
          ) : (
            <div className="w-full p-4 rounded-lg flex items-center justify-between border border-dashed border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 384 512" width="30">
                       <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                       </path>
                   </svg>
                <div>
                  <div className="text-base font-bold text-gray-700 dark:text-slate-300">App Store (iOS)</div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1 font-medium mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{t('comingSoon')}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full uppercase">
              
                {t('inDevelopmentBadge')}
              </span>
            </div>
          )}

          {/* Google Play Button */}
          {isAndroidValid ? (
            <a
              href={googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full p-4 rounded-lg flex items-center justify-between transition-all duration-200 border ${
                detectedOS === 'android'
                  ? 'flex items-center justify-center w-full  mt-3 text-white bg-black dark:bg-white dark:text-black rounded-xl h-14 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-xl hover:shadow-blue-900/20'
                  : 'flex items-center justify-center w-full  mt-3 text-white bg-black dark:bg-white dark:text-black rounded-xl h-14 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-xl hover:shadow-blue-900/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg viewBox="30 336.7 120.9 129.2" width="30">
                       <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z">
                       </path>
                       <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z">
                       </path>
                       <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z">
                       </path>
                       <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z">
                       </path>
                   </svg>
                <div>
                  <div className="text-[10px] uppercase font-medium opacity-80">{t('downloadOn')}</div>
                  <div className="text-base font-bold">Google Play</div>
                </div>
              </div>
            </a>
          ) : (
            <div className="w-full p-4 rounded-lg flex items-center justify-between border border-dashed border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <svg viewBox="30 336.7 120.9 129.2" width="30">
                       <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z">
                       </path>
                       <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z">
                       </path>
                       <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z">
                       </path>
                       <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z">
                       </path>
                   </svg>
                <div>
                  <div className="text-base font-bold text-gray-700 dark:text-slate-300">Google Play (Android)</div>
                  <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1 font-medium mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{t('comingSoon')}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full uppercase">
                {t('inDevelopmentBadge')}
              </span>
            </div>
          )}
          <div className="h-fit bg-white/80 rounded-lg flex flex-row p-4 mt-4 shadow-md max-w-[500px] gap-4 ">
              <div><AlertCircle className="text-blue-600 w-10  h-10 bg-blue-100  p-2 rounded-full" />
              </div>
              <div className="">
                <h4 className="text-left text-blue-700 font-bold pt-2">{lang === 'en' ? "For the iOS users." : "За притежателите на iOS"}</h4>
                <p className="text-left text-sm py-4 text-gray-700"> {lang === 'en' ? "While the iOS app is in development, you can use our web-based application." : "Докато приложението за iOS е в процес на разработка може да използвате уеб базираното приложение."}</p>
                <div className="flex justify-end">
                <a href={onlineLink} target="_blank" rel="noopener noreferrer" className="w-fit self-center text-center bg-gray-100 hover:bg-gray-200 border border-gray-400 text-gray-700 hover:text-blue-700 font-semibold py-2 px-4 rounded-lg">
               {lang === 'en' ? "Order Online" : "Поръчай онлайн"}
             </a>
             </div>
              </div>
            </div>
          <div className="pt-2 text-xs text-gray-500 dark:text-slate-400">
            {lang === 'en'
              ? '* Scanning the QR code automatically redirects you to your respective official app store.'
              : '* При сканиране на QR кода автоматично  ще бъдете пренасочени към вашия магазин за приложения.'}
          </div>
        </div>
      </div>
    </div>
  );
}
