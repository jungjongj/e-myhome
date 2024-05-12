class TemplateBase {

    constructor(dbpath, code) {
        this.controls = [];
    }

    renderController() {
        for (var i = 0; i < this.controls.length; i++) {
            this.controls[i].renderController();
        }
    }

    addController(controller) {

    }

    removeController(controller) {

    }

    eventHandler(event) {
        if (event.type == 'fullscreenchange') {
            /* 전체화면 여부 변화 처리 */
        } else /* fullscreenerror */ {
            /* 전체화면 오류 처리 */
        }
    }
}

class MafiaGameTemp {
    constructor() {
        this.info = null;
    }

    createMafiaGameTemplate(info) {
        var main = new MainLayout();
        var ver = new VerticalLayout();
        var hor = new HorizontalLayout();

        main.addControl(ver);
        main.addControl(hor);

        var erp = new ErpController({ type: 'erplist', dbpath: _dbpath, code: 'employee', renderview: new EmployeeView(), rendertype: 'media', viewbody: new EmployeeViewbodyTemplate() });

        var d = new KeyvalueController('keyvalue', 'config.dadb', 'bookmark', 'aaa', new TopMenuView(), { rendertype: 'media' }, '');
        ver.addControl(d);
        var c = new BoardController('grouplist', "daboard.dadb", "da_board", 3, new BoardView(), { rendertype: 'media' });
        ver.addControl(c);
        

        console.log('typeof c.constructor.name=' + c.constructor.name);
        var board = new BoardController('main_boardlist', info.dbpath, "da_board", 3333, new BoardView(), { rendertype: 'media' });
        var erp = new ErpController('erplist', info.dbpath, 'employee', new EmployeeView(), { rendertype: 'media' } , '', '');
        hor.setControl([erp, 4], [board, 8]);

        main.renderController(info.elem);

        //alert("$box.html()" + $box.html());
        //return $box;
    }
}

class ProfileItem {
    constructor() {
        this.info = null;
    }

    renderController(elem) {
        $(elem).append(this.createProfileItem(this.info));
    }

    createProfileItem(info) {
        var strTag;

        var $box = $('<div class="card">');  //ex: box-default box-danger box-warning box-success box-solid
        if (info.cls) {
            var cls = info.cls;
            if (cls === 'warning' || cls === 'info' || cls === 'light') {
                cls = 'text-dark bg-' + cls;
            } else {
                cls = 'text-white bg-' + cls;
            }
            $box.addClass(cls);
        }
        var $boxBody = null;
        var $img = null;
        if (info.img) {
            $img = info.img;
        } else {
            //console.log(info.imgsrc);
            if (info.imgsrc) {
                $img = $(`<img src="${info.imgsrc}" onerror="onImgError(this);" class="card-img-top mr-3" imgtype="thumbnail" >`);
            } else if (info.iconclass) {
                $img = $(`<i class="${info.iconclass}">`);
            } else {
                $img = $(`<img src="..." onerror="onImgError(this);" class="card-img-top mr-3" imgtype="thumbnail" >`);
            }
        }
        //console.log("icon" + $box.html());
        $boxBody = $('<div class="card-body" style="overflow:auto">').css("display", info.display).attr("id", info.boxbodyid);

        if (info.subject) {
            var $bodySubject = $('<h4 class="card-title">').append(info.subject);
            $boxBody.append($bodySubject);
        }
        if (info.comment) {
            var $bodyComment = $('<p>').append(info.comment);
            $boxBody.append($bodyComment);
        }
        if (info.append) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.append);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $box.append($img).append($boxBody);

        //alert("$box.html()" + $box.html());
        return $box;
    }

}

class EmployeeViewbodyTemplate {
    constructor() {
        this.info = null;
    }

    createProfile(info) {
        var m = `<div >
                    <!--left col-->

                    <div class="text-center">
                        <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar">
                        
                    </div><br>

                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>이름</small>
                            <div><strong class="mb-1">${info.empname ?? ''}</strong></div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>이메일</small>
                            <div><strong class="mb-1">${info.email ?? ''}</strong></div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>주소</small>
                            <div><strong class="mb-1">${info.addr ?? ''}</strong></div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>이름.</small>
                            <div><strong class="mb-1">Some placeholder content in a paragraph.</strong></div>
                        </a>

                    </div>

                    <div class="list-group" role="tablist">
                        <div href="#" class="list-group-item list-group-item-action active" data-toggle="list" aria-current="true">
                            <div>
                                <small>이메일</small>
                                <div><strong class="mb-1">${info.email ?? ''}</strong></div>
                            </div>
                        </div>
                        <div href="#" class="list-group-item list-group-item-action" data-toggle="list">${info.empname ?? ''}</div>
                        <div href="#" class="list-group-item list-group-item-action" data-toggle="list">${info.email ?? ''}</div>
                        <a href="#" class="list-group-item list-group-item-action" data-toggle="list">${info.addr ?? ''}</a>
                        <a class="list-group-item list-group-item-action disabled" data-toggle="list">A disabled link item</a>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading">Social Media</div>
                        <div class="panel-body">
                            <i class="fa fa-facebook fa-2x"></i> <i class="fa fa-github fa-2x"></i> <i class="fa fa-twitter fa-1x"></i> <i class="fa fa-pinterest fa-2x"></i> <i class="fa fa-google-plus fa-2x"></i>
                        </div>
                    </div>

                </div><!--/col-3-->`;
        return m;
    }

