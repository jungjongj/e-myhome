//utill
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);

        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;

            if (isNaN(r)) {
                u = a = 64;
            }
            else if (isNaN(i)) {
                a = 64;
            }

            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
        }

        return t;
    },
    decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");

        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);

            if (u != 64) {
                t = t + String.fromCharCode(r);
            }

            if (a != 64) {
                t = t + String.fromCharCode(i);
            }
        }

        t = Base64._utf8_decode(t);

        return t;
    },
    _utf8_encode: function (e) {
        e = e.replace(/rn/g, "n");
        var t = "";

        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);

            if (r < 128) {
                t += String.fromCharCode(r);
            }
            else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128);
            }
            else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128);
            }
        }

        return t;
    },
    _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;

        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++;
            }
            else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2;
            }
            else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3;
            }
        }
        return t;
    }
}

Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

//2011년 09월 11일 오후 03시 45분 42초
//console.log(new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초"));
//2011-09-11 console.log(new Date().format("yyyy-MM-dd"));
//'11 09.11 console.log(new Date().format("'yy MM.dd"));
//2011-09-11 일요일 console.log(new Date().format("yyyy-MM-dd E"));
//현재년도 : 2011 console.log("현재년도 : " + new Date().format("yyyy"));


/**
* Secure Hash Algorithm (SHA1)
* http://www.webtoolkit.info/
**/
function SHA1(msg) {
    function rotate_left(n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    };
    function lsb_hex(val) {
        var str = '';
        var i;
        var vh;
        var vl;
        for (i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };
    function cvt_hex(val) {
        var str = '';
        var i;
        var v;
        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
            msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j);
    }
    switch (msg_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
            break;
        case 2:
            i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
            break;
        case 3:
            i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
            break;
    }
    word_array.push(i);
    while ((word_array.length % 16) != 14) word_array.push(0);
    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);
    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }
    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();
}

(function ($, window) {

    $.fn.contextMenu = function (settings) {

        return this.each(function () {

            // Open context menu
            $(this).on("contextmenu", function (e) {
                // return native menu if pressing control
                if (e.ctrlKey) return;

                //open menu
                var $menu = $(settings.menuSelector)
                    .data("invokedOn", $(e.target))
                    .show()
                    .css({
                        position: "absolute",
                        backgroundColor: "#FFFFFF",
                        left: getMenuPosition(e.clientX, 'width', 'scrollLeft'),
                        top: getMenuPosition(e.clientY, 'height', 'scrollTop')
                    })
                    .off('click')
                    .on('click', 'a', function (e) {
                        $menu.hide();
                        e.preventDefault();
                        var $invokedOn = $menu.data("invokedOn");
                        var $selectedMenu = $(e.target);

                        settings.menuSelected.call(this, $invokedOn, $selectedMenu);
                    });

                return false;
            });

            //make sure menu closes on any click
            $('body').click(function () {
                $(settings.menuSelector).hide();
            });
        });

        function getMenuPosition(mouse, direction, scrollDir) {
            var win = $(window)[direction](),
                scroll = $(window)[scrollDir](),
                menu = $(settings.menuSelector)[direction](),
                position = mouse + scroll;

            // opening menu would pass the side of the page
            if (mouse + menu > win && menu < mouse)
                position -= menu;

            return position;
        }

    };
})(jQuery, window);

class ModalView {
    constructor() {
        this.modal = this.createModalView();
        $('body').append(this.modal);
    }

    show(title, content) {
        //console.log(`ModalView`);
        this.setContent(title, content);
        //console.log(`ModalView22`);
        $('#damodal').modal('show');
        //console.log(`ModalView22`);
    }

    hide() {
        $('#damodal').modal('hide');
    }

    setContent(title, content) {
        $('.modal-title').empty();
        $('.modal-title').append(title);
        $('.modal-body').empty();
        $('#modal-body').append(content);
    }

    createModalView() {
        var m = `<div class="modal" id="damodal" style='z-index:9999;'>
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body" id="modal-body">
                        
                      </div>
                    </div>
                  </div>
                </div>`;

        return m;
    }

    eventHandler(e) {
        e.data.self.fullscreen(e.data.id);
    }
}

