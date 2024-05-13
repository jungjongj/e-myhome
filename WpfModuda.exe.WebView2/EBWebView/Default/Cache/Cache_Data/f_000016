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

class LectureTemp {
    constructor(info) {
        this.info = info;
        this.init();
    }

    init() {
        var main = new MainLayout();
        var ver = new VerticalLayout();
        var hor = new HorizontalLayout();

        main.addControl(ver);
        main.addControl(hor);

        //var c = new BoardController('grouplist', "daboard.dadb", "da_board", 3, new BoardView(), { rendertype: 'media' });
        //ver.addControl(c);
        
        var arg = {
            type: 'boardlist',
            dbpath: this.info.dbpath,
            code: this.info.code,
            brdid: 3,
            renderview: new BoardView(),
            rendertype: 'selectlist'
        }
        var board = new BoardController(arg);
        //var board = new BoardController({ type: 'boardlist', dbpath: this.info.dbpath, code: this.info.code, brdid: 3, renderview: new BoardView(), rendertype: 'table' });
        ver.addControl(board);

        main.renderController(document.body);
    }
}

class TtsboardTemp {
    constructor() {
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var self = e.data.self;
        var type = e.data.type;

        console.log('arg.renderinfo.$parent**=' + arg.renderinfo.$parent);
        if (type == 'boardrecord') {
            arg.renderinfo.$parent.getReturnValue('tts', info.summary);
        } else if (type == 'boardpost') {
            var form = document.getElementById(e.data.formid);

            //console.log('arg.renderinfo.tabthread*************=' + arg.renderinfo.tabthread);
            //console.log('info.key**=' + info.key);
            if (arg.renderinfo.thread) {
                form.thread.value = arg.renderinfo.thread;
            }
            arg.type = 'boardlist';
            arg.form = form;
            var formData = $(form).serializeArray();
            //var b64 = Base64.encode($("#summernote").val());
            //alert("Base64.encode formid==222222" + formid);
            //formData = self.changeSerialize(formData, 'comment', b64);
            //console.log("form.subject.value=======" + form.subject.value);
            //b64 = Base64.encode(form.subject.value);
            //formData = self.changeSerialize(formData, 'subject', b64);
            arg.formData = formData;

            arg.path = "/list.board?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + arg.uid + "&datuid=" + arg.datuid + "&utf8=ok&";
            arg.self.postAjax(arg);

            if (window._fullscreen) {
                window._fullscreen.offscreen();
                window._fullscreen = null;
            }
            //console.log("eventHandler(e) type33 == " + type);
        } else if (type == 'boardwrite') {
            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`글쓰기`, e.data.self.createBoardFormView(info, arg, e.data.self.eventHandler));
            //__modal.show('글쓰기', e.data.self.createBoardFormView(info, arg, e.data.self.eventHandler));
            new SummerNoteSet('summernote');
            console.log('글쓰기**=');

        }
    }

    createBoardFormView(info, arg, eventHandler) {

        var writeinfo = {};
        //writeinfo.rendertype = "general";
        writeinfo.boxtype = "box-success box-solid";
        writeinfo.titleicon = "";
        writeinfo.title = arg.type;
        writeinfo.collapse_btn = "ok";

        var $writebox = $('<div>');

        var $writeForm = $('<form id="boardpostform" action="post.board" method="post" class="form-horizontal">');

        $writeForm.append('<input type="hidden" name="code" value="' + arg.code + '"  />');
        $writeForm.append('<input type="hidden" name="dbpath" value="' + arg.dbpath + '"  />');
        $writeForm.append('<input type="hidden" name="posttype" value="post"  />');
        $writeForm.append('<input type="hidden" name="brdid" value="' + arg.brdid + '"  />');
        $writeForm.append('<input type="hidden" name="uid" value="' + arg.uid + '"  />');
        $writeForm.append('<input type="hidden" name="fid" value="' + arg.fid + '"  />');
        $writeForm.append('<input type="hidden" name="thread" />');

        var $writeLabel = $('<label for="subject" class="col-sm-2 control-label">제목</label>');
        var $writeInput = $('<input type="text" name="subject" class="form-control" placeholder="subject">').val(arg.subject);
        var $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);

        $writeLabel = $('<label for="subject" class="col-sm-2 control-label">요약</label>');
        $writeInput = $('<textarea type="text" name="summary" class="form-control" placeholder="summary">').val(arg.summary);
        $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);

        $writeLabel = $('<label for="comment" class="col-sm-4 control-label"></label>').text('내용');
        $writeInput = $('<textarea cols="40" rows="18" name="comment" id="summernote" class="form-control summernote" placeholder="내 용..." required="" autofocus="" type="text">').val(arg.comment);
        $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);

        var $writeLabel = $('<label for="subject" class="col-sm-2 control-label">날짜</label>');
        var $writeInput = $('<input type="date" name="time" class="form-control" placeholder="subject">').val(arg.subject);
        var $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);

        var btn1 = $('<button type="button" class="btn btn-info brdupdate" >전송</button>');
        $(btn1).bind("click", { type: 'boardpost', formid: 'boardpostform', info: info, arg: arg }, this.eventHandler);
        var $formitem = $('<div class="form-group">').append($(btn1));
        $writeForm.append($formitem);
        $writebox.append($writeForm);

        writeinfo.comment = $writebox;
        var b = new CardItem();
        var $box = b.createCardItem(writeinfo);

        //this.summernoteSetting(arg.comment);
        return $writebox;
        //return $box;
    };

    createList(info2, arg, eventHandler) {

        var loginfo = info2.loginfo;
        var arrarr = info2.arrarr;
        var grouparr = info2.grouparr;
        console.log('info2=', info2);
        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        var timelineE = $(`<div class="wrapper">`);
        var centerlineE = $(`<div class="center-line">`);
        centerlineE.append('<a href="#" class="scroll-icon"><i class="fa fa-fw  fa-caret-up"></i></a>');
        timelineE.append(centerlineE);

        $temp.append(timelineE);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];

                var num = i % 2 === 0 ? 1 : 2;

                var itemE = $(`<div class="row row-${num}">`);

                var sectionItemE = $('<section>');
                var iconE = $('<i class="icon fa fa-fw  fa-home">');
                var detailE = $('<div class="t-details">');
                var bottomE = $('<div class="bottom">');
                var idE = $('<i>').append(info.id);
                bottomE.append('<a href="#">더보기</a>').append(idE);

                if (info.iconclass) {
                    $img = $(`<i class="${info.iconclass}">`);
                }


                var subjectE = $('<h5 class="title">').append(info.subject);
                var appendE = $('<span>').append('  ' + info.id + ' ( ' + info.signdate + ' ) ');
                var summaryE = $('<p>').append(info.summary);

                detailE.append(subjectE).append(appendE);
                sectionItemE.append(iconE).append(detailE).append(summaryE).append(bottomE);
                itemE.append(sectionItemE);
                console.log('info.subject=', info.subject);
                console.log('info.summary=', info.summary);
                itemE.bind("click", { type: 'boardrecord', info: info, loginfo: loginfo, self: this, arg: arg }, this.eventHandler);
                itemE.attr('style', 'cursor:pointer;cursor: hand;');

                timelineE.append(itemE);
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        var $buttonE = $("<input type='button' class='btn btn-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글쓰기");
        $buttonE.bind("click", { type: 'boardwrite', self: this, info: info, arg: arg }, this.eventHandler);
        var $writeDiv = $('<div>');
        $($writeDiv).append($buttonE);
        $(arg.elem).append($writeDiv);

        var $page = $("<div>");
        $temp.append($page);
        var p = new PageNavView();
        arg.pageelem = $page;
        p.createPageNavView(info2, arg, this.eventHandler);

        var $find = $("<div>");
        $temp.append($find);
        arg.findelem = $find;
        var f = new BoardFindView();
        f.createFindView(info2, arg, this.eventHandler);

        //console.log($(arg.elem).html());
        return $temp;
    }
}



