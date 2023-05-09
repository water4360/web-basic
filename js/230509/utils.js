// 반환값return이 없고, 인자parameter도 없는 함수
function welcome() {
  // alert("환영해! from utils.js");
  console.log("alert 대신에 console.log에 찍어볼까?");
}

//
function sum(x, y) {
  let result = x + y;
  console.log(result);
}

function total(x, y) {
  return x + y;
}

// 이름을 입력받고
// 이름이 제대로 입력되지 않으면, 재입력받은 후
// 제대로 입력되면 로그에 이름 출력, 경고창으로 이름+환영인사 출력
function enterName() {
  const name = prompt("이름을 입력해주세요");
  if (name !== "" && name !== null) {
    // alert(name + "님, 환영합니다!");
    alert(`${name}님, 환영합니다!`);
    console.log(name + "님, 안녕하세요 :)");
  } else {
    alert("이름을 다시 입력해주세요");
    enterName();
  }
}

function enterNum() {
  //prompt를 통해 숫자를 입력받고,
  //입력받은 숫자를 num에 저장합니다
  const num = prompt("1~100 사이의 숫자를 입력해주세요");

  //num이 숫자이고 + 1~100 사이의 숫자라면 for문 출동!
  if (!isNaN(num) && 1 <= num && num <= 100) {
    for (let i = 1; i <= 100; i++) {
      console.log(i);
    }
    alert("1~100 사이의 숫자출력 완료!");
    //숫자이긴 한데 범위만 벗어난거면
  } else if (!(1 <= num && num <= 100)) {
    alert("1부터 100 사이의 숫자여야 해요.");
    enterNum();
    //취소를 누르면
  } else if (num === null) {
    alert("입력을 취소했어요~");
    //그 밖의 비정상적인 입력들은 경고+함수 재호출
  } else {
    alert("잘못 입력했어요~");
    enterNum();
  }
}
