import { v4 as uuidv4 } from 'uuid'
// 生成一个随机的字符串，且每次执行不能发生变化，以供游客身份持久存储localStorage
export const getUUID = ()=>{
    // 先看localStorage有没有，没有就新生成一个
    let uuid_token = localStorage.getItem('UUIDTOCKEN');
    // 如果没有则返回null
    if(!uuid_token){
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOCKEN',uuid_token);
    }
    // 这里的函数被调用，一定要有返回值，不写return就是undefined
    return uuid_token;
}