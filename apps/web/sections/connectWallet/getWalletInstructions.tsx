import {detect} from 'detect-browser';
import {FiHelpCircle, FiAlertTriangle} from "react-icons/fi"

function GetXTUrl(): string {
    const browser = detect();
    switch (browser.name) {
        case 'firefox':
            return "https://addons.mozilla.org/en-US/firefox/addon/signum-xt-wallet/"
        case 'chrome':
        case 'chromium-webview':
        case 'edge-chromium':
        case 'opera':
        case 'yandexbrowser':
            return "https://chrome.google.com/webstore/detail/signum-xt-wallet/kdgponmicjmjiejhifbjgembdcaclcib"
        default:
            return ""
    }
}

export const GetWalletInstructions = () => {

    const url = GetXTUrl();

    return (
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <img src="/img/signum-xt-logo-transparent.png" alt="xt-wallet-logo" width={200}/>
                <div className="py-6">
                    <p className="text-justify">
                        Looks like you haven't installed the Signum XT Wallet yet.
                    </p>
                </div>
                <div className="link text-xs flex flex-row items-center mb-6">
                    <FiHelpCircle className="opacity-60 mr-2" size={28}/>
                    <a href="https://www.youtube.com/watch?v=MRlj90ZA2Dc" target="_blank" rel="noreferrer noopener">
                        Learn how to create and/or import your Nostr and Signum Accounts
                    </a>
                </div>
                {url ?
                    <a className="link text-center" href={GetXTUrl()} target="_blank" rel="noreferrer noopener">
                        <button className="btn btn-info drop-shadow">Get XT Wallet Now!</button>
                    </a>
                    : <div className="alert alert-warning shadow-lg">
                        <div>
                            <FiAlertTriangle className="opacity-60" size={48}/>
                            <span>Only Chromium-based browsers and Firefox are supported</span>
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}