class FullScreenView {
    constructor(type) {
        this.type = type;
        __fullscreenIndex++;
        this.targetPos = {
            left: -10000, //clickedX,
            top: -11111,
            zIndex: __fullscreenIndex,
            width: 0,
            height: 0
        }

        this.$fullscreen = this.createFullscreenView();

    }

    setContent(title, content) {
        //console.log('content.html()=' + content.html());
        //$('#fullscreenTitle').empty();
        this.$cardHeaderTitle.append(title);
        //$('#fullscreenBody').empty();
        this.$cardBody.append(content);
        this.fullscreen();
    }

    createFullscreenView() {

        var $fullscreen = $(`<div id='fullscreenwin' class="card">`);
        //var $card = $(`<div id='fullscreenwin' class="card" align="center">`);
        var $cardHeader = $('<div class="card-header custom-card-header text-center" >');
        this.$cardBody = $('<div class="card-body" style="overflow:auto;">');
        //var $cardFooter = $('<div class="card-footer text-muted">').append('footer');
        //$card.append($cardHeader).append($cardBody).append($cardFooter);
        $fullscreen.append($cardHeader).append(this.$cardBody); //.append($cardFooter);

        this.$cardHeaderTitle = $('<span>');
        var $cardHeaderRight = $('<div href="#" class="pull-right">');
        $cardHeader.append(this.$cardHeaderTitle).append($cardHeaderRight);

        var $btn = $(`<button type="button" class="btn btn-danger btn-sm" ><i class="fa fa-fw fa-times"></i></button>`);
        $btn.bind("click", { id: 'fullscreenwin', self: this }, this.eventHandler);
        $btn.attr('style', 'cursor:pointer;cursor: hand;');
        $cardHeaderRight.append($btn);

        $('body').append($fullscreen);

        return $fullscreen;

    }

    fullscreen() {
        if (this.type) {
            if (this.$fullscreen[0].requestFullscreen) {
                this.$fullscreen[0].requestFullscreen();
            } else if (this.$fullscreen[0].webkitRequestFullscreen) { /* Safari */
                this.$fullscreen[0].webkitRequestFullscreen();
            } else if (this.$fullscreen[0].msRequestFullscreen) { /* IE11 */
                this.$fullscreen[0].msRequestFullscreen();
            }
            return;
        }
        var x = event.clientX;
        var y = event.clientY;
        //console.log('$("#" + id).position().left=' + $("#" + id).position().left);
        var d = {};
        var speed = 300;
        this.$fullscreen.css('position', 'fixed');
        this.targetPos.left = this.$fullscreen.position().left;
        this.targetPos.top = this.$fullscreen.position().top;
        this.targetPos.width = this.$fullscreen.width();
        this.targetPos.height = this.$fullscreen.height();
        //***
        d = {
            left: x,
            top: y,
            width: '0%',
            height: '0%'
        }//***/
        this.$fullscreen.animate(d, 0);
        d = {

            left: '0px',
            top: '0px',
            zIndex: 1111,
            width: '100%',
            height: '100%'
        }

        this.$fullscreen.animate(d, speed);
    }

    offscreen() {
        if (this.type) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
            return;
        }

        var x = event.clientX;
        var y = event.clientY;
        //console.log('$("#" + id).position().left=' + $("#" + id).position().left);
        var d = {};
        var speed = 300;
        d = {
            left: -10000, //clickedX,
            top: this.clickedY,
            zIndex: 1111,
            width: '0%',
            height: '0%'
        }

        this.$fullscreen.animate(d, speed);
        this.$fullscreen.empty();
    }

    eventHandler(e) {
        e.data.self.offscreen();
    }
}

var __sel_target;

var removeGridClass = function (target) {
    target.removeClass('col col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12');
}

var onGridSelectedTarget = function () {
    var len = $(__sel_target).parent().children().length;
    //alert(len);
    $(__sel_target).parent().children().each(function () {
        var id = $(this).attr('gridnum');

        if ($(__sel_target).attr('gridnum') == $(this).attr('gridnum')) {
            //alert('equal' + id);
            removeGridClass($(__sel_target));
        }

    });
}

