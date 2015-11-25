/**
 * 
 */
package com.fenghua.auto.backend.service.order.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fenghua.auto.backend.dao.BaseDao;
import com.fenghua.auto.backend.dao.order.OrderInvoiceDao;
import com.fenghua.auto.backend.domain.order.OrderInvoice;
import com.fenghua.auto.backend.service.impl.BaseServiceImpl;
import com.fenghua.auto.backend.service.order.OrderInvoiceService;

/**
 * Service实现类
 *
 * @author 王直元
 * @createTime 2015-11-25 11:11:35
 *
 */
@Service
public class OrderInvoiceServiceImpl extends BaseServiceImpl<OrderInvoice> implements OrderInvoiceService {

	@Autowired
	private OrderInvoiceDao dao;
	
	@Override
	protected BaseDao<OrderInvoice> getBaseDao() {
		return dao;
	}

}