    createViewbody(info, arg, eventHandler) {
        var main = new MainLayout();
        var ver = new VerticalLayout();
        var hor = new HorizontalLayout();

        main.addControl(ver);
        main.addControl(hor);

        //var p = new ProfileItem(info);
        var p = this.createProfile(info);
        
        //console.log('arg.renderinfo.rendertype333=' + arg.renderinfo.rendertype);
        //console.log('info.uid33=' + info.uid);
        var board = new BoardController({ type: 'boardlist', dbpath: arg.dbpath, code: "da_employee", brdid: info.uid, renderview: new BoardView(), rendertype: 'table', tabthread: [{ key: 'aaa', value: 'alink' }, { key: 'bbb', value: 'blink' }] });
        //var erp = new ErpController('erplist', info.dbpath, 'employee', new EmployeeView(), {} , '');
        hor.setControl([p, 4], [board, 8]);

        

        var $page = $("<div>");
        //$(arg.elem).empty();
        main.renderController($page);

        var f = new FullScreenView();
        f.setContent(`뷰 보기2`, $page);
        console.log("info.uid=" + info.uid);
        return main;
    }
}

class CompanyViewbodyTemplate {
    constructor() {
        this.info = null;
    }

    createProfile(info) {
        var m = `<div >
                    <!--left col-->

                    <div class="text-center">
                        <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar">
                        
                    </div><br>

                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>이름</small>
                            <div><strong class="mb-1">${info.sangho ?? ''}</strong></div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>이메일</small>
                            <div><strong class="mb-1">${info.ceo ?? ''}</strong></div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>주소</small>
                            <div><strong class="mb-1">${info.addr ?? ''}</strong></div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>이름.</small>
                            <div><strong class="mb-1">Some placeholder content in a paragraph.</strong></div>
                        </a>

                    </div>

                    <div class="list-group" role="tablist">
                        <div href="#" class="list-group-item list-group-item-action active" data-toggle="list" aria-current="true">
                            <div>
                                <small>이메일</small>
                                <div><strong class="mb-1">${info.email ?? ''}</strong></div>
                            </div>
                        </div>
                        <div href="#" class="list-group-item list-group-item-action" data-toggle="list">${info.empname ?? ''}</div>
                        <div href="#" class="list-group-item list-group-item-action" data-toggle="list">${info.email ?? ''}</div>
                        <a href="#" class="list-group-item list-group-item-action" data-toggle="list">${info.addr ?? ''}</a>
                        <a class="list-group-item list-group-item-action disabled" data-toggle="list">A disabled link item</a>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading">Social Media</div>
                        <div class="panel-body">
                            <i class="fa fa-facebook fa-2x"></i> <i class="fa fa-github fa-2x"></i> <i class="fa fa-twitter fa-1x"></i> <i class="fa fa-pinterest fa-2x"></i> <i class="fa fa-google-plus fa-2x"></i>
                        </div>
                    </div>

                </div><!--/col-3-->`;
        return m;
    }

    createViewbody(info, arg, eventHandler) {
        var main = new MainLayout();
        var ver = new VerticalLayout();
        var hor = new HorizontalLayout();

        main.addControl(ver);
        main.addControl(hor);

        //var p = new ProfileItem(info);
        var p = this.createProfile(info);

        console.log('arg.renderinfo.rendertype333=' + arg.rendertype);
        var board = new BoardController({ type: 'boardlist', dbpath: arg.dbpath, code: "da_company", brdid: info.uid, renderview: new BoardView(), rendertype: 'table', tabthread: [{ key: 'aaa', value: 'alink' }, { key: 'bbb', value: 'blink' }] });
        //var erp = new ErpController('erplist', info.dbpath, 'employee', new EmployeeView(), {} , '');
        hor.setControl([p, 4], [board, 8]);



        var $page = $("<div>");
        //$(arg.elem).empty();
        main.renderController($page);

        var f = new FullScreenView();
        f.setContent(`뷰 보기2`, $page);
        console.log("info.uid=" + info.uid);
        return main;
    }
}

class CommunityTemplate {
    constructor() {
        this.info = null;
    }

