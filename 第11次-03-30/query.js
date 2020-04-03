var input = document.getElementById('bankName');
var message = document.getElementById('message');
input.addEventListener('change', function () {
    var query = input.value;
    if (query == '') {
        return false;
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'tel.json', true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonDoc = eval(xmlhttp.responseText);
            var table = '<tr><th>银行名称</th><th>客服电话</th></tr>';
            for (var i in jsonDoc) {
                if (jsonDoc[i].bankName.indexOf(query) >= 0) {
                    table += '<tr><td>' + jsonDoc[i].bankName + '</td><td>' + jsonDoc[i].bankTel + '</td></tr>';
                }
            }
            if (table.length == 35) {   //如果json里没有数据table的长度是35
                table = "抱歉，没有找到该数据，请重新输入";
                //alert(table.length);
            }
            message.innerHTML = table;
        }
    }
    xmlhttp.send();
});