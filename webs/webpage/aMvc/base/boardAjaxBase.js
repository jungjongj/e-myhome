class MemberNetworkAjaxBase {
    constructor(renderinfo) {
        console.log(`renderinfo.type=${renderinfo.type}`);
    }

    startAndroidAjax(arg) {
        var path = arg.path + ((/\?/).test(arg.path) ? "&" : "?") + (new Date()).getTime();
        console.log('arg.path=', arg.path);
        fetch(path)
            .then((response) => response.text())
            .then(data => {
                var xmlDoc = $.parseXML(data);
                console.log('xmlDoc=', xmlDoc, 'arg.type=', arg.type);
                if (arg.type == "fcmlist")
                    this.makeFcmList(xmlDoc, arg);
                else if (arg.type == "topiclist")
                    this.makeFcmTopicList(xmlDoc, arg);
                else if (arg.type == "contactslist")
                    this.makeContactsList(xmlDoc, arg);
                else if (arg.type == "contactsdata")
                    this.makeContactsData(xmlDoc, arg);
                else if (arg.type == "contactsgroup")
                    this.makeContactsGroupList(xmlDoc, arg);
                else if (arg.type == "groupmemlist")
                    this.makeContactsGroupMemList(xmlDoc, arg);
                else if (arg.type == "callstate")
                    this.makeContactsCallstateList(xmlDoc, arg);
                else if (arg.type == "smslist")
                    this.makeSmsList(xmlDoc, arg);
                else if (arg.type == "smsview")
                    this.makeSmsView(xmlDoc, arg);
                else if (arg.type === "memberlist")
                    this.makeMemberList(xmlDoc, arg);
                else if (arg.type === "adminlist")
                    this.makeAdminList(xmlDoc, arg);
            })
            .catch(() => {
                // 에러처리
                console.log('에러')
            });
    }

    listAjax(arg) {
        this.startAndroidAjax(arg);
    }

    makeAdminList(xmlDoc, arg) {
        alert('makeAdminList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeMemberList(xmlDoc, arg) {
        alert('makeMemberList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeFcmList(xmlDoc, arg) {
        alert('makeFcmList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeFcmTopicList(xmlDoc, arg) {
        alert('makeTopicList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeContactsList(xmlDoc, arg) {
        alert('makeContactsList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeContactsData(xmlDoc, arg) {
        alert('makeContactsData(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeContactsGroupList(xmlDoc, arg) {
        alert('makeContactsGroupList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeContactsGroupMemList(xmlDoc, arg) {
        alert('makeContactsGroupMemList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeContactsCallstateList(xmlDoc, arg) {
        alert('makeContactsCallstateList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeSmsList(xmlDoc, arg) {
        alert('makeBoardList(makeFcmList, arg) 메소드를 구현해야됩니다');
    }

    makeSmsView(xmlDoc, arg) {
        alert('makeBoardList(makeFcmList, arg) 메소드를 구현해야됩니다');
    }

    getInfoAdminList(xmlDoc, arg) {
        console.log(`err=`);
        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }

        var pageinfo = {};
        pageinfo.pagetype = 'keyvaluepage';
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);
        var arrarr = [];
        var b = true;

        var loginfo = this.getInfoLoginfo(xmlDoc);

        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.uid = $(this).find('uid').text();
            info.id = $(this).find('adminid').text();
            info.name = $(this).find('name').text();
            info.admcode = $(this).find('admcode').text();
            info.passwd = $(this).find('passwd').text();
            info.email = $(this).find('email').text();

            info.uuid = $(this).find('uuid').text();
            info.mobile = $(this).find('mobile').text();
            info.phone1 = $(this).find('phone1').text();
            info.level = $(this).find('level').text();
            info.register = $(this).find('register').text();
            info.fcmtoken = $(this).find('fcmtoken').text();
            info.fcmopen = $(this).find('fcmopen').text();
            info.ip = $(this).find('ip').text();
            info.arr = [];

            arrarr[arrarr.length] = info;
        });
        var reinfo = { pageinfo: pageinfo, loginfo: loginfo, arrarr: arrarr };

        return reinfo;
    }

    getInfoMemberList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }

        var pageinfo = {};
        pageinfo.pagetype = 'keyvaluepage';
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);

        var loginfo = this.getInfoLoginfo(xmlDoc);

        var arrarr = [];
        var b = true;

        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.uid = $(this).find('uid').text();
            info.id = $(this).find('id').text();
            info.name = $(this).find('name').text();
            info.sex = $(this).find('sex').text();
            info.passwd = $(this).find('passwd').text();
            info.email = $(this).find('email').text();
            info.icon = $(this).find('icon').text();

            info.homepage = $(this).find('homepage').text();
            info.mobile = $(this).find('mobile').text();
            info.phone1 = $(this).find('phone1').text();
            info.phone2 = $(this).find('phone2').text();
            info.addrcode = $(this).find('addrcode').text();
            info.sido = $(this).find('sido').text();
            info.addr = $(this).find('addr').text();
            info.comment = $(this).find('comment').text();
            info.register = $(this).find('register').text();
            info.job = $(this).find('job').text();
            info.reserve = $(this).find('reserve').text();
            info.memlevel = $(this).find('memlevel').text();
            info.levelpt = $(this).find('levelpt').text();
            info.emoney = $(this).find('emoney').text();
            info.fcmtoken = $(this).find('fcmtoken').text();
            info.fcmopen = $(this).find('fcmopen').text();
            info.ip = $(this).find('ip').text();
            info.arr = [];

            arrarr[arrarr.length] = info;
        });

        var reinfo = { pageinfo: pageinfo, loginfo: loginfo, arrarr: arrarr };

        return reinfo;
    }

    getInfoLoginfo(xmlDoc) {
        var logtype = $(xmlDoc).find('DaBoard').attr('se_logtype');
        var sid = $(xmlDoc).find('DaBoard').attr('se_id');
        var semail = $(xmlDoc).find('DaBoard').attr('se_email');
        var slevel = $(xmlDoc).find('DaBoard').attr('se_level');
        var slevelpt = $(xmlDoc).find('DaBoard').attr('se_levelpt');
        var sjjocjynum = $(xmlDoc).find('DaBoard').attr('se_jjocjynum');
        //console.log('sid==' + sid);
        var loginfo = {};
        loginfo.ok = false;
        if (sid) {
            loginfo.logtype = logtype;
            loginfo.sid = sid;
            loginfo.semail = semail;
            loginfo.slevel = slevel;
            loginfo.slevelpt = slevelpt;
            loginfo.sjjocjynum = sjjocjynum;
            loginfo.ok = true;
        } else {
            var url = unescape(location.href);
            var iValue = url.indexOf('localhost');
            if (iValue == -1) {
                iValue = url.indexOf('127.0.0.1');
                if (iValue != -1) {
                    loginfo.ok = true;
                }
            } else
                loginfo.ok = true;
        }

        //loginfo.dbpath = dbpath;
        //loginfo.code = code;
        //alert("$templeft.append(createLogin(info))");
        //createLogin(loginfo);
        return loginfo;
    }

    getInfoFcmMessageList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }

        var pageinfo = {};
        pageinfo.pagetype = 'keyvaluepage';
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);

        var loginfo = this.getInfoLoginfo(xmlDoc);

        var arrarr = [];
        var b = true;

        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.uid = $(this).find('uid').text();
            info.sendid = $(this).find('sendid').text();
            info.sendtoken = $(this).find('sendtoken').text();
            info.getid = $(this).find('getid').text();
            info.gettoken = $(this).find('gettoken').text();
            info.domain = $(this).find('domain').text();
            info.subject = $(this).find('subject').text();
            info.memo1 = $(this).find('memo1').text();
            info.memo_type = $(this).find('memo_type').text();
            info.register = $(this).find('register').text();
            info.arr = [];

            arrarr[arrarr.length] = info;
        });

        //arrarr = this.arrayTreeAlign(arrarr, arr);

        var reinfo = { pageinfo: pageinfo, loginfo: loginfo, arrarr: arrarr };

        return reinfo;
    }

    getInfoFcmTopicList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }

        var pageinfo = {};
        pageinfo.pagetype = 'keyvaluepage';
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);

        var loginfo = this.getInfoLoginfo(xmlDoc);

        var arrarr = [];
        var b = true;

        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.uid = $(this).find('uid').text();
            info.sendid = $(this).find('sendid').text();
            info.sendtoken = $(this).find('sendtoken').text();
            info.getid = $(this).find('getid').text();
            info.gettoken = $(this).find('gettoken').text();
            info.domain = $(this).find('domain').text();
            info.subject = $(this).find('subject').text();
            info.memo1 = $(this).find('memo1').text();
            info.memo_type = $(this).find('memo_type').text();
            info.register = $(this).find('register').text();
            info.arr = [];

            arrarr[arrarr.length] = info;
        });

        //arrarr = this.arrayTreeAlign(arrarr, arr);

        var reinfo = { pageinfo: pageinfo, loginfo: loginfo, arrarr: arrarr };

        return reinfo;
    }

    getInfoContactsList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }
        //console.log(`this.arg.path=${this.arg.path}`);
        var loginfo = this.getInfoLoginfo(xmlDoc);
        console.log(`this.arg.path=${this.arg.path}`);
        var arrarr = [];
        var b = true;

        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.photo_blob = $(this).find('item').text();
            info.contact_id = $(this).find('item').attr('contact_id');
            info.display_name = $(this).find('item').attr('display_name');
            info.phone_num = $(this).find('item').attr('phone_num');
            info.photo_id = $(this).find('item').attr('photo_id');
            info.arr = [];
            console.log(`info.photo_id=${info.photo_id}`);
            arrarr[arrarr.length] = info;
        });

       // arrarr = this.arrayTreeAlign(arrarr, arr);
        //console.log(`this.arg.path=${this.arg.path}`);
        var reinfo = { loginfo: loginfo, arrarr: arrarr };
        //console.log(`this.arg.path=${this.arg.path}`);
        return reinfo;
    }

    getInfoContactsData(xmlDoc, arg) {
        console.log(`$(xmlDoc)=`, $(xmlDoc));
        var err = $(xmlDoc).find('Msg').attr('error');
        console.log(`err=`, err);
        if (err != "ok") {
            alert(err);
            return;
        }
        console.log(`getInfoContactsData=`);
        var loginfo = this.getInfoLoginfo(xmlDoc);

        var arrarr = [];
        var b = true;

        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            console.log(`getInfoContactsData=`);
            $(this).find('tel').each(function (index) {
                var info2 = {};
                info2.phonenum = $(this).attr('phonenum');
                info2.type = $(this).attr('type');
                info2.label = $(this).attr('label');
                if(info.tel)
                    info.tel[info.tel.length] = info2;
                else
                    info.tel = [info2];
            });
            
            $(this).find('email').each(function (index) {
                var info2 = {};
                info2.email = $(this).attr('email');
                info2.type = $(this).attr('type');
                info2.label = $(this).attr('label');
                if (info.email)
                    info.email[info.email.length] = info2;
                else
                    info.email = [info2];
            });
            
            $(this).find('addr').each(function (index) {
                var info2 = {};
                info2.addr = $(this).attr('addr');
                info2.type = $(this).attr('type');
                info2.label = $(this).attr('label');
                if (info.addr)
                    info.addr[info.addr.length] = info2;
                else
                    info.addr = [info2];
            });

            $(this).find('note').each(function (index) {
                var info2 = {};
                info2.note = $(this).attr('note');
                info2.type = $(this).attr('type');
                info2.label = $(this).attr('label');
                if (info.note)
                    info.note[info.note.length] = info2;
                else
                    info.note = [info2];
            });

            $(this).find('web').each(function (index) {
                var info2 = {};
                info2.web = $(this).attr('web');
                info2.type = $(this).attr('type');
                info2.label = $(this).attr('label');
                if (info.web)
                    info.web[info.web.length] = info2;
                else
                    info.web = [info2];
            });

            $(this).find('company').each(function (index) {
                var info2 = {};
                info2.company = $(this).attr('company');
                info2.type = $(this).attr('type');
                info2.label = $(this).attr('label');
                if (info.company)
                    info.company[info.company.length] = info2;
                else
                    info.company = [info2];
            });
            
            $(this).find('data').each(function (index) {
                var info2 = {};
                info2.data = $(this).attr('data');
                info2.type = $(this).attr('type');
                info2.label = $(this).attr('label');
                if (info.data)
                    info.data[info.data.length] = info2;
                else
                    info.data = [info2];
            });

            $(this).find('item').each(function (index) {
                
                info.photo_blob = $(this).text();
                //console.log(`info.photo_blob=`, info.photo_blob);
            });
            
            arrarr[arrarr.length] = info;
        });

        //arrarr = this.arrayTreeAlign(arrarr, arr);

        var reinfo = { loginfo: loginfo, arrarr: arrarr };

        return reinfo;
    }

    getInfoContactsGroupList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }

        var loginfo = this.getInfoLoginfo(xmlDoc);

        var arrarr = [];
        var b = true;

        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.title = $(this).find('group').text();
            info.groupid = $(this).find('group').attr('groupid');
            info.memnum = $(this).find('group').attr('memnum');
            info.DELETED = $(this).find('group').attr('DELETED');
            info.GROUP_VISIBLE = $(this).find('group').attr('GROUP_VISIBLE');
            info.title = $(this).find('group').attr('title');
            info.arr = [];

            arrarr[arrarr.length] = info;
        });

        //arrarr = this.arrayTreeAlign(arrarr, arr);

        var reinfo = { loginfo: loginfo, arrarr: arrarr };

        return reinfo;
    }

    getInfoContactsGroupMemList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        console.log(`err=${err}`);
        if (err != "ok") {
            alert(err);
            return;
        }

        var loginfo = this.getInfoLoginfo(xmlDoc);
        console.log(`err=${err}`);
        var arrarr = [];
        var b = true;

        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.title = $(this).find('item').text();
            info.contact_id = $(this).find('item').attr('contact_id');
            info.display_name = $(this).find('item').attr('display_name');
            info.phone_num = $(this).find('item').attr('phone_num');
            info.photo_id = $(this).find('item').attr('photo_id');
            info.arr = [];

            arrarr[arrarr.length] = info;
        });

        var reinfo = { loginfo: loginfo, arrarr: arrarr };

        return reinfo;
    }

    getInfoContactsCallstateList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        console.log(`err=${err}`);
        if (err != "ok") {
            alert(err);
            return;
        }

        var loginfo = this.getInfoLoginfo(xmlDoc);
        console.log(`err=${err}`);
        var arrarr = [];
        var b = true;

        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.name = $(this).find('callstate').attr('name');
            info.number = $(this).find('callstate').attr('number');
            info.date = $(this).find('callstate').attr('date');
            info.type = $(this).find('callstate').attr('type');
            info.duration = $(this).find('callstate').attr('duration');

            arrarr[arrarr.length] = info;
        });

        var reinfo = { loginfo: loginfo, arrarr: arrarr };

        return reinfo;
    }

    getInfoSmsList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        console.log(`err=${err}`);
        if (err != "ok") {
            alert(err);
            return;
        }

        var loginfo = this.getInfoLoginfo(xmlDoc);

        var arrarr = [];
        var b = true;

        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.title = $(this).find('sms').text();
            info.threadId = $(this).find('sms').attr('threadId');
            info.messageId = $(this).find('sms').attr('messageId');
            info.contactId = $(this).find('sms').attr('contactId');
            info.address = $(this).find('sms').attr('address');
            info.subject = $(this).find('sms').attr('subject');
            info.body = $(this).find('sms').attr('body');
            info.timestamp = $(this).find('sms').attr('timestamp');
            info.arr = [];

            arrarr[arrarr.length] = info;
        });

        //arrarr = this.arrayTreeAlign(arrarr, arr);
        
        var reinfo = { loginfo: loginfo, arrarr: arrarr };

        return reinfo;
    }
}

class MemberNetworkController extends MemberNetworkAjaxBase {

    constructor(renderinfo) {
        super(renderinfo);

        if (!renderinfo)
            return;
        this.setRenderinfo(renderinfo);
    }

    setRenderinfo(renderinfo) {
        this.$parent = renderinfo.$parent;
        var type = renderinfo.type;
        var dbpath = renderinfo.dbpath;
        var code = renderinfo.code;

        var str = "/contactslist.contacts?dbpath=" + dbpath + "&code=" + code + "&memtype=list&utf8=ok&";

        if (type == 'contactslist')
            str = "/contactslist.contacts?dbpath=" + dbpath + "&code=" + code + "&memtype=list&utf8=ok&";
        else if (type == 'memberlist')
            str = "/member.member?dbpath=" + dbpath + "&code=" + code + "&memtype=list&utf8=ok&";
        else if (type == 'memberlist')
            str = "/fcmmessage.member?dbpath=" + dbpath + "&code=" + code + "&memtype=list&utf8=ok&";
        else if (type == 'memberlist')
            str = "/fcmtopic.member?dbpath=" + dbpath + "&code=" + code + "&memtype=list&utf8=ok&";
        else if (type == 'main_grouplist') {
            type = 'grouplist';
            str = `/grouplist.board?code=${code}&dbpath=${dbpath}&utf8=ok&`;
            if (__mainController)
                alert('메인게시판은 이미지정되어있습니다');
            else
                __mainController = this;

        } else if (type == 'main_boardlist') {
            type = 'boardlist';
            str = `/list.board?code=${code}&dbpath=${dbpath}&brdid=${brdid}&utf8=ok&`;
            if (__mainController)
                alert('메인게시판은 이미지정되어있습니다');
            else
                __mainController = this;
        }

        renderinfo.path = str;

        var arg = {};
        arg.dbpath = renderinfo.dbpath;
        arg.code = renderinfo.code;
        arg.renderinfo = renderinfo;
        arg.type = renderinfo.type;
        arg.path = str;
        arg.self = this;
        this.arg = arg;
    }

    renderController(elem) {
        this.self = this;
        this.arg.elem = elem;
        console.log(`this.arg.path=${this.arg.path}`);
        this.listAjax(this.arg);
    }

    setController(type, dbpath, code, brdid, elem) {
        var str = `/mankeyvalue.adm?dbpath=${dbpath}&kcode=${kcode}&kname=${kname}&type=keyvalue&utf8=ok&`;
        this.self = this;
        this.arg.path = str;
        this.arg.code = code;
        this.arg.brdid = brdid;
        this.renderController(elem);
    }

    makeAdminList(xmlDoc, arg) {
        console.log(`xmlDoc=${xmlDoc}`);
        arg.self = this;
        var info = this.getInfoAdminList(xmlDoc, arg);
        console.log(`info=${info}`);
        if (info == null || info == undefined)
            info = {};
        console.log(`this.arg.path123=${this.arg.path}`);
        
        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createAdminList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createAdminList(info, arg, this.eventHandler);
        }

        if (arg.renderinfo.viewbody && typeof arg.renderinfo.viewbody === "string") {
            arg.renderinfo.viewbody = eval("new " + arg.renderinfo.viewbody + "()");
            arg.renderinfo.viewbody.createViewbody(info, arg, this.eventHandler);
        } else if (arg.renderinfo.viewbody && typeof arg.renderinfo.viewbody === "object") {
            arg.renderinfo.viewbody.createViewbody(info, arg, this.eventHandler);
        } else {
            if (arg.renderinfo.renderview)
                arg.renderinfo.renderview.createViewbody(info, arg, this.eventHandler);
        }

        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makeMemberList(xmlDoc, arg) {
        console.log(`this.arg.path=${this.arg.path}`);
        arg.self = this;
        var info = this.getInfoMemberList(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};
        console.log(`this.arg.path=${this.arg.path}`);
        
        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createMemberList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createMemberList(info, arg, this.eventHandler);
        }

        if (arg.renderinfo.viewbody && typeof arg.renderinfo.viewbody === "string") {
            arg.renderinfo.viewbody = eval("new " + arg.renderinfo.viewbody + "()");
            arg.renderinfo.viewbody.createViewbody(info, arg, this.eventHandler);
        } else if (arg.renderinfo.viewbody && typeof arg.renderinfo.viewbody === "object") {
            arg.renderinfo.viewbody.createViewbody(info, arg, this.eventHandler);
        } else {
            if (arg.renderinfo.renderview)
                arg.renderinfo.renderview.createViewbody(info, arg, this.eventHandler);
        }

        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makeFcmMessageList(xmlDoc, arg) {
        arg.self = this;
        var info = this.getInfoFcmMessageList(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};

        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createFmsMessageList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createFmsMessageList(info, arg, this.eventHandler);
        }

        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makeFcmTopicList(xmlDoc, arg) {
        arg.self = this;
        console.log(`this.arg.path=${this.arg.path}`);
        var info = this.getInfoFcmTopicList(xmlDoc, arg);
        console.log(`info=${info}`);
        if (info == null || info == undefined)
            info = {};

        if (arg.renderinfo.renderview)
            arg.renderinfo.renderview.createFcmTopicList(info, arg, this.eventHandler);

        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createFcmTopicList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createFcmTopicList(info, arg, this.eventHandler);
        }

        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makeContactsList(xmlDoc, arg) {
        console.log(`this.arg.path=${this.arg.path}`);
        arg.self = this;
        var info = this.getInfoContactsList(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};
        console.log(`arg.rendertype=${arg.rendertype}`);
        console.log(`arg.renderinfo.renderview=${arg.renderinfo.renderview}`);
        
        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            console.log(`arg.renderinfo.renderview=${arg.renderinfo.renderview}`);
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            console.log(`arg.renderinfo.renderview=${arg.renderinfo.renderview}`);
            arg.renderinfo.renderview.createContactsList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createContactsList(info, arg, this.eventHandler);
        }

        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makeContactsData(xmlDoc, arg) {
        arg.self = this;
        var info = this.getInfoContactsData(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};
        console.log(`info.arrarr=${info.arrarr}`);
        if (arg.renderinfo.renderview)
            arg.renderinfo.renderview.createContactsData(info, arg, this.eventHandler);

        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createContactsData(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createContactsData(info, arg, this.eventHandler);
        }

        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makeContactsGroupList(xmlDoc, arg) {
        arg.self = this;
        console.log(`makeContactsGroupList(xmlDoc, arg)`);
        var info = this.getInfoContactsGroupList(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};
        //console.log(`info.arrarr=${info.arrarr}`);
        if (arg.renderinfo.renderview)
            arg.renderinfo.renderview.createContactsGroupList(info, arg, this.eventHandler);

        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createContactsGroupList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createContactsGroupList(info, arg, this.eventHandler);
        }

        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makeContactsGroupMemList(xmlDoc, arg) {
        arg.self = this;
        console.log(`makeContactsGroupMemList(xmlDoc, arg)`);
        var info = this.getInfoContactsGroupMemList(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};
        console.log(`makeContactsGroupMemList(xmlDoc, arg)`);
        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createContactsGroupMemList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createContactsGroupMemList(info, arg, this.eventHandler);
        }
        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makeContactsCallstateList(xmlDoc, arg) {
        arg.self = this;
        console.log(`makeContactsCallstateList(xmlDoc, arg)`);
        var info = this.getInfoContactsCallstateList(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};
        console.log(`makeContactsCallstateList(xmlDoc, arg)`);
        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createContactsCallstateList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createContactsCallstateList(info, arg, this.eventHandler);
        }
        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makeSmsList(xmlDoc, arg) {
        arg.self = this;
        console.log(`makeSmsList(xmlDoc, arg)`);
        var info = this.getInfoSmsList(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};
        console.log(`arg.renderinfo.rendertype=${arg.renderinfo.rendertype}`);
        if (arg.renderinfo.renderview)
            arg.renderinfo.renderview.createSmsList(info, arg, this.eventHandler);

        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createSmsList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createSmsList(info, arg, this.eventHandler);
        }

        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makeSmsView(xmlDoc, arg) {
        arg.self = this;
        var info = this.getInfoBoardList(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};

        if (arg.renderinfo.renderview)
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);

        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    eventHandler(e) {
        console.log("eventHandler(e)  + arg 3= " + arg);
        var info = e.data.info;
        var arg = e.data.arg;
        var self = arg.self;
        var type = e.data.type;
        console.log("eventHandler(e) arg 333= " + arg);
        if (type == 'boardrecord') {
            //console.log("eventHandler(e)============= str == " + str);
            //__fullscreenView.setContent(arg.elem);
            //__fullscreenView.fullscreen('fullscreenwin');
            var str = "/view.board?code=" + arg.code + "&page=" + arg.page + "&uid=" + info.uid + "&fid=" + info.fid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&utf8=ok&";
            //console.log("eventHandler(e) boardlist ============= str == " + str);
            //console.log(`eventHandler(e) arg =====arg==${arg}=== arg.code${arg.code}=== str == ${str}`);
            var arg = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            self.startBoardRequest(arg);
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        } else if (type == 'boardlist' || type == 'more' || type == 'menuclick') {
            console.log("eventHandler type  == " + type);
            var str = "/list.board?code=" + arg.code + "&brdid=" + info.brdid + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            //console.log("morelist str info.brdid == " + info.brdid);
            var arg = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            self.startBoardRequest(arg);
        } else if (type == 'list') {

        } else if (type == 'boardpost') {
            var form = document.getElementById(e.data.formid);
            //console.log('form^********************************=' + form);
            arg.type = 'boardlist';
            arg.form = form;
            var formData = $(form).serializeArray();
            var b64 = Base64.encode($("#summernote").val());
            //alert("Base64.encode formid==222222" + formid);
            formData = self.changeSerialize(formData, 'comment', b64);
            //console.log("form.subject.value=======" + form.subject.value);
            b64 = Base64.encode(form.subject.value);
            formData = self.changeSerialize(formData, 'subject', b64);
            arg.formData = formData;

            arg.path = "/list.board?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + arg.uid + "&datuid=" + arg.datuid + "&utf8=ok&";
            self.postAjax(arg);
            //console.log("eventHandler(e) type33 == " + type);
        } else if (type == 'addpoint' || type == "minuspoint") {
            var str = "/view.board?posttype=addpoint&code=" + arg.code + "&point=" + e.data.point + "&uid=" + e.data.uid + "&fid=" + e.data.fid + "&dbpath=" + arg.dbpath + "&brdid=" + e.data.brdid + "&";
            console.log(` handle addpoint str=${str}********=`);
            var arg = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            self.startBoardRequest(arg);
        } else if (type == 'adddatpoint' || type == "minusdatpoint") {
            var str = "/view.board?posttype=addpoint&addtype=dat&code=" + arg.code + "&point=" + e.data.point + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&fid=" + e.data.fid + "&dbpath=" + arg.dbpath + "&brdid=" + e.data.brdid + "&";
            console.log(` handle addpoint str=${str}********=`);
            var arg = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            self.startBoardRequest(arg);
        } else if (type == 'login') {
            var form = document.getElementById(e.data.formid);
            arg.type = type;
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;
            arg.path = "/login.member?logtype=login&utf8=ok&";
            self.postAjax(arg);
        } else if (type == 'datdelete') {
            if (!confirm("댓글을 삭제합니다 ")) {
                return;
            }
            str = "/view.board?posttype=datdelete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&fid=" + e.data.fid + "&utf8=ok&";
            arg.path = str;
            self.postAjax(arg);
        }else if (type == 'boardfind') {
            var keyfield = $("#findform option:selected").val();
            var key = $("#findform input[name=key]").val();
            if (keyfield == "subject" || keyfield == "comment")
                key = Base64.encode(key);

            var str = "/list.board?code=" + arg.code + "&page=1&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&keyfield=" + keyfield + "&key=" + key + "&";
            console.log(' handle find str********************************=' + str);
            var arg = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            self.startBoardRequest(arg);
        }
    }

    serializeLay() {
        var info = { classname: this.constructor.name, controls: [this.arg] };

        return info;
    }

    deSerializeLay(control) {
        this.setRenderinfo(control.controls[0]);
    }
}

class BookmarkAjaxBase {
    constructor(renderinfo) {
        //console.log(`constructor(renderinfo) renderinfo.rendertype=`, renderinfo.rendertype);
        //console.log(`constructor(renderinfo) renderinfo.filetype=`, renderinfo.filetype);
        this.filetype = renderinfo.filetype;
        //console.log(`constructor(renderinfo) this.filetype=`, this.filetype);
        this.renderinfo = renderinfo;
        this.xmlHttpDbFile;
        this.arg = renderinfo;
        this.arg.renderinfo = renderinfo;
        this.code = null;
        this.name = null;
        this.path = renderinfo.path;
        this.sellfile = null;
        this.selldb = null;
        this.selltable = null;
        var self = this;

        console.log(`this.arg.renderinfo.renderinfo=`, this.arg.renderinfo.renderinfo);
        $(document).on("change", "#fileRootSel", function () {
            //alert('ready select change' + $(this).val());
            var roottxt = $("#fileRootSel option:selected").text();
            var root = $("#fileRootSel option:selected").val();

            var str = "/filelist.file?code=" + root + "&filepath=&utf8=ok&";
            self.arg.type = 'filelist';
            self.arg.self = this;
            self.startDbFileRequest(arg);
        });



    }

    fileList(path, elem) {
        var code = 'bookmark';
       
        var str = `/filelist.file?code=${code}&filepath=${path}&utf8=ok&`;
        //$(elem).append(this.fileelem);
        console.log(`fileList(path, elem) 2222 this.filetype=`, this.filetype);
        console.log(`fileList(path, elem)3333 str=`, str);
        this.arg.path = str;
        this.arg.elem = elem;
        //var arg = { path: str, type: "filelist", renderinfo: this.renderinfo, elem: elem, self: this };
        this.startDbFileRequest(this.arg);
    }