    createProfile(info) {
        var m = `<div >
                    <!--left col-->

                    <div class="text-center">
                        <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar">
                        
                    </div><br>

                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>이름</small>
                            <div><strong class="mb-1">${info.sangho ?? ''}</strong></div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>이메일</small>
                            <div><strong class="mb-1">${info.ceo ?? ''}</strong></div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>주소</small>
                            <div><strong class="mb-1">${info.addr ?? ''}</strong></div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>이름.</small>
                            <div><strong class="mb-1">Some placeholder content in a paragraph.</strong></div>
                        </a>

                    </div>

                    <div class="list-group" role="tablist">
                        <div href="#" class="list-group-item list-group-item-action active" data-toggle="list" aria-current="true">
                            <div>
                                <small>이메일</small>
                                <div><strong class="mb-1">${info.email ?? ''}</strong></div>
                            </div>
                        </div>
                        <div href="#" class="list-group-item list-group-item-action" data-toggle="list">${info.empname ?? ''}</div>
                        <div href="#" class="list-group-item list-group-item-action" data-toggle="list">${info.email ?? ''}</div>
                        <a href="#" class="list-group-item list-group-item-action" data-toggle="list">${info.addr ?? ''}</a>
                        <a class="list-group-item list-group-item-action disabled" data-toggle="list">A disabled link item</a>
                    </div>

                    <div class="panel panel-default">
                        <div class="panel-heading">Social Media</div>
                        <div class="panel-body">
                            <i class="fa fa-facebook fa-2x"></i> <i class="fa fa-github fa-2x"></i> <i class="fa fa-twitter fa-1x"></i> <i class="fa fa-pinterest fa-2x"></i> <i class="fa fa-google-plus fa-2x"></i>
                        </div>
                    </div>

                </div><!--/col-3-->`;
        return m;
    }

    createViewbody(info, arg, eventHandler) {
        var main = new MainLayout();
        var ver = new VerticalLayout();
        var hor = new HorizontalLayout();

        main.addControl(ver);
        main.addControl(hor);

        //var p = new ProfileItem(info);
        var p = this.createProfile(info);

        console.log('arg.renderinfo.rendertype333=' + arg.renderinfo.rendertype);
        var keymenu = new KeyvalueController({ settype: 'setting', dbpath: arg.dbpath, kcode: _keycodeselValue, kname: _keynameselValue, rendertype: 'list', renderview: new ListTreeView(), rendertype: 'list', viewbody: new EmployeeViewbodyTemplate() });
        var board = new BoardController({ type: 'boardlist', dbpath: arg.dbpath, "da_company": _code, brdid: info.uid, renderview: new BoardView(), rendertype: 'table', tabthread: [{ key: 'aaa', value: 'alink' }, { key: 'bbb', value: 'blink' }] });
        
        hor.setControl([keymenu, 4], [board, 8]);



        var $page = $("<div>");
        //$(arg.elem).empty();
        main.renderController($page);

        var f = new FullScreenView();
        f.setContent(`뷰 보기2`, $page);
        console.log("info.uid=" + info.uid);
        return main;
    }
}

class ChatView {
    constructor(server_url) {
        //console.log('server_url=', server_url);
        //var server_url = "ws://127.0.0.1:8181/chat";
        this.server_url = server_url;
        //'use strict';
        this.socket;
        this.mynickname = 'Guest-' + Math.floor(Math.random() * 100);
        this.isBoss = false;
        this.myId;
        this.nicklist;
        this.connected = false;
        this.connection_retry_timer;
        this.offerid = null;
        this.answerid = null;
        this.isOfferOrAnswer = false;

        window.addEventListener('beforeunload', (event) => {
            event.preventDefault();
            this.closeMsg();
            // 대표적으로 Chrome에서는 returnValue 설정이 필요합니다.
            event.returnValue = '';
        });
    }

    renderController(elem) {
        this.renderChatting(elem);
        //console.log('$(body).html()=' + $('body').html());
        this.initChat();
        this.initEvent();

        var id = prompt("아이디를 입력하세요", this.mynickname);
        if (id == null || id == "") {
            text = "아무것도 입력하지 않으셨네요 :<";
        } else {
            this.mynickname = id;
        }

        this.connectToServer(this.server_url);
    }

    renderChatting(elem) {
        $(elem).append(this.createChatMemberBox());
        $(elem).append(this.createChatAreaBox());

        var ul = $('<ul id="chatContextMenu" class="dropdown- menu" role="menu" style="display:none">');
        var li1 = $('<li style="list-style:none"><a tabindex="-1" href="#">귓속말</a></li>');
        var li2 = $('<li style="list-style:none"><a tabindex="-1" href="#">추방</a></li>');
        var li3 = $('<li style="list-style:none"><a tabindex="-1" href="#">rtc요청</a></li>');
        var li4 = $('<li style="list-style:none"><a tabindex="-1" href="#">폴더생성</a></li>');
        var li5 = $('<li style="list-style:none"><a tabindex="-1" href="#">삭제</a></li>');
        ul.append(li1).append(li2).append(li3).append(li4).append(li5);
        $('body').append(ul);
    }

    initChat() {
        $('#clear-log-link').click(function () {
            var clear = this.confirm('Clear chat log?');
            if (clear) {
                this.clear_chat_log('#message-log-area');
            }
        });

    }