class MafiaGameTemp {
    constructor(arg) {
        this.arg = arg;
    }

    eventHandler(e) {
        //console.log("eventHandler(e) type =33333333333= ");
        var info = e.data.info;
        var arg = e.data.arg;
        var self = arg.self;
        var type = e.data.type;

        //console.log('type*****=' + type);
        if (type == 'boardrecord') {
            //console.log("eventHandler(e)============= str == " + str);
            //__fullscreenView.setContent(arg.elem);
            //__fullscreenView.fullscreen('fullscreenwin');
            var str = "/view.board?code=" + arg.code + "&page=" + arg.page + "&uid=" + info.uid + "&fid=" + info.fid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&utf8=ok&";
            //console.log("eventHandler(e) boardlist ============= str == " + str);
            //console.log('eventHandler(e) arg.renderinfo 222====' + arg.renderinfo);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "viewbody";
            arg.self.listAjax(arg);
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        } else if (type == 'boardlist' || type == 'more' || type == 'menuclick') {
            //console.log("eventHandler type  == " + type);
            var str = "/list.board?code=" + arg.code + "&brdid=" + info.brdid + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            //console.log("morelist str info.brdid == " + info.brdid);
            //var arg2 = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "boardlist";
            arg.self.listAjax(arg);
        } else if (type == 'boardmodify') {
            str = "/view.board?posttype=modify&code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&brdid=" + e.data.brdid + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&utf8=ok&";
        } else if (type == 'boarddelete') {
            if (!confirm("글을 삭제합니다 ")) {
                return;
            }
            str = "/list.board?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&utf8=ok&";
            arg.path = str;
            arg.type = 'boardlist';
            arg.self.postAjax(arg);
        } else if (type == 'list') {

        } else if (type == 'boardpost') {
            var form = document.getElementById(e.data.formid);
            //console.log('arg.renderinfo.tabthread*************=' + arg.renderinfo.tabthread);
            //console.log('info.key**=' + info.key);
            if (arg.renderinfo.tabthread) {
                form.thread.value = arg.renderinfo.thread;
            }
            arg.type = 'boardlist';
            arg.form = form;
            var formData = $(form).serializeArray();
            //var b64 = Base64.encode($("#summernote").val());
            //alert("Base64.encode formid==222222" + formid);
            //formData = self.changeSerialize(formData, 'comment', b64);
            //console.log("form.subject.value=======" + form.subject.value);
            //b64 = Base64.encode(form.subject.value);
            //formData = self.changeSerialize(formData, 'subject', b64);
            arg.formData = formData;

            arg.path = "/list.board?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + arg.uid + "&datuid=" + arg.datuid + "&utf8=ok&";
            arg.self.postAjax(arg);
            //console.log("eventHandler(e) type33 == " + type);
        } else if (type == 'boardwrite') {
            //var form = new BoardFormAndModal();
            //__fullscreenView.setContent(form.createBoardFormView(info, arg, self.eventHandler));
            //__fullscreenView.fullscreen('fullscreenwin');
            //form.summernoteSetting('');
            //var f = new FullScreenView();
            //f.setContent('글쓰기', e.data.self.createBoardFormView(info, arg, e.data.self.eventHandler));
            //console.log('글쓰기**=');
            __modal.show('글쓰기', e.data.self.createBoardFormView(info, arg, e.data.self.eventHandler));
            new SummerNoteSet('summernote');
        } else if (type == 'addpoint' || type == "minuspoint") {
            var str = "/view.board?posttype=addpoint&code=" + arg.code + "&point=" + e.data.point + "&uid=" + e.data.uid + "&fid=" + e.data.fid + "&dbpath=" + arg.dbpath + "&brdid=" + e.data.brdid + "&";
            console.log(` handle addpoint str=${str}********=`);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'viewbody';
            arg.self.listAjax(arg);
        } else if (type == 'adddatpoint' || type == "minusdatpoint") {
            var str = "/view.board?posttype=addpoint&addtype=dat&code=" + arg.code + "&point=" + e.data.point + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&fid=" + e.data.fid + "&dbpath=" + arg.dbpath + "&brdid=" + e.data.brdid + "&";
            //console.log(` handle addpoint str=${str}********=`);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'viewbody';
            arg.self.listAjax(arg2);
        } else if (type == 'login') {
            var form = document.getElementById(e.data.formid);
            arg.type = type;
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;
            arg.path = "/login.member?logtype=login&utf8=ok&";
            arg.self.postAjax(arg);
        } else if (type == 'datdelete') {
            if (!confirm("댓글을 삭제합니다 ")) {
                return;
            }
            str = "/view.board?posttype=datdelete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&fid=" + e.data.fid + "&utf8=ok&";
            arg.path = str;
            arg.self.postAjax(arg);
        } else if (type == 'datpost' || type == "datmodify") {
            var form = document.getElementById(e.data.formid);
            //console.log('form^********************************=' + form);
            form.code.value = arg.code;
            form.dbpath.value = arg.dbpath;
            form.uid.value = arg.uid;
            arg.type = 'viewbody';
            arg.form = form;
            var formData = $(form).serializeArray();
            //var b64 = Base64.encode($("#summernote").val());
            //alert("Base64.encode formid==222222" + formid);
            //formData = self.changeSerialize(formData, 'comment', b64);
            //console.log("form.subject.value=======" + form.subject.value);
            //b64 = Base64.encode(form.subject.value);
            //formData = self.changeSerialize(formData, 'subject', b64);
            arg.formData = formData;

            arg.path = "/view.board?posttype=" + type + "&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + info.uid + "&fid=" + info.fid + "&datuid=" + arg.datuid + "&utf8=ok&";
            //console.log(` handle datpost arg.path=${arg.path}**** arg.type=${arg.type}****************************=`);
            arg.self.postAjax(arg);
        } else if (type == 'boardfind') {
            var keyfield = $("#findform option:selected").val();
            var key = $("#findform input[name=key]").val();
            //if (keyfield == "subject" || keyfield == "comment")
            //key = Base64.encode(key);

            var str = "/list.board?code=" + arg.code + "&page=1&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&keyfield=" + keyfield + "&key=" + key + "&";
            //console.log(' handle find str********************************=' + str);
            //var arg2 = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'boardlist';
            arg.self.listAjax(arg);
        } else if (type == 'boardpage') {
            //console.log(` handle page arg.page=${arg.page}**** e.data.page=${e.data.page}****************************=`);
            var str = "/list.board?code=" + arg.code + "&page=" + e.data.page + "&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&";
            //var arg2 = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'boardlist';
            //console.log(' handle page str********************************=' + str);
            arg.self.listAjax(arg);
        } else if (type == 'jjocjyformSubmit') {
            //alert('jjocjyformSubmit');
            var form = document.getElementById("jjocjyForm");
            form.sendid.value = e.data.sendid;
            form.receiveid.value = e.data.receiveid;

            //console.log('form^********************************=' + form);
            var arg2 = { type: "jjocjylist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };

            arg2.form = form;
            var formData = $(form).serializeArray();

            arg2.formData = formData;
            var str = "/jjocjy.member?jjocjytype=add&code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&utf8=ok&";
            arg2.path = str;
            //console.log('jjocjyformSubmit arg2.path=' + arg2.path);
            arg.self.postAjax(arg2);
        } else if (type == 'jjocjyformSubmit') {

            var form = document.getElementById("jjocjyForm");
            form.sendid.value = e.data.sendid;
            form.receiveid.value = e.data.receiveid;

            //console.log('form^********************************=' + form);
            var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };

            arg2.form = form;
            var formData = $(form).serializeArray();

            arg2.formData = formData;
            var str = "/jjocjy.member?jjocjytype=add&code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&utf8=ok&";
            arg2.path = str;
            //console.log('jjocjyformSubmit arg2.path=' + arg2.path);
            arg.self.postAjax(arg2);
        } else if (type == 'jjocjyviewbody') {



        }
    }