var setEditEvent = function (selection) {
    
    //$(document).off('mouseenter mouseleave click dblclick', type);
    $(document).on('mouseenter mouseleave click dblclick', selection, function (event) {
        if (event.type == "mouseenter") {
            //console.log("mouseenter");
            //$(type).css('border','');
            $(__sel_target).css('border', '2px solid blue');
            $(this).css('border', '2px solid red');
        } else if (event.type == "mouseleave") {
            //console.log("mouseleave");
            $(this).css('border', '');
            $(__sel_target).css('border', '2px solid blue');
        } else if (event.type == "click") {
            event.stopPropagation();
            //console.log("click");
            $(__sel_target).css('border', '');
            $(__sel_target).css("opacity", "1");
            __sel_target = this;
            //$(event.__sel_target).css('border','1px solid blue');
            $(this).css('border', '2px solid blue');
            $(this).css("opacity", "0.5");

            onGridSelectedTarget();
            
        } else if (event.type == "dblclick") {
            //console.log("dblclick");
            $(__sel_target).css('border', '');
            $(__sel_target).css("opacity", "1");
            __sel_target = this;
            //$(event.__sel_target).css('border','1px solid blue');
            $(this).css('border', '2px solid blue');
            $(this).css("opacity", "0.5");

        }
        //console.log(event.type, " :: ", event.__sel_target, " :: ", this.id);
    });

}

var offEditEvent = function (selection) {
    //$(type).off('mouseenter mouseleave click');
    $(document).off('mouseenter mouseleave click dblclick', selection);
}

function generateAvatar( text, width, height, foregroundColor = "white", backgroundColor = "black" ) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    
    // 얼굴
    const faceRadius = canvas.width / 5; // 얼굴 반지름 (캔버스 너비의 20%)
    context.beginPath();
    context.fillStyle = "#ff0000"; // 빨간색
    context.arc(canvas.width / 2, canvas.height / 4, faceRadius, 0, 2 * Math.PI);
    context.fill();

    // 눈
    const eyeRadius = faceRadius / 5; // 눈 반지름 (얼굴 반지름의 20%)
    context.beginPath();
    context.fillStyle = "#ffffff"; // 흰색
    context.arc(canvas.width / 2 - faceRadius / 3, canvas.height / 4 - faceRadius / 3, eyeRadius, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.fillStyle = "#ffffff"; // 흰색
    context.arc(canvas.width / 2 + faceRadius / 3, canvas.height / 4 - faceRadius / 3, eyeRadius, 0, 2 * Math.PI);
    context.fill();

    // 입
    const mouthWidth = faceRadius / 2; // 입 너비 (얼굴 반지름의 절반)
    context.beginPath();
    context.strokeStyle = "#000000"; // 검은색
    context.lineWidth = 5; // 선 너비
    context.moveTo(canvas.width / 2 - mouthWidth / 2, canvas.height / 4 + faceRadius / 3);
    context.quadraticCurveTo(canvas.width / 2, canvas.height / 4 + faceRadius / 2, canvas.width / 2 + mouthWidth / 2, canvas.height / 4 + faceRadius / 3);
    context.stroke();

    // 머리카락
    context.beginPath();
    context.fillStyle = "#000000"; // 검은색
    context.moveTo(canvas.width / 3, canvas.height / 5);
    context.lineTo(2 * canvas.width / 3, canvas.height / 5);
    context.quadraticCurveTo(canvas.width / 2, canvas.height / 7, canvas.width / 2, canvas.height / 10);
    context.quadraticCurveTo(2 * canvas.width / 3 - faceRadius / 3, canvas.height / 7, canvas.width / 3, canvas.height / 5);
    context.fill();

    // 몸
    const bodyWidth = faceRadius * 1.2; // 몸 너비 (얼굴 너비의 1.2배)
    const bodyHeight = faceRadius * 1.8; // 몸 높이 (얼굴 높이의 1.8배)
    context.beginPath();
    context.fillStyle = "#000000"; // 검은색
    context.fillRect(canvas.width / 2 - bodyWidth / 2, canvas.height / 4 + faceRadius + faceRadius / 5, bodyWidth, bodyHeight);

    // 팔
    const armLength = bodyHeight * 0.8; // 팔 길이 (몸 높이의 80%)
    const armWidth = bodyWidth / 3; // 팔 너비 (몸 너비의 1/3)
    context.beginPath();
    context.strokeStyle = "#000000"; // 검은색
    context.lineWidth = 5; // 선 너비
    context.moveTo(canvas.width / 2 - bodyWidth / 2 + armWidth / 2, canvas.height / 4 + faceRadius + faceRadius / 5 + bodyHeight / 3);
    context.lineTo(canvas.width / 2 - bodyWidth / 2 + armWidth / 2, canvas.height / 4 + faceRadius + faceRadius / 5 + bodyHeight / 3 - armLength);
    //context.moveTo(canvas.width / 2 + bodyWidth /

    // 다리
    context.beginPath();
    context.strokeStyle = "#000000"; // 검은색
    context.lineWidth = 5; // 선 너비
    context.moveTo(90, 270); // 왼쪽 다리 시작점
    context.lineTo(70, 310); // 왼쪽 발
    context.moveTo(110, 270); // 오른쪽 다리 시작점
    context.lineTo(130, 310); // 오른쪽 발


    return canvas.toDataURL("image/png");
}

