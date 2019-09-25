function shuffleAnswer(ans) {
  return ans.split('').sort(function(){return 0.5-Math.random()}).join('');
}

var MD5_fn = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};

function openCloseAnagram() {
  if(parseInt($("#anagram_side").css("width")) > 0){
    $("#anagram_side").css("width","0");
    $(".vertical-nav, #main_site_side").css("margin-left","0");
  } else {
    $("#anagram_side").css("width","300px");
    $(".vertical-nav, #main_site_side").css("margin-left","300px");
  }
}
function sec2date(seconds) {
  var days        = Math.floor(seconds/24/60/60);
  var hoursLeft   = Math.floor((seconds) - (days*86400));
  var hours       = Math.floor(hoursLeft/3600);
  var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
  var minutes     = Math.floor(minutesLeft/60);
  var remainingSeconds = seconds % 60;
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  return (days > 0 ? days+' '+lang.options.day:'')+(hours > 0 ? hours+' '+lang.options.hour+' ':'')+(minutes > 0 ? minutes+' '+lang.options.min+' ':'')+(remainingSeconds > 0 ? remainingSeconds+' '+lang.options.sec+' ':'');
}
function bayiGoldTranserFn(gsm) {
  $(".search-query-bayi").val(gsm).focus().trigger(jQuery.Event( 'keypress',{which: $.ui.keyCode.ENTER}));
}
function bayiEftTranserTamamFn(id) {
  swal({
    title: lang.js.eftNo,
    html: lang.js.eftExp,
    input: 'text',
    inputAttributes: {
      'maxlength': 50,
      'minlength': 4
    },
    confirmButtonColor: "#446edd",
    confirmButtonText: lang.options.upgrade,
    showCancelButton: false,
    animation: "slide-from-top",
    inputPlaceholder: lang.js.requestId,
    showLoaderOnConfirm: true,
    preConfirm: function (digitCode) {
      return new Promise(function (resolve, reject) {
        if (digitCode === "") {
          reject(lang.js.err7);
        } else {
          setTimeout(function () {
            resolve();
          }, 500);
        }
      });
    }
  }).then(function (digitCode) {
    loading(true);
    socket.send('bayi', {event: 'datas_bayi_eft_tamamlandi', data: {id: id, checkId: digitCode}}, function (cb) {
      loading(false);
      if(typeof cb === "boolean"){
        swalClose();
        bayiListPageEft(0);
        alertify.success(lang.js.yourDone+"<br>"+lang.js.thanxThan);
      } else {
        alertify.warn(cb);
      }
    });
  }).catch(swal.noop);

}
function bayiEftTranserFn(id) {
  if(confirm(lang.js.question6)){
    loading(true);
    socket.send('bayi', {event: 'datas_bayi_eft_ustlen', data: id}, function (cb) {
      loading(false);
      if(typeof cb === "boolean"){
        $("#btn_ustlen_mustlen_"+id).attr("onclick", "bayiEftTranserTamamFn('"+id+"')").text(lang.js.iDidPayment).addClass("btn-success");
      } else {
        alertify.warn(cb);
      }
    });
  }
}
function bayiListPage(pg) {
  $("#bayipagesPrev, #bayipagesNext").css("display","none");
  loading(true);
  socket.send('bayi', {event: 'datas_bayi', data: {page: pg}}, function (cbsd) {
    loading(false);
    d = new Date();
    var cbs = cbsd.list,
      cba = cbsd.chart;

    var _gold = [], _userperc = [], _bayiperc = [], koloumX = [], goldValues = [], userValues = [], bayiValues = [], keys;
    $.each(cba, function(index, value){
      _gold[value.date.year+"-"+value.date.month+"-"+value.date.day] = value.totalValues;
      _userperc[value.date.year + "-" + value.date.month + "-" + value.date.day] = (value.userperc/100);
      _bayiperc[value.date.year + "-" + value.date.month + "-" + value.date.day] = (value.bayiperc/100);
    });

    d.setDate(d.getDate()+1);
    for(var i = 1; i <= new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); i++) {
      d.setDate(d.getDate()-1);
      keys = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
      koloumX.push(keys);
      goldValues.push((_gold[keys] ? (_gold[keys]) : 0));
      userValues.push((_userperc[keys] ? (_userperc[keys]) : 0));
      bayiValues.push((_bayiperc[keys] ? (_bayiperc[keys]) : 0));
    }

    $("#totalBayiGoldMonth").text($.number(goldValues.reduce(add, 0), 2));
    $("#totalUserPercMonth").text($.number(userValues.reduce(add, 0), 2));
    $("#totalBayiPercMonth").text($.number(bayiValues.reduce(add, 0), 2));

    koloumX.unshift("x");
    goldValues.unshift(lang.js.transfer);
    userValues.unshift(lang.js.customerProfit);
    bayiValues.unshift(lang.js.yourProfit);


    c3.generate({
      bindto: "#audienceOverviewBayi",
      data: {
        x: 'x',
        columns: [
          koloumX,
          goldValues,
          userValues,
          bayiValues
        ],
        types: {
          'Aktarım': 'area-spline',
          'Yatırımcının kazancı': 'area-spline',
          'Sizin kazancınız': 'area-spline'
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: function (d) { return new Date(d).toLocaleString().split(" ")[0]; }
          }
        },
        y : {
          show: false,
          tick: {
            format: function (d) { return $.number(d, 2); }
          }
        }
      }
    });

    if(cbs.length > 0){
      $('.last_transfer_bayi').html("");
      console.log(cbs);
      $.each(cbs,function (index, value) {
        $('.last_transfer_bayi').append('<tr>' +
          '<td>'+value.userId.name+'<br><small style="color:gray">'+value.userId.gsm.substr(window.node_options.telNumberPref.length-1)+'<br>'+value.userId.identify+'</small></td>' +
          '<td>'+$.number(value.gold, 2)+' altın</td>' +
          '<td><span class="pie" data-peity=\'{ "fill": ["#748194", "#546277"], "radius": 20 }\'>'+(value.userperc)+'/5</span><small class="hidden-xs" style="position: absolute;color: #546277;margin-left: 10px;margin-top: 3px;"><span style="color:#748194">Alıcı: '+$.number(value.gold*value.userperc/100, 2)+' <sup>(%'+value.userperc+')</sup></span><br>Sen: '+$.number(value.gold*value.bayiperc/100, 2)+' <sup>(%'+value.bayiperc+')</sup></small></td>' +
          '<td>'+dateFullTR(new Date(value.date))+'<br><small style="color:gray">'+zamanBul(value.date)+'</small></td>' +
          '<td class="text-left"><button onclick="bayiGoldTranserFn('+value.userId.gsm.substr(window.node_options.telNumberPref.length)+')" class="btn btn-xs btn-warning">+Tekrar aktar</button></td> ' +
          '</tr>');
        $(".pie").peity("pie");
      });
    } else {
      $('.last_transfer_bayi').html("Kayıt bulunamadı");
    }
    if(pg > 0) $("#bayipagesPrev").attr("onClick", "bayiListPage("+(pg-1)+")").css("display","inline");
    if(cbs.length >= 10) $("#bayipagesNext").attr("onClick", "bayiListPage("+(pg+1)+")").css("display","inline");
  });
}
function fnNull() {
  return "";
}
function bayiStoreOrder(pg){
  socket.send('bayi', {event: 'storOrderList', data: {page: pg}}, function (fne) {
    if(fne.length>0 || fne!=0){
      $('.awaitingBasketOrdersBy').html('');
      var prOrm = '',i=0;
      $.each(fne,function (index, value) {
        i++;
        prOm = '<ul>';
        if(  Object.keys(JSON.parse(value.products.basket)).length> 0){
          $.each(JSON.parse(value.products.basket),function (elem,valem) {
            prOm += ' <li class="text-dark-blue   font12px">- '+valem.name+" "+valem.fee+' altın ('+valem.sum+' adet)</li>';
          });
        }
        prOm += '</ul>';

        var ORDERID = {'orderId':value._id,"isCargo":value.order.handJob === null || value.order.handJob === '0' ? 0 : 1};
        $('.awaitingBasketOrdersBy').append('<tr id="pcsl3_'+value._id+'"><td>'+zamanBul(value.order.date)+' <br><small class="text-red">'+value.order.date+'</small></td><td>'+value.reciver.name+' ('+value.reciver.gsm+')</td><td>'+prOm+'</td><td>'+value.products.fee+' altın ('+value.products.sum+' adet)</td><td><span>'+value.reciver.cargo+'</span></td><td><button class="btn btn-xs btn-info" data-alici_gsm="'+value.reciver.gsm+'" data-order_id=\''+JSON.stringify(ORDERID)+'\' id="bayi_uslen_store"><i class=" font12px fa fa-hand-o-up"></i> '+i+'. Üstlen</button></td></tr>');
      });

    }else{
      $('.awaitingBasketOrdersBy').html('<tr><td colspan="6"><div class="alert alert-warning"><i class="fa fa-info-circle"></i> Üstlenilebilir sipariş bulunmamaktadır, Daha sonra listeyi tekrar kontrol ediniz</div></td></tr>');
    }

  });
}
function bayiStoreOrderSelf(pg){
  loading(true);
  socket.send('bayi', {event: 'storOrderListShop', data: {page: pg}}, function (fne) {

    $('.awaitingBasketOrdersByShop').html('');
    if(fne.length>0 || fne!=0){
      var prOrm = '',i=0;
      $.each(fne,function (index, value) {
        i++;
        prOm = '<ul>';
        if(  Object.keys(JSON.parse(value.products.basket)).length> 0){
          $.each(JSON.parse(value.products.basket),function (elem,valem) {
            prOm += ' <li class="text-dark-blue   font12px">- '+valem.name+" "+valem.fee+' altın ('+valem.sum+' adet)</li>';
          });
        }
        prOm += '</ul>';
        var ORDERID = {'orderId':value._id};
        $('.awaitingBasketOrdersByShop').append('<tr id="pcsl3_'+value._id+'"><td>'+zamanBul(value.order.date)+' <br><small class="text-red">'+value.order.date+'</small></td><td>'+value.reciver.name+' ('+value.reciver.gsm+')</td><td>'+prOm+'</td><td>'+value.products.fee+' altın ('+value.products.sum+' adet)</td><td><span>'+value.reciver.cargo+'</span></td><td><button class="btn btn-xs btn-info" data-alici_gsm="'+value.reciver.gsm+'" data-order_id=\''+JSON.stringify(ORDERID)+'\' id="bayi_uslen_store"><i class=" font12px fa fa-hand-o-up"></i> '+i+'. Üstlen</button></td></tr>');

      });

    }else{
      $('.awaitingBasketOrdersBy').html('<tr><td colspan="6"><div class="alert alert-warning"><i class="fa fa-info-circle"></i> Üstlenilebilir sipariş bulunmamaktadır, Daha sonra listeyi tekrar kontrol ediniz</div></td></tr>');
    }
    loading(false);
  });
}
function bayiListPageEft(pg) {
  $("#bayiEftpagesPrev, #bayiEftpagesNext").css("display","none");
  loading(true);
  socket.send('bayi', {event: 'datas_bayi_eft', data: {page: pg}}, function (cbsd) {
    loading(false);
    if(cbsd.length > 0){
      $('.waiting_eft_money').html("");
      var statusButtons = [];
      $.each(cbsd,function (index, value) {
        statusButtons = (value.status == 0 ?
            ["bayiEftTranserFn", lang.js.takeIt, "danger"] :
            (value.status == 1 ?
                (value.bayiId == _USERINFO._id ?
                    ["bayiEftTranserTamamFn",  lang.js.iDidPayment, "success"] :
                    ["fnNull", lang.js.transferAnotherOne, "warning"]
                ) :
                ["fnNull", lang.js.finishEdProccess, "warning"]
            )
        );
        $('.waiting_eft_money').append(
          '<tr>' +
          '<td>'+value.userId.name+' - <small style="color:steelblue">'+value.userId.gsm.substr(window.node_options.telNumberPref.length-1)+'</small><br><small style="color:gray"><b>'+lang.js.bank+': </b> '+value.userId.finance.bank_data.name+'<br><b>IBAN: </b>'+value.userId.finance.bank_data.iban+'<br><b>'+lang.js.owner+': </b>'+value.userId.finance.bank_data.owner+'</small></td>' +
          '<td>'+$.number(value.fee, 2)+' TL<br><small style="color:gray">'+lang.js.yourProfit+': '+$.number(value.bayi_win_gold, 2)+' '+lang.options.gold+'</small></td>' +
          '<td>'+dateFullTR(new Date(value.date))+'<br><small style="color:gray">'+zamanBul(value.date)+'</small></td>' +
          '<td class="text-left"><button id="btn_ustlen_mustlen_'+value._id+'" onclick="'+statusButtons[0]+'(\''+value._id+'\')" class="btn btn-xs btn-'+statusButtons[2]+'">     '+statusButtons[1]+'</button></td> ' +
          '</tr>');
      });
    } else {
      $('.waiting_eft_money').html(lang.js.noRecord);
    }
    if(pg > 0) $("#bayiEftpagesPrev").attr("onClick", "bayiListPageEft("+(pg-1)+")").css("display","inline");
    if(cbsd.length >= 10) $("#bayiEftpagesNext").attr("onClick", "bayiListPageEft("+(pg+1)+")").css("display","inline");
  });
}


