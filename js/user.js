function User(uber) {
	this.index = uber.index;
	this.soKM = uber.soKM;
	this.soTg = uber.soTg;
	this.dsXe = uber.DSXe;
	this.name = uber.name;

  this.getInfo=function(){
    var loaixe=this.dsXe;
    var uberName=loaixe[this.index];
    return (
      [this.soKM,this.soTg,uberName]
    )
  }
	this.tinhtien= function() {
    var loaixe=this.dsXe;
    var uberName=loaixe[this.index];
    var tien1, tien20, tien21, tienTg, tongtien;
    tien1 = uberName.km1*1;
    tienTg = uberName.giaTg * this.soTg;
    if (this.soKM > 20) {
      tien20 = uberName.km20 * 19;
      tien21 = uberName.km21 * (this.soKM - 20);
    } else if (this.soKM <= 20 && this.soKM > 1) {
      tien20 = (this.soKM - 1) * uberName.km20;
      tien21 = 0;
    } else {
      tien20 = 0;
      tien21 = 0;
    }
    tongtien = tien1 + tien20 + tien21 + tienTg;
    return (
      [tien1, tien20, tien21, tienTg, tongtien]
    )
  }
}
