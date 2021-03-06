<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<script type="text/javascript"src="/resources/javaScript/jQuery/jquery-1.8.3.min.js"></script>
	<script type="text/javascript"src="/resources/javaScript/angular/angular.min.js"></script>
<div align="center" style="min-height: 200px;padding-top: 50px; padding-left: 50px; min-width: 400px;max-width: 990px;"
	ng-app="shoppingCartApp" ng-controller="shoppingCartListController">
	<table width="100%">
		  <thead style="background-color: gray;color: white;">
	  		<th align="left"></th>
	  		<th align="center">商品信息 </th>
	  		<th align="left">单价/元 </th>
	  		<th align="left">数量 </th>
	  		<th align="left">金额/元</th>
	  		<th align="left">操作 </th>
	  	 </thead>
	  	 <tbody ng-repeat="groupItem in shopCartGroups">
	  	 	<tr ng-bind="groupIndex=$index" style="display:none"></tr>
	  	 	<tr>
			    <th align="left" colspan="6">
			    	<input type="checkbox" checked="checked" ng-model="shopCartGroups[groupIndex].selected" 
			    		ng-click="sellerChecked(groupIndex)">
			    	<strong>卖家：{{groupItem.sellerName}}</strong>  
			    	<strong><font color="red">优惠策略：</font></strong>{{groupItem.discountStrategyDesc}}
			    </th>
			 </tr>
		    <tr ng-repeat="item in groupItem.cartList">
		    <td align="left"><input type="checkbox" checked="checked" ng-model="item.selected" ng-click="caculAmount()"></td>
		    <td>
				<table>
				  <tr>
				    <td>
				    	<a href="/product/{{item.sku.id}}" target="_blank">
				    		<img alt="" src="{{item.sku.url}}">
				    	</a>
				    </td>
				    <td>
				    	品牌:<strong>{{item.sku.brand}}</strong> <br>
				    	销售单位:<strong>{{item.sku.unit}}</strong><br>
				    	<strong>{{item.sku.title}}</strong>
				    </td>
				  </tr>
				</table>
			</td>
		    <td align="left">
		    	<strong>{{item.cart.currentPrice}}</strong><br>
		    	<strong><span style="text-decoration:line-through;">{{item.cart.originalPrice}}</span></strong>
		    </td>
		    <td>
		    	<a href="#" ng-click="reduce(groupIndex,$index)">-</a>
		    	<input type="text" value="{{item.cart.qty}}"  style="max-width: 40px;">
		    	<a href="#" ng-click="add(groupIndex,$index)">+</a>
		    </td>
		    <td>
		    	<strong>{{item.totalAmount}}</strong><br>
		    	<strong><span style="text-decoration:line-through;">{{item.totalOrignAmount}}</span></strong>
		    </td>
		    <td>
		    	<a href="#" ng-click="del(groupIndex,$index)">删除</a>
		    </td>
		    </tr>
	  	</tbody>
	  	<tfoot style="background-color: gray;color: white;">
		  	<th align="left">
		  		<input type="checkbox" checked="checked" ng-model="allSelected" 
			    		ng-click="checkedAll()">全选
	  		</th>
	  		<th align="left">
	  			<a href="#" style="color: white;cursor: pointer;" ng-click="deleteSelected()">删除选择商品</a>
	  		</th>
	  		<th align="left">已选择{{selectSkuCount}}件商品 </th>
	  		<th align="left">
	  			<strong>商品总金额(不含运费)：</strong>￥{{totalOrignAmount}}<br>
	  			<strong>优惠金额：</strong>￥{{totalAmount}}<br>
	  			<font color="red"><strong>需支付金额：</strong>￥{{needPayAmount}}</font>
	  		</th>
	  		<th align="left" colspan="2">
	  			<a href="#">
	  				<div style="background-color: red;color: white;min-width: 100px;min-height: 80px;" align="center">
	  					<h2>去结算</h2>
	  				</div>
	  			</a>
	  		</th>
		</tfoot>
	</table>
</div>

