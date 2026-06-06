sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/ObjectListItem",
    "sap/m/ObjectAttribute",
    "sap/m/ObjectStatus",
    "sap/ui/core/ValueState",
    "sap/ui/core/Fragment",
    "com/raunak/products/model/models"
],
    function (Controller, MessageToast, ObjectListItem, ObjectAttribute, ObjectStatus, ValueState, Fragment, models) {
        'use strict'

        return Controller.extend("com.raunak.products.controller.App", {

            onPressCreateNewProduct: function () {
                const oData = this.getView().getModel("input").getData();

                const oProductModel = this.getView().getModel("product");
                const aItems = oProductModel.getProperty("/items");

                aItems.push(oData);

                oProductModel.setProperty("/items", aItems);

                this._oCreateProductDialog.close();
            },

            onProductDelete: function (oEvent) {
                const oItem = oEvent.getParameter("listItem");

                const oModel = this.getView().getModel("product");
                const iIndex = oItem.getBindingContext("product").getPath().split("/").pop();

                oModel.getData().items.splice(iIndex, 1);
                oModel.refresh();
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

            onAfterCreateProductDialogClose: function (oEvent) {
                // set a fresh model to reset values of the view.
                this.getOwnerComponent().setModel(models.createInputModel(), "input");
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