function loadContent(url){
  $('body').removeAttr('style');
  if(url=='') url='farm';
  console.log(url);
  $('.Q_'+url).removeClass("gizle").siblings("div.DIVS").addClass("gizle");
  $('li.LIS').removeClass('selected');
  $('li.S_'+url).addClass('selected');
  $('.vertical-nav').removeClass('vertical-nav-opened');
  s_farm.pause();
  s_info.play();
  switch(url){
    case '':
    case null:
    case 'dashboard':
      if(typeof forexChart !== "undefined" || typeof refererChart !== "undefined"){
        forexChart.flush();
        refererChart.flush();
      }
      break;
    case 'farm' :
      $('body').css({'background':'transparent url("img/_media/barinaklar/bg2.jpg") bottom repeat fixed','overflow': 'hidden','background-size':'cover'});
      s_farm.play();
      s_info.pause();
      // $('body').css({'background':'transparent url("img/_media/barinaklar/bg2.png") repeat','overflow': 'hidden'});
      //window.socket.send('farmDatas');
      break;

    case 'logs' :
      pagger('FINANCELOGS', {'page':0});
      pagger('ALLLOGS', {'page':0});
      pagger('FPLOG', {'page':0});
      pagger('MONEYLOGS', {'page':0});
      break;
    case 'admin':

      window.socket.send('admin',{'event':'USERPROBLEM'},function(rs){
        var HTM = '';
        $.each(rs,function (index, value) {

          var today = new Date(value.date);
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear();

          HTM += '<tr> <td>'+dd+'/'+mm+'/'+yyyy+'</td><td>'+value._id+'</td><td>'+value.user_name+'</td><td>'+value.detial+'</td><td align="center"><button class="btn btn-xs"><a class="admin_menus_click" data-toggle="1" data-username="'+value.user_name+'" data-opendiv="#a_user_finance" data-socket=\'{"event":"user_finance_call", "data":"'+value.user+'", "fn":"userFinance"}\'><span class="icon-banknote"></span> Gözat</a></button></td></tr>'
        });
        $('#USERPR').html(HTM);

      });

      //  chart14.flush();
      $(".admin_menus_div").hide();
      pagger('LASTREGISTEDUSERS', {'page':0, 'word': $('#user_search_inp').val().trim()});
      loading(true);
      socket.send('admin', {event: 'lastAction'}, function (cb) {
        loading(false);
        $("#users_total").text($.number(cb.public_infos.users) + " yatırımcı");
        $("#wait_payment_total").text($.number(cb.public_infos.wait_payment) + " adet");
        $("#sell_product_total").text($.number(cb.public_infos.sell_product, 2) + " "+lang.options.currency);
        $("#total_money_in").text($.number(cb.public_infos.total_money_in, 2) + " "+lang.options.currency);
        $("#total_money_out").text($.number(cb.public_infos.total_money_out, 2) + " "+lang.options.currency);
        $("#buy_feed_total").text($.number(cb.public_infos.buy_feed_total) + " "+lang.options.ton);
        $("#buy_feed_depo_total").text($.number(cb.public_infos.buy_feed_depo_total, 2)+ " "+lang.options.gold);
        $("#buy_product_depo_total").text($.number(cb.public_infos.buy_product_depo_total, 2)+ " "+lang.options.gold);
        $("#ref_won_total").text($.number(cb.public_infos.ref_won_total, 2)+ " "+lang.options.gold);
        // var  percently = cb.public_infos.buy_animal_total[0].w =='out' ? $.number((parseInt(cb.public_infos.buy_animal_total[0].total)))+" TL" : $.number((parseInt(cb.public_infos.buy_animal_total[1].total)))+" TL"
        // $("#buy_animal_total").text(percently);
        $(".system_actions").html("");
        $.each(cb.actions, function(index, value){
          $(".system_actions").append('<li class="green"><div class="detail-info"><p class="date"> <a class="admin_menus_click text-green message" data-toggle="1" data-opendiv="#a_user_edit" data-socket=\'{"event":"user_edit_call", "data":"'+value.user+'", "fn":"userEdit"}\' href="javascript:void(0)">'+value.user_name+'</a> '+zamanBul(new Date(value.date))+'</p><p class="message">'+value.detial+'</p></div></li>');
        });

        d = new Date();
        d1 = new Date();
        d2 = new Date();
        d4 = new Date();

        var _inMoney = [], _outMoney = [], koloumXMoney = [], inValuesMoney = [], outValuesMoney = [], keysMoney;
        var _inGold = [], _outGold = [], koloumXGold = [], inValuesGold = [], outValuesGold = [], keysGold;
        var _inUsers = [], lastRegUsers = [], koloumXUsers = [], keysUsers;
        var _inStFee = [], _inStSum = [], koloumXStores = [], inStoreFee = [], inStoreSum = [], keysStores;

        $.each(cb.chart_datas.money, function(index, value){
          if(value.target == 'in') {
            _inMoney[value.date.year+"-"+value.date.month+"-"+value.date.day] = value.totalValues;
          } else {
            _outMoney[value.date.year + "-" + value.date.month + "-" + value.date.day] = value.totalValues;
          }
        });

        $.each(cb.chart_datas.gold, function(index, value){
          if(value.target == 'in') {
            _inGold[value.date.year+"-"+value.date.month+"-"+value.date.day] = value.totalValues;
          } else {
            _outGold[value.date.year + "-" + value.date.month + "-" + value.date.day] = value.totalValues;
          }
        });

        $.each(cb.chart_datas.last_users, function(index, value){
          _inUsers[value.date.year+"-"+value.date.month+"-"+value.date.day] = value.count;
        });

        $.each(cb.chart_datas.stores, function(index, value){
          _inStFee[value.date.year+"-"+value.date.month+"-"+value.date.day] = value.totalFee;
          _inStSum[value.date.year+"-"+value.date.month+"-"+value.date.day] = value.totalSum;
        });



        d.setDate(d.getDate()+1);
        for(var i = 1; i <= new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); i++) {
          d.setDate(d.getDate()-1);
          keysMoney = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
          koloumXMoney.push(keysMoney);
          inValuesMoney.push((_inMoney[keysMoney] ? (_inMoney[keysMoney]) : 0));
          outValuesMoney.push((_outMoney[keysMoney] ? (_outMoney[keysMoney]) : 0));
        }

        d1.setDate(d1.getDate()+1);
        for(var i1 = 1; i1 <= new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); i1++) {
          d1.setDate(d1.getDate()-1);
          keysGold = d1.getFullYear()+"-"+(d1.getMonth()+1)+"-"+d1.getDate();
          koloumXGold.push(keysGold);
          inValuesGold.push((_inGold[keysGold] ? (_inGold[keysGold]) : 0));
          outValuesGold.push((_outGold[keysGold] ? (_outGold[keysGold]) : 0));
        }

        d2.setDate(d2.getDate()+1);
        for(var i2 = 1; i2 <= new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); i2++) {
          d2.setDate(d2.getDate()-1);
          keysUsers = d2.getFullYear()+"-"+(d2.getMonth()+1)+"-"+d2.getDate();
          koloumXUsers.push(keysUsers);
          lastRegUsers.push((_inUsers[keysUsers] ? (_inUsers[keysUsers]) : 0));
        }

        d4.setDate(d4.getDate()+1);
        for(var i3 = 1; i3 <= new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); i3++) {
          d4.setDate(d4.getDate()-1);
          keysStores = d4.getFullYear()+"-"+(d4.getMonth()+1)+"-"+d4.getDate();
          koloumXStores.push(keysStores);
          inStoreFee.push((_inStFee[keysStores] ? (_inStFee[keysStores]) : 0));
          inStoreSum.push((_inStSum[keysStores] ? (_inStSum[keysStores]) : 0));
        }

        $('.dunkuDurumMoney').html(' <i class="icon-triangle-up"></i>'+$.number(outValuesMoney.reduce(add, 0), 2)+'<sup style="font-size:15px" class="fa fa-try white"></sup>  <i class="icon-triangle-down kirmizi"></i>'+$.number(inValuesMoney.reduce(add, 0), 2)+"<sup style='font-size:15px' class='fa fa-try white'></sup>");
        $('.dunkuDurumGold').html(' <i class="icon-triangle-up"></i>'+$.number(outValuesGold.reduce(add, 0), 2)+'<sup style="font-size:15px" class="fa fa-try white"></sup>  <i class="icon-triangle-down kirmizi"></i>'+$.number(inValuesGold.reduce(add, 0), 2)+"<sup style='font-size:15px' class='fa fa-try white'></sup>");


        koloumXMoney.unshift("x");
        inValuesMoney.unshift(lang.js.withdrawMoney);
        outValuesMoney.unshift(lang.js.moneyEntry);

        koloumXGold.unshift("x");
        inValuesGold.unshift(lang.js.goldsEearned);
        outValuesGold.unshift(lang.js.shoppingWGolds);

        koloumXUsers.unshift("x");
        lastRegUsers.unshift(lang.extra.lastRegUsers);

        koloumXStores.unshift("x");
        inStoreFee.unshift("Ciro");
        inStoreSum.unshift("Ürün Adeti");

        c3.generate({
          bindto: "#audienceOverviewMoney",
          data: {x: 'x', columns: [koloumXMoney, inValuesMoney, outValuesMoney]},
          axis: {x: {type: 'timeseries', tick: {format: function (d) { return new Date(d).toLocaleString().split(" ")[0]; }}}, y : {tick: {format: function (d) { return $.number(d, 2); }}}}
        });

        c3.generate({
          bindto: "#audienceOverviewGold",
          data: {x: 'x', columns: [koloumXGold, inValuesGold, outValuesGold]},
          axis: {x: {type: 'timeseries', tick: {format: function (d) { return new Date(d).toLocaleString().split(" ")[0]; }}}, y : {tick: {format: function (d) { return $.number(d, 2); }}}}
        });

        c3.generate({
          bindto: "#lastRegisterUsers",
          data: {x: 'x', columns: [koloumXUsers, lastRegUsers]},
          axis: {x: {type: 'timeseries', tick: {format: function (d) { return new Date(d).toLocaleString().split(" ")[0]; }}}, y : {tick: {format: function (d) { return d; }}}}
        });

        c3.generate({
          bindto: "#storesDatas",
          data: {x: 'x', columns: [koloumXStores, inStoreFee, inStoreSum]},
          axis: {x: {type: 'timeseries', tick: {format: function (d) { return new Date(d).toLocaleString().split(" ")[0]; }}}, y : {tick: {format: function (d) { return d; }}}}
        });
      });
      break;
    case "bayi_transfer" :
      bayiListPage(0);
      bayiListPageEft(0);
      break;
    case "bayi_sarkuteri" :
      bayiStoreOrder(0);
      break;
    case "bayi_pin" :
      bayiListPin(0);
      break;
    case 'invoice':
      loading(true);
      socket.send('my_profil', {event: 'invoice'}, function (cbs) {
        loading(false);
        $(".invoiceTotal").text(Object.keys(cbs).length);
        if(Object.keys(cbs).length > 0){
          $('.invoiceDIV').html("");
          $.each(cbs,function (index, value) {
            $('.invoiceDIV').append('<tr>' +
              '<td class="text-gray"><b>#'+value.orderId+'</b></td>' +
              '<td>'+dateFullTR(new Date(value.date))+'</td>' +
              '<td>'+$.number(value.fee, 2)+' TRY</td>' +
              '<td class="text-left"><button onclick="showInvoice({fee: \''+value.fee+'\', orderId: \''+value.orderId+'\', date: \''+value.date+'\', method: \''+value.method+'\', bank: \''+value.bankName+'\'}, true)" class="btn btn-xs btn-warning">Detaylar</button></td> ' +
              '</tr>');
          });
        } else $(".invoiceDIV").html('<tr><td colspan="4"><div class="text-red">'+lang.js.noInvoice+'</div></td></tr>');
      });
      break;
    case 'myRef':
      if(!_refEnabled) loadContent('farm');
      else {
        loading(true);
        socket.send('my_profil', {event: 'my_ref'}, function (cbs) {
          loading(false);
          if(Object.keys(cbs).length > 0){
            //$('.S_myRef ').removeClass('gizle');
            $('.myRefDIV').html("");
            var totalRefWinning = 0;
            $.each(cbs, function(i, v){totalRefWinning += v.bringGold;});
            $(".totalRefAffex").text($.number(totalRefWinning, 2));
            $("#ref_total").text("("+Object.keys(cbs).length+")");
            $.each(cbs,function (index, value) {
              $(".myRefDIV").append('<div class="col-lg-2 col-md-3 col-sm-5 col-xs-12"> <div class="card-wrapper"> <div class="card clearfix"><span class="card-type green"><i class="icon-'+(value.online ? 'bolt text-green' : 'cord text-red')+'"></i></span> <img src="'+(value.img.length > 0 ? "https://tr4-kfdpjimthe.netdna-ssl.com/img/users/"+value.img : 'https://tr4-kfdpjimthe.netdna-ssl.com/img/png/farmer_'+value.gender+'.png')+'" class="img-responsive card-avatar" title="'+value.access+'"> <p><b>'+value.name+'</b></p><small>'+value.label+'</small> </div><ul class="card-actions clearfix"> <li><div class="panel-body"><div class="progress no-margin progress-rounded"><div class="progress-bar progress-bar-success" role="progressbar" style="text-align:center; width: '+((value.bringGold/totalRefWinning)*100)+'%"><div class="inLineFlexed">'+(value.bringGold > 0 ? l.format(lang.js.calcProfit,{'profit':$.number(value.bringGold, 2)}) : '<span style="color:gray">'+lang.js.noProfit+'</span>')+'</div></div></div></div></li></ul> </div></div>');
            });
          } else {
            loadContent('farm');
            $('.ref_row').remove();
            $(".myRefDIV").html('<div class="text-red">'+lang.js.noRefs+'<br>'+lang.js.noRefDetail+'</div><br><div class="alert alert-info">'+lang.js.refCode+' <b style="margin-left: 15px">'+myRefCode+'</b><br><input class="disabled form-control"  readonly="readonly" value="'+node_options.base+"/index.html?ref="+myRefCode+'" /><br></p></div>');
          }
        });
      }
      break;
    case 'store' :
      loading(true);
      socket.send('store', {event: 'viewAll'});
      break;
    case 'clan' :
      clanPage(0);
      break;
    case 'ticket' : ticketPage(0); break;
      break;
    case 'ticketDestek' :
      authPage('.Q_ticketDestek','ticketDestek',function () {
        dragula([progress, opened, completed], {
          revertOnSpill: true,
          moves: function (el) {
            return el.classList.contains('dragula-handle');
          }
        }).on('drop',function (e1, e2,e3) {

          window.socket.send('ticketDestek',
            {
              'event':'drop',
              'itemId':$(e1).data('item_id'),
              'status': $(e2).attr('id'),
              'element':e1
            },function(rs){
              //ticketsGets(rs);
              //SWITCH
              switch($(e2).attr('id')){
                case 'progress' :
                  var islem  = {
                    'islem':$(e2).attr('id'),
                    'olay':'transfer',
                    'ticketId':$(e1).data('item_id')
                  };
                  console.log(islem);

                  $('.bn_'+$(e1).data('item_id')).html("<span data-proc_ticket='"+JSON.stringify(islem)+"'><i class='fa fa-exchange text-white'></i>  Transfer</span>");

                  break;
                case 'opened' :
                  $('.bn_'+$(e1).data('item_id')).html( '<span  onclick="go(\'game.html#!ticket\');msjdty(\''+$(e1).data('item_id')+'\');" class="label label-warning cursor" ><i class="fa fa-envelope text-white"></i>  Mesaj Yaz</span>');
                  break;
                case 'completed' :
                  $('.bn_'+$(e1).data('item_id')).html( '<span onclick="go(\'game.html#!ticket\');msjdty(\''+$(e1).data('item_id')+'\');"  class="label label-success cursor"><i class="fa fa-envelope text-white"></i>  İncele</span>');
                  break;
              }
            });
        }).on('drag',function (e1, e2) {
          window.socket.send('ticketDestek',{'event':'drag','itemId':$(e1).data('item_id'), 'islem': "remove"},function(){
          });
        }).on('dragend',function (e1) {

          window.socket.send('ticketDestek',{'event':'drag','itemId':$(e1).data('item_id'), 'islem': "add"},function(){

          });
        });

        window.socket.send("ticketDestek",{'event':'bekleyenTickets'},function(rs){
          ticketsGets(rs);

        });
      });

      break;
  }
}
function go(link){
  document.location.href=link;
}
function ticketsGets(rs){
  $('.bekleyenTickets').html("");
  $('.opened').html("");
  $('.opened').html("");
  $('.completed').html("");
  if(typeof rs === 'object'){
    if(rs.length>0){
      $.each(rs,function(index,value){
        var islem  = {
          'islem':'process',
          'olay':'transfer',
          'ticketId': value._id
        };
        if(value.target.targetId=='' && value.status.is_closed==false){
          //ticets tickets
          $('.bekleyenTickets').append('<div class="dragula-handle task-block '+window.SUBJ[value.subject.title].color+'" data-item_id="'+value._id+'"> <h5 class="task-id">'+window.SUBJ[value.subject.title].name+'<i class="icon-controller-record"></i></h5> <div class="assigned-user"> <img src="img/thumbs/user'+value.subject.title+'.png" class="img-responsive"></div><p class="task-desc">'+value.subject.detial.substr(0, 60)+'</p><ul class="task-footer"> <li>'+zamanBul(value.dates.created)+'</li><li class="bn_'+value._id+'"><span class="label label-info cursor" data-proc_ticket="'+JSON.stringify(islem)+'"><i class="fa fa-exchange text-white"></i>  Transfer</span></li></ul> <span class="task-type">'+value.user.name+'</span> </div>');

        }else if(value.target.targetId == _USERINFO._id  && value.status.is_closed==false ){
          //opened
          $('#opened').append('<div class="dragula-handle task-block '+window.SUBJ[value.subject.title].color+'" data-item_id="'+value._id+'"> <h5 class="task-id">'+window.SUBJ[value.subject.title].name+'<i class="icon-controller-record"></i></h5> <div class="assigned-user"> <img src="img/thumbs/user'+value.subject.title+'.png" class="img-responsive"></div><p class="task-desc">'+value.subject.detial.substr(0, 60)+'</p><ul class="task-footer"> <li>'+zamanBul(value.dates.created)+'</li><li class="bn_'+value._id+'"><span onclick="go(\'game.html#!ticket\');msjdty(\''+value._id+'\');" class="label label-warning cursor"><i class="fa fa-envelope text-white"></i>  Mesaj Yaz</span></li></ul>  <span class="task-type">'+value.user.name+'</span> </div>');
        } else if( value.status.is_closed==true) {
          //completed
          $('#completed').append('<div class="dragula-handle task-block '+window.SUBJ[value.subject.title].color+'" data-item_id="'+value._id+'"> <h5 class="task-id">'+window.SUBJ[value.subject.title].name+'<i class="icon-controller-record"></i></h5> <div class="assigned-user"> <img src="img/thumbs/user'+value.subject.title+'.png" class="img-responsive"></div><p class="task-desc">'+value.subject.detial.substr(0, 60)+'</p><ul class="task-footer"> <li>'+zamanBul(value.dates.created)+'</li><li class="bn_'+value._id+'"><span  onclick="go(\'game.html#!ticket\');msjdty(\''+value._id+'\');"  class="label label-success cursor"><i class="fa fa-envelope text-white"></i>  İncele</span></li></ul> <span class="task-type">'+value.user.name+'</span> </div>');
        }
      });
    }else{
      console.log(rs);
    }
  }else{

  }
}
function authPage(domId,page,cb){
  if(cb){
    $.get('./quests/'+page,function(rs){
      $(domId).html(rs);
      cb(true);
    });
  }else{
    $.get('./quests/'+page,function(rs){
      $(domId).html(rs);
    });
  }
}
function printInvoice(el) {

  $.getScript( "https://cdnjs.cloudflare.com/ajax/libs/jQuery.print/1.5.1/jQuery.print.min.js" ).done(function() {
    $(document).find('.'+el).print({
      addGlobalStyles : true,
      stylesheet : null,
      rejectWindow : true,
      noPrintSelector : ".yazdirma",
      iframe : true,
      append : null,
      prepend : null
    });
  }).fail(function() {
    swal("Teknik bir hata meydana geldi");
  });
}
function makePDF(orderid) {
  $.getScript( "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js" ).done(function() {
    $.getScript( "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.debug.js" ).done(function() {
      var pdf = new jsPDF('p', 'pt', 'letter');
      pdf.addHTML($('.panel-invoice-detial')[0], function () {
        pdf.save(orderid+'-fatura-fame-game-inc.pdf');
      });

      /*
      var doc = new jsPDF();

      doc.fromHTML($('.panel-invoice-detial').get(0), 15, 15, {
          'width': 500
      }, function() {
          doc.save(orderid+'-fatura-fame-game-inc.pdf');
      });
      */
    });

  }).fail(function() {
    swal("Teknik bir hata meydana geldi");
  });
}

