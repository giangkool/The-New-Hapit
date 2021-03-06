var webtabcontroller = angular.module('webtab.controller', ['ngRoute','ngStorage','geolocation','angular-md5','webtab.Service']);

webtabcontroller.controller('WebCtrl', function ($rootScope, $scope,md5, $localStorage, $timeout,apiService,TaskService) {
    var auth = window.localStorage.getItem('auth');
    $scope.Auth = JSON.parse(auth);
    
     if (!auth) {
            window.location.href = '#/login';
            return;
        }

        
        $scope.logout = function(){
            window.localStorage.clear();
            window.location.href = '#/login';
            window.location.reload(true);
        };

        $scope.uptask=function(){
            $scope.showsave=true;
            $scope.up=true;
            $scope.updatetask=true;
        }
        $scope.closeupdatetask=function(){
            $scope.showsave=false;
            $scope.up=false;
            $scope.updatetask=false;
            $scope.hidemore();
        }
        //get day time
        $scope.date =  new Date();
        $scope.tickInterval = 1000 //ms
        var tick = function() {
            $scope.clock = Date.now()
            $timeout(tick, $scope.tickInterval);
        }
        $timeout(tick, $scope.tickInterval);
        TaskService.postGetAll($scope.Auth.Email).then(function(response){
                $scope.getdt=response.data;
                 if (response.data.length==0)  {$scope.homepage=true; $scope.showalltask=false;}
             else 
                {$scope.showalltask=true;
                 $scope.showtask(); 
                 $scope.homepage=false;
            }
            })
        
        $scope.showcreate=false;
        //show create new task
        $scope.createtask=function(){
            $scope.showalltask=false;
            $scope.showcreate=true;
            $scope.homepage=false;
            $scope.account=false;
            $scope.showchange=false;
            $scope.showprofile=false;
            $scope.showupprofile=false;
        }
        //show every task

        $scope.getindex=function(xpa){
            $scope.closeupdatetask();
            console.log($scope.upfinish);
            for (var i=0;i<$scope.getdata.length;i++){
                if (xpa==i) {
                $scope.getdata_every=$scope.getdata[i];  
                var s ='';
                for (var j=0;j<$scope.getdata_every.List_tags.length-1;j++)
                    s=s+$scope.getdata_every.List_tags[j].Name+', ';
                    s=s+$scope.getdata_every.List_tags[$scope.getdata_every.List_tags.length-1].Name;
                    console.log(s);
                    $scope.stringgg=s;
                }
            }
        
        }
            
          
        
        
        //show all task
        $scope.showtask=function(){
            $scope.showalltask=true;
            $scope.showcreate=false;
            $scope.homepage=false;
            $scope.account=false;
            $scope.showchange=false;
            $scope.showprofile=false;
            $scope.showupprofile=false;
            TaskService.postGetAll($scope.Auth.Email).then(function(response){
                console.log(response.data);
                $scope.getdata=response.data;
                // document.getElementsByClassName("profit").style.color="green";
            })
           
        }
        //button cancel
        $scope.cancel = function(){
            $scope.showalltask=true;
            $scope.showcreate=false;
            window.reload(true);
        }
        //profile
        $scope.account=false;
        $scope.change_account=function(){
            $scope.showalltask=false;
            $scope.showcreate=false;
            $scope.homepage=false;
            $scope.account=true;
            $scope.showchange=false;
            $scope.showprofile=false;
            $scope.showupprofile=false;
        }
        $scope.view1=function(){
            window.href="#";
        }
        //show homepage
        
        $scope.linkhome=function(){
            $scope.homepage=true;
            if ($scope.getdata.length==0) $scope.Beginer= true;
            else $scope.Beginer=false;
            $scope.Beginer=true;
            $scope.showcreate=false;
            $scope.showalltask=false;
            $scope.account=false;
            $scope.showchange=false;
            $scope.showprofile=false;
            $scope.showupprofile=false;
        }
        //view more
        $scope.morehide=true;   
        $scope.more=false;
        $scope.hide=false;
        $scope.viewmore=function(){
            $scope.more=true;
            $scope.morehide=false;
            $scope.hide=true;
        }
        $scope.hidemore=function()
        {
            $scope.more=false;
            $scope.hide=false;
            $scope.morehide=true;
        }
         $scope.getPriority = function (int)
        {
            for (var i=0;i<=$scope.getdata.length;i++){
                if (int==i) $scope.getdata_Priority=$scope.getdata[i];  
            }  
            if ($scope.getdata_Priority.Priority=="None") return 1;
            if ($scope.getdata_Priority.Priority=="Normal") return 2;
            if ($scope.getdata_Priority.Priority=="Important") return 3;
            return $scope.getdata_Priority.Priority;

        }
	//checkbox effect
        $scope.check = function (ind){
              
              for (var i=0;i<=$scope.getdata.length;i++){
                if (ind==i) $scope.getdata_task=$scope.getdata[i];  
            }  
         
               
            if ($scope.checkboxModel[ind]==true)
            {
                document.getElementById("profitClose_"+ind).style.filter='grayscale(0%)';
            }
            else 
            { 
                document.getElementById("profitClose_"+ind).style.filter='grayscale(100%)';
                 TaskService.postUpdate($scope.Auth.Email, $scope.getdata_task.Task_Name, $scope.getdata_task.Discription, $scope.getdata_task.Privacy, $scope.getdata_task.Priority, $scope.getdata_task.Tags, $scope.getdata_task.Assigned_Users, $scope.getdata_task.Start_Date, $scope.getdata_task.Due_Date, 1).then(function(response){
                 console.log(response.data); 
                })

            }
        }

        $scope.checkboxModel = {
        value : false
        }
        //show change password
        $scope.showchange=false;
        $scope.changepw=function(){
            $scope.showchange=true;
            $scope.account=false;
            $scope.homepage=false;
            $scope.showcreate=false;
            $scope.showalltask=false;
            $scope.showprofile=false;
            $scope.showupprofile=false;
        }
        //my profile
        
        $scope.profile=function(){
            $scope.showprofile=true;
            $scope.account=false
            $scope.homepage=false;
            $scope.showcreate=false;
            $scope.showalltask=false;
            $scope.showupprofile=false;
        }
        //update profile
        $scope.updateprofile=function(){
            $scope.showchange=false;
            $scope.account=false;
            $scope.homepage=false;
            $scope.showcreate=false;
            $scope.showalltask=false;
            $scope.showprofile=false;
            $scope.showupprofile=true;
            $scope.nullpass=false;
            $scope.wrongpass=false;
            $scope.warn=false;
        }
        //check validate
        $scope.pw=[];
                $scope.pw.old = "";
                $scope.pw.new = "";
                $scope.pw.confirm = "";

        $scope.error_oldpw=false;
        $scope.error_newpw=false;
        $scope.error_confirmpw=false;
        //button cancel change password
        $scope.exit_changepw=function()
        {
               window.location.reload(true);
                $scope.showchange=false;
                $scope.account=true;
        }

        //button save change password
        $scope.save_change=function(pw){
           
            //check empty old password
            if ($scope.pw.old == "")
            {
                $scope.error_checkempty_old=true;
            }
            else {
                $scope.error_checkempty_old=false;
            }
            //check empty new password
            if ($scope.pw.new == "")
            {
                $scope.error_checkempty_new=true;
                $scope.error_checklength=false;
            }
            else {
                $scope.error_checkempty_new=false;
            }
            //check empty confirm password
            if ($scope.pw.confirm == "")
            {
                $scope.error_checkempty_confirm=true;
                $scope.error_confirmpw=false;
            }
            else {
                $scope.error_checkempty_confirm=false;
            }
            //check length new password
            if ($scope.pw.new.length < 6 && $scope.pw.new!=""){
                $scope.error_checklength=true;
                $scope.error_confirmpw=false;
            }
            else{
                 $scope.error_checklength=false;
            }
            
            if ($scope.error_checkempty_old==false && $scope.error_checkempty_new==false && $scope.error_checkempty_confirm==false ){
                var rsa_oldpw = md5.createHash(pw.old);
                var rsa_newpw = md5.createHash(pw.new);

            if (pw.new!=pw.confirm) {
                $scope.error_confirmpw=true;
            }
            else if($scope.error_checklength==false){
             apiService.postChangePw($scope.Auth.Email,rsa_oldpw,rsa_newpw).then(function (response) {
                $scope.result = response.data;
                 if ($scope.result._error_code == '03')
                 {
                     $scope.error_oldpw=true;
                 }
                 else {
                       $scope.error_oldpw=false;
                 }
                 if ($scope.result._error_code=='00'){
                     alert('Succesfull');
                     window.location.reload(true);
                     $scope.showchange=false;
                     $scope.account=true;
                     
                 }

                 $scope.error_confirmpw=false;
                 console.log(response.data);
            })
            }}
            
            
        }
        $scope.nt=[];
        $scope.nt.taskname="";
                    var arr = new Array();
                    var arr_2 = new Array();
            $scope._tags=[];         
                    $("#tags_1_tag").on("keydown",function search(e) {
                        if(e.keyCode == 13) {
                            arr.push({ Name : $(this).val()}); 
                            var abx =JSON.stringify(arr);
                        }
                        $scope._tags = abx;
                    });
            $scope._assigned_user=[];
                    $("#tags_2_tag").on("keydown",function search(e) {
                        if(e.keyCode == 13) {
                            arr_2.push({ Mail : $(this).val()}); 
                            var abx =JSON.stringify(arr_2);
                        }
                        $scope._assigned_user = abx;
                    });
                   
        $scope.add_newtask=function(nt){
            if($scope.nt.taskname!="")
            {
                 console.log($scope._tags,$scope._assigned_user);
                var startdate=$('#dp1').val();
                var duedate=$('#dp2').val();
                var assigned=$scope._assigned_user;
                var tags=$scope._tags;
                var ar_assigned=[];

                TaskService.postCreate($scope.Auth.Email,nt.taskname,nt.discription,nt.privacy,nt.priority,tags,assigned,startdate,duedate).then(function(response){
                    alert=("Completed");
                    $scope.showcreate=false;
                    $scope.homepage=true;
                    console.log(response.data);
                     if ($scope.getdata.length==0) $scope.Beginer= true;
            else $scope.Beginer=false;
                })
            }
        }
        function clear(){
            document.getElementById("pf1").value = "";
            document.getElementById("pf2").value = "";
            document.getElementById("birthday").value = "";
            document.getElementById("pf4").value = "";
            document.getElementById("pf5").value = "";
            document.getElementById("pf6").value = "";
            document.getElementById("pf7").value = "";

        }
        $scope.save_updateprofile=function(pf){
            
            if(!pf||pf.password=="") 
            {$scope.wrongpass=false;
                $scope.warn=true;    
            }else {
                $scope.warn=false;
                $scope.nullpass=false;
                
            var rsa_pw = md5.createHash(pf.password);
            var birthday = $('#birthday').val();
            if (!pf.name) pf.name=$scope.Auth.Fullname;
            if (!birthday) birthday=$scope.Auth.Birthday;
            if (!pf.sex) pf.sex=$scope.Auth.Sex;
            if (!pf.mobile) pf.mobile=$scope.Auth.Mobile;
            if (!pf.address) pf.address=$scope.Auth.Address;
            if (!pf.personalId) pf.personalId=$scope.Auth.PersonalId;

            
                

           apiService.postUpdatePf($scope.Auth.Email,rsa_pw,pf.name,birthday,pf.sex,pf.mobile,pf.address,pf.personalId).then(function (response) {
                  if (response.data._error_code=='00'){
                  window.localStorage.setItem('auth', JSON.stringify(response.data));
                  $scope.profilereturn = response.data;
                  $scope.showupdate = true ;
                  $scope.profile();
                  console.log($scope.profilereturn);
                  $scope.upagain=true;
                 clear();
                  }
                  if (response.data._error_code=="03"){
                      $scope.updateprofile();
                      $scope.wrongpass= true;
                      $scope.warn=false;
                  }

            })

            
        }
            
        }
          $scope.Delete = function(gettask)
         {
            console.log($scope.Auth.Email);
            TaskService.postDelete($scope.Auth.Email,gettask.Task_Name).then(function(response){
                     window.location.reload(true);
                                })
         
         }

       //update task
       $scope.EditTask = function (ed) {
           
           var startdate = $('#dp3').val();
           var duedate = $('#dp4').val();
           var assigned = $scope.getdata_every.List_assigned;
           var tags = $scope.getdata_every.List_tags;
           
           if (!startdate) startdate=$scope.getdata_every.Start_Date;
           if (!duedate) duedate=$scope.getdata_every.Due_Date;
           if(!ed) {
           var tamp=$scope.getdata_every.Discription;
           var tamp1=$scope.getdata_every.Privacy;
           var tamp2=$scope.getdata_every.Priority;
           TaskService.postUpdate($scope.Auth.Email, $scope.getdata_every.Task_Name, tamp, tamp1, tamp2, $scope.getdata_every.List_tags, $scope.getdata_every.List_assigned, startdate, duedate, $scope.getdata_every.Status).then(function(response){
              window.localStorage.setItem('getdata_every', JSON.stringify(response.data));
              $scope.upfinish=response.data;
              window.location.reload(true);
              console.log(response.data); })
           }else{
           if (!ed.discription) ed.discription=$scope.getdata_every.Discription;
           if (!ed.privacy) ed.privacy=$scope.getdata_every.Privacy;
           if (!ed.priority) ed.priority=$scope.getdata_every.Priority;
           TaskService.postUpdate($scope.Auth.Email, $scope.getdata_every.Task_Name, ed.discription, ed.privacy, ed.priority, $scope.getdata_every.List_tags, $scope.getdata_every.List_assigned, startdate, duedate, $scope.getdata_every.Status).then(function(response){
              window.localStorage.setItem('getdata_every', JSON.stringify(response.data));

              $scope.upfinish=response.data;
              window.location.reload(true);
              console.log(response.data); })
           }
           
       }
        
       
})
webtabcontroller.controller('LoginCtrl', function($scope, $localStorage, geolocation, md5, apiService){
        window.localStorage.clear();
        // get location
        geolocation.getLocation().then(function(data){
            $scope.lat = data.coords.latitude;
            $scope.long = data.coords.longitude;
        });

        $scope.getgeo = function(){
            $scope.coords = {lat:$scope.lat, long:$scope.long};
            return $scope.coords;
        };

       //get data from login form 
        $scope.islogin = true;
        $scope.login = function(data){
            if(data.username && data.password){
                var rsapassword = md5.createHash(data.password);
                apiService.postLogin(data.username, rsapassword).then(function (response) {
                    $scope.result = response.data;
                    if($scope.result.Email){
                        window.localStorage.setItem('auth', JSON.stringify(response.data));
                        console.log(response.data);
                        window.location.href = '#/home';
                        window.location.reload(true);
                    }
                    else if($scope.result._error_code == '04'){
                        alert($scope.result._error_messenger);
                        $scope.isexpired = true;
                        $scope.islogin=false;
                        $scope.ischangepw=true;
                        $scope.isregister=false;
                        console.log(response.data);
                    }
                    else{
                        $scope._error = true;
                          console.log(response.data);
                    }
                    
                });
            }
        };

        //show or hide form
        $scope.show = function(){
            $scope.isregister = true;
            $scope.islogin=false;
        }
        $scope.hide = function(){
            $scope.islogin = true;
            $scope.isregister=false;
        }
        
            $scope.rdata=[];
            $scope.rdata.username="";
        //get data from register form
       function isEmail(email) {
   var isValid = false;
   var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(regex.test(email)) {
    isValid = true;
   }
   return isValid;
  }

         $scope.forgotpw=function(pw){
             var password= md5.createHash("123456");
             console.log(password);
             if(isEmail($scope.pw.email))
             {
                  apiService.postForgot($scope.pw.email,password).then(function(response){
                   $scope.result=response.data;
                   console.log($scope.result);
                   if($scope.result._error_code=='00')
                   {
                        $scope.forgotok = true;
                        $scope.forgotfalse=false;
                   }
                   else{
                       $scope.forgotok = false;
                        $scope.forgotfalse=true;
                   }
                    
                  })
         }}
       



         $scope.register = function(rdata){


            console.log($scope.rdata.username);
            if(isEmail(rdata.username)){
            if(rdata.username.length>=6 && rdata.password.length>=6 && rdata.fullname && rdata.mobile.length>=10)
            {            

                var rsapassword =md5.createHash(rdata.password);
                apiService.postRegister(rdata.username, rsapassword, rdata.fullname, rdata.mobile).then(function(response){
                    $scope.resultR = response.data;
                    if($scope.resultR._error_code == '00')
                    {
                        
                        $scope.registerok = true;
                        $scope.registerfalse=false;
                        $scope.registerfalse1=false;
                        $scope.registerfalse2=false;
                    } 
                    else{
                        $scope.registerfalse = true;
                        $scope.registerok=false;
                        $scope.registerfalse1=false;
                        $scope.registerfalse2=false;
                    }   
                });
                // $scope.hide();
            }
            else{
                $scope.registerfalse1 = true;
                $scope.registerfalse = false;
                $scope.registerok=false;
                $scope.registerfalse2=false;
                $scope.resultR="Please complete the blank!"
            
         }}
         else {
         $scope.registerfalse2=true;
         $scope.registerfalse1 = false;
         $scope.registerfalse = false;
         $scope.registerok=false;
         $scope.resultR="This is not an Email!";
            }
       }
        $scope.pw=[];
                $scope.pw.old = "";
                $scope.pw.new = "";
                $scope.pw.confirm = "";

        $scope.error_oldpw=false;
        $scope.error_newpw=false;
        $scope.error_confirmpw=false;
        //change password if > 30days
        $scope.change_pw_again=function(pw){
            console.log($scope.data.username);
            //check empty old password
            if ($scope.pw.old == "")
            {
                $scope.error_checkempty_old=true;
            }
            else {
                $scope.error_checkempty_old=false;
            }
            //check empty new password
            if ($scope.pw.new == "")
            {
                $scope.error_checkempty_new=true;
                $scope.error_checklength=false;
            }
            else {
                $scope.error_checkempty_new=false;
            }
            //check empty confirm password
            if ($scope.pw.confirm == "")
            {
                $scope.error_checkempty_confirm=true;
                $scope.error_confirmpw=false;
            }
            else {
                $scope.error_checkempty_confirm=false;
            }
            //check length new password
            if ($scope.pw.new.length < 6 && $scope.pw.new!=""){
                $scope.error_checklength=true;
                $scope.error_confirmpw=false;
            }
            else{
                 $scope.error_checklength=false;
            }
            
            if ($scope.error_checkempty_old==false && $scope.error_checkempty_new==false && $scope.error_checkempty_confirm==false ){
                var rsa_oldpw = md5.createHash(pw.old);
                var rsa_newpw = md5.createHash(pw.new);

            if (pw.new!=pw.confirm) {
                $scope.error_confirmpw=true;
                $scope.error_oldnew = false;
            }
            else if($scope.error_checklength==false){
             apiService.postChangePw($scope.data.username,rsa_oldpw,rsa_newpw).then(function (response) {
                $scope.result = response.data;
                 if ($scope.result._error_code == '03')
                 {
                     $scope.error_oldpw=true;
                     $scope.error_oldnew = false;
                 }
                 else {
                       $scope.error_oldpw=false;
                 }
                 if ($scope.result._error_code=='00'){
                     $scope.error_oldnew = false;
                     $scope.error_oldpw=false;
                     $scope.error_confirmpw=false;
                     alert('Succesfull');
                     window.location.reload(true);
                     $scope.showchange=false;
                     $scope.account=true;
                    
                     
                 }
                  if($scope.result._error_code =='05')
                 {
                   $scope.error_oldnew = true;
                   $scope.OldNew = $scope.result._error_messenger;
                 }

                 $scope.error_confirmpw=false;
                 console.log(response.data);
            })
            }}
            
            
        }



})
       
