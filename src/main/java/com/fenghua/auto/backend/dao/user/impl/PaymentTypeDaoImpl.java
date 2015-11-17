package com.fenghua.auto.backend.dao.user.impl;

import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import com.fenghua.auto.backend.dao.DaoException;
import com.fenghua.auto.backend.dao.constants.SqlId;
import com.fenghua.auto.backend.dao.impl.BaseDaoImpl;
import com.fenghua.auto.backend.dao.user.PaymentTypeDao;
import com.fenghua.auto.backend.domain.user.PaymentType;
/**
 * 支付方式dao实现
 * @author chengbin
 *
 */
@Repository
public class PaymentTypeDaoImpl extends BaseDaoImpl<PaymentType> implements PaymentTypeDao {

	@Override
	public Long getPaymentId(PaymentType payment) {
		Assert.notNull(payment);
		Long str = null;
		try {
			sqlSessionTemplate.insert(getSqlName(SqlId.SQL_INSERT_SELECTIVE), payment);
			str = payment.getId();
		} catch (Exception e) {
			throw new DaoException(String.format("添加对象出错！语句：%s", getSqlName(SqlId.SQL_INSERT)), e);
		}
		return str;
	}
}