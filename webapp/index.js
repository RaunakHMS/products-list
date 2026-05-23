sap.ui.define(['sap/ui/core/ComponentContainer'], function (ComponentContainer) {
    'use strict'

    new ComponentContainer({
        name: "com.raunak.products",
        settings: {
            id: "com.raunak.products"
        },
        async: true
    }).placeAt('content');
})