function mailGonderFatura(orderId) {
  loading(true);
  socket.send('my_profil', {event: 'faturaEmail', data: {'orderId':orderId}}, function (cevap) {
    loading(false);
    alertify.info(cevap);
  });
}

function showInvoice(args, show) {
  var $bodyPanelInv = $(".panel-invoice-detial"),
    $bodyTableInv = $(".panel-invoice-table");
  if(show) {
    if(!bayiKurumsalBilgileriDolu && myAccess === 1) swal("Faturaları görüntülemek için öncelikle Profil bilgilerimde bulunan Şirket Bilgileri alanının tamamını doldurmanız ve kaydetmeniz gerekmektedir.");
    else {
      $(".back_inv").removeClass("gizle");
      $bodyTableInv.addClass("gizle");
      $bodyPanelInv.removeClass("gizle");
      $bodyPanelInv.find("._orderId").text("#"+args.orderId);
      $bodyPanelInv.find("._date").text(dateFullTR(new Date(args.date)));
      $bodyPanelInv.find("._fee").text($.number(args.fee, 2)+" TRY");
      $bodyPanelInv.find("._sum").text(number_format(args.fee));
      $bodyPanelInv.find("._bank").text(args.bank);
      $bodyPanelInv.find("._method").text("("+args.method+")");
      $bodyPanelInv.find(".pdfcreate").attr("onclick", "makePDF('"+args.orderId+"')");
      $bodyPanelInv.find(".emailgonderft").attr("onclick", "mailGonderFatura('"+args.orderId+"')");
    }

  } else {
    $(".back_inv").addClass("gizle");
    $bodyPanelInv.addClass("gizle");
    $bodyTableInv.removeClass("gizle");
  }
}

function clanPage(p) {
  loading(true);
  $('.CLANLIST').html("");
  socket.send('clan', {event: 'listing', 'target': whereClan, 'page': p}, function (cbs){

    whereClan = 'all';
    clanPageV = p;
    var bj = {},clanOnclick = '', desc3 = '',sira =0,des,sorte,ek1b='';
    $.each(cbs,function (index, value) {
      ek1b='';
      sira = ((20*clanPageV)+index)+1;
      sorte  = '#'+parseInt(sira)+'. Sıra';
      if(sira==1){
        value.est.styles.panelBottom =   'rgba(173, 4, 4, 0.26) !important;';
        value.est.styles.panelTop =   'rgba(32, 39, 66, 0.43) !important;';
        sorte  = '<i class="fa fa-trophy"></i> Lider Klan';
        ek1b = '<span style="margin-top: 25px;" class="project-btn hold">+%1 ek kazanç</span>';
      }
      des = value.est.descAble ? value.est.desc : '<strike    >#blocked#</strike>';
      desc3 = value.est.desc !='' ? '<p><b style="color:#f3f3f3"> Açıklama :</b> '+des+'</p>' : '' ;
      bj = JSON.stringify({'clanId':value._id,'clanName':value.est.name, 'onJoin':value.rules.onJoin});
      clanOnclick =  _USERINFO.clan.clanId == value._id ? ' onclick="clanUserList('+(_USERINFO._id == value.est.leaderId._id)+')"'  : '';
      $('.CLANLIST').append('<div class="col-md-4 col-sm-6 col-xs-12"> <div class="panel users-wrapper red" style="background: '+value.est.styles.panelTop+'"> <div class="clann users-info  clearfix"> <div class="users-avatar"> <img src="img/_media/klan/'+value.est.styles.img+'" class="img-responsive"> </div><div class="users-detail"> <h5 style="color:#f1f1f1">'+value.est.name+' </h5> <p><b style="color:#f3f3f3">Başkan :</b> '+value.est.leaderId.name+'</p> '+desc3+' </div></div><ul class="users-footer clearfix" style="background: '+value.est.styles.panelBottom+'"> <li> <p class="light"> Üye Sayısı</p><p '+clanOnclick+' class="cursor"> '+value.static.memberCount+'/'+value.static.memberLimit+' </p></li><li> <p class="light"> Puan</p><p>'+$.number(value.static.point)+'</p></li><li><a data-clan_admin=\''+JSON.stringify(value)+'\' href="javascript:void(0)" class="add-btn '+(_USERINFO._id == value.est.leaderId._id ? '' : 'gizle')+' clanAdmin"> <i class="icon-settings"></i> </a>  <a href="javascript:void(0)" class="add-btn '+(_USERINFO.clan.clanId.length > 1 && _USERINFO.clan.clanId != value._id ? 'gizle' : '')+'" data-'+(_USERINFO.clan.clanId == value._id ? 'leave_clan' : 'join_clan')+'=\''+bj+'\'> <i class="icon-'+(_USERINFO.clan.clanId != value._id ? 'plus3' : 'minus4')+'"></i> </a></li></ul></div><span class="project-btn completed">'+sorte+'</span> '+ek1b+'</div>');
      $(".klansayfa").removeClass("gizle");
      if(clanPageV < 1) $(".klansayfa:eq(0)").addClass("gizle");
      if(cbs.length < 20) $(".klansayfa:eq(1)").addClass("gizle");

    });
    loading(false);
  });
}

