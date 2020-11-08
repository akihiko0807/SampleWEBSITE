// jsを記述する際はここに記載していく

// バーガーボタン
$(function () {
  $(".burger-btn").on("click", function () {
      $(".header-nav").toggleClass("open");
      $(".bglayer").toggleClass("open");
      $(this).toggleClass("open");
  });
});
$(function () {
  $(".bglayer").on("click", function () {
    if( $("burger-btn").hasClass("open") ){ //バーガーボタンからレイヤーが作動している場合
      $(".header-nav").toggleClass("open");
      $(".burger-btn").toggleClass("open");
      $(this).toggleClass("open");
    } else {                                //フッターのカメラボタンからレイヤーが作動している場合
      $(".camera-nav").toggleClass("open");
      $(".bglayer").toggleClass("open");
    }
  });
});
$(function () {
  $(".header-nav-item").on("click", function () {
    if( $(".burger-btn").hasClass("open") ){
      $(".burger-btn").removeClass("open");
      $(".header-nav").removeClass("open");
      $(".bglayer").removeClass("open");
  }});
});

// カメラ
$(function () {
  $(".camera-toggle").on("click", function (){
    $(".camera-nav").toggleClass("open");
    $(".bglayer").toggleClass("open");
    });
});

$(function(){
  $(".camera-toggle").hover(function(){
  $(this).text("Hi! Cheeese!");
  }, function(){
    $(this).text("Cheeese");
  });
});

$(function(){
  $("#reload").on(("click"), function(){
    location.reload();
  });
});

// 視力検査

const PINPON    = document.querySelector('#correct-se');
const SHIBOU    = document.querySelector('#incorrect-se');
const FF        = document.querySelector('#ff-fanfare');
const BB        = document.querySelector('#bigbridge');
const UP        = document.querySelector('#up');
const LEFT      = document.querySelector('#left');
const RIGHT     = document.querySelector('#right');
const DOWN      = document.querySelector('#down');

$(function (){
  $("#test-start-btn").on("click", function (){
    $(this).css({'display' : 'none'});
    $("#c-img").css({"margin-bottom" : "100px"});
    const r = Math.ceil( Math.random() * 4 );
    BB.play();
    if (r == 1){
      $("#c-img").animate({zIndex:1},{
        //1秒かけてアニメーション
        duration:4000,
        //stepは、アニメーションが進むたびに呼ばれる
        step:function(now){
          //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
          //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
          $("#c-img").css({transform:'rotate(' + (now * 7200) + 'deg)'});
          $("#right").addClass("correct");
        },
        //終わったら
        complete:function(){
          //次のために、元に戻しておく
          $("#c-img").css('zIndex', 0);
        }
      })
    } 
    if (r == 2){
      $("#c-img").animate({zIndex:1},{
        //1秒かけてアニメーション
        duration:4000,
        //stepは、アニメーションが進むたびに呼ばれる
        step:function(now){
          //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
          //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
          $("#c-img").css({transform:'rotate(' + (now * 7290) + 'deg)'});
          $("#down").addClass("correct");
        },
        //終わったら
        complete:function(){
          //次のために、元に戻しておく
          $("#c-img").css('zIndex', 0);
        }
      })
    }
    if (r == 3){
      $("#c-img").animate({zIndex:1},{
        //1秒かけてアニメーション
        duration:4000,
        //stepは、アニメーションが進むたびに呼ばれる
        step:function(now){
          //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
          //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
          $("#c-img").css({transform:'rotate(' + (now * 7380) + 'deg)'});
          $("#left").addClass("correct");
        },
        //終わったら
        complete:function(){
          //次のために、元に戻しておく
          $("#c-img").css('zIndex', 0);
        }
      })
    }
    if (r == 4){
      $("#c-img").animate({zIndex:1},{
        //1秒かけてアニメーション
        duration:4000,
        //stepは、アニメーションが進むたびに呼ばれる
        step:function(now){
          //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
          //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
          $("#c-img").css({transform:'rotate(' + (now * 7470) + 'deg)'});
          $("#up").addClass("correct");
        },
        //終わったら
        complete:function(){
          //次のために、元に戻しておく
          $("#c-img").css('zIndex', 0);
        }
      })
    }
  });
});



// ーーーー回答を何回しているかカウントするーーーー
let ansCnt = 0;

function counter(){
  ansCnt++;
  console.log(ansCnt);
  if( ansCnt == 1){
    $("#result-text").html("あなたの目はふし穴です");
    $(".c-img-wrapper").css({'width' : '20px'});
  }
  if( ansCnt == 2){
    $("#result-text").html("あなたの目は割とふし穴です");
    $(".c-img-wrapper").css({'width' : '10px'});
  }
  if( ansCnt == 3){
    $("#result-text").html("あなたの目は人並みです");
    $(".c-img-wrapper").css({'width' : '5px'});
  }
  if ( ansCnt == 4){
    $("#result-text").html("あなたの目はかなり良いです");
    $(".c-img-wrapper").css({'width' : '2px'});
  }
  if ( ansCnt == 5){
    $("#result-text").addClass("final-result-text");
    $("#right").addClass("final-result");
    $("#down").addClass("final-result");
    $("#left").addClass("final-result");
    $("#up").addClass("final-result");
  }
}



