// Initialize your app
var $$ = Dom7;
var app = new Framework7({  
  root: '#app', // App root element
  pushState: true,
  //popupCloseByOutside:true,
  name: 'COSMOS - OPERATIONS',// App Name
  id: 'com.phonegap.cosmosoperations',       // App id
  panel: {
    //swipe: 'left', // Enable swipe panel
    closeByBackdropClick : true,    
  },  
  //theme:'material',
  //material: true, //enable Material theme
  routes: routes, 
  clicks: { 
    externalLinks: '.external',
  },
  navbar: {
    hideOnPageScroll: false,
    iosCenterTitle: false,
    closeByBackdropClick: true,
  },
  picker: {
    rotateEffect: true,
    openIn: 'popover', 
  },
  popover: {
    closeByBackdropClick: true,
  },
  on: {
    pageInit: function(e, page) {
      //console.log('pageInit', e.page);
      var app = this;
      var today = new Date();
      var $ = app.$;

      var calendarModal = app.calendar.create({
        inputEl: '#demo-calendar-modal',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: 'dd-mm-yyyy',
      });
    },
  }, 
  // Hide and show indicator during ajax requests
  onAjaxStart: function (xhr) {
    app.showIndicator();
  },
  onAjaxComplete: function (xhr) {
    app.hideIndicator();
  }
});

document.addEventListener("deviceready", checkStorage, false); 
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackKeyDown, false);

var pictureSource; // picture source
var destinationType; 

var pictureSource1; // picture source
var destinationType1;

var base_url = 'http://oteqprojects.co.in/cosmos2/';   // TEST SERVER //
//var base_url = 'http://yourcollectorand.in/';   // LIVE SERVER // 