var onImgError = function (e) {
    // 이미지 오류가 발생할 때 replaceWith를 이용해서 바꿔 출력하기
    var imgtype = $(e).attr('imgtype');
    var w = $(e).width();
    var h = $(e).width();
    e.src = generateAvatar('abc', w, h, 'white', 'blue');
    
    //$("img[class=aaa]").replaceWith('<p style="vertical- align:middle";>No image!</p>');
    //if (imgtype == 'thumbnail') {
        //$(e).replaceWith('<p style="vertical- align:middle";>No thumbnail image!</p>');
    //} else if (imgtype == 'media') {
        //$(e).replaceWith('<p style="vertical- align:middle";>No media image!</p>');
    //}
}

var __splitterDragElementHorizontal = function (element) {
    var md; // remember mouse down info
    var prevNode = element.previousElementSibling;
    var nextNode = element.nextElementSibling;
    console.log("prevNode: " + prevNode);
    var md; // remember mouse down info
    //const first = document.getElementById("up");
    //const second = document.getElementById("down");
    const first = prevNode;
    const second = nextNode;

    element.onmousedown = onMouseDown;

    function onMouseDown(e) {
        console.log("mouse down: " + e.target);
        md = {
            e,
            offsetLeft: element.offsetLeft,
            offsetTop: element.offsetTop,
            firstWidth: first.offsetWidth,
            secondWidth: second.offsetWidth
        };

        document.onmousemove = onMouseMove;
        document.onmouseup = () => {
            //console.log("mouse up");
            document.onmousemove = document.onmouseup = null;
        }
    }

    function onMouseMove(e) {
        //console.log("mouse move: " + e.clientX);
        var delta = {
            x: e.clientX - md.e.clientX,
            y: e.clientY - md.e.clientY
        };

        // Prevent negative-sized elements
        delta.x = Math.min(Math.max(delta.x, -md.firstWidth),
            md.secondWidth);

        element.style.left = md.offsetLeft + delta.x + "px";
        first.style.width = (md.firstWidth + delta.x) + "px";
        second.style.width = (md.secondWidth - delta.x) + "px";
    }
}

__setPopupMenuPostion = function (event, contextMenu) {

    var mousePosition = {};
    var menuPostion = {};
    var menuDimension = {};

    menuDimension.x = contextMenu.width();
    menuDimension.y = contextMenu.height();
    mousePosition.x = event.pageX;
    mousePosition.y = event.pageY;

    if (mousePosition.x + menuDimension.x > $(window).width() + $(window).scrollLeft()) {
        menuPostion.x = mousePosition.x - menuDimension.x;
    } else {
        menuPostion.x = mousePosition.x;
    }

    if (mousePosition.y + menuDimension.y > $(window).height() + $(window).scrollTop()) {
        menuPostion.y = mousePosition.y - menuDimension.y;
    } else {
        menuPostion.y = mousePosition.y;
    }
    //console.log(menuPostion);
    return menuPostion;
}