    renderController(elem) {
        this.fileList(this.path, elem);
        var self = this;
        $(document).on("change", "#file", function (e) {
            //file.onchange = function (e) {
            e.preventDefault();
            //console.log(`$(this=`, this, 'self=', self);
            var files = e.target.files;
            console.log('files.length=', files.length);
            for (var i = files.length - 1; i >= 0; i--) {
                self.sendFile(files[i], self);
            }
        });
    }

    startDbFileRequest(arg) { //alert(arg.path + ":" + arg.type);

        var self = this;
        if (window.ActiveXObject) {
            this.xmlHttpDbFile = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else if (window.XMLHttpRequest) {
            this.xmlHttpDbFile = new XMLHttpRequest();
        }
        this.xmlHttpDbFile.onreadystatechange = function () {

            self.handleStateChangeDbFile(arg);
            //handleStateChange(type,boardid);
        }
        this.xmlHttpDbFile.open("GET", arg.path + ((/\?/).test(arg.path) ? "&" : "?") + (new Date()).getTime(), true); //alert("a");
        this.xmlHttpDbFile.send(null);
        // GET방식에서 send()의 매개변수값으로 null을 지정한 것과 달리
        // POST방식에서는 send()의 매개변수값으로 서버로 보낼 데이터를 넣어서 실행한다.
    }

    handleStateChangeDbFile(arg) {
        //alert(xmlHttpDbFile.status + arg.type);
        if (this.xmlHttpDbFile.readyState == 4) {
            if (this.xmlHttpDbFile.status == 200) { //alert(xmlHttpDbFile.responseText);
                var xmlDoc = null;
                if (arg.type == "fileopen") {
                    //alert(this.xmlHttpDbFile.responseText);
                    __modal.hide();
                    openFileValue(this.xmlHttpDbFile.responseText);
                    return;
                } else {
                    var xmlDoc = $.parseXML(this.xmlHttpDbFile.responseText);
                }
                //console.log(`arg.renderinfo.renderinfo=`, arg.renderinfo.renderinfo);
                if (arg.type == "tableboardlist")
                    this.makeTableBoardList(xmlDoc, arg);
                else if (arg.type == "tablerecordlist")
                    this.makeTableRecordList(xmlDoc, arg);
                else if (arg.type == "filelist" || arg.type == "dblist") {
                    this.makeFileList(xmlDoc, arg);
                } else if (arg.type == "fileopen") {
                    alert(this.xmlHttpDbFile.responseText);
                } else if (arg.type == "returnvalue") {
                    alert(this.xmlHttpDbFile.responseText);
                } 
            } else {
                // 에러 출력 (404 == 페이지가 존재하지 않음)
            }
        } else {
        }
        //alert(xmlHttp.readyState + ":" + xmlHttp.status);
    }

    makeFileList(xmlDoc, arg) {
        //alert(arg.boardid);

        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }

        //$('#filelist').empty();
        $(arg.elem).empty();
        //console.log('arg.$parent=', arg.$parent);
        var code = $(xmlDoc).find('Msg').attr('code');
        var filepath = $(xmlDoc).find('Msg').attr('filepath');

        var $temp = $('<div>');

        var $card = $('<div class="card card-primary" style="">');
        var $cardHead = $('<div class="card-header">');
        var $cardBody = $('<div class="card-body" style="height:300px;overflow-y:auto">');
        var $cardFooter = $('<div class="card-footer clearfix no-border">');
        $card.append($cardHead).append($cardBody).append($cardFooter);
        $temp.append($card);

        var $cardHeadLeft = $('<div >');
        var $cardHeadRight = $('<div class="card-tools pull-right">');

        $cardHead.append($cardHeadLeft).append($cardHeadRight);

        if (this.filetype == 'file') {
            var $label = $('<label>').append('선택한파일:');
            var $labelText = $('<label id="selfile" >');
            $cardHeadLeft.append($label).append($labelText);
        }

        //console.log("$(xmlDoc).find('Msg').html()=" + $(xmlDoc).find('Msg').html());
        if (filepath) {

            var $a = $('<nav aria-label="breadcrumb">');
            var $b = $('<ol class="breadcrumb">');
            $a.append($b);
            $cardHeadLeft.append($a);
            var $li = $('<li class="breadcrumb-item">').append("H");
            $li.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: "/" }, this.onItemFileClick);
            $b.append($li);

            var arr = filepath.split('/');
            var path = "";
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == "")
                    continue;
                path += arr[i];
                if (i != arr.length - 1)
                    path += '/';

                var $li = $('<li class="breadcrumb-item">').append(arr[i]);
                $li.bind("click", { type: "d", code: code, self: this, arg: arg, name: '', path: path }, this.onItemFileClick);
                $b.append($li);
            }
        } else {
            var $a = $('<nav aria-label="breadcrumb">');
            var $b = $('<ol class="breadcrumb">');
            $a.append($b);
            $cardHeadLeft.append($a);
            var $li = $('<li class="breadcrumb-item">').append("H");
            $b.append($li);
        }

        var $cardFooterDiv = $('<div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">');
        var $cardFooterLeft = $('<div class="btn-group" role="group" aria-label="First group">');
        var $cardFooterRight = $('<div class="btn-group" role="group" aria-label="First group">');
        $cardFooterDiv.append($cardFooterLeft).append($cardFooterRight);

        var $buttonE = $(`<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">`).text('메뉴');
        var $dropdown = $('<div class="dropdown-menu">');

        var $dropBtn = $('<a class="dropdown-item" href="#">').text('열기');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdown.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('폴더생성');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdown.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('이름바꾸기');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdown.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('삭제');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdown.append($dropBtn);

        $cardFooterRight.append($buttonE).append($dropdown);
        $cardFooter.append($cardFooterDiv);

        var el = `<form id="fileajaxUpload" action="" enctype="multipart/form-data">
                      <input type="file" name="file" id="file" style="display: none">
                    </form>`;
        this.fileelem = $(el);
        $cardFooter.append($(this.fileelem));

        var listE = null;
        var tableE = null;
        if (arg.renderinfo && arg.renderinfo.rendertype === "table") {
            tableE = document.createElement("table");
            var tHeadE = document.createElement("thead");
            var tFootE = document.createElement("tfoot");
            var tBodyE = document.createElement("tbody");
            $(tableE).append(tHeadE).append(tFootE).append(tBodyE);
            $(tableE).addClass("table no-margin");

            $cardBody.append(tableE);

            var trE = $("<tr>");

            var thE1 = $("<th style='width: 5%'>").text("이름");
            var thE2 = $("<th style='width: 60%'>").text("사이즈");
            var thE3 = $("<th style='width: 10%'>").text("경로");

            $(trE).append(thE1).append(thE2).append(thE3);

            $(tHeadE).append(trE);
        } else {
            listE = $('<div class="list-group" role="tablist">');

            //$(arg.boardid).append(thumbnailE);
            $cardBody.append(listE);
        }


        var self = this;
        var bTrue = true;
        $(xmlDoc).find('Records').each(function (index) {

            var a = $(this).find('filelist').text();

            var b = a.split(';');
            //console.log('a.split();=' + a.split(';').length);
            for (var i = 0; i < b.length; i++) {
                if (b[i].length < 1) continue;

                var c = b[i].split(',');

                if (code == 'db' && c[0] == "f" && !c[1].endsWith('dadb'))
                    continue;

                var $icon = null;
                if (arg.renderinfo && arg.renderinfo.rendertype === "table") {
                    $trE = $('<tr>');
                    $thE = $('<td>');
                    //var txt = document.createTextNode(c[1]);
                    if (c[0] == "d") {
                        $icon = $('<i class="fa fa-fw fa-folder"></i>');
                    } else if (c[0] == "f") {
                        $icon = $('<i class="fa fa-fw  fa-file-text-o"></i>');
                    } else if (c[0] == "dr") {
                        $icon = $('<i class="fa fa-fw  fa-home"></i>');
                    }

                    $thE.append($icon);
                    $trE.append($thE);

                    //alert($trE.html());

                    $thE = $('<td>');
                    //var txt = document.createTextNode(c[1]);
                    //$icon = $('<i class="fa fa-fw fa-rub"></i>');
                    $thE.text(c[1]);

                    //$(thE).append(txt);
                    $trE.append($thE);
                    $thE.attr('code', code);
                    $thE.attr('filetype', c[0]);
                    $thE.attr('name', c[1]);
                    $thE.attr('path', filepath);
                    $thE.addClass('filepopupmenu');

                    $thE = $('<td>');
                    //var txt = document.createTextNode(c[2]);
                    $thE.text(c[2]);
                    $trE.append($thE);

                    $thE = $('<td>');
                    //var txt = document.createTextNode(c[3]);
                    $thE.text(c[3]);
                    $trE.append($thE);
                    // alert($thE.html());
                    $(tBodyE).append($trE);
                    //alert($thE.html());
                    //$(trE).bind("click", { type: c[0], name: c[1], length: c[2], path: c[3] }, onItemFileClick);
                    $trE.bind("click dblclick", { type: c[0], name: c[1], length: c[2], path: filepath, self: self, arg: arg, code: code }, self.onItemFileClick);
                    //$(trE).bind("dblclick", { type: c[0], name: c[1], length: c[2], path: filepath }, onItemFileDblClick);
                    $trE.attr("mouseover", "hand");
                } else {
                    if (c[0] == "d") {
                        $icon = $('<i class="fa fa-fw fa-folder"></i>');
                    } else if (c[0] == "f") {
                        $icon = $('<i class="fa fa-fw  fa-file-text-o"></i>');
                    } else if (c[0] == "dr") {
                        $icon = $('<i class="fa fa-fw  fa-home"></i>');
                    }
                    var str = c[1] + "(" + c[2] + ")";
                    var itemE = $('<a class="list-group-item list-group-item-action filepopupmenu" data-toggle="list" role="tab" aria-controls="home">');
                    itemE.append($icon).append(str);
                    itemE.bind("click dblclick", { type: c[0], name: c[1], length: c[2], path: filepath, self: self, arg: arg, code: code }, self.onItemFileClick);
                    //$(trE).bind("dblclick", { type: c[0], name: c[1], length: c[2], path: filepath }, onItemFileDblClick);
                    itemE.attr("mouseover", "hand");
                    //$(arg.boardid).append(thumbnailE);
                    listE.append(itemE);
                }
            }
        });
        console.log('arg.renderinfo==' + arg.renderinfo);

        //$('#filelist').append($temp);
        $(arg.elem).append($temp);

        var $divE = $('<div class="alert">');
        var $subdivE = $('<div >');
        var $labelE = $(`<label id="urlLabel" />`).text(arg.renderinfo.url);
        $subdivE.append($labelE);
        var $inputE = $(`<input type="text" class="form - control" name="titleInput" id="titleInput" placeholder="저장할이름..." required />`);
        $inputE.val(arg.renderinfo.title);
        var $buttonE = $("<button type='button' class='btn btn-info'>즐겨찿기추가</button>");
        $buttonE.bind("click", { type: "savefilereturn", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $divE.append($subdivE).append($inputE).append($buttonE);

        $(arg.elem).append($divE);

        return $temp;
    }

    setFavo(url, title) {
        $('#urlLabel').text(url);
        $('#titleInput').val(title);
    }

    onItemFileClick(e) { //alert(e.data.self);
        e.preventDefault();
        var self = e.data.self;
        var arg = e.data.arg;
        if (self.filetype == 'file') {
            $("#selfile").text(e.data.name);
            $("#selfile").attr('type', e.data.type);
            $("#selfile").attr('code', e.data.code);
            $("#selfile").attr('name', e.data.name);
            $("#selfile").attr('path', e.data.path);
        }
        //console.log("onItemFileClick(e) self.filetype == ", self.filetype, '$("#selfile").attr(path)=', $("#selfile").attr('path'));
        console.log(`e.data.arg.renderinfo.renderinfo=`, e.data.arg.renderinfo.renderinfo);
        console.log("onItemFileClick(e)self.filetype == ", self.filetype);
        var seldb = $("#seldb").text();
        if (e.type == "click") {
            var code = e.data.code;

            //console.log("onItemFileClick $(#seldb).text()" + $("#seldb").text() + "e.data.name==" + e.data.name);
            if (e.data.type == "d" || e.data.type == "dr") {
                var str = "/filelist.file?code=" + e.data.code + "&filetype=" + e.data.type + "&filename=" + e.data.name + "&filepath=" + e.data.path + "&utf8=ok&";
                if (seldb && code == "db") {
                    arg.path = str;
                    arg.type = "dblist";
                }
                else {
                    arg.path = str;
                    arg.type = "filelist";
                }
                e.data.self.startDbFileRequest(arg);
            } else {
                if (arg.renderinfo.$parent)
                    arg.$parent.getReturnValue('bookmark', path, name);
            }
            
            //onFilenameClick(e.data.path, e.data.name, e.data.code);
        } else if (e.type == "dblclick") {
            //alert(e.data.path);
            if (e.data.type == "f") {
                callAjax(e);
            }

        }
    }

    onMenuClick(e) {
        e.preventDefault();
        var arg = e.data.arg;
        var self = e.data.self;
        var type, code, name, path;
        console.log("onMenuClick(e)e.data.path == ", e.data.path);
        if (self.filetype == 'file') {
            name = $("#selfile").text();
            if (name) {
                type = $("#selfile").attr('type');
                code = $("#selfile").attr('code');
                name = $("#selfile").attr('name');
                path = $("#selfile").attr('path');
            } else {
                type = e.data.type;
                code = e.data.code;
                name = e.data.name;
                path = e.data.path;
            }

        }
        //name = e.data.name;
        //path = e.data.path;
        //code = e.data.code;
        console.log("onMenuClick(e) path == ", path, 'name=', name);
        var menuName = $(e.target).text();

        if (menuName == "열기") {

            var str = "/filelist.file?code=" + code + "&filetype=open&filename=" + name + "&filepath=" + path + "&utf8=ok&";
            openNewWindow(str);
            return;
        }
        else if (menuName == "이름바꾸기") {
            var newname = prompt("바꿀이름을 입력하세요");
            if (newname != null && newname != "") {

                var str = "/filelist.file?code=" + code + "&filetype=rename&filename=" + name + "&newname=" + newname + "&filepath=" + path + "&utf8=ok&";
                
                arg.path = str;
                arg.type = 'filelist';
                arg.boardid = "#filelist";
                self.startDbFileRequest(arg);

                return;
            }

            return;
        }
        else if (menuName == "폴더생성") {
            console.log('folder create filepath=', path);
            var name = prompt("생성할 폴더이름을 입력하세요");
            if (name != null && name != "") {

                var str = "/filelist.file?code=" + code + "&filetype=makefolder&filename=" + name + "&foldername=" + name + "&filepath=" + path + "&utf8=ok&";
                arg.path = str;
                arg.type = 'filelist';
                arg.boardid = "#filelist";
                self.startDbFileRequest(arg);

                return;
            }

            return;
        }
        else if (menuName == "삭제") {
            var ok = confirm(name + " 파일을 삭제합니다 ");
            if (!ok)
                return;
            alert(e.filetype);
            if (e.filetype == "d") {
                var ok = confirm(e.name + " 폴더내용까지 모두삭제됩니다 동의하십니까 ");
                if (!ok)
                    return;
            }

            var str = "/filelist.file?code=" + code + "&filetype=delete&filename=" + name + "&filepath=" + path + "&utf8=ok&";
            arg.path = str;
            arg.type = 'filelist';
            arg.boardid = "#filelist";
            self.startDbFileRequest(arg);
            return;
        } else if (menuName == "즐겨찿기추가") {
            var url = $('#urlLabel').text();
            var title = $('#titleInput').val();
            console.log('즐겨찿기추가 url=', url, 'title=', title);
            var str = "/filelist.file?code=" + code + "&filetype=addfavo&filename=" + name + "&url=" + url + "&title=" + title + "&filepath=" + path + "&utf8=ok&";
            arg.path = str;
            arg.type = 'filelist';
            arg.boardid = "#filelist";
            self.startDbFileRequest(arg);

        } else if (menuName == "파일탐색기열기") {
            console.log('zip create filepath=', path);
            var str = "/filelist.file?code=" + code + "&filetype=fileexplorer&filename=" + name + "&filepath=" + path + "&utf8=ok&";
            arg.path = str;
            arg.type = 'filelist';
            arg.boardid = "#filelist";
            self.startDbFileRequest(arg);

            return;
        }
    }

}

class DbFileAjaxBase {
    constructor(renderinfo) {
        //console.log(`constructor(renderinfo) renderinfo.rendertype=`, renderinfo.rendertype);
        //console.log(`constructor(renderinfo) renderinfo.filetype=`, renderinfo.filetype);
        this.filetype = renderinfo.filetype;
        //console.log(`constructor(renderinfo) this.filetype=`, this.filetype);
        this.renderinfo = renderinfo;
        this.xmlHttpDbFile;
        this.arg = renderinfo;
        this.arg.renderinfo = renderinfo;
        this.code = null;
        this.name = null;
        this.path = renderinfo.path;
        this.sellfile = null;
        this.selldb = null;
        this.selltable = null;
        var self = this;

        //console.log(`this.arg.renderinfo.renderinfo=`, this.arg.renderinfo.renderinfo);
        $(document).on("change", "#fileRootSel", function () {
            console.log('ready select change' + $(this).val());
            var roottxt = $("#fileRootSel option:selected").text();
            var root = $("#fileRootSel option:selected").val();

            var str = "/filelist.file?code=" + root + "&filepath=&utf8=ok&";
            self.arg.type = 'filelist';
            self.arg.path = str;
            self.arg.self = this;
            self.startDbFileRequest(self.arg);
        });



    }

    fileList(path, elem) {
        var code = null;
        if (this.filetype == 'file')
            code = 'root';
        else if (this.filetype == 'db')
            code = 'db';
        else if (this.filetype == 'bookmark')
            code = 'bookmark';
        var str = `/filelist.file?code=${code}&filepath=${path}&utf8=ok&`;
        //$(elem).append(this.fileelem);
        //console.log(`fileList(path, elem) 2222 this.filetype=`, this.filetype);
        console.log(`fileList(path, elem)3333 str=`, str);
        this.arg.path = str;
        this.arg.elem = elem;
        //var arg = { path: str, type: "filelist", renderinfo: this.renderinfo, elem: elem, self: this };
        this.startDbFileRequest(this.arg);
    }

    renderController(elem) {
        this.fileList(this.path, elem);
        var self = this;
        $(document).on("change", "#file", function (e) {
            //file.onchange = function (e) {
            e.preventDefault();
            //console.log(`$(this=`, this, 'self=', self);
            var files = e.target.files;
            console.log('files.length=', files.length);
            for (var i = files.length - 1; i >= 0; i--) {
                self.sendFile(files[i], self);
            }
        });
    }

    renderDbController(elem) {
        var hor = new HorizontalLayout();
        var ver = new VerticalLayout();


        var fileelem = document.createElement('div');
        fileelem.setAttribute('id', 'filelist');
        var elem2 = document.createElement('div');
        elem2.innerHTML = "test";
        elem2.setAttribute('id', 'tablelist');
        var elem3 = document.createElement('div');
        elem3.setAttribute('id', 'tablerecordlist');

        ver.addControl(fileelem);
        ver.addControl(elem2);

        hor.setControl([ver, 6], [elem3, 6]);
        hor.renderController(elem);

        this.fileList(this.path, elem);
        var self = this;
        $(document).on("change", "#fileinput", function (e) {
            //file.onchange = function (e) {
            e.preventDefault();
            //console.log(`$(this=`, this, 'self=', self);
            var files = e.target.files;
            console.log('files.length=', files.length);
            for (var i = files.length - 1; i >= 0; i--) {
                self.sendFile(files[i], self);
            }
        });
    }

    startDbFileRequest(arg) { //alert(arg.path + ":" + arg.type);

        var self = this;
        if (window.ActiveXObject) {
            this.xmlHttpDbFile = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else if (window.XMLHttpRequest) {
            this.xmlHttpDbFile = new XMLHttpRequest();
        }
        this.xmlHttpDbFile.onreadystatechange = function () {

            self.handleStateChangeDbFile(arg);
            //handleStateChange(type,boardid);
        }
        this.xmlHttpDbFile.open("GET", arg.path + ((/\?/).test(arg.path) ? "&" : "?") + (new Date()).getTime(), true); //alert("a");
        this.xmlHttpDbFile.send(null);
        // GET방식에서 send()의 매개변수값으로 null을 지정한 것과 달리
        // POST방식에서는 send()의 매개변수값으로 서버로 보낼 데이터를 넣어서 실행한다.
    }

    handleStateChangeDbFile(arg) {
        //alert(xmlHttpDbFile.status + arg.type);
        if (this.xmlHttpDbFile.readyState == 4) {
            if (this.xmlHttpDbFile.status == 200) { //alert(xmlHttpDbFile.responseText);
                var xmlDoc = null;
                if (arg.type == "fileopen") {
                    //alert(this.xmlHttpDbFile.responseText);
                    __modal.hide();
                    openFileValue(this.xmlHttpDbFile.responseText);
                    return;
                } else {
                    var xmlDoc = $.parseXML(this.xmlHttpDbFile.responseText);
                }
                //console.log(`arg.renderinfo.renderinfo=`, arg.renderinfo.renderinfo);
                if (arg.type == "tableboardlist")
                    this.makeTableBoardList(xmlDoc, arg);
                else if (arg.type == "tablerecordlist")
                    this.makeTableRecordList(xmlDoc, arg);
                else if (arg.type == "tablelist")
                    this.makeTableList(xmlDoc, arg);
                else if (arg.type == "basetablemake" || arg.type == "tablemake" || arg.type == "deletetable") {
                    var dbpath = $("#seldb").text();
                    arg.type = "tablelist";
                    var str = "/tablelist.adm?dbpath=" + dbpath + "&";
                    arg.path = str;
                    this.startDbFileRequest(arg);
                } else if (arg.type == "filelist" || arg.type == "dblist") {
                    this.makeFileList(xmlDoc, arg);
                } else if (arg.type == "dbmake" || arg.type == "deletedb" || arg.type == "dbmake") {
                    arg.type = "dblist";
                    var str = "/filelist.file?code=db&filepath=&utf8=ok&";
                    var arg = { path: str, type: "filelist", rendertype: "table2", boardid: "#filelist" };
                    this.startDbFileRequest(arg);
                } else if (arg.type == "fileopen") {
                    alert(this.xmlHttpDbFile.responseText);
                } else if (arg.type == "returnvalue") {
                    alert(this.xmlHttpDbFile.responseText);
                } else if (arg.type == "contacts") {
                    alert(this.xmlHttpDbFile.responseText);
                } else if (arg.type == "contactsgroup") {
                    alert(this.xmlHttpDbFile.responseText);
                } else if (arg.type == "smslist") {
                    alert(this.xmlHttpDbFile.responseText);
                }
            } else {
                // 에러 출력 (404 == 페이지가 존재하지 않음)
            }
        } else {
        }
        //alert(xmlHttp.readyState + ":" + xmlHttp.status);
    }

    makeFileList(xmlDoc, arg) {
        //alert(arg.boardid);

        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }

        //$('#filelist').empty();
        $(arg.elem).empty();
        //console.log('arg.$parent=', arg.$parent);
        var code = $(xmlDoc).find('Msg').attr('code');
        var filepath = $(xmlDoc).find('Msg').attr('filepath');
        console.log('filepath=', filepath);
        var $temp = $('<div>');

        var $card = $('<div class="card card-primary" style="">');
        var $cardHead = $('<div class="card-header">');
        var $cardBody = $('<div class="card-body" style="height:300px;overflow-y:auto">');
        var $cardFooter = $('<div class="card-footer clearfix no-border">');
        $card.append($cardHead).append($cardBody).append($cardFooter);
        $temp.append($card);

        var $cardHeadLeft = $('<div >');
        var $cardHeadRight = $('<div class="card-tools pull-right">');

        if (this.filetype == 'file') {
            var $sel = $(`<select name="fileRootSel" id="fileRootSel">
                        <option value="work">work</option>
                        <option value="root">webroot</option>
                        <option value="drive">driveroot</option>
                        <option value="db">dbfile</option>
                    </select>`);
            //$sel.val(code).trigger('change');
            $sel.val(code);
            $cardHeadRight.append($sel);
        }

        $cardHead.append($cardHeadLeft).append($cardHeadRight);

        if (this.filetype == 'file') {
            var $label = $('<label>').append('선택한파일:');
            var $labelText = $('<label id="selfile" >');
            $cardHeadLeft.append($label).append($labelText);
        } else {
            var $label = $('<label>').append('선택한디비:');
            var $labelText = $('<label id="seldb" >');
            $cardHeadLeft.append($label).append($labelText);
        }

        //console.log("$(xmlDoc).find('Msg').html()=" + $(xmlDoc).find('Msg').html());
        if (filepath) {

            var $a = $('<nav aria-label="breadcrumb">');
            var $b = $('<ol class="breadcrumb">');
            $a.append($b);
            $cardHeadLeft.append($a);
            var $li = $('<li class="breadcrumb-item">').append("H");
            $li.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: "/" }, this.onItemFileClick);
            $b.append($li);

