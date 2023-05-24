import { detect } from "detect-browser";
import { FiHelpCircle, FiAlertTriangle } from "react-icons/fi";
import { useMemo } from "react";

function GetXTUrl(): string {
  const browser = detect();
  switch (browser.name) {
    case "firefox":
      return "https://addons.mozilla.org/en-US/firefox/addon/signum-xt-wallet/";
    case "chrome":
    case "chromium-webview":
    case "edge-chromium":
    case "opera":
    case "yandexbrowser":
      return "https://chrome.google.com/webstore/detail/signum-xt-wallet/kdgponmicjmjiejhifbjgembdcaclcib";
    default:
      return "";
  }
}

export const GetWalletInstructions = () => {
  // const url = GetXTUrl();

  const url = useMemo(() => {
    return GetXTUrl();
  }, []);

  return (
    <div className="card w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div>
          <iframe
            className="rounded-xl mx-auto w-full"
            src="https://www.youtube.com/embed/MRlj90ZA2Dc"
            title="Manage Nostr Accounts in Signum XT Browser Extension"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="link text-left text-xs flex flex-row items-center mb-6">
          <FiHelpCircle className="opacity-60 mr-2" size={28} />
          <a
            href="https://www.youtube.com/watch?v=MRlj90ZA2Dc"
            target="_blank"
            rel="noreferrer noopener"
          >
            Learn how to create and/or import your Nostr and Signum Accounts
          </a>
        </div>
        {url ? (
          <a
            className="link text-center"
            href={url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <button className="btn btn-info drop-shadow">
              Get XT Wallet Now!
            </button>
          </a>
        ) : (
          <div className="alert alert-warning shadow-lg">
            <div>
              <FiAlertTriangle className="opacity-60" size={48} />
              <span>
                Only Chromium-based browsers and Firefox are supported
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