function onBackKeyDown(){
  if(app.views.main.router.history.length==2 || app.views.main.router.url=='/'){
    app.dialog.confirm('Do you want to Exit ?', function () {
      navigator.app.clearHistory(); navigator.app.exitApp();
    });
  }else{ 
    $$(".back").click();
  } 
}
function onDeviceReady(){   
  pictureSource = navigator.camera.PictureSourceType;
  destinationType = navigator.camera.DestinationType;

  pictureSource1 = navigator.camera.PictureSourceType;
  destinationType1 = navigator.camera.DestinationType;
}
// --------------------------- C H E C K  I N T E R N E T  C O N N E C T I O N ------------------- //
function checkConnection() {  
  var networkState = navigator.connection.type;
  app.preloader.show(); //alert(networkState);  
  if(networkState=='none'){  
      app.router.navigate('/internet/');  
  }
  app.preloader.hide();
}
// -------------------------------------- C H E C K  S T O R A G E ------------------------------- //
function checkStorage(){  
  checkConnection(); 
  var sess_u_id = window.localStorage.getItem("session_u_id");//alert(sess_u_id); 
  if(sess_u_id==null){
    app.router.navigate('/');   
  }else{  
    app.router.navigate('/dashboard/'); 
    //app.router.navigate('/new_pro/'); 
    //app.router.navigate('/pro_registration/'); 
  }
}
// -------------------------------------- LOGIN : C H E C K L O G I N -------------------------- //
function checklogin(){
    checkConnection();    
    if (!$$('#loginForm')[0].checkValidity()) { 
     // console.log('Check Validity!'); 
    }else{ 
      var form = $(".loginForm").serialize();
      var url=base_url+'app_controller/chklogin'; //console.log(form);     
      var unm=$('input[name="username"]').val(); //console.log(unm); 
      $.ajax({
        'type':'POST',
        'url': url, 
        'data':form, 
        success:function(data){
          var json = $.parseJSON(data);
          var json_res = json.loggedin_user[0];   
          //console.log("!!!!!!!!"+json_res);alert(json_res+" success");   
          if(json_res!=undefined){  
            window.localStorage.setItem("session_u_id",json.loggedin_user[0].u_id);
            window.localStorage.setItem("session_u_name",json.loggedin_user[0].u_name);
            window.localStorage.setItem("session_mobile",json.loggedin_user[0].mobile);
            window.localStorage.setItem("session_u_fullname",json.loggedin_user[0].u_fullname);
            window.localStorage.setItem("session_u_type",json.loggedin_user[0].u_type);
            window.localStorage.setItem("session_u_image",json.loggedin_user[0].image);
            window.localStorage.setItem("session_u_created",json.loggedin_user[0].create_date);
            window.localStorage.setItem("session_u_lastlogin",json.loggedin_user[0].last_login);
            window.localStorage.setItem("session_u_email",json.loggedin_user[0].u_email);
            app.router.navigate("/dashboard/");
          }else{
            app.dialog.alert("Authentication Failed!");
            $("#username").val('');
            $("#password").val('');
          }
        }
      });
    }
} 
// ---------------------------------- USER IMAGE UPLOAD --------------------------------------- //
function userPicFun(){
  //alert("in userPicFun");
  var session_u_image = window.localStorage.getItem("session_u_image");
  //alert(session_u_image);
  var u_img = base_url+"uploads/user_images/"+session_u_image;
  //alert(u_img);
  if(session_u_image!=undefined){
    $("#user_pic").html("<center><img src="+u_img+" height='130' width='130' class='img-round'></center>");
    $(".u_pic").html("<img src="+u_img+" height='45' width='45' class='img-round'>");
  }else{
    $("#user_pic").html("<center><img src='img/nouser.png' height='130' width='130' class='img-round'></center>");
    $(".u_pic").html("<img src='img/nouser.png' height='45' width='45' class='img-round'>");
  }
}
function getgenderimage(sel_gender){
  if(sel_gender=='M'){    
    $("#female_img").html('');
    $("#male_img").html("<img src='img/gender/man.png' height='30' width='30' />");
  }else if(sel_gender=='F'){    
    $("#male_img").html('');
    $("#female_img").html("<img src='img/gender/girl.png' height='30' width='30' />");
  }
} 
function showIcons(){
  $(".showtwoBlocks").removeClass("display-none");
  $(".showtwoBlocks").addClass("display-block");
  $(".imageblock").removeClass("display-none");
  $(".imageblock").addClass("display-block");
  $(".uploadDiv").removeClass("display-none");
  $(".uploadDiv").addClass("display-block");
}
function showIcons_aadhar(){
  $(".showtwoBlocks_aadhar").removeClass("display-none");
  $(".showtwoBlocks_aadhar").addClass("display-block");
  $(".imageblock").removeClass("display-none");
  $(".imageblock").addClass("display-block");
  $(".uploadDiv_aadhar").removeClass("display-none");
  $(".uploadDiv_aadhar").addClass("display-block");
}
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
  quality: 100,
  targetWidth: 600,
  targetHeight: 600,
  destinationType: destinationType.FILE_URI,
  //saveToPhotoAlbum: true
  }); 
}
function onPhotoDataSuccess(imageURI) {
  //console.log(imageURI);
  //alert(imageURI);
  var cameraImage = document.getElementById('image');
  //alert("cameraImage :: "+cameraImage);
  //var upldbtnDiv = document.getElementById('upldbtnDiv');
  cameraImage.style.display = 'block';
  //upldbtnDiv.style.display = 'block';
  cameraImage.src = imageURI;
}
function getPhoto(source) {
  navigator.camera.getPicture(onPhotoURISuccess, onFail, {
    quality: 100,
    correctOrientation: 1,
    targetWidth: 600,
    targetHeight: 600,
    destinationType: destinationType.FILE_URI,
    sourceType: source
  });
} 
function onPhotoURISuccess(imageURI) {
  //console.log(imageURI);
  //alert("gallery image "+imageURI);
  var galleryImage = document.getElementById('image');
  //alert("galleryImage :: "+galleryImage);
  //var upldbtnDiv = document.getElementById('upldbtnDiv');
  galleryImage.style.display = 'block';
  //upldbtnDiv.style.display = 'block';
  galleryImage.src = imageURI;
}
function onFail(message) {
  app.dialog.alert('Failed because: ' + message);
}
// --------------------------------- AADHAR CARD -------------------------------------- //
function capturePhoto_aadhar() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess_aadhar, onFail_aadhar, {
  quality: 100,
  targetWidth: 600,
  targetHeight: 600,
  destinationType: destinationType1.FILE_URI,
  //saveToPhotoAlbum: true
  }); 
}
function onPhotoDataSuccess_aadhar(imageURI) {
  //console.log(imageURI);
  //alert(imageURI);
  var cameraImage1 = document.getElementById('aadhar_image');
  //alert("cameraImage1 :: "+cameraImage1);
  //var upldbtnDiv = document.getElementById('uploadDiv_aadhar');
  cameraImage1.style.display = 'block';
  //upldbtnDiv.style.display = 'block';
  cameraImage1.src = imageURI;
}
function getPhoto_aadhar(source) {
  navigator.camera.getPicture(onPhotoURISuccess_aadhar, onFail, {
    quality: 100,
    targetWidth: 600,
    targetHeight: 600,
    destinationType: destinationType1.FILE_URI,
    sourceType: source
  });
} 
function onPhotoURISuccess_aadhar(imageURI) {
  //console.log(imageURI);
  //alert("gallery image "+imageURI);
  var galleryImage1 = document.getElementById('aadhar_image');
  //alert("galleryImage1 :: "+galleryImage1);
  //var upldbtnDiv = document.getElementById('uploadDiv_aadhar');
  galleryImage1.style.display = 'block';
  //upldbtnDiv.style.display = 'block';
  galleryImage1.src = imageURI;
}
function onFail_aadhar(message) {
  app.dialog.alert('Failed because: ' + message);
}
// ----------------------------------------- QUALIFICATION AJAX ----------------------------------- //
function changeQualification(qual_id){
  checkConnection();    
  var collar_type = $('.qualificationChange option:selected').attr('data-type');
  var table = $('.qualificationChange option:selected').attr('data-table');
  var selectedValue = $('.qualificationChange option:selected').val();
  //console.log(collar_type+" collar_type"); 
  //console.log(table+" table");
  //console.log(selectedValue+" selectedValue");
  if(table == ''){
    $("#spec_li").hide();
  }
  if (collar_type == '' || table == '') {
    $(".specialization").html("");
    $(".specializationTable").val("");
    $(".hidden_collar_type").val(collar_type);
    return false;
  }
  //console.log(collar_type);
  //console.log(table);
  //console.log(selectedValue);
  app.preloader.show();
  $.ajax({
    method: "POST",
    url:base_url+"app_controller/getSpecilization",
    data: {collar: collar_type,table: table,selectedValue: selectedValue,mode:'add'},
    success: function (result) { 
    result = $.parseJSON(result);
      if (result.status == 'success'){
        $("#spec_li").show();
        $(".specialization").html(result.html);
        $(".specializationTable").val(table);
        $(".hidden_collar_type").val(collar_type); 
        $(".collar_type_id").val(selectedValue);       
      }
    }    
  });
  app.preloader.hide();
}
//------------------------------------------ UPLOAD USER IMAGE ------------------------------------ //
/*function upload_userpic(insert_id,mode,old_userPic){
  //alert("in upload_userpic");
//function upload_userpic(insert_id){
  //alert("in upload_userpic function");
  //alert("insert_id :: "+insert_id);
  var sess_u_id = window.localStorage.getItem("session_u_id");
  var img = document.getElementById('image'); //aadhar_image//
  //app.dialog.preloader('Uploading....');
  var imageURI = img.src; 
  //alert("img "+img);
  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
  options.mimeType="image/jpeg";
  options.chunkedMode = false;
  //options.contentType = 'multipart/form-data';
  //options.httpMethod = "POST";
  options.headers = {
     Connection: "close"
  }; 
  var params = {};
  params.fullpath =imageURI;
  params.name = options.fileName;     
  var imgfilename = params.name; 
  alert("imgfilename"+imgfilename); 
  var split_imgfilename = imgfilename.split("?");
  var actual_imgname = split_imgfilename[0];
  var ft = new FileTransfer();
  var uploadControllerURL = base_url+"app_controller/photoupload/"+sess_u_id+"/"+insert_id+"/"+mode+"/"+old_userPic+"/"+imgfilename+"/"+actual_imgname; 
  //var uploadControllerURL = base_url+"app_controller/photoupload/"+sess_u_id+"/"+insert_id;
  alert("sess_u_id "+sess_u_id);
  alert("insert_id "+insert_id);
  alert("mode "+mode);
  alert("old_userPic "+old_userPic);
  alert("imgfilename "+imgfilename);
  alert("actual_imgname "+actual_imgname); 
  //alert(uploadControllerURL);
  ft.upload(imageURI,uploadControllerURL, win, fail, options,true);
  app.preloader.hide(); 
} */
function upload_userpic(insert_id,mode,old_userPic){
  //alert("in upload_userpic function");
  //alert("insert_id :: "+insert_id);
  var sess_u_id = window.localStorage.getItem("session_u_id");
  var img = document.getElementById('image'); //aadhar_image//
  //app.dialog.preloader('Uploading....');
  var imageURI = img.src;
  //alert("imageURI "+imageURI);
  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
  options.mimeType="image/jpeg";
  options.chunkedMode = false;
  //options.contentType = 'multipart/form-data';
  //options.httpMethod = "POST";
  options.headers = {
     Connection: "close"
  };
  var params = {};
  params.fullpath =imageURI;
  params.name = options.fileName;
  var imgfilename = params.name; 
  //alert("imgfilename :: "+imgfilename);
  var split_imgfilename = imgfilename.split("?");
  var actual_imgname = split_imgfilename[0];    
  var ft = new FileTransfer();
  //var uploadControllerURL = base_url+"app_controller/photoupload/"+sess_u_id+"/"+insert_id; 
  var uploadControllerURL = base_url+"app_controller/photoupload/"+sess_u_id+"/"+insert_id+"/"+mode+"/"+old_userPic+"/"+imgfilename;
  //alert(uploadControllerURL); 
  ft.upload(imageURI,uploadControllerURL, win, fail, options,true);
}
function win(r) { //alert(r);
    //document.writeln(r.response);      
    var responseCode = r.responseCode;
    if(responseCode==200){
      //app.dialog.alert("User image upload done.");      
      app.dialog.close(); 
    }
}
function fail(error) {
  app.dialog.alert("An error has occurred: Code = " + error.code);
  app.dialog.alert("upload error source " + error.source);
  app.dialog.alert("upload error target " + error.target);
}
//------------------------------------------ UPLOAD AADHAR CARD ----------------------------------- //
/* function upload_aadhar(insert_id,mode,old_aadharPic){ 
//function upload_aadhar(insert_id){
  var sess_u_id = window.localStorage.getItem("session_u_id");
  var img1 = document.getElementById('aadhar_image'); //aadhar_image//
  //app.dialog.preloader('Uploading....');
  var imageURI1 = img1.src;
  //alert("imageURI1 "+imageURI1);
  var options1 = new FileUploadOptions();
  options1.fileKey="file";
  options1.fileName=imageURI1.substr(imageURI1.lastIndexOf('/')+1);
  options1.mimeType="image/jpeg";
  options1.chunkedMode = false;
  //options1.contentType = 'multipart/form-data';
  //options1.httpMethod = "POST";
  options1.headers = {
     Connection: "close" 
  };
  var params1 = {};
  params1.fullpath =imageURI1;
  params1.name = options1.fileName; 
  var imgfilename1 = params1.name; 
  alert("imgfilename1 "+imgfilename1);
  var split_imgfilename1 = imgfilename1.split("?");
  var actual_imgname1 = split_imgfilename1[0];
  var ft1 = new FileTransfer(); 
  var uploadControllerURL_aadhar = base_url+"app_controller/photouploadaadhar/"+sess_u_id+"/"+insert_id+"/"+mode+"/"+old_aadharPic+"/"+imgfilename1+"/"+actual_imgname1; 
  alert("sess_u_id "+sess_u_id);
  alert("insert_id "+insert_id);
  alert("mode "+mode);
  alert("old_aadharPic "+old_aadharPic);
  alert("imgfilename1 "+imgfilename1); 
  alert("actual_imgname1 "+actual_imgname1);
  //var uploadControllerURL_aadhar = base_url+"app_controller/photouploadaadhar/"+sess_u_id+"/"+insert_id; 
  //alert(uploadControllerURL);
  ft1.upload(imageURI1,uploadControllerURL_aadhar, win1, fail1, options1,true);
  app.preloader.hide();
} */
function upload_aadhar(insert_id,mode,old_aadharPic){ 
  var sess_u_id = window.localStorage.getItem("session_u_id");
  var img1 = document.getElementById('aadhar_image'); //aadhar_image//
  //app.dialog.preloader('Uploading....');
  var imageURI1 = img1.src;
  //alert("imageURI1 "+imageURI1);
  var options1 = new FileUploadOptions();
  options1.fileKey="file";
  options1.fileName=imageURI1.substr(imageURI1.lastIndexOf('/')+1);
  options1.mimeType="image/jpeg";
  options1.chunkedMode = false;
  //options.contentType = 'multipart/form-data';
  //options.httpMethod = "POST";
  options1.headers = {
     Connection: "close"
  };
  var params1 = {};
  params1.fullpath =imageURI1;
  params1.name = options1.fileName;
  var imgfilename1 = params1.name; 
  //alert("imgfilename1 :: "+imgfilename1); 
  var split_imgfilename1 = imgfilename1.split("?");
  var actual_imgname1 = split_imgfilename1[0];
  var ft1 = new FileTransfer();
  var uploadControllerURL_aadhar = base_url+"app_controller/photouploadaadhar/"+sess_u_id+"/"+insert_id+"/"+mode+"/"+old_aadharPic+"/"+imgfilename1;
  //var uploadControllerURL_aadhar = base_url+"app_controller/photouploadaadhar/"+sess_u_id+"/"+insert_id; 
  //alert(uploadControllerURL);
  ft1.upload(imageURI1,uploadControllerURL_aadhar, win1, fail1, options1,true);
}
function win1(r) { 
    //alert("Code = " + r.responseCode);  
    //alert(r);
    //alert(r.response);
    //document.writeln(r.response);
    var responseCode = r.responseCode;
    if(responseCode==200){ 
      //app.dialog.alert("Aadhar card upload done.");      
      app.dialog.close();
    }
}
function fail1(error) {
  app.dialog.alert("An error has occurred: Code = " + error.code);
  app.dialog.alert("upload error source " + error.source);
  app.dialog.alert("upload error target " + error.target);
}
// ----------------------------------------- VALIDATIONS ------------------------------------------ //
function usernameValidation(obj) {
  var uname = obj.val();
  var st = /^[a-zA-Z ]+$/.test(uname);
  if (!st) {
    obj.val('')
  }
}
function numericValidation(obj) {
  var uname = obj.val();
  var st = /^[0-9]+$/.test(uname);
  if (!st) {
    obj.val('')
  }
}
function mobile_length(mobno){
  if(mobno.length < 10){
    app.dialog.alert("Mobile no should be of 10 digits");
    return false;
  }
}
function setFocus(aadhar_digits){
  var aadhar_txt1 = $("#aadhar_txt1").val();
  var aadhar_txt2 = $("#aadhar_txt2").val();
  if(aadhar_txt1.length == 4){
    $("#aadhar_txt2").focus();
  }
  if(aadhar_txt2.length == 4){
    $("#aadhar_txt3").focus();
  }
}
/*function check_aadhar(obj){
    //console.log("called");
    //console.log(obj.val().length);
    if (obj.val().length < 14){
      return false;
    }
    var aadharNumber = obj.val();
    var mode = $("#mode").val();
    if(mode == 'add'){
      var rec_id = '';
    }else if(mode == 'edit'){
      var rec_id = $(".hidden_prov_id").val();
    }
    
    alert("rec_id "+rec_id);
    $.ajax({
      method: "POST",
      url: base_url+'app_controller/check_aadhar',
      data: {aadharNumber: aadharNumber,rec_id  :rec_id},
      success: function (result) {
      result = $.parseJSON(result);
      if (result.status == 'success') {
        obj.val('');
        app.dialog.alert('Aadhar Number Already Exists...');
      } else { }
      }
    });
} */
function add_check_aadhar(){
  var aadhar_txt1 = $("#aadhar_txt1").val();
  var aadhar_txt2 = $("#aadhar_txt2").val();
  var aadhar_txt3 = $("#aadhar_txt3").val();
  var aadhar = aadhar_txt1+" "+aadhar_txt2+" "+aadhar_txt3;
  if(aadhar.length < 14){
    return false;
  }
  var aadharNumber = aadhar;
  var mode = $("#mode").val();
  if(mode == 'add'){
    var rec_id = '';
  }else if(mode == 'edit'){
    var rec_id = $(".hidden_prov_id").val();
  }
  $.ajax({
    method: "POST",
    url: base_url+'app_controller/check_aadhar',
    data: {aadharNumber: aadharNumber,rec_id  :rec_id},
    success: function (result) {
    result = $.parseJSON(result);
    if (result.status == 'success') {
      $("#aadhar_txt1").val('');
      $("#aadhar_txt2").val('');
      $("#aadhar_txt3").val('');
      app.dialog.alert('Aadhar number already exists.');
    } else { }
    }
  });
}
function check_pin_length(pinlen){
  if(pinlen.length < 6){
    app.dialog.alert("Please enter valid pincode.");
    return false;
  }
}
// ----------------------------------------- SAVE PRO.REGISTRATION -------------------------------- //
function save_pro(){
  var sess_u_id = window.localStorage.getItem("session_u_id");
  $("#sess_u_id").val(sess_u_id);
  var newproreg = $(".newproreg").serialize();
  console.log(newproreg);
  var old_aadharPic = 'NULL';
  var old_userPic = 'NULL';
  var mode = 'add';
  $.ajax({
    'type':'POST',
    'url': base_url+"app_controller/save_proreg", 
    'data':newproreg, 
    success:function(data){
      if(data){
        //upload_userpic(data);
        //upload_aadhar(data);
        upload_userpic(data,mode,old_userPic);
        upload_aadhar(data,mode,old_aadharPic);
        var toastIcon = app.toast.create({
          icon: app.theme === 'ios' ? '<i class="f7-icons">check_round</i>' : '<i class="f7-icons">check_round</i>',
          text: 'Registration Done.',
          position: 'center',
          closeTimeout: 2000,
        });
        toastIcon.open();       
        app.router.navigate("/pro_registration/"); 
      }
    }
  });  
}