function basketSave(ID,FEES) {
  loading(true);
  socket.send('store',{event: 'save', data:{'ID':ID,'FEE':FEES,'SUM':$('.summed_'+ID).val()}}, function (ans) {
    loading(false);
    alertify.info(ans);
    $('a[href*=awaitingOrders]').click();
  });
}
function serverName() {
  var named;
  switch(window.location.host.split('.')[0].toUpperCase()){
    case 'TR-1' : named = "DİRİLİŞ" ; break;
    case 'TR-2' : named = "APOLLON" ; break;
    case 'TR-3' : named = "ARES" ; break;
    case 'TR-4' : named = "KERBEROS" ; break;
    case 'TR-5' : named = "ANDRONOVA" ; break;
    case 'DEVELOPER' : named = "EROS - TEST" ; break;
  }
  return named;
}
function pagger(doomId, pData) {
  //Pagging Settings
  var next,prev, $nextBTN = $('.'+doomId+'_NEXT'),$prevBTN =  $('.'+doomId+'_PREV');
  $('.headpage_'+doomId).html("Sayfa #"+(pData.page<=0 ? 1 : pData.page+1));
  next = pData.page+1;
  prev = pData.page>=1 ? pData.page-1 : 0;
  $nextBTN.attr('onClick', 'pagger(\''+doomId+'\', {\'page\':'+next+'})').show();
  $prevBTN.attr('onClick', 'pagger(\''+doomId+'\', {\'page\':'+prev+'})').show();
  switch (doomId){
    case 'USER_SEARCH_ACTION':
      $nextBTN.attr('onClick','pagger(\''+doomId+'\', {\'page\':'+next+', \'word\': \''+$('#user_search_inp').val().trim()+'\'})').show();
      $prevBTN.attr('onClick','pagger(\''+doomId+'\', {\'page\':'+prev+', \'word\': \''+$('#user_search_inp').val().trim()+'\'})').show();
      break;
    case 'LASTREGISTEDUSERS':
      $nextBTN.attr('onClick','pagger(\''+doomId+'\', {\'page\':'+next+', \'word\': \''+$('#user_search_inp').val().trim()+'\'})').show();
      $prevBTN.attr('onClick','pagger(\''+doomId+'\', {\'page\':'+prev+', \'word\': \''+$('#user_search_inp').val().trim()+'\'})').show();
      socket.send('admin', {event: 'lastRegistedUsers', data: pData}, function (x123) {
        lastProcTime = unixTime();
        $('.'+doomId).html("");
        if(x123.length > 0){
          $.each(x123,function(index, value){ $('.'+doomId).append(
            '<li class="client clearfix">' +
            '<img src="'+(value.img.length > 0 ? "https://tr4-kfdpjimthe.netdna-ssl.com/img/users/"+value.img : 'https://tr4-kfdpjimthe.netdna-ssl.com/img/png/farmer_'+value.gender+'.png')+'" class="avatar"> ' +
            '<div class="client-details">' +
            '<p><span class="name">'+value.name+' </span> <span class="email"> <small>'+value.status.label+' ('+value.ref_code+') <span style="color:skyblue;margin-left:10px" class="fppes_'+value._id+'">('+value.finance.storage.inOutCron.topSecProduct+'|'+value.finance.storage.inOutCron.topSecFeed+')</span> <i id="IOCALC" data-user_id="'+value._id+'" data-product="'+value.finance.storage.inOutCron.topSecProduct+'" data-feed="'+value.finance.storage.inOutCron.topSecFeed+'" class="btn btn-xs fa fa-circle-o-notch pointer"></i></small> </span> </p>' +
            '<ul class="icons-nav">' +
            '<li>' +
            '<span class="dropdown pull-right cursor"> ' +
            '<ul role="menu" class="dropdown-menu dp_white"> ' +
            '<li class="gizle"><a data-gold_upgrade_admin="'+value._id+'" data-gold_upgrade_admin_username="'+value.name+'" data-current_gold_admin="'+value.finance.gold+'" href="javascript:void(0)">'+lang.js.loadGold+' <small style="color: #BBBBBB">(+'+$.number(value.finance.gold)+')</small></a></li>'+
            '<li><a class="admin_menus_click" data-username="'+value.name+'" data-access="'+value.status.access+'" data-userid="'+value._id+'" data-toggle="1" data-opendiv="#a_user_actions" data-socket=\'{"event":"user_action_call", "data":{"userid": "'+value._id+'", "page":"0", "proc":"", "listing":"new"}, "fn":"userActions"}\'><i class="fa fa-history"></i> '+lang.js.accountActivites+'</a></li>'+
            '<li><a class="admin_menus_click" data-userid="'+value._id+'" data-toggle="1" data-opendiv="#a_user_finance" data-socket=\'{"event":"user_finance_call", "data":"'+value._id+'", "fn":"userFinance"}\'><i class="fa fa-desktop"></i> '+lang.js.financalStatus+'</a></li>'+
            '<li data-user_block="'+value._id+'">'+(value.status.isBanned ? '<a><b>Kilit aç</b></a>':'<a>Kilitle</a>')+'</li>'+

            '<li class="divider"></li>'+
            '<li><a class="admin_menus_click" data-toggle="1" data-opendiv="#a_user_edit" data-socket=\'{"event":"user_edit_call", "data":"'+value._id+'", "fn":"userEdit"}\'><i class="fa fa-pencil-square-o"></i> '+lang.js.editInfos+'</a></li>'+
            '<li><a class="admin_menus_click" data-toggle="1" data-username="'+value.name+'" data-useridref="'+value._id+'" data-opendiv="#a_user_refs" data-socket=\'{"event":"user_refs_call", "data":{"userid": "'+value._id+'", "date":""}, "fn":"userRefs"}\'><i class="fa fa-users"></i> '+lang.js.refs+'</a></li>'+
            '<li class="divider"></li>'+
            '<li><a class="admin_OrderCustom" data-toggle="1" data-username="'+value.name+'" data-userid="'+value._id+'" ><i class="fa fa-users"></i> '+lang.extra.customOrder+'</a></li>'+
            '<li class="divider"></li>'+
            '<li><a style="color:#c53fae" class="admin_debtLoad" data-userid="'+value._id+'" data-admin_debtLoad="'+value._id+'"  data-debt_upgrade_admin_username="'+value.name+'" data-current_gold_admin="'+value.finance.gold+'"><i class="fa fa-money"></i> '+lang.js.debits+'</a></li>'+
            '<li class="divider"></li>'+
            '<li><a style="color:#c53fae" class="admin_debtLoad_remove" data-userid="'+value._id+'" data-admin_debtLoad_remove="'+value._id+'"  data-debt_upgrade_admin_username="'+value.name+'" data-current_gold_admin="'+value.finance.gold+'"><i class="fa fa-trash-o"></i> Borçlarını Kaldır</a></li>'+
            '<li class="divider"></li>'+
            // '<li><a style="color:tomato" class="admin_deleteUser" data-userid="'+value._id+'"><i class="fa fa-times"></i> '+lang.js.delUser+' <small style="color:#b2bac7">('+value.gsm.substr(3)+')</small></a></li>'+
            '<li><a style="color:tomato" class="admin_delOrders" data-userid="'+value._id+'"><i class="fa fa-pinterest"></i> '+lang.extra.delOrders+'</a></li>'+
            '<li class="divider"></li>'+
            '<li style="background: tomato"><a style="color:#fff;" class="admin_deleteUser" data-userid="'+value._id+'"><i class="fa fa-times"></i> '+lang.js.delUser+'</a></li>'+

            '</ul>' +
            '<div data-user-icon-status="'+value._id+'" class="dropdown-toggle" data-toggle="dropdown"> <span class="panel-control-icon '+($("li[data-on_user_id="+value._id+"]").length > 0 ? ' icon-radio-checked text-green' : value.status.isBanned ? ' icon-unlock-stroke text-red' : 'icon-cog6')+'"></span> </div>' +
            '</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</li>');
          });
        } else {
          $('.'+doomId).html('<div class="alert alert-info"> '+lang.js.noResult+'</div>');
          $nextBTN.hide();
        }
      });
      break;
    case 'FINANCELOGS':
      loading(true);
      socket.send('my_profil', {event: 'finance_logs', data: {'page':pData.page}}, function (asdas) {
        loading(false);
        $('.'+doomId).html("");
        if(asdas.length >0){
          var colorize = 'red';
          $.each(asdas,function(index,value){
            colorize  =  value.target =='in' ? 'green' : 'red';
            $('.'+doomId).append('<li class="'+colorize+' liRow padding5px"><div class="detail-info"><p class="date font10px"><i class="fa fa-calendar"></i> '+dateFullTR(new Date(value.regDate))+'</p><p class="message text-'+colorize+'  ">'+(value.value > .1 ? $.number(value.value, 2) : value.value)+' '+forex2str(value.proc)+'</p></div></li>');
          });
        }else{
          $('.'+doomId).html('<div class="alert alert-info"> '+lang.js.noResult+'</div>');
          $nextBTN.hide();
        }
      });
      break;
    case 'ALLLOGS' :
      loading(true);
      socket.send('my_profil', {event: 'all_logs', data: {'page':pData.page}}, function(asd) {
        $('.'+doomId).html("");
        loading(false);
        if(asd.length >0){
          $.each(asd,function(index,value){
            $('.'+doomId).append('<li class="blue liRow padding5px"><div class="detail-info"><p class="date font10px"><i class="fa fa-calendar"></i> '+dateFullTR(new Date(value.date))+' <a href="javascript:void(0)" class="pull-right"><i class="fa fa-globe"></i>  '+value.user_ip+'</a></p><p class="message text-blue ">'+value.detial+'</p></div></li>');
          });
        }else{
          $('.'+doomId).html('<div class="alert alert-info"> '+lang.js.noResult+'</div>');
          $nextBTN.hide();
        }
      });

      break;
    case 'FPLOG' :
      loading(true);
      socket.send('my_profil', {event: 'logs', data: {'page':pData.page}}, function(asd) {
        $('.'+doomId).html("");
        loading(false);
        if(asd.length >0){
          $.each(asd,function(index,value){
            $('.FPLOG').append('<li class="yellow liRow padding5px"><div class="detail-info"><p class="date font10px"><i class="fa fa-calendar"></i> '+dateFullTR(new Date(value.date))+' </p><p class="message text-yellow ">'+value.detial+'</p></div></li>');
          });
        }else{
          $('.'+doomId).html('<div class="alert alert-info"> '+lang.js.noResult+'</div>');
          $nextBTN.hide();
        }

      });
      break;
    case 'MONEYLOGS' :
      loading(true);
      socket.send('my_profil', {event: 'money_logs', data: {'page':pData.page}}, function (asdas) {
        loading(false);
        $('.'+doomId).html("");
        if(asdas.length >0){
          var colorize = 'red';
          $.each(asdas,function(index,value){
            colorize  =  value.target =='in' ? 'green' : 'red';
            $('.'+doomId).append('<li class="'+colorize+' liRow padding5px"><div class="detail-info"><p class="date font10px"><i class="fa fa-calendar"></i> '+dateFullTR(new Date(value.date))+'</p><p class="message text-'+colorize+'  ">'+$.number(value.fee, 2)+' '+lang.options.currency+' - '+value.bankName+' ('+value.method+')</p></div></li>');
          });
        }else{
          $('.'+doomId).html('<div class="alert alert-info"> '+lang.js.noResult+'</div>');
          $nextBTN.hide();
        }
      });
      break;
  }
}
function creditCartToggle() {
  $('.goldenPf').toggleClass('gizle');
  $('.framed').toggleClass('gizle');
  loading(false);
}
function dateFormat(d){
  return d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +d.getHours() + ":" + d.getMinutes();
}
function letOrder() {
  window.socket.send('newPreOrder',{"bankId": $('#bankId').val(),"amount": $('#amount').val(),"DEBTINF":$('input[name=DEBTINF]').val()});
}
function modalClose(modalElement){
  $(modalElement).remodal().close();
}
function clanUserList(leader){
  loading(true);
  window.socket.send('clan',{'event':'userList'},function (rs) {
    modalOpen('clanUsers');
    $('#CLANUSERBODY').html("");
    $.each(rs,function(index, value){
      $('#CLANUSERBODY').append(value.clan.clanId.est.leaderId == value._id ? '' +
        '<tr> <td><p class="colorRed"><i class="icon-star-full"></i> Klan Başkanı</p>'+value.name+'</td><td>'+(value.clan.clanId.est.leaderId == _USERINFO._id ? $.number(value.clan.point) + '<br><small style="font-style: italic; color:gray">*sadece siz görürsünüz</small>' : '***')+'</td><td class="adminIslemTD gizle">-</td></tr>' : '' +
        '<tr> <td>'+value.name+'</td><td>'+$.number(value.clan.point)+'</td><td class="adminIslemTD gizle"><button title="'+value._id+'" class="btn clandanAt btn-xs btn-danger">Klandan At</button><p>'+zamanBul(value.clan.join_date, 1)+' katıldı</p></td></tr>');
    });
    if(leader) $(".adminIslemTD").removeClass("gizle");
    loading(false);
  });

}
function modalOpen(request,args){
  // $('#remodal2').attr('data-remodal-options', typeof args.opt !== 'undefined' ? args.opt : '');
  var $buttons = '';
  $('#remodal2').remodal().open();
  $('body').find('.MODALLAR').removeClass('kapali').addClass('kapali');
  $('.'+request+'_PROFILE').removeClass('kapali');
  switch(request) {
    case  'FEED' :
      var doubleLabels = [],
        valPeer = 0,
        socketSendValue = 0;
      $(".feed_buy").find(".depoCapacity").text($.number(userAndMyAnimals.finance.storage.capacity));
      for(var i=1; i <= 5; i++){
        valPeer = userAndMyAnimals.finance.storage.capacity/5*i;
        doubleLabels[i-1] = "<i title="+valPeer+">"+$.number(valPeer/1000,2)+" "+lang.options.kg+"</i><span>+"+sec2date(Math.round(valPeer/secFeeding))+"</span>";
      }
      socketSendValue = $(doubleLabels[0]).attr("title");
      $buttons = ' <button data-remodal-action="cancel" class="marginRL10 remodal-cancel pull-right">'+lang.options._CLOSE+'</button> <button id="'+socketSendValue+'" class="remodal-confirm BUYFEEDING" style="padding: 12px;"></button>';
      $("#double-label-slider")
        .slider({
          max: 4,
          min: 0,
          value: 0,
          animate: 400,
          change: function(event, ui) {
            socketSendValue = $(doubleLabels[ui.value]).attr("title");
            $('.BUYFEEDING').html(lang.options.letBuy+" ("+$(doubleLabels[ui.value]).attr("title")/100000+" "+lang.options.gold+")").attr("id", socketSendValue);
          }
        })
        .slider("pips", {
          rest: "label",
          labels: doubleLabels
        });
      setTimeout(function () {
        $('.BUYFEEDING').html(lang.options.letBuy+" ("+(socketSendValue/100000)+" altın)").click(function () {
          window.socket.send('feedBuyChecking', $(this).attr("id"));
        });
      },100);
      break;
    case 'productShelter':
    case 'feedShelter':
    case 'shelterOpen':
    case 'shelterOpenUser':
      $buttons = ' <button data-remodal-action="cancel" class="marginRL10 remodal-cancel pull-right">'+lang.options._CLOSE+'</button>';
      break;
    case 'clanJoins' :
      $buttons = ' <button data-remodal-action="cancel" class="marginRL10 remodal-cancel pull-right">'+lang.options._CLOSE+'</button><button class="remodal-confirm" id="C_joinClan" style="padding: 12px;">'+lang.extra.joinClan+'"</button>';
      break;
    case 'addClan' :
      $buttons = ' <button data-remodal-action="cancel" class="marginRL10 remodal-cancel pull-right">'+lang.options._CLOSE+'</button><button class="remodal-confirm" id="addClanNew" style="padding: 12px;" onclick="createNewClan()">'+lang.options.letBuy+" (<span class='storesFee'>1000</span> "+lang.options.gold+')</button>';
      break;
    case 'buyItem':
      $('.isCargo').removeClass("gizle");

      var cargoPrize  = args.datalar.est.totalFee > 199 || typeof args.sarktulers=='string' ? 0 : node_options.cargoPrize;
      window.kargomu = args.sarktulers;
      var TOTALFEE = cargoPrize ==0 ? args.datalar.est.totalFee : args.datalar.est.totalFee+cargoPrize;
      $('.store_shelter_name').text("Sepet : "+args.datalar.est.totalSum+" adet ürün");
      $buttons = ' <button data-remodal-action="cancel" class="marginRL10 remodal-cancel pull-right">'+lang.options._CLOSE+'</button><button class="remodal-confirm" id="storeSave" style="padding: 12px;" >'+lang.options.letBuy+" (<span class='storesFee'>"+TOTALFEE+"</span> "+lang.extra.silver+')</button>';


      $('.cargoPrize').html(cargoPrize!=0 ? cargoPrize+" "+lang.extra.silver : "<span style='color:green'> *Ücretsiz</span>");
      // $('.feesSTOCK').val(args.fee);
      $('.STOCKESCAPE').val(JSON.stringify(args.datalar));
      $('#store_from_name').val(_USERINFO.name);

      $('#store_from_phone').val(_USERINFO.gsm.split(node_options.telNumberPref)[1]);
      $('#store_from_cargo').val(_USERINFO.adress);

      if(typeof args.sarktulers=='string') $('.isCargo').addClass("gizle");
      console.log($buttons);
      break;
    case 'clanRoot' :
      $("#clan_edit_uye_limit").text(args.static.memberLimit);
      $("#clan_edit_date").text(dateFullTR(new Date(args.regDate)));
      $("#clan_edit_name").val(args.est.name);
      $("#clan_edit_desc").val(args.est.desc);
      $("#clan_edit_animal_id").val(args.rules.onJoin.animal.id).attr("selected", true);
      $("#clan_edit_animal_min").val(args.rules.onJoin.animal.min);
      $("#clan_edit_limit").val(args.static.memberLimit).attr("selected", true);
      $("#clan_edit_gold").val(args.rules.onJoin.gold.min);
      $("#clan_edit_p_level").val(args.rules.onJoin.deposCapacity.product.min == 0 ? 1 : args.rules.onJoin.deposCapacity.product.min).attr("selected", true);
      $("#clan_edit_f_level").val(args.rules.onJoin.deposCapacity.feed.min == 0 ? 1 : args.rules.onJoin.deposCapacity.feed.min).attr("selected", true);
      $("#clan_edit_gender").val(args.rules.onJoin.gender).attr("selected", true);
      $("#clan_edit_rules_active").prop('checked', args.rules.onJoin.active);
      $buttons =   ' <button class="marginRL10 removeClan remodal-cancel pull-right">KLANI SiL</button> ' +
        '<button data-remodal-action="cancel" class="marginRL10 remodal-cancel pull-right">'+lang.options._CLOSE+'</button>'+
        '<button class="remodal-confirm" id="clanSave" style="padding: 12px;" >Ayarları Kaydet</button>';
      break;
    case 'clanUsers' :
      $buttons =   '<button data-remodal-action="cancel" class="marginRL10 remodal-cancel pull-right">'+lang.options._CLOSE+'</button>';
      break;
    case 'limitUyeUp' :
      $buttons =   '<button class="remodal-confirm" onclick="buyClanLimit()" class="marginRL10 pull-right">Satın Al</button>';
      break;
    case 'yarisma' :
      $buttons = '<button data-remodal-action="cancel" class="marginRL10 remodal-cancel pull-right">'+lang.options._CLOSE+'</button>';
      break;
  }
  $('.feedbtmbck').html($buttons);
}
function buyClanLimit() {
  var chose = $('#limitUpes').val();
  if(chose > 0){
    loading(true);
    window.socket.send('clan',{'event': 'upLimitSize','limit':chose},function (rs) {
      loading(false);
      if(rs == 'ok'){
        alertify.success("Işlem başarılı");
        modalClose('#remodal2');
        whereClan = 'self';
        loadContent('clan');
      } else swal('Mesaj!', rs);
    });
  } else swal('Uyarı', 'Seçim yapmadınız');
}
function createNewClan() {
  if($('#agreementCreate').is(":checked")){
    loading(true);
    window.socket.send('clan',{'event': 'create','name':$('.C_clanNames').val()},function (rs) {
      loading(false);
      if(rs == 'ok'){
        modalClose('#remodal2');
        whereClan = 'self';
        loadContent('clan');
      } else swal('Mesaj!', rs);
    });
  } else swal('Sözleşme onayı', 'Lütfen Klan Şartnamesi\'ni onaylayınız.');
}
function pinGirUye() {
  swal({
    title: "e-Pin girişi",
    html: "Lütfen yetkili satıcıdan aldığınız e-Pin kodunuzu giriniz",
    input: 'text',
    inputPlaceholder: "Örnek: aad818c5-e3a0-8a86-791e-4d18d62fb606",
    showLoaderOnConfirm: true,
    preConfirm: function (val) {
      return new Promise(function (resolve, reject) {
        if (val.length > 10 && new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', 'i').test(val)) {
          loading(true);
          socket.send('my_profil', {event: 'pin_gir', data: {pin:val}}, function (cb) {
            loading(false);
            if(cb === true) resolve();
            else reject(cb);
          });
        } else reject('Lütfen e-Pin kodunuzu doğru biçimde giriniz');
      });
    }
  }).then(function () {
    swalClose();
  }).catch(swal.noop);
}
function goldBuy(fee,obj) {
  if(window._USERINFO.status.isHaveNotice && !fee) {
    window.alertify.error(lang.extra.closeDebt);
  }else{
    $('#remodal1').remodal().open();
    $('.GOLDEN_PROFILE').removeClass('kapali');
    $('.A_PROFILE').addClass('kapali');
    if(fee){
      $('input[name="amount"], #amount').val(fee).attr('readonly','readonly');
      $('input[name="DEBTINF"]').val(obj.debtId);
    }
  }
}
function soundrequest(string){
  var cow = new Array(lang.extra.cowShelter);
  var chicken = new Array(lang.extra.chickenShelter);
  var bee = new Array(lang.extra.beeShelter);
  var lamp = new Array(lang.extra.lampShelter);
  var gold = new Array(lang.options.gold);
  if(cow.indexOf(string)>=0) return s_cow.play();
  if(chicken.indexOf(string)>=0) return s_chicken.play();
  if(bee.indexOf(string)>=0) return s_bee.play();
  if(lamp.indexOf(string)>=0) return s_lamp.play();
  if(gold.indexOf(string)>=0) return s_gold.play();

}
function swalClose() {
  swal.enableInput();
  swal.enableConfirmButton();
  swal.close();
  $('.signBox').removeClass('gizle');
  $('.yukleniyor').addClass('gizle');
}

