var gallery_url  =  "https://pantarei.co.il/api/gallery";
function img_html(img, url = "") {
    if(url == "") {
        return '<img src="'+img+'" alt="">'
    } else {
        return '<a href="'+url+'" target="_blank"><img src="'+img+'" alt=""></a>';
    }
}

function img_render(urls, status) {
    var html_gall = "";
    if(status == "success") {
        for (let i_url = 0; i_url < urls.length; i_url++) {
            const element = urls[i_url];
            html_gall += img_html(element.mediaUrl, element.permalink)
        }
    } else if(status == "error") {
        var media_id = 1
        for (let i_url = 0; i_url < urls.length; i_url++) {
            const element = urls[i_url];
            html_gall += img_html("./image/gallery/"+media_id+".webp", element.permalink)
            media_id++;
        }
    } else {
        var media_id = 1
        for (let i_url = 0; i_url < 9; i_url++) {
            html_gall += img_html("./image/gallery/"+media_id+".webp")
            media_id++;
        }
    }

    if(html_gall != "") {
        $(".gallery__grid").html(html_gall)
        $(".gallery__load").hide()
    }
}

function checkLinkAvailability(url, timeout = 6000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    var url_page = url[1].mediaUrl
    fetch(url_page, {
        method: "GET",
        signal: controller.signal,
    }).then(response => {
        clearTimeout(timeoutId);
        if (response.ok) {
            img_render(url, "success")
        } else {
            img_render(url, "error")
        }
    }).catch(function(error) {
        clearTimeout(timeoutId);
        img_render(url, "error")
    });
    
}

async function file_get_contents(uri, callback) {
        await fetch(uri, {
            method: 'GET',
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                img_render("", "empty")
            }
        }).then(json => {
            checkLinkAvailability(json)
        }).catch(function(error) {
            img_render("", "empty")
        });
    }

file_get_contents(gallery_url);


/*
async function post_url() {

    await $.ajax({
        url: "gallery.php",
        type: "POST",
        dataType: "json",
        success:function(data) {
            if(data.status == 1) {
                checkLinkAvailability(data.img)
            } else {
                img_render("", "empty")
            }
        },
        error:function() {
            img_render("", "empty")
        }
    })
}

/*async function get_config() {
        let response = await fetch('/assets/js/config.json');
        if (response.ok) {
            var cnf = await response.json();

        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return  cnf  ; // a Promise() actually.
    }
config = get_config();
$(document).ready(function() {
    console.log('dddd');
    console.log(config);
    console.log('dddd');
})
*/
//post_url()
