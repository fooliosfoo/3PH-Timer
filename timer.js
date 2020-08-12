var kwhT;
var kw;
var c = 0;
function myCounter() {
  RstLbls();
  document.getElementById("TimeCntr").innerHTML = ++c;
  document.getElementById("widgets").value = "";
  post.style.display = 'none';
  StpBttnPst.style.display = 'block';
}
  function RstTmeCntr() {
  clearInterval(PlseTimer);   
  document.getElementById("seconds").value = document.getElementById("TimeCntr").innerHTML;
  document.getElementById("TimeCntr").innerHTML = "0";
  c = 0;
  post.style.display = 'block';
  StpBttnPst.style.display = 'none';
}
function RstLbls() {
  document.getElementById("widgets").value = "";
  document.getElementById("testResult").innerHTML = "";
  //document.getElementById("cautionTag").innerHTML = "";
  document.getElementById("amperage1s").innerHTML= "";
  document.getElementById("amperage").innerHTML= "";
  document.getElementById("seconds").value = "0";
  rstTbleFlds();
}
  function wattsFunction(){
  var x = document.getElementById("widgets").value;
  var y = document.getElementById("seconds").value;
  var result = "";
  var results = "";
  var time_widgets = 3600 * x;
  var results = time_widgets / y;
  //include transformer ratios
  var ptr = document.getElementById("ptVal").value;
  var ctr = document.getElementById("ctVal").value;
  results = results * ptr * ctr;
  var result = round(results, 2);
  //result = Math.round((time_widgets / y) * 100) / 100  //returns 00.00
  //result = parsefloat((time_widgets / y).toFixed(2));  //Breaks Code
  var wattCnv = result / 1000;
  kw = wattCnv.toFixed(2);
    if (kw > 999){
        mw = kw/1000;
        document.getElementById("testResult").innerHTML=result + " Watts = " + mw + " MW Per Hour";
    }
      else {
        document.getElementById("testResult").innerHTML=result + " Watts = " + kw + " KW Per Hour";
    }
      
  //dangerous=(result>4680)?"High":"Low";
  //document.getElementById("cautionTag").innerHTML=dangerous;
  //amps1s = (result / 120).toFixed(2);
  //document.getElementById("amperage1s").innerHTML=amps1s + " AMPS @ 120V";
  //amps2s = (result / 240).toFixed(2);
  //document.getElementById("amperage").innerHTML=amps2s + " AMPS @ 240V";
  
  //kwh=kw;
  calculate();
  //document.getElementById("kw?").innerHTML=amps2s + " AMPS @ 240V";
      
}
  function timeLoad(){
  var secDelay = document.getElementById("seconds").value * 1000;
  setTimeout(function(){playBeep()},secDelay);
  var secCntDwn = document.getElementById("seconds").value;
  var myVar=setInterval(function(){myTimer()},1000);
}
function myTimer(){
  secCntDwn=secCntDwn - 1;
  document.getElementById("CountDown").innerHTML=secCntDwn + " Seconds Left";
}
function playBeep(){
  secCntDwn=secCntDwn - 1;
  document.getElementById("CountDown").innerHTML=secCntDwn + " Seconds Left";
  clearInterval(myVar);
	playMp3();
}
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

//added calculations for table
function calculate() {
//watts = document.calculator.watts.value;
//kwhT = document.getElementById("testResult").innerHTML;
//kwhT = 10;
kwhT = kw;
hours = document.calculator.hours.value;
days = document.calculator.days.value;
rate = 0.13;

kwhTot = kwhT * hours * days * rate;
    kwpermonth = kwhT * hours * days;
	costpermonth = kwhTot;
	costperyear = costpermonth*12;
  if (kwpermonth > 999){
        mwpermonth = kwpermonth/1000;
        document.calculator.kwh.value=mwpermonth.toFixed() + " MW";    
    }
    else{
        document.calculator.kwh.value=kwpermonth.toFixed() + " KW";    
    }
	//document.calculator.kwh.value=kwpermonth.toFixed();
	//document.calculator.costpermonth.value = round(costpermonth, 2);
    //document.calculator.costpermonth.value = round(numberWithCommas(costpermonth),2);
    var cstPerMnthRnd = round(costpermonth, 2);
    var cstPerYrRnd = round(costperyear, 2);
    document.calculator.costpermonth.value = addCommas(cstPerMnthRnd);
	//document.calculator.costperyear.value = round(costperyear, 2);
    document.calculator.costperyear.value = addCommas(cstPerYrRnd);
}
function rstTbleFlds(){
    document.calculator.kwh.value="";
	document.calculator.costpermonth.value = "";
	document.calculator.costperyear.value = "";
    rstVars();
}
function rstVars(){
    //x = 0; //These variables are inside a function and don't exist at the global level
    //y = 0;
    //time_widgets = 0;
    kw = 0;
    //mw = 0;
    kwhT = 0;
    //hours = 0;
    //days = 0;
    //kwhTot = 0;
    //kwpermonth = 0:
    //costpermonth = 0;
    //costperyear = 0;
    //mwpermonth = 0;
    //wattCnv = 0;
}
function ptrFunction(){
    rstTbleFlds();
}
function ctrFunction(){
    rstTbleFlds();
}
function khFunction(){
    rstTbleFlds();
}
//doesn't work
function addThousandSeparators(number) {
    var whole, fraction
    var decIndex = number.lastIndexOf('.')
    if (decIndex > 0) {
        whole = number.substr(0, decIndex)
        fraction = number.substr(decIndex)
    } else {
        whole = number
    }
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(whole)) {
        whole = whole.replace(rgx, '$1' + ',' + '$2')
    }
    return fraction ? whole + fraction : whole
}
//doesn't work
function numberWithCommas(x) {
      x=String(x).toString();
      var afterPoint = '';
      if(x.indexOf('.') > 0)
         afterPoint = x.substring(x.indexOf('.'),x.length);
      x = Math.floor(x);
      x=x.toString();
      var lastThree = x.substring(x.length-3);
      var otherNumbers = x.substring(0,x.length-3);
      if(otherNumbers != '')
          lastThree = ',' + lastThree;
      return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
}
function addCommas(nStr){
 nStr += '';
 var x = nStr.split('.');
 var x1 = x[0];
 var x2 = x.length > 1 ? '.' + x[1] : '';
 var rgx = /(\d+)(\d{3})/;
 while (rgx.test(x1)) {
  x1 = x1.replace(rgx, '$1' + ',' + '$2');
 }
 return x1 + x2;
}
