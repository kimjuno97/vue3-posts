const objPlugins = {
	install(app, options) {
		console.log('obj app', app);
		console.log('obj options', options);
		// app.component() 전역 컴포넌트
		// app.config.globalProperties 전역 애플리케이션 인스턴스에 속성 추가
		// app.directive 커스텀 디렉티브
		// app.provide() 리소즈
	},
};

export default objPlugins;
