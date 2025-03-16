import {throttle} from 'lodash-es';
import { nextTick, onMounted, onUnmounted, ref, Ref } from 'vue';
import { getPageScroll } from './tool';

export type ElRefType = Ref<HTMLElement | null>;
export type ElType = HTMLElement | Window;

export function useScroll(elRef: ElRefType) {
    let el: ElType = window;
    const isBottom = ref<boolean>(false);
    const scrollInfo = ref<{
        scrollHeight: number;
        scrollTop: number;
        clientHeight: number;
    }>({
        scrollHeight: 0,
        scrollTop: 0,
        clientHeight: 0,   
    });
    const handleBottom = () => {
        const {
            scrollHeight,
            scrollTop,
            clientHeight,
        } = getPageScroll(el);
        scrollInfo.value = {
            scrollHeight,
            scrollTop,
            clientHeight,
        };
        console.log(isBottom.value);
        if (scrollTop + clientHeight + 15 >= scrollHeight) {
            isBottom.value = true
        } else {
            isBottom.value = false
        }
    }
    onMounted(() => {
        nextTick(() => {
            if (elRef) {
                el = elRef.value;
            }
            el.addEventListener('scroll', throttle(handleBottom, 200));
        })
    });
    onUnmounted(() => {
        el.removeEventListener('scroll', handleBottom);
    });
    return {
        isBottom,
        scrollHeight: scrollInfo.value.scrollHeight,
        scrollTop: scrollInfo.value.scrollTop,
        clientHeight: scrollInfo.value.clientHeight,
    }
}
