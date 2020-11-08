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
      stopStreamedVideo();
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
    syncCamera();                                   // カメラを同期させる
    });
});

$(function(){
  $(".camera-toggle").hover(function(){
  $(this).text("Hi! Cheeese!");
    POPI.play();
  }, function(){
    $(this).text("Cheeese");
  });
});

$(function(){
  $(".output-img").on(("click"), function(){
    // $(".check").removeClass("check-hidden");
    $(".check").fadeIn(3000);
    GOGOGO.play();
  });
});

$(function(){
  $("#nextstage").on('click',function(){
    NEXT.play();
    //2秒後
  $("#nextstage").delay(1500).queue(function(){
    window.location.href = "visiontest.html";
  });
});
});



//-----------------------------------------------------
// グローバル変数
//-----------------------------------------------------
const VIDEO = document.querySelector("#camera");    // <video>の要素を取得
const SE    = document.querySelector('#se');
const GOGOGO= document.querySelector('#gogogo');
const NEXT  = document.querySelector('#nextstage-se');
const POPI  = document.querySelector('#popi');
const DODON = document.querySelector('#dodon');




/** カメラ設定 */
const CONSTRAINTS = {    // constraintsの意味は「制約」
  audio: false,
  video: {
    width: 320,
    height: 240,
    facingMode: "user"   // フロントカメラを利用する
    // facingMode: { exact: "environment" }  // リアカメラを利用する場合
  }
};

//-----------------------------------------------------
// onload
//-----------------------------------------------------
// window.onload = () => {


  //-----------------------------
  // シャッターボタン
  //-----------------------------


// };

/**
 * [onload] カメラを<video>と同期
 */
function syncCamera(){
  navigator.mediaDevices.getUserMedia(CONSTRAINTS)
  .then( (stream) => {
    VIDEO.srcObject = stream;
    VIDEO.onloadedmetadata = (e) => {
      VIDEO.play();
    };
  })
  .catch( (err) => {
    console.log(`${err.name}: ${err.message}`);
  });
}






// -------------------------------------------------------
//  とりあえず貼り付けたバーチャル背景部分のjs
// -------------------------------------------------------
const { tf, bodyPix } = window;

(async () => {
  console.log(tf.version);
  console.log(bodyPix.version);

  // use WASM
  await tf.setBackend("wasm");

  const net = await bodyPix.load();

  // output source
  const $destCanvas = document.querySelector("canvas");

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  VIDEO.srcObject = stream;

  document.querySelector("#worker").onclick = async () => {
    DODON.play();
    // THESE LINES ARE REQUIRED!
    VIDEO.width = $destCanvas.width = VIDEO.videoWidth;
    VIDEO.height = $destCanvas.height = VIDEO.videoHeight;

    const destCtx = $destCanvas.getContext("2d");
    $destCanvas.style.backgroundImage = "url(./img/about_03.jpg)";
    $destCanvas.style.backgroundSize = "cover";

    // to remove background, need another canvas
    const $tempCanvas = document.createElement("canvas");
    $tempCanvas.width = VIDEO.videoWidth;
    $tempCanvas.height = VIDEO.videoHeight;
    const tempCtx = $tempCanvas.getContext("2d");

    (async function loop() {
      requestAnimationFrame(loop);

      // create mask on temp canvas
      const segmentation = await net.segmentPerson(VIDEO);
      const mask = bodyPix.toMask(segmentation);
      tempCtx.putImageData(mask, 0, 0);

      // draw original
      destCtx.drawImage(VIDEO, 0, 0, $destCanvas.width, $destCanvas.height);

      // then overwrap, masked area will be removed
      destCtx.save();
      destCtx.globalCompositeOperation = "destination-out";
      destCtx.drawImage($tempCanvas, 0, 0, $destCanvas.width, $destCanvas.height);
      destCtx.restore();
    })();
  };

  document.querySelector("#teacher").onclick = async () => {
    DODON.play();
    // THESE LINES ARE REQUIRED!
    VIDEO.width = $destCanvas.width = VIDEO.videoWidth;
    VIDEO.height = $destCanvas.height = VIDEO.videoHeight;

    const destCtx = $destCanvas.getContext("2d");
    $destCanvas.style.backgroundImage = "url(./img/course_02.jpg)";
    $destCanvas.style.backgroundSize = "cover";

    // to remove background, need another canvas
    const $tempCanvas = document.createElement("canvas");
    $tempCanvas.width = VIDEO.videoWidth;
    $tempCanvas.height = VIDEO.videoHeight;
    const tempCtx = $tempCanvas.getContext("2d");

    (async function loop() {
      requestAnimationFrame(loop);

      // create mask on temp canvas
      const segmentation = await net.segmentPerson(VIDEO);
      const mask = bodyPix.toMask(segmentation);
      tempCtx.putImageData(mask, 0, 0);

      // draw original
      destCtx.drawImage(VIDEO, 0, 0, $destCanvas.width, $destCanvas.height);

      // then overwrap, masked area will be removed
      destCtx.save();
      destCtx.globalCompositeOperation = "destination-out";
      destCtx.drawImage($tempCanvas, 0, 0, $destCanvas.width, $destCanvas.height);
      destCtx.restore();
    })();
  };
  document.querySelector("#btn-shutter").addEventListener("click", ()=>{
    // SE再生＆映像停止
    SE.play();
    $(".output-img").removeClass("output-close");
    $("#change-h").html("農場もあなたのものに");

    // やりたいこと
    // canvasを停止させてデータ化する
    document.querySelector("#output > .output-img").src = $destCanvas.toDataURL('image/webp');
  });
})();


// -------------------------------------------------------

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