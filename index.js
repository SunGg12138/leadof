/**
 * 统一处理一批获取相同资源的请求
 * @param {string} id leafof唯一索引
 */
function Leadof (id) {
  if (Leadof.instance[id]) {
    let instance = Leadof.instance[id];
    return instance.exec.bind(instance);
  }
  if (!(this instanceof Leadof)) return new Leadof(id);

  Leadof.instance[id] = this;

  this._id = id;
  this._state = 'wait';
  this._promise = new Promise((s, j) => {
    this._resolve = s;
    this._reject = j;
  });
  return this.exec.bind(this);
}

Leadof.prototype.exec = async function(fn, ...args){
  if (this._state === 'wait') {
    let ret;
    this._state = 'pending';
    try {
      ret = await fn.apply(null, args);
      this._state = 'resolve';
      this._resolve(ret);
    } catch (error) {
      this._state = 'reject';
      this._reject(error);
    }
    // 清除保存的实例
    Leadof.instance[this._id] = null;
  }
  return this._promise;
};

Leadof.instance = {};

module.exports = Leadof;