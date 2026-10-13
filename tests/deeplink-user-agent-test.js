const TARGET_URL = "https://onlyfans.com/dedeelatingirl/c2";

function detectApp(ua) {
  ua = ua || "";
  if (/musical_ly|BytedanceWebview|TikTok/i.test(ua)) return "tiktok";
  if (/Barcelona/i.test(ua)) return "threads";
  if (/Instagram/i.test(ua)) return "instagram";
  if (/FBAN|FBAV|FB_IAB|FBIOS|FB4A/i.test(ua)) return "facebook";
  if (/WhatsApp/i.test(ua)) return "whatsapp";
  if (/Twitter|X\/|TwitterAndroid|Twitter for iPhone/i.test(ua)) return "x";
  if (/Telegram/i.test(ua)) return "telegram";
  if (/LinkedInApp|LinkedIn/i.test(ua)) return "linkedin";
  return "normal";
}

function detectOS(ua) {
  ua = ua || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

function buildAndroidIntent(url) {
  const parsed = new URL(url);
  return `intent://${parsed.host}${parsed.pathname}${parsed.search}${parsed.hash}` +
    `#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(url)};end`;
}

function getLaunchPlan(url, ua) {
  const app = detectApp(ua);
  const os = detectOS(ua);
  let mode = "direct";
  let scheme = url;

  if (os === "ios") {
    if (app === "instagram") {
      mode = "ios-external";
      scheme = `instagram://extbrowser/?url=${encodeURIComponent(url)}`;
    } else if (app === "threads") {
      mode = "ios-external";
      scheme = `barcelona://extbrowser/?url=${encodeURIComponent(url)}`;
    } else if (app === "tiktok") {
      mode = "manual";
      scheme = "manual instructions";
    } else if (app !== "normal") {
      mode = "ios-external";
      scheme = `x-safari-${url}`;
    }
  } else if (os === "android" && app !== "normal") {
    mode = "android-intent";
    scheme = buildAndroidIntent(url);
  }

  return { app, os, mode, scheme };
}

const cases = [
  ["Instagram iOS", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 350.0.0.0"],
  ["Instagram Android", "Mozilla/5.0 (Linux; Android 14; Pixel 8; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/125.0 Mobile Safari/537.36 Instagram 350.0"],
  ["Threads iOS", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Barcelona 350.0"],
  ["TikTok iOS", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 musical_ly_35.0 BytedanceWebview/d8a21c6"],
  ["Facebook iOS", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/480.0]"],
  ["Safari iOS normal", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1"],
  ["Chrome Android normal", "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Mobile Safari/537.36"]
];

for (const [name, ua] of cases) {
  const plan = getLaunchPlan(TARGET_URL, ua);
  console.log(`${name}: app=${plan.app}; os=${plan.os}; mode=${plan.mode}; scheme=${plan.scheme}`);
}
