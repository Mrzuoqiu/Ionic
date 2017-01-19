angular.module('lyy',['ionic'])
  .run(function ($rootScope,$state,$stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

})
  .config(function ($stateProvider,$urlRouterProvider) {
  //在这个里面设置路由
})
.controller('listCtrl',function ($scope) {
  $scope.items = [];
  for(var i = 0;i<50;i++){
    $scope.items.push(['this is line',i].join(""));
  }
})
.controller('resh',function ($scope) {
  $scope.items = [];
  var base = 1;
  $scope.doRefresh = function () {
    for(var i = 0; i < 10; i++, base++){
      $scope.items.unshift(['items ',base].join(""));
    }
    //要通知控制器
    $scope.$broadcast('scroll.refreshComplete');
  }
})
  .controller('scrollCtrl',function ($scope,$timeout) {
    $scope.items = [];
    var base = 1;



      $scope.more = function () {
        $timeout(function () {
        for (var i = 0; i < 10; i++, base++) {
          $scope.items.push(['items ', base].join(""));
        }
        //要通知控制器

        $scope.$broadcast('scroll.infiniteScrollComplete');


      },1000)

    }

  })
  .controller('tabCtrl',function ($scope) {
    $scope.do = function () {
      alert(1);
    }
  })
  .controller('allCtrl',function ($scope) {
    $scope.items = ['中国','日本','泰国','新加坡','澳大利亚','韩国'];
    //设置两个默认值
    $scope.data = {
      showDelete:false,
      showReorder:false
    }


    $scope.delete_item = function (value) {
      var index = $scope.items.indexOf(value);
      $scope.items.splice(index,1);
    }
    $scope.move_item = function(item, fromIndex, toIndex) {
      $scope.items.splice(fromIndex, 1);
      $scope.items.splice(toIndex, 0, item);
    };
  })

  .controller('radio',function ($scope) {
    $scope.items = ['html5','css3','php7'];
    $scope.ret = {choices:'css3'};
  })
  .controller('check',function ($scope) {
    $scope.items = [
      {label:'html5',selected:'true'},
      {label:'css3'},
      {label:'php5'}
    ]
  })
  .controller('modal',function ($scope,$ionicModal) {
    $ionicModal.fromTemplateUrl('my-modal.html',{
      scope:$scope,
      animation:'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    })
    $scope.openModal = function () {
      $scope.modal.show();
    }
    $scope.closeModal = function () {
      $scope.modal.hide();
    }
  })
  .controller('slideup',function ($scope,$ionicActionSheet) {
    $scope.show = function () {
      $ionicActionSheet.show({
        titleText:'当前的文章操作',
        buttons:[
          {text:"分享给朋友圈"},
          {text:"移动到....0.0"}
        ],
        //自定义按钮如何绑定自定义的回调函数
        buttonClicked:{
          //执行一些自定义的按钮的回调函数
        },
        cancelText:'取消'
      })
    }
  })
  .controller('layerCtrl',function ($scope,$ionicPopup,$timeout) {
    $scope.showPopup = function () {
      $scope.data = {};
      var myPopup = $ionicPopup.show({
        template:'<input type="password" ng-model="data.bank">',
        title:'确认银行密码',
        subTitle:'0.0',
        scope:$scope,
        buttons:[
          {text:'Cancel'},
          {
            text:'<b>SAVE</b>',
            type:'button-positive',
            onTap:function (e) {
              if(!$scope.data.bank){
                e.preventDefault();
              }else {
                return $scope.data.bank;
              }
            }
          },
        ]
      });
      myPopup.then(function (res) {
        console.log('Tapped!',res);
      });
      $timeout(function () {
        myPopup.close();
      },3000);

    };
    $scope.showConfirm = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Consume Ice Cream',
        template: 'Are you sure you want to eat this ice cream?'
      });
      confirmPopup.then(function (res) {
        if(res){
          console.log('you are sure');
        }else {
          console.log('you are not sure');
        }
      })
    };

    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Don\'t eat that!',
        template: 'It might taste good'
      });
      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
    $scope.showPrompt = function () {
      var promptPopup = $ionicPopup.prompt({
        title: '提示弹出框',
        template: '我可以给你个提示-.-?'

      });
      promptPopup.then(function (res) {
        if(res){
          console.log('提示有用');
        }else {
          console.log('别云剑0.0');
        }
      })
    }


  })

