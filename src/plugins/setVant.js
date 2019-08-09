/* 全局注册组件 */

import Vue from 'vue';
import { Button, Loading, Cell, CellGroup, Row, Col, Field, List, Panel, Checkbox, CheckboxGroup, Notify, Icon, Dialog, ActionSheet } from 'vant'
const components  = [
    Button,
    Loading,
    Cell, 
    CellGroup,
    Row, 
    Col,
    Field,
    List,
    Panel,
    Checkbox, 
    CheckboxGroup,
    Notify,
    Icon,
    Dialog,
    ActionSheet      
]
const installComponents = (Vue, opts = {}) => {
    /* istanbul ignore if */
    components.map(item => {
        Vue.use(item);
    }) 
}
export const setVant = () => {
    if (typeof window !== 'undefined') {
        installComponents(Vue);
    };
}