function creditCardShow() {
  $('.framed').addClass('gizle');
  $('.goldenPf').removeClass('gizle');
  loading(false);
}

function limitUyeUp() {

}

function paparaShow() {
  $('.framedP').addClass('gizle');
  $('.goldenPf').removeClass('gizle');
  loading(false);
}

function animalDetail(animalId){
  window.socket.send('animalDetail',animalId);
}
function stockRemain(stock,salesPrice){
  return Math.floor(stock/salesPrice);
}
function dateSelectBox(classed){
  var dated = new Date(),htm ='',y='';
  for(var i = dated.getFullYear();i<=dated.getFullYear()+12;i++){
    y = i+"";
    htm +='<option value="'+y.substr(2)+'">'+i+'</option>';
  }
  $('.'+classed).html(htm);
}
function startTime(dObj) {
  uretimDurdu = false;
  clearInterval(intervalID);
  seconds = Math.floor(dObj.out.feed/dObj.out.secFeeding);
  KALAN  = dObj.out.feed;
  var countdownTimer = setInterval(function () {
    KALAN -= dObj.out.secFeeding;
    //$bluecircleEl.attr("data-percent", ((KALAN*100/dObj.out.capacity).toFixed(2)));
    //$bluecircleEl.percircle();
    $leftFeedTime.text(sec2date(seconds));
    if (seconds == 0) {
      clearInterval(countdownTimer);
      $('.feedEmptyMsj').removeClass("gizle");
      $('.leftFeedTime').addClass("gizle");
      $('.feedHeaderPerc').html("0.00"+'%');
      alertify.log($('.feedEmptyMsj').html());
      $yemMeter.html("0.00");
      $productEmptyMsj.removeClass("gizle");
      $('.badgeFeedCapacity').addClass("gizle");
      uretimDurdu = true;
    } else {
      seconds--;
      $yemMeter.html($.number(KALAN));
      $('.feedHeaderPerc').html(((KALAN*100/dObj.out.capacity).toFixed(2))+'%');
    }
    $('.leftFeedPercent').css({'width': ((KALAN*100/dObj.out.capacity))+'%'});
    $('.feedHeaderProgress').css({'width': ((KALAN*100/dObj.out.capacity))+'%'});
    $('.feedCap').html( $('.feedHeaderPerc').html());
    $('.feedHeaderTime').html($(".Ls3").html());
  }, 1000);
  intervalID = countdownTimer;
}
function startTimeProduction(dObj) {
  $productEmptyMsj.addClass("gizle");
  $productTextTime.removeClass("gizle");
  clearInterval(intervalIDP);
  STOK  = dObj.in.product;
  $('.leftProductPercent').css({'width': ((STOK/dObj.in.capacity)*100)+'%'});
  secondsP = Math.floor(dObj.in.capacity/dObj.in.secProduction-STOK/dObj.in.secProduction);
  var countdownTimerP = setInterval(function () {
    STOK += dObj.in.secProduction;

    $productTextTime.text(sec2date(secondsP));
    if (parseInt(dObj.in.capacity)-STOK <= 0 ||  uretimDurdu) {
      if(!uretimDurdu) STOK = dObj.in.capacity;
      clearInterval(countdownTimerP);
      $productEmptyMsj.removeClass("gizle");
      $productTextTime.addClass("gizle");
      alertify.log($productEmptyMsj.html());
      $productText.html("Sat: "+$.number(STOK*node_options.storage.inPrize,4)+" <i class='fa fa-try'></i>");
      $productMeter.html($.number(STOK));
      uretimDurdu = true;
    } else {
      uretimDurdu = false;
      secondsP--;

      $productMeter.html($.number(STOK));
      $productText.html("Sat: "+$.number(STOK*node_options.storage.inPrize,4)+" <i class='fa fa-try'></i>");

    }
    $('.procHeaderTime').html($(".Ls4").html());
    $('.leftProductPercent').css({'width': ((STOK/dObj.in.capacity)*100)+'%'});
    $('.procHeaderProgress').css({'width': ((STOK/dObj.in.capacity)*100)+'%'});
    $('.procHeaderPerc').html(((STOK/dObj.in.capacity)*100).toFixed(2)+'%');

    if(uretimDurdu) { if(secondsP > 10) {window.socket.send('productFeedUpdate');} clearInterval(intervalIDP);}
  }, 1000);
  intervalIDP = countdownTimerP;
}
function forex2str(param){
  var oldd =  ['feedBuy', 'animalBuy', 'productSell','productLevelBuy','feedLevelBuy',"wonAffex", "wonTop10", "transferGoldUser", "transferGoldBayi", "lostGoldUpdate", "bayiHavaleEftUstlen", "clanLoginGold", "createClan", "clanLimitBuy", "clanTotalWon", "pinUse", "anagramLoginGold", "anagramExitGold", "anagramWon"];
  var neww = lang.js.FOREXES;
  return neww[oldd.indexOf(param)]
}
function hesapla(adet,saatlikUretim,gun,ratio,fiyat,saatlikTuketimi,fx){
  if(parseInt(adet)<=parseInt(fx)){
    var toplam =  (((saatlikUretim*ratio)*24)*gun)*adet;
    var brut = Math.round(toplam,2);
    $('.brutKazanc').html('<span class="brutx">'+number_format(brut,2)+'</span> Altın / '+gun+' gün ');
    //$('.brutx').html(number_format(brut,2));
    var toplamFiyat = number_format(fiyat*adet,2);
    $('.hayvanFiyati').html(toplamFiyat);
    $('.saatlikUretim').html(number_format(saatlikUretim*adet));
    $('.saatlikTuketimi').html(number_format(saatlikTuketimi*adet));
    $('._animalRemainigStock').html(number_format(fx)+' adet');

    return false;
  } else { $('#DOMContentLoaded').val(number_format(fx));}
}
function unixTime(){
  return Math.round((new Date()).getTime() / 1000) + 60*60*3 ;
  //return Math.round((new Date()).getTime() / 1000)
}
function add(a, b) {
  return a + b;
}
function number_format (number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);            return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');    }
  return s.join(dec);
}
function zamanBul(zaman){
  switch (typeof zaman) {
    case 'number': zaman = zaman+"000"; break;
    case 'string': zaman = +new Date(zaman); break;
    case 'object': if (zaman.constructor === Date) zaman = zaman.getTime(); break;
    default: zaman = +new Date();
  }
  var zamanFormatlari = [
    [60, lang.js.second, 1],
    [120, lang.js.aMinAgo, lang.js.aMinOnce],
    [3600, lang.js.minute, 60],
    [7200, lang.js.aHourAgo, lang.js.aHourOnce],
    [86400, lang.options.hour, 3600],
    [172800, lang.options.yesterday, lang.options.tomorrow],
    [604800, lang.options.day, 86400],
    [1209600, lang.options.aWeekAgo, lang.options.nextWeek],
    [2419200, lang.options.week, 604800],
    [4838400, lang.options.aMoPast,  lang.options.nextMo],
    [29030400, lang.options.month, 2419200],
    [58060800, lang.options.aYearAgo, lang.options.nextYear],
    [2903040000, lang.options.year, 29030400],
    [5806080000, 'Son yüzyılda', 'Gelecek yüzyılda'],
    [58060800000, 'yüzyıl', 2903040000]
  ];
  var saniyeler = (+new Date(+new Date() + 3*60*60*1000) - zaman) / 1000,
    damga = lang.options.ago,
    liste_secimi = 1;


  if (saniyeler == 0) {
    return lang.options.jstMoment
  }
  if (saniyeler < 0) {
    saniyeler = Math.abs(saniyeler);
    damga =  lang.options.soon;
    liste_secimi = 2;
  }
  var i = 0, format;
  while (format = zamanFormatlari[i++])
    if (saniyeler < format[0]) {
      if (typeof format[2] == 'string'){
        return format[liste_secimi];
      } else {
        return Math.floor(saniyeler / format[2]) + ' ' + format[1] + ' ' + damga;
      }
    }
  return zaman;
}
function month2Tr(m,req) {
  var months = lang.js.MONTHS;
  var colorize = ["","warning", "info", "success", "primary", "warning", "success", "info", "primary","warning", "success", "info", "primary"];
  return !req ?   months[m] : colorize[m];

}
function percents(miktar,toplam) {
  return miktar*100/toplam;
}
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
function validateEmpty($form_el, callback) {
  var $this = $form_el,
    cnt = 0,
    arr = $this.serializeArray(),
    res = {};
  $.each(arr, function (index, val) {
    res[val.name] = val.value.trim();
    cnt++;
    $this.find("[name="+val["name"]+"]").parent().removeClass("has-error");
    if(val["value"].trim() == "" && $this.find("[name="+val["name"]+"]").data("required") == "1"){
      res = false;
      $this.find("[name="+val["name"]+"]").parent().addClass("has-error").fadeOut(200).fadeIn(200).focus();
    }
    if(cnt == arr.length){
      callback(res);
    }
  });
}
function dateFullTR(d) {
  var now = new Date(d - 3*60*60*1000);
  return now.getDate() + " " + lang.js.MONTHS2[now.getMonth()] + " " + now.getFullYear() + " " + lang.js.DAYS[now.getDay()] + " " + addZero(now.getHours()) + ":" + addZero(now.getMinutes());
}
function addZero(num) {
  return (num < 10 ? "0" + num.toString() : num.toString());
}
function loading(c) {
  if(!c){
    $('.yukleniyor').addClass('gizle');
  } else {
    $('.yukleniyor').removeClass('gizle');
  }
}
function onlineList(e, d) {
  $(e.data("opendiv")).find('ul').eq(0).html("");
  $.each(d,function(index,value){
    $(e.data("opendiv")).find('ul').eq(0).append('<li class="client clearfix col-md-2 col-xs-12 userLt" ><img src="'+(value.userData.img.length > 0 ? "https://tr4-kfdpjimthe.netdna-ssl.com/img/users/"+value.userData.img : 'https://tr4-kfdpjimthe.netdna-ssl.com/img/png/farmer_'+value.userData.gender+'.png')+'" class="avatar"> <div class="client-details"> <p class="flow"><span class="name">'+value.userData.name+'</span><span class="email">'+value.userData.status.label+'</span> </p><ul class="icons-nav"> <li> <a data-toggle="dropdown" href="javascript:void(0)" class="dropdown-toggle '+(value.socketID == socket.id ? ' gizle ': '')+'"><i class="cursor icon-dots-two-vertical text-green "></i></a> <ul role="menu" class="dropdown-menu dp_white"> <li data-on_user_id="'+index+'" data-proc="kick" class="cursor online_class"> <a> <span class="fa fa-chain-broken"></span> '+lang.js.kickOut+' </a></li><li class="cursor online_class" data-on_user_id="'+index+'" data-proc="ban"><a><span class="icon-lock"></span> '+lang.js.lockUp+'</a></li> <li class="divider"></li><li class="cursor"><a class="admin_menus_click" data-toggle="1" data-opendiv="#a_user_edit" data-socket=\'{"event":"user_edit_call", "data":"'+index+'", "fn":"userEdit"}\'><span class="icon-edit"></span> Düzenle </a></li><li class="cursor"><a class="admin_menus_click" data-toggle="1" data-username="'+value.userData.name+'" data-opendiv="#a_user_finance" data-socket=\'{"event":"user_finance_call", "data":"'+index+'", "fn":"userFinance"}\'><span class="icon-banknote"></span> '+lang.js.financalStatus+' </a></li><li class="'+(Object.keys(value.refs).length > 0 ? 'cursor':'disabled')+'"><a class="admin_menus_click" data-toggle="1" data-username="'+value.userData.name+'" data-useridref="'+index+'" data-opendiv="#a_user_refs" data-socket=\'{"event":"user_refs_call", "data":{"userid": "'+index+'", "date":""}, "fn":"userRefs"}\'> <span class="fa fa-users"></span> '+lang.js.refs+' '+(Object.keys(value.refs).length > 0 ? '<small style="color: #BBBBBB">('+$.number(Object.keys(value.refs).length)+' kişi)</small>':'')+'</a></li><li class="cursor"><a class="admin_menus_click" data-username="'+value.userData.name+'" data-userid="'+index+'" data-toggle="1" data-opendiv="#a_user_actions" data-socket=\'{"event":"user_action_call", "data":{"userid": "'+index+'", "page":"0", "proc":"", "listing":"new"}, "fn":"userActions"}\'><span class="icon-stack4"></span> '+lang.js.accountActivites+' </a></li><li class="cursor"><a data-pmesage_admin="'+index+'" data-userName="'+value.userData.name+'"  href="javascript:void(0)"> <span class="fa fa-paper-plane"></span> '+lang.js.privateMsg+' </a></li></ul> </li></ul> </div></li>');
  });
}
function getMoneyPapara() {
  swal({
    title: "Nakit Çekim",
    html: l.format(lang.js.moneyWithdaw2Papara,{'accountId':userAndMyAnimals.finance.bank_data.papara_id}),
    input: 'number',
    inputAttributes: {
      'max': 1500,
      'min': 20,
      'required': "required"
    },
    inputValue: number_format(userAndMyAnimals.finance.money),
    confirmButtonColor: "#DD6B55",
    confirmButtonText: lang.js.beginTransaction,
    showCancelButton: false,
    animation: "slide-from-top",
    inputPlaceholder: lang.js.balance,
    showLoaderOnConfirm: true,
    preConfirm: function (goldVal) {
      return new Promise(function (resolve, reject) {
        if (goldVal < node_options.min_money_withdraw || goldVal > node_options.daily_money_limit) {
          reject(l.format(lang.js.err8,{'min':node_options.min_money_withdraw,'max':$.number(node_options.daily_money_limit, 2)}));
          reject('Tek seferde en az {min} en fazla {max} TL çekebilirsiniz');
        } else {
          function asdasd(gg) {
            loading(true);
            socket.send('my_profil', {event: 'papara_money_send_me', data: {fee:goldVal, code:gg}}, function (cb) {
              loading(false);
              if(typeof cb === "boolean"){
                resolve();
              } else if(cb.split(":")[0] == "CB"){
                swal({
                  title: lang.js.smsCode,
                  html: lang.js.checkSure,
                  input: 'number',
                  inputAttributes: {
                    'max': 4,
                    'min': 4
                  },
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "Onayla",
                  showCancelButton: false,
                  animation: "slide-from-top",
                  inputPlaceholder: lang.options.fourCharsCode,
                  showLoaderOnConfirm: true,
                  preConfirm: function (digitCode) {
                    return new Promise(function (resolve, reject) {
                      if (digitCode === "" || digitCode.length != 4) {
                        reject(lang.js.plsFill4);
                      } else {
                        setTimeout(function () {
                          resolve();
                        }, 1500);
                      }
                    });
                  }
                }).then(function (digitCode) {
                  asdasd(digitCode);
                }).catch(swal.noop);
                if(cb.split(":")[1] == 'FAIL'){
                  swal.showValidationError(lang.options.err6);
                } else if(cb.split(":")[1] == 'BLOCK'){
                  swal.disableInput();
                  swal.disableConfirmButton();
                  swal.showValidationError(lang.js.err10+'<p><button onClick="swalClose()">'+lang.js._CLOSE+'</button></p>');
                } else {
                  swal.showValidationError(lang.js.enterSMScode);
                }
              } else {
                alertify.info(cb);
                reject(cb);
              }
            });
          }
          asdasd();
        }
      });
    }
  }).then(function () {
    swalClose();
  }).catch(swal.noop);
}
function getMoneyEFT() {
  swal({
    title: lang.js.eftGetMoney,
    html: "<div class='alert alert-info'><i class='fa fa-info-circle'></i> "+lang.js.err9+"</div> <small>"+lang.js.iban+" : <b>"+userAndMyAnimals.finance.bank_data.iban+"</b>  <br>"+lang.js.bank+" : "+userAndMyAnimals.finance.bank_data.name+" </small>",
    input: 'number',
    inputAttributes: {
      'min': 1500,
      'required': "required",
      'value': node_options.min_eft_request_limit
    },
    inputValue: number_format(userAndMyAnimals.finance.money),
    confirmButtonColor: "#DD6B55",
    confirmButtonText: lang.js.moneyWithdaw2Req,
    showCancelButton: false,
    animation: "slide-from-top",
    inputPlaceholder: lang.js.balance,
    showLoaderOnConfirm: true,
    preConfirm: function (goldVal) {
      return new Promise(function (resolve, reject) {
        if (goldVal < node_options.min_eft_request_limit) {
          reject(l.format(lang.js.err11,{'limit':node_options.min_eft_request_limit}));

        } else {
          function asdasd(gg) {
            loading(true);
            socket.send('my_profil', {event: 'eft_send_money', data: {fee:goldVal, code:gg}}, function (cb) {
              loading(false);
              if(typeof cb === "boolean"){
                resolve();
              } else if(cb.split(":")[0] == "CB"){
                swal({
                  title: lang.js.smsCode,
                  html: lang.js.checkSure,
                  input: 'number',
                  inputAttributes: {
                    'max': 4,
                    'min': 4
                  },
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: lang.options.ok,
                  showCancelButton: false,
                  animation: "slide-from-top",
                  inputPlaceholder: lang.options.fourCharsCode,
                  showLoaderOnConfirm: true,
                  preConfirm: function (digitCode) {
                    return new Promise(function (resolve, reject) {
                      if (digitCode === "" || digitCode.length != 4) {
                        reject(lang.js.plsFill4);
                      } else {
                        setTimeout(function () {
                          resolve();
                        }, 1500);
                      }
                    });
                  }
                }).then(function (digitCode) {
                  asdasd(digitCode);
                }).catch(swal.noop);
                if(cb.split(":")[1] == 'FAIL'){
                  swal.showValidationError(lang.js.err5);
                } else if(cb.split(":")[1] == 'BLOCK'){
                  swal.disableInput();
                  swal.disableConfirmButton();
                  swal.showValidationError(lang.js.err6+'<p><button onClick="swalClose()">'+lang.options._CLOSE+'</button></p>');
                } else {
                  swal.showValidationError(lang.js.enterSMScode);
                }
              } else {
                alertify.info(cb);
                reject(cb);
              }
            });
          }
          asdasd();
        }
      });
    }
  }).then(function () {
    swalClose();
  }).catch(swal.noop);
}

