package com.fenghua.auto.webapp.controller.user;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.fenghua.auto.backend.core.utills.UserSecurityUtils;
import com.fenghua.auto.backend.domain.user.User;
import com.fenghua.auto.backend.service.user.AuthService;
import com.fenghua.auto.backend.service.user.UserService;
import com.fenghua.auto.webapp.view.Result;
import com.qq.connect.QQConnectException;
import com.qq.connect.oauth.Oauth;

/**
 * 第三方账号授权
 * 
 * @author zhangfr
 *
 */
@Controller
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private UserService userService;
	@Autowired
	private AuthService authService;
	/**
	 * 跳转到qq授权视图
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/qq")
	public String qqAuth(HttpServletRequest request) {
		String qqUrl = null;
		try {
			qqUrl = new Oauth().getAuthorizeURL(request);
		} catch (QQConnectException e) {
			e.printStackTrace();
		}
		return "redirect:" + qqUrl;
	}
	/**
	 * qq登陆授权后回掉地址
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/qqafterlogin")
	public ModelAndView afterlogin(HttpServletRequest request,Model model) {
		try {
			User user=authService.isUser(request);
			if(user!=null){
				//登陆
				userService.autoLogin(user.getName(), user.getPassword(), request);
				//跳转到首页
				return new ModelAndView("web.index_view");
			}else {
				//跳转到注册页面
				return new ModelAndView("register.information");
			}
		} catch (QQConnectException e) {
			e.printStackTrace();
			model.addAttribute("msg", new Result(false,"xx","操作失败！请重新登陆！"));
			return new ModelAndView("web.login");
		}
	}
}
