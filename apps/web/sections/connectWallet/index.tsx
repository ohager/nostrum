import {forwardRef} from 'react';
import {Zoom } from "react-reveal"
import {BaseSection} from '../baseSection';
import {useAppContext} from '@/hooks/useAppContext';
import {useModal} from '@/hooks/useModal';



interface Props {
    onNext: () => void
}

// eslint-disable-next-line react/display-name
export const ConnectWalletSection = forwardRef<HTMLDivElement, Props>(({onNext}, ref) => {

    const {Ledger,Wallet, AppName} = useAppContext()
    const {openModal} = useModal()
    const handleConnect = () =>{

        Wallet.Extension.connect({
            appName: AppName,
            networkName: Ledger.NetworkName
        }).then(connection => {
            console.log('pk', connection.publicKey)
            if(window.nostr) {
                return window.nostr.getPublicKey();
            }
            else{
                return Promise.resolve("")
            }
        }).then((npub) => {
            console.log(npub)
            openModal({
                type:"info",
                text: `npub is [${npub}]`,
                title: "Connected"
            })
        }).catch(e => {
            openModal({
                type:"error",
                text: e.message,
                title: "Connection Failure"
            })
        })
    }

    return (
        // @ts-ignore
        <BaseSection ref={ref} sign="②">
            <Zoom>
                <div className="hero min-h-screen w-full">
                    <div className="hero-content text-center glass p-20 rounded-2xl w-3/4 drop-shadow-xl">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Hello there</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                                excepturi
                                exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn btn-primary" onClick={handleConnect}>Connect</button>
                        </div>
                    </div>
                </div>
            </Zoom>
        </BaseSection>
    )
})
