/**
 * 
 */
package com.fenghua.auto.order.service;

import java.util.List;

import com.fenghua.auto.backend.service.BaseService;
import com.fenghua.auto.order.domain.OrderMaster;
import com.fenghua.auto.order.domain.ShoppingCart;
import com.fenghua.auto.order.dto.OrderMasterResultDTO;
import com.fenghua.auto.order.dto.OrderMasterSubmitDTO;

/**
 * Service接口类
 *
 * @author 王直元
 * @createTime 2015-11-25 11:11:35
 *
 */
public interface OrderMasterService extends BaseService<OrderMaster> {

	/**
	 * 初始化提交订单
	 * 通过传入的DTO中的选择的商品，进行价格+库存+支付方式+配送等的计算操作，把计算结果返回到DTO中
	 * @param shoppingCarts List<ShoppingCart>
	 * @return SubmitOrderDTO
	 */
	public OrderMasterSubmitDTO initSubmit(List<ShoppingCart> shoppingCarts, Long buyerId);
	
	/**
	 * 提交订单
	 * 对订单的价格进行计算，锁定库存，生成主订单+子订单+支付单；
	 * 返回生成的主订单号、子订单号、支付单号信息，便于提示用户下一步处理
	 * @param submitDTO OrderMasterSubmitDTO
	 * @return List<OrderMasterResultDTO>
	 */
	public List<OrderMasterResultDTO> submit(OrderMasterSubmitDTO submitDTO);
}