function hideAdmin() {
  $(".admin_menus_div").slideUp(500, function () {
    $(this).addClass("gizle");
    $('html,body').animate({scrollTop: 0}, 800);
  });
}
function giveOffer(animalId) {
  alert(lang.js.err10);
}
function userVerify(id){
  loading(true);
  socket.send('admin', {event: 'user_verify', data: id}, function (cb) {
    loading(false);
    if(cb == 'y' || cb == 'n'){
      $('.e_tc_status').html(cb == 'y' ? '<span class="text-green">'+lang.js.yes+'</span>' : '<span class="text-red">'+lang.js.no+'</span>');
    }
  });
}
function userEdit(e, d) {
  if(d){
    var dp_ = d.person,
      dpr_ = d.ref_person,
      d = dp_,
      dpr = dpr_;
    $('#e_user_id').val(d._id);
    $('#e_tckn').val(d.identify);
    $('#e_named').val(d.name);
    $('#e_gsm').val((d.gsm.split(node_options.telNumberPref)[1])).attr({"placeholder": l.format(lang.js.PHONELE,{'length':node_options.telNumberLen}), "maxlength":node_options.telNumberLen, "minlength":node_options.telNumberLen});
    $('#e_label').val(d.status.label);
    $('#e_newEmail').val(d.email);
    var e_bDate = new Date(d.dates.birth);
    $('#e_birth').val(e_bDate.getFullYear()+'-'+((e_bDate.getMonth() +1)<10 ? '0'+(e_bDate.getMonth() +1) : (e_bDate.getMonth() +1))+'-'+((e_bDate.getDate())<10 ? '0'+(e_bDate.getDate()) : e_bDate.getDate()));
    $('#e_adress').val(d.adress);
    $('#e_gender').val(d.gender);
    $('#e_access').val(d.status.access);
    $('#e_finance_ref').val(dpr.code).attr("placeholder", dpr.name);
    $('#e_km_ref, .e_whom_referer').text(dpr.name);
    $('.e_ref_link').text(node_options.base+"/index.html?ref="+d.ref_code).attr("href", node_options.base+"/index.html?ref="+d.ref_code);
    $('.e_pl_klmk').val(d.finance.bank_data.papara_id);
    $('.e_ref_code').text(d.ref_code);
    $('.e_register_date').text(dateFullTR(new Date(d.dates.register)));
    $('.e_tc_status').html(d.status.tc_status == 'e' ? '<span class="text-green">Evet</span>' : '<span class="text-red">Hayır</span>').attr("onclick","userVerify(\""+d._id+"\")");
    $('.e_last_login_date').text(d.dates.last_login.length > 0 ? zamanBul(d.dates.last_login) : 'Hiç bir zaman');
    $('.e_lastpass_change_date').text(d.status.lastPassChange.length > 0 ? zamanBul(d.status.lastPassChange) : lang.js.never);
  } else {
    hideAdmin();
  }
}
function userActions(e, d) {
  var $ev = $(e);
  if(d){

    var firstHtmlLi='', nameUser=$ev.data("username"), idUser = $ev.data("userid"), cnt = 0,IFRESELLER = $ev.data("access")==1 ? '<option value="NEW_REF_BAYI">'+lang.js.proc1+'</option><option value="EFT_HAVALE_USTLEN">'+lang.js.proc2+'</option><option value="GOLD_TRANSFER">'+lang.js.proc3+'</option><option value="STORE">Şarküteri İşlemleri</option>' : '';

    $.each(d, function(index, value){
      cnt++;
      firstHtmlLi += '<li class="green"><div class="detail-info"><span class="date"> <a class="text-green message">'+dateFullTR(new Date(value.date))+' </a> </span> - <span class="message">'+value.detial+'</span> <small><a class="'+(value.user_ip == '127.0.0.1' ? 'gizle':'text-red')+'" target="_blank" href="https://geoiptool.com/en/?ip='+value.user_ip+'">'+value.user_ip+'</a></small></div></li>';
    });
    if(cnt == 0) firstHtmlLi = '<h3 class="text-red center text-center">'+lang.js.noRecord+'</h3>';
    $ev.data("socket").data.page = parseInt($ev.data("socket").data.page);
    $($ev.data("opendiv")).html('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="panel"><div class="panel-heading"><h4>'+l.format(lang.js.userSpec,{'name':nameUser})+' <select class="actionselect_db" data-userid="'+idUser+'" data-page="'+$ev.data("socket").data.page+'"><option value="old">'+lang.js.oldRecords+'</option><option value="new"> '+lang.js.nue+' </option></select> <select class="actionselect" data-userid="'+idUser+'" data-page="'+$ev.data("socket").data.page+'"><option value=""> -- '+lang.js.all+' -- </option><option value="LOGIN"> '+lang.js.login+' </option><option value="SMS"> SMS </option><option value="NEW_ANIMAL"> '+lang.js.giftAnimal+' </option><option value="BUY">  '+lang.js.animalBuyes+' </option><option value="KILL_MY_ANIMAL"> '+lang.js.deadAnimals+'</option><option value="BUY_FEED">  '+lang.js.feedBuy+'</option><option value="FP_UPDATE"> '+lang.js.productFeed+' </option><option value="ORDER">'+lang.js.allOrders+'</option><option value="GOLD_BUY_EFT">'+lang.js.EFTapprows+' </option><option value="AFFEX_WON"> '+lang.js.refAffex+' </option>'+IFRESELLER+'</select> '+lang.js.recordes+'</h4></div><div class="panel-body"><ul class="project-activity">'+firstHtmlLi+'</ul><hr class="cizgiCek"><ul class="pager no-margin"><li '+($ev.data("socket").data.page == 0 ? 'style="display:none"':'')+' class="previous"><a href="javascript:void(0)" class="btn btn-xs admin_menus_click actionselsect_area" data-username="'+nameUser+'" data-userid="'+idUser+'" data-toggle="1" data-opendiv="#a_user_actions"   data-access="'+$ev.data("access")+'"  data-socket=\'{"event":"user_action_call", "data":{"userid": "'+idUser+'", "page":"'+($ev.data("socket").data.page-1)+'", "proc":"'+$ev.data("socket").data.proc+'", "listing":"'+$ev.data("socket").data.listing+'"}, "fn":"userActions"}\'>'+lang.options._PREV+'</a></li><span class="paggerHead marginTop20" style="top:0 !important;">'+l.format(lang.js.paggination,{'page':($ev.data("socket").data.page+1)})+'</span><li class="next" '+(cnt >= 20 ? '':'style="display:none"')+'><a href="javascript:void(0)" class="btn btn-xs admin_menus_click actionselsect_area" data-username="'+nameUser+'" data-access="'+$ev.data("access")+'"  data-userid="'+idUser+'" data-toggle="1" data-opendiv="#a_user_actions" data-socket=\'{"event":"user_action_call", "data":{"userid": "'+idUser+'", "page":"'+($ev.data("socket").data.page+1)+'", "proc":"'+$ev.data("socket").data.proc+'", "listing":"'+$ev.data("socket").data.listing+'"}, "fn":"userActions"}\'>'+lang.options._NEXT+'</a></li></ul></div><button onclick="hideAdmin()" class="btn btn-danger center-block btn-xs">'+lang.options.close+'</button></div></div>');
    $('select.actionselect').val($(".actionselsect_area:last").data("socket").data.proc).attr("selected", "selected").prop("selected", true);
    $('select.actionselect_db').val($(".actionselsect_area:last").data("socket").data.listing).attr("selected", "selected").prop("selected", true);
  } else {
    hideAdmin();
  }
}
function userRefs(e, d) {
  if(Object.keys(d).length > 0){
    $('.userRefDIV').html("");
    var totalRefWinningUser = 0,refSelect,dates0f='';
    $.each(d, function(i, v){totalRefWinningUser += v.bringGold;});
    $(".totalRefAffexUser").text($.number(totalRefWinningUser, 2));
    $("#ref_total_user").text("("+Object.keys(d).length+")");
    $(".refuserName").text($(e).data("username"));
    $(".ref_date_call").attr("title", $(e).data("useridref"));
    $('.awkRefAffex').attr("title", $(e).data("useridref"))
    $.each(d, function (index, value) {
      $(".userRefDIV").append('<div class="col-lg-2 col-md-3 col-sm-5 col-xs-12"> <div class="card-wrapper"> <div class="card clearfix"><span class="card-type green"><i class="icon-'+(value.online ? 'bolt text-green' : 'cord text-red')+'"></i></span> <a class="text-green message" href="javascript:void(0)"><img src="'+(value.img.length > 0 ? "img/users/"+value.img : 'https://tr4-kfdpjimthe.netdna-ssl.com/img/png/farmer_'+value.gender+'.png')+'" class="img-responsive card-avatar admin_menus_click" title="'+value.access+'" data-toggle="1" data-opendiv="#a_user_edit" data-socket=\'{"event":"user_edit_call", "data":"'+index+'", "fn":"userEdit"}\' > </a> <p><b>'+value.name+'</b></p><small>'+value.label+'</small> </div><ul class="card-actions clearfix"> <li><div class="panel-body"><div class="progress no-margin progress-rounded"><div class="progress-bar progress-bar-success" role="progressbar" style="text-align:center; width: '+((value.bringGold/totalRefWinningUser)*100)+'%"><div class="inLineFlexed" onClick="refForexLoad(\''+$(e).data("useridref")+'\',\''+value.userid+'\',\''+$('.ref_date_call > option:selected').text()+'\',\''+$('.ref_date_call').val()+'\',\''+value.name+'\',\''+$(e).data("username")+'\')">'+(value.bringGold > 0 ? lang.js.profit+": <b>"+$.number(value.bringGold, 2) +" "+lang.options.gold+"</b>" : '<span style="color:gray">'+lang.js.noProfit+'</span>')+'</div></div></div></div></li></ul> </div></div>');
    });
    Last14Days();
  } else {
    hideAdmin();
    alertify.warn(l.format(lang.js.haventProfit,{'name':$(e).data("username")}));
  }
}
function userFinance(e, d) {
  if(typeof d === "object"){
    var _inuser = [], _outuser = [], koloumXuser = [], inValuesuser = [], outValuesuser = [], keysuser, totalRefWinningUserAdmin = 0, dt1 = new Date();
    $.each(d.data_forex, function(index, value){
      if(value.target == 'in') {
        _inuser[value.date.year+"-"+value.date.month+"-"+value.date.day] = value.totalValues;
      } else {
        _outuser[value.date.year + "-" + value.date.month + "-" + value.date.day] = value.totalValues;
      }
    });
    dt1.setDate(dt1.getDate()+1);
    for(var i = 1; i <= new Date(dt1.getFullYear(), dt1.getMonth()+1, 0).getDate(); i++) {
      dt1.setDate(dt1.getDate()-1);
      keysuser = dt1.getFullYear()+"-"+(dt1.getMonth()+1)+"-"+dt1.getDate();
      koloumXuser.push(keysuser);
      inValuesuser.push((_inuser[keysuser] ? (_inuser[keysuser]) : 0));
      outValuesuser.push((_outuser[keysuser] ? (_outuser[keysuser]) : 0));
    }
    $('.dunkuDurumUser').html(' <i class="icon-triangle-up"></i>'+$.number(inValuesuser.reduce(add, 0), 2)+'<sup style="font-size:15px" class="fa fa-try white"></sup>  <i class="icon-triangle-down kirmizi"></i>'+$.number(outValuesuser.reduce(add, 0), 2)+"<sup style='font-size:15px' class='fa fa-try white'></sup>");
    koloumXuser.unshift("x");
    inValuesuser.unshift(lang.js.profit);
    outValuesuser.unshift(lang.js.cost);
    c3.generate({
      bindto: "#audienceOverviewUser",
      data: {
        x: 'x',
        columns: [
          koloumXuser,
          inValuesuser,
          outValuesuser
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: function (d) { return new Date(d).toLocaleString().split(" ")[0]; }
          }
        },
        y : {
          tick: {
            format: function (d) { return $.number(d, 2); }
          }
        }
      }
    });
    $.each(d.data_ref, function(i, v){totalRefWinningUserAdmin += v.bringGold;});
    $(".financeuserName").text(d.data_user.name);
    $("small.user_gold_update").data({"gold_upgrade_admin": d.data_user._id, "gold_upgrade_admin_username":d.data_user.name, "current_gold_admin":d.data_user.finance.gold});
    $("#user_f_cash").html($.number(d.data_user.finance.money, 2)+ " <i class='fa fa-try'></i>");
    $("#user_f_total_cash").html($.number(d.data_money.cash, 2)+ " <i class='fa fa-try'></i>");
    $("#user_f_total_deposit").html($.number(d.data_money.deposit, 2)+ " <i class='fa fa-try'></i>");
    $("#user_f_gold").text($.number(d.data_user.finance.gold, 2));
    $("#user_f_feed_capacity").text($.number(d.data_user.finance.storage.capacity/d.data_user.finance.storage.inOutCron.topSecFeed)+" saat");
    $("#user_f_product_capacity").text($.number(d.data_user.finance.storage.productCapacity/d.data_user.finance.storage.inOutCron.topSecProduct)+" saat");
    $("#user_f_feed_capacity_level").text(node_options.storage.getDepos.out[d.data_user.finance.storage.capacity].level+". level");
    $("#user_f_product_capacity_level").text(node_options.storage.getDepos._in[d.data_user.finance.storage.productCapacity].level+". level");
    $("#user_f_total_ref_unit").text((Object.keys(d.data_ref).length > 0 ? Object.keys(d.data_ref).length+lang.js.person:lang.js.nothing));
    $("#user_f_total_ref").html($.number(totalRefWinningUserAdmin, 2) + " <sup style='font-size: 12px'>"+lang.dashboard.txtGold+"</sup>");
    $("#user_f_total_animal").text((d.data_animal > 0 ? d.data_animal+" "+lang.options.count:lang.js.nothing));
    $("#walletdata").html(
      "<span class='text-green'>Banka: </span>"+(d.data_user.finance.bank_data.name.length > 0 ? d.data_user.finance.bank_data.name : '<small>'+lang.js.unspecified+'</small>')+" <br>" +
      "<span class='text-green'>IBAN: </span>"+(d.data_user.finance.bank_data.iban.length > 0 ? d.data_user.finance.bank_data.iban : '<small>'+lang.js.unspecified+'</small>')+" <br>" +
      "<span class='text-green'>Hesap sahibi: </span>"+(d.data_user.finance.bank_data.owner.length > 0 ? d.data_user.finance.bank_data.owner : '<small>'+lang.js.unspecified+'</small>')+" <br>" +
      "<span class='text-green'>Papara ID: </span>"+(d.data_user.finance.bank_data.papara_id.length > 0 ? d.data_user.finance.bank_data.papara_id : '<small>'+lang.js.unspecified+'</small>'));
    $("#other_f_data").html(
      "<span class='text-blue'>"+lang.js.lastBoughtFeed+" </span>"+(d.data_user.finance.storage.Flevel_updateDate > 0 ? dateFullTR(new Date(d.data_user.finance.storage.Flevel_updateDate*1000)) : '<small>'+lang.js.noRecord+'</small>')+" <br>" +
      "<span class='text-blue'>"+lang.js.lastProductShelterBuy+" </span>"+(d.data_user.finance.storage.Plevel_updateDate > 0 ? dateFullTR(new Date(d.data_user.finance.storage.Plevel_updateDate*1000)) : '<small>'+lang.js.noRecord+'</small>') +" <br>" +
      "<span class='text-blue'>"+lang.js.lastestSell+" </span>"+(d.data_user.finance.storage.productSellDate > 0 ? dateFullTR(new Date(d.data_user.finance.storage.productSellDate*1000)) : '<small>'+lang.js.noRecord+'</small>') +" <br>" +
      "<span class='text-blue'>"+lang.js.lastGoneAway+" </span>"+(d.data_user.finance.storage.FP_updateDate > 0 ? dateFullTR(new Date(d.data_user.finance.storage.FP_updateDate*1000)) : '<small>veri yok</small>'));
    $("#user_f_total_animal_show").data("userid", d.data_user._id).unbind().click(function () {
      loading(true);
      socket.send('admin', {event: 'user_animals_call', data: d.data_user._id}, function (cb) {
        loading(false);
        modalOpen('shelterOpenUser');
        var DELBTN = '',UZMU=0,UZMT=0;
        $(".my_animals_lists_user > div").remove();
        $.each(cb, function (index, value) {
          value.animalData = all_animal[value.animalId];
          UZMU += value.animalData.finance.hourlyProduction*value.sum;
          UZMT += value.animalData.finance.hourlyFeeding*value.sum;
          if(_USERINFO.status.access==3)  DELBTN = '(<span onclick="delAnimal(\''+value._id+'\',\''+value.animalId+'\',\''+d.data_user._id+'\')" style="color:red">Sil</span>)';
          var nextTimeDefine1u  = value.animalData.finance.lifeTimeLimit*86400;
          var leftTimeDynamic1u = value.regDate+(value.animalData.finance.lifeTimeLimit*86400) - unixTime();
          $(".my_animals_lists_user").append('<div class="task-block col-md-6 bug"><h5 class="task-id">'+value.animalData.names.name+'<i class="icon-controller-record"></i></h5><div class="assigned-user"><img src="https://tr4-kfdpjimthe.netdna-ssl.com/img/_media/hayvanlar/s/'+value.animalData.img+'" class="img-responsive"></div><p class="task-desc">'+value.animalData.names.groupName+'</p><div class="progress progress_myanim progress-sm"><div class="progress-bar progress-bar-success" role="progressbar"  style="width: '+(100-((nextTimeDefine1u-leftTimeDynamic1u)/nextTimeDefine1u*100))+'%"></div></div><ul class="task-footer"><li>'+l.format(lang.js.youBought2,{'date':zamanBul(value.regDate)})+'</li></ul><span   class="task-type">'+value.sum+' adet '+DELBTN+' ü: <span class="UU2">'+value.animalData.finance.hourlyProduction+'</span> t: <span class="UU3">'+ value.animalData.finance.hourlyFeeding+'</span></span></div>');
        });

      });
    });
  } else {
    hideAdmin();
  }
}
function delAnimal(INDEX0F,animalId,userId){
  if(confirm("Hayvan silmek istediğinize emin misiniz?")){
    window.socket.send('admin',{'event':'delAnimal', 'INDEX0F':INDEX0F, 'userId':userId, 'animalId':userId},function (rs) {
      alertify.info(rs);
      modalClose('#remodal2');
    });
  };
}
function NAV(NAV){
  var SPT = NAV.split(' ');
  var ISIMs = {'name':'','lastName':''};
  if(SPT.length>1){
    SPT.forEach(function(value,index){

      if(index < (SPT.length)-1) ISIMs.name +=value+" ";
      if(index == (SPT.length)-1) ISIMs.lastName =value.capitalize();
    });

  } else ISIMs.name +=SPT[0];
  ISIMs.name = ISIMs.name.capitalize();
  return ISIMs;
}

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function news_list(e, d) {

  $('.a_newessE').html("");
  if(typeof d === "object"){
    $.each(d, function(index, value){
      console.log(value);
    });
  }
}
function tempPayment(e, d) {
  var preDta = {};
  $('.payment_pre').html("");
  if(typeof d === "object"){
    $.each(d, function(index, value){
      preDta  = '{"paparaPaymentId":"'+value.paymentDt.extInfo+'","userId":"'+value.paymentDt.userId+'","ID":"'+value.paymentDt._id+'"}';
      $('.payment_pre').append('<tr id="userpaymentremove_'+index+'"> <td class="text-center center text-blue" style="vertical-align: middle; width: 100px">'+value.paymentDt.orderCheckId+' <a href="javascript:void(0);" id="paparaCh" data-paparaCh=\''+preDta+'\' class="btn btn-primary btn-xs"> Kontrol</a> </td><td class="text-center center" style="vertical-align: middle"><img src="'+(value.userDt.img.length > 0 ? "img/users/"+value.userDt.img : 'https://tr4-kfdpjimthe.netdna-ssl.com/img/png/farmer_'+value.userDt.gender+'.png')+'" data-identify="'+value.userDt.identify+'" class="img_search_user cursor" height="50px"><br><small>'+value.userDt.name+' <span class="text-dark-blue">('+$.number(value.userDt.finance.gold, 2)+')</span><br>'+value.userDt.gsm.substr(window.node_options.telNumberPref.length-1)+'</small> </td><td style="vertical-align: middle">'+value.bankDt.bankName+'<br><small class="text-dark-blue">'+value.bankDt.accountNumber+'<br>'+value.bankDt.branch+'</small> </td><td style="vertical-align: middle">'+$.number(value.paymentDt.gold, 2)+' <i class="fa fa-try"></i></td><td style="vertical-align: middle"><br>'+zamanBul(new Date(value.paymentDt.date))+'<br><small class="text-dark-blue">'+dateFullTR(new Date(value.paymentDt.date))+'</small> </td><td style="vertical-align: middle"><br>' +
        '<button data-payment="ok" data-payment_id="'+index+'" data-debtid="'+value.paymentDt.debtId+'" data-goldunit="'+value.paymentDt.gold+'" class="btn btn-success btn-lg" style="margin-bottom:5px" type="button" >'+lang.options.ok+'</button><br><small class="text-dark-blue">' +
        '<button data-payment="smssend" data-payment_id="'+index+'" data-goldunit="'+value.paymentDt.gold+'" type="button" class="btn btn-rounded btn-danger btn-xs">'+lang.js.giveAlert+'</button> ' +
        '<button data-payment="delete" data-payment_id="'+index+'" data-goldunit="'+value.paymentDt.gold+'" type="button" class="btn btn-rounded btn-danger btn-xs">'+lang.js.del+'</button></small> </td></tr>');
    });
  } else {
    hideAdmin();
  }


}

