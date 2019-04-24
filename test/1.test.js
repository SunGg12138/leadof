const expect = require('chai').expect;
const Leadof = require('../');

describe('Leadof', function(){
  it('测试', async () => {
    // 函数运行次数
    let run_count = 0;
    // 耗时的且返回相同数据的函数
    function func(){
      run_count++;
      return new Promise(resolve => {
        setTimeout(function(){
          resolve({ msg: 'ok' });
        }, 1000);
      });
    }

    let ret = await Promise.all([
      Leadof('func')(func),
      Leadof('func')(func),
      Leadof('func')(func),
      Leadof('func')(func)
    ]);
    // 返回的对象应该是同一个
    expect(ret[0] === ret[1] && ret[1] === ret[2] && ret[2] === ret[3]).to.be.ok;
    // func只会执行一次
    expect(run_count === 1).to.be.ok;
  });
});