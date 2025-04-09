import { gsap as GSap } from 'gsap';
/**
 * GSAP 插件注册
 */
// import { useGSAP } from '@gsap/react';

// import { CustomEase } from 'gsap/CustomEase';
// import { RoughEase, ExpoScaleEase, SlowMo } from 'gsap/EasePack';

// import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Observer } from 'gsap/Observer';
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
// import { Draggable } from 'gsap/Draggable';
// import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
// import { EaselPlugin } from 'gsap/EaselPlugin';
// import { PixiPlugin } from 'gsap/PixiPlugin';
// import { TextPlugin } from 'gsap/TextPlugin';


GSap.registerPlugin(
    // useGSAP,
    // Flip,
    ScrollTrigger,
    // Observer,
    // ScrollToPlugin,
    // Draggable,
    // MotionPathPlugin,
    // EaselPlugin,
    // PixiPlugin,
    // TextPlugin,
    // RoughEase,
    // ExpoScaleEase,
    // SlowMo,
    // CustomEase
);

export {
    GSap,
    ScrollTrigger,
};