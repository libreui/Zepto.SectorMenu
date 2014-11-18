Zepto.SectorMenu
================

This is Zepto Ex. SectorMenu Control


<script>
    $('#menul').sectorMenu({
        angle:45,
        radius:150,
        count:3,
        itemIcon:[
            'icon/01.png',
            'icon/02.png',
            'icon/03.png',
        ],
        itemTag:[
            'btn-share',
            'btn-wish',
            'btn-setting'
        ],
        itemClass:'hover',
        itemEvent:function(e){
            console.log($(this).data('tag'));
        },
        itemWidth:3,
        itemHeight:3,
        event:'tap'
    });
</script>