            var arr = filepath.split('/');
            var path = "";
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == "")
                    continue;
                path += arr[i];
                if (i != arr.length - 1)
                    path += '/';

                var $li = $('<li class="breadcrumb-item">').append(arr[i]);
                $li.bind("click", { type: "d", code: code, self: this, arg: arg, name: '', path: path }, this.onItemFileClick);
                $b.append($li);
            }
        } else {
            var $a = $('<nav aria-label="breadcrumb">');
            var $b = $('<ol class="breadcrumb">');
            $a.append($b);
            $cardHeadLeft.append($a);
            var $li = $('<li class="breadcrumb-item">').append("H");
            $b.append($li);
        }

        var $cardFooterDiv = $('<div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">');
        var $cardFooterLeft = $('<div class="btn-group" role="group" aria-label="First group">');
        var $cardFooterRight = $('<div class="btn-group" role="group" aria-label="First group">');
        $cardFooterDiv.append($cardFooterLeft).append($cardFooterRight);

        if (this.filetype == 'db') {
            var $buttonE = $(`<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">`).text('디비메뉴');
            var $dropdownmenu = $('<div class="dropdown-menu">');

            var $dropBtn = $('<a class="dropdown-item" href="#">').text('디비생성');
            $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
            $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
            $dropdownmenu.append($dropBtn);

            $dropBtn = $('<a class="dropdown-item" href="#">').text('디비삭제');
            $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
            $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
            $dropdownmenu.append($dropBtn);

            $dropBtn = $('<a class="dropdown-item" href="#">').text('기본테이블생성');
            $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
            $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
            $dropdownmenu.append($dropBtn);
            /*** 
            $dropBtn = $('<a class="dropdown-item" href="#">').text('erp테이블생성');
            $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
            $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
            $dropdown.append($dropBtn);
            ***/
            $dropBtn = $('<a class="dropdown-item" href="#">').text('self테이블생성');
            $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
            $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
            $dropdownmenu.append($dropBtn);

            var $dropdown = $('<div class="dropdown">');
            $dropdown.append($buttonE).append($dropdownmenu);
            $cardFooterLeft.append($dropdown);
            //console.log('dropdown.html()=', $dropdown.html());
        }

        var $buttonE = $(`<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">`).text('파일메뉴');
        var $dropdownmenu = $('<div class="dropdown-menu">');

        var $dropBtn = $('<a class="dropdown-item" href="#">').text('열기');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdownmenu.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('다운로드');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdownmenu.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('업로드');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdownmenu.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('폴더생성');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdownmenu.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('이름바꾸기');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdownmenu.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('삭제');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdownmenu.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('현제폴더zip로');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdownmenu.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('파일탐색기열기');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdownmenu.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('인코딩확인');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdownmenu.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('utf-8');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdownmenu.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('euc-kr');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: filepath }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdownmenu.append($dropBtn);

        var $dropdown = $('<div class="dropdown">');
        $dropdown.append($buttonE).append($dropdownmenu);

        $cardFooterRight.append($dropdown);
        $cardFooter.append($cardFooterDiv);

        var el = `<form id="fileajaxUpload" action="" enctype="multipart/form-data">
                      <input type="file" name="file" id="file" style="display: none">
                    </form>`;
        this.fileelem = $(el);
        $cardFooter.append($(this.fileelem));

        var listE = null;
        var tableE = null;
        if (arg.renderinfo && arg.renderinfo.rendertype === "table") {
            tableE = document.createElement("table");
            var tHeadE = document.createElement("thead");
            var tFootE = document.createElement("tfoot");
            var tBodyE = document.createElement("tbody");
            $(tableE).append(tHeadE).append(tFootE).append(tBodyE);
            $(tableE).addClass("table no-margin");

            $cardBody.append(tableE);

            var trE = $("<tr>");

            var thE1 = $("<th style='width: 5%'>").text("이름");
            var thE2 = $("<th style='width: 60%'>").text("사이즈");
            var thE3 = $("<th style='width: 10%'>").text("경로");

            $(trE).append(thE1).append(thE2).append(thE3);

            $(tHeadE).append(trE);
        } else {
            listE = $('<div class="list-group" role="tablist">');

            //$(arg.boardid).append(thumbnailE);
            $cardBody.append(listE);
        }


        var self = this;
        var bTrue = true;
        $(xmlDoc).find('Records').each(function (index) {

            var a = $(this).find('filelist').text();

            var b = a.split(';');
            //console.log('a.split();=' + a.split(';').length);
            for (var i = 0; i < b.length; i++) {
                if (b[i].length < 1) continue;

                var c = b[i].split(',');

                if (code == 'db' && c[0] == "f" && !c[1].endsWith('dadb'))
                    continue;

                var $icon = null;
                if (arg.renderinfo && arg.renderinfo.rendertype === "table") {
                    $trE = $('<tr>');
                    $thE = $('<td>');
                    //var txt = document.createTextNode(c[1]);
                    if (c[0] == "d") {
                        $icon = $('<i class="fa fa-fw fa-folder"></i>');
                    } else if (c[0] == "f") {
                        $icon = $('<i class="fa fa-fw  fa-file-text-o"></i>');
                    } else if (c[0] == "dr") {
                        $icon = $('<i class="fa fa-fw  fa-home"></i>');
                    }

                    $thE.append($icon);
                    $trE.append($thE);

                    //alert($trE.html());

                    $thE = $('<td>');
                    //var txt = document.createTextNode(c[1]);
                    //$icon = $('<i class="fa fa-fw fa-rub"></i>');
                    $thE.text(c[1]);

                    //$(thE).append(txt);
                    $trE.append($thE);
                    $thE.attr('code', code);
                    $thE.attr('filetype', c[0]);
                    $thE.attr('name', c[1]);
                    $thE.attr('path', filepath);
                    $thE.addClass('filepopupmenu');

                    $thE = $('<td>');
                    //var txt = document.createTextNode(c[2]);
                    $thE.text(c[2]);
                    $trE.append($thE);

                    $thE = $('<td>');
                    //var txt = document.createTextNode(c[3]);
                    $thE.text(c[3]);
                    $trE.append($thE);
                    // alert($thE.html());
                    $(tBodyE).append($trE);
                    //alert($thE.html());
                    //$(trE).bind("click", { type: c[0], name: c[1], length: c[2], path: c[3] }, onItemFileClick);
                    $trE.bind("click dblclick", { type: c[0], name: c[1], length: c[2], path: filepath, self: self, arg: arg, code: code }, self.onItemFileClick);
                    //$(trE).bind("dblclick", { type: c[0], name: c[1], length: c[2], path: filepath }, onItemFileDblClick);
                    $trE.attr("mouseover", "hand");
                } else {
                    if (c[0] == "d") {
                        $icon = $('<i class="fa fa-fw fa-folder"></i>');
                    } else if (c[0] == "f") {
                        $icon = $('<i class="fa fa-fw  fa-file-text-o"></i>');
                    } else if (c[0] == "dr") {
                        $icon = $('<i class="fa fa-fw  fa-home"></i>');
                    }
                    var str = c[1] + "(" + c[2] + ")";
                    var itemE = $('<a class="list-group-item list-group-item-action filepopupmenu" data-toggle="list" role="tab" aria-controls="home">');
                    itemE.append($icon).append(str);
                    itemE.bind("click dblclick", { type: c[0], name: c[1], length: c[2], path: filepath, self: self, arg: arg, code: code }, self.onItemFileClick);
                    //$(trE).bind("dblclick", { type: c[0], name: c[1], length: c[2], path: filepath }, onItemFileDblClick);
                    itemE.attr("mouseover", "hand");
                    //$(arg.boardid).append(thumbnailE);
                    listE.append(itemE);
                }
            }
        });
        //console.log('arg.boardid==' + arg.boardid);

        //$('#filelist').append($temp);
        $(arg.elem).append($temp);

        var tableList = document.getElementById('tablelist');
        console.log('arg.renderinfo.returntype=');
        if (!tableList) {
            const $tablelist = $('<div id="tablelist">');
            $(arg.elem).append($tablelist);
        }

        if (arg.renderinfo && arg.renderinfo.returntype === "return") {
            var $divE = $('<div class="alert">');

            var $buttonE = $("<button type='button' class='btn btn-info'>리턴</button>");
            $buttonE.bind("click", { type: "return", code: code, self: this, arg: arg, name: "", path: filepath }, this.onItemReturnClick);
            $divE.append($buttonE);

            $(arg.elem).append($divE);
        } else if (arg.renderinfo && arg.renderinfo.returntype === "path") {
            var $divE = $('<div class="alert">');

            var $buttonE = $("<button type='button' class='btn btn-info'>리턴</button>");
            $buttonE.bind("click", { type: "path", code: code, self: this, arg: arg, name: "", path: filepath }, this.onItemReturnClick);
            $divE.append($buttonE);

            $(arg.elem).append($divE);
        } else if (arg.renderinfo && arg.renderinfo.returntype === "filesave") {
            var $divE = $('<div class="alert">');
            var $inputE = $(`<input type="text" class="form - control" name="saveFileInput" id="saveFileInput" placeholder="저장할이름..." required />`);
            var $buttonE = $("<button type='button' class='btn btn-info'>파일저장</button>");
            $buttonE.bind("click", { type: "savefilereturn", code: code, self: this, arg: arg, name: "", path: filepath }, this.onItemReturnClick);
            $divE.append($inputE).append($buttonE);

            $(arg.elem).append($divE);
        } else if (arg.renderinfo && arg.renderinfo.returntype === "dbsave") {
            var $divE = $('<div class="alert">');
            var $inputE = $(`<input type="text" class="form - control" name="saveDbInput" id="saveDbInput" placeholder="저장할이름..." required />`);
            var $buttonE = $("<button type='button' class='btn btn-info'>디비저장</button>");
            $buttonE.bind("click", { type: "savedbreturn", code: code, self: this, arg: arg, name: "", path: filepath }, this.onItemReturnClick);
            $divE.append($inputE).append($buttonE);

            $(arg.elem).append($divE);
        } else if (arg.renderinfo && arg.renderinfo.returntype === "fileopen") {
            var $divE = $('<div class="alert">');
            var $buttonE = $("<button type='button' class='btn btn-info'>파일열기</button>");
            $buttonE.bind("click", { type: "openfilereturn", code: code, self: this, arg: arg, name: "", path: filepath }, this.onItemReturnClick);
            $divE.append($inputE).append($buttonE);

            $(arg.elem).append($divE);
        } else if (arg.renderinfo && arg.renderinfo.returntype === "dbopen") {
            var $divE = $('<div class="alert">');
            var $buttonE = $("<button type='button' class='btn btn-info'>디비열기</button>");
            $buttonE.bind("click", { type: "opendbreturn", code: code, self: this, arg: arg, name: "", path: filepath }, this.onItemReturnClick);
            $divE.append($inputE).append($buttonE);

            $(arg.elem).append($divE);
        }

        return $temp;
    }

    getInfoFileList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return null;
        }

        var loginfo = this.getInfoBoardLoginfo(xmlDoc);

        var arrarr = [];
        $(xmlDoc).find('Records').each(function (index) {

            var a = $(this).find('filelist').text();

            var b = a.split(';');
            //console.log('a.split();=' + a.split(';').length);
            for (var i = 0; i < b.length; i++) {
                if (b[i].length < 1) continue;

                var c = b[i].split(',');

                if (code == 'db' && c[0] == "f" && !c[1].endsWith('dadb'))
                    continue;

                var info = {};
                info.type = c[0];
                info.name = c[1];
                info.length = c[2];
                info.path = filepath;

                arrarr[arrarr.length] = info;
            }
        });
        //console.log('arg.boardid==' + arg.boardid);

        var reinfo = { loginfo: loginfo, arrarr: arrarr };
        return reinfo;
    }

    onItemReturnClick(e) {
        var arg = e.data.arg;
        var dbpath = $("#seldb").text();
        var tablename = $("#seltable").text();
        var name = $("#selfile").text();
        var type = e.data.type;
        //console.log('arg.type=', arg.type, ' type=', type, ' arg.$parent=', arg.$parent);
        if (type == "return") {
            arg.$parent.getReturnValue('dbset', dbpath, tablename);
        } else if (type == "path") {
            arg.$parent.getReturnValue('path', name, e.data.path);
        } else if (type == "savedbreturn") {
            var str = "/filelist.file?code=" + e.data.code + "&filetype=savedb&filename=" + name + "&filepath=" + e.data.path + "&utf8=ok&";
            console.log('str=', str);
            const input = document.getElementById('saveDbInput');
            const form = document.getElementById('uploaddataform');
            form.upfilename.value = input.value;
            form.dbpath.value = dbpath;

            //console.log('form.uploaddata.value=', form.uploaddata.value);
            var formdata = $(form).serializeArray();

            //const formdata = new FormData();
            //formdata.append('filename', form.filename.value);
            //formdata.append('fabdata', form.fabdata.value);
            //console.log('formdata=', formdata);
            __saveFileData({ path: str, formdata: formdata, arg: arg });
        } else if (type == "savefilereturn") {

            var str = "/filelist.file?code=" + e.data.code + "&filetype=savefile&filename=" + name + "&filepath=" + e.data.path + "&utf8=ok&";
            //console.log('str=', str);
            const input = document.getElementById('saveFileInput');
            var filename = input.value;
            if (filename == '')
                return alert('파일이름을 입력해야됩니다');
            else if (!filename.endsWith(arg.renderinfo.filter)) {
                filename = filename + '.' + arg.renderinfo.filter;
            }
            const form = document.getElementById('uploaddataform');
            form.key.value = filename;
            //console.log('arg.renderinfo.filter=', arg.renderinfo.filter);
            //console.log('form.info.value=', form.info.value);
            var formdata = $(form).serializeArray();

            //const formdata = new FormData();
            //formdata.append('filename', form.filename.value);
            //formdata.append('fabdata', form.fabdata.value);
            console.log('formdata=', formdata);
            __saveFileData({ path: str, formdata: formdata, arg: arg });
        } else if (type == "opendbreturn") {
            //console.log('arg.type=', arg.type, 'arg.filter=', arg.filter);
        } else if (type == "openfilereturn") {
            //console.log('arg.$parent=', arg.$parent);
            //console.log('arg.filter=', arg.filter);
            if (arg.filter == 'fab' && !name.endsWith('fab')) {
                alert('fab 확장자를 선택해야됩니다');
                return;
            } else if (arg.filter == 'daweb' && !name.endsWith('daweb')) {
                alert('daweb 확장자를 선택해야됩니다');
                return;
            }
            var str = "/filelist.file?code=" + e.data.code + "&filetype=openfile&filename=" + name + "&filepath=" + e.data.path + "&utf8=ok&";
            //console.log('str=', str);
            arg.filepath = e.data.path;
            arg.filename = name;
            __openFileData({ path: str, arg: arg });

        }
        //console.log(`arg.self.renderinfo.$parent._dbpath=${arg.renderinfo.$parent._dbpath}_code=${e.data.code}_dbpath= ${dbpath}`);

        //console.log('return');
        __modal.hide();
    }

    onItemFileClick(e) { //alert(e.data.self);
        e.preventDefault();
        var self = e.data.self;
        var arg = e.data.arg;
        if (self.filetype == 'file') {
            $("#selfile").text(e.data.name);
            $("#selfile").attr('type', e.data.type);
            $("#selfile").attr('code', e.data.code);
            $("#selfile").attr('name', e.data.name);
            $("#selfile").attr('path', e.data.path);
        } else {
            $("#seldb").text(e.data.name);
            $("#seldb").attr('type', e.data.type);
            $("#seldb").attr('code', e.data.code);
            $("#seldb").attr('name', e.data.name);
            $("#seldb").attr('path', e.data.path);
        }
        console.log("onItemFileClick(e) self.filetype == ", self.filetype, '$("#selfile").attr(path)=', $("#selfile").attr('path'));
        //console.log(`e.data.arg.renderinfo.renderinfo=`, e.data.arg.renderinfo.renderinfo);
        //console.log("onItemFileClick(e)self.filetype == ", self.filetype);
        var seldb = $("#seldb").text();
        if (e.type == "click") {
            var code = e.data.code;

            //console.log("onItemFileClick $(#seldb).text()" + $("#seldb").text() + "e.data.name==" + e.data.name);
            if (e.data.type == "d" || e.data.type == "dr") {
                var str = "/filelist.file?code=" + e.data.code + "&filetype=" + e.data.type + "&filename=" + e.data.name + "&filepath=" + e.data.path + "&utf8=ok&";
                if (seldb && code == "db") {
                    arg.path = str;
                    arg.type = "dblist";
                }
                else {
                    arg.path = str;
                    arg.type = "filelist";
                }
                e.data.self.startDbFileRequest(arg);
            }
            else if (e.data.type == "f" && code == "db") {

                //$("#seltable").attr("name", e.data.tablename);
                //$("#seltable").attr("path", e.data.dbpath); 
                var dp = e.data.path + '/' + e.data.name;
                if (dp.startsWith('/'))
                    dp = dp.substr(1);
                var str = "/tablelist.adm?dbpath=" + dp + "&";
                //console.log("onItemDbClick(e) str == " + str);
                //var arg = { path: str, type: "tablelist", arg: e.data.arg, elem: e.data.arg.elem };
                arg.path = str;
                arg.type = "tablelist";
                //alert(arg.boardid);
                e.data.self.startDbFileRequest(arg);
            }

            //onFilenameClick(e.data.path, e.data.name, e.data.code);
        } else if (e.type == "dblclick") {
            //alert(e.data.path);
            if (e.data.type == "f") {
                callAjax(e);
            }

        }
    }

    makeTableList(xmlDoc, arg) {

        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }

        //**

        $('#tablelist').empty();

        var code = $(xmlDoc).find('Msg').attr('code');
        var dbpath = $(xmlDoc).find('Msg').attr('dbpath');

        var $temp = $('<div>');

        var $card = $('<div class="card card-primary" style="">');
        var $cardHead = $('<div class="card-header">');
        var $cardBody = $('<div class="card-body" style="height:300px;overflow-y:auto">');
        var $cardFooter = $('<div class="card-footer clearfix no-border">');
        $card.append($cardHead).append($cardBody).append($cardFooter);
        $temp.append($card);

        var $cardHeadLeft = $('<div >');

        $cardHead.append($cardHeadLeft);
        var $label = $('<label>').append('선택한테이블:');
        var $labelText = $('<label id="seltable" >');
        $cardHeadLeft.append($label).append($labelText);

        var $cardFooterDiv = $('<div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">');
        var $cardFooterLeft = $('<div class="btn-group" role="group" aria-label="First group">');
        var $cardFooterRight = $('<div class="btn-group" role="group" aria-label="First group">');
        $cardFooterDiv.append($cardFooterLeft).append($cardFooterRight);

        var $buttonE = $(`<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">`).text('테이블메뉴');
        var $dropdown = $('<div class="dropdown-menu">');

        var $dropBtn = $('<a class="dropdown-item" href="#">').text('테이블생성');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: "/" }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdown.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('테이블삭제');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: "/" }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdown.append($dropBtn);

        $dropBtn = $('<a class="dropdown-item" href="#">').text('테이블셋팅');
        $dropBtn.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: "/" }, this.onMenuClick);
        $dropBtn.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $dropdown.append($dropBtn);

        $cardFooterLeft.append($buttonE).append($dropdown);

        $cardFooter.append($cardFooterDiv);

        var tableE = document.createElement("table");
        var tHeadE = document.createElement("thead");
        var tFootE = document.createElement("tfoot");
        var tBodyE = document.createElement("tbody");
        $(tableE).append(tHeadE);
        $(tableE).append(tFootE);
        $(tableE).append(tBodyE);
        //$(tableE).attr("data-roll", "table");
        $(tableE).addClass("table no-margin");

        $cardBody.append($(tableE));

        var bTrue = true;
        var self = this;
        //**/
        $(xmlDoc).find('Records').each(function (index) {

            var len = $(this).children().length;

            for (var i = 0; i < len; i++)
            //$(this).find('tablelist').each(function (index)
            {
                //**
                if (bTrue) {
                    var trE = document.createElement("tr");

                    var thE = document.createElement("th");
                    var txt = document.createTextNode("이름");
                    $(thE).append(txt);
                    $(trE).append(thE);

                    var thE = document.createElement("th");
                    var txt = document.createTextNode("경로");
                    $(thE).append(txt);
                    $(trE).append(thE);

                    bTrue = false;
                    $(tHeadE).append(trE);
                    //setPage(xmlDoc);
                }

                //alert($(this).children()[i].tagName);

                var txt = $(this).children()[i].getAttribute("name");

                var $trE = $('<tr>');
                var $thE = $('<td>');
                $thE.text(txt);

                $thE.attr('name', txt);
                $thE.attr('path', dbpath);
                $thE.addClass('tablepopupmenu');
                $trE.append($thE);

                $thE = $('<td>');
                $thE.text(dbpath);

                $trE.append($thE);

                $(tBodyE).append($trE);

                $trE.bind("click", { tablename: txt, path: dbpath, self: self }, self.onItemTableClick);
                $trE.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
                /**
                $liE = $('<li class="media">');

                $leftE = $('<div class="media-left">').addClass(info.mediapos);
                $imgE = $('<img class="media-object">').attr("src", info.image);
                $aE = $("<a>").append($imgE);
                $leftE.append($aE);

                $bodyE = $('<div class="media-body">');
                var txt = $(this).children()[i].getAttribute("name");
                $h3E = $("<h3>").html(txt);
                $pE = $("<p>").html(dbpath);
                $bodyE.append($h3E).append($pE);

                $liE.append($leftE).append($bodyE);

                $(arg.boardid).append($liE);
                **/
            };

        });

        $('#tablelist').append($temp);

        return $temp;
        //setDbFileContextMenu('.tablepopupmenu');
    }

    onItemTableClick(e) {
        $("#seltable").text(e.data.tablename);
        $("#seltable").attr("name", e.data.tablename);

        var str = "/recordlist.adm?code=" + e.data.tablename + "&dbpath=" + e.data.path + "&utf8=ok&";
        console.log('str=', str);
        var arg = { path: str, type: "tablerecordlist", boardid: "#recordlist" };
        e.data.self.startDbFileRequest(arg);

        //onTableClick(e.data.tablename);
    }

    onMenuClick(e) {
        e.preventDefault();
        var arg = e.data.arg;
        var self = e.data.self;
        var type, code, name, path;
        path = e.data.path;
        code = e.data.code;
        console.log("onMenuClick(e)self.filetype == ", self.filetype);
        console.log("onMenuClick(e)e.data.path == ", e.data.path);
        console.log("onMenuClick(e)e.data.code== ", e.data.code);
        console.log("onMenuClick(e)$(#seldb).attr('name') == ", $("#seldb").attr('name'));
        if (self.filetype == 'file') {
            name = $("#selfile").text();
            if (name) {
                type = $("#selfile").attr('type');
                name = $("#selfile").attr('name');
                path = $("#selfile").attr('path');
                //code = $("#seldb").attr('code');
            } else {
                type = e.data.type;
                name = e.data.name;
                path = e.data.path;
                code = e.data.code;
            }

        } else {
            name = $("#seldb").text();
            if (name) {
                type = $("#seldb").attr('type');
                name = $("#seldb").attr('name');
                path = $("#seldb").attr('path');
                //code = $("#seldb").attr('code');
            } else {
                type = e.data.type;
                name = e.data.name;
                path = e.data.path;
                code = e.data.code;
            }
        }
        var seldb = $("#seldb").text();
        console.log("onMenuClick(e) path == ", path, 'name=', name);
        var menuName = $(e.target).text();

        if (menuName == "열기") {

            var str = "/filelist.file?code=" + code + "&filetype=open&filename=" + name + "&filepath=" + path + "&utf8=ok&";
            openNewWindow(str);
            return;
        } else if (menuName == "다운로드") {
            //** 
            var uri = '/' + path + '/' + name;
            uri = uri.replace('//', '/');
            uri = uri.replace('//', '/');
            console.log('path=', path, '=name=', name, '=uri=', uri);
            const link = document.createElement("a");
            link.download = name;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            //var content = 'menu click download url=' + uri;
            //var textarea_str = $("#textarea").val();

            //textarea_str = textarea_str + content;
            //$("#textarea").html(textarea_str);
            //**/
            //var str = "/filelist.file?code=" + code + "&filetype=down&filename=" + name + "&filepath=" + path + "&utf8=ok&";
            //arg.path = str;
            //self.startDbFileRequest(arg);
            console.log(str);
            //openNewWindow(str);
            return;
        } else if (menuName == "업로드") {
            var str = "/filelist.file?code=" + code + "&filetype=upload&filename=" + name + "&filepath=" + path + "&utf8=ok&";
            self.arg = { path: str, type: "filelist", boardid: "#filelist" };

            $('#file').click();
            //var str = "/filelist.file?code=" + code + "&filetype=down&filename=" + name + "&filepath=" + path + "&utf8=ok&";
            //openNewWindow(str);
            //return;
        }
        else if (menuName == "이름바꾸기") {
            var newname = prompt("바꿀이름을 입력하세요");
            if (newname != null && newname != "") {

                var str = "/filelist.file?code=" + code + "&filetype=rename&filename=" + name + "&newname=" + newname + "&filepath=" + path + "&utf8=ok&";
                if (seldb && code == "db") {
                    arg.path = str;
                    arg.type = "dblist";
                }
                else {
                    arg.path = str;
                    arg.type = "filelist";
                }
                self.startDbFileRequest(arg);

                return;
            }

            return;
        }
        else if (menuName == "폴더생성") {
            console.log('folder create filepath=', path);
            var name = prompt("생성할 폴더이름을 입력하세요");
            if (name != null && name != "") {

                var str = "/filelist.file?code=" + code + "&filetype=makefolder&filename=" + name + "&foldername=" + name + "&filepath=" + path + "&utf8=ok&";
                if (seldb && code == "db") {
                    arg.path = str;
                    arg.type = "dblist";
                }
                else {
                    arg.path = str;
                    arg.type = "filelist";
                }
                self.startDbFileRequest(arg);

                return;
            }

            return;
        }
        else if (menuName == "삭제") {
            var ok = confirm(name + " 파일을 삭제합니다 ");
            if (!ok)
                return;

            if (e.filetype == "d") {
                var ok = confirm(e.name + " 폴더내용까지 모두삭제됩니다 동의하십니까 ");
                if (!ok)
                    return;
            }

            var str = "/filelist.file?code=" + code + "&filetype=delete&filename=" + name + "&filepath=" + path + "&utf8=ok&";

            if (seldb && code == "db") {
                arg.path = str;
                arg.type = "dblist";
            }
            else {
                arg.path = str;
                arg.type = "filelist";
            }

            self.startDbFileRequest(arg);
            return;
        } else if (menuName == "현제폴더zip로") {
            console.log('zip create filepath=', path);
            var name = prompt("생성할 zip 파일이름을 입력하세요");
            if (name != null && name != "") {

                var str = "/filelist.file?code=" + code + "&filetype=makezip&filename=" + name + "&zipname=" + name + "&filepath=" + path + "&utf8=ok&";
                if (seldb && code == "db") {
                    arg.path = str;
                    arg.type = "dblist";
                }
                else {
                    arg.path = str;
                    arg.type = "filelist";
                }
                self.startDbFileRequest(arg);

                return;
            }
            return;
        } else if (menuName == "파일탐색기열기") {
            console.log('zip create filepath=', path);
            var str = "/filelist.file?code=" + code + "&filetype=fileexplorer&filename=" + name + "&filepath=" + path + "&utf8=ok&";
            var arg = { path: str, type: "filelist", boardid: "#filelist" };
            self.startDbFileRequest(arg);

            return;
        } else if (menuName == '인코딩확인') {

            console.log('onmenuclick e.target=' + $(e.target).text());
            var str = `/filelist.file?code=${code}&filetype=encoding&encodingtype=encoding&filename=${name}&filepath=${path}&utf8=ok&`;
            console.log('onmenuclickstr=' + str);
            if (seldb && code == "db") {
                arg.path = str;
                arg.type = "dblist";
            }
            else {
                arg.path = str;
                arg.type = "filelist";
            }
            self.startDbFileRequest(arg);

            return;
        } else if (menuName == 'utf-8' || menuName == 'euc-kr') {

            var str = `/filelist.file?code=${code}&filetype=encoding&encodingtype=${menuName}&filename=${name}&filepath=${path}&utf8=ok&`;
            var arg = { path: str, type: "filelist", boardid: "#filelist" };
            self.startDbFileRequest(arg);

            return;
        } else if (menuName == "디비생성") {
            var n = prompt("생성할 디비이름을 입력하세요");
            if (n == null && n == "") {
                return;
            }

            var s = n.substring(n.lastIndexOf('.'), n.length);
            if (s != ".dadb") {
                alert("파일확장자는 dadb 여야됩니다");
                return
            }

            var str = `/filelist.file?code=${code}&filetype=dbmake&filename=${n}&filepath=${path}&utf8=ok&`;
            console.log('onmenuclick str=' + str);
            if (seldb && code == "db") {
                arg.path = str;
                arg.type = "dbmake";
                arg.boardid = "#dblist";
            }
            else {
                arg.path = str;
                arg.type = "filelist";
            }
            self.startDbFileRequest(arg);
        } else if (menuName == "테이블생성") {
            var dbname = $("#seldb").text();
            if (dbname == "") {
                alert('db를 선택하세요');
                return;
            }

            var tablename = prompt("생성할 테이블이름을 입력하세요");
            if (tablename == "") {
                alert('이름을 입력해야됩니다');
                return;
            }
            var str = `/filelist.file?code=${code}&filetype=tablemake&filename=${dbname}&filepath=${path}&tabletype=board&tablename=${tablename}&utf8=ok&`;
            //var str = "/tablemake.adm?type=set&subtype=db&tabletype=board&dbpath=" + dbname + "&tablename=" + tablename + "&utf8=ok&";
            //var arg = { path: str, type: "tablemake", boardid: "#dblist" };
            if (seldb && code == "db") {
                arg.path = str;
                arg.type = "tablemake";
                arg.boardid = "#dblist";
            }
            else {
                arg.path = str;
                arg.type = "filelist";
            }
            self.startDbFileRequest(arg);
        } else if (menuName == "기본테이블생성" || menuName == "erp테이블생성" || menuName == "self테이블생성") {
            var dbname = $("#seldb").text();
            if (dbname == "") {
                alert('db를 선택하세요');
                return;
            }
            var tabletype;
            if (menuName == "기본테이블생성")
                tabletype = 'base';
            else if (menuName == "erp테이블생성")
                tabletype = 'erp';
            else if (menuName == "self테이블생성")
                tabletype = 'self';

            //var str = "/tablemake.adm?type=set&subtype=db&tabletype=" + tabletype + "&dbpath=" + dbname + "&tablename=" + tablename + "&utf8=ok&";
            var str = `/filelist.file?code=${code}&filetype=tablemake&filename=${dbname}&filepath=${path}&tabletype=${tabletype}&tablename=${tablename}&utf8=ok&`;
            //var arg = { path: str, type: "tablemake", boardid: "#dblist" };
            if (seldb && code == "db") {
                arg.path = str;
                arg.type = "tablemake";
                arg.boardid = "#dblist";
            }
            else {
                arg.path = str;
                arg.type = "filelist";
            }
            self.startDbFileRequest(arg);
        } else if (menuName == "디비삭제") {
            var n = $("#seldb").text();
            if (n == "") {
                alert('db를 선택하세요');
                return;
            }

            if (confirm(n + ' db 를 제거합니다') === true) {
                var str = "/deletedb.adm?type=set&subtype=db&dbtype=deletedb&dbpath=" + n + "&utf8=ok&";
                //var arg = { path: str, type: "deletedb", boardid: "#dblist" };
                if (seldb && code == "db") {
                    arg.path = str;
                    arg.type = "deletedb";
                    arg.boardid = "#dblist";
                }
                else {
                    arg.path = str;
                    arg.type = "filelist";
                }
                self.startDbFileRequest(arg);
            } else {

            }

        } else if (menuName == "테이블삭제") {
            var tablename = $("#seltable").text();
            if (tablename == "") {
                alert('table를 선택하세요');
                return;
            }

            var dbname = $("#seldb").text();
            if (confirm(tablename + ' 테이블 을 제거합니다') === true) {
                //console.log(`seldbpath=${sd} seltable=${n}`);
                //var str = "/deletetable.adm?type=set&subtype=db&dbtype=deletetable&dbpath=" + sd + "&code=" + n + "&utf8=ok&";
                var str = `/filelist.file?code=${code}&filetype=tabledel&filename=${dbname}&filepath=${path}&tabletype=${tabletype}&tablename=${tablename}&utf8=ok&`;
                //var arg = { path: str, type: "deletetable", boardid: "#tablelist" };
                if (seldb && code == "db") {
                    arg.path = str;
                    arg.type = "deletetable";
                    arg.boardid = "#tablelist";
                }
                else {
                    arg.path = str;
                    arg.type = "filelist";
                }
                console.log(`str=${str}`);
                self.startDbFileRequest(arg);
            } else {

            }
        } else if (menuName == "additem") {
            var n = $("#seltable").text();
            if (n == "") {
                alert('table를 선택하세요');
                return;
            }
        }
    }

    makeTableRecordList(xmlDoc, arg) {
        //alert("maketablercordlist");
        $(arg.boardid).empty();

        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }

        $('#tablerecordlist').empty();

        var code = $(xmlDoc).find('Msg').attr('code');
        var filepath = $(xmlDoc).find('Msg').attr('filepath');

        var $temp = $('<div>');

        var $card = $('<div class="card card-primary" style="">');
        var $cardHead = $('<div class="card-header">');
        var $cardBody = $('<div class="card-body" style="overflow-y:auto">');
        var $cardFooter = $('<div class="card-footer clearfix no-border">');
        $card.append($cardHead).append($cardBody).append($cardFooter);
        $temp.append($card);

        var $cardHeadLeft = $('<div >');

        $cardHead.append($cardHeadLeft);
        var $label = $('<label>').append('선택한테이블:');
        var $labelText = $('<label id="seltable" >');
        $cardHeadLeft.append($label).append($labelText);

        var $cardFooterRight = $('<div class="card-tools pull-right">');
        $cardFooterRight.append(`<select name="fileRootSel" id="fileRootSel">
                        <option value="work">work</option>
                        <option value="root">webroot</option>
                        <option value="drive">driveroot</option>
                        <option value="db">dbfile</option>
                    </select>`);
        $cardFooter.append($cardFooterRight);


        var dbpath = $(xmlDoc).find('Msg').attr('dbpath');
        var boardtype = $(xmlDoc).find('Msg').attr('boardtype');
        var code = $(xmlDoc).find('Msg').attr('code');
        var title = $(xmlDoc).find('Msg').attr('title');

        var page = parseInt($(xmlDoc).find('Msg').attr('page'));
        var total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        var page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));

        var article_num = total_record - page_num * (page - 1);

        var tableE = $('<table class="table">').addClass('table-hover');

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $(tableE).append(tHeadE);
        $(tableE).append(tFootE);
        $(tableE).append(tBodyE);
        //$(tableE).attr("data-roll", "table");
        $(tableE).addClass("table no-margin");

        $cardBody.append($(tableE));

        var bTrue = true;
        //alert(arg.boardid);
        var colArr = [];
        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var i = 0;
            var len = $(this).children().length;
            if (bTrue) {
                var trE = document.createElement("tr");
                for (i = 0; i < len; i++) {

                    var thE = document.createElement("th");
                    var txt = document.createTextNode($(this).children()[i].tagName);
                    $(thE).append(txt);
                    $(trE).append(thE);

                    colArr[i] = $(this).children()[i].tagName;
                }
                bTrue = false;
                $(tHeadE).append(trE);
                /*
                trE = document.createElement("tr");
                var tdE = document.createElement("td");
                    $(tdE).attr("colspan", "5");
                    $(trE).append(tdE);
                    $(tFootE).append(trE);
                */
                //setPage(xmlDoc,tdE); 
                //setFind(xmlDoc,tdE);
            }

            var valArr = [];
            var trE = document.createElement("tr");
            for (i = 0; i < len; i++) {

                var tdE = document.createElement("td");
                var txt = document.createTextNode($($(this).children()[i]).text());
                $(tdE).append(txt);
                $(trE).append(tdE);

                valArr[i] = $($(this).children()[i]).text();
            }

            $(tBodyE).append(trE);

            $(trE).bind("click", { dbpath: dbpath, code: code, colarr: colArr, valarr: valArr, self: self }, self.onItemDbfileRecordClick);
            $(trE).attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        });

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "5");
        $(trE).append(tdE);
        $(tFootE).append(trE);

        this.setDbFilePage(xmlDoc, arg, tdE);

        $('#tablerecordlist').append($temp);
        //alert(arg.boardid);
        return $temp;
    }

    onItemDbfileRecordClick(e) {

        var colarr = e.data.colarr;
        var valarr = e.data.valarr;
        //alert(colarr);
        $('#dbfileRecordModal').remove();
        var $modal = $('<div id="dbfileRecordModal" class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">');
        var $modalin = $('<div class="modal-dialog modal-xl">');
        var $modalcontent = $('<div class="modal-content">');
        var $modalhead = $('<div class="modal-header">');
        var $modaltitle = $('<h5 class="modal-title" id="exampleModalLabel">New Recorde</h5>');
        $modalhead.append($modaltitle);

        var $modalbody = $('<div class="modal-body">');
        var $form = $("<form id='finddbform' class='form-inline'>");
        $modalbody.append($form);

        var $modalfooter = $('<div class="modal-footer">');
        var $footerbtn = $('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
        var $footerbtn2 = $('<button type="button" class="btn btn-primary">Send message</button>');
        $footerbtn2.bind("click", { type: "delete", dbpath: e.data.dbpath, code: e.data.code, formid: "#writepostdbform" }, onPostDbFileCallAjax);
        $modalfooter.append($footerbtn).append($footerbtn2)


        $modalcontent.append($modalhead).append($modalbody).append($modalfooter);
        $modalin.append($modalcontent);
        $modal.append($modalin);

        var len = colarr.length;
        for (var i = 0; i < len; i++) {

            //var arr = valarr[i].trim().split(' ');
            //var arr = colarr[i].trim().split(' ');
            var $formgroup = $('<div class="form-group">');
            var $label = $('<label for="recipient-name" class="col-form-label">').text(colarr[i]);
            var $input = $('<input type="text" class="form-control" >').attr("name", colarr[i]).attr("id", colarr[i]).val(valarr[i]);
            $formgroup.append($label).append($input);
            $form.append($formgroup);
            //alert(colarr[i] + "::" + arr);
        }
        //$form.append("aaaaaaaaaaaaaaa");
        $('body').append($modal);
        $('#dbfileRecordModal').modal('show');
        //alert(colarr);
    }

    setDbFilePage(xmlDoc, arg, tFootE) {

        var dbpath = $(xmlDoc).find('Msg').attr('dbpath');
        var brdid = $(xmlDoc).find('Msg').attr('brdid');
        var boardtype = $(xmlDoc).find('Msg').attr('boardtype');
        var code = $(xmlDoc).find('Msg').attr('code');
        var title = $(xmlDoc).find('Msg').attr('title');

        var page = parseInt($(xmlDoc).find('Msg').attr('page'));
        var page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        var total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        var recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        var page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        var title = $(xmlDoc).find('Msg').attr('title');

        var totalpage = Math.ceil(total_record / page_num);
        var totalblock = Math.ceil(totalpage / page_block);
        var block = Math.ceil(page / page_block);  //현재블록

        var firstpage = (block - 1) * page_block;
        var lastpage = block * page_block;
        if (totalblock <= block)
            lastpage = totalpage;

        //var len = parseInt(block) + 2;
        var len = parseInt(lastpage - firstpage) + 2;

        //alert("totalpage==" + totalpage + "totalblock==" + totalblock + "block ==" + block  + "total_record==" + total_record + "page==" + page);

        // console.log(this.total_record); console.log(this.pagenum); console.log( parseInt(this.recordnum));
        for (var i = 0; i < len; i++) {
            var $buttonE = $("<input type='button' class='btn  btn-default'>");
            $buttonE.attr("id", "p" + i).attr("float", "left");
            var tnum = firstpage + i;
            if (i == 0) {
                $buttonE.val('<');
                if (block > 1) {
                    $buttonE.removeAttr('disabled');
                }
                else {
                    $buttonE.attr('disabled', 'disabled');
                }
            }
            else if (i == len - 1) {
                $buttonE.val('>');
                if (block < totalblock) {
                    $buttonE.removeAttr('disabled');
                }
                else {
                    $buttonE.attr('disabled', 'disabled');
                }
            }
            else
                $buttonE.val(tnum);

            if (page == tnum) {
                // this["p"+dirNum].visible = true;
                $buttonE.attr('disabled', 'disabled');
            }
            $buttonE.bind("click", { dbpath: dbpath, code: code, boardid: arg.boardid, page: tnum, self: this }, this.onItemDbFilePageClick);
            //$buttonE.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
            $(tFootE).append($buttonE);
            //alert($(tFootE).html());
        }
        /**
        if (block > 1) {
            $('#p0').removeAttr('disabled');
        }
        else {
            $('#p0').attr('disabled', 'disabled');
        }
    
        var directpage;

        var dirNum = 1;
        for (directpage = firstpage + 1; directpage <= lastpage; directpage++) {
            if (page == directpage) {
                // this["p"+dirNum].visible = true;
                $('#p' + dirNum).attr('disabled', 'disabled');
            }
            else {
                // this["p"+dirNum].visible = true;
                $('#p' + dirNum).removeAttr('disabled');
                //this["p"+dirNum].includeInLayout=true;                 
            }
            dirNum++;
        }
    
        for(var i = dirNum; i <= 10; i++)
        {
                  this["p"+i].visible = false;
                  this["p"+i].includeInLayout=false;
        }
     
        if (block < totalblock) {
            $('#p' + (len - 1)).removeAttr('disabled');
        }
        else {
            $('#p' + (len - 1)).attr('disabled', 'disabled');
        }
        ***/
        //var buttonE = document.createElement("input");
        var coltypeArr = [];
        $(xmlDoc).find('Columns').each(function (index) {
            var sql = $(this).find('sql').text();
            var arr = sql.match(/^\s*CREATE\s+TABLE\s+([_0-9a-z-A-Z]+)\s*\((.*)\)\s*$/i);

            coltypeArr = arr[2].split(',');
            //alert(coltypeArr[0]);
        });

        var $buttonE = $("<input type='button' class='btn'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;').css("float", "right");
        $buttonE.val("레코드입력");
        $buttonE.bind("click", { type: "post", dbpath: dbpath, code: code, coltypearr: coltypeArr, self: this }, this.onwriteDbFileAjax);
        $(tFootE).append($buttonE);



        /***
            $buttonE = $("<input type='text' class='form-control'>");
            $buttonE.attr("type", "text");
            $buttonE.attr("id", "txt");
            $buttonE.attr("name", "radio");
            $buttonE.css("float", "right");
            //$buttonE.val(i);
            //$buttonE.bind("click", {find:"key", uid:"uid"}, onItemFindClick);
            $(tFootE).append($buttonE);
        ***/

        this.setDbFileFind(xmlDoc, arg, tFootE);
    }

    setDbFileFind(xmlDoc, arg, tFootE) {

        var dbpath = $(xmlDoc).find('Msg').attr('dbpath');
        var brdid = $(xmlDoc).find('Msg').attr('brdid');
        var boardtype = $(xmlDoc).find('Msg').attr('boardtype');
        var code = $(xmlDoc).find('Msg').attr('code');
        var title = $(xmlDoc).find('Msg').attr('title');

        var page = parseInt($(xmlDoc).find('Msg').attr('page'));
        var page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        var total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        var recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        var page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        var title = $(xmlDoc).find('Msg').attr('title');

        var $clearE = $("<div class='clearfix'></div>");
        $(tFootE).append($clearE);

        var $form = $("<form id='finddbform' class='form-inline'>");

        var $keyfieldE = $('<select name="keyfieldsel" id="keyfieldsel">');
        $form.append($keyfieldE);
        $(tFootE).append($form);
        $("#keyfieldsel option").remove();
        var bTrue = true;
        $(xmlDoc).find('Records').each(function (index) {

            var i = 0;
            var len = $(this).children().length;
            if (bTrue) {
                for (i = 0; i < len; i++) {

                    var thE = document.createElement("th");
                    var txt = document.createTextNode($(this).children()[i].tagName);
                    $keyfieldE.append('<option value="' + $(this).children()[i].tagName + '">' + $(this).children()[i].tagName + '</option>');
                }
            }
            bTrue = false;
        });

        var $keyE = $("<input type='text' name='key' value=''>");
        $form.append($keyE);

        var $buttonE = $("<input type='button' class='btn'>");
        $buttonE.attr("type", "button");
        $buttonE.attr("id", "find");
        $buttonE.attr("name", "radio");
        $buttonE.css("float", "right");
        $buttonE.val("필드검색");
        $buttonE.bind("click", { dbpath: dbpath, code: code, page: page, self: this }, this.onItemDbFileFindClick);
        $buttonE.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $form.append($buttonE);


        var $clearE = $("<div class='clearfix'></div>");
        $(tFootE).append($clearE);

        var $form = $("<form id='findwhereform' class='form-inline'>");

        var $keyfieldE = $('<label for="levelchk" class="control-label">').text("select * from " + code + " where ");
        $form.append($keyfieldE);
        $(tFootE).append($form);

        $keyE = $("<input type='text' name='where' value=''>");
        $form.append($keyE);

        var $buttonE = $("<input type='button' class='btn'>");
        $buttonE.attr("type", "button");
        $buttonE.attr("id", "find");
        $buttonE.attr("name", "radio");
        $buttonE.css("float", "right");
        $buttonE.val("where검색");
        $buttonE.bind("click", { dbpath: dbpath, code: code, page: page, self: this }, this.onItemDbWhereFindClick);
        $buttonE.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $form.append($buttonE);
    }

    onItemDbFilePageClick(e) {
        var str = "/recordlist.adm?code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&page=" + e.data.page + "&utf8=ok&";
        //alert(str);
        var arg = { path: str, type: "tablerecordlist", boardid: "#recordlist" };
        e.data.self.startDbFileRequest(arg);

    }

    onItemDbFileFindClick(e) {
        var keyfield = $("#keyfieldsel option:selected").text();
        var key = $("#finddbform input[name=key]").val();
        if (keyfield == "subject" || keyfield == "subject")
            key = Base64.encode(key);
        //alert("keyfield== " + keyfield + "key==" + key);
        //return;
        var str = "/recordlist.adm?code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&page=" + e.data.page + "&keyfield=" + keyfield + "&key=" + key + "&utf8=ok&";
        //alert(str);
        var arg = { path: str, type: "tablerecordlist", boardid: "#recordlist" };
        e.data.self.startDbFileRequest(arg);

    }

    onItemDbWhereFindClick(e) {

        var where = $("#findwhereform input[name=where]").val();

        //alert("keyfield== " + keyfield + "key==" + key);
        //return;
        var str = "/recordlist.adm?code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&page=" + e.data.page + "&where=" + where + "&utf8=ok&";
        //alert(str);
        var arg = { path: str, type: "tablerecordlist", boardid: "#recordlist" };
        e.data.self.startDbFileRequest(arg);

    }

    onwriteDbFileAjax(e) {
        //alert(e.data.dbpath);	
        $('#writeRecordModal').remove();
        var $modal = $('<div id="writeRecordModal" class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">');
        var $modalin = $('<div class="modal-dialog modal-xl">');
        var $modalcontent = $('<div class="modal-content">');
        var $modalhead = $('<div class="modal-header">');
        var $modaltitle = $('<h5 class="modal-title" id="exampleModalLabel">New Recorde</h5>');
        $modalhead.append($modaltitle);

        var $modalbody = $('<div class="modal-body">');
        var $form = $("<form id='writepostdbform' class='form-inline'>");
        $modalbody.append($form);

        var $modalfooter = $('<div class="modal-footer">');
        var $footerbtn = $('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');
        var $footerbtn2 = $('<button type="button" class="btn btn-primary">Send message</button>');
        $footerbtn2.bind("click", { type: "post", dbpath: e.data.dbpath, code: e.data.code, formid: "#writepostdbform" }, onPostDbFileCallAjax);
        //$footerbtn2.attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');
        $modalfooter.append($footerbtn).append($footerbtn2)


        $modalcontent.append($modalhead).append($modalbody).append($modalfooter);
        $modalin.append($modalcontent);
        $modal.append($modalin);

        var j = 0;
        var colarr = e.data.coltypearr;
        var len = colarr.length;
        var tempArr = [];
        for (var i = 0; i < len; i++) {
            //var col = trim(colarr[i]);
            var arr = colarr[i].trim().split(' ');
            var $formgroup = $('<div class="form-group">');
            var $label = $('<label for="recipient-name" class="col-form-label">').text(colarr[i]);
            var $input = $('<input type="text" class="form-control" >').attr("name", arr[0]).attr("id", arr[0]).attr("placeholder", arr[0]);
            $formgroup.append($label).append($input);
            $form.append($formgroup);

            var auto = colarr[i].toLowerCase();
            var index = auto.indexOf("autoincrement");
            if (index != -1)
                continue;
            tempArr[j] = arr[0];
            j++;
        }

        var $input = $('<input type="hidden" name="columns">').val(tempArr);
        $form.append($input);
        //$form.append("aaaaaaaaaaaaaaa");
        $('body').append($modal);
        $('#writeRecordModal').modal('show');
        //alert(colarr);
    }

    onPostDbFileCallAjax(e) {
        //alert(e);
        var formid = e.data.formid;
        if (!formid)
            alert('폼아이디가 설정되지않았습니다');

        var type = e.data.type;
        var logformid = e.data.logformid;

        var str = "/recordlist.adm?code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&page=" + e.data.page + "&utf8=ok&";

        var arg = { path: str, type: "tablerecordlist", boardid: "#recordlist" };
        //alert(type + "==type== e.data.type cc== " + e.data.type);
        if (type == "post") {
            str = "/recordlist.adm?code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&brdid=" + e.data.brdid + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&utf8=ok&";

        } else if (type == "modify") {
            str = "/recordlist.adm?code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&brdid=" + e.data.brdid + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&utf8=ok&";
            //alert(type + "==type== e.data.type == " + e.data.type);
        } else if (type == "delete") {
            if (!confirm("글을 삭제합니다 ")) {
                return;
            }
            str = "/recordlist.adm?code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&brdid=" + e.data.brdid + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&utf8=ok&";
        }
        var formData;
        //alert("postBoardCallAjax str==" + str);
        if (type == "post" || type == "modify") {
            //alert("formid==222222" + formid);
            formData = $(formid).serializeArray();

        }

        //alert('$(e.data.formid + " input[name=comment]").val(b64)' + $(e.data.formid + " input[name=comment]").val())
        $.ajax({
            url: str,
            async: false,
            type: "POST",
            // if(e.type != "open")
            data: formData,
            success: function (data) {
                // 통신이 성공적으로 이루어졌을 때 이 함수를 타게 된다.
                //alert("data" + data);
                var xmlDoc = $.parseXML(data);

                var err = $(xmlDoc).find('Msg').attr('error');
                if (err != "ok") {
                    alert("error=" + err);
                    return;
                }
                makeTableRecordList(xmlDoc, arg);

            },
            complete: function (data) {
                // 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.

            },
            error: function (xhr, status, error) {
                alert("에러발생");
            },
            cache: false,
        });

    }

    sendFile(file, self) {

        //var upurl = "filelist.file?code=" + self.arg.code + "&filetype=upload&dbpath=";
        var upurl = self.arg.path;
        console.log('file=', file);
        var formData = new FormData();
        formData.append('file', file);

        console.log('formData=', formData, 'upurl=', upurl);
        $.ajax({
            url: upurl,
            async: false,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            success: function (data) {
                //alert(data);
                var xmlDoc = $.parseXML(data);
                //alert("data: " + data);
                var err = $(xmlDoc).find('Msg').attr('error');
                if (err != "ok") {
                    alert(err);
                    return;
                }
                self.makeFileList(xmlDoc, self.arg);
            },
            complete: function (data) {
                // 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.

            },
            error: function (xhr, status, error) {
                alert("에러발생");
            },
            cache: false,
        });
    }
}

class FileController extends DbFileAjaxBase {

    constructor(renderinfo) {
        super(renderinfo);

        this.type = renderinfo.type;
        this.path = renderinfo.path;
        this.selectedPath = null;
        //alert("da-boardconfig.html previewBtn str=" + str);
        //this.renderController();
    }

    renderController(elem) {
        this.fileList(this.path, elem);
    }

    makeFileList(xmlDoc, arg) {

        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }

        $(arg.elem).empty();

        var code = $(xmlDoc).find('Msg').attr('code');
        var filepath = $(xmlDoc).find('Msg').attr('filepath');

        var $temp = $('<div>');

        var $card = $('<div class="card card-primary" style="">');
        var $cardHead = $('<div class="card-header">');
        var $cardBody = $('<div class="card-body" style="height:300px;overflow-y:auto">');
        var $cardFooter = $('<div class="card-footer clearfix no-border">');
        $card.append($cardHead).append($cardBody).append($cardFooter);
        $temp.append($card);

        var $cardHeadLeft = $('<div >');
        var $cardHeadRight = $('<div class="card-tools pull-right">');

        $cardHead.append($cardHeadLeft).append($cardHeadRight);


        //console.log("$(xmlDoc).find('Msg').html()=" + $(xmlDoc).find('Msg').html());
        if (filepath) {

            var $a = $('<nav aria-label="breadcrumb">');
            var $b = $('<ol class="breadcrumb">');
            $a.append($b);
            $cardHeadLeft.append($a);
            var $li = $('<li class="breadcrumb-item">').append("H");
            $li.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: "/" }, this.onItemFileClick);
            $b.append($li);

            var arr = filepath.split('/');
            var path = "";
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == "")
                    continue;
                path += arr[i];
                if (i != arr.length - 1)
                    path += '/';

                var $li = $('<li class="breadcrumb-item">').append(arr[i]);
                $li.bind("click", { type: "d", code: code, self: this, arg: arg, name: "", path: path }, this.onItemFileClick);
                $b.append($li);
            }
            if (filepath.startsWith('//'))
                filepath = filepath.substring(1);
        } else {
            var $a = $('<nav aria-label="breadcrumb">');
            var $b = $('<ol class="breadcrumb">');
            $a.append($b);
            $cardHeadLeft.append($a);
            var $li = $('<li class="breadcrumb-item">').append("H");
            $b.append($li);
        }

        var $cardFooterDiv = $('<div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">');
        var $cardFooterLeft = $('<div class="btn-group" role="group" aria-label="First group">');
        var $cardFooterRight = $('<div class="btn-group" role="group" aria-label="First group">');
        $cardFooterDiv.append($cardFooterLeft).append($cardFooterRight);
        $cardFooter.append($cardFooterDiv);


        if (arg.renderinfo && arg.renderinfo.rendertype === "table") {
            var tableE = document.createElement("table");
            var tHeadE = document.createElement("thead");
            var tFootE = document.createElement("tfoot");
            var tBodyE = document.createElement("tbody");
            $(tableE).append(tHeadE).append(tFootE).append(tBodyE);
            $(tableE).addClass("table no-margin");

            $cardBody.append(tableE);

            var trE = $("<tr>");

            var thE1 = $("<th style='width: 5%'>").text("이름");
            var thE2 = $("<th style='width: 60%'>").text("사이즈");
            var thE3 = $("<th style='width: 10%'>").text("경로");

            $(trE).append(thE1).append(thE2).append(thE3);

            $(tHeadE).append(trE);
        } else {
            var listE = $('<div class="list-group" role="tablist">');

            //$(arg.boardid).append(thumbnailE);
            $cardBody.append(listE);
        }


        var self = this;
        var bTrue = true;
        $(xmlDoc).find('Records').each(function (index) {

            var a = $(this).find('filelist').text();

            var b = a.split(';');
            //console.log('a.split();=' + a.split(';').length);
            for (var i = 0; i < b.length; i++) {
                if (b[i].length < 1) continue;

                var c = b[i].split(',');

                if (code == 'db' && c[0] == "f" && !c[1].endsWith('dadb'))
                    continue;

                var $icon = null;
                if (arg.renderinfo && arg.renderinfo.rendertype === "table") {
                    var $trE = $('<tr>');
                    var $thE = $('<td>');
                    //var txt = document.createTextNode(c[1]);
                    if (c[0] == "d") {
                        $icon = $('<i class="fa fa-fw fa-folder"></i>');
                    } else if (c[0] == "f") {
                        $icon = $('<i class="fa fa-fw  fa-file-text-o"></i>');
                    } else if (c[0] == "dr") {
                        $icon = $('<i class="fa fa-fw  fa-home"></i>');
                    }

                    $thE.append($icon);
                    $trE.append($thE);

                    //alert($trE.html());

                    $thE = $('<td>');
                    //var txt = document.createTextNode(c[1]);
                    //$icon = $('<i class="fa fa-fw fa-rub"></i>');
                    $thE.text(c[1]);

                    //$(thE).append(txt);
                    $trE.append($thE);
                    $thE.attr('code', code);
                    $thE.attr('filetype', c[0]);
                    $thE.attr('name', c[1]);
                    $thE.attr('path', filepath);
                    $thE.addClass('filepopupmenu');

                    $thE = $('<td>');
                    //var txt = document.createTextNode(c[2]);
                    $thE.text(c[2]);
                    $trE.append($thE);

                    $thE = $('<td>');
                    //var txt = document.createTextNode(c[3]);
                    $thE.text(c[3]);
                    $trE.append($thE);
                    // alert($thE.html());
                    $(tBodyE).append($trE);
                    //alert($thE.html());
                    //$(trE).bind("click", { type: c[0], name: c[1], length: c[2], path: c[3] }, onItemFileClick);
                    $trE.bind("click dblclick", { type: c[0], name: c[1], length: c[2], path: filepath, self: self, arg: arg, code: code }, self.onItemFileClick);
                    //$(trE).bind("dblclick", { type: c[0], name: c[1], length: c[2], path: filepath }, onItemFileDblClick);
                    $trE.attr("mouseover", "hand");
                    if (c[0] == "f") {
                        $trE.bind("click dblclick", { type: 'fileclick', name: c[1], length: c[2], path: filepath, self: self, arg: arg, code: code }, this.eventHandler);
                    }
                } else {

                    var str = c[1] + "(" + c[2] + ")";
                    var itemE = $('<a class="list-group-item list-group-item-action filepopupmenu" data-toggle="list" role="tab" aria-controls="home">');

                    itemE.bind("click dblclick", { type: c[0], name: c[1], length: c[2], path: filepath, self: self, arg: arg, code: code }, self.onItemFileClick);
                    itemE.attr("mouseover", "hand");

                    if (c[0] == "d") {
                        $icon = $('<i class="fa fa-fw fa-folder"></i>');
                        itemE.append($icon).append(str);
                    } else if (c[0] == "f") {
                        var ext = c[1].split('.');

                        if (arg.renderinfo && arg.renderinfo.filter === "image") {
                            if (ext[1] == 'jpg' || ext[1] == 'jpeg' || ext[1] == 'png' || ext[1] == 'gif' || ext[1] == 'svg') {
                                $icon = $(`<img src="/${filepath}/${c[1]}" alt="" width="100" >`);
                                itemE.append($icon).append(str);

                            }
                        } else if (arg.renderinfo && arg.renderinfo.filter === "audio") {
                            if (ext[1] == 'mp3' || ext[1] == 'mp4' || ext[1] == 'wav' || ext[1] == 'ogg' || ext[1] == 'wma' || ext[1] == 'mid' || ext[1] == 'midi') {
                                $icon = $('<i class="fa fa-fw fa-music"></i>');
                                itemE.append($icon).append(str);
                            }
                        } else if (arg.renderinfo && arg.renderinfo.filter === "video") {
                            if (ext[1] == 'mp4' || ext[1] == 'mpg' || ext[1] == 'mpeg' || ext[1] == 'webm' || ext[1] == 'ogv' || ext[1] == 'avi' || ext[1] == 'wmv') {
                                $icon = $('<i class="fa fa-fw fa-film"></i>');
                                itemE.append($icon).append(str);
                            }
                        } else if (arg.renderinfo && arg.renderinfo.filter === "html") {
                            if (ext[1] == 'html' || ext[1] == 'htm') {
                                $icon = $('<i class="fa fa-fw fa-html5"></i>');
                                itemE.append($icon).append(str);
                            }
                        } else {
                            $icon = $('<i class="fa fa-fw  fa-file-text-o"></i>');
                            itemE.append($icon).append(str);
                        }

                        itemE.bind("click dblclick", { type: 'fileclick', name: c[1], length: c[2], path: filepath, self: self, arg: arg, code: code }, self.eventHandler);
                    } else if (c[0] == "dr") {
                        $icon = $('<i class="fa fa-fw  fa-home"></i>');
                        itemE.append($icon).append(str);
                    }
                    //console.log(`eventhandle c[0]= ${c[0]} c[1]=${c[1]} self.eventHandler=${self.eventHandler}`);
                    //$(arg.boardid).append(thumbnailE);
                    listE.append(itemE);
                }
            }
        });
        //console.log('arg.boardid==' + arg.boardid);

        $(arg.elem).append($temp);

        if (arg.renderinfo && arg.renderinfo.returntype === "return") {
            var $divE = $('<div class="alert">');

            var $buttonE = $("<button type='button' class='btn btn-info'>리턴</button>");
            $buttonE.bind("click", { type: "return", code: code, self: this, arg: arg, name: "", path: filepath }, this.onItemReturnClick);
            $divE.append($buttonE);

            $(arg.elem).append($divE);
        } else if (arg.renderinfo && arg.renderinfo.returntype === "fileopen") {
            var $divE = $('<div class="alert">');

            var $buttonE = $("<button type='button' class='btn btn-info'>파일열기</button>");
            $buttonE.bind("click", { type: "fileopen", code: code, self: this, arg: arg, name: "", path: filepath }, this.onItemFileopenClick);
            $divE.append($buttonE);

            $(arg.elem).append($divE);
        }

        return $temp;
    }

    onItemReturnClick(e) {
        var self = e.data.self;
        var arg = e.data.arg;
        arg.$parent.getReturnValue(self.arg.renderinfo.filter, self.selectedPath);
        console.log(`self.arg.renderinfo.filter===${self.arg.renderinfo.filter}`);
        console.log(`self.selectedPath====${self.selectedPath}`);
    }
    onItemFileopenClick(e) {
        var self = e.data.self;
        var str = "/filelist.file?code=" + self.code + "&filetype=open&filename=" + self.name + "&filepath=" + self.path + "&utf8=ok&";
        var arg = { path: str, type: "fileopen", boardid: "#filelist" };
        self.startDbFileRequest(arg);
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var self = e.data.self;
        var type = e.data.type;

        var url = `${e.data.path}/${e.data.name}`;
        if (!url.startsWith('/'))
            url = '/' + url;
        if (url.startsWith('//'))
            url = url.substring(1);

        //url = window.location.origin + url;
        self.selectedPath = url;
        self.name = e.data.name;
        self.path = e.data.path;
        self.code = e.data.code;

        if (arg.renderinfo && arg.renderinfo.returntype === "return" || arg.renderinfo.returntype === "fileopen") {
            return;
        }
        //console.log(`eventhandle type= ${type} e.data.name=${e.data.name} e.data.path=${e.data.path}`);
        if (type == 'fileclick') {
            //location.replace(`${e.data.path}/${e.data.name}`);
            //window.history.go(-1);
            //location.href = `http://daum.net`;
            var content = 'file eventHandler open url innerHTML=' + url;
            var textarea_str = $("#textarea").val();

            textarea_str = textarea_str + content;
            var el = document.getElementById("textarea");
            if (el)
                el.innerHTML = textarea_str;
            //$("#textarea").html(textarea_str);
            //alert(url);
            window.location.assign(url);
            //location.href = url;
        }
    }
}