var resisterDragWindowEvent = function () {
    $(document).off("mousedown", ".winframe", null);
    $(document).off("click", ".maxbtn", null);
    $(document).off("click", ".xbtn", null);
    $(document).on("mousedown", ".winframe", function (e) {
        $(".active").removeClass("active");
        $(this).addClass("active");
    });
    //COLOR CHANGNG

    $(document).on("click", ".maxbtn", function (e) {
        $(this).parent().parent().toggleClass("maximized");
    });
    $(document).on("click", ".xbtn", function (e) {
        $(this).parent().parent().remove();
    });
}

var __gridWindows = function () {
    // 브라우저의 width height 값을 얻습니다.
    var browserWidth = innerWidth;
    var browserHeight = innerHeight;
    // 윈도우의 width height 값을 계산합니다.
    var windowWidth = browserWidth / 2; // 2열로 배치
    var windowHeight = browserHeight / 2; // 3열로 배치
    console.log('innerWidth=', innerWidth);
    console.log('innerHeight=', innerHeight);
    Array.from(document.querySelectorAll('Winframe')).forEach((a, i) => {
        // 윈도우의 top left 값을 결정합니다.
        var windowTop = windowHeight * Math.floor(i / 2); // 2열로 배치
        // var windowTop = windowHeight * Math.floor(i / 3); // 3열로 배치
        var windowLeft = windowWidth * (i % 2); // 2열로 배치

        var window = a;
        if (!window)
            return;
        // 윈도우 요소의 style 속성을 변경합니다.
        window.style.width = windowWidth + "px";
        window.style.height = windowHeight + "px";
        window.style.top = windowTop + "px";
        window.style.left = windowLeft + "px";
        var contentEl = window.querySelector('.wincontent');
        contentEl.style.width = windowWidth - 5 + "px";
        contentEl.style.height = windowHeight - 33 + "px";

    });

}

var __stairWindows2 = function() {
    var browserWidth = innerWidth;
    var browserHeight = innerHeight;
    var windowWidth = browserWidth / 3;
    var windowHeight = browserHeight / 3;
    // 윈도우 요소들을 찾아서 style 속성을 변경합니다.
    Array.from(document.querySelectorAll('Winframe')).forEach((a, i) => {
        // 윈도우의 top left 값을 결정합니다.
        //var windowTop = windowHeight * i;
        //var windowLeft = browserWidth - windowWidth * (i + 1);
        var windowTop = 50 * i;
        //var windowLeft = browserWidth - windowWidth - 30 * (i + 1);
        var windowLeft = browserWidth - windowWidth - 30 ;
        // 윈도우 요소를 찾습니다.
        var window = a;
        if (!window)
            return;
        console.log('windowLeft=', windowLeft);
        window.style.width = windowWidth + "px";
        window.style.height = windowHeight + "px";
        window.style.top = windowTop + "px";
        window.style.left = windowLeft + "px";
        var contentEl = window.querySelector('.wincontent');
        contentEl.style.width = windowWidth - 5 + "px";
        contentEl.style.height = windowHeight - 33 + "px";
    });

}

