import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const variants = {
    in: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 0.3
        }
    },
    out: {
        opacity: 0,
        scale: 1,
        y: 40,
        transition: {
            duration: 0.6
        }
    }
};

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/animated-page-transitions-in-nextjs
 */
const FadeTransition = ({ children }) => {
    const { asPath } = useRouter();

    return (
        <div className="effect-1">
            <AnimatePresence initial={false}>
                <motion.div
                    key={asPath}
                    variants={variants}
                    animate="in"
                    initial="out"
                    exit="out"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default FadeTransition;