function kurbanlikList(e, d) {
  $('.kurbanlik_table').html("");
  if(typeof d === "object"){
    $('.kurban_bekleyen_say').text("("+Object.keys(d).length+")");
    $.each(d, function(index, value){
      var hissedarlarList = '',
        hisseSayList = 0;
      $.each(value.hisseler, function (i,v) {
        hisseSayList += v.hisse;
        hissedarlarList += '<li>'+v.sahipName+' / '+v.sahipGsm+' <small class="text-gray">(7/'+v.hisse+')</small> '+(v.sahipAdres.length > 2 ? v.sahipAdres : '<small class="text-gray">kesim yeri</small>')+'</li>';
      });
      $('.kurbanlik_table').append('<tr><td><ul>'+hissedarlarList+'</ul> </td><td>'+(value.is_saled ? '<span class="text-green">7/7 tamam</span><br><small class="text-gray">'+dateFullTR(new Date(value.saled_date))+'</small>' : '<span class="text-yellow">7/'+hisseSayList+' bekliyor</span>')+'</td><td style="vertical-align: middle">'+(value.kasap.length > 2 ? value.kasap : '--')+'</td><td style="vertical-align: middle">'+(value.kupeNo.length > 2 ? value.kupeNo : '--')+'</td><td style="vertical-align: middle">'+(value.is_saled === false ? '--' : '<button data-kurban_kasap_kupe_gir="'+value._id+'" class="btn btn-success btn-xs" style="margin-bottom:5px" type="button" >Kasap ve Küpe</button>')+' </td></tr>');
    });
  } else hideAdmin();
}
function bayilerList(e, d) {
  $('.bayi_table').html("");
  $('.bayiSys').text("("+d.length+")")
  var bayiName='-',taxNumber='-',durum = '',islem = '',dataPrizesBayi={};
  if(typeof d === "object"){
    $.each(d, function(index, value){
      dataPrizesBayi = {'event':'bayiProc','event2':'pinPrizesGet', 'data' : {'bayiSite':value.finance.bayi_data.web,'resellerId':value.ref_code}};
      islem =  '<div class="btn-group"><button data-toggle="dropdown" class="btn btn-default dropdown-toggle btn-xs" type="button" aria-expanded="false"><span class="circless animate" ></span>İşlemler<span class="caret"></span></button><ul role="menu" class="dropdown-menu"><li class="disabled"><a href="javascript:void(0)">Satışlar</a></li><li class="disabled"><a href="javascript:void(0)">Altın Aktarımları</a></li><li><a href="javascript:void(0)" data-bayiSiparisleri="'+value._id+'">Siparişleri</a></li><li class="disabled"><a href="javascript:void(0)" >Pin Satışları</a></li><li ><a  data-pinPrize=\''+JSON.stringify(dataPrizesBayi)+'\' href="javascript:void(0)" ><i class="fa fa-barcode"></i> Pin Fiyatları</a></li></ul></div>';
      if(value.finance.bayi_data.merchant.name!=''){
        bayiName = value.finance.bayi_data.merchant.name.split(' ')[0]+" "+value.finance.bayi_data.merchant.name.split(' ')[1]; }
      taxNumber = value.finance.bayi_data.taxNumber;


      durum =  value.finance.bayi_data.storing!==false ? '<span class="label label-success">Kargo Üstlenebilir</span>' : '<span class="label label-danger">Üstlenemez</span>' ;
      $('.bayi_table').append('<tr> <td class="text-green">'+value.ref_code+'<br/> <small class="text-dark-blue"> limit : ('+value.finance.bayi_data.takeLimit+')</small></td><td>'+value.name+' <small class="text-yellow">('+value.gsm.split(node_options.telNumberPref)[1]+'</small>)</td><td>'+value.finance.bayi_data.city+'</td><td>'+bayiName+'<br><small class="text-danger">'+taxNumber+'</small></td><td>'+durum+'</td><td>'+islem+'</td></tr>');
    });
  } else hideAdmin();
}

