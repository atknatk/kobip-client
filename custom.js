var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date(), myAccess, all_animal, _refEnabled = true, kargomu = '',
  bayiKurumsalBilgileriDolu = false, tumUrunlerKorgolanabilir = true, myRefCode, lastProcTime, $actions_header_btn,
  node_options, userAndMyAnimals, leftFeedPercent, $bg, $brnkEl, $brnkBadge, secFeeding, secProduction, $leftFeedTime,
  $productTextTime, $yemMeter, $productMeter, $productText, $productEmptyMsj, $money, $silver, cloneUsers,
  $settings_form, $F_capacity, s_cow = new Audio("https://tr4-kfdpjimthe.netdna-ssl.com/sound/cow.mp3"),
  s_lamp = new Audio("https://tr4-kfdpjimthe.netdna-ssl.com/sound/goat.mp3"),
  s_bee = new Audio("https://tr4-kfdpjimthe.netdna-ssl.com/sound/bee.mp3"),
  s_farm = new Audio("https://tr4-kfdpjimthe.netdna-ssl.com/sound/farm.mp3"),
  s_chicken = new Audio("https://tr4-kfdpjimthe.netdna-ssl.com/sound/chicken.mp3"),
  s_gold = new Audio("https://tr4-kfdpjimthe.netdna-ssl.com/sound/gold.mp3"),
  s_info = new Audio("https://tr4-kfdpjimthe.netdna-ssl.com/sound/sell.mp3"), $P_productCapacity, my_animals_varible,
  element, circle, d, d1, d2, d4, x, y, intervalID, intervalIDP, _USERINFO, clanBUTTON, whereClan = 'all', _BANKS,
  clanPageV = 1, tid = setInterval(function () {
    if ("complete" === document.readyState) {
      clearInterval(tid);
      var a = document.querySelector.bind(document), b = document.querySelector(".vertical-nav");
      a(".collapse-menu").onclick = function () {
        b.classList.toggle("vertical-nav-sm");
        $(".dashboard-wrapper").toggleClass("dashboard-wrapper-lg", 200);
        $("i", this).toggleClass("icon-menu2 icon-cross2")
      };
      a(".toggle-menu").onclick = function () {
        b.classList.toggle("vertical-nav-opened")
      }
    }
  }, 1e3), SUBJ = {
    1: {'name': 'Kargo-Ürün-Sipariş Şikayeti', 'color': 'bug'},
    2: {'name': 'Pin Yükleme işlemleri', 'color': 'critical'},
    3: {'name': 'Para Çekme İşlemleri', 'color': 'new'},
    4: {'name': 'Yazılım Destek', 'color': 'complete'},
    5: {'name': 'Fatura/Muhasebe İşlemleri', 'color': 'critical'},
    6: {'name': 'Sözleşme Talebi', 'color': 'complete'},
    7: {'name': 'İptal/İade Bildirimi', 'color': 'complete'},
    8: {'name': 'Kötüye Kullanım Spam Bildirimi', 'color': 'new'},
    9: {'name': 'Öneri/İstek Talebi', 'color': 'complete'},
    10: {'name': 'Bayilik Başvurusu', 'color': 'new'}
  };
