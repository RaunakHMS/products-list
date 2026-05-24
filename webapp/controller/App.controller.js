sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/StandardListItem"
], 
    function (Controller, MessageToast, StandardListItem) {
    'use strict'

    return Controller.extend("com.raunak.products.controller.App", {

        onPressAddToCart: function () {
            const productName = this.getView().byId("idProductName").getValue();

            this.getView().byId("idProductList").addItem(new StandardListItem({
                title: productName
            }))
        },

        onProductDelete: function (oEvent) {
            const oItem = oEvent.getParameter("listItem");
            this.getView().byId("idProductList").removeItem(oItem);
        }
    })
})