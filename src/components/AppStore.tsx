import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export function isStoreUrlValid(url?: string | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed === '' || trimmed === '#' || trimmed === 'javascript:void(0)') {
    return false;
  }
  return trimmed.startsWith('http://') || trimmed.startsWith('https://');
}

export default function AppStore() {

    const { t, lang } = useLanguage();
    
    const appStoreUrl = import.meta.env.VITE_APP_STORE_URL || '';
    const googlePlayUrl = import.meta.env.VITE_GOOGLE_PLAY_URL || '';
    const onlineLink = import.meta.env.VITE_ONLINE_LINK || '';
    
  return (
    <div>
   <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center md:justify-start">
    {isStoreUrlValid(appStoreUrl) ? (
               <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="flex flex-wrap items-center justify-center w-full md:w-60 mt-3 text-white bg-black dark:bg-white dark:text-black h-14 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-xl hover:shadow-blue-900/20">
               <div className="mr-3">
                   <svg viewBox="0 0 384 512" width="30">
                       <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                       </path>
                   </svg>
               </div>
               <div>
                   <div className="text-xs">
                       {t('downloadOn')}
                   </div>
                   <div className="-mt-1 font-sans text-xl font-semibold">
                       App Store
                   </div>
               </div>
           </a>) :(
            
            <div className="w-full md:w-60 p-4 rounded-lg flex flex-col items-center justify-between border border-dashed border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400">
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
              {/* <span className="text-xs font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full uppercase">
              
                {t('inDevelopmentBadge')}
              </span> */}
            </div>
          )}
               <a href={googlePlayUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full md:w-60 mt-3 text-white bg-black dark:bg-white dark:text-black rounded-xl h-14 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-xl hover:shadow-blue-900/20">
               <div className="mr-3">
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
               </div>
               <div>
                   <div className="text-xs">
                       {t('downloadOn')}
                   </div>
                   <div className="-mt-1 font-sans text-xl font-semibold">
                       Google Play
                   </div>
               </div>
           </a>
           </div>
           
             <div className="h-fit bg-white/80 rounded-lg flex flex-row p-4 mt-4 shadow-md max-w-[500px] gap-4 ">
              <div><AlertCircle className="text-blue-600 w-10  h-10 bg-blue-100  p-2 rounded-full" />
              </div>
              <div className="">
                <h4 className="text-left text-blue-700 font-bold pt-2">{lang === 'en' ? "For the iOS users." : "За притежателите на iOS"}</h4>
                <p className="text-left text-sm py-4 text-gray-700"> {lang === 'en' ? "While the iOS app is in development, you can use our web-based application." : "Докато приложението за iOS е в процес на разработка, може да използвате уеб базираното приложение."}</p>
                <div className="flex justify-end">
                <a href={onlineLink} target="_blank" rel="noopener noreferrer" className="w-fit self-center text-center bg-gray-100 hover:bg-gray-200 border border-gray-400 text-gray-700 hover:text-blue-700 font-semibold py-2 px-4 rounded-lg">
               {lang === 'en' ? "Order Online" : "Поръчай онлайн"}
             </a>
             </div>
              </div>
            </div>
             
             
             
           </div>
          
           
  );
}