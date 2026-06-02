sap.ui.define(["sap/ui/model/json/JSONMOdel"], function (JSONMOdel) {
    return {
        createInputModel(){
            return new JSONMOdel({
                Name: "",
                Category: "", 
                Price: "",
                ReleaseDate: null,
                DiscontinuedDate: null
            })
        }
    }
})