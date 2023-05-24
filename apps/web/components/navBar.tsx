import {FiGithub} from "react-icons/fi"
import Image from 'next/image';
export const NavBar = () => {
    return (
            <div className="fixed navbar z-10">
                <div className="flex-1"/>
                <div className="flex-none">
                    <div className="tooltip tooltip-left" data-tip="Github">
                    <a href="https://github.com/ohager/denavas" className="btn btn-square btn-ghost btn-xl" rel="noreferrer noopener" target="_blank">
                        <FiGithub size={20}/>
                    </a>
                    </div>
                    <div className="tooltip tooltip-left" data-tip="Signum Network">
                        <a href="https://signum.network" className="btn btn-square btn-ghost btn-xl" rel="noreferrer noopener" target="_blank">
                            <Image src="/img/signum-logo.svg" width={20} height={20} alt={"Signum Network Logo"} />
                        </a>
                    </div>
                </div>
            </div>
    )
}
