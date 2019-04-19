# Leadof

解决并发时，重复请求资源的模块

## 示例

之前：
```javascript
// 获取储存在redis的热帖列表
async function getHotTip() {
  let ret = await redis.get('tip:hot');
  return ret;
}
let hotTip = await getHotTip();
```
之前，每过来一次请求都会读取redis的数据

现在：
```javascript
const Leadof = require('leadof');

async function getHotTip() {
  let ret = await redis.get('tip:hot');
  return ret;
}
// 获取储存在redis的热帖列表
await Leadof('getHotTip')(getHotTip);
```
现在，会把读取redis期间的请求收集起来，读完数据后再一起返回给所有的请求