    initEvent() {

        $("#chatstart_btn").bind("click", { type: "chatstart_btn", self: this }, this.eventHandler);
        $(".chat-member").bind("click", { type: "chat-member", self: this }, this.eventHandler);
        $("#send_btn").bind("click", { type: "send_btn", self: this }, this.eventHandler);
        $("#nickname").bind("keypress", { type: "nickname", self: this }, this.eventHandler);
        $("#msg_box").bind("keypress", { type: "msg_box", self: this }, this.eventHandler);
    }

    createChatMemberBox(info) {

        var $chatMember = `<div class="card border-success ">

                    <div class="card-header bg-transparent border-success">
                        <a class="btn btn-primary" data-toggle="collapse" href="#collapseChatMember" role="button" aria-expanded="false" aria-controls="collapseExample">
                            ↕
                        </a>
                        챗 멤버
                    </div>
                    <div id="collapseChatMember">
                        <div class="card-body text-success" style="overflow-y: auto">
                            <div class="chatter-list">
                                <ul id="chat-member-list" class="_contextmenu"></ul>
                            </div>

                        </div>
                        <div class="card-footer bg-transparent border-success">Footer</div>
                    </div>
                </div>`;

        return $chatMember;
    }

    createChatAreaBox(info) {

        var $chatArea = `<div class="card border-success">

                    <div class="card-header bg-transparent border-success">
                        <a class="btn btn-primary" data-toggle="collapse" href="#collapseChatarea" role="button" aria-expanded="false" aria-controls="collapseExample">
                            ↕
                        </a>
                        채팅
                    </div>

                    <div id="collapseChatarea">
                        <div id="message-log-area" class="card-body" style="height: 233px; overflow-y: auto">

                        </div>
                        <div class="card-footer bg-transparent border-success">
                            <div>
                                <input type="text" id="msg_box" class="form-control msg-box">
                                <span class="input-group-btn"></span>
                                <button type="button" id="send_btn" class="btn btn-warning btn-flat">Send</button>
                            </div>
                        </div>
                    </div>
                </div>`;

        return $chatArea;
    }

    connectToServer(server_url) {
        
        this.open_connection(server_url);

    }

    open_connection(server_url) {

        if ('WebSocket' in window) {
            //alert('WebSocket');
            this.socket = new WebSocket(server_url);
        } else if ('MozWebSocket' in window) {
            console.log('MozWebSocket');
            this.socket = new MozWebSocket(server_url);
        } else {
            alert('WebSocket is not supported by this browser.');
            return;
        }
        var self = this;
        //alert("chat_client open_connection");
        this.socket.onopen = function () {

            self.connected = true;

            self.hideConnectionLostMessage();
            //alert("chat_client socket.onopen hideConnectionLostMessage();");
            clearInterval(self.connection_retry_timer);
            //alert("chat_client connection_retry_timer " + connection_retry_timer);
            self.startMsg(self.mynickname);
            //alert("chat_client socket.onopen");
        };
        this.socket.onmessage = function (event) {
            self.onReceive(event.data);
        };
        this.socket.onclose = function () {

            alert('close');
            self.connected = false;
            self.showConnectionLostMessage();
            //reConnect();
        };
        //alert("chat_client open_connection");
    }

