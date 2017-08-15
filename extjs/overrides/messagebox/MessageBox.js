Ext.define("Ext.messagebox.MessageBox", {
	override: "Ext.window.MessageBox",
	confirm: function(cfg, message, fn, scope) {

		if (Ext.isString(cfg)) {
			message = '<div style="line-height:24px;">' + message + '</div>';
			cfg = {
				title: cfg,
				icon: this.QUESTION,
				message: message,
				buttons: this.YESNO,
				callback: fn,
				scope: scope
			};
		} else {
			message = '<div style="line-height:24px;">' + cfg.message + '</div>';
		}
		return this.show(cfg);
	}
});