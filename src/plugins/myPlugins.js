// 插件对外暴露一个插件对象，并且有install方法
let myPlugins = {};
myPlugins.install = function (Vue, options) {
    // install方法会在Vue.use时调用，第一个参数是Vue,第二参数可以是配置参数
    // 全局指令
    // directiv第一参数是名字，第二参数是回调函数，回调传入的参数是
    Vue.directive(options.name, (element, params) => {
        element.innerHTML = params.value.toUpperCase();
    })

}

export default myPlugins;