    onReceive(message) {

        console.log('onreceive message=', message);
        if (message instanceof Blob) {

        } else if (message instanceof ArrayBuffer) {

        } else {
            try {
                var json = JSON.parse(message);
                //var json = JSON.parse(Base64.decode(message));
                //console.log('onreceive json=', json);
                //var json = JSON.parse(decodeURIComponent(message).substr(1, decodeURIComponent(message).length - 2));  
                if (json.type == 'msg') {
                    this.addNewMsg(json.name, json.msg);
                } else if (json.type == '@first') {
                    var chatter_list_html = $('<li class="chat_member chatmember_context" style="list-style:none">').attr("ip", json.ip).attr("id", json.name).text(json.name);
                    $('#chat-member-list').append(chatter_list_html);
                    $('#chat-container').fadeIn();
                    $('#loading-message').hide();
                    $('#welcome-message-user-name').html(this.mynickname);
                    if (json.name != this.mynickname)
                        this.sendMessage('@refirst', 'refirst', json.name);
                    this.setChatContextMenu('.chatmember_context', this);
                } else if (json.type == '@refirst') {
                    if (json.tname != this.mynickname)
                        return;
                    var chatter_list_html = $('<li class="chat_member chatmember_context" style="list-style:none">').attr("ip", json.ip).attr("id", json.name).text(json.name);
                    $('#chat-member-list').append(chatter_list_html);
                    $('#chat-container').fadeIn();
                    $('#loading-message').hide();
                    $('#welcome-message-user-name').html(this.mynickname);
                    this.setChatContextMenu('.chatmember_context', this);
                } else if (json.type == '@close') {
                    $('ul li').each(function () {
                        if ($(this).text() == json.name) {
                            $(this).remove();
                            return false;
                        }
                    });
                    this.addNewMsg(json.name, "close");
                } else if (json.type == '@whisper') {
                    
                    this.addNewMsg(json.name, "close");

                } else if (json.type == 'offer') {
                    console.log(' offer this.mynickname=', this.mynickname, 'json.answerid=', json.answerid, 'this.isOfferOrAnswer=', this.isOfferOrAnswer);
                    if (this.mynickname == json.answerid && !this.isOfferOrAnswer) {
                        this.isOfferOrAnswer = true;
                        this.rtcIdset(json.offerid, json.answerid);
                        this.rtcOffered(json.offer);
                    }
                } else if (json.type == 'answer') {
                    console.log(' answer this.mynickname=', this.mynickname, 'json.offerid=', json.offerid, 'this.isOfferOrAnswer=', this.isOfferOrAnswer);
                    if (this.mynickname == json.offerid && this.isOfferOrAnswer) {
                        this.rtcAnswered(json.answer);
                    }

                } else if (json.type == 'candidate') {
                    console.log('json.sendid=', json.sendid, 'this.mynickname=', this.mynickname, 'this.isOfferOrAnswer=', this.isOfferOrAnswer);
                    if (json.sendid != this.mynickname && this.isOfferOrAnswer) {
                        var candidate = new RTCIceCandidate({
                            sdpMLineIndex: json.label,
                            candidate: json.candidate
                        })
                        this.rtcCandidate(candidate);
                    }
                    
                }
            } catch (e) {
                console.log('json 데이타가 아닙니다=', e);
                var arr = message.split(';');
                var arr2 = arr[0].split(':');
                console.log('arr=', arr);
                if (arr2[0] === '@first') {
                    //alert('first');
                    //var chatter_list_html = $("<li>").attr("ip", arr[1]).text(arr2[1]);
                    //$('#chat-member-list').append(chatter_list_html);
                    for (var i = 1; i < arr.length; i++) {
                        arr2 = arr[i].split(':');
                        //chatter_list_html = '<li>' + arr2[0] + ":" + arr2[1] + '</li>';
                        var chatter_list_html = $('<li class="chat_member chatmember_context" style="list-style:none">').attr("ip", arr2[1]).text(arr2[0]);
                        $('#chat-member-list').append(chatter_list_html);
                    }

                    $('#chat-container').fadeIn();
                    $('#loading-message').hide();
                    $('#welcome-message-user-name').html(arr2[1]);
                    this.setChatContextMenu('.chatmember_context', this);
                    console.log('@first=', arr2[0], ' arr2[1]=', arr2[1], ' arr2[2]=', arr2[2]);
                } else if (arr2[0] === '@clist') {
                    arr2 = arr[1].split(':');
                    var chatter_list_html = $('<li class="chat_member chatmember_context" style="list-style:none">').attr("ip", arr2[1]).text(arr2[0]);
                    $('#chat-member-list').append(chatter_list_html);
                    this.setChatContextMenu('.chatmember_context', this);
                } else if (arr2[0] === 'message') {
                    addNewMsg(arr[1], arr[2]);
                    blink_window_title('~ New Message ~');
                } else if (arr2[0] === '@whisper') {
                    addNewMsg(arr[1], arr[2]);
                    blink_window_title('~ New Message ~');

                } else if (arr2[0] === '@close') {
                    arr2 = arr[1].split(':');
                    $('ul li').each(function () {
                        if ($(this).text() == arr2[0]) {
                            $(this).remove();
                            return false;
                        }
                    });
                    addNewMsg(arr[1], "close");
                    //blink_window_title('~ New Message ~');
                } else if (arr2[0] === '@exile') {
                    arr2 = arr[1].split(':');
                    $('ul li').each(function () {
                        if ($(this).text() == arr2[0]) {
                            $(this).remove();
                            return false;
                        }
                    });
                    addNewMsg(arr[1], arr[2]);
                } else if (arr2[0] === 'activity_typing') {
                    /***
                    var activity_msg = message.name + ' is typing..';
                    $('#is-typig-status').html(activity_msg).fadeIn();
                    clearTimeout(is_typing_indicator);
    	
                    is_typing_indicator = setTimeout(function () {
                        $('#is-typig-status').fadeOut();
                    }, 2000);
                    ****/
                }
            }
            
        }
        
    }

    startMsg() {
        //this.sendMessage('@first', 'first', '');
        this.socket.send('@first:' + this.mynickname);
    }

    closeMsg() {
        this.sendMessage('@close', 'closed', '');
    }

    sendFile() {
        // Sending file as Blob
        var file = document.querySelector('input[type="file"]').files[0];
        socket.send(file);
    }

    sendMsgBox() {
        var message = $('#msg_box').val();
        if (message != '') {

            $('#msg_box').val('');
            this.sendMessage('msg', message, '');
        }
    }

    sendMessage(type, message, targetname) {

        try {
            var message_to_send = {
                type: type,
                name: this.mynickname,
                tname: targetname,
                msg: message
            };

            var msg_data_str = JSON.stringify(message_to_send);
            //console.log(`message_to_send== ${message_to_send}`);
            this.socket.send(msg_data_str);
        } catch (e) {
            console.log('error=', e);
        }
        
        //this.socket.send(message);
        //addNewMsg(message);
    }

