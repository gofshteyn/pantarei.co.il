document.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    let header = document.querySelector(".header");

    if (scrollPosition > 25) {
        header.style.top = "0";
    } else {
        header.style.top = "";
    }

    if(scrollPosition > 500) {
        $(".totop").fadeIn()
    } else {
      $(".totop").fadeOut()
    }
});




$(".select-course__menu a").click(function() {
    $(".select-course__menu a").removeClass("current")
    $(this).addClass("current")

    var link = $(this).attr("href")
    $(".select-course .select-course__tabs").css("opacity", "0")
    $(".select-course .select-course__tabs").removeClass("show")
    setTimeout(function() {
        $(".select-course .select-course__tabs").hide()
        $(".select-course .select-course__tabs").css("opacity", "1")
        $(".select-course #"+link).show()
        $(".select-course #"+link).addClass("show")
    }, 100)

    return false;
})


$('body .tplLocation__gallery').slick({
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
    dots: true,
    prevArrow: '<button type="button" class="slick-prev"><svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8485 0.534807C11.3799 0.0661782 10.6201 0.0661787 10.1515 0.534808L0.53482 10.1515C0.118317 10.568 0.0719885 11.2145 0.395834 11.6821C0.436415 11.7408 0.482813 11.7966 0.535029 11.8488L10.1517 21.4655C10.6203 21.9341 11.3801 21.9341 11.8487 21.4655C12.3174 20.9968 12.3174 20.237 11.8487 19.7684L3.08036 11L11.8485 2.23186C12.3172 1.76323 12.3172 1.00344 11.8485 0.534807Z" fill="#696969"/> </svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.15147 0.534807C1.6201 0.0661782 2.3799 0.0661787 2.84853 0.534808L12.4652 10.1515C12.8817 10.568 12.928 11.2145 12.6042 11.6821C12.5636 11.7408 12.5172 11.7966 12.465 11.8488L2.84832 21.4655C2.37969 21.9341 1.61989 21.9341 1.15126 21.4655C0.682634 20.9968 0.682635 20.237 1.15126 19.7684L9.91964 11L1.15147 2.23186C0.682843 1.76323 0.682843 1.00344 1.15147 0.534807Z" fill="#696969"/> </svg></button>',
    responsive: [ 
        { breakpoint: 770, settings: { slidesToShow: 2 } },
    ]
});
$('body .location__row').slick({
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    arrows: true,
    dots: false,
    prevArrow: '<button type="button" class="slick-prev"><svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8485 0.534807C11.3799 0.0661782 10.6201 0.0661787 10.1515 0.534808L0.53482 10.1515C0.118317 10.568 0.0719885 11.2145 0.395834 11.6821C0.436415 11.7408 0.482813 11.7966 0.535029 11.8488L10.1517 21.4655C10.6203 21.9341 11.3801 21.9341 11.8487 21.4655C12.3174 20.9968 12.3174 20.237 11.8487 19.7684L3.08036 11L11.8485 2.23186C12.3172 1.76323 12.3172 1.00344 11.8485 0.534807Z" fill="#696969"/> </svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.15147 0.534807C1.6201 0.0661782 2.3799 0.0661787 2.84853 0.534808L12.4652 10.1515C12.8817 10.568 12.928 11.2145 12.6042 11.6821C12.5636 11.7408 12.5172 11.7966 12.465 11.8488L2.84832 21.4655C2.37969 21.9341 1.61989 21.9341 1.15126 21.4655C0.682634 20.9968 0.682635 20.237 1.15126 19.7684L9.91964 11L1.15147 2.23186C0.682843 1.76323 0.682843 1.00344 1.15147 0.534807Z" fill="#696969"/> </svg></button>',
    responsive: [ 
        { breakpoint: 990, settings: { variableWidth: false } },
    ]
});

$("a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+ - +100+"px"});

    $("html").attr("style", "")
    $("body").getNiceScroll().resize();
    $(".toggle-menu").removeClass("show")
    $(".toggle-menu-bg").hide()

    return false;
});


$(".toggle-menu-bg, .toggle-menu__close").click(function() {
    $("body").attr("style", "")
    $(".toggle-menu").removeClass("show")
    $(".toggle-menu-bg").hide()
})
$(".header__burger").click(function() {
    $("body").attr("style", "overflow: hidden;")
    $(".toggle-menu").addClass("show")
    $(".toggle-menu-bg").show()
})

