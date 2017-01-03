angular.module('webtab.Service', [])
.factory('apiService', function ($http) {
        // var dev_api_gateway_url ='http://localhost:56173/Auth/hapit/';
        var pro_api_gateway_url ='http://210.211.116.19:2111/Auth/hapit/';
        var parameter;
        var url;
        var contents = [];
        return{
            postLogin: function(username, password){
                parameter ='&email='+ username +'&password='+ password;
                // url = dev_api_gateway_url+ 'Login?';
                url = pro_api_gateway_url+ 'Login?';
                return $http.post(url + parameter);
            },
            postRegister: function(username, password, fullname, mobile){
                parameter = '&email='+ username +'&password='+ password +'&fullname='+ fullname +'&mobile='+ mobile;
                // url = dev_api_gateway_url+ 'Register?';
                url = pro_api_gateway_url+ 'Register?';
                return $http.post(url + parameter);
            },
            postChangePw : function (email, oldpassword, newpassword){
                parameter ='&email='+ email +'&old_password='+ oldpassword+'&new_password='+newpassword;
                url = pro_api_gateway_url+ 'expired?';
                return $http.post(url + parameter);
            },
            postUpdatePf : function ( email, password, fullname, birthday, sex, mobile, address, personalId){
                parameter ='&email='+ email + '&password='+ password +'&fullname='+fullname+ '&birthday='+ birthday +'&sex=' + sex +'&mobile=' + mobile +'&address=' + address +'&personalId=' +personalId;
                url = pro_api_gateway_url+ 'UpdateProfile?';
                return $http.post(url + parameter);
            }
        }
})