    createBoardFormView(info, arg, eventHandler) {

        console.log('info.key' + info.key);

        var writeinfo = {};
        //writeinfo.rendertype = "general";
        writeinfo.boxtype = "box-success box-solid";
        writeinfo.titleicon = "";
        writeinfo.title = arg.type;
        writeinfo.collapse_btn = "ok";

        var $writebox = $('<div>');

        var $writeForm = $('<form id="boardpostform" action="post.board" method="post" class="form-horizontal">');

        $writeForm.append('<input type="hidden" name="code" value="' + arg.code + '"  />');
        $writeForm.append('<input type="hidden" name="dbpath" value="' + arg.dbpath + '"  />');
        $writeForm.append('<input type="hidden" name="posttype" value="post"  />');
        $writeForm.append('<input type="hidden" name="brdid" value="' + arg.brdid + '"  />');
        $writeForm.append('<input type="hidden" name="uid" value="' + arg.uid + '"  />');
        $writeForm.append('<input type="hidden" name="fid" value="' + arg.fid + '"  />');
        $writeForm.append('<input type="hidden" name="thread" />');

        var $writeLabel = $('<label for="subject" class="col-sm-2 control-label"></label>');
        var $writeInput = $('<input type="text" name="subject" class="form-control" placeholder="subject">').val(arg.subject);
        var $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);
        $writeLabel = $('<label for="comment" class="col-sm-4 control-label"></label>').text('내용');
        $writeInput = $('<textarea cols="40" rows="18" name="comment" id="summernote" class="form-control summernote" placeholder="내 용..." required="" autofocus="" type="text">').val(arg.comment);
        $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);


        var btn1 = $('<button type="button" class="btn btn-info brdupdate" >전송</button>');
        $(btn1).bind("click", { type: 'boardpost', formid: 'boardpostform', info: info, arg: arg }, eventHandler);
        var $formitem = $('<div class="form-group">').append($(btn1));
        $writeForm.append($formitem);
        $writebox.append($writeForm);

        writeinfo.comment = $writebox;
        var b = new CardItem();
        var $box = b.createCardItem(writeinfo);

        //this.summernoteSetting(arg.comment);
        return $writebox;
        //return $box;
    };

    createMediaItem(info) {
        var strTag;

        var $media_box = $('<div class="d-flex border p-3">');
        var $img = null;
        if (info.img) {
            $img = info.img;
        } else {
            //console.log(info.imgsrc);
            if (info.imgsrc) {
                $img = $(`<img src="${info.imgsrc}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
            } else if (info.iconclass) {
                $img = $(`<i class="${info.iconclass}">`);
            } else {
                $img = $(`<img src="..." onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
            }
        }

        var $boxBody = $('<div class="media-body">');
        //alert('info.subject=' + info.subject);
        if (info.subject) {
            var $bodyHead = $('<div class="body-head list-inline">');

            var $bodySubject = $('<h5 class="list-inline-item">').append(info.subject);
            $bodyHead.append($bodySubject);
            $boxBody.append($bodyHead);

            if (info.headappend) {
                var $headappend = $('<div class="list-inline-item pull-right">').append('headappend' + info.headappend);
                $bodyHead.append($headappend);
            }
        }
        if (info.comment) {
            var $bodyComment = $('<p>').append(info.comment);
            $boxBody.append($bodyComment);
        }
        if (info.bodyappend) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.bodyappend);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $media_box.append($img).append($boxBody);

        return $media_box;
    }

    createList(info2, arg, eventHandler) {
        var loginfo = info2.loginfo;
        var arrarr = info2.arrarr;
        var grouparr = info2.grouparr;
        //console.log(arg);
        var mediaE = $(`<div class="card-deck">
                        </div>`);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];

                var meItem = this.createMediaItem(info);
                mediaE.append(meItem);
                $(meItem).bind("click", { type: 'boardrecord', info: info, loginfo: loginfo, self: this, arg: arg }, this.eventHandler);
                $(meItem).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($(mediaE));

        var $buttonE = $("<input type='button' class='btn btn-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글쓰기");
        $buttonE.bind("click", { type: 'boardwrite', self: this, info: info, arg: arg }, this.eventHandler);
        var $writeDiv = $('<div>');
        $($writeDiv).append($buttonE);
        $(arg.elem).append($writeDiv);

        var $page = $("<div>");
        $(arg.elem).append($page);
        var p = new PageNavView();
        arg.pageelem = $page;
        p.createPageNavView(info2, arg, this.eventHandler);

        var $find = $("<div>");
        $(arg.elem).append($find);
        arg.findelem = $find;
        var f = new BoardFindView();
        f.createFindView(info2, arg, this.eventHandler);

        //console.log($(arg.elem).html());
        return $(mediaE);
    }

    createViewbody(info2, arg, eventHandler) {
        var loginfo = info2.loginfo;
        //var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;
        var datarr = info2.datarr;
        var info = arrarr[0];
        console.log('createList arg.renderinfo.viewbody====' + arg.renderinfo.viewbody, 'info.uid', info.uid);

        var main = new MainLayout();
        var ver = new VerticalLayout();
        var hor = new HorizontalLayout();

        main.addControl(ver);
        main.addControl(hor);

        var alert = `<div class="alert alert-dark" role="alert">
                      ${arg.title ?? 'title'}
                    </div>`;
        ver.addControl(alert);

        var erp = new ErpController({ type: 'erplist', dbpath: arg.dbpath, code: 'employee', title: '마피아후보', renderview: 'EmployeeView', rendertype: 'media', tag: 'board-' + info.uid, viewbody: 'EmployeeViewbodyTemplate' });

        //var d = new KeyvalueController({ settype: 'setting', dbpath: "config.dadb", kcode: "bookmark", kname: "aaa", rendertype: 'list', renderview: "ListTreeView"});
        //ver.addControl(d);

        console.log('arg.elem=' + arg.elem);
        var conf = {
            type: 'boardlist',
            dbpath: arg.dbpath,
            code: "da_employee",
            brdid: info.uid,
            renderview: 'BoardView',
            rendertype: 'table',
            title: 'test game'
        };
        var board = new BoardController(conf);
        hor.setControl([erp, 4], [board, 8]);

        //$(arg.elem).empty();
        var elem = $('<div>');

        $(arg.elem).empty();
        $(arg.elem).append(elem);
        main.renderController(elem);
        console.log('arg.elem=' + arg.elem);
        //alert("$box.html()" + $box.html());
        //return $box;
    }
}
class EmployeeViewbodyTemplate {
    constructor() {
        this.info = null;
    }

