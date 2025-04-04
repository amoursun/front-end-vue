import { IWorkerEvent } from '../type';

self.onmessage = function (e: IWorkerEvent<{canvas: HTMLCanvasElement}>) {
    // 使用OffscreenCanvas（离屏Canvas）
    const canvas = e.data.canvas;
    // 获取绘图上下文
    const ctx = canvas.getContext('2d');
    if (ctx) {
        // 绘制一个圆弧
        ctx.beginPath(); // 开启路径
        ctx.arc(150, 75, 50, 0, Math.PI * 2);
        ctx.fillStyle = '#1989FA'; // 设置填充颜色
        ctx.fill(); // 开始填充
        ctx.stroke();
        self.postMessage('绘制完成');
    }
};
