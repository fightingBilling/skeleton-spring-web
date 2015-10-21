package com.fenghua.auto.test;

import static org.junit.Assert.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import com.alibaba.fastjson.JSON;

/**
 * <des>
 *   控制器测试基类
 * </des>
 * 
 * @author lijie
 * @date 2015年10月20日
 *
 */

@ContextConfiguration({"/spring-context.xml", "/spring-mybatis.xml"})
public class AbstractControllerTest extends AbstractTest {
	
	protected MockHttpServletRequest request;

	protected MockHttpServletResponse response;
	
	protected RequestMappingHandlerAdapter handlerAdapter;
	
	protected RequestMappingHandlerMapping handlerMapping;  
	
	@Before
	public void setUp() {
				
		request = new MockHttpServletRequest();
		request.setCharacterEncoding("UTF-8");
		
		response = new MockHttpServletResponse();

	    handlerMapping = applicationContext.getBean(RequestMappingHandlerMapping.class);  	    
	    assertNotNull(handlerMapping);
	    
        handlerAdapter = applicationContext.getBean(RequestMappingHandlerAdapter.class);
        assertNotNull(handlerAdapter); 
	}
	
	/**
	 * 用于运行maven install时,有执行主体
	 */
	@Test
	public void testRun(){
		
	}
	
	@After
	public void releaseApplicationContext(){
		reacoveApplicationContext();
	}

	/**
	 *
	 *执行request中url 对应 controller 方法
	 **/
	public ModelAndView excuteAction(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HandlerExecutionChain chain = handlerMapping.getHandler(request);
		ModelAndView model = null;
		try {
			model = handlerAdapter.handle(request, response, chain.getHandler());
		} catch (Exception e) {
			throw e;
		}
		return model;
	}
	  
	protected void jsonPostInit() {
		addJsonHeader();
		request.setMethod(RequestMethod.POST.toString());
	}

	protected void jsonGetInit() {
		addJsonHeader();
		request.setMethod(RequestMethod.GET.toString());
	}

	protected void jsonPutInit() {
		addJsonHeader();
		request.setMethod(RequestMethod.PUT.toString());
	}

	protected void jsonDelInit() {
		addJsonHeader();
		request.setMethod(RequestMethod.DELETE.toString());
	}

	protected String getJsonString(Object o) throws Exception {
		return 	JSON.toJSONString(o);
	}

	private void addJsonHeader() {
		request.addHeader("Accept", "application/json, text/javascript, */*");
		request.addHeader("Content-Type", "application/json; charset=UTF-8");
	}

	protected void formGetInit() {
		request.addHeader("Accept", "application/x-www-form-urlencoded , text/html, */*");
		request.addHeader("Content-Type", "application/x-www-form-urlencoded");
		request.setMethod(RequestMethod.GET.toString());
	}
}
