function enterText() {
    let text = prompt('텍스트를 입력해주세요^ㅁ^');

    //텍스트가 0이면
    if (text.length === 0) {
        alert("다시 입력해주세요!");
        enterText();
    //정상 입력이면 텍스트 출력, 버튼 나타내기
    } else {
        let div = document.getElementById('textHere');
        // div.innerHTML = '<h1>' + text + '</h1>';
        div.innerHTML = `<h1>${text}</h1>`;
        
        showButton();
    }
}

function showButton() {
    let btn = document.getElementById('buttonHere');
    btn.innerHTML = `<input type="button" class="btn" value="파랑으로" onclick="changeColor('blue')"></input>
                     <input type="button" class="btn" value="빨강으로" onclick="changeColor('red')"></input>
                     <input type="button" class="btn" value="초록으로" onclick="changeColor('green')"></input>`;
    
}

function changeColor(colorName) {
    let textColor = document.getElementById('textHere');
    textColor.style.color = colorName;
}