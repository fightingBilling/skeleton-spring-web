package com.fenghua.auto.backend.core.utills.message;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import com.fenghua.auto.backend.core.utills.MD5Encoder;

public class SMSTest {

	private static final String addr = "http://api.sms.cn/mt/";
	private static final String userId = "liting6604006";

	/*
	 * 如uid是：test，登录密码是：123123 pwd=md5(123123test),即
	 * pwd=b9887c5ebb23ebb294acab183ecf0769
	 * 
	 * 线生成地址：http://www.sms.cn/password
	 */
	private static final String pwd = MD5Encoder.MD5("6604006liting6604006");

	private static final String encode = "utf8";
	
	public static void send(String msgContent, String mobile) throws Exception {

		// 组建请求
		String straddr = addr + "?uid=" + userId + "&pwd=" + pwd + "&mobile=" + mobile + "&encode=" + encode
				+ "&content=" + java.net.URLEncoder.encode(msgContent);
		StringBuffer sb = new StringBuffer(straddr);
		System.out.println("URL:" + sb);

		// 发送请求
		URL url = new URL(sb.toString());
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("POST");
		BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));

		// 返回结果
		String inputline = in.readLine();
		System.out.println("Response:" + inputline);

	}
}
