
# Loading

Loading模块，需要promise polyfill
<a href="http://www.eightfeet.cn/Loading/dist/index.html" traget="_blank" >demo</a>

#### parame

| 参数      | 说明                            | 是否必填 | 备注                                                         | 类型   |
| --------- | ------------------------------- | -------- | ------------------------------------------------------------ | ------ |
| id        | 所创建Loading的id               | 否       | 不传可自动生成id（Loading + 时间戳 + 100以内的随机数）       | String |
| zIndex    | loading的样式层级关系           | 否       | 默认10000                                                    | Number |
| emBase    | em单位的基准像素                | 否       | 默认自动计算（emBase = document.clientWidth/24）             | Number |
| parentId  | 所挂载的父级ID用于做局部Loading | 否       | 默认挂在body下面，指定父级dom时将挂载在父级dom下，配合css实现局部loading | String |
| cycleTime | 旋转周期                        | 否       | 默认0.5s                                                     | Number |
| style     | Loading样式                     | 是       | 定义loading样式<br /> {<br />    overlay: 覆盖层, <br />    content: 内容区, <br />    vertices: loading阵列元素点样式 留意其中特殊属性见下表， <br />} <br /> | Object |
| length    | loading组成圈的元素个数         | 否       | 默认12个                                                     |        |



parpme中style特殊属性

| 属性              | 说明                                                         | 类型         |
| ----------------- | ------------------------------------------------------------ | ------------ |
| animationDuration | 动画时间，可覆盖 parame中的cycleTime参数                     | Number       |
| size              | loading的直径大小                       | Number       |
| elements          | loading由几个元素点组成，可以是Number类型也可以是Array类型，<br />Number类型时，可覆盖 parame中的length参数；<br />Array类型时，<br />        1、数组元素可以为一组不同颜色值，loading组成的阵列元素将以每个元素的颜色值排列<br />        2、数组的长度（Array.length） 将会覆盖parame中的length，<br /> | Number/Array |

#### options

1. ##### show: ƒ () 显示Loading

   显示页面Loading，如果创建的Loading隐藏时，调用此方法显示Loading。

2. ##### hide: ƒ () 隐藏Loading

3. ##### reset: ƒ () 重置Loading计数器

   为了保证页面中loading只有一个，使用计数器控制loading的显示，loading.show()时计数器加一，loading.hide()时计数器减一，loading.reset() 用于重置loading计数器，loading计数器错乱是调用重置到零。



#### case

```javascript
import Loading from '@eightfeet/loading';

var newLoading = new Loading({
        length: 50, // 由几个vertices组成默认12个
        cycleTime: 1,
        parentId: 'parentId',
        style: { // 定义样式 {overlay: 覆盖层, content: 内容区, vertices: 组成节点}
            overlay: {
                backgroundColor: 'rgba(0,0,0,0)'
            },
            content: {
                backgroundColor: 'rgba(0,0,0,0)',
            },
            vertices: {
                height: '0.5em',
                width: '0.5em',
                borderRadius: '1em',
                backgroundColor: 'green',
                animationDuration: 'green', // 动画周期
                elements: ['red', 'green', 'yellow', 'orange', 'blue'],
                size: '20px'
            },
        }
    });

    var btn = document.getElementById('example');

    btn.onclick = function(){
        newLoading.show();
    }


```