    date_to_str(format, allDay) {
        //alert(format);
        var year = format.getFullYear();
        var month = format.getMonth() + 1;
        //alert(year);
        if (month < 10) month = '0' + month;
        //alert(month);
        var date = format.getDate();
        if (date < 10) date = '0' + date;
        var hour = format.getHours();
        //alert("date" + date);
        if (hour < 10) hour = '0' + hour;
        var min = format.getMinutes();
        //alert("min" + min);
        if (min < 10) min = '0' + min;
        var sec = format.getSeconds();
        // alert("sec1" + sec);
        if (sec < 10) sec = '0' + sec;
        //alert("sec" + sec);
        if (allDay == 0)
            return year + "-" + month + "-" + date;
        else if (allDay == 1)
            return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
        else if (allDay == 2)
            return hour + ":" + min + ":" + sec;
        else
            return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
    }

    addNewMsg(id, msg) {
        
        var $dat_bubble_box = $('<div class="triangle-isosceles">');
        $dat_bubble_box.append($('<small>').text(id));
        $dat_bubble_box.append($('<p>').text(msg));
        $('#message-log-area').append($dat_bubble_box).addClass('box3 sb13');

        $("#message-log-area").animate({
            scrollTop: $("#message-log-area")[0].scrollHeight
        }, 1000);

    }

    sendWhisper(id) {
        var message = $('#msg_box').val();
        if (message != '') {
            $('#msg_box').val('');
        }
        var msg = "@whisper;" + id + "; " + message;

        this.socket.send(msg);
    }

    sendExile(id) {
        var msg = "@exile;" + id + "; " + message;

        this.socket.send(msg);
    }

    show_timer() {

        var time_start = 5;
        var time_string;

        var tick = window.setInterval(function () {
            if (time_start-- > 0) {
                time_string = time_start + ' seconds';
            } else {
                time_string = '..ahem ahem, a little more..';
            }

            $('#loading-timer').html(time_string);
        }, 1000);
    }

    clear_chat_log(msgArea) {
        $(msgArea).html('<div class="message-area-padding"></div>');
    }

    play_notification_sound() {
        document.getElementById('chat-notification-sound').play();
    }

    reConnect() {
        if (!connected) {
            connection_retry_timer = setInterval(function () {
                if (socket.readyState === 3) { // 3 => Connection closed
                    open_connection();
                }
            }, 1000);
        } else {
            clearTimeout(connection_retry_timer);
        }
    }

    showConnectionLostMessage() {
        $('#send-msg textarea, #send-msg span').hide();
        $('#connection-lost-message').fadeIn();
    }

    hideConnectionLostMessage() {
        if ($('#connection-lost-message').is(':visible')) {
            $('#connection-lost-message').hide();
            $('#send-msg textarea, #send-msg span').fadeIn();
        }
    }

    setChatContextMenu(id, self) {
        //console.log('setChatContextMenu id=' + id);
        $(id).contextMenu({
            selector: '.left',
            trigger: 'left',
            menuSelector: "#chatContextMenu",
            menuSelected: function (invokedOn, selectedMenu) {
                var ip = invokedOn.attr('ip');
                var id = invokedOn.attr('id');
                //var id = invokedOn.text();
                console.log('context menu id=', id)
                if (selectedMenu.text() == "귓속말") {
                    self.sendWhisper(id);
                } else if (selectedMenu.text() == "추방") {
                    self.sendExile(id);
                }
                else if (selectedMenu.text() == "rtc요청") {
                    self.rtcIdset(self.mynickname, id);
                    self.rtcOffer();
                }
                else if (selectedMenu.text() == "폴더생성") {

                }

            }
        });

    }

    eventHandler(e) {
        //console.log('eventHandler e.data.type=', e.data.type);
        //e.preventDefault();
        //e.stopPropagation();
        var type = e.data.type;
        var self = e.data.self;
        //console.log('eventHandler e.which=' + e.which);
        //console.log('eventHandler e.type=' + e.type);
        if (e.type == 'keypress') {
            if (type == 'msg_box') {
                if (e.which === 13 && !e.shiftKey) {
                    self.sendMsgBox();
                    e.preventDefault();
                } else {
                    //console.log('typing text');
                }
            } else if (type == 'nickname' || type == 'chatroom') {
                if (e.which === 13) {

                    self.connectToServer();
                }
            }

            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        } else if (e.type == 'click') {
            e.preventDefault();
            if (type == 'chatstart_btn') {
                self.connectToServer();
            } else if (type == 'send_btn') {
                console.log('send_btn');
                self.sendMsgBox();
            }
        } else if (e.type == 'list') {

        } else if (e.type == 'list') {

        }

    }

    rtcOffer(id) {
        alert('WebRtc 를 구현해야됩니다');
    }

    rtcAnswer(id) {
        alert('WebRtc 를 구현해야됩니다');
    }

