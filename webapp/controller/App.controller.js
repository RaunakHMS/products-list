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

                this.getView().byId("idProductList").addItem(new ObjectListItem({
                    title: oData.Name,
                    number: oData.Price,
                    numberUnit: "INR",
                    attributes: [
                        new ObjectAttribute({
                            title: "Category",
                            text: oData.Category
                        }),
                        new ObjectAttribute({
                            title: "Release Date",
                            text: oData.ReleaseDate
                        })
                    ],
                    firstStatus: new ObjectStatus({
                        title: "Stock",
                        text: this._getAvailabilityText(oData.DiscontinuedDate),
                        state: this._getAvailabilityState(oData.DiscontinuedDate)
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