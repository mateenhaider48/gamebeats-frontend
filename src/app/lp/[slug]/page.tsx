// src/app/lp/[slug]/page.tsx
import BodyClass from "@/components/BodyClass";
import Script from "next/script";

export default function LpSlugPage() {
  return (
    <>
      <BodyClass className="lp-only" />

      {/* PRELANDER ONLY */}
      <div className="top-page lp-page">
        <main className="lp-hero">
          <div className="container">
            <div className="lp-topbar">
              <a className="lp-topbar__brand" href="/" aria-label="GamesBeat home">
                <img
                  src={"/images/Logo%20Header.png"}
                  alt="GamesBeat"
                  className="lp-brand__logo"
                  width={140}
                  height={0}
                />
              </a>

              <div className="lp-topbar__lang">
                <label className="sr-only" htmlFor="lang">
                  Language
                </label>
                <select id="lang" className="lp-lang" aria-label="Language">
                  <option value="en">English</option>
                  <option value="bn">বাংলা</option>
                </select>
              </div>
            </div>

            <div className="row lp-hero-row align-items-start">
              <div className="col-lg-5 order-2 order-lg-1 d-flex">
                <div className="lp-card w-100">
                  <h1 className="lp-title" data-i18n="title">
                    Subscribe &amp; Play
                  </h1>

                  <p className="lp-sub" data-i18n="subtitle">
                    Enter your mobile number to get an OTP and start playing.
                  </p>

                  <div className="lp-form">
                    <div className="lp-input-wrap">
                      <input
                        id="msisdn"
                        type="tel"
                        inputMode="tel"
                        className="lp-input"
                        placeholder="e.g. 01XXXXXXXXX"
                        autoComplete="tel"
                        data-i18n-placeholder="msisdn_placeholder"
                      />
                    </div>

                    <button id="cta" className="lp-btn" type="button" data-i18n="cta">
                      Get OTP
                    </button>

                    <div id="status" className="lp-status" aria-live="polite" />

                    <p className="lp-price" aria-label="Price notice">
                      <span data-i18n="price_prefix">BDT</span>{" "}
                      <span className="lp-price__val">3.45</span>{" "}
                      <span data-i18n="price_suffix">/ day (auto-renew)</span>
                    </p>

                    <p className="lp-terms">
                      <span data-i18n="terms_prefix">
                        By continuing you agree to the subscription terms.
                      </span>{" "}
                      <a href="/tyc" data-i18n="terms_link">
                        Terms &amp; Conditions
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-7 order-1 order-lg-2 d-flex">
                <section className="lp-feature w-100" aria-label="GamesBeat featured games">
                  <div className="lp-feature__frame lp-feature__frame--fixed">
                    <img
                      className="lp-feature__img is-active"
                      src="/images/gamebeats1.png"
                      alt="GamesBeat featured games"
                      loading="eager"
                      decoding="async"
                    />
                    <img
                      className="lp-feature__img"
                      src="/images/gamebeats3.png"
                      alt="GamesBeat game preview"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="lp-feature__dots" role="tablist" aria-label="Featured images">
                    <button className="lp-dot is-active" type="button" aria-label="Show image 1" />
                    <button className="lp-dot" type="button" aria-label="Show image 2" />
                  </div>

                  <p className="lp-feature__copy" data-i18n="feature_copy">
                    Play hundreds of games instantly — Arcade, Strategy, Adventures &amp; more.
                  </p>
                </section>
              </div>
            </div>

            <div className="lp-mini-footer">
              <a href="/tyc" data-i18n="footer_terms">
                All Rights Reserved
              </a>
              <span className="lp-mini-footer__dot">•</span>
              <span data-i18n="footer_copy">© 2026 GamesBeat</span>
            </div>
          </div>
        </main>
      </div>

      {/* Legacy libs (only if your LP relies on them) */}
      <Script src="/js/jquery.min.js" strategy="afterInteractive" />
      <Script src="/js/bootstrap.bundle.js" strategy="afterInteractive" />

      {/* LP logic (copied from legacy) */}
      <Script id="lp-inline" strategy="afterInteractive">{`
        async function tryHeaderEnrichment(){ return null; }

        function generateTransactionId(){
          return 'Trx-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        }

        function cleanPhoneNumber(phoneNumber){
          let cleaned = phoneNumber.trim();
          if (cleaned.startsWith('+')) cleaned = cleaned.substring(1);
          cleaned = cleaned.replace(/\\D/g, '');

          if (!cleaned.startsWith('880')) {
            if (cleaned.length === 11 && cleaned.startsWith('01')) cleaned = '880' + cleaned;
            else if (cleaned.length === 10 && cleaned.startsWith('1')) cleaned = '880' + cleaned;
          }

          if (cleaned.length !== 13 || !cleaned.startsWith('880')) return null;
          return cleaned;
        }

        const DEFAULT_SERVICE_ID = 'GAM841565';
        const DEFAULT_DURATION = 1;
        const DEFAULT_PRICE = 3.45;
        const DEFAULT_SUBSCRIPTION_TYPE = 'daily';

        async function triggerOtp(msisdn){
          const baseUrl = window.location.origin;

          const cleanMsisdn = cleanPhoneNumber(msisdn);
          if (!cleanMsisdn) {
            throw new Error('Invalid phone number format. Please enter a valid Bangladesh mobile number (e.g., 01XXXXXXXXX or 8801XXXXXXXXX)');
          }

          const transactionId = generateTransactionId();

          const successUrl =
            baseUrl + '/user/payment-success.php?transactionId=' + encodeURIComponent(transactionId) +
            '&serviceId=' + encodeURIComponent(DEFAULT_SERVICE_ID) +
            '&durationInDay=' + encodeURIComponent(DEFAULT_DURATION) +
            '&price=' + encodeURIComponent(DEFAULT_PRICE) +
            '&subscriptionType=' + encodeURIComponent(DEFAULT_SUBSCRIPTION_TYPE) +
            '&msisdn=' + encodeURIComponent(cleanMsisdn) +
            '&from_landing=1';

          const failedUrl =
            baseUrl + '/user/payment-failed.php?transactionId=' + encodeURIComponent(transactionId) +
            '&serviceId=' + encodeURIComponent(DEFAULT_SERVICE_ID) +
            '&msisdn=' + encodeURIComponent(cleanMsisdn);

          const denyUrl =
            baseUrl + '/user/payment-deny.php?transactionId=' + encodeURIComponent(transactionId) +
            '&serviceId=' + encodeURIComponent(DEFAULT_SERVICE_ID) +
            '&msisdn=' + encodeURIComponent(cleanMsisdn);

          const payload = {
            msisdn: cleanMsisdn,
            serviceId: DEFAULT_SERVICE_ID,
            channel: 'SelfWeb',
            paymentSuccessRedirectUrl: successUrl,
            paymentFailedRedirectUrl: failedUrl,
            paymentDenyRedirectUrl: denyUrl,
            transactionId
          };

          const apiUrl = 'https://api.payment-app.info/grameenphone/checkout/create-checkout-session/GamesBeat';
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
          });

          const responseText = await response.text().catch(() => '');
          if (response.ok && responseText) {
            const data = JSON.parse(responseText);
            if (data?.statusCode === 200 && data?.data?.paymentUrl) {
              return { ok: true, redirectUrl: data.data.paymentUrl };
            }
            throw new Error(data?.message || 'Invalid response from payment provider');
          }

          let errorMessage = 'An error occurred while processing your subscription.';
          if (responseText) {
            try {
              const errorData = JSON.parse(responseText);
              errorMessage = errorData.message || errorData.data || errorMessage;
            } catch {
              errorMessage = responseText.trim() || errorMessage;
            }
          }
          throw new Error(errorMessage);
        }

        const msisdnInput = document.getElementById("msisdn");
        const statusEl = document.getElementById("status");
        const cta = document.getElementById("cta");
        const langSel = document.getElementById("lang");

        const I18N = {
          en: {
            title: "Subscribe &amp; Play",
            subtitle: "Enter your mobile number to subscribe and start playing.",
            msisdn_placeholder: "e.g. 01XXXXXXXXX",
            cta: "Subscribe",
            price_prefix: "BDT",
            price_suffix: "/ day (auto-renew)",
            terms_prefix: "By continuing you agree to the subscription terms.",
            terms_link: "Terms &amp; Conditions",
            feature_copy: "Play hundreds of games instantly — Arcade, Strategy, Adventures &amp; more.",
            footer_terms: "All Rights Reserved",
            footer_copy: "© 2025 GamesBeat",
            status_detected: "Detected number automatically.",
            status_enter: "Please enter your phone number.",
            status_sending: "Processing subscription…",
            status_sent: "Redirecting to payment…",
            status_fail: "Could not process subscription. Please try again."
          },
          bn: {
            title: "সাবস্ক্রাইব করুন &amp; খেলুন",
            subtitle: "সাবস্ক্রাইব করতে এবং খেলা শুরু করতে আপনার মোবাইল নম্বর লিখুন।",
            msisdn_placeholder: "যেমন: 01XXXXXXXXX",
            cta: "সাবস্ক্রাইব করুন",
            price_prefix: "BDT",
            price_suffix: "/ দিন (অটো-রিনিউ)",
            terms_prefix: "চালিয়ে গেলে আপনি সাবস্ক্রিপশনের শর্তাবলীতে সম্মত হচ্ছেন।",
            terms_link: "শর্তাবলী",
            feature_copy: "তাৎক্ষণিকভাবে শত শত গেম খেলুন — আর্কেড, স্ট্র্যাটেজি, অ্যাডভেঞ্চার ও আরও অনেক কিছু।",
            footer_terms: "সর্বস্বত্ব সংরক্ষিত",
            footer_copy: "© ২০২৫ গেমসবিট",
            status_detected: "নম্বর স্বয়ংক্রিয়ভাবে শনাক্ত হয়েছে।",
            status_enter: "অনুগ্রহ করে আপনার ফোন নম্বর লিখুন।",
            status_sending: "সাবস্ক্রিপশন প্রক্রিয়াকরণ করা হচ্ছে…",
            status_sent: "পেমেন্টে রিডাইরেক্ট করা হচ্ছে…",
            status_fail: "সাবস্ক্রিপশন প্রক্রিয়া করা যায়নি। আবার চেষ্টা করুন।"
          }
        };

        function setLang(lang){
          const dict = I18N[lang] || I18N.en;

          document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (dict[key] != null) el.innerHTML = dict[key];
          });

          document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
          });

          try { localStorage.setItem("gb_lang", lang); } catch {}
        }

        (function initLang(){
          let lang = "en";
          try { lang = localStorage.getItem("gb_lang") || lang; } catch {}
          if (!lang || !I18N[lang]) {
            const n = (navigator.language || "").toLowerCase();
            lang = n.startsWith("bn") ? "bn" : "en";
          }
          langSel.value = lang;
          setLang(lang);
        })();

        langSel.addEventListener("change", () => setLang(langSel.value));

        (async () => {
          const auto = await tryHeaderEnrichment();
          if (auto) {
            msisdnInput.value = auto;
            const dict = I18N[langSel.value] || I18N.en;
            statusEl.textContent = dict.status_detected;
            statusEl.classList.add("is-ok");
          }
        })();

        cta.addEventListener("click", async () => {
          const msisdn = (msisdnInput.value || "").trim();
          const dict = I18N[langSel.value] || I18N.en;

          if (!msisdn) {
            statusEl.textContent = dict.status_enter;
            statusEl.classList.remove("is-ok");
            statusEl.classList.add("is-err");
            return;
          }

          statusEl.textContent = dict.status_sending;
          statusEl.classList.remove("is-ok", "is-err");

          try {
            const res = await triggerOtp(msisdn);
            if (!res.ok) throw new Error("OTP trigger failed");

            statusEl.textContent = dict.status_sent;
            statusEl.classList.remove("is-err");
            statusEl.classList.add("is-ok");

            setTimeout(() => (window.location.href = res.redirectUrl), 650);
          } catch {
            statusEl.textContent = dict.status_fail;
            statusEl.classList.remove("is-ok");
            statusEl.classList.add("is-err");
          }
        });

        (function(){
          const imgs = Array.from(document.querySelectorAll(".lp-feature__img"));
          const dots = Array.from(document.querySelectorAll(".lp-dot"));
          if (!imgs.length || !dots.length) return;

          if (imgs.length > 1 && imgs[1].src) {
            const img2 = new Image();
            img2.src = imgs[1].src;
          }

          let idx = 0;
          let rotationInterval = null;

          const show = (n) => {
            idx = n;
            imgs.forEach((img, i) => {
              if (i === idx) { img.classList.add("is-active"); img.style.display = "block"; }
              else { img.classList.remove("is-active"); img.style.display = "none"; }
            });
            dots.forEach((dot, i) => dot.classList.toggle("is-active", i === idx));
          };

          dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
              show(i);
              if (rotationInterval) clearInterval(rotationInterval);
              rotationInterval = setInterval(() => show((idx + 1) % imgs.length), 4500);
            });
          });

          const start = () => { rotationInterval = setInterval(() => show((idx + 1) % imgs.length), 4500); };
          if (document.readyState === 'complete') start();
          else window.addEventListener('load', start);
        })();
      `}</Script>
    </>
  );
}
