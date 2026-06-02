sap.ui.define(["sap/ui/core/UIComponent",
    "com/raunak/products/model/models"
], function (UIComponent, models) {
    'use strict'

    return UIComponent.extend("com.raunak.products.Component", {
        metadata: {
            interface: "sap.ui.core.IAsyncContnetCreation", 
            manifest: "json"
        },
        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

            // set the input model
            this.setModel(models.createInputModel(), "input");
        }
    })
})