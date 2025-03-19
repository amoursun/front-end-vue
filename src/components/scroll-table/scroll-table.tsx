import { defineComponent } from 'vue';
import { tableProps } from './type';
import {useTableHeader} from './hook/use-table-header';
import {useVirtualScroll} from './hook/use-virtual-scroll';

export default defineComponent({
  name: 'ScrollTable',
  props: tableProps,
  setup(props) {
    const { tableHeaders, headerRef } = useTableHeader(props)
    const { tableData, startIndex, count, onScroll } = useVirtualScroll(
      props,
      headerRef
    )
    /* render 函数 */
    return () => {
      const { dataSource, columns, scrollY, cellHeight } = props
      return (
        <div
          //设置表格高度，将表格设置为子元素高度超出时显示滚动条
          style={{ height: `${scrollY}px`, overflowY: 'auto' }}
          onScroll={onScroll}>
          <table class="table">
            <thead ref={headerRef}>
              <tr>
                {tableHeaders.value.map((header) => (
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 表格内容上方插入空白元素 */}
              <div style={{ height: `${startIndex.value * cellHeight}px` }} />
              {/* 表格实际渲染内容 */}
              {tableData.value.map((item) => (
                <tr style={{ height: `${cellHeight}px` }} key={item.id}>
                  {columns.map((column, index) => {
                    const { customRender, key } = column
                    return (
                      <td>
                        {customRender
                          ? customRender({
                              text: item[key]?.toString(),
                              record: item,
                              index,
                              column
                            })
                          : item[key]}
                      </td>
                    )
                  })}
                </tr>
              ))}
              {/* 表格内容下方插入空白元素 */}
              <div
                style={{
                  height: `${
                    (dataSource.length - startIndex.value - count.value) *
                    cellHeight
                  }px`
                }}
              />
            </tbody>
          </table>
        </div>
      )
    }
  }
})