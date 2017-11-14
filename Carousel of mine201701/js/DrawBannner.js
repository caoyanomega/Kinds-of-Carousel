/**
 * Created by Administrator on 2017/1/14.
 */
/*开始复制*/
mainDrawBanner = function () {
    var bannerContainer = document.getElementById("bannerContainer");
    var imgBanner = document.getElementById("imgBanner");
    var selectBanner = document.getElementById("selectBanner");

    var control = document.getElementById("control");
    var left = document.getElementById("c_left");
    var right = document.getElementById("c_right");
    var imgWidths = imgBanner.offsetWidth;

    var domWidth = bannerContainer.offsetWidth;

    /*添加两个节点 首尾*/
    var lis = imgBanner.getElementsByTagName("li");
    var liFirst = imgBanner.getElementsByTagName("li")[0];
    var liLast = imgBanner.getElementsByTagName("li")[lis.length - 1];
    var liFirstImg = (liFirst.children[0]).children[0];
    var liLastImg = (liLast.children[0]).children[0];

    var startLi = document.createElement("li");
    var startA = document.createElement("a");
    var startImg = document.createElement("img");
    startImg.src = (liLastImg.src + "");
    startA.appendChild(startImg);
    startLi.appendChild(startA);
    imgBanner.appendChild(startLi);

    var endLi = document.createElement("li");
    var endA = document.createElement("a");
    var endImg = document.createElement("img");
    endImg.src = (liFirstImg.src + "");
    endA.appendChild(endImg);
    endLi.appendChild(endA);

    imgBanner.insertBefore(startLi, liFirst);
    imgBanner.appendChild(endLi);

    var num = imgBanner.children.length;

    /*为上方每个li标签宽度赋值===容器的宽度*/
    imgBanner.style.width = num * domWidth + "px";
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.width = domWidth + "px";
    }

    /*添加下方的selectBanner 的li*/

    for (var i = 1; i < lis.length - 1; i++) {
        var Li = document.createElement("li");
        /*为了防止缩放浏览器导致的浮动元素发生位移，需要主动将每个li的宽度减小一点即可，
        设置domWidth-1，缩放浏览器非常容易导致浮动元素发生换行的情况出现。*/
        Li.style.width = (domWidth-1) / (lis.length - 2) + "px";
        var A = document.createElement("a");
        if (i == 1) {
            A.className = "now";
        }


        /*可以在这里设置a标签中的内容是文字或者是图片。使用文字，请注释掉图片节点。使用图片请注释掉a。innerHTML
        这里由于我设置了行高等于li高所以你只能看到文字或者图片的先出现的那一个。根据需求自行处理。
        */
        A.href = ((lis[i].children)[0])["href"];
        A.innerHTML = (((lis[i].children)[0]).children)[0].alt;

        var Img=document.createElement("img");
        Img.src=(((lis[i].children)[0]).children)[0].src;
        A.appendChild(Img);

        Li.appendChild(A);
        selectBanner.appendChild(Li);
    }
    var selectLis = selectBanner.children;

    /*轮播图主函数*/
    function mainBanner() {
        var topIndex = 1;
        var botIndex = 0;
        imgBanner.style.left = -topIndex * domWidth + "px";
        /*节流阀*/
        var flag = true;

        /*自动轮播图*/
        left.onclick = function () {
            if (flag) {
                flag=false;
                if (topIndex == 0) {
                    topIndex =lis.length-2;
                    imgBanner.style.left = -topIndex*domWidth + "px";
                    animate1(imgBanner,  -(--topIndex)* domWidth,function(){
                        flag=true;
                    });
                }else{
                    animate1(imgBanner, -(--topIndex) * domWidth,function(){
                        flag=true;
                    });
                }
                if(botIndex==0){
                    botIndex=selectLis.length-1;
                }else{
                    botIndex--;
                }

                for (var i = 0; i < selectLis.length; i++) {
                    (selectLis[i].children)[0].className = "";
                }
                (selectLis[botIndex].children)[0].className = "now";
            }
        }

        right.onclick = function () {
            if (flag) {
                /*关闭节流阀*/
                flag=false;
                if (topIndex === lis.length - 1) {
                    topIndex = 1;
                    imgBanner.style.left = -topIndex*domWidth + "px";
                    animate1(imgBanner, -(++topIndex) * domWidth,function(){
                        /*开启节流阀*/
                        flag=true;

                    });
                }else{
                    animate1(imgBanner, -(++topIndex) * domWidth,function(){
                        flag=true;
                    });
                }
                if(botIndex==selectLis.length-1){
                    botIndex=0;
                }else{
                    botIndex++;
                }
                for (var i = 0; i < selectLis.length; i++) {
                    (selectLis[i].children)[0].className = "";
                }
                (selectLis[botIndex].children)[0].className = "now";
            }
        }

        /*自动轮播*/
        var timer=setInterval(playNext,2000);
        function playNext(){
            right.onclick();
        }

        bannerContainer.onmouseover=function(){
            clearInterval(timer);
            control.style.display="block";
        }
        bannerContainer.onmouseout=function(){
            timer=setInterval(playNext,2000);
            control.style.display="none";
        }


        /*给selectLis添加事件*/
        for(var i=0;i<selectLis.length;i++){
            selectLis[i].index=i;
            selectLis[i].onclick=function(){
                animate1(imgBanner, -(this.index+1) * domWidth,function(){
                });
                botIndex=this.index;
                topIndex=this.index+1;
                for (var i = 0; i < selectLis.length; i++) {
                    (selectLis[i].children)[0].className = "";
                }
                (selectLis[this.index].children)[0].className = "now";
            }
        }
    }

    /*动画函数,添加一个参数，回调函数*/
    /*1.函数1--缓动动画---推荐---bug已修复*/
    function animate1(obj, target,fn) {

        clearInterval(obj.timer);
        var flag = true;
        obj.timer = setInterval(function () {
            /*注意这里有个bug就是通过obj.offsetLeft获取的值比下面style.left赋值的值要小1,传智使用的是offsetLeft
            * 这种情况在缩放浏览器的时候非常明显。为了能够彻底根除此问题，我决定此处废除使用offsetLeft来获取left的真实值
            * 详细原因有待深究*/
/*            var leader = obj.offsetLeft;
            console.log(obj.offsetLeft);*/

            /*由于获取的style.left是有单位px的,可以使用下面两种方式去除单位。*/
            //console.log(s.slice(0, s.length-2));
            //console.log(parseInt(s));

            var leader=parseInt(obj.style.left);
            var step = (target - leader) / 10;

            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            obj.style.left= leader+ "px";
            if (leader != target) {
                flag = false;
            }else{
                flag=true;
            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }, 20);
    }

    /*动画函数2之匀速动画---不推荐*/
/*    function animate1(obj, target,fn) {
        clearInterval(obj.timer);
        var flagA = true;
        var objNow=obj.offsetLeft;
        var all=Math.abs(target-objNow);
        obj.timer = setInterval(function () {
            var leader = obj.offsetLeft;
            //var step = (target-leader)/10;
            /!*在此设置匀速动画的step,多少次完成*!/
            var step = all/50;
            step = leader < target ? step : -step;
            if (Math.abs(target - leader) >= Math.abs(step)) {
                leader = leader + step;
                obj.style.left = leader + "px";
            } else {
                obj.style.left = target + "px";
                leader=target;
                clearInterval(obj.timer);
            }
            console.log(leader+":"+target);
            if (leader != target) {
                flagA = false;
            }else{
                flagA=true;
            }
            if (flagA) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
            /!*在此设置每一次运动的等待时间*!/
        }, 10);
    }*/


    /*动画函数3之全属性动画---我们暂时用不到，先写在这里*/
/*    function animate2(obj, json, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var flag = true;
            for (var k in json) {
                if (k === "opacity") {
                    var leader = getStyle(obj, k) * 100;
                    var target = json[k] * 100;
                    var step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    obj.style[k] = leader / 100;
                } else if (k === "zIndex") {
                    obj.style.zIndex = json[k];
                } else {
                    var leader = parseInt(getStyle(obj, k)) || 0;
                    var target = json[k];
                    var step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    obj.style[k] = leader + "px";
                }
                if (leader != target) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }, 15);
    }*/


    function getStyle(obj, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj, null)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }

    mainBanner();
}
/*结束复制*/