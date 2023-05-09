// 반환값return이 없고, 인자parameter도 없는 함수
function welcome() {
    // alert("환영해! from utils.js");
    console.log("alert 대신에 console.log에 찍어볼까?")
}

// 
function sum(x, y) {
    let result = x + y;
    console.log(result);
}

function total(x, y) {
    return x + y;
}

function enterName() {
    let name = prompt('이름을 입력해주세요');
    if (name !== '' && name !== null) {
        alert(name + "님, 환영합니다!");
        console.log(name + "님, 안녕하세요 :)");
    } else {
        alert('이름을 다시 입력해주세요');
        enterName();
    }
}