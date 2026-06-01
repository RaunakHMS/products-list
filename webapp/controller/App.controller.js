sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/ObjectListItem",
    "sap/m/ObjectAttribute",
    "sap/m/ObjectStatus",
    "sap/ui/core/ValueState",
    "sap/ui/core/Fragment"
],
    function (Controller, MessageToast, ObjectListItem, ObjectAttribute, ObjectStatus, ValueState, Fragment) {
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
                }));

                this._oCreateProductDialog.close();
            },

            onProductDelete: function (oEvent) {
                const oItem = oEvent.getParameter("listItem");
                this.getView().byId("idProductList").removeItem(oItem);
            },

            onPressAddNewProduct: function (oEvent) {
                //load the fragment as a dialog

                if (!this._oCreateProductDialog) {
                    Fragment.load({
                        id: this.getView().getId(),
                        name: "com.raunak.products.view.fragments.CreateProduct",
                        controller: this
                    }).then(oDialog => {
                        this._oCreateProductDialog = oDialog;
                        this.getView().addDependent(oDialog);
                        oDialog.open();
                    })
                } else {
                    this._oCreateProductDialog.open();
                }
            },

            onPressCancelCreateDialog: function (oEvent) {
                this._oCreateProductDialog.close();
            },

            _getAvailabilityText(oDate) {
                return oDate > new Date() ? "Available" : "UnAvailable";
            },

            _getAvailabilityState(oDate) {
                return oDate > new Date() ? ValueState.Success : ValueState.Error;
            }
        })
    })