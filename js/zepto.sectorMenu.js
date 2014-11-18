/**
* Created by Libre on 2014/11/12.
 *QQ:2548825377
* angle : 30 菜单项角度
* count : 3, 菜单数量
* radius : 100, 菜单弹出距离
* itemWidth : 3.5, 菜单项宽度 em
* itemHeight : 3.5,菜单项高度 em
* itemIcon : [], 菜单项icon
* itemTag : [], 菜单项标签
* itemBGColor : '#ccc', 菜单项默认背景颜色
* itemClass : '', 菜单项绑定css样式
* itemEvent : function(obj){}, 菜单项点击事件回调函数
* duration : 35, 菜单弹出步骤数，越少，越快
* event : 'click' 菜单按钮绑定事件 e.g. click|tap|longTap ....
*/
;(function($){
    $.extend($.fn, {
        sectorMenu: function(opt){
            var _isShow = false;
            var _this = this;
            var _pos = _this.offset();
            var _items = [];
            var settings = {
                angle : 30,
                count : 3,
                radius : 100,
                itemWidth : 3.5,
                itemHeight : 3.5,
                itemIcon : [],
                itemTag : [],
                itemBGColor : '#ccc',
                itemClass : '',
                itemEvent : function(obj){},
                duration : 35,
                event : 'click'
            };
            var _opt = opt || {};
            $.each(settings,function(k,v){
               if(undefined != _opt[k]){
                   settings[k] = _opt[k];
               }
            });
            if(settings.count > 12){
                return;
            }

            function createItem(n){
                for(var i=0 ; i < n ; i++) {
                    var item = $('<div class="menul-item"></div>');
                    item.data('tag',settings.itemTag[i]);
                    item.css(
                        {
                            //position:'absolute',
                            position:'absolute',
                            width:settings.itemWidth + 'em',
                            height:settings.itemHeight + 'em',
                            left:_pos.left,
                            top:_pos.top,
                            'background-position' : 'center',
                            'background-image' : 'url(' + settings.itemIcon[i] + ')',
                            'background-repeat': 'no-repeat',
                            'border': '1px solid #a72525',
                            '-webkit-border-radius': settings.itemWidth + 'em',
                            '-moz-border-radius': settings.itemWidth + 'em',
                            'border-radius' : settings.itemWidth + 'em'
                        }
                    );
                    item.removeClass(settings.itemClass);
                    item.bind({
                        touchstart : function(){
                            $(this).addClass(settings.itemClass);
                        },
                        touchend : function(){
                            $(this).removeClass(settings.itemClass);
                        },
                        tap:settings.itemEvent
                    });
                    _items.push(item);
                    item.appendTo(_this.parent());
                }
            }

            function fun(t,b,c,d,a,p){
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.5;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
            }

            function Move(obj,angle){
                var t=0,b=0, c=settings.radius, d=settings.duration;
                var angle = angle;
                obj.css({
                    left : _pos.left,
                    top : _pos.top
                });
                function _run(){
                    if(t<d){
                        t++;

                        var _r = Math.ceil(fun(t,b,c,d));
                        var _left = _pos.left + Math.ceil(_r * Math.sin((Math.PI/180) * angle));
                        var _top = _pos.top + Math.ceil(_r * Math.cos((Math.PI/180) * angle));

                        obj.css({
                            left :_left,
                            top : _top
                        })
                        Move._t = setTimeout(_run, 10);

                    }

                }
                _run();

            };

            function hideItem(e){
                if($(e.target).hasClass('menul-item')){
                    return ;
                }
                if($(e.target).prop('id') == $(_this).prop('id')){
                    return ;
                }
                $.each(_items,function(e){
                    $(this).remove();
                });
                _items=[];
            }

            $(document).bind({
                'tap' : hideItem,
                'swipe' :hideItem
            });


            _this.on(settings.event,function(e){
                if(_items.length > 0){
                    return;
                }
                if(_items.length == 0){
                    createItem(settings.count);
                }
                $.each(_items,function(k,item){
                    var angle = settings.angle * k;
                    Move($(item),angle + 180);
                });
            });
        }
    })
})(Zepto)