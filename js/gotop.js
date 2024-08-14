(function ($) {
    //使用JQUERY網頁載入時，插入<IMG>標記程式，並且先隱藏
    $("body").append("<img id='goTopButton' style='display: none; z-index:5; cursor: pointer; width:50px; height:50px; top:100px; right:100px; position:fixed;'title='回到頂端'/>");
    var img = "images/太極.png",        //用以控制使用那張圖片
      location = 0.9,             //按鈕出現在螢幕的高度
      right = 30,                   //距離右邊px值
      opacity = 0.6,                //預設透明度
      speed = 2000,                 //返回TOP捲動速度
      $button = $("#goTopButton"),  //選擇goTopButton件
      $body = $(document),          //選擇目前網頁
      $win = $(window);             //選擇目前的瀏覽器chrome
    $button.attr("src", img);       //將圖片設定到goTopButton的src

    //撰寫目前瀏覽器的自訂JS函數
    window.goTopMove = function () {
      var scrollH = $body.scrollTop(),  //取得距離TOP，75-165px數
        winH = $win.height(),  //取得瀏覽器高度
        css = { "top": winH * location + "px", "position": "fixed", "right": right, "opacity": opacity };
      if (scrollH > 20) {
        $button.css(css);
        $button.fadeIn("slow");
      } else {
        $button.fadeOut("slow");
        css = { "transform": "none", "transition": "none" };
        $button.css(css);
      }
    };
    //註冊瀏覽器監聽2個動作 1.scroll捲動 2.瀏覽器大小有變化時
    $win.on({
      scroll: function () { goTopMove(); },
      resize: function () { goTopMove(); }
    });
    //設定圖片監聽3個動作，分別為 1.滑鼠滑過去 2.滑鼠滑出去 3.按下動作
    $button.on({
      mouseover: function () { $button.css("opacity", 1); },
      mouseout: function () { $button.css("opacity", opacity); },
      click: function () {
        css = { "transform": "rotate(720deg)", "transition": "transform 3s ease 0s" };
        $button.css(css);
        $("html,body").animate({ scrollTop: 0 }, speed);
      }
    });
  })(jQuery);