var province = document.getElementById('province');
var city = document.getElementById('city');
var country = document.getElementById('country');
var community = document.getElementById('community');
var add = document.getElementById('add_complete');
var address = document.getElementById('add_complete').getElementsByTagName('span');
var codeName = null;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        codeName = JSON.parse(xmlhttp.responseText);
        //省级行政区列表
        for (let i in codeName) {
            if (codeName[i].code.length == 2) {
                province.add(new Option(codeName[i].name, codeName[i].code));
            }
        }
        province.addEventListener('change', function () {
            //地市级行政
            city.options.length = 1;
            country.options.length = 1;
            country.value = '';
            for (let i in address) {
                address[i].innerHTML = '';
            }
            for (let i in codeName) {
                var tempStr = codeName[i].code.substring(0, 2);
                if (tempStr == province.value.substring(0, 2)) {
                    if (codeName[i].code.length == 4) {
                        city.add(new Option(codeName[i].name, codeName[i].code));
                        //直辖市没有地级市行政区列表
                    } else if (codeName[i].code.length == 6 && (tempStr == '11' || tempStr == '12' || tempStr == '31' || tempStr == '50')) {
                        country.add(new Option(codeName[i].name, codeName[i].code));
                    }
                }
            }
            if (province.value == 0) {
                address[0].innerHTML = '';
            } else {
                address[0].innerHTML = province.options[province.selectedIndex].text;
                add.style.display = 'inline';
            }
        });
        city.addEventListener('change', function () {
            //县区列表
            country.options.length = 1;
            community.value = '';
            for (let i in address) {
                address[i].innerHTML = '';
            }
            address[0].innerHTML = province.options[province.selectedIndex].text;
            for (let i in codeName) {
                if (codeName[i].code.length == 6 & codeName[i].code.substring(0, 4) == city.value.substring(0, 4)) {
                    country.add(new Option(codeName[i].name, codeName[i].code));
                }
            }
            if (city.value == 0) {
                address[1].innerHTML = '';
            } else {
                address[1].innerHTML = city.options[city.selectedIndex].text;
            }
        });
        country.addEventListener('change', function () {
            country.value = '';
            for (let i in address) {
                address[i].innerHTML = '';
            }
            address[0].innerHTML = province.options[province.selectedIndex].text;
            if (city.value == 0) {
                address[1].innerHTML = '';
            } else {
                address[1].innerHTML = city.options[city.selectedIndex].text;
            }
            if (country.value == 0) {
                address[2].innerHTML = '';
            } else {
                address[2].innerHTML = country.options[country.selectedIndex].text;
            }
        });
        country.addEventListener('blur', function () {
            address[3].innerHTML = community.value;
        });
    }
}
xmlhttp.open('GET', 'Chinacode.json', true);
xmlhttp.send();


