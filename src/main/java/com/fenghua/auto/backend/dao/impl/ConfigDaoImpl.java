package com.fenghua.auto.backend.dao.impl;

import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import com.fenghua.auto.backend.dao.ConfigDao;
import com.fenghua.auto.backend.dao.DaoException;
import com.fenghua.auto.backend.dao.constants.SqlId;
import com.fenghua.auto.backend.domain.user.Config;
/**
 * config配置文件信息
 * @author heting
 *
 */
@Repository
public class ConfigDaoImpl extends BaseDaoImpl<Config> implements ConfigDao {

	@Override
	public Config selectByConfigName(String configName) {
		Assert.notNull(configName);
		Config config = null;
		try {
			config = sqlSessionTemplate.selectOne(getSqlName(SqlId.SQL_SELECT_BY_CONFIGNAME), configName);
		} catch (Exception e) {
			throw new DaoException(String.format("根据config配置名字查询对象出错！语句：%s", getSqlName(SqlId.SQL_SELECT_BY_CONFIGNAME)), e);
		}
		return config;
	}

}
