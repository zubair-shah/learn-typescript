//interfaces
function read(page) {
    // Ok: reading the text property doesn't attempt to modify it
    // console.log(page.text);
    // page.text += "!";
    // ~~~~
    // Error: Cannot assign to 'text'
    // because it is a read-only property.
}
var both = {
    method: function () {
        return "";
    },
    property: function () { return ""; }
};
both.method();
both.property();