function helpMenu (anlati) {
  switch(anlati){
    case 'gumusNedir' :
      swal({
        title: lang.extra.silverWh,
        type: "question",
        html: lang.extra.silverWh2,
        input: 'html',
        confirmButtonColor: "#446edd",
        confirmButtonText: lang.js.understand
      });
      break;
    case 'kazancTablosu' :
      swal({
        title: lang.extra.winnerTable,
        type: "question",
        html: lang.extra.winnerDet,
        input: 'html',
        confirmButtonColor: "#446edd",
        confirmButtonText: lang.js.understand
      });
      break;
    case 'clanRules' :
      swal({
        title: lang.extra.clanRs,
        html: lang.extra.clanRules,
        input: 'html',
        confirmButtonColor: "#446edd",
        confirmButtonText: lang.js.understand
      });
      break;
    case 'nakitNedir' :
      swal({
        title: lang.js.gold2money,
        type: "question",
        html: lang.js.Wgold2money,
        input: 'html',
        inputAttributes: {
          'maxlength': 50,
          'minlength': 4
        },
        confirmButtonColor: "#446edd",
        confirmButtonText: lang.js.understand
      });
      break;
    case 'altinNedir' :
      swal({
        title: lang.js.goldBalance,
        type: "question",
        html: lang.js.WgoldBalance,
        input: 'html',
        inputAttributes: {
          'maxlength': 50,
          'minlength': 4
        },
        confirmButtonColor: "#446edd",
        confirmButtonText: lang.js.understand
      });
      break;
    case 'yemNedir' :
      swal({
        title: lang.dashboard.feedTxt,
        type: "question",
        html: lang.js.wFeed,
        input: 'html',
        inputAttributes: {
          'maxlength': 50,
          'minlength': 4
        },
        confirmButtonColor: "#446edd",
        confirmButtonText: lang.js.understand
      });
      break;
    case 'uretimNedir' :
      swal({
        title: lang.dashboard.Dproduct,
        type: "question",
        html: lang.js.Wproduct,
        input: 'html',
        inputAttributes: {
          'maxlength': 50,
          'minlength': 4
        },
        confirmButtonColor: "#446edd",
        confirmButtonText: lang.js.understand
      });
      break;
    case 'kazancTablosu' :
      swal({
        title: lang.js.profitTable,
        type: "question",
        html: lang.js.WprofitTable,
        input: 'html',
        inputAttributes: {
          'maxlength': 50,
          'minlength': 4
        },
        confirmButtonColor: "#446edd",
        confirmButtonText: lang.js.understand
      });
      break;
    case 'top10' :
      swal({
        title: "Top 10",
        type: "question",
        html: lang.js.Wtop10,
        input: 'html',
        inputAttributes: {
          'maxlength': 50,
          'minlength': 4
        },
        confirmButtonColor: "#446edd",
        confirmButtonText: lang.js.understand
      });
      break;
  }
}


function formatDate(date){
  var dd = date.getDate();
  var mm = date.getMonth()+1;
  var yyyy = date.getFullYear();
  if(dd<10) {dd='0'+dd}
  if(mm<10) {mm='0'+mm}
  date = mm+'/'+dd+'/'+yyyy;
  return date;
}
function Last14Days() {
  var result = [];
  //$('.ref_date_call').html("");
  for (var i=0; i<8; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    //result.push( formatDate(d) );
    $('.ref_date_call').append('<option value="'+i+'" >'+formatDate(d)+'</option>');
  }

}
function refForexLoad(winner,winning,dt,dayBefore,name,wName) {
  if(dayBefore!=''){

    if(confirm(l.format(lang.js.question7,{'name':name,'date':dt,'winnerName':wName}))){
      var prm =  prompt(l.format(lang.js.question8,{'date':dt,'winnerName':wName}),"0");
      if(prm){
        var obj = {'winner':winner,'winning':winning,'dt':dt,'dayBefore':dayBefore,'gold':prm};
        window.socket.send('admin', {event: 'forexLoadOptional', data: obj}, function (cb){
          $('.ref_date_call').change();
          console.log(cb);
        });
      }
    }
  }else alert(lang.js.err12);

}
function awkRefAffex() {
  window.socket.send('admin', {event: 'awkRefAffex', data: $('.ref_date_call').attr('title')}, function (cb){

  });
}

function orderFinished(stockId,currentStatus) {

  if(currentStatus!=2 && currentStatus!=4) { return false; }
  window.socket.send('bayi', {event: 'orderFinished', data: {'storageId':stockId}},function (rs) {
    setTimeout(function () {  $('a[href*=B_ustlenmeler]').click();},555);
    alertify.info(rs);
  });

}
function giveCargo(stockId,currentStatus,handJob) {
  if(currentStatus!=1 && currentStatus!=4) {return false; }
  if(handJob=='null'){
    swal({
      title: lang.extra.giveCargo,
      html: '<input style="width:100%" placeholder="'+lang.extra.cargoNumber+'" name="cargoNumber" /> <br><br> <select  lass="form-control" name="cargoFirms"><option selected value="0">###Kargo Seçiniz###</option><option value="Aras Kargo">Aras Kargo</option><option value="MNG Kargo">MNG Kargo</option><option value="Yurtiçi Kargo">Yurtiçi Kargo</option><option value="UPS Kargo">UPS Kargo</option><option value="PTT Kargo">PTT Kargo</option><option value="Sürat Kargo">Sürat Kargo</option></select>',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "<i class='fa fa-truck'></i> "+lang.extra.giveInfo,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: function () {
        return new Promise(function (resolve, reject) {
          cargoNumber = $('input[name=cargoNumber]').val();
          cargoFirms = $('select[name=cargoFirms]').val();
          if(cargoFirms!='0' && cargoNumber.length>1){
            window.socket.send('bayi', {event: 'goneCargo', data: {'cargoNumber':cargoNumber,'cargoFirms':cargoFirms,'storageId':stockId}},function (rs) {
              if(typeof rs === "boolean"){
                resolve();
                setTimeout(function () {  $('a[href*=B_ustlenmeler]').click();},555);
              } else {
                reject(rs);
              }
            });
          } else {   reject("Lütfen kargo seçiniz ve kargo numarasını boş bırakmayınız");  }
        });
      }
    }).then(function () {
      swalClose();
    }).catch(swal.noop);
  }else{
    window.socket.send('bayi', {event: 'youCanTouchThis', data: {'storageId':stockId}},function(rs){
      setTimeout(function () {  $('a[href*=B_ustlenmeler]').click();},555);
    });
  }
}

function setSound(val){
  if (typeof localStorage !== 'undefined') {
    window._SOUND = val;
    localStorage.setItem('_SOUND',val);
    return val;
  } else alert(lang.extra.yourBrowserOld);
  return true;
}
function getSound(val){
  if (typeof localStorage !== 'undefined') {
    window._SOUND = val;
    return localStorage.getItem('_SOUND');
  } else return true;
}
function dmy(dt){
  var today = dt ?  new Date(dt) : new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd<10)  dd='0'+dd;
  if(mm<10)  mm='0'+mm;
  return  dd+'/'+mm+'/'+yyyy;
}
function fullScrennn(){
  $('#remodal2').addClass('mxW');
}
function shuffle(array) {
  counter = array.length;
  while (counter > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * counter);
    counter--;
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function startGame(){
  var words,xCharLe,ipucu,Ea;
  xCharLe = 8;
  ipucu = "Büyükbaş bir ahır hayvanı";
  words = "ABCDEFGHYTEICZCVN";
  //İpucu
  $('.sqlQuest').removeClass('kapali');
  $('.quest1on').html(ipucu);

  //KUTULAR
  $('#CONTe').html("");
  var Ea  = words.split('');
  $.each(shuffle(Ea),function(index,value){
    $('#CONTe').append('<li class="ui-state-default">'+value+'</li>');
    // $('#CONTe').append('<span class="SPt square" draggable="true" ondragstart="drag(event)">'+value+'</span>');
  });
  //PETEKLER
  $('#CONT').html("");
  for(var i=0;i<=xCharLe;i++){
    $('#CONT').append('<span data-pentagon_index="'+i+'" class="SPt pentagon" ondragover="allowDrop(event)"></span>');
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function premiumCheck(OBJ) {
  if(OBJ.packId!=0){
    //active
    //reaming day check
    var e = new Date(OBJ.endDate);
    var d = new Date();
    var diffe = e.getTime() - d.getTime();
    if(diffe > 0){
      var toDate = e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate();
      var fromDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
      var diff =  Math.floor(( Date.parse(toDate) - Date.parse(fromDate) ) / 86400000);
      $('.premiumInfo').addClass('tblue');
      $('.preDt').html('<strong class="text-green">Silver Premium</strong><span class="font20px"><span class="remainDay">'+diff+" "+lang.options.day+'<small class="permissionLogin">(Giriş Önceliği)</small></span> </span>');

    }else {
      $('.preDt').html('<strong class="text-white">Premium Üyelik</strong><span class="font14px">+ 30 Günlük Satın Al</span> </span>');
    }

  }else{
    //pasif
    $('.preDt').html('<strong class="text-white">Premium Üyelik</strong><span class="font14px">+ 30 Günlük Satın Al</span> </span>');
  }
}

function sec2day(seconds){
  var numyears = Math.floor(seconds / 31536000);
  var numdays = Math.floor((seconds % 31536000) / 86400);
  var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
  return numdays;
}

function bayiGetir(){
  swal.showLoading();
  window.socket.send("bayiList",{},function(rs){
    $('#sarktulers').html("<option selected='selected' value='0'>--Şarküteri Seçiniz--</option>");
    if(typeof rs !=='boolean'){
      swal.hideLoading();
      $('.sarks').removeClass('gizle');
      $.each(rs,function(index,value){
        if(value.finance.bayi_data.merchant && value.finance.bayi_data.city	){
          if(value.finance.bayi_data.merchant.name){
            if(value.finance.bayi_data.merchant.name.split(' ')[1]){
              $('#sarktulers').append('<option value="'+value._id+'">'+value.finance.bayi_data.merchant.name.split(' ')[0].toUpperCase()+' '+value.finance.bayi_data.merchant.name.split(' ')[1].toUpperCase()+' - '+value.finance.bayi_data.city+'</option>');
            }  else console.log("HATALI finance.bayi_data.merchant.name alanı :  "+value.finance.bayi_data.merchant.name,value.finance.bayi_data);
          }
        }
      });

    } else swal.hideLoading();
  });
}
function ticketPage(syf){
  window.socket.send('ticket',{'event':'view','page':syf},function (rs) {
    var durum = '',yntlyn='';
    $('#t_HTM').html("");
    if(typeof rs =='object'){
      if(rs.length > 0){
        $.each(rs,function(index,value){
          durum = value.status.is_closed===true ?
            '<span class="text-green">Kapandı</span>' :
            value.status.is_read === true ?
              '<span class="text-red">Okundu</span>'
              :
              '<span class="text-gray">Bekliyor</span>' ;

          $('#t_HTM').append('<tr> <td> '+zamanBul(value.dates.created)+' </td><td> '+value.subject.title+' </td><td> '+value.subject.depart.departName+'</td><td> '+value.status.last_answer+' </td><td> '+durum+'</td><td> <button class="btn btn-primary btn-xs"><i class="fa fa-edit"></i></button> <button class="btn btn-info btn-xs" id="VISEABLETICKET"  onClick="msjdty(\''+(value._id)+'\')"><i class="fa fa-eye"></i></button> </td></tr>');
        });
      }else  $('#t_HTM').html('<th colspan="5"><div class="alert alert-info"> <i class="fa fa-alert-circle"></i> Henüz oluşturulmuş destek talebiniz bulunmamaktadır</div></th>');
    }
  });

}
function sozlesmeTalep(){
  swal.setDefaults({
    confirmButtonText: 'Sonraki &rarr;',
    cancelButtonText: 'Kapat',
    showCancelButton: true,
    progressSteps: ['1', '2']
  });
  var TCKN,ADRES,ISIM;
  var steps = [
    {
      title: 'Islak İmzalı Sözleşme Talebi',
      html: '<li>Islak imzalı sözleşme talep etmek için, bu formda yer alan tüm adımları geçmeniz gerekmektedir.</li><br/><li>Kullanıcının Islak imzalı sözleşme alabilmesi için sistemde kayıtlı 5.000 tl değerinde yatırımı olmak zorundadır.</li><br/><li>Kargo masraflarının karşılanması amacıyla, sözleşme talebi için oyundaki hesabından 20 altın kesinti yapılır.</li><br/><li>İş bu sözleşme satın aldığınız ve bundan sonra satın alacağınız tüm yatırımları kapsamaktadır</li><br/><li>Bir kullanıcı yanlızca 1 adet sözleşme talep edebilir.</li>'
    },
    {
      title: 'Sözleşme Talep Formu',
      html: '<div class="alert alert-info">Bilgileriniz hatalıysa <a href="game.html#!resetInformation" onClick="swal.close();" style="color:#fda"><i class="fa fa-edit"></i> burdan </a> değiştirebilirsiniz</div><table border=0 width=100%><tr><td><input disabled="disabled" value="'+_USERINFO.name+'" class=swal2-input placeholder="İsim Soyisim"><tr><td><input class="swal2-input _tcKN" placeholder="TC Kimlik Numarası" disabled="disabled" value="'+_USERINFO.identify+'"><tr><td><textarea class="swal2-textarea" placeholder="Sözleşme kargo adresi" disabled="disabled">'+_USERINFO.adress+'</textarea></table>',
      preConfirm: function (rs) {
        return new Promise(function (resolve, reject) {
          swal.showLoading();
          window.socket.send('sozlesmeTalep',{},function (rs) {
            swal.showLoading(false);
            if(_USERINFO.identify[2]!='_'){
              if(typeof rs!='boolean'){
                reject(rs);
              } else resolve();
            }else{
              reject("Lütfen geçeleri TCK numaranızı profil bölümünden ekleyiniz.");
            }
          });

        });
      },
    }
  ]

  swal.queue(steps).then(function (result) {
    swal.resetDefaults();

    swal({
      type: 'success',
      text: 'Sözleşme talebiniz başarıyla alındı. 7 İş günü içerisinde tarafınıza ıslak imzalı olarak gönderilecektir.'
    })
  }, function () {
    swal.resetDefaults();
  });
}
function msjdty(ticketId) {
  //detay
  var $th = $(this).data();
  loading(true);
  $('.T_LIST').addClass('gizle');
  $('.T_MAIN').removeClass('gizle').html(HTM.ticketMain);
  $(document).find("#txtEditor").Editor();
  window.socket.send('ticket',{'event':'detail', 'ticketId': ticketId},function (rs) {
    loading(false);
    $('#ticketPostId').val(ticketId);
    if(typeof rs =='object'){
      if(typeof rs.QUESTION  =='object'){
        $('.BACK_TO_TICKETS2').removeClass('gizle');
        $('.T_DETAIL').removeClass('gizle');
        domKaldir('.Editor-container');

        var durum = rs.QUESTION.is_closed ==true ?  'Kapandı' : rs.QUESTION.is_read ==true  ? 'İşleniyor' : 'Bekliyor';
        var renk = rs.QUESTION.is_closed ==true ?  'transGreen' : 'transRed';
        $(document).find('.TICKET_POST_TITLE1').html('<i class="icon-file-text2 icon-2x text-blue"></i> '+rs.QUESTION.subject.title);
        $(document).find('.TICKET_POST_TITLE2').html(zamanBul(rs.QUESTION.dates.created)+"<br><center>"+durum+"</center>");

        $(document).find('#TICKET_POST_DETAIL').html(rs.QUESTION.subject.detial);
        $(document).find('#QUESTIONPOSTPANEL').removeClass('transRed').removeClass('transGreen').addClass(renk);
      }
      if(rs.POSTS.length > 0){
        $('.RUBARQAMS').html("");
        $.each(rs.POSTS,function(index,value){
          var ap = '<li class="'+value.io+'"><img class="avatar" alt="" src="'+(value.person.img.length > 0 ? "https://tr4-kfdpjimthe.netdna-ssl.com/img/users/"+value.person.img : 'https://tr4-kfdpjimthe.netdna-ssl.com/img/png/farmer_'+_USERINFO.gender+'.png')+'"> <div class="message">'+decodeHtmlEntity(value.post)+'<p class="date">'+zamanBul(value.post_date)+'</p><p class="info"></p></div></li>';
          $('.RUBARQAMS').append(ap);

        });
      }else{
        $('#t_HTM').append('<div clasS="alert alert-warning TTIT"> Şuan mesaj bulunmamaktadır(!)</div>');
      }
    } else  alertify.error("Hatalı İşlem, Ticket detaylarına ulaşılamadı, Lütfen daha sonra tekrar deneyiniz.");

  });


};
