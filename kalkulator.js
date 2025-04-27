let history = [];
const angkaInputs = document.querySelectorAll('input[type="number"]');
const notifSukses = document.getElementById('notif');
const historyList = document.getElementById('historyList');
const historySection = document.getElementById('history');
const hasilElem = document.getElementById('result');
const errorElem = document.getElementById('error');

function calculate(operator) {
    const angka1Value = document.getElementById('angka1').value;
    const angka2Value = document.getElementById('angka2').value;

    if (['+', '-', '*', '/', '%'].includes(operator)) {
        if (!angka1Value && angka2Value) {
            showError('Angka 1 harus diisi!');
            return;
        } else if (angka1Value && !angka2Value) {
            showError('Angka 2 harus diisi!');
            return;
        }
    }

    const angka1 = angka1Value ? parseFloat(angka1Value) : null;
    const angka2 = angka2Value ? parseFloat(angka2Value) : null;

    let result1, result2;
    let displayResult = '';

    switch (operator) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            if (angka1 === null || angka2 === null) {
                showError('Kedua angka harus diisi!');
                return;
            }
            if (operator === '+') result1 = angka1 + angka2;
            else if (operator === '-') result1 = angka1 - angka2;
            else if (operator === '*') result1 = angka1 * angka2;
            else if (operator === '/') {
                if (angka2 === 0) {
                    showError('Tidak bisa membagi dengan nol.');
                    return;
                }
                result1 = (angka1 / angka2).toFixed(9);
            }
            else if (operator === '%') result1 = (angka1 / 100) * angka2;
            displayResult = `${result1}`;
            break;
        case 'sqrt':
            if (!angka1 && !angka2) {
                showError('Minimal satu angka harus diisi untuk operasi akar!');
                return;
            }
            if ((angka1 !== null && angka1 < 0) || (angka2 !== null && angka2 < 0)) {
                showError('Tidak bisa menghitung akar dari bilangan negatif.');
                return;
            }
            result1 = angka1 !== null ? Math.sqrt(angka1).toFixed(9) : '-';
            result2 = angka2 !== null ? Math.sqrt(angka2).toFixed(9) : '-';
            displayResult = `√${angka1 ?? ''}=${result1} | √${angka2 ?? ''}=${result2}`;
            break;
        case 'sin':
            if (!angka1 && !angka2) {
                showError('Minimal satu angka harus diisi untuk operasi sin!');
                return;
            }
            result1 = angka1 !== null ? Math.sin(toRadians(angka1)).toFixed(9) : '-';
            result2 = angka2 !== null ? Math.sin(toRadians(angka2)).toFixed(9) : '-';
            displayResult = `sin(${angka1 ?? ''})=${result1} | sin(${angka2 ?? ''})=${result2}`;
            break;
        case 'cos':
            if (!angka1 && !angka2) {
                showError('Minimal satu angka harus diisi untuk operasi cos!');
                return;
            }
            result1 = angka1 !== null ? Math.cos(toRadians(angka1)).toFixed(9) : '-';
            result2 = angka2 !== null ? Math.cos(toRadians(angka2)).toFixed(9) : '-';
            displayResult = `cos(${angka1 ?? ''})=${result1} | cos(${angka2 ?? ''})=${result2}`;
            break;
        case 'tan':
            if (!angka1 && !angka2) {
                showError('Minimal satu angka harus diisi untuk operasi tan!');
                return;
            }
            result1 = angka1 !== null ? Math.tan(toRadians(angka1)).toFixed(9) : '-';
            result2 = angka2 !== null ? Math.tan(toRadians(angka2)).toFixed(9) : '-';
            displayResult = `tan(${angka1 ?? ''})=${result1} | tan(${angka2 ?? ''})=${result2}`;
            break;
        default:
            showError('Operasi tidak valid.');
            return;
    }

    showResult(displayResult);
    TampilkanHistory(angka1, angka2, operator, displayResult);
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function showResult(result) {
    hasilElem.innerText = `Hasil: ${result}`;
    hasilElem.style.display = 'block';
    errorElem.style.display = 'none';

    if (notifSukses) {
        notifSukses.style.display = 'block';
        notifSukses.innerText = 'Perhitungan berhasil!';
        setTimeout(() => notifSukses.style.display = 'none', 3000);
    }

    document.getElementById('angka1').value = '';
    document.getElementById('angka2').value = '';
}

function showError(message) {
    errorElem.innerText = message;
    errorElem.style.display = 'block';
    hasilElem.style.display = 'none';
    setTimeout(function() {
        errorElem.style.display = 'none';
    }, 3000);
}

function reset() {
    document.getElementById('angka1').value = '';
    document.getElementById('angka2').value = '';
    hasilElem.innerText = '';
    errorElem.style.display = 'none';
    if (notifSukses) notifSukses.style.display = 'none';
}

function pindahkanHasilKeAngka1() {
    const hasilText = hasilElem.innerText.replace('Hasil: ', '');
    const angka1Input = document.getElementById('angka1');

    if (hasilText.includes('|') || hasilText.includes('=')) {
        showError('Tidak bisa memindahkan hasil fungsi ke angka 1!');
        return;
    }

    angka1Input.value = hasilText;
}

function TampilkanHistory(angka1, angka2, operator, result) {
    let historyItem;
    if (operator === 'sqrt' || operator === 'sin' || operator === 'cos' || operator === 'tan') {
        historyItem = `${result}`;
    } else {
        historyItem = `${angka1 ?? ''} ${operator} ${angka2 ?? ''} = ${result}`;
    }
    history.push(historyItem);
    if (history.length > 0) {
        historySection.style.display = 'block';
        historyList.innerHTML = '';
        history.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerText = item;
            historyList.appendChild(li);
        });
    }
}

function clearHistory() {
    history = [];
    historyList.innerHTML = '';
    historySection.style.display = 'none';
}

angkaInputs.forEach(input => {
    input.addEventListener('input', function () {
        errorElem.style.display = 'none';
        notifSukses.style.display = 'none';
        hasilElem.style.display = 'none';
    });
});
