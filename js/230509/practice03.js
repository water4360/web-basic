function enterText() {
    let text = document.getElementById('inputText').value;
    // let text = inputText;

    //텍스트가 0이면
    if (text === null || text.length === 0) {
        alert('입력된 내용이 없어요')
        // enterText();
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