import App from './App'

import HomeRouter from './Home/router'
import NotFoundRouter from './NotFound/router'
import LoginRouter from './Login/router'

export const createRoutes = (store) => ({
  component: App,
  childRoutes: [
    LoginRouter(store),
	HomeRouter(store),
    NotFoundRouter(store)
  ]
});

export default createRoutes



/*
记录：
 childRoutes中设置的path顺序来决定程序静态路由的匹配顺序，匹配完成则终止
 作为childRoute 会在父 component执行完之后再执行 childRoute匹配到的component
*/