<script type="text/javascript">
   angular.module('shoppingCartApp', [])
      .controller('shoppingCartListController', function($scope,$http) {      	
   	 
   	   $scope.init = function() {
           $scope.shopCartGroups = ${shopCartJson};
           angular.forEach($scope.shopCartGroups, function(data) {
    		   data.selected = true;
			   angular.forEach(data.cartList, function(datai) {
				   datai.selected = true;
    		   });
		   });
       };
       $scope.caculAmount = function() {
           $scope.totalOrignAmount = 0.0000;
           $scope.totalAmount = 0.0000;
           $scope.selectSkuCount = 0;
           $scope.needPayAmount = 0.0000;
           angular.forEach($scope.shopCartGroups, function(data){
        	   angular.forEach(data.cartList, function(datai) {
				   if(datai.selected == true) {
					   $scope.selectSkuCount += datai.cart.qty;
		        	   $scope.totalOrignAmount = $scope.totalOrignAmount + datai.totalOrignAmount;
		        	   $scope.totalAmount = $scope.totalAmount + datai.totalAmount;
				   }
    		   });
           });
           $scope.needPayAmount = $scope.totalOrignAmount - $scope.totalAmount;
           $scope.needPayAmount = $scope.needPayAmount.toFixed(2);
       };
       $scope.initData = function(data) {
    	   $scope.shopCartGroups = data;
    	   angular.forEach($scope.shopCartGroups, function(data) {
    		   data.selected = true;
			   angular.forEach(data.cartList, function(datai) {
				   datai.selected = true;
    		   });
		   });
    	   $scope.caculAmount();
       }
       $scope.init();
       $scope.caculAmount();
       $scope.allSelected = true;
       $scope.checkedAll = function() {
    	   if($scope.allSelected == true) {
    		   angular.forEach($scope.shopCartGroups, function(data) {
        		   data.selected = true;
    			   angular.forEach(data.cartList, function(datai) {
    				   datai.selected = true;
        		   });
    		   });
    	   } else {
    		   angular.forEach($scope.shopCartGroups, function(data) {
        		   data.selected = false;
    			   angular.forEach(data.cartList, function(datai) {
    				   datai.selected = false;
        		   });
    		   });
    	   }
    	   $scope.caculAmount();
       }
       $scope.sellerChecked = function(groupIndex) {
    	   console.log(groupIndex);
    	   console.log($scope.shopCartGroups[groupIndex]);
    	   console.log($scope.shopCartGroups[groupIndex].selected);
    	   if($scope.shopCartGroups[groupIndex].selected == true) {
    		   angular.forEach($scope.shopCartGroups[groupIndex].cartList, function(data) {
    			   data.selected = true;
    		   });
    	   } else {
    		   angular.forEach($scope.shopCartGroups[groupIndex].cartList, function(data) {
    			   data.selected = false;
    		   });
    	   }
    	   $scope.caculAmount();
       }
       
   	   $scope.reduce =function(groupIndex, index){
   		   //alert("reduce "+groupIndex+" "+index);
   		   if($scope.shopCartGroups[groupIndex].cartList[index].cart.qty > 0) {
   				$scope.shopCartGroups[groupIndex].cartList[index].cart.qty = $scope.shopCartGroups[groupIndex].cartList[index].cart.qty - 1;
	   			$http({
		   			method:'PUT',
		   			url:"/shoppingCart/add",
		   			params:{pid: $scope.shopCartGroups[groupIndex].cartList[index].cart.skuId, num: $scope.shopCartGroups[groupIndex].cartList[index].cart.qty}
	   			}).success(function(data){
	   				$scope.initData(data);
	   			});
   		   }
   	   }
       $scope.add =function(groupIndex, index){
    	  //alert("add "+groupIndex+" "+index);
    	   $scope.shopCartGroups[groupIndex].cartList[index].cart.qty = $scope.shopCartGroups[groupIndex].cartList[index].cart.qty + 1;
    	   $http({
	   			method:'PUT',
	   			url:"/shoppingCart/add",
	   			params:{pid: $scope.shopCartGroups[groupIndex].cartList[index].cart.skuId, num: $scope.shopCartGroups[groupIndex].cartList[index].cart.qty}
  			}).success(function(data){
  				$scope.initData(data);
   			});
   	   } 
       $scope.del =function(groupIndex, index){
    	   //alert("del "+groupIndex+" "+index);
    	   $http({
	   			method:'GET',
	   			url:"/shoppingCart/del",
	   			params:{"sid": $scope.shopCartGroups[groupIndex].cartList[index].cart.id}
  			}).success(function(data){
  				$scope.initData(data);
   			});
  	   } 
       $scope.deleteSelected = function() {
    	   var selectIds = [];
    	   var i = 0;
    	   angular.forEach($scope.shopCartGroups, function(data) {
			   angular.forEach(data.cartList, function(datai) {
				   if(datai.selected == true) {
					   selectIds[i] = datai.cart.id;
					   i = i+1;
				   }
    		   });
		   });
    	   if(selectIds.length > 0) {
    		   $http({
   	   			method:'POST',
   	   			url:"/shoppingCart/del",
   	   			params:{"sids": selectIds}
     			}).success(function(data){
     				$scope.initData(data);
      			});
    	   } else {
    		   alert("请先选择需要删除的商品！");
    	   }
       }
      });
</script>