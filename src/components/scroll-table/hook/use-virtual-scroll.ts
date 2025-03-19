import { Ref, computed, ref } from 'vue';
import { TableProps } from '../type';

export function useVirtualScroll(
    props: TableProps,
    headerRef: Ref<HTMLElement | null>
) {
    // 实际渲染数据的起始索引
    const startIndex = ref(0);

    // 表格实际可展示的数据条数
    const count = computed(() => {
        const { cellHeight, scrollY } = props;
        const headerHeight = headerRef.value ? headerRef.value.clientHeight : 0;
        return Math.ceil((scrollY - headerHeight) / cellHeight);
    });

    // 实际渲染数据
    const tableData = computed(() => {
        const { dataSource } = props;
        const start = startIndex.value;
        const end = Math.min(start + count.value, dataSource.length);
        return dataSource.slice(start, end);
    });

    // 滚动监听事件
    const onScroll = (e: Event) => {
        const { scrollTop, scrollHeight } = e.target as HTMLElement;
        startIndex.value = Math.floor(
            Math.floor(scrollTop / scrollHeight) * props.dataSource.length
        );
    };

    return {
        startIndex,
        count,
        tableData,
        onScroll,
    };
}