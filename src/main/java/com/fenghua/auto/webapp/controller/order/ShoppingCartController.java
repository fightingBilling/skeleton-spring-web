package com.fenghua.auto.webapp.controller.order;

import java.util.ArrayList;
import java.util.List;

import javax.security.sasl.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.fenghua.auto.backend.core.utills.UserSecurityUtils;
import com.fenghua.auto.order.service.ShoppingCartService;
import com.fenghua.auto.order.vo.ShoppingCartGroupVO;

/** 
  *<des> 
  * 购物车
  *</des>
  * @author  zhiyuan.wang@auto007.com
  * @date 2015年11月26日
  * @version 1.0
  */
@Controller
@RequestMapping("/shoppingCart")
public class ShoppingCartController {
	
	@Autowired
	private ShoppingCartService shoppingCartService;
	
	@RequestMapping(value="/list", method=RequestMethod.GET)
	public String list(Model model) throws AuthenticationException{
		List<ShoppingCartGroupVO> list = shoppingCartService.loadByBuyerId(UserSecurityUtils.getCurrentUserId());
//		model.addAttribute("shopCartGroupList",list);
		if(list == null || list.isEmpty()) {
			model.addAttribute("shopCart","empty");
		}
		String json = JSON.toJSONString(list);
		model.addAttribute("shopCartJson",json);
		return "web.order.shoppingCart_list";
	}

	@RequestMapping(value="/add", method=RequestMethod.GET)
	public String add(Model model,
			@RequestParam(value="pid", required=true) Long pid,
			@RequestParam(value="num", required=true) int num) throws AuthenticationException{
		boolean addOk = false;
		if(pid != null && pid > 0 && num > 0) {
			addOk = shoppingCartService.addToCart(pid, num, UserSecurityUtils.getCurrentUserId());
		}
		model.addAttribute("addOk",addOk);
		return "web.order.addSkuToCart";
	}
	@ResponseBody
	@RequestMapping(value="/add", method=RequestMethod.PUT)
	public List<ShoppingCartGroupVO> put(Model model,
			@RequestParam(value="pid", required=true) Long pid,
			@RequestParam(value="num", required=true) int num) throws AuthenticationException{
		boolean putOk = false;
		if(pid != null && pid > 0) {
			putOk = shoppingCartService.putToCart(pid, num, UserSecurityUtils.getCurrentUserId());
		}
		if(putOk) {
			List<ShoppingCartGroupVO> list = shoppingCartService.loadByBuyerId(UserSecurityUtils.getCurrentUserId());
			return list;
		} else {
			return new ArrayList<ShoppingCartGroupVO>(0);
		}
	}
	
	@ResponseBody
	@RequestMapping(value="/del", method=RequestMethod.GET)
	public List<ShoppingCartGroupVO> delete(Model model,
			@RequestParam(value="sid", required=true) Long sid) throws AuthenticationException{
		boolean putOk = false;
		if(sid != null && sid > 0) {
			putOk = shoppingCartService.removeCart(sid);
		}
		if(putOk) {
			List<ShoppingCartGroupVO> list = shoppingCartService.loadByBuyerId(UserSecurityUtils.getCurrentUserId());
			return list;
		} else {
			return new ArrayList<ShoppingCartGroupVO>(0);
		}
	}
	@ResponseBody
	@RequestMapping(value="/del", method=RequestMethod.POST)
	public List<ShoppingCartGroupVO> delete(Model model,
			@RequestParam(value="sids", required=true) Long[] sids) throws AuthenticationException{
		boolean putOk = false;
		if(sids != null && sids.length > 0) {
			putOk = shoppingCartService.removeCart(sids);
		}
		if(putOk) {
			List<ShoppingCartGroupVO> list = shoppingCartService.loadByBuyerId(UserSecurityUtils.getCurrentUserId());
			return list;
		} else {
			return new ArrayList<ShoppingCartGroupVO>(0);
		}
	}
}
