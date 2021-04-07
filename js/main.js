'use strict'
function createEle(ele) {
  return document.createElement(ele)
}
function getEle(id) {
  return document.getElementById(id);
}
function getValue(id) {
  return getEle(id).value;
}
function layGiaTriSo(value) {
	return value ? parseFloat(value) : 0;
}
var UberX=new loaixe('uberX',8000,12000,10000,2000);
var UberSUV=new loaixe('uberSUV',9000,14000,12000,3000);
var UberBlack=new loaixe('uberBlack',10000,16000,14000,4000);
var DSXe =new dsXe();
DSXe.themXe(UberX);
DSXe.themXe(UberSUV);
DSXe.themXe(UberBlack);
function indexXe(){
  var index,i;
  var uber = document.querySelectorAll('li.type input');
  for (i = 0; i < uber.length; i++) {
    if (uber[i].checked) {
      index = i;
    }
  }
  return index;
}
function chonXe() {
  var i, j, index, loaiUber;
  var uber = document.querySelectorAll('li.type input');
  for (i = 0; i < uber.length; i++) {
    if (uber[i].checked) {
      index = i;
    }
  }
  for (j = 0; j < uber.length; j++) {
    if (DSXe.arr[j].name== uber[index].id) {
      loaiUber=DSXe.arr[j];
    }
  }
  return index,loaiUber;
}
function kiemTra() {
  var message = [];
  if (!getValue('iptKM')||getValue('iptKM')==0) {
		message.push('số KM');
	}
	if (!getValue('iptTg')) {
		message.push('thời gian chờ');
	}
	if (indexXe()==undefined) {
		message.push('loại xe');
	}
	if (message.length) {
		alert('Vui lòng nhập ' + message.join(', '));
		return false;
	}
	return true;
}
function xuattien() {
  var kiemtra = kiemTra();
  if (kiemtra == true) {
    var user= new User ({
      index:indexXe(),
      soKM:layGiaTriSo(getValue('iptKM')),
      soTg : layGiaTriSo(getValue('iptTg')),
      DSXe:DSXe.arr,
      name:chonXe()
    })
    var [tien1, tien20, tien21, tienTg, tongtien] = user.tinhtien();
    return (
      getEle('xuatTien').innerHTML = tongtien,
      getEle('divThanhTien').style.display = 'block'
    )
  };
}
function taodong(tbody, dt1, dt2, dt3, dt4) {
  var tr = createEle('tr');
  var td1 = createEle('td');
  var td2 = createEle('td');
  var td3 = createEle('td');
  var td4 = createEle('td');
  td1.innerHTML = dt1;
  td2.innerHTML = dt2;
  td3.innerHTML = dt3;
  td4.innerHTML = dt4;
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  return tbody.appendChild(tr);
}
function inhoadon() {
  getEle('inHoaDon').removeAttribute('data-toggle');
  var kiemtra = kiemTra();
  if (kiemtra == true) {
    getEle('inHoaDon').setAttribute('data-toggle', 'modal');
    var user= new User ({
      index:indexXe(),
      soKM:layGiaTriSo(getValue('iptKM')),
      soTg : layGiaTriSo(getValue('iptTg')),
      DSXe:DSXe.arr,
      name:chonXe()
    })
    var [tien1, tien20, tien21, tienTg, tongtien] = user.tinhtien();
    var [soKM,soTg,uberName]=user.getInfo();
    var tbody = getEle('tModal');
    tbody.innerHTML = '';
    taodong(tbody, uberName.name, '1 km', uberName.km1, tien1);
    if (soKM <= 20 && soKM > 1) {
      taodong(tbody, uberName.name, (soKM - 1) + ' km', uberName.km20, tien20);
    }
    else if (soKM > 20) {
      taodong(tbody, uberName.name, '19 km', uberName.km20, tien20);
      taodong(tbody, uberName.name, (soKM - 20) + ' km', uberName.km21, tien21);
    }
    taodong(tbody, 'Thời gian chờ', soTg + ' phút', uberName.giaTg, tienTg);
    taodong(tbody, 'Total', '', '', tongtien);
  };
}
getEle('inHoaDon').addEventListener('click', function () {
  inhoadon();
});
getEle('tinhTien').addEventListener('click', function () {
  xuattien();
});