// $(function (){
//   $('[name = answer]').on("click", function(){
//     let i = 0;
//     i++;
//   })
// })
// ーーーーーーーーーーーーーーーーーーーーーーーー

$(function () {
  $("#right").on("click", function (){
    if($(this).hasClass("correct")){                   // 正解だった場合
      // 正解の音を鳴らして
      PINPON.play();
      // Cのwidthを小さくして
      // $(".c-img-wrapper").css({'width' : '30px'});
      if($(this).hasClass("final-result")){    // 四回目の回答で正解だった場合
        $(".camera-nav").toggleClass("open");
        $(".bglayer").toggleClass("open");
        $(".final-result-text").html("あなたの視力はマサイ並み！");
        BB.pause();
        FF.play();
      } else {
        // もう一度テストスタートさせる
        $("#test-start-btn").click();
        // correctクラスをremoveして
        $(this).removeClass("correct");  
      }
    } 
    else {                                      // 不正解だった場合
      // 不正解の音を鳴らして
      BB.pause();
      SHIBOU.play();
      // camera-navを起動させて
      $(".camera-nav").toggleClass("open");
      $(".bglayer").toggleClass("open");
    }
    });
});


$(function () {
  $("#down").on("click", function (){
    if($(this).hasClass("correct")){                   // 正解だった場合
      // 正解の音を鳴らして
      PINPON.play();
      // Cのwidthを小さくして
      // $(".c-img-wrapper").css({'width' : '30px'});
      if($(this).hasClass("final-result")){    // 四回目の回答で正解だった場合
        $(".camera-nav").toggleClass("open");
        $(".bglayer").toggleClass("open");
        $(".final-result-text").html("あなたの視力はマサイ並み！");
        BB.pause();
        FF.play();
      } else {
      // もう一度テストスタートさせる
      $("#test-start-btn").click();
      // correctクラスをremoveして
      $(this).removeClass("correct");
      }
    } else {                                      // 不正解だった場合
      // 不正解の音を鳴らして
      BB.pause();
      SHIBOU.play();
      // camera-navを起動させて
      $(".camera-nav").toggleClass("open");
      $(".bglayer").toggleClass("open");
    }
    });
});

$(function () {
  $("#left").on("click", function (){
    if($(this).hasClass("correct")){                   // 正解だった場合
      // 正解の音を鳴らして
      PINPON.play();
      // Cのwidthを小さくして
      // $(".c-img-wrapper").css({'width' : '30px'});
      if($(this).hasClass("final-result")){    // 四回目の回答で正解だった場合
        $(".camera-nav").toggleClass("open");
        $(".bglayer").toggleClass("open");
        $(".final-result-text").html("あなたの視力はマサイ並み！");
        BB.pause();
        FF.play();
      } else {
      // もう一度テストスタートさせる
      $("#test-start-btn").click();
      // correctクラスをremoveして
      $(this).removeClass("correct");
      }
    }
    else {                                      // 不正解だった場合
      // 不正解の音を鳴らして
      BB.pause();
      SHIBOU.play();
      // camera-navを起動させて
      $(".camera-nav").toggleClass("open");
      $(".bglayer").toggleClass("open");
    }
    });
});

$(function () {
  $("#up").on("click", function (){
    if($(this).hasClass("correct")){                   // 正解だった場合
      // 正解の音を鳴らして
      PINPON.play();
      // Cのwidthを小さくして
      // $(".c-img-wrapper").css({'width' : '30px'})
      if($(this).hasClass("final-result")){    // 四回目の回答で正解だった場合
        $(".camera-nav").toggleClass("open");
        $(".bglayer").toggleClass("open");
        $(".final-result-text").html("あなたの視力はマサイ並み！");
        BB.pause();
        FF.play();
      } else {
      // もう一度テストスタートさせる
      $("#test-start-btn").click();
      // correctクラスをremoveして
      $(this).removeClass("correct");
      }
    } 
    else {                                      // 不正解だった場合
      // 不正解の音を鳴らして
      BB.pause();
      SHIBOU.play();
      // camera-navを起動させて
      $(".camera-nav").toggleClass("open");
      $(".bglayer").toggleClass("open");
    }
    });
});





// スワイパー
var mySwiper = new Swiper ('.swiper-container', {
  autoplay: {
    delay: 0,
  },
  slidesPerView: 3.5,
  centeredSlides: true,
  loop: true,
  speed: 7500,
});

// スムーススクロール
var scroll = new SmoothScroll('a[href*="#"]', {
  header: '[data-scroll-header]',
});

// AOS
AOS.init()