import { defineStore } from 'pinia';
import { UserState } from '@/stores/type';
import piniaPersistConfig from '@/config/pinia-persist';

export const useUserStore = defineStore({
	id: 'gyl-user',
	state: (): UserState => ({
		token: '',
		userInfo: { name: 'gyl' }
	}),
	getters: {},
	actions: {
		// Set Token
		setToken(token: string) {
			this.token = token;
		},
		// Set setUserInfo
		setUserInfo(userInfo: UserState['userInfo']) {
			this.userInfo = userInfo;
		}
	},
	persist: piniaPersistConfig('gyl-user')
});
