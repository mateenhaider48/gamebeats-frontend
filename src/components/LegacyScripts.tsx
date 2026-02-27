// src/components/LegacyScripts.tsx
"use client";

import Script from "next/script";

export default function LegacyScripts() {
  return (
    <>
      {/* Core libs first */}
      <Script src="/js/jquery.min.js" strategy="afterInteractive" />
      <Script src="/js/bootstrap.bundle.js" strategy="afterInteractive" />

      {/* ✅ IMPORTANT: Do NOT load any legacy language/translation scripts.
          They were overriding the header flag/checkmark + requesting /translations/strings/*.json */}
      {/* <Script src="/js/language-selector.js" strategy="lazyOnload" /> */}
      {/* <Script src="/js/translation-runtime.js" strategy="lazyOnload" /> */}

      {/* ✅ Keep only non-i18n legacy scripts */}
      <Script src="/js/game-click-interceptor.js" strategy="lazyOnload" />

      <Script id="carousel-init" strategy="lazyOnload">
        {`
          (function () {
            function init() {
              if (!window.jQuery) return;
              var $ = window.jQuery;
              if (!$.fn || !$.fn.carousel) return;
              if (!$('#carousel-home').length) return;
              $('#carousel-home').carousel({ interval: 5000, ride: 'carousel' });
            }

            var tries = 0;
            var t = setInterval(function () {
              tries++;
              init();
              if ((window.jQuery && window.jQuery.fn && window.jQuery.fn.carousel) || tries > 20) {
                clearInterval(t);
              }
            }, 100);

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', init);
            } else {
              init();
            }
          })();
        `}
      </Script>
    </>
  );
}