class BoardAjaxBase {

    constructor() {
        this.xmlHttp;
    }

    changeSerialize = function (values, k, v) {
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

    includeHTML(ht) {
        //alert("abc");
        var arg = null;
        var z, i, elmnt, file, xhttp;

        z = document.getElementsByTagName("da");

        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            file = elmnt.getAttribute("include");
            if (file) {
                var dbpath = elmnt.getAttribute("dbpath");
                var code = elmnt.getAttribute("code");
                var nohtml = elmnt.getAttribute("nohtml");

                var type = elmnt.getAttribute("type");
                if (type === "boardlist" || type === "grouplist" || type === "shoplist" || type === "polllist" || type === "viewbody"
                    || type === "pollview" || type === "keyvalue" || type === "erplist" || type === "selflist") {

                    var boardid = elmnt.getAttribute("id");
                    var kcode = elmnt.getAttribute("kcode");
                    var typename = elmnt.getAttribute("typename");
                    var brdid = elmnt.getAttribute("brdid");
                    var fid = elmnt.getAttribute("fid");
                    var uid = elmnt.getAttribute("uid");
                    var filepath = elmnt.getAttribute("filepath");
                    var boardType = elmnt.getAttribute("boardType");
                    var rendertype = elmnt.getAttribute("rendertype");
                    var renderstyle = elmnt.getAttribute("renderstyle");
                    var cls = elmnt.getAttribute("cls");

                    var url = file + "&type=" + type + "&kcode=" + kcode + "&typename=" + typename + "&code=" + code + "&dbpath=" + dbpath + "&brdid=" + brdid + "&fid=" + fid + "&uid=" + uid + "&utf8=ok&";
                    //console.log("includeHTML url==" + url);
                    //var str = "/grouplist.board?code=board&dbpath=" + dbpath + "&utf8=ok&";
                    //var arg = { path: url, renderType: "table", type: "grouplist", boardid: "boardid" };
                    arg = { path: url, type: type, code: code, kcode: kcode, rendertype: rendertype, renderstyle: renderstyle, cls: cls, boardid: "#" + boardid };
                    file = url;

                    if (type === "summernote_form") {
                        arg.dbpath = dbpath; arg.code = code;
                        $(elmnt).append(createBoardWriteBox(arg));
                        summernoteSetting("");
                        continue;
                    }
                }

                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            //alert('include xhttp.onreadystatechange' + this.responseText);
                            //console.log("includeHTML this.responseText===" + this.responseText);
                            if (arg) {
                                var xmlDoc = $.parseXML(this.responseText);
                                //console.log("includeHTML url==" + url);
                                if (arg.type === "boardlist") {
                                    //alert(arg.type + "arg");
                                    $(elmnt).append(this.makeBoardList(xmlDoc, arg));
                                }
                                else if (arg.type === "grouplist")
                                    $(elmnt).append(this.makeGroupBoardList(xmlDoc, arg));
                                else if (arg.type === "viewbody")
                                    $(elmnt).append(this.makeViewBody(xmlDoc, arg));
                                else if (arg.type === "shoplist")
                                    $(elmnt).append(this.makeShopList(xmlDoc, arg));
                                else if (arg.type === "polllist")
                                    $(elmnt).append(this.makePollList(xmlDoc, arg));
                                else if (arg.type === "pollview")
                                    $(elmnt).append(this.makePollView(xmlDoc, arg));
                                else if (arg.type === "keyvalue")
                                    $(elmnt).append(renderKeyValue(this.responseText, arg));
                                else if (arg.type === "selflist")
                                    $(elmnt).append(this.makeSelf(xmlDoc, arg));
                                else if (arg.type === "erplist") {
                                    if (arg.code === "company")
                                        $(elmnt).append(this.makeCustomerList(xmlDoc, arg));
                                    else if (arg.code === "employee")
                                        $(elmnt).append(this.makeEmployeeList(xmlDoc, arg));
                                }

                            }
                            else {
                                //var xmlDoc = $.parseXML(this.responseText);
                                //elmnt.innerHTML = this.responseText;
                                //$(elmnt).html(this.responseText);
                                $(elmnt).append(this.responseText);
                                //alert("elmnt include");
                            }
                        }
                        if (this.status === 404) {
                            elmnt.innerHTML = "Page not found.";
                        }
                        elmnt.removeAttribute("include");
                        this.includeHTML(ht);
                    }
                };
                xhttp.open("GET", file + ((/\?/).test(file) ? "&" : "?") + (new Date()).getTime(), true);
                xhttp.send();
                return;

            } else {
                console.log('include');
            }

            //alert('abc');
        }
        //if (cb) cb();
    };

    postAjax(arg) {

        var arg3 = arg;
        var formData = arg.formData;
        var url = arg.path + ((/\?/).test(arg.path) ? "&" : "?") + (new Date()).getTime();
        console.log('postAjax url====' + url + 'arg.type==' + arg.type);
        $.ajax({
            url: url,
            async: false,
            type: "POST",
            // if(e.type != "open")
            data: formData,
            success: function (data) {
                // 통신이 성공적으로 이루어졌을 때 이 함수를 타게 된다.
                //console.log("data" + data);
                var xmlDoc = $.parseXML(data);
                var err = $(xmlDoc).find('Msg').attr('error');
                //console.log(`postAjax err====${err}`);
                if (err == null || err == undefined)
                    err = $(xmlDoc).find('ViewMsg').attr('error');
                if (err != null && err != "ok") {
                    alert("error=" + err);
                    return;
                }
                var arg = arg3;
                var type = arg.type;
                
                if (arg.type === "boardlist") {
                    //modal.hide();
                    arg.self.makeBoardList(xmlDoc, arg);
                    //__fullscreenView.fullscreen('fullscreenwin');
                    
                }
                else if (arg.type === "boardconfig")
                    arg.self.makeBoardConfig(xmlDoc, arg);
                else if (arg.type === "grouplist")
                    arg.self.makeGroupBoardList(xmlDoc, arg);
                else if (arg.type === "tableboardlist")
                    arg.self.makeTableBoardList(xmlDoc, arg);
                else if (arg.type === "viewbody")
                    arg.self.makeViewBody(xmlDoc, arg);
                else if (arg.type === "homeconfig")
                    arg.self.makeHomeConfig(xmlDoc, arg);
                else if (arg.type === "polllist")
                    arg.self.makePollList(xmlDoc, arg);
                else if (arg.type === "pollview")
                    arg.self.makePollView(xmlDoc, arg);
                else if (arg.type === "shoplist")
                    arg.self.makeShopList(xmlDoc, arg);
                else if (arg.type === "keyvalue")
                    arg.self.makeKeyValue(xmlDoc, arg);
                else if (arg.type === "selflist")
                    arg.self.makeSelf(xmlDoc, arg);
                else if (arg.type === "erpview")
                    arg.self.makeErpViewBody(xmlDoc, arg);
                else if (arg.type === "erplist") {
                    arg.self.makeErp(xmlDoc, arg);
                    //__modal.hide();
                }
                else if (arg.type === "jjocjylist")
                    arg.self.jjocjyList(xmlDoc, arg);
                else if (arg.type === "login") {
                    return history.go(0);
                    console.log("postAjax(arg)  this.loginView:" + this.loginView);
                    if (this.loginView)
                        this.loginView = new LoginView();
                    this.loginView.createLoginView(info, arg, this.eventHandler);
                }
                __modal.hide();
            },
            complete: function (data) {
                // 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.

            },
            error: function (xhr, status, error) {
                alert("에러발생");
            },
            cache: false
        });

        // prevent default posting of form
        event.preventDefault();
    };

    listAjax(arg) {
        this.startBoardRequest(arg);
    }

    startBoardRequest(arg) {
        var self = this;
        if (window.ActiveXObject) {
            this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else if (window.XMLHttpRequest) {
            this.xmlHttp = new XMLHttpRequest();
        }
        //console.log("startBoardRequest  arg.path:" + arg.path);
        this.xmlHttp.onreadystatechange = function () {
            //console.log("startBoardRequest  xmlHttp.onreadystatechange:" );
            self.handleStateChange(arg);
            //handleStateChange(type,boardid);
        };
        this.xmlHttp.open("GET", arg.path + ((/\?/).test(arg.path) ? "&" : "?") + (new Date()).getTime(), true); //alert("a");
        this.xmlHttp.send(null);
    }

    handleStateChange(arg) {
        //console.log("startBoardRequest  xmlHttp.onreadystatechange in:" + xmlHttp.readyState + xmlHttp.status + arg.type);
        if (this.xmlHttp.readyState === 1 || this.xmlHttp.readyState === 2 || this.xmlHttp.readyState === 3) {
            //1=open 메소드가 호출되고 send 가 불리지않은상태 2:send 는호출되었지만 status와 헤드는 도착하지않은상태 3: 데이터의일부만 받은상태
        }
        else if (this.xmlHttp.readyState === 4) { //데이터를 전부받은상태
            if (this.xmlHttp.status === 200) {
                //console.log(`this.xmlHttp.responseText=${this.xmlHttp.responseText}`);
                var xmlDoc = $.parseXML(this.xmlHttp.responseText);
                if (arg.type === "boardlist")
                    this.makeBoardList(xmlDoc, arg);
                else if (arg.type === "boardconfig")
                    this.makeBoardConfig(xmlDoc, arg);
                else if (arg.type === "grouplist")
                    this.makeGroupBoardList(xmlDoc, arg);
                else if (arg.type === "tableboardlist")
                    this.makeTableBoardList(xmlDoc, arg);
                else if (arg.type === "viewbody")
                    this.makeViewBody(xmlDoc, arg);
                else if (arg.type === "homeconfig")
                    this.makeHomeConfig(xmlDoc, arg);
                else if (arg.type === "polllist")
                    this.makePollList(xmlDoc, arg);
                else if (arg.type === "pollview")
                    this.makePollView(xmlDoc, arg);
                else if (arg.type === "shoplist")
                    this.makeShopList(xmlDoc, arg);
                else if (arg.type === "keyvalue")
                    this.makeKeyValue(xmlDoc, arg);
                else if (arg.type === "selflist")
                    this.makeSelf(xmlDoc, arg);
                else if (arg.type === "erplist")
                    this.makeErp(xmlDoc, arg);
                else if (arg.type === "erpview")
                    this.makeErpViewBody(xmlDoc, arg);
                else if (arg.type === "jjocjylist")
                    this.makeJjocjyList(xmlDoc, arg);
                else if (arg.type === "jjocjyview")
                    this.makeJjocjyList(xmlDoc, arg);
            } else {
                // 에러 출력 (404 === 페이지가 존재하지 않음)
                //console.log("startBoardRequest  xmlHttp.onreadystatechange in: error 404" + xmlHttp.readyState + xmlHttp.status + arg.type);
            }
        } else {
            //
        }
        //alert(xmlHttp.readyState + ":" + xmlHttp.status);
    };

    makeBoardList(xmlDoc, arg) {
        alert('makeBoardList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeBoardConfig(xmlDoc, arg) {
        alert('makeBoardConfig(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeGroupBoardList(xmlDoc, arg) {
        alert('makeGroupBoardList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeTableBoardList(xmlDoc, arg) {
        alert('makeTableBoardList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeViewBody(xmlDoc, arg) {
        alert('makeViewBody(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeHomeConfig(xmlDoc, arg) {
        alert('makeHomeConfig(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makePollList(xmlDoc, arg) {
        alert('makePollList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makePollView(xmlDoc, arg) {
        alert('makePollView(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeShopList(xmlDoc, arg) {
        alert('makeShopList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeKeyValue(xmlDoc, arg) {
        alert('makeKeyValue(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeErp(xmlDoc, arg) {
        alert('makeErp(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeErpViewBody(xmlDoc, arg) {
        alert('makeErpViewBody(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeSelf(xmlDoc, arg) {
        alert('makeSelf(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    makeJjocjyList(xmlDoc, arg) {
        arg.self = this;
        var info = this.getInfoJjocjyList(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};
        
        var err = $(xmlDoc).find('Msg').attr('error');
        console.log('err=', err);
        if (err != "ok") {
            alert(err);
            return;
        }
        console.log('arg.type=', arg.type);
        if (this.loginView == null)
            this.loginView = new LoginView();
        if (arg.type == 'jjocjyview')
            this.loginView.createJjocjyView(info, arg, this.eventHandler);
        else if(arg.type == 'jjocjylist')
            this.loginView.createJjocjyList(info, arg, this.eventHandler);
    }


    splitKeyvalueInfo(str) {
        var info = {};
        var params = str.split(';');
        for (var i = 0; i < params.length; i++) {
            var param = params[i].split(':');
            if (param && param[1]) {
                if (param[0] == "cls")
                    info.cls = param[1];
                else if (param[0] == "itemtype")
                    info.itemtype = param[1];
                else if (param[0] == "icon")
                    info.icon = param[1];
                else if (param[0] == "brand")
                    info.brand = param[1];
                else if (param[0] == "imgsrc")
                    info.imgsrc = param[1];
                else if (param[0] == "url")
                    info.url = param[1];
                else if (param[0] == "board")
                    info.board = param[1];
                else if (param[0] == "url")
                    info.url = param[1];
            }
        }
        return info;
    }

    //fid 집단에서 uid 를가르키는 did 값으로 정렬
    arrAlign(info, arr) {
        //console.log(`arr.length=${arr.length}  info=${info}`);
        for (var i = 0; i < arr.length; i++) {
            var uid = null, did = null;
            if (info.datuid == null || info.datuid == undefined) {
                did = info.did;
                uid = arr[i].uid;
            } else {
                did = info.datdid;
                uid = arr[i].datuid;
            }
            //console.log(`arr.length=${arr.length}  arr[i].uid=${arr[i].uid} info.datdid=${info.datdid} `);
            if (did == uid) {
                //console.log(arr[i].uid);
                arr[i].arr.push(info);
                return true;
            }
            if (this.arrAlign(info, arr[i].arr))
                return true;
        }
        return false;
    }

    arrayTreeAlign(tarr, sarr) {
        if (tarr == null || sarr == null || tarr.length <= 0)
            return;
        while (sarr.length > 0) {
            var info = sarr.shift();
            var b = this.arrAlign(info, tarr);
            if (!b)
                b = this.arrAlign(info, sarr);
            //alert(arr.length);
            if (!b)
                tarr.push(info);
        }
        return tarr;
    }

    getInfoBoardLoginfo(xmlDoc) {
        var sid = $(xmlDoc).find('DaBoard').attr('se_id');
        var semail = $(xmlDoc).find('DaBoard').attr('se_email');
        var slevel = $(xmlDoc).find('DaBoard').attr('se_level');
        var slevelpt = $(xmlDoc).find('DaBoard').attr('se_levelpt');
        var sjjocjynum = $(xmlDoc).find('DaBoard').attr('se_jjocjynum');
        //console.log('sid==' + sid);
        var loginfo = {};
        loginfo.ok = false;
        if (sid) {
            loginfo.sid = sid;
            loginfo.semail = semail;
            loginfo.slevel = slevel;
            loginfo.slevelpt = slevelpt;
            loginfo.sjjocjynum = sjjocjynum;
            loginfo.ok = true;
        } else {
            var url = unescape(location.href);
            var iValue = url.indexOf('localhost');
            if (iValue == -1) {
                iValue = url.indexOf('127.0.0.1');
                if (iValue != -1) {
                    loginfo.ok = true;
                }
            } else
                 loginfo.ok = true;
        }
        
        //loginfo.dbpath = dbpath;
        //loginfo.code = code;
        //alert("$templeft.append(createLogin(info))");
        //createLogin(loginfo);
        return loginfo;
    }

    getInfoBoardConfig(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        //console.log("getInfoBoardConfig err: " + err);
        if (err != "ok") {
            console.log('getInfoBoardConfig=', err);
            return null;
        }
        //console.log("getInfoBoardConfig err: " + err);
        //var loginfo = this.getInfoBoardLoginfo(xmlDoc);
        var arrarr = [], grouparr = [], codearr = [];
        var count = 0;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.code = $(this).find('code').text();
            info.groupid = $(this).find('groupid').text();
            info.brdid = $(this).find('brdid').text();
            info.groupname = $(this).find('groupname').text();
            info.brdname = $(this).find('brdname').text();
            info.listpt = $(this).find('listpt').text();
            info.viewpt = $(this).find('viewpt').text();
            info.writept = $(this).find('writept').text();
            info.datpt = $(this).find('datpt').text();
            info.pagerecordnum = $(this).find('pagerecordnum').text();
            info.pageblocknum = $(this).find('pageblocknum').text();
            info.brdkey = $(this).find('brdkey').text();
            info.brdorder = $(this).find('brdorder').text();
            info.bctype = $(this).find('bctype').text();
            info.uid = $(this).find('uid').text();
            info.arr = [];
            //$(trE).bind("click", { dbpath: dbpath, code: code, boardid: arg.boardid, brdid: brdid, page: page, title: title, uid: uid }, onItemRecordClick);
            //$(trE).attr('style', 'cursor:pointer;cursor: hand;background-color:#f8f8f8;');

            codearr[count] = info.code;
            //alert("arr.length===" + codeSelArr.length);

            //alert("arr.length===");
            //arrarr[arrarr.length] = info;
            
            var b = false;
            for (var i = 0; i < arrarr.length; i++) {
                if (info.groupid == arrarr[i].groupid) {
                    b = true;
                    break;
                }
            }
            arrarr.push(info);

            if (!b) {
                var ginfo = { groupid: info.groupid, groupname: info.groupname, code: info.code, arr: [] };
                grouparr.push(ginfo);
            }
            count++;
        });
        //console.log(`grouparr.length=${grouparr.length}`);
        //console.log(`arrarr.length=${arrarr.length}`);
        codearr = codearr.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []); //중복제거

        var reinfo = { codearr: codearr, grouparr: grouparr, arrarr: arrarr };
        return reinfo;
    }

    getInfoBoardList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            console.log('getInfoBoardList=', err);
            return null;
        }

        var pageinfo = {};
        pageinfo.pagetype = 'boardpage';
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);

        var loginfo = this.getInfoBoardLoginfo(xmlDoc);

        var boardconfarr = [];
        var count = 0;
        $(xmlDoc).find('boardConfRecords').each(function (index) {

            var info = {};
            info.code = $(this).attr('code');
            info.groupid = $(this).attr('groupid');
            info.brdid = $(this).attr('brdid');
            info.groupname = $(this).attr('groupname');
            info.brdname = $(this).attr('brdname');
            info.listpt = $(this).attr('listpt');
            info.viewpt = $(this).attr('viewpt');
            info.writept = $(this).attr('writept');
            info.datpt = $(this).attr('datpt');
            info.pagerecordnum = $(this).attr('pagerecordnum');
            info.pageblocknum = $(this).attr('pageblocknum');
            info.brdkey = $(this).attr('brdkey');
            info.brdorder = $(this).attr('brdorder');
            info.bctype = $(this).attr('bctype');
            info.uid = $(this).attr('uid');
            info.arr = [];
            //console.log("info.code: " + info.code + "info.bctype: " + info.bctype);
            boardconfarr.push(info);

            count++;
        });
        //console.log("boardconfarr.length: " + boardconfarr.length);

        var arrarr = [], arr = [];

        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.depth = 0;
            info.uid = $(this).find('uid').text();
            info.fid = $(this).find('fid').text();
            info.did = $(this).find('did').text();
            info.id = $(this).find('id').text();
            info.name = $(this).find('name').text();
            info.nick = $(this).find('nick').text();
            info.thumbnail = $(this).find('thumbnail').text();
            if (info.img === "")
                info.img = "/blankimage.jpg";
            info.filename = $(this).find('filename').text();
            var date = new Date($(this).find('signdate').text());
            info.signdate = date.format('yy.MM.dd hh mm');
            info.ref = $(this).find('ref').text();
            info.email = $(this).find('email').text();
            info.okp = $(this).find('okp').text();
            info.nop = $(this).find('nop').text();
            info.thread = $(this).find('thread').text();
            info.info = $(this).find('info').text();
            info.tag = $(this).find('tag').text();
            info.path = $(this).find('path').text();
            info.time = $(this).find('time').text();
            info.com = $(this).find('com').text();
            info.ip = $(this).find('ip').text();
            info.brdid = $(this).find('brdid').text();

            info.datcount = $(this).find('datcount').text();
            info.dbpath = arg.dbpath;
            info.code = arg.code;
            info.page = pageinfo.page;
            info.title = arg.title;
            //alert("decode");
            info.summary = $(this).find('summary').text();
            //info.summary = Base64.decode(summary);
            var subject = $(this).find('subject').text();
            //info.subject = Base64.decode(subject);
            info.subject = subject + "(" + info.datcount + ")";
            var comment = $(this).find('comment').text();
            //info.comment = Base64.decode(comment);
            info.comment = comment;

            if (info.did == -1 || info.did == -2) {
                arrarr[arrarr.length] = info;
            } else {
                if (info.fid != 0)
                    arr[arr.length] = info;
            }

        });
        //console.log("getInfoBoardList arrarr: " + arrarr);
        arrarr = this.arrayTreeAlign(arrarr, arr);

        var reinfo = { pageinfo: pageinfo, loginfo: loginfo, boardconfarr: boardconfarr, arrarr: arrarr };
        return reinfo;
    }

    getInfoGroupBoardList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        //alert("getArrayGroupBoardList $(xmlDoc).html(): " + $(xmlDoc).html());
        if (err != "ok") {
            console.log('getInfoGroupBoardList=', err);
            return null;
        }

        var pageinfo = {};
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);

        var loginfo = this.getInfoBoardLoginfo(xmlDoc);
        //keyvalueNameSelArr = [];
        var arrarr = [], grouparr = [];

        $(xmlDoc).find('Groups').each(function (index) {

            var item = {};
            item.type = "menu";
            item.linktype = "board";
            item.iconclass = "fa fa-bell-o";
            item.boardtype = arg.type;
            item.rendertype = arg.rendertype;
            item.renderstyle = arg.renderstyle;
            item.boardid = arg.boardid;
            item.dbpath = arg.dbpath;
            item.code = arg.code;
            item.groupid = $(this).attr("groupid");
            item.groupname = $(this).attr("groupname");
            item.brdid = $(this).attr("brdid");
            item.brdname = $(this).attr("brdname");
            item.key = $(this).attr("brdname");
            item.bctype = $(this).attr("bctype");
            item.style = $(this).attr("style");

            item.arr = [];
            //console.log("item.brdid===" + item.brdid);

            //alert("boardSetArr.length==" + boardSetArr.length);
            //arrarr[arrarr.length] = item;
            
            var b = false;
            for (var i = 0; i < arrarr.length; i++) {
                if (item.groupid == arrarr[i].groupid) {
                    b = true;
                    break;
                }
            }
            arrarr.push(item);

            if (!b) {
                //console.log(grouparr.length);
                var ginfo = { groupid: item.groupid, groupname: item.groupname, arr: [] };
                grouparr.push(ginfo);
            }
            //groupCount++;
            //console.log(`arrarr.length==${arrarr.length}`);
            //console.log(b);
            var recordCount = 0;
            $(this).find('Records').each(function (index) { //alert(xmlDoc);
                //alert("middle in");
                recordCount++;
                var info = {};
                info.depth = 0;
                info.bctype = item.bctype;
                info.uid = $(this).find('uid').text();
                info.fid = $(this).find('fid').text();
                info.did = $(this).find('did').text();
                info.id = $(this).find('id').text();
                info.name = $(this).find('name').text();
                info.nick = $(this).find('nick').text();
                info.thumbnail = $(this).find('thumbnail').text();
                if (info.img === "")
                    info.img = "/blankimage.jpg";
                info.filename = $(this).find('filename').text();
                var date = new Date($(this).find('signdate').text());
                info.signdate = date.format('yy.MM.dd hh mm');
                info.ref = $(this).find('ref').text();
                info.email = $(this).find('email').text();
                info.okp = $(this).find('okp').text();
                info.nop = $(this).find('nop').text();
                info.thread = $(this).find('thread').text();
                info.info = $(this).find('info').text();
                info.tag = $(this).find('tag').text();
                info.path = $(this).find('path').text();
                info.time = $(this).find('time').text();
                info.com = $(this).find('com').text();
                info.ip = $(this).find('ip').text();
                info.brdid = $(this).find('brdid').text();

                info.datcount = $(this).find('datcount').text();
                info.dbpath = arg.dbpath;
                info.code = arg.code;
                info.page = pageinfo.page;
                info.title = arg.title;
                //alert("decode");
                info.summary = $(this).find('summary').text();
                //info.summary = Base64.decode(summary);
                var subject = $(this).find('subject').text();
                //info.subject = Base64.decode(subject);
                info.subject = subject + "(" + info.datcount + ")";
                var comment = $(this).find('comment').text();
                //info.comment = Base64.decode(comment);
                info.comment = comment;
                //alert("info.subject=" + info.subject);
                item.arr[item.arr.length] = info;
                //article_num--;
            });

            //alert("arg.boardid::" + arg.boardid + ";;recordCount::");
        });

        var reinfo = { pageinfo: pageinfo, loginfo: loginfo, grouparr: grouparr, arrarr: arrarr };
        return reinfo;
    }

    getInfoViewBody(xmlDoc, arg) {

        var err = $(xmlDoc).find('ViewMsg').attr('error');
        //console.log("getInfoViewBody(xmlDoc, arg)err==============" + err);
        if (err != "ok") {
            console.log('getInfoViewBody=', err);
            return null;
        }
        //console.log("getInfoViewBody(xmlDoc, arg)xmlDoc==============" + xmlDoc);
        var pageinfo = {};
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);
        //console.log("getInfoViewBody(xmlDoc, arg): 1111111111111");
        var loginfo = this.getInfoBoardLoginfo(xmlDoc);
        //keyvalueNameSelArr = [];
        var arrarr = [], arr = [];
        var uid, did, fid;
        //console.log("getInfoViewBody(xmlDoc, arg):22222222222222222");
        $(xmlDoc).find('ViewRecords').each(function (index) {

            var info = {};
            info.depth = 0;
            info.uid = uid = $(this).find('uid').text();
            info.fid = fid = $(this).find('fid').text();
            info.did = did = $(this).find('did').text();
            info.id = $(this).find('id').text();
            info.name = $(this).find('name').text();
            info.nick = $(this).find('nick').text();
            info.thumbnail = $(this).find('thumbnail').text();
            if (info.img === "")
                info.img = "/blankimage.jpg";
            info.filename = $(this).find('filename').text();
            var date = new Date($(this).find('signdate').text());
            info.signdate = date.format('yy.MM.dd hh mm');
            info.ref = $(this).find('ref').text();
            info.email = $(this).find('email').text();
            var okp = $(this).find('okp').text();
            if (okp == null || okp == '')
                okp = '0';
            info.okp = okp;
            var nop = $(this).find('nop').text();
            if (nop == null || nop == '')
                nop = '0';
            info.nop = nop;
            info.thread = $(this).find('thread').text();
            info.info = $(this).find('info').text();
            info.tag = $(this).find('tag').text();
            info.path = $(this).find('path').text();
            info.time = $(this).find('time').text();
            info.com = $(this).find('com').text();
            info.ip = $(this).find('ip').text();
            info.brdid = $(this).find('brdid').text();

            info.datcount = $(this).find('datcount').text();
            info.dbpath = arg.dbpath;
            info.code = arg.code;
            info.page = pageinfo.page;
            info.title = arg.title;
            //alert("decode");
            var summary = $(this).find('summary').text();
            info.summary = Base64.decode(summary);
            var subject = $(this).find('subject').text();
            //info.subject = Base64.decode(subject);
            info.subject = subject + "(" + info.datcount + ")";
            var comment = $(this).find('comment').text();
            //info.comment = Base64.decode(comment);
            info.comment = comment;

            if (info.did == -1 || info.did == -2) {
                arrarr[arrarr.length] = info;
            } else {
                if (info.fid != 0)
                    arr[arr.length] = info;
            }
        });

        //alert(" info.uid 22 " + info.uid + ":::");
        var datarrarr = [], datarr = [];
        var b = true;
        var datinfo = {};
        var count = 0;
        $(xmlDoc).find('DatRecords').each(function (index) {
            var info = {};
            info.depth = 0;
            info.uid = uid;
            info.fid = fid;
            info.did = did;
            info.datuid = $(this).find('uid').text();
            info.datfid = $(this).find('fid').text();
            info.datdid = $(this).find('did').text();
            info.id = $(this).find('id').text();
            info.name = $(this).find('name').text();
            info.nick = $(this).find('nick').text();
            
            info.filename = $(this).find('filename').text();
            info.img = $(this).find('thumbnail').text();
            if (info.img === "")
                info.img = "/blankimage.jpg";
            
            var date = new Date($(this).find('signdate').text());
            info.signdate = date.format('yy.MM.dd hh mm');
            info.ref = $(this).find('ref').text();
            info.email = $(this).find('email').text();
            var okp = $(this).find('okp').text();
            if (okp == null || okp == '')
                okp = '0';
            info.okp = okp;
            var nop = $(this).find('nop').text();
            if (nop == null || nop == '')
                nop = '0';
            info.nop = nop;
            //console.log(`okp=${okp}  nop=${nop} `);
            info.thread = $(this).find('thread').text();
            info.info = $(this).find('info').text();
            info.tag = $(this).find('tag').text();
            info.path = $(this).find('path').text();
            info.time = $(this).find('time').text();
            info.com = $(this).find('com').text();
            info.ip = $(this).find('ip').text();

            info.brdid = $(this).find('brdid').text();

            info.datcount = $(this).find('datcount').text();
            info.dbpath = arg.dbpath;
            info.code = arg.code;
            info.page = arg.page;
            info.title = arg.title;
            //alert("decode");
            var summary = $(this).find('summary').text();
            //info.summary = Base64.decode(summary);
            info.summary = summary;
            var comment = $(this).find('comment').text();
            //info.comment = Base64.decode(comment);
            info.comment = comment;
            var subject = $(this).find('subject').text();
            //info.subject = Base64.decode(subject);
            info.subject = subject + "(" + info.datcount + ")";
            info.arr = [];

            if (info.brdid == -1) {
                datarrarr[datarrarr.length] = info;
            } else {
                datarr[datarr.length] = info;
            }

            console.log(`datarr.length=${datarr.length}datarrarr.length=${datarrarr.length}`);
            count++;
        });

        datarrarr = this.arrayTreeAlign(datarrarr, datarr);
        //console.log(`datarr.length=${datarr.length}`);
        var reinfo = { pageinfo: pageinfo, loginfo: loginfo, arrarr: arrarr, datarr: datarrarr };
        return reinfo;
    }

    getInfoPollList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            console.log('getInfoPollList=', err);
            return null;
        }

        var pageinfo = {};
        pageinfo.pagetype = 'pollpage';
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);

        var loginfo = this.getInfoBoardLoginfo(xmlDoc);
        //alert("err: " + err);
        //keyvalueNameSelArr = [];
        var arrarr = [], arr = [];
        //console.log("getInfoPollList pageinfo.total_record: " + pageinfo.total_record);
        $(xmlDoc).find('Records').each(function (index) {
            //console.log("getInfoPollList arrarr.length: " + arrarr.length);
            var info = {};
            //count++;
            info.uid = $(this).find('uid').text();
            info.fid = $(this).find('fid').text();
            info.id = $(this).find('id').text();
            info.q_num = $(this).find('q_num').text();

            info.subject = $(this).find('subject').text();
            info.memberok = $(this).find('memberok').text();
            info.statsok = $(this).find('statsok').text();
            info.q_size = $(this).find('q_size').text();

            info.q = $(this).find('q').text();
            info.v = $(this).find('v').text();

            info.sex = $(this).find('sex').text();
            info.job = $(this).find('job').text();
            info.region = $(this).find('region').text();
            info.age = $(this).find('age').text();
            info.temp = $(this).find('temp').text();
            info.starttime = $(this).find('starttime').text();
            info.endtime = $(this).find('endtime').text();
            info.signdate = $(this).find('signdate').text();
            info.job = $(this).find('job').text();

            arrarr[arrarr.length] = info;

        });
        //console.log("getInfoPollList arrarr.length: " + arrarr.length);
        if (arrarr.length > 0)
            arrarr = this.arrayTreeAlign(arrarr, arr);

        var reinfo = { pageinfo: pageinfo, loginfo: loginfo, arrarr: arrarr };
        return reinfo;
    }

    getInfoPollView(xmlDoc, arg) {
        alert('makePollView(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    getInfoShopList(xmlDoc, arg) {
        alert('makeShopList(xmlDoc, arg) 메소드를 구현해야됩니다');
    }

    getArrayKeyCode(xmlDoc, arg) {

        var arr = [];

        $(xmlDoc).find('keyCodeRecords').each(function (index) {

            var info = {};
            info.uid = $(this).find('uid').text();
            info.fid = $(this).find('fid').text();
            info.did = $(this).find('did').text();
            info.subcount = $(this).find('subcount').text();
            info.kcode = $(this).find('kcode').text();
            info.kname = $(this).find('kname').text();
            info.key = $(this).find('key').text();
            info.value = $(this).find('value').text();
            info.date = $(this).find('date').text();
            info.info = $(this).find('info').text();
            arr[arr.length] = info;
            //alert('renderKeyValue=kcode222=' + '<option value="' + info.kcode + '">' + info.kcode + '</option>');
            //$('#keyvalueSelect').append('<option value="' + info.kcode + '">' + info.kcode + '</option>');
            // alert('renderKeyValue=kcode=' + info.kcode);
        });

        return arr;
    }

    getArrayKeyName(xmlDoc, arg) {

        //alert("err: " + err);
        var arr = [];

        $(xmlDoc).find('keyNameRecords').each(function (index) {

            var info = {};
            info.uid = $(this).find('uid').text();
            info.fid = $(this).find('fid').text();
            info.did = $(this).find('did').text();
            info.subcount = $(this).find('subcount').text();
            info.kcode = $(this).find('kcode').text();
            info.kname = $(this).find('kname').text();
            info.key = $(this).find('key').text();
            info.value = $(this).find('value').text();
            info.date = $(this).find('date').text();
            info.info = $(this).find('info').text();
            arr[arr.length] = info;

        });
        //alert("getArrayKeyName arr[0].uid=: " + arr[0].uid);
        return arr;
    }

    getInfoKeyValue(xmlDoc, arg) {

        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            console.log('getInfoKeyValue=', err);
            return;
        }

        var pageinfo = {};
        pageinfo.pagetype = 'keyvaluepage';
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);

        var loginfo = this.getInfoBoardLoginfo(xmlDoc);

        var keycodearr = this.getArrayKeyCode(xmlDoc, arg);
        var keynamearr = this.getArrayKeyName(xmlDoc, arg);
        //console.log('getInfoKeyValue keynamearr=', keynamearr);
        var arrarr = [], arr = []; var b = true;

        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.uid = $(this).find('uid').text();
            info.fid = $(this).find('fid').text();
            info.did = $(this).find('did').text();
            info.subcount = $(this).find('subcount').text();
            info.kcode = $(this).find('kcode').text();
            info.kname = $(this).find('kname').text();
            info.key = $(this).find('key').text();
            info.value = $(this).find('value').text();
            //info.value = __keyvalueSplitString(info.value);
            info.date = $(this).find('date').text();
            info.info = $(this).find('info').text();
            //info.info = Base64.decode(info.info);
            //info.strinfo = self.splitKeyvalueInfo(info.info);
            info.arr = [];

            if (info.did == -1 || info.did == -2) {
                arrarr[arrarr.length] = info;
            } else {
                if (info.fid != 0)
                    arr[arr.length] = info;
            }

        });

        arrarr = this.arrayTreeAlign(arrarr, arr);

        var reinfo = { keycodearr: keycodearr, keynamearr: keynamearr, loginfo: loginfo, arrarr: arrarr };

        return reinfo;
    }

    getInfoSelf(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            console.log('getInfoSelf=', err);
            return;
        }

        var pageinfo = {};
        pageinfo.pagetype = 'page';
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);
        var article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);

        var loginfo = this.getInfoBoardLoginfo(xmlDoc);
        //alert("err: " + err);
        //keyvalueNameSelArr = [];
        var arrarr = [], arr = []; var b = true;
        if (arg.code === "schedule") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                
                info.name = $(this).find('name').text();
                info.eventurl = $(this).find('eventurl').text();
                
                info.starttime = $(this).find('starttime').text();
                info.endtime = $(this).find('endtime').text();
                info.subject = $(this).find('subject').text();
                info.comment = $(this).find('comment').text();
                info.place = $(this).find('place').text();
                info.signdate = $(this).find('signdate').text();
                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "cardpay") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //paytype: 항목 (1-현금서비스 / 2 - 물품구입) paymonth 할부기간 paystart 결제시작월
                var info = {};
                info.uid = $(this).find('uid').text();
                
                info.id = $(this).find('id').text();
                info.cardname = $(this).find('cardname').text();
                info.paytype = $(this).find('paytype').text();
                info.paymonth = $(this).find('paymonth').text();
                info.paystart = $(this).find('paystart').text();
                info.money = $(this).find('money').text();
                info.payinfo = $(this).find('payinfo').text();
                info.paydate = $(this).find('paydate').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "cardpay_set") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //delay_money 연체금액 total_money 결제금액 setstart 결제시작월 setdate 결제날자
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                info.cardname = $(this).find('cardname').text();

                info.delay_money = $(this).find('delay_money').text();
                info.total_money = $(this).find('total_money').text();
                info.setstart = $(this).find('setstart').text();
                info.setdate = $(this).find('setdate').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "cardpay_dtl") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //paynum 할부회차 paymonth 할부개월 paystart 결제시작월 paydate 결제날자
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                info.cardname = $(this).find('cardname').text();

                info.paynum = $(this).find('paynum').text();
                info.paymonth = $(this).find('paymonth').text();
                info.paystart = $(this).find('paystart').text();
                info.money = $(this).find('money').text();

                info.payinfo = $(this).find('payinfo').text();
                info.paydate = $(this).find('paydate').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "in_output") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //outputbank 출금계좌 inputbank 입금계좌 inouttype 인출타입 (지출-P/수입-I/돌림-M)
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                info.outputbank = $(this).find('outputbank').text();

                info.inputbank = $(this).find('inputbank').text();
                info.inouttype = $(this).find('inouttype').text();
                info.money = $(this).find('money').text();
                info.date = $(this).find('date').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "bank_book") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //bookname=통장명 bankname은행명 banknum계좌번호 money잔액
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                info.bookname = $(this).find('bookname').text();

                info.money = $(this).find('money').text();
                info.bankname = $(this).find('bankname').text();
                info.banknum = $(this).find('banknum').text();
                info.checks = $(this).find('checks').text();
                info.ipsave = $(this).find('ipsave').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "cash") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //잔액
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                
                info.money = $(this).find('money').text();

                sql = "create table if not exists cash(" +
                    "uid integer primary key autoincrement, id text," +
                    "money integer)";  //잔액

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "creditcard") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //settleday 결제일 bankkey 결제은행
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                info.cardname = $(this).find('cardname').text();

                info.settleday = $(this).find('settleday').text();
                info.bankkeye = $(this).find('bankkey').text();
                info.checks = $(this).find('checks').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "pay") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //payfrom 지출원  payclass 지출항목 payinfo 설명
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                info.payfrom = $(this).find('payfrom').text();

                info.money = $(this).find('money').text();
                info.payclass = $(this).find('payclass').text();
                info.payinfo = $(this).find('payinfo').text();
                info.date = $(this).find('date').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "payclass") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //cinfo 지출항목
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                info.cinfo = $(this).find('cinfo').text();

                info.checks = $(this).find('checks').text();
                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "income") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //bookkey 입금계좌 
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                info.bookkey = $(this).find('bookkey').text();

                info.money = $(this).find('money').text();
                info.incomeinfo = $(this).find('incomeinfo').text();
                info.date = $(this).find('date').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        
        var reinfo = { pageinfo: pageinfo, loginfo: loginfo, arrarr: arrarr };

        return reinfo;
    }

    getInfoErp(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        //console.log('getInfoErp=', err);
        if (err != "ok") {
            console.log('getInfoErp=', err);
            return;
        }

        var pageinfo = {};
        pageinfo.pagetype = 'erppage';
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);
        var article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);

        var loginfo = this.getInfoBoardLoginfo(xmlDoc);
        //alert("err: " + err);
        //keyvalueNameSelArr = [];
        var arrarr = [], arr = []; var b = true;
        if (arg.code === "employee") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                info.img = $(this).find('imagename').text();
                
                info.empcode = $(this).find('empcode').text();
                info.empname = $(this).find('empname').text();
                info.busu = $(this).find('busu').text();

                info.nation = $(this).find('nation').text();
                info.path = $(this).find('path').text();
                info.tag = $(this).find('tag').text();
                info.englishname = $(this).find('englishname').text();
                info.postnum = $(this).find('postnum').text();
                info.email = $(this).find('email').text();
                info.addr = $(this).find('addr').text();
                info.nop = $(this).find('nop').text();
                info.jicchak = $(this).find('jicchak').text();
                info.jicchakcode = $(this).find('jicchakcode').text();
                info.jicgub = $(this).find('jicgub').text();
                info.jicjong = $(this).find('jicjong').text();
                info.jicmugubun = $(this).find('jicmugubun').text();
                info.hobong = $(this).find('hobong').text();
                info.ibsadate = $(this).find('ibsadate').text();
                info.ibsagubun = $(this).find('ibsagubun').text();
                info.enddate = $(this).find('enddate').text();
                info.returndate = $(this).find('returndate').text();
                info.huyjikdate = $(this).find('huyjikdate').text();
                info.gbyutype = $(this).find('gbyutype').text();
                info.yungm_gb = $(this).find('yungm_gb').text();
                info.bohum_gb = $(this).find('bohum_gb').text();
                info.bohum_num = $(this).find('bohum_num').text();
                info.bankcode = $(this).find('bankcode').text();
                info.gyejoa_num = $(this).find('gyejoa_num').text();
                info.chulcard_num = $(this).find('chulcard_num').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "company") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.path = $(this).find('path').text();
                info.tag = $(this).find('tag').text();
                info.companycode = $(this).find('companycode').text();
                info.companyname = $(this).find('companyname').text();
                info.dealtype = $(this).find('dealtype').text();
                info.ceo = $(this).find('ceo').text();
                info.tel = $(this).find('tel').text();
                info.tel2 = $(this).find('tel2').text();
                info.fax = $(this).find('fax').text();
                info.postnum = $(this).find('postnum').text();
                info.addr = $(this).find('addr').text();
                info.email = $(this).find('email').text();
                info.saupjanum = $(this).find('saupjanum').text();
                info.uptae = $(this).find('uptae').text();
                info.jongmok = $(this).find('jongmok').text();
                info.danga_dg = $(this).find('danga_dg').text();
                info.memo = $(this).find('memo').text();
                info.register = $(this).find('register').text();
                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "customer") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                
                var info = {};
                info.uid = $(this).find('uid').text();
                info.customcode = $(this).find('customcode').text();
                info.name = $(this).find('name').text();
                info.dealtype = $(this).find('dealtype').text();
                info.tel = $(this).find('tel').text();
                info.tel2 = $(this).find('tel2').text();
                info.postnum = $(this).find('postnum').text();
                info.addr = $(this).find('addr').text();
                info.email = $(this).find('email').text();
                
                info.memo = $(this).find('memo').text();
                info.register = $(this).find('register').text();
                arrarr[arrarr.length] = info;

            });
        }
        else if (arg.code === "rental") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                info.name = $(this).find('name').text();

                info.goodscode = $(this).find('goodscode').text();
                info.goodsname = $(this).find('goodsname').text();
                info.rentaldate = $(this).find('rentaldate').text();
                info.receivedate = $(this).find('receivedate').text();
                info.rentalmoney = $(this).find('rentalmoney').text();
                info.rentalstate = $(this).find('rentalstate').text();
                info.magam = $(this).find('magam').text();
                info.register = $(this).find('register').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "maeib_chul") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.companycode = $(this).find('companycode').text();
                info.companyname = $(this).find('companyname').text();
                info.goodscode = $(this).find('goodscode').text();
                info.goodsname = $(this).find('goodsname').text();

                info.mtype = $(this).find('mtype').text();
                info.count = $(this).find('count').text();
                info.money = $(this).find('money').text();
                info.state = $(this).find('state').text();
                info.date = $(this).find('date').text();

                info.gyugeyg = $(this).find('gyugeyg').text();
                info.unit = $(this).find('unit').text();
                info.mcode = $(this).find('mcode').text();
                info.name = $(this).find('name').text();
                info.magam = $(this).find('magam').text();
                info.register = $(this).find('register').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "workday") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.empname = $(this).find('empname').text();
                info.date = $(this).find('date').text();

                info.chulgntime = $(this).find('chulgntime').text();
                info.toygntime = $(this).find('toygntime').text();
                info.jigak = $(this).find('jigak').text();
                info.yagn = $(this).find('yagn').text();
                info.jotyo = $(this).find('jotyo').text();
                info.yagntime = $(this).find('yagntime').text();
                info.bigo = $(this).find('bigo').text();
                info.register = $(this).find('register').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "workmonth") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                info.img = $(this).find('imagename').text();
                if (img == "")
                    img = "/blankimage.jpg";
                info.busu = $(this).find('busu').text();
                info.jicchak = $(this).find('jicchak').text();
                info.empname = $(this).find('empname').text();
                info.email = $(this).find('email').text();
                info.addr = $(this).find('addr').text();
                info.nop = $(this).find('nop').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "emppay") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.empcode = $(this).find('empcode').text();
                info.empname = $(this).find('empname').text();
                info.basicpay = $(this).find('basicpay').text();
                info.date = $(this).find('date').text();

                info.bonus = $(this).find('bonus').text();
                info.sangyugm = $(this).find('sangyugm').text();
                info.sudang1 = $(this).find('sudang1').text();
                info.sudang2 = $(this).find('sudang2').text();
                info.sudang3 = $(this).find('sudang3').text();
                info.sudang4 = $(this).find('sudang4').text();
                info.sudang5 = $(this).find('sudang5').text();
                info.sudang6 = $(this).find('sudang6').text();
                info.sudang7 = $(this).find('sudang7').text();
                info.sudang8 = $(this).find('sudang8').text();
                info.sudang9 = $(this).find('sudang9').text();
                info.sudang10 = $(this).find('sudang10').text();
                info.duty1 = $(this).find('duty1').text();
                info.duty2 = $(this).find('duty2').text();
                info.duty3 = $(this).find('duty3').text();
                info.duty4 = $(this).find('duty4').text();
                info.duty5 = $(this).find('duty5').text();
                info.duty6 = $(this).find('duty6').text();
                info.duty7 = $(this).find('duty7').text();
                info.duty8 = $(this).find('duty8').text();
                info.etc1 = $(this).find('etc1').text();
                info.etc2 = $(this).find('etc2').text();
                info.etc3 = $(this).find('etc3').text();

                info.register = $(this).find('register').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "goods") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();

                info.xycode = $(this).find('xycode').text();
                info.goodscode = $(this).find('goodscode').text();
                info.goodsname = $(this).find('goodsname').text();
                info.defaultprice = $(this).find('defaultprice').text();
                info.sellprice = $(this).find('sellprice').text();
                info.production = $(this).find('production').text();
                info.thumbnail = $(this).find('thumbnail').text();

                info.imagename = $(this).find('imagename').text();
                info.content = $(this).find('content').text();
                info.count = $(this).find('count').text();
                info.thumbnail = $(this).find('thumbnail').text();

                info.spcode = $(this).find('spcode').text();
                info.special = $(this).find('special').text();
                info.summary = $(this).find('summary').text();
                info.keyword = $(this).find('keyword').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "personal") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.empcode = $(this).find('empcode').text();

                info.sex = $(this).find('sex').text();
                info.bonjuk = $(this).find('bonjuk').text();
                info.birthday = $(this).find('birthday').text();
                info.birthdaygubun = $(this).find('birthdaygubun').text();

                info.bloodtype = $(this).find('bloodtype').text();
                info.marrydate = $(this).find('marrydate').text();
                info.tel = $(this).find('tel').text();
                info.handtel = $(this).find('handtel').text();

                info.jonggyo = $(this).find('jonggyo').text();
                info.chuymi = $(this).find('chuymi').text();
                info.speciality = $(this).find('speciality').text();
                info.hoju = $(this).find('hoju').text();

                info.sedaeju = $(this).find('sedaeju').text();
                info.jugutype = $(this).find('jugutype').text();
                info.postnum = $(this).find('postnum').text();
                info.addr = $(this).find('addr').text();
                info.bonjugpostnum = $(this).find('bonjugpostnum').text();
                info.bonjug = $(this).find('bonjug').text();
                info.region = $(this).find('region').text();
                info.register = $(this).find('register').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "empfamily") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.empcode = $(this).find('empcode').text();

                info.relation = $(this).find('relation').text();
                info.name = $(this).find('name').text();
                info.telphone = $(this).find('telphone').text();
                info.addr = $(this).find('addr').text();

                info.school = $(this).find('school').text();
                info.job = $(this).find('job').text();
                info.samehouse = $(this).find('samehouse').text();
                info.register = $(this).find('register').text();
                
                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "career") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.empcode = $(this).find('empcode').text();

                info.type = $(this).find('type').text();
                info.name = $(this).find('name').text();
                info.skill = $(this).find('skill').text();
                info.work = $(this).find('work').text();

                info.award = $(this).find('award').text();
                info.school = $(this).find('school').text();
                info.job = $(this).find('job').text();
                info.starttime = $(this).find('starttime').text();
                info.endtime = $(this).find('endtime').text();
                info.info = $(this).find('info').text();
                info.register = $(this).find('register').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }
        else if (arg.code === "empmanager") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.empcode = $(this).find('empcode').text();

                info.empname = $(this).find('empname').text();
                info.emplevel = $(this).find('emplevel').text();
                info.passwd = $(this).find('passwd').text();
                
                info.register = $(this).find('register').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
        }

        var reinfo = { pageinfo: pageinfo, loginfo: loginfo, arrarr: arrarr };

        return reinfo;
    }

    getInfoErpViewBody(xmlDoc, arg) {
        var err = $(xmlDoc).find('ViewMsg').attr('error');
        if (err != "ok") {
            console.log('getInfoErp=', err);
            return;
        }

        var pageinfo = {};
        pageinfo.pagetype = 'erppage';
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);
        var article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);

        var loginfo = this.getInfoBoardLoginfo(xmlDoc);

        console.log('arg.code=', arg.code);

        var arrarr = [], personalarr = [], empfamilyarr = [], careerarr = []; var b = true;
        if (arg.code === "employee") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.id = $(this).find('id').text();
                info.img = $(this).find('imagename').text();

                info.empcode = $(this).find('empcode').text();
                info.empname = $(this).find('empname').text();
                info.busu = $(this).find('busu').text();

                info.nation = $(this).find('nation').text();
                info.englishname = $(this).find('englishname').text();
                info.path = $(this).find('path').text();
                info.postnum = $(this).find('postnum').text();
                info.email = $(this).find('email').text();
                info.addr = $(this).find('addr').text();
                info.nop = $(this).find('nop').text();
                info.jicchak = $(this).find('jicchak').text();
                info.jicchakcode = $(this).find('jicchakcode').text();
                info.jicgub = $(this).find('jicgub').text();
                info.jicjong = $(this).find('jicjong').text();
                info.jicmugubun = $(this).find('jicmugubun').text();
                info.hobong = $(this).find('hobong').text();
                info.ibsadate = $(this).find('ibsadate').text();
                info.ibsagubun = $(this).find('ibsagubun').text();
                info.enddate = $(this).find('enddate').text();
                info.returndate = $(this).find('returndate').text();
                info.huyjikdate = $(this).find('huyjikdate').text();
                info.gbyutype = $(this).find('gbyutype').text();
                info.yungm_gb = $(this).find('yungm_gb').text();
                info.bohum_gb = $(this).find('bohum_gb').text();
                info.bohum_num = $(this).find('bohum_num').text();
                info.bankcode = $(this).find('bankcode').text();
                info.gyejoa_num = $(this).find('gyejoa_num').text();
                info.chulcard_num = $(this).find('chulcard_num').text();

                arrarr[arrarr.length] = info;

                article_num--;
            });
            console.log('arrarr=', arrarr);
            $(xmlDoc).find('personalRecords').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.empcode = $(this).find('empcode').text();

                info.sex = $(this).find('sex').text();
                info.bonjuk = $(this).find('bonjuk').text();
                info.birthday = $(this).find('birthday').text();
                info.birthdaygubun = $(this).find('birthdaygubun').text();

                info.bloodtype = $(this).find('bloodtype').text();
                info.marrydate = $(this).find('marrydate').text();
                info.tel = $(this).find('tel').text();
                info.handtel = $(this).find('handtel').text();

                info.jonggyo = $(this).find('jonggyo').text();
                info.chuymi = $(this).find('chuymi').text();
                info.speciality = $(this).find('speciality').text();
                info.hoju = $(this).find('hoju').text();

                info.sedaeju = $(this).find('sedaeju').text();
                info.jugutype = $(this).find('jugutype').text();
                info.postnum = $(this).find('postnum').text();
                info.addr = $(this).find('addr').text();
                info.bonjugpostnum = $(this).find('bonjugpostnum').text();
                info.bonjug = $(this).find('bonjug').text();
                info.region = $(this).find('region').text();
                info.register = $(this).find('register').text();

                personalarr[personalarr.length] = info;

                article_num--;
            });

            $(xmlDoc).find('empfamilyRecords').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.empcode = $(this).find('empcode').text();

                info.relation = $(this).find('relation').text();
                info.name = $(this).find('name').text();
                info.telphone = $(this).find('telphone').text();
                info.addr = $(this).find('addr').text();

                info.school = $(this).find('school').text();
                info.job = $(this).find('job').text();
                info.samehouse = $(this).find('samehouse').text();
                info.register = $(this).find('register').text();

                empfamilyarr[empfamilyarr.length] = info;

                article_num--;
            });

            $(xmlDoc).find('careerRecords').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.empcode = $(this).find('empcode').text();

                info.type = $(this).find('type').text();
                info.name = $(this).find('name').text();
                info.key = $(this).find('key').text();
                info.value = $(this).find('value').text();

                info.starttime = $(this).find('starttime').text();
                info.endtime = $(this).find('endtime').text();
                info.info = $(this).find('info').text();
                info.register = $(this).find('register').text();

                careerarr[careerarr.length] = info;

                article_num--;
            });

        }
        else if (arg.code === "company") {
            $(xmlDoc).find('Records').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.companycode = $(this).find('companycode').text();
                info.companyname = $(this).find('companyname').text();
                info.dealtype = $(this).find('dealtype').text();
                info.ceo = $(this).find('ceo').text();
                info.tel = $(this).find('tel').text();
                info.tel2 = $(this).find('tel2').text();
                info.fax = $(this).find('fax').text();
                info.postnum = $(this).find('postnum').text();
                info.addr = $(this).find('addr').text();
                info.email = $(this).find('email').text();
                info.saupjanum = $(this).find('saupjanum').text();
                info.uptae = $(this).find('uptae').text();
                info.jongmok = $(this).find('jongmok').text();
                info.danga_dg = $(this).find('danga_dg').text();
                info.memo = $(this).find('memo').text();
                info.register = $(this).find('register').text();
                arrarr[arrarr.length] = info;

                article_num--;
            });

            $(xmlDoc).find('careerRecords').each(function (index) { //alert(xmlDoc);
                //recordCount++;
                var info = {};
                info.uid = $(this).find('uid').text();
                info.empcode = $(this).find('empcode').text();

                info.type = $(this).find('type').text();
                info.name = $(this).find('name').text();
                info.skill = $(this).find('skill').text();
                info.work = $(this).find('work').text();

                info.award = $(this).find('award').text();
                info.school = $(this).find('school').text();
                info.job = $(this).find('job').text();
                info.starttime = $(this).find('starttime').text();
                info.endtime = $(this).find('endtime').text();
                info.info = $(this).find('info').text();
                info.register = $(this).find('register').text();

                careerarr[careerarr.length] = info;

                article_num--;
            });
        }
        
        
        var reinfo = { pageinfo: pageinfo, loginfo: loginfo, arrarr: arrarr, personalarr: personalarr, empfamilyarr: empfamilyarr, careerarr: careerarr };

        return reinfo;
    }

    getInfoJjocjyList(xmlDoc, arg) {
        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            console.log('getInfoJjocjy=', err);
            return;
        }

        var pageinfo = {};
        pageinfo.pagetype = 'keyvaluepage';
        pageinfo.page = parseInt($(xmlDoc).find('Msg').attr('page'));
        pageinfo.page_block = parseInt($(xmlDoc).find('Msg').attr('pageblock'));  //블록당페이지수
        pageinfo.total_record = parseInt($(xmlDoc).find('Msg').attr('total_record'));
        pageinfo.recordnum = parseInt($(xmlDoc).find('Msg').attr('recordnum'));
        pageinfo.page_num = parseInt($(xmlDoc).find('Msg').attr('pagenum'));
        pageinfo.article_num = pageinfo.total_record - pageinfo.page_num * (pageinfo.page - 1);


        var loginfo = this.getInfoBoardLoginfo(xmlDoc);

        var arrarr = [];
        var b = true;

        var self = this;
        $(xmlDoc).find('Records').each(function (index) {

            var info = {};
            info.uid = $(this).find('uid').text();
            info.sendid = $(this).find('sendid').text();
            info.getid = $(this).find('getid').text();
            info.subject = $(this).find('subject').text();
            info.memo1 = $(this).find('memo1').text();
            info.memo_type = $(this).find('memo_type').text();
            info.register = $(this).find('register').text();
            info.arr = [];

            arrarr[arrarr.length] = info;
        });

        var reinfo = { arrarr: arrarr, loginfo: loginfo };

        return reinfo;
    }

    eventHandler(e) {
        
    }

    serializeLay() {
        
    }

    deSerializeLay(info) {

    }
}

