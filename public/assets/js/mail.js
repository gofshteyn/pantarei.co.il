var clients_preorders  =  "https://pantarei.co.il/api/clients-preorders";

$("body form").submit(function(e) {
    e.preventDefault()
    var form = $(this).serializeArray();
    console.log(form);
    var appl = $(this).parents(".form-application__wrapp")
    var popup = $(this).parents("#popup_call")
    if(popup.length > 0) {
        var phone = $(this).find("input[name=phone]").val()
        var email = $(this).find("input[name=email]").val()
        if(phone == "" && email == "") {
            $(".popup .popup__error").show()
            return false;
        }
    }
    $(".popup .popup__error").hide()
    var formObj = form.reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    if(formObj["isMediaRequired"] == 1) {
        formObj["isMediaRequired"] = true;
    }
    fetch(clients_preorders, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formObj)
    }).then(response => {
        if(appl.length > 0) {
            $(".form-application__wrapp form input[type=submit]").prop("disabled", true)
            $("body .form-application__success").show()
        } else {
            $("body .popup__success").show()
            $(".popup__wrapp input[type=submit]").hide()

        }
    }).catch(function(error) {
        console.log(error)
    });
})
