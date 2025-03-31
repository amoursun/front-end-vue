
export interface ICourseData {
    id: string;
    name: string;
    bgColor: string;
}

const colors = [
    '#e6194B',
    '#f58231',
    '#ffe119',
    '#3cb44b',
    '#42d4f4',
    '#4363d8',
    '#911eb4',
    '#fabed4',
    '#9A6324',
    '#a9a9a9',
    '#aaffc3',
    '#dcbeff',
];

export const CourseData: ICourseData[] = [
    {
        id: 'Chinese',
        name: '语文',
        bgColor: '#fff',
    },
    {
        id: 'Mathematics',
        name: '数学',
        bgColor: '#fff',
    },
    {
        id: 'English',
        name: '英语',
        bgColor: '#fff',
    },
    {
        id: 'Physics',
        name: '物理',
        bgColor: '#fff',
    },
    {
        id: 'Chemistry',
        name: '化学',
        bgColor: '#fff',
    },
    {
        id: 'Biology',
        name: '生物',
        bgColor: '#fff',
    },
    {
        id: 'History',
        name: '历史',
        bgColor: '#fff',
    },
    {
        id: 'Geography',
        name: '地理',
        bgColor: '#fff',
    },
    {
        id: 'Politics',
        name: '政治',
        bgColor: '#fff',
    },
    {
        id: 'Art',
        name: '美术',
        bgColor: '#fff',
    },
    {
        id: 'Music',
        name: '音乐',
        bgColor: '#fff',
    },
    {
        id: 'PhysicalEducation',
        name: '体育',
        bgColor: '#fff',
    },
].map((item, index) => ({
    ...item,
    bgColor: colors[index % colors.length],
}));

export type IWeekData = Omit<ICourseData, 'bgColor'>;
export const WeekData: IWeekData[] = [
    {
        id: 'Monday',
        name: '星期一',
    },
    {
        id: 'Tuesday',
        name: '星期二',
    },
    {
        id: 'Wednesday',
        name: '星期三',
    },
    {
        id: 'Thursday',
        name: '星期四',
    },
    {
        id: 'Friday',
        name: '星期五',
    },
    {
        id: 'Saturday',
        name: '星期六',

    },
    {
        id: 'Sunday',
        name: '星期日',
    },
];