class BoardConfigController extends BoardAjaxBase {
    constructor(renderinfo) {
        super();

        if (!renderinfo)
            return;
        this.setRenderinfo(renderinfo);
    }

    setRenderinfo(renderinfo) {
        
        var str;
        str = `/manboard.adm?type=list&code=${renderinfo.code}&dbpath=${renderinfo.dbpath}&brdid=${renderinfo.brdid}&utf8=ok&`;

        var arg = {};
        arg.dbpath = renderinfo.dbpath;
        arg.code = renderinfo.code;
        arg.renderinfo = renderinfo;
        arg.type = renderinfo.type;
        arg.brdid = renderinfo.brdid;
        arg.path = str;
        arg.self = this;
        this.arg = arg;
    }

    boardConfigList(arg) {
        this.startBoardRequest(arg);
    }

    renderController(elem) {
        this.arg.elem = elem;
        this.startBoardRequest(this.arg);
    }

    makeBoardConfig(xmlDoc, arg) {
        var info = this.getInfoBoardConfig(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};
        //console.log(`this.boardConfigView==${this.boardConfigView} arg.type==${arg.type}  arg.self=${arg.self}`);
        
        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        }
    }

    eventHandler(e) {
        var arg = e.data.arg;
        var self = arg.self;
        if (arg.type == 'record') {
            __fullscreenView.fullscreen('fullscreenwin');
            var str = "/view.board?code=" + e.data.code + "&page=" + e.data.page + "&uid=" + e.data.uid + "&dbpath=" + e.data.dbpath + "&brdid=" + e.data.brdid + "&";
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
            var arg = { path: str, type: "viewbody", rendertype: e.data.rendertype, renderstyle: e.data.renderstyle, cls: e.data.cls, boardid: e.data.boardid };
            self.startBoardRequest(arg);
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        } else if (arg.type == 'more') {
            var str = "/list.board?code=" + e.data.code + "&brdid=" + e.data.brdid + "&dbpath=" + e.data.dbpath + "&utf8=ok&";
            //alert("morelist str e.data.rendertype == " + e.data.rendertype);
            var arg = { path: str, type: "boardlist", rendertype: e.data.rendertype, renderstyle: e.data.renderstyle, cls: e.data.cls, boardid: e.data.boardid };

            //alert("da-baord-script morelist e.data.cls == " + e.data.cls + "  renderstyle==" + e.data.renderstyle);
            self.startBoardRequest(arg);
        } else if (arg.type == 'list') {

        } else if (arg.type == 'list') {

        } else if (arg.type == 'list') {

        } else if (arg.type == 'record') {

        } else if (arg.type == 'find') {
            var keyfield = $("#findform option:selected").val();
            var key = $("#findform input[name=key]").val();
            if (keyfield == "subject" || keyfield == "comment")
                key = Base64.encode(key);
            //alert("keyfield== " + keyfield + "key==" + key);
            //return;
            var str = "/list.board?code=" + e.data.code + "&page=" + e.data.page + "&uid=" + e.data.uid + "&dbpath=" + e.data.dbpath + "&brdid=" + e.data.brdid + "&keyfield=" + keyfield + "&key=" + key + "&";
            var arg = { path: str, type: "boardlist", rendertype: e.data.rendertype, renderstyle: e.data.renderstyle, cls: e.data.cls, boardid: e.data.boardid };
            self.startBoardRequest(arg);
        } else if (arg.type == 'page') {
            var str = "/list.board?code=" + e.data.code + "&page=" + e.data.page + "&uid=" + e.data.uid + "&dbpath=" + e.data.dbpath + "&brdid=" + e.data.brdid + "&";
            var arg = { path: str, type: "boardlist", rendertype: e.data.rendertype, renderstyle: e.data.renderstyle, cls: e.data.cls, boardid: e.data.boardid };
            //alert("onItemPageClick e.data.page==" + e.data.page );
            self.startBoardRequest(arg);
        }
    }
}

