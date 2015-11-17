package com.fenghua.auto.backend.service.user.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fenghua.auto.backend.dao.user.CompanyDao;
import com.fenghua.auto.backend.dao.user.PaymentTypeDao;
import com.fenghua.auto.backend.dao.user.UserDao;
import com.fenghua.auto.backend.dao.user.UserPaymentTypeDao;
import com.fenghua.auto.backend.domain.user.Company;
import com.fenghua.auto.backend.domain.user.PaymentType;
import com.fenghua.auto.backend.domain.user.User;
import com.fenghua.auto.backend.domain.user.UserPaymentType;
import com.fenghua.auto.backend.service.user.UserService;

/**
 * 用户接口实现
 * @author chengbin
 * @createTime 2015.11.2
 *
 */
@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PaymentTypeDao paymentTypeDao;
	
	@Autowired
	private CompanyDao companyDao;
	
	@Autowired
	private UserPaymentTypeDao usercompanyDao;
	
	@Autowired
	private BCryptPasswordEncoder encoder;

	@Override
	public void delete(Long id) {
		userDao.deleteById(id);
	}

	@Override
	public void update(User personal) {
		userDao.updateById(personal);
	}

	@Override
	public void insert(User personal) {
//		Role role = new Role();
//		role.setName("个人买家");
//		role.setCreatedTs(new Date());
//		role.setLastModifiedTs(new Date());
//		Long roleId = roleDao.getIdInsert(role);
		
		String passWord = encoder.encode( personal.getPassword());
		personal.setPassword(passWord);
		personal.setRole(Long.parseLong("1"));
		userDao.insert(personal);
	}
	@Override
	public void insert(User personal, Company company, PaymentType payment) {
//		//录入角色
//		Role role = new Role();
//		role.setName("企业买家");
//		role.setCreatedTs(new Date());
//		role.setLastModifiedTs(new Date());
//		Long roleId = roleDao.getIdInsert(role);
		//企业数据
		company.setCreatedTs(new Date());
		company.setLastModifiedTs(new Date());
		Long companyId = companyDao.getCompanyId(company);
		//支付数据
		String str = payment.getTypename();
		if(str.equals("0")) {
			payment.setTypename("月结");
		} else if(str.equals("1")) {
			payment.setTypename("季结");
		}
		payment.setNeedapprove("Y");
		payment.setCreatedTs(new Date());
		Long paymentId = paymentTypeDao.getPaymentId(payment);
		//个人数据
		String passWord = encoder.encode( personal.getPassword());
		personal.setPassword(passWord);
		personal.setCompany(companyId);
		personal.setRole(Long.parseLong("2"));
		Long userId = userDao.getPaymentId(personal);
		//user与支付关系数据
		UserPaymentType payment_type = new UserPaymentType();
		payment_type.setUserId(userId);
		payment_type.setStatus(0);
		payment_type.setPaymenttypeId(paymentId);
		usercompanyDao.insert(payment_type);
	}

	@Override
	public User getUserById(Long id) {
		return userDao.selectById(id);
	}

	@Override
	public List<User> getAll() {
		return userDao.selectAll();
	}

	@Override
	public List<User> getUserByName(String name) {
		return userDao.selectByName(name);
	}
	
	@Override
	public List<User> getUserByEmail(String email) {
		return userDao.selectByEmail(email);
	}
	
	@Override
	public List<User> getUserByTelephone(String telephone) {
		return userDao.selectByTelephone(telephone);
	}
}