    rtcOffered(id) {
        alert('WebRtc 를 구현해야됩니다');
    }

    rtcAnswered(id) {
        alert('WebRtc 를 구현해야됩니다');
    }

    rtcCandidate(candidate) {
        alert('WebRtc 를 구현해야됩니다');
    }

    rtcIdset(offerid, answerid) {
        alert('WebRtc 를 구현해야됩니다');
    }

    strJsonEncode(data) {
        return encodeURIComponent(JSON.stringify(data));
    }

    strdJsonDecode(data) {
        return JSON.parse(decodeURIComponent(data).substr(1, decodeURIComponent(data).length - 2));
    }

    sendRtc(message) {
        console.log('sendRtc(message)  JSON.stringify(message)=' + JSON.stringify(message));
        //console.log('JSON.stringify(message)=' + Base64.encode(JSON.stringify(message)));
        
        try {
            //this.socket.send(Base64.encode(JSON.stringify(message)));
            this.socket.send(JSON.stringify(message));
        } catch (e) {
            console.log('error=', e);
        }
        //addNewMsg(message);
        //console.log('sendRtc=');
    }
}

class SignalingChannel extends ChatView {
    constructor(server_url) {
        super(server_url);

        this.isHost = false;
        this.localStream = null;
        this.remoteStream = new MediaStream();
        this.pc1 = null;
        this.pc2 = null;
        this.vid1 = null;
        this.vid2 = null;
    }