class BoardFormAndModal {
    constructor() {
        //$('body').append(this.createEmployeeModal());

    }

    createDatMediaBoxView(info, arg, eventHandler) {

        var $dat_media_box = $('<div class="d-flex border p-3">');
        var $datimg = $('<img onerror=\'this.src=images/ blank.gif\'" src="..." class="mr-3" alt="...">');
        var $datbody = $('<div class="media-body">');

        var $bodyhead = $('<div class="row justify-content-between">').text(info.subject);
        var str = info.id + " (" + info.signdate + ")";
        var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(str);
        var $head_right = $('<div class="mt-0">');
        $bodyhead.append($head_left).append($head_right);

        var $bodybody = $('<p>').html(info.comment);

        $datbody.append($bodyhead);
        $datbody.append($bodybody);

        $dat_media_box.append($datimg).append($datbody);

        var btn1 = $('<button type="button" class="btn btn-info" >👍</button>');
        var btn2 = $('<button type="button" class="btn btn-info" >👎</button>');

        //datinfo.customer_btn1 = btn1;
        $(btn1).bind("click", { type: "addpoint", formid: "datform", code: info.code, dbpath: info.dbpath, uid: info.uid, rendertype: info.rendertype, boardid: info.boardid }, datEventHandler);
        $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
        $(btn2).bind("click", { type: "minuspoint", formid: "datform", code: info.code, dbpath: info.dbpath, uid: info.uid, rendertype: info.rendertype, boardid: info.boardid }, datEventHandler);
        $(btn2).attr('style', 'cursor:pointer;cursor: hand;');

        $head_right.append(btn1).append(btn2);
        //}

        var $dat_nav = $('<nav class="navbar navbar-light bg-light">');
        var $dat_menu = $('<a class="navbar" data-bs-toggle="collapse" href="#reply' + info.uid + '" >');
        $dat_menu.bind("click", { type: "datlist", formid: "datform", code: info.code, dbpath: info.dbpath, uid: info.uid, rendertype: info.rendertype, boardid: info.boardid }, datEventHandler);
        $dat_menu.text("답글(" + info.datcount + ")");

        var $ul = $('<ul class="list-unstyled list-inline social text-right">');
        var $li1 = $('<li class="list-inline-item"><a  data-bs-toggle="collapse" href="#datform' + info.uid + '"><i class="fa fa-fw fa-pencil"></i></a></li>');
        $li1.bind("click", { type: "datform", formid: "datform", code: info.code, dbpath: info.dbpath, uid: info.uid, rendertype: info.rendertype, boardid: info.boardid }, datEventHandler);
        $li1.attr('style', 'cursor:pointer;cursor: hand;');
        var $li2 = $('<li class="list-inline-item"><a href="#datform' + info.uid + '"><i class="fa fa-fw fa-edit"></i></a></li>');
        var $li3 = $('<li class="list-inline-item"><a href="#' + info.uid + '"><i class="fa fa-fw fa-trash-o"></i></a></li>');
        $ul.append($li1).append($li2).append($li3);
        $dat_nav.append($dat_menu).append($ul);
        $datbody.append($dat_nav);

        var $collapse = $('<div class="collapse" id="datform' + info.uid + '">');
        //$collapse.attr("dbpath", info.dbpath).attr("code", info.code).attr("datuid", info.datuid).attr("fid", info.fid).attr("rendertype", info.rendertype);
        //$collapse.append('test collapse');
        $datbody.append($collapse);

        var $collapse2 = $('<div class="collapse" id="reply' + info.uid + '">');
        //$collapse2.attr("dbpath", info.dbpath).attr("code", info.code).attr("datuid", info.datuid).attr("fid", info.fid).attr("rendertype", info.rendertype);
        //$collapse2.append('test collapse');
        $datbody.append($collapse2);

        return $dat_media_box;
    };

