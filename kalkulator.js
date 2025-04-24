let history = [];
const angkaInputs = document.querySelectorAll('input[type="number"]');
const notifSukses = document.getElementById('notif');
const historyList = document.getElementById('historyList');
const historySection = document.getElementById('history');
const hasilElem = document.getElementById('result');
const errorElem = document.getElementById('error');

function calculate(operator) {
    const angka1 = parseFloat(document.getElementById('angka1').value);
    const angka2 = parseFloat(document.getElementById('angka2').value);

    if (isNaN(angka1) || isNaN(angka2)) {
        showError('Masukkan Angka Terlebih Dahulu!');
        return;
    }

    let result;
    switch (operator) {
        case '+':
            result = angka1 + angka2;
            break;
        case '-':
            result = angka1 - angka2;
            break;
        case '*':
            result = angka1 * angka2;
            break;
        case '/':
            if (angka2 === 0) {
                showError('Tidak bisa membagi dengan nol.');
                return;
            }
            result = angka1 / angka2;
            break;
        case '%':
            if (angka2 === 0) {
                showError(`${angka1}% dari 0 adalah 0`);
                return;
            }
            result = (angka1 / 100) * angka2;
            break;
        default:
            showError('Operasi tidak valid.');
            return;
    }

    showResult(result);
    TampilkanHistory(angka1, operator, angka2, result);
}

function showResult(result) {
    hasilElem.innerText = `Hasil: ${result}`;
    errorElem.style.display = 'none';
    
    if (notifSukses) {
        notifSukses.style.display = 'block';
        notifSukses.innerText = 'Perhitungan berhasil!';
        
        setTimeout(function() {
            notifSukses.style.display = 'none';
        }, 3000);
    }
}

function showError(message) {
    errorElem.innerText = message;
    errorElem.style.display = 'block';
    hasilElem.style.display = 'none';
}

function reset() {
    document.getElementById('angka1').value = '';
    document.getElementById('angka2').value = '';
    hasilElem.innerText = '';
    errorElem.style.display = 'none';

    if (notifSukses) {
        notifSukses.style.display = 'none';
    }
}

function TampilkanHistory(angka1, operator, angka2, result) {
    history.push(`${angka1} ${operator} ${angka2} = ${result}`);
    if (history.length > 0) {
        historySection.style.display = 'block';
        historyList.innerHTML = '';
        history.forEach(item => {
            const li = document.createElement('li');
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
    input.addEventListener('input', function() {
        if (this.value.length > 1 && this.value.startsWith('0') && !this.value.startsWith('0.')) {
            this.value = this.value.replace(/^0+/, '');
        }
    });
});
