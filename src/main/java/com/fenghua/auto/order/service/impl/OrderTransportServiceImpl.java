/**
 * 
 */
package com.fenghua.auto.order.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fenghua.auto.backend.dao.BaseDao;
import com.fenghua.auto.order.dao.OrderTransportDao;
import com.fenghua.auto.order.domain.OrderTransport;
import com.fenghua.auto.backend.service.impl.BaseServiceImpl;
import com.fenghua.auto.order.service.OrderTransportService;

/**
 * Service实现类
 *
 * @author 王直元
 * @createTime 2015-11-25 11:11:35
 *
 */
@Service
public class OrderTransportServiceImpl extends BaseServiceImpl<OrderTransport> implements OrderTransportService {

	@Autowired
	private OrderTransportDao dao;
	
	@Override
	protected BaseDao<OrderTransport> getBaseDao() {
		return dao;
	}

}