    createDatFormView(info, arg, eventHandler) {

        console.log('makeDatFormBox');
        var datinfo = {};
        datinfo.rendertype = "general";
        datinfo.boxtype = "box-success box-solid";
        datinfo.titleicon = "";
        datinfo.title = "댓 글";
        datinfo.collapse_btn = "ok";

        var $datbox = $('<div>');

        var $datForm = $('<form id="datform" action="post.board" method="post" class="form-horizontal">');

        $datForm.append('<input type="hidden" name="code" value="' + info.code + '"  />');
        $datForm.append('<input type="hidden" name="dbpath" value="' + info.dbpath + '"  />');
        $datForm.append('<input type="hidden" name="posttype" value="datpost"  />');
        $datForm.append('<input type="hidden" name="brdid" value="' + info.brdid + '"  />');
        $datForm.append('<input type="hidden" name="uid" value="' + info.uid + '"  />');
        $datForm.append('<input type="hidden" name="datuid" value="' + info.datuid + '"  />');
        $datForm.append('<input type="hidden" name="dattype" value="' + info.dattype + '"  />');

        var $datLabel = $('<label for="subject" class="col-sm-2 control-label"></label>');
        var $datInput = $('<input type="text" name="subject" id="dat_subject" class="form-control" placeholder="subject">');
        var $formGroup = $('<div class="form-group">').append($datLabel).append($datInput);
        $datForm.append($formGroup);
        $datLabel = $('<label for="comment" class="col-sm-2 control-label"></label>');
        $datInput = $('<textarea cols="40" rows="18" name="comment" id="summernote" class="form-control jqte-edit" placeholder="내 용..." required="" autofocus="" type="text">');
        $formGroup = $('<div class="form-group">').append($datLabel).append($datInput);
        $datForm.append($formGroup);

        var btn1 = $('<button type="button" class="btn btn-info brdupdate" >댓글전송</button>');
        $(btn1).bind("click", { type: "datpost", formid: "#datform", code: info.code, dbpath: info.dbpath, brdid: info.brdid, uid: info.uid, datuid: info.datuid, rendertype: info.rendertype, boardid: info.boardid }, postBoardCallAjax);
        var $formitem = $('<div class="form-group">').append($(btn1));
        $datForm.append($formitem);

        $datbox.append($datForm);

        datinfo.comment = $datbox;

        return createBox(datinfo);
    };



    summernoteSetting(cmd) {
        var HelloButton = function (context) {
            var ui = $.summernote.ui;

            // create button
            var button = ui.button({
                contents: '<i class="fa fa-envelope"></i> Hello',
                tooltip: 'hello',
                click: function () {
                    //alert("node");
                    //var node = document.createElement('div');
                    //node.appendChild(document.createTextNode("abc"));
                    //var node = $('<div>');
                    //node.text('abcdefghijk');
                    //***
                    var tinfo = {};
                    tinfo.dragok = "ok";
                    tinfo.boxtype = "box-default box-solid";
                    tinfo.rendertype = "general";
                    //tinfo.remove_btn = "ok";
                    tinfo.collapse_btn = "ok";
                    var node = createBox(tinfo);
                    // alert("node");
                    ///***/
                    $('#summernote').summernote('insertNode', node[0]);
                    // invoke insertText method with 'hello' on editor module.
                    context.invoke('editor.insertText', 'hello');

                    $('#summernote').summernote('insertNode', $('<div>abchhhhhhhhhhhhhhhdefg</div>')[0]);
                    //return;
                }
            });

            return button.render();   // return button as jquery object
        };
        var self = this;
        $('.summernote').summernote({
            toolbar: [
                ['mybutton', ['hello']],
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video', 'hr']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
            ],
            buttons: {
                hello: HelloButton
            },
            height: 300,
            minHeight: null,
            maxHeight: null,
            focus: true,
            callbacks: {
                onImageUpload: function (files, editor, welEditable) {
                    for (var i = files.length - 1; i >= 0; i--) {
                        self.summernoteSendFile(files[i], this);
                    }
                }
            }
        });
        //alert('summernote setting');
    };

    summernoteSendFile(file, el) {
        var upurl = "upload.file?code=" + code + "&filetype=" + filetype + "&dbpath=" + dbpath + "&dbin=ok";
        var form_data = new FormData();
        form_data.append('file', file);
        $.ajax({
            data: form_data,
            type: "POST",
            url: upurl,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (data) {
                //alert(data);
                var xmlDoc = $.parseXML(data);
                //alert("data: " + data);
                var err = $(xmlDoc).find('Msg').attr('error');
                if (err != "ok") {
                    alert(err);
                    return;
                }
                var code = $(xmlDoc).find('Msg').attr('code');
                var filename = $(xmlDoc).find('Msg').attr('filename');

                var filetype = $(xmlDoc).find('Msg').attr('filetype');
                var dbuid = $(xmlDoc).find('Msg').attr('dbuid');
                var arr;
                if (dbuid)
                    arr = dbuid.split(';');
                else
                    arr = filename.split(';');
                var imgurl = "download.file?code=" + code + "&type=open&filetype=" + filetype + "&dbpath=" + dbpath + "&filename=" + arr[0] + "&dbuid=" + arr[0] + "&dbinok";
                $(el).summernote('editor.insertImage', imgurl);
                $('#imageBoard > ul').append('<li><img src="' + imgurl + '" width="480" height="auto"/></li>');
            }
        });
    };

    createBoardFormView(info, arg, eventHandler) {

        //alert("createBoardWriteBox(info) info.rendertype" + info.rendertype + "info.fid" + info.fid);

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
        $writeForm.append('<input type="hidden" name="thread" value="' + arg.thread + '"  />');

        var $writeLabel = $('<label for="subject" class="col-sm-2 control-label"></label>');
        var $writeInput = $('<input type="text" name="subject" class="form-control" placeholder="subject">').val(arg.subject);
        var $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);
        $writeLabel = $('<label for="comment" class="col-sm-4 control-label"></label>').text('내용');
        $writeInput = $('<textarea cols="40" rows="18" name="comment" id="summernote" class="form-control summernote" placeholder="내 용..." required="" autofocus="" type="text">').val(arg.comment);
        $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);


        var btn1 = $('<button type="button" class="btn btn-info brdupdate" >전송</button>');
        $(btn1).bind("click", { type: 'boardpost', formid: 'boardpostform', arg: arg }, eventHandler);
        var $formitem = $('<div class="form-group">').append($(btn1));
        $writeForm.append($formitem);
        $writebox.append($writeForm);

        writeinfo.comment = $writebox;
        var b = new CardView();
        var $box = b.createCardView(writeinfo);

        //this.summernoteSetting(arg.comment);
        return $writebox;
        //return $box;
    };
}

class BoardController extends BoardAjaxBase {

    constructor(renderinfo) {
        super();
       
        if (!renderinfo)
            return;
        this.setRenderinfo(renderinfo);
    }

    setRenderinfo(renderinfo) {
        this.$parent = renderinfo.$parent;
        var type = renderinfo.type ?? '';
        var dbpath = renderinfo.dbpath ?? '';
        var code = renderinfo.code ?? '';
        var brdid = renderinfo.brdid ?? '';
        var uid = renderinfo.uid ?? '';
        var fid = renderinfo.fid ?? '';
        
        if (renderinfo.thread) {
            renderinfo.ifkeyfield = 'thread';
            renderinfo.ifkey = renderinfo.thread[0].key;
        } else
            renderinfo.ifkeyfield = '';
            
        if (renderinfo.tag) {
            renderinfo.keyfield = 'tag';
            renderinfo.key = renderinfo.tag;
        }
        else
            renderinfo.keyfield = '';
        
        //console.log(`this.tostring=${this.tostring}`);
        var str = ``;
        if (type == 'grouplist')
            str = `/grouplist.board?code=${code}&dbpath=${dbpath}&keyfield=${renderinfo.keyfield}&key=${renderinfo.key}&ifkeyfield=${renderinfo.ifkeyfield}&ifkey=${renderinfo.ifkey}&utf8=ok&`;
        else if (type == 'boardlist')
            str = `/list.board?code=${code}&dbpath=${dbpath}&keyfield=${renderinfo.keyfield}&key=${renderinfo.key}&ifkeyfield=${renderinfo.ifkeyfield}&ifkey=${renderinfo.ifkey}&brdid=${brdid}&utf8=ok&`;
        else if (type == 'viewbody') {
            str = "/view.board?code=" + code + "&uid=" + uid + "&fid=" + fid + "&dbpath=" + dbpath + "&brdid=" + brdid + "&utf8=ok&";
            //console.log("eventHandler(e) boardlist ============= str == " + str);
            
        } 
        var arg = {};
        arg.dbpath = renderinfo.dbpath;
        arg.code = renderinfo.code;
        arg.viewelem = renderinfo.viewelem;
        arg.renderinfo = renderinfo;
        arg.type = renderinfo.type;
        arg.brdid = renderinfo.brdid;
        arg.path = str;
        arg.self = this;
        this.arg = arg;
    }

    renderController(elem) {
        this.self = this;
        this.arg.elem = elem;
        //console.log(`this.arg.renderinfo.title=${this.arg.renderinfo.title}`);
        if (this.arg.viewelem)
            console.log(`this.arg.viewelem222=${this.arg.viewelem}`);
        this.listAjax(this.arg);
    }

    setController(type, dbpath, code, brdid, elem, viewelem) {
        var str = `/mankeyvalue.adm?dbpath=${dbpath}&kcode=${kcode}&kname=${kname}&type=keyvalue&utf8=ok&`;
        this.self = this;
        this.arg.viewelem = viewelem;
        this.arg.path = str;
        this.arg.code = code;
        this.arg.brdid = brdid;
        this.renderController(elem);
    }

    makeBoardList(xmlDoc, arg) {
        //console.log(`arg.path=${arg.path}`);
        arg.self = this;
        var info = this.getInfoBoardList(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};
        //console.log(`arg.path=${arg.path}`);
        var bconf = null;
        if (info.boardconfarr && info.boardconfarr[0]) {
            bconf = info.boardconfarr[0];
        }
        //console.log(`bconf.length=${info.boardconfarr.length} bconf.bctype=${bconf.bctype} bconf.brdid=${bconf.brdid}`);
        if (bconf && bconf.bctype)
            arg.bctype = bconf.bctype;
        else
            arg.bctype = null;

        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        }
            

        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }

        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makeGroupBoardList(xmlDoc, arg) {
        arg.self = this;
        var info = this.getInfoGroupBoardList(xmlDoc, arg);
        //console.log(`makeGroupBoardList(xmlDoc, arg) arg.self=${arg.self}`);
        
        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createGroupList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createGroupList(info, arg, this.eventHandler);
        }

        //if (this.groupView == null)
            //this.groupView = new GroupBoardView();
        //this.groupView.createList(info, arg, this.eventHandler);
        var err = $(xmlDoc).find('Msg').attr('error');
        if (err != "ok") {
            alert(err);
            return;
        }

        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makeViewBody(xmlDoc, arg) {
        arg.self = this;
        var err = $(xmlDoc).find('ViewMsg').attr('error');
        var da = $(xmlDoc).find('ViewMsg').attr('DaBoard');
        
        if (err != "ok") {
            console.log(err);
            return;
        }
        //console.log("makeViewBody(xmlDoc, arg) err==", err);
        var info = this.getInfoViewBody(xmlDoc, arg);
        //console.log("makeViewBody(xmlDoc, arg) info==", info);
        if (arg.renderinfo.viewbody && typeof arg.renderinfo.viewbody === "string") {
            arg.renderinfo.viewbody = eval("new " + arg.renderinfo.viewbody + "()");
            arg.renderinfo.viewbody.createViewbody(info, arg, this.eventHandler);
        } else if (arg.renderinfo.viewbody && typeof arg.renderinfo.viewbody === "object") {
            arg.renderinfo.viewbody.createViewbody(info, arg, this.eventHandler);
        } else {
            if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            } 
            arg.renderinfo.renderview.createViewbody(info, arg, this.eventHandler);
        }
        
        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    eventHandler(e) {
        console.log("eventHandler(e)  + arg 3= " + arg);
        var info = e.data.info;
        var arg = e.data.arg;
        var self = arg.self;
        var type = e.data.type;
        console.log("eventHandler(e) arg 333= " + arg);
        if (type == 'boardrecord') {
            //console.log("eventHandler(e)============= str == " + str);
            //__fullscreenView.setContent(arg.elem);
            //__fullscreenView.fullscreen('fullscreenwin');
            var str = "/view.board?code=" + arg.code + "&page=" + arg.page + "&uid=" + info.uid + "&fid=" + info.fid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&utf8=ok&";
            //console.log("eventHandler(e) boardlist ============= str == " + str);
            //console.log(`eventHandler(e) arg =====arg==${arg}=== arg.code${arg.code}=== str == ${str}`);
            var arg = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            self.startBoardRequest(arg);
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        } else if (type == 'boardlist' || type == 'more' || type == 'menuclick') {
            console.log("eventHandler type  == " + type);
            var str = "/list.board?code=" + arg.code + "&brdid=" + info.brdid + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            //console.log("morelist str info.brdid == " + info.brdid);
            var arg = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            self.startBoardRequest(arg);
        } else if (type == 'boardmodify') {
            str = "/view.board?posttype=modify&code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&brdid=" + e.data.brdid + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&utf8=ok&";
        } else if (type == 'boarddelete') {
            if (!confirm("글을 삭제합니다 ")) {
                return;
            }
            str = "/list.board?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&utf8=ok&";
            arg.path = str;
            arg.type = 'boardlist';
            self.postAjax(arg);
        } else if (type == 'list') {

        } else if (type == 'boardpost') {
            var form = document.getElementById(e.data.formid);
            //console.log('form^********************************=' + form);
            arg.type = 'boardlist';
            arg.form = form;
            var formData = $(form).serializeArray();
            var b64 = Base64.encode($("#summernote").val());
            //alert("Base64.encode formid==222222" + formid);
            formData = self.changeSerialize(formData, 'comment', b64);
            //console.log("form.subject.value=======" + form.subject.value);
            b64 = Base64.encode(form.subject.value);
            formData = self.changeSerialize(formData, 'subject', b64);
            arg.formData = formData;

            arg.path = "/list.board?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + arg.uid + "&datuid=" + arg.datuid + "&utf8=ok&";
            self.postAjax(arg);
            //console.log("eventHandler(e) type33 == " + type);
        } else if (type == 'boardwrite') {
            //var form = new BoardFormAndModal();
            //__fullscreenView.setContent(form.createBoardFormView(info, arg, self.eventHandler));
            //__fullscreenView.fullscreen('fullscreenwin');
            //form.summernoteSetting('');

            __modal.show('글쓰기', e.data.self.createBoardFormView(info, arg, self.eventHandler));
            new SummerNoteSet('.summernote');
        } else if (type == 'addpoint' || type == "minuspoint") {
            var str = "/view.board?posttype=addpoint&code=" + arg.code + "&point=" + e.data.point + "&uid=" + e.data.uid + "&fid=" + e.data.fid + "&dbpath=" + arg.dbpath + "&brdid=" + e.data.brdid + "&";
            console.log(` handle addpoint str=${str}********=`);
            var arg = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            self.startBoardRequest(arg);
        } else if (type == 'adddatpoint' || type == "minusdatpoint") {
            var str = "/view.board?posttype=addpoint&addtype=dat&code=" + arg.code + "&point=" + e.data.point + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&fid=" + e.data.fid + "&dbpath=" + arg.dbpath + "&brdid=" + e.data.brdid + "&";
            console.log(` handle addpoint str=${str}********=`);
            var arg = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            self.startBoardRequest(arg);
        } else if (type == 'login') {
            var form = document.getElementById(e.data.formid);
            arg.type = type;
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;
            arg.path = "/login.member?logtype=login&utf8=ok&";
            self.postAjax(arg);
        } else if (type == 'datdelete') {
            if (!confirm("댓글을 삭제합니다 ")) {
                return;
            }
            str = "/view.board?posttype=datdelete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&fid=" + e.data.fid + "&utf8=ok&";
            arg.path = str;
            self.postAjax(arg);
        } else if (type == 'datpost' || type == "datmodify") {
            var form = document.getElementById(e.data.formid);
            //console.log('form^********************************=' + form);
            form.code.value = arg.code;
            form.dbpath.value = arg.dbpath;
            form.uid.value = arg.uid;
            arg.type = 'viewbody';
            arg.form = form;
            var formData = $(form).serializeArray();
            var b64 = Base64.encode($("#summernote").val());
            //alert("Base64.encode formid==222222" + formid);
            formData = self.changeSerialize(formData, 'comment', b64);
            //console.log("form.subject.value=======" + form.subject.value);
            b64 = Base64.encode(form.subject.value);
            formData = self.changeSerialize(formData, 'subject', b64);
            arg.formData = formData;

            arg.path = "/view.board?posttype=" + type + "&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + info.uid + "&fid=" + info.fid + "&datuid=" + arg.datuid + "&utf8=ok&";
            console.log(` handle datpost arg.path=${arg.path}**** arg.type=${arg.type}****************************=`);
            self.postAjax(arg);
        } else if (type == 'boardfind') {
            var keyfield = $("#findform option:selected").val();
            var key = $("#findform input[name=key]").val();
            if (keyfield == "subject" || keyfield == "comment")
                key = Base64.encode(key);

            var str = "/list.board?code=" + arg.code + "&page=1&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&keyfield=" + keyfield + "&key=" + key + "&";
            console.log(' handle find str********************************=' + str);
            var arg = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            self.startBoardRequest(arg);
        } else if (type == 'boardpage') {
            //console.log(` handle page arg.page=${arg.page}**** e.data.page=${e.data.page}****************************=`);
            var str = "/list.board?code=" + arg.code + "&page=" + e.data.page + "&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&";
            var arg = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };

            //console.log(' handle page str********************************=' + str);
            self.startBoardRequest(arg);
        }
    }

    serializeLay() {
        var info = { classname: this.constructor.name };
        info.renderinfo = this.arg.renderinfo;
        info.ltype = 'Board';

        return info;
    }

    deSerializeLay(info) {

    }

}

class ErpController extends BoardAjaxBase {

    constructor(renderinfo) {
        super();

        if (!renderinfo)
            return;
        this.setRenderinfo(renderinfo);
    }

    setRenderinfo(renderinfo) {
        this.$parent = renderinfo.$parent;
        var settype = renderinfo.settype;
        var dbpath = renderinfo.dbpath;
        var code = renderinfo.code;
        //this.tostring = `ErpController;${type};${dbpath};${code};${renderview}`;
        
        if (!renderinfo.keyfield) {
            renderinfo.keyfield = '';
            renderinfo.key = '';
        }

        var empcode = renderinfo.empcode ? renderinfo.empcode : '';
        var companycode = renderinfo.companycode ? renderinfo.companycode : '';
        var str = null;
        if(renderinfo.type == 'erplist')
            str = "/list.erp?dbpath=" + dbpath + "&code=" + code + "&keyfield=" + renderinfo.keyfield + "&key=" + renderinfo.key + "&utf8=ok&";
        else if (renderinfo.type == 'erpview')
            str = "/view.erp?dbpath=" + dbpath + "&code=" + code + "&empcode=" + empcode + "&companycode=" + companycode + "&keyfield=" + renderinfo.keyfield + "&key=" + renderinfo.key + "&utf8=ok&";
        //console.log(`str=${str}`);
        
        var arg = {};
        arg.dbpath = renderinfo.dbpath;
        arg.code = renderinfo.code;
        arg.renderinfo = renderinfo;
        arg.type = renderinfo.type;
        arg.path = str;
        arg.self = this;
        this.arg = arg;
    }

    erpList(arg) {
        arg.self = this;
        this.startBoardRequest(arg);
    }

    renderController(elem) {
        this.arg.self = this;
        this.arg.elem = elem;
        this.startBoardRequest(this.arg);
    }

    makeErp(xmlDoc, arg) {
        //console.log(`makeErp(xmlDoc, arg) `);
        var info = this.getInfoErp(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};
        //var pageinfo = info.pageinfo;
        //var arrarr = info.arrarr;
        //console.log(`makeErp(xmlDoc, arg)`);
        var cls = null;
        if (arg.code && arg.code === "employee") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new EmployeeView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
            //this.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.code && arg.code === "career") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new CareerView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
        } else if (arg.code && arg.code === "empfamily") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new FamilyView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
        } else if (arg.code && arg.code === "company") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new CompanyView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
        } else if (arg.code && arg.code === "customer") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new CustomerView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
        } else if (arg.code && arg.code === "rental") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new RentalView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
        } else if (arg.code && arg.code === "maeib_chul") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new Maeib_chulView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
        } else if (arg.code && arg.code === "workday") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new WorkdayView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
        } else if (arg.code && arg.code === "emppay") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new EmppayView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
        } else if (arg.code && arg.code === "goods") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new GoodsView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
        }
        //console.log(`makeErp(xmlDoc, arg)  arg.renderinfo=${arg.renderinfo}`);
        //console.log(`makeErp(xmlDoc, arg)  arg.renderinfo.renderview=${arg.renderinfo.renderview}`);
        arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
    }

    makeErpViewBody(xmlDoc, arg) {

        var info = this.getInfoErpViewBody(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};

        //console.log(info.arrarr);
        //console.log(info.loginfo);
        //var pageinfo = info.pageinfo;
        //var arrarr = info.arrarr;
        //console.log(`makeErp(xmlDoc, arg)  this.renderview=${this.renderview}`);
        var cls = null;
        if (arg.code && arg.code === "employee") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new EmployeeView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
            //this.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.code && arg.code === "company") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new CompanyView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
        } 
        //console.log(`makeErp(xmlDoc, arg)  arg.renderinfo=${arg.renderinfo}`);
        //console.log(`makeErp(xmlDoc, arg)  arg.renderinfo.renderview=${arg.renderinfo.renderview}`);
        arg.renderinfo.renderview.createViewbody(info, arg, this.eventHandler);
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var self = arg.self;
        var type = e.data.type;
        console.log('eventHandler(e) type=' + type);
        if (type == 'erplist') {
            __fullscreenView.setContent('aaaaaaa');
            __fullscreenView.fullscreen('fullscreenwin');
            var str = "/view.board?code=" + arg.code + "&page=" + e.data.page + "&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&";
            alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
            var arg = { path: str, type: "viewbody", renderinfo: e.data.renderinfo, renderstyle: e.data.renderstyle, cls: e.data.cls, boardid: e.data.boardid };
            self.startBoardRequest(arg);

        } else if (type == 'erppage') {
            var str = "/list.erp?code=" + arg.code + "&page=" + e.data.page + "&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&";
            console.log('ErpController erppage=========== str=' + str);
            var arg = { path: str, type: "erplist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            self.startBoardRequest(arg);
        } else if (type == 'erpwrite') {
            //__modal.show('입력', 'test');
            __modal.show('입력', e.data.self.createErpFormView(info, arg, self.eventHandler));
            //console.log('eventHandler(e) e.data.self.createErpFormView(info, arg, self.eventHandler)=' + e.data.self.createErpFormView(info, arg, self.eventHandler));
        } else if (type == 'erppost') {
            console.log('ErpController self=' + self);
            var form = document.getElementById(e.data.formid);
            //console.log('form^********************************=' + form);
            arg.type = 'erplist';
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + e.data.code + "&page=" + e.data.page + "&uid=" + e.data.uid + "&dbpath=" + e.data.dbpath + "&utf8=ok&";
            arg.path = str;
            self.postAjax(arg);
        } else if (type == 'erpfind') {
            var keyfield = $("#findform option:selected").val();
            var key = $("#findform input[name=key]").val();
            if (keyfield == "subject" || keyfield == "comment")
                key = Base64.encode(key);

            var str = "/list.erp?code=" + arg.code + "&dbpath=" + arg.dbpath + "&keyfield=" + keyfield + "&key=" + key + "&";
            console.log(`ErpController erpfind str=${str}  self=${self}`);
            var arg = { path: str, type: 'erplist', dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            self.startBoardRequest(arg);
        }
    }

    serializeLay() {
        var info = { classname: this.constructor.name };
        info.renderinfo = this.arg.renderinfo;
        info.ltype = this.arg.renderinfo.code;

        return info;
    }

    deSerializeLay(info) {

    }
}