    renderController(elem) {

        var main = new MainLayout();
        var ver = new VerticalLayout();
        var hor = new HorizontalLayout();

        main.addControl(ver);
        main.addControl(hor);

        this.$video1 = $(`<video id="vid1" src="./chrome.mp4" playsinline autoplay muted></video>`);
        this.$video2 = $(`<video id="vid2" src="chrome.mp4" playsinline autoplay></video>`);

        var chatelem = $('<div>');
        hor.setControl([this.$video1, 4], [this.$video2, 4], [chatelem, 4]);
        main.renderController(elem);

        this.renderChatting(chatelem);
        this.connectToServer(this.server_url);

        this.initChat();
        this.initEvent();

        this.vid1 = document.getElementById('vid1');
        this.vid2 = document.getElementById('vid2');
        
        var configuration = {
            iceServers: [{
                urls: "stun:stun.services.mozilla.com",
                username: "louis@mozilla.com",
                credential: "webrtcdemo"
            }, {
                    urls: "stun:stun.l.google.com:19302",
                }]
        };
        this.pc1 = new RTCPeerConnection(configuration);
        //console.log('Created local peer connection object pc1', this.pc1);
        this.pc1.onicecandidate = e => this.onIceCandidate(e);
        this.pc1.onaddstream = e => this.onRemoteStreamAdded(e, this);
        this.pc1.onremovestream = this.onRemoteStreamRemoved;
        //this.pc2 = new RTCPeerConnection(configuration);
        //console.log('Created remote peer connection object pc2', this.pc2);
        //this.pc2.onicecandidate = e => this.onIceCandidate(pc2, e);
        //this.pc2.ontrack = this.gotRemoteStream;

        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: true
            })
            .then(stream => {
                
                //console.log(`this.vid1: ${this.vid1}`);
                this.vid1.srcObject = stream;
                this.localStream = stream;
                //console.log(`this.localStream: ${this.localStream}`);
                this.videoTracks = this.localStream.getVideoTracks();
                this.audioTracks = this.localStream.getAudioTracks();
                if (this.videoTracks.length > 0) {
                    console.log(`Using Video device: ${this.videoTracks[0].label}`);
                }
                if (this.audioTracks.length > 0) {
                    console.log(`Using Audio device: ${this.audioTracks[0].label}`);
                }

                this.localStream.getTracks().forEach(track => this.pc1.addTrack(track, this.localStream));
            })
            .catch(e => alert(`getUserMedia() error: ${e}`));
       
    }

    rtcIdset(offerid, answerid) {
        this.offerid = offerid;
        this.answerid = answerid;
    }

    rtcOffer() {
        this.isHost = true;
        this.isOfferOrAnswer = true;
        var self = this;

        const offerOptions = {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        };
        this.pc1.createOffer(offerOptions).then((offer) => {
            this.pc1.setLocalDescription(offer).then(() => {
                //console.log("DESC1 --> " + JSON.stringify(offer));
                //console.log(`Offer from pc1\n${offer.sdp}`);
                
            },
                this.onSetLocalDescriptionError
            );

            var info = {};
            info.type = 'offer';
            info.offerid = this.offerid;
            info.answerid = this.answerid;
            info.offer = offer;

            console.log('this.answerid=', this.answerid, 'this.offerid=', this.offerid);
            //console.log('offer.answerid=', offer.answerid, 'offer.offerid=', offer.offerid);
            this.sendRtc(info);
            //ICECandidate 발송이 Offer / Answer 발송보다 먼저 되는 문제를 해결하기 위해서는
            //setLocalDescription 호출 시 await 및.then()을 쓰지 않으면 된다.
            //setLocalDescription이 완료되는 것을 기다리지 말고 바로 Offer / Answer를 발송해야 된다.

            //pc2.setRemoteDescription(desc);
            // Since the 'remote' side has no media stream we need
            // to pass in the right constraints in order for it to
            // accept the incoming offer of audio and video.
            //pc2.createAnswer().then(gotDescription2, onCreateSessionDescriptionError);
        }, this.onCreateSessionDescriptionError);
    }

    rtcOffered(offer) {
        console.log('rtcOffered(offer)=');
        // await rtcPeerConnection.setRemoteDescription(offer);
        this.pc1.setRemoteDescription(offer);
        this.pc1.createAnswer().then(answer => {
            this.pc1.setLocalDescription(answer);
            this.rtcAnswer(answer);
        });
        // await rtcPeerConnection.setLocalDescription(answer);
        

        //socket.emit("answer", answer);
    }

    rtcAnswer(answer) {
        console.log('rtcAnswer(answer)=');
        var info = {};
        info.type = 'answer';
        info.offerid = this.offerid;
        info.answerid = this.answerid;
        info.answer = answer;
        this.sendRtc(info);
    }

    rtcAnswered(answer) {
        console.log('rtcAnswered(answer)=');
        this.pc1.setRemoteDescription(answer);
    }

    rtcCandidate(candidate) {
        this.pc1
            .addIceCandidate(candidate)
            .then(() => this.onAddIceCandidateSuccess(), err => this.onAddIceCandidateError(err));
        console.log(`${this.getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
    }

    gotRemoteStream(e) {
        this.vid2.srcObject = this.remoteStream;
        this.remoteStream.addTrack(e.track, this.remoteStream);
    }

    getOtherPc(pc) {
        return (pc === this.pc1) ? this.pc2 : this.pc1;
    }

    getName(pc) {
        return (pc === this.pc1) ? 'pc1' : 'pc2';
    }

    onCreateSessionDescriptionError(error) {
        console.log(`Failed to create session description: ${error.toString()}`);
        stop();
    }

    onCreateAnswerError(error) {
        console.log(`Failed to set createAnswer: ${error.toString()}`);
        stop();
    }

    onSetLocalDescriptionError(error) {
        console.log(`Failed to set setLocalDescription: ${error.toString()}`);
        stop();
    }

    gotDescription1(desc) {
        pc1.setLocalDescription(desc).then(() => {
            console.log("DESC1 --> " + JSON.stringify(desc));
            console.log(`Offer from pc1\n${desc.sdp}`);
            //sendMsg(desc);
            },
            onSetLocalDescriptionError
        );
        
        pc2.setRemoteDescription(desc);
        // Since the 'remote' side has no media stream we need
        // to pass in the right constraints in order for it to
        // accept the incoming offer of audio and video.
        pc2.createAnswer().then(gotDescription2, onCreateSessionDescriptionError);
    }

    gotDescription2(desc) {
        // Provisional answer, set a=inactive & set sdp type to pranswer.
        desc.sdp = desc.sdp.replace(/a=recvonly/g, 'a=inactive');
        desc.type = 'pranswer';
        pc2.setLocalDescription(desc).then(onSetLocalDescriptionSuccess, onSetLocalDescriptionError);
        console.log(`Pranswer from pc2\n${desc.sdp}`);
        pc1.setRemoteDescription(desc);
    }

    gotDescription3(desc) {
        // Final answer, setting a=recvonly & sdp type to answer.
        desc.sdp = desc.sdp.replace(/a=inactive/g, 'a=recvonly');
        desc.type = 'answer';
        pc2.setLocalDescription(desc).then(onSetLocalDescriptionSuccess, onSetLocalDescriptionError);
        console.log(`Answer from pc2\n${desc.sdp}`);
        pc1.setRemoteDescription(desc);
    }

    onRemoteStreamAdded(event, self) {
        self.remoteStream = event.stream;
        console.log('onRemoteStreamAdded=' + event);
        console.log('this.vid1=' + self.vid1);
        self.vid2.srcObject = self.remoteStream;
        //self.remoteStream.addTrack(event.track, self.remoteStream);
    }

    onRemoteStreamRemoved(event) {
        console.log('remoteStreamRemoveed=', event);
    }

    onIceCandidate(event) {
        if (event.candidate) {
            //console.log('onIceCandidate(event) event.candidate.candidate=', event.candidate.candidate);

            var info = {};
            info.type = 'candidate';
            info.sendid = this.mynickname;
            info.label = event.candidate.sdpMLineIndex;
            info.id = event.candidate.sdpMid;
            info.candidate = event.candidate.candidate;
            this.sendRtc(info);
        }
    }

    onAddIceCandidateSuccess() {
        console.log('AddIceCandidate success.');
    }

    onAddIceCandidateError(error) {
        console.log(`Failed to add Ice Candidate: ${error.toString()}`);
    }

}