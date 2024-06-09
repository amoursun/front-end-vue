import type { App } from 'vue';
import SvgIcon from '@/components/svg-icon.vue';

const compList = [SvgIcon];

export function registerGlobComp(app: App) {
	compList.forEach(comp => {
		app.component(comp.name || comp.displayName, comp);
	});
}
