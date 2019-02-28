import {RenderGame} from "./Renderer/Game";

window.onload = () => {
    let rows = 8;
    let cols = 8;
    let game = new RenderGame(rows, cols);

    // setup reset button
    let btn = <HTMLButtonElement>document.getElementById('gameReset');
    btn.addEventListener('click', (ev:UIEvent) => {
        let rowsInput = <HTMLInputElement>document.getElementById('numRows');
        game.rows = parseInt(rowsInput.value);
        let colsInput = <HTMLInputElement>document.getElementById('numCols');
        game.cols = parseInt(colsInput.value);
        game.resetGame();
        btn.innerHTML = 'Reset';
    });

    // rows input
    let rowsInput = <HTMLInputElement>document.getElementById('numRows');
    rowsInput.addEventListener('change', (ev: UIEvent) => {
        if (parseInt(rowsInput.value) > 14) rowsInput.value = '14';
        if (parseInt(rowsInput.value) <= 0) rowsInput.value = '1';
        btn.innerHTML = 'Update';
    });

    // columns input
    let colsInput = <HTMLInputElement>document.getElementById('numCols');
    colsInput.addEventListener('change', (ev: UIEvent) => {
        if (parseInt(colsInput.value) > 20) colsInput.value = '20';
        if (parseInt(colsInput.value) <= 0) colsInput.value = '1';
        btn.innerHTML = 'Update';
    });
};

