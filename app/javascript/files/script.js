// initPhotoSwipeFromDOM(".my-gallery");
const lightbox = new PhotoSwipeLightbox({
  gallery: '.my-gallery',
    children: 'a',
    pswpModule: PhotoSwipe
});
lightbox.init();


$(function () {
  $(".card-caption").on("click", "a", function (e) {
    e.stopPropagation();
  });

  var $nav = $("#gnav");
  var offset = $nav.offset();
  var navHeight = $nav.innerHeight();
  var headerInner = $("#header .inner");

  $('a[href^="#"]').on("click", function () {
    var speed = 300;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - navHeight;
    $("html, body").animate(
      {
        scrollTop: position,
      },
      speed,
      "swing",
    );
    return false;
  });

  $("#js-pageTop").on("click", function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      300,
    );
    return false;
  });


  
  document
    .getElementById("support-msg-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const content = document.getElementById("messageContent").value;
      $("#submited-msg").hide();
      $("#support-msg-form").hide();
      $("#support-msg-loader-container").css({ display: "flex" });
      $("#support-msg-loader-container").show();
      fetch("/v1/support_msg_api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"), // CSRF対策
        },
        body: JSON.stringify({post: { value: content }}),
      })
        .then((response) => {
          if (!response.ok) {
            // 200番台以外はエラー扱い
            return response.json().then((errData) => {
              throw new Error(JSON.stringify(errData));
            });
          }
          return response.json();
        })
        .then((data) => {
          document.getElementById("messageContent").value = "";
          showSentMsg(data.message, "green");
        })
        .catch((error) => {
          showSentMsg(JSON.parse(error.message).message, "red");
        });
    });

  function showSentMsg(msg, color) {
    $("#support-msg-loader-container").hide();
    $("#support-msg-form").show();
    $("#submited-msg").text(msg);
    $("#submited-msg").css("color", color);
    $("#submited-msg").fadeIn();
  }

  // CSRFトークン取得関数
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // 非同期関数を定義
  async function fetchData() {
    try {
      const response = await fetch("./v1/support_msg_api");
      if (!response.ok) {
        throw new Error("ネットワークエラー");
      }
      const data = await response.json();
      console.log(data);
      for (const msg of data) {
        const ul = document.querySelector("ul.slider"); // ul.sliderを取得
        const newLi = document.createElement("li"); // 新しいli要素を作成
        newLi.textContent = msg["value"];
        ul.appendChild(newLi); // ulにliを追加
      }
      // $(".slider").slick({
      //   // オプションを記述
      // });
      // setInterval(function () {
      //   $(".slider").slick("slickNext");
      // }, 1500);
      $(".slick-arrow").hide();
      $("#support-msg-area").fadeIn();
    } catch (error) {}
  }

  fetchData();
});
