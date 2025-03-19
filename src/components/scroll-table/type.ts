import { ExtractPropTypes, PropType, VNode } from 'vue'

interface ColumnSlotParams {
  text: string
  record: any
  index: number
  column: ColumnProps
}

export interface ColumnProps {
  key: string
  title: string
  customRender?: (params: ColumnSlotParams) => VNode
}

export const tableProps = {
  columns: {
    type: Array as PropType<ColumnProps[]>,
    default: () => []
  },
  dataSource: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  cellHeight: {
    type: Number,
    default: 46
  },
  scrollY: {
    type: Number,
    default: 320
  }
}

export type TableProps = ExtractPropTypes<typeof tableProps>