var __stairWindows = function() {

    // 브라우저의 width height 값을 얻습니다.
    var browserWidth = innerWidth;
    var browserHeight = innerHeight;
    // 윈도우의 width height 값을 계산합니다.
    var windowWidth = browserWidth / 3;
    var windowHeight = browserHeight / 3;
    // 윈도우 요소들을 찾아서 style 속성을 변경합니다.
    Array.from(document.querySelectorAll('Winframe')).forEach((a, i) => {
        // 윈도우의 top left 값을 결정합니다.
        //var windowTop = windowHeight * i;
        //var windowLeft = windowWidth * i;
        var windowTop = 50 * i;
        //var windowLeft = 30 * (i + 1);
        var windowLeft = 30;
        // 윈도우 요소를 찾습니다.
        var window = a;
        if (!window)
            return;
        // 윈도우 요소의 style 속성을 변경합니다.
        window.style.width = windowWidth + "px";
        window.style.height = windowHeight + "px";
        window.style.top = windowTop + "px";
        window.style.left = windowLeft + "px";
        var contentEl = window.querySelector('.wincontent');
        contentEl.style.width = windowWidth - 5 + "px";
        contentEl.style.height = windowHeight - 33 + "px";
    });

}
var __insertWindow = function (node, title, x, y, width, height, color, bxbtn) {
    resisterDragWindowEvent();
    
    var $win = $('<Winframe class="winframe">');
    var $toolbar = $('<div class="wintopbar">');
    $toolbar.css("background-color", color);
    var $title = $('<div class="wintitle">').append(title);
    if (bxbtn)
        $toolbar.append('<i class="fa fa-fw fa-bars"></i>').append($title).append('<div class="maxbtn"><i class="fa fa-square-o"></i></div>');
    else
        $toolbar.append('<i class="fa fa-fw fa-bars"></i>').append($title).append('<div class="maxbtn"><i class="fa fa-square-o"></i></div>').append('<div class="xbtn"><i class="fa fa-times"></i></div>');
    var $content = $('<div class="wincontent">');
    
    $(document.body).append($win);

    $win.append($toolbar).append($content);

    $content.append(node);

    $(".active").removeClass("active");
    $win.addClass("active");
    $win.css({ position: 'absolute', left: x, top: y });
    $content.css({ width: width + 'px', height: height + 'px' });
    //$win.width(width);
    //$win.height(height);

    $('.winframe').not(".maximized").resizable({
        alsoResize: ".active .wincontent",
        minWidth: 200,
        minHeight: 59
    }).draggable({
        handle: ".wintopbar"
    });

    //alert('$win' + $win.html());
    //return $win;
    return $win;
}

var __splitterDragElementVertical = function (element) {
    var prevNode = element.previousElementSibling;
    var nextNode = element.nextElementSibling;
    console.log("prevNode: " + prevNode);
    var md; // remember mouse down info
    //const first = document.getElementById("up");
    //const second = document.getElementById("down");
    const first = prevNode;
    const second = nextNode;

    element.onmousedown = onMouseDown;

    function onMouseDown(e) {
        console.log("mouse down: " + e.target);
        md = {
            e,
            offsetLeft: element.offsetLeft,
            offsetTop: element.offsetTop,
            firstHeight: first.offsetHeight,
            secondHeight: second.offsetHeight
        };

        document.onmousemove = onMouseMove;
        document.onmouseup = () => {
            //console.log("mouse up");
            document.onmousemove = document.onmouseup = null;
        }
    }

    function onMouseMove(e) {
        //console.log("mouse move: " + e.clientX);
        var delta = {
            x: e.clientX - md.e.clientX,
            y: e.clientY - md.e.clientY
        };

        // Prevent negative-sized elements
        delta.x = Math.min(Math.max(delta.x, -md.firstHeight),
            md.secondHeight);

        element.style.top = md.offsetTop + delta.y + "px";
        first.style.height = (md.firstHeight + delta.y) + "px";
        second.style.height = (md.secondHeight - delta.y) + "px";
    }
}

var __changeSerialize = function (values, k, v) {
    var found = false;
    for (var i = 0; i < values.length && !found; i++) {
        if (values[i].name == k) {
            //alert(k);
            values[i].value = v;
            found = true;
            //alert(values[i].value);
        }
    }

    return values;
}

var __openFileData = function (arg) {
    console.log('arg.arg.path=', arg.path);
    fetch(arg.path)
    .then((response) => response.text())
    .then(data => {
        console.log('arg.arg.filepath=', arg.arg.filepath);
        console.log('arg.arg.filename=', arg.arg.filename);
        //console.log('arg.arg.$parent=', arg.arg.$parent);
        arg.arg.$parent.LoadData(data, arg.arg);
    })// 에러처리
    .catch(() => {
        console.log('에러')
    });

}

