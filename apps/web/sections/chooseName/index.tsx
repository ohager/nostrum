import {forwardRef} from 'react';
import {BaseSection} from '../baseSection';
import {Zoom} from 'react-reveal';
import {motion, useScroll} from 'framer-motion';

// ① ② ③ ④ ⑤ ⑥ ⑦
interface Props {
    onNext: () => void
}

// eslint-disable-next-line react/display-name
export const ChooseNameSection = forwardRef<HTMLDivElement, Props>(({onNext}, ref) => {
    const {scrollYProgress, scrollY} = useScroll()
    return (
            <BaseSection ref={ref} sign="①">
                <Zoom>
                    <div className="hero min-h-screen w-full">
                    <div className="hero-content text-center glass p-20 rounded-2xl w-3/4 drop-shadow-xl relative">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Hello there</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                                exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn btn-primary" onClick={onNext}>Get Started</button>
                        </div>
                    </div>
                </div>
                        <motion.div className="relative mx-auto w-1 h-1 bg-yellow-100 opacity-10"
                                    style={{originY: scrollYProgress, opacity: scrollYProgress}}
                        />
                </Zoom>
            </BaseSection>
        )
    }
)
