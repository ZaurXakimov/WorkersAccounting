Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function getUsers(count){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://randomuser.me/api/?results='+count, false);
    xhr.send();
    if (xhr.status != 200) {
      alert( xhr.status + ':222 ' + xhr.statusText );
    } else {
      var userInfo = xhr.responseText;
      putToTableUsers(JSON.parse(userInfo));
      return userInfo;
    }
}
function getLastRowIndex(name) {
    var inc = 0;
    for(var i=0; i < document.querySelectorAll(String(name)).length; i++){
        if(inc < Number(document.querySelectorAll(String(name))[i].getAttribute('data-addProf')) ){
            inc = Number(document.querySelectorAll(String(name))[i].getAttribute('data-addProf')) + 1;
        }
    }
    return inc;
}

function putToTableUsers(users){
    var tableArr = [],
        tableLength = document.getElementById('mainTable').getElementsByTagName("tr").length,
        inc = 0, dateBirth='';

    if(tableLength > 1){
        inc = getLastRowIndex('button[data-addProf]');
    }

    users.results.forEach(function (item,a,b) {
        dateBirth = ((item['dob']['date'].substring(10,-10)).split("-"));
        dateBirth = dateBirth[2]+'-'+dateBirth[1]+'-'+dateBirth[0];

        tableArr = '<tr class = "usersTbl" onclick="selectCheckbox(this);">' +
            '<td><input type="checkbox"></td>' +
            '<td>'+item['name']['first']+'</td>' +
            '<td>'+item['name']['last']+'</td>' +
            '<td>'+dateBirth+'</td>' +
            '<td style="text-align: center"> <img src="'+item['picture']['medium']+'" alt=""></td>' +
            '<td class="addProf" data-btnTd = '+inc+'>' +
            '<button data-addProf = '+inc+' onclick="createMdlProfessions(this);">Добавить профессию</button>' +
            '</td>' +
            '</tr>';
        document.getElementsByTagName('tbody')[0].insertAdjacentHTML('afterBegin',tableArr);
        inc++;
    });
}

function selectCheckbox(el){
    var selectedRow;
    if(el.querySelectorAll('input')[0].checked !== true){
        el.querySelectorAll('input')[0].checked = true;
    }else{
        el.querySelectorAll('input')[0].checked = false;
    }
    selectedRow = el.parentElement.querySelectorAll("input:checked").length;
    createDltBtn(selectedRow);
    createEdtBtn(selectedRow);
}

function createEdtBtn(el) {
    if(el === 1){
        document.getElementById('editRowBtn').setAttribute("style","display:");
    }else{
        document.getElementById('editRowBtn').setAttribute("style","display:none");
    }
}

function createDltBtn(el) {
    if(el >= 1){
        document.getElementById('deleteRowBtn').setAttribute("style","display:");
    }else{
        document.getElementById('deleteRowBtn').setAttribute("style","display:none");
    }
}

function deleteWorker() {
     if(confirm("Вы действительно хотите удалить сотрудника?")){
         if(confirm("У него двое детей и ипотека с кредитами")){
             var checkedRows =  document.getElementById('mainTable').querySelectorAll("input:checked");
             checkedRows.forEach(function (elem) {
             elem.closest('tr').remove();
             });
         }
     }
}

function createMdlEditWorker(el){
    var checkedRows =  document.getElementById('mainTable').querySelectorAll("input:checked")[0].closest('tr'),
        tdInCheckedRow = checkedRows.children,
        fName   = tdInCheckedRow[1].innerText,
        sName   = tdInCheckedRow[2].innerText,
        brtDate = tdInCheckedRow[3].innerText;

    var mdlDiv = [];
    mdlDiv.push(
            '<div id="myModal" class="modal">'+
                '<div class="modal-content">'+
                    '<span class="close">&times;</span>'+
                    '<div>'+
                    '<label for="fnId">Имя: </label><Br>' +
                        '<input type="text" name="fName" id="fnId" value="'+fName+'"> <Br>'+
                    '<label for="snId">Фамилия: </label><Br>' +
                        '<input type="text" name="sName" id="snId" value="'+sName+'"><Br>'+
                    '<label for="bdId">Дата рождения: </label><Br>' +
                        '<input type="text" name="birthDate" id="bdId" value="'+brtDate+'"><Br>'+
                        '<button onclick="editWorker(this)">Сохранить</button>'+
                    '</div>'+
                '</div>'+
            '</div>'

    );

    document.body.insertAdjacentHTML('beforeend',mdlDiv);
    document.getElementById('myModal').setAttribute("style","display:block");

    document.getElementsByClassName("close")[0].onclick = function che() {
        document.getElementById('myModal').remove();
    };

    window.onclick = function(event) {
        if (event.target === document.getElementById('myModal')) {
            document.getElementById('myModal').remove();
        }
    }
}

