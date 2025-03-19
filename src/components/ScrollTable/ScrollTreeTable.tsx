import { defineComponent } from 'vue'
import { tableProps } from './type'
import useTableHeader from './hook/useTableHeader'
import useTreeVirtualScroll from './hook/useTreeVirtualScroll'

export default defineComponent({
  name: 'ScrollTreeTable',
  props: tableProps,
  setup(props) {
    const { tableHeaders, headerRef } = useTableHeader(props)
    const {
      isExpanded,
      toggleExpand,
      startIndex,
      count,
      tableData,
      allTableData,
      onScroll
    } = useTreeVirtualScroll(props, headerRef)
    /* render 函数 */
    return () => {
      const { columns, cellHeight, scrollY } = props
      const bottomHeight = `${
        (allTableData.value.length - startIndex.value - count.value) *
        cellHeight
      }px`
      return (
        <div
          style={{ height: `${scrollY}px`, overflowY: 'auto' }}
          onScroll={onScroll}>
          <table class="table">
            <thead>
              <tr>
                {tableHeaders.value.map((header) => (
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <div style={{ height: `${startIndex.value * cellHeight}px` }} />
              {tableData.value.map((item, index) => (
                <tr key={item.id}>
                  {columns.map((column, columnIndex) => {
                    const { customRender, key } = column
                    const { id, level = 0 } = item
                    return (
                      <td>
                        <span
                          style={{
                            marginLeft: `${level * 20}px`,
                            marginRight: '5px'
                          }}>
                          {columnIndex === 0 && item.children && (
                            <button
                              class="btn btn-light btn-sm"
                              onClick={() => toggleExpand(id)}>
                              {isExpanded(id) ? '-' : '+'}
                            </button>
                          )}
                        </span>
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
              <div
                style={{
                  height: bottomHeight
                }}
              />
            </tbody>
          </table>
        </div>
      )
    }
  }
})