$("body .show_popup_call").click(function() {
    $("#popup_call").show()
    var select = $(this).attr("data-select")
    var product = $(this).attr("data-product")
    $(".popup__wrapp input[name=productId]").val(product)

    if(select != undefined && select != "") {
        $("#popup_call .popup__subtitle").show()
        $("#popup_call .popup__subtitle b").text(select)
        $(".popup__wrapp input[name=select]").val(select)
    } else {
        var h3 = $(this).parents(".location__item").find(".tplLocation__name h3")
        if(h3.length > 0) {
            $("#popup_call .popup__subtitle").show()
            $("#popup_call .popup__subtitle b").text(h3.text())
            $(".popup__wrapp input[name=select]").val(h3.text())
        } else {
            $("#popup_call .popup__subtitle").hide()
            var h3 = $(this).parents(".select-course__tab").find(".select-course__content h3")
            if(h3.length > 0) {
                $("#popup_call .popup__subtitle").show()
                $("#popup_call .popup__subtitle b").text(h3.text())
                $(".popup__wrapp input[name=select]").val(h3.text())
            } else {
                $("#popup_call .popup__subtitle").hide()
            }
        }
    }

    var popup_title = $("#popup_call .popup__title")
    var start = $(this).parents(".start").find(".start__title")
    var course = $(this).parents(".select-course").find("#select-course")
    var location = $(this).parents(".location").find("#location")
    if(start.length > 0) {
        popup_title.text(start.text())
    } else if(course.length > 0) {
        popup_title.text(course.text())
    } else if(location.length > 0) {
        popup_title.text(location.text())
    } else {
        popup_title.text(popup_title.attr("data-title"))
    }


    return false;
})
$("body .popup__close, body .popup__bg").click(function() {
    $("body .popup").hide()

    $("body .popup__success").hide()
    $(".popup__wrapp input[type=submit]").show()
    $(".popup__wrapp input[name=name]").val("")
    $(".popup__wrapp input[name=phone]").val("")
    $(".popup__wrapp input[name=email]").val("")
    $(".popup__wrapp textarea[name=messang]").val("")
    $(".popup__wrapp input[name=select]").val("")
})

$("body .show_popup_text").click(function() {
    $("#popup_text").show()

    var title = $(this).parents(".tplLocation").find(".tplLocation__name h3").text()
    var text = $(this).parents(".tplLocation__content").find(".full-text").html()

    $("#popup_text .popup__title").text(title)
    $("#popup_text .popup__text").html(text)

    return false;
})


$("form input[name=phone]").on("keyup", function(e) {
    var val = $(this).val()
    var re = /^\+?\d{1,15}$/
    if(re.test(val)) {
    } else {
        if(val.length > 15) {
            var new_val = val.slice(0, 15)
            $(this).val(new_val)
        } else {
            var new_val = val.split('').filter(char => re.test(char) || (char === '+' && val.indexOf('+') === 0)).join('');
            $(this).val(new_val)
        }
    }
})

$(".lang select").on("change", function() {
    window.location.replace($(this).val())
})


function InvalidInputHelper(inputElement, options) {
    inputElement.oninvalid = function (e) {
        let message = "";
        if (!this.value) {
        message = options.mess;
        } else if (!this.validity.valid) {
        message = options.mess;
        }
        this.setCustomValidity(message);
    };

    inputElement.oninput = function (e) {
        this.setCustomValidity("");
    };
}


$("body .tplLocation__maps").click(function() {
    var map = $(this).attr("data-map")
    var name = $(this).parents(".tplLocation").find(".tplLocation__name h3").text()
    var link = 'https://maps.google.com/maps?q='+map+'&t=m&z=14&output=embed&iwloc=near'

    $("#popup_map .popup__text p span").text(map)
    $("#popup_map iframe").attr("src", link)
    $("#popup_map .popup__subtitle b").text(name)
    $("#popup_map").show()
})

/*
$("body form").submit(function() {
    var form = $(this).serializeArray();
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

    $.ajax({
        url: "mail.php",
        type: "POST",
        data: form,
        success:function() {
            if(appl.length > 0) {
                $(".form-application__wrapp form input[type=submit]").prop("disabled", true)
                $("body .form-application__success").show()
            } else {
                $("body .popup__success").show()
                $(".popup__wrapp input[type=submit]").hide()
            }
        }
    })

    return false;
})*/

// $(document).ready(function() {
//     $.ajax({
//         url: "gallery.php",
//         type: "POST",
//         success:function(data) {
//             if(data) {
//                 $(".gallery__grid").html(data)
//             }
//         }
//     })
// })