    eventHandler(e) {
        //console.log("eventHandler(e) type =33333333333= ");
        var info = e.data.info;
        var arg = e.data.arg;
        var self = e.data.self;
        var type = e.data.type;

        console.log('type*****=' + type);
        if (type == 'boardrecord') {
            var str = "/view.board?code=" + arg.code + "&page=" + arg.page + "&uid=" + info.uid + "&fid=" + info.fid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&utf8=ok&";
            //console.log("eventHandler(e) boardlist ============= str == " + str);
            console.log('str====' + str);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "viewbody";
            arg.self.listAjax(arg);
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        } else if (type == 'boardwrite') {
            //console.log("eventHandler(e)============= str == " + str);
            //__fullscreenView.setContent(arg.elem);
            //__fullscreenView.fullscreen('fullscreenwin');

            str = "/smslist.contacts?findType=" + 0 + "&phoneNum=" + info.address + "&utf8=ok&";
            console.log('eventHandler(e) arg.renderinfo 222====' + arg.renderinfo);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'smslist';
            arg.self.listAjax(arg);
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        }
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

                    <button type="button" class="btn btn-primary btn-lg btn-block" id="personBtn">개인신상</button>
                    <button type="button" class="btn btn-secondary btn-lg btn-block" id="familyBtn">가족관계</button>
                    <button type="button" class="btn btn-secondary btn-lg btn-block" id="careerBtn">경력</button>

                    <div class="panel panel-default">
                        <div class="panel-heading">Social Media</div>
                        <div class="panel-body">
                            <i class="fa fa-facebook fa-2x"></i> <i class="fa fa-github fa-2x"></i> <i class="fa fa-twitter fa-1x"></i> <i class="fa fa-pinterest fa-2x"></i> <i class="fa fa-google-plus fa-2x"></i>
                        </div>
                    </div>

                </div><!--/col-3-->`;
        return m;
    }

    createPortFolio(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;
        var personalarr = info2.personalarr;
        var empfamilyarr = info2.empfamilyarr;
        var careerarr = info2.careerarr;
        var uid = -1;
        console.log('arrarr && arrarr.length=', arrarr.length);
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                uid = info.uid;
                var arr = arrarr[i].arr;

                var p = this.createProfile(info, arg, eventHandler);
                console.log('p=', p);
            }
        }

        if (personalarr && personalarr.length >= 0) {
            for (var i = 0; i < personalarr.length; i++) {
                //cnt++;
                var info = personalarr[i];
                uid = info.uid;
                var arr = personalarr[i].arr;

                var p = this.createProfile(info, arg, eventHandler);
                console.log('p=', p);
            }
        }

        var family = this.createFamilyList(info2, arg, eventHandler);

        var main = new MainLayout();
        var ver = new VerticalLayout();
        var hor = new HorizontalLayout();

        main.addControl(ver);
        main.addControl(hor);

        var skillArr = [], workArr = [], schoolArr = [], jobArr = [], awardArr = [];
        if (careerarr && careerarr.length >= 0) {
            for (var i = 0; i < careerarr.length; i++) {
                //cnt++;
                var info = careerarr[i];
                var arr = careerarr[i].arr;

                if (info.type == 'skill') {
                    skillArr.push(info);
                } else if (info.type == 'work') {
                    workArr.push(info);
                } else if (info.type == 'school') {
                    schoolArr.push(info);
                } else if (info.type == 'job') {
                    jobArr.push(info);
                } else if (info.type == 'award') {
                    jobArr.push(info);
                }
            }
        }
        var elem;
        if (skillArr.length > 0) {
            info2.arrarr = skillArr;
            elem = this.createThumbnailList(info2, arg, eventHandler);
            ver.addControl(elem);
        }
        if (workArr.length > 0) {
            info2.arrarr = workArr;
            elem = this.createThumbnailList(info2, arg, eventHandler);
            ver.addControl(elem);
        }
        if (jobArr.length > 0) {
            info2.arrarr = jobArr;
            elem = this.createThumbnailList(info2, arg, eventHandler);
            ver.addControl(elem);
        }
        if (schoolArr.length > 0) {
            info2.arrarr = schoolArr;
            elem = this.createThumbnailList(info2, arg, eventHandler);
            ver.addControl(elem);
        }
        if (awardArr.length > 0) {
            info2.arrarr = awardArr;
            elem = this.createThumbnailList(info2, arg, eventHandler);
            ver.addControl(elem);
        }

        if (uid == -1)
            return;
        var brdid = Number(uid.toString().padEnd(6, "0"));
        //console.log(brdid);

        var conf = {
            type: 'boardlist',
            dbpath: arg.dbpath,
            code: "da_employee",
            brdid: brdid + 1,
            renderview: 'BoardView',
            rendertype: 'table',
            tabthread: [{
                key: 'aaa',
                brdid: brdid + 1,
                value: 'alink'
            },
            {
                key: 'bbb',
                brdid: brdid + 2,
                value: 'blink'
            }]
        };
        var board = new BoardController(conf);
        //var erp = new ErpController('erplist', info.dbpath, 'employee', new EmployeeView(), {} , '');
        hor.setControl([p, 4], [board, 8]);

        var $page = $("<div>");
        //$(arg.elem).empty();
        main.renderController($page);

        //console.log('arg.viewelem=', arg.viewelem);
        if (arg.viewelem) {
            $(arg.viewelem).empty();
            $(arg.viewelem).append($page);
        } else {
            $(arg.elem).empty();
            $(arg.elem).append($page);

        }
    }

    createViewbody(info2, arg, eventHandler) {
        var loginfo = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;
        var skillarr = info2.skillarr;
        var personalarr = info2.personalarr;
        var empfamilyarr = info2.empfamilyarr;
        var careerarr = info2.careerarr;

        var main = new MainLayout();
        var ver = new VerticalLayout();
        var hor = new HorizontalLayout();

        main.addControl(ver);
        main.addControl(hor);

        //var p = new ProfileItem(info);
        var info = arrarr[0];
        var p = this.createProfile(info);
        var brdid = Number(info.uid.toString().padEnd(6, "0"));
        var conf = {
            type: 'boardlist',
            dbpath: arg.dbpath,
            code: "da_employee",
            brdid: brdid + 1,
            renderview: 'BoardView',
            rendertype: 'table',
            tabthread: [{
                key: 'aaa',
                brdid: brdid + 1,
                value: 'alink'
            },
            {
                key: 'bbb',
                brdid: brdid + 2,
                value: 'blink'
            }]
        };
        var board = new BoardController(conf);
        //var erp = new ErpController('erplist', info.dbpath, 'employee', new EmployeeView(), {} , '');
        hor.setControl([p, 4], [board, 8]);

        

        var $page = $("<div>");
        //$(arg.elem).empty();
        main.renderController($page);

        var f = new FullScreenView();
        f.setContent(`뷰 보기2`, $page);
        console.log("brdid=" + brdid);

        $('#personBtn').bind("click", { type: 'datformSubmit', self: this, info: info, arg: arg }, this.eventHandler);
        $('#familyBtn').bind("click", { type: 'datImgselBtnClick', self: this, info: info, arg: arg }, this.eventHandler);
        $('#careerBtn').bind("click", { type: 'datImgselBtnClick', self: this, info: info, arg: arg }, this.eventHandler);
        $$('personBtn').onclick = function () {
            var f = new FullScreenView();
            f.setContent('personBtn', 'personBtn');
        };
        $$('familyBtn').onclick = function () {
            var f = new FullScreenView();
            f.setContent('familyBtn', 'familyBtn');
        };
        $$('careerBtn').onclick = function () {
            var f = new FullScreenView();
            f.setContent(`career`, `career`);
        };
        return main;
    }
}

class CompanyViewbodyTemplate {
    constructor() {
        this.info = null;
    }

    eventHandler(e) {
        //console.log("eventHandler(e) type =33333333333= ");
        var info = e.data.info;
        var arg = e.data.arg;
        var self = e.data.self;
        var type = e.data.type;

        console.log('type*****=' + type);
        if (type == 'boardrecord') {
            var str = "/view.board?code=" + arg.code + "&page=" + arg.page + "&uid=" + info.uid + "&fid=" + info.fid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&utf8=ok&";
            //console.log("eventHandler(e) boardlist ============= str == " + str);
            console.log('str====' + str);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "viewbody";
            arg.self.listAjax(arg);
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        } else if (type == 'boardwrite') {
            //console.log("eventHandler(e)============= str == " + str);
            //__fullscreenView.setContent(arg.elem);
            //__fullscreenView.fullscreen('fullscreenwin');

            str = "/smslist.contacts?findType=" + 0 + "&phoneNum=" + info.address + "&utf8=ok&";
            console.log('eventHandler(e) arg.renderinfo 222====' + arg.renderinfo);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'smslist';
            arg.self.listAjax(arg);
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        }
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

class MemberViewbodyTemplate {
    constructor() {
        this.info = null;
    }

    eventHandler(e) {
        //console.log("eventHandler(e) type =33333333333= ");
        var info = e.data.info;
        var arg = e.data.arg;
        var self = arg.self;
        var type = e.data.type;

        console.log('type*****=' + type);
        if (type == 'memberrecord') {
            if (arg.renderinfo.viewbody)
                arg.renderinfo.viewbody.createViewbody(info, arg, this.eventHandler);
            else {

                //__fullscreenView.setContent(`보기`, this.createErpFormView());
                //__fullscreenView.fullscreen('fullscreenwin');
                var f = new FullScreenView();
                f.setContent(`보기`, this.createMemberView());
            }
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        } else if (type == 'smsrecord') {
            //console.log("eventHandler(e)============= str == " + str);
            //__fullscreenView.setContent(arg.elem);
            //__fullscreenView.fullscreen('fullscreenwin');

            str = "/smslist.contacts?findType=" + 0 + "&phoneNum=" + info.address + "&utf8=ok&";
            console.log('eventHandler(e) arg.renderinfo 222====' + arg.renderinfo);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'smslist';
            arg.self.listAjax(arg);
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        }
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
                            <div><strong class="mb-1">${info.name ?? ''}</strong></div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>이메일</small>
                            <div><strong class="mb-1">${info.email ?? ''}</strong></div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action ">
                            <small>주소</small>
                            <div><strong class="mb-1">${info.addr ?? ''}</strong></div>
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

                    <button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
                    <button type="button" class="btn btn-secondary btn-lg btn-block">Block level button</button>

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
        var board = new BoardController({ type: 'boardlist', dbpath: arg.dbpath, code: "da_member", brdid: info.uid, renderview: new BoardView(), rendertype: 'table', tabthread: [{ key: 'aaa', value: 'alink' }, { key: 'bbb', value: 'blink' }] });
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

class FcmMessage {
    constructor() {

    }

    createFcmAreaBox(info) {

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
}

class ChatView {
    constructor(renderinfo) {
        self = this;
        this.arg = {};
        this.arg.renderinfo = renderinfo;
        //console.log('server_url=', server_url);
        //var server_url = "ws://127.0.0.1:7788/chat";
        this.server_url = null;
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

    isMobileDevice() {
        var user = navigator.userAgent;
        var is_mobile = false;
        if (user.indexOf("Android_Mobile_Moduda") > -1) {
            is_mobile = true;
        }
        return is_mobile;
        //return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        //return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    connectionPrompt() {
        var ip = prompt("서버 아이피를 입력하세요", '');
        if (ip == null || ip == "") {
            text = "아무것도 입력하지 않으셨네요 :<";
        } else {
            this.server_url = 'ws://' + ip + ':7788/chat';
        }
        var id = prompt("아이디를 입력하세요", this.mynickname);
        if (id == null || id == "") {
            text = "아무것도 입력하지 않으셨네요 :<";
        } else {
            this.mynickname = id;
        }
    }

    renderController(elem) {
        //console.log('$(elem).html()=' + $(elem).html());
        this.renderChatting(elem);
        //console.log('$(body).html()=' + $('body').html());
        this.initChat();
        this.initEvent();
        //this.connectionPrompt();
        fetch('/getip.utils?type=pubkey')
            .then((response) => response.text())
            .then(data => {
                var xmlDoc = $.parseXML(data);
                $(xmlDoc).find('Records').each(function (index) {

                    self._yourip = $(this).find('yourip').text();
                    self._serverip = $(this).find('serverip').text();
                    self._serverlocalip = $(this).find('serverlocalip').text();

                    //console.log('self=' + self);
                    //console.log('this=' + this);
                    //console.log('self._serverip=' + self._serverip);
                    //console.log('self._serverlocalip=' + self._serverlocalip);
                    var elem2 = document.getElementById('connect_alert');
                    elem2.innerHTML = self._serverip;
                    var elem3 = document.getElementById('connection_input');
                    //elem3.placeholder = self._serverip;
                    self.server_url = 'ws://' + self._serverip + ':7788/chat';
                    elem3.value = self.server_url;
                    
                });
            })// 에러처리
            .catch(() => {
                console.log('에러')
            });

        //this.connectToServer(this.server_url);
    }

    renderChatting(elem) {
        //console.log('$(elem)=' + $(elem));
        $(elem).append(this.createConnectBox(''));
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
        console.log('initEvent()=');
        $("#connect_btn").bind("click", { type: "connect_btn", self: this }, this.eventHandler);
        $("#camera_connect_btn").bind("click", { type: "camera_connect_btn", self: this }, this.eventHandler);
        $("#chatstart_btn").bind("click", { type: "chatstart_btn", self: this }, this.eventHandler);
        $(".chat-member").bind("click", { type: "chat-member", self: this }, this.eventHandler);
        $("#send_btn").bind("click", { type: "send_btn", self: this }, this.eventHandler);
        $("#nickname").bind("keypress", { type: "nickname", self: this }, this.eventHandler);
        $("#msg_box").bind("keypress", { type: "msg_box", self: this }, this.eventHandler);
        console.log('initEvent() end=');
    }

    eventHandler(e) {
        console.log('eventHandler e.data.type=', e.data.type);
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
            //e.preventDefault();
            if (type == 'chatstart_btn') {
                self.connectToServer();
            } else if (type == 'send_btn') {
                console.log('send_btn');
                self.sendMsgBox();
            } else if (type == 'send_btn') {
                console.log('send_btn');
                self.sendMsgBox();
            } else if (type == 'connect_btn') {
                var elem3 = document.getElementById('connection_input');
                self.connectToServer(elem3.value);
            } else if (type == 'camera_connect_btn') {
                self.rtcIdset('android', 'pc');
                self.rtcOffer();
            }
        } else if (e.type == 'list') {

        } else if (e.type == 'list') {

        }

    }

    createConnectBox(info) {
        var $connectionBox = `<div class="card border-success ">
                            <div class="alert alert-primary" id="connect_alert" role="alert">
                    </div>
                    <div class="card border-success form-inline">
                        <input type="text" id="connection_input" class="form-control msg-box">
                    </div>
                    <button type="button" class="btn btn-primary btn-lg btn-block" id="connect_btn">서버연결</button>
                    <button type="button" class="btn btn-primary btn-lg btn-block" id="camera_connect_btn" style="display:none">카메라연결</button>
                </div>`;

        return $connectionBox;
    }

    createChatMemberBox(info) {

        var $chatMember = `<div class="card border-success ">

                    <div class="card-header bg-transparent border-success">
                        <a class="btn btn-primary" data-toggle="collapse" href="#collapseChatMember" role="button" aria-expanded="false" aria-controls="collapseExample">
                            ↕
                        </a>
                        챗 멤버 (${this.mynickname})
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
        //console.log('=', )
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

            console.log('close 2');
            $('#chat-member-list').empty();
            $('#message-log-area').empty();
            self.connected = false;
            self.showConnectionLostMessage();
            //reConnect();
        };
        //alert("chat_client open_connection");
    }

    onReceive(message) {
        //console.log('onreceive message=', message);
        //let data = message;
        // data의 마지막 세 바이트를 가져옵니다.
        //let lastThreeBytes = data.slice(data.length - 3);
        // 마지막 세 바이트가 0x00 0x01 0x02인지 확인합니다.
        //if (lastThreeBytes[0] === String.fromCharCode(0x00) && lastThreeBytes[1] === String.fromCharCode(0x01) && lastThreeBytes[2] === String.fromCharCode(0x02)) {
            // data의 마지막 세 바이트를 제외한 부분을 반환합니다.
           // message = data.slice(0, data.length - 3);
        //} else {
            // data를 그대로 반환합니다.
            //message = data;
        //}
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
                }  else if (json.type == 'offer') {
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
                        console.log('if (json.sendid != this.mynickname && this.isOfferOrAnswer)');
                        var candidate = new RTCIceCandidate({
                            sdpMLineIndex: json.label,
                            candidate: json.candidate
                        })
                        console.log('} else if (json.type == candidate) { 11111111111');
                        this.rtcCandidate(candidate);
                        console.log('} else if (json.type == candidate) { 22222222222222');
                    }
                    
                }
            } catch (e) {
                //console.log('json 데이타가 아닙니다=', e);
                console.log('json 데이타가 아닙니다=', message);
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
                        var chatter_list_html = $('<li class="chat_member chatmember_context" style="list-style:none">').attr("ip", arr2[1]).attr("id", arr2[0]).text(arr2[0]);
                        $('#chat-member-list').append(chatter_list_html);
                    }

                    $('#chat-container').fadeIn();
                    $('#loading-message').hide();
                    $('#welcome-message-user-name').html(arr2[1]);
                    this.setChatContextMenu('.chatmember_context', this);
                    console.log('@first=', arr2[0], ' arr2[1]=', arr2[1], ' arr2[2]=', arr2[2]);
                } else if (arr2[0] === '@clist') {
                    arr2 = arr[1].split(':');
                    var chatter_list_html = $('<li class="chat_member chatmember_context" style="list-style:none">').attr("ip", arr2[1]).attr("id", arr2[0]).text(arr2[0]);
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

    addLastBeat(msg) {
        msg += String.fromCharCode(0x00) + String.fromCharCode(0x01) + String.fromCharCode(0x02);
        return msg;
    }

    startMsg() {
        //this.sendMessage('@first', 'first', '');
        var msg = '@first:' + this.mynickname + ';';
        //msg = this.addLastBeat(msg);
        this.socket.send(msg);
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
            // 0x12, 0x34, 0x56 값을 문자열에 추가합니다.
            //msg_data_str += String.fromCharCode(0x00) + String.fromCharCode(0x01) + String.fromCharCode(0x02);
            //msg_data_str += String.fromCharCode(0x80);
            //console.log(`message_to_send== ${message_to_send}`);
            //msg_data_str = this.addLastBeat(msg_data_str);
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
        //msg = this.addLastBeat(msg);
        this.socket.send(msg);
    }

    sendExile(id) {
        var msg = "@exile;" + id + "; " + message;
        //msg = this.addLastBeat(msg);
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
        //console.log('sendRtc(message)  JSON.stringify(message)=' + JSON.stringify(message));
        //console.log('JSON.stringify(message)=' + Base64.encode(JSON.stringify(message)));
        //var msg = Base64.encode(JSON.stringify(message));
        var msg = JSON.stringify(message);
        //msg = this.addLastBeat(msg);
        console.log('sendRtc msg=', msg);
        try {
            this.socket.send(msg);
            //this.socket.send(JSON.stringify(message));
        } catch (e) {
            console.log('error=', e);
        }
        //addNewMsg(message);
        //console.log('sendRtc=');
    }

    serializeLay() {
        var info = { classname: this.constructor.name };
        info.renderinfo = this.arg.renderinfo;
        info.ltype = 'Chat';

        return info;
    }

    deSerializeLay(control) {

    }
}

