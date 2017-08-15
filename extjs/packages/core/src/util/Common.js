Ext.define('Ext.util.Common', {

	statics: {

		ajax: function(config) {
			var defaultOpts = {
					url: null,
					method: "GET",
					params: null,
					jsonData: null,
					disableCaching: false,
					beforerequest: null,
					requestcomplete: null,
					callback: null,
					headers: null,
					timeout: 30000
				},
				opts = Ext.apply(defaultOpts, config);

			Ext.Ajax.request({
				url: opts.url,
				method: opts.method,
				params: opts.params,
				headers: opts.headers,
				jsonData: opts.jsonData,
				disableCaching: opts.disableCaching,
				beforerequest: opts.beforerequest,
				requestcomplete: opts.requestcomplete,
				callback: opts.callback,
				timeout: opts.timeout,
				success: function(response) {
					var root;

					if (response.responseText.length > 0) {
						root = Ext.decode(response.responseText);
					}
					if (typeof opts.success == 'function') {
						opts.success.apply(this, [root]);
					}
				},
				failure: function(response) {

					Ext.util.Common.errorHandler(response, opts.failure);
				}
			});
		},

		errorHandler: function(response, callback) {
			var error,
				responseText = response.responseText;

			switch (response.status) {
				case 0:
					Ext.Msg.alert('错误', '请求超时或通信失败, 请尝试刷新');
					break;
				case 401:
					error = Ext.util.Common.isJsonString(responseText) ? Ext.decode(responseText) : {
						message: "会话已过期，请重新登录"
					};

					Ext.Msg.alert('错误', error.message, function() {
						location.href = location.href;
					});
					break;
				case 402:
				    location.href = location.href;
					break;
				case 404:
					Ext.Msg.alert('错误', response.statusText);
					break;
				default:
					error = Ext.util.Common.isJsonString(responseText) ? Ext.decode(responseText) : {
						message: "未知错误"
					};

					if (typeof callback == 'function') {
						callback.apply(this, [response, error]);
					} else {
						Ext.Msg.alert('错误', error.message);
					}
					break;
			}
		},

		isJsonString: function(str) {
			try {
				Ext.decode(str);
			} catch (e) {
				return false;
			}

			return true;
		}
	},

	constructor: function() {

		this.overrides();
		this.extendMethods();
		this.extendVType();
		this.bindEvents();
	},

	overrides: function() {
		var me = this;

		// 重写ext json encodeDate方法
		Ext.JSON.encodeDate = function(o) {
			return '"' + Ext.Date.format(o, 'c') + '"';
		}
	},

	extendMethods: function() {
		var me = this;

		// format 扩展一个lcoalDate方法
		Ext.util.Format.localDate = function(val, format) {
			format = format ? format : 'Y-m-d H:i:s';

			return val ? Ext.util.Format.date(new Date(val), format) : '';
		}
	},

	extendVType: function() {
		var me = this;

		Ext.apply(Ext.form.VTypes, {

			// 验证日期控件选择范围
			daterange: function(val, field) {
				var date = field.parseDate(val),
					form = field.up('form').getForm();

				if (!date) {
					return;
				}
				if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
					var start = form.findField(field.startDateField);
					start.setMaxValue(date);
					start.validate();
					this.dateRangeMax = date;
				} else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
					var end = form.findField(field.endDateField);
					end.setMinValue(date);
					end.validate();
					this.dateRangeMin = date;
				}
				return true;
			},

			daterangeText: '日期选择范围有误'
		});

		Ext.apply(Ext.form.field.VTypes, {

			// 验证电话格式
			phone: function(val) {

				return /^1[3|5|8]\d{9}|0\d{2,3}-?\d{7,8}$/.test(val);
			},

			phoneText: '电话格式有误',

			// 验证QQ格式
			qq: function(val) {

				return /^\d{5,}$/.test(val);
			},

			qqText: 'QQ号码格式有误',

			// 邮编格式验证
			zip: function(val) {

				return /^[0-9]{6}$/.test(val);
			},

			zipText: '邮编格式有误',

			// excel上传格式验证
			excel: function(val) {

				return /\.(xls|xlsx)$/i.test(val);
			},

			excelText: '文件扩展名必须是.xlsx'
		});
	},

	bindEvents: function() {
		var me = this;

		// ajax请求服务端之前
		Ext.Ajax.on('beforerequest', function(conn, options) {
			if (typeof options.beforerequest === 'function') {
				return options.beforerequest.apply(this, [options])
			} else {
				return true;
			}
		});

		// ajax请求服务器端完成
		Ext.Ajax.on('requestcomplete', function(conn, response, options) {
			if (typeof options.requestcomplete === 'function') {
				return options.requestcomplete.apply(this, [response])
			}
		});
	}
});

new Ext.util.Common();