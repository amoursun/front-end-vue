import { defineComponent, onMounted, ref } from 'vue';
import Table from '@/components/scroll-table/scroll-tree-table';

interface IItem {
    id: string | number;
    name: string;
    city: string;
    children?: IItem[];
}
const data: IItem[] = [];
for (let i = 0; i < 400000; ++i) {
    data.push({
        id: i,
        name: `员工${i}`,
        city: 'BJ'
    });
}

const treeData: IItem[] = [];
for (let i = 0; i < 4; ++i) {
    const level1Data: IItem[] = [];
    for (let j = 0; j < 100000; ++j) {
        const id = `${i}-${j}`;
        level1Data.push({
            id,
            name: `员工${id}`,
            city: 'BJ'
        });
    }
    const id = `${i}`
    treeData.push({
        id,
        name: `员工${id}`,
        city: 'BJ',
        children: level1Data
    });
}

export default defineComponent({
    name: 'App',
    setup() {
        const dataSource = ref<IItem[]>([]);

        const service = () => {
            return new Promise<IItem[]>((resolve) => {
                setTimeout(() => {
                    resolve(treeData);
                }, 100);
            });
        }

        onMounted(async () => {
            const data = await service()
            dataSource.value = data
        });
        /* render 函数 */
        return () => {
            return (
                <div>
                    <Table
                        columns={[
                        {
                            title: '姓名',
                            key: 'name'
                        },
                        {
                            title: '城市',
                            key: 'city'
                        },
                        {
                            title: '操作',
                            key: 'option',
                            customRender({ record }) {
                            return (
                                <button
                                class="btn btn-primary"
                                onClick={() => console.log(record.name)}>
                                提示
                                </button>
                            )
                            }
                        }
                        ]}
                        dataSource={dataSource.value}
                    />
                </div>
            );
        };
    }
});