function edit_pro(){
  //alert("in edir_pro function");
  var sess_u_id = window.localStorage.getItem("session_u_id");
  $("#sess_u_id").val(sess_u_id);
  var recid = $("#recid").val();
  var editproreg = $(".editproreg").serialize();   
  var old_aadharPic=$('input[name="old_aadharPic"]').val();
  var old_userPic = $('input[name="old_userPic"]').val();

  //console.log(editproreg);
  //alert(old_aadharPic+"-----"+old_userPic);
  //alert(editproreg);
  var mode = 'edit';
   $.ajax({
    'type':'POST', 
    'url': base_url+"app_controller/edit_proreg",  
    'data':editproreg, 
    success:function(data){
      if(data){
        //alert(data+"***");
        var split_data = data.split("_");
        var recid = split_data[0];
        var procode = split_data[1];
        //upload_userpic(recid);
        //upload_aadhar(recid);
        upload_userpic(recid,mode,old_userPic);
        upload_aadhar(recid,mode,old_aadharPic);
        var toastIcon = app.toast.create({
          icon: app.theme === 'ios' ? '<i class="f7-icons">check_round</i>' : '<i class="f7-icons">check_round</i>',
          text: procode+' updated successfully.',
          position: 'center',
          closeTimeout: 4000,
        });
        toastIcon.open();       
        app.router.navigate("/pro_registration/"); 
      }
    }
  });  
}
// ----------------------------------------- D A S H B O A R D ------------------------------------ //
$$(document).on('page:init', '.page[data-name="dashboard"]', function (e) {  
  app.preloader.show();
  checkConnection();
  userPicFun(); 
  var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    /*navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },*/
  }); 
  var sess_u_id = window.localStorage.getItem("session_u_id");
  var u_fullname=window.localStorage.getItem("session_u_fullname");
  var u_mo=window.localStorage.getItem("session_mobile");
  var u_since=window.localStorage.getItem("session_u_created");
  var lastlogin=window.localStorage.getItem("session_u_lastlogin");
  $("#userName").html("<span class='text-white'>Name : "+u_fullname+"</span>"); 
  $("#userMo").html("<span class='text-white'>Mobile : "+u_mo+"</span>"); 
  $("#userSince").html("<span class='text-white'>User Since : "+u_since+"</span>");
  $("#lastLogin").html("<span class='text-white'>Last Login : "+lastlogin+"</span>");
  $("#heading_img").html("<img src='img/headimg.png' width='300'>");  
  $("#headimg_bottom").html("<img src='img/headimg-bottom.png ' width='300'>");  
  var sess_u_id = window.localStorage.getItem("session_u_id");
  $.ajax({
    'type':'POST',
    'url': base_url+"app_controller/totalUserProReg",
    data:{'sess_u_id':sess_u_id},
    success:function(result){ 
      $(".total_provisionals").html("<center><span class='btn_color text-uppercase ml-7p fw-700'>Provisional Registrations ("+result+") </span></center>");
    }
  });
  $.ajax({
    'type':'POST', 
    'url': base_url+"app_controller/totalAppProReg",
    data:{'sess_u_id':sess_u_id},
    success:function(app_result){ 
      appres = $.parseJSON(app_result);
      console.log(appres.details); 
      $(".app_cnt").html("APP ("+appres.total+")");
      if(appres.total > 0){
        $(".appregs").html(appres.details); 
      }else if(appres.total == 0){
        $(".appregs").html("No Data Available.");    
      }
    }
  });
  $.ajax({
    'type':'POST',
    'url': base_url+"app_controller/totalWebProReg", 
    data:{'sess_u_id':sess_u_id},
    success:function(web_result){
      result = $.parseJSON(web_result);
      console.log(result.details); 
      $(".web_cnt").html("WEB ("+result.total+")"); 
      if(result.total > 0){
        $(".webregs").html(result.details); 
      }else if(result.total == 0){
        $(".webregs").html("No Data Available.");    
      }
    }
  });
  var panel_menus='';
  //$("#userDiv").html("<span class='text-white'>(Field Officer)</span>");
  panel_menus = '<li class="" ><a class="list-button item-link panel-close fs-14" href="/dashboard/">Dashboard</a></li><li class="" ><a class="list-button item-link panel-close fs-14" href="/pro_registration/">Provisional Registration</a></li><li class=""><a class="list-button item-link panel-close fs-14" href="/change_pwd/">Change Password</a></li><li class="logout"><a class="list-button item-link fs-14" href="#" onclick="logOut()">Logout</a></li>';
  $("#panel_menus").html(panel_menus);  
  app.preloader.hide();
});
// ------------------------------------- PRO.REGISTRATION ---------------------------------------- //
$$(document).on('page:init', '.page[data-name="pro_registration"]', function (e) { 
  checkConnection();
  userPicFun();  
  var sess_u_id = window.localStorage.getItem("session_u_id");
  $.ajax({
    'type':'POST',
    'url': base_url+"app_controller/showUserProReg",
    data:{'sess_u_id':sess_u_id},
    success:function(result){
      $("#userData").html(result);
    }
  });   
});
// ------------------------------------- NEW PRO.REGISTRATION ------------------------------------ //
$$(document).on('page:init', '.page[data-name="new_pro"]', function (e) {
  checkConnection();
  userPicFun();
  var sess_u_id = window.localStorage.getItem("session_u_id");
  $("#sess_u_id").val(sess_u_id);
  $.ajax({
    'type':'POST',
    'url': base_url+"app_controller/getStates",
    'data':{'mode':'add'},
    success:function(states){  
      $("#state").html(states);
    }
  });
}); 
function getDist(stateid){
  checkConnection();
  app.preloader.show();
  $.ajax({
    method: "POST",
    url: base_url+'app_controller/getDistricts/' + stateid,
    data: {s_id: stateid,'mode':'add'}, 
    success: function (result) {
      result = $.parseJSON(result);
      if (result.status == 'Success') {
        $('.districtHtml').html(result.html);
        $('.citys_name').html(''); 
      }else{
        $('.districtHtml').html('');
        $('.citys_name').html('');
      }
    }
  });
  app.preloader.hide();
}
function getCityNew(){
  //alert("hi");
  checkConnection();
  var sid = $('#state').find(":selected").val();
  var did = $('#dist').find(":selected").val();
  //alert("sid "+sid+" did "+did);
  if (sid == '' || did == '') {
    $.Notification.notify('error', 'top right', 'Error', 'Please select state and district');
    $('.c_name').html('');
    return false;
  }
  app.preloader.show();
  $.ajax({
    method: "POST",
    url: base_url+'app_controller/getCityNew',
    data: {sid: sid, did: did,mode:'add'},
    success: function (result) {
      result = $.parseJSON(result);
      if (result.status == 'Success') {
        $('.citys_name').html(result.html);
      } else {
        $('.citys_name').html('');
      }
    }
  });
  app.preloader.hide();
}
// ----------------------------------------- EDIT PRO.REGISTRATION ------------------------------- //
$$(document).on('page:init', '.page[data-name="edit_proreg"]', function (e) {
  checkConnection();
  userPicFun();
});
function showProData(recid){
  checkConnection();
  app.router.navigate("/edit_proreg/");  
  var sess_u_id = window.localStorage.getItem("session_u_id");
  var editDiv='';  

  $.ajax({
    method: "POST",
    url: base_url+'app_controller/getEditProReg',
    data: {'recid': recid},
    success: function(editres){
      var json = $.parseJSON(editres);
      var json_res = json.edit_pro[0];
      console.log(json_res);
      var rec_procode = json.edit_pro[0].rec_procode;
      var name = json.edit_pro[0].rec_name;
      var street_1 = json.edit_pro[0].rec_street1;
      var street_2 = json.edit_pro[0].rec_street2;
      var state_id = json.edit_pro[0].rec_state;
      app.preloader.show();
      $.ajax({
        'type':'POST',
        'url': base_url+"app_controller/getStates", 
        'data':{'state_id':state_id,'mode':'edit'},
        success:function(states){ 
          $("#state").html(states);
        }
      });

      var dist_id = json.edit_pro[0].rec_district;
      $.ajax({
        'type':'POST',
        'url': base_url+"app_controller/getDistricts", 
        'data':{s_id:state_id,mode:'edit',dist_id:dist_id},
        success:function(dists){ 
          result = $.parseJSON(dists);
          if (result.status == 'Success') {
            $('.districtHtml').html(result.html);
          }else{
            $('.districtHtml').html('');
          }
        }
      });

      var city_id = json.edit_pro[0].rec_city;
      $.ajax({
        method: "POST",
        url: base_url+'app_controller/getCityNew',
        data: {sid: state_id, did: dist_id,mode:'edit',city_id:city_id},
        success: function (res) {
          result = $.parseJSON(res);
          if (result.status == 'Success') {
            $('.citys_name').html(result.html);
          } else {
            $('.citys_name').html('');
          }
        }
      });
      app.preloader.hide();
      var pincode = json.edit_pro[0].rec_pincode;
      var mobile = json.edit_pro[0].rec_mobile;
      var blue_collar = json.edit_pro[0].blue_collar;
      var collar_type = json.edit_pro[0].collar_type;
      var specializationTable = json.edit_pro[0].specializationTable;
      var specialization = json.edit_pro[0].specialization;
      //alert(sel_blueclr);
      editDiv+='<ul><input type="hidden" name="mode" id="mode" value="edit"><input type="hidden" name="sess_u_id" id="sess_u_id" value='+sess_u_id+'><input type="hidden" name="hidd_rec_id" value='+recid+' id="recid" class="hidden_prov_id" /><input type="hidden" name="hidd_procode" value='+rec_procode+' /><li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Name</div><div class="item-input-wrap"><input type="text" name="name" placeholder="Name (as per Aadhar Card)" required validate class="nameString" data-error-message="Name should not be empty." value="'+name+'" onkeyup="usernameValidation($(this))"></div></div></div></li><li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Street 1</div><div class="item-input-wrap"><input type="text" name="street_1" placeholder="Street 1" required validate data-error-message="Street1 should not be empty." value="'+street_1+'"></div></div></div></li><li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Street 2</div><div class="item-input-wrap"><input type="text" name="street_2" placeholder="Street 2" required validate data-error-message="Street2 should not be empty." value="'+street_2+'"></div></div></div></li><li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">State</div><div class="item-input-wrap input-dropdown-wrap"><select placeholder="STATE" name="state" id="state" onchange="getDist(this.value)" required validate data-error-message="Select state."></select></div></div></div><li><li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">District</div><div class="item-input-wrap input-dropdown-wrap"><select placeholder="DISTRICT" name="dist" id="dist" class="districtHtml" onchange="getCityNew(this.value)" required validate data-error-message="Select district."></select></div></div></div><li><li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">City</div><div class="item-input-wrap input-dropdown-wrap"><select placeholder="CITY" name="city" id="city" class="citys_name" required validate data-error-message="Select city."></select></div></div></div><li><li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Pincode</div><div class="item-input-wrap"><input type="text" name="pincode" placeholder="xxxxxx" required validate onkeypress="num_pincode()" class="pincode" onchange="check_pin_length(this.value)" data-error-message="Pincode should not be empty." value="'+pincode+'" maxlength="6" onkeyup="numericValidation($(this))"></div></div></div></li><li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Mobile</div><div class="item-input-wrap"><input type="text" name="mobile" placeholder="Mobile" required validate onfocusout="mobile_length(this.value)" data-error-message="Mobile no should not be empty." value="'+mobile+'" maxlength="10" onkeyup="numericValidation($(this))"></div></div></div></li><li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Qualification</div><div class="item-input-wrap input-dropdown-wrap"><select placeholder="Qualification" name="qualification" id="qualification" onchange="changeQualification(this.value)" class="qualificationChange" required validate data-error-message="Select qualification."><option value="">SELECT QUALIFICATION</option>';
        editDiv+='<option value="1"'
        if(blue_collar==1){
          editDiv+='selected';
        }
        editDiv+=' data-type="blue" data-table="">Below 10th Standard</option><option value="2"' 
        if(blue_collar==2){
          editDiv+='selected';
        }
        editDiv+=' data-type="blue" data-table="">S.S.C. / 10th Standard Pass</option><option value="3"' 
        if(blue_collar==3){
          editDiv+='selected';
        }
        editDiv+=' data-type="blue" data-table="">H.S.C. / 12th Standard Pass - Arts</option><option value="4"' 
        if(blue_collar==4){
          editDiv+='selected';
        }
        editDiv+=' data-type="blue" data-table="">H.S.C. / 12th Standard Pass - Science</option><option value="5"' 
        if(blue_collar==5){
          editDiv+='selected';
        }
        editDiv+=' data-type="blue" data-table="">H.S.C. / 12th Standard Pass - Commerce</option><option value="6"' 
        if(blue_collar==6){
          editDiv+='selected';
        }
        editDiv+=' data-type="blue" data-table="tbl_iti">I.T.I. - After 10th - Engineering</option><option value="7"' 
        if(blue_collar==7){
          editDiv+='selected'; 
        }
        editDiv+=' data-type="blue" data-table="tbl_iti">I.T.I. - After 10th - Non-Engineering</option><option value="8"' 
        if(blue_collar==8){
          editDiv+='selected';
        }
        editDiv+=' data-type="blue" data-table="tbl_iti">I.T.I. - After 12th - Engineering</option><option value="9"' 
        if(blue_collar==9){
          editDiv+='selected';
        }
        editDiv+=' data-type="blue" data-table="tbl_iti">I.T.I. - After 12th - Non - Engineering</option><option value="10"' 
        if(blue_collar==10){
          editDiv+='selected';
        }
        editDiv+=' data-type="white" data-table="tbl_diploma_com">Diploma - Science</option><option value="11"' 
        if(blue_collar==11){
          editDiv+='selected';
        }
        editDiv+=' data-type="white" data-table="tbl_diploma_com">Diploma - Commerce</option><option value="12"' 
        if(blue_collar==12){
          editDiv+='selected';
        }
        editDiv+=' data-type="white" data-table="tbl_diploma_art">Diploma - Arts</option><option value="13"' 
        if(blue_collar==13){
          editDiv+='selected';
        }
        editDiv+=' data-type="white" data-table="tbl_degree">Graduate</option><option value="14"' 
        if(blue_collar==14){
          editDiv+='selected';
        }
        editDiv+=' data-type="white" data-table="tbl_master">Masters</option><option value="15"' 
        if(blue_collar==15){
          editDiv+='selected';
        }
        editDiv+=' data-type="white" data-table="">PHD</option></select></div></div></div></li><input type="hidden" name="hidden_collar_type" id="hidden_collar_type" class="hidden_collar_type" value='+collar_type+'><input type="hidden" name="specializationTable" id="specializationTable" class="specializationTable" value='+specializationTable+'><input type="hidden" name="collar_type_id" id="collar_type_id" class="collar_type_id" value='+blue_collar+'><li id="spec_li"><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Specialization</div><div class="item-input-wrap input-dropdown-wrap specialization" id="specialization"></div></div></div></li>';
          $.ajax({
          method: "POST",
          url:base_url+"app_controller/getSpecilization",
          data: {collar: collar_type,table: specializationTable,selectedValue: blue_collar,mode:'edit',specialization:specialization},
          success: function (result) { 
          result = $.parseJSON(result);
            if (result.status == 'success'){
              $("#spec_li").show();
              $(".specialization").html(result.html);
              $(".specializationTable").val(specializationTable);
              $(".hidden_collar_type").val(collar_type); 
              $(".collar_type_id").val(blue_collar);       
            }
          }    
        }); 
        userImg='';
        var userPic = json.edit_pro[0].rec_photo;
        var picpath= base_url+userPic;
        if(userPic!=''){
          userImg+='<li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">User Profile Photo</div><img src='+picpath+' height="150" width="280" class="mt-5p img_border"/></div></li>';
        }
        var split_picpath = userPic.split("/");
        var upicnm_name = split_picpath[2];
        editDiv+=userImg+'<input type="hidden" name="old_userPic" value="'+upicnm_name+'" /><li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap"><button class="col button button-small button-outline btn_color" type="button" onclick="showIcons()">Change Photo</button></div></div></li><li class="item-content item-input showtwoBlocks display-none"><div class="item-inner"><div class="item-input-wrap"><div class="uploadDiv w-100 display-none"><div class="col-100"><div class="row"><div class="20"></div><div class="col-50 picbox text-white" ><span onclick="capturePhoto();" ><div class="innerDiv"><!--i class="f7-icons picbox-text">camera</i><br/--><img src="img/icons/photo-camera-1.png" height="50" width="50" /><br/><span class="picbox-text">Capture</span></span></div></div><div class="col-50 picbox text-white" ><a onclick="getPhoto(pictureSource.PHOTOLIBRARY);"><div class="innerDiv"><!--i class="f7-icons picbox-text">photos</i><br/--><img src="img/icons/gallery.png" height="50" width="50" /><br/><span class="picbox-text">Photo Gallery</span></div></a></div><div class="20"></div></div></div></div></div></div></li><li class="item-content item-input imageblock display-none" style="width:100%;" id="imageblock"><div class="item-inner"><div class="item-input-wrap"><img id="image" src="" style="width:100%;"></div></div></li>';
        var dob = json.edit_pro[0].dob; 
        var gender = json.edit_pro[0].rec_gender;
        if(gender=='Male'){
          var gen_abbvr='M';
        }else if(gender=='Female'){
          var gen_abbvr='F';
        }
        editDiv+='<li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">DOB</div><div class="item-input-wrap"><!--input type="date" name="dob" id="Date of birth" required validate required validate validate data-error-message="DOB shold not be empty." value='+dob+'--><input type="text" placeholder="Select date" id="demo-calendar-modal1" name="dob" required validate data-error-message="DOB shold not be empty." value='+dob+'></div></div></div></li>';
        editDiv+='<li><div class="row"><label class="col-50 item-radio item-content"><input type="radio" name="gender" value="M" '
        if(gen_abbvr=='M'){
          editDiv+='checked';           
        }
        editDiv+=' onchange="getgenderimage(this.value)"/><i class="icon icon-radio"></i><div class="item-inner"><div class="item-title">Male</div></div><span id="male_img">';
        if(gen_abbvr=='M'){
          editDiv+="<img src='img/gender/man.png' height='30' width='30' />";
        }
        editDiv+='</span></label><label class="col-50 item-radio item-content"><input type="radio" name="gender" value="F" '
        if(gen_abbvr=='F'){
          editDiv+='checked';
        }
        editDiv+=' onchange="getgenderimage(this.value)"/><i class="icon icon-radio"></i><div class="item-inner"><div class="item-title">Female</div></div><span id="female_img">';
        if(gen_abbvr=='F'){
          editDiv+="<img src='img/gender/girl.png' height='30' width='30' />";
        }
        editDiv+='</span></label></div></li>';
        var aadhar_no = json.edit_pro[0].rec_aadharno;
        var split_aadhar = aadhar_no.split(" ");
        var aadhar_1 = split_aadhar[0];
        var aadhar_2 = split_aadhar[1];
        var aadhar_3 = split_aadhar[2];
        editDiv+='<li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Aadhar Card No</div><div class="item-input-wrap m-l-35 my-input-wrap"><!--input type="text" name="aadhar_no" placeholder="xxxx xxxx xxxx" onchange="check_aadhar_length(this.value)" maxlength="14" class="e_aadhaar_no" onkeypress="aadhaar_no_val()" onkeyup="check_aadhar(this.value)"--><!--input type="text" name="aadhar_no" placeholder="xxxx xxxx xxxx" class="e_aadhaar_no" onkeyup="add_check_aadhar(this.value)" value="'+aadhar_no+'"--><input type="text" name="aadhar_no1" placeholder="xxxx" class="e_aadhaar_no pull-left aadhar_width"  maxlength="4" onkeyup="setFocus();numericValidation($(this))" id="aadhar_txt1" value='+aadhar_1+'><span class="pull-left dash_span">-</span><input type="text" name="aadhar_no2" placeholder="xxxx" class="e_aadhaar_no pull-left aadhar_width"  maxlength="4" onkeyup="setFocus();numericValidation($(this))" id="aadhar_txt2" value='+aadhar_2+'> <span class="pull-left dash_span">-</span><input type="text" name="aadhar_no3" placeholder="xxxx" class="e_aadhaar_no pull-left aadhar_width"  maxlength="4" id="aadhar_txt3" value='+aadhar_3+' onkeyup="add_check_aadhar();numericValidation($(this))"></div></div></div></li>';
        aadharImg='';
        var aadharPic = json.edit_pro[0].aadhar_photo;
        var aadharpath= base_url+aadharPic;
        if(aadharPic!=''){
          aadharImg+='<li class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Aadhar Card Photo</div><img src='+aadharpath+' height="150" width="280" class="mt-5p img_border"/></div></li>';
        }
        var split_aadharPic = aadharPic.split("/");   
        var aadhar_name = split_aadharPic[2];
        editDiv+=aadharImg+'<input type="hidden" name="old_aadharPic" value="'+aadhar_name+'" /><li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap"><button class="col button button-small button-outline btn_color" type="button" onclick="showIcons_aadhar()">Change Aadhar Photo</button></div></div></li><li class="item-content item-input showtwoBlocks_aadhar display-none"><div class="item-inner"><div class="item-input-wrap"><div class="uploadDiv w-100 display-none"><div class="col-100"><div class="row"><div class="20"></div><div class="col-50 picbox text-white" ><span onclick="capturePhoto_aadhar();" ><div class="innerDiv"><!--i class="f7-icons picbox-text">camera</i><br/--><img src="img/icons/photograph.png" height="50" width="50" /><br/><span class="picbox-text">Capture</span></span></div></div><div class="col-50 picbox text-white" ><a onclick="getPhoto_aadhar(pictureSource1.PHOTOLIBRARY);"><div class="innerDiv"><!--i class="f7-icons picbox-text">photos</i><br/--><img src="img/icons/landscape-1.png" height="50" width="50" /><br/><span class="picbox-text">Photo Gallery</span></div></a></div><div class="20"></div></div></div></div></div></div></li><li class="item-content item-input imageblock display-none" style="width:100%;" id="imageblock"><div class="item-inner"><div class="item-input-wrap"><img id="aadhar_image" src="" style="width:100%;"></div></div></li>';
        var yrofpsing = json.edit_pro[0].rec_year_of_passing;
        var experience = json.edit_pro[0].rec_experience;
        editDiv+='<li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Year of passing</div><div class="item-input-wrap"><input type="text" name="year_passing" id="year_passing" placeholder="Year of passing" value='+yrofpsing+' maxlength="4" onkeyup="numericValidation($(this))"></div></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap input-dropdown-wrap"><select placeholder="EXPERIENCE" name="experience" id="experience"><option value="">SELECT EXPERIENCE</option>';

        editDiv+='<option value="1"'
        if(experience==1){
          editDiv+='selected';
        }
        editDiv+=' >Fresh</option><option value="2"'
        if(experience==2){
          editDiv+='selected';
        }
        editDiv+=' >1 Year</option><option value="3"'
        if(experience==3){
          editDiv+='selected';
        }
        editDiv+=' >2 Year</option><option value="4"'
        if(experience==4){
          editDiv+='selected';
        }
        editDiv+=' >3 Year</option><option value="5"'
        if(experience==5){
          editDiv+='selected';
        }
        editDiv+=' >4 Year</option><option value="6"'
        if(experience==6){
          editDiv+='selected';
        }
        editDiv+=' >5 Year</option><option value="7"'
        if(experience==7){
          editDiv+='selected';
        }
        editDiv+=' >6 Year</option><option value="8"'
        if(experience==8){
          editDiv+='selected';
        }
        editDiv+=' >7 Year</option><option value="9"'
        if(experience==9){
          editDiv+='selected';
        }
        editDiv+=' >8 Year</option><option value="10"'
        if(experience==10){
          editDiv+='selected';
        }
        editDiv+=' >9 Year</option><option value="11"'
        if(experience==11){
          editDiv+='selected';
        }
        var batch_ref = json.edit_pro[0].rec_batch_reference;
        editDiv+=' >10+ Year</option></select></div></div></li><li><div class="item-content item-input"><div class="item-inner"><div class="item-title item-label">Batch Reference</div><div class="item-input-wrap"><input type="text" name="batch_ref" placeholder="Batch Reference" value="'+batch_ref+'"></div></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-input-wrap"><button type="button" class="col button button-fill mt-p-5 save_btn mb-15" name="save" onclick="edit_pro()">SAVE</button></div></div></li></ul>';
      $('#editData').html(editDiv);  
      var calendarModal1 = app.calendar.create({
        inputEl: '#demo-calendar-modal1',
        openIn: 'customModal',
        header: true,
        footer: true,
        dateFormat: 'dd-mm-yyyy',
      });
    }
  });
}
$$(document).on('page:init', '.page[data-name="change_pwd"]', function (e) {
  checkConnection();
  userPicFun();
  app.preloader.show();
  var session_u_name = window.localStorage.getItem("session_u_name"); 
  var sess_u_id = window.localStorage.getItem("session_u_id");
  $("#hidden_uid").val(sess_u_id);
  $("#u_name").html('<span class="text-uppercase">Username : '+session_u_name+'</span>');
  app.preloader.hide();
  $("#retype_pass").keyup(validate);  
});
function validate() {
  var password1 = $("#new_pass").val();
  var password2 = $("#retype_pass").val();
  if(password1 == password2) {
    $("#success-badge").removeClass("display-none");
    $(".unmatch-text").css("display",'none');
    $(".match-text").css("display",'block');
    $(".match-text").text("Passwords match.");        
  }
  else{
    $("#warning-badge").removeClass("display-none");
    $(".match-text").css("display",'none');
    $(".unmatch-text").css("display",'block');
    $(".unmatch-text").text("Passwords do not match!");  
  }    
} 
function changePass(){
  var changePwdForm = $(".changePwdForm").serialize();
  var url=base_url+'app_controller/changePassWord';
  $.ajax({
        'type':'POST', 
        'url':url,
        'data':changePwdForm,
        success:function(response){  
          var res=response.trim();
          if(res){
            if(res == 'updated'){
              app.dialog.alert("Password changed successfully."); 
            }else if(res == 'wrongoldpwd'){
              app.dialog.alert("Entered OldPassword is incorrect.");
            }
          }
        }
  });
  $("#old_pass").val('');
  $("#new_pass").val('');
  $("#retype_pass").val('');
  $(".match-text").css("display",'none');
  $(".unmatch-text").css("display",'none');
  $("#warning-badge").addClass("display-none");
  $("#success-badge").addClass("display-none");
}
// ----------------------------------------- L O G O U T ----------------------------------------- //
function logOut(){
  checkConnection();
  var sess_u_id = window.localStorage.getItem("session_u_id");
  $.ajax({
    'type':'POST',
    'url': base_url+"app_controller/updateLastseen", 
    'data':{'u_id':sess_u_id}, 
    success:function(){}
  });

  $(".popover-backdrop.backdrop-in").css("visibility","hidden");
  $(".popover.modal-in").css("display","none");
  window.localStorage.removeItem("session_u_id");   
  window.localStorage.removeItem("session_u_name");
  window.localStorage.removeItem("session_mobile");
  window.localStorage.removeItem("session_u_fullname");
  window.localStorage.removeItem("session_u_type");   
  window.localStorage.removeItem("session_u_image");
  window.localStorage.removeItem("session_u_created");
  window.localStorage.removeItem("session_u_lastlogin");
  window.localStorage.removeItem("session_u_email");
  app.router.navigate('/');
  app.panel.close();
  app.panel.destroy();  
}
// ----------------------------------------- DYNAMIC NAVBAR --------------------------------------- //
/*function loadNavbar(clickedtext){
  var sess_u_id = window.localStorage.getItem("session_u_id");//alert(sess_u_id); 
  var pagename='';
  if(sess_u_id!=null){
    pagename=clickedtext;
  }
  var nav='';
  nav+='<div class="navbar inner-header"><!-- Additional "sliding" class --><div class="navbar-inner sliding"><div class="left "><a class="link panel-open" href="#" data-panel="left" onclick="openPanel()"><i class="f7-icons size-22 orange-text leftbars">bars</i></a></div><div class="title text-uppercase orange-text">'+pagename+'</div><div class="right"><!-- <a class="link popover-open" href="#" data-popover=".popover-links" ><i class="f7-icons size-22 orange-text">more_vertical</i></a>  --><span class="u_pic"></span></div></div></div>';
}*/
/*function loadFooter(){
  var footer='';
  footer+='<div class="toolbar toolbar-bottom-md footer-bg inner-footer"><div class="toolbar-inner"><a class="link"></a><div class="link orange-text text-capitalize ">powered by &nbsp; <span class="fa fa-star gly-spin "></span><a class="link external orange-text text-uppercase linkspace" href="http://staroneweb.co.in" target="_system"> star one web</a></div><a class="link"></a></div></div>';
  $("#footer").html(footer);
}*/