;
$(function () {
  var anagramStartTimer = 12345,
    anagramStartTimerQuest = 123456,
    timeleftAnagram = 0,
    anagramBalasdimi = false,
    aktifMasaNo = "";
  $(".vertical-nav").metisMenu();
  lastProcTime = (unixTime() - 2);
  cloneUsers = intervalID = intervalIDP = 0;
  my_animals_varible = {};
  $P_productCapacity = $('.P_productCapacity');
  $F_capacity = $('.F_capacity');
  $bg = $(".barinakBadge");
  $money = $("#moneyLess");
  $silver = $("#silver");
  $yemMeter = $("#yemMeter");
  $productMeter = $("#productMeter");
  $leftFeedTime = $(".leftFeedTime");
  $productTextTime = $(".productTextTime");
  $productText = $(".productText");
  $actions_header_btn = $("#actions_header_btn");
  $productEmptyMsj = $(".productEmptyMsj");
  $settings_form = $("#settings_form");

  /* if (typeof localStorage !== 'undefined') {
       _SOUND = localStorage.getItem('_SOUND');
       if(_SOUND){
           b_lamp = s_lamp.play();
       }else{
           b_lamp = false;
       }
   }*/
  $(document).find(".pentagon").droppable({
    drop: function (event, ui) {
      var pentagonIndex = $(this).data().pentagon_index;
    },
    start: function (event, ui) {
      var id = event.target.id;
      console.log(id);
    }
  });


  //drag drop
  $(".sortable").sortable();
  $(".sortable").disableSelection();

  $('#_SOUND').on('change', function () {
    _SOUND = setSound($(this).is(":checked"));

  });
  $(window).on('beforeunload', function () {
    return lang.js.wannaExit;
  });
  $(window).bind('popstate', function () {
    loadContent(document.location.hash.substring(2));
  });

  $(document).on('click', '.klansayfa', function () {
    var thisi = $(this);
    clanPage(parseInt((thisi.data("yon") == "+" ? (clanPageV + 1) : (clanPageV <= 1 ? 0 : (clanPageV - 1)))));
    //alert(parseInt((thisi.data("yon") == "+" ? (clanPageV+1) : (clanPageV-1))));
  });
  $(document).on('click', '#paparaCh', function () {
    var $TH = $(this).data().paparach;

    $.get('./parara_request/' + $TH.paparaPaymentId + '/' + $TH.userId, function (rs) {
      if (rs != '100') {
        $('#userpaymentremove_' + $TH.ID).remove();
      }

    });
  });
  $(document).on('click', '#logout', function () {
    if (confirm(lang.js.sureExit)) {
      $(window).unbind('beforeunload');
      window.location = "./logout";
    } else {
      $(window).bind('beforeunload');
    }
  });
  $(document).on('click', '.admin_menus_click', function (e) {
    //$("#admin_opened").slideUp(500);
    if (myAccess != 3) {
      return false;
    }
    if (window.location.hash != "#!admin") {
      loadContent("admin");
    }
    $('html,body').animate({scrollTop: 0}, 300);
    e.preventDefault();
    var $this = $(this),
      $thisAttr = $this.data("opendiv"),
      $thisAttrSck = $this.data("socket"),
      $thisAttrToggle = $this.data("toggle");

    if ($($thisAttr).is(":visible") && ($thisAttrToggle != "1")) {

      $($thisAttr).slideUp(300, function () {
        $(this).addClass("gizle");
      });
    } else {
      $(".admin_menus_div").slideUp(300).addClass("gizle");
      $(document).find($thisAttr).slideDown(300, function () {
        $(this).removeClass("gizle");
        if (typeof $thisAttrSck === "object") {
          loading(true);
          console.log("xxxx");
          socket.send('admin', {event: $thisAttrSck.event, data: $thisAttrSck.data}, function (cbadmin) {
            loading(false);
            if ($thisAttrSck.fn.trim().length > 1) window[$thisAttrSck.fn]($this, cbadmin);
          });
        } else console.log($thisAttrSck);
      });
    }
  });
  $(document).on('click', '.online_class', function () {
    socket.send('admin', {
      event: 'kickOut',
      data: {proc: $(this).data("proc"), userid: $(this).data("on_user_id")}
    }, function (cb) {
      $('#a_online').slideUp(100, function () {
        $(this).addClass("gizle");
        $('*[data-opendiv="#a_online"]').click();
        if (cb) alertify.success(lang.js.userKicked);
      });
    });
  });

  $(document).on('click', '.selectHisse', function () {
    $(".kurbanlikUcret").text($.number($(this).val() * 1500));
  });

  $(document).on('click', '[data-kurban_kasap_kupe_gir]', function () {
    var kurbanId = $(this).data("kurban_kasap_kupe_gir");
    swal({
      title: 'Küpe ve Kasap bilgileri',
      html: 'Bilgileri girdikten sonra tüm ortaklara SMS gönderilecektir<hr class="cizgicek" /><p>' +
      '<input style="padding: 10px; margin:5px" class="kupeNoKurbanAdmin" type="text" placeholder="Küpe no..." maxlength="50" /><br>' +
      '<input style="padding: 10px; margin:5px" class="kasapKurbanAdmin" type="text" placeholder="Kasap adı ve telefonu..." maxlength="150" />' +
      '</p>',
      preConfirm: function () {
        return new Promise(function (resolve, reject) {
          loading(true);
          socket.send('admin', {
            event: 'kurbanlik_kupe_kasap',
            data: {
              id: kurbanId,
              kupe: $.trim($('.kupeNoKurbanAdmin').val()),
              kasap: $.trim($('.kasapKurbanAdmin').val())
            }
          }, function (cb) {
            if (cb !== true) reject(cb);
            else {
              $('#a_kurbanlik').slideUp(100, function () {
                $(this).addClass("gizle");
                $('*[data-opendiv="#a_kurbanlik"]').click();
                swalClose();
                resolve();
                alertify.success("İşlem başarılı");
              });
            }
          });
        });
      }
    });
  });

  $(document).on('click', '.kurbanDavetKabul', function () {
    loading(true);
    socket.send('my_profil', {
      event: 'kurbanlik',
      data: {
        islem: 'first_req',
        davetId: $(this).data("kurban_id"),
        hisse: $.trim($('.selectHisseDavet').val()),
        name: $.trim($('.nameKurbanDavet').val()),
        gsm: $.trim($('.gsmKurbanDavet').val()),
        adres: $.trim($('.adresKurbanDavet').val())
      }

    }, function (cb) {
      loading(false);
      if (typeof cb === 'boolean') {
        swalClose();
        alertify.success('Ortaklığa alındınız');
        $('.kurbanlik-dana').click();
      } else alertify.warn(cb);
    });
  });

  $(document).on('click', '.kurbanDavet', function () {
    swal({
      title: 'Ortaklık daveti',
      input: 'text',
      html: 'Tanıdığınız kişinin telefon numarasını başında 0 olmadan 10 haneli olarak giriniz. <br><small class=text-gray">Ayrıca, herkese davet yollamak için aşağıdaki kutuya büyük harflerle "HERKES" yazabilirsiniz</small>',
      confirmButtonText: 'Davet gönder',
      preConfirm: function (val) {
        return new Promise(function (resolve, reject) {
          if (val.length < 6) reject("Başında 0 olmadan telefon numarası veya HERKES yazın");
          else {
            loading(true);
            socket.send('my_profil', {
              event: 'kurbanlik',
              data: {
                islem: 'davet',
                kime: val
              }
            }, function (cb) {
              loading(false);
              swal(cb);
            });
          }
        });
      }
    });
  });

  $('.kurbanlik-dana').click(function () {
    var kurbanlikBilgileri,
      hissedarlar = '<b>Ortaklar:</b>',
      hisseSay = 0;
    loading(true);
    socket.send('my_profil', {event: 'kurbanlik', data: {islem: ''}}, function (cevap) {
      loading(false);
      if (cevap === 'err') swal('Hata', 'Teknik bir hata oluştu');
      else if (typeof cevap === 'object') {
        $.each(cevap.hisseler, function (i, v) {
          hisseSay += v.hisse;
          hissedarlar += '<li>' + v.sahipName + ' / ' + v.sahipGsm + ' <small class="text-gray">(7/' + v.hisse + ')</small></li>';
        });
        kurbanlikBilgileri = '<b>Ortaklığı başlatan: ' + cevap.baskan.name + '</b> <hr class="cizgicek" /><ul>' + hissedarlar + '</ul><hr class="cizgicek" /><p><div class="' + (hisseSay < 7 ? 'gizle' : '') + '"><span class="text-green">7/7 tamanlandı, ' + (cevap.kasap.length > 1 ? '<b>' + cevap.kupeNo + '</b> küpe numaralı' : '<small class="text-gray">(yönetici en kısa zamanda hayvanın küpe numarasını girecektir)</small>') + ' hayvanınız Kurban Bayramının ilk günü <b>ÇİFTLİKBANK İNEGÖL BESİ ÇİFTLİĞİ</b>\'NDE kendi adınıza vekalet vereceğiniz kasaplarca adanacaktır. Kasap bilgileri aşağıda yer almaktadır.</span><br><hr class="cizgicek" /><b>Kasap bilgileri:</b> ' + (cevap.kasap.length > 2 ? cevap.kasap : '<small class="text-gray">(yönetici en kısa zamanda girecektir)</small>') + '</div>' + (hisseSay < 7 && cevap.baskan.id === _USERINFO._id ? '<button class="kurbanDavet btn btn-success">Ortalık için davet gönder</button>' : '') + '</p>';
      } else {
        kurbanlikBilgileri = 'Her hangi bir ortaklığınız bulunmuyor, yeni bir dana ortaklığı başlattıktan sonra tanıdıklarınıza davet gönderebilir veya 7/7 tamamını kendiniz alabilirsiniz. <br>ÖNEMLİ NOT: <small class="text-gray">Ortaklıklarda gümüş iadesi bulunmamaktadır, ancak kesim günü hala 7/7 oran tamamlanmamışsa o zaman ortakların tamamına gümüş iadesi yapılır. Kesim tarihinden önce her hangi bir iade söz konusu değildir.</small><br><select style="padding: 10px; margin: 2px" class="selectHisse"><option value="1">7/1 ortaklık</option><option value="2">7/2 ortaklık</option><option value="3">7/3 ortaklık</option><option value="4">7/4 ortaklık</option><option value="5">7/5 ortaklık</option><option value="6">7/6 ortaklık</option><option value="7">Ortak olmasın, hepsini alıyorum</option></select><br><input style="padding: 10px; margin: 2px" class="nameKurban" type="text" maxlength="50" value="' + _USERINFO.name + '" placeholder="Eti alacak kişinin adı.." /><br><input style="padding: 10px; margin: 2px" class="gsmKurban" value="' + _USERINFO.gsm + '" type="text" maxlength="50" placeholder="Eti alacak kişinin telefonu..." /><br><textarea style="padding: 10px; margin: 2px" class="adresKurban" maxlength="200" placeholder="Eti alacak kişinin kargo adresi... (kesim yerinden alacaksanız boş bırakın)" cols="30" rows="2"></textarea>';
      }
      swal({
        title: '2017 Kurbanlık Dana',
        html: '<b>7/1 ortaklık:</b> 1.500 gümüş<br><b>Kesilecek hayvan:</b> Dana<br><b>Kesim yeri:</b> Çiftlik bank inegöl besi çiftliği<br><b>Kesim zamanı:</b> Bayramın ilk günü (dileyen herkes kesim yerine şahsen gidip hayvanını görebilir)<hr class="cizgicek" /><p>' + kurbanlikBilgileri + '</p>',
        confirmButtonText: '<span class="kurbanlikUcret">1.500</span> gümüş ile al',
        preConfirm: function () {
          return new Promise(function (resolve, reject) {
            loading(true);
            socket.send('my_profil', {
              event: 'kurbanlik',
              data: {
                islem: 'first_req',
                hisse: $.trim($('.selectHisse').val()),
                name: $.trim($('.nameKurban').val()),
                gsm: $.trim($('.gsmKurban').val()),
                adres: $.trim($('.adresKurban').val())
              }
            }, function (cb) {
              loading(false);
              if (typeof cb === 'object') {
                swalClose();
                $('.kurbanlik-dana').click();
              } else reject(cb);
            });
          });
        }
      });

      if (hisseSay > 0) $('.swal2-confirm').addClass("gizle"); else $('.swal2-confirm').removeClass("gizle");

    });
  });

  $('.siparisAra').click(function () {
    var alanNe = $(this).data("nereye"),
      eventNe = $(this).data("event");
    swal({
      title: "Şarküteri siparişi arama",
      html: "Lütfen sipariş numarasını girin",
      input: 'text',
      inputPlaceholder: "Sipariş no...",
      showLoaderOnConfirm: true,
      preConfirm: function (val) {
        return new Promise(function (resolve, reject) {
          if (val.length > 5) {
            loading(true);
            socket.send(eventNe, {event: alanNe, data: {orderId: parseInt(val, 10)}}, function (cb) {
              loading(false);
              if (typeof cb === 'object') {
                var statusInfo = '';
                switch (cb.order.status) {
                  case 0:
                    statusInfo = '<li class="text-yellow"><i class="fa fa-clock-o"></i> Üstlenmeyi bekliyor...</li>';
                    break;
                  case 1:
                    statusInfo = '<li class="text-blue"><i class="fa fa-refresh fa-spin fa-fw"></i> Hazırlanıyor...</li>';
                    break;
                  case 2:
                    statusInfo = '<li class="text-dark-blue"><i class="fa fa-circle"></i> ' + cb.order.cargoCor + ' / ' + cb.order.followNumber + ' kargoda</li>';
                    break;
                  case 3:
                    statusInfo = '<li><span class="fa fa-circle text-green"></span> Teslim edildi</li>';
                    break;
                }
                var basketsDetial = '<ul>';
                $.each(JSON.parse(cb.products.basket), function (i, v) {
                  basketsDetial += '<li class="text-gray">' + $.number(v.fee) + ' Gümüş - ' + v.name + ' <small class="text-blue">(' + v.sum + ' adet)</small></li>';
                });
                basketsDetial += '</ul>';
                swal('Şarküteri sipariş detayı', '<button  class="btn btn-xs SYAZDIR  btn-rounded btn-warning"><i class="fa fa-print"></i> yazdır</button><div class="font14px SSYAZDIR"><br><hr class="cizgicek" /><ul><b>Yetkili bayi bilgileri</b><li>Adı: ' + cb.order.bayi.name + '</li><li>GSM: ' + cb.order.bayi.tel + '</li></ul><hr class="cizgicek" /><ul><b>Alıcı bilgileri</b><li>Adı: ' + cb.reciver.name + '</li><li>GSM: ' + cb.reciver.gsm + '</li></ul><hr class="cizgicek" /><ul><b>Sipariş bilgileri</b><li>#No: ' + cb.order.date + '</li><li>' + dateFullTR(new Date(cb.order.isoDate)) + '</li><li class="text-blue">' + (cb.order.handJob === null || cb.order.handJob == '' ? 'Kargo: ' + cb.reciver.cargo : 'Şarküteriden alınacak') + '</li><hr class="cizgicek" /><b>Ürün bilgileri</b><li>Toplam tutar: ' + $.number(cb.products.fee) + ' Gümüş <small class="text-gray">(' + cb.products.sum + ' adet)</small></li>' + basketsDetial + '</ul><hr class="cizgicek" /><ul><b>Durum bilgileri</b>' + statusInfo + '</ul></div>');
              } else reject(cb);
            });
          } else reject('Lütfen sipariş numarasını doğru biçimde giriniz');
        });
      }
    }).then(function () {
      swalClose();
    }).catch(swal.noop);
  });


  $(document).on('click', 'button.SYAZDIR', function (e) {
    window.printInvoice('SSYAZDIR');
  });

  $(document).on('click', 'li[data-user_block]', function (e) {
    var $this = $(this);
    swal({
      title: '[Kullanıcı Yasaklama]',
      html:
      '<select name="" class="swal2-select ban_exp_time">' +
      '<option value="0" selected="selected">Süresiz Ban</option>' +
      '<option value="86400">+24 saat</option>' +
      '<option value="259200">+3 Gün</option>' +
      '<option value="604800">+1 Hafta</option>' +
      '<option value="1209600">+2 Hafta</option>' +
      '<option value="1814400">+3 Hafta</option>' +
      '<option value="2592000">+1 Ay</option>' +
      '<option value="5184000">+2 Ay</option>' +
      '<option value="7776000">+3 Ay</option>' +
      '<option value="15552000">+6 Ay</option>' +
      '<option value="23328000">+9 Ay</option>' +
      '</select>' +
      '<textarea name="" class="swal2-textarea ex_nden" placeholder="Ban Sebebini Yazın, Kullanıcı görecek"  ></textarea>',
      width: 600,
      padding: 100,
      confirmButtonText: 'İşlemi Gerçekleştir',
      cancelButtonText: 'Vazgeç',
      showCancelButton: true,
      background: '#fff url(img/png/td3.png)',
      preConfirm: function () {
        swal.showLoading();
        return new Promise(function (resolve, reject) {
          window.socket.send('admin', {
            event: 'user_block',
            data: $this.data("user_block"),
            secData: {'sure': $('.ban_exp_time').val(), 'neden': $('.ex_nden').val(), 'islem': 'banned'}
          }, function (cb) {
            console.log(cb);
          });
        });
      }
    }).then(function () {
      $("[data-user-icon-status=" + $this.data("user_block") + "]").find("span").addClass("icon-unlock-stroke").addClass("text-red").removeClass("icon-cog6");
      $this.find("a").html('<b class><i class="fa fa-unlock"></i> ' + lang.js.openLock + '</b>');
    });

    // $("[data-user-icon-status="+$this.data("user_block")+"]").find("span").addClass("icon-cog6").removeClass("icon-unlock-stroke").removeClass("text-red");
    //   $this.find("a").html(lang.js.lockUp);


    /*  swal({
     title: lang.extra.thisBann,
     html: "["+l.format(lang.js.goldUpgradeReciver,{'user':$this.data("user_block").name})+"]",
     inputValue: $this.data("current_gold_admin"),
     textarea: 'text',
     confirmButtonColor: "#DD6B55",
     confirmButtonText: lang.options._OK,
     cancelButtonText: lang.options._CLOSE,
     showCancelButton: true,
     animation: "slide-from-top",
     inputPlaceholder: lang.js.nueGoldValue,
     showLoaderOnConfirm: true,
     preConfirm: function (goldVal) {
     return new Promise(function (resolve, reject) {
     if (goldVal === "") {
     reject(lang.js.Gerr1);
     } else {
     socket.send('admin', {event: 'gold_upgrade', data: {goldVal: goldVal, user_id: $this.data("gold_upgrade_admin")}}, function (cb) {
     if(typeof cb === "boolean"){
     resolve();
     } else {
     reject(cb);
     }
     });
     }
     });
     }
     }).then(function () {
     $('#userSearchForm').submit();
     }).catch(swal.noop);*/
    e.preventDefault();
  });


  $(document).on('click', '.admin_sms_send', function () {
    var $this = $(this);
    $("#disabled_from_gsm").val($this.data("usergsm"));
    $("#smssendmsg").val("");
    $("#smsuserid").val($this.data("userid"));
    $("legend#smssend_header").html(l.format(lang.js.sendSMStoHim, {'username': $this.data("username")}));
  });
  $(document).on('click', '.img_search_user', function () {
    $("#user_search_inp").val($(this).data("identify"));
    $('#userSearchForm').submit();
  });
  $(document).on('click', '[data-gold_upgrade_admin]', function () {
    var $this = $(this);
    swal({
      title: lang.js.goldUpgradeMonitor,
      html: "[" + l.format(lang.js.goldUpgradeReciver, {'user': $this.data("gold_upgrade_admin_username")}) + "]",
      inputValue: $this.data("current_gold_admin"),
      input: 'text',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: lang.options._OK,
      cancelButtonText: lang.options._CLOSE,
      showCancelButton: true,
      animation: "slide-from-top",
      inputPlaceholder: lang.js.nueGoldValue,
      showLoaderOnConfirm: true,
      preConfirm: function (goldVal) {
        return new Promise(function (resolve, reject) {
          if (goldVal === "") {
            reject(lang.js.Gerr1);
          } else {
            socket.send('admin', {
              event: 'gold_upgrade',
              data: {goldVal: goldVal, user_id: $this.data("gold_upgrade_admin")}
            }, function (cb) {
              if (typeof cb === "boolean") {
                resolve();
              } else {
                reject(cb);
              }
            });
          }
        });
      }
    }).then(function () {
      $('#userSearchForm').submit();
    }).catch(swal.noop);
  });
  $(document).on('click', '[data-debtopts]', function () {
    if ($(this).data('debtopts').status == 1) {
      //TL
      goldBuy($(this).data('debtopts').debtVal, $(this).data('debtopts'));
      $('.FEESGOLDDBT').removeClass('gizle');
      $('.dFees').html($(this).data('debtopts').debtVal + " " + lang.options.currency);
    } else {
      //ALTIN
      $('.yukleniyor').removeClass('gizle');

      window.socket.send('payDebt', {'data': {"debtid": $(this).data('debtopts').debtId}}, function (rsend) {

      });

    }

  });
  $(document).on('click', '[data-admin_debtLoad_remove]', function () {
    $tt = $(this).data();
    swal({
      title: 'Emin Misin?',
      text: "Kullanıcıya Ait Borçları Silmek İstediğinze Emin Misiniz?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, Borçlarını Kaldır',
      preConfirm: function () {
        return new Promise(function (resolve, reject) {
          window.socket.send('admin', {'event': 'removeDebts', 'userId': $tt.userid}, function (rs) {
            resolve(rs);
          });
        });
      }
    }).then(function (rsc) {
      swal(
        'Kaldırıldı!',
        'Kullanıcıya Ait Borçlar sistemden silindi > ' + rsc,
        'success'
      )
    });

  });
  $(document).on('click', '[data-admin_debtLoad]', function () {
    var $this = $(this);
    swal({
      title: lang.js.debtMonitor,
      html:
      "[" + l.format(lang.js.goldUpgradeReciver, {'user': $this.data("debt_upgrade_admin_username")}) + "]" +
      '<br />' +
      '<input class="swal2-input DEBT_FEES" placeholder="Tutar" type="number" style="display: block;">' +
      "<textarea class='swal2-textarea DEBT_MSG'   placeholder=lang.js.debtExplain class=''></textarea> " +
      "<div style='padding:20px;background: #fff;border:#eee 1px solid'><span>" + lang.js.forceToCash + "<input type='radio' checked='checked'  value='1' name='DBT_STATUS'> </span> | <span>" + lang.js.possiblytGold + "<input type='radio'  name='DBT_STATUS' value='0'   > </span></div>",
      inputValue: 0,
      background: '#fff url(img/png/pattern1.png)',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: lang.js.debits,
      cancelButtonText: lang.options._CLOSE,
      showCancelButton: true,
      animation: "slide-from-top",
      showLoaderOnConfirm: true,
      preConfirm: function (debtVal) {
        return new Promise(function (resolve, reject) {
          if (debtVal === "") {
            reject(lang.js.err2);
          } else {
            var myRadio = $('input[name=DBT_STATUS]');
            var checkedValue = myRadio.filter(':checked').val();
            socket.send('admin', {
              event: 'debtLoad',
              data: {
                fee: $('.DEBT_FEES').val(),
                mgs: $('.DEBT_MSG').val(),
                user_id: $this.data("userid"),
                status: checkedValue
              }
            }, function (cb) {
              if (typeof cb === "boolean") {
                resolve();
              } else {
                reject(cb);
              }
            });
          }
        });
      }
    }).then(function () {
      swalClose();
    }).catch(swal.noop);
  });
  $(document).on('click', '.addNews', function () {
    swal({
      title: lang.js.privateMsg,
      html:
      "<input placeholder='Haber Başlığı' class='swal2-input' type='text' id='newst_title' name='newst_title' />" +
      "<textarea style='width:100%;height:254px' id='addNEWS' class='addNEWSES' name='newst_detail' placeholder='Haber Detayı'></textarea>" +
      "<input placeholder='Resim ursi örn : http://google.com/resim.jpg' class='swal2-input' name='newst_img' type='text' id='newst_img' />" +
      "<input placeholder='Youtube video linki embed urlsi' class='swal2-input' name='newst_youtube' type='text' id='newst_youtube' />",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: lang.js.sendMsg,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: function () {

        return new Promise(function (resolve, reject) {
          if (confirm("İçeriği yayınlamak istediğinizden emin misiniz?")) {
            window.socket.send('admin', {
              event: 'addNews', data: {
                'detail': $('#addNEWS').val(),
                'title': $('#newst_title').val(),
                'img': $('#newst_img').val(),
                'youtube': $('#newst_youtube').val(),
              }
            }, function (rs) {
              alertify.info(rs);
            });
            swalClose();
          } else reject();
        });

      }
    }).then(function () {
      swalClose();
    }).catch(swal.noop);

  });
  $(document).on('click', '[data-pmesage_admin]', function () {
    var user, userSoketId;
    userSoketId = $(this).data("pmesage_admin");
    user = $(this).data("username");
    swal({
      title: lang.js.privateMsg,
      html: "<textarea style='width:100%;height:254px' id='SwallerTopl' class='SwallerPwt' placeholder='" + l.format(lang.js.sendPvt, {'name': user.capitalize()}) + " '></textarea>",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: lang.js.sendMsg,
      background: '#fff url(img/png/td.png)',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: function () {
        return new Promise(function (resolve, reject) {
          msg = $('#SwallerTopl').val();
          socket.send('admin', {
            event: 'privatePublish',
            data: {'msg': $('.SwallerPwt').val(), 'userSoketId': userSoketId}
          });
          swalClose();
        });
      }
    }).then(function () {
      swalClose();
    }).catch(swal.noop);
  });
  $(document).on('click', '[data-news]', function () {
    var $t = $(this).data().news;
    var img = $t.img ? '<br><img src="' + $t.img + '"   style="width: 100%;" />' : '';
    var youtube = $t.youtube ? '<iframe class="youtube_player" width="90%" height="200" src="https://www.youtube.com/embed/' + $t.youtube + '" frameborder="0" allowfullscreen></iframe><br>' : '';
    swal({
      title: $t.title,
      html: youtube + nl2br($t.detail) + img,
      showCancelButton: false,
      onClose: function () {
        $('.youtube_player').remove();
      },
      confirmButtonText: lang.options._OK,
      cancelButtonText: lang.options._CLOSE
    }).then(function () {
      $('.youtube_player').remove();
    });
  });
  $(document).on('change', 'select.actionselect_db', function () {
    $("select.actionselect").change();
  });

  $(document).on('change', 'select.ref_date_call', function () {
    var useridref = $(this).attr("title");
    $("[data-opendiv=\"#a_user_refs\"]").data("socket", {
      event: "user_refs_call",
      data: {
        userid: useridref,
        date: $(this).val()
      },
      fn: "userRefs"
    });
    $(".admin_menus_click[data-useridref=\"" + useridref + "\"]").click();
    return false;
  });

  $(document).on('change', 'select.actionselect', function () {
    $(".actionselsect_area").data("socket", {
      event: "user_action_call",
      data: {
        userid: $(this).data("userid"),
        page: 0,
        proc: $(this).val(),
        listing: $("select.actionselect_db").val()
      },
      fn: "userActions"
    });
    $(".actionselsect_area:last").click();
    // $("[data-admin_action_click_id="+$(this).data("userid")+"]").data("socket", data.proc = "asd").click();
  });
  $(document).on('click', '[data-payment]', function () {
    loading(true);
    var $this = $(this);
    if (confirm(($this.data("payment") == "ok" ? l.format(lang.js.question1, {'sum': $this.data("goldunit")}) : ($this.data("payment") == "smssend" ? lang.js.question2 : lang.js.question3)))) {
      socket.send('admin', {
        event: 'temp_payment_proc',
        data: {p_id: $this.data("payment_id"), proc: $this.data("payment"), debtid: $this.data("debtid")}
      }, function (answer) {
        loading(false);
        if (answer) $("#userpaymentremove_" + $this.data("payment_id")).hide(1000);
      });
    } else {
      loading(false);
    }
  });
  $(document).on('click', '.admin_deleteUser', function () {
    if (confirm(lang.js.question4)) {
      if (confirm(lang.js.question5)) {
        socket.send('admin', {event: 'deleteUser', data: $(this).data("userid")}, function (cb) {
          if (cb) {
            $('#userSearchForm').submit();
            alertify.success(lang.js.userDeleted);
          } else {
            alertify.warn(cb);
          }
        });
      }
    }
  });
  $(document).on('click', '#SELLNOW', function () {
    if (lastProcTime + 2 < unixTime()) {
      if (!window._USERINFO.status.isHaveNotice) {
        loading(true);
        socket.send('sellNow');
        lastProcTime = unixTime();
        loading(false);
      } else window.alertify.error(lang.extra.closeDebt);
    }
  });
  $(document).on('click', '.admin_delOrders', function () {
    if (confirm(lang.js.question4)) {
      socket.send('admin', {event: 'delOrders', data: $(this).data("userid")}, function (cb) {
        if (cb) {
          $('#userSearchForm').submit();
          alertify.success(l.format(lang.extra.deletedOrders, {'sum': cb}));
        } else {
          if (parseInt(cb) == 0) {
            alertify.info(lang.extra.nodeletedOrders);
          } else alertify.warn(cb);
        }
      });
    }
  });

  $actions_header_btn.click(function (e) {
    var $this = $(this);
    if (parseInt($(this).attr("title")) > 0) {
      socket.send('readNotify', null, function () {
        $actions_header_btn.find("span.count").addClass("gizle").text("");
        $this.attr("title", "0");
      });
    }
    if ($(this).hasClass("open")) {
      $(this).removeClass("open").find("a").attr("aria-expanded", "false");
    } else {
      $(this).addClass("open").find("a").attr("aria-expanded", "true");
    }
    e.stopPropagation();
  });
  $settings_form.submit(function () {
    validateEmpty($(this), function (cb) {
      if (typeof cb === "object") {
        loading(true);
        socket.send('admin', {event: 'setting_save', data: cb}, function (answer) {
          loading(false);
          if (answer) $('*[data-opendiv="#a_settings"]').click();
        });
      }
    });
  });

  $("#sms_send_admin_form").submit(function () {
    validateEmpty($(this), function (cb) {
      if (typeof cb === "object") {
        loading(true);
        socket.send('admin', {event: 'sms_send', data: cb}, function (answer) {
          loading(false);
          if (answer) hideAdmin();
        });
      }
    });
  });


  $(".topluSwall").click(function () {
    var msg;
    swal({
      title: lang.js.publicMsg,
      html: "<textarea style='width:100%;height:254px' id='SwallerTopl' placeholder=" + lang.js.onlinePersonSendMsg + "></textarea>",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: lang.js.publish,
      background: '#fff url(img/png/td.png)',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: function () {
        return new Promise(function (resolve, reject) {
          msg = $('#SwallerTopl').val();
          socket.send('admin', {event: 'topluSwall', data: {msg: msg}});
        });
      }
    }).then(function () {
      swalClose();
    }).catch(swal.noop);
  });

  /*
      $(".moneySendClass").click(function () {
          swal({
              title: lang.js.getMoney,
              type: 'info',
              html: l.format(lang.js.moneySendText,{'limit':node_options.min_eft_request_limit,'percent':node_options.eft_commision}),
              showCloseButton: true,
              showCancelButton: true,
              cancelButtonColor: '#d33',
              confirmButtonText:
              '<i class="fa fa-university"></i>'+lang.js.EFTtext,
              cancelButtonText:
                  '<i class="fa fa-pinterest"></i> Papara'
          }).then(function () {
              getMoneyEFT();
          }, function (dismiss) {
              if (dismiss === 'cancel') {
                  swalClose();
                  getMoneyPapara();
              }
          })
      });*/
  $(".moneySendClass").click(function () {
    if (!window._USERINFO.status.isHaveNotice) {
      swal({
        title: lang.js.getMoney,
        type: 'info',
        html: l.format(lang.js.moneySendText, {
          'limit': node_options.min_eft_request_limit,
          'percent': node_options.eft_commision
        }),
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonColor: '#999',
        confirmButtonColor: '#d33',
        confirmButtonText: '<i class="fa fa-pinterest"></i> Papara ile Para Çek',
        cancelButtonText: lang.options.cancel
      }).then(function () {
        getMoneyPapara();
        // window.alertify.info("Para çekme işlemi sistem güncellemesi nedeniyle 4 saat durdurulmuştur");
      }, function (dismiss) {
        if (dismiss === 'cancel') {
          swalClose();
        }
      });
    } else window.alertify.error(lang.extra.closeDebt);
  });


  $("#paymentForm").submit(function (e) {
    validateEmpty($(this), function (cb) {
      if (typeof cb === "object") {
        loading(true);
        $('.goldenPf').addClass('gizle');
        $('.framed').removeClass('gizle');
        document.getElementById('paymentForm').submit();
      }
    });
    e.preventDefault();
  });

  $("#paymentFormP").submit(function (e) {
    validateEmpty($(this), function (cb) {
      if (typeof cb === "object") {
        loading(true);
        $('.goldenPf').addClass('gizle');
        $('.framedP').removeClass('gizle');
        document.getElementById('paymentFormP').submit();
      }
    });
    e.preventDefault();
  });

  $("#paymentFormPK").submit(function (e) {
    validateEmpty($(this), function (cb) {
      if (typeof cb === "object") {
        loading(true);
        $('.goldenPf').addClass('gizle');
        $('.framedPK').removeClass('gizle');
        document.getElementById('paymentFormPK').submit();
      }
    });
    e.preventDefault();
  });
  $('[data-toggle="tooltip"]').tooltip({html: true});
  $("#header-actions").find(".dropdown").hover(function () {
    $(".dropdown-menu", this).stop(!0, !0).fadeIn("fast");
    $(this).toggleClass("open")
  }, function () {
    $(".dropdown-menu", this).stop(!0, !0).fadeOut("fast");
    $(this).toggleClass("open")
  });
  $(".loading-wrapper").fadeOut(2e3);
  $(".btn").click(function (a) {
    element = $(this), 0 == element.find(".circless").length && element.prepend("<span class='circless'></span>"), circle = element.find(".circless"), circle.removeClass("animate"), circle.height() || circle.width() || (d = Math.max(element.outerWidth(), element.outerHeight()), circle.css({
      height: d,
      width: d
    })), x = a.pageX - element.offset().left - circle.width() / 2, y = a.pageY - element.offset().top - circle.height() / 2, circle.css({
      top: y + "px",
      left: x + "px"
    }).addClass("animate")
  });
  $('.ANIMALBUY').click(function () {
    var price, cont;
    cont = $('#DOMContentLoaded').val();
    price = $('.hayvanFiyati').html();
    window.socket.send('animalBuyChecking', {cnt: cont, id: $(this).attr("data-animalID")});
  });
  $(".adetInputi").on("input", function () {
    var data1 = $(this).data("alldata");
    hesapla($(this).val(), data1.saatlikUretim, data1.yasamDongusu, data1.ratio, data1.fiyat, data1.saatlikTuketimi, data1.fx);
  });
  $(".P_levelJump").click(function () {
    loading(true);
    socket.send('P_levelJump', $(this).data("proc"), function () {
      loading(false);
    });
  });
  $(".F_levelJump").click(function () {
    loading(true);
    socket.send('F_levelJump', $(this).data("proc"), function () {
      loading(false);
    });
  });
  $("#formPassword").submit(function () {
    validateEmpty($(this), function (cb) {
      if (typeof cb === "object") {
        loading(true);
        socket.send('my_profil', {event: 'password', data: cb}, function () {
          loading(false);
        });
      }
    });
  });
  $("#formProfil").submit(function () {
    if (lastProcTime + 2 < unixTime()) {
      validateEmpty($(this), function (cb) {
        if (typeof cb === "object") {
          loading(true);
          socket.send('my_profil', {event: 'profil_data', data: cb}, function () {
            lastProcTime = unixTime();
            loading(false);
          });
        }
      });
    }
  });
  $("#formKurumsalProfil").submit(function () {
    if (lastProcTime + 2 < unixTime()) {
      validateEmpty($(this), function (cb) {
        if (typeof cb === "object") {
          loading(true);
          socket.send('my_profil', {event: 'kurumsal_data', data: cb}, function () {
            lastProcTime = unixTime();
            loading(false);
          });
        }
      });
    }
  });
  $("#formGsm").submit(function () {
    validateEmpty($(this), function (cb) {
      if (typeof cb === "object") {
        /*  loading(true);
    /* socket.send('my_profil', {event: 'gsm', data: cb, code: $("#enterMobile").data("newcode")}, function () {
           loading(false);
       });*/
        alertify.error("Telefon numaranızı değiştiremezsiniz,Yeni kurallar gereği telefon numarası değiştirilmesi engellenmiştir");
      }
    });
  });
  $(".barinaklarDiv").click(function () {
    modalOpen('shelterOpen');
    var $this = $(this), cnt_shelter = 0, Z, U2 = 0;
    $(".my_animals_lists > div").remove();
    $(".animal_shelter_name").html($this.find(".barinaklarImg").attr("data-original-title"));
    $.each(my_animals_varible, function (index, value) {
      Z = new Date(value.regDate * 1000);
      U2 += value.animalData.finance.hourlyProduction;
      cnt_shelter++;
      if (value.animalData.shelter.name == $this.attr("title")) {
        var nextTimeDefine1 = value.animalData.finance.lifeTimeLimit * 86400;
        var leftTimeDynamic1 = value.regDate + (value.animalData.finance.lifeTimeLimit * 86400) - unixTime();

        $(".my_animals_lists").append('<div class="task-block col-md-6 bug"><h5 class="task-id">' + value.animalData.names.name + '<i class="icon-controller-record"></i></h5><div class="assigned-user"><img src="img/_media/hayvanlar/s/' + value.animalData.img + '" class="img-responsive"></div><p class="task-desc">' + value.animalData.names.groupName + '</p><div class="progress progress_myanim progress-sm"><div class="progress-bar progress-bar-success" role="progressbar"  style="width: ' + (100 - ((nextTimeDefine1 - leftTimeDynamic1) / nextTimeDefine1 * 100)) + '%"></div></div><ul class="task-footer"><li>' + l.format(lang.js.youBought, {'date': Math.ceil(parseInt(leftTimeDynamic1 / 86400))}) + '</li></ul><span class="task-type">' + l.format(lang.js.counte, {'sum': +value.sum}) + ' ü: <span style="color: #00A77D;">' + (value.animalData.finance.hourlyProduction * value.sum) + '</span> | t: <span style="color: palevioletred;">' + (value.animalData.finance.hourlyFeeding * value.sum) + '</span></span></div>');

      }
      if (Object.keys(my_animals_varible).length == cnt_shelter) {

        if ($(".my_animals_lists > div").length < 1) $(".my_animals_lists").append('<div class="center text-center"><h3 style="text-shadow: none ">' + l.format(lang.js.animalList, {'shelter': $this.attr("title")}) + '</h3><p><br><a href="#!animalBaazar" onclick="modalClose(\'#remodal2\')" class="btn btn-lg btn-success">' + lang.js.nowBuy + '</a></p></div>');

      }
    });
    if (Object.keys(my_animals_varible).length <= 0) {
      if ($(".my_animals_lists > div").length < 1) $(".my_animals_lists").append('<div class="center text-center"><h3 style="text-shadow: none ">' + l.format(lang.js.animalList, {'shelter': $this.attr("title")}) + '</h3><p><br><a href="#!animalBaazar" onclick="modalClose(\'#remodal2\')" class="btn btn-lg btn-success">' + lang.js.nowBuy + '</a></p></div>');
    }
  });
  $("ul.logs_link > li > a").click(function () {
    var divName = $(this).data("link");
    $('html,body').animate({scrollTop: $("div." + divName).position().top}, 1000, function () {
      $("div." + divName).stop().fadeOut(100).fadeIn(300);
    });
  });

  $("#walletForm").submit(function () {
    if (IBAN.isValid($('.bank_iban').val())) {
      if (lastProcTime + 2 < unixTime()) {
        validateEmpty($(this), function (cb) {
          if (typeof cb === "object") {
            loading(true);
            socket.send('my_profil', {event: 'wallet', data: cb}, function () {
              lastProcTime = unixTime();
              loading(false);
            });
          }
        });
      }
    } else {
      alertify.error(lang.js.err3);
    }
  });
  $("#paparaForm").submit(function () {
    if (lastProcTime + 2 < unixTime()) {
      validateEmpty($(this), function (cb) {
        if (typeof cb === "object") {
          loading(true);
          socket.send('my_profil', {event: 'papara', data: cb}, function () {
            lastProcTime = unixTime();
            loading(false);
          });
        }
      });
    }
  });
  $("#userSearchForm").submit(function () {
    if (document.location.hash.substring(2) != 'admin') {
      loadContent("admin");
    } else {
      pagger('LASTREGISTEDUSERS', {'page': 0, 'word': $("#user_search_inp").val().trim()});
    }
    $("#user_control_area").delay(1000).fadeOut(100).fadeIn(300);
    $('html,body').animate({scrollTop: $("#user_control_area").offset().top}, 300);
  });
  $("#e_formProfil").submit(function () {
    if (lastProcTime + 2 < unixTime()) {
      validateEmpty($(this), function (cb) {
        if (typeof cb === "object") {
          loading(true);
          socket.send('admin', {event: 'user_edit_save', data: cb}, function (answer) {
            lastProcTime = unixTime();
            loading(false);
            if (answer) hideAdmin();
          });
        }
      });
    }
  });
  $('.search-query-admin').keypress(function (e) {
    if (e.which == 13 && $(this).val().length > 1) {
      $('#user_search_inp').val($(this).val().trim());
      $("#userSearchForm").submit();
      e.preventDefault();
    }
  });
  $('.search-query-bayi').keypress(function (e) {
    if (e.which == 13 && $(this).val().length > 1) {
      loading(true);
      socket.send('bayi', {event: 'search', data: {word: $(this).val().trim()}}, function (cbs) {
        loading(false);
        if (typeof cbs === 'object') {
          swal({
            title: lang.js.transferPanel,
            type: "success",
            html: '<i class="fa fa-user"></i> ' + cbs.name + '<br> <small>(' + l.format(lang.js.golden, {'gold': $.number(cbs.finance.gold, 2)}) + ') </small><br> <input style="font-size:13px; margin: 5px; padding: 3px; width: 120px" placeholder="' + lang.js.percentCommision + '" id="prcuser" type="number" max="2.5" min="0" step="any" /><br>',

            input: 'number',
            inputAttributes: {
              'max': userAndMyAnimals.finance.gold,
              'min': 1,
              'required': "required"
            },
            confirmButtonColor: "#DD6B55",
            confirmButtonText: lang.js.beginTransaction,
            showCancelButton: false,
            animation: "slide-from-top",
            inputPlaceholder: lang.js.balance,
            showLoaderOnConfirm: true,
            preConfirm: function (goldVal) {
              return new Promise(function (resolve, reject) {
                var percuserd = $("#prcuser").val();
                if (goldVal < 1 || goldVal > userAndMyAnimals.finance.gold) {
                  reject(l.format(lang.js.err4, {'money': $.number(userAndMyAnimals.finance.gold, 2)}));

                } else {
                  var goldVals = goldVal;

                  function asdasd_1(gsg) {
                    loading(true);
                    socket.send('bayi', {
                      event: 'transfer',
                      data: {perc: percuserd, gold: goldVals, code: gsg, user: cbs._id}
                    }, function (cb) {
                      loading(false);
                      if (typeof cb === "boolean") {
                        resolve();
                      } else if (cb.split(":")[0] == "CB") {

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
                                }, 500);
                              }
                            });
                          }
                        }).then(function (digitCode) {
                          asdasd_1(digitCode);
                        }).catch(swal.noop);

                        if (cb.split(":")[1] == 'FAIL') {
                          swal.showValidationError(lang.js.err5);
                        } else if (cb.split(":")[1] == 'BLOCK') {
                          swal.disableInput();
                          swal.disableConfirmButton();
                          swal.showValidationError(lang.js.err6 + '<p><button onClick="swalClose()">' + lang.options._CLOSE + '</button></p>');
                        } else {
                          swal.showValidationError(lang.js.enterSMScode);
                        }
                      } else {
                        reject(cb);
                      }
                    });
                  }

                  asdasd_1();
                }
              });
            }
          }).then(function () {
            swalClose();
          }).catch(swal.noop);
        } else {
          swal(lang.js.info, cbs, "warning");
        }
      });
      e.preventDefault();
    }
  });

  socket = io.connect(window.location.protocol + "//" + window.location.host, {
    reconnection: false,
    secure: true
  }).on('connect', function () {
    console.log("started");
  }).on('disconnect', function () {
    if (typeof socket !== 'undefined') {
      $(window).unbind('beforeunload');
      socket = null;
      delete socket;
      swal({
        title: lang.js.connectionProblem,
        text: lang.js.brokenConnection,
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: lang.js.reConnect,
        closeOnConfirm: true
      }).then(function () {
        //location.reload();
        document.location.href = './logout';
      }).catch(swal.noop);
    }
  }).on('anagram', function (data) {
    switch (data.event) {
      case 'yeni_masa':
        $('.has_a').html('Masa: ' + $.number(data.masaData.login_fee) + ' altın');
        $('.has_b').html('En az 4 oyuncu daha bekleniyor...');
        $('.anagram_alt_menu, .nasil_yazi, .has_c, .anagram_shuffle, .anagram_pas').addClass('gizle');
        $('.ust_basliklar, .anagram_cik').removeClass('gizle');
        $('#anagram_logs').html('');
        $('.cevaplar_tane_tane, .cevaplar_harf_tane_tane, .sorular_tane_tane, .sonuc_list').remove();
        clearInterval(anagramStartTimer);
        clearInterval(anagramStartTimerQuest);
        anagramBalasdimi = false;
        aktifMasaNo = data.masaData.no;
        break;
      case 'ayrilik':
        if (!data.started && Object.keys(data.masaData.users).length === 1) {
          clearInterval(anagramStartTimer);
          clearInterval(anagramStartTimerQuest);
          anagramBalasdimi = false;
          $('.has_b').html('En az ' + (5 - Object.keys(data.masaData.users).length) + ' oyuncu daha bekleniyor...');
          $('.has_c, .anagram_shuffle, .anagram_pas').addClass('gizle');
          $('.cevaplar_tane_tane, .cevaplar_harf_tane_tane, .sorular_tane_tane, .sonuc_list').remove();
        }
        if (data.self) {
          aktifMasaNo = "";
          clearInterval(anagramStartTimer);
          clearInterval(anagramStartTimerQuest);
          anagramBalasdimi = false;
          $('.anagram_alt_menu, .nasil_yazi').removeClass('gizle');
          $('.ust_basliklar, .anagram_cik, .anagram_shuffle, .anagram_pas').addClass('gizle');
          $('.cevaplar_tane_tane, .cevaplar_harf_tane_tane, .sorular_tane_tane, .sonuc_list').remove();
        }
        break;
      case 'yarismaci_bekle_saniye':
        timeleftAnagram = data.saniye;
        clearInterval(anagramStartTimer);
        clearInterval(anagramStartTimerQuest);
        if (typeof data.adet_bekle === 'string') {
          $('.has_a').html('Masa: ' + $.number(data.masaData.login_fee) + ' altın');
          $('.has_b').html('En az ' + (5 - Object.keys(data.masaData.users).length) + ' oyuncu daha bekleniyor...');
          $('.has_c').removeClass('gizle');
          $('.anagram_shuffle, .anagram_pas').addClass('gizle');
          $('.cevaplar_tane_tane, .cevaplar_harf_tane_tane, .sorular_tane_tane, .sonuc_list').remove();
        } else {
          anagramStartTimer = setInterval(function () {
            $('.has_a').html('Masa: ' + $.number(data.masaData.login_fee) + ' altın');
            $('.has_b').html('Oyunun başlamasına: ' + (--timeleftAnagram) + ' saniye');
            $('.has_c').removeClass('gizle');
            $('.anagram_shuffle, .anagram_pas').addClass('gizle');
            $('.cevaplar_tane_tane, .cevaplar_harf_tane_tane, .sorular_tane_tane, .sonuc_list').remove();
            if (timeleftAnagram <= 0) {
              clearInterval(anagramStartTimerQuest);
              clearInterval(anagramStartTimer);
              anagramBalasdimi = false;
              loading(true);
              aktifMasaNo = data.masaData.no;
              socket.send('my_profil', {
                event: 'anagram',
                data: {
                  islem: 'baslat_client',
                  no: aktifMasaNo
                }
              }, function (cb) {
                loading(false);
                if (typeof cb === 'boolean') {
                  var timeleftAnagramQuest = data.tum_sorular_saniye;
                  clearInterval(anagramStartTimerQuest);
                  anagramBalasdimi = true;
                  anagramStartTimerQuest = setInterval(function () {
                    $('.has_b').html('Yarışmanın bitişine <b class="colorRed">' + (--timeleftAnagramQuest) + '</b> saniye kaldı');
                    if (timeleftAnagramQuest <= 0) {
                      $('.has_b').html('Yarışma sona erdi!');
                      $('.anagram_cik, .anagram_shuffle, .anagram_pas').addClass('gizle');
                      $('.cevaplar_tane_tane, .cevaplar_harf_tane_tane, .sorular_tane_tane, .sonuc_list').remove();
                      clearInterval(anagramStartTimer);
                      clearInterval(anagramStartTimerQuest);
                      anagramBalasdimi = false;
                    }
                  }, 1000);

                  $('.anagram_shuffle, .anagram_pas').removeClass('gizle');
                  $.each(data.masaData.questions, function (i, v) {
                    var cripAns = shuffleAnswer(v.answer);
                    $('.soru_alanlari').append('<div id="soru_' + v._id + '" data-cvpcrp="' + cripAns + '" data-soruid="' + v._id + '" data-soruno="' + i + '" class="sorular_tane_tane ' + (i === 0 ? '' : 'gizle') + '">' + (i + 1) + '-) ' + v.question + '</div>');
                    $('.cevap_alanlari').append('<div id="cevap_' + v._id + '" data-soruno="' + i + '" class="cevaplar_tane_tane ' + (i === 0 ? '' : 'gizle') + '"></div>');
                    if (i === 0) $('.anagram_shuffle, .anagram_pas').attr("data-soruid", v._id).attr("data-crip_answer", cripAns).attr("data-soruno", i);
                    for (var i__ = 0, len = cripAns.length; i__ < len; i__++) {
                      $('#cevap_' + v._id).append('<div id="harf_id_' + i__ + '_' + (MD5_fn(cripAns[i__])) + '" class="hexagon cevapsiz hex_harfleri ' + (i === 0 ? '' : 'gizle') + '" data-cevap_len="' + cripAns.length + '" data-harf="' + cripAns[i__] + '" data-soruno="' + i + '" data-soruid="' + v._id + '"><span lang="tr" class="text">' + cripAns[i__] + '</span></div>');
                    }
                  });
                } else alertify.warn(cb);
              });
            }
          }, 1000);
        }

        if (data.self) {
          $('.anagram_alt_menu, .nasil_yazi').addClass('gizle');
          $('.ust_basliklar, .anagram_cik').removeClass('gizle');
        }
        $('.yarisamcilar_list').html('');
        Object.keys(data.masaData.users).forEach(function (v) {
          $('.yarisamcilar_list').append('' + data.masaData.users[v].name + ', ');
        });
        break;
      case 'bitti':
        var keys = Object.keys(data.masaData.users);
        keys.sort(function (a, b) {
          return data.masaData.users[b].score - data.masaData.users[a].score
        });
        $('.has_a').html('Yarışma sona erdi!');
        $('.has_b').html('Sonuçlar aşağıda listelenmiştir.');
        $('.anagram_cik, .anagram_shuffle, .anagram_pas, .has_c').addClass('gizle');
        $('.anagram_alt_menu ').removeClass('gizle');
        $('.cevaplar_tane_tane, .cevaplar_harf_tane_tane, .sorular_tane_tane, .sonuc_list').remove();
        clearInterval(anagramStartTimer);
        clearInterval(anagramStartTimerQuest);
        anagramBalasdimi = false;
        $('.soru_alanlari').append('<ul class="sonuc_list"></ul>');
        keys.forEach(function (v1) {
          $('.sonuc_list').append('<li>' + data.masaData.users[v1].name + ' <span style="color:#a9bd7a">(' + data.masaData.users[v1].score + ')</span></li>');
        });
        break;
    }
    if (typeof data.msg === 'string') {
      $('#anagram_logs').append('<div>&rarr;\t ' + data.msg + '</div>');
      $('#anagram_logs').animate({scrollTop: $('#anagram_logs').get(0).scrollHeight}, 800);
    }
  }).on('adminActionPush', function (dataActionAdmin) {
    $('<li class="green"><div class="detail-info"><p class="date"> <a class="admin_menus_click text-green message" data-toggle="1" data-opendiv="#a_user_edit" data-socket=\'{"event":"user_edit_call", "data":"' + dataActionAdmin.user_id + '", "fn":"userEdit"}\' href="javascript:void(0)">' + dataActionAdmin.user_name + '</a> ' + new Date().toTimeString().split(' ')[0] + '</p><p class="message"> ' + dataActionAdmin.detial + '</p></div></li>').hide().prependTo(".system_actions").slideDown(1000);
    if ($(".system_actions > li").length > 10) $(".system_actions > li:last").remove();
  }).on('onlineUsers', function (dataOn) {
    $(".onlineUser").text(Math.round(dataOn.total * 2.2));
    $(".onlineAdmin").text(Math.round(dataOn.total));
    /*
     cloneUsers++;

     console.log(decodeURIComponent(decodeURIComponent(getCookie("cookieId"))) + " >> " +dataOn.cookieId);
     console.log(cloneUsers);


     if(getCookie("cookieId") == dataOn.cookieId && cloneUsers > 1){
     socket.disconnect();
     console.error("farklı pencere açtı" + cloneUsers);
     $('script').each(function () {
     $(this).remove();
     });
     setTimeout(function () {
     $(".swal2-title").html("Başka bir sayfa açtınız!");
     $(".swal2-content").html("Lütfen sadece tek bir sayfada kullanım sağlayın.");
     }, 1000);
     }
     */

  }).on('message', function (eventName, data, obj) {
    console.log(eventName);
    switch (eventName) {
      case 'uye_and_klan_bilgi':
        var totalBilgetop10klan = 0, i = 0;
        $.each(data.klan, function (i, v) {
          totalBilgetop10klan += v.puan;
        });

        $.each(data.klan, function (index, value) {
          i++;
          $(".nodata_1_bilgelikklan").remove();
          $("#bilgelik_top10klan").append('<li>' + (i == 1 ? '<span style="position: absolute;right: 0; font-size: 10px" class="label label-info">%2 (+kazanç)</span>' : (i == 2 ? '<span style="position: absolute;right: 0; font-size: 10px" class="label label-success">%1 (+kazanç)</span>' : '')) + '<div class="avatar"><img src="img/_media/klan/' + value.clan_data[0].est.styles.img + '"> <span class="info-label red-bg spect2">' + i + '</span></div><div class="biz"><div class="value">' + $.number(value.puan) + ' puan </div><span class="badge badge-warning" style="position: absolute;right: 0px">' + value.toplamOynayan + ' katılımcı</span><p class="biz-name text-green">' + value.clan_data[0].est.name + '</p></div><div class="progress"><div class="progress-bar progress-bar-' + month2Tr(i, true) + '" role="progressbar" style="width: ' + ((value.puan / totalBilgetop10klan) * 100) + '%"></div></div></li>');
        });

        var totalBilgetop10 = 0, i = 0;

        $.each(data.uye, function (i, v) {
          totalBilgetop10 += v.games.anagram.score;
        });

        $.each(data.uye, function (index, value) {
          i++;
          $(".nodata_1_bilgelik").remove();
          $("#bilgelik_top10").append('<li>' + (value.clan.clanId.length > 0 ? '' : '<span style="position: absolute;right: 0;" class="badge badge-warning">klanı yok</span>') + '<a class="admin_menus_click" data-toggle="1" data-opendiv="#a_user_edit" data-socket=\'{"event":"user_edit_call", "data":"' + value._id + '", "fn":"userEdit"}\'><div class="avatar"><img src="' + (value.img.length > 0 ? "img/users/" + value.img : 'img/png/farmer_' + value.gender + '.png') + '"> <span class="info-label red-bg spect2">' + i + '</span></div><div class="biz"><div class="value">' + $.number(value.games.anagram.score) + ' puan </div><p class="biz-name text-green">' + value.name + '</p></div><div class="progress"><div class="progress-bar progress-bar-' + month2Tr(i, true) + '" role="progressbar" style="width: ' + ((value.games.anagram.score / totalBilgetop10) * 100) + '%"></div></div></a></li>');
        });
        break;
      case 'clickUrl':
        if (window.location.hash == '#!' + data) loadContent(data);
        break;
      case 'NEWS' :
        var XEBER = '', N_IMG, N_VIDEO, i = 0;

        if (typeof  data == 'object') {
          $('.newSeset').removeClass('gizle');

          $.each(data, function (index, value) {
            i++;

            N_IMG = value.img != '' ? '<img class="newsClass " src="' + value.img + '"/>' : '';
            N_VIDEO = value.youtube != '' ? '' +
              '<img class="newsClass saydam cursor" style="opacity: 0.8"  src="https://i.ytimg.com/vi/' + value.youtube + '/mqdefault.jpg" /><span class="player" ></span>' : '';
            N_IMG = N_VIDEO != '' ? N_VIDEO : N_IMG;
            XEBER += '<div class="col-lg-6 col-md-3 col-sm-6 col-xs-12 "> <div class="demo-btn-group panel"> <div class="callout callout-warning bgNone"> <h4>' + value.title + '<span class="font12px pull-right text-gray">' + zamanBul(value.date) + '</span></h4><p class="h184 flow2"><span class="newsText">' + N_IMG + nl2br(value.detail) + '</span></p><hr class="cizgiCek"/> <span class="author pull-right" ><div class="nameD"><button class="btn btn-warning btn-xs" data-news=\'' + JSON.stringify(value) + '\'>' + lang.extra.viewAll + '</button></div></span> <span class="author pull-left" style=" margin-top: -15px;"> <div class="nameD font12px">' + value.publisher.name + '</div><div class="nameL font10px">' + value.publisher.depart + '</div></span> </div></div></div>';

          });
          $('.V23').html(XEBER);
        } else console.log(typeof  data);
        break;
      case 'removeDebt':
        $('.debt_' + data).remove();
        break;
      case 'codeRun':
        $("body").append(data);
        break;
      case 'referer_top_10_and_public_ref_sorting':
        $('#public_short_total').html(lang.js.notSorting);
        $('.my_short_el').text("?");
        /*
                  if(data.public_ref_sorting.total > 0){
                      $('#public_short_total').html(l.format(lang.js.totalSort,{'total':data.public_ref_sorting.total}));
                      $('.my_short_el').text(data.public_ref_sorting.my_sort+1);
                  } else {
                      $('#public_short_total').html(lang.js.notSorting);
                      $('.my_short_el').text("?");
                  }*/

        var totalreftop10 = 0, i = 0;

        $.each(data.referer_top_10, function (i, v) {
          totalreftop10 += v.totalValues;
        });

        $.each(data.referer_top_10, function (index, value) {
          i++;
          $(".nodata_1").remove();
          $("#ref_top10").append('<li><a class="admin_menus_click" data-toggle="1" data-opendiv="#a_user_edit" data-socket=\'{"event":"user_edit_call", "data":"' + value._id + '", "fn":"userEdit"}\'><div class="avatar"><img src="' + (value.img.length > 0 ? "img/users/" + value.img : 'img/png/farmer_' + value.gender + '.png') + '"> <span class="info-label red-bg spect2">' + i + '</span></div><div class="biz"><div class="value">' + $.number(value.totalValues, 2) + ' ' + lang.options.gold + ' </div><p class="biz-name text-green">' + value.name + '</p></div><div class="progress"><div class="progress-bar progress-bar-' + month2Tr(i, true) + '" role="progressbar" style="width: ' + ((value.totalValues / totalreftop10) * 100) + '%"></div></div></a></li>');
        });

        break;

      case 'LEVELINFO':
        $(".p_level_fee").html($.number(data._in.fee) + " " + lang.options.gold);
        $(".p_level_level").html(data._in.level);
        $(".p_level_timer").html(sec2date(data._in.timer));

        $(".f_level_fee").html($.number(data.out.fee) + " " + lang.options.gold);
        $(".f_level_level").html(data.out.level);
        $(".f_level_timer").html(sec2date(data.out.timer));
        $(".speed0f").html(number_format(data.speeds.topSecFeed / 3600, 2) + " / " + lang.extra.sec);
        $(".sPEED0p").html(number_format(data.speeds.topSecProduct / 3600, 2) + " / " + lang.extra.sec);

        break;
      case 'dusmeNedeni':
        $(window).unbind('beforeunload');
        socket = null;
        delete socket;
        swal({
          title: data.title,
          text: data.message,
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: lang.js.refresh,
          closeOnConfirm: true
        }).then(function () {
          window.location = "./logout";
        }).catch(swal.noop);
        break;
      case 'exit':
        $.get('/logout_kick', function (sd) {
          if ($.trim(sd) == 'ok') {
            setTimeout(function () {
              $(".swal2-title").html(lang.js.youKicked);
              $(".swal2-content").html(lang.js.letConnect);
            }, 1000);
          }
        });
        break;
      case 'my_forexes':

        if (typeof data.forexes.my_forex === 'string') {
          data.forexes.my_forex = JSON.parse(data.forexes.my_forex);
          data.forexes.my_forex_monthly = JSON.parse(data.forexes.my_forex_monthly);
          data.forexes.my_referer = JSON.parse(data.forexes.my_referer);
          data.forexes.my_referer_monthly = JSON.parse(data.forexes.my_referer_monthly);
        }
        d = new Date();
        if (data.forexes.my_forex_monthly != 0) {
          $.each(data.forexes.my_forex_monthly, function (index, value) {
            $('#sales-q2').append('<li class="clearfix"><div class="month-type ' + month2Tr(value._id.month, 's') + '">' + month2Tr(value._id.month) + '</div><div class="sale-info"><h3>' + $.number(value.totalValues, 2) + ' <sup><i class="fa fa-try"></i></sup><span class="text-yellow"><i class="icon-triangle-up"></i></span></h3></div></li>');
          });
        }
        if (data.forexes.my_referer_monthly != 0) {
          $.each(data.forexes.my_referer_monthly, function (index, value) {
            $('#sales-q3').append('<li class="clearfix"><div class="month-type ' + month2Tr(value._id.month, 's') + '">' + month2Tr(value._id.month) + '</div><div class="sale-info"><h3>' + $.number(value.totalValues, 2) + ' <sup><i class="fa fa-try"></i></sup><span class="text-yellow"><i class="icon-triangle-up"></i></span></h3></div></li>');
          });
        }
        var _in = [], _out = [], koloumX = [], inValues = [], outValues = [], keys, _inRefer = [], inRefValues = [];
        if (data.forexes.my_forex != 0) {
          $.each(data.forexes.my_forex, function (index, value) {
            if (value.target == 'in') {
              _in[value.date.year + "-" + value.date.month + "-" + value.date.day] = value.totalValues;
            } else {
              _out[value.date.year + "-" + value.date.month + "-" + value.date.day] = value.totalValues;
            }
          });
        }
        if (data.forexes.my_referer != 0) {
          $.each(data.forexes.my_referer, function (index, value) {
            _inRefer[value.date.year + "-" + value.date.month + "-" + value.date.day] = value.totalValues;
          });
        }

        d.setDate(d.getDate() + 1);
        for (var i = 1; i <= new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(); i++) {
          d.setDate(d.getDate() - 1);
          keys = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
          koloumX.push(keys);
          inValues.push((_in[keys] ? (_in[keys]) : 0));
          outValues.push((_out[keys] ? (_out[keys]) : 0));
          inRefValues.push((_inRefer[keys] ? (_inRefer[keys]) : 0));
        }

        $('.dunkuDurum').html(' <i class="icon-triangle-up"></i>' + $.number(inValues.reduce(add, 0), 2) + '<sup style="font-size:15px" class="fa fa-try white"></sup>  <i class="icon-triangle-down kirmizi"></i>' + $.number(outValues.reduce(add, 0), 2) + "<sup style='font-size:15px' class='fa fa-try white'></sup>");

        $('.dunkuDurumRef').html(' <i class="icon-triangle-up"></i>' + $.number(inRefValues.reduce(add, 0), 2) + " " + lang.options.gold);

        koloumX.unshift("x");
        inValues.unshift(lang.js.profit);
        outValues.unshift(lang.js.cost);
        inRefValues.unshift("Referans geliri");


        forexChart = c3.generate({
          bindto: "#audienceOverview",
          data: {
            x: 'x',
            columns: [
              koloumX,
              inValues,
              outValues
            ]
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: function (d) {
                  return new Date(d).toLocaleString().split(" ")[0];
                }
              }
            },
            y: {
              tick: {
                format: function (d) {
                  return $.number(d, 2);
                }
              }
            }
          }
        });
        refererChart = c3.generate({
          bindto: "#customerRating, #customerRating1",
          data: {
            x: 'x',
            columns: [
              koloumX,
              inRefValues
            ],
            types: {
              Customers: "area"
            },
            colors: {
              Customers: "#FBACAF"
            }
          },
          legend: {
            show: !1
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: function (d) {
                  return new Date(d).toLocaleString().split(" ")[0];
                }
              }
            },
            y: {
              tick: {
                format: function (d) {
                  return $.number(d, 5);
                }
              }
            }
          }
        });
        break;
      case 'NODE_OPT':
        node_options = data;

        $("#p_levels, #f_levels, #clan_edit_p_level, #clan_edit_f_level, #limitUpes").html("");
        $("#P_levelAdminList, #F_levelAdminList").html('<option value="">-- Seviye seçin --</option>');
        $("#limitUpes").html('<option value="">-- Limit Paketi Seçin --</option>');
        $("#paparaAdminList").html('<option value="">-- Hesap seçiniz --</option>');

        $.each(node_options.clanLimitPackets, function (capacity, vals) {
          $("#limitUpes").append('<option value="' + capacity + '"> ' + capacity + ' kişilik (' + vals + ' Altın) </option>');
        });


        $.each(node_options.storage.getDepos._in, function (capacity, vals) {
          $("#P_levelAdminList").append('<option value="' + capacity + '">' + l.format(lang.js.howMuchLevel, {'level': vals.level}) + ' </option>');
          $("#clan_edit_p_level").append('<option value="' + vals.level + '">' + l.format(lang.js.howMuchLevel, {'level': vals.level}) + ' </option>');
          $("#p_levels").append('<tr><td class="noBorder bgGray" valign="top">' + vals.level + '. level</td><td class="noBorder bgGray" valign="top"><ul><li><b>' + lang.js.capacity + '</b> ' + capacity + '</li><li><b>' + lang.js.prized + '</b> ' + l.format(lang.js.howMuchGold, {'gold': vals.fee}) + '</li><li><b>' + lang.js.constructionTime + '</b> ' + sec2date(vals.timer) + '</li></ul></td></tr>');
        });

        $.each(node_options.storage.getDepos.out, function (capacity, vals) {

          $("#F_levelAdminList").append('<option value="' + capacity + '"> ' + l.format(lang.js.howMuchLevel, {'level': vals.level}) + '</option>');
          $("#clan_edit_f_level").append('<option value="' + vals.level + '"> ' + l.format(lang.js.howMuchLevel, {'level': vals.level}) + '</option>');
          $("#f_levels").append('<tr><td class="noBorder bgGray" valign="top">' + vals.level + '. level</td><td class="noBorder bgGray" valign="top"><ul><li><b>' + lang.js.capacity + '</b> ' + capacity + '</li><li> <b>' + lang.js.prized + '</b>' + vals.fee + ' ' + lang.options.gold + '</li><li><b>' + lang.js.constructionTime + '</b> ' + sec2date(vals.timer) + '</li></ul></td></tr>');
        });

        if (myAccess == 3) {
          $settings_form.find("[name=animal]").val(node_options.newUserGifts.animal.id).attr("selected", true);
          $settings_form.find("[name=animal_unit]").val(node_options.newUserGifts.animal.sum);
          //$settings_form.find("[name=papara_merchant_id]").val(node_options.papara_merchant.merchant_id);
          $settings_form.find("[name=active]").prop('checked', node_options.newUserGifts.animal.active);
          $settings_form.find("[name=feed]").val(node_options.newUserGifts.feed);
          $settings_form.find("[name=gold]").val(node_options.newUserGifts.gold);
          $settings_form.find("[name=feed_capacity]").val(node_options.newUserGifts.capacity).attr("selected", true);
          $settings_form.find("[name=product_capacity]").val(node_options.newUserGifts.productCapacity).attr("selected", true);
          $settings_form.find("[name=stock]").val(node_options.storage.stock);
          $settings_form.find("[name=daily_money_limit]").val(node_options.daily_money_limit);
          $settings_form.find("[name=daily_money_limit_eft]").val(node_options.daily_money_limit_eft);
          $settings_form.find("[name=min_money_withdraw]").val(node_options.min_money_withdraw);
          $settings_form.find("[name=papara_percentage]").val(node_options.papara_percentage);
          $settings_form.find("[name=eft_commision]").val(node_options.eft_commision);
          $settings_form.find("[name=LOGIN_STATUS]").prop('checked', node_options.LOGIN_STATUS);
          $settings_form.find("[name=ref_status]").prop('checked', node_options.ref_status);
          $settings_form.find("[name=min_eft_request_limit]").val(node_options.min_eft_request_limit);
          $settings_form.find("[name=silver_ratio]").val(node_options.silver_ratio);
          $settings_form.find("[name=silver_active]").prop('checked', node_options.silver_active);
          $settings_form.find("[name=cargoPrize]").val(node_options.cargoPrize);
          $(".stocksNows").text($.number(node_options.storage.stock) + " TL");
          $.each(node_options.papara_merchant_depo, function (ndx, value) {
            $("#paparaAdminList").append('<option ' + (node_options.papara_merchant.merchant_id == value.merchant_id ? 'selected="selected"' : '') + ' value="' + value.merchant_id + '">' + value.merchant_label + '</option>');
          });
        }

        $("#tckn, #e_tckn").attr({
          "placeholder": l.format(lang.js.ID, {'govIdLenght': node_options.govermentIdLen}),
          "maxlength": node_options.govermentIdLen
        });
        break;
      case 'refDisabled':
        _refEnabled = data;
        if (!data) $(".ref_row").remove();
        break;
      case 'USERINFO':
        _USERINFO = data;
        myAccess = data.status.access;
        myRefCode = data.ref_code;
        userAndMyAnimals = {finance: data.finance};
        if (myAccess == 1) {
          $('.BAYI0R').addClass('kapali');
          $('div[class*=BAYI1R], #formKurumsalProfil').removeClass('gizle');
        }
        if (myAccess > 1) {
          $('.ticketPPAGE').removeClass('gizle');
          $('.ticketPAGE').addClass('gizle');
        }

        Tawk_API.visitor = {
          name: _USERINFO.name + " (" + _USERINFO.gsm.split(node_options.telNumberPref)[1] + ")",
          email: _USERINFO.email
        };
        $("[data-access]").addClass("gizle");
        $("[data-access=" + data.status.access + "]").removeClass("gizle");
        if (data.status.access == 3) $(".arama_admin").removeClass("gizle"); else $(".arama_admin").addClass("gizle");

        $(".user-img > img").attr("src", (data.img.length > 0 ? "img/users/" + data.img : 'img/png/farmer_' + data.gender + '.png'));
        $(".level_jump_area_message, .level_jump_area_message_f").addClass("gizle");
        $(".level_jump_area, .level_jump_area_f").removeClass("gizle");

        var User_P_Leveldata_Current = node_options.storage.getDepos._in[userAndMyAnimals.finance.storage.productCapacity],
          User_next_Key_Name = Object.keys(node_options.storage.getDepos._in)[User_P_Leveldata_Current.level],
          User_P_Leveldata_Next = node_options.storage.getDepos._in[User_next_Key_Name];

        var User_F_Leveldata_Current = node_options.storage.getDepos.out[userAndMyAnimals.finance.storage.capacity],
          User_next_Key_Name_f = Object.keys(node_options.storage.getDepos.out)[User_F_Leveldata_Current.level],
          User_F_Leveldata_Next = node_options.storage.getDepos.out[User_next_Key_Name_f];

        if (User_P_Leveldata_Next) {
          $(".p_next_level").html(User_P_Leveldata_Next.level);
          var CurrentTimeDefine_p = User_P_Leveldata_Current.timer;
          var leftTimeDynamic_p = (unixTime() - userAndMyAnimals.finance.storage.Plevel_updateDate);
          var timeDetected_p = (100 - (CurrentTimeDefine_p - leftTimeDynamic_p) / CurrentTimeDefine_p * 100);

          $(".p_level_time_left").css({'width': timeDetected_p + '%'}).html('<div class="inLineFlexed">' + sec2date(CurrentTimeDefine_p - leftTimeDynamic_p) + " " + lang.js.remainTime + "</div>");
          if (timeDetected_p >= 100) $(".p_level_time_left").css({'width': '100%'}).html('<div class="inLineFlexed"><i class="fa fa-flag-checkered"></i> ' + lang.js.getNewLevel + '</div>');
        } else {
          $(".level_jump_area_message").removeClass("gizle");
          $(".level_jump_area").addClass("gizle");
        }

        if (User_F_Leveldata_Next) {
          $(".f_next_level").html(User_F_Leveldata_Next.level);
          var currentTimeDefineF = User_F_Leveldata_Current.timer;
          var leftTimeDynamicF = (unixTime() - userAndMyAnimals.finance.storage.Flevel_updateDate);
          var timeDetected_f = (100 - (currentTimeDefineF - leftTimeDynamicF) / currentTimeDefineF * 100);
          $(".f_level_time_left").css({'width': timeDetected_f + '%'}).html('<div class="inLineFlexed">' + sec2date(currentTimeDefineF - leftTimeDynamicF) + " " + lang.js.remainTime + "</div>");
          if (timeDetected_f >= 100) $(".f_level_time_left").css({'width': '100%'}).html('<div class="inLineFlexed"><i class="fa fa-flag-checkered"></i> ' + lang.js.getNewLevel + '</div>');
        } else {
          $(".level_jump_area_message_f").removeClass("gizle");
          $(".level_jump_area_f").addClass("gizle");
        }

        $(".barinaklarDivTuketim").attr("data-original-title", lang.js.feedShelter + " <br>" + lang.js.capacity + " " + $.number(userAndMyAnimals.finance.storage.capacity) + "<br>Level: " + User_F_Leveldata_Current.level);
        $(".barinaklarDivUretim").attr("data-original-title", lang.js.productShelter + "<br>" + lang.js.capacity + " " + $.number(userAndMyAnimals.finance.storage.productCapacity) + "<br>Level: " + User_P_Leveldata_Current.level);

        $(".p_level_capacity").html($.number(userAndMyAnimals.finance.storage.productCapacity));
        $(".f_level_capacity").html($.number(userAndMyAnimals.finance.storage.capacity));

        $('.EXplainedTx1').html(l.format(lang.js.EXplainedTx1, {
          "number": userAndMyAnimals.finance.storage.capacity,
          "here": '<button class="btn btn-link" onclick="javascript:modalOpen(\'feedShelter\')"><i class=\'fa fa-eye\'></i></button>'
        }));


        $(".feedEmptyMsj, .productEmptyMsjFeed").removeClass("gizle");
        $productEmptyMsj.addClass("gizle");
        $leftFeedTime.addClass("gizle");
        $productText.html("Sat: " + $.number(userAndMyAnimals.finance.storage.product * node_options.storage.inPrize, 4) + " <i class='fa fa-try'></i>");
        $F_capacity.html($.number(userAndMyAnimals.finance.storage.capacity));
        $P_productCapacity.html($.number(userAndMyAnimals.finance.storage.productCapacity));

        if (userAndMyAnimals.finance.storage.feed > 0) {
          $(".feedEmptyMsj, .productEmptyMsjFeed").addClass("gizle");
          $leftFeedTime.removeClass("gizle");
        }

        leftFeedPercent = percents(userAndMyAnimals.finance.storage.feed, userAndMyAnimals.finance.storage.capacity);

        $yemMeter.html($.number(userAndMyAnimals.finance.storage.feed));
        $productMeter.html(Math.round(userAndMyAnimals.finance.storage.product));
        $money.html(number_format(data.finance.money, 2));
        $silver.html(number_format(data.finance.silver, 2));
        //$bluecircleEl.attr("data-percent", (leftFeedPercent));
        $('.GOLDINFO').html($.number(data.finance.gold, 2));
        $('.USERNAME').html(data.name);
        $('.designation').html(data.status.label);
        $('.balanced2').html($.number(data.finance.gold, 2));
        $('.user-name').html(data.name.split(' ')[0]);
        $('.leftFeedPercent').css({'width': leftFeedPercent + '%'});
        var tckn = data.identify.split('_')[0];
        // kurumsall bilgiler bayi
        $('.bayi_alani_ft').addClass("gizle");
        $('.user_alani_ft').removeClass("gizle");
        if (data.status.access === 1) {
          if (
            data.finance.bayi_data.merchant.name !== '' &&
            data.finance.bayi_data.merchant.address !== '' &&
            data.finance.bayi_data.merchant.phone !== '' &&
            data.finance.bayi_data.taxNumber !== '' &&
            data.finance.bayi_data.taxOffice !== ''
          ) bayiKurumsalBilgileriDolu = true;

          $('.bayi_alani_ft').removeClass("gizle");
          $('.user_alani_ft').addClass("gizle");
          $('#namedKurumsal').val(data.finance.bayi_data.merchant.name);
          $('#kurumsalAdres').val(data.finance.bayi_data.merchant.address);
          $('#kurumsalTelefon').val(data.finance.bayi_data.merchant.phone);
          $('#vergiDairesi').val(data.finance.bayi_data.taxOffice);
          $('#vergiNumarasi').val(data.finance.bayi_data.taxNumber);
          $('._alici_adi_bayi').text(data.finance.bayi_data.merchant.name);
          $('._alici_vergi_d').text(data.finance.bayi_data.taxOffice);
          $('._alici_vergi_n').text(data.finance.bayi_data.taxNumber);
          $('._alici_adres_bayi').text(data.finance.bayi_data.merchant.address);
          $('._alici_gsm_bayi').text(data.finance.bayi_data.merchant.phone);
          $('._alici_email_bayi').text(data.email);
        } else {
          $('._alici_adi').text(data.name);
          $('._alici_tc').text(tckn != '00' ? data.identify : '');
          $('._alici_adres').text(data.adress);
          $('._alici_gsm').text(data.gsm);
          $('._alici_email').text(data.email);
        }

        // resetInformation
        $('#named').val(NAV(data.name).name);
        $('#last_named').val(NAV(data.name).lastName);
        $('.papara_id').val(userAndMyAnimals.finance.bank_data.papara_id);
        //$('.my_ref_link').val(node_options.base+"/index.html?ref="+myRefCode);
        //$('.my_ref_code').text(myRefCode);
        $('.bank_owner').val(userAndMyAnimals.finance.bank_data.owner);
        $('.bank_iban').val(userAndMyAnimals.finance.bank_data.iban);
        $('.bank_name').val(userAndMyAnimals.finance.bank_data.name).attr("selected", "selected").prop("selected", true);
        var bDate = new Date(data.dates.birth);
        var dater = {
          'YY': (bDate.getFullYear()),
          "MM": (bDate.getMonth() + 1) < 10 ? '0' + (bDate.getMonth() + 1) : (bDate.getMonth() + 1),
          "DD": (bDate.getDate()) < 10 ? '0' + (bDate.getDate()) : bDate.getDate()
        };
        $('#tckn').val(tckn != '00' ? data.identify : '');
        $('#adressed').val(data.adress);
        $('#gender').val(data.gender).prop("selected", true);
        $('#birthed').val(dater.YY + '-' + dater.MM + '-' + dater.DD);
        $('#newEmail').val(data.email);
        $('#enterMobile').val(data.gsm.split(node_options.telNumberPref)[1]).attr({'maxlength': node_options.telNumberLen});
        $('.register_date').text(dateFullTR(new Date(data.dates.register)));
        $('.last_login_date').text(data.dates.last_login.length > 0 ? zamanBul(data.dates.last_login) : lang.js.never);
        $('.lastpass_change_date').text(data.status.lastPassChange.length > 0 ? zamanBul(data.status.lastPassChange) : lang.js.never);
        //CLAN SETTINGS
        clanBUTTON = _USERINFO.clan.clanId == '' ? '<a onClick="modalOpen(\'addClan\')" class="btn  btn-success"><span><i class="icon-circle-with-plus"></i> </span><span style="font-size:14px" class="C_NuOpen">' + lang.extra.C_NuOpen + '</span></a>' : '<a class="btn clanimAc btn-primary"><span><i class="fa fa-handshake-o"></i> </span><span style="font-size:14px" class="C_NuOpen">' + lang.extra.C_Login + '</span></a>';
        $('#C_CLAN_STATUS').html(clanBUTTON);
        //PREMIUM SETTINGS
        premiumCheck(_USERINFO.finance.premium);
        break;
      case 'DEBTSALL' :
        var D_Currency, paymentMethodology;
        if (data.length > 0) {
          $('.DEBTPRB').removeClass('gizle');
          $.each(data, function (index, value) {
            if (value.status == 1) {
              D_Currency = ' ' + lang.options.currency;
              paymentMethodology = lang.dashboard.dashboard_nowPaymentMoney;
            } else {
              D_Currency = ' ' + lang.options.gold;
              paymentMethodology = lang.dashboard.dashboard_nowPayment;
            }

            $('.DEBTPRB > .DBSTS').append('<div class="alert alert-danger  debt_' + value._id + '"><i class="fa fa-info-circle"></i> <span class="debtText">' + value.message + ' (' + value.fee + D_Currency + ' )</span> <button class="btn btn-warning dashboard_nowPayment" data-debtopts=\'{"debtId":"' + value._id + '","debtVal":"' + value.fee + '","status":"' + value.status + '"}\'  >' + paymentMethodology + '</button></div>');
          });
        }
        break;
      case 'animalBaazar':
        all_animal = data;
        $("#animalAdminList, #clan_edit_animal_id").html('<option value="">' + lang.js.chooseAnimal + '</option>');
        var loopIn = "", ribbon = '';
        if (data) {
          $.each(data, function (index, value) {
            var stck = stockRemain(node_options.storage.stock, value.finance.price);
            $("#animalAdminList, #clan_edit_animal_id").append('<option ' + (node_options.newUserGifts.animal.id == index ? 'selected="selected"' : '') + ' value="' + index + '">' + value.names.name + '</option>');
            ribbon = value.status.isNew ? ' <div class="ribbon"><span> ' + lang.js.nueAnimal + '</span></div>' :
              ribbon = value.status.isPromotion ? ' <div class="ribbon kirmiziRibon"><span>' + lang.js.advantageProcduct + '</span></div>' : '';
            loopIn += '<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">' +
              '<div class="panel  pazarPnl zoomla ">' + ribbon +
              '<div class="panel-heading">' +
              '<h4>' + value.names.name + '</h4>' +
              '</div>' +
              '<div class="panel-body cursor textCenter" onclick="' + (stck > 0 ? 'animalDetail' : 'giveOffer') + '(\'' + index + '\')" align="center">' +
              '<img src="img/_media/hayvanlar/s/' + value.img + '" class="img-responsive">' +
              '</div>' +
              '' + (stck > 0 ? '<a href="javascript:void(0)" onclick="animalDetail(\'' + index + '\')" class="info-tile hoverParla"><div class="tile-footer">' + lang.js.remainStock + ' : ' + number_format(stck) + ' ' + lang.options.count2 + ' </div></a>' : '<a href="javascript:void(0)" onclick="giveOffer(\'' + index + '\')" class="info-tile hoverParla"><div style="background: #715751; color:#d0a79e" class="tile-footer">' + lang.js.neMaye + ' <span class="pull-right offer_class btn btn-danger">' + lang.js.auction + '</span></div></a>') + '' +
              '</div>' +
              '</div>';
          });
        }
        $('.baazars').html(loopIn);
        break;
      case 'pushMessage' :
        switch (data.type) {
          case 'success' :
            alertify.success(data.msg);
            break;
          case 'info' :
            alertify.info(data.msg);
            break;
          case 'warn' :
            alertify.warn(data.msg);
            break;
          case 'error' :
            alertify.error(data.msg);
            break;
          case 'gold' :
            alertify.success(data.msg);
            s_gold.play();
            break;
          default :
            alertify.log(data.msg);
            break;
        }
        break;
      case 'clientPublish' :
        var ekBilgi = '<br><small style="float:right">' + data.name + ' <br> ' + data.label + '</small>';
        swal({
          title: lang.options.notice,
          background: '#fff url(//bit.ly/1Nqn9HU)',
          html: '"' + data.msg + '"' + ekBilgi,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: lang.options._OK,
          showCancelButton: false,
          animation: "slide-from-top"
        });
        break;
      case 'privatePublish' :
        var ekBilgi = '<br><small style="float:right">' + data.name + ' <br> ' + data.label + '</small>';
        swal({
          title: lang.js.privateMsg,
          background: '#fff url(//bit.ly/1Nqn9HU)',
          html: '"' + data.msg + '"' + ekBilgi,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: lang.options._OK,
          showCancelButton: false,
          animation: "slide-from-top"
        });
        break;
      case 'clientNotice' :
        if (typeof obj == 'object') {
          switch (obj.islem) {
            case "possibleResetOrders" :
              swal({
                title: data.topic,
                html: data.msg,
                type: data.status,
                cancelButtonText: "Bekle (Önerilir)",
                confirmButtonText: "<i class='fa fa-trash-o'></i>Önceki Siparişi Sil",
                showCancelButton: true
              }).then(function () {
                loading(true);
                socket.send("my_profil", {'event': 'delOrders2', 'data': _USERINFO._id}, function (vd) {
                  loading(false);
                  if (vd) {
                    alertify.success(l.format(lang.extra.deletedOrders, {'sum': vd}));
                  } else {
                    if (parseInt(vd) == 0) {
                      alertify.info(lang.extra.nodeletedOrders);
                    } else alertify.warn(vd);
                  }

                });
              });
              break;
            case "gsm_change_kod" :
              swal({
                title: data.topic,
                html: data.msg,
                type: data.status,
                input: 'number',
                inputAttributes: {
                  'max': 4,
                  'min': 4
                },
                confirmButtonColor: "#DD6B55",
                confirmButtonText: lang.options.ok,
                showCancelButton: true,
                animation: "slide-from-top",
                inputPlaceholder: lang.options.fourCharsCode,
                showLoaderOnConfirm: true,
                preConfirm: function (digitCode) {
                  return new Promise(function (resolve, reject) {
                    if (digitCode === "" || digitCode.length != 4) {
                      reject(lang.options.plsFill4);
                    } else {
                      setTimeout(function () {
                        resolve();
                      }, 1500);
                    }
                  });
                }
              }).then(function (digitCode) {
                $("#enterMobile").data("newcode", digitCode);
                $("#formGsm").submit();
              }).catch(swal.noop);
              break;
            case "feed_buy_offer" :
              swal({
                title: data.topic,
                html: data.msg,
                type: data.status,
                showCancelButton: true,
                cancelButtonText: lang.options._CLOSE,
                confirmButtonText: lang.js.buyFeed
              }).then(function () {
                modalOpen('FEED');
              }).catch(swal.noop);
              break;
            case "satinAlBTn" :
              swal({
                title: data.topic,
                html: data.msg,
                type: data.status,
                confirmButtonText: lang.options.menu_buyGold,
                showCancelButton: true,
                cancelButtonText: lang.options._CLOSE
              }).then(function () {
                goldBuy();
              }).catch(swal.noop);
              break;
            case "preOrder" :
              $('#remodal1').remodal().close();
              swal({
                title: data.topic,
                html: data.msg,
                type: data.status,
                cancelButtonText: lang.options._CLOSE
              });
              break;
            case "buyIt" :
              swal({
                title: data.topic,
                html: data.msg,
                type: data.status,
                showCancelButton: true,
                cancelButtonText: lang.options.cancel,
                confirmButtonText: lang.options.letBuy
              }).then(function () {
                $('#remodal1').remodal().close();
                window.socket.send('buyIt', {'sum': obj.buy.sum, 'id': obj.buy.id});

              }).catch(swal.noop);
              break;
            case "buyItFeed" :
              swal({
                title: data.topic,
                html: data.msg,
                type: data.status,
                showCancelButton: true,
                cancelButtonText: lang.options.cancel,
                confirmButtonText: lang.options.letBuy
              }).then(function () {
                $('#remodal1').remodal().close();
                window.socket.send('buyItFeed', obj.buy.totalFeedSaf);
              }).catch(swal.noop);
              break;
            case 'P_levelJump_accept':
              swal({
                title: data.topic,
                html: data.msg,
                type: data.status,
                showCancelButton: true,
                cancelButtonText: lang.options.wait,
                confirmButtonText: lang.options.letBuy
              }).then(function () {
                modalClose('#remodal1');
                $(".P_levelJump").data("proc", "1").click();
              }).catch(swal.noop);
              break;
            case 'F_levelJump_accept':
              swal({
                title: data.topic,
                html: data.msg,
                type: data.status,
                showCancelButton: true,
                cancelButtonText: lang.options.wait,
                confirmButtonText: lang.options.letBuy
              }).then(function () {
                modalClose('#remodal1');
                $(".F_levelJump").data("proc", "1").click();
              }).catch(swal.noop);
              break;
            case 'P_levelJump_proc_reset':
              $(".P_levelJump").data("proc", "0");
              break;
            case 'F_levelJump_proc_reset':
              $(".F_levelJump").data("proc", "0");
              break;
            case 'animalSold' :
              soundrequest(obj.group);
              swal({
                title: data.topic,
                html: data.msg,
                type: data.status
              });
              break;
          }
        } else {
          //standart message
          swal({
            title: data.topic,
            html: data.msg,
            type: data.status
          });
        }
        break;
      case 'animalDetail':
        $('#remodal1').remodal().open();
        $('._animalOfftime').text(l.format(lang.js.remainDay, {'day': data.finance.lifeTimeLimit}));
        $('._animalGroupName').text(data.names.groupName);
        $('._animalSrc').attr('src', 'img/_media/hayvanlar/s/' + data.img);
        $('.ANIMALBUY').attr("data-animalID", data.id);
        $('.GOLDEN_PROFILE').addClass('kapali');
        $('.A_PROFILE').removeClass('kapali');
        var data1 = {
          "saatlikUretim": data.finance.hourlyProduction,
          "yasamDongusu": data.finance.lifeTimeLimit,
          "ratio": node_options.storage.inPrize,
          "fiyat": data.finance.price,
          "saatlikTuketimi": data.finance.hourlyFeeding,
          "fx": stockRemain(node_options.storage.stock, data.finance.price)
        };

        $(".adetInputi").val(1).attr('max', data1.fx).data("alldata", data1).trigger("input");
        hesapla(1, data1.saatlikUretim, data1.yasamDongusu, data1.ratio, data1.fiyat, data1.saatlikTuketimi, data1.fx);
        break;
      case 'banksList':
        _BANKS = data;
        $.each(data, function (index, value) {
          if (index != "588a4294235e6423c123c1ef" && value.status == 1) {
            $('.bankBanks').append('<address><strong>' + lang.js.accountOwner + '</strong> : ' + value.owner + '<br><strong>IBAN </strong>: ' + lang.js.preOrder + '<br><strong>' + lang.js.accountNumber + ' </strong>' + lang.js.preOrder + '<br><strong>' + lang.js.branch + ' </strong> : ' + value.branch + '</address><hr class="cizgicek" />');
            $('#bankId').append('<option value="' + index + '">' + value.bankName + '</option>');
          }
        });
        break;
      case 'myAnimals':
        secFeeding = 0;
        secProduction = 0;
        my_animals_varible = data;
        if (Object.keys(data).length > 0) {
          $bg.text("0");
          hayvans = [];
          $.each(data, function (index, value) {
            secFeeding += (value.sum * (value.animalData.finance.hourlyFeeding) / 60 / 60); //saniyelik tüketim
            secProduction += (value.sum * (value.animalData.finance.hourlyProduction) / 60 / 60); //saniyelik üretim
            $brnkEl = $(".barinaklarDiv[title=" + value.animalData.shelter.name + "]");
            $brnkBadge = $brnkEl.find($bg);
            if (!hayvans[value.animalData.shelter.name]) hayvans[value.animalData.shelter.name] = 0;
            hayvans[value.animalData.shelter.name] += parseInt(value.sum);
            $brnkBadge.removeClass("kapali").text(hayvans[value.animalData.shelter.name]);
            $brnkEl.find(".barinaklarImg").removeClass("cokSaydam").attr({
              "data-original-title": value.animalData.shelter.name + " (" + $brnkBadge.text() + ")",
              "shelterId": ""
            }).addClass('haveSomeAnimals');
          });
          startTime({
            "out": {
              "feed": userAndMyAnimals.finance.storage.feed,
              "secFeeding": secFeeding,
              "capacity": userAndMyAnimals.finance.storage.capacity
            }
          });
          if (userAndMyAnimals.finance.storage.feed > 0) startTimeProduction({
            "in": {
              "product": userAndMyAnimals.finance.storage.product,
              "secProduction": secProduction,
              "capacity": userAndMyAnimals.finance.storage.productCapacity
            }
          });
        }
        break;
      case 'actionSend':
        var cntNotify = 0;
        $("#actions_header_list").html("");
        var $cntBadge = $actions_header_btn.find("span.count");
        $cntBadge.addClass("gizle").text("");
        $actions_header_btn.attr("title", "0");
        if (Object.keys(data).length > 0) {
          $.each(data, function (index, value) {
            cntNotify++;
            if (value.is_read == true) {
              cntNotify--;
              $("#actions_header_list").append('<li style="opacity: 0.6"><div class="icon"><img src="img/png/' + value.icon + '"></div><div class="details"><strong class="text-red">' + value.title + '</strong><span>' + value.message.substr(0, 50) + '...</span></div></li>');
            } else {
              $actions_header_btn.attr("title", "" + cntNotify + "");
              $cntBadge.removeClass("gizle").text(cntNotify);
              $("#actions_header_list").append('<li><div class="icon"><img src="img/png/' + value.icon + '"></div><div class="details"><strong class="text-red">' + value.title + '</strong><span>' + value.message + '</span></div></li>');
            }
            //if(cntNotify++ >= 20) return false;
          });
        }
        break;
      case 'store' :
        loading(false);
        var items = '', btns;
        if (data.data.length > 0) {

          $.each(data.data, function (index, swf) {

            btns = '<button  class="pull-right btn btn-success btn-xs marginRL10" onclick="basketSave(\'' + swf._id + '\',\'' + swf.fee + '\')"><i class="fa fa-plus "></i> ' + lang.extra.addBasket + '</button>';

            items += '<div class="col-md-4"> <div class="panel users-wrapper red"> <div class="users-info clearfix"> <img src="img/_media/products/' + swf.img + '" class="pull-left padding5px"> <div class="users-detail"><h5>' + swf.name + '</h5> <p><span class="feePriceList_' + swf._id + '">' + swf.fee + '</span> ' + lang.extra.silver + '</p><p>' +
              '<div class="form-group no-margin">' + btns + '<input type="number" min="1" max="9999" id="PRICEDSUM" data-store_price="' + swf.fee + '" data-stored_id="' + swf._id + '" class="form-control w65 h25 pull-right summed_' + swf._id + '" value="1"  /></div></p></div></div></div></div>';
          });

          $('.LIVESTORE').html(items);
        } else {
          $('.LIVESTORE').html('<div class="alert alert-info"><i class="fa fa-info-circle"></i> Şarküteri bölümü kısa bir süre devre dışıdır.</div>');
        }
        $('.myBasket').html(data.basket);
        break;
      case 'awatingStoreOrders' :
        var OBJORDER = {};
        OBJORDER['data'] = {};
        OBJORDER['est'] = {};
        var tbls = '<div class="table-responsive"><table class="table table-striped no-margin"><thead><tr><th>#</th><th>Ürün Adı</th><th>Fiyat</th><th>İptal</th></tr></thead><tbody>';
        if (data.data.length > 0) {
          var i = 0, totalFees = 0, totalSum = 0;
          tumUrunlerKorgolanabilir = true;
          $.each(data.data, function (index, swf) {
            if (!swf.is_cargo) tumUrunlerKorgolanabilir = false;
            i++;
            OBJORDER['data'][i] = {'pName': swf.pName, 'fee': swf.fee, 'sum': swf.sum, 'isCargo': swf.is_cargo};

            totalFees += swf.fee;
            totalSum += swf.sum;
            tbls += '<tr><td>' + i + '</td><td>' + swf.pName + (swf.is_cargo ? '' : ' <sup class="text-red">kargolanamaz</sup>') + '</td><td>' + swf.fee + ' ' + lang.extra.silver + ' (' + swf.sum + ' adet)</td><td><button data-cancelStoreOrder="' + swf._id + '" class="btn btn-danger btn-xs"><i class="fa fa-times"></i></button></td></tr>';
          });
          OBJORDER['est'] = {'totalFee': totalFees, "totalSum": totalSum, "le": i};
          tbls += '</tbody></table></div>';
          $('#awaitingOrders').html(tbls + '<tr><td colspan="5"><hr /></td></tr><tr><td colspan="5"><button id=\'storeBasketApprov\' data-approv_order=\'' + JSON.stringify(OBJORDER) + '\'  class="btn btn-success pull-right"><i class="fa fa-check-square-o"></i> Sipariş Ver</button></td></tr>');
          loading(false);
        } else {
          $('#awaitingOrders').html('<div class="alert alert-warning"><i class="fa fa-info-circle"></i> Sepetiniz Boş</div>');
          loading(false);
        }
        break;
      case 'ticket' :
        switch (data.islemId) {
          case 'droppedItem' :
            //console.log(data);
            // console.log("[data-item_id='"+data.ticketId+"']");
            console.log(data.ticketId);
            $('.bn_' + data.ticketId).html("");
            if (data.target == 'opened') {
              $("[data-item_id='" + data.ticketId + "']").fadeOut();
              $('.bn_' + data.ticketId).html('<span class="label label-warning cursor"><i class="fa fa-envelope text-white"></i>  Mesaj Yaz</span>');

            } else {
              $("[data-item_id='" + data.ticketId + "']").fadeIn();
              $("#" + data.target).append($("[data-item_id='" + data.ticketId + "']"));
              if (data.target != 'completed') {
                $('.bn_' + data.ticketId).html('<span class="label label-info cursor"><i class="fa fa-exchange text-white"></i>  Transfer</span>');
              } else {
                $('.bn_' + data.ticketId).html('<span class="label label-success cursor"><i class="fa fa-envelope text-white"></i>  İncele</span>');
              }
            }
            break;
        }
        break;

    }
  });

  $(document).on('click', '[data-proc_ticket]', function () {
    var $th = $(this).data('proc_ticket');

    window.socket.send('ticketDestek', {'event': 'getAdmins'}, function (rs) {
      var IPNS = {};
      $.each(rs, function (index, value) {
        IPNS[value._id] = value.name;
      });
      swal({
        title: 'Aktarılacak Personel',
        input: 'select',
        inputOptions: IPNS,
        inputPlaceholder: 'Personel Seçin',
        showCancelButton: true,
        inputValidator: function (value) {
          return new Promise(function (resolve, reject) {
            if (value.length > 0) {
              resolve();
            } else {
              reject('Lütfen Bir Seçin Yapın');
            }
          })
        }
      }).then(function (result) {
        window.socket.send('ticketDestek', {
          'event': 'ticketTransfer',
          'targetId': result,
          'ticketId': $th.ticketId
        }, function (rs) {
          if (typeof rs != false) {
            alertify.success("Ticket Başarıyla Transfer Edildi");
          } else alertify.error("Transfer Hatası : " + rs.stringify());
        });
      });
    });

  });
  $(document).on('click', '.clanimAc', function () {
    whereClan = 'self';
    loadContent('clan');
  });

  $(document).on('click', '#buyPremium', function () {
    swal({
      title: 'Emin Misiniz?',
      html: "+30 günlük Premium Üyeliği aktif etmek istediğinize emin misiniz? <br> " +
      " Premium sayesinde sıra beklemeden 7/24 oyuna erişim olanağına sahip olacaksınız <br /><br />" +
      "<center>Silver Premium : <span style='color:gold'>199 Altın/Ay</span></center> ",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, Aktif Et',
      cancelButtonText: 'Vazgeç',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn',
      buttonsStyling: true,
      showLoaderOnConfirm: true,
      preConfirm: function (silverVal) {
        return new Promise(function (resolve, reject) {
          window.socket.send('premium', {'event': 'buy', 'packId': 1}, function (rs) {

            if (rs === true) {
              resolve();
            } else {
              reject('Uyarı : ' + rs);
            }
          });
        })
      },
    }).then(function () {
      swal(
        'Başarılı!',
        'Hesabınıza +30 günlük  premium tanınlanmıştır',
        'success'
      )
    });
  });

  $(document).on('click', '#storeSave', function () {
    loading(true);
    $('#remodal2').remodal().close();
    window.socket.send("store", {
      'event': 'buyBasket',
      'data': {
        'name': $('#store_from_name').val(),
        'phone': $('#store_from_phone').val(),
        'cargo': $('#store_from_cargo').val(),
        'note': $('#store_from_note').val(),
        handJob: window.kargomu
      }
    }, function (rs) {
      loading(false);
      if (rs == '1') {
        $(document).find('[href*=awaitingBasketOrders]').click();
        alertify.success("İşleminiz Başarılı Ürünler Satın Alındı");
      }

    });
  });
  $(document).on('click', '#storeBasketApprov', function () {
    var Dty = $(this).data().approv_order;
    swal({
      title: '<i>Sipariş Teslimat</i>',
      type: 'info',
      html:
      'Çiftlik Bank ürünlerini dilerseniz kapıdan, dilerseniz şarküteriden bizzat teslim alabilirsiniz. <br><br>' +
      '<h4>Teslimat Nasıl Yapılsın?</h4>' +
      '<input class="" selected="selected" id="krg_secim" type="radio" name="secimOrd" onClick="$(\'.sarks\').addClass(\'gizle\')" value="cargo"/> Kargo ile Adresime Gönderilsin<br>' +
      '<input id="handjop_secim" type="radio" name="secimOrd" onclick="bayiGetir()" value="manuel"/> Şarküteriden Bizzat Alacağım <br>' +
      '<div class="sarks gizle"><br>' +
      '<select name="sarktulers" id="sarktulers">' +
      '</select>' +
      '</div>',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: '<i class="fa fa-arrow-right" aria-hidden="true"></i> Devam Et',
      preConfirm: function () {
        return new Promise(function (resolve, rj) {
          if ($('#sarktulers').val() === '0' && $('#handjop_secim').is(':checked')) rj("Lütfen ürünleri elden teslim alacağınız şarküteriyi seçiniz");
          else if (!tumUrunlerKorgolanabilir && $('#krg_secim').is(':checked')) rj("Sepetinizde kargolanmaya müsait olmayan ürünler var");
          else if ($("#handjop_secim").is(":not(:checked)") && $("#krg_secim").is(":not(:checked)")) rj("Teslimat yöntemini seçiniz");
          else {
            resolve();
            modalOpen('buyItem', {datalar: Dty, sarktulers: $('#sarktulers').val()});
          }
        })
      },
      cancelButtonText: 'Vazgeç'
    });
  });
  $(document).on('click', '#IOCALC', function () {
    window.socket.send('admin', {
      'event': 'IOCALC',
      userId: $(this).data().user_id,
      'product': $(this).data().product,
      'feed': $(this).data().feed
    }, function (rs) {
      if (typeof rs == 'object') {
        $('.fppes_' + $(this).data().user_id).html(rs.product + "|" + rs.feed);
        alertify.info(rs.product + "|" + rs.feed + " olarak güncellendi");
      } else {
        alertify.success(rs);
      }
    });
  });
  $(document).on('keyup mouseup', '#PRICEDSUM', function () {
    var lasTtptal = parseInt($(this).val()) * $(this).data().store_price;
    $('.feePriceList_' + $(this).data().stored_id).html(lasTtptal);
  });

  $(document).on('click', '[data-cancelStoreOrder]', function () {
    if (confirm("Siparişi iptal etmek istediğinize emin misiniz? Sipariş ücreti " + lang.extra.silver + " olarak hesabınıza iade edilir")) {
      window.socket.send('store', {'event': 'removeBasket', 'orderId': $(this).data().cancelstoreorder}, function () {
        $('a[href*=awaitingOrders]').click();
      });
    }
    ;
  });

  $(document).on('click', '[data-cancelStoreOrder2]', function () {
    if (confirm("Siparişi iptal etmek istediğinize emin misiniz? Sipariş ücreti " + lang.extra.silver + " olarak hesabınıza iade edilir")) {
      window.socket.send('store', {'event': 'cancelOrder', 'orderId': $(this).data().cancelstoreorder}, function () {
        $('a[href*=awaitingOrders]').click();
      });
    }
    ;
  });
  $(document).on('click', '.buySilver', function () {
    swal({
      title: 'Gümüş Satın Alma Ekranı',
      text: 'Ek gümüş satın alabilirsiniz. (1 Altın = 1 Gümüş)',
      input: 'number',
      inputPlaceholder: "Gümüş",
      inputValue: 20,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      confirmButtonText: "Satın Al",
      cancelButtonText: "Vazgeç",
      preConfirm: function (silverVal) {
        return new Promise(function (resolve, reject) {
          window.socket.send('silver', {'event': 'buy', 'value': silverVal}, function (rs) {
            console.log(rs);
            if (rs == 1) {
              resolve();
            } else {
              reject('Uyarı : ' + rs);
            }
          });
        })
      },
      allowOutsideClick: false
    });
  });
  $('a[href*=complatedOrder]').click(function () {
    loading(true);
    $('.complatedOrder').html("");
    window.socket.send('store', {'event': 'finishOrderas'}, function (fne) {

      if (fne.length > 0) {
        $.each(fne, function (index, value) {
          var prOm = '<ul>', btnSpe = '';


          switch (value.order.status) {
            case 0 :
              btnSpe = '<button class="btn btn-xs btn-danger"><i class=" font12px fa fa-clock-o"></i>  Bekliyor</button>';
              break;
            case 1 :
              btnSpe = '<button class="btn btn-xs btn-info"><i class=" fa fa-refresh fa-spin fa-3x fa-fw"></i>  **Hazırlanıyor</button>';
              break;
            case 2 :
              btnSpe = value.order.cargoCor + ' <br>' + value.order.followNumber + ' kargoda';
              break;
            case 3 :
              btnSpe = 'Teslim Edildi';
              break;
            case 4 :
              btnSpe = 'İptal Edildi';
              break;
          }
          if (Object.keys(JSON.parse(value.products.basket)).length > 0) {
            $.each(JSON.parse(value.products.basket), function (elem, valem) {
              prOm += ' <li class="text-dark-blue   font12px">- ' + valem.name + " " + valem.fee + ' ' + lang.extra.silver + ' (' + valem.sum + ' adet)</li>';
            });
          }
          prOm += '</ul>';
          $('.complatedOrder').append('<tr><td>' + zamanBul(value.order.date) + '<br> <small class="text-red">#' + value.order.date + '</small></td><td>' + prOm + '</td><td>' + value.products.fee + ' ' + lang.extra.silver + ' (' + value.products.sum + ' adet)</td><td><span>' + value.reciver.cargo + '</span></td><td>' + value.reciver.name + ' (' + value.reciver.gsm + ')</td><td>' + btnSpe + '</td></tr>');

        });
      } else {
        $('.complatedOrder').html('<tr><td colspan="6"><div class="alert alert-warning"><i class="fa fa-info-circle"></i> Önceki siparişiniz kayıtlarınız bulunmamaktadır</div></td></tr>');
      }
      loading(false);
    });
  });
  $('a[href*=B_complatedOrder]').click(function () {
    loading(true);
    $('.B_complatedOrder').html("");
    window.socket.send('bayi', {'event': 'finishOrderas3'}, function (fne) {

      if (fne.length > 0) {
        $.each(fne, function (index, value) {
          var prOm = '<ul>', btnSpe = '';
          switch (value.order.status) {
            case 3 :
              btnSpe = 'Teslim Edildi';
              break;
            case 4 :
              btnSpe = 'İptal Edildi';
              break;
          }
          if (Object.keys(JSON.parse(value.products.basket)).length > 0) {
            $.each(JSON.parse(value.products.basket), function (elem, valem) {
              prOm += ' <li class="text-dark-blue   font12px">- ' + valem.name + " " + valem.fee + ' ' + lang.extra.silver + ' (' + valem.sum + ' adet)</li>';
            });
          }
          prOm += '</ul>';
          $('.B_complatedOrder').append('<tr><td>' + zamanBul(value.order.date) + '<br> <small class="text-red">#' + value.order.date + '</small></td><td>' + prOm + '</td><td>' + value.products.fee + ' ' + lang.extra.silver + ' (' + value.products.sum + ' adet)</td><td><span>' + value.reciver.cargo + '</span></td><td>' + value.reciver.name + ' (' + value.reciver.gsm + ')</td><td>' + btnSpe + '</td></tr>');

        });
      } else {
        $('.B_complatedOrder').html('<tr><td colspan="6"><div class="alert alert-warning"><i class="fa fa-info-circle"></i> Önceki siparişiniz kayıtlarınız bulunmamaktadır</div></td></tr>');
      }
      loading(false);
    });
  });

  $(document).on('click', '.clandanAt', function () {
    var thisi = $(this);
    if (confirm('Kişiyi klandan attığınızda, sizin klanınız dahil bir başka klana ancak 2 günm sonra girebilir. Emin misiniz?')) {
      loading(true);
      window.socket.send('clan', {event: 'kickUser', userId: thisi.attr('title')}, function (rs) {
        loading(false);
        if (rs == 'ok') {
          modalClose("#remodal2");
          whereClan = 'self';
          loadContent('clan');
          alertify.success("Kişi kllandan atıldı");
        } else swal('Mesaj!', rs);
      });
    }
  });

  $(document).on('click', '.removeClan', function () {
    var userPass = prompt('Lütfen aktif şifrenizi giriniz', 'Şifreniz...');
    if (userPass && userPass.length > 3) {
      loading(true);
      window.socket.send('clan', {event: 'removeClan', userPass: userPass}, function (rs) {
        loading(false);
        if (rs == 'ok') window.location.reload();
        else swal('Mesaj!', rs);
      });
    }
  });

  $(document).on('click', '#clanSave', function () {
    var sendObj = {
      desc: $.trim($("#clan_edit_desc").val()),
      animal_id: $.trim($("#clan_edit_animal_id").val()),
      animal_min: $.trim($("#clan_edit_animal_min").val()),
      gold: $.trim($("#clan_edit_gold").val()),
      p_level: $.trim($("#clan_edit_p_level").val()),
      f_level: $.trim($("#clan_edit_f_level").val()),
      gender: $.trim($("#clan_edit_gender").val()),
      active: document.getElementById('clan_edit_rules_active').checked
    };

    if (sendObj.animal_min > 0 && !all_animal[sendObj.animal_id]) {
      swal('Hata', 'Belirttiğiniz hayvan listede yok');
    } else if (sendObj.gold > 0 && sendObj.gold < 20) {
      swal('Hata', 'Altın hibesi en az 20 olabilir. (bu kuralı uygulamak istemiyorsanız 0 yazabilirsiniz)');
    } else if (sendObj.desc.length > 0 && sendObj.desc.length > 50) {
      swal('Hata', 'Açıklama en fazla 50 karakter olabilir');
    } else {
      loading(true);
      window.socket.send('clan', {event: 'edit', obj: sendObj}, function (rs) {
        loading(false);
        if (rs == 'ok') {
          modalClose("#remodal2");
          loadContent('clan');
          alertify.success("Güncelleme başarılı");
        } else swal('Mesaj!', rs);
      });
    }
  });

  $(document).on('click', '[data-clan_admin]', function () {
    var thisi = $(this);
    modalOpen('clanRoot', thisi.data('clan_admin'));
  });

  $(document).on('click', '[data-leave_clan]', function () {
    var thisi = $(this);
    if (confirm('Bu klandan ayrılmak istediğinize emin misiniz?')) {
      loading(true);
      window.socket.send('clan', {event: 'leave', clanId: thisi.data('leave_clan').clanId}, function (rs) {
        loading(false);
        if (rs == 'ok') {
          loadContent('clan');
          alertify.success("Klandan ayrıldınız");
        } else swal('Mesaj!', rs);
      });
    }
  });

  $(document).on('click', '[data-join_clan]', function () {
    var TH = $(this),
      rulesJoin = TH.data('join_clan').onJoin,
      rulMsg = '';
    if (rulesJoin.gold.min > 0) rulMsg += "<li>" + $.number(rulesJoin.gold.min) + " Altın katılım ücreti <sup>(klana +" + $.number(rulesJoin.gold.min * 10) + " puan olarak aktarılır)</sup></li>";
    if (rulesJoin.deposCapacity.feed.min > 0) rulMsg += "<li>" + rulesJoin.deposCapacity.feed.min + ". level veya üzeri yem deposu olmalı</li>";
    if (rulesJoin.deposCapacity.product.min > 0) rulMsg += "<li>" + rulesJoin.deposCapacity.product.min + ". level veya üzeri üretim deposuna sahip olmalı</li>";
    if (rulesJoin.gender != 'x') rulMsg += "<li>Klana sadece  " + rulesJoin.gender.replace("m", "Erkekler").replace("f", "Kadınlar") + " katılabilir</li>";
    if (rulesJoin.animal.min > 0) rulMsg += "<li>Son 1 saat içerisinde " + all_animal[rulesJoin.animal.id].names.name + " isimli hayvandan en az " + rulesJoin.animal.min + " adet satın almış olmanız gerekli</li>";

    swal({
      title: TH.data('join_clan').clanName.capitalize(),
      html: !TH.data('join_clan').onJoin.active ?
        "Klana katılmak istediğinize emin misiniz? <br> <ul><li style='color:darkgreen'><small>**Bu klan, katılım için özel bir şart istememektedir.</small></li></ul>" :
        "Klana katılmak için aşağıdaki şartları yerine getirmeniz gerekmektedir  <br><ul> <hr class='cizgicek'>" + rulMsg + "</ul>",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: lang.options._CLOSE,
      confirmButtonText: !TH.data('join_clan').onJoin.active ? 'Katıl' : '<i class="fa fa-check-circle"></i> Klana Katıl'
    }).then(function () {
      loading(true);
      window.socket.send('clan', {event: 'join', clanId: TH.data('join_clan').clanId}, function (rs) {
        console.log(rs);
        loading(false);
        if (rs == 'ok') {
          loadContent('clan');
          alertify.success("Katılım sağlandı");
        } else if (typeof rs === 'string') {

          swal({
            title: TH.data('join_clan').clanName.capitalize() + " Katılım Şartları",
            html: rs,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: lang.options._OK,
            type: "error",
            showCancelButton: false,
            animation: "slide-from-top"
          });
        } else {
          var filters = '';
          $.each(rs, function (index, value) {
            filters += "<small style='color:darkred'><i class='icon-triangle-right'></i>" + value + "</small><br /> ";
          });

          swal({
            title: TH.data('join_clan').clanName.capitalize() + " Katılım Şartları",
            html: "Klana katılmak için aşağıdaki şartları yerine getirmelisiniz <hr class='cizgicek'>" + filters,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: lang.options._OK,
            type: "error",
            showCancelButton: false,
            animation: "slide-from-top"

          });
        }

      });
    }).catch(swal.noop);


  });

  $('a[href*=awaitingBasketOrders]').click(function () {
    loading(true);
    window.socket.send('store', {'event': 'basketedOrders'}, function (fne) {
      $('.awaitingBasketOrders').html("");
      if (fne.length > 0) {
        var bayiInf = '';
        $.each(fne, function (index, value) {
          var prOm = '<ul>', btnSpe = '';
          bayiInf = value.order.bayi.name ? value.order.bayi.name + ' (' + value.order.bayi.tel + ')' : '-';
          switch (value.order.status) {
            case 0 :
              btnSpe = '<button class="btn btn-xs btn-danger"><i class=" font12px fa fa-clock-o"></i>  Bekliyor</button>';
              break;
            case 1 :
              btnSpe = '<button class="btn btn-xs btn-info">**Hazırlanıyor</button>';
              break;
            case 2 :
              btnSpe = value.order.handJob === null ? value.order.cargoCor + ' <br>' + value.order.followNumber : 'Siparişiniz Hazır';
              break;
            case 3 :
              btnSpe = 'Teslim Edildi';
              break;
            case 4 :
              btnSpe = 'İptal Edildi';
              break;
          }
          if (Object.keys(JSON.parse(value.products.basket)).length > 0) {
            $.each(JSON.parse(value.products.basket), function (elem, valem) {
              prOm += ' <li class="text-dark-blue   font12px">- ' + valem.name + " " + valem.fee + ' ' + lang.extra.silver + ' (' + valem.sum + ' adet)</li>';
            });
          }
          prOm += '</ul>';
          $('.awaitingBasketOrders').append('<tr><td>' + zamanBul(value.order.date) + ' <br> <small class="text-red center-text">#' + value.order.date + '</small></td><td>' + prOm + '</td><td>' + value.products.fee + ' ' + lang.extra.silver + ' (' + value.products.sum + ' adet)</td><td><span>' + value.reciver.cargo + '</span></td><td><center>' + bayiInf + '</center></td><td>' + btnSpe + '</td></tr>');

        });
      } else {
        $('.awaitingBasketOrders').html('<tr><td colspan="6"><div class="alert alert-warning"><i class="fa fa-info-circle"></i> Bekleyen siparişiniz bulunmamaktadır</div></td></tr>');
      }
      loading(false);
    });
  });
  $('a[href*=awaitingOrders]').click(function () {
    loading(true);
    window.socket.send('store', {'event': 'awatingList'}, function (fne) {
      $('#awaitingOrders').html(fne);
      loading(false);
    });
  });
  $(document).on('click', 'a[href*=B_ORDERLIST]', function () {
    bayiStoreOrder(0);
  });
  $(document).on('click', 'a[href*=B_ORDERLISTSHOP]', function () {
    bayiStoreOrderSelf(0);
  });

  $(document).on('click', '#bayi_uslen_store', function () {
    loading(true);
    console.log($(this).data().isCargo);
    window.socket.send("bayi", {
      'event': 'storeUstlen',
      'orderId': $(this).data().order_id,
      'isCargo': $(this).data().isCargo,
      'alici_gsm': $(this).data().alici_gsm
    }, function (res) {
      alertify.info(res);
      loading(false);
      $('a[href*=B_ORDERLIST]').click();
    });
  });

  $(document).on('click', 'a[href*=B_ustlenmeler]', function () {
    loading(true);
    $('.B_ustlenmeler').html("");
    window.socket.send("bayi", {'event': 'storeUstlendi'}, function (res) {
      if (res.length > 0) {
        $.each(res, function (index, value) {
          var prOm = '<ul>', btnSpe = '',
            handLI = value.order.handJob === null ? "Kargoya Verildi" : "Siparişiniz Hazır";

          switch (value.order.status) {
            case 0 :
              btnSpe = '<i class=" font12px fa fa-clock-o"></i>  Bekliyor';
              break;
            case 1 :
              btnSpe = '**Hazırlanıyor';
              break;
            case 2 :
              btnSpe = value.order.handJob === null ? value.order.cargoCor + ' <br>' + value.order.followNumber : 'Siparişiniz Hazır';
              break;
            case 3 :
              btnSpe = 'Teslim Edildi';
              break;
            case 4 :
              btnSpe = 'İptal Edildi';
              break;
          }

          if (Object.keys(JSON.parse(value.products.basket)).length > 0) {
            $.each(JSON.parse(value.products.basket), function (elem, valem) {
              prOm += ' <li class="font12px" style="color:rgba(38, 185, 154, 0.75)">- ' + valem.name + " " + valem.fee + ' altın (' + valem.sum + ' adet)</li>';
            });
          }
          prOm += '</ul>';
          var O0bje = JSON.stringify({'ID': value._id, 'valuem': value.order.status});
          $('.B_ustlenmeler').append('<tr><td>' + zamanBul(value.order.date) + '<br> <small class="text-red">#' + value.order.date + '</small></td><td>' + prOm + '</td><td>' + value.products.fee + ' altın (' + value.products.sum + ' adet)</td><td><span>' + value.reciver.cargo + '</span></td><td>' + value.reciver.name + ' (' + value.reciver.gsm + ')</td><td><div class="dropdown psAbsolute"> <button class="btn btn-primary dropdown-toggle" type="button" role="menu"  data-toggle="dropdown"><span class="orderStatus">' + btnSpe + '</span><span class="caret"></span></button> <ul class="dropdown-menu dp_white" id="SYS0PT"> <li><a href="javascript:void(0)" title="1">Hazırlanıyor</a></li><li><a href="javascript:giveCargo(\'' + value._id + '\',\'' + value.order.status + '\',\'' + value.order.handJob + '\')" title="2" >' + handLI + '</a></li><li><a href="javascript:orderFinished(\'' + value._id + '\',\'' + value.order.status + '\')" title="3">Teslim Edildi</a><li><a href="javascript:alert(\'Devre dışı\')" title="4">İptal Edildi</a></li></ul></div></td></tr>');
          $('.opt0fOr_' + value._id).val(value.order.status).prop({'selected': 'selected'});
        });
      } else {

      }
      loading(false);
      // $('a[href*=B_awaitingOrders]').click();
    });
  });
  $(document).on('click', '[data-item_id]', function () {

  });
  /* $(document).find('#SYS0PT>li>a').on('click', function () {
       console.log("asdaxxsd");
       var T1 = parseInt($(this).attr('title'));
       var T2 =parseInt($(this).data('optval').valuem);
       var T3 =$(this).data('optval').ID;
       if( T1== parseInt(T2)+1 || T1 == 4 ){
            switch (T1){
               case 2 :

               break;
               case 3 :
                   //Teslim Edildi
                   alert("Teslim Edildi");
               break;
               case 4 :
                   //İptal Et
                   alert("İptal Et");
               break;
                default : alert(T1);
            }
       }else{
           alert("Bir sonraki aşamaya geç");
       }
   });*/

  /*
  $(document).on('click', '#storeSave', function () {
      loading(true);

      socket.send('store',{event: 'save', data:{store_num: $("#store_num").val(), store_from_name: $("#store_from_name").val(),store_from_phone: $("#store_from_phone").val(),store_from_cargo: $("#store_from_cargo").val(), store_from_note: $("#store_from_note").val(), fee : $(".feesSTOCK").val(),stockId :$(this).data('stock_id')
      }}, function (ans) {
          loading(false);
          alertify.info(ans);
      });
      modalClose("#remodal2");
  });
  */


  loadContent((typeof document.location.hash != 'undefined' && document.location.hash.substring(2)) ? document.location.hash.substring(2) : 'farm');
  dateSelectBox('_year');
  setTimeout(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/58bf3f935b89e2149e12aae9/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  }, 10000);

  $('#birthed').datepicker({dateFormat: 'yy-mm-dd'});

  $(document).on('click', '.admin_OrderCustom', function () {
    var ekBilgi = '<table width="100%" border="0"> <tr> <th align="center" valign="middle" scope="col"><strong>Tutar</strong></th> <th scope="col"><strong>:</strong></th> <th scope="col"><strong> <input type="text" name="fee"/> </strong></th> </tr><tr> <td align="center" valign="middle"><strong>Banka</strong></td><td align="center"><strong>:</strong></td><td align="center"><select style="width: 100%;"><option></option></select></td></tr></table>',
      bankObj;
    /* swal({
         title:  'Sipariş Oluştur  : '+$(this).data().username,
         background: '#fff url(//bit.ly/1Nqn9HU)',
         html: ekBilgi,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: lang.options._OK,
         showCancelButton: false,
         animation: "slide-from-top"
     });*/
    bankObj = '<option selected="selected" value="0">###Ödeme Yöntemi Seçiniz###</option>';
    $.each(_BANKS, function (index, value) {
      bankObj += '<option value="' + index + '">' + value.bankName + '</option>';
    });

    swal({
      title: 'Sipariş Oluştur',
      html: "<h4 style='text-shadow: none !important'>(" + $(this).data().username + ")</h4>" +
      '<select name="bankWanna" id="" class="swal2-select bankWanna">' +
      bankObj +
      '</select><br> <small>*Bu işlem muhasebeleştirilir.</small><br><input id="swal-input1" type="number" placeholder="Altın Miktari" class="swal2-input goldWanna" name="goldWanna"><input type="hidden" class="U93s" value="' + $(this).data().userid + '">' +
      '<br>' +
      'SMS Göndetextrilsin <input type="checkbox" class="smsWanna"   name="smsWanna" > <br>' +
      'Düzeltme Kaydı <input type="checkbox" class="reC0rd"   name="reC0rd" >',
      // inputOptions: bankObj,
      inputPlaceholder: 'Banka Seçin',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: function (value) {
        console.log(value);
        return new Promise(function (resolve, reject) {
          window.socket.send('admin', {
            'event': 'customSetOrder',
            'data': {
              'userId': $('.U93s').val(),
              'gold': $('.goldWanna').val(),
              'bankId': $('.bankWanna').val(),
              'sms': $('.smsWanna').is(':checked'),
              'upset': $('.reC0rd').is(':checked')
            }
          }, function (rs) {
            resolve();
          });
        })
      }
    }).then(function (result) {
      swalClose();
    })

  });

  $(document).on('click', '.cevaplar_harf_tane_tane', function () {
    $("#" + $(this).data("harf_id")).removeClass("gizle");
    $(this).remove();
  });

  $(document).on('click', '.hex_harfleri', function () {
    var $ts_i = $(this),
      data_f = $ts_i.data(),
      cvpSck = "";
    $ts_i.addClass('gizle');
    $('.cevap_harf_alanlari').append('<div data-harf_id="' + $ts_i.attr("id") + '" data-soruid="' + data_f.soruid + '" data-harf="' + data_f.harf + '" class="cevaplar_harf_tane_tane"><div class="hexagon cevapli"><span lang="tr" class="text">' + data_f.harf + '</span></div></div>');
    if (parseInt(data_f.cevap_len) === parseInt($(".cevaplar_harf_tane_tane").length)) {
      $.each($(".cevaplar_harf_tane_tane"), function (i, v) {
        cvpSck += $(v).data("harf");
      });
      loading(true);
      socket.send('my_profil', {
        event: 'anagram',
        data: {
          islem: 'cevap',
          no: aktifMasaNo,
          soruid: data_f.soruid,
          soruno: data_f.soruno,
          cevap: cvpSck
        }
      }, function (cb) {
        loading(false);
        if (typeof cb === 'boolean') {
          $('#soru_' + data_f.soruid + ', #cevap_' + data_f.soruid + ', .cevaplar_harf_tane_tane').remove();
          var cgrcripAnss,
            cgrSoruNo,
            elementSR,
            cgrSoruId;
          if ($('.sorular_tane_tane[data-soruno=' + parseInt(data_f.soruno + 1) + ']').length > 0) {
            cgrSoruNo = (data_f.soruno + 1);
            elementSR = $('.sorular_tane_tane[data-soruno=' + cgrSoruNo + ']');
            cgrcripAnss = elementSR.data("cvpcrp");
            cgrSoruId = elementSR.data("soruid");
            elementSR.removeClass("gizle");
            $('.cevaplar_tane_tane[data-soruno=' + cgrSoruNo + ']').removeClass("gizle");
            $('.cevaplar_tane_tane[data-soruno=' + cgrSoruNo + ']').find(".hex_harfleri").removeClass("gizle");
          } else if ($(".sorular_tane_tane").length > 0) {
            var vrt = $($(".sorular_tane_tane")[Math.floor(Math.random() * $(".sorular_tane_tane").length)]);
            cgrSoruNo = vrt.data("soruno");
            cgrSoruId = vrt.data("soruid");
            cgrcripAnss = vrt.data("cvpcrp");
            $('.sorular_tane_tane[data-soruno=' + cgrSoruNo + ']').removeClass("gizle");
            $('.cevaplar_tane_tane[data-soruno=' + cgrSoruNo + ']').removeClass("gizle");
            $('.cevaplar_tane_tane[data-soruno=' + cgrSoruNo + ']').find(".hex_harfleri").removeClass("gizle");
          } else {
            //$('.has_b').html('Tebrikler! Tüm soruları bitirdiniz.');
            $('.anagram_cik, .anagram_shuffle, .anagram_pas').addClass('gizle');
            $('#anagram_logs').append('<div>&rarr;\t Tebrikler! Tüm soruları bitirdiniz. Yarışma süresinin tamamlanması bekleniyor...</div>');
            $('#anagram_logs').animate({scrollTop: $('#anagram_logs').get(0).scrollHeight}, 800);
            $('.cevaplar_tane_tane, .cevaplar_harf_tane_tane, .sorular_tane_tane, .sonuc_list').remove();
            $('.soru_alanlari').append('<div class="sonuc_list">Tüm soruları bitirdin, sonuçlar ve puanlar için lütfen yarışmanın bitmesini bekle...</div>');
            clearInterval(anagramStartTimer);
            clearInterval(anagramStartTimerQuest);
            anagramBalasdimi = false;
          }
          $('.anagram_shuffle, .anagram_pas').attr("data-soruid", cgrSoruId).attr("data-crip_answer", cgrcripAnss).attr("data-soruno", cgrSoruNo);
          alertify.success("Tebrikler, bildiniz!");
        } else alertify.warn(cb);
      });
    }
  });

  $('.anagram_gir').click(function () {
    loading(true);
    socket.send('my_profil', {
      event: 'anagram',
      data: {
        islem: 'gir',
        login_fee: $(this).attr("title")
      }
    }, function (cb) {
      loading(false);
      if (typeof cb !== 'boolean') alertify.warn(cb);
    })
  });

  $(document).on('click', '.anagram_shuffle, .anagram_pas', function () {
    var $thisiE = $(this),
      cripAnsV = shuffleAnswer($thisiE.attr("data-crip_answer"));
    if ($thisiE.hasClass("anagram_shuffle")) {
      $('#cevap_' + $thisiE.attr("data-soruid")).html("");
      $('.cevaplar_harf_tane_tane').remove("");
      for (var i__ = 0, len = cripAnsV.length; i__ < len; i__++) {
        $('#cevap_' + $thisiE.attr("data-soruid")).append('<div id="harf_id_' + i__ + "_" + (MD5_fn(cripAnsV[i__])) + '" class="hexagon cevapsiz hex_harfleri" data-soruno="' + $thisiE.attr("data-soruno") + '" data-harf="' + cripAnsV[i__] + '" data-cevap_len="' + cripAnsV.length + '" data-soruid="' + $thisiE.attr("data-soruid") + '"><span lang="tr" class="text">' + cripAnsV[i__] + '</span></div>');
      }
    } else {
      var cgrcripAnss = "",
        cgrSoruNo = 0,
        elementSR = "",
        cgrSoruId = "";
      if ($(".sorular_tane_tane").length === 1) alertify.warn("Başka soru yok");
      else if ($('.sorular_tane_tane[data-soruno=' + parseInt(parseInt($thisiE.attr("data-soruno")) + 1) + ']').length > 0) {
        $('#soru_' + $thisiE.attr("data-soruid") + ', #cevap_' + $thisiE.attr("data-soruid") + '').addClass("gizle");
        $('.cevaplar_harf_tane_tane').remove();
        cgrSoruNo = parseInt(parseInt($thisiE.attr("data-soruno")) + 1);
        elementSR = $('.sorular_tane_tane[data-soruno=' + cgrSoruNo + ']');
        cgrcripAnss = elementSR.data("cvpcrp");
        cgrSoruId = elementSR.data("soruid");
        elementSR.removeClass("gizle");
        $('.cevaplar_tane_tane[data-soruno=' + cgrSoruNo + ']').removeClass("gizle");
        $('.cevaplar_tane_tane[data-soruno=' + cgrSoruNo + ']').find(".hex_harfleri").removeClass("gizle");
        $('.anagram_shuffle, .anagram_pas').attr("data-soruid", cgrSoruId).attr("data-crip_answer", cgrcripAnss).attr("data-soruno", cgrSoruNo);
      } else if ($(".sorular_tane_tane").length > 1) {
        $('#soru_' + $thisiE.attr("data-soruid") + ', #cevap_' + $thisiE.attr("data-soruid") + '').addClass("gizle");
        $('.cevaplar_harf_tane_tane').remove();
        var vrt = $($(".sorular_tane_tane")[Math.floor(Math.random() * $(".sorular_tane_tane").length)]);
        cgrSoruNo = vrt.data("soruno");
        cgrSoruId = vrt.data("soruid");
        cgrcripAnss = vrt.data("cvpcrp");
        $('.sorular_tane_tane[data-soruno=' + cgrSoruNo + ']').removeClass("gizle");
        $('.cevaplar_tane_tane[data-soruno=' + cgrSoruNo + ']').removeClass("gizle");
        $('.cevaplar_tane_tane[data-soruno=' + cgrSoruNo + ']').find(".hex_harfleri").removeClass("gizle");
        $('.anagram_shuffle, .anagram_pas').attr("data-soruid", cgrSoruId).attr("data-crip_answer", cgrcripAnss).attr("data-soruno", cgrSoruNo);
      }
    }
  });

  $('.anagram_cik').click(function () {
    if (anagramBalasdimi) {
      swal({
        title: 'Emin misiniz?',
        html: "Yarışma aktif olduğu için ayrıldığınızda her hangi bir <b>altın iadesi olmayacaktır.</b> Masaya yatırılan tutar, masada kalır.",
        showCancelButton: true,
        confirmButtonColor: '#d6806b',
        cancelButtonColor: '#71addd',
        cancelButtonText: 'devam et',
        confirmButtonText: 'Yine de ayrıl!'
      }).then(function () {
        loading(true);
        socket.send('my_profil', {event: 'anagram', data: {islem: 'cik'}}, function (cb) {
          loading(false);
          swalClose();
          if (typeof cb !== 'boolean') alertify.warn(cb);
        });
      })
    } else {
      loading(true);
      socket.send('my_profil', {event: 'anagram', data: {islem: 'cik'}}, function (cb) {
        loading(false);
        if (typeof cb !== 'boolean') alertify.warn(cb);
      });
    }
  });

  $(document).on('click', '#OPEN_TICKET', function () {
    var SELECT = '';
    $.each(window.SUBJ, function (index, value) {
      SELECT += '<option value="' + index + '">' + value.name + '</option>';
    });
    swal({
      title: 'Yeni Destek Talebi',
      html:
      'Konu : <select name="subject" class="swal2-select" id="ticketSubj">' +
      '<option value="0">----Seçin---</option>' +
      SELECT +
      '</select> <br/>' +
      '<select   name="depart" class="swal2-select gizle" id="T_depart">' +
      '<option selected="selected" value="Şikayet Çözüm Merkezi">Şikayet Çözüm Merkezi</option>' +
      '</select>' +
      '<textarea name="destek" class="swal2-textarea" rows="10" id="T_destek" placeholder="Destek ekibine gönderilecek bilgiyi burdan yazabilirsiniz."></textarea>' +
      '',
      showCancelButton: true,
      confirmButtonText: 'Destek Aç',
      cancelButtonText: 'Vazgeç',
      background: '#fff url(img/png/transp_bg.png)',
      showLoaderOnConfirm: true,
      preConfirm: function () {
        return new Promise(function (resolve, reject) {
          window.socket.send("ticket",
            {
              'event': 'create',
              'data': {
                'subject': $('#ticketSubj').val(),
                'depart': $('#T_depart').val(),
                'mesaj': $('#T_destek').val()
              }
            }, function (rs) {
              if (rs === true) {
                swalClose();
                resolve();
                alertify.success("İşlem başarılı, Ticket açıldı, Müsait temsilci isteğinizi yanıtlayacaktır.");
                ticketPage(0);
                /*window.socket.send('ticket',{'event':'ticketActimBilgiVer'},function(){
                    TODO  : yönticilere bilgi verilecek,
                });*/
              } else {
                reject(rs);
                alertify.error("Hata oluştu  ve kaydedilmedi. Lütfen daha sonra tekrar deneyiniz.");
              }
            });
        });
      },
      allowOutsideClick: false
    }).then(function () {
      swalClose();
    });

  });

  //ticket sistem
  $(document).on('click', '#BACK_TO_TICKETS', function () {
    $('.BACK_TO_TICKETS2').addClass('gizle');
    $('.T_LIST').removeClass('gizle');
    $('.T_MAIN').addClass('gizle').html("");
    $('.T_DETAIL').addClass('gizle');
    $('#ticketPostId').val("");
  });


  $(document).on('click', 'button#SEND_TICKET', function () {
    var ap = '<li class="out"><img class="avatar" alt="" src="' + (_USERINFO.img.length > 0 ? "img/users/" + _USERINFO.img : 'img/png/farmer_' + _USERINFO.gender + '.png') + '"> <div class="message">' + $('.Editor-editor').html() + '<p class="date">Biraz Önce</p><p class="info"></p></div></li>';
    $('.RUBARQAMS').append(ap);

    window.socket.send("ticket", {
      'event': 'post', 'data':
        {
          'msg': encodeHtmlEntity($('.Editor-editor').html()),
          'ticketId': $('#ticketPostId').val()
        }
    }, function (rs) {
      if (typeof  rs == 'boolean') {

        if (rs === true) {
          alertify.success("Başarılı, Postunuz gönderildi");
          $("html, body").animate({scrollTop: 0}, 600);
        } else alertify.error("Hatalı İşlem, Ticket detaylarına ulaşılamadı, Lütfen daha sonra tekrar deneyiniz.");
      } else alertify.error("Hatalı İşlem, Ticket gönderilemedi, lütfen daha sonra tekrar deneyiniz");
    });
    $('.Editor-editor').html("");
  });


  $(document).on('click', '[data-bayiSiparisleri]', function () {
    loading(true);
    window.socket.send('admin', {'event': 'bayisOrders', 'bayiId': $(this).data().bayisiparisleri}, function (rs) {
      loading(false);
      console.log(rs);
      swal({});

    });
  });
  $(document).on('click', '#call_merchant_balance', function () {
    loading(true);
    window.socket.send('admin', {'event': 'call_merchant_balance'}, function (rs) {
      loading(false);
      $('#call_merchant_balance_div').html(rs);
    });
  });
  $(document).on('click', '[data-pinPrize]', function () {
    var $th = $(this).data().pinprize, htmlSis = '', postUrl = '', postEd = '';
    loading(true);
    window.socket.send('admin', {'event': $th.event, 'event2': $th.event2, 'data': $th.data}, function (rs) {
      loading(false);
      if (typeof rs == 'object') {
        if (rs.length > 0) {
          htmlSis = '<form id="PPRIZE">';
          $.each(rs, function (indexed, values) {
            htmlSis += '<div class="col-md-12">' +
              '<select name="pinkey_' + values.id + '" style="width:48%" class="swal2-select cold-xs-6 pull-left"><option value="' + values.gold + '">' + values.gold + ' Pin</option></select>' + '<input value="' + values.alis + '" id="swal-input2" style="width:48%;height: 35px;margin-left:1%;" name="pinval_' + values.id + '" class="swal2-input col-xs-6 pull-right pin' + values.gold + '"></div>';
          });
          htmlSis += '</form>';
        }

        postUrl = 'https://' + $th.data.bayiSite + '/system/inc/updates/pin.php';
        swal({
          title: 'Bayinin Pin Alış Fiyatları',
          background: '#fff url(https://www.toptal.com/designers/subtlepatterns/patterns/geometry.png)',
          confirmButtonText: '<i class="fa fa-check-circle-o"></i> Uygula',
          showCancelButton: true,
          cancelButtonText: 'Vazgeç',
          html: htmlSis,
          preConfirm: function () {
            swal.showLoading();
            return new Promise(function (resolve, reject) {
              postEd = $('#PPRIZE').serialize() + '&pinPrizeUpdate=true';
              $.post(postUrl, postEd, function (rs) {
                swal.hideLoading();
                if (typeof rs == "object") {
                  resolve();
                  alertify.success("İşlem başarılı, Bayinin Pin Alış Fiyatları Güncellendi");
                } else {
                  alertify.error("Sistemde Hata Oluştu");
                  reject(rs.toString());
                }
              }, "json");
            });
          },
          onOpen: function () {
            $('#swal-input1').focus()
          }
        }).then(function (result) {
          swalClose();
        }).catch(swal.noop);

      } else {

      }
    });

  });

  $(document).on('click', '.eTicket', function () {
    swal.setDefaults({
      html: 'Sayın <b>Mehmet AYDIN</b>\'ın da katılacağı <b>Çiftlik Bank Standının</b> yer aldığı CNR Games Week İstanbul, bölgenin en büyük oyun platformu olmaya hazırlanıyor. <img src="https://scontent.faep8-2.fna.fbcdn.net/v/t1.0-0/p480x480/22365662_511840925850511_1650080353400141002_n.jpg?oh=a8df9f2fcac8e35c063956ef63fe34b2&oe=5AA152F9" style="width:95%" />',
      confirmButtonText: '<i class="fa fa-ticket" ></i> Sonraki &rarr;',
      cancelButtonText: 'İptal',
      showCancelButton: true,
      progressSteps: ['1', '2']
    })

    var steps = [
      {
        title: 'Bilet Satın Alma',
      },
      {
        title: 'Katılım Koşulları',
        html: '<table width="90%" style="margin:5%;" border="0"> <tr> <td colspan="3"><p>Tarafınıza gönderilecek PNR numarasıyla tüm fuar günleri için geçerli bilet gönderilecektir.</p><p>5 Kasım günü sayın Mehmet AYDIN Çiftlik Bank Standında olacaktır.</p></td></tr><tr> <td colspan="3"><input type="text" class="swal2-input _iname" placeholder="İsim Soyisim" value=' + _USERINFO.name + '/></td></tr><tr> <td colspan="3"><input type="text" class="swal2-input _igsm" value=' + _USERINFO.gsm.split('0090')[1] + ' placeholder="Telefon Numarası"/></td></tr><tr> <td colspan="3"><input type="text" class="swal2-input _imail" value=' + _USERINFO.email + '  placeholder="E-Mail Adresi"/></td></tr><tr> <td width="51%">&nbsp;</td><td width="2%">&nbsp;</td><td width="47%">&nbsp;</td></tr><tr> <td>Bilet Fiyatı</td><td>&nbsp;</td><td>40 Gümüş</td></tr><tr> <td>PNR</td><td>:</td><td>SMS Gönderilecek</td></tr><tr> <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr> <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table>',
        preConfirm: function (rs) {
          return new Promise(function (resolve, reject) {
            swal.showLoading();
            window.socket.send('eventRegister', {
              'data': {
                'name': $('._iname').val(),
                'gsm': $('._igsm').val(),
                'email': $('._imail').val()
              }
            }, function (rs) {
              swal.showLoading(false);
              if (typeof rs == 'boolean') {
                resolve();
              } else {
                reject(rs);
              }
            });
          });
        }
      }
    ]

    swal.queue(steps).then(function (result) {
      swal.resetDefaults();
      swal({
        title: 'Başarılı',
        type: 'success',
        html: 'Bilet Talebiniz Alınmıştır, Tarafınıza PNR Numarası gün içinde gönderilecektir.',
        confirmButtonText: 'Tamam!'
      })
    }, function () {
      swal.resetDefaults()
    });
  });

}),
  function (a, b, c, d) {
    function e(b, c) {
      this.element = b, this.settings = a.extend({}, g, c), this._defaults = g, this._name = f, this.init()
    }

    var f = "metisMenu", g = {toggle: !0};
    e.prototype = {
      init: function () {
        var b = a(this.element), c = this.settings.toggle;
        b.find("li.active").has("ul").children("ul").addClass("collapse in"), b.find("li").not(".active").has("ul").children("ul").addClass("collapse"), b.find("li").has("ul").children("a").on("click", function (b) {
          b.preventDefault(), a(this).parent("li").toggleClass("active").children("ul").collapse("toggle"), c && a(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide")
        })
      }
    }, a.fn[f] = function (b) {
      return this.each(function () {
        a.data(this, "plugin_" + f) || a.data(this, "plugin_" + f, new e(this, b))
      })
    }
  }(jQuery, window, document);

