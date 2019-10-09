var professionsArr = {};

function selectRadioBox(el) {
    //el.querySelectorAll('input[type=radio]')[0].checked=true;
    createAddChargeBtn();
}

function createAddChargeBtn() {
    var insertingEl = '<div><label for="profInpText" style="padding-left: 30px">Добавьте обязанность: </label><input class="clProfChargeBtn" id="chargeInputText" type="text"> <button class="chargeTabBtns" onclick="addNewCharge(this);">Добавить обязанность</button></div>';

    if(document.getElementById('chargeInputText') === null){
        document.getElementById('addProfChargeBtn').insertAdjacentHTML('beforeend',insertingEl)
    }
}

function addNewCharge(el) {
    var fromInput   = document.getElementById('chargeInputText').value,
        toTd        = document.getElementById('profTable').querySelectorAll('td input[type=radio]:checked')[0].closest('tr').children[2],
        profession  = document.getElementById('profTable').querySelectorAll('td input[type=radio]:checked')[0].closest('tr').children[1].innerText;

        if(professionsArr[profession][0] === undefined){
            professionsArr[profession]=[fromInput];
            toTd.innerHTML += "<div style='padding: 10px 0 10px'><em>"+fromInput+"</em> <button onclick=removeNewCharge(this)>x</button></div>";
        }else{
            if(professionsArr[profession].includes(fromInput) === true){
                alert('Такая обязанность по выбранной профессии уже имеется!');
            }else{
                professionsArr[profession].push(fromInput);
                toTd.innerHTML += "<div style='padding-bottom: 10px'><em>"+fromInput+"</em> <button onclick=removeNewCharge(this)>x</button></div>";
            }
        }
}

function removeNewCharge(el) {
     var a       = el.parentNode.innerText,
         divText = a.substring(0, a.length - 2),
         profText= el.closest('tr').children[1].innerText;

    for(var i = 0 ; i < professionsArr[profText].length; i++){
        if(professionsArr[profText][i] === divText){
            professionsArr[profText].splice(i,1);
            el.parentNode.remove();
        }
        }
}

function deleteProf(el) {
    var profsInTbl = document.getElementById('mainTable').querySelectorAll("[class='addProf'] div"),
        chargeText = el.closest('tr').children[1].innerText,
        td = [],
        row = [];

    for(var i = 0; i < profsInTbl.length; i++){
        if(profsInTbl[i].textContent === chargeText){
            td.push(i);
            if(row.indexOf(profsInTbl[i].closest('td').getAttribute('data-btntd')) !== 1){
                row.push(profsInTbl[i].closest('td').getAttribute('data-btntd'));
            }
        }
    }
    document.getElementById('chargeInputText').closest('div').remove();
    el.closest('tr').remove();
    deleteSelectedProf(el, row, td);
    delete professionsArr[''+chargeText+''];
}

function addNewProf(){
    var inputValue = document.getElementById('profInpText').value, tableElement='';
    tableElement+='<tr>' +
                    '<td style="text-align: center"><input onclick="selectRadioBox(this)" type="radio" id="radio1" name="radios" value="all" ></td>' +
                    '<td style="width: 30%;">'+inputValue+'</td>' +
                    '<td style="width: 30%;"></td>' +
                    '<td style="text-align: center"><img onclick="deleteProf(this);" style="vertical-align: middle; width: 3%;cursor: pointer" src="../icons/flat_close.png" alt="удалить">' +
                    '</td>' +
                  '</tr>';

    if(professionsArr[inputValue] !== undefined){
        alert('Данная профессия уже имеется');
    }else if(inputValue === ""){
        alert("Введи хоть что-то, а?");
    }else{
        document.getElementById('profTable').querySelectorAll('tbody')[0].insertAdjacentHTML('afterEnd',tableElement);
        professionsArr[inputValue]={};
        document.getElementById('profInpText').value = '';

        if(document.getElementById('tableEmptyIdent') !== null){
            document.getElementById('tableEmptyIdent').remove();
        }
    }
    //TODO: Не дружит в регистром
}