let container = $("#container");
let countdown = $("#countdown");

let hari;
let bunny;
let food;
let goose;
// let score = $("#score");

//모든 오브젝트가 준비되면 변수할당&실행
$(document).ready(function () {
  const startButton = $("#startButton");
  let contents = $("#contents");

  hari = $("#hari");
  bunny = $("#rabbit");
  food = $(".food");
  goose = $(".toAvoid");
  countdown = $("#countdown");

  //초기화면 세팅
  moveBackground();
  contents.hide(); //hari, food, goose, score, countdown 포함
  countdown.hide();
  $("#gameclear_screen").hide();

  let isClear = false;

  //배경화면 움직이기
  function moveBackground() {
    let position = 0;
    setInterval(function () {
      $("#container").css("background-position", position-- + "px");
    }, 20);
  }

  ////////////게임 시작 버튼을 누르면 안내메세지&버튼 사라지고
  startButton.click(function () {
    $("#start_screen").hide();
    startButton.hide();
    countStart();
  }); //click 함수 끝

  ///////////countstart 끝나면 gameStart
  function countStart() {
    // 3부터 countdown
    countdown.show();
    let count = 3;
    countdown.text(count);

    setInterval(() => {
      count--;
      countdown.text(count);
      if (count === 0) {
        clearInterval(this);
        // alert("게임이 시작되었습니다.");
        countdown.hide();
        gameStart();
      }
    }, 1000);
  }

  //게임 시작(임시 확인용)
  //   gameStart();
  //   $("#start_screen").hide();
  // $('#gameover_screen').show();
  // $('#gameclear_screen').show();

  ///////////////게임 시작시 모든 함수 실행
  function gameStart() {
    $("#bgmusic").get(0).play();

    contents.show();

    setKeyboardEvent();

    setTimeout(function () {
      objFood();
    }, 3000);

    setTimeout(function () {
      objToAvoid();
    }, 5000);

    checkGameOver();
    checkGameClear();
    $("#gameover_screen").hide();
  }

  /////////////하리(캐릭터) 따라다니기
  function followHari() {
    let whereHari = hari.position();
    bunny.css({
      left: whereHari.left - 10 + "px",
      top: whereHari.top + 70 + "px",
    });
  }
  setInterval(followHari, 1000 / 60);

  //최소~최대값 랜덤함수 구하기
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //여기서부터 score는 다시 넘버
  let score = 0;

  /////////////////////////먹어야 할 오브젝트
  function objFood() {
    // const food = $("#yammy");
    // 속도 조절
    const speed = getRandomNumber(2000, 3000);
    const range = getRandomNumber(200, 500);
    const time = getRandomNumber(2000, 5000);

    // 위에서부터 좌우위치 랜덤으로 낙하

    food
      .css("left", range + "px")
      .css("top", "0px")
      .animate(
        { top: "300px" },
        speed,
        "linear",
        function () {
          // 음식 리필
          setTimeout(function () {
            food.css("top", "-50px");
          }, time);
          objFood();
        },
        900
      );

    //먹으면 점수 증가
    setInterval(function () {
      if (isColliding(hari[0], food[0])) {
        score += 100;
        updateScore(score);
        food.stop();
        food.css("right", "-50px");
        objFood();
        // hari.stop();
      }
    }, 1000 / 60);
  }

  //////////////////////피해야할 오브젝트
  function objToAvoid() {
    // 속도 조절
    const speed = getRandomNumber(2000, 4000);

    // 장애물이 오른쪽에서 왼쪽으로
    goose.animate({ right: "700px" }, speed, "linear", function () {
      // 구스 리셋
      goose.css("right", "0px").css("display", "block");
      (")");
      objToAvoid();
    });

    let collided = false; //충돌 여부 확인
    let hasCollidedBefore = false;

    setInterval(function () {
      if (isColliding(hari[0], goose[0])) {
        collided = true;

        //첫 충돌일때만 점수 감소
        if (!hasCollidedBefore) {
          score -= 100;
          updateScore(score);
          hasCollidedBefore = true;
        }
        collided = false;
      }
    }, 1000 / 60);
  }

  //점수 반영 + 색변경
  function updateScore(score) {
    let currentScore = $("#score");
    currentScore.text(score).append("점");

    if (parseInt(currentScore.text()) < 0) {
      currentScore.css("color", "red");
    } else {
      currentScore.css("color", "aliceblue");
    }
  }

  //충돌 감지
  //하리전용
  function isColliding(object1, object2) {
    // const char = object1.getBoundingClientRect();
    const char = {
      //230513 22:03 1차 수정
      bottom: object1.getBoundingClientRect().bottom - 20,
      top: object1.getBoundingClientRect().top + 30,
      right: object1.getBoundingClientRect().right - 10,
      left: object1.getBoundingClientRect().left + 20,
    };

    const obj = object2.getBoundingClientRect();

    return !(
      char.bottom < obj.top ||
      char.top > obj.bottom ||
      char.right < obj.left ||
      char.left > obj.right
    );
  }

  ///////////////게임클리어 조건
  function checkGameClear() {
    setInterval(function () {
      // console.log(score > 100);
      if (score >= 1000) {
        isClear = true;
        console.log("gameClear!!");
        // hari.stop();
        goose.stop();
        food.stop();
        bunny.hide();

        // 5초 후에 $('#sleeping-hari').display('block') 함수가 실행되고, 3초 후에 산책완료 메세지를 출력
        setTimeout(function () {
          $("#gameclear_screen").show();
          setTimeout(function () {
            $("#gameclear_msg").show();
          }, 3000);
        }, 10000);

        clearInterval(this);
      }
    }, 1000 / 60);
  }

  /////////////////////게임오버 조건
  function checkGameOver() {
    const isGameOver = false;
    setInterval(function () {
      if (score <= -200) {
        hari.stop();
        food.stop();
        goose.stop();
        $("#gameover_screen").show();
        // $('#start_screen').hide();
        isGameOver = true;
      }
    });
  }

  // callBunny가능한 횟수
  let chance = 3;

  // 키보드 이벤트 정의
  function setKeyboardEvent() {
    $("html").keydown(function (e) {
      switch (e.key) {
        case "ArrowLeft":
        case "A":
        case "a":
          moveLeft();
          break;
        case "ArrowRight":
        case "D":
        case "d":
          moveRight();
          break;
        case " ": //spacebar
          if (!isJumping) jump();
          break;
        case "F":
        case "f":
          if (!isCalled && chance > 0) callBunny();
          break;
        case "R":
        case "r":
          retry();
          break;
      }
      console.log(e.key);
    });

    function moveLeft() {
      hari.animate({ left: "-=15px" }, 0);
      if (hari.position().left < 0) {
        hari.animate({ left: "+=15px" }, 0);
      }
      //왼쪽벽에 닿는지
      const hariLeftMargin = hari.position().left;
      if (hariLeftMargin < 30) {
        hari.animate({ left: "+=10px" }, 0);
      }
    }
    function moveRight() {
      hari.animate({ left: "+=15px" }, 0);
      //1번
      if (hari.position().left > 450) {
        hari.animate({ left: "-=15px" }, 0);
      }
      //오른쪽 한계
      const hariRightMargin = hari.position().left;
      if (hariRightMargin > container.width() - hari.width()) {
        hari.animate({ left: "-=10px" }, 0);
      }
    }
    // 점프 중인지?
    let isJumping = false;
    function jump() {
      isJumping = true;
      hari
        .animate({ bottom: "+=110px" }, 300)
        .animate({ bottom: "-=110px" }, 500, function () {
          isJumping = false;
        }); //합쳐줬음
    }

    let isCalled = false;
    // 필살기, 친구 부르기
    function callBunny() {
      isCalled = true;

      //bunny = $("#rabbit"); 이건 안되고...
      let bunny = $("#rabbit");

      $("#bark").get(0).play();

      const initialPosition = bunny.position().left;

      bunny.animate(
        { left: "+=300px" },
        //숫자 낮으면 빠르고, 높으면 느려짐
        300,
        "linear",
        function () {
          //돌아올때 방향전환
          bunny.css("transform", "scaleX(-1)");
          bunny.animate(
            { left: initialPosition + "px" },
            1000,
            "linear",
            function () {
              //그리고 다시 원상태
              bunny.css("transform", "none");
            }
          );
        }
      );
      // killGoose();
      // const fox = document.querySelector("#fox");

      //토끼의 거위잡기
      function killGoose() {
        const bunny = document.querySelector("#rabbit");
        const bunnyRect = bunny.getBoundingClientRect();
        const goose = document.querySelector("#goose");
        const gooseRect = goose.getBoundingClientRect();

        //일단은 chance를 임시로 여기에.
        if (chance > 0 && bunnyRect.x + bunnyRect.width > gooseRect.x) {
          // alert("거위를 잡았다!");
          goose.style.display = "none";
        }
      }
      setInterval(killGoose, 1000 / 60);
      isCalled = false;
      chance--;
    }
  }
  // });

  ///////////다시하기
  function retry() {
    $("#gameover_screen").hide();
    count = 3;
    // contents.position(defaultPosition);
    // gameStart();
  }
}); //ready 함수 끝