var __saveFileData = function (arg) {
    //console.log(`fetch arg.formdata==${arg.formdata}`);

    $.ajax({
        url: arg.path,
        async: false,
        type: "POST",
        // if(e.type != "open")
        data: arg.formdata,
        success: function (data) {
            // 통신이 성공적으로 이루어졌을 때 이 함수를 타게 된다.
            //console.log("data" + data);
           // var xmlDoc = $.parseXML(data);
           // var err = $(xmlDoc).find('Msg').attr('error');
            //console.log(`postAjax err====${err}`);
            
        },
        complete: function (data) {
        },
        error: function (response) {
            console.log(response.responseText);
        },
        failure: function (response) {
            console.log(response.responseText);
        },
        cache: false
    });
    
    // prevent default posting of form
    event.preventDefault();

}

var __includeHTML = function (ht) {

    var z, i, elmnt, file, type;
    z = document.getElementsByTagName("da");

    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("include");
        type = elmnt.getAttribute("type");

        if (file) {

            var dbpath = elmnt.getAttribute("dbpath");
            var code = elmnt.getAttribute("code");
            var title = elmnt.getAttribute("title");
            var renderview = elmnt.getAttribute("renderview");
            var rendertype = elmnt.getAttribute("rendertype");
            var viewbody = elmnt.getAttribute("viewbody");
            var viewtype = elmnt.getAttribute("viewtype");
            
            if (type === "boardlist" || type === "grouplist" || type === "viewbody") {
                //console.log('title=', title, 'code=', code);
                var groupid = elmnt.getAttribute("groupid");
                var brdid = elmnt.getAttribute("brdid");
                var uid = elmnt.getAttribute("uid");
                var fid = elmnt.getAttribute("fid");
                var c = new BoardController({ type: type, dbpath: dbpath, code: code, title: title, groupid: groupid, brdid: brdid, uid: uid, fid: fid, renderview: renderview, rendertype: rendertype, viewtype: viewtype });
                c.renderController(elmnt);
                elmnt.removeAttribute("include");
                __includeHTML(ht);
                return;
            } else if (type === "boardconfig") {
                var c = new BoardConfigController({ type: type, dbpath: dbpath, code: code, title: title, renderview: renderview });
                c.renderController(elmnt);
                elmnt.removeAttribute("include");
                __includeHTML(ht);
                return;
            } else if (type === "erplist" || type === "erpview") {
                var empcode = elmnt.getAttribute("empcode");
                var companycode = elmnt.getAttribute("companycode");
                var c = new ErpController({ type: type, dbpath: dbpath, code: code, empcode: empcode, companycode: companycode, title: title, renderview: renderview, rendertype: rendertype, viewbody: viewbody });
                c.renderController(elmnt);
                elmnt.removeAttribute("include");
                __includeHTML(ht);
                return;
            } else if (type === "pollview" || type === "polllist") {
                var uid = elmnt.getAttribute("uid");
                var fid = elmnt.getAttribute("fid");
                var c = new PollController({ type: type, dbpath: dbpath, code: code, uid: uid, fid: fid, title: title, renderview: renderview, rendertype: rendertype, viewbody: viewbody });
                c.renderController(elmnt);
                elmnt.removeAttribute("include");
                __includeHTML(ht);
                return;
            } else if (type === "shoplist") {

            } else if (type === "keyvalue") {
                var kcode = elmnt.getAttribute("kcode");
                var kname = elmnt.getAttribute("kname");
                var c = new KeyvalueController({ type: type, dbpath: dbpath, kcode: kcode, kname: kname, title: title, renderview: renderview, rendertype: rendertype });
                c.renderController(elmnt);
                elmnt.removeAttribute("include");
                __includeHTML(ht);
                return;
            } else if (type === "chat") {
                
                var serverip = elmnt.getAttribute("serverip");
                var c = new ChatView({ serverip: serverip, title: title });
                c.renderController(elmnt);
                elmnt.removeAttribute("include");
                __includeHTML(ht);
                return;
            } else if (type === "rtcchat") {

                var serverip = elmnt.getAttribute("serverip");
                var c = new RtcSignalingChat({ serverip: serverip, title: title });
                c.renderController(elmnt);
                elmnt.removeAttribute("include");
                __includeHTML(ht);
                return;
            }
            else if (type === "dbweb" || type === "fileweb") {
                console.log(type);
                var fb = new DaWebLoader({ type: type, path: file, dbpath: dbpath });
                fb.renderController(elmnt);
                elmnt.removeAttribute("include");
                __includeHTML(ht);
                return;
            } else if (type === "dbfab" || type === "filefab") {
                var width = elmnt.getAttribute("width");
                var height = elmnt.getAttribute("height");
                var fb2 = new FabricLoader({ type: type, path: file, dbpath: dbpath, width: width, height: height});
                fb2.renderController(elmnt);
                elmnt.removeAttribute("include");
                __includeHTML(ht);
                return;
            }
            //console.log(file + ((/\?/).test(file) ? "&" : "?") + (new Date()).getTime());
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        //elmnt.innerHTML = this.responseText;
                        //var xmlDoc = $.parseXML(this.responseText);
                        //console.log(this.responseText);
                        
                        if (type == 'fab') {
                            var width = elmnt.getAttribute("width");
                            var height = elmnt.getAttribute("height");
                            var fab = new FabricLoader({ elem: elmnt, width: width, height: height });
                            fab.setFabData(this.responseText);
                        } else {
                            $(elmnt).html(this.responseText);
                        }
                        
                    }
                    if (this.status === 404) {
                        
                        elmnt.innerHTML = "Page not found.";
                        //console.log(elmnt.innerHTML);
                    }
                    elmnt.removeAttribute("include");
                    __includeHTML(ht);
                }
                
                
            };
            xhttp.open("GET", file + ((/\?/).test(file) ? "&" : "?") + (new Date()).getTime(), true);
            xhttp.send();
            return;
        }
    }
}

