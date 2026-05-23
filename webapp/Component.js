sap.ui.define(["sap/ui/core/UIComponent"], function (UIComponent) {
    'use strict'

    return UIComponent.extend("com.raunak.products.Component", {
        metadata: {
            interface: "sap.ui.core.IAsyncContnetCreation", 
            manifest: "json"
        },
        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
        }
    })
})