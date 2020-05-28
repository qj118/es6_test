// 用回调方式实现异步操作
{
    let ajax = (callback) => {
        console.log("Proceeding");
        /**
         * 设置定时器：时间间隔后执行操作
         * 参数1 - 执行的操作
         * 参数2 - 时间间隔
         */
        setTimeout( () => {
            callback && callback.call();
        }, 1000 ); // 1s 后执行 callback 函数
    };

    ajax(() => {
        console.log('callback', 'timeout1'); // 在浏览器中可以清楚的看到 Proceeding 和 timeout 的输出中间有明显的间隔。
    });
}

{
    let ajax = () => {
        console.log('proceeding2');
        /**
         * Promise 的构造函数中传入一个函数
         * 函数由两个参数组成，
         * resolve - 函数，执行下一步操作；
         * reject - 函数， 中断当前操作。
         */
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    };

    /**
     * ajax() 返回一个 Promise 实例，
     * .then 方法可以传入两个参数，
     * 一个参数对应的是 resolve；
     * 一个参数对应的是 reject。
     */
    ajax().then(() => {
        console.log('promise', 'timeout2'); // 全局代码，proceeding 和 proceeding2 同时输出，然后时间间隔后输出 timeout1 和 timeout2
    });
}

// 实现串行
{
    let ajax = () => {
        console.log('串联', '1'); // 程序开始即输出
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    };

    ajax()
        .then(() => {
            console.log('串联', '2'); // 程序开始后 1s 输出
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
        })
        .then(() => {
            console.log('串联', '3'); // 程序开始后 2s 输出
        });
}

// 捕获错误
{
    let ajax  = (num) => {
        console.log('捕获异常');
        return new Promise((resolve, reject) => {
            if(num > 5){
                resolve();
            }else{
                throw Error('出错了！');
            }
        });
    };

    ajax(6).then(() => {
        console.log('num6');
    }).catch((err) => {
        console.log('catch', err); // num6
    });

    ajax(2).then(() => {
        console.log('num3')
    }).catch((err) => {
        console.log('catch', err); // catch Error: 出错了！
    });
}

// 应用
{
    // 所有图片加载完再返回图片到页面
    let loadImg = (src) => {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = () => {
                resolve(img);
            };
            img.onerror = () => {
                reject(img);
            };
        });
    };

    let showImgs = (imgs) => {
        imgs.forEach((img) => {
            document.body.appendChild(img);
        });
    }

    /**
     * Promise.all
     * @return Promise 实例
     * @param Promise 实例组成的数组
     * 当参数中的所有 Promise 的状态都发生改变时，才触发新的 Promise 实例返回。
     */
    Promise.all([
        loadImg('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590656173635&di=7b7bdb235d1dd92360007c6169788c26&imgtype=0&src=http%3A%2F%2Fugc.dls.migudm.cn%2FClient%2Fimage%2F060000225232%2Fugc_PIC_URL_720_406_664d7b0badd34dec890fcb371414cb6c.jpg'),
        loadImg('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590656225067&di=1b3d669bdf5979f80e0e6e6c81ec3aae&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F20%2F20181220133504_opkbg.thumb.700_0.jpg'),
        loadImg('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590656225066&di=d0c089219751fb6667e9869a50279a96&imgtype=0&src=http%3A%2F%2Fdingyue.nosdn.127.net%2FJG7MhQraHN%3DYGcNqqy%3D3Bt87sX4m7txceleufrWR3ez9p1535771048281compressflag.jpg')
    ]).then(showImgs);
}

{
    // 有一个图片加载完就添加到页面
    let loadImg = (src) => {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = () => {
                resolve(img);
            };
            img.onerror = () => {
                reject(img);
            };
        });
    };

    let showImgs = (img) => {
        let p = document.createElement('p');
        p.appendChild(img);
        document.body.appendChild(p);
    };

    /**
     * Promise.race
     * @return Promise 实例
     * @param Promise 实例组成的数组
     * 当参数中有一个 Promise 的状态率先改变，则新的 Promise 实例就会被触发， 其他的不再响应。
     */
    Promise.race([
        loadImg('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590656173635&di=7b7bdb235d1dd92360007c6169788c26&imgtype=0&src=http%3A%2F%2Fugc.dls.migudm.cn%2FClient%2Fimage%2F060000225232%2Fugc_PIC_URL_720_406_664d7b0badd34dec890fcb371414cb6c.jpg'),
        loadImg('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590656225067&di=1b3d669bdf5979f80e0e6e6c81ec3aae&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F20%2F20181220133504_opkbg.thumb.700_0.jpg'),
        loadImg('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590656225066&di=d0c089219751fb6667e9869a50279a96&imgtype=0&src=http%3A%2F%2Fdingyue.nosdn.127.net%2FJG7MhQraHN%3DYGcNqqy%3D3Bt87sX4m7txceleufrWR3ez9p1535771048281compressflag.jpg')
    ]).then(showImgs);
}