/**
 * Created by Administrator on 2017/1/14.
 */
/*��ʼ����*/
mainDrawBanner = function () {
    var bannerContainer = document.getElementById("bannerContainer");
    var imgBanner = document.getElementById("imgBanner");
    var selectBanner = document.getElementById("selectBanner");

    var control = document.getElementById("control");
    var left = document.getElementById("c_left");
    var right = document.getElementById("c_right");
    var imgWidths = imgBanner.offsetWidth;

    var domWidth = bannerContainer.offsetWidth;

    /*��������ڵ� ��β*/
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

    /*Ϊ�Ϸ�ÿ��li��ǩ��ȸ�ֵ===�����Ŀ��*/
    imgBanner.style.width = num * domWidth + "px";
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.width = domWidth + "px";
    }

    /*����·���selectBanner ��li*/

    for (var i = 1; i < lis.length - 1; i++) {
        var Li = document.createElement("li");
        /*Ϊ�˷�ֹ������������µĸ���Ԫ�ط���λ�ƣ���Ҫ������ÿ��li�Ŀ�ȼ�Сһ�㼴�ɣ�
        ����domWidth-1������������ǳ����׵��¸���Ԫ�ط������е�������֡�*/
        Li.style.width = (domWidth-1) / (lis.length - 2) + "px";
        var A = document.createElement("a");
        if (i == 1) {
            A.className = "now";
        }


        /*��������������a��ǩ�е����������ֻ�����ͼƬ��ʹ�����֣���ע�͵�ͼƬ�ڵ㡣ʹ��ͼƬ��ע�͵�a��innerHTML
        �����������������иߵ���li��������ֻ�ܿ������ֻ���ͼƬ���ȳ��ֵ���һ���������������д���
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

    /*�ֲ�ͼ������*/
    function mainBanner() {
        var topIndex = 1;
        var botIndex = 0;
        imgBanner.style.left = -topIndex * domWidth + "px";
        /*������*/
        var flag = true;

        /*�Զ��ֲ�ͼ*/
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
                /*�رս�����*/
                flag=false;
                if (topIndex === lis.length - 1) {
                    topIndex = 1;
                    imgBanner.style.left = -topIndex*domWidth + "px";
                    animate1(imgBanner, -(++topIndex) * domWidth,function(){
                        /*����������*/
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

        /*�Զ��ֲ�*/
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


        /*��selectLis����¼�*/
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

    /*��������,���һ���������ص�����*/
    /*1.����1--��������---�Ƽ�---bug���޸�*/
    function animate1(obj, target,fn) {

        clearInterval(obj.timer);
        var flag = true;
        obj.timer = setInterval(function () {
            /*ע�������и�bug����ͨ��obj.offsetLeft��ȡ��ֵ������style.left��ֵ��ֵҪС1,����ʹ�õ���offsetLeft
            * ��������������������ʱ��ǳ����ԡ�Ϊ���ܹ����׸��������⣬�Ҿ����˴��ϳ�ʹ��offsetLeft����ȡleft����ʵֵ
            * ��ϸԭ���д��*/
/*            var leader = obj.offsetLeft;
            console.log(obj.offsetLeft);*/

            /*���ڻ�ȡ��style.left���е�λpx��,����ʹ���������ַ�ʽȥ����λ��*/
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

    /*��������2֮���ٶ���---���Ƽ�*/
/*    function animate1(obj, target,fn) {
        clearInterval(obj.timer);
        var flagA = true;
        var objNow=obj.offsetLeft;
        var all=Math.abs(target-objNow);
        obj.timer = setInterval(function () {
            var leader = obj.offsetLeft;
            //var step = (target-leader)/10;
            /!*�ڴ��������ٶ�����step,���ٴ����*!/
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
            /!*�ڴ�����ÿһ���˶��ĵȴ�ʱ��*!/
        }, 10);
    }*/


    /*��������3֮ȫ���Զ���---������ʱ�ò�������д������*/
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
/*��������*/