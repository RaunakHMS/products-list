sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], 
    function (Controller, MessageToast) {
    'use strict'

    return Controller.extend("com.raunak.products.controller.App", {

        onPressAddToCart: function () {
            const oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            MessageToast.show(oBundle.getText("txtAddedToCart"));
        }
    })
})