import App from 'App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {  lazy, Suspense } from 'react'
import Loading from '../components/Loading'

interface IRoute {
path:string;
component:React.FC<any>;
children? : IRoute[] 
}

const router_arr = [
    {
        path: '/', component: App, children: [
            { path: '/list', component: lazy(() => import('pages/List')) },
            { path: '/edit', component: lazy(() => import('pages/Edit')) },
            { path: '/edit/:id', component: lazy(() => import('pages/Edit')) },
            { path: '/means', component: lazy(() => import('pages/Means')) },
            { path: '/namelist', component: lazy(() => import('pages/NameList')) },
        ]
    },
    { path: '/login', component: lazy(() => import('Login')) },
    { path: '/register', component: lazy(() => import('Register')) },
]

const MyRouter = () => (
    <BrowserRouter>
        <Suspense fallback={<Loading/>}>
            <Routes>
            {
                router_arr.map((item,index)=>{
                    return (
                        item.children ? 
                        <Route key={index} path={item.path} element={<item.component />}>
                            {
                                item.children.map((e,i)=><Route key={i} path={e.path} element={<e.component />}></Route>)
                            }
                        </Route>
                        :
                        <Route key={index} path={item.path} element={<item.component/>}></Route>
                    )
                })
            }
            </Routes>
        </Suspense>
    </BrowserRouter>
)

export default MyRouter;