function editWorker(element){
    var dataInEditWnd   = element.parentNode.querySelectorAll('input'),
        checkedRows     =  document.getElementById('mainTable').querySelectorAll("input:checked")[0].closest('tr');

        checkedRows.children[1].innerText = dataInEditWnd[0].value;
        checkedRows.children[2].innerText = dataInEditWnd[1].value;
        checkedRows.children[3].innerText = dataInEditWnd[2].value;

        alert('Старые данные измененны на новые');
    document.getElementById('myModal').remove();
}

function openPage(pageName,elmnt,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

function getProfessionsArr(){
    return ["Инженер","Мастер гончарного дела", "Кодревъюер", "Грумер", "Верстальщик"];
}

function addProfToWorker(name, rowId) {
    var selected1 = [], content='';
    for (var i = 0; i < name.options.length; i++) {
        if (name.options[i].selected) selected1.push(name.options[i].value);
    }

    if(selected1.length > 0){
        for(var j=0;j<selected1.length;j++){
            content+='<div>'+selected1[j]+'<img onclick="deleteSelectedProf(this,'+rowId+', 0)" style="vertical-align: middle; width: 2%" src="../icons/flat_close.png"></div>';
        }
        document.querySelectorAll("[data-btnTd='"+rowId+"']")[0].innerHTML = "";
        document.querySelectorAll("[data-btnTd='"+rowId+"']")[0].innerHTML = content;
    }
}

function deleteSelectedProf(el, rowId, td) {
    if(td === 0){
        var parent = el.parentElement;
        parent.remove();
        if(document.querySelectorAll('[data-btntd="'+rowId+'"]')[0].children.length === 0){
            document.querySelectorAll('[data-btntd="'+rowId+'"]')[0].innerHTML = '<button data-addprof="'+rowId+'" onclick="createMdlProfessions(this);">Добавить профессию</button>';
        }
    }else{
        for(var i = td.length-1; i >=0; i--){
            var tdI = td[i];
            document.getElementById('mainTable').querySelectorAll("[class='addProf'] div")[tdI].remove();
        }
        for(var j = 0; j < rowId.length; j++ ){
            if(document.querySelectorAll('[data-btntd="'+rowId[j]+'"]')[0].children.length === 0){
                document.querySelectorAll('[data-btntd="'+rowId[j]+'"]')[0].innerHTML = '<button data-addprof="'+rowId[j]+'" onclick="createMdlProfessions(this);">Добавить профессию</button>';
            }
        }
    }
}

function createMdlProfessions(el){
    var mdlDiv = [], professions='', select='professionsSelect', rowId= el.getAttribute('data-addprof');
    professions = professionsArr;//getProfessionsArr();
                if(Object.size(professions) > 0){
                    mdlDiv.push(
                        '<div id="myModal" class="modal">'+
                        '<div class="modal-content">'+
                        '<span class="close">&times;</span>'+
                        '<p> Выберите профессию: <br>'+
                        '<select id="professionsSelect" multiple size="10">'
                    );

                    for(key in professions){
                        mdlDiv.push('<option>'+key+'</option>');
                    }

                    mdlDiv.push('</select></p>' +
                        '<button class="chargeTabBtns" onclick="addProfToWorker('+select, rowId+')">' +
                        'Добавить' +
                        '</button>'+
                        '</div>'+
                        '</div>'
                    );
                }else{
                    mdlDiv.push(
                        '<div id="myModal" class="modal">'+
                        '<div class="modal-content">'+
                        '<span class="close">&times;</span>'+
                        '<p>Профессии отсутствуют. Добавьте необходимые профессии на вкладке "Специаьности"</p>'+
                        '</div>'+
                        '</div>');
                }
            document.body.insertAdjacentHTML('beforeend',mdlDiv);
            document.getElementById('myModal').setAttribute("style","display:block");
            document.getElementsByClassName("close")[0].onclick = function che() {
            document.getElementById('myModal').remove();
            };

    window.onclick = function(event) {
      if (event.target === document.getElementById('myModal')) {
        document.getElementById('myModal').remove();
      }

    }
}


