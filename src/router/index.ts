/*
  @Author: lize
  @Date: 2021/4/15
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/4/15
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import  IndexComponent from '../views/Index.vue';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Index',
            component: IndexComponent,
        }
    ]
})
