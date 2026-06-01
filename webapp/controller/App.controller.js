sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/ObjectListItem",
    "sap/m/ObjectAttribute",
    "sap/m/ObjectStatus",
    "sap/ui/core/ValueState"
],
    function (Controller, MessageToast, ObjectListItem, ObjectAttribute, ObjectStatus, ValueState) {
        'use strict'

        return Controller.extend("com.raunak.products.controller.App", {

            onPressAddToCart: function () {
                const sProductName = this.getView().byId("idProductName").getValue();
                const oCategory = this.getView().byId("idCategory").getSelectedItem();
                const sPrice = this.getView().byId("idPrice").getValue();
                const sReleaseDate = this.getView().byId("idReleaseDate").getDateValue();
                const sDisconDate = this.getView().byId("idDisconDate").getDateValue();

                this.getView().byId("idProductList").addItem(new ObjectListItem({
                    title: sProductName,
                    number: sPrice,
                    numberUnit: "INR",
                    attributes: [
                        new ObjectAttribute({
                            title: "Category",
                            text: oCategory.getText()
                        }),
                        new ObjectAttribute({
                            title: "Release Date",
                            text: sReleaseDate
                        })
                    ],
                    firstStatus: new ObjectStatus({
                        title: "Stock",
                        text: this._getAvailabilityText(sDisconDate),
                        state: this._getAvailabilityState(sDisconDate)
                    })
                }))
            },

            onProductDelete: function (oEvent) {
                const oItem = oEvent.getParameter("listItem");
                this.getView().byId("idProductList").removeItem(oItem);
            },

            onPressAddNewProduct: function (oEvent) {
            },

            _getAvailabilityText(oDate) {
                return oDate > new Date() ? "Available" : "UnAvailable";
            },

            _getAvailabilityState(oDate) {
                return oDate > new Date() ? ValueState.Success : ValueState.Error;
            }
        })
    })