var __keyvalueSplitString = function (str){
    var splitInfo = {};
    if (str) {
        var params = str.split('&');
        //console.log('params.length=', params.length);
        if (params.length == 1) {
            //splitInfo.subject = str;
            //return splitInfo;
        }

        for (var i = 0; i < params.length; i++) {
            const firstIndex = params[i].indexOf('=');
            const type = params[i].substring(0, firstIndex);
            const newStr = params[i].substring(firstIndex + 1, params[i].length);
            //console.log(newStr)

            var param = params[i].split('=');
            if (type) {
                if (type == "link")
                    splitInfo.link = newStr;
                else if (type == "board")
                    splitInfo.board = newStr;
                else if (type == "self")
                    splitInfo.self = newStr;
                else if (type == "action")
                    splitInfo.action = newStr;
                else if (type == "subject")
                    splitInfo.subject = newStr;
                else if (type == "image")
                    splitInfo.image = newStr;
                else if (param[0] == "icon") 
                    splitInfo.icon = newStr;
                else if (param[0] == "itemtype")
                    splitInfo.itemtype = newStr;
            }
        }
    } else
        return null;
    return splitInfo;
}

var __boardConfigSplitString = function (str) {
    var splitInfo = {};
    if (str) {
        var params = str.split(';');
        console.log('params.length=', params.length);
        if (!params)
            return;
        for (var i = 0; i < params.length; i++) {
            
            var param = params[i].split(':');
            console.log('param[0]=', param[0]);
            console.log('param[1]=', param[1]);
            param[0] = param[0].trim();
            if (param[1])
                param[1] = param[1].trim();
            if (param[0]) {
                if (param[0] == "type")
                    splitInfo.type = param[1];
                else if (param[0] == "dbpath")
                    splitInfo.dbpath = param[1];
                else if (param[0] == "code")
                    splitInfo.code = param[1];
                else if (param[0] == "brdid")
                    splitInfo.brdid = param[1];
                else if (param[0] == "rendertype") 
                    splitInfo.rendertype = param[1];
                else if (param[0] == "renderview") 
                    splitInfo.renderview = param[1];
                else if (param[0] == "viewbody") 
                    splitInfo.viewbody = param[1];
                else if (param[0] == "viewtype")
                    splitInfo.viewtype = param[1];
            }
        }
    } else
        return null;
    return splitInfo;
}

var __modal = null;
var __fullscreenIndex = 10000;
$(document).ready(function () {
    __modal = new ModalView();
    __includeHTML();
});

var __mainController = null;
var $$ = function (id) { return document.getElementById(id) };