class RtcAdminRoom extends ChatView {
    constructor(renderinfo) {
        super(renderinfo);
        this.arg = {};
        this.arg.renderinfo = renderinfo;
        this._serverip = renderinfo.serverip;

        if (this.isMobileDevice()) {
            this.mynickname = 'android';
        } else {
            this.mynickname = 'pc';
        }
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

        //main.addControl(ver);
        main.addControl(hor);

        this.$video1 = $(`<video id="vid1" src="" playsinline autoplay muted></video>`);
        this.$video2 = $(`<video id="vid2" src="" playsinline autoplay></video>`);

        var chatelem = $('<div>');
        
        ver.addControl(this.$video1);
        ver.addControl(this.$video2);
        hor.setControl([ver, 8], [chatelem, 4]);
        main.renderController(elem);

        this.renderChatting(chatelem);

        //this.connectionPrompt();
        //this.connectToServer(this.server_url);

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
                video: { width: 1280, height: 720 }
            })
            .then(stream => {

                console.log(`this.vid1: ${this.vid1}`);
                this.vid1.srcObject = stream;
                this.localStream = stream;
                console.log(`this.localStream: ${this.localStream}`);
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

        if (self._serverip == null) {
            fetch('/getip.utils?type=pubkey')
                .then((response) => response.text())
                .then(data => {
                    var xmlDoc = $.parseXML(data);
                    $(xmlDoc).find('Records').each(function (index) {

                        self._yourip = $(this).find('yourip').text();
                        self._serverip = $(this).find('serverip').text();
                        self._serverlocalip = $(this).find('serverlocalip').text();

                        //console.log('self._yourip=' + self._yourip);
                        //console.log('self._serverip=' + self._serverip);
                        //console.log('self._serverlocalip=' + self._serverlocalip);
                        var elem2 = document.getElementById('connect_alert');
                        elem2.innerHTML = self._serverip;
                        var elem3 = document.getElementById('connection_input');
                        //elem3.placeholder = self._serverip;
                        self.server_url = 'ws://' + self._serverip + ':7789/chat';
                        elem3.value = self.server_url;
                    });
                });
        } else {
            var elem2 = document.getElementById('connect_alert');
            elem2.innerHTML = self._serverip;
            var elem3 = document.getElementById('connection_input');
            //elem3.placeholder = self._serverip;
            self.server_url = 'ws://' + self._serverip + ':7789/chat';
            elem3.value = self.server_url;

            var elem4 = document.getElementById('camera_connect_btn');
            elem4.style.display = 'block';
        }
        
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
        //console.log(`${this.getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
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

    serializeLay() {
        var info = { classname: this.constructor.name };
        info.renderinfo = this.arg.renderinfo;
        info.ltype = 'RtcSignalingChat';

        return info;
    }

    deSerializeLay(control) {

    }
}

class RtcSignalingChat extends ChatView {
    constructor(renderinfo) {
        super(renderinfo);
        this.arg = {};
        this.arg.renderinfo = renderinfo;

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

        this.$video1 = $(`<video id="vid1" src="" playsinline autoplay muted></video>`);
        this.$video2 = $(`<video id="vid2" src="" playsinline autoplay></video>`);

        var chatelem = $('<div>');
        hor.setControl([this.$video1, 4], [this.$video2, 4], [chatelem, 4]);
        main.renderController(elem);

        this.renderChatting(chatelem);

        //this.connectionPrompt();
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
                video: { width: 1280, height: 720 }
            })
            .then(stream => {
                
                console.log(`this.vid1: ${this.vid1}`);
                this.vid1.srcObject = stream;
                this.localStream = stream;
                console.log(`this.localStream: ${this.localStream}`);
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

        fetch('/getip.utils?type=pubkey')
            .then((response) => response.text())
            .then(data => {
                var xmlDoc = $.parseXML(data);
                $(xmlDoc).find('Records').each(function (index) {

                    self._yourip = $(this).find('yourip').text();
                    self._serverip = $(this).find('serverip').text();
                    self._serverlocalip = $(this).find('serverlocalip').text();

                    //console.log('self._yourip=' + self._yourip);
                    //console.log('self._serverip=' + self._serverip);
                    //console.log('self._serverlocalip=' + self._serverlocalip);
                    var elem2 = document.getElementById('connect_alert');
                    elem2.innerHTML = self._serverip;
                    var elem3 = document.getElementById('connection_input');
                    //elem3.placeholder = self._serverip;
                    self.server_url = 'ws://' + self._serverip + ':7789/chat';
                    elem3.value = self.server_url;
                });
            });
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
        //console.log(`${this.getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
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

    serializeLay() {
        var info = { classname: this.constructor.name };
        info.renderinfo = this.arg.renderinfo;
        info.ltype = 'RtcSignalingChat';

        return info;
    }

    deSerializeLay(control) {

    }
}