class SelfController extends BoardAjaxBase {

    constructor(renderinfo) {
        super();

        if (!renderinfo)
            return;
        this.setRenderinfo(renderinfo);
    }

    setRenderinfo(renderinfo) {
        this.$parent = renderinfo.$parent;
        var settype = renderinfo.settype;
        var dbpath = renderinfo.dbpath;
        var code = renderinfo.code;
        //this.tostring = `ErpController;${type};${dbpath};${code};${renderview}`;

        if (renderinfo.tag) {
            renderinfo.keyfield = 'tag';
            renderinfo.key = renderinfo.tag;
        }
        else
            renderinfo.keyfield = '';

        var str = "/list.self?dbpath=" + dbpath + "&code=" + code + "&utf8=ok&";

        var arg = {};
        arg.dbpath = renderinfo.dbpath;
        arg.code = renderinfo.code;
        arg.renderinfo = renderinfo;
        arg.type = renderinfo.type;
        arg.path = str;
        arg.self = this;
        this.arg = arg;
    }

    selfList(arg) {
        arg.self = this;
        this.startBoardRequest(arg);
    }

    renderController(elem) {
        this.arg.self = this;
        this.arg.elem = elem;
        this.startBoardRequest(this.arg);
    }

    makeSelf(xmlDoc, arg) {
        
        var info = this.getInfoSelf(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};

        //var pageinfo = info.pageinfo;
        //var arrarr = info.arrarr;
        console.log(`makeSelf(xmlDoc, arg)  arg.code=${arg.code}`);
        console.log(`makeSelf(xmlDoc, arg)  arg.renderview=${arg.renderview}`);
        console.log(`makeSelf(xmlDoc, arg)  arg.renderinfo.renderview=${arg.renderinfo.renderview}`);
        var cls = null;
        if (arg.code && arg.code === "schedule") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new ScheduleView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
            //this.renderview.createList(info, arg, this.eventHandler);
            arg.renderinfo.renderview.createScheduleCalendarView(info, arg, this.eventHandler);
        } else if (arg.code && arg.code === "cardpay") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new CardpayView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.code && arg.code === "cardpay_set") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new Cardpay_setView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.code && arg.code === "cardpay_dtl") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new Cardpay_dtlView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.code && arg.code === "bank_book") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new Bank_bookView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.code && arg.code === "creditcard") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new CreditcardView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.code && arg.code === "cash") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new CashView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.code && arg.code === "pay") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new PayView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
            
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.code && arg.code === "payclass") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new PayclassView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.code && arg.code === "in_output") {
            if (arg.renderinfo.renderview == null)
                arg.renderinfo.renderview = new In_outputView();
            else {
                if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                    arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                }
            }
            
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        }
        
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var self = arg.self;
        var type = e.data.type;
        console.log('eventHandler(e) type=' + type);
        if (type == 'erplist') {
            __fullscreenView.setContent('aaaaaaa');
            __fullscreenView.fullscreen('fullscreenwin');
            var str = "/view.board?code=" + arg.code + "&page=" + e.data.page + "&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&";
            alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
            var arg = { path: str, type: "viewbody", rendertype: e.data.rendertype, renderstyle: e.data.renderstyle, cls: e.data.cls, boardid: e.data.boardid };
            self.startBoardRequest(arg);

        } else if (type == 'erppage') {
            var str = "/list.erp?code=" + arg.code + "&page=" + e.data.page + "&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&";
            console.log('ErpController erppage=========== str=' + str);
            var arg = { path: str, type: "erplist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, rendertype: arg.rendertype, self: arg.self };
            self.startBoardRequest(arg);
        } else if (type == 'erpwrite') {
            //__modal.show('입력', 'test');
            __modal.show('입력', e.data.self.createErpFormView(info, arg, self.eventHandler));
            //console.log('eventHandler(e) e.data.self.createErpFormView(info, arg, self.eventHandler)=' + e.data.self.createErpFormView(info, arg, self.eventHandler));
        } else if (type == 'erppost') {
            console.log('ErpController self=' + self);
            var form = document.getElementById(e.data.formid);
            //console.log('form^********************************=' + form);
            arg.type = 'erplist';
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + e.data.code + "&page=" + e.data.page + "&uid=" + e.data.uid + "&dbpath=" + e.data.dbpath + "&utf8=ok&";
            arg.path = str;
            self.postAjax(arg);
        } else if (type == 'erpfind') {
            var keyfield = $("#findform option:selected").val();
            var key = $("#findform input[name=key]").val();
            if (keyfield == "subject" || keyfield == "comment")
                key = Base64.encode(key);

            var str = "/list.erp?code=" + arg.code + "&dbpath=" + arg.dbpath + "&keyfield=" + keyfield + "&key=" + key + "&";
            console.log(`ErpController erpfind str=${str}  self=${self}`);
            var arg = { path: str, type: 'erplist', dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, rendertype: arg.rendertype, self: arg.self };
            self.startBoardRequest(arg);
        }
    }

    serializeLay() {
        var info = { classname: this.constructor.name };
        info.renderinfo = this.arg.renderinfo;
        info.ltype = this.arg.renderinfo.code;

        return info;
    }

    deSerializeLay(info) {

    }
}

class KeyvalueController extends BoardAjaxBase {

    constructor(renderinfo) {
        super();

        if (!renderinfo)
            return;
        this.setRenderinfo(renderinfo);
    }

    setRenderinfo(renderinfo) {
        this.$parent = renderinfo.$parent;
        var settype = renderinfo.settype;
        var dbpath = renderinfo.dbpath;
        var kcode = renderinfo.kcode;
        var kname = renderinfo.kname;

        var str = `/mankeyvalue.adm?dbpath=${dbpath}&kcode=${kcode}&kname=${kname}&type=keyvalue&utf8=ok&`;

        //var arg = { path: str, type: "keyvalue", settype: settype, dbpath: dbpath, kcode: kcode, renderinfo: renderinfo, self: this };
        
        renderinfo.type = "keyvalue";
       
        var arg = {};
        arg.dbpath = renderinfo.dbpath;
        arg.code = renderinfo.code;
        arg.renderinfo = renderinfo;
        arg.type = renderinfo.type;
        arg.kcode = renderinfo.kcode;
        arg.kname = renderinfo.kname;
        arg.path = str;
        arg.self = this;
        this.arg = arg;
        //console.log(`arg.renderinfo.editmode22==${arg.renderinfo.editmode}`);
    }

    keyvalueList(arg) {
        arg.self = this;
        this.startBoardRequest(arg);
    }

    renderController(elem) {
        //console.log(`renderController(elem) this.arg.path=${this.arg.path}`);
        this.arg.elem = elem;
        this.arg.self = this;
        this.startBoardRequest(this.arg);
    }

    setController(renderinfo, elem) {
        var str = `/mankeyvalue.adm?dbpath=${renderinfo.dbpath}&kcode=${renderinfo.kcode}&kname=${renderinfo.kname}&type=keyvalue&utf8=ok&`;
        //console.log(`renderController(elem) str=${str}`);
        renderinfo.type = "keyvalue";

        var arg = {};
        arg.dbpath = renderinfo.dbpath;
        arg.code = renderinfo.code;
        arg.renderinfo = renderinfo;
        arg.type = renderinfo.type;
        arg.kcode = renderinfo.kcode;
        arg.kname = renderinfo.kname;
        arg.path = str;
        arg.self = this;
        this.arg = arg;
        this.renderController(elem);
        //console.log(`arg.renderinfo.editmode22==${arg.renderinfo.editmode}`);
    }

    keyvaluePost(arg) {
        arg.self = this;
        this.postAjax(arg);
    }

    makeKeyValue(xmlDoc, arg) {
        arg.self = this;
        var info = this.getInfoKeyValue(xmlDoc, arg);
        //console.log(`makeKeyValue(xmlDoc, arg) info.arrarr=${info.arrarr}`);
        if (info == null || info == undefined)
            info = {};
        //console.log(`arg.renderinfo.editmode22==${arg.renderinfo.editmode}`);
        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else {
            arg.renderinfo.renderview = new KeyValueView();
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        }
        //this.keyvalueView.createKeyvalueList(info, arg, this.eventHandler);
        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var val = info.value;

        if (type == 'keyvaluesubadd') {
            //__fullscreenView.setContent('aaaaaaaaabbbbbbbbbbbbbbbbb')
            //__fullscreenView.fullscreen('fullscreenwin');
            __modal.show('키추가', this.createKeyvalueForm());

            var form = document.getElementById("keyvalueForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.uid;
            form.did.value = info.uid;
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'keyvaluedel') {

        } else if (type == 'list') {

        } else if (type == 'find') {
            var keyfield = $("#findform option:selected").val();
            var key = $("#findform input[name=key]").val();
            if (keyfield == "subject" || keyfield == "comment")
                key = Base64.encode(key);
            //alert("keyfield== " + keyfield + "key==" + key);
            //return;
            var str = "/list.board?code=" + e.data.code + "&page=" + e.data.page + "&uid=" + e.data.uid + "&dbpath=" + e.data.dbpath + "&brdid=" + e.data.brdid + "&keyfield=" + keyfield + "&key=" + key + "&";
            var arg = { path: str, type: "boardlist", rendertype: e.data.rendertype, renderstyle: e.data.renderstyle, cls: e.data.cls, boardid: e.data.boardid };
            startBoardRequest(arg);
        } else if (type == 'page') {
            var str = "/list.board?code=" + e.data.code + "&page=" + e.data.page + "&uid=" + e.data.uid + "&dbpath=" + e.data.dbpath + "&brdid=" + e.data.brdid + "&";
            var arg = { path: str, type: "boardlist", rendertype: e.data.rendertype, renderstyle: e.data.renderstyle, cls: e.data.cls, boardid: e.data.boardid };
            //alert("onItemPageClick e.data.page==" + e.data.page );
            startBoardRequest(arg);
        }
    }

    serializeLay() {
        var info = { classname: this.constructor.name };
        info.renderinfo = this.arg.renderinfo;
        info.ltype = this.arg.renderinfo.kcode;

        return info;
    }

    deSerializeLay(info) {

    }
}

class PollFormAndModal {
    constructor() {
        //$('body').append(this.createEmployeeModal());

    }

    datEventHandler(e) {
        //alert(e.data.dbpath);	
        var type = e.data.type;

        if (type === "addpoint") {
            var str = "/view.board?code=" + e.data.code + "&page=" + e.data.page + "&uid=" + e.data.uid + "&dbpath=" + e.data.dbpath + "&brdid=" + e.data.brdid + "&";
            //alert("item[j]===code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
            var arg = { path: str, type: "viewbody", rendertype: e.data.rendertype, cls: e.data.cls, boardid: e.data.boardid };
            startBoardRequest(arg);
        } else if (type === "datform") {

            var info = {};
            info.dbpath = e.data.dbpath;
            info.code = e.data.code;
            info.brdid = e.data.brdid;
            info.fid = e.data.fid;
            info.uid = e.data.uid;
            info.dattype = e.data.dattype;
            console.log("$(#datform + e.data.uid)::" + $("#datform" + e.data.uid));
            $("#datform" + e.data.uid).empty();
            $("#datform" + e.data.uid).append(makeDatFormBox(info));
            console.log("e.target e.data.uid::" + e.data.uid);
            $("#" + e.data.uid).collapse('show');
        } else if (type === "datlist") {
            console.log("boardscript e.data.uid::" + e.data.uid);
            var str = "/view.board?code=" + e.data.code + "&page=" + e.data.page + "&uid=" + e.data.uid + "&dbpath=" + e.data.dbpath + "&brdid=" + e.data.brdid + "&";

            $("#reply" + e.data.uid).empty();

            $.ajax({
                url: str + ((/\?/).test(str) ? "&" : "?") + (new Date()).getTime(),
                async: false,
                type: "POST",
                // if(e.type != "open")
                data: formData,
                success: function (data) {
                    // 통신이 성공적으로 이루어졌을 때 이 함수를 타게 된다.
                    //alert("data" + data);
                    var xmlDoc = $.parseXML(data);

                    var err = $(xmlDoc).find('Msg').attr('error');
                    if (err != "ok") {
                        alert("error=" + err);
                        return;
                    }
                    //alert("postBoardCallAjax makeBoardList xmlDoc===" + xmlDoc);
                    $("#reply" + e.target.id).html(makeBoardList(xmlDoc, arg));

                    $("#reply" + e.data.uid).collapse('show');
                },
                complete: function (data) {
                    // 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.

                },
                error: function (xhr, status, error) {
                    alert("에러발생");
                },
                cache: false,
            });

        }


        //alert(str);
    };

    createDatMediaBoxView(info) {

        var $dat_media_box = $('<div class="d-flex border p-3">');
        var $datimg = $('<img onerror=\'this.src=images/ blank.gif\'" src="..." class="mr-3" alt="...">');
        var $datbody = $('<div class="media-body">');

        var $bodyhead = $('<div class="row justify-content-between">').text(info.subject);
        var str = info.id + " (" + info.signdate + ")";
        var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(str);
        var $head_right = $('<div class="mt-0">');
        $bodyhead.append($head_left).append($head_right);

        var $bodybody = $('<p>').html(info.comment);

        $datbody.append($bodyhead);
        $datbody.append($bodybody);

        $dat_media_box.append($datimg).append($datbody);

        var btn1 = $('<button type="button" class="btn btn-info" >👍</button>');
        var btn2 = $('<button type="button" class="btn btn-info" >👎</button>');

        //datinfo.customer_btn1 = btn1;
        $(btn1).bind("click", { type: "addpoint", formid: "datform", code: info.code, dbpath: info.dbpath, uid: info.uid, rendertype: info.rendertype, boardid: info.boardid }, datEventHandler);
        $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
        $(btn2).bind("click", { type: "minuspoint", formid: "datform", code: info.code, dbpath: info.dbpath, uid: info.uid, rendertype: info.rendertype, boardid: info.boardid }, datEventHandler);
        $(btn2).attr('style', 'cursor:pointer;cursor: hand;');

        $head_right.append(btn1).append(btn2);
        //}

        var $dat_nav = $('<nav class="navbar navbar-light bg-light">');
        var $dat_menu = $('<a class="navbar" data-bs-toggle="collapse" href="#reply' + info.uid + '" >');
        $dat_menu.bind("click", { type: "datlist", formid: "datform", code: info.code, dbpath: info.dbpath, uid: info.uid, rendertype: info.rendertype, boardid: info.boardid }, datEventHandler);
        $dat_menu.text("답글(" + info.datcount + ")");

        var $ul = $('<ul class="list-unstyled list-inline social text-right">');
        var $li1 = $('<li class="list-inline-item"><a  data-bs-toggle="collapse" href="#datform' + info.uid + '"><i class="fa fa-fw fa-pencil"></i></a></li>');
        $li1.bind("click", { type: "datform", formid: "datform", code: info.code, dbpath: info.dbpath, uid: info.uid, rendertype: info.rendertype, boardid: info.boardid }, datEventHandler);
        $li1.attr('style', 'cursor:pointer;cursor: hand;');
        var $li2 = $('<li class="list-inline-item"><a href="#datform' + info.uid + '"><i class="fa fa-fw fa-edit"></i></a></li>');
        var $li3 = $('<li class="list-inline-item"><a href="#' + info.uid + '"><i class="fa fa-fw fa-trash-o"></i></a></li>');
        $ul.append($li1).append($li2).append($li3);
        $dat_nav.append($dat_menu).append($ul);
        $datbody.append($dat_nav);

        var $collapse = $('<div class="collapse" id="datform' + info.uid + '">');
        //$collapse.attr("dbpath", info.dbpath).attr("code", info.code).attr("datuid", info.datuid).attr("fid", info.fid).attr("rendertype", info.rendertype);
        //$collapse.append('test collapse');
        $datbody.append($collapse);

        var $collapse2 = $('<div class="collapse" id="reply' + info.uid + '">');
        //$collapse2.attr("dbpath", info.dbpath).attr("code", info.code).attr("datuid", info.datuid).attr("fid", info.fid).attr("rendertype", info.rendertype);
        //$collapse2.append('test collapse');
        $datbody.append($collapse2);

        return $dat_media_box;
    };

    makeDatFormView(info) {

        console.log('makeDatFormBox');
        var datinfo = {};
        datinfo.rendertype = "general";
        datinfo.boxtype = "box-success box-solid";
        datinfo.titleicon = "";
        datinfo.title = "댓 글";
        datinfo.collapse_btn = "ok";

        var $datbox = $('<div>');

        var $datForm = $('<form id="datform" action="post.board" method="post" class="form-horizontal">');

        $datForm.append('<input type="hidden" name="code" value="' + info.code + '"  />');
        $datForm.append('<input type="hidden" name="dbpath" value="' + info.dbpath + '"  />');
        $datForm.append('<input type="hidden" name="posttype" value="datpost"  />');
        $datForm.append('<input type="hidden" name="brdid" value="' + info.brdid + '"  />');
        $datForm.append('<input type="hidden" name="uid" value="' + info.uid + '"  />');
        $datForm.append('<input type="hidden" name="datuid" value="' + info.datuid + '"  />');
        $datForm.append('<input type="hidden" name="dattype" value="' + info.dattype + '"  />');

        var $datLabel = $('<label for="subject" class="col-sm-2 control-label"></label>');
        var $datInput = $('<input type="text" name="subject" id="dat_subject" class="form-control" placeholder="subject">');
        var $formGroup = $('<div class="form-group">').append($datLabel).append($datInput);
        $datForm.append($formGroup);
        $datLabel = $('<label for="comment" class="col-sm-2 control-label"></label>');
        $datInput = $('<textarea cols="40" rows="18" name="comment" id="summernote" class="form-control jqte-edit" placeholder="내 용..." required="" autofocus="" type="text">');
        $formGroup = $('<div class="form-group">').append($datLabel).append($datInput);
        $datForm.append($formGroup);

        var btn1 = $('<button type="button" class="btn btn-info brdupdate" >댓글전송</button>');
        $(btn1).bind("click", { type: "datpost", formid: "#datform", code: info.code, dbpath: info.dbpath, brdid: info.brdid, uid: info.uid, datuid: info.datuid, rendertype: info.rendertype, boardid: info.boardid }, postBoardCallAjax);
        var $formitem = $('<div class="form-group">').append($(btn1));
        $datForm.append($formitem);

        $datbox.append($datForm);

        datinfo.comment = $datbox;

        return createBox(datinfo);
    };



    summernoteSetting(cmd) {
        var HelloButton = function (context) {
            var ui = $.summernote.ui;

            // create button
            var button = ui.button({
                contents: '<i class="fa fa-envelope"></i> Hello',
                tooltip: 'hello',
                click: function () {
                    //alert("node");
                    //var node = document.createElement('div');
                    //node.appendChild(document.createTextNode("abc"));
                    //var node = $('<div>');
                    //node.text('abcdefghijk');
                    //***
                    var tinfo = {};
                    tinfo.dragok = "ok";
                    tinfo.boxtype = "box-default box-solid";
                    tinfo.rendertype = "general";
                    //tinfo.remove_btn = "ok";
                    tinfo.collapse_btn = "ok";
                    var node = createBox(tinfo);
                    // alert("node");
                    ///***/
                    $('#summernote').summernote('insertNode', node[0]);
                    // invoke insertText method with 'hello' on editor module.
                    context.invoke('editor.insertText', 'hello');

                    $('#summernote').summernote('insertNode', $('<div>abchhhhhhhhhhhhhhhdefg</div>')[0]);
                    //return;
                }
            });

            return button.render();   // return button as jquery object
        };
        var self = this;
        $('.summernote').summernote({
            toolbar: [
                ['mybutton', ['hello']],
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video', 'hr']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
            ],
            buttons: {
                hello: HelloButton
            },
            height: 300,
            minHeight: null,
            maxHeight: null,
            focus: true,
            callbacks: {
                onImageUpload: function (files, editor, welEditable) {
                    for (var i = files.length - 1; i >= 0; i--) {
                        self.summernoteSendFile(files[i], this);
                    }
                }
            }
        });
        //alert('summernote setting');
    };

    summernoteSendFile(file, el) {
        var upurl = "upload.file?code=" + code + "&filetype=" + filetype + "&dbpath=" + dbpath + "&dbin=ok";
        var form_data = new FormData();
        form_data.append('file', file);
        $.ajax({
            data: form_data,
            type: "POST",
            url: upurl,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            processData: false,
            success: function (data) {
                //alert(data);
                var xmlDoc = $.parseXML(data);
                //alert("data: " + data);
                var err = $(xmlDoc).find('Msg').attr('error');
                if (err != "ok") {
                    alert(err);
                    return;
                }
                var code = $(xmlDoc).find('Msg').attr('code');
                var filename = $(xmlDoc).find('Msg').attr('filename');

                var filetype = $(xmlDoc).find('Msg').attr('filetype');
                var dbuid = $(xmlDoc).find('Msg').attr('dbuid');
                var arr;
                if (dbuid)
                    arr = dbuid.split(';');
                else
                    arr = filename.split(';');
                var imgurl = "download.file?code=" + code + "&type=open&filetype=" + filetype + "&dbpath=" + dbpath + "&filename=" + arr[0] + "&dbuid=" + arr[0] + "&dbinok";
                $(el).summernote('editor.insertImage', imgurl);
                $('#imageBoard > ul').append('<li><img src="' + imgurl + '" width="480" height="auto"/></li>');
            }
        });
    };

    createBoardFormView(arg, eventHandler) {

        //alert("createBoardWriteBox(info) info.rendertype" + info.rendertype + "info.fid" + info.fid);

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
        $writeForm.append('<input type="hidden" name="thread" value="' + arg.thread + '"  />');

        var $writeLabel = $('<label for="subject" class="col-sm-2 control-label"></label>');
        var $writeInput = $('<input type="text" name="subject" class="form-control" placeholder="subject">').val(arg.subject);
        var $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);
        $writeLabel = $('<label for="comment" class="col-sm-4 control-label"></label>').text('내용');
        $writeInput = $('<textarea cols="40" rows="18" name="comment" id="summernote" class="form-control summernote" placeholder="내 용..." required="" autofocus="" type="text">').val(arg.comment);
        $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);


        var btn1 = $('<button type="button" class="btn btn-info brdupdate" >전송</button>');
        $(btn1).bind("click", { type: 'post', formid: 'boardpostform', arg: arg }, eventHandler);
        var $formitem = $('<div class="form-group">').append($(btn1));
        $writeForm.append($formitem);
        $writebox.append($writeForm);

        writeinfo.comment = $writebox;
        var b = new CardView();
        var $box = b.createCardView(writeinfo);

        //this.summernoteSetting(arg.comment);
        return $writebox;
        //return $box;
    };

    toString() {

        return this.tostring;
    }
}

class PollController extends BoardAjaxBase {

    constructor(renderinfo) {
        super();

        this.$parent = renderinfo.$parent;
        var type = renderinfo.type;
        var dbpath = renderinfo.dbpath;
        var str;
        if(type == 'polllist')
            var str = `/polllist.poll?dbpath=${dbpath}&utf8=ok&`;
        else if (type == 'pollview')
            str = `/pollview.poll?dbpath=${dbpath}&uid=${renderinfo.uid}&fid=${renderinfo.fid}&utf8=ok&`;
        
        var arg = {};
        arg.dbpath = renderinfo.dbpath;
        arg.code = renderinfo.code;
        arg.renderinfo = renderinfo;
        arg.type = renderinfo.type;
        arg.code = renderinfo.code;
        arg.path = str;
        arg.self = this;
        this.arg = arg;
    }

    pollList(arg) {
        arg.self = this;
        this.startBoardRequest(arg);
    }

    renderController(elem) {
        this.arg.self = this;
        this.arg.elem = elem;
        this.startBoardRequest(this.arg);
        console.log(`this.arg.type=`, this.arg.type);
        console.log(`this.arg.path=`, this.arg.path);
    }

    makePollList(xmlDoc, arg) {
        arg.self = this;
        //console.log(`arg.self.startBoardRequest==${arg.self.startBoardRequest}`);
        var info = this.getInfoPollList(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};

        if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
            arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        } else {
            arg.renderinfo.renderview = new KeyValueView();
            arg.renderinfo.renderview.createList(info, arg, this.eventHandler);
        }

        if (this.loginView == null)
            this.loginView = new LoginView();
        this.loginView.createList(info, arg, this.eventHandler);
    }

    makePollView(xmlDoc, arg) {
        arg.self = this;
        console.log(`arg.renderview==${arg.renderview}`);
        var info = this.getInfoPollList(xmlDoc, arg);
        if (info == null || info == undefined)
            info = {};

        if (arg.renderview)
            arg.renderview.createPollView(info, arg, this.eventHandler);

        if (arg.renderinfo.viewbody && typeof arg.renderinfo.viewbody === "string") {
            arg.renderinfo.viewbody = eval("new " + arg.renderinfo.viewbody + "()");
            arg.renderinfo.viewbody.createPollView(info, arg, this.eventHandler);
        } else if (arg.renderinfo.viewbody && typeof arg.renderinfo.viewbody === "object") {
            arg.renderinfo.viewbody.createPollView(info, arg, this.eventHandler);
        } else {
            if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "string") {
                arg.renderinfo.renderview = eval("new " + arg.renderinfo.renderview + "()");
                arg.renderinfo.renderview.createPollView(info, arg, this.eventHandler);
            } else if (arg.renderinfo.renderview && typeof arg.renderinfo.renderview === "object") {
                arg.renderinfo.renderview.createPollView(info, arg, this.eventHandler);
            }
        }
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var self = e.data.self;
        var type = e.data.type;
        //console.log(`eventHandler(e) arg.self.startBoardRequest==${arg.self.startBoardRequest}`);
        if (type == 'pollrecord') {
            var str = `/pollview.poll?code=${arg.code}&dbpath=${arg.dbpath}&uid=${info.uid}&fid=${info.fid}&utf8=ok&`;
            console.log("eventHandler(e) str == " + str);
            var arg2 = { path: str, type: "pollview", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, rendertype: arg.rendertype, self: this };
            arg.self.startBoardRequest(arg2);
        } else if (type == 'pollupdate') {
            var str = `/pollupdate.poll?code=${arg.code}&dbpath=${arg.dbpath}&uid=${info.uid}&fid=${info.fid}&utf8=ok&`;
            console.log(`pollupdate str==${str}`);
            var arg2 = { path: str, type: "pollview", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, rendertype: arg.rendertype, self: this };
            arg.self.startBoardRequest(arg2);
        } else if (type == 'pollmake' || type == 'pollwrite') {
            console.log(`pollmake eventhandle`);
            __modal.show('설문만들기', e.data.self.createPollMakeView(info, arg, arg.self.eventHandler));
        } else if (arg.type == 'pollmakesubmit') {

        } else if (type == 'find') {
            var keyfield = $("#findform option:selected").val();
            var key = $("#findform input[name=key]").val();
            if (keyfield == "subject" || keyfield == "comment")
                key = Base64.encode(key);
            //alert("keyfield== " + keyfield + "key==" + key);
            //return;
            var str = "/list.board?code=" + arg.code + "&page=" + e.data.page + "&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&keyfield=" + keyfield + "&key=" + key + "&";
            var arg = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, rendertype: arg.rendertype, self: arg.self };
            self.startBoardRequest(arg);
        } else if (type == 'pollpage') {

            var str = "/polllist.poll?code=" + arg.code + "&page=" + e.data.page + "&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&";
            var arg = { path: str, type: "polllist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, rendertype: arg.rendertype, self: arg.self };
            console.log("eventHandler(e) str == " + str);
            self.startBoardRequest(arg);
        }
    }

    serializeLay() {
        var info = { classname: this.constructor.name };
        info.renderinfo = this.arg.renderinfo;
        info.ltype = 'Poll';

        return info;
    }

    deSerializeLay(info) {

    }
}
