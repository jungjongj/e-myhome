class ViewBase {

    constructor(dbpath, code) {
        
    }

    renderController() {
        
    }

    createList(info, arg, eventHandler) {
        alert('createList 메소드를 구현해야됩니다');
    }

    createGroupList(info, arg, eventHandler) {
        alert('createGroupList 메소드를 구현해야됩니다');
    }

    createViewbody(info, arg, eventHandler) {
        alert('createViewbody 메소드를 구현해야됩니다');
    }

    eventHandler(event) {
        
    }
}

class MainLayout {

    constructor() {
        //console.log(`this.controls.length==${this.controls.length}`);
        this.controls = [];
    }

    renderController(elem) {
        if (!elem)
            elem = document.body;
        //console.log(`this.controls.length==${this.controls.length}`);
        for (var i = 0; i < this.controls.length; i++) {
            var temp = document.createElement('div');
            temp.classList.add('home_edit_mode');
            //if ( temp.classList.contains( "anotherClass" ) )
            //temp.classList.remove( "yetAClass", "moreClasses" );
            $(elem).append(temp);
            //console.log(`this.controls.length22==${this.controls.length}`);
            if (this.controls[i].renderController) {

                this.controls[i].renderController(temp);
                //console.log(`this.controls[i]==`, this.controls[i]);
            }
            else
                $(temp).append(this.controls[i]);
        }
    }

    setConfig(config) {
        this.dbpath = config.dbpath;
        this.code = config.code;
    }

    addControl(control) {

        this.controls.push(control);
    }

    serializeLay() {
        var info = { classname: this.constructor.name, ltype: 'MainLayoutEx', controls: [] };
        info.dbpath = this.dbpath;
        info.code = this.code;
        //console.log(`this.controls.length=${this.controls.length}`);
        for (var i = 0; i < this.controls.length; i++) {
            var c = this.controls[i];
            info.controls[i] = c.serializeLay();
        }

        return info;
    }

    deSerializeLay(info) {

        console.log('info.controls=', info.controls);
        if (info.controls) {
            for (var i = 0; i < info.controls.length; i++) {
                var ininfo = info.controls[i];
                if (ininfo.controls) {
                    var clsname = '';
                    if (ininfo.classname.endsWith('Ex'))
                        clsname = ininfo.classname.slice(0, -2);
                    else
                        clsname = ininfo.classname;
                    var cls = eval(`new ${clsname}();`);
                    console.log('cls=', cls);
                    cls.deSerializeLay(ininfo);
                    //console.log('ininfo.controls=', ininfo.controls);
                    this.controls[i] = cls;
                } else {
                    var config = ininfo.renderinfo;
                    if (ininfo.classname && ininfo.renderinfo) {
                        var cls = eval(`new ${ininfo.classname}(config);`);
                        //console.log(`cls=`, cls);
                        this.controls[i] = cls;
                    } else {
                        var clsname = '';
                        if (ininfo.classname.endsWith('Ex'))
                            clsname = ininfo.classname.slice(0, -2);
                        else
                            clsname = ininfo.classname;
                        var cls = eval(`new ${clsname}();`);
                        //console.log(`cls=`, cls);
                        this.controls[i] = cls;
                    }
                }

            }
        } else {
            var config = info.renderinfo;
            if (info.classname && info.renderinfo) {
                var cls = eval(`new ${info.classname}(config);`);
                //console.log(`cls=`, cls);
                this.controls[i] = cls;
            }
        }

    }
}

class HorizontalLayout {

    constructor() {
        this.controls = [];
    }

    renderController(elem) {
        console.log(`HorizontalLayout this.controls.length==${this.controls.length}`);
        var $temp = $(`<div class="row">`);
        $(elem).append($temp);
        for (var i = 0; i < this.controls.length; i++) {
            var c = this.controls[i];
           
            //console.log(`c[1]==${c[1]}`);
            //console.log(`c[0]==${c[0]}`);
            var divElem = $(`<div>`);
            var divElem2 = $(`<div>`).addClass(`col-md-${c[1]}`);
            divElem2.append(divElem);
            $temp.append(divElem2);
            //console.log(`c[0].renderController==${c[0].renderController}`);
            if (c[0].renderController) {
                c[0].renderController(divElem);
                //console.log(`divElem2.parent().html()==${divElem2.parent().html() }`);
            }
            else {
                $(divElem).append(c[0]);
            }

        }
       // console.log(`HorizontalLayout $temp.html()=${$temp.parent().html()}`);
    }

    setControl() {
        this.controls = Array.prototype.slice.call(arguments);
        //console.log(this.columns);
    }

    addControl(controlArr) {

        this.controls.push(controlArr);
    }

    serializeLay() {
        var info = { classname: this.constructor.name, ltype: 'HorizontalLayoutEx', controls: [] };
        for (var i = 0; i < this.controls.length; i++) {
            var c = this.controls[i];
            var arr = [];
            arr[0] = c[0].serializeLay();
            arr[1] = c[1];
            info.controls[i] = arr;
        }

        return info;
    }

    deSerializeLay(info) {

        if (info.controls) {
            for (var i = 0; i < info.controls.length; i++) {
                var arr = info.controls[i];
                var ininfo = arr[0];
                var col = arr[1];
                if (!ininfo.controls) {
                    if (ininfo.renderinfo) {
                        var config = ininfo.renderinfo;
                        var cls = eval(`new ${ininfo.classname}(config);`);
                        console.log(`cls=`, cls);
                        this.controls[i] = [cls, col];
                    } else {
                        var clsname = '';
                        if (ininfo.classname.endsWith('Ex'))
                            clsname = ininfo.classname.slice(0, -2);
                        else
                            clsname = ininfo.classname;
                        var cls = eval(`new ${clsname}();`);
                        console.log(`cls=`, cls);
                        this.controls[i] = [cls, col];
                    }
                } else {
                    var clsname = '';
                    if (ininfo.classname.endsWith('Ex'))
                        clsname = ininfo.classname.slice(0, -2);
                    else
                        clsname = ininfo.classname;
                    var cls = eval(`new ${clsname}();`);
                    cls.deSerializeLay(ininfo);
                    this.controls[i] = [cls, col];
                    console.log(`cls=`, cls);
                }

            }
        } else {
            var config = info.renderinfo;
            if (info.classname && info.renderinfo) {
                var cls = eval(`new ${info.classname}(config);`);
                //console.log(`cls=`, cls);
                this.controls[i] = [cls, col];
            }
        }
    }

}

class VerticalLayout  {

    constructor() {
        this.controls = [];
    }

    renderController(elem) {
        // console.log('VerticalLayout this.controls.length=' + this.controls.length);
        for (var i = 0; i < this.controls.length; i++) {
            var temp = document.createElement('div');
            $(elem).append(temp);
            //console.log(`this.controls[i].constructor.name=`, this.controls[i].constructor.name);
            //console.log(`this.controls[i]=`, this.controls[i]);
            if (this.controls[i].renderController) {
                //console.log(`this.controls[i].arg=`, this.controls[i].arg);
                this.controls[i].renderController(temp);
                //console.log(`this.controls[i].constructor.name=`, this.controls[i].constructor.name);
                //console.log(`this.controls[i]=`, this.controls[i]);/
            }
            else {
                //console.log(`this.controls[i].constructor.name=`, this.controls[i].constructor.name);
                $(temp).append(this.controls[i]);
            }

        }
    }

    addControl(control) {

        this.controls.push(control);
    }

    serializeLay() {
        var info = { classname: this.constructor.name, ltype: 'VerticalLayoutEx', controls: [] };
        for (var i = 0; i < this.controls.length; i++) {
            var c = this.controls[i];
            info.controls[i] = c.serializeLay();
            //console.log(`serializeLay() type=`, info.ltype);
        }

        return info;
    }

    deSerializeLay(info) {
        console.log(`info.controls=`, info.controls);
        if (info.controls) {
            for (var i = 0; i < info.controls.length; i++) {
                var ininfo = info.controls[i];
                console.log(`ininfo=`, ininfo);
                var cls = null;
                if (!ininfo.controls) {
                    if (ininfo.renderinfo) {
                        var config = ininfo.renderinfo;
                        var cls = eval(`new ${ininfo.classname}(config);`);
                        //console.log(`cls=`, cls);
                        this.controls[i] = cls;
                    } else {
                        var clsname = '';
                        if (ininfo.classname.endsWith('Ex'))
                            clsname = ininfo.classname.slice(0, -2);
                        else
                            clsname = ininfo.classname;
                        var cls = eval(`new ${clsname}();`);
                        console.log(`cls=`, cls);
                        this.controls[i] = cls;
                    }
                } else {
                    var clsname = '';
                    if (ininfo.classname.endsWith('Ex'))
                        clsname = ininfo.classname.slice(0, -2);
                    else
                        clsname = ininfo.classname;
                    var cls = eval(`new ${clsname}();`);
                    cls.deSerializeLay(ininfo);
                    this.controls[i] = cls;
                }

            }
        } else {
            var config = info.renderinfo;
            if (info.classname && info.renderinfo) {
                var cls = eval(`new ${info.classname}(config);`);
                //console.log(`cls=`, cls);
                this.controls[i] = cls;
            }
        }

    }
}

class ModuleLoader {

    constructor(renderinfo) {
        self = this;
        this.arg = {};
        this.arg.renderinfo = renderinfo;
    }

    renderController(elem) {
        this.arg.renderinfo.elem = elem;
        if (this.arg.renderinfo && this.arg.renderinfo.type == 'dbmodule')
            this.loadDbModule();
        else if (this.arg.renderinfo && this.arg.renderinfo.type == 'filemodule')
            this.loadFileModule();
        else
            this.setModuleData(this.arg.renderinfo.data);
    }

    setModuleData(data) {
        var self = this;
        //console.log('data=', data);
        this.arg.renderinfo.data = data;
        $(this.arg.renderinfo.elem).html(data);
    }

    loadDbModule() {

        var self = this;
        //console.log('loaddb1111');
        //console.log('self=', self);
        fetch(self.arg.renderinfo.path)
            .then((response) => response.text())
            .then(data => {
                var xmlDoc = $.parseXML(data);
                var err = $(xmlDoc).find('Msg').attr('error');
                if (err != "ok") {
                    alert(err);
                    return;
                }
                $(xmlDoc).find('Records').each(function (index) {
                    var did = $(this).find('did').text();
                    if (did != -7) {
                        var data = $(this).find('info').text();
                        //console.log('loaddb222');
                        //console.log('self=', self);
                        self.setModuleData(data);
                    }

                });
            })// 에러처리
            .catch(() => {
                console.log('에러')
            });

    }

    loadFileModule() {

        var self = this;
        //console.log('loadFileFab()');
        //console.log('self=', self);
        fetch(self.arg.renderinfo.path)
            .then((response) => response.text())
            .then(data => {
                //console.log('loadFileFab=');
                //console.log('self=', self);
                //console.log('arg.arg.$parent=', arg.arg.$parent);
                self.setModuleData(data);
            })// 에러처리
            .catch(() => {
                console.log('에러')
            });

    }

    loadLocalFile() {
        $$('ajaxFile1').onchange = function (e) {
            var reader = new FileReader();
            reader.onload = function (event) {
                //console.log(self.canvas);

                var json = JSON.parse(event.target.result);

            }
            //reader.readAsDataURL(e.target.files[0]);
            reader.readAsText(e.target.files[0], /* optional */ "UTF-8");
        };

    }

    serializeLay() {
        var info = { classname: this.constructor.name };
        info.renderinfo = this.arg.renderinfo;
        info.ltype = '_codemodule';

        return info;
    }

    deSerializeLay(info) {

    }
}

class DaWebLoader {
    constructor(renderinfo) {
        self = this;
        this.arg = {};
        this.arg.renderinfo = renderinfo;
    }

    renderController(elem) {
        console.log('this.arg.renderinfo.type=', this.arg.renderinfo.type);
        this.arg.renderinfo.elem = elem;
        if (this.arg.renderinfo && this.arg.renderinfo.type == 'dbweb')
            this.loadDbHomepage();
        else
            this.loadFileHomepage();
    }

    createList(info2, arg, eventHandler) {
        //console.log(`arg.renderinfo.editmode==${arg.renderinfo.editmode}`);
        var self = this;
        this.arg = arg;

        this.rendertypeselValue = arg.rendertype;
        var info;
        var arrarr = info2.arrarr;

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                info = arrarr[i];
                if (info.did == -7)
                    continue;
                //console.log(`info.key==${info.key}`);
                //console.log(`info.info==${info.info}`);
                self.setHomepageData(info.info);
            }
        }
        return info.info;
    }

    setHomepageData(data) {
        var self = this;

        var json = JSON.parse(data);
        //console.log('this.arg.renderinfo.type=', this.arg.renderinfo.type);
        this.mainLayout = new MainLayout();
        this.mainLayout.deSerializeLay(json);
        this.mainLayout.renderController(this.arg.renderinfo.elem);

        //var ele = document.createElement('div');
        //document.body.appendChild(ele);
        //this.mainLayout.renderController(ele);

        //var f = new FullScreenView();
        // f.setContent('preview', ele);
    }

    loadDbHomepage() {

        var self = this;
        console.log('loaddb1111');
        //console.log('self=', self);
        fetch(self.arg.renderinfo.path)
            .then((response) => response.text())
            .then(data => {
                var xmlDoc = $.parseXML(data);
                var err = $(xmlDoc).find('Msg').attr('error');
                if (err != "ok") {
                    alert(err);
                    return;
                }
                $(xmlDoc).find('Records').each(function (index) {
                    var did = $(this).find('did').text();
                    if (did != -7) {
                        var fabdata = $(this).find('info').text();
                        //console.log('loaddb222');
                        //console.log('self=', self);
                        self.setHomepageData(fabdata);
                    }

                });
            })// 에러처리
            .catch(() => {
                console.log('에러')
            });

        // prevent default posting of form
        event.preventDefault();
    }

    loadFileHomepage() {

        var self = this;
        console.log('self.arg.renderinfo.url=', self.arg.renderinfo.url);
        //console.log('self=', self);
        fetch(self.arg.renderinfo.path)
            .then((response) => response.text())
            .then(data => {
                //console.log('loadFileFab=');
                //console.log('self=', self);
                //console.log('arg.arg.$parent=', arg.arg.$parent);
                self.setHomepageData(data);
            })// 에러처리
            .catch(() => {
                console.log('에러')
            });

        // prevent default posting of form
        event.preventDefault();
    }

    loadLocalHomepage() {
        $$('ajaxFile1').onchange = function (e) {
            var reader = new FileReader();
            reader.onload = function (event) {

                var json = JSON.parse(event.target.result);

            }
            //reader.readAsDataURL(e.target.files[0]);
            reader.readAsText(e.target.files[0], /* optional */ "UTF-8");
        };

    }

    serializeLay() {
        var info = { classname: this.constructor.name };
        info.renderinfo = this.arg.renderinfo;
        info.ltype = 'HomepageMakerLoader';

        return info;
    }

    deSerializeLay(info) {

    }
}

class KeyvalueModuleViewBase {

    constructor() {
        var el = document.createElement("div");
        var ul = $('<ul id="keyvalueContextMenu" class="dropdown- menu" role="menu" style="display:none">');
        var li1 = $('<li style="list-style:none"><a tabindex="-1" href="#">서브아이템추가</a></li>');
        var li2 = $('<li style="list-style:none"><a tabindex="-1" href="#">수정</a></li>');
        var li3 = $('<li style="list-style:none"><a tabindex="-1" href="#">삭제</a></li>');
        ul.append(li1).append(li2).append(li3);
        $(el).append(ul);
        $('body').append($(el));
    }

    renderController() {

    }

    createList(info, arg, eventHandler) {
        alert('createList 메소드를 구현해야됩니다');
    }

    createGroupList(info, arg, eventHandler) {
        alert('createGroupList 메소드를 구현해야됩니다');
    }

    createViewbody(info, arg, eventHandler) {
        alert('createViewbody 메소드를 구현해야됩니다');
    }

    eventHandler(event) {

    }

    setKeyvalueEditContextMenu(id) {
        //console.log('setKeyvalueEditContextMenu id=4444447777777777' + id);
        var self = this;
        $(id).contextMenu({
            selector: '.left',
            trigger: 'left',
            menuSelector: "#keyvalueContextMenu",
            menuSelected: function (invokedOn, selectedMenu) {
                //alert("invokedOn.text()" + invokedOn.text());
                var ip = invokedOn.attr('ip');
                var loginid = invokedOn.attr('loginid');
                //var id = invokedOn.attr('id');
                var id = invokedOn.text();

                if (selectedMenu.text() == "서브아이템추가") {
                    __modal.show('서브키추가', self.createKeyvalueForm());
                    $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

                    var form = document.getElementById("keyvalueForm");
                    console.log(self.arg.kcode);
                    form.dbpath.value = self.arg.dbpath;
                    form.kcode.value = invokedOn.attr('kcode');
                    form.kname.value = invokedOn.attr('kname');
                    form.uid.value = invokedOn.attr('uid');
                    form.fid.value = invokedOn.attr('uid');
                    form.did.value = invokedOn.attr('uid');
                    form.type.value = 'subadd';
                    $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: null, arg: self.arg }, self.eventHandler);

                } else if (selectedMenu.text() == "수정") {
                    __modal.show('수정', self.createKeyvalueForm());
                    $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

                    var form = document.getElementById("keyvalueForm");

                    form.dbpath.value = self.arg.dbpath;
                    form.kcode.value = invokedOn.attr('kcode');
                    form.kname.value = invokedOn.attr('kname');
                    form.uid.value = invokedOn.attr('uid');
                    form.fid.value = invokedOn.attr('uid');
                    form.did.value = invokedOn.attr('uid');
                    form.key.value = invokedOn.attr('key');
                    form.value.value = invokedOn.attr('value');
                    form.info.value = invokedOn.attr('info');
                    form.type.value = 'update';
                    $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: null, arg: self.arg }, self.eventHandler);
                }
                else if (selectedMenu.text() == "삭제") {
                    if (!confirm(`${invokedOn.attr('key') } 키 설정을 삭제합니다`)) {
                        // 취소(아니오) 버튼 클릭 시 이벤트
                        return;
                    }

                    var str = `/mankeyvalue.adm?dbpath=${self.arg.dbpath}&kcode=${invokedOn.attr('kcode')}&kname=${invokedOn.attr('kname') }&utf8=ok&`;
                    console.log(str);
                    //var arg2 = { path: str, type: "keyvalue", dbpath: arg.dbpath, elem: arg.elem, self: arg.self };
                    var form = document.getElementById("keyvalueDeleteForm");
                    if (form == null) {
                        $('body').append(self.createKeyvalueDeleteForm());
                        form = document.getElementById("keyvalueDeleteForm");
                    }

                    form.dbpath.value = self.arg.dbpath;
                    form.kcode.value = invokedOn.attr('kcode');
                    form.kname.value = invokedOn.attr('kname');
                    form.uid.value = invokedOn.attr('uid');
                    form.fid.value = invokedOn.attr('uid');
                    form.did.value = invokedOn.attr('uid');
                    form.type.value = 'del';
                    self.arg.form = form;
                    var formData = $(form).serializeArray();
                    self.arg.formData = formData;

                    self.arg.self.postAjax(self.arg);
                }
                
            }
        });

    }
}

class MemberNetworkView extends ViewBase {
    constructor() {
        super();
        
    }

    eventHandler(e) {
        //console.log("eventHandler(e) type =33333333333= ");
        var info = e.data.info;
        var arg = e.data.arg;
        var self = arg.self;
        var type = e.data.type;

        console.log('type*****=' + type);
        if (type == 'contactsrecord') {
            //console.log("eventHandler(e)============= str == " + str);
            //__fullscreenView.setContent(arg.elem);
            //__fullscreenView.fullscreen('fullscreenwin');
            var str = "/contactsdata.contacts?page=" + arg.page + "&contactid=" + info.contact_id + "&fid=" + info.fid + "&utf8=ok&";
            //console.log("eventHandler(e) boardlist ============= str == " + str);
            console.log('eventHandler(e) arg.renderinfo 222====' + arg.renderinfo);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "contactsdata";
            arg.self.listAjax(arg);
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        } else if (type == 'grouprecord') {
            //console.log("eventHandler(e)============= str == " + str);
            //__fullscreenView.setContent(arg.elem);
            //__fullscreenView.fullscreen('fullscreenwin');
            
            var str = "/groupmemlist.contacts?page=" + arg.page + "&groupid=" + info.groupid + "&fid=" + info.fid + "&utf8=ok&";
            console.log('eventHandler(e) str===' + str);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'groupmemlist';
            arg.self.listAjax(arg);
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        } else if (type == 'smsrecord') {
            //console.log("eventHandler(e)============= str == " + str);
            //__fullscreenView.setContent(arg.elem);
            //__fullscreenView.fullscreen('fullscreenwin');

            str = "/smslist.contacts?findType=" + 0 + "&phoneNum=" + info.address + "&utf8=ok&";
            console.log('eventHandler(e) str===' + str);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'smslist';
            arg.self.listAjax(arg);
            //alert("item[j]==code==" + e.data.code + " boardid==" + e.data.boardid + "  boardtype==" + e.data.boardtype);
        } else if (type == 'memberrecord') {
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
        } else if (type == 'boardlist' || type == 'more' || type == 'menuclick') {
            console.log("eventHandler type  == " + type);
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

        } else if (type == 'threadclick') {
            $(this).parent().children().each(function () {
                $(this).removeClass("active");

            });
            $(this).addClass("active");

            if (arg.threadtab) {

            }
            __modal.show('Loading', '<div></div>');
            console.log("e.data.threadinfo.key== " + e.data.threadinfo.key);
            console.log("e.data.threadinfo.value== " + e.data.threadinfo.value);
            var str;
            if (e.data.threadinfo.value == 'contactsgroup') {
                arg.type = 'contactsgroup';
                str = "/contactsgroup.contacts?page=" + arg.page + "&contactid=" + e.data.threadinfo.value + "&utf8=ok&";
            }
            else if (e.data.threadinfo.value == 'smslist') {
                arg.type = 'smslist';
                str = "/smslist.contacts?page=" + arg.page + "&contactid=" + e.data.threadinfo.value + "&utf8=ok&";
            }
            else if (e.data.threadinfo.value == 'contactslist') {
                arg.type = 'contactslist';
                str = "/contactslist.contacts?page=" + arg.page + "&contactid=" + e.data.threadinfo.value + "&utf8=ok&";
            } else if (e.data.threadinfo.value == 'callstate') {
                arg.type = 'callstate';
                str = "/callstate.contacts?page=" + arg.page + "&contactid=" + e.data.threadinfo.value + "&utf8=ok&";
            }
            console.log("str== " + str);
            
            arg.path = str;
            //var arg = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.self.listAjax(arg);
        }
    }

    createThreadTabMenu(info7, arg, eventHandler) {
        var $tabMenuE = null;
        var $tabelem = arg.$tabelem;
        var cnt = 0;
        var $tabs_wrap = $('<div class="tabs_wrap">');
        var $tree = $('<ul>');
        $tabs_wrap.append($tree);
        var $treeItem = null, $treeItemIn = null;
        $tabMenuE = $('<div class="tabwrapper">');
        $tabMenuE.append($tabs_wrap);
        var thread;
        var arrarr = arg.renderinfo.tabthread;
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                if (arr && arr.length > 0) {

                    var info2 = arr[i];

                    $treeItem = $('<li>').append(info.key);
                    if (arg.type == info.value) {
                        $treeItem.addClass('active');
                        thread = info.key;
                    }

                    $treeItem.bind("click", { type: 'threadclick', self: this, threadinfo: info, arg: arg }, this.eventHandler);

                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                } else {

                    $treeItem = $('<li>').append(info.key);
                    if (arg.type == info.value) {
                        $treeItem.addClass('active');
                        thread = info.key;
                    }
                    $treeItem.bind("click", { type: 'threadclick', self: this, threadinfo: info, arg: arg }, this.eventHandler)

                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                }
            }

        }

        //$($tabelem).empty();
        $($tabelem).append($tabMenuE);

        return $tabMenuE;
    }

    createContactsData(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var $listView = $('<div>');
        var $list = $('<ul class="tree list-group">');
        var $listItem = null, $treeItemIn = null;
        $listView.append($list);

        console.log(`createContactsData arrarr.length=${arrarr.length}`);
        if (arrarr && arrarr.length >= 0) {
            for (var k = 0; k < arrarr.length; k++) {
                //cnt++;
                var info = arrarr[k];
                var arr = arrarr[k].arr;

                var $box = $('<div >');

                if (info.photo_blob) {
                    console.log(`createContactsData info.photo_blob2=`);
                    //const img2 = new Image();
                    //img2.src = `data:image/png;base64,<%= ${info.photo_blob} `;
                    var $img = $(`<img src="data:image/png;base64,${info.photo_blob}" onerror="onImgError(this);" class="mr-3" imgtype="media" >`);
                    var $item1 = $('<div ></div>');
                    var $item2 = $('<div >').append($img);
                    $box.append($item1).append($item2);
                    console.log(`createContactsData info.photo_blob2=`);
                }

                if (info.tel) {
                    console.log(`createContactsData info.tel.length=${info.tel.length}`);
                    
                    for (var i = 0; i < info.tel.length; i++) {
                        var $item1;
                        if (info.tel[i].type == 1)
                            $item1 = $('<div >').text("집");
                        else if (info.tel[i].type == 2)
                            $item1 = $('<div >').text("휴대폰");
                        else if (info.tel[i].type == 3)
                            $item1 = $('<div >').text("회사");
                        else if (info.tel[i].type == 4)
                            $item1 = $('<div >').text("팩스");
                        else
                            $item1 = $('<div >').text("");
                        var $item2 = $('<div >').text(info.tel[i].phonenum);
                        $box.append($item1).append($item2);
                    }
                    
                } else if (info.email) {
                    console.log(`createContactsData info.email.length=${info.email.length}`);
                    
                    for (var i = 0; i < info.email.length; i++) {
                        var $item1;
                        if (info.email[i].type == 1)
                            $item1 = $('<div >').text("업무");
                        else if (info.email[i].type == 2)
                            $item1 = $('<div >').text("개인");
                        else if (info.email[i].type == 3)
                            $item1 = $('<div >').text("");
                        var $item2 = $('<div >').text(info.email[i].email);
                        $box.append($item1).append($item2);
                    }
                } else if (info.addr) {
                    console.log(`createContactsData info.addr.length=${info.addr.length}`);
                    
                    for (var i = 0; i < info.addr.length; i++) {
                        var $item1;
                        if (info.addr[i].type == 1)
                            $item1 = $('<div >').text("집");
                        else if (info.addr[i].type == 2)
                            $item1 = $('<div >').text("회사");
                        else if (info.addr[i].type == 3)
                            $item1 = $('<div >').text("");
                        var $item2 = $('<div >').text(info.addr[i].addr);
                        $box.append($item1).append($item2);
                    }
                    
                } else if (info.note) {
                    console.log(`createContactsData info.note.length=${info.note.length}`);

                    for (var i = 0; i < info.note.length; i++) {
                        var $item1;
                        if (info.note[i].type == 1)
                            $item1 = $('<div >').text("메모");
                        else if (info.note[i].type == 2)
                            $item1 = $('<div >').text("메모");
                        else
                            $item1 = $('<div >').text("메모");
                        var $item2 = $('<div >').text(info.note[i].note);
                        $box.append($item1).append($item2);
                    }

                } else if (info.web) {
                    console.log(`createContactsData info.web.length=${info.web.length}`);

                    for (var i = 0; i < info.web.length; i++) {
                        var $item1;
                        if (info.web[i].type == 1)
                            $item1 = $('<div >').text("1");
                        else if (info.web[i].type == 2)
                            $item1 = $('<div >').text("2");
                        else
                            $item1 = $('<div >').text("웹");
                        var $item2 = $('<div >').text(info.web[i].web);
                        $box.append($item1).append($item2);
                    }

                } else if (info.company) {
                    console.log(`createContactsData info.company.length=${info.company.length}`);

                    for (var i = 0; i < info.company.length; i++) {
                        var $item1;
                        if (info.company[i].type == 1)
                            $item1 = $('<div >').text("1");
                        else if (info.company[i].type == 2)
                            $item1 = $('<div >').text("2");
                        else
                            $item1 = $('<div >').text("웹");
                        var $item2 = $('<div >').text(info.company[i].company);
                        $box.append($item1).append($item2);
                    }

                } else if (info.data) {
                    for (var i = 0; i < info.data.length; i++) {
                        var $item1 = $('<div >').text(info.data[i].type);
                        var $item2 = $('<div >').text(info.data[i].data);
                        console.log(`createContactsData info.data[i].type22=${info.data[i].type}`);
                        console.log(`createContactsData info.data[i].label=${info.data[i].label}`);
                        $box.append($item1).append($item2);
                    }
                }

                $listItem = $('<li class="list-group-item">');
                $listItem.append($box);
                $listItem.bind("click", { type: 'contactsrecord', info: info, arg: arg }, this.eventHandler);
                $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                $list.append($listItem);

            }
        }

        $temp.append($listView);

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        //alert($temp.html());
        return $temp;
       
    }

    createContactsList(info2, arg, eventHandler) {
        console.log(`arg.renderinfo.tabthread=${arg.renderinfo.tabthread}`);
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;
        console.log(`arg.renderinfo.tabthread=${arg.renderinfo.tabthread}`);
        $(arg.elem).empty();

        var $temp = $("<div>");
        console.log(`arg.renderinfo.tabthread=${arg.renderinfo.tabthread}`);
        if (arg && !arg.$tabelem && arg.renderinfo.tabthread) {
            var $tabelem = $('<div>');
            console.log(`arg.renderinfo.tabthread=${arg.renderinfo.tabthread}`);
            $(arg.elem).before($tabelem);
            arg.$tabelem = $tabelem;
            this.createThreadTabMenu(info, arg, eventHandler);
        }

        console.log(`arg.rendertype=${arg.rendertype}`);
        if (arg.renderinfo.rendertype == 'media') {
            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;

                    var mediabox = this.createMediaItem(info);
                    $temp.append(mediabox);

                    $(mediabox).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                    $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
                }
            }

            var $write = $("<div>");
            $temp.append($write);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글작성");
            $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
            $write.append($buttonE);


            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, this.eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new ErpFindView();
            f.createFindView(info2, arg, this.eventHandler);

            $(arg.elem).append($temp);
            __modal.hide();
            return $temp;
        } else if (arg.renderinfo.rendertype == 'list') {
            var $listView = $('<div>');
            var $list = $('<ul class="tree list-group">');
            var $listItem = null, $treeItemIn = null;
            $listView.append($list);

            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;
                    //console.log('photo_blob=', info.photo_blob);
                    var $dat_media_box = $('<div class="d-flex ">');
                    //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
                    var $img = null;
                    if (info.img) {
                        $img = info.img;
                    } else {
                        //console.log('info.photo_blob=' ,info.photo_blob);
                        if (info.photo_blob) {
                            //const img2 = new Image();
                            //img2.src = `data:image/png;base64,<%= ${info.photo_blob} `;
                            $img = $(`<img src="data:image/png;base64,${info.photo_blob}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        } else if (info.iconclass) {
                            $img = $(`<i class="${info.iconclass}">`);
                        } else {
                            $img = $(`<img src="..." onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        }
                    }

                    var $datbody = $('<div class="media-body">');

                    var $bodyhead = $('<div class="row justify-content-between">');
                   // var str = info.display_name + " (" + info.register + ")";
                    var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.display_name);
                    var $head_right = $('<div class="mt-0">');
                    $bodyhead.append($head_left).append($head_right);

                    var $bodybody = $('<p>').html(info.phone_num);

                    $datbody.append($bodyhead);
                    $datbody.append($bodybody);

                    $dat_media_box.append($img).append($datbody);

                    var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
                    var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
                    var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

                    //datinfo.customer_btn1 = btn1;
                    $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

                    $head_right.append(btn1).append(btn2).append(btn3);

                    $listItem = $('<li class="list-group-item">');
                    $listItem.append($dat_media_box);
                    $listItem.bind("click", { type: 'contactsrecord', info: info, arg: arg }, this.eventHandler);
                    $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $list.append($listItem);
                }
            }

            $temp.append($listView);

            //$(arg.elem).empty();
            $(arg.elem).append($temp);
            __modal.hide();
            //alert($temp.html());
            return $temp;
        }

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("아이디");
        var thE3 = $("<th style='width: 35%'>").text("이름");
        var thE4 = $("<th style='width: 35%'>").text("폰넘버");
        var thE5 = $("<th style='width: 15%'>").text("포토아이디");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);
        console.log('createEmployeeView erpwrite arg.dbpath=' + arg.dbpath);
        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                //console.log('photo_blob=', info.photo_blob);
                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.contact_id).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.display_name);
                var tdE4 = $("<td>").text(info.phone_num);
                var tdE5 = $("<td>").text(info.photo_id);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        //$(arg.elem).empty();
        $(arg.elem).append($temp);
        __modal.hide();
        return $temp;
    }

    createContactsGroupList(info2, arg, eventHandler) {

        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        $(arg.elem).empty();

        var $temp = $("<div>");
        console.log(`arg.$tabelem=${arg.$tabelem}`);
        if (arg && !arg.$tabelem && arg.renderinfo.tabthread) {
            var $tabelem = $('<div>');
            console.log(`arg.renderinfo.tabthread=${arg.renderinfo.tabthread}`);
            $(arg.elem).before($tabelem);
            arg.$tabelem = $tabelem;
            this.createThreadTabMenu(info, arg, eventHandler);
        }

        console.log(`arrarr.length=${arrarr.length}`);
        if (arg.renderinfo.rendertype == 'media') {
            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;

                    var mediabox = this.createMediaItem(info);
                    $temp.append(mediabox);

                    $(mediabox).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                    $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
                }
            }

            var $write = $("<div>");
            $temp.append($write);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글작성");
            $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
            $write.append($buttonE);


            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, this.eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new ErpFindView();
            f.createFindView(info2, arg, this.eventHandler);

            $(arg.elem).append($temp);
            __modal.hide();
            return $temp;
        } else if (arg.renderinfo.rendertype == 'list') {
            var $listView = $('<div>');
            var $list = $('<ul class="tree list-group">');
            var $listItem = null, $treeItemIn = null;
            $listView.append($list);

            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;
                    //console.log('photo_blob=', info.photo_blob);
                    var $dat_media_box = $('<div class="d-flex ">');
                    //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
                    var $img = null;
                    if (info.img) {
                        $img = info.img;
                    } else {
                        //console.log('info.photo_blob=' ,info.photo_blob);
                        if (info.photo_blob) {
                            //const img2 = new Image();
                            //img2.src = `data:image/png;base64,<%= ${info.photo_blob} `;
                            $img = $(`<img src="data:image/png;base64,${info.photo_blob}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        } else if (info.iconclass) {
                            $img = $(`<i class="${info.iconclass}">`);
                        } else {
                            $img = $(`<img src="..." onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        }
                    }

                    var $datbody = $('<div class="media-body">');

                    var $bodyhead = $('<div class="row justify-content-between">');
                    // var str = info.display_name + " (" + info.register + ")";
                    var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.title);
                    var $head_right = $('<div class="mt-0">');
                    $bodyhead.append($head_left).append($head_right);

                    var $bodybody = $('<p>').html(info.memnum);

                    $datbody.append($bodyhead);
                    $datbody.append($bodybody);

                    $dat_media_box.append($img).append($datbody);

                    var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
                    var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
                    var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

                    //datinfo.customer_btn1 = btn1;
                    $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

                    $head_right.append(btn1).append(btn2).append(btn3);

                    $listItem = $('<li class="list-group-item">');
                    $listItem.append($dat_media_box);
                    $listItem.bind("click", { type: 'grouprecord', info: info, arg: arg }, this.eventHandler);
                    $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $list.append($listItem);
                }
            }

            $temp.append($listView);

            //$(arg.elem).empty();
            $(arg.elem).append($temp);
            __modal.hide();
            //alert($temp.html());
            return $temp;
        }

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("아이디");
        var thE3 = $("<th style='width: 35%'>").text("이름");
        var thE4 = $("<th style='width: 35%'>").text("폰넘버");
        var thE5 = $("<th style='width: 15%'>").text("포토아이디");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);
        console.log('createEmployeeView erpwrite arg.dbpath=' + arg.dbpath);
        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                //console.log('photo_blob=', info.photo_blob);
                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.contact_id).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.display_name);
                var tdE4 = $("<td>").text(info.phone_num);
                var tdE5 = $("<td>").text(info.photo_id);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        //$(arg.elem).empty();
        $(arg.elem).append($temp);
        __modal.hide();
        return $temp;
    }

    createSmsList(info2, arg, eventHandler) {

        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        $(arg.elem).empty();

        var $temp = $("<div>");
        console.log(`arg.$tabelem=${arg.$tabelem}`);
        if (arg && !arg.$tabelem && arg.renderinfo.tabthread) {
            var $tabelem = $('<div>');
            console.log(`arg.renderinfo.tabthread=${arg.renderinfo.tabthread}`);
            $(arg.elem).before($tabelem);
            arg.$tabelem = $tabelem;
            this.createThreadTabMenu(info, arg, eventHandler);
        }

        console.log(`arrarr.length=`, arrarr.length);
        if (arg.renderinfo.rendertype == 'media') {
            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;

                    var mediabox = this.createMediaItem(info);
                    $temp.append(mediabox);

                    $(mediabox).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                    $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
                }
            }

            var $write = $("<div>");
            $temp.append($write);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글작성");
            $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
            $write.append($buttonE);


            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, this.eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new ErpFindView();
            f.createFindView(info2, arg, this.eventHandler);

            $(arg.elem).append($temp);
            __modal.hide();
            return $temp;
        } else if (arg.renderinfo.rendertype == 'list') {
            var $listView = $('<div>');
            var $list = $('<ul class="tree list-group">');
            var $listItem = null, $treeItemIn = null;
            $listView.append($list);

            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;
                    //console.log('photo_blob=', info.photo_blob);
                    var $dat_media_box = $('<div class="d-flex ">');
                    //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
                    var $img = null;
                    if (info.img) {
                        $img = info.img;
                    } else {
                        //console.log('info.photo_blob=' ,info.photo_blob);
                        if (info.photo_blob) {
                            //const img2 = new Image();
                            //img2.src = `data:image/png;base64,<%= ${info.photo_blob} `;
                            $img = $(`<img src="data:image/png;base64,${info.photo_blob}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        } else if (info.iconclass) {
                            $img = $(`<i class="${info.iconclass}">`);
                        } else {
                            $img = $(`<img src="..." onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        }
                    }

                    var $datbody = $('<div class="media-body">');

                    var $bodyhead = $('<div class="row justify-content-between">');
                    // var str = info.display_name + " (" + info.register + ")";

                    var date = new Date(info.timestamp * 1); //타임스탬프를 인자로 받아 Date 객체 생성
                    const month = date.getMonth() + 1; // 0-indexed
                    const day = date.getDate();
                    var returnDate = `${month}.${day}`;
                    console.log('info.timestamp=', info.timestamp);
                    console.log('date=', date);
                    console.log('date.getMonth()=', date.getMonth());
                    var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.address + "  (" + returnDate + ")");
                    var $head_right = $('<div class="mt-0">');
                    //$head_right.text("(" + info.timestamp + ")");
                    $bodyhead.append($head_left).append($head_right);

                    var $bodybody = $('<p>').html(info.body);
                    
                    $datbody.append($bodyhead);
                    $datbody.append($bodybody);

                    $dat_media_box.append($img).append($datbody);

                    var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
                    var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
                    var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

                    //datinfo.customer_btn1 = btn1;
                    $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

                    $head_right.append(btn1).append(btn2).append(btn3);

                    $listItem = $('<li class="list-group-item">');
                    $listItem.append($dat_media_box);
                    $listItem.bind("click", { type: 'smsrecord', info: info, arg: arg }, this.eventHandler);
                    $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $list.append($listItem);
                }
            }

            $temp.append($listView);

            //$(arg.elem).empty();
            $(arg.elem).append($temp);
            __modal.hide();
            //alert($temp.html());
            return $temp;
        }

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("아이디");
        var thE3 = $("<th style='width: 35%'>").text("이름");
        var thE4 = $("<th style='width: 35%'>").text("폰넘버");
        var thE5 = $("<th style='width: 15%'>").text("포토아이디");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);
        console.log('createEmployeeView erpwrite arg.dbpath=' + arg.dbpath);
        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                //console.log('photo_blob=', info.photo_blob);
                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.contact_id).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.display_name);
                var tdE4 = $("<td>").text(info.phone_num);
                var tdE5 = $("<td>").text(info.photo_id);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        //$(arg.elem).empty();
        $(arg.elem).append($temp);
        __modal.hide();
        return $temp;
    }

    createContactsGroupMemList(info2, arg, eventHandler) {

        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var $listView = $('<div>');
        var $list = $('<ul class="tree list-group">');
        var $listItem = null, $treeItemIn = null;
        $listView.append($list);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                //console.log('photo_blob=', info.photo_blob);
                var $dat_media_box = $('<div class="d-flex ">');
                //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
                var $img = null;
                if (info.img) {
                    $img = info.img;
                } else {
                    console.log('info.photo_blob=', info.photo_blob);
                    if (info.photo_blob) {
                        //const img2 = new Image();
                        //img2.src = `data:image/png;base64,<%= ${info.photo_blob} `;
                        $img = $(`<img src="data:image/png;base64,${info.photo_blob}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                    } else if (info.iconclass) {
                        $img = $(`<i class="${info.iconclass}">`);
                    } else {
                        $img = $(`<img src="..." onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                    }
                }

                var $datbody = $('<div class="media-body">');

                var $bodyhead = $('<div class="row justify-content-between">');
                // var str = info.display_name + " (" + info.register + ")";
                var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.display_name);
                var $head_right = $('<div class="mt-0">');
                $bodyhead.append($head_left).append($head_right);

                var $bodybody = $('<p>').html(info.phone_num);

                $datbody.append($bodyhead);
                $datbody.append($bodybody);

                $dat_media_box.append($img).append($datbody);

                var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
                var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
                var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

                //datinfo.customer_btn1 = btn1;
                $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
                $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info }, this.eventHandler);
                $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
                $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

                $head_right.append(btn1).append(btn2).append(btn3);

                $listItem = $('<li class="list-group-item">');
                $listItem.append($dat_media_box);
                $listItem.bind("click", { type: 'memberrecord', info: info, arg: arg }, this.eventHandler);
                $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                $list.append($listItem);
            }
        }

        $temp.append($listView);

        $(arg.elem).empty();
        $(arg.elem).append($temp);
        __modal.hide();
        //alert($temp.html());
        return $temp;
    }

    createContactsCallstateList(info2, arg, eventHandler) {

        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var $listView = $('<div>');
        var $list = $('<ul class="tree list-group">');
        var $listItem = null, $treeItemIn = null;
        $listView.append($list);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                //console.log('photo_blob=', info.photo_blob);
                var $dat_media_box = $('<div class="d-flex ">');
                //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
                var $img = null;
                $img = $(`<i class="fa fa-fw fa-phone">`);

                var $datbody = $('<div class="media-body">');

                var $bodyhead = $('<div class="row justify-content-between">');
                // var str = info.display_name + " (" + info.register + ")";
                var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.number + '(' + info.type + ')');
                var $head_right = $('<div class="mt-0">').text(info.duration);
                $bodyhead.append($head_left).append($head_right);

                var date = new Date(Number(info.date)); //타임스탬프를 인자로 받아 Date 객체 생성
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // 0-indexed
                const day = date.getDate();
                //console.log(year + "년 " + month + "월 " + day + "일"); // 출력
                //DateFormat.format("yyyy.MM.dd", date).toString()
                var $bodybody = $('<p>').html(date.toLocaleString());

                $datbody.append($bodyhead);
                $datbody.append($bodybody);

                $dat_media_box.append($img).append($datbody);

                var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
                var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
                var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

                //datinfo.customer_btn1 = btn1;
                $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
                $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info }, this.eventHandler);
                $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
                $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

                $head_right.append(btn1).append(btn2).append(btn3);

                $listItem = $('<li class="list-group-item">');
                $listItem.append($dat_media_box);
                $listItem.bind("click", { type: 'memberrecord', info: info, arg: arg }, this.eventHandler);
                $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                $list.append($listItem);
            }
        }

        $temp.append($listView);

        $(arg.elem).empty();
        $(arg.elem).append($temp);
        __modal.hide();
        //alert($temp.html());
        return $temp;

    }

    createList(info7, arg, eventHandler) {

        var loginfo = info7.loginfo;
        var arrarr = info7.arrarr;
        var grouparr = info7.grouparr;

        $(arg.elem).empty();
        
        var $temp = $('<div>');
        var head = `<div class="alert alert-dark" role="alert">
                      ${info7.title ?? "title"}
                    </div>`;
        $temp.append(head);

        var cnt = 0;
        var $listView = $('<div>');
        var $list = $('<ul class="tree list-group">');
        var $listItem = null, $treeItemIn = null;
        $listView.append($list);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                //console.log('createGroupBoardView info.bctype====' + info.bctype);
                var $dat_media_box = $('<div class="d-flex ">');
                //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
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

                var $datbody = $('<div class="media-body">');

                var $bodyhead = $('<div class="row justify-content-between">');
                var str = info.id + " (" + info.register + ")";
                var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.key);
                var $head_right = $('<div class="mt-0">');
                $bodyhead.append($head_left).append($head_right);

                var $bodybody = $('<p>').html(info.info);

                $datbody.append($bodyhead);
                $datbody.append($bodybody);

                $dat_media_box.append($img).append($datbody);

                var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
                var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
                var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

                //datinfo.customer_btn1 = btn1;
                $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
                $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info }, this.eventHandler);
                $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
                $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

                $head_right.append(btn1).append(btn2).append(btn3);

                $listItem = $('<li class="list-group-item">');
                $listItem.append($dat_media_box);
                $listItem.bind("click", { type: 'record', info: info, arg: arg }, this.eventHandler);
                $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                $list.append($listItem);
            }
        }

        $temp.append($listView);

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        //alert($temp.html());
        return $temp;
    }

}

class MemberFcmView extends ViewBase {
    constructor() {
        super();

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
        } else if (type == 'boardlist' || type == 'more' || type == 'menuclick') {
            console.log("eventHandler type  == " + type);
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

        } else if (type == 'threadclick') {
            $(this).parent().children().each(function () {
                $(this).removeClass("active");

            });
            $(this).addClass("active");

            if (arg.threadtab) {

            }
            console.log("e.data.threadinfo.value== " + e.data.threadinfo.value);
            var str;
            if (e.data.threadinfo.value == 'topiclist') {
                arg.type = 'topiclist';
                str = "/fcmtopic.member?dbpath=" + arg.dbpath + "&code=" + arg.code + "&utf8=ok&";
            }
            else if (e.data.threadinfo.value == 'adminlist') {
                arg.type = 'adminlist';
                str = "/adminlist.member?dbpath=" + arg.dbpath + "&code=" + arg.code + "&memtype=list&utf8=ok&";
            }
            else if (e.data.threadinfo.value == 'memberlist') {
                arg.type = 'memberlist';
                str = "/member.member?dbpath=" + arg.dbpath + "&code=" + arg.code + "&memtype=list&utf8=ok&";
            }
            else if (e.data.threadinfo.value == 'contactslist') {
                arg.type = 'contactslist';
                str = "/contactslist.contacts?page=" + arg.page + "&contactid=" + e.data.threadinfo.value + "&utf8=ok&";
            }
            console.log("e.data.threadinfo.key== " + e.data.threadinfo.key);

            arg.path = str;
            //var arg = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.self.listAjax(arg);
        }
    }

    createThreadTabMenu(info7, arg, eventHandler) {
        var $tabMenuE = null;
        var $tabelem = arg.$tabelem;
        var cnt = 0;
        var $tabs_wrap = $('<div class="tabs_wrap">');
        var $tree = $('<ul>');
        $tabs_wrap.append($tree);
        var $treeItem = null, $treeItemIn = null;
        $tabMenuE = $('<div class="tabwrapper">');
        $tabMenuE.append($tabs_wrap);
        var thread;
        var arrarr = arg.renderinfo.tabthread;
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                if (arr && arr.length > 0) {

                    var info2 = arr[i];

                    $treeItem = $('<li>').append(info.key);
                    if (arg.type == info.value) {
                        $treeItem.addClass('active');
                        thread = info.key;
                    }

                    $treeItem.bind("click", { type: 'threadclick', self: this, threadinfo: info, arg: arg }, this.eventHandler);

                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                } else {

                    $treeItem = $('<li>').append(info.key);
                    if (arg.type == info.value) {
                        $treeItem.addClass('active');
                        thread = info.key;
                    }
                    $treeItem.bind("click", { type: 'threadclick', self: this, threadinfo: info, arg: arg }, this.eventHandler)

                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                }
            }

        }

        //$($tabelem).empty();
        $($tabelem).append($tabMenuE);

        return $tabMenuE;
    }

    createFcmMessageList(info2, arg, eventHandler) {

        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        $(arg.elem).empty();

        var $temp = $("<div>");
        console.log(`arg.renderinfo.tabthread=${arg.renderinfo.tabthread}`);
        if (arg && !arg.$tabelem && arg.renderinfo.tabthread) {
            var $tabelem = $('<div>');
            console.log(`arg.renderinfo.tabthread=${arg.renderinfo.tabthread}`);
            $(arg.elem).before($tabelem);
            arg.$tabelem = $tabelem;
            this.createThreadTabMenu(info, arg, eventHandler);
        }

        console.log(`arg.rendertype=${arg.rendertype}`);
        if (arg.renderinfo.rendertype == 'media') {
            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;

                    var mediabox = this.createMediaItem(info);
                    $temp.append(mediabox);

                    $(mediabox).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                    $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
                }
            }

            var $write = $("<div>");
            $temp.append($write);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글작성");
            $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
            $write.append($buttonE);


            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, this.eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new ErpFindView();
            f.createFindView(info2, arg, this.eventHandler);

            $(arg.elem).append($temp);

            return $temp;
        } else if (arg.renderinfo.rendertype == 'list') {
            var $listView = $('<div>');
            var $list = $('<ul class="tree list-group">');
            var $listItem = null, $treeItemIn = null;
            $listView.append($list);

            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;
                    //console.log('photo_blob=', info.photo_blob);
                    var $dat_media_box = $('<div class="d-flex ">');
                    //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
                    var $img = null;
                    if (info.img) {
                        $img = info.img;
                    } else {
                        //console.log('info.photo_blob=' ,info.photo_blob);
                        if (info.photo_blob) {
                            //const img2 = new Image();
                            //img2.src = `data:image/png;base64,<%= ${info.photo_blob} `;
                            $img = $(`<img src="data:image/png;base64,${info.photo_blob}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        } else if (info.iconclass) {
                            $img = $(`<i class="${info.iconclass}">`);
                        } else {
                            $img = $(`<img src="..." onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        }
                    }

                    var $datbody = $('<div class="media-body">');

                    var $bodyhead = $('<div class="row justify-content-between">');
                    // var str = info.display_name + " (" + info.register + ")";
                    var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.display_name);
                    var $head_right = $('<div class="mt-0">');
                    $bodyhead.append($head_left).append($head_right);

                    var $bodybody = $('<p>').html(info.phone_num);

                    $datbody.append($bodyhead);
                    $datbody.append($bodybody);

                    $dat_media_box.append($img).append($datbody);

                    var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
                    var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
                    var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

                    //datinfo.customer_btn1 = btn1;
                    $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

                    $head_right.append(btn1).append(btn2).append(btn3);

                    $listItem = $('<li class="list-group-item">');
                    $listItem.append($dat_media_box);
                    $listItem.bind("click", { type: 'contactsrecord', info: info, arg: arg }, this.eventHandler);
                    $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $list.append($listItem);
                }
            }

            $temp.append($listView);

            //$(arg.elem).empty();
            $(arg.elem).append($temp);

            var $buttonE = $("<input type='button' class='btn btn-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글쓰기");
            $buttonE.bind("click", { type: 'boardwrite', self: this, info: info, arg: arg }, eventHandler);
            var $writeDiv = $('<div>');
            $($writeDiv).append($buttonE);
            $(arg.elem).append($writeDiv);

            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new BoardFindView();
            f.createFindView(info2, arg, eventHandler);

            //alert($temp.html());
            return $temp;
        }

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("아이디");
        var thE3 = $("<th style='width: 35%'>").text("이름");
        var thE4 = $("<th style='width: 35%'>").text("폰넘버");
        var thE5 = $("<th style='width: 15%'>").text("포토아이디");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);
        console.log('createEmployeeView erpwrite arg.dbpath=' + arg.dbpath);
        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                //console.log('photo_blob=', info.photo_blob);
                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.contact_id).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.display_name);
                var tdE4 = $("<td>").text(info.phone_num);
                var tdE5 = $("<td>").text(info.photo_id);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        //$(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }

    createFcmTopicList(info2, arg, eventHandler) {

        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        $(arg.elem).empty();

        var $temp = $("<div>");
        console.log(`arg.$tabelem=${arg.$tabelem}`);
        
        if (arg && !arg.$tabelem && arg.renderinfo.tabthread) {
            var $tabelem = $('<div>');
            $(arg.elem).before($tabelem);
            arg.$tabelem = $tabelem;
            this.createThreadTabMenu(info, arg, eventHandler);
        }

        //console.log(`arrarr.length=${arrarr.length}`);
        if (arg.renderinfo.rendertype == 'media') {
            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;

                    var mediabox = this.createMediaItem(info);
                    $temp.append(mediabox);

                    $(mediabox).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                    $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
                }
            }

            var $write = $("<div>");
            $temp.append($write);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글작성");
            $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
            $write.append($buttonE);


            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, this.eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new ErpFindView();
            f.createFindView(info2, arg, this.eventHandler);

            $(arg.elem).append($temp);

            return $temp;
        } else if (arg.renderinfo.rendertype == 'list') {
            var $listView = $('<div>');
            var $list = $('<ul class="tree list-group">');
            var $listItem = null, $treeItemIn = null;
            $listView.append($list);

            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;
                    //console.log('photo_blob=', info.photo_blob);
                    var $dat_media_box = $('<div class="d-flex ">');
                    //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
                    var $img = null;
                    if (info.img) {
                        $img = info.img;
                    } else {
                        //console.log('info.photo_blob=' ,info.photo_blob);
                        if (info.photo_blob) {
                            //const img2 = new Image();
                            //img2.src = `data:image/png;base64,<%= ${info.photo_blob} `;
                            $img = $(`<img src="data:image/png;base64,${info.photo_blob}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        } else if (info.iconclass) {
                            $img = $(`<i class="${info.iconclass}">`);
                        } else {
                            $img = $(`<img src="..." onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        }
                    }

                    var $datbody = $('<div class="media-body">');

                    var $bodyhead = $('<div class="row justify-content-between">');
                    // var str = info.display_name + " (" + info.register + ")";
                    var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.title);
                    var $head_right = $('<div class="mt-0">');
                    $bodyhead.append($head_left).append($head_right);

                    var $bodybody = $('<p>').html(info.memnum);

                    $datbody.append($bodyhead);
                    $datbody.append($bodybody);

                    $dat_media_box.append($img).append($datbody);

                    var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
                    var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
                    var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

                    //datinfo.customer_btn1 = btn1;
                    $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

                    $head_right.append(btn1).append(btn2).append(btn3);

                    $listItem = $('<li class="list-group-item">');
                    $listItem.append($dat_media_box);
                    $listItem.bind("click", { type: 'contactsrecord', info: info, arg: arg }, this.eventHandler);
                    $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $list.append($listItem);
                }
            }

            $temp.append($listView);

            //$(arg.elem).empty();
            $(arg.elem).append($temp);

            var $buttonE = $("<input type='button' class='btn btn-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글쓰기");
            $buttonE.bind("click", { type: 'boardwrite', self: this, info: info, arg: arg }, eventHandler);
            var $writeDiv = $('<div>');
            $($writeDiv).append($buttonE);
            $(arg.elem).append($writeDiv);

            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new BoardFindView();
            f.createFindView(info2, arg, eventHandler);

            //alert($temp.html());
            return $temp;
        }

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("아이디");
        var thE3 = $("<th style='width: 35%'>").text("이름");
        var thE4 = $("<th style='width: 35%'>").text("폰넘버");
        var thE5 = $("<th style='width: 15%'>").text("포토아이디");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);
        console.log('createEmployeeView erpwrite arg.dbpath=' + arg.dbpath);
        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                //console.log('photo_blob=', info.photo_blob);
                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.contact_id).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.display_name);
                var tdE4 = $("<td>").text(info.phone_num);
                var tdE5 = $("<td>").text(info.photo_id);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        //$(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }

    createSmsList(info2, arg, eventHandler) {

        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        $(arg.elem).empty();

        var $temp = $("<div>");
        console.log(`arg.$tabelem=${arg.$tabelem}`);
        if (arg && !arg.$tabelem && arg.renderinfo.tabthread) {
            var $tabelem = $('<div>');
            console.log(`arg.renderinfo.tabthread=${arg.renderinfo.tabthread}`);
            $(arg.elem).before($tabelem);
            arg.$tabelem = $tabelem;
            this.createThreadTabMenu(info, arg, eventHandler);
        }

        console.log(`arrarr.length=`, arrarr.length);
        if (arg.renderinfo.rendertype == 'media') {
            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;

                    var mediabox = this.createMediaItem(info);
                    $temp.append(mediabox);

                    $(mediabox).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                    $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
                }
            }

            var $write = $("<div>");
            $temp.append($write);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글작성");
            $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
            $write.append($buttonE);


            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, this.eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new ErpFindView();
            f.createFindView(info2, arg, this.eventHandler);

            $(arg.elem).append($temp);

            return $temp;
        } else if (arg.renderinfo.rendertype == 'list') {
            var $listView = $('<div>');
            var $list = $('<ul class="tree list-group">');
            var $listItem = null, $treeItemIn = null;
            $listView.append($list);

            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;
                    //console.log('photo_blob=', info.photo_blob);
                    var $dat_media_box = $('<div class="d-flex ">');
                    //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
                    var $img = null;
                    if (info.img) {
                        $img = info.img;
                    } else {
                        //console.log('info.photo_blob=' ,info.photo_blob);
                        if (info.photo_blob) {
                            //const img2 = new Image();
                            //img2.src = `data:image/png;base64,<%= ${info.photo_blob} `;
                            $img = $(`<img src="data:image/png;base64,${info.photo_blob}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        } else if (info.iconclass) {
                            $img = $(`<i class="${info.iconclass}">`);
                        } else {
                            $img = $(`<img src="..." onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        }
                    }

                    var $datbody = $('<div class="media-body">');

                    var $bodyhead = $('<div class="row justify-content-between">');
                    // var str = info.display_name + " (" + info.register + ")";

                    var date = new Date(info.timestamp * 1); //타임스탬프를 인자로 받아 Date 객체 생성
                    const month = date.getMonth() + 1; // 0-indexed
                    const day = date.getDate();
                    var returnDate = `${month}.${day}`;
                    console.log('info.timestamp=', info.timestamp);
                    console.log('date=', date);
                    console.log('date.getMonth()=', date.getMonth());
                    var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.address + "  (" + returnDate + ")");
                    var $head_right = $('<div class="mt-0">');
                    //$head_right.text("(" + info.timestamp + ")");
                    $bodyhead.append($head_left).append($head_right);

                    var $bodybody = $('<p>').html(info.body);

                    $datbody.append($bodyhead);
                    $datbody.append($bodybody);

                    $dat_media_box.append($img).append($datbody);

                    var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
                    var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
                    var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

                    //datinfo.customer_btn1 = btn1;
                    $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

                    $head_right.append(btn1).append(btn2).append(btn3);

                    $listItem = $('<li class="list-group-item">');
                    $listItem.append($dat_media_box);
                    $listItem.bind("click", { type: 'smsrecord', info: info, arg: arg }, this.eventHandler);
                    $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $list.append($listItem);
                }
            }

            $temp.append($listView);

            //$(arg.elem).empty();
            $(arg.elem).append($temp);

            //alert($temp.html());
            return $temp;
        }

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("아이디");
        var thE3 = $("<th style='width: 35%'>").text("이름");
        var thE4 = $("<th style='width: 35%'>").text("폰넘버");
        var thE5 = $("<th style='width: 15%'>").text("포토아이디");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);
        console.log('createEmployeeView erpwrite arg.dbpath=' + arg.dbpath);
        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                //console.log('photo_blob=', info.photo_blob);
                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.contact_id).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.display_name);
                var tdE4 = $("<td>").text(info.phone_num);
                var tdE5 = $("<td>").text(info.photo_id);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        //$(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }

    createAdminList(info2, arg, eventHandler) {
        console.log(`arg.renderinfo.rendertype=${arg.renderinfo.rendertype}`)
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        if (arg && !arg.$tabelem && arg.renderinfo.tabthread) {
            var $tabelem = $('<div>');
            console.log(`arg.renderinfo.tabthread=${arg.renderinfo.tabthread}`);
            $(arg.elem).before($tabelem);
            arg.$tabelem = $tabelem;
            this.createThreadTabMenu(info, arg, eventHandler);
        }

        console.log(`arg.renderinfo.rendertype=${arg.renderinfo.rendertype}`)
        if (arg.renderinfo.rendertype == 'media') {
            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;

                    var mediabox = this.createMediaItem(info);
                    $temp.append(mediabox);

                    $(mediabox).bind("click", { type: 'memberrecord', self: this, info: info, arg: arg }, this.eventHandler);
                    $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
                }
            }

            var $write = $("<div>");
            $temp.append($write);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글작성");
            $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
            $write.append($buttonE);


            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, this.eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new ErpFindView();
            f.createFindView(info2, arg, this.eventHandler);

            $(arg.elem).empty();
            $(arg.elem).append($temp);

            return $temp;
        } else if (arg.renderinfo.rendertype == 'list') {
            var $listView = $('<div>');
            var $list = $('<ul class="tree list-group">');
            var $listItem = null, $treeItemIn = null;
            $listView.append($list);

            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;
                    //console.log('photo_blob=', info.photo_blob);
                    var $dat_media_box = $('<div class="d-flex ">');
                    //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
                    var $img = null;
                    if (info.img) {
                        $img = info.img;
                    } else {
                        console.log('info.photo_blob=', info.photo_blob);
                        if (info.photo_blob) {
                            //const img2 = new Image();
                            //img2.src = `data:image/png;base64,<%= ${info.photo_blob} `;
                            $img = $(`<img src="data:image/png;base64,${info.photo_blob}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        } else if (info.iconclass) {
                            $img = $(`<i class="${info.iconclass}">`);
                        } else {
                            $img = $(`<img src="..." onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        }
                    }

                    var $datbody = $('<div class="media-body">');

                    var $bodyhead = $('<div class="row justify-content-between">');
                    // var str = info.display_name + " (" + info.register + ")";
                    var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.id);
                    var $head_right = $('<div class="mt-0">');
                    $bodyhead.append($head_left).append($head_right);

                    var $bodybody = $('<p>').html(info.email);

                    $datbody.append($bodyhead);
                    $datbody.append($bodybody);

                    $dat_media_box.append($img).append($datbody);

                    var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
                    var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
                    var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

                    //datinfo.customer_btn1 = btn1;
                    $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

                    $head_right.append(btn1).append(btn2).append(btn3);

                    $listItem = $('<li class="list-group-item">');
                    $listItem.append($dat_media_box);
                    $listItem.bind("click", { type: 'memberrecord', info: info, arg: arg }, this.eventHandler);
                    $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $list.append($listItem);
                }
            }

            $temp.append($listView);

            $(arg.elem).empty();
            $(arg.elem).append($temp);

            var $buttonE = $("<input type='button' class='btn btn-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글쓰기");
            $buttonE.bind("click", { type: 'boardwrite', self: this, info: info, arg: arg }, eventHandler);
            var $writeDiv = $('<div>');
            $($writeDiv).append($buttonE);
            $(arg.elem).append($writeDiv);

            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new BoardFindView();
            f.createFindView(info2, arg, eventHandler);

            //alert($temp.html());
            return $temp;
        }

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("아이디");
        var thE3 = $("<th style='width: 35%'>").text("이름");
        var thE4 = $("<th style='width: 35%'>").text("폰넘버");
        var thE5 = $("<th style='width: 15%'>").text("포토아이디");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);
        console.log('createEmployeeView erpwrite arg.dbpath=' + arg.dbpath);
        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                console.log('photo_blob=', info.photo_blob);
                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.contact_id).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.display_name);
                var tdE4 = $("<td>").text(info.phone_num);
                var tdE5 = $("<td>").text(info.photo_id);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'memberrecord', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }

    createMemberList(info2, arg, eventHandler) {
        console.log(`arg.renderinfo.rendertype=${arg.renderinfo.rendertype}`)
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        if (arg && !arg.$tabelem && arg.renderinfo.tabthread) {
            var $tabelem = $('<div>');
            console.log(`arg.renderinfo.tabthread=${arg.renderinfo.tabthread}`);
            $(arg.elem).before($tabelem);
            arg.$tabelem = $tabelem;
            this.createThreadTabMenu(info, arg, eventHandler);
        }

        console.log(`arg.renderinfo.rendertype=${arg.renderinfo.rendertype}`)
        if (arg.renderinfo.rendertype == 'media') {
            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;

                    var mediabox = this.createMediaItem(info);
                    $temp.append(mediabox);

                    $(mediabox).bind("click", { type: 'memberrecord', self: this, info: info, arg: arg }, this.eventHandler);
                    $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
                }
            }

            var $write = $("<div>");
            $temp.append($write);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글작성");
            $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
            $write.append($buttonE);


            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, this.eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new ErpFindView();
            f.createFindView(info2, arg, this.eventHandler);

            $(arg.elem).empty();
            $(arg.elem).append($temp);

            return $temp;
        } else if (arg.renderinfo.rendertype == 'list') {
            var $listView = $('<div>');
            var $list = $('<ul class="tree list-group">');
            var $listItem = null, $treeItemIn = null;
            $listView.append($list);

            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;
                    //console.log('photo_blob=', info.photo_blob);
                    var $dat_media_box = $('<div class="d-flex ">');
                    //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
                    var $img = null;
                    if (info.img) {
                        $img = info.img;
                    } else {
                        console.log('info.photo_blob=', info.photo_blob);
                        if (info.photo_blob) {
                            //const img2 = new Image();
                            //img2.src = `data:image/png;base64,<%= ${info.photo_blob} `;
                            $img = $(`<img src="data:image/png;base64,${info.photo_blob}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        } else if (info.iconclass) {
                            $img = $(`<i class="${info.iconclass}">`);
                        } else {
                            $img = $(`<img src="..." onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                        }
                    }

                    var $datbody = $('<div class="media-body">');

                    var $bodyhead = $('<div class="row justify-content-between">');
                    // var str = info.display_name + " (" + info.register + ")";
                    var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.id);
                    var $head_right = $('<div class="mt-0">');
                    $bodyhead.append($head_left).append($head_right);

                    var $bodybody = $('<p>').html(info.email);

                    $datbody.append($bodyhead);
                    $datbody.append($bodybody);

                    $dat_media_box.append($img).append($datbody);

                    var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
                    var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
                    var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

                    //datinfo.customer_btn1 = btn1;
                    $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
                    $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

                    $head_right.append(btn1).append(btn2).append(btn3);

                    $listItem = $('<li class="list-group-item">');
                    $listItem.append($dat_media_box);
                    $listItem.bind("click", { type: 'memberrecord', info: info, arg: arg }, this.eventHandler);
                    $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $list.append($listItem);
                }
            }

            $temp.append($listView);

            $(arg.elem).empty();
            $(arg.elem).append($temp);

            var $buttonE = $("<input type='button' class='btn btn-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글쓰기");
            $buttonE.bind("click", { type: 'boardwrite', self: this, info: info, arg: arg }, eventHandler);
            var $writeDiv = $('<div>');
            $($writeDiv).append($buttonE);
            $(arg.elem).append($writeDiv);

            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new BoardFindView();
            f.createFindView(info2, arg, eventHandler);

            //alert($temp.html());
            return $temp;
        }

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("아이디");
        var thE3 = $("<th style='width: 35%'>").text("이름");
        var thE4 = $("<th style='width: 35%'>").text("폰넘버");
        var thE5 = $("<th style='width: 15%'>").text("포토아이디");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);
        console.log('createEmployeeView erpwrite arg.dbpath=' + arg.dbpath);
        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                console.log('photo_blob=', info.photo_blob);
                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.contact_id).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.display_name);
                var tdE4 = $("<td>").text(info.phone_num);
                var tdE5 = $("<td>").text(info.photo_id);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'memberrecord', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }

    createList(info7, arg, eventHandler) {

        var loginfo = info7.loginfo;
        var arrarr = info7.arrarr;
        var grouparr = info7.grouparr;

        $(arg.elem).empty();

        var $temp = $('<div>');
        var head = `<div class="alert alert-dark" role="alert">
                      ${info7.title ?? "title"}
                    </div>`;
        $temp.append(head);

        var cnt = 0;
        var $listView = $('<div>');
        var $list = $('<ul class="tree list-group">');
        var $listItem = null, $treeItemIn = null;
        $listView.append($list);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                //console.log('createGroupBoardView info.bctype====' + info.bctype);
                var $dat_media_box = $('<div class="d-flex ">');
                //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
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

                var $datbody = $('<div class="media-body">');

                var $bodyhead = $('<div class="row justify-content-between">');
                var str = info.id + " (" + info.register + ")";
                var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.key);
                var $head_right = $('<div class="mt-0">');
                $bodyhead.append($head_left).append($head_right);

                var $bodybody = $('<p>').html(info.info);

                $datbody.append($bodyhead);
                $datbody.append($bodybody);

                $dat_media_box.append($img).append($datbody);

                var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
                var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
                var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

                //datinfo.customer_btn1 = btn1;
                $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
                $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info }, this.eventHandler);
                $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
                $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

                $head_right.append(btn1).append(btn2).append(btn3);

                $listItem = $('<li class="list-group-item">');
                $listItem.append($dat_media_box);
                $listItem.bind("click", { type: 'record', info: info, arg: arg }, this.eventHandler);
                $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                $list.append($listItem);
            }
        }

        $temp.append($listView);

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        //alert($temp.html());
        return $temp;
    }

}

class EmployeeView extends ViewBase {
    constructor() {
        super();
    }

    getReturnValue() {
        var type, value;
        var arg = Array.prototype.slice.call(arguments);
        if (arg && arg[0])
            type = arg[0];
        else
            return;
        if (arg && arg[1])
            value = arg[1];
        console.log(`getReturnValue type==${type}`);
        //_tempCount++;
        var info = {};
        if (type == 'icon' || type == 'image') {
            var form = document.getElementById(this.selectedImageFormId);
            console.log('this.selectedImageFormId**=' + this.selectedImageFormId);
            
            //form.imageinput.value = 'image=' + value;
            if (this.selectedImageFormId == "empViewForm") {
                form.path.value = 'image=' + value;
                $('#avatarimg').attr('src', value);
            }
            else if (this.selectedImageFormId == "empcareerViewForm") {
                $('#careerbtnimg').attr('src', value);
            } else if (this.selectedImageFormId == "empcareerViewFormbg") {
                $('#careerbtnbgimg').attr('src', value);
            }
                
            //$('#iconchange_input').val(type + ':' + value);
            __modal.hide();
        } 
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;
        console.log('type**=' + type );
        if (type == 'erpwrite') {

            //__modal.show('입 력', self.createErpFormView());
            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`글쓰기`, self.createErpFormView());
            $('#empImgselBtn').bind("click", { type: 'empImgselBtnClick', self: self, info: info, arg: arg }, e.data.self.eventHandler);
            var form = document.getElementById("empViewForm");
            console.log('arg.renderinfo.keyfield*=' + arg.renderinfo.keyfield);
            if (arg.renderinfo.keyfield) {
                form.companycode.value = arg.renderinfo.key;
            } else {
                form.companycode.disabled = true;
            }
            form.dbpath.value = arg.dbpath;
            $('#empdelSubmit').remove();
            $('#empmodifySubmit').remove();
            $('#empaddSubmit').bind("click", { type: 'empaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'empImgselBtnClick') {
            self.selectedImageFormId = "empViewForm";
            var c = new FileController({ type: 'filelist', code: 'root', filetype: 'file', path: '/files/media/images/icons/', filter: 'image', returntype: 'return', $parent: self });
            var elem = document.createElement('div');
            c.renderController(elem);
            __modal.show(`보기`, elem);
            console.log(self);
            var form = document.getElementById("datForm");
            form.code.value = arg.code;
            form.dbpath.value = arg.dbpath;
            form.uid.value = info.uid;

        } else if (type == 'empaddSubmit') {

            var form = document.getElementById("empViewForm");
            form.dbpath.value = arg.dbpath;
            if (arg.renderinfo.tag)
                form.tag.value = arg.renderinfo.tag;
            console.log('form.path.value********=' + form.path.value);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

            if (window._fullscreen) {
                window._fullscreen.offscreen();
                window._fullscreen = null;
            }
        } else if (type == 'empdelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("empViewForm");
            form.dbpath.value = arg.dbpath;
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'empmodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("empViewForm");
            form.dbpath.value = arg.dbpath;
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'empviewbody') {

            var str = "/view.erp?code=" + arg.code + "&page=" + arg.page + "&uid=" + info.uid + "&fid=" + info.fid + "&dbpath=" + arg.dbpath + "&empcode=" + info.empcode + "&utf8=ok&";
            //console.log("eventHandler(e) boardlist ============= str == " + str);
            console.log('eventHandler(e) arg.renderinfo 222====' + arg.renderinfo);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "erpview";
            arg.self.listAjax(arg);
            return;

            self.createViewbody(info, arg, e.data.self.eventHandler);
            var form = document.getElementById("empViewForm");
            form.dbpath.value = arg.dbpath;
            /***
            form.uid.value = info.uid;
            console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.empcode.value = info.empcode;
            form.empname.value = info.empname;
            form.nation.value = info.nation;
            form.englishname.value = info.englishname;
            form.email.value = info.email;
            form.postnum.value = info.postnum;
            form.addr.value = info.addr;
            form.buse.value = info.buse;
            form.jicchakcode.value = info.jicchakcode;
            form.jicchak.value = info.jicchak;
            form.jicgub.value = info.jicgub;
            form.jicjong.value = info.jicjong;
            form.jicmugubun.value = info.jicmugubun;
            form.hobong.value = info.hobong;
            form.ibsadate.value = info.ibsadate;
            form.ibsagubun.value = info.ibsagubun;
            form.enddate.value = info.enddate;
            form.returndate.value = info.returndate;
            form.huyjikdate.value = info.huyjikdate;
            form.gbyutype.value = info.gbyutype;
            form.yungm_gb.value = info.yungm_gb;
            form.bohum_gb.value = info.bohum_gb;
            form.bohum_num.value = info.bohum_num;
            form.bankcode.value = info.bankcode;
            form.gyejoa_num.value = info.gyejoa_num;
            form.chulcard_num.value = info.chulcard_num;
            //form.history.value = info.history;
            //form.register.value = info.register;
            $('#empaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#empdelSubmit').bind("click", { type: 'empdelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#empmodifySubmit').bind("click", { type: 'empmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
             */
        } else if (type == 'personalwrite') {
            __modal.show('입 력', self.createEmppersonalFormView());

            var arrarr = info.arrarr;
            var info2 = arrarr[0];
            var personalarr = info.personalarr;
            var personalInfo = personalarr[0];
            console.log(`personalInfo=${personalInfo}`);
            var form = document.getElementById("emppersonalViewForm");
            form.empcode.value = info2.empcode;
            form.dbpath.value = arg.dbpath;
            form.sex.value = personalInfo.sex;
            form.bonjuk.value = personalInfo.bonjuk;
            form.birthday.value = personalInfo.birthday;
            form.birthdaygubun.value = personalInfo.birthdaygubun;
            form.bloodtype.value = personalInfo.bloodtype;
            form.marrydate.value = personalInfo.marrydate;
            form.tel.value = personalInfo.tel;
            form.handtel.value = personalInfo.handtel;
            form.jonggyo.value = personalInfo.jonggyo;
            form.chuymi.value = personalInfo.chuymi;
            form.speciality.value = personalInfo.speciality;
            form.sedaeju.value = personalInfo.sedaeju;

            form.jugutype.value = personalInfo.jugutype;
            form.postnum.value = personalInfo.postnum;
            form.addr.value = personalInfo.addr;
            form.region.value = personalInfo.region;
            $('#emppersonaldelSubmit').remove();
            $('#emppersonalmodifySubmit').remove();
            $('#emppersonaladdSubmit').bind("click", { type: 'emppersonaladdSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            
        } else if (type == 'emppersonaladdSubmit') {

            var form = document.getElementById("emppersonalViewForm");
            form.dbpath.value = arg.dbpath;
            //form.empcode.value = info.empcode;
            console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erpview";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'emppersonaldelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("emppersonalViewForm");
            form.dbpath.value = arg.dbpath;
            form.empcode.value = info.empcode;
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'emppersonalmodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("emppersonalViewForm");
            form.dbpath.value = arg.dbpath;
            form.addtype.value = 'modify';
            form.empcode.value = info.empcode;
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'emppersonalviewbody') {

            //__fullscreenView.setContent(`보기`, self.createErpFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createEmppersonalFormView());

            var form = document.getElementById("emppersonalViewForm");
            form.dbpath.value = arg.dbpath;
            form.uid.value = info.uid;
            form.empcode.value = info.empcode;
            form.empname.value = info.empname;
            form.sex.value = info.sex;
            form.bonjuk.value = info.bonjuk;
            form.birthday.value = info.birthday;
            form.birthdaygubun.value = info.birthdaygubun;
            form.bloodtype.value = info.bloodtype;
            form.marrydate.value = info.marrydate;
            form.tel.value = info.tel;
            form.handtel.value = info.handtel;
            form.jonggyo.value = info.jonggyo;
            form.chuymi.value = info.chuymi;
            form.speciality.value = info.speciality;
            form.hoju.value = info.hoju;
            form.sedaeju.value = info.sedaeju;

            form.jugutype.value = info.jugutype;
            form.postnum.value = info.postnum;
            form.addr.value = info.addr;
            form.bonjugpostnum.value = info.bonjugpostnum;
            form.bonjug.value = info.bonjug;
            form.region.value = info.region;
            form.register.value = info.register;

            //form.register.value = info.register;
            $('emppersonaladdSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#emppersonaldelSubmit').bind("click", { type: 'emppersonaldelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#emppersonalmodifySubmit').bind("click", { type: 'emppersonalmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);

        } else if (type == 'familyviewBtn') {
            
            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`입력`, self.createFamilyList(info, arg, self.eventHandler));
        } else if (type == 'familywrite') {
            __modal.show('입 력', self.createEmpfamilyFormView());

            var form = document.getElementById("empfamilyViewForm");

            form.dbpath.value = arg.dbpath;
            form.empcode.value = e.data.empcode;
            $('#empfamilydelSubmit').remove();
            $('#empfamilymodifySubmit').remove();
            $('#empfamilyaddSubmit').bind("click", { type: 'empfamilyaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'empfamilyaddSubmit') {

            var form = document.getElementById("empfamilyViewForm");
            form.dbpath.value = arg.dbpath;
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erpview";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/view.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'empfamilydelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("empfamilyViewForm");
            form.dbpath.value = arg.dbpath;
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erpview";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/view.erp?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'empfamilymodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("empfamilyViewForm");
            form.dbpath.value = arg.dbpath;
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erpview";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/view.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'empfamilyviewbody') {

            //__fullscreenView.setContent(`보기`, self.createErpFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createEmppersonalFormView());

            var form = document.getElementById("empfamilyViewForm");
            form.dbpath.value = arg.dbpath;
            form.uid.value = info.uid;
            console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.empcode.value = info.empcode;
            form.empname.value = info.empname;
            form.relation.value = info.relation;
            form.name.value = info.name;
            form.telphone.value = info.telphone;
            form.addr.value = info.addr;
            form.school.value = info.school;
            form.job.value = info.job;
            form.samehouse.value = info.samehouse;
            form.register.value = info.register;

            //form.register.value = info.register;
            $('empfamilyaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#empfamilydelSubmit').bind("click", { type: 'empfamilydelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#empfamilymodifySubmit').bind("click", { type: 'empfamilymodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);

        } else if (type == 'careerviewBtn') {
            
            //__modal.show('입 력', self.createEmpcareerFormView());
            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`입력`, self.createCareerList(info, arg, self.eventHandler));
            
        } else if (type == 'careerwrite') {
            //__modal.show('입 력', self.createEmpcareerFormView());
            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`입력`, self.createEmpcareerFormView());
            $('#careerImgselBtn').bind("click", { type: 'careerImgselBtnClick', self: self, info: info, arg: arg }, e.data.self.eventHandler);
            $('#careerbgImgselBtn').bind("click", { type: 'careerbgImgselBtnClick', self: self, info: info, arg: arg }, e.data.self.eventHandler);

            var form = document.getElementById("empcareerViewForm");

            form.dbpath.value = arg.dbpath;
            form.empcode.value = e.data.empcode;
            $('#empcareerdelSubmit').remove();
            $('#empcareermodifySubmit').remove();
            $('#empcareeraddSubmit').bind("click", { type: 'empcareeraddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'careerImgselBtnClick') {
            self.selectedImageFormId = "empcareerViewForm";
            var c = new FileController({ type: 'filelist', code: 'root', filetype: 'file', path: '/files/media/images/icons/', filter: 'image', returntype: 'return', $parent: self });
            var elem = document.createElement('div');
            c.renderController(elem);
            __modal.show(`보기`, elem);
            console.log(self);
            var form = document.getElementById("datForm");
            form.code.value = arg.code;
            form.dbpath.value = arg.dbpath;
            form.uid.value = info.uid;

        } else if (type == 'careerbgImgselBtnClick') {
            self.selectedImageFormId = "empcareerViewFormbg";
            var c = new FileController({ type: 'filelist', code: 'root', filetype: 'file', path: '/files/media/images/icons/', filter: 'image', returntype: 'return', $parent: self });
            var elem = document.createElement('div');
            c.renderController(elem);
            __modal.show(`보기`, elem);
            console.log(self);
            var form = document.getElementById("datForm");
            form.code.value = arg.code;
            form.dbpath.value = arg.dbpath;
            form.uid.value = info.uid;

        } else if (type == 'empcareeraddSubmit') {

            var form = document.getElementById("empcareerViewForm");

            var value = `value=${form.value.value}`;
           
            if ($('#careerbtnimg').attr('src'))
                value = value + '&image=' + $('#careerbtnimg').attr('src');
            if ($('#careerbtnbgimg').attr('src'))
                value = value + '&bgimage=' + $('#careerbtnbgimg').attr('src');

            form.value.value = value;

            form.dbpath.value = arg.dbpath;
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erpview";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/view.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);
            if (window._fullscreen) {
                window._fullscreen.offscreen();
                window._fullscreen = null;
            }
        } else if (type == 'empcareerdelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("empcareerViewForm");
            form.dbpath.value = arg.dbpath;
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erpview";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/view.erp?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'empcareermodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("empcareerViewForm");
            form.dbpath.value = arg.dbpath;
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erpview";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/view.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg2);

        } else if (type == 'empcareerviewbody') {

            //__fullscreenView.setContent(`보기`, self.createErpFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createEmppersonalFormView());

            var form = document.getElementById("empcareerViewForm");
            form.dbpath.value = arg.dbpath;
            form.uid.value = info.uid;
            console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.empcode.value = info.empcode;
            form.type.value = info.type;
            form.name.value = info.name;
            form.skill.value = info.skill;
            form.work.value = info.work;
            form.school.value = info.school;
            form.job.value = info.job;
            form.award.value = info.award;
            form.starttime.value = info.starttime;
            form.endtime.value = info.endtime;
            form.info.value = info.info;
            form.register.value = info.register;

            //form.register.value = info.register;
            $('empcareeraddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#empcareerdelSubmit').bind("click", { type: 'empcareerdelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#empcareermodifySubmit').bind("click", { type: 'empcareermodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);

        } else if (type == 'erppage') {
            var str = "/list.erp?code=" + arg.code + "&page=" + e.data.page + "&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&";
            console.log('ErpController erppage=========== str=' + str);
            //var arg2 = { path: str, type: "erplist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.path = str;
            arg.self.listAjax(arg);
        } else if (type == 'erpfind') {
            var keyfield = $("#findform option:selected").val();
            var key = $("#findform input[name=key]").val();
            if (keyfield == "subject" || keyfield == "comment")
                key = Base64.encode(key);

            var str = "/list.erp?code=" + arg.code + "&dbpath=" + arg.dbpath + "&keyfield=" + keyfield + "&key=" + key + "&";
            console.log(`ErpController erpfind str=${str}  self=${self}`);
            //var arg2 = { path: str, type: 'erplist', dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.path = str;
            arg.self.listAjax(arg);
        }
    }

    createErpFormView() {
        var mo = `<div class="">
                        <form id="empViewForm" method="post" class="form-horizontal white-bg-gradient">
                            <input type="hidden" name="type" value="add" />
                            <input type="hidden" name="code" value="employee" />
                            <input type="hidden" name="addtype" value="add" />
                            <input type="hidden" name="boardtype" value="base" />
                            <input type="hidden" name="dbpath" />
                            <input type="hidden" name="uid" />
                            <input type="hidden" name="tag" />
                            <input type="hidden" name="path" />

                            <div class="card text-left">
                                <div class="card-header">
                                    개인정보
                                </div>
                                <div class="card-body">
                                    <div class="controls">
                                        <div class="row">

                                            <div class="col-sm-4">
                                                <div class="text-center">
                                                    <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" id="avatarimg" alt="avatar">
                                                    
                                                    <button type = "button" class="btn" id="empImgselBtn" >이미지선택</button >
                                                </div>

                                            </div>
                                            <div class="col-sm-8">
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="companycode" class="control-label">회사코드</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="companycode" placeholder="회사코드..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="nation" class="control-label">국적</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="nation" placeholder="국적..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="empname" class="control-label">이름</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="empname" placeholder="이름..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="englishname" class="control-label">영문이름</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="englishname" placeholder="영문이름..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="email" class="control-label">이메일</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="email" placeholder="이메일..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="form-group">
                                                            <label for="juminno" class="control-label">주민번호</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="juminno" placeholder="주민번호..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div><!-- <div class="col-sm-8"> -->

                                        </div>

                                        <div class="row">
                                            <div class="col-sm-8">
                                                <div class="form-group">
                                                    <label for="addr" class="control-label">주소</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="addr" placeholder="주소..." required />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="postnum" class="control-label">우편번호</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="postnum" placeholder="우편번호..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>

                            </div><!-- /.card -->
                            <div class="card text-left">
                                <div class="card-header">
                                    관리정보
                                </div>
                                <div class="card-body">
                                    <div class="controls">
                                        <div class="row">

                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="busu" class="control-label">부서</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="buse" placeholder="부서..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="controls">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="jicchakcode" class="control-label">직책코드</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="jicchakcode" placeholder="직책코드..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="jicchak" class="control-label">직책</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="jicchak" placeholder="직책..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="jicgub" class="control-label">직급</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="jicgub" placeholder="직급..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>

                                    <div class="controls">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="jicjong" class="control-label">직종</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="jicjong" placeholder="직종..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="jicmugubun" class="control-label">직무구분</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="jicmugubun" placeholder="직무구분..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="hobong" class="control-label">호봉</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="hobong" placeholder="호봉..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>

                                    <div class="controls">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="ibsadate" class="control-label">입사일</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="ibsadate" placeholder="입사일..." required />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="ibsagubun" class="control-label">입사구분</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="ibsagubun" placeholder="입사구분..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="enddate" class="control-label">퇴사일</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="enddate" placeholder="퇴사일..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>

                                    <div class="controls">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="returndate" class="control-label">복직일</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="returndate" placeholder="복직일..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="huyjikdate" class="control-label">휴직일</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="huyjikdate" placeholder="휴직일..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="gbyutype" class="control-label">급여종류</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="gbyutype" placeholder="급여종류..." required />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>

                                </div>

                            </div>

                            <div class="card text-left">
                                <div class="card-header">
                                    금융정보
                                </div>
                                <div class="card-body">

                                    <div class="controls">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="yungm_gb" class="control-label">연금등급</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="yungm_gb" placeholder="연금등급..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="bohum_gb" class="control-label">보험등급</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="bohum_gb" placeholder="보험등급..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="bohum_num" class="control-label">보험번호</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="bohum_num" placeholder="보험번호..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>

                                    <div class="controls">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="bankcode" class="control-label">은행코드</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="bankcode" placeholder="은행코드..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="gyejoa_num" class="control-label">계좌번호</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="gyejoa_num" placeholder="계좌번호..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <label for="chulcard_num" class="control-label">출퇴근카드번호</label>
                                                    <div>
                                                        <input type="text" class="form-control" name="chulcard_num" placeholder="출퇴근카드번호..." />
                                                    </div>
                                                    <div class="help-block with-errors"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>

                                </div>
                                <div class="card-footer text-muted">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" for="submit">   </label>
                                        <div class="col-sm-4">
                                            <input type="button" id="empaddSubmit" value="전송">
                                            <input type="button" id="empdelSubmit" value="삭제">
                                            <input type="button" id="empmodifySubmit" value="수정">
                                            <input type="reset" value="리 셋">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>`;

        return mo;
    }

    createEmppersonalFormView() {
        var mo = `<form id="emppersonalViewForm" method="post" class="form-horizontal white-bg-gradient">
                <h2>사원 개인정보</h2>
                <p>사원정보 회사원 개인정보입력</p>
                <input type="hidden" name="type" value="add" />
                <input type="hidden" name="code" value="personal" />
                <input type="hidden" name="addtype" value="add" />
                <input type="hidden" name="boardtype" value="base" />
                <input type="hidden" name="dbpath" value="erp.dadb" />

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="empcode" class="control-label">사원코드</label>
                                <div>
                                    <input type="text" class="form-control" name="empcode" placeholder="사원코드..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="sex" class="control-label">성별</label>
                                <div>
                                    <input type="text" class="form-control" name="sex" placeholder="성별..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="bonjuk" class="control-label">본적</label>
                                <div>
                                    <input type="text" class="form-control" name="bonjuk" placeholder="본적..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="birthday" class="control-label">생일</label>
                                <div>
                                    <input type="text" class="form-control" name="birthday" placeholder="생일..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="birthdaygubun" class="control-label">생일구분</label>
                                <div>
                                    <input type="text" class="form-control" name="birthdaygubun" placeholder="생일구분(양 음력)..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="bloodtype" class="control-label">혈액형</label>
                                <div>
                                    <input type="text" class="form-control" name="bloodtype" placeholder="혈액형..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="marrydate" class="control-label">결혼기념일</label>
                                <div>
                                    <input type="text" class="form-control" name="marrydate" placeholder="결혼기념일..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="tel" class="control-label">전화번호</label>
                                <div>
                                    <input type="text" class="form-control" name="tel" placeholder="전화번호..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="handtel" class="control-label">핸드폰</label>
                                <div>
                                    <input type="text" class="form-control" name="handtel" placeholder="핸드폰..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="chuymi" class="control-label">취미</label>
                                <div>
                                    <input type="text" class="form-control" name="chuymi" placeholder="취미..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="handtel" class="control-label">종교</label>
                                <div>
                                    <input type="text" class="form-control" name="jonggyo" placeholder="종교..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="chuymi" class="control-label">특기</label>
                                <div>
                                    <input type="text" class="form-control" name="speciality" placeholder="특기..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="sedaeju" class="control-label">세대주</label>
                                <div>
                                    <input type="text" class="form-control" name="sedaeju" placeholder="세대주..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="jugutype" class="control-label">주거타입</label>
                                <div>
                                    <input type="text" class="form-control" name="jugutype" placeholder="주거타입..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="postnum" class="control-label">우편번호</label>
                                <div>
                                    <input type="text" class="form-control" name="postnum" placeholder="우편번호..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="addr" class="control-label">주소</label>
                                <div>
                                    <input type="text" class="form-control" name="addr" placeholder="주소..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="region" class="control-label">지역</label>
                                <div>
                                    <input type="text" class="form-control" name="region" placeholder="지역..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="form-group">
                    <div class="col-sm-4">
                        <input type="button" id="emppersonaladdSubmit" value="전송">
                        <input type="button" id="emppersonaldelSubmit" value="삭제">
                        <input type="button" id="emppersonalmodifySubmit" value="수정">
                        <input type="reset" value="리 셋">
                    </div>
                </div>
            </form>`;

        return mo;
    }

    createEmpfamilyFormView() {
        var mo =
            `<form id="empfamilyViewForm" method="post" class="form-horizontal white-bg-gradient">
                <h2>사원 가족정보</h2>
                <p>가족정보 회사원 가족정보입력</p>
                <input type="hidden" name="type" value="add" />
                <input type="hidden" name="code" value="empfamily" />
                <input type="hidden" name="addtype" value="add" />
                <input type="hidden" name="boardtype" value="base" />
                <input type="hidden" name="dbpath" value="erp.edb" />

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="empcode" class="control-label">사원코드</label>
                                <div>
                                    <input type="text" class="form-control" name="empcode" placeholder="사원코드..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="relation" class="control-label">관계</label>
                                <div>
                                    <input type="text" class="form-control" name="relation" placeholder="본인과관계..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="name" class="control-label">이름</label>
                                <div>
                                    <input type="text" class="form-control" name="name" placeholder="이름..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="telphone" class="control-label">관계</label>
                                <div>
                                    <input type="text" class="form-control" name="telphone" placeholder="본인과관계..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="addr" class="control-label">주소</label>
                                <div>
                                    <input type="text" class="form-control" name="addr" placeholder="주소..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="school" class="control-label">학력</label>
                                <div>
                                    <input type="text" class="form-control" name="school" placeholder="학력..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="job" class="control-label">직업</label>
                                <div>
                                    <input type="text" class="form-control" name="job" placeholder="직업..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="samehouse" class="control-label">동거여부</label>
                                <div>
                                    <input type="text" class="form-control" name="samehouse" placeholder="동거여부..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="form-group">
                    <div class="col-sm-4">
                        <input type="button" id="empfamilyaddSubmit" value="전송">
                        <input type="button" id="empfamilydelSubmit" value="삭제">
                        <input type="button" id="empfamilymodifySubmit" value="수정">
                        <input type="reset" value="리 셋">
                    </div>
                </div>
            </form>`;

        return mo;
    }

    createEmpcareerFormView() {
        var mo =
            `<form id="empcareerViewForm" method="post" class="form-horizontal white-bg-gradient">
                <h2>커리어 정보</h2>
                <p>커리어 정보입력</p>
                <input type="hidden" name="type" value="add" />
                <input type="hidden" name="code" value="career" />
                <input type="hidden" name="addtype" value="add" />
                <input type="hidden" name="boardtype" value="base" />
                <input type="hidden" name="dbpath" value="erp.edb" />

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="empcode" class="control-label">사원코드</label>
                                <div>
                                    <input type="text" class="form-control" name="empcode" placeholder="사원코드..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="relation" class="control-label">관계</label>
                                <div>
                                    <select name="type" >
                                        <option value="skill">능력</option>
                                        <option value="work">작업</option>
                                        <option value="job">경력</option>
                                        <option value="award">수상</option>
                                        <option value="school">학력</option>
                                      </select>
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="name" class="control-label">이름</label>
                                <div>
                                    <input type="text" class="form-control" name="name" placeholder="이름..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="skill" class="control-label">키</label>
                                <div>
                                    <input type="text" class="form-control" name="key" placeholder="키..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>
                
                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="work" class="control-label">값</label>
                                <div>
                                    <input type="text" class="form-control" name="value" placeholder="값..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <button type = "button" class="btn" id="careerImgselBtn" ><img id="careerbtnimg" src="" alt="">이미지선택</button >
                <button type = "button" class="btn" id="careerbgImgselBtn" ><img id="careerbtnbgimg" src="" alt="">백그라운드이미지선택</button >
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="name" class="control-label">시작</label>
                                <div>
                                    <input type="date" class="form-control" name="starttime" placeholder="시작시간..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="skill" class="control-label">종료</label>
                                <div>
                                    <input type="date" class="form-control" name="endtime" placeholder="종료시간..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="name" class="control-label">정보</label>
                                <div>
                                    <textarea type="text" class="form-control" name="starttime" placeholder="정보..." required ></textarea>
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="form-group">
                    <div class="col-sm-4">
                        <input type="button" id="empcareeraddSubmit" value="전송">
                        <input type="button" id="empcareerdelSubmit" value="삭제">
                        <input type="button" id="empcareermodifySubmit" value="수정">
                        <input type="reset" value="리 셋">
                    </div>
                </div>
            </form>`;

        return mo;
    }

    createWorkItem(info, arg, eventHandler) {

        var strTag;
        var $boxcol = $('<div class="col mb-8">');
        var $box = $('<div class="card">');  //ex: box-default box-danger box-warning box-success box-solid
        $boxcol.append($box);
        if (info.cls) {

            $box.addClass(cls);
        }
        var $boxBody = null;

        var value2 = null;
        var $img = null;
        var value = __keyvalueSplitString(info.value);
        
        if (value && value.image) {
            //value.image = value.image.replace('//', '/');
            $img = $(`<img src="${value.image}" onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel">`);

        } else
            $img = $(`<img src="..." onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel">`);

        if (value && value.value) {
            value2 = value.value;
        }
        //alert("icon" + $boxHeader.html());
        $boxBody = $('<div class="card-body" style="overflow:auto">').css("display", info.display).attr("id", info.boxbodyid);

        if (info.key) {
            var $bodySubject = $('<h4 class="card-title">').append(info.key);
            $boxBody.append($bodySubject);
        }

        if (info.append) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.append);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $box.append($img).append($boxBody);

        //alert("$box.html()" + $box.html());
        return $boxcol;

    }

    createWorkList(info2, arg, eventHandler) {

        var loginfo = info2.loginfo;
        var arrarr = info2.arrarr;
        var grouparr = info2.grouparr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      Work
                    </div>`;
        $temp.append(head);

        var thumbnailE = $(`<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        </div>`);
        $temp.append(thumbnailE);

        if (arrarr && arrarr.length >= 0) {
            console.log('work arrarr.length=', arrarr.length);
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];
                var ele = null;
                ele = this.createWorkItem(info, arg, eventHandler);
                $(thumbnailE).append(ele);

                $(ele).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(ele).attr('style', 'cursor:pointer;cursor: hand;');

            }
        }

        //$(arg.elem).empty();
        //$(arg.elem).append($temp);

        //console.log($(arg.elem).html());
        return $temp;
    }

    createListBoxItem(info) {
        var strTag;

        var itemE = $('<div class="list-group-item list-group-item-action" data-toggle="list">');
        var flexItemE = $('<div class="d-flex justify-content-between">');
        var wItemE = $('<div class=" w-100">');
        console.log(info.path);
        var value2 = null;
        var $img = null;
        var value = __keyvalueSplitString(info.path);
        
        if (value && value.image) {
            //value.image = value.image.replace('//', '/');
            $img = $(`<img src="${value.image}" onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

        } else
            $img = $(`<img src="..." onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

        if (value && value.value) {
            value2 = value.value;
        }

        var subjectE = $('<h5 class="mb-1">').append(info.empname);
        var summaryE = $('<p class="mb-1">').append(info.jicchak);
        var appendE = $('<small class="text-muted">').append('  ' + info.id + ' ( ' + info.signdate + ' ) ');
        wItemE.append(subjectE).append(summaryE).append(appendE);

        flexItemE.append($img).append(wItemE);
        itemE.append(flexItemE);

        return itemE;

        var $media_box = $('<div class="d-flex border p-3">');
        var value2 = null;
        var $img = null;
        var value = __keyvalueSplitString(info.path);
        console.log(info.path);
        if (value && value.image) {
            //value.image = value.image.replace('//', '/');
            $img = $(`<img src="${value.image}" onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

        } else
            $img = $(`<img src="..." onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

        if (value && value.value) {
            value2 = value.value;
        }

        var $boxBody = $('<div class="media-body">');
        //alert('info.subject=' + info.subject);
        if (info.empname) {
            var $bodyHead = $('<div class="body-head list-inline">');

            var $bodySubject = $('<h5 class="list-inline-item">').append(info.empname);
            $bodyHead.append($bodySubject);
            $boxBody.append($bodyHead);

            if (info.headappend) {
                var $headappend = $('<div class="list-inline-item pull-right">').append('headappend' + info.headappend);
                $bodyHead.append($headappend);
            }
        }
        if (info.jicchak) {
            var $bodyComment = $('<p>').append(info.jicchak);
            $boxBody.append($bodyComment);
        }
        if (info.busu) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.busu);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $media_box.append($img).append($boxBody);

        return $media_box;
    }

    createSelectList(info2, arg, eventHandler) {
        var loginfo = info2.loginfo;
        var arrarr = info2.arrarr;
        var grouparr = info2.grouparr;
        //console.log('arg.renderinfo.rendertype====' + arg.renderinfo.rendertype);
        var $temp = $('<div>');
        var $tempChild = $('<div>');


        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        $temp.append($tempChild);

        var divElem;
        var divElem2;
        $tempChild.append(divElem).append(divElem2);
        if (arg.renderinfo.rendertype == 'selectlist_h') {

            $tempChild.addClass("row");
            divElem = $(`<div>`).addClass(`col-md-4`);
            divElem2 = $(`<div>`).addClass(`col-md-8`);
            $tempChild.append(divElem).append(divElem2);

        } else if (arg.renderinfo.rendertype == 'selectlist_v') {
            divElem = $(`<div>`);
            divElem2 = $(`<div>`);
            $tempChild.append(divElem2).append(divElem);

        }
        arg.viewelem = divElem2;
        /** 
        var $card = $('<div class="card card-primary">');
        var $cardHead = $('<div class="card-header">');
        var $cardBody = $('<div class="card-body">');
        var $cardFooter = $('<div class="card-footer clearfix no-border">');
        $card.append($cardHead).append($cardBody).append($cardFooter);
        divElem.append($card);
        
        var $cardHeadLeft = $('<div >');
        var $cardHeadRight = $('<div class="card-tools pull-right">');

        var $cardFooterDiv = $('<div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">');
        var $cardFooterLeft = $('<div class="btn-group" role="group" aria-label="First group">');
        var $cardFooterRight = $('<div class="btn-group" role="group" aria-label="First group">');
        $cardFooterDiv.append($cardFooterLeft).append($cardFooterRight);
        $cardFooter.append($cardFooterDiv);

        $cardHead.append($cardHeadLeft).append($cardHeadRight);
        **/
        //var listE = $('<div class="list-group" role="tablist">');
        //divElem.append(listE);
        //$(arg.boardid).append(thumbnailE);
        //$cardBody.append(listE);

        var listE = $('<div class="list-group" role="tablist">');
        divElem.append(listE);

        //console.log('arrarr====' + arrarr);
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];

                var mediabox = this.createListBoxItem(info);
                listE.append(mediabox);

                $(mediabox).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        var $write = $("<div>");
        $temp.append($write);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $write.append($buttonE);


        var $page = $("<div>");
        $temp.append($page);
        var p = new PageNavView();
        arg.pageelem = $page;
        p.createPageNavView(info2, arg, this.eventHandler);

        var $find = $("<div>");
        $temp.append($find);
        arg.findelem = $find;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }

    createSkillItem(info) {
        var strTag;

        var $card = $('<div class="card">').addClass(`col-md-6`);
        var $cardContent = $('<div class="card-content">');
        var $cardBody = $('<div class="card-body">');
        var $media_box = $('<div class="media d-flex">');
        var $mediaBody = $('<div class="media-body text-left">');
        //var $mediaT = $('<h5 class="danger">423</h5>');
        var $mediaS = $('<span></span>').text(info.key);
        var v;
        if (isNaN(info.value)) {
            var p = Number(info.value);
            v = info.key + '(' + p + '%)';
        } else
            v = info.key;
        $mediaS.text(v);

        $card.append($cardContent);
        $cardContent.append($cardBody);
        $cardBody.append($media_box);
        $media_box.append($mediaBody);
        $mediaBody.append($mediaS);

        var $progressBox = $('<div class="progress mt-1 mb-0" style="height: 7px;">');
        var $progress = $(`<div class="progress-bar bg-danger" role="progressbar" style="width: ${info.value}%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>`);
        $progressBox.append($progress);
        $cardBody.append($progressBox);

        console.log(info.skill);
        if (info.skill) {
           
        }
        
        return $card;
    }

    createSkillList(arrarr, arg, eventHandler) {
        
        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'skill'}
                    </div>`;
        $temp.append(head);

        var divElem = $(`<div>`).addClass(`row`);
        $temp.append(divElem);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var mediabox = this.createSkillItem(info);
                divElem.append(mediabox);

                $(mediabox).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        return $temp;
    }

    createSchoolList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        //console.log(`arg.renderinfo.rendertype=${arg.renderinfo.rendertype}`)
        if (arg.renderinfo.rendertype == 'media') {
            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;

                    var mediabox = this.createSkillItem(info);
                    $temp.append(mediabox);

                    $(mediabox).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                    $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
                }
            }

            $(arg.elem).empty();
            $(arg.elem).append($temp);

            return $temp;
        }

    }

    createAwardList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

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

                var value2 = null;
                var $img = null;
                var value = __keyvalueSplitString(info.value);

                if (value && value.image) {
                    //value.image = value.image.replace('//', '/');
                    $img = $(`<img src="${value.image}" onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

                } else
                    $img = $(`<img src="..." onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

                if (value && value.value) {
                    value2 = value.value;
                }

                var idE = $('<i>').append(info.id);
                bottomE.append('<a href="#">더보기</a>').append(idE);

                if (info.iconclass) {
                    $img = $(`<i class="${info.iconclass}">`);
                }


                var subjectE = $('<h5 class="title">').append(info.key);
                var appendE = $('<span>').append('  ' + 'id' + ' ( ' + info.starttime + ' ) ');
                var summaryE = $('<p>').append(value2);

                detailE.append(subjectE).append(appendE);
                sectionItemE.append(iconE).append(detailE).append(summaryE).append(bottomE);
                itemE.append(sectionItemE);

                timelineE.append(itemE);
            }
        }

        return $temp;

    }

    createJobList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      Job
                    </div>`;
        $temp.append(head);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var mediabox = this.createJobMediaItem(info);
                $temp.append(mediabox);

                $(mediabox).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        return $temp;
    }

    createThumbnailItem(info, arg, eventHandler) {
        var strTag;
        var $boxcol = $('<div class="col mb-8">');
        var $box = $('<div class="card">');  //ex: box-default box-danger box-warning box-success box-solid
        $boxcol.append($box);
        if (info.cls) {
            
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
        //alert("icon" + $boxHeader.html());
        $boxBody = $('<div class="card-body" style="overflow:auto">').css("display", info.display).attr("id", info.boxbodyid);

        if (info.subject) {
            var $bodySubject = $('<h4 class="card-title">').append(info.subject);
            $boxBody.append($bodySubject);
        }

        if (info.append) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.append);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $box.append($img).append($boxBody);

        //alert("$box.html()" + $box.html());
        return $boxcol;
    }

    createThumbnailItemR (info, arg, eventHandler) {
        var strTag;
        var $boxcol = $('<div class="col mb-8">');

        var $imageflip = $('<div class="drag image-flip" ontouchstart="this.classList.toggle(\'hover\');">');
        $boxcol.append($imageflip);

        var $mainflip = $('<div class="mainflip">');
        var $frontside = $('<div class="frontside">');
        var $backside = $('<div class="backside">');

        var $box = $('<div class="card">');  //ex: box-default box-danger box-warning box-success box-solid
        if (info.cls) {
            
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
        //alert("icon" + $boxHeader.html());
        $boxBody = $('<div class="card-body" style="overflow:auto">').css("display", info.display).attr("id", info.boxbodyid);

        if (info.subject) {
            var $bodySubject = $('<h4 class="card-title">').append(info.subject);
            $boxBody.append($bodySubject);
        }

        if (info.append) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.append);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $box.append($img).append($boxBody);
        $frontside.append($box);


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

        //alert("icon" + $boxHeader.html());
        $boxBody = $('<div class="card-body" style="overflow:auto">');

        if (info.subject) {
            var $bodySubject = $('<h4 class="card-title">').append(info.subject);
            $boxBody.append($bodySubject);
        }

        if (info.summary) {
            var $bodysummary = $('<h4 class="card-title">').append(info.summary);
            $boxBody.append($bodysummary);
        }

        if (info.append) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.append);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $box.append($boxBody);
        $backside.append($box);

        $mainflip.append($frontside).append($backside);
        $imageflip.append($mainflip);
        //alert("$box.html()" + $box.html());
        return $boxcol;
    }

    createThumbnailList(info2, arg, eventHandler) {

        var loginfo = info2.loginfo;
        var arrarr = info2.arrarr;
        var grouparr = info2.grouparr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        var thumbnailE = $(`<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        </div>`);
        $temp.append(thumbnailE);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];
                var ele = null;
                if (arg.renderinfo.rendertype == 'thumbnail')
                    ele = this.createThumbnailItem(info, arg, eventHandler);
                else
                    ele = this.createThumbnailItemR(info, arg, eventHandler);
                $(thumbnailE).append(ele);

                $(ele).bind("click", { type: 'empviewbody', info: info, loginfo: loginfo, self: this, arg: arg }, this.eventHandler);
                $(ele).attr('style', 'cursor:pointer;cursor: hand;');
                
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        var $write = $("<div>");
        $temp.append($write);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $write.append($buttonE);


        var $page = $("<div>");
        $temp.append($page);
        var p = new PageNavView();
        arg.pageelem = $page;
        p.createPageNavView(info2, arg, this.eventHandler);

        var $find = $("<div>");
        $temp.append($find);
        arg.findelem = $find;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        //console.log($(arg.elem).html());
        return $(thumbnailE);
    }

    createJobMediaItem(info, arg, eventHandler) {
        var strTag;

        var $media_box = $('<div class="list-group-item list-group-item-action ">');
        var $media_box_item = $('<div class="d-flex w-100 justify-content-between">');
        $media_box.append($media_box_item);
        var value2 = null;
        var $img = null;
        var value = __keyvalueSplitString(info.value);
        console.log(info.key);
        if (value && value.image) {
            //value.image = value.image.replace('//', '/');
            $img = $(`<img src="${value.image}" onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

        } else
            $img = $(`<img src="..." onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

        if (value && value.value) {
            value2 = value.value;
        }

        var $boxBody = $('<div class="media-body">');
        //alert('info.subject=' + info.subject);
        if (info.key) {

            var $bodyHead = $('<div class="body-head list-inline">');

            var $bodySubject = $('<h5 class="list-inline-item">').append(info.key);
            $bodyHead.append($bodySubject);
            $boxBody.append($bodyHead);

            if (info.headappend) {
                var $headappend = $('<div class="list-inline-item pull-right">').append('headappend' + info.headappend);
                $bodyHead.append($headappend);
            }
        }
        if (value2) {
            var $bodyComment = $('<p>').append(value2);
            $boxBody.append($bodyComment);
        }
        if (info.bodyappend) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.bodyappend);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $media_box_item.append($img).append($boxBody);

        return $media_box;
    }

    createMediaItem(info, arg, eventHandler) {
        var strTag;

        var $media_box = $('<div class="list-group-item list-group-item-action ">');
        var $media_box_item = $('<div class="d-flex w-100 justify-content-between">');
        $media_box.append($media_box_item);
        var value2 = null;
        var $img = null;
        var value = __keyvalueSplitString(info.path);
        console.log(info.path);
        if (value && value.image) {
            //value.image = value.image.replace('//', '/');
            $img = $(`<img src="${value.image}" onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

        } else
            $img = $(`<img src="..." onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

        if (value && value.value) {
            value2 = value.value;
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
        if (info.summary) {
            var $bodyComment = $('<p>').append(info.summary);
            $boxBody.append($bodyComment);
        }
        if (info.bodyappend) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.bodyappend);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $media_box_item.append($img).append($boxBody);

        return $media_box;
    }

    createMediaList(info2, arg, eventHandler) {
        var loginfo = info2.loginfo;
        var arrarr = info2.arrarr;
        var grouparr = info2.grouparr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        var mediaE = $(`<div class="list-group">
                        </div>`);

        $temp.append(mediaE);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];
                var meItem = this.createMediaItem(info, arg, eventHandler);

                $(meItem).bind("click", { type: 'empviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(meItem).attr('style', 'cursor:pointer;cursor: hand;');

                mediaE.append(meItem);
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        var $write = $("<div>");
        $temp.append($write);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $write.append($buttonE);


        var $page = $("<div>");
        $temp.append($page);
        var p = new PageNavView();
        arg.pageelem = $page;
        p.createPageNavView(info2, arg, this.eventHandler);

        var $find = $("<div>");
        $temp.append($find);
        arg.findelem = $find;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        //console.log($(arg.elem).html());
        return $temp;
    }

    createList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        if (!this.topmenu) {
            if (arg && arg.renderinfo.tabthread) {
                var $tabelem = $('<div>');

                $(arg.elem).before($tabelem);
                arg.$tabelem = $tabelem;
                this.topmenu = new TabMenuView();
                this.topmenu.createThreadTabMenu(info2, arg, eventHandler);
                console.log('arg.renderinfo.rendertype3332====' + arg.renderinfo.rendertype);
            }
        }

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        if (arg && arg.renderinfo) {
            //console.log('arg.renderinfo.rendertype3332====' + arg.renderinfo.rendertype);
            if (arg.renderinfo.rendertype == 'table') {
                this.createTableList(info2, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'thumbnail' || arg.renderinfo.rendertype == 'thumbnailR') {
                this.createThumbnailList(info2, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'media') {
                this.createMediaList(info2, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'selectlist_h' || arg.renderinfo.rendertype == 'selectlist_v') {
                this.createSelectList(info2, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'list') {
                //this.createSelectList(info, arg, eventHandler);
            } else {
                this.createTableList(info2, arg, eventHandler);
            }
        }

        return $temp;
    }

    createFamilyList(info2, arg, eventHandler) {

        var info = info2.loginfo;
        var arr = info2.arrarr;
        var empinfo = arr[0];
        var pageinfo = info2.pageinfo;
        var arrarr = info2.empfamilyarr;
        
        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      가족정보
                    </div>`;
        $temp.append(head);

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("이름");
        var thE3 = $("<th style='width: 10%'>").text("관계");
        var thE4 = $("<th style='width: 10%'>").text("주소");
        var thE5 = $("<th style='width: 35%'>").text("직업");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'familywrite', self: this, info: info, empcode: empinfo.empcode, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);
        console.log('createEmployeeView erpwrite arg.dbpath=' + arg.dbpath);
        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.name).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.relation);
                var tdE4 = $("<td>").text(info.addr);
                var tdE5 = $("<td>").text(info.job);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'empfamilyviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        //$(arg.elem).empty();
        //$(arg.elem).append($temp);

        return $temp;
    }

    createCareerList(info2, arg, eventHandler) {

        var info = info2.loginfo;
        var arr = info2.arrarr;
        var empinfo = arr[0];
        var pageinfo = info2.pageinfo;
        var arrarr = info2.careerarr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      커리어
                    </div>`;
        $temp.append(head);

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("타입");
        var thE3 = $("<th style='width: 10%'>").text("키");
        var thE4 = $("<th style='width: 10%'>").text("값");
        var thE5 = $("<th style='width: 35%'>").text("날짜");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'careerwrite', self: this, info: info, empcode: empinfo.empcode, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);
        console.log('createEmployeeView careerwrite arg.dbpath=' + arg.dbpath);
        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var trE = $("<tr>");
                console.log('info.key=', info.key);
                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.type);
                var tdE3 = $("<td>").text(info.key);
                var tdE4 = $("<td>").text(info.value);
                var tdE5 = $("<td>").text(info.starttime);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'empfamilyviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        return $temp;
    }

    createProfile(info2, arg, eventHandler) {

        var arrarr = info2.arrarr;
        var info = arrarr[0];
        var personalarr = info2.personalarr;
        var personalInfo = personalarr[0];

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      프로필
                    </div>`;
        
        var strTag;
        var $boxcol = $('<div class="col mb-8">');
        var $box = $('<div class="card">');  //ex: box-default box-danger box-warning box-success box-solid
        $boxcol.append(head).append($box);

        var $boxBody = null;
        var value2 = null;
        var $img = null;
        var value = __keyvalueSplitString(info.path);
        console.log(info.path);
        if (value && value.image) {
            //value.image = value.image.replace('//', '/');
            $img = $(`<img src="${value.image}" onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

        } else
            $img = $(`<img src="..." onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

        if (value && value.value) {
            value2 = value.value;
        }
        //alert("icon" + $boxHeader.html());
        $boxBody = $('<div class="card-body" style="overflow:auto">');

        if (info.empname) {
            var $bodySubject = $('<h4 class="card-title">').append(info.empname);
            $boxBody.append($bodySubject);
        }

        if (info.email) {
            var $bodySubject = $('<div class="card-title">').append(info.email);
            $boxBody.append($bodySubject);
        }

        if (info.tel) {
            var $bodySubject = $('<div class="card-title">').append(info.tel);
            $boxBody.append($bodySubject);
        }

        if (info.append) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.append);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $box.append($img).append($boxBody);

        var head = `<div class="alert alert-dark" role="alert">
                      개인정보
                    </div>`;
        var $box = $('<div class="card">');  //ex: box-default box-danger box-warning box-success box-solid
        $boxcol.append(head).append($box);

        $boxBody = $('<div class="card-body" style="overflow:auto">');

        if (personalInfo && personalInfo.birthday) {
            var $bodySubject = $('<h4 class="card-title">').append(personalInfo.birthday);
            $boxBody.append($bodySubject);
        }

        if (personalInfo && personalInfo.bloodtype) {
            var $bodySubject = $('<div class="card-title">').append(personalInfo.bloodtype);
            $boxBody.append($bodySubject);
        }
        if (personalInfo && personalInfo.jonggyo) {
            var $bodySubject = $('<div class="card-title">').append(personalInfo.jonggyo);
            $boxBody.append($bodySubject);
        }
        if (personalInfo && personalInfo.chuymi) {
            var $bodySubject = $('<div class="card-title">').append(personalInfo.chuymi);
            $boxBody.append($bodySubject);
        }
        if (personalInfo && personalInfo.speciality) {
            var $bodySubject = $('<div class="card-title">').append(personalInfo.speciality);
            $boxBody.append($bodySubject);
        }

        if (personalInfo && personalInfo.append) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(personalInfo.append);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $box.append($boxBody);

        var $write = $("<div>");
        $box.append($write);
        var $buttonE = $("<input type='button' class='btn btn-primary btn-lg'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("개인정보");
        $buttonE.bind("click", { type: 'personalwrite', self: this, info: info2, arg: arg }, this.eventHandler);
        $write.append($buttonE);

        var $write = $("<div>");
        $box.append($write);
        var $buttonE = $("<input type='button' class='btn btn-primary btn-lg btn-block'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("가족정보");
        $buttonE.bind("click", { type: 'familyviewBtn', self: this, info: info2, arg: arg }, this.eventHandler);
        $write.append($buttonE);

        var $write = $("<div>");
        $box.append($write);
        var $buttonE = $("<input type='button' class='btn btn-primary btn-lg btn-block'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("커리어");
        $buttonE.bind("click", { type: 'careerviewBtn', self: this, info: info2, arg: arg }, this.eventHandler);
        $write.append($buttonE);
        //alert("$box.html()" + $box.html());
        return $boxcol;
    }

    createPortFolio(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;
        var skillarr = info2.skillarr;
        var personalarr = info2.personalarr;
        var empfamilyarr = info2.empfamilyarr;
        var careerarr = info2.careerarr;
        var uid;
        if (arrarr && arrarr[0])
            uid = arrarr[0].uid;

        var p = $('<div>');
        var profile = this.createProfile(info2, arg, eventHandler);
        //var family = this.createFamilyList(info2, arg, eventHandler);
        //var career = this.createCareerList(info2, arg, eventHandler);
        //p.append(profile).append(family).append(career);
        p.append(profile);

        var main = new MainLayout();
        var ver = new VerticalLayout();
        var ver2 = new VerticalLayout();
        var hor = new HorizontalLayout();
        var mdiv = document.createElement('div');
        var mo = new ModuleLoader({elem: mdiv});

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
                    awardArr.push(info);
                }
            }
        }
        var careerelem = $('<div>');
        var elem;
        if (skillArr.length > 0) {
            
            elem = this.createSkillList(skillArr, arg, eventHandler);
            careerelem.append(elem);
        }
        if (workArr.length > 0) {
            info2.arrarr = workArr;
            elem = this.createWorkList(info2, arg, eventHandler);
            careerelem.append(elem);
            console.log('elem.html()=', elem.html());
        }
        if (jobArr.length > 0) {
            info2.arrarr = jobArr;
            elem = this.createJobList(info2, arg, eventHandler);
            careerelem.append(elem);
        }
        if (schoolArr.length > 0) {
            info2.arrarr = schoolArr;
            elem = this.createSchoolList(info2, arg, eventHandler);
            careerelem.append(elem);
        }
        if (awardArr.length > 0) {
            info2.arrarr = awardArr;
            elem = this.createAwardList(info2, arg, eventHandler);
            careerelem.append(elem);
        }
        mo.setModuleData(careerelem.html());
        console.log('uid=', uid);
        if (uid == -1)
            return;
        var brdid = Number(uid.toString().padEnd(6, "0"));
        console.log(brdid);

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
        ver2.addControl(mo);
        ver2.addControl(board);
        //var erp = new ErpController('erplist', info.dbpath, 'employee', new EmployeeView(), {} , '');
        hor.setControl([p, 4], [ver2, 8]);
        //main.addControl(ver2);
        var $page = $("<div>");
        //$(arg.elem).empty();
        main.renderController($page);
        
        if (arg.viewelem) {
            $(arg.viewelem).empty();
            $(arg.viewelem).append($page);
        } else {
            $(arg.elem).empty();
            $(arg.elem).append($page);

        }
        //console.log($(arg.elem).html());
    }

    createViewbody(info2, arg, eventHandler) {

        console.log('arg.renderinfo.viewbody= ', arg.renderinfo.viewbody);
        if (arg.renderinfo.viewbody) {
            if (typeof arg.renderinfo.viewbody === "string") {
                arg.renderinfo.viewbody = eval("new " + arg.renderinfo.viewbody + "()");
                arg.renderinfo.viewbody.createViewbody(info2, arg, eventHandler);
            } else if (typeof arg.renderinfo.viewbody === "object")
                arg.renderinfo.viewbody.createViewbody(info2, arg, eventHandler);
        }
        else {

            this.createPortFolio(info2, arg, eventHandler);

            return;
            var info = info2.loginfo;
            var pageinfo = info2.pageinfo;
            var arrarr = info2.arrarr;
            var skillarr = info2.skillarr;
            var personalarr = info2.personalarr;
            var empfamilyarr = info2.empfamilyarr;
            var careerarr = info2.careerarr;
            var uid = -1;
            console.log('arrarr && arrarr.length=', arrarr.length);
            var p = $('<div>');
            var profile = this.createProfile(info2, arg, eventHandler);
            var family = this.createFamilyList(info2, arg, eventHandler);
            var career = this.createCareerList(info2, arg, eventHandler);
            p.append(profile).append(family).append(career);

            var main = new MainLayout();
            var ver = new VerticalLayout();
            var hor = new HorizontalLayout();

            main.addControl(ver);
            main.addControl(hor);

            

            //if (uid == -1)
                //return;
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

            console.log('arg.viewelem=', arg.viewelem);
            if (arg.viewelem) {
                $(arg.viewelem).empty();
                $(arg.viewelem).append($page);
            } else {
                $(arg.elem).empty();
                $(arg.elem).append($page);

            }

            return $page;

            //__fullscreenView.setContent(`보기`, this.createErpFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, this.createErpFormView());

            var form = document.getElementById("empViewForm");

            form.uid.value = info.uid;
            //console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.empcode.value = info.empcode;
            form.empname.value = info.empname;
            form.nation.value = info.nation;
            form.englishname.value = info.englishname;
            form.email.value = info.email;
            form.postnum.value = info.postnum;
            form.addr.value = info.addr;
            form.buse.value = info.buse;
            form.jicchakcode.value = info.jicchakcode;
            form.jicchak.value = info.jicchak;
            form.jicgub.value = info.jicgub;
            form.jicjong.value = info.jicjong;
            form.jicmugubun.value = info.jicmugubun;
            form.hobong.value = info.hobong;
            form.ibsadate.value = info.ibsadate;
            form.ibsagubun.value = info.ibsagubun;
            form.enddate.value = info.enddate;
            form.returndate.value = info.returndate;
            form.huyjikdate.value = info.huyjikdate;
            form.gbyutype.value = info.gbyutype;
            form.yungm_gb.value = info.yungm_gb;
            form.bohum_gb.value = info.bohum_gb;
            form.bohum_num.value = info.bohum_num;
            form.bankcode.value = info.bankcode;
            form.gyejoa_num.value = info.gyejoa_num;
            form.chulcard_num.value = info.chulcard_num;
            //form.history.value = info.history;
            //form.register.value = info.register;
            $('#empaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#empdelSubmit').bind("click", { type: 'empdelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#empmodifySubmit').bind("click", { type: 'empmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);

        }

        return arg.viewelem;
    }
}

class CompanyView extends ViewBase {
    constructor() {
        super();
    }

    getReturnValue() {
        var type, value;
        var arg = Array.prototype.slice.call(arguments);
        if (arg && arg[0])
            type = arg[0];
        else
            return;
        if (arg && arg[1])
            value = arg[1];
        console.log(`getReturnValue type==${type}`);
        //_tempCount++;
        var info = {};
        if (type == 'icon' || type == 'image') {
            var form = document.getElementById(this.selectedImageFormId);
            console.log('this.selectedImageFormId**=' + this.selectedImageFormId);

            //form.imageinput.value = 'image=' + value;
            if (this.selectedImageFormId == "companyViewForm") {
                form.path.value = 'image=' + value;
                $('#comavatarimg').attr('src', value);
            }
            else if (this.selectedImageFormId == "empcareerViewForm") {
                $('#careerbtnimg').attr('src', value);
            } else if (this.selectedImageFormId == "empcareerViewFormbg") {
                $('#careerbtnbgimg').attr('src', value);
            }

            //$('#iconchange_input').val(type + ':' + value);
            __modal.hide();
        }
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'erpwrite') {
            //__modal.show('입 력', self.createErpFormView());
            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`글쓰기`, self.createErpFormView());
            $('#comImgselBtn').bind("click", { type: 'comImgselBtnClick', self: self, info: info, arg: arg }, e.data.self.eventHandler);
            var form = document.getElementById("companyViewForm");
            console.log('form=' + form);
            if (arg.renderinfo.keyfield) {
                form.companycode.value = arg.renderinfo.key;
            } 

            form.dbpath.value = arg.dbpath;
            $('#companydelSubmit').remove();
            $('#companymodifySubmit').remove();
            $('#companyaddSubmit').bind("click", { type: 'companyaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'comImgselBtnClick') {
            self.selectedImageFormId = "companyViewForm";
            var c = new FileController({ type: 'filelist', code: 'root', filetype: 'file', path: '/files/media/images/icons/', filter: 'image', returntype: 'return', $parent: self });
            var elem = document.createElement('div');
            c.renderController(elem);
            __modal.show(`보기`, elem);
            console.log(self);
            var form = document.getElementById("datForm");
            form.code.value = arg.code;
            form.dbpath.value = arg.dbpath;
            form.uid.value = info.uid;

        } else if (type == 'companyaddSubmit') {

            var form = document.getElementById("companyViewForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);

            if (window._fullscreen) {
                window._fullscreen.offscreen();
                window._fullscreen = null;
            }
        } else if (type == 'companydelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("companyViewForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'companymodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("companyViewForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'companyviewbody') {

            var str = "/view.erp?code=" + arg.code + "&page=" + arg.page + "&uid=" + info.uid + "&fid=" + info.fid + "&dbpath=" + arg.dbpath + "&companycode=" + info.companycode + "&utf8=ok&";
            console.log("eventHandler(e) boardlist ============= str == " + str);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "erpview";
            arg.self.listAjax(arg);
            return;

            self.createViewbody(info, arg, e.data.self.eventHandler);

        } else if (type == 'careerwrite') {
            __modal.show('입 력', self.createEmpcareerFormView());

            var form = document.getElementById("empcareerViewForm");

            form.dbpath.value = arg.dbpath;
            form.empcode.value = e.data.companycode;
            $('#empcareerdelSubmit').remove();
            $('#empcareermodifySubmit').remove();
            $('#empcareeraddSubmit').bind("click", { type: 'empcareeraddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'empcareeraddSubmit') {

            var form = document.getElementById("empcareerViewForm");
            form.dbpath.value = arg.dbpath;
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'empcareerdelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("empcareerViewForm");
            form.dbpath.value = arg.dbpath;
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'empcareermodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("empcareerViewForm");
            form.dbpath.value = arg.dbpath;
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg.path=' + arg.path);
            arg.self.postAjax(arg2);

        } else if (type == 'empcareerviewbody') {

            //__fullscreenView.setContent(`보기`, self.createErpFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createEmppersonalFormView());

            var form = document.getElementById("empcareerViewForm");
            form.dbpath.value = arg.dbpath;
            form.uid.value = info.uid;
            console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.empcode.value = info.empcode;
            form.type.value = info.type;
            form.name.value = info.name;
            form.skill.value = info.skill;
            form.work.value = info.work;
            form.school.value = info.school;
            form.job.value = info.job;
            form.award.value = info.award;
            form.starttime.value = info.starttime;
            form.endtime.value = info.endtime;
            form.info.value = info.info;
            form.register.value = info.register;

            //form.register.value = info.register;
            $('empcareeraddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#empcareerdelSubmit').bind("click", { type: 'empcareerdelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#empcareermodifySubmit').bind("click", { type: 'empcareermodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);

        } else if (type == 'erppage') {
            var str = "/list.erp?code=" + arg.code + "&page=" + e.data.page + "&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&";
            console.log('ErpController erppage=========== str=' + str);
            //var arg2 = { path: str, type: "erplist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = 'erplist';
            arg.path = str;
            arg.self.listAjax(arg);
        } else if (type == 'erpfind') {
            var keyfield = $("#findform option:selected").val();
            var key = $("#findform input[name=key]").val();
            if (keyfield == "subject" || keyfield == "comment")
                key = Base64.encode(key);

            var str = "/list.erp?code=" + arg.code + "&dbpath=" + arg.dbpath + "&keyfield=" + keyfield + "&key=" + key + "&";
            console.log(`ErpController erpfind str=${str}  self=${self}`);
            //var arg2 = { path: str, type: 'erplist', dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.path = str;
            arg.self.listAjax(arg);
        }
    }

    createErpFormView() {
        var mo = `<form id="companyViewForm" method="post">

                            <input type="hidden" name="type" value="add" />
                            <input type="hidden" name="code" value="company" />
                            <input type="hidden" name="addtype" value="add" />
                            <input type="hidden" name="dbpath"/>
                            <input type="hidden" name="uid" />
                            <input type="hidden" name="path" />

                            <div class="controls">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="text-center">
                                            <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" id="comavatarimg" alt="avatar">
                                                    
                                            <button type = "button" class="btn" id="comImgselBtn" >이미지선택</button >
                                        </div>
                                        
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="sangho" class="control-label">회사코드</label>
                                            <div>
                                                <input type="text" class="form-control" name="companycode" placeholder="..." readonly/>
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                        <div class="form-group">
                                            <label for="sangho" class="control-label">상호</label>
                                            <div>
                                                <input type="text" class="form-control" name="companyname" placeholder="상호..." required />
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                        <div class="form-group">
                                            <label for="saupjanum" class="control-label">사업자번호</label>
                                            <div>
                                                <input type="text" class="form-control" name="saupjanum" placeholder="사업자번호..." required />
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="uptae" class="control-label">업태</label>
                                            <div>
                                                <input type="text" class="form-control" name="uptae" placeholder="업태..." required />
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="jongmok" class="control-label">종목</label>
                                            <div>
                                                <input type="text" class="form-control" name="jongmok" placeholder="종목..." required />
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="danga_dg" class="control-label">단가등급</label>
                                            <div>
                                                <input type="text" class="form-control" name="danga_dg" placeholder="단가등급..." required />
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="subject" class="control-label">거래타입</label>
                                            <div>
                                                <input type="text" class="form-control" name="dealtype" placeholder="거래타입..." required />
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="subject" class="control-label">대표자</label>
                                            <div>
                                                <input type="text" class="form-control" name="ceo" placeholder="대표자..." required />
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="tel" class="control-label">전화번호</label>
                                            <div>
                                                <input type="text" class="form-control" name="tel" placeholder="전화번호..." required />
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="tel" class="control-label">전화번호</label>
                                            <div>
                                                <input type="text" class="form-control" name="tel2" placeholder="전화번호..." required />
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="postnum" class="control-label">우편번호</label>
                                            <div>
                                                <input type="text" class="form-control" name="postnum" placeholder="우편번호..." required />
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="addr1" class="control-label">주소</label>
                                            <div>
                                                <input type="text" class="form-control" name="addr" placeholder="주소..." required />
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="row">
                                    <div class="col-sm-8">
                                        <div class="form-group">
                                            <label for="memo" class="control-label">메모</label>
                                            <div style="height:100%">
                                                <textarea type="text" name="memo" id="summernote" style="height:100%" required></textarea>
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="row">
                                    <div class="col-sm-8">
                                        <div class="form-group">
                                            <label for="info" class="control-label">정보</label>
                                            <div style="height:100%">
                                                <textarea type="text" name="info" id="summernote" style="height:100%" required></textarea>
                                            </div>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <input type="reset" value="리 셋" class="btn">
                                            <input type="button" id="companyaddSubmit" value="전송" class="btn btn-info">
                                            <input type="button" id="companydelSubmit" value="삭제" class="btn btn-info">
                                            <input type="button" id="companymodifySubmit" value="수정" class="btn btn-info">
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="clearfix"></div>

                        </form>`;

        return mo;
    }

    createEmpcareerFormView() {
        var mo =
            `<form id="empcareerViewForm" method="post" class="form-horizontal white-bg-gradient">
                <h2>커리어 정보</h2>
                <p>커리어 정보입력</p>
                <input type="hidden" name="type" value="add" />
                <input type="hidden" name="code" value="career" />
                <input type="hidden" name="addtype" value="add" />
                <input type="hidden" name="boardtype" value="base" />
                <input type="hidden" name="dbpath" value="erp.edb" />

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="empcode" class="control-label">사원코드</label>
                                <div>
                                    <input type="text" class="form-control" name="empcode" placeholder="사원코드..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="relation" class="control-label">관계</label>
                                <div>
                                    <select name="type" >
                                        <option value="skill">능력</option>
                                        <option value="work">작업</option>
                                        <option value="job">경력</option>
                                        <option value="award">수상</option>
                                        <option value="school">학력</option>
                                      </select>
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="name" class="control-label">이름</label>
                                <div>
                                    <input type="text" class="form-control" name="name" placeholder="이름..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="skill" class="control-label">능력</label>
                                <div>
                                    <input type="text" class="form-control" name="skill" placeholder="능력..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>
                
                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="work" class="control-label">작업</label>
                                <div>
                                    <input type="text" class="form-control" name="work" placeholder="작업..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="school" class="control-label">학력</label>
                                <div>
                                    <input type="text" class="form-control" name="school" placeholder="학력..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="job" class="control-label">경력</label>
                                <div>
                                    <input type="text" class="form-control" name="job" placeholder="경력..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="award" class="control-label">수상여부</label>
                                <div>
                                    <input type="text" class="form-control" name="award" placeholder="수상여부..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="name" class="control-label">시작</label>
                                <div>
                                    <input type="date" class="form-control" name="starttime" placeholder="시작시간..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="skill" class="control-label">종료</label>
                                <div>
                                    <input type="date" class="form-control" name="endtime" placeholder="종료시간..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="controls">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="name" class="control-label">정보</label>
                                <div>
                                    <textarea type="text" class="form-control" name="starttime" placeholder="정보..." required ></textarea>
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="form-group">
                    <div class="col-sm-4">
                        <input type="button" id="empcareeraddSubmit" value="전송">
                        <input type="button" id="empcareerdelSubmit" value="삭제">
                        <input type="button" id="empcareermodifySubmit" value="수정">
                        <input type="reset" value="리 셋">
                    </div>
                </div>
            </form>`;

        return mo;
    }

    createMediaItem(info) {
        var strTag;

        var $media_box = $('<div class="d-flex border p-3">');
        var value2 = null;
        var $img = null;
        var value = __keyvalueSplitString(info.path);

        if (value && value.image) {
            //value.image = value.image.replace('//', '/');
            $img = $(`<img src="${value.image}" onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

        } else
            $img = $(`<img src="..." onerror="onImgError(this);" width="80" height="80" imgtype="carousel">`);

        if (value && value.value) {
            value2 = value.value;
        }

        var $boxBody = $('<div class="media-body">');
        //console.log('info.companyname=' + info.companyname);
        //console.log('info.uptae=' + info.uptae);
        //console.log('info.jongmok=' + info.jongmok);
        if (info.companyname) {
            var $bodyHead = $('<div class="body-head list-inline">');

            var $bodySubject = $('<h5 class="list-inline-item">').append(info.companyname);
            $bodyHead.append($bodySubject);
            $boxBody.append($bodyHead);

            if (info.headappend) {
                var $headappend = $('<div class="list-inline-item pull-right">').append('headappend' + info.headappend);
                $bodyHead.append($headappend);
            }
        }
        if (info.jicchak) {
            var $bodyComment = $('<p>').append(info.uptae);
            $boxBody.append($bodyComment);
        }
        if (info.busu) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.jongmok);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $media_box.append($img).append($boxBody);

        return $media_box;
    }

    createMediaList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        //console.log(`arg.renderinfo.rendertype=${arg.renderinfo.rendertype}`)
        if (arg.renderinfo.rendertype == 'media') {
            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;

                    var mediabox = this.createMediaItem(info);
                    $temp.append(mediabox);

                    $(mediabox).bind("click", { type: 'companyviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                    $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
                }
            }

            var $write = $("<div>");
            $temp.append($write);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글작성");
            $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
            $write.append($buttonE);


            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, this.eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new ErpFindView();
            f.createFindView(info2, arg, this.eventHandler);

            $(arg.elem).empty();
            $(arg.elem).append($temp);

            return $temp;
        }

    }

    createListBoxItem(info) {
        var strTag;

        var itemE = $('<div class="list-group-item list-group-item-action" data-toggle="list">');
        var flexItemE = $('<div class="d-flex justify-content-between">');
        var wItemE = $('<div class=" w-100">');

        var value2 = null;
        var $img = null;
        var value = __keyvalueSplitString(info.path);
        console.log(info.path);
        if (value && value.image) {
            //value.image = value.image.replace('//', '/');
            $img = $(`<img src="${value.image}" onerror="onImgError(this);" width="50" height="50" imgtype="carousel">`);

        } else
            $img = $(`<img src="..." onerror="onImgError(this);" width="50" height="50" imgtype="carousel">`);

        if (value && value.value) {
            value2 = value.value;
        }

        var subjectE = $('<h5 class="mb-1">').append(info.companyname);
        var summaryE = $('<p class="mb-1">').append(info.uptae);
        var appendE = $('<small class="text-muted">').append('  ' + info.jongmok + ' ( ' + info.signdate + ' ) ');
        wItemE.append(subjectE).append(summaryE).append(appendE);

        flexItemE.append($img).append(wItemE);
        itemE.append(flexItemE);

        return itemE;

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
        if (info.empname) {
            var $bodyHead = $('<div class="body-head list-inline">');

            var $bodySubject = $('<h5 class="list-inline-item">').append(info.empname);
            $bodyHead.append($bodySubject);
            $boxBody.append($bodyHead);

            if (info.headappend) {
                var $headappend = $('<div class="list-inline-item pull-right">').append('headappend' + info.headappend);
                $bodyHead.append($headappend);
            }
        }
        if (info.jicchak) {
            var $bodyComment = $('<p>').append(info.jicchak);
            $boxBody.append($bodyComment);
        }
        if (info.busu) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.busu);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $media_box.append($img).append($boxBody);

        return $media_box;
    }

    createSelectList(info2, arg, eventHandler) {
        var loginfo = info2.loginfo;
        var arrarr = info2.arrarr;
        var grouparr = info2.grouparr;
        //console.log('arg.renderinfo.rendertype====' + arg.renderinfo.rendertype);
        var $temp = $('<div>');
        var $tempChild = $('<div>');


        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        $temp.append($tempChild);

        var divElem;
        var divElem2;
        $tempChild.append(divElem).append(divElem2);
        if (arg.renderinfo.rendertype == 'selectlist_h') {

            $tempChild.addClass("row");
            divElem = $(`<div>`).addClass(`col-md-4`);
            divElem2 = $(`<div>`).addClass(`col-md-8`);
            $tempChild.append(divElem).append(divElem2);

        } else if (arg.renderinfo.rendertype == 'selectlist_v') {
            divElem = $(`<div>`);
            divElem2 = $(`<div>`);
            $tempChild.append(divElem2).append(divElem);

        }
        arg.viewelem = divElem2;
        /** 
        var $card = $('<div class="card card-primary">');
        var $cardHead = $('<div class="card-header">');
        var $cardBody = $('<div class="card-body">');
        var $cardFooter = $('<div class="card-footer clearfix no-border">');
        $card.append($cardHead).append($cardBody).append($cardFooter);
        divElem.append($card);
        
        var $cardHeadLeft = $('<div >');
        var $cardHeadRight = $('<div class="card-tools pull-right">');

        var $cardFooterDiv = $('<div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">');
        var $cardFooterLeft = $('<div class="btn-group" role="group" aria-label="First group">');
        var $cardFooterRight = $('<div class="btn-group" role="group" aria-label="First group">');
        $cardFooterDiv.append($cardFooterLeft).append($cardFooterRight);
        $cardFooter.append($cardFooterDiv);

        $cardHead.append($cardHeadLeft).append($cardHeadRight);
        **/
        //var listE = $('<div class="list-group" role="tablist">');
        //divElem.append(listE);
        //$(arg.boardid).append(thumbnailE);
        //$cardBody.append(listE);

        var listE = $('<div class="list-group" role="tablist">');
        divElem.append(listE);

        console.log('arrarr====' + arrarr);
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];

                var mediabox = this.createListBoxItem(info);
                listE.append(mediabox);

                $(mediabox).bind("click", { type: 'companyviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        var $write = $("<div>");
        $temp.append($write);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $write.append($buttonE);


        var $page = $("<div>");
        $temp.append($page);
        var p = new PageNavView();
        arg.pageelem = $page;
        p.createPageNavView(info2, arg, this.eventHandler);

        var $find = $("<div>");
        $temp.append($find);
        arg.findelem = $find;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }

    createTableList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        /**
        var colgroupE = $("<colgroup>");
        $(tableE).append(colgroupE);
        var tCoolE1 = $("<col>").css("width", "50px");   //alert("aa");
        var tCoolE2 = $("<col>");
        var tCoolE3 = $("<col>").css("width", "70px");
        var tCoolE4 = $("<col>").css("width", "70px");
        var tCoolE5 = $("<col>").css("width", "50px");

        $(colgroupE).append(tCoolE1).append(tCoolE2).append(tCoolE3).append(tCoolE4).append(tCoolE5);
        **/
        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");
        $tableE.append(tHeadE).append(tBodyE).append(tFootE);
        //$(tableE).addClass('table').addClass('table-hover').attr("data-roll", "table").attr("class", "tableList");
        console.log('img');
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("상호");
        var thE3 = $("<th style='width: 10%'>").text("업태");
        var thE4 = $("<th style='width: 10%'>").text("대표");
        var thE5 = $("<th style='width: 35%'>").text("전화");
        var thE6 = $("<th style='width: 30%'>").text("주소");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5).append(thE6);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);

        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.sangho).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.uptae);
                var tdE4 = $("<td>").text(info.ceo);
                var tdE5 = $("<td>").text(info.tel);
                var tdE6 = $("<td>").text(info.addr);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5).append(tdE6);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'companyviewbody', info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }

    createList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        if (!this.topmenu) {
            if (arg && arg.renderinfo.tabthread) {
                var $tabelem = $('<div>');

                $(arg.elem).before($tabelem);
                arg.$tabelem = $tabelem;
                this.topmenu = new TabMenuView();
                this.topmenu.createThreadTabMenu(info, arg, eventHandler);
                //return;
            }
        }

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);


        if (arg && arg.renderinfo) {
            //console.log('arg.renderinfo.rendertype3332====' + arg.renderinfo.rendertype);
            if (arg.renderinfo.rendertype == 'table') {
                this.createTableList(info2, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'thumbnail' || arg.renderinfo.rendertype == 'thumbnailR') {
                this.createThumbnailList(info2, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'media') {
                this.createMediaList(info2, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'selectlist_h' || arg.renderinfo.rendertype == 'selectlist_v') {
                this.createSelectList(info2, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'list') {
                //this.createSelectList(info, arg, eventHandler);
            } else {
                this.createTableList(info2, arg, eventHandler);
            }
        }

        return $temp;

        if (arg.renderinfo.rendertype == 'media') {
            if (arrarr && arrarr.length >= 0) {
                for (var i = 0; i < arrarr.length; i++) {
                    //cnt++;
                    var info = arrarr[i];
                    var arr = arrarr[i].arr;

                    var mediabox = this.createMediaItem(info);
                    $temp.append(mediabox);

                    $(mediabox).bind("click", { type: 'companyviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                    $(mediabox).attr('style', 'cursor:pointer;cursor: hand;');
                }
            }

            var $write = $("<div>");
            $temp.append($write);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글작성");
            $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
            $write.append($buttonE);


            var $page = $("<div>");
            $temp.append($page);
            var p = new PageNavView();
            arg.pageelem = $page;
            p.createPageNavView(info2, arg, this.eventHandler);

            var $find = $("<div>");
            $temp.append($find);
            arg.findelem = $find;
            var f = new ErpFindView();
            f.createFindView(info2, arg, this.eventHandler);

            $(arg.elem).empty();
            $(arg.elem).append($temp);

            return $temp;
        }

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        /**
        var colgroupE = $("<colgroup>");
        $(tableE).append(colgroupE);
        var tCoolE1 = $("<col>").css("width", "50px");   //alert("aa");
        var tCoolE2 = $("<col>");
        var tCoolE3 = $("<col>").css("width", "70px");
        var tCoolE4 = $("<col>").css("width", "70px");
        var tCoolE5 = $("<col>").css("width", "50px");

        $(colgroupE).append(tCoolE1).append(tCoolE2).append(tCoolE3).append(tCoolE4).append(tCoolE5);
        **/
        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");
        $tableE.append(tHeadE).append(tBodyE).append(tFootE);
        //$(tableE).addClass('table').addClass('table-hover').attr("data-roll", "table").attr("class", "tableList");
        console.log('img');
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("상호");
        var thE3 = $("<th style='width: 10%'>").text("업태");
        var thE4 = $("<th style='width: 10%'>").text("대표");
        var thE5 = $("<th style='width: 35%'>").text("전화");
        var thE6 = $("<th style='width: 30%'>").text("주소");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5).append(thE6);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);

        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.sangho).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.uptae);
                var tdE4 = $("<td>").text(info.ceo);
                var tdE5 = $("<td>").text(info.tel);
                var tdE6 = $("<td>").text(info.addr);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5).append(tdE6);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'companyviewbody', info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }

    createCareerList(info2, arg, eventHandler) {

        var info = info2.loginfo;
        var arr = info2.arrarr;
        var empinfo = arr[0];
        var pageinfo = info2.pageinfo;
        var arrarr = info2.careerarr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      커리어
                    </div>`;
        $temp.append(head);

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("타입");
        var thE3 = $("<th style='width: 10%'>").text("키");
        var thE4 = $("<th style='width: 10%'>").text("값");
        var thE5 = $("<th style='width: 35%'>").text("날짜");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'careerwrite', self: this, info: info, companycode: empinfo.companycode, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);
        console.log('createEmployeeView careerwrite empinfo.companycode=' + empinfo.companycode);
        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.article_num);
                var tdE2 = $("<td>").text(info.type);
                var tdE3 = $("<td>").text(info.key);
                var tdE4 = $("<td>").text(info.value);
                var tdE5 = $("<td>").text(info.starttime);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'empcareerviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        return $temp;
    }

    createProfile(info2, arg, eventHandler) {

        var arrarr = info2.arrarr;
        var info = arrarr[0];
        
        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      프로필
                    </div>`;

        var strTag;
        var $boxcol = $('<div class="col mb-8">');
        var $box = $('<div class="card">');  //ex: box-default box-danger box-warning box-success box-solid
        $boxcol.append(head).append($box);

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
        //alert("icon" + $boxHeader.html());
        $boxBody = $('<div class="card-body" style="overflow:auto">');

        if (info.empname) {
            var $bodySubject = $('<h4 class="card-title">').append(info.empname);
            $boxBody.append($bodySubject);
        }

        if (info.email) {
            var $bodySubject = $('<div class="card-title">').append(info.email);
            $boxBody.append($bodySubject);
        }

        if (info.append) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.append);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $box.append($img).append($boxBody);

        
        //alert("$box.html()" + $box.html());
        return $boxcol;
    }

    createPortFolio(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;
        var skillarr = info2.skillarr;
        var careerarr = info2.careerarr;
        var uid = -1;
        //console.log('arrarr && arrarr.length=', arrarr.length);
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                uid = info.uid;
                var arr = arrarr[i].arr;

                var p = this.createProfile(info, arg, eventHandler);
                //console.log('p=', p);
            }
        }

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
            code: "da_company",
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

    createViewbody(info, arg, eventHandler) {
        console.log('company viewbody');
        if (arg.renderinfo.viewbody) {
            if (typeof arg.renderinfo.viewbody === "string") {
                arg.renderinfo.viewbody = eval("new " + arg.renderinfo.viewbody + "()");
                arg.renderinfo.viewbody.createViewbody(info, arg, eventHandler);
            } else if (typeof arg.renderinfo.viewbody === "object")
                arg.renderinfo.viewbody.createViewbody(info, arg, eventHandler);
        }
        else {
            
            var logininfo = info.loginfo;
            var pageinfo = info.pageinfo;
            var arrarr = info.arrarr;
            
            var skillarr = info.skillarr;
            var careerarr = info.careerarr;
            var uid = -1;
            console.log('arrarr && arrarr.length=', arrarr.length);
            var p = $('<div>');
            var profile = this.createProfile(info, arg, eventHandler);
            var career = this.createCareerList(info, arg, eventHandler);
            p.append(profile).append(career);

            var main = new MainLayout();
            var ver = new VerticalLayout();
            var hor = new HorizontalLayout();

            main.addControl(ver);
            main.addControl(hor);

            //if (uid == -1)
            //return;
            var vinfo = arrarr[0];

            var erp = new ErpController({
                type: 'erplist',
                dbpath: arg.dbpath,
                code: 'employee',
                title: '사원',
                keyfield: 'companycode',
                key: vinfo.companycode,
                renderview: 'EmployeeView',
                rendertype: 'selectlist_h',
                //viewbody2: 'EmployeeViewbodyTemplate'
                viewbodytype: 'full'
            });
            //var erp = new ErpController('erplist', info.dbpath, 'employee', new EmployeeView(), {} , '');
            hor.setControl([p, 4], [erp, 8]);

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
            ver.addControl(board);

            var $page = $("<div>");
            //$(arg.elem).empty();
            main.renderController($page);

            console.log('arg.viewelem=', arg.viewelem);
            if (arg.viewelem) {
                $(arg.viewelem).empty();
                $(arg.viewelem).append($page);
            } else {
                $(arg.elem).empty();
                $(arg.elem).append($page);

            }

            if (arg.renderinfo.viewbodytype == 'full') {
                
                var f = new FullScreenView();
                f.setContent(`뷰 보기255`, $page);

            }

            return $page;

            //__fullscreenView.setContent(`보기`, this.createErpFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, this.createErpFormView());

            var form = document.getElementById("companyViewForm");

            form.uid.value = info.uid;
            console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);

            form.companyname.value = info.companyname;
            form.dealtype.value = info.dealtype;
            form.ceo.value = info.ceo;
            form.tel.value = info.tel;
            form.tel2.value = info.tel2;
            //form.fax.value = info.fax;
            form.addr.value = info.addr;
            form.postnum.value = info.postnum;
            //form.email.value = info.email;
            //form.sangho.value = info.sangho;
            form.saupjanum.value = info.saupjanum;
            form.uptae.value = info.uptae;
            form.jongmok.value = info.jongmok;
            form.danga_dg.value = info.danga_dg;
            form.memo.value = info.memo;
            form.info.value = info.info;

            form.dealtype.value = info.dealtype;
            $('#companyaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#companydelSubmit').bind("click", { type: 'companydelSubmit', self: this, info: info, arg: arg }, this.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#companymodifySubmit').bind("click", { type: 'companymodifySubmit', self: this, info: info, arg: arg }, this.eventHandler);

        }

        return arg.viewelem;
    }
}

class ThumbnailItem {
    constructor(info) {
        this.info = info;
    }

    renderController(elem) {
        $(elem).append(this.createThumbnailItem(this.info));
    }

    createThumbnailItem(info) {
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
        console.log("icon" + $box.html());
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

    createThumbnailItemR = function (info, arg, eventHandler) {
        var strTag;

        var $imageflip = $('<div class="drag image-flip" ontouchstart="this.classList.toggle(\'hover\');">');
        var $mainflip = $('<div class="mainflip">');
        var $frontside = $('<div class="frontside">');
        var $backside = $('<div class="backside">');

        var frontThumb;
        if (info.frontThumb) {
            frontThumb = this.createThumbnailItem(info.frontThumb);
            $frontside.append(frontThumb);
        }

        var backThumb;
        if (info.backThumb) {
            backThumb = this.createThumbnailItem(info.backThumb);
            $backside.append(backThumb);
        }

        $mainflip.append($frontside).append($backside);
        $imageflip.append($mainflip);
        //alert("$box.html()" + $box.html());
        return $imageflip;
    }
}

class CardItem {
    constructor(info) {
        this.info = info;
    }

    renderController(elem) {
        $(elem).append(this.createCardItem(this.info));
    }

    createCardItem(info2) {
        var info = info2;

        var $card = $(`<div class="card">`);

        if (info.cls) {
            var cls = info.cls;
            if (cls === 'warning' || cls === 'info' || cls === 'light') {
                cls = 'text-dark bg-' + cls;
            } else {
                cls = 'text-white bg-' + cls;
            }

            $card.addClass(cls);
        }

        var $boxHeader = null, $boxBody = null, $boxFoot = null, $headTitle = null, $headRightTool=null;
        //alert($box.html());
        if (info.title) {
            $boxHeader = $('<div class="card-header with-border">');
            if (info.titleicon)
                $headTitle = $('<h7 class="card-title">').append(info.titleicon).append(info.title);
            else
                $headTitle = $('<h7 class="card-title">').html(info.title);
            //alert("icon====="+info.titleicon);
            $headRightTool = $('<div class="pull-right">');
            if (info.collapse) {
                var btn1 = $(`<button type="button" title="펼침" ><i class="fa fa-chevron-down"></i></button>`);
                $(btn1).bind("click", { type: "keyvaluemodify", self: this, info: info }, function (e) { $(this).parent().parent().parent().next().collapse('toggle'); console.log('collapse click'); });
                $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                $headRightTool.append(btn1);
                
            }
            if (info.customer_btn1) {
                $headRightTool.append(info.customer_btn1);
            }
            if (info.customer_btn2) {
                $headRightTool.append(info.customer_btn2);
            }
            if (info.customer_btn3) {
                $headRightTool.append(info.customer_btn3);
            }
            if (info.badge && info.badge == "ok") {
                $headBadge = $('<span data-toggle="tooltip" title="3 New Messages" class="badge">').addClass(info.dadgeclass).text(info.badgetext);
                $headRightTool.append($headBadge);
            }
            $headTitle.append($headRightTool);

            $boxHeader.append($headTitle);
            $card.append($boxHeader);

            //console.log($boxHeader.html());
        }

        //alert("icon" + $boxHeader.html());
        $boxBody = $('<div class="card-body" style="overflow:auto">').css("display", info.display).attr("id", info.boxbodyid);

        if (info.subject) {
            var $bodySubject = $('<h5 class="card-title">').append(info.subject);
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

        $card.append($boxBody);

        if (info.footer) {
            $boxFoot = $('<div class="card-footer">');
            $boxFoot.append(info.footer);
            $card.append($boxFoot);
        }

        //alert("$box.html()" + $box.html());
        return $card;
    }
}

class MediaItem {
    constructor(info) {
        this.info = info;
    }

    renderController(elem) {
        $(elem).append(this.createMediaItem(this.info));
    }

    createMediaItem(info) {
        var strTag;

        var $media_box = $('<div class="d-flex border p-3">');
        var $img = null;
        if (info.img) {
            $img = info.img;
        } else {
            console.log(info.imgsrc);
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
}

class MediaView extends ViewBase {
    constructor() {
        super();
        var el = document.getElementById('boardContextMenu');
        if (!el) {
            var ul = $('<ul id="boardContextMenu" class="dropdown- menu" role="menu" style="display:none">');
            var li1 = $('<li style="list-style:none"><a tabindex="-1" href="#">쪽지보내기</a></li>');
            var li2 = $('<li style="list-style:none"><a tabindex="-1" href="#">지난글보기</a></li>');
            var li3 = $('<li style="list-style:none"><a tabindex="-1" href="#">rtc요청</a></li>');
            var li4 = $('<li style="list-style:none"><a tabindex="-1" href="#">폴더생성</a></li>');
            var li5 = $('<li style="list-style:none"><a tabindex="-1" href="#">삭제</a></li>');
            ul.append(li1).append(li2).append(li3).append(li4).append(li5);
            $('body').append(ul);
        }

    }

    eventHandler(e) {
        var type = e.data.type;
        var self = e.data.self;
        if (type == 'jjocjyformSubmit') {
            alert('jjocjyformSubmit');
            var form = document.getElementById("jjocjyForm");
            form.sendid.value = e.data.sendid;
            form.receiveid.value = e.data.receiveid;

            //console.log('form^********************************=' + form);
            var arg2 = { type: "jjocjylist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, rendertype: arg.rendertype, self: arg.self };

            arg2.form = form;
            var formData = $(form).serializeArray();

            arg2.formData = formData;
            var str = "/jjocjy.member?jjocjytype=add&code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&utf8=ok&";
            arg2.path = str;
            console.log('jjocjyformSubmit arg2.path=' + arg2.path);
            arg.self.postAjax(arg2);
        }
    }

    createList(info, arg, eventHandler) {
        var loginfo = info.loginfo;
        var arrarr = info.arrarr;
        var grouparr = info.grouparr;

        var mediaE = $(`<div class="card-deck">
                        </div>`);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];
                var meItem = new MediaItem(info);
                meItem.renderController(mediaE);

                $(meItem).bind("click", { type: 'boardrecord', info: info, loginfo: loginfo, self: this, arg: arg }, eventHandler);
                $(meItem).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($(mediaE));

        var $buttonE = $("<input type='button' class='btn btn-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글쓰기");
        $buttonE.bind("click", { type: 'boardwrite', self: this, info: info, arg: arg }, eventHandler);
        var $writeDiv = $('<div>');
        $($writeDiv).append($buttonE);
        $(arg.elem).append($writeDiv);

        var $page = $("<div>");
        $temp.append($page);
        var p = new PageNavView();
        arg.pageelem = $page;
        p.createPageNavView(info2, arg, eventHandler);

        var $find = $("<div>");
        $temp.append($find);
        arg.findelem = $find;
        var f = new BoardFindView();
        f.createFindView(info2, arg, eventHandler);

        //console.log($(arg.elem).html());
        return $(mediaE);
    }

    createMediaView(info, arg, eventHandler) {
        var strTag;

        var $media_box = $('<div class="d-flex border p-3">');
        var $img = null;
        if (info.img) {
            $img = info.img;
        } else {
            console.log(info.imgsrc);
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
}

class CarouselView extends ViewBase {
    constructor() {
        super();
        var el = document.getElementById('boardContextMenu');
        if (!el) {
            var ul = $('<ul id="boardContextMenu" class="dropdown- menu" role="menu" style="display:none">');
            var li1 = $('<li style="list-style:none"><a tabindex="-1" href="#">쪽지보내기</a></li>');
            var li2 = $('<li style="list-style:none"><a tabindex="-1" href="#">지난글보기</a></li>');
            var li3 = $('<li style="list-style:none"><a tabindex="-1" href="#">rtc요청</a></li>');
            var li4 = $('<li style="list-style:none"><a tabindex="-1" href="#">폴더생성</a></li>');
            var li5 = $('<li style="list-style:none"><a tabindex="-1" href="#">삭제</a></li>');
            ul.append(li1).append(li2).append(li3).append(li4).append(li5);
            $('body').append(ul);
        }

    }

    getReturnValue() {
        var type, value;
        var arg = Array.prototype.slice.call(arguments);
        if (arg && arg[0])
            type = arg[0];
        else
            return;
        if (arg && arg[1])
            value = arg[1];
        console.log(`getReturnValue type==${type}`);
        //_tempCount++;
        var info = {};
        if (type == 'icon' || type == 'image') {
            var form = document.getElementById("keyvalueForm");
            console.log('form^********************************=' + form);
            //form.path.value = 'image=' + value;
            form.imageinput.value = value;
            $('#btnimg').attr('src', value);
            //$('#iconchange_input').val(type + ':' + value);
            __modal.hide();
        } else if (type == 'audio') {
            $('#playerA').attr('src', value);
            var player = document.getElementById('playerA');
            player.play();
            __modal.hide();
        } else if (type == 'video') {
            $('#playerV').attr('src', value);
            var player = document.getElementById('playerV');
            player.play();
            __modal.hide();
            //console.log(value);
        }
    }

    eventHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;
        console.log('info=', info);
        if (type == 'keyvalueadd') {

            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`보기`, self.createKeyvalueForm());
           
            //__modal.show('키추가', self.createKeyvalueForm());
            
            $('#ImgselBtn').bind("click", { type: 'imgselBtn', self: self, info: info, arg: arg }, self.eventHandler);

            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            console.log(`form.imageinput.value==${form.imageinput.value}`);
            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.kname.value = arg.kname;
            form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.type.value = 'add';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'keyvaluemodify') {
            //__modal.show('수정', self.createKeyvalueForm());
            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`수정`, self.createKeyvalueForm());

            $('#ImgselBtn').bind("click", { type: 'imgselBtn', self: self, info: info, arg: arg }, self.eventHandler);

            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            info = self.selectNode;
            var value = __keyvalueSplitString(info.value);
            if (value.itemtype) {
                $(`input:radio[name=itemTypeRadio]:radio[value=${value.itemtype}]`).attr("checked", true);
            }
            if (value.link) {
                $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);
                form.value.value = value.link;
            } else if (value.board) {
                $('input:radio[name=linkTypeRadio]:radio[value=board]').attr("checked", true);
                form.value.value = value.board;
            } else if (value.self) {
                $('input:radio[name=linkTypeRadio]:radio[value=self]').attr("checked", true);
                form.value.value = value.self;
            }
            if (value.subject) {
                form.subject.value = value.subject;
            }
            if (value.image) {
                form.imageinput.value = value.image;
            }
            if (value.icon) {
                form.icon.value = value.icon;
            }
            if (value.value) {
                form.value.value = value.value;
            }
            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.uid;
            form.key.value = info.key;
            form.info.value = info.info;
            form.type.value = 'update';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'imgselBtn') {
            var targetChild = e.target.querySelector('#btnimg');
            var c = new FileController({ type: 'filelist', code: 'root', filetype: 'file', path: '/files/media/images/icons/', filter: 'image', returntype: 'return', $parent: self });
            var elem = document.createElement('div');
            c.renderController(elem);
            __modal.show(`보기`, elem);

        } else if (type == 'keyvalueaddSubmit') {

            var form = document.getElementById("keyvalueForm");

            var value = '';
            console.log('type=', type);
            var rval = $("input[name='linkTypeRadio']:checked").val();
            console.log('type=', type);
            if (rval == 'link') {
                value = value + `&link=${form.value.value}`;
            } else if (rval == 'board') {
                value = value + `&board=${form.value.value}`;
            } else if (rval == 'self') {
                value = value + `self=${form.value.value}`;
            } else if (rval == 'link') {

            }
            
            if (form.imageinput.value)
                value = value + '&image=' + form.imageinput.value;
            if (form.subject.value)
                value = value + '&subject=' + form.subject.value;

            form.value.value = value;

            console.log("$(#keynamesel option: selected)=", $("#keynamesel option:selected"));
            console.log("form.fid.value=", form.type.value);
            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            arg.path = str;
            arg.type = 'keyvalue';
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;

            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            //console.log("form.subject.value=======" + form.subject.value);
            //var b64 = Base64.encode(form.info.value);
            //formData = self.selectedLenderCon.changeSerialize(formData, 'info', b64);
            arg.formData = formData;

            arg.form = form;
            arg.self.postAjax(arg);

            if (window._fullscreen) {
                window._fullscreen.offscreen();
                window._fullscreen = null;
            }
        } else if (type == 'keyvaluedel') {

            if (!self.selectNode)
                return alert('노드를 설택해야됩니다');

            info = self.selectNode;
            if (!confirm(`${info.key} 키 설정을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var str = `/mankeyvalue.adm?dbpath=${arg.dbpath}&kcode=${info.kcode}&kname=${info.kname}&utf8=ok&`;
            console.log(str);
            //var arg2 = { path: str, type: "keyvalue", dbpath: arg.dbpath, elem: arg.elem, self: arg.self };
            var form = document.getElementById("keyvalueDeleteForm");
            if (form == null) {
                $('body').append(self.createKeyvalueDeleteForm());
                form = document.getElementById("keyvalueDeleteForm");
            }

            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.key.value = info.key;
            form.uid.value = info.uid;
            form.fid.value = info.uid;
            form.did.value = info.uid;
            form.type.value = 'del';
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.self.postAjax(arg);
        } else if (type == "nameadd") {
            __modal.show('식별자이름추가', self.makeNameForm());

            var form = document.getElementById("nameSetForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.uid.value = $("#keynamesel option:selected").attr('uid');
            form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.did.value = $("#keynamesel option:selected").attr('did');
            console.log(`form.fid.value==${form.fid.value} `);

            $('#nameaddBtn').bind("click", { type: 'nameaddSubmit', self: self, arg: arg }, self.eventHandler);
        } else if (type == "nameaddSubmit") {
            var form = document.getElementById("nameSetForm");

            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            //arg.path = str;
            console.log('form.kcode.value*******=' + form.kcode.value);
            arg.kcode = form.kcode.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.path = str;
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            arg.self.postAjax(arg);
            __modal.hide();
        } else if (type == 'record') {
            if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
                self.selectNode = info;
                $('#selectNode').val(info.key);
                return;
            }

            if (arg && arg.renderinfo && arg.renderinfo.viewbody) {
                var f = new FullScreenView();
                f.setContent(`보기`, arg.renderinfo.viewbody.createViewbody(info, arg, this.eventHandler));
                return;
            }
            var value = __keyvalueSplitString(info.value);
            //console.log(`value=${value}`);
            if (value.link) {
                if (value.link.startsWidth('http'))
                    location.href = value.link;
                else
                    location.href = 'http://' + value.link;
            } else if (value.board) {
                var f = new FullScreenView();
                f.setContent(`보기`, self.createKeyvalueForm());
            } else if (value.self) {
                var f = new FullScreenView();
                f.setContent(`보기`, info.info);
            } else if (value.link) {

            }
        } else if (type == 'return') {
            console.log('arg.type=', arg.type, ' type=', type, ' arg.renderinfo.$parent=', arg.renderinfo.$parent);
            arg.renderinfo.$parent.getReturnValue('keyvalue', arg.dbpath, arg.kcode, arg.kname);
        }
    }

    makeNameForm() {
        var m = `<form class="form-horizontal" name="nameSetForm" id="nameSetForm">
                                                    <input type="hidden" name="dbpath" />
                                                    <input type="hidden" name="type" value="nameadd" />
                                                    <input type="hidden" name="uid" />
                                                    <input type="hidden" name="fid" />
                                                    <input type="hidden" name="did" />

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">그룹:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="" readonly/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">식별자이름:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" placeholder="식별자이름이름..." required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">설명:</label>
                                                            <div>
                                                                <textarea type="text" class="form-control" name="info" placeholder="설명..." required></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                           <input type="button" id="nameaddBtn"  class="btn btn-warning btn-send" value="전송">
                                                            <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                </form>`;
        return m;
    }

    createKeyvalueDeleteForm() {
        var m = `<form id="keyvalueDeleteForm" name="keyvalueDeleteForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                <input type="hidden" name="type"/>
                                <input type="hidden" name="dbpath" />
                                <input type="hidden" name="kcode" />
                                <input type="hidden" name="kname" />
                                <input type="hidden" name="key" />
                                <input type="hidden" name="uid" />
                                <input type="hidden" name="fid" />
                                <input type="hidden" name="did" />

                            </form>`;
        return m;
    }

    createKeyvalueForm() {
        var m = `<form id="keyvalueForm" name="keyvalueForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                            <input type="hidden" name="type" value="add" />
                                            <input type="hidden" name="dbpath" />
                                            <input type="hidden" name="uid" />
                                            <input type="hidden" name="fid" />
                                            <input type="hidden" name="did" />

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">그룹</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="_carousel" readonly/>
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">식별자</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" readonly />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label class="control-label" for="inputSuccess1">이미지</label>
                                                            <div>
                                                                <input type="text" name="imageinput" id="imageinput" class="form-control" placeholder="아이콘 이미지 썸네일 경로 ...">
                                                                <button type = "button" class="btn" id="ImgselBtn" ><img id="btnimg" src="" alt="">이미지선택</button >
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="empcode" class="control-label">키</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="key" placeholder="키..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">소제목</label>
                                                            <div>
                                                                <input class="form-control" name="subject" placeholder="소제목..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="permittype" class="control-label">링크타입</label>
                                                        <div class="clearfix"></div>
                                                        <div class="form-check form-check-inline ">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="link">
                                                            <label class="form-check-label" for="inlineCheckbox1">링크</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="board">
                                                            <label class="form-check-label" for="inlineCheckbox1">게시판</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="self">
                                                            <label class="form-check-label" for="inlineCheckbox1">셀프</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">링크내용</label>
                                                            <div>
                                                                <input class="form-control" name="value" placeholder="링크내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">정보</label>
                                                            <div>
                                                                <textarea class="form-control" name="info" placeholder="내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group text-right">
                                                            <input type="reset" class="btn btn-secondary" data-dismiss="modal" value="리 셋">
                                                            <input type="button" id="keyvalueaddBtn" class="btn btn-primary" value="전 송">
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                        </form>`;
        return m;
    }

    createList(info2, arg, eventHandler) {
        var self = this;
        this.arg = arg;
        var info = info2;
        var loginfo = info.loginfo;
        var arrarr = info.arrarr;
        var grouparr = info.grouparr;

        this.keycodeselValue = arg.kcode;
        this.keynameselValue = arg.renderinfo.kname;
        this.rendertypeselValue = arg.rendertype;
        if (info == null || info == undefined)
            info = {};

        var keynamearr = info.keynamearr;
        console.log(`arg.renderinfo.kname=${arg.renderinfo.kname}`);
        var carousel = $(`<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel" style="z-index:5"></div>`);
        
        var carousel_indicator = $(`<ol class="carousel-indicators"></ol>`);
        var carouselItem = $(`<div class="carousel-inner"></div>`);
        var btn1 = $(`<button class="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </button>`);
        var btn2 = $(`<button class="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </button>`);

        carousel.append(carousel_indicator, carouselItem, btn1, btn2);
        
        if (arrarr && arrarr.length >= 0) {
            
            for (var k = 0; k < arrarr.length; k++) {
                
                var info = arrarr[k];
                if (info.did == -7)
                    continue;

                var indiitem = $(`<li data-target="#carouselExampleCaptions" data-slide-to="${k}" class=""></li>`);
                carousel_indicator.append(indiitem);
                
                var item = $(`<div class="carousel-item m-3">
                        </div>`);

                if (k == 0) {
                    indiitem.addClass("active");
                    item.addClass("active");
                }

                var value = __keyvalueSplitString(info.value);
                //console.log(`value.image=${value.image}`);
                if (value && value.image) {
                    var $img = $(`<img src="${value.image}" onerror="onImgError(this);" class="d-block w-100" imgtype="carousel">`);
                    item.append($img);
                }
                
                if (value && value.icon) {
                    var $img = $(`<i class="${value.icon}">`);
                    item.append($img);
                    item.append($img);
                }
                
                if (value && value.subject) {
                    var cap = $(`<div class="carousel-caption d-none d-md-block">
                                <h5>${info.key}</h5>
                                <p>${value.subject}</p>
                            </div>`);
                    item.append(cap);
                }

                item.bind("click", { type: 'record', info: info, self: this, arg: arg }, this.eventHandler);

                carouselItem.append(item);
            }
        }
        

        $(arg.elem).empty();
        $(arg.elem).append($(carousel));
        //console.log($(arg.elem).html());
        //console.log($(arg.elem).attr('id'));
        
        if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
            var $divE = $('<div class="form-inline">');
            var $label = $('<label class="selected-node-group">선택한노드:</label>');
            var $inputE = $(`<input type="text" class="form - control" name="selectNode" id="selectNode" placeholder="..." required />`);
            
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("삭제");
            $buttonE2.bind("click", { type: 'keyvaluedel', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("수정");
            $buttonE2.bind("click", { type: 'keyvaluemodify', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);

            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("아이템추가");
            $buttonE.bind("click", { type: 'keyvalueadd', self: this, info: info, arg: arg }, this.eventHandler);
            var $writeDiv = $('<div>');
            $($writeDiv).append($buttonE);
            $(arg.elem).append($writeDiv);

            //this.setKeyvalueEditContextMenu('.keyvalue_context_menu');
        }

        if (arg.renderinfo && arg.renderinfo.returntype === "return") {

            var $divE = $('<div class="alert alert-dark mr-1">');

            var $label = $('<label class="selected-node-group mr-2">식별자선택:</label>');

            var keynamesel = document.createElement('select');
            keynamesel.setAttribute('id', "keynamesel");
            $(keynamesel).empty();
            $(keynamesel).append(`<option value=' '>-----</option>`);
            for (var i = 0; i < keynamearr.length; i++) {
                //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
                $(keynamesel).append(`<option value='${keynamearr[i].kname}' uid='${keynamearr[i].uid}' fid='${keynamearr[i].fid}' did='${keynamearr[i].did}'>${keynamearr[i].kname}</option>`);
                //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
            }
            //console.log(`this.keynameselValue=${this.keynameselValue}`);
            if (this.keynameselValue) {
                $(keynamesel).val(this.keynameselValue).prop("selected", true);
            } else {
                this.keynameselValue = $(keynamesel).val();
            }

            $divE.append($label).append(keynamesel);

            $(document).off("change", "#keynamesel", null);
            $(document).on("change", "#keynamesel", function () {

                //console.log("$(this).val()====" + $(this).val());
                arg.renderinfo.kname = $(this).val();
                arg.renderinfo.knamefid = $("#keynamesel option:selected").attr("fid");
                arg.self.setController(self.arg.renderinfo, self.arg.elem);
                //self.selectedLenderCon.setController(self._dbpath, self._kcode, self._keynameselValue, elem);
            });

            var $buttonE = $("<button type='button' class='btn btn-info mr-2'>이름추가</button>");
            $buttonE.bind("click", { type: "nameadd", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            var $buttonE = $("<button type='button' class='btn btn-info ml-1'>리턴</button>");
            $buttonE.bind("click", { type: "return", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            $(arg.elem).append($divE);
        }
        
        //console.log($(arg.elem).html());
        return $(carousel);
    }
}

class ThumbnailView extends ViewBase {
    constructor() {
        super();
        var el = document.getElementById('boardContextMenu');
        if (!el) {
            var ul = $('<ul id="boardContextMenu" class="dropdown- menu" role="menu" style="display:none">');
            var li1 = $('<li style="list-style:none"><a tabindex="-1" href="#">쪽지보내기</a></li>');
            var li2 = $('<li style="list-style:none"><a tabindex="-1" href="#">지난글보기</a></li>');
            var li3 = $('<li style="list-style:none"><a tabindex="-1" href="#">rtc요청</a></li>');
            var li4 = $('<li style="list-style:none"><a tabindex="-1" href="#">폴더생성</a></li>');
            var li5 = $('<li style="list-style:none"><a tabindex="-1" href="#">삭제</a></li>');
            ul.append(li1).append(li2).append(li3).append(li4).append(li5);
            $('body').append(ul);
        }

    }

    eventHandler(e) {
        var type = e.data.type;
        var self = e.data.self;
        if (type == 'jjocjyformSubmit') {
            alert('jjocjyformSubmit');
            var form = document.getElementById("jjocjyForm");
            form.sendid.value = e.data.sendid;
            form.receiveid.value = e.data.receiveid;

            //console.log('form^********************************=' + form);
            var arg2 = { type: "jjocjylist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, rendertype: arg.rendertype, self: arg.self };

            arg2.form = form;
            var formData = $(form).serializeArray();

            arg2.formData = formData;
            var str = "/jjocjy.member?jjocjytype=add&code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&utf8=ok&";
            arg2.path = str;
            console.log('jjocjyformSubmit arg2.path=' + arg2.path);
            arg.self.postAjax(arg2);
        }
    }

    createList(info, arg, eventHandler) {

        var loginfo = info.loginfo;
        var arrarr = info.arrarr;
        var grouparr = info.grouparr;

        var thumbnailE = $(`<div class="card-deck">
                        </div>`);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];
                var ele = this.createThumbnailItem(info, arg, eventHandler);
                $(thumbnailE).append(ele);

                $(ele).bind("click", { type: 'boardrecord', info: info, loginfo: loginfo, self: this, arg: arg }, eventHandler);
                $(ele).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($(thumbnailE));

        var $buttonE = $("<input type='button' class='btn btn-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글쓰기");
        $buttonE.bind("click", { type: 'boardwrite', self: this, info: info, arg: arg }, eventHandler);
        var $writeDiv = $('<div>');
        $($writeDiv).append($buttonE);
        $(arg.elem).append($writeDiv);

        var $page = $("<div>");
        $temp.append($page);
        var p = new PageNavView();
        arg.pageelem = $page;
        p.createPageNavView(info2, arg, eventHandler);

        var $find = $("<div>");
        $temp.append($find);
        arg.findelem = $find;
        var f = new BoardFindView();
        f.createFindView(info2, arg, eventHandler);

        //console.log($(arg.elem).html());
        return $(thumbnailE);
    }

    createThumbnailItem(info, arg, eventHandler) {
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
        //alert("icon" + $boxHeader.html());
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

    createThumbnailItemR = function (info, arg, eventHandler) {
        var strTag;

        var $imageflip = $('<div class="drag image-flip" ontouchstart="this.classList.toggle(\'hover\');">');
        var $mainflip = $('<div class="mainflip">');
        var $frontside = $('<div class="frontside">');
        var $backside = $('<div class="backside">');

        var frontThumb;
        if (info.frontThumb) {
            frontThumb = this.createThumbnailItem(info.frontThumb);
            $frontside.append(frontThumb);
        }

        var backThumb;
        if (info.backThumb) {
            backThumb = this.createThumbnailItem(info.backThumb);
            $backside.append(backThumb);
        }

        $mainflip.append($frontside).append($backside);
        $imageflip.append($mainflip);
        //alert("$box.html()" + $box.html());
        return $imageflip;
    }
}

class TabMenuView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        
        var info = e.data.info;
        var arg = e.data.arg;
        var self = arg.self;
        var type = e.data.type;
        //console.log("eventHandler(e) type =33= " + type);
        //console.log("eventHandler(e) info.key =33= " + info.key);
        $(this).parent().children().each(function () {
            $(this).removeClass("active");

        });
        $(this).addClass("active");

        if (type == 'menuclick') {
           
            var str = "/list.board?code=" + arg.code + "&brdid=" + arg.brdid + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            //console.log("$(this).parent()== " + $(this).parent().html());
            //var arg = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'boardlist';
            arg.self.listAjax(arg);
        } else if (type == 'groupmenuclick') {
            var str = "/list.board?code=" + arg.code + "&brdid=" + info.brdid + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            console.log("str== " + str);
            //var arg = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'boardlist';
            arg.self.listAjax(arg);
        } else if (type == 'tabclick') {


            if (arg.tabthread) {

            }

            var str = "/list.board?code=" + arg.code + "&brdid=" + info.brdid + "&dbpath=" + arg.dbpath + "&keyfield=thread&key=" + info.key + "&utf8=ok&";
            console.log("str== " + str);
            console.log("info.brdid== " + info.brdid);
            arg.thread = info.key;
            arg.path = str;
            arg.type = 'boardlist';
            //var arg = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.self.listAjax(arg);
        }
        
        
    }

    createThreadTabMenu(info7, arg, eventHandler) {
        var $tabMenuE = null;
        var $tabelem = arg.$tabelem;
        var cnt = 0;
        var $tabs_wrap = $('<div class="tabs_wrap">');
        var $tree = $('<ul>');
        $tabs_wrap.append($tree);
        var $treeItem = null, $treeItemIn = null;
        $tabMenuE = $('<div class="tabwrapper">');
        $tabMenuE.append($tabs_wrap);
        var thread;
        var arrarr = arg.renderinfo.tabthread;
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                if (arr && arr.length > 0) {

                    var info2 = arr[i];

                    $treeItem = $('<li>').append(info.key);
                    if (i == 0) {
                        $treeItem.addClass('active');
                        thread = info.key;
                    }
                        
                    $treeItem.bind("click", { type: 'tabclick', self: this, info: info, arg: arg }, this.eventHandler);
                    
                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                } else {
                    
                    $treeItem = $('<li>').append(info.key);
                    if (i == 0) {
                        $treeItem.addClass('active');
                        thread = info.key;
                    }
                    $treeItem.bind("click", { type: 'tabclick', self: this, info: info, arg: arg }, this.eventHandler)
                    
                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                }
            }

            //var str = "/list.board?code=" + arg.code + "&brdid=" + arg.brdid + "&dbpath=" + arg.dbpath + "&keyfield=thread&key=" + thread + "&utf8=ok&";
            //console.log("str== " + str);
           // arg.renderinfo.thread = thread;
            //arg.path = str;
            //arg.type = 'boardlist';
            //var arg = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            //arg.self.listAjax(arg);
        }

        //$($tabelem).empty();
        $($tabelem).append($tabMenuE);
        
        return $tabMenuE;
    }

    createGroupBoardTabMenu(info7, arg, eventHandler) {
        var $tabMenuE = null;
        var $tabelem = arg.$tabelem;
        var cnt = 0;
        var $tabs_wrap = $('<div class="tabs_wrap">');
        var $tree = $('<ul>');
        $tabs_wrap.append($tree);
        var $treeItem = null, $treeItemIn = null;
        $tabMenuE = $('<div class="tabwrapper">');
        $tabMenuE.append($tabs_wrap);
        //console.log(`arrarr.length=${arrarr.length}`);
        var arrarr = info7.arrarr;
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                if (arr.length > 0) {
                    
                    var info2 = arr[i];

                    $treeItem = $('<li>').append(info.brdname);
                    $treeItem.bind("click", { type: 'groupmenuclick', info: info, arg: arg }, this.eventHandler);

                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                } else {
                    $treeItem = $('<li>').append(info.brdname);
                    $treeItem.bind("click", { type: 'groupmenuclick', info: info, arg: arg }, this.eventHandler)

                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                }
                if (i == 0) {
                    //$treeItem.addClass('active');
                }
            }
        }

        //$($tabelem).empty();
        $($tabelem).append($tabMenuE);

        return $tabMenuE;
    }

    createBoardTabMenu(info2, arg, eventHandler) {
        console.log(`createList(info2, arg, eventHandler)=${info2}`);
        var info = info2;
        this.arg = arg;
        this.keycodeselValue = arg.kcode;
        this.keynameselValue = arg.kname;
        this.rendertypeselValue = arg.rendertype;
        if (info == null || info == undefined)
            info = {};

        if (arg.settype == 'setting' || arg.settype == 'modal') {
            var $selDiv = $('<div>');

            if (arg.settype == 'setting') {
                //$selDiv.append($keycodesel).append($buttonE).append($keynamesel).append($buttonE2).append($rendertypesel).append($buttonE3);
            } else if (arg.settype == 'modal') {
                var $label = $('<label>').text(this.keycodeselValue);
                var $buttonE3 = $(`<button class="btn btn-info" type="button">리턴</button>`);
                $buttonE3.bind("click", { type: 'return', self: this, info: info, arg: arg }, this.eventHandler);
                $selDiv.append($label).append($keynamesel).append($buttonE2).append($rendertypesel).append($buttonE3);
            }

            $(arg.elem).empty();
            $(arg.elem).append($selDiv);

            if (keycodearr) {
                var keycodesel = document.getElementById('keycodesel');
                if (keycodesel) {
                    $(keycodesel).empty();
                    $(keycodesel).append(`<option value=''>-keycode-</option>`);
                    for (var i = 0; i < keycodearr.length; i++) {
                        //console.log(`keycodearr[i].kcode=${keycodearr[i].kcode}`);
                        $(keycodesel).append(`<option value='${keycodearr[i].kcode}' uid='${keycodearr[i].uid}' fid='${keycodearr[i].fid}' did='${keycodearr[i].did}'>${keycodearr[i].kcode}</option>`);
                    }
                    if (this.keycodeselValue) {
                        $(keycodesel).val(this.keycodeselValue).prop("selected", true);
                    }
                }
            }
            if (keynamearr) {
                var keynamesel = document.getElementById('keynamesel');
                if (keynamesel) {
                    for (var i = 0; i < keynamearr.length; i++) {
                        //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
                        $(keynamesel).append(`<option value='${keynamearr[i].kname}' uid='${keynamearr[i].uid}' fid='${keynamearr[i].fid}' did='${keynamearr[i].did}'>${keynamearr[i].kname}</option>`);
                        //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
                    }
                    if (this.keynameselValue) {
                        $(keynamesel).val(this.keynameselValue).prop("selected", true);
                    } else {
                        this.keynameselValue = $(keynamesel).val();
                    }
                }
                
            }

        }

        var $tabMenuE = null;
        var cnt = 0;
        var $tabs_wrap = $('<div class="tabs_wrap">');
        var $tree = $('<ul>');
        $tabs_wrap.append($tree);
        var $treeItem = null, $treeItemIn = null;
        $tabMenuE = $('<div class="tabwrapper">');
        $tabMenuE.append($tabs_wrap);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                if (info.did == -7)
                    continue;

                if (arr && arr.length > 0) {

                    $treeItem = $('<li>').append($treeItemIn);
                    $treeItem.bind("click", { type: 'record', info: info, arg: arg }, this.eventHandler2);
                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                }

                if (arr && arr.length > 0) {

                    var info2 = arr[i];

                    $treeItem = $('<li>').append(info.key);
                    $treeItem.bind("click", { type: 'record', info: info, arg: arg }, this.eventHandler2)
                        .bind("click", { type: 'tabclick', info: info, arg: arg }, eventHandler);
                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                } else {
                    $treeItem = $('<li>').append(info.key);
                    $treeItem.bind("click", { type: 'record', info: info, arg: arg }, this.eventHandler2)
                        .bind("click", { type: 'tabclick', info: info, arg: arg }, eventHandler);
                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                }
            }
        }

        //$(arg.elem).empty();
        $(arg.elem).append($tabMenuE);
        //console.log($(arg.elem).html());
        return $tabMenuE;
    }

    createList(info2, arg, eventHandler) {
        //console.log(`createList(info2, arg, eventHandler)=${info2}`);
        var self = this;
        var info = info2;
        this.arg = arg;
        
        if (arg && arg.tabtype == 'table') {
            if (arg.tabthread) {
                this.createThreadTab(info, arg, eventHandler);
            } else if (arg.tabtype == 'group') {
                this.createGroupBoardTab(info, arg, eventHandler);
            } else if (arg.tabtype == 'thumbnail') {
                this.createThumbnailList(info, arg, eventHandler);
            } else if (arg.bctype == 'media') {
                this.createMediaList(info, arg, eventHandler);
            } else if (arg.bctype == 'carousel') {
                this.createTableList(info, arg, eventHandler);
            } else {
                this.createTableList(info, arg, eventHandler);
            }
        }

        //$(arg.elem).empty();
        //$(arg.elem).append($tabMenuE);
        //console.log($(arg.elem).html());
        return;// $tabMenuE;
    }

}

class TopMenuView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        //e.preventDefault();
        //e.stopPropagation();
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;
        //console.log('info=', info);
        if (type == 'keyvalueadd') {
            __modal.show('키추가', self.createKeyvalueForm());
            $('input:radio[name=itemTypeRadio]:radio[value=ge]').attr("checked", true);
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.kname.value = arg.kname;
            form.fid.value = arg.renderinfo.knamefid;
            form.type.value = 'add';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            console.log(`form.fid.value==${form.fid.value}`);
        } else if (type == 'keyvaluesubadd') {
            __modal.show('서브키추가', self.createKeyvalueForm());
            $('input:radio[name=itemTypeRadio]:radio[value=ge]').attr("checked", true);
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            info = self.selectNode;
            console.log('info=', info);
            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.uid;
            form.type.value = 'subadd';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            console.log(`form.uid.value==${form.uid.value} `);
        } else if (type == 'keyvaluemodify') {
            __modal.show('수정', self.createKeyvalueForm());
            

            var form = document.getElementById("keyvalueForm");
            info = self.selectNode;

            var value = __keyvalueSplitString(info.value);
            if (value.itemtype) {
                $(`input:radio[name=itemTypeRadio]:radio[value=${value.itemtype}]`).attr("checked", true);
            }
            if (value.link) {
                $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);
                form.value.value = value.link;
            } else if (value.board) {
                $('input:radio[name=linkTypeRadio]:radio[value=board]').attr("checked", true);
                form.value.value = value.board;
            } else if (value.self) {
                $('input:radio[name=linkTypeRadio]:radio[value=self]').attr("checked", true);
                form.value.value = value.self;
            } 
            if (value.subject) {
                form.subject.value = value.subject;
            }
            if (value.image) {
                form.image.value = value.image;
            }
            if (value.icon) {
                form.icon.value = value.icon;
            }
            if (value.value) {
                form.value.value = value.value;
            }
            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.uid;
            form.key.value = info.key;
            form.info.value = info.info;
            form.type.value = 'update';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'keyvalueaddSubmit') {

            var form = document.getElementById("keyvalueForm");

            var value = '';
            
            var itemtype = $("input[name='itemTypeRadio']:checked").val();
            value = `&itemtype=${itemtype}`;
            console.log("value=", value);
            var rval = $("input[name='linkTypeRadio']:checked").val();
            if (rval == 'link') {
                value = value + `&link=${form.value.value}`;
            } else if (rval == 'board') {
                value = value + `&board=${form.value.value}`;
            } else if (rval == 'self') {
                value = value + `&self=${form.value.value}`;
            } else if (rval == 'link') {

            }
            if (form.icon.value)
                value = value + '&icon=' + form.icon.value;
            if (form.subject.value)
                value = value + '&subject=' + form.subject.value;

            form.value.value = value;

            console.log("value=", value);
            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            arg.path = str;
            arg.type = 'keyvalue';
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;

            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            //console.log("form.subject.value=======" + form.subject.value);
            //var b64 = Base64.encode(form.info.value);
            //formData = self.selectedLenderCon.changeSerialize(formData, 'info', b64);
            arg.formData = formData;

            arg.form = form;
            arg.self.postAjax(arg);
        } else if (type == 'keyvaluedel') {

            if (!self.selectNode)
                return alert('노드를 선택해야됩니다');

            info = self.selectNode;
            if (!confirm(`${info.key} 키 설정을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var str = `/mankeyvalue.adm?dbpath=${arg.dbpath}&kcode=${info.kcode}&kname=${info.kname}&utf8=ok&`;
            console.log(str);
            //var arg2 = { path: str, type: "keyvalue", dbpath: arg.dbpath, elem: arg.elem, self: arg.self };
            var form = document.getElementById("keyvalueDeleteForm");
            if (form == null) {
                $('body').append(self.createKeyvalueDeleteForm());
                form = document.getElementById("keyvalueDeleteForm");
            }

            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.key.value = info.key;
            form.uid.value = info.uid;
            form.fid.value = info.uid;
            form.did.value = info.uid;
            form.type.value = 'del';
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.self.postAjax(arg);
        } else if (type == "nameadd") {
            __modal.show('식별자이름추가', self.makeNameForm());

            var form = document.getElementById("nameSetForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.uid.value = $("#keynamesel option:selected").attr('uid');
            form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.did.value = $("#keynamesel option:selected").attr('did');
            console.log(`form.fid.value==${form.fid.value} `);

            $('#nameaddBtn').bind("click", { type: 'nameaddSubmit', self: self, arg: arg }, self.eventHandler);
        } else if (type == "nameaddSubmit") {
            var form = document.getElementById("nameSetForm");

            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            //arg.path = str;
            console.log('form.kcode.value*******=' + form.kcode.value);
            arg.kcode = form.kcode.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.path = str;
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            arg.self.postAjax(arg);
            __modal.hide();
        } else if (type == 'record') {
            //console.log("info.value", info.value);
            if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
                self.selectNode = info;
                $('#selectNode').val(info.key);
                //return;
            }
            
            var value = __keyvalueSplitString(info.value);

            if (value.link) {
                if (value.link.startsWith('http'))
                    location.href = value.link;
                else
                    location.href = 'http://' + value.link;
            } else if (value.board) {
                var div = document.createElement('div');
                var p = __boardConfigSplitString(value.board);
                if (p && p.type != 'content') {
                    var c = new BoardController(p);
                    c.renderController(div);
                } else {
                    div.innerHTML = info.info;
                }
                var f = new FullScreenView();
                f.setContent(`보기`, div);
            } else if (value.self) {
                var div = document.createElement('div');
                var p = __boardConfigSplitString(value.self);
                console.log('value.self***=' + value.self);
                console.log('p.type***=' + p.type);
                if (p && p.type != 'content') {
                    var c = new BoardController(p);
                    c.renderController(div);
                } else {
                    div.innerHTML = info.info;
                }

                if (arg.viewelem) {
                    $(arg.viewelem).empty();
                    $(arg.viewelem).append(div);
                } else {
                    $(arg.elem).empty();
                    $(arg.elem).append(div);
                }
            } else if (value.link) {

            }
        } else if (type == 'return') {
            //console.log('arg.type=', arg.type, ' type=', type, ' arg.filter=', arg.filter);
            arg.renderinfo.$parent.getReturnValue('keyvalue', arg.dbpath, arg.kcode, arg.kname);
        }
    }

    makeNameForm() {
        var m = `<form class="form-horizontal" name="nameSetForm" id="nameSetForm">
                                                    <input type="hidden" name="dbpath" />
                                                    <input type="hidden" name="type" value="nameadd" />
                                                    <input type="hidden" name="uid" />
                                                    <input type="hidden" name="fid" />
                                                    <input type="hidden" name="did" />

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">그룹:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="_topmenu" readonly/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">식별자이름:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" placeholder="식별자이름이름..." required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">설명:</label>
                                                            <div>
                                                                <textarea type="text" class="form-control" name="info" placeholder="설명..." required></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                           <input type="button" id="nameaddBtn"  class="btn btn-warning btn-send" value="전송">
                                                            <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                </form>`;
        return m;
    }

    createKeyvalueDeleteForm() {
        var m = `<form id="keyvalueDeleteForm" name="keyvalueDeleteForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                <input type="hidden" name="type"/>
                                <input type="hidden" name="dbpath" />
                                <input type="hidden" name="kcode" />
                                <input type="hidden" name="kname" />
                                <input type="hidden" name="key" />
                                <input type="hidden" name="uid" />
                                <input type="hidden" name="fid" />
                                <input type="hidden" name="did" />

                            </form>`;
        return m;
    }

    createKeyvalueForm() {
        var m = `<form id="keyvalueForm" name="keyvalueForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                            <input type="hidden" name="type" value="add" />
                                            <input type="hidden" name="dbpath" />
                                            <input type="hidden" name="uid" />
                                            <input type="hidden" name="fid" />
                                            <input type="hidden" name="did" />

                                            <div class="controls">
                                                <div class="row">
                                                    <div class="form-group">
                                                        <label for="permittype" class="control-label">아이템타입</label>
                                                        <div class="clearfix"></div>
                                                        <div class="form-check form-check-inline ">
                                                            <input class="form-check-input" type="radio" name="itemTypeRadio" value="ge">
                                                            <label class="form-check-label" for="inlineCheckbox1">일반</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="itemTypeRadio" value="right">
                                                            <label class="form-check-label" for="inlineCheckbox1">우측</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="itemTypeRadio" value="brand">
                                                            <label class="form-check-label" for="inlineCheckbox1">브렌드</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">그룹</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="" readonly/>
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">식별자</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" readonly />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label class="control-label" for="inputSuccess1">아이콘</label>
                                                            <div>
                                                                <input id="iconchange_input" type="text" class="form-control" name="icon" value="" placeholder="아이콘 클래스이름....." required />
                                                                <a onclick="JavaScript: openNewWindow('/html/admin/edit/selectIcon.html?target=iconchange&1234')" data-toggle="modal" type="button" class="btn btn-primary">아이콘</a>
                                                                <a id="iconchange"></a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="empcode" class="control-label">키</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="key" placeholder="키..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">소제목</label>
                                                            <div>
                                                                <input class="form-control" name="subject" placeholder="소제목..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="permittype" class="control-label">링크타입</label>
                                                        <div class="clearfix"></div>
                                                        <div class="form-check form-check-inline ">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="link">
                                                            <label class="form-check-label" for="inlineCheckbox1">링크</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="board">
                                                            <label class="form-check-label" for="inlineCheckbox1">게시판</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="self">
                                                            <label class="form-check-label" for="inlineCheckbox1">셀프</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">링크내용</label>
                                                            <div>
                                                                <input class="form-control" name="value" placeholder="링크내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">정보</label>
                                                            <div>
                                                                <textarea class="form-control" name="info" placeholder="내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group text-right">
                                                            <input type="reset" class="btn btn-secondary" data-dismiss="modal" value="리 셋">
                                                            <input type="button" id="keyvalueaddBtn" class="btn btn-primary" value="전 송">
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                        </form>`;
        return m;
    }

    arrTopMenu($parent, arr, arg, eventHandler) {
        //console.log(` arrTopMenu arr.length=${arr.length}`);
        var $mainul = $('<ul class="dropdown-menu">');
        for (var i = 0; i < arr.length; i++) {
            var info = arr[i];
            var arr2 = arr[i].arr;

            var $img = null;
            if (info.img) {
                $img = info.img;
            } else {
                //console.log(info.imgsrc);
                if (info.imgsrc) {
                    $img = $(`<img src="${info.imgsrc}" onerror="onImgError(this);" class="mr-1" imgtype="menu" width="20" height="20" >`);
                } else if (info.iconclass) {
                    $img = $(`<i class="${info.iconclass}">`);
                } else {
                    $img = $(` `);
                }
            }

            var strinfo = info.strinfo;

            var $item = $('<li class="nav-item active">');
            if (arr2 && arr2.length > 0) {
                $item.addClass('dropdown');

                var $treeItem = $('<a class="dropdown-item dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-toggle="dropdown" aria-expanded="false">');
                $treeItem.append($img);
                $treeItem.append(info.key);
                $treeItem.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler);
                $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                $item.append($treeItem);

                this.arrTopMenu($item, arr2, arg, this.eventHandler);

            } else {

                var $treeItem = $('<a class="dropdown-item" href="#">');
                if (strinfo && strinfo.icon)
                    $treeItem.append(strinfo.icon);
                $treeItem.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler);
                $treeItem.attr('style', 'cursor:pointer;cursor: hand;');
                $treeItem.append($img);
                $treeItem.append(info.key);
                $item.append($treeItem);

            }
            $mainul.append($item);
        }
        $parent.append($mainul);
    }

    createList(info2, arg, eventHandler) {
        console.log(`arg.kname=${arg.kname}`);
        var self = this;
        var info = info2;
        this.arg = arg;
        this.keycodeselValue = arg.kcode;
        this.keynameselValue = arg.kname;
        this.rendertypeselValue = arg.rendertype;
        if (info == null || info == undefined)
            info = {};

        var keycodearr = info.keycodearr;
        var keynamearr = info.keynamearr;
        var arrarr = info.arrarr;

        if (arrarr === null)
            return;

        var $TopMenu = $('<nav class="navbar navbar-expand-lg py-0 py-md-0">');

        var $NavBland = $('<a class="navbar-brand" href="#">');
        var $navToggle = $('<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">');
        $navToggle.append('<span class="navbar-toggler-icon"></span>');

        var $navBody = $('<div class="collapse navbar-collapse" id="navbarScroll">');
        var $navItems = $('<ul class="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style="max-height: 100px;">');
        $navBody.append($navItems);

        var $navBodyRight = $('<div>');
        var $navItemsRight = $('<ul class="navbar-nav">');
        $navBodyRight.append($navItemsRight);
        //console.log(` createTopMenuView arr.length=`);
        if (arrarr && arrarr.length >= 0) {
            //console.log(` createTopMenuView if (arrarr && arrarr >= 0) arrarr.length=${arrarr.length}`);
            for (var i = 0; i < arrarr.length; i++) {
                
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                
                if (info.did == -7)
                    continue;

                var value = __keyvalueSplitString(info.value);

                if (value.image) {
                    var $img = $(`<img src="${value.image}" onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel">`);
                    //$node.append($img);
                }

                if (value.icon) {
                    //$img = value.icon;
                    $img = $(`<i class="${value.icon}"></i>`);
                    //$node.append(value.icon);
                }

                var strinfo = info.strinfo;
                
                var $item = $('<li class="nav-item active">');
                var $treeItem = null;
                if (arr && arr.length > 0) {

                    $item.addClass('dropdown');
                    var $treeItem = $('<a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-toggle="dropdown" aria-expanded="false">');
                    $treeItem.append($img);
                    $treeItem.append(info.key);
                    $treeItem.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler);
                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $item.append($treeItem);
                    this.arrTopMenu($item, arr, arg, eventHandler);
                    
                } else {
                    var $treeItem = $('<a class="nav-link" href="#">');
                    $treeItem.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler);
                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');
                    $treeItem.append($img);
                    $treeItem.append(info.key);
                    $item.append($treeItem);
                }
                //$navItems.append($item);
                if (value && value.itemtype == "right") {
                    $navItemsRight.append($item);
                    $navBody.append($navBodyRight);
                }
                else if (value && value.itemtype == "brand") {
                    $NavBland.append(info.key);
                    $NavBland.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler);
                    $NavBland.attr('style', 'cursor:pointer;cursor: hand;');
                }
                else
                    $navItems.append($item);
            }
        }

        //alert("$navItemsRight;;" + $navItemsRight);
        //$navBody.append($navItemsRight);
        $TopMenu.append($NavBland).append($navToggle).append($navBody);

        $TopMenu.addClass(arg.renderinfo.cls ?? 'navbar-light bg-light');

        var $temp = $(`<div>`);
        var divElem = $(`<div>`);
        var divElem2 = $(`<div>`);
        $temp.append(divElem).append(divElem2);

        divElem.append($TopMenu);
        arg.viewelem = divElem2;
        
        $(arg.elem).empty();
        $(arg.elem).append($temp);

        if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
            var $divE = $('<div class="form-inline">');
            var $label = $('<label class="selected-node-group">선택한노드:</label>');
            var $inputE = $(`<input type="text" class="form - control" name="selectNode" id="selectNode" placeholder="..." required />`);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("서브아이템추가");
            $buttonE.bind("click", { type: 'keyvaluesubadd', self: this, info: this.selectNode, arg: arg }, this.eventHandler);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("삭제");
            $buttonE2.bind("click", { type: 'keyvaluedel', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("수정");
            $buttonE2.bind("click", { type: 'keyvaluemodify', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);

            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("아이템추가");
            $buttonE.bind("click", { type: 'keyvalueadd', self: this, info: info, arg: arg }, this.eventHandler);
            var $writeDiv = $('<div>');
            $($writeDiv).append($buttonE);
            $(arg.elem).append($writeDiv);

            //this.setKeyvalueEditContextMenu('.keyvalue_context_menu');
        }

        if (arg.renderinfo && arg.renderinfo.returntype === "return") {
            
            var $divE = $('<div class="alert alert-dark mr-1">');

            var $label = $('<label class="selected-node-group mr-2">식별자선택:</label>');

            var keynamesel = document.createElement('select');
            keynamesel.setAttribute('id', "keynamesel");
            $(keynamesel).empty();
            $(keynamesel).append(`<option value=' '>-----</option>`);
            for (var i = 0; i < keynamearr.length; i++) {
                //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
                $(keynamesel).append(`<option value='${keynamearr[i].kname}' uid='${keynamearr[i].uid}' fid='${keynamearr[i].fid}' did='${keynamearr[i].did}'>${keynamearr[i].kname}</option>`);
                //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
            }
            //console.log(`this.keynameselValue=${this.keynameselValue}`);
            if (this.keynameselValue) {
                $(keynamesel).val(this.keynameselValue).prop("selected", true);
            } else {
                this.keynameselValue = $(keynamesel).val();
            }

            $divE.append($label).append(keynamesel);

            $(document).off("change", "#keynamesel", null);
            $(document).on("change", "#keynamesel", function () {

                //console.log("$(this).val()====" + $(this).val());
                arg.renderinfo.kname = $(this).val();
                arg.renderinfo.knamefid = $("#keynamesel option:selected").attr("fid");
                arg.self.setController(self.arg.renderinfo, self.arg.elem);
                //self.selectedLenderCon.setController(self._dbpath, self._kcode, self._keynameselValue, elem);
            });

            var $buttonE = $("<button type='button' class='btn btn-info mr-2'>이름추가</button>");
            $buttonE.bind("click", { type: "nameadd", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            var $buttonE = $("<button type='button' class='btn btn-info ml-1'>리턴</button>");
            $buttonE.bind("click", { type: "return", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            $(arg.elem).append($divE);
        }

        //console.log(`$TopMenu.html()=${$TopMenu.html()}`);
        return $TopMenu;
    }

    createBoardTopMenu(info, arg, eventHandler) {
        //alert("createHeaderMenu");
        if (info === null)
            return;

        var loginfo = info.loginfo;
        var arrarr = info.arrarr;
        var grouparr = info.grouparr;
        if (grouparr && grouparr.length >= 0) {
            for (var i = 0; i < grouparr.length; i++) {
                grouparr[i].arr = [];
            }
        }
        //console.log(`arrarr.length=${arrarr.length}`);
        if (grouparr && grouparr.length >= 0) {
            for (var i = 0; i < grouparr.length; i++) {
                var item = grouparr[i];
                var b = false;
                for (var j = 0; j < arrarr.length; j++) {
                    if (item.groupid == arrarr[j].groupid) {
                        //console.log(`j=${j}`);
                        grouparr[i].arr.push(arrarr[j]);
                    }
                }

            }
        }

        var $TopMenu = $('<nav class="navbar navbar-expand-lg navbar-dark bg-dark py-0 py-md-0">');

        var $NavBland = $('<a class="navbar-brand" href="#">');
        var $navToggle = $('<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">');
        $navToggle.append('<span class="navbar-toggler-icon"></span>');

        var $navBody = $('<div class="collapse navbar-collapse" id="navbarScroll">');
        var $navItems = $('<ul class="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style="max-height: 100px;">');
        $navBody.append($navItems);

        var $navBodyRight = $('<div>');
        var $navItemsRight = $('<ul class="navbar-nav">');
        $navBodyRight.append($navItemsRight);
        //console.log(` createTopMenuView arr.length=${arrarr.length}`);
        
        if (grouparr && grouparr.length >= 0) {
            for (var k = 0; k < grouparr.length; k++) {
                //cnt++;
                var info2 = grouparr[k];
                var arr = grouparr[k].arr;

                var $img = null;
                if (info2.img) {
                    $img = info2.img;
                } else {
                    //console.log(info.imgsrc);
                    if (info2.imgsrc) {
                        $img = $(`<img src="${info2.imgsrc}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                    } else if (info2.iconclass) {
                        $img = $(`<i class="${info2.iconclass}">`);
                    } else {
                        $img = $(` `);
                    }
                }
                console.log(`arr.length=${arr.length}`);
                var $item = $('<li class="nav-item active">');
                var $treeItem = null;
                if (arr && arr.length > 1) {

                    $item.addClass('dropdown');
                    var $treeItem = $('<a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-toggle="dropdown" aria-expanded="false">');
                    $treeItem.append($img);
                    $treeItem.append(info2.groupname);

                    $item.append($treeItem);


                    var $mainul = $('<ul class="dropdown-menu">');
                    for (var i = 0; i < arr.length; i++) {
                        var info3 = arr[i];
                        var arr2 = arr[i].arr;

                        var $img = null;
                        if (info3.img) {
                            $img = info3.img;
                        } else {
                            //console.log(info.imgsrc);
                            if (info3.imgsrc) {
                                $img = $(`<img src="${info3.imgsrc}" onerror="onImgError(this);" class="mr-1" imgtype="menu" width="20" height="20" >`);
                            } else if (info3.iconclass) {
                                $img = $(`<i class="${info3.iconclass}">`);
                            } else {
                                $img = $(` `);
                            }
                        }

                        var strinfo = info3.strinfo;

                        var $item2 = $('<li class="nav-item active">');
                        var $treeItem2 = $('<a class="dropdown-item" href="#">');
                        
                        $treeItem2.bind("click", { type: 'menuclick', info: info3, arg: arg }, eventHandler);
                        if (__mainController)
                            $treeItem2.bind("click", { type: 'menuclick', info: info3, arg: arg }, __mainController.eventHandler);
                        $treeItem2.attr('style', 'cursor:pointer;cursor: hand;');
                        $treeItem2.append($img);
                        $treeItem2.append(info3.brdname);
                        $item2.append($treeItem2);
                        $mainul.append($item2);
                    }
                    $item.append($mainul);
                    //this.arrTopMenu($item, arr, arg, eventHandler);

                } else if (arr && arr.length == 1) {
                    console.log(`arrarr.length=${arrarr.length} info2.brdname=${info2.brdname}`);
                    var $treeItem = $('<a class="nav-link" href="#">');
                    $treeItem.bind("click", { type: 'menuclick', info: arr[0], arg: arg }, eventHandler);
                    if (__mainController)
                        $treeItem.bind("click", { type: 'menuclick', info: arr[0], arg: arg }, __mainController.eventHandler);
                    $treeItem.attr('style', 'cursor:pointer;cursor: hand;');
                    $treeItem.append($img);
                    $treeItem.append(arr[0].brdname);
                    $item.append($treeItem);
                }
                $navItems.append($item);
                /***
                if (strinfo && strinfo.itemtype && strinfo.itemtype == "right")
                    $navItemsRight.append($item);
                else if (strinfo && strinfo.itemtype && strinfo.itemtype == "brand")
                    $NavBland.append(info.brand);
                else
                    $navItems.append($item);***/
            }
        }

        //alert("$navItemsRight;;" + $navItemsRight);
        //$navBody.append($navItemsRight);
        $TopMenu.append($NavBland).append($navToggle).append($navBody);

        $(arg.topelem).empty();
        $(arg.topelem).append($TopMenu);

        //console.log(`$TopMenu.parent().html()=${$TopMenu.parent().html()}`);
        return $TopMenu;
    }
}

class SideMenuView extends ViewBase {
    constructor() {
        super();

        $(document).on('click', '#sidemenuBtn', function () {
            $('.sidebar').toggleClass('fliph');
        });
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;
        console.log('arg=', arg);
        if (type == 'keyvalueadd') {
            __modal.show('키추가', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.kname.value = arg.kname;
            form.fid.value = arg.renderinfo.knamefid;
            form.type.value = 'add';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            console.log(`arg.renderinfo.knamefid=${arg.renderinfo.knamefid}`);
            
        } else if (type == 'keyvaluesubadd') {
            __modal.show('서브키추가', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            info = self.selectNode;
            console.log('info=', info);
            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.uid;
            form.type.value = 'subadd';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            console.log(`form.uid.value==${form.uid.value} `);
        } else if (type == 'keyvaluemodify') {
            __modal.show('수정', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            info = self.selectNode;

            var value = __keyvalueSplitString(info.value);
            if (value.itemtype) {
                $(`input:radio[name=itemTypeRadio]:radio[value=${value.itemtype}]`).attr("checked", true);
            }
            if (value.link) {
                $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);
                form.value.value = value.link;
            } else if (value.board) {
                $('input:radio[name=linkTypeRadio]:radio[value=board]').attr("checked", true);
                form.value.value = value.board;
            } else if (value.self) {
                $('input:radio[name=linkTypeRadio]:radio[value=self]').attr("checked", true);
                form.value.value = value.self;
            }
            if (value.subject) {
                form.subject.value = value.subject;
            }
            if (value.image) {
                form.image.value = value.image;
            }
            if (value.icon) {
                form.icon.value = value.icon;
            }
            if (value.value) {
                form.value.value = value.value;
            }
            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.uid;
            form.key.value = info.key;
            form.info.value = info.info;
            form.type.value = 'update';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
            
        } else if (type == 'keyvalueaddSubmit') {

            var form = document.getElementById("keyvalueForm");

            var value = '';
            
            var rval = $("input[name='linkTypeRadio']:checked").val();
            if (rval == 'link') {
                value = value + `&link=${form.value.value}`;
            } else if (rval == 'board') {
                value = value + `&board=${form.value.value}`;
            } else if (rval == 'self') {
                value = value + `self=${form.value.value}`;
            } else if (rval == 'link') {

            }
            if (form.icon.value)
                value = value + '&icon=' + form.icon.value;
            if (form.subject.value)
                value = value + '&subject=' + form.subject.value;

            form.value.value = value;

            console.log("form.fid.value=", form.type.value);
            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            arg.path = str;
            arg.type = 'keyvalue';
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;

            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            //console.log("form.subject.value=======" + form.subject.value);
            //var b64 = Base64.encode(form.info.value);
            //formData = self.selectedLenderCon.changeSerialize(formData, 'info', b64);
            arg.formData = formData;

            arg.form = form;
            arg.self.postAjax(arg);
        } else if (type == 'keyvaluedel') {

            if (!self.selectNode)
                return alert('노드를 설택해야됩니다');

            info = self.selectNode;
            if (!confirm(`${info.key} 키 설정을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var str = `/mankeyvalue.adm?dbpath=${arg.dbpath}&kcode=${info.kcode}&kname=${info.kname}&utf8=ok&`;
            //console.log(str);
            //var arg2 = { path: str, type: "keyvalue", dbpath: arg.dbpath, elem: arg.elem, self: arg.self };
            var form = document.getElementById("keyvalueDeleteForm");
            if (form == null) {
                $('body').append(self.createKeyvalueDeleteForm());
                form = document.getElementById("keyvalueDeleteForm");
            }

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.kname.value = info.kname;
            form.key.value = info.key;
            form.uid.value = info.uid;
            form.fid.value = info.uid;
            form.did.value = info.uid;
            form.type.value = 'del';
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.self.postAjax(arg);
        } else if (type == "nameadd") {
            __modal.show('식별자이름추가', self.makeNameForm());

            var form = document.getElementById("nameSetForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.uid.value = $("#keynamesel option:selected").attr('uid');
            form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.did.value = $("#keynamesel option:selected").attr('did');
            console.log(`$("#keynamesel option:selected").attr('fid')==${$("#keynamesel option:selected").attr('fid') } `);
            
            $('#nameaddBtn').bind("click", { type: 'nameaddSubmit', self: self, arg: arg }, self.eventHandler);
        } else if (type == "nameaddSubmit") {
            var form = document.getElementById("nameSetForm");

            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            //arg.path = str;
            console.log('form.kcode.value*******=' + form.kcode.value);
            arg.kcode = form.kcode.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;
            
            arg.path = str;
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            arg.self.postAjax(arg);
            __modal.hide();
        } else if (type == 'record') {
            if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
                self.selectNode = info;
                $('#selectNode').val(info.key);
            }
            
            if (arg && arg.renderinfo && arg.renderinfo.viewbody) {
                var f = new FullScreenView();
                f.setContent(`보기`, arg.renderinfo.viewbody.createViewbody(info, arg, this.eventHandler));
                return;
            }
            var value = __keyvalueSplitString(info.value);

            if (value.link) {
                if (value.link.startsWith('http'))
                    location.href = value.link;
                else
                    location.href = 'http://' + value.link;
            } else if (value.board) {
                var div = document.createElement('div');
                var p = __boardConfigSplitString(value.board);
                if (p && p.type != 'content') {
                    var c = new BoardController(p);
                    c.renderController(div);
                } else {
                    div.innerHTML = info.info;
                }
                var f = new FullScreenView();
                f.setContent(`보기`, div);
            } else if (value.self) {
                var div = document.createElement('div');
                var p = __boardConfigSplitString(value.self);
                console.log('value.self***=' + value.self);
                console.log('p.type***=' + p.type);
                if (p && p.type != 'content') {
                    var c = new BoardController(p);
                    c.renderController(div);
                } else {
                    div.innerHTML = info.info;
                }

                if (arg.viewelem) {
                    $(arg.viewelem).empty();
                    $(arg.viewelem).append(div);
                } else {
                    $(arg.elem).empty();
                    $(arg.elem).append(div);
                }
            } else if (value.link) {

            }
        } else if (type == 'return') {
            //console.log('arg.type=', arg.type, ' type=', type, ' arg.filter=', arg.filter);
            arg.renderinfo.$parent.getReturnValue('keyvalue', arg.dbpath, arg.kcode, arg.kname);
        }
    }

    makeNameForm() {
        var m = `<form class="form-horizontal" name="nameSetForm" id="nameSetForm">
                                                    <input type="hidden" name="dbpath" />
                                                    <input type="hidden" name="type" value="nameadd" />
                                                    <input type="hidden" name="uid" />
                                                    <input type="hidden" name="fid" />
                                                    <input type="hidden" name="did" />

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">그룹:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="_sidemenu" readonly/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">식별자이름:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" placeholder="식별자이름이름..." required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">설명:</label>
                                                            <div>
                                                                <textarea type="text" class="form-control" name="info" placeholder="설명..." required></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                           <input type="button" id="nameaddBtn"  class="btn btn-warning btn-send" value="전송">
                                                            <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                </form>`;
        return m;
    }

    createKeyvalueDeleteForm() {
        var m = `<form id="keyvalueDeleteForm" name="keyvalueDeleteForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                <input type="hidden" name="type"/>
                                <input type="hidden" name="dbpath" />
                                <input type="hidden" name="kcode" />
                                <input type="hidden" name="kname" />
                                <input type="hidden" name="key" />
                                <input type="hidden" name="uid" />
                                <input type="hidden" name="fid" />
                                <input type="hidden" name="did" />

                            </form>`;
        return m;
    }

    createKeyvalueForm() {
        var m = `<form id="keyvalueForm" name="keyvalueForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                            <input type="hidden" name="type" value="add" />
                                            <input type="hidden" name="dbpath" />
                                            <input type="hidden" name="uid" />
                                            <input type="hidden" name="fid" />
                                            <input type="hidden" name="did" />

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">그룹</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="" readonly/>
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">식별자</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" readonly />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label class="control-label" for="inputSuccess1">아이콘</label>
                                                            <div>
                                                                <input id="iconchange_input" type="text" class="form-control" name="icon" value="" placeholder="아이콘 클래스이름....." required />
                                                                <a onclick="JavaScript: openNewWindow('/html/admin/edit/selectIcon.html?target=iconchange&1234')" data-toggle="modal" type="button" class="btn btn-primary">아이콘</a>
                                                                <a id="iconchange"></a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="empcode" class="control-label">키</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="key" placeholder="키..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">소제목</label>
                                                            <div>
                                                                <input class="form-control" name="subject" placeholder="소제목..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="permittype" class="control-label">링크타입</label>
                                                        <div class="clearfix"></div>
                                                        <div class="form-check form-check-inline ">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="link">
                                                            <label class="form-check-label" for="inlineCheckbox1">링크</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="board">
                                                            <label class="form-check-label" for="inlineCheckbox1">게시판</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="self">
                                                            <label class="form-check-label" for="inlineCheckbox1">셀프</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">링크내용</label>
                                                            <div>
                                                                <input class="form-control" name="value" placeholder="링크내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">정보</label>
                                                            <div>
                                                                <textarea class="form-control" name="info" placeholder="내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group text-right">
                                                            <input type="reset" class="btn btn-secondary" data-dismiss="modal" value="리 셋">
                                                            <input type="button" id="keyvalueaddBtn" class="btn btn-primary" value="전 송">
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                        </form>`;
        return m;
    }

    createList(info2, arg, eventHandler) {
        console.log(`createList(info2, arg, eventHandler)arg.kname=${arg.kname}`);
        var self = this;
        var info = info2;
        this.arg = arg;
        if (info == null || info == undefined)
            info = {};

        var keycodearr = info.keycodearr;
        var keynamearr = info.keynamearr;
        var arrarr = info.arrarr;

        var $sideMenuE = null;
        var cnt = 0;
        
        var $tree = $('<ul class="list-sidebar">');
        var $treeItem = null, $treeItemIn = null;
        $sideMenuE = $('<div class="sidebar left ">');

        if (arg.renderinfo.rendertype == 'self') {
            var $treeBtn = $('<button id="sidemenuBtn"> <i class="fa fa fa-th-large"></i></button>');
            $sideMenuE.append($treeBtn);

        }

        $sideMenuE.append($tree);
        
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                console.log(`arrarr.length==${arrarr.length}`);
                if (info.did == -7)
                    continue;

                var value = __keyvalueSplitString(info.value);
                var $img = null;
                if (value.image) {
                    var $img = $(`<img src="${value.image}" onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel">`);
                    //$node.append($img);
                }

                if (value.icon) {
                    //$img = value.icon;
                    $img = $(`<i class="${value.icon}"></i>`);
                    //$node.append(value.icon);
                }

                var key;
                if (info.key)
                    key = info.key;
                else
                    key = info.brdname;

                //console.log(`$img==${$img}`);
                if (arr && arr.length > 0) {
                    var naming = 'naming' + cnt;
                    $treeItemIn = $(`<a href="#" data-toggle="collapse" data-target="#${naming}" class="collapsed active">`);
                    $treeItemIn.append($img).append(`<span class="nav-label">${key}</span>`).append(`<span class="fa fa-chevron-left pull-right">`);

                    $treeItem = $('<li>').append($treeItemIn);
                    if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
                        
                    }
                    $treeItemIn.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler);
                    $treeItemIn.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                    //console.log(`arr.length in==${arr.length}`);
                    this.arrSideMenu($treeItem, arr, cnt, arg, eventHandler);
                    //console.log(`arr.length in2==${arr.length}`);
                } else {
                    $treeItemIn = $('<a href="#">').append($img).append(key);
                    $treeItem = $('<li>').append($treeItemIn);
                    $treeItemIn.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler);
                    $treeItemIn.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                }
            }
        }

        if (arg.renderinfo.rendertype == 'self') {
            
            var $temp = $(`<div>`).addClass("d-flex");
            var divElem = $(`<div>`).addClass(`mr-2`);
            var divElem2 = $(`<div>`).addClass(`ml-2 flex-fill`);
            $temp.append(divElem).append(divElem2);

            divElem.append($sideMenuE);
            arg.viewelem = divElem2;

            $(arg.elem).empty();
            $(arg.elem).append($temp);
            console.log("arg.renderinfo.rendertype===" + arg.renderinfo.rendertype);
        } else {
            $(arg.elem).empty();
            $(arg.elem).append($sideMenuE);
        }
        

        if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
            var $divE = $('<div class="form-inline">');
            var $label = $('<label class="selected-node-group">선택한노드:</label>');
            var $inputE = $(`<input type="text" class="form - control" name="selectNode" id="selectNode" placeholder="..." required />`);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("서브아이템추가");
            $buttonE.bind("click", { type: 'keyvaluesubadd', self: this, info: this.selectNode, arg: arg }, this.eventHandler);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("삭제");
            $buttonE2.bind("click", { type: 'keyvaluedel', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("수정");
            $buttonE2.bind("click", { type: 'keyvaluemodify', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);

            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("아이템추가");
            $buttonE.bind("click", { type: 'keyvalueadd', self: this, info: info, arg: arg }, this.eventHandler);
            var $writeDiv = $('<div>');
            $($writeDiv).append($buttonE);
            $(arg.elem).append($writeDiv);

            //this.setKeyvalueEditContextMenu('.keyvalue_context_menu');
        }

        if (arg.renderinfo && arg.renderinfo.returntype === "return") {
            var $divE = $('<div class="alert alert-dark mr-1">');

            var $label = $('<label class="selected-node-group mr-2">식별자선택:</label>');

            var keynamesel = document.createElement('select');
            keynamesel.setAttribute('id', "keynamesel");
            $(keynamesel).empty();
            $(keynamesel).append(`<option value=' '>-----</option>`);
            for (var i = 0; i < keynamearr.length; i++) {
                //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
                $(keynamesel).append(`<option value='${keynamearr[i].kname}' uid='${keynamearr[i].uid}' fid='${keynamearr[i].fid}' did='${keynamearr[i].did}'>${keynamearr[i].kname}</option>`);
                
            }
            //console.log(`this.keynameselValue=${this.keynameselValue}`);
            if (arg.kname) {
                $(keynamesel).val(arg.kname).prop("selected", true);
            } else {
                arg.kname = $(keynamesel).val();
            }

            $divE.append($label).append(keynamesel);

            $(document).off("change", "#keynamesel", null);
            $(document).on("change", "#keynamesel", function () {

                console.log("$(this).val()====" + $(this).val());
                arg.renderinfo.kname = $(this).val();
                arg.renderinfo.knamefid = $("#keynamesel option:selected").attr("fid");
                //self.arg.self.listAjax(self.arg.renderinfo)
                arg.self.setController(arg.renderinfo, arg.elem)
                //self.selectedLenderCon.setController(self._dbpath, self._kcode, self._keynameselValue, elem);
            });

            var $buttonE = $("<button type='button' class='btn btn-info mr-2'>이름추가</button>");
            $buttonE.bind("click", { type: "nameadd", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            var $buttonE = $("<button type='button' class='btn btn-info mr-2'>리턴</button>");
            $buttonE.bind("click", { type: "return", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            $(arg.elem).append($divE);
        }
        //console.log(`$sideMenuE.html()==${$sideMenuE.parent().html()}`);
        return $sideMenuE;
    }

    arrSideMenu = function ($parent, arr, cnt, arg, eventHandler) {
        var naming = 'naming' + cnt;
        var $treeDropdown = $(`<ul class="sub-menu collapse" id="${naming}">`);
        var $treeItem = null, $treeItemIn = null;
        //console.log(`arr.length in3333==${arr.length}`);
        for (var i = 0; i < arr.length; i++) {
            //console.log(`arr.length==${arr.length}`);
            var info = arr[i];
            var arr2 = arr[i].arr;

            var value = __keyvalueSplitString(info.value);
            var $img = null;
            if (value.image) {
                var $img = $(`<img src="${value.image}" onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel">`);
                //$node.append($img);
            }

            if (value.icon) {
                $img = value.icon;
                //$node.append(value.icon);
            }

            var key;
            if (info.key)
                key = info.key;
            else
                key = info.brdname;
            cnt++;
            if (arr2 && arr2.length > 0) {
                var naming = 'naming' + cnt;
                $treeItemIn = $(`<a href="#" data-toggle="collapse" data-target="#${naming}" class="collapsed active">`);
                $treeItemIn.append($img).append(`<span class="nav-label">${key}</span>`).append(`<span class="fa fa-chevron-left pull-right">`);

                $treeItem = $('<li>').append($treeItemIn);
                $treeItemIn.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler);
                $treeItemIn.attr('style', 'cursor:pointer;cursor: hand;');

                //$tree.append($treeItem);

                $treeDropdown.append($treeItem);

                this.arrSideMenu($treeItem, arr2, cnt, arg, eventHandler);
            } else {

                $treeItemIn = $('<a href="#">').append($img).append(key);
                $treeItem = $('<li>').append($treeItemIn);
                $treeItemIn.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler);
                $treeItemIn.attr('style', 'cursor:pointer;cursor: hand;');

                //$tree.append($treeItem);

                $treeDropdown.append($treeItem);
            }
        }
        $parent.append($treeDropdown);
    }

    createBoardSideMenu(info, arg, eventHandler) {
        //alert("createSideMenu");
        if (info === null)
            return;

        var loginfo = info.loginfo;
        var arrarr = info.arrarr;
        var grouparr = info.grouparr;
        //console.log(`grouparr.length=${grouparr.length}`);
        if (grouparr && grouparr.length >= 0) {
            for (var i = 0; i < grouparr.length; i++) {
                grouparr[i].arr = [];
            }
        }
        if (grouparr && grouparr.length >= 0) {
            for (var i = 0; i < grouparr.length; i++) {
                var item = grouparr[i];
                var b = false;
                for (var j = 0; j < arrarr.length; j++) {
                    if (item.groupid == arrarr[j].groupid) {
                        grouparr[i].arr.push(arrarr[j]);
                    }
                }

            }
        }
        //console.log(`grouparr[1].arr.length=${grouparr[1].arr.length}`);
        var $sideMenuE = null;
        var cnt = 0;
        var $tree = $('<ul class="list-sidebar">');
        var $treeItem = null, $treeItemIn = null;
        $sideMenuE = $('<div class="sidebar left ">');
        $sideMenuE.append($tree);

        if (grouparr && grouparr.length >= 0) {
            for (var i = 0; i < grouparr.length; i++) {
                cnt++;
                var info = grouparr[i];
                var arr = grouparr[i].arr;

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
                        $img = $(` `);
                    }
                }
                //console.log(`arr.length=${arr.length}`);
                if (arr && arr.length > 1) {
                    var naming = 'naming' + cnt;
                    $treeItemIn = $(`<a href="#" data-toggle="collapse" data-target="#${naming}" class="collapsed active">`);
                    $treeItemIn.append($img).append(`<span class="nav-label">${info.groupname}</span>`).append(`<span class="fa fa-chevron-left pull-right">`);

                    $treeItem = $('<li>').append($treeItemIn);
                    $tree.append($treeItem);

                    var $treeDropdown = $(`<ul class="sub-menu collapse" id="${naming}">`);
                    var $treeItem2 = null, $treeItemIn2 = null;
                    //console.log(`arr.length in3333==${arr.length}`);
                    for (var j = 0; j < arr.length; j++) {
                        //console.log(`arr.length==${arr.length}`);
                        var info2 = arr[j];
                        var arr2 = arr[j].arr;

                        var $img = null;
                        if (info2.img) {
                            $img = info2.img;
                        } else {
                            //console.log(info.imgsrc);
                            if (info2.imgsrc) {
                                $img = $(`<img src="${info2.imgsrc}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                            } else if (info2.iconclass) {
                                $img = $(`<i class="${info2.iconclass}">`);
                            } else {
                                $img = $(` `);
                            }
                        }
                        
                        cnt++;
                        $treeItemIn2 = $('<a href="#">').append($img).append(info2.brdname);
                        $treeItem2 = $('<li>').append($treeItemIn2);
                        $treeItemIn2.bind("click", { type: 'menuclick', info: info2, arg: arg }, eventHandler);
                        if (__mainController)
                            $treeItemIn2.bind("click", { type: 'menuclick', info: info2, arg: arg }, __mainController.eventHandler);
                        $treeItemIn2.attr('style', 'cursor:pointer;cursor: hand;');

                        //$tree.append($treeItem);

                        $treeDropdown.append($treeItem2);
                    }
                    $treeItem.append($treeDropdown);
                    //this.arrSideMenu($treeItem, arr, cnt, arg, eventHandler);
                } else if (arr && arr.length == 1) {
                    var info2 = arr[0];
                    $treeItemIn = $('<a href="#">').append($img).append(info2.brdname);
                    $treeItem = $('<li>').append($treeItemIn);
                    $treeItemIn.bind("click", { type: 'menuclick', info: info2, arg: arg }, eventHandler);
                    if (__mainController)
                        $treeItemIn.bind("click", { type: 'menuclick', info: info2, arg: arg }, __mainController.eventHandler);
                    $treeItemIn.attr('style', 'cursor:pointer;cursor: hand;');

                    $tree.append($treeItem);
                }
            }
        }

        //$(arg.elem).empty();
        $(arg.sideelem).append($sideMenuE);
        //console.log(`$sideMenuE.html()==${$sideMenuE.html()}`)
        return $sideMenuE;
    }
}

class ListTreeView extends ViewBase {
    constructor() {
        super();
        $(document.body).append(this.createUploadDataForm());
        $(document).on("change", "input[name=linkTypeRadio]", function () {

            var checkRadio = $(this).val();
            //console.log(`checkRadio=${checkRadio}`)
            if (checkRadio == 'link') {
                //alert('radio change text' + $(this).val());

            } else if (checkRadio == 'board') {

            } else if (checkRadio == 'self') {

            }
        });
    }

    eventHandler(e) {
        e.stopPropagation();
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;
        console.log('arg=', arg);
        if (type == 'keyvalueadd') {
            __modal.show('키추가', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.kname.value = arg.kname;
            form.fid.value = arg.renderinfo.knamefid;
            form.type.value = 'add';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            console.log(`arg.renderinfo.knamefid=${arg.renderinfo.knamefid}`);

        } else if (type == 'keyvaluesubadd') {
            __modal.show('서브키추가', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            info = self.selectNode;
            console.log('info=', info);
            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.uid;
            form.type.value = 'subadd';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            console.log(`form.uid.value==${form.uid.value} `);
        } else if (type == 'keyvaluemodify') {
            __modal.show('수정', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            info = self.selectNode;
            var value = __keyvalueSplitString(info.value);
            if (value.itemtype) {
                $(`input:radio[name=itemTypeRadio]:radio[value=${value.itemtype}]`).attr("checked", true);
            }
            if (value.link) {
                $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);
                form.value.value = value.link;
            } else if (value.board) {
                $('input:radio[name=linkTypeRadio]:radio[value=board]').attr("checked", true);
                form.value.value = value.board;
            } else if (value.self) {
                $('input:radio[name=linkTypeRadio]:radio[value=self]').attr("checked", true);
                form.value.value = value.self;
            }
            if (value.subject) {
                form.subject.value = value.subject;
            }
            if (value.image) {
                form.image.value = value.image;
            }
            if (value.icon) {
                form.icon.value = value.icon;
            }
            if (value.value) {
                form.value.value = value.value;
            }
            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.uid;
            form.key.value = info.key;
            form.info.value = info.info;
            form.type.value = 'update';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'keyvalueaddSubmit') {

            var form = document.getElementById("keyvalueForm");

            var value = '';

            var rval = $("input[name='linkTypeRadio']:checked").val();
            if (rval == 'link') {
                value = value + `&link=${form.value.value}`;
            } else if (rval == 'board') {
                value = value + `&board=${form.value.value}`;
            } else if (rval == 'self') {
                value = value + `self=${form.value.value}`;
            } else if (rval == 'link') {

            }
            if (form.icon.value)
                value = value + '&icon=' + form.icon.value;
            if (form.subject.value)
                value = value + '&subject=' + form.subject.value;

            form.value.value = value;

            console.log("form.fid.value=", form.type.value);
            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            arg.path = str;
            arg.type = 'keyvalue';
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;

            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            //console.log("form.subject.value=======" + form.subject.value);
            //var b64 = Base64.encode(form.info.value);
            //formData = self.selectedLenderCon.changeSerialize(formData, 'info', b64);
            arg.formData = formData;

            arg.form = form;
            arg.self.postAjax(arg);
        } else if (type == 'keyvaluedel') {

            if (!self.selectNode)
                return alert('노드를 설택해야됩니다');

            info = self.selectNode;
            if (!confirm(`${info.key} 키 설정을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var str = `/mankeyvalue.adm?dbpath=${arg.dbpath}&kcode=${info.kcode}&kname=${info.kname}&utf8=ok&`;
            //console.log(str);
            //var arg2 = { path: str, type: "keyvalue", dbpath: arg.dbpath, elem: arg.elem, self: arg.self };
            var form = document.getElementById("keyvalueDeleteForm");
            if (form == null) {
                $('body').append(self.createKeyvalueDeleteForm());
                form = document.getElementById("keyvalueDeleteForm");
            }

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.kname.value = info.kname;
            form.key.value = info.key;
            form.uid.value = info.uid;
            form.fid.value = info.uid;
            form.did.value = info.uid;
            form.type.value = 'del';
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.self.postAjax(arg);
        } else if (type == "nameadd") {
            __modal.show('식별자이름추가', self.makeNameForm());

            var form = document.getElementById("nameSetForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.uid.value = $("#keynamesel option:selected").attr('uid');
            form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.did.value = $("#keynamesel option:selected").attr('did');
            console.log(`$("#keynamesel option:selected").attr('fid')==${$("#keynamesel option:selected").attr('fid')} `);

            $('#nameaddBtn').bind("click", { type: 'nameaddSubmit', self: self, arg: arg }, self.eventHandler);
        } else if (type == "nameaddSubmit") {
            var form = document.getElementById("nameSetForm");

            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            //arg.path = str;
            console.log('form.kcode.value*******=' + form.kcode.value);
            arg.kcode = form.kcode.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.path = str;
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            arg.self.postAjax(arg);
            __modal.hide();
        } else if (type == 'record') {
            if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
                self.selectNode = info;
                $('#selectNode').val(info.key);
            }

            if (arg && arg.renderinfo && arg.renderinfo.viewbody) {
                var f = new FullScreenView();
                f.setContent(`보기`, arg.renderinfo.viewbody.createViewbody(info, arg, this.eventHandler));
                return;
            }
            var value = __keyvalueSplitString(info.value);

            if (value.link) {
                if (value.link.startsWith('http'))
                    location.href = value.link;
                else
                    location.href = 'http://' + value.link;
            } else if (value.board) {
                var div = document.createElement('div');
                var p = __boardConfigSplitString(value.board);
                if (p && p.type != 'content') {
                    var c = new BoardController(p);
                    c.renderController(div);
                } else {
                    div.innerHTML = info.info;
                }
                var f = new FullScreenView();
                f.setContent(`보기`, div);
            } else if (value.self) {
                var div = document.createElement('div');
                var p = __boardConfigSplitString(value.self);
                console.log('value.self***=' + value.self);
                console.log('p.type***=' + p.type);
                if (p && p.type != 'content') {
                    var c = new BoardController(p);
                    c.renderController(div);
                } else {
                    div.innerHTML = info.info;
                }

                if (arg.viewelem) {
                    $(arg.viewelem).empty();
                    $(arg.viewelem).append(div);
                } else {
                    $(arg.elem).empty();
                    $(arg.elem).append(div);
                }
            } else if (value.link) {

            }
        } else if (type == 'return') {
            //console.log('arg.type=', arg.type, ' type=', type, ' arg.filter=', arg.filter);
            arg.renderinfo.$parent.getReturnValue('keyvalue', arg.dbpath, arg.kcode, arg.kname);
        }
    }

    makeNameForm() {
        var m = `<form class="form-horizontal" name="nameSetForm" id="nameSetForm">
                                                    <input type="hidden" name="dbpath" />
                                                    <input type="hidden" name="type" value="nameadd" />
                                                    <input type="hidden" name="uid" />
                                                    <input type="hidden" name="fid" />
                                                    <input type="hidden" name="did" />

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">그룹:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="_list" readonly/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">식별자이름:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" placeholder="식별자이름이름..." required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">설명:</label>
                                                            <div>
                                                                <textarea type="text" class="form-control" name="info" placeholder="설명..." required></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                           <input type="button" id="nameaddBtn"  class="btn btn-warning btn-send" value="전송">
                                                            <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                </form>`;
        return m;
    }

    createKeyvalueDeleteForm() {
        var m = `<form id="keyvalueDeleteForm" name="keyvalueDeleteForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                <input type="hidden" name="type"/>
                                <input type="hidden" name="dbpath" />
                                <input type="hidden" name="kcode" />
                                <input type="hidden" name="kname" />
                                <input type="hidden" name="key" />
                                <input type="hidden" name="uid" />
                                <input type="hidden" name="fid" />
                                <input type="hidden" name="did" />

                            </form>`;
        return m;
    }

    createKeyvalueForm () {
        var m = `<form id="keyvalueForm" name="keyvalueForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                            <input type="hidden" name="type" value="add" />
                                            <input type="hidden" name="dbpath" />
                                            <input type="hidden" name="uid" />
                                            <input type="hidden" name="fid" />
                                            <input type="hidden" name="did" />

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">그룹</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="" readonly/>
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">식별자</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" readonly />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label class="control-label" for="inputSuccess1">아이콘</label>
                                                            <div>
                                                                <input id="iconchange_input" type="text" class="form-control" name="icon" value="" placeholder="아이콘....." required />
                                                                <a onclick="JavaScript: openNewWindow('/html/admin/edit/selectIcon.html?target=iconchange&1234')" data-toggle="modal" type="button" class="btn btn-primary">아이콘</a>
                                                                <a id="iconchange"></a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label class="control-label" for="inputSuccess1">이미지</label>
                                                            <div>
                                                                <input id="imagechange_input" type="text" class="form-control" name="image" value="" placeholder="이미지....." required />
                                                                <a onclick="JavaScript: openNewWindow('/html/edit/selectFile.html?target=iconchange&1234')" data-toggle="modal" type="button" class="btn btn-primary">이미지</a>
                                                                <a id="iconchange"></a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="empcode" class="control-label">키</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="key" placeholder="키..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">소제목</label>
                                                            <div>
                                                                <input class="form-control" name="subject" placeholder="소제목..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="permittype" class="control-label">링크타입</label>
                                                        <div class="clearfix"></div>
                                                        <div class="form-check form-check-inline ">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="link">
                                                            <label class="form-check-label" for="inlineCheckbox1">링크</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="board">
                                                            <label class="form-check-label" for="inlineCheckbox1">게시판</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="self">
                                                            <label class="form-check-label" for="inlineCheckbox1">셀프</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">링크내용</label>
                                                            <div>
                                                                <input class="form-control" name="value" placeholder="링크내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">정보</label>
                                                            <div>
                                                                <textarea class="form-control" name="info" placeholder="내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group text-right">
                                                            <input type="reset" class="btn btn-secondary" data-dismiss="modal" value="리 셋">
                                                            <input type="button" id="keyvalueaddBtn" class="btn btn-primary" value="전 송">
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                        </form>`;
        return m;
    }

    createUploadDataForm() {
        var m = `<form id="uploadkeyvalueform">
                <input type="hidden" name="fid" />
                <input type="hidden" name="dbcode" />
                <input type="hidden" name="dbpath" />
                <input type="hidden" name="type" />
                <input type="hidden" name="kcode" />
                <input type="hidden" name="kname" value="" />
                <input type="hidden" name="key">
                <input type="hidden" name="value">
                <input type="hidden" name="info">
              </form>`;
        return m;
    }

    createListTreeBox(info, arg, eventHandler) {
        //console.log(arg);
        var $dat_media_box = $('<div class="d-flex border">');
        //var $datimg = $(`<img onerror="this.src=images/ blank.gif" src="..." class="mr-3" alt="...">`);
        var value = __keyvalueSplitString(info.value);
        var $img = null;
        if (value.image) {
            var $img = $(`<img src="${value.image}" onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel">`);
            //$node.append($img);
        }

        if (value.icon) {
            $img = value.icon;
            //$node.append(value.icon);
        }

        var key;
        if (info.key)
            key = info.key;
        else
            key = info.brdname;

        var $datbody = $('<div class="media-body">');

        var $bodyhead = $('<div class="row justify-content-between">');
        var str = info.id + " (" + info.register + ")";
        var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.key);
        var $head_right = $('<div class="mt-0">');
        $bodyhead.append($head_left).append($head_right);

        var $bodybody = $('<p>').html(info.value.subject);

        if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
            $head_left.attr('kcode', arg.kcode);
            $head_left.attr('kname', arg.kname);
            $head_left.attr('uid', info.uid);
            $head_left.attr('key', info.key);
            $head_left.attr('value', info.value);
            $head_left.attr('info', info.info);
            $head_left.addClass('keyvalue_context_menu');
            //console.log('arg.kcode**=', arg.kcode);
        }

        $datbody.append($bodyhead);
        $datbody.append($bodybody);

        $dat_media_box.append($img).append($datbody);

        var btn1 = $(`<button type="button" class="btn" title="아이템수정" ><i class="fa fa-fw fa-edit"></i></button>`);
        var btn2 = $(`<button type="button" class="btn" title="서브아이템추가" ><i class="fa fa-fw fa-pencil"></i></button>`);
        var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);

        //datinfo.customer_btn1 = btn1;
        $(btn1).bind("click", { type: "keyvaluemodify", self: this, arg: arg, info: info }, this.eventHandler);
        $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
        $(btn2).bind("click", { type: "keyvaluesubadd", self: this, arg: arg, info: info}, this.eventHandler);
        $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
        $(btn3).bind("click", { type: "keyvaluedel", self: this, arg: arg, info: info }, this.eventHandler);
        $(btn3).attr('style', 'cursor:pointer;cursor: hand;');

        $head_right.append(btn1).append(btn2).append(btn3);
        
        return $dat_media_box;
    }

    arrListTree ($parent, arr, arg, eventHandler) {
        var $treeDropdown = $('<ul>');
        //console.log(`arrListTree arr.length==${arr.length}`);
        for (var i = 0; i < arr.length; i++) {
            var info = arr[i];
            var arr2 = arr[i].arr;
            //console.log(`arrListTree arr2.length==${arr2.length}`);
            if (arr2.length > 0) {
                var $listItem = $('<li class="list-group-item">');
                $listItem.append(this.createListTreeBox(info, arg, eventHandler));
                $listItem.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler, arg, eventHandler);
                $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                $treeDropdown.append($listItem);

                this.arrListTree($listItem, arr2, arg, eventHandler);
            } else {
                
                var $listItem = $('<li class="list-group-item">');
                $listItem.append(this.createListTreeBox(info, arg, eventHandler));
                $listItem.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler, arg, eventHandler);
                $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                $treeDropdown.append($listItem);
            }
        }
        $parent.append($treeDropdown);
    }

    createList(info2, arg, eventHandler) {
        //console.log(`arg.renderinfo.editmode==${arg.renderinfo.editmode}`);
        var self = this;
        var info = info2;
        this.arg = arg;
        this.keycodeselValue = arg.kcode;
        this.keynameselValue = arg.kname;
        console.log(`arg.kcode=${arg.kcode}`);
        this.rendertypeselValue = arg.rendertype;
        if (info == null || info == undefined)
            info = {};

        var keycodearr = info.keycodearr;
        var keynamearr = info.keynamearr;
        var arrarr = info.arrarr;

        var returnInfo = null;
        var cnt = 0;
        var $listView = $('<div>');
        var $list = $('<ul class="tree list-group">');
        var $listItem = null, $treeItemIn = null;
        $listView.append($list);
        //console.log(`--------------- arrarr==${arrarr}`);
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var naming = 'naming' + cnt;
                //console.log(`--------------- info.did==${info.did}`);
                if (info.did == -7)
                    continue;
                
                var arr = arrarr[i].arr;
                if (arr.length > 0) {
                    
                    $listItem = $('<li class="list-group-item">');
                    $listItem.append(this.createListTreeBox(info, arg, eventHandler));
                    $listItem.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler);
                    $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $list.append($listItem);

                    this.arrListTree($listItem, arr, arg, this.eventHandler);
                } else {
                    //console.log(`--------------- info.did==${info.did}`);
                    
                    $listItem = $('<li class="list-group-item">');
                    $listItem.append(this.createListTreeBox(info, arg, eventHandler));
                    $listItem.bind("click", { type: 'record', self: this, info: info, arg: arg }, this.eventHandler);
                    $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $list.append($listItem);
                }

                returnInfo = info;
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($listView);

        console.log(`arg.renderinfo.returntype==${arg.renderinfo.returntype}`);
        if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
            var $divE = $('<div class="form-inline">');
            var $label = $('<label class="selected-node-group">선택한노드:</label>');
            var $inputE = $(`<input type="text" class="form - control" name="selectNode" id="selectNode" placeholder="..." required />`);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("서브아이템추가");
            $buttonE.bind("click", { type: 'keyvaluesubadd', self: this, info: this.selectNode, arg: arg }, this.eventHandler);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("삭제");
            $buttonE2.bind("click", { type: 'keyvaluedel', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("수정");
            $buttonE2.bind("click", { type: 'keyvaluemodify', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);

            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("아이템추가");
            $buttonE.bind("click", { type: 'keyvalueadd', self: this, info: info, arg: arg }, this.eventHandler);
            var $writeDiv = $('<div>');
            $($writeDiv).append($buttonE);
            $(arg.elem).append($writeDiv);

            //this.setKeyvalueEditContextMenu('.keyvalue_context_menu');
        }

        if (arg.renderinfo && arg.renderinfo.returntype === "return") {
            var $divE = $('<div class="alert alert-dark mr-1">');

            var $label = $('<label class="selected-node-group mr-2">식별자선택:</label>');

            var keynamesel = document.createElement('select');
            keynamesel.setAttribute('id', "keynamesel");
            $(keynamesel).empty();
            $(keynamesel).append(`<option value=' '>-----</option>`);
            for (var i = 0; i < keynamearr.length; i++) {
                //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
                $(keynamesel).append(`<option value='${keynamearr[i].kname}' uid='${keynamearr[i].uid}' fid='${keynamearr[i].fid}' did='${keynamearr[i].did}'>${keynamearr[i].kname}</option>`);

            }
            //console.log(`this.keynameselValue=${this.keynameselValue}`);
            if (arg.kname) {
                $(keynamesel).val(arg.kname).prop("selected", true);
            } else {
                arg.kname = $(keynamesel).val();
            }

            $divE.append($label).append(keynamesel);

            $(document).off("change", "#keynamesel", null);
            $(document).on("change", "#keynamesel", function () {

                console.log("$(this).val()====" + $(this).val());
                arg.renderinfo.kname = $(this).val();
                arg.renderinfo.knamefid = $("#keynamesel option:selected").attr("fid");
                //self.arg.self.listAjax(self.arg.renderinfo)
                arg.self.setController(arg.renderinfo, arg.elem)
                //self.selectedLenderCon.setController(self._dbpath, self._kcode, self._keynameselValue, elem);
            });

            var $buttonE = $("<button type='button' class='btn btn-info mr-2'>이름추가</button>");
            $buttonE.bind("click", { type: "nameadd", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            var $buttonE = $("<button type='button' class='btn btn-info mr-2'>리턴</button>");
            $buttonE.bind("click", { type: "return", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            $(arg.elem).append($divE);
        }
        //console.log(`argrenderinfo.==${arg.renderinfo.$parent}`);

        return $listView;
    }

}

class HStairTreeView extends ViewBase {
    constructor() {
        super();

        this.boxcount = 0;
        this.cardClassArr = ['text-white bg-primary', 'text-white bg-secondary', 'text-white bg-success', 'text-white bg-danger', 'text-white bg-warning', 'text-white bg-info', 'text-white bg-dark', 'bg-light'];

        $(document.body).append(this.createUploadDataForm());
        $(document).on("change", "input[name=linkTypeRadio]", function () {

            var checkRadio = $(this).val();
            //console.log(`checkRadio=${checkRadio}`)
            if (checkRadio == 'link') {
                //alert('radio change text' + $(this).val());

            } else if (checkRadio == 'board') {

            } else if (checkRadio == 'self') {

            }
        });
    }

    getReturnValue() {
        var type, value;
        var arg = Array.prototype.slice.call(arguments);
        if (arg && arg[0])
            type = arg[0];
        else
            return;
        if (arg && arg[1])
            value = arg[1];
        console.log(`getReturnValue type==${type}`);
        //_tempCount++;
        var info = {};
        if (type == 'icon' || type == 'image') {
            var form = document.getElementById("keyvalueForm");
            console.log('form^********************************=' + form);
            //form.path.value = 'image=' + value;
            form.imageinput.value = value;
            $('#btnimg').attr('src', value);
            //$('#iconchange_input').val(type + ':' + value);
            __modal.hide();
        } else if (type == 'audio') {
            $('#playerA').attr('src', value);
            var player = document.getElementById('playerA');
            player.play();
            __modal.hide();
        } else if (type == 'video') {
            $('#playerV').attr('src', value);
            var player = document.getElementById('playerV');
            player.play();
            __modal.hide();
            //console.log(value);
        }
    }

    eventHandler(e) {
        e.preventDefault();
        //e.stopPropagation();
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;
         console.log('type=', type);
        if (type == 'keyvalueadd') {
            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`보기`, self.createKeyvalueForm());

            //__modal.show('키추가', self.createKeyvalueForm());

            $('#ImgselBtn').bind("click", { type: 'imgselBtn', self: self, info: info, arg: arg }, self.eventHandler);

            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            console.log(`info.fid==${info.fid}`);
            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.kname.value = arg.kname;
            //form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.fid.value = info.fid;
            form.type.value = 'add';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'keyvaluesubadd') {
            
            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`보기`, self.createKeyvalueForm());

            //__modal.show('키추가', self.createKeyvalueForm());

            $('#ImgselBtn').bind("click", { type: 'imgselBtn', self: self, info: info, arg: arg }, self.eventHandler);

            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            console.log(`form.imageinput.value==${form.imageinput.value}`);
            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.uid;
            form.type.value = 'subadd';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'keyvaluemodify') {
            __modal.show('수정', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.uid;
            form.key.value = info.key;
            form.value.value = info.value;
            form.info.value = info.info;
            form.type.value = 'update';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'imgselBtn') {
            var targetChild = e.target.querySelector('#btnimg');
            var c = new FileController({ type: 'filelist', code: 'root', filetype: 'file', path: '/files/media/images/icons/', filter: 'image', returntype: 'return', $parent: self });
            var elem = document.createElement('div');
            c.renderController(elem);
            __modal.show(`보기`, elem);

        } else if (type == 'keyvalueaddSubmit') {

            var form = document.getElementById("keyvalueForm");

            var value = '';
            //console.log('type=', type);
            var rval = $("input[name='linkTypeRadio']:checked").val();
            if (rval == 'link') {
                value = value + `&link=${form.value.value}`;
            } else if (rval == 'board') {
                value = value + `&board=${form.value.value}`;
            } else if (rval == 'self') {
                value = value + `self=${form.value.value}`;
            } else if (rval == 'link') {

            }
            if (form.icon.value)
                value = value + '&icon=' + form.icon.value;
            if (form.imageinput.value)
                value = value + '&image=' + form.imageinput.value;
            if (form.subject.value)
                value = value + '&subject=' + form.subject.value;

            form.value.value = value;
            console.log("value=", value);
            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            arg.path = str;
            arg.type = 'keyvalue';
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            //console.log("form.subject.value=======" + form.subject.value);
            //var b64 = Base64.encode(form.info.value);
            //formData = self.selectedLenderCon.changeSerialize(formData, 'info', b64);
            arg.formData = formData;

            arg.form = form;
            arg.self.postAjax(arg);
            if (window._fullscreen) {
                window._fullscreen.offscreen();
                window._fullscreen = null;
            }
        } else if (type == 'keyvaluedel') {

            if (!confirm(`${info.key} ${info.uid} 키 설정을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var str = `/mankeyvalue.adm?dbpath=${arg.dbpath}&kcode=${info.kcode}&kname=${info.kname}&utf8=ok&`;
            console.log(str);
            //var arg2 = { path: str, type: "keyvalue", dbpath: arg.dbpath, elem: arg.elem, self: arg.self };
            var form = document.getElementById("keyvalueDeleteForm");
            if (form == null) {
                $('body').append(self.createKeyvalueDeleteForm());
                form = document.getElementById("keyvalueDeleteForm");
            }

            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.key.value = info.key;
            form.uid.value = info.uid;
            form.fid.value = info.uid;
            form.did.value = info.uid;
            form.type.value = 'del';
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;
            arg.path = str;
            arg.self.postAjax(arg);
        } else if (type == "groupadd") {
            __modal.show('대분류 추가', self.makeGroupForm());

            var form = document.getElementById("groupSetForm");

            form.dbpath.value = arg.dbpath;
            
            $('#groupaddBtn').bind("click", { type: 'groupaddSubmit', self: self, arg: arg }, self.eventHandler);
        } else if (type == "groupaddSubmit") {
            var form = document.getElementById("groupSetForm");

            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            //arg.path = str;
            console.log('form.kcode.value*******=' + form.kcode.value);
            arg.kcode = form.kcode.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.path = str;
            arg.kcode = form.kcode.value;
            arg.kname = ' ';
            arg.self.postAjax(arg);
            __modal.hide();
        } else if (type == "nameadd") {
            __modal.show('식별자이름추가', self.makeNameForm());

            var form = document.getElementById("nameSetForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.uid.value = $("#keynamesel option:selected").attr('uid');
            form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.did.value = $("#keynamesel option:selected").attr('did');
            console.log(`form.fid.value==${form.fid.value} `);

            $('#nameaddBtn').bind("click", { type: 'nameaddSubmit', self: self, arg: arg }, self.eventHandler);
        } else if (type == "nameaddSubmit") {
            var form = document.getElementById("nameSetForm");

            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            //arg.path = str;
            console.log('form.kcode.value*******=' + form.kcode.value);
            arg.kcode = form.kcode.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.path = str;
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            arg.self.postAjax(arg);
            __modal.hide();
        } else if (type == 'itemclick') {
            //console.log('e.target**=' + e.target.innerHTML);
            //$(e.target).siblings().removeClass('active');
            //$(e.target).addClass('active');
            const $card = $(e.target).closest(".card");
            if ($card.nextAll()) {
                $card.nextAll().remove();
            }
            self.createCardBox(info, arg, self.eventHandler);
            
            var value = __keyvalueSplitString(info.value);
            
            if (value.link) {
                if (value.link.startsWith('http'))
                    location.href = value.link;
                else
                    location.href = 'http://' + value.link;
            } else if (value.board) {
                var div = document.createElement('div');
                var p = __boardConfigSplitString(value.board);
                if (p && p.type != 'content') {
                    var c = new BoardController(p);
                    c.renderController(div);
                } else {
                    div.innerHTML = info.info;
                }
                var f = new FullScreenView();
                f.setContent(`보기`, div);
            } else if (value.self) {
                var div = document.createElement('div');
                var p = __boardConfigSplitString(value.self);
                
                console.log('p.type***=' + p.type);
                if (p && p.type != 'content') {
                    var c = new BoardController(p);
                    c.renderController(div);
                } else {
                    div.innerHTML = info.info;
                }
                
                if (arg.viewelem) {
                    $(arg.viewelem).empty();
                    $(arg.viewelem).append(div);
                } else {
                    $(arg.elem).empty();
                    $(arg.elem).append(div);
                }
            } else if (value.link) {

            }
        } else if (type == 'nameclick') {
            
            arg.renderinfo.kname = info.kname;
            arg.renderinfo.knamefid = info.fid;
            //self.arg.self.listAjax(self.arg.renderinfo)
            arg.self.setController(arg.renderinfo, arg.elem);
        } else if (type == 'return') {
            //console.log('arg.type=', arg.type, ' type=', type, ' arg.filter=', arg.filter);
            arg.renderinfo.$parent.getReturnValue('keyvalue', arg.dbpath, arg.kcode, arg.kname);
        } else if (type == 'dbopen') {
            __modal.hide();
            //console.log('arg.type=', arg.type, ' type=', type, ' arg.filter=', arg.filter);
            arg.type = type;
            arg.renderinfo.$parent.getReturnValue(type, info, arg);
        } else if (type == 'dbsave') {
            var inputkname = $('#savedbinput').val();
            if (!inputkname)
                return alert('이름을 입력해야됩니다');
            const form = document.getElementById('uploadkeyvalueform');
            console.log('form==' + form);
            console.log('arg.renderinfo.data==' + arg.renderinfo.data);
            form.info.value = arg.renderinfo.data;
            form.type.value = 'nameadd2';
            form.kcode.value = arg.renderinfo.kcode;
            form.kname.value = inputkname;
            form.key.value = arg.renderinfo.kcode;
            form.dbpath.value = arg.renderinfo.dbpath;
            form.fid.value = arg.renderinfo.fid;
            //console.log('arg.renderinfo.fid==' + arg.renderinfo.fid);
            var str = "/mankeyvalue.adm?&utf8=ok&";

            var formdata = $(form).serializeArray();
            //console.log("form.subject.value=======" + form.subject.value);
            //var b64 = Base64.encode(form.info.value);
            //formData = self.selectedLenderCon.changeSerialize(formData, 'info', b64);
            // arg.formData = formData;
            __modal.hide();
            __saveFileData({ path: str, formdata: formdata });
        }
    }

    makeGroupForm() {
        var m = `<form class="form-horizontal" name="groupSetForm" id="groupSetForm">
                                                    <input type="hidden" name="dbpath" />
                                                    <input type="hidden" name="type" value="groupadd" /><!-- brdadd, groupupdate, brdupdate, groupdel, brddel-->

                                                    <div class="controls" id="groupMakeShow22">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">그룹:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" id="groupname" value="" placeholder="그룹이름..." required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">설명:</label>
                                                            <div>
                                                                <textarea type="text" class="form-control" name="info" placeholder="설명..." required></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <input type="button" id="groupaddBtn"  class="btn btn-warning btn-send" value="전송">
                                                            <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                </form>`;
        return m;
    }

    makeNameForm() {
        var m = `<form class="form-horizontal" name="nameSetForm" id="nameSetForm">
                                                    <input type="hidden" name="dbpath" />
                                                    <input type="hidden" name="type" value="nameadd" />
                                                    <input type="hidden" name="uid" />
                                                    <input type="hidden" name="fid" />
                                                    <input type="hidden" name="did" />

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">그룹:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="_list" readonly/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">식별자이름:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" placeholder="식별자이름이름..." required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">설명:</label>
                                                            <div>
                                                                <textarea type="text" class="form-control" name="info" placeholder="설명..." required></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                           <input type="button" id="nameaddBtn"  class="btn btn-warning btn-send" value="전송">
                                                            <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                </form>`;
        return m;
    }

    createKeyvalueDeleteForm() {
        var m = `<form id="keyvalueDeleteForm" name="keyvalueDeleteForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                <input type="hidden" name="type"/>
                                <input type="hidden" name="dbpath" />
                                <input type="hidden" name="kcode" />
                                <input type="hidden" name="kname" />
                                <input type="hidden" name="key" />
                                <input type="hidden" name="uid" />
                                <input type="hidden" name="fid" />
                                <input type="hidden" name="did" />

                            </form>`;
        return m;
    }

    createKeyvalueForm() {
        var m = `<form id="keyvalueForm" name="keyvalueForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                            <input type="hidden" name="type" value="add" />
                                            <input type="hidden" name="dbpath" />
                                            <input type="hidden" name="uid" />
                                            <input type="hidden" name="fid" />
                                            <input type="hidden" name="did" />

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">그룹</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="" readonly/>
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">식별자</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" readonly />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label class="control-label" for="inputSuccess1">아이콘</label>
                                                            <div>
                                                                <input id="iconchange_input" type="text" class="form-control" name="icon" value="" placeholder="아이콘....." required />
                                                                <a onclick="JavaScript: openNewWindow('/html/admin/edit/selectIcon.html?target=iconchange&1234')" data-toggle="modal" type="button" class="btn btn-primary">아이콘</a>
                                                                <a id="iconchange"></a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label class="control-label" for="inputSuccess1">이미지</label>
                                                            <div>
                                                                <input type="text" name="imageinput" id="imageinput" class="form-control" placeholder="아이콘 이미지 썸네일 경로 ...">
                                                                <button type = "button" class="btn" id="ImgselBtn" ><img id="btnimg" src="" alt="">이미지선택</button >
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="empcode" class="control-label">키</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="key" placeholder="키..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">소제목</label>
                                                            <div>
                                                                <input class="form-control" name="subject" placeholder="소제목..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="permittype" class="control-label">링크타입</label>
                                                        <div class="clearfix"></div>
                                                        <div class="form-check form-check-inline ">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="link">
                                                            <label class="form-check-label" for="inlineCheckbox1">링크</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="board">
                                                            <label class="form-check-label" for="inlineCheckbox1">게시판</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="self">
                                                            <label class="form-check-label" for="inlineCheckbox1">셀프</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">링크내용</label>
                                                            <div>
                                                                <input class="form-control" name="value" placeholder="링크내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">정보</label>
                                                            <div>
                                                                <textarea class="form-control" name="info" placeholder="내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group text-right">
                                                            <input type="reset" class="btn btn-secondary" data-dismiss="modal" value="리 셋">
                                                            <input type="button" id="keyvalueaddBtn" class="btn btn-primary" value="전 송">
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                        </form>`;
        return m;
    }

    createUploadDataForm() {
        var m = `<form id="uploadkeyvalueform">
                <input type="hidden" name="fid" />
                <input type="hidden" name="dbcode" />
                <input type="hidden" name="dbpath" />
                <input type="hidden" name="type" />
                <input type="hidden" name="kcode" />
                <input type="hidden" name="kname" value="" />
                <input type="hidden" name="key">
                <input type="hidden" name="value">
                <input type="hidden" name="info">
              </form>`;
        return m;
    }

    createCardBox(info, arg, eventHandler) {
        //console.log(arg);
        var arrarr = info.arr;
        this.boxcount++;
        var $box = $(`<div class="card mr-2 mb-1 small" boxnum="${this.boxcount}" style="width: 18rem;">`);
        var $boxHeader = $('<div class="card-header custom-card-header list-inline">');
        var rand_0_7 = Math.floor(Math.random() * 8);
        $boxHeader.addClass(this.cardClassArr[rand_0_7]);
        var $headTitle = $('<h6 class="box-title list-inline-item">').append(info.key);
        var $headRightTool = $('<div class="pull-right list-inline-item">');
        var $boxBody = $(`<div class="card-body p-2" style="overflow:auto" id="boxbody${this.boxcount}">`);
        var $boxFoot = $('<div class="card-footer small">');
        var $footRight = $('<div class="pull-right">');

        var $btn = $(`<button class="btn btn-light btn-xs" type="button">추가</button>`);
        $btn.bind("click", { type: 'keyvaluesubadd', self: this, info: info, arg: arg }, this.eventHandler);
        $headRightTool.append($btn);
        $boxFoot.append($footRight);

        $boxHeader.append($headTitle).append($headRightTool);

        $box.append($boxHeader).append($boxBody);//.append($boxFoot);

        this.$mainboxBody.append($box);

        var cnt = 0;
        //var $listView = $('<div>');
        var $list = $('<div class="list-group list-group-flush" role="tablist">');
        var $listItem = null, $treeItemIn = null;
        //$listView.append($list);
        $boxBody.append($list);

        if (arrarr && arrarr.length >= 0) {
            console.log(`--------------- arrarr.length==${arrarr.length}`);
            for (var i = 0; i < arrarr.length; i++) {
                cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var naming = 'naming' + cnt;
                //console.log(`--------------- info.did==${info.did}`);
                if (info.did == -7)
                    continue;

                var arr = arrarr[i].arr;

                var subject;
                $listItem = $('<div class="list-group-item list-group-item-action" data-toggle="list" role="tab">');
                var $item_box = $('<div class="d-flex w-100 justify-content-between">');
                $listItem.append($item_box);

                var $img = null;
                var value = __keyvalueSplitString(info.value);
                
                if (value && value.image) {
                    
                    //value.image = value.image.replace('//', '/');
                    console.log(value.image);
                    $img = $(`<img src="${value.image}" onerror="onImgError(this);" width="50" height="50" imgtype="carousel">`);

                } else if (value && value.icon) {
                    //value.image = value.image.replace('//', '/');
                    $(`<i class="${value.icon}"></i>`);

                } else
                    $img = $(`<img src="..." onerror="onImgError(this);" width="50" height="50" imgtype="carousel">`);

                if (value && value.subject) {
                    subject = value.subject;
                }

                var $boxBody = $('<div class="media-body flex-fill">');
                var $bodyHead = $('<div class="body-head list-inline">');

                var $bodySubject = $('<h5 class="list-inline-item">').append(info.key);
                $bodyHead.append($bodySubject);
                $boxBody.append($bodyHead);
                //alert('info.subject=' + info.subject);
                if (subject) {
                    var $headappend = $('<div class="">').append(subject);
                    $boxBody.append($headappend);
                }
                if (info.headappend) {
                    var $headappend = $('<div class="list-inline-item pull-right">').append('headappend' + info.headappend);
                    $bodyHead.append($headappend);
                }

                var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);
                btn3.bind("click", { type: 'keyvaluedel', self: this, info: info, arg: arg }, this.eventHandler);
                $item_box.append($img).append($boxBody).append(btn3);

                $listItem.bind("click", { type: 'itemclick', self: this, info: info, arg: arg }, this.eventHandler);
                $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                $list.append($listItem);

            }
        }

        // 마지막으로 추가된 카드로 스크롤합니다.
        $box[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        return $box;
    }

    createList(info, arg, eventHandler) {

        var self = this;
        //var info = info2;
        var loginfo = info.loginfo;
        this.arg = arg;
        this.selectedNameInfo;
        this.keycodeselValue = arg.kcode;
        this.keynameselValue = arg.kname;
        //console.log(`loginfo.sid=${loginfo.sid}`);
        this.rendertypeselValue = arg.rendertype;
        if (info == null || info == undefined)
            info = {};

        var keycodearr = info.keycodearr;
        var keynamearr = info.keynamearr;
        var arrarr = info.arrarr;

        var $temp = $('<div>');
        var $tempChild = $('<div>');


        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        $temp.append($tempChild);

        var divElem;
        var divElem2;
        $tempChild.append(divElem).append(divElem2);
        if (arg.renderinfo.rendertype == 'selectlist_h') {

            $tempChild.addClass("row");
            divElem = $(`<div>`).addClass(`col-md-4`);
            divElem2 = $(`<div>`).addClass(`col-md-8`);
            $tempChild.append(divElem).append(divElem2);

        } else {
            divElem = $(`<div>`);
            divElem2 = $(`<div>`);
            $tempChild.append(divElem).append(divElem2);

        }
        arg.viewelem = divElem2;

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        var $mainbox = $(`<div class="card">`);
        var $mainboxboxHeader = $('<div class="card-header custom-card-header text-white bg-secondary">');
        var $headTitle = $('<h5 class="box-title">').append(arg.renderinfo.title);
        var $headRightTool = $('<div class="pull-right list-inline-item">');
        this.$mainboxBody = $(`<div class="card-body card-group card-group-scroll p-2" id="collapseMainbox">`);
        var $boxFoot = $('<div class="card-footer small">');
        var $footRight = $('<div class="pull-right">');

        var keynamesel = document.createElement('select');
        keynamesel.setAttribute('id', "keynamesel");
        keynamesel.setAttribute('class', "mr-2");
        $(keynamesel).empty();
        $(keynamesel).append(`<option value=' '>메뉴선택</option>`);

        if (keynamearr) {
            for (var i = 0; i < keynamearr.length; i++) {
                $(keynamesel).append(`<option value='${keynamearr[i].kname}' uid='${keynamearr[i].uid}' fid='${keynamearr[i].fid}' did='${keynamearr[i].did}'>${keynamearr[i].kname}</option>`);
                console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
                var nameinfo = keynamearr[i];
                if (this.keynameselValue == nameinfo.kname) {
                    this.selectedNameInfo = nameinfo;
                }

            }

        }
        
        //console.log(`this.keynameselValue=${this.keynameselValue}`);
        if (this.keynameselValue) {
            $(keynamesel).val(this.keynameselValue).prop("selected", true);
        } else {
            this.keynameselValue = $(keynamesel).val();
            arg.renderinfo.kname = this.keynameselValue;
            arg.renderinfo.knamefid = $("#keynamesel option:selected").attr("fid");
            arg.self.setController(self.arg.renderinfo, self.arg.elem)
        }

        $(document).off("change", "#keynamesel", null);
        $(document).on("change", "#keynamesel", function () {

            console.log("$(this).val()====" + $(this).val());
            arg.renderinfo.kname = $(this).val();
            arg.renderinfo.knamefid = $("#keynamesel option:selected").attr("fid");
            arg.self.setController(self.arg.renderinfo, self.arg.elem)
            //self.selectedLenderCon.setController(self._dbpath, self._kcode, self._keynameselValue, elem);
        });

        $headRightTool.append(keynamesel);

        var $btn = $(`<button class="btn btn-light btn-xs" type="button">추가</button>`);
        $btn.bind("click", { type: 'nameadd', self: this, info: this.selectedNameInfo, arg: arg }, this.eventHandler);
        $headRightTool.append($btn);

        var $btn = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);
        $btn.bind("click", { type: 'keyvaluedel', self: this, info: this.selectedNameInfo, arg: arg }, this.eventHandler);
        $btn.attr('style', 'cursor:pointer;cursor: hand;');

        //var $btn = $(`<button class="btn btn-light btn-xs" type="button" data-toggle="collapse" href="#collapseMainbox">x</button>`);
        //$btn.bind("click", { type: 'preview', self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
        $headRightTool.append($btn);
        //$boxFoot.append($footRight);
        
        $mainboxboxHeader.append($headTitle).append($headRightTool);
        
        $mainbox.append($mainboxboxHeader).append(this.$mainboxBody);//.append($boxFoot);

        divElem.append($mainbox);

        //console.log(`--------------- $boxBody.html()==${$boxBody.html()}`);
        this.boxcount++;
        var $box = $(`<div class="card mr-2 mb-1" boxnum="${this.boxcount}" style="width: 18rem;" >`);
        var $boxHeader = $('<div class="card-header custom-card-header">');
        var rand_0_7 = Math.floor(Math.random() * 8);
        $boxHeader.addClass(this.cardClassArr[rand_0_7]);
        var $headTitle = $('<h6 class="box-title">').append(this.keynameselValue);
        var $headRightTool = $('<div class="pull-right list-inline-item">');
        var $boxBody = $(`<div class="card-body p-2" style="overflow:auto" id="boxbody${this.boxcount}">`);
        var $boxFoot = $('<div class="card-footer small">');
        var $footRight = $('<div class="pull-right">');

        var $btn = $(`<button class="btn btn-light btn-xs" id="preview-btn" type="button">추가</button>`);
        $btn.bind("click", { type: 'keyvalueadd', self: this, info: this.selectedNameInfo, arg: arg }, this.eventHandler);
        $headRightTool.append($btn);
        $boxFoot.append($footRight);

        $boxHeader.append($headTitle).append($headRightTool);

        $box.append($boxHeader).append($boxBody);//.append($boxFoot);
        this.$mainboxBody.append($box);

        var returnInfo = null;
        var cnt = 0;
        //var $listView = $('<div>');
        var $list = $('<div class="list-group" role="tablist">');
        var $listItem = null, $treeItemIn = null;
        //$listView.append($list);
        $boxBody.append($list);

        if (arrarr && arrarr.length >= 0) {
            console.log(`--------------- arrarr.length==${arrarr.length}`);
            for (var i = 0; i < arrarr.length; i++) {
                cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var naming = 'naming' + cnt;
                //console.log(`--------------- info.did==${info.did}`);
                if (info.did == -7)
                    continue;

                var arr = arrarr[i].arr;
                var subject;
                $listItem = $('<div class="list-group-item list-group-item-action" data-toggle="list" role="tab">');
                var $item_box = $('<div class="d-flex w-100 justify-content-between">');
                $listItem.append($item_box);
                var $img = null;
                var value = __keyvalueSplitString(info.value);
                console.log(info.path);
                if (value && value.image) {
                    //value.image = value.image.replace('//', '/');
                    $img = $(`<img src="${value.image}" onerror="onImgError(this);" width="50" height="50" imgtype="carousel">`);

                } else if (value && value.icon) {
                    //value.image = value.image.replace('//', '/');
                    $(`<i class="${value.icon}"></i>`);
                } else
                    $img = $(`<img src="..." onerror="onImgError(this);" width="50" height="50" imgtype="carousel">`);

                if (value && value.subject) {
                    subject = value.subject;
                }

                var $boxBody = $('<div class="media-body flex-fill">');
                var $bodyHead = $('<div class="body-head list-inline">');

                var $bodySubject = $('<h5 class="list-inline-item">').append(info.key);
                $bodyHead.append($bodySubject);
                $boxBody.append($bodyHead);
                console.log('info.fid=' + info.fid);
                if (subject) {
                    var $headappend = $('<div class="">').append(subject);
                    $boxBody.append($headappend);
                }
                if (info.headappend) {
                    var $headappend = $('<div class="list-inline-item pull-right">').append('headappend' + info.headappend);
                    $bodyHead.append($headappend);
                }

                
                
                var btn3 = $(`<button type="button" class="btn" title="아이템삭제" ><i class="fa fa-fw fa-trash-o"></i></button>`);
                btn3.bind("click", { type: 'keyvaluedel', self: this, info: info, arg: arg }, this.eventHandler);
                btn3.attr('style', 'cursor:pointer;cursor: hand;');
                $item_box.append($img).append($boxBody).append(btn3);

                $listItem.bind("click", { type: 'itemclick', self: this, info: info, arg: arg }, this.eventHandler);
                $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                $list.append($listItem);
                
                returnInfo = info;
            }
        }
        //console.log(`--------------- $mainbox.html()==${$mainbox.parent().html()}`);
        return $list;
    }

    createViewbody(info, arg, eventHandler) {
        console.log(`createBoardViewBody(info2, arg, eventHandler) arg.self = ${arg.self} = info== ${info}`);
        var $tempBox = $('<div>');
        var divElem;
        var divElem2;
        if (arg.renderinfo.viewbodytype == 'h') {

            $tempBox.addClass("row");
            divElem = $(`<div>`).addClass(`col-md-4`);
            divElem2 = $(`<div>`).addClass(`col-md-8`);
            $tempBox.append(divElem).append(divElem2);

        } else {
            divElem = $(`<div>`);
            divElem2 = $(`<div>`);
            $tempBox.append(divElem).append(divElem2);

        }

        var $boardalert = $('<div class="alert alert-dark" role="alert">').text('뷰');
        divElem.append($boardalert);

        if (arg.viewelem) {
            $(arg.viewelem).empty();
            $(arg.viewelem).append($tempBox);
        } else {
            $(arg.elem).empty();
            $(arg.elem).append($tempBox);
        }

        return $tempBox;
    }
}

class ZTreeView extends ViewBase {
    constructor() {
        super();

        this.setting = {
            data: {
                key: {
                    title: "t"
                },
                simpleData: {
                    enable: true
                }
            },
            callback: {
                //beforeClick: beforeClick,
                onClick: this.onClick
            }
        };
    }

    eventHandler(e) {
        //e.preventDefault();
        //e.stopPropagation();
        console.log('self=', self);
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;
        console.log('self=', self);
        if (type == 'keyvalueadd') {
            __modal.show('키추가', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.kname.value = arg.kname;
            form.fid.value = arg.renderinfo.knamefid;
            form.type.value = 'add';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'keyvaluesubadd') {
            __modal.show('서브키추가', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            info = window.selectNode;
            
            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.uid;
            form.type.value = 'subadd';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            console.log(`form.fid.value==${form.fid.value} `);
        } else if (type == 'keyvaluemodify') {
            __modal.show('수정', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            info = self.selectNode;
            var value = __keyvalueSplitString(info.value);
            if (value.itemtype) {
                $(`input:radio[name=itemTypeRadio]:radio[value=${value.itemtype}]`).attr("checked", true);
            }
            if (value.link) {
                $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);
                form.value.value = value.link;
            } else if (value.board) {
                $('input:radio[name=linkTypeRadio]:radio[value=board]').attr("checked", true);
                form.value.value = value.board;
            } else if (value.self) {
                $('input:radio[name=linkTypeRadio]:radio[value=self]').attr("checked", true);
                form.value.value = value.self;
            }
            if (value.subject) {
                form.subject.value = value.subject;
            }
            if (value.image) {
                form.image.value = value.image;
            }
            if (value.icon) {
                form.icon.value = value.icon;
            }
            if (value.value) {
                form.value.value = value.value;
            }
            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.uid;
            form.key.value = info.key;
            form.info.value = info.info;
            form.type.value = 'update';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'keyvalueaddSubmit') {

            var form = document.getElementById("keyvalueForm");

            var value = '';
            console.log('type=', type);
            var rval = $("input[name='linkTypeRadio']:checked").val();
            console.log('type=', type);
            var rval = $("input[name='linkTypeRadio']:checked").val();
            if (rval == 'link') {
                value = value + `&link=${form.value.value}`;
            } else if (rval == 'board') {
                value = value + `&board=${form.value.value}`;
            } else if (rval == 'self') {
                value = value + `self=${form.value.value}`;
            } else if (rval == 'link') {

            }
            if (form.icon.value)
                value = value + '&icon=' + form.icon.value;
            if (form.subject.value)
                value = value + '&subject=' + form.subject.value;

            form.value.value = value;

            console.log("$(#keynamesel option: selected)=", $("#keynamesel option:selected"));
            console.log("form.fid.value=", form.type.value);
            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            arg.path = str;
            arg.type = 'keyvalue';
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;

            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            //console.log("form.subject.value=======" + form.subject.value);
            //var b64 = Base64.encode(form.info.value);
            //formData = self.selectedLenderCon.changeSerialize(formData, 'info', b64);
            arg.formData = formData;

            arg.form = form;
            arg.self.postAjax(arg);
        } else if (type == 'keyvaluedel') {

            if (!self.selectNode)
                return alert('노드를 설택해야됩니다');

            info = self.selectNode;
            if (!confirm(`${info.key} 키 설정을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var str = `/mankeyvalue.adm?dbpath=${arg.dbpath}&kcode=${info.kcode}&kname=${info.kname}&utf8=ok&`;
            console.log(str);
            //var arg2 = { path: str, type: "keyvalue", dbpath: arg.dbpath, elem: arg.elem, self: arg.self };
            var form = document.getElementById("keyvalueDeleteForm");
            if (form == null) {
                $('body').append(self.createKeyvalueDeleteForm());
                form = document.getElementById("keyvalueDeleteForm");
            }

            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.key.value = info.key;
            form.uid.value = info.uid;
            form.fid.value = info.uid;
            form.did.value = info.uid;
            form.type.value = 'del';
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.self.postAjax(arg);
        } else if (type == "nameadd") {
            __modal.show('식별자이름추가', self.makeNameForm());

            var form = document.getElementById("nameSetForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.uid.value = $("#keynamesel option:selected").attr('uid');
            form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.did.value = $("#keynamesel option:selected").attr('did');
            console.log(`form.fid.value==${form.fid.value} `);

            $('#nameaddBtn').bind("click", { type: 'nameaddSubmit', self: self, arg: arg }, self.eventHandler);
        } else if (type == "nameaddSubmit") {
            var form = document.getElementById("nameSetForm");

            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            //arg.path = str;
            console.log('form.kcode.value*******=' + form.kcode.value);
            arg.kcode = form.kcode.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.path = str;
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            arg.self.postAjax(arg);
            __modal.hide();
        } else if (type == 'record') {

            //onClick event 에서처리
        } else if (type == 'return') {
            console.log('arg.type=', arg.type, ' type=', type, ' arg.filter=', arg.filter);
            arg.renderinfo.$parent.getReturnValue('keyvalue', arg.dbpath, arg.kcode, arg.kname);
        }
    }

    makeNameForm() {
        var m = `<form class="form-horizontal" name="nameSetForm" id="nameSetForm">
                                                    <input type="hidden" name="dbpath" />
                                                    <input type="hidden" name="type" value="nameadd" />
                                                    <input type="hidden" name="uid" />
                                                    <input type="hidden" name="fid" />
                                                    <input type="hidden" name="did" />

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">그룹:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="_ztree" readonly/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">식별자이름:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" placeholder="식별자이름이름..." required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">설명:</label>
                                                            <div>
                                                                <textarea type="text" class="form-control" name="info" placeholder="설명..." required></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                           <input type="button" id="nameaddBtn"  class="btn btn-warning btn-send" value="전송">
                                                            <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                </form>`;
        return m;
    }

    createKeyvalueDeleteForm() {
        var m = `<form id="keyvalueDeleteForm" name="keyvalueDeleteForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                <input type="hidden" name="type"/>
                                <input type="hidden" name="dbpath" />
                                <input type="hidden" name="kcode" />
                                <input type="hidden" name="kname" />
                                <input type="hidden" name="key" />
                                <input type="hidden" name="uid" />
                                <input type="hidden" name="fid" />
                                <input type="hidden" name="did" />

                            </form>`;
        return m;
    }

    createKeyvalueForm() {
        var m = `<form id="keyvalueForm" name="keyvalueForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                            <input type="hidden" name="type" value="add" />
                                            <input type="hidden" name="dbpath" />
                                            <input type="hidden" name="uid" />
                                            <input type="hidden" name="fid" />
                                            <input type="hidden" name="did" />

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">그룹</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="" readonly/>
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">식별자</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" readonly />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label class="control-label" for="inputSuccess1">아이콘</label>
                                                            <div>
                                                                <input id="iconchange_input" type="text" class="form-control" name="icon" value="" placeholder="아이콘....." required />
                                                                
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="empcode" class="control-label">키</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="key" placeholder="키..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">소제목</label>
                                                            <div>
                                                                <input class="form-control" name="subject" placeholder="소제목..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="permittype" class="control-label">링크타입</label>
                                                        <div class="clearfix"></div>
                                                        <div class="form-check form-check-inline ">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="link">
                                                            <label class="form-check-label" for="inlineCheckbox1">링크</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="board">
                                                            <label class="form-check-label" for="inlineCheckbox1">게시판</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="self">
                                                            <label class="form-check-label" for="inlineCheckbox1">셀프</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">링크내용</label>
                                                            <div>
                                                                <input class="form-control" name="value" placeholder="링크내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">정보</label>
                                                            <div>
                                                                <textarea class="form-control" name="info" placeholder="내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group text-right">
                                                            <input type="reset" class="btn btn-secondary" data-dismiss="modal" value="리 셋">
                                                            <input type="button" id="keyvalueaddBtn" class="btn btn-primary" value="전 송">
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                        </form>`;
        return m;
    }

    beforeClick(treeId, treeNode, clickFlag) {
        //className = (className === "dark" ? "" : "dark");
        //showLog("[ " + getTime() + " beforeClick ]&nbsp;&nbsp;" + treeNode.name);
        return (treeNode.click != false);
    }
    onClick(event, treeId, treeNode, clickFlag) {
        window.selectNode = treeNode;
        $('#selectNode').val(treeNode.key);

        var value = __keyvalueSplitString(treeNode.value);

        if (value.link) {
            if (value.link.startsWith('http'))
                location.href = value.link;
            else
                location.href = 'http://' + value.link;
        } else if (value.board) {
            var div = document.createElement('div');
            var p = __boardConfigSplitString(value.board);
            if (p && p.type != 'content') {
                var c = new BoardController(p);
                c.renderController(div);
            } else {
                div.innerHTML = info.info;
            }
            var f = new FullScreenView();
            f.setContent(`보기`, div);
        } else if (value.self) {
            var div = document.createElement('div');
            var p = __boardConfigSplitString(value.self);
            console.log('event.target***=' + event.target);
            console.log('this.arg=' + this.arg);
            if (p && p.type != 'content') {
                var c = new BoardController(p);
                c.renderController(div);
            } else {
                div.innerHTML = treeNode.info;
            }

            if (window.arg.viewelem) {
                $(window.arg.viewelem).empty();
                $(window.arg.viewelem).append(div);
            } else {
                $(window.arg.elem).empty();
                $(window.arg.elem).append(div);
            }
        } else if (value.link) {

        }
        //console.log("[ onClick ]treeNode.key = " + treeNode.key + " (" + (clickFlag === 1 ? "single selected" : (clickFlag === 0 ? "<b>cancel selected</b>" : "<b>multi selected</b>")) + ")");
    }

    arrZTree (ztreeData, arr) {

        for (var i = 0; i < arr.length; i++) {
            var info = arr[i];
            var zinfo = {};

            zinfo.uid = zinfo.id = info.uid;
            if (info.did < 0)
                zinfo.pId = 0;
            else
                zinfo.pId = info.did;
            zinfo.fid = info.fid; zinfo.did = info.did; zinfo.key = zinfo.name = info.key; zinfo.value = info.value;
            zinfo.kcode = info.kcode; zinfo.kname = info.kname; zinfo.date = info.date; zinfo.info = info.info;
            ztreeData.push(zinfo);
            //console.log('arrZTree zinfo.id=' + zinfo.id + 'zinfo.pId=' + zinfo.pId);
            var arr2 = arr[i].arr;
            if (arr2.length > 0) {

                this.arrZTree(ztreeData, arr2);
            } else if (zinfo.value == '@f@') {
                //console.log('value in' + info.value);
                var temp = {};
                temp.name = '������';
                temp.pId = zinfo.id;
                ztreeData.push(temp);
            }
        }

    }

    createList(info2, arg, eventHandler) {
        //console.log(`this=`, this);
        var self = this;
        var info = info2;
        window.arg = arg;
        this.keycodeselValue = arg.kcode;
        this.keynameselValue = arg.kname;
        this.rendertypeselValue = arg.rendertype;
        if (info == null || info == undefined)
            info = {};

        var keycodearr = info.keycodearr;
        var keynamearr = info.keynamearr;
        var arrarr = info.arrarr;

        var ztreeData = [];
        //console.log('arrarr.length=' + arrarr.length );
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var zinfo = {};

                if (info.did == -7)
                    continue;

                zinfo.uid = zinfo.id = info.uid;
                if (info.did < 0)
                    zinfo.pId = 0;
                else
                    zinfo.pId = info.did;
                //console.log('value' + info.value);
                zinfo.fid = info.fid; zinfo.did = info.did; zinfo.key = zinfo.name = info.key; zinfo.value = info.value;
                zinfo.kcode = info.kcode; zinfo.kname = info.kname; zinfo.date = info.date; zinfo.info = info.info;
                zinfo.subcount = info.subcount;
                console.log('createZTree zinfo.id=' + zinfo.id + 'zinfo.pId=' + zinfo.pId + 'zinfo.name=' + zinfo.name);
                var arr = arrarr[i].arr;
                if (arr.length > 0) {
                    ztreeData.push(zinfo);
                    if (zinfo.value == "@f@") {
                        var temp = {};
                        temp.name = '������';
                        temp.pId = zinfo.id;
                        ztreeData.push(temp);
                    }
                    this.arrZTree(ztreeData, arr);
                } else if (zinfo.subcount != -2) {
                    //console.log('zinfo.subcount' + zinfo.subcount);
                    ztreeData.push(zinfo);
                    if (zinfo.value == "@f@") {
                        var temp = {};
                        temp.name = '������';
                        temp.pId = zinfo.id;
                        ztreeData.push(temp);
                    }
                }
            }
        }

        //$(arg.elem).addClass('ztree');
        //$.fn.zTree.init($(arg.elem), this.setting, ztreeData);

        if (arg.renderinfo.rendertype == 'self') {
            var $temp = $(`<div>`).addClass("row");
            var divElem = $(`<div>`).addClass(`col-md-4`);
            var divElem2 = $(`<div>`).addClass(`col-md-8`);
            $temp.append(divElem).append(divElem2);

            arg.viewelem = divElem2;

            divElem.addClass('ztree');
            $.fn.zTree.init(divElem, this.setting, ztreeData);

            $(arg.elem).empty();
            $(arg.elem).append($temp);
            console.log("arg.renderinfo.rendertype===" + arg.renderinfo.rendertype);
        } else {
            $(arg.elem).addClass('ztree');
            $.fn.zTree.init($(arg.elem), this.setting, ztreeData);
        }


        if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
            var $divE = $('<div class="form-inline">');
            var $label = $('<label class="selected-node-group">선택한노드:</label>');
            var $inputE = $(`<input type="text" class="form - control" name="selectNode" id="selectNode" placeholder="..." required />`);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("서브아이템추가");
            $buttonE.bind("click", { type: 'keyvaluesubadd', self: this, info: this.selectNode, arg: arg }, this.eventHandler);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("삭제");
            $buttonE2.bind("click", { type: 'keyvaluedel', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("수정");
            $buttonE2.bind("click", { type: 'keyvaluemodify', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);

            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("아이템추가");
            $buttonE.bind("click", { type: 'keyvalueadd', self: this, info: info, arg: arg }, this.eventHandler);
            var $writeDiv = $('<div>');
            $($writeDiv).append($buttonE);
            $(arg.elem).append($writeDiv);

            //this.setKeyvalueEditContextMenu('.keyvalue_context_menu');
        }

        if (arg.renderinfo && arg.renderinfo.returntype === "return") {
            var $divE = $('<div class="alert alert-dark mr-1">');

            var $label = $('<label class="selected-node-group mr-2">식별자선택:</label>');

            var keynamesel = document.createElement('select');
            keynamesel.setAttribute('id', "keynamesel");
            $(keynamesel).empty();
            $(keynamesel).append(`<option value=' '>메뉴선택</option>`);
            for (var i = 0; i < keynamearr.length; i++) {
                //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
                $(keynamesel).append(`<option value='${keynamearr[i].kname}' uid='${keynamearr[i].uid}' fid='${keynamearr[i].fid}' did='${keynamearr[i].did}'>${keynamearr[i].kname}</option>`);
                //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
            }
            //console.log(`this.keynameselValue=${this.keynameselValue}`);
            if (this.keynameselValue) {
                $(keynamesel).val(this.keynameselValue).prop("selected", true);
            } else {
                this.keynameselValue = $(keynamesel).val();
            }

            $divE.append($label).append(keynamesel);

            $(document).off("change", "#keynamesel", null);
            $(document).on("change", "#keynamesel", function () {

                console.log("$(this).val()====" + $(this).val());
                arg.renderinfo.kname = $(this).val();
                arg.renderinfo.knamefid = $("#keynamesel option:selected").attr("fid");
                arg.self.setController(arg.renderinfo, arg.elem)
                //self.selectedLenderCon.setController(self._dbpath, self._kcode, self._keynameselValue, elem);
            });

            var $buttonE = $("<button type='button' class='btn btn-info mr-2'>이름추가</button>");
            $buttonE.bind("click", { type: "nameadd", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            var $buttonE = $("<button type='button' class='btn btn-info mr-2'>리턴</button>");
            $buttonE.bind("click", { type: "return", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            $(arg.elem).append($divE);
        }

        return ztreeData;
    }
}

class DynamicTreeview extends ViewBase {
    constructor() {
        super();
        //DynamicTreeview
        let treeview = {
            resetBtnToggle: function () {
                $(".js-treeview")
                    .find(".level-add")
                    .find("span")
                    .removeClass()
                    .addClass("fa fa-plus");
                $(".js-treeview")
                    .find(".level-add")
                    .siblings()
                    .removeClass("in");
            },
            addSameLevel: function (target) {

                var t = target.parent().parent().find('.level-title');
                console.log('addSameLevel treeview t.attr(uid)' + t.attr('uid'));

                let ulElm = target.closest("ul");
                let sameLevelCodeASCII = target
                    .closest("[data-level]")
                    .attr("data-level")
                    .charCodeAt(0);
                ulElm.append($("#levelMarkup").html());
                ulElm
                    .children("li:last-child")
                    .find("[data-level]")
                    .attr("data-level", String.fromCharCode(sameLevelCodeASCII));
            },
            addSubLevel: function (target) {
                var t = target.parent().parent().find('.level-title');
                console.log('addSubLevel treeview t.attr(fid)' + t.attr('fid'));

                let liElm = target.closest("li");
                let nextLevelCodeASCII = liElm.find("[data-level]").attr("data-level").charCodeAt(0) + 1;
                liElm.children("ul").append($("#levelMarkup").html());
                liElm.children("ul").find("[data-level]")
                    .attr("data-level", String.fromCharCode(nextLevelCodeASCII));
            },
            removeLevel: function (target) {
                var t = target.parent().parent().find('.level-title');
                console.log('removeLevel treeview t.attr(did)' + t.attr('did'));

                target.closest("li").remove();

            }
        };

        // Treeview Functions
        $(document).on("click", ".js-treeview .level-add", function () {
            console.log('script.js .level-add 55');
            $(this).find("span").toggleClass("fa-plus").toggleClass("fa-times text-danger");
            $(this).siblings().toggleClass("in");
        });

        // Add same level
        $(document).on("click", ".js-treeview .level-same", function () {
            console.log('script.js .level-same 55');
            treeview.addSameLevel($(this));
            treeview.resetBtnToggle();
        });

        // Add sub level
        $(document).on("click", ".js-treeview .level-sub", function () {
            console.log('script.js .level-sub 55');
            treeview.addSubLevel($(this));
            treeview.resetBtnToggle();
        });
        // Remove Level
        $(document).on("click", ".js-treeview .level-remove", function () {
            console.log('script.js .level-remove');
            treeview.removeLevel($(this));
        });
        /***
        $(document).on("click", ".js-treeview .treeview__level", function (e) {
            console.log('script.js .treeview__level');
            e.preventDefault();
            treeview.removeLevel($(this));
        });***/
        // Selected Level
        $(document).on("click", ".js-treeview .level-title", function (e) {
            //e.stopPropagation();
            console.log('script.js .level-title 22255');

            let isSelected = $(this).closest("[data-level]").hasClass("selected");
            !isSelected && $(this).closest(".js-treeview").find("[data-level]").removeClass("selected");
            $(this).closest("[data-level]").toggleClass("selected");
        });
    }

    eventHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;
        console.log('type=', type);
        if (type == 'keyvalueadd') {
            __modal.show('키추가', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.fid.value = arg.renderinfo.knamefid;
            form.type.value = 'add';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'keyvaluesubadd') {
            __modal.show('서브키추가', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.did;
            form.type.value = 'subadd';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'keyvaluemodify') {
            __modal.show('수정', self.createKeyvalueForm());
            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.uid;
            form.did.value = info.uid;
            form.key.value = info.key;
            form.value.value = info.value;
            form.info.value = info.info;
            form.type.value = 'update';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'keyvalueaddSubmit') {

            var form = document.getElementById("keyvalueForm");

            var value = '';
            var rval = $("input[name='linkTypeRadio']:checked").val();
            if (rval == 'link') {
                value = value + `&link=${form.value.value}`;
            } else if (rval == 'board') {
                value = value + `&board=${form.value.value}`;
            } else if (rval == 'self') {
                value = value + `self=${form.value.value}`;
            } else if (rval == 'link') {

            }
            if (form.icon.value)
                value = value + '&icon=' + form.icon.value;
            if (form.image.value)
                value = value + '&image=' + form.image.value;
            if (form.subject.value)
                value = value + '&subject=' + form.subject.value;

            form.value.value = value;
            console.log("value=", value);
            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            arg.path = str;
            arg.type = 'keyvalue';
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            //console.log("form.subject.value=======" + form.subject.value);
            //var b64 = Base64.encode(form.info.value);
            //formData = self.selectedLenderCon.changeSerialize(formData, 'info', b64);
            arg.formData = formData;

            arg.form = form;
            arg.self.postAjax(arg);
        } else if (type == 'keyvaluedel') {

            if (!confirm(`${info.key} 키 설정을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var str = `/mankeyvalue.adm?dbpath=${arg.dbpath}&kcode=${info.kcode}&kname=${info.kname}&utf8=ok&`;
            console.log(str);
            //var arg2 = { path: str, type: "keyvalue", dbpath: arg.dbpath, elem: arg.elem, self: arg.self };
            var form = document.getElementById("keyvalueDeleteForm");
            if (form == null) {
                $('body').append(self.createKeyvalueDeleteForm());
                form = document.getElementById("keyvalueDeleteForm");
            }

            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.key.value = info.key;
            form.uid.value = info.uid;
            form.fid.value = info.uid;
            form.did.value = info.uid;
            form.type.value = 'del';
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.self.postAjax(arg);
        } else if (type == "nameadd") {
            __modal.show('식별자이름추가', self.makeNameForm());

            var form = document.getElementById("nameSetForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.uid.value = $("#keynamesel option:selected").attr('uid');
            form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.did.value = $("#keynamesel option:selected").attr('did');
            console.log(`form.fid.value==${form.fid.value} `);

            $('#nameaddBtn').bind("click", { type: 'nameaddSubmit', self: self, arg: arg }, self.eventHandler);
        } else if (type == "nameaddSubmit") {
            var form = document.getElementById("nameSetForm");

            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            //arg.path = str;
            console.log('form.kcode.value*******=' + form.kcode.value);
            arg.kcode = form.kcode.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.path = str;
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            arg.self.postAjax(arg);
            __modal.hide();
        } else if (type == 'record') {

            var value = __keyvalueSplitString(info.value);

            if (value.link) {
                if (value.link.startsWith('http'))
                    location.href = value.link;
                else
                    location.href = 'http://' + value.link;
            } else if (value.board) {
                var div = document.createElement('div');
                var p = __boardConfigSplitString(value.board);
                if (p && p.type != 'content') {
                    var c = new BoardController(p);
                    c.renderController(div);
                } else {
                    div.innerHTML = info.info;
                }
                var f = new FullScreenView();
                f.setContent(`보기`, div);
            } else if (value.self) {
                var div = document.createElement('div');
                var p = __boardConfigSplitString(value.self);
                console.log('value.self***=' + value.self);
                console.log('p.type***=' + p.type);
                if (p && p.type != 'content') {
                    var c = new BoardController(p);
                    c.renderController(div);
                } else {
                    div.innerHTML = info.info;
                }

                if (arg.viewelem) {
                    $(arg.viewelem).empty();
                    $(arg.viewelem).append(div);
                } else {
                    $(arg.elem).empty();
                    $(arg.elem).append(div);
                }
            } else if (value.link) {

            }
        } else if (type == 'return') {
            console.log('arg.type=', arg.type, ' type=', type, ' arg.filter=', arg.filter);
            arg.renderinfo.$parent.getReturnValue('keyvalue', arg.dbpath, arg.kcode, arg.kname);
        }
    }

    makeNameForm() {
        var m = `<form class="form-horizontal" name="nameSetForm" id="nameSetForm">
                                                    <input type="hidden" name="dbpath" />
                                                    <input type="hidden" name="type" value="nameadd" />
                                                    <input type="hidden" name="uid" />
                                                    <input type="hidden" name="fid" />
                                                    <input type="hidden" name="did" />

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">그룹:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="_dynamictree" readonly/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">식별자이름:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" placeholder="식별자이름이름..." required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">설명:</label>
                                                            <div>
                                                                <textarea type="text" class="form-control" name="info" placeholder="설명..." required></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                           <input type="button" id="nameaddBtn"  class="btn btn-warning btn-send" value="전송">
                                                            <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                </form>`;
        return m;
    }

    createKeyvalueDeleteForm() {
        var m = `<form id="keyvalueDeleteForm" name="keyvalueDeleteForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                <input type="hidden" name="type"/>
                                <input type="hidden" name="dbpath" />
                                <input type="hidden" name="kcode" />
                                <input type="hidden" name="kname" />
                                <input type="hidden" name="key" />
                                <input type="hidden" name="uid" />
                                <input type="hidden" name="fid" />
                                <input type="hidden" name="did" />

                            </form>`;
        return m;
    }

    createKeyvalueForm() {
        var m = `<form id="keyvalueForm" name="keyvalueForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                            <input type="hidden" name="type" value="add" />
                                            <input type="hidden" name="dbpath" />
                                            <input type="hidden" name="uid" />
                                            <input type="hidden" name="fid" />
                                            <input type="hidden" name="did" />

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">그룹</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="" readonly/>
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">식별자</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" readonly />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label class="control-label" for="inputSuccess1">아이콘</label>
                                                            <div>
                                                                <input id="iconchange_input" type="text" class="form-control" name="icon" value="" placeholder="아이콘....." required />
                                                                <a onclick="JavaScript: openNewWindow('/html/edit/selectIcon.html?target=iconchange&1234')" data-toggle="modal" type="button" class="btn btn-primary">아이콘</a>
                                                                <a id="iconchange"></a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label class="control-label" for="inputSuccess1">이미지</label>
                                                            <div>
                                                                <input id="imagechange_input" type="text" class="form-control" name="image" value="" placeholder="이미지....." required />
                                                                <a onclick="JavaScript: openNewWindow('/html/edit/selectFile.html?target=iconchange&1234')" data-toggle="modal" type="button" class="btn btn-primary">이미지</a>
                                                                <a id="iconchange"></a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="empcode" class="control-label">키</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="key" placeholder="키..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">소제목</label>
                                                            <div>
                                                                <input class="form-control" name="subject" placeholder="소제목..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="permittype" class="control-label">링크타입</label>
                                                        <div class="clearfix"></div>
                                                        <div class="form-check form-check-inline ">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="link">
                                                            <label class="form-check-label" for="inlineCheckbox1">링크</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="board">
                                                            <label class="form-check-label" for="inlineCheckbox1">게시판</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="self">
                                                            <label class="form-check-label" for="inlineCheckbox1">셀프</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">링크내용</label>
                                                            <div>
                                                                <input class="form-control" name="value" placeholder="링크내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">정보</label>
                                                            <div>
                                                                <textarea class="form-control" name="info" placeholder="내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group text-right">
                                                            <input type="reset" class="btn btn-secondary" data-dismiss="modal" value="리 셋">
                                                            <input type="button" id="keyvalueaddBtn" class="btn btn-primary" value="전 송">
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                        </form>`;
        return m;
    }
    arrDynamicTreeview = function ($parent, arr) {
        var $treeDropdown = $('<ul>');
        for (var i = 0; i < arr.length; i++) {
            var info = arr[i];
            var arr2 = arr[i].arr;

            if (arr2.length > 0) {
                var $treeItem = $('<li>');
                var $treeLevel = $('<div class="treeview__level">').attr("data-level", 1).appendTo($treeItem);
                var $treeTitle = $('<span class="level-title">').text(info.key).appendTo($treeLevel);
                $treeTitle.attr('value', info.value).attr('date', info.date).attr('uid', info.uid).attr('fid', info.fid).attr('did', info.did);
                $treeTitle.attr('kcode', info.kcode).attr('kname', info.kname).attr('info', info.info);
                var $treeButton = $('<div class="treeview__level-btns">').appendTo($treeLevel);
                var $btn = $('<div class="btn btn-default btn-sm level-add"><span class="fa fa-plus"></span></div>').appendTo($treeButton);
                $btn = $('<div class="btn btn-default btn-sm level-remove"><span class="fa fa-trash-o text-danger"></span></div>').appendTo($treeButton);
                $btn = $('<div class="btn btn-default btn-sm level-same"><span>Add Same Level</span></div>').appendTo($treeButton);
                $btn = $('<div class="btn btn-default btn-sm level-sub"><span>Add Sub Level</span></div>').appendTo($treeButton);

                $treeDropdown.append($treeItem);

                this.arrDynamicTreeview($treeItem, arr2);
            } else {

                var $treeItem = $('<li>');
                var $treeLevel = $('<div class="treeview__level">').attr("data-level", 1).appendTo($treeItem);
                var $treeTitle = $('<span class="level-title">').text(info.key).appendTo($treeLevel);
                $treeTitle.attr('value', info.value).attr('date', info.date).attr('uid', info.uid).attr('fid', info.fid).attr('did', info.did);
                $treeTitle.attr('kcode', info.kcode).attr('kname', info.kname).attr('info', info.info);
                var $treeButton = $('<div class="treeview__level-btns">').appendTo($treeLevel);
                var $btn = $('<div class="btn btn-default btn-sm level-add"><span class="fa fa-plus"></span></div>').appendTo($treeButton);
                $btn = $('<div class="btn btn-default btn-sm level-remove"><span class="fa fa-trash-o text-danger"></span></div>').appendTo($treeButton);
                $btn = $('<div class="btn btn-default btn-sm level-same"><span>Add Same Level</span></div>').appendTo($treeButton);
                $btn = $('<div class="btn btn-default btn-sm level-sub"><span>Add Sub Level</span></div>').appendTo($treeButton);
                $treeItem.append('<ul>');
                $treeDropdown.append($treeItem);
            }
        }
        $parent.append($treeDropdown);
    }

    createList(info2, arg, eventHandler) {
        var self = this;
        var info = info2;
        this.arg = arg;
        this.keycodeselValue = arg.kcode;
        this.keynameselValue = arg.kname;
        this.rendertypeselValue = arg.rendertype;
        if (info == null || info == undefined)
            info = {};

        var keycodearr = info.keycodearr;
        var keynamearr = info.keynamearr;
        var arrarr = info.arrarr;

        //alert('createDynamicTreeview');
        var $treeview = $('<div class="treeview js-treeview">');
        var $tree = $('<ul id="tree1">').appendTo($treeview);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                if (info.did == -7)
                    continue;

                if (arr.length > 0) {

                    var $treeItem = $('<li>');
                    var $treeLevel = $('<div class="treeview__level">').attr("data-level", 1).appendTo($treeItem);
                    var $treeTitle = $('<span class="level-title">').text(info.key).appendTo($treeLevel);
                    $treeTitle.attr('value', info.value).attr('date', info.date).attr('uid', info.uid).attr('fid', info.fid).attr('did', info.did);
                    $treeTitle.attr('kcode', info.kcode).attr('kname', info.kname).attr('info', info.info);
                    var $treeButton = $('<div class="treeview__level-btns">').appendTo($treeLevel);
                    var $btn = $('<div class="btn btn-default btn-sm level-add"><span class="fa fa-plus"></span></div>').appendTo($treeButton);
                    $btn = $('<div class="btn btn-default btn-sm level-remove"><span class="fa fa-trash-o text-danger"></span></div>').appendTo($treeButton);
                    $btn = $('<div class="btn btn-default btn-sm level-same"><span>Add Same Level</span></div>').appendTo($treeButton);
                    $btn = $('<div class="btn btn-default btn-sm level-sub"><span>Add Sub Level</span></div>').appendTo($treeButton);

                    $tree.append($treeItem);

                    this.arrDynamicTreeview($treeItem, arr);
                } else {
                    var $treeItem = $('<li>');
                    var $treeLevel = $('<div class="treeview__level">').attr("data-level", 1).appendTo($treeItem);
                    var $treeTitle = $('<span class="level-title">').text(info.key).appendTo($treeLevel);
                    $treeTitle.attr('value', info.value).attr('date', info.date).attr('uid', info.uid).attr('fid', info.fid).attr('did', info.did);
                    $treeTitle.attr('kcode', info.kcode).attr('kname', info.kname).attr('info', info.info);
                    var $treeButton = $('<div class="treeview__level-btns">').appendTo($treeLevel);
                    var $btn = $('<div class="btn btn-default btn-sm level-add"><span class="fa fa-plus"></span></div>').appendTo($treeButton);
                    $btn = $('<div class="btn btn-default btn-sm level-remove"><span class="fa fa-trash-o text-danger"></span></div>').appendTo($treeButton);
                    $btn = $('<div class="btn btn-default btn-sm level-same"><span>Add Same Level</span></div>').appendTo($treeButton);
                    $btn = $('<div class="btn btn-default btn-sm level-sub"><span>Add Sub Level</span></div>').appendTo($treeButton);
                    $treeItem.append('<ul>');
                    $tree.append($treeItem);

                }
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($treeview);

        if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
            var $divE = $('<div class="form-inline">');
            var $label = $('<label class="selected-node-group">선택한노드:</label>');
            var $inputE = $(`<input type="text" class="form - control" name="selectNode" id="selectNode" placeholder="..." required />`);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("서브아이템추가");
            $buttonE.bind("click", { type: 'keyvaluesubadd', self: this, info: this.selectNode, arg: arg }, this.eventHandler);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("삭제");
            $buttonE2.bind("click", { type: 'keyvaluedel', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("수정");
            $buttonE2.bind("click", { type: 'keyvaluemodify', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);

            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("아이템추가");
            $buttonE.bind("click", { type: 'keyvalueadd', self: this, info: info, arg: arg }, this.eventHandler);
            var $writeDiv = $('<div>');
            $($writeDiv).append($buttonE);
            $(arg.elem).append($writeDiv);

            //this.setKeyvalueEditContextMenu('.keyvalue_context_menu');
        }

        if (arg.renderinfo && arg.renderinfo.returntype === "return") {
            var $divE = $('<div class="alert alert-dark mr-1">');

            var $label = $('<label class="selected-node-group mr-2">식별자선택:</label>');

            var keynamesel = document.createElement('select');
            keynamesel.setAttribute('id', "keynamesel");
            $(keynamesel).empty();
            $(keynamesel).append(`<option value=' '>메뉴선택</option>`);
            for (var i = 0; i < keynamearr.length; i++) {
                //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
                $(keynamesel).append(`<option value='${keynamearr[i].kname}' uid='${keynamearr[i].uid}' fid='${keynamearr[i].fid}' did='${keynamearr[i].did}'>${keynamearr[i].kname}</option>`);
                //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
            }
            //console.log(`this.keynameselValue=${this.keynameselValue}`);
            if (this.keynameselValue) {
                $(keynamesel).val(this.keynameselValue).prop("selected", true);
            } else {
                this.keynameselValue = $(keynamesel).val();
            }

            $divE.append($label).append(keynamesel);

            $(document).off("change", "#keynamesel", null);
            $(document).on("change", "#keynamesel", function () {

                console.log("$(this).val()====" + $(this).val());
                arg.renderinfo.kname = $(this).val();
                arg.renderinfo.knamefid = $("#keynamesel option:selected").attr("fid");
                arg.self.setController(self.arg.renderinfo, self.arg.elem)
                //self.selectedLenderCon.setController(self._dbpath, self._kcode, self._keynameselValue, elem);
            });

            var $buttonE = $("<button type='button' class='btn btn-info mr-2'>이름추가</button>");
            $buttonE.bind("click", { type: "nameadd", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            var $buttonE = $("<button type='button' class='btn btn-info mr-2'>리턴</button>");
            $buttonE.bind("click", { type: "return", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            $(arg.elem).append($divE);
        }

        return $treeview;
    }
}

class OrgChartTreeView extends ViewBase {
    constructor() {
        super();

        self = this;
        this.selectNode = null;
    }

    getReturnValue() {
        var type, value;
        var arg = Array.prototype.slice.call(arguments);
        if (arg && arg[0])
            type = arg[0];
        else
            return;
        if (arg && arg[1])
            value = arg[1];
        console.log(`getReturnValue type==${type}`);
        //_tempCount++;
        var info = {};
        if (type == 'icon' || type == 'image') {
            var form = document.getElementById("keyvalueForm");
            console.log('form^********************************=' + form);
            //form.path.value = 'image=' + value;
            form.imageinput.value = value;
            $('#btnimg').attr('src', value);
            //$('#iconchange_input').val(type + ':' + value);
            __modal.hide();
        } else if (type == 'audio') {
            $('#playerA').attr('src', value);
            var player = document.getElementById('playerA');
            player.play();
            __modal.hide();
        } else if (type == 'video') {
            $('#playerV').attr('src', value);
            var player = document.getElementById('playerV');
            player.play();
            __modal.hide();
            //console.log(value);
        }
    }

    eventHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        //var self = e.data.self;
        console.log('info=', info);
        console.log('type=', type);
        if (type == 'keyvalueadd') {
            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`보기`, self.createKeyvalueForm());

            //__modal.show('키추가', self.createKeyvalueForm());

            $('#ImgselBtn').bind("click", { type: 'imgselBtn', self: self, info: info, arg: arg }, self.eventHandler);

            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            console.log(`form.imageinput.value==${form.imageinput.value}`);
            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.kname.value = arg.kname;
            form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.type.value = 'add';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
        } else if (type == 'keyvaluesubadd') {
            //__modal.show('서브키추가', self.createKeyvalueForm());

            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`보기`, self.createKeyvalueForm());
            $('#ImgselBtn').bind("click", { type: 'imgselBtn', self: self, info: info, arg: arg }, self.eventHandler);

            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            info = self.selectNode;

            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.did;
            form.type.value = 'subadd';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            console.log(`form.uid.value==${form.uid.value} `);
            console.log(`form.uid.value==${form.fid.value} `);
            console.log(`form.uid.value==${form.did.value} `);
        } else if (type == 'keyvaluemodify') {
            //__modal.show('수정', self.createKeyvalueForm());

            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`수정`, self.createKeyvalueForm());
            $('#ImgselBtn').bind("click", { type: 'imgselBtn', self: self, info: info, arg: arg }, self.eventHandler);


            $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);

            var form = document.getElementById("keyvalueForm");
            info = self.selectNode;

            var value = __keyvalueSplitString(info.value);
            if (value.itemtype) {
                $(`input:radio[name=itemTypeRadio]:radio[value=${value.itemtype}]`).attr("checked", true);
            }
            if (value.link) {
                $('input:radio[name=linkTypeRadio]:radio[value=link]').attr("checked", true);
                form.value.value = value.link;
            } else if (value.board) {
                $('input:radio[name=linkTypeRadio]:radio[value=board]').attr("checked", true);
                form.value.value = value.board;
            } else if (value.self) {
                $('input:radio[name=linkTypeRadio]:radio[value=self]').attr("checked", true);
                form.value.value = value.self;
            }
            if (value.subject) {
                form.subject.value = value.subject;
            }
            if (value.image) {
                form.imageinput.value = value.image;
            }
            if (value.icon) {
                form.icon.value = value.icon;
            }
            if (value.value) {
                form.value.value = value.value;
            }
            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.uid.value = info.uid;
            form.fid.value = info.fid;
            form.did.value = info.uid;
            form.key.value = info.key;
            form.info.value = info.info;
            form.type.value = 'update';
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'imgselBtn') {
            var targetChild = e.target.querySelector('#btnimg');
            var c = new FileController({ type: 'filelist', code: 'root', filetype: 'file', path: '/files/media/images/icons/', filter: 'image', returntype: 'return', $parent: self });
            var elem = document.createElement('div');
            c.renderController(elem);
            __modal.show(`보기`, elem);

        } else if (type == 'keyvalueaddSubmit') {

            var form = document.getElementById("keyvalueForm");

            var value = '';
            console.log('type=', type);
            var rval = $("input[name='linkTypeRadio']:checked").val();
            console.log('type=', type);
            if (rval == 'link') {
                value = value + `&link=${form.value.value}`;
            } else if (rval == 'board') {
                value = value + `&board=${form.value.value}`;
            } else if (rval == 'self') {
                value = value + `self=${form.value.value}`;
            } else if (rval == 'link') {

            }
            if (form.icon.value)
                value = value + '&icon=' + form.icon.value;
            if (form.imageinput.value)
                value = value + '&image=' + form.imageinput.value;
            if (form.subject.value)
                value = value + '&subject=' + form.subject.value;

            form.value.value = value;
            
            console.log("$(#keynamesel option: selected)=", $("#keynamesel option:selected"));
            console.log("form.fid.value=", form.type.value);
            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            arg.path = str;
            arg.type = 'keyvalue';
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            //console.log("form.subject.value=======" + form.subject.value);
            //var b64 = Base64.encode(form.info.value);
            //formData = self.selectedLenderCon.changeSerialize(formData, 'info', b64);
            arg.formData = formData;

            arg.form = form;
            arg.self.postAjax(arg);

            if (window._fullscreen) {
                window._fullscreen.offscreen();
                window._fullscreen = null;
            }
        } else if (type == 'keyvaluedel') {

            if (!self.selectNode)
                return alert('노드를 설택해야됩니다');

            info = self.selectNode;
            if (!confirm(`${info.key} 키 설정을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var str = `/mankeyvalue.adm?dbpath=${arg.dbpath}&kcode=${info.kcode}&kname=${info.kname}&utf8=ok&`;
            console.log(str);
            //var arg2 = { path: str, type: "keyvalue", dbpath: arg.dbpath, elem: arg.elem, self: arg.self };
            var form = document.getElementById("keyvalueDeleteForm");
            if (form == null) {
                $('body').append(self.createKeyvalueDeleteForm());
                form = document.getElementById("keyvalueDeleteForm");
            }
            
            form.dbpath.value = arg.dbpath;
            form.kcode.value = info.kcode;
            form.kname.value = info.kname;
            form.key.value = info.key;
            form.uid.value = info.uid;
            form.fid.value = info.uid;
            form.did.value = info.uid;
            form.type.value = 'del';
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.self.postAjax(arg);
        } else if (type == "nameadd") {
            __modal.show('식별자이름추가', self.makeNameForm());

            var form = document.getElementById("nameSetForm");

            form.dbpath.value = arg.dbpath;
            form.kcode.value = arg.kcode;
            form.uid.value = $("#keynamesel option:selected").attr('uid');
            form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.did.value = $("#keynamesel option:selected").attr('did');
            console.log(`form.fid.value==${form.fid.value} `);

            $('#nameaddBtn').bind("click", { type: 'nameaddSubmit', self: self, arg: arg }, self.eventHandler);
        } else if (type == "nameaddSubmit") {
            var form = document.getElementById("nameSetForm");

            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            //var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: elem };
            //arg.path = str;
            console.log('form.kcode.value*******=' + form.kcode.value);
            arg.kcode = form.kcode.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            arg.path = str;
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            arg.self.postAjax(arg);
            __modal.hide();
        } else if (type == 'record') {

            //console.log("info.value", info.value);
            if (arg && arg.renderinfo && arg.renderinfo.viewbody) {
                var f = new FullScreenView();
                f.setContent(`보기`, arg.renderinfo.viewbody.createViewbody(info, arg, this.eventHandler));
                return;
            }
            var value = __keyvalueSplitString(info.value);

            if (value.link) {
                if (value.link.startsWith('http'))
                    location.href = value.link;
                else
                    location.href = 'http://' + value.link;
            } else if (value.board) {
                var div = document.createElement('div');
                var p = __boardConfigSplitString(value.board);
                if (p && p.type != 'content') {
                    var c = new BoardController(p);
                    c.renderController(div);
                } else {
                    div.innerHTML = info.info;
                }
                var f = new FullScreenView();
                f.setContent(`보기`, div);
            } else if (value.self) {
                var div = document.createElement('div');
                var p = __boardConfigSplitString(value.self);
                console.log('value.self***=' + value.self);
                console.log('p.type***=' + p.type);
                if (p && p.type != 'content') {
                    var c = new BoardController(p);
                    c.renderController(div);
                } else {
                    div.innerHTML = info.info;
                }

                if (arg.viewelem) {
                    $(arg.viewelem).empty();
                    $(arg.viewelem).append(div);
                } else {
                    $(arg.elem).empty();
                    $(arg.elem).append(div);
                }
            } else if (value.link) {

            }
        } else if (type == 'return') {
            console.log('arg.type=', arg.type, ' type=', type, ' arg.filter=', arg.filter);
            arg.renderinfo.$parent.getReturnValue('keyvalue', arg.dbpath, arg.kcode, arg.kname);
        }
    }

    makeNameForm() {
        var m = `<form class="form-horizontal" name="nameSetForm" id="nameSetForm">
                                                    <input type="hidden" name="dbpath" />
                                                    <input type="hidden" name="type" value="nameadd" />
                                                    <input type="hidden" name="uid" />
                                                    <input type="hidden" name="fid" />
                                                    <input type="hidden" name="did" />

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">그룹:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="_orgcharttree" readonly/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">식별자이름:</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" placeholder="식별자이름이름..." required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                            <label for="levelchk" class="control-label">설명:</label>
                                                            <div>
                                                                <textarea type="text" class="form-control" name="info" placeholder="설명..." required></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                    <div class="controls">
                                                        <div class="form-group">
                                                           <input type="button" id="nameaddBtn"  class="btn btn-warning btn-send" value="전송">
                                                            <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                                        </div>
                                                    </div>
                                                    <div class="clearfix"></div>

                                                </form>`;
        return m;
    }

    createKeyvalueDeleteForm() {
        var m = `<form id="keyvalueDeleteForm" name="keyvalueDeleteForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                <input type="hidden" name="type"/>
                                <input type="hidden" name="dbpath" />
                                <input type="hidden" name="kcode" />
                                <input type="hidden" name="kname" />
                                <input type="hidden" name="key" />
                                <input type="hidden" name="uid" />
                                <input type="hidden" name="fid" />
                                <input type="hidden" name="did" />

                            </form>`;
        return m;
    }

    createKeyvalueForm() {
        var m = `<form id="keyvalueForm" name="keyvalueForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                            <input type="hidden" name="type" value="add" />
                                            <input type="hidden" name="dbpath" />
                                            <input type="hidden" name="uid" />
                                            <input type="hidden" name="fid" />
                                            <input type="hidden" name="did" />

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">그룹</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kcode" value="" readonly/>
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="code" class="control-label">식별자</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="kname" value="" readonly />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label class="control-label" for="inputSuccess1">아이콘</label>
                                                            <div>
                                                                <input id="iconchange_input" type="text" class="form-control" name="icon" value="" placeholder="아이콘....." required />
                                                                <a onclick="JavaScript: openNewWindow('/html/admin/edit/selectIcon.html?target=iconchange&1234')" data-toggle="modal" type="button" class="btn btn-primary">아이콘</a>
                                                                <a id="iconchange"></a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label class="control-label" for="inputSuccess1">이미지</label>
                                                            <div>
                                                                <input type="text" name="imageinput" id="imageinput" class="form-control" placeholder="아이콘 이미지 썸네일 경로 ...">
                                                                <button type = "button" class="btn" id="ImgselBtn" ><img id="btnimg" src="" alt="">이미지선택</button >
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="empcode" class="control-label">키</label>
                                                            <div>
                                                                <input type="text" class="form-control" name="key" placeholder="키..." required />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">소제목</label>
                                                            <div>
                                                                <input class="form-control" name="subject" placeholder="소제목..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="permittype" class="control-label">링크타입</label>
                                                        <div class="clearfix"></div>
                                                        <div class="form-check form-check-inline ">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="link">
                                                            <label class="form-check-label" for="inlineCheckbox1">링크</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="board">
                                                            <label class="form-check-label" for="inlineCheckbox1">게시판</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="linkTypeRadio" value="self">
                                                            <label class="form-check-label" for="inlineCheckbox1">셀프</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">링크내용</label>
                                                            <div>
                                                                <input class="form-control" name="value" placeholder="링크내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="date" class="control-label">정보</label>
                                                            <div>
                                                                <textarea class="form-control" name="info" placeholder="내용..." />
                                                            </div>
                                                            <div class="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                            <div class="controls">
                                                <div class="row">

                                                    <div class="col-sm-12">
                                                        <div class="form-group text-right">
                                                            <input type="reset" class="btn btn-secondary" data-dismiss="modal" value="리 셋">
                                                            <input type="button" id="keyvalueaddBtn" class="btn btn-primary" value="전 송">
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div class="clearfix"></div>

                                        </form>`;
        return m;
    }

    arrOrgChartTree = function (parent, arr) {

        for (var i = 0; i < arr.length; i++) {
            var info = arr[i];
            var zinfo = {};

            var value = __keyvalueSplitString(info.value);
            zinfo.uid = info.uid;
            zinfo.fid = info.fid; zinfo.did = info.did; zinfo.key = zinfo.name = info.key; zinfo.value = info.value;
            zinfo.kcode = info.kcode; zinfo.kname = info.kname; zinfo.date = info.date; zinfo.info = info.info;

            //console.log('arrZTree arr[i].arr.length=' + arr[i].arr.length + 'zinfo.name=' + zinfo.name);
            var arr2 = arr[i].arr;
            if (arr2.length > 0) {
                zinfo.info = zinfo;
                zinfo.name = info.key;
                zinfo.title = value.subject;
                zinfo.office = info.value;
                zinfo.children = [];
                parent.push(zinfo);
                //console.log('arrZTree arr[i].arr.length=' + arr[i].arr.length + 'zinfo.name=' + zinfo.name);
                this.arrOrgChartTree(zinfo.children, arr2);
            } else {
                zinfo.info = zinfo;
                zinfo.name = info.key;
                zinfo.title = value.subject;
                zinfo.office = info.value;
                //zinfo.children = [];
                parent.push(zinfo);
                //console.log('arrZTree arr[i].arr.length=' + arr[i].arr.length + 'zinfo.name=' + zinfo.name);
                //console.log('arrZTree arr[i].arr.length=' + arr[i].arr.length + 'parente.length=' + parent.length);
            }
        }
    }

    createList = function (info2, arg, eventHandler) {
        var self = this;
        var info = info2;
        this.arg = arg;
        this.keycodeselValue = arg.kcode;
        this.keynameselValue = arg.kname;
        this.rendertypeselValue = arg.rendertype;
        if (info == null || info == undefined)
            info = {};

        var keycodearr = info.keycodearr;
        var keynamearr = info.keynamearr;
        var arrarr = info.arrarr;

        var orgtreeData = {};

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                //console.log('info.uid=' + info.uid);
                //console.log('info.fid=' + info.fid);
                if (info.did == -7)
                    continue;

                var value = __keyvalueSplitString(info.value);

                var zinfo = {};

                zinfo.uid = info.uid;
                zinfo.title = info.date;
                zinfo.fid = info.fid; zinfo.did = info.did; zinfo.key = zinfo.name = info.key; zinfo.value = info.value;
                zinfo.kcode = info.kcode; zinfo.kname = info.kname; zinfo.date = info.date; zinfo.info = info.info;

                orgtreeData.info = zinfo;
                orgtreeData.name = info.key;
                orgtreeData.title = value.subject;
                orgtreeData.office = info.value;
                
                var arr = arrarr[i].arr;
                //console.log('arr.length=' + arr.length);
                if (arr.length > 0) {

                    orgtreeData.children = [];
                    this.arrOrgChartTree(orgtreeData.children, arr);
                }
                //console.log('orgtreeData=' + orgtreeData);
                //console.log('orgtreeData.children=' + orgtreeData.children);
                break;
            }
        }
        //console.log('orgtreeData=' + orgtreeData);
        $(arg.elem).empty();
        if ($(arg.elem).hasClass("orgchart") === false)
            $(arg.elem).addClass('orgchart');
        $(arg.elem).orgchart({
            'data': orgtreeData,
            //'visibleLevel': 2,
            'nodeContent': 'title',
            //'nodeID': 'id',
            'direction': 't2b',
            //'direction': 'b2t',
            //'direction': 'l2r',
            'pan': true,
            'zoom': true,
            'createNode': function ($node, data) {
                var value = __keyvalueSplitString(data.info.value);
                $node.on('click', function () {
                    if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
                        self.selectNode = data.info;
                        $('#selectNode').val(data.info.key);
                    }
                });

                if (value.image) {
                    var $img = $(`<img src="${value.image}" onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel">`);
                    $node.append($img);
                }

                if (value.icon) {
                     //var $img = $(`<i class="${value.icon}">`);
                    $node.append(value.icon);
                }
                
                /** 
                var secondMenuIcon = $('<i>', {
                    'class': 'oci oci-info-circle second-menu-icon',
                    click: function () {
                        $(this).siblings('.second-menu').toggle();
                        console.log(' $(this)=', data);
                        console.log(' $node=', $node);
                    }
                });
                var secondMenu = '<div class="second-menu"><img class="avatar" src="img/avatar/' + data.id + '.jpg"></div>';
                $node.append(secondMenuIcon).append(secondMenu);***/
            }
        });
        //console.log('arg.kcode', arg.kcode, 'orgtreeData=', orgtreeData);
        if (arg.renderinfo && arg.renderinfo.editmode === "ok") {
            var $divE = $('<div class="form-inline">');
            var $label = $('<label class="selected-node-group">선택한노드:</label>');
            var $inputE = $(`<input type="text" class="form - control" name="selectNode" id="selectNode" placeholder="..." required />`);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("서브아이템추가");
            $buttonE.bind("click", { type: 'keyvaluesubadd', self: this, info: this.selectNode, arg: arg }, this.eventHandler);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("삭제");
            $buttonE2.bind("click", { type: 'keyvaluedel', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);
            var $buttonE2 = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE2.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE2.val("수정");
            $buttonE2.bind("click", { type: 'keyvaluemodify', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($label).append($inputE).append($buttonE).append($buttonE2);
            $(arg.elem).append($divE);

            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;');
            $buttonE.val("아이템추가");
            $buttonE.bind("click", { type: 'keyvalueadd', self: this, info: info, arg: arg }, this.eventHandler);
            var $writeDiv = $('<div>');
            $($writeDiv).append($buttonE);
            $(arg.elem).append($writeDiv);

            //this.setKeyvalueEditContextMenu('.keyvalue_context_menu');
        }

        if (arg.renderinfo && arg.renderinfo.returntype === "return") {
            var $divE = $('<div class="alert">');

            var keynamesel = document.createElement('select');
            keynamesel.setAttribute('id', "keynamesel");
            $(keynamesel).empty();
            $(keynamesel).append(`<option value=' '>메뉴선택</option>`);
            for (var i = 0; i < keynamearr.length; i++) {
                //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
                $(keynamesel).append(`<option value='${keynamearr[i].kname}' uid='${keynamearr[i].uid}' fid='${keynamearr[i].fid}' did='${keynamearr[i].did}'>${keynamearr[i].kname}</option>`);
                console.log(`keynamearr[i].fid=${keynamearr[i].fid}`);
            }
            console.log(`this.keynameselValue=${this.keynameselValue}`);
            if (this.keynameselValue) {
                $(keynamesel).val(this.keynameselValue).prop("selected", true);
            } else {
                this.keynameselValue = $(keynamesel).val();
            }

            $divE.append(keynamesel);

            $(document).off("change", "#keynamesel", null);
            $(document).on("change", "#keynamesel", function () {
                
                console.log("$(this).val()====" + $(this).val());
                arg.renderinfo.kname = $(this).val();
                arg.renderinfo.knamefid = $("#keynamesel option:selected").attr("fid");
                arg.self.setController(self.arg.renderinfo, self.arg.elem)
                //self.selectedLenderCon.setController(self._dbpath, self._kcode, self._keynameselValue, elem);
            });

            var $buttonE = $("<button type='button' class='btn btn-info mr-2'>이름추가</button>");
            $buttonE.bind("click", { type: "nameadd", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            var $buttonE = $("<button type='button' class='btn btn-info'>리턴</button>");
            $buttonE.bind("click", { type: "return", self: this, arg: arg, name: "" }, this.eventHandler);
            $divE.append($buttonE);

            $(arg.elem).append($divE);
        }

        return orgtreeData;
    }
}

class KeyValueView {
    constructor() {
        
    }

    eventHandler(e) {
        e.preventDefault();
        e.stopPropagation();

        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'return') {
            
            console.log(`keycodeselValue=${self.keycodeselValue}keynameselValue=${self.keynameselValue}rendertypeselValue = ${self.rendertypeselValue}arg.dbpath= ${arg.dbpath}`);
            arg.self.$parent.getReturnValue('keyvalue', arg.dbpath, self.keycodeselValue, self.keynameselValue, self.rendertypeselValue);
            console.log('return');
            __modal.hide();
        } else if (type == "groupadd") {

            __modal.show('그룹추가', self.makeGroupForm());
            var form = document.getElementById("groupSetForm");
            form.dbpath.value = _dbpath;
            $('#groupaddBtn').bind("click", { type: 'groupaddSubmit', self: self, info: info, arg: arg }, e.data.self.eventHandler);
        } else if (type == "nameadd") {
            __modal.show('식별자이름추가', self.makeNameForm());

            var form = document.getElementById("nameSetForm");

            var codeval = $("#keycodesel option:selected").val();
            if (codeval == null) {
                modal.hide();
                return alert('그룹을 선택해야됩니다');
            }
            form.dbpath.value = _dbpath;
            form.kcode.value = codeval;
            form.uid.value = $("#keynamesel option:selected").attr('uid');
            form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.did.value = $("#keynamesel option:selected").attr('did');
            console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
            $('#nameaddBtn').bind("click", { type: 'nameaddSubmit', self: self, info: info, arg: arg }, e.data.self.eventHandler);
        } else if (type == "add") {
            __modal.show('키추가', self.makeKeyvalueForm());

            var form = document.getElementById("keyvalueForm");

            var codeval = $("#keycodesel option:selected").val();
            if (codeval == null) {
                __modal.hide();
                return alert('그룹을 선택해야됩니다');
            }
            var nameval = $("#keynamesel option:selected").val();
            if (nameval == null) {
                __modal.hide();
                return alert('식별자이름를 선택해야됩니다');
            }
            form.dbpath.value = _dbpath;
            form.kcode.value = codeval;
            form.kname.value = nameval;
            form.uid.value = $("#keynamesel option:selected").attr('uid');
            form.fid.value = $("#keynamesel option:selected").attr('fid');
            form.did.value = $("#keynamesel option:selected").attr('did');
            console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
            $('#keyvalueaddBtn').bind("click", { type: 'keyvalueaddSubmit', self: self, info: info, arg: arg }, e.data.self.eventHandler);
        } else if (type == "groupaddSubmit") {
            var form = document.getElementById('groupSetForm');

            var str = "/mankeyvalue.adm?&utf8=ok&";
            //var elem = document.getElementById('keyvalueView');
            var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: arg.elem, settype: arg.settype };
            arg.kcode = form.kcode.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;
            
            //var str = `/mankeyvalue.adm?dbpath=${self.arg.dbpath}&kcode=${self.keycodeselValue}&kname=${self.keynameselValue}&type=${self.arg.type}&utf8=ok&`;
            arg.path = str;
            arg.dbpath = self.arg.dbpath;
            arg.kcode = form.kcode.value;
            self.arg.self.keyvaluePost(arg);

            __modal.hide();
        } else if (type == "nameaddSubmit") {
            var form = document.getElementById("nameSetForm");

            var str = "/mankeyvalue.adm?&utf8=ok&";
            //var elem = document.getElementById('keyvalueView');
            var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: arg.elem, settype: arg.settype };
            arg.kcode = form.kcode.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;
            console.log('form.kcode.value^********************************=' + form.kcode.value);
            arg.path = str;
            arg.dbpath = self.arg.dbpath;
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            self.arg.self.keyvaluePost(arg);
            __modal.hide();
        } else if (type == "keyvalueaddSubmit") {
            var form = document.getElementById("keyvalueForm");

            var str = "/mankeyvalue.adm?&utf8=ok&";
            var elem = document.getElementById('keyvalueView');
            var arg = { path: str, type: "keyvalue", dbpath: _dbpath, elem: arg.elem, settype: arg.settype };
            arg.kcode = form.kcode.value;
            arg.rendertype = $("#rendertypesel option:selected").val();
            arg.form = form;
            var formData = $(form).serializeArray();
            //console.log("form.subject.value=======" + form.subject.value);
           var  b64 = Base64.encode(form.info.value);
            formData = self.arg.self.changeSerialize(formData, 'info', b64);
            arg.formData = formData;

            arg.path = str;
            arg.dbpath = self.arg.dbpath;
            arg.kcode = form.kcode.value;
            arg.kname = form.kname.value;
            self.arg.self.keyvaluePost(arg);
            __modal.hide();
        } else if (type == 'record') {
            var value = info.value;
            var link = value.split(':');
            if (link[0] == 'link') {

            } else if (link[0] == 'board') {

            } else if (link[0] == 'self') {

            }
            console.log(`record info.value=${info.value}`);
        }
    }

    makeGroupForm () {
        var m = `<form class="form-horizontal" name="groupSetForm" id="groupSetForm">
                            <input type="hidden" name="dbpath" />
                            <input type="hidden" name="type" value="groupadd" /><!-- brdadd, groupupdate, brdupdate, groupdel, brddel-->

                            <div class="controls" id="groupMakeShow22">
                                <div class="form-group">
                                    <label for="levelchk" class="control-label">그룹:</label>
                                    <div>
                                        <input type="text" class="form-control" name="kcode" id="groupname" value="" placeholder="그룹이름..." required />
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="form-group">
                                    <label for="levelchk" class="control-label">설명:</label>
                                    <div>
                                        <textarea type="text" class="form-control" name="info" placeholder="설명..." required></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="form-group">
                                    <input type="button" id="groupaddBtn"  class="btn btn-warning btn-send" value="전송">
                                    <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                </div>
                            </div>
                            <div class="clearfix"></div>

                        </form>`;
        return m;
    }

    makeNameForm () {
        var m = `<form class="form-horizontal" name="nameSetForm" id="nameSetForm">
                            <input type="hidden" name="dbpath" />
                            <input type="hidden" name="type" value="nameadd" />
                            <input type="hidden" name="uid" />
                            <input type="hidden" name="fid" />
                            <input type="hidden" name="did" />

                            <div class="controls">
                                <div class="form-group">
                                    <label for="levelchk" class="control-label">그룹:</label>
                                    <div>
                                        <input type="text" class="form-control" name="kcode" value="" readonly/>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="form-group">
                                    <label for="levelchk" class="control-label">식별자이름:</label>
                                    <div>
                                        <input type="text" class="form-control" name="kname" value="" placeholder="식별자이름이름..." required />
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="form-group">
                                    <label for="levelchk" class="control-label">설명:</label>
                                    <div>
                                        <textarea type="text" class="form-control" name="info" placeholder="설명..." required></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>

                            <div class="controls">
                                <div class="form-group">
                                   <input type="button" id="nameaddBtn"  class="btn btn-warning btn-send" value="전송">
                                    <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                </div>
                            </div>
                            <div class="clearfix"></div>

                        </form>`;
        return m;
    }

    makeKeyvalueForm = function () {
        var m = `<form id="keyvalueForm" name="keyvalueForm" method="post" class="form-horizontal white-bg-gradient  text-left">

                                <input type="hidden" name="type" value="add" />
                                <input type="hidden" name="dbpath" />
                                <input type="hidden" name="uid" />
                                <input type="hidden" name="fid" />
                                <input type="hidden" name="did" />

                                <div class="controls">
                                    <div class="row">

                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="code" class="control-label">그룹</label>
                                                <div>
                                                    <input type="text" class="form-control" name="kcode" value="" readonly/>
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="code" class="control-label">식별자</label>
                                                <div>
                                                    <input type="text" class="form-control" name="kname" value="" readonly />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="empcode" class="control-label">키</label>
                                                <div>
                                                    <input type="text" class="form-control" name="key" placeholder="키..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="date" class="control-label">값</label>
                                                <div>
                                                    <input class="form-control" name="value" placeholder="값..." />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="date" class="control-label">정보</label>
                                                <div>
                                                    <textarea class="form-control" name="info" placeholder="값..." />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="clearfix"></div>

                                <div class="controls">
                                    <div class="row">

                                        <div class="col-sm-12">
                                            <div class="form-group text-right">
                                                <input type="button" id="keyvalueaddBtn"  class="btn btn-warning btn-send" value="전송">
                                                <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div class="clearfix"></div>

                            </form>`;
        return m;
    }

    createList(info2, arg, eventHandler) {
        var info = info2;
        this.arg = arg;
        this.keycodeselValue = arg.kcode;
        this.keynameselValue = arg.kname;
        this.rendertypeselValue = arg.rendertype;
        if (info == null || info == undefined)
            info = {};

        var keycodearr = info.keycodearr;
        var keynamearr = info.keynamearr;
        var arrarr = info.arrarr;

        //if (arg.settype == 'setting' || arg.settype == 'modal')
        {
            var $selDiv = $('<div>');
            var $keycodesel = $('<select id="keycodesel">');
            var $keynamesel = $('<select id="keynamesel">');
            var $rendertypesel = $('<select id="rendertypesel">');

            var $buttonE = $(`<button class="btn " type="button"><i class="fa fa-plus"></i></button>`);
            $buttonE.bind("click", { type: 'groupadd', self: this, info: info, arg: arg }, this.eventHandler);
            var $buttonE2 = $(`<button class="btn" type="button"><i class="fa fa-plus"></i></button>`);
            $buttonE2.bind("click", { type: 'nameadd', self: this, info: info, arg: arg }, this.eventHandler);
            var $buttonE3 = $(`<button class="btn" type="button"><i class="fa fa-plus"></i></button>`);
            $buttonE3.bind("click", { type: 'add', self: this, info: info, arg: arg }, this.eventHandler);

            if (arg.settype == 'setting') {
                $selDiv.append($keycodesel).append($buttonE).append($keynamesel).append($buttonE2).append($rendertypesel).append($buttonE3);
            } else if (arg.settype == 'modal') {
                var $label = $('<label>').text(this.keycodeselValue);
                var $buttonE3 = $(`<button class="btn btn-info" type="button">리턴</button>`);
                $buttonE3.bind("click", { type: 'return', self: this, info: info, arg: arg }, this.eventHandler);
                $selDiv.append($label).append($keynamesel).append($buttonE2).append($rendertypesel).append($buttonE3);
            }

            $(arg.elem).empty();
            $(arg.elem).append($selDiv);

            if (keycodearr) {

                $keycodesel.append(`<option value=''>-keycode-</option>`);
                for (var i = 0; i < keycodearr.length; i++) {
                    //console.log(`keycodearr[i].kcode=${keycodearr[i].kcode}`);
                    $keycodesel.append(`<option value='${keycodearr[i].kcode}' uid='${keycodearr[i].uid}' fid='${keycodearr[i].fid}' did='${keycodearr[i].did}'>${keycodearr[i].kcode}</option>`);
                }
                if (this.keycodeselValue) {
                    $keycodesel.val(this.keycodeselValue).prop("selected", true);
                }

            }
            if (keynamearr) {

                for (var i = 0; i < keynamearr.length; i++) {
                    //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
                    $keynamesel.append(`<option value='${keynamearr[i].kname}' uid='${keynamearr[i].uid}' fid='${keynamearr[i].fid}' did='${keynamearr[i].did}'>${keynamearr[i].kname}</option>`);
                    //console.log(`keynamearr[i].kname=${keynamearr[i].kname}`);
                }
                if (this.keynameselValue) {
                    $keynamesel.val(this.keynameselValue).prop("selected", true);
                } else {
                    this.keynameselValue = $keynamesel.val();
                }
            }
            $rendertypesel.append(`<option value="_list">_list</option>`);
            $rendertypesel.append(`<option value="_ztree">_ztree</option>`);
            $rendertypesel.append(`<option value="_topmenu">_topmenu</option>`);
            $rendertypesel.append(`<option value="_sidemenu">_sidemenu</option>`);
            $rendertypesel.append(`<option value="_tabmenu">_tabmenu</option>`);
            $rendertypesel.append(`<option value="_orgcharttree">_orgcharttree</option>`);
            $rendertypesel.append(`<option value="_dynamictree">_dynamictree</option>`);
            $rendertypesel.append(`<option value="_carousel">_carousel</option>`);
            if (this.rendertypeselValue) {
                $rendertypesel.val(this.rendertypeselValue).prop("selected", true);
            } else {
                //console.log(`this.rendertypeselValue=${this.rendertypeselValue} arg.settype=${arg.settype}`);
                arg.rendertype = this.rendertypeselValue = 'list';
                $rendertypesel.val(this.rendertypeselValue).prop("selected", true);
            }

        }
        //console.log(`this.rendertypeselValue=${this.rendertypeselValue} arrarr.length=${arrarr.length}`);
        //console.log(`keycodearr.length=${keycodearr.length} keynamearr.length=${keynamearr.length}`);
        //console.log(`arg.kcode=${arg.kcode} arg.kname=${arg.kname}`);
        //alert("makeKeyValue rendertype=: " + arg.rendertype);
        if (arg.rendertype && arg.rendertype == '_dynamictree') {
            if (this.dynamicTreeview == null || this.dynamicTreeview == undefined)
                this.dynamicTreeview = new DynamicTreeview();
            this.dynamicTreeview.createDynamicTreeview(arrarr, arg, this.eventHandler);
        } else if (arg.rendertype && arg.rendertype == '_orgcharttree') {
            if (this.orgChartTreeView == null || this.orgChartTreeView == undefined)
                this.orgChartTreeView = new OrgChartTreeView();
            this.orgChartTreeView.createOrgChartTreeView(arrarr, arg, this.eventHandler);
        } else if (arg.rendertype && arg.rendertype == '_ztree') {
            if (this.zTreeView == null || this.zTreeView == undefined)
                this.zTreeView = new ZTreeView();
            $(arg.elem).addClass('_ztree');
            $.fn.zTree.init($(arg.elem), this.zTreeView.setting, this.zTreeView.createZTreeView(arrarr, arg, this.eventHandler));
        } else if (arg.rendertype && arg.rendertype == '_sidemenu') {
            if (this.sideMenuView == null || this.sideMenuView == undefined)
                this.sideMenuView = new SideMenuView();
            this.sideMenuView.createSideMenuView(arrarr, arg, this.eventHandler);
        } else if (arg.rendertype && arg.rendertype == '_topmenu') {
            if (this.topMenuView == null || this.topMenuView == undefined)
                this.topMenuView = new TopMenuView();
            this.topMenuView.createTopMenuView(arrarr, arg, this.eventHandler);
        } else if (arg.rendertype && arg.rendertype == '_tabmenu') {
            if (this.tabMenuView == null || this.tabMenuView == undefined)
                this.tabMenuView = new TabMenuView();
            this.tabMenuView.createKeyvalueTabMenu(arrarr, arg, this.eventHandler);
        } else if (arg.rendertype && arg.rendertype == '_list') {
            if (this.listTreeView == null || this.listTreeView == undefined)
                this.listTreeView = new ListTreeView();
            this.listTreeView.createListTreeView(arrarr, arg, this.eventHandler);
        } else if (arg.rendertype && arg.rendertype == '_carousel') {
            if (this.listTreeView == null || this.listTreeView == undefined)
                this.listTreeView = new ListTreeView();
            this.listTreeView.createListTreeView(arrarr, arg, this.eventHandler);
        }

    };

    createKeyvalueView(info2, arg, eventHandler) {

    };
}

class LoginView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'jjocjyformSubmit') {

            var form = document.getElementById("jjocjyForm");
            form.sendid.value = e.data.sendid;
            form.receiveid.value = e.data.receiveid;

            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'jjocjuylist';
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/jjocjy.member?jjocjytype=add&code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&utf8=ok&";
            arg2.path = str;
            console.log('jjocjyformSubmit arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'jjocjyviewbody') {

            __fullscreenView.setContent(`보기`, self.createJjocjyView());
            __fullscreenView.fullscreen('fullscreenwin');

            var form = document.getElementById("goodsViewForm");
            form.sendid.value = e.data.sendid;
            form.receiveid.value = e.data.receiveid;

            form.uid.value = info.uid;
            console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.xycode.value = info.xycode;
            form.goodscode.value = info.goodscode;
            form.goodsname.value = info.goodsname;
            form.defaultprice.value = info.defaultprice;
            form.sellprice.value = info.sellprice;


            $('#goodsaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#goodsdelSubmit').bind("click", { type: 'goodsdelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#goodsmodifySubmit').bind("click", { type: 'goodsmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);

        } else if (type == 'jjocjyget') {
            var str = "/jjocjy.member?getid=" + info.sid + "&code=member&jjocjytype=list&dbpath=config.dadb&utf8=ok&";
            console.log("str == " + str);
            //var arg2 = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "jjocjylist";
            arg.self.startBoardRequest(arg);
        } else if (type == 'jjocjylist') {
            var str = "/jjocjy.member?getid=" + info.getid + "&code=member&jjocjytype=list&dbpath=config.dadb&utf8=ok&";
            console.log("str == " + str);
            //var arg2 = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "jjocjylist";
            arg.self.startBoardRequest(arg);
        } else if (type == 'jjocjydel') {
            var str = "/jjocjy.member?jjocjytype=list&posttype=del&uid=" + info.uid + "&getid=" + info.getid + "&code=member&jjocjytype=list&dbpath=config.dadb&utf8=ok&";
            console.log("str == " + str);
            //var arg2 = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "jjocjylist";
            arg.self.startBoardRequest(arg);
        } else if (type == 'mypage') {
            var str = "/html/member/memberPage.html?id=1";
            location.href = str;

            console.log("str == " + str);
            return;
        } else if (type == 'logmodify') {
            var str = "/html/member/memberUpdate.html?id=1";
            location.href = str;

            console.log("str == " + str);
            return;
            //var arg2 = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "jjocjylist";
            arg.self.startBoardRequest(arg);
        } else if (type == 'logout') {
            var str = "/login.member?logtype=logout&uid=" + info.uid + "&getid=" + info.getid + "&code=member&jjocjytype=list&dbpath=config.dadb&utf8=ok&";
            //location.href = str;

            console.log("str == " + str);
            //return;
            //var arg2 = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "jjocjylist";
            arg.self.startBoardRequest(arg);
        } else if (type == 'jjocjyrecord') {
            var str = "/jjocjy.member?jjocjytype=view&uid=" + info.uid + "&getid=" + info.getid + "&code=member&dbpath=config.dadb&utf8=ok&";
            console.log("str == " + str);
            //var arg2 = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = "jjocjyview";
            arg.self.startBoardRequest(arg);
        } else if (type == 'login') {
            var str = "/html/member/login.html?id=1";
            location.href = str;

            console.log("str == " + str);
            return;

            var form = document.getElementById(e.data.formid);
            
            arg.type = type;
            arg.form = form;
            var encrypted = RSAEncription(form.passwd.value);
            var formData = $(form).serializeArray();
            formData = __changeSerialize(formData, 'passwd', encrypted);
            arg.formData = formData;
            arg.path = "/login.html?logtype=login&dbpath=config.dadb&utf8=ok&";
            arg.self.postAjax(arg);
        } 
    }

    getCookie(cookieName) {
        cookieName = cookieName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cookieName);
        var cookieValue = '';
        if (start != -1) {
            start += cookieName.length;
            var end = cookieData.indexOf(';', start);
            if (end === -1) end = cookieData.length;
            cookieValue = cookieData.substring(start, end);
        }
        return unescape(cookieValue);
    }

    setCookie(cookieName, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var cookieValue = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toGMTString());
        document.cookie = cookieName + "=" + cookieValue;
    }

    deleteCookie(cookieName) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() - 1); 
        document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
    }

    createJjocjyView(info2, arg, eventHandler) {
        console.log('createJjocjyView info2=', info2);
        var arrarr = info2.arrarr;
        
        var $tempBox = $('<div>');
        //$('.main-board-view').append($tempBox);
        //$(arg.boardid).append($tempBox);
        var $head = $('<div>');
        var $body = $('<div>');
        var $foot = $('<div>');
        //alert("da-board-script viewbody arg.renderstyle" + arg.renderstyle);

        $tempBox.append($head).append($body).append($foot);

        

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var $headTitle = $('<h5 class="card-title">').append(info.subject);
                var $boxHeader = $('<div class="card-header">').append($headTitle);
                $head.append($boxHeader);

                var $headSpan = $('<span>').append("글쓴이: " + info.sendid);


                $boxHeader = $('<div class="card-header">').append($headSpan);
                $head.append($boxHeader);

                var $boxBody = $('<div class="card-body" style="overflow:auto">').append(info.memo1);
                $body.append($boxBody);

                var $boxfooter = $('<div class="card-footer">');
                var btn1 = $('<button type="button" class="btn btn-outline-dark brdupdate" >목록</button>');
                $(btn1).bind("click", { type: "jjocjylist", elem: arg.elem, arg: arg, info: info }, this.eventHandler);
                //$(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                $boxfooter.append(btn1);

                btn1 = $('<button type="button" class="btn btn-outline-dark brdupdate" >삭제</button>');
                $(btn1).bind("click", { type: "jjocjydel", uid: info.uid, elem: arg.elem, arg: arg, info: info, self: this }, this.eventHandler);
                $boxfooter.append(btn1);

                $foot.append($boxfooter);
            }
        }

        
        __modal.show(`쪽지 뷰`, $tempBox);

        return $tempBox;
    }

    createJjocjyList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;
        console.log('info.sid=', info.sid);
        console.log('arg.type=', arg.type);
        if (info.sid && info.sid == "#logout") {
            return history.go(0);
            //return location.reload(true);
        }
        var $temp = $("<div>");

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 40%'>").text("제 목");
        var thE3 = $("<th style='width: 20%'>").text("보낸사람");
        var thE4 = $("<th style='width: 20%'>").text("보낸시간");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'jjocjywrite', self: this, info: info, arg: arg }, eventHandler);
        $(tdE).append($buttonE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);

        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, eventHandler);
        
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.uid);
                var tdE2 = $("<td>").text(info.subject).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.sendid);

                var date = new Date(info.register * 1000); //타임스탬프를 인자로 받아 Date 객체 생성
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // 0-indexed
                const day = date.getDate();
                console.log(year + "년 " + month + "월 " + day + "일"); // 출력
                
                var tdE4 = $("<td>").text(year + "년 " + month + "월 " + day + "일");

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4);
                $(tBodyE).append(trE);

                $(tdE2).bind("click", { type: 'jjocjyrecord', self: this, info: info, arg: arg }, this.eventHandler);
                $(tdE2).attr('style', 'cursor:pointer;cursor: hand;');

            }
        }

        //$(arg.elem).empty();
        //$(arg.elem).append($temp);

        //var f = new FullScreenView();
        //f.setContent(`쪽지 리스트`, $temp);
        __modal.show(`쪽지 리스트`, $temp);

        return $temp;
    }

    createList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        info.logformid = '#main-logform';

        $(info.logformid).empty();

        var $logbox = $('<div>');
        var $logformdiv = $('<div>');
        console.log(`info.sid=${info.sid}`);
        if (info.sid === null || info.sid === undefined) {
            var $form = $('<form id="loginform" class="form-horizontal edit" method="post">');
            //alert('1');
            var $hidden = $('<input type="hidden" name="code"/>').val(arg.code);
            $form.append($hidden);
            $hidden = $('<input type="hidden" name="dbpath"/>').val("config.dadb");
            $form.append($hidden);
            $hidden = $('<input type="hidden" name="type"/>');
            $form.append($hidden);
            
            //alert('2');
            var $formitem = $('<div class="form-group">');
            /*** *
            var $label = $('<label class="control-label"></label>').text("아이디:");
            var $input = $('<input type="text" class="form-control" placeholder="아이디" required>').prop("name", "id");
            $formitem.append($label).append($input);
            $form.append($formitem);

            $formitem = $('<div class="form-group">');
            $label = $('<label class="control-label"></label>').text("암호:");
            $input = $('<input type="password" class="form-control" placeholder="암호" required>').prop("name", "passwd");
            $formitem.append($label).append($input);
            $form.append($formitem);
            ***/
            var boxbodyid = "brdid" + info.brdid;
            //alert('3');
            var btn1 = $('<button type="button" class="btn btn-info brdupdate" >Login</button>');
            $(btn1).bind("click", { type: "login", formid: "loginform", logformid: info.logformid, self: this, arg: arg }, this.eventHandler);
            $formitem = $('<div class="form-group">').append($(btn1));
            $form.append($formitem);

            $form.append('<p><input type="checkbox" id="idSaveCheck" /> 아이디 저장</p>');
            $form.append('<p><input type="checkbox" disabled id="pwdSaveCheck" class="no_act" /> 비밀번호 저장</p>');
            var $a = $('<a >').text("회원가입");
            $a.attr("href", "/html/member/login.html");
            $form.append($a);
            //console.log(`createLoginView $form=${$form.html()}`);
            $logformdiv.append($form);
        }
        else {
            var $sessionDiv = $('<div class="welcome mb10">');

            var $h3 = $('<h3>' + info.sid + '님 어서오세요.</h3>');
            var $headdiv = $('<div class="welcome mb10">').append($h3);
            $sessionDiv.append($headdiv);

            var $a = $('<a >').text(info.sjjocjynum + " 개");
            $a.attr('style', 'cursor:pointer;cursor: hand;');
            //$a.attr("href", "/app/edit/da-jjocjy.html");
            $a.bind("click", { type: "jjocjyget", formid: "#loginform", info: info, self: this, arg: arg }, this.eventHandler);
            var $p = $('<p><strong>쪽지</strong> : </p>').append($a);
            var $hdiv = $('<div class="mb10">').append($p);

            //var $a = $('<a >').text(info.slevelpt + " 점");
            //$a.bind("click", { type: "brddel", formid: "#"}, onLoginBind);
            //var $p = $('<p><strong>포인트</strong> : </p>').append($a);
            //$hdiv.append($p);
            $sessionDiv.append($hdiv);
            /** 
            var $a = $('<a >').text("프로필 | ");
            $a.bind("click", {type: "brddel", formid: "#loginform", logformid: info.logformid, self: this, arg: arg }, eventHandler);
            var $hdiv = $('<div class="mb10">').append($a);
            ***/
            var $a = $('<a >').text("마이페이지 | ");
            $a.attr('style', 'cursor:pointer;cursor: hand;');
            $a.bind("click", { type: "mypage", formid: "#loginform", info: info, self: this, arg: arg }, this.eventHandler);
            $hdiv.append($a);

            var $a = $('<a >').text("정보수정 | ");
            $a.attr('style', 'cursor:pointer;cursor: hand;');
            $a.bind("click", { type: "logmodify", formid: "#loginform", info: info, self: this, arg: arg }, this.eventHandler);
            $hdiv.append($a);

            var $a = $('<a >').text("로그아웃");
            $a.attr('style', 'cursor:pointer;cursor: hand;');
            $a.bind("click", { type: "logout", formid: "#loginform", info: info, self: this, arg: arg }, this.eventHandler);
            $hdiv.append($a);
            $sessionDiv.append($hdiv);

            $logformdiv.append($sessionDiv);
        }

        var tinfo = {};
        tinfo.dragok = "ok";
        tinfo.boxtype = "box-info box-solid";
        tinfo.rendertype = "general";
        //tinfo.display = "none";
        tinfo.title = "로그인";
        tinfo.collapse_btn = "ok";
        tinfo.collapse_minus_class = true;
        tinfo.boxbodyid = "brdid" + info.brdid;

        tinfo.comment = $logformdiv;

        tinfo.badge = "ok";
        
        $logbox.append($logformdiv);

        //$('#' + info.login).append(createBox(tinfo));
        //$('#' + tinfo.boxbodyid).data("json", JSON.stringify(info));
        //alert($("input[name='id']").val());
        ////Id 쿠키 저장
        var userInputId = this.getCookie("userInputId");
        $("input[name='id']").val(userInputId);
        //alert('1');
        if ($("input[name='id']").val() != "") {
            $("#idSaveCheck").attr("checked", true);
            $("#pwdSaveCheck").removeAttr("disabled");
        }
        //alert('2');
        $("#idSaveCheck").change(function () {
            //alert("checkbox check out");
            if ($("#idSaveCheck").is(":checked")) {
                //alert("checkbox check");
                //id 저장 클릭시 pwd 저장 체크박스 활성화
                $("#pwdSaveCheck").removeAttr("disabled");
                $("#pwdSaveCheck").removeClass('no_act');
                var userInputId = $("input[name='id']").val();
                setCookie("userInputId", userInputId, 365);
            } else {
                deleteCookie("userInputId");
                $("#pwdSaveCheck").attr("checked", false);
                deleteCookie("userInputPwd");
                $("#pwdSaveCheck").attr("disabled", true);
                $("#pwdSaveCheck").addClass('no_act');
            }
        });

        //alert('3');
        $("input[name='id']").keyup(function () {
            if ($("#idSaveCheck").is(":checked")) {
                var userInputId = $("input[name='id']").val();
                setCookie("userInputId", userInputId, 365);
            }
        });

        //Pwd 쿠키 저장
        var userInputPwd = this.getCookie("userInputPwd");
        $("input[name='passwd']").val(userInputPwd);

        if ($("input[name='passwd']").val() != "") {
            $("#pwdSaveCheck").attr("checked", true);
            $("#pwdSaveCheck").removeClass('no_act');
        }
        //alert('4');
        $("#pwdSaveCheck").change(function () {

            if ($("#pwdSaveCheck").is(":checked")) {
                alert('해킹의위험이 있습니다 공동으로사용하는 컴퓨터에서는 절대사용을 금해야됩니다');
                var userInputPwd = $("input[name='passwd']").val();
                setCookie("userInputPwd", userInputPwd, 365);
            } else {
                deleteCookie("userInputPwd");
            }
        });


        $("input[name='passwd']").keyup(function () {
            if ($("#pwdSaveCheck").is(":checked")) {
                var userInputPwd = $("input[name='passwd']").val();
                setCookie("userInputPwd", userInputPwd, 365);
            }
        });

        $(info.logformid).append($logbox);
        $(info.logformid).attr('sid', info.sid);
        //alert('5');
        return $logbox;
    }

    serializeLay() {
        var info = { classname: this.constructor.name };
        info.renderinfo = this.arg.renderinfo;
        info.ltype = 'LoginView';

        return info;
    }

    deSerializeLay(control) {

    }
}

class JjocjyView {
    constructor() {

    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'jjocjyformSubmit') {

            var form = document.getElementById("jjocjyForm");
            form.sendid.value = e.data.sendid;
            form.receiveid.value = e.data.receiveid;

            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'jjocjuylist';
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/jjocjy.member?jjocjytype=add&code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&utf8=ok&";
            arg2.path = str;
            console.log('jjocjyformSubmit arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'jjocjyviewbody') {

            __fullscreenView.setContent(`보기`, self.createErpFormView());
            __fullscreenView.fullscreen('fullscreenwin');

            var form = document.getElementById("goodsViewForm");
            form.sendid.value = e.data.sendid;
            form.receiveid.value = e.data.receiveid;

            form.uid.value = info.uid;
            console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.xycode.value = info.xycode;
            form.goodscode.value = info.goodscode;
            form.goodsname.value = info.goodsname;
            form.defaultprice.value = info.defaultprice;
            form.sellprice.value = info.sellprice;


            $('#goodsaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#goodsdelSubmit').bind("click", { type: 'goodsdelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#goodsmodifySubmit').bind("click", { type: 'goodsmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


        }
    }

    createJjocjyView(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 40%'>").text("제 목");
        var thE3 = $("<th style='width: 20%'>").text("보낸사람");
        var thE4 = $("<th style='width: 20%'>").text("보낸시간");
        var thE5 = $("<th style='width: 15%'>").text("삭제");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'jjocjywrite', self: this, info: info, arg: arg }, eventHandler);
        $(tdE).append($buttonE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);

        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, eventHandler);

        for (var i = 0; i < arrarr.length; i++) {
            //cnt++;
            var info = arrarr[i];
            var arr = arrarr[i].arr;

            var trE = $("<tr>");

            var tdE1 = $("<td>").text(article_num);
            var tdE2 = $("<td>").text(subject).css("text-overflow", "ellipsis");
            var tdE3 = $("<td>").text(sendid);
            if (sid) {
                tdE3.attr('code', code);
                tdE3.attr('id', sid);
                tdE3.attr('path', dbpath);
                tdE3.addClass('idpopupmenu');
            }

            var tdE4 = $("<td>").text(signdate);
            var tdE5 = $("<td>");
            var btn1 = $('<button type="button" class="btn btn-default brddel" >삭제</button>');
            $(btn1).bind("click", { type: 'jjocjydel', info: info, arg: arg }, eventHandler);
            tdE5.append(btn1);

            $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);
            $(tBodyE).append(trE);

            $(tdE2).bind("click", { type: 'jjocjyrecord', info: info, arg: arg }, eventHandler);
            $(tdE2).attr('style', 'cursor:pointer;cursor: hand;');

        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }

    createJjocjyList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 40%'>").text("제 목");
        var thE3 = $("<th style='width: 20%'>").text("보낸사람");
        var thE4 = $("<th style='width: 20%'>").text("보낸시간");
        var thE5 = $("<th style='width: 15%'>").text("삭제");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'jjocjywrite', self: this, info: info, arg: arg }, eventHandler);
        $(tdE).append($buttonE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);

        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var trE = $("<tr>");

                var tdE1 = $("<td>").text(article_num);
                var tdE2 = $("<td>").text(subject).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(sendid);
                if (sid) {
                    tdE3.attr('code', code);
                    tdE3.attr('id', sid);
                    tdE3.attr('path', dbpath);
                    tdE3.addClass('idpopupmenu');
                }

                var tdE4 = $("<td>").text(signdate);
                var tdE5 = $("<td>");
                var btn1 = $('<button type="button" class="btn btn-default brddel" >삭제</button>');
                $(btn1).bind("click", { type: 'jjocjydel', info: info, arg: arg }, eventHandler);
                tdE5.append(btn1);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);
                $(tBodyE).append(trE);

                $(tdE2).bind("click", { type: 'jjocjyrecord', info: info, arg: arg }, eventHandler);
                $(tdE2).attr('style', 'cursor:pointer;cursor: hand;');

            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class BoardConfigView extends ViewBase {
    constructor() {
        super();

        this.codeSelValue = null;
        this.arg;
        var self = this;
        $(document).on("change", "#codesel", function () {
            self.codeSelValue = $("#codesel option:selected").text();
            console.log(`self.arg.code==${self.codeSelValue} self.arg.type==${self.arg.type}  self.arg.self=${self.arg.self}`);
            var str;
            str = `/manboard.adm?type=list&code=${self.codeSelValue}&dbpath=${self.arg.dbpath}&brdid=${self.arg.brdid}&utf8=ok&`;

            var arg = { path: str, type: self.arg.type, dbpath: self.arg.dbpath, code: self.arg.code, elem: self.arg.elem, renderstyle: self.arg.renderstyle, rendertype: self.arg.rendertype, self: self.arg.self};

            //alert("da-boardconfig.html previewBtn str=" + str);
            self.arg.self.boardConfigList(arg);
            //renderBoardset(codeSelValue);
        });

    }

    createBoardConfigFormEvent(info2, arg, eventHandler) {
        var info = info2;
        var arg3 = arg;
        var formid = formid;
        var formsubmitid = formsubmitid;
        

        //$(formsubmitid).bind("click", { type: 'erppost', formid: formid, info: info2, self: this, arg: arg }, eventHandler);
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var self = e.data.self;
        var type = e.data.type;
        //console.log(`eventhandle arg= ${arg}`);
        if (type == 'boardadd') {
            __modal.show('게시판설정', e.data.self.createBoardSetFormView(info, arg, e.data.self.eventHandler));
            var form = document.getElementById("boardSetForm");
            form.type.value = 'brdadd';
            //console.log(`info= ${info}`);
            form.code.value = self.codeSelValue;
            form.groupid.value = info.groupid;
            form.groupname.value = info.groupname;
            form.groupname.readOnly = true;
            $('#boardaddBtn').bind("click", { type: 'boardaddSubmit', self: self, info: info, arg: arg }, e.data.self.eventHandler);
        } else if (type == 'groupadd') {
            __modal.show('그룹설정', e.data.self.createBoardSetFormView(info, arg, e.data.self.eventHandler));
            var form = document.getElementById("boardSetForm");
            form.code.value = self.codeSelValue;
            form.type.value = 'groupadd';
            //console.log(`eventhandle $('#boardaddBtn').attr('id')= ${$('#boardaddBtn').attr('id')}`);
            $('#boardaddBtn').bind("click", { type: 'boardaddSubmit', self: self, info: info, arg: arg }, e.data.self.eventHandler);
        } else if (type == 'boardaddSubmit') {
            var str = `/manboard.adm?type=list&code=${arg.code}&dbpath=${arg.dbpath}&brdid=${arg.brdid}&utf8=ok&`;
            //var arg2 = { path: str, type: "boardconfig", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, self: arg.self };
            var form = document.getElementById("boardSetForm");

            if (form.code.value == '')
                return alert('테이블이름을 입력해야됩니다');
            form.dbpath.value = arg.dbpath;
            if (form.listpt_chk.checked == true)
                form.listpt.value = 10;
            else
                form.listpt.value = 0;
            if (form.viewpt_chk.checked == true)
                form.viewpt.value = 10;
            else
                form.viewpt.value = 0;
            if (form.writept_chk.checked == true)
                form.writept.value = 10;
            else
                form.writept.value = 0;
            if (form.datpt_chk.checked == true)
                form.datpt.value = 10;
            else
                form.datpt.value = 0;

            if (form.bctype.value == '')
                form.bctype.value = 'boardView';
            if (form.style.value == '')
                form.style.value = 'table';

            //arg.rendertype = arg.rendertype;
            arg.path = str;
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            //console.log(`eventhandle form.type.value= ${form.type.value} form.dbpath.value= ${form.dbpath.value} form.bctype.value= ${form.bctype.value} form.code.value= ${form.code.value}`);
            arg.self.postAjax(arg);
        } else if (type == 'brddel' || type == 'groupdel') {
            if (!confirm(`${info.key} 게시판설정을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var str = `/manboard.adm?type=list&code=${arg.code}&dbpath=${arg.dbpath}&brdid=${info.brdid}&utf8=ok&`;
            //var arg2 = { path: str, type: "boardconfig", info: info, arg: arg, self: arg.self };
            var form = document.getElementById("boardSetDeleteForm");
            if (form == null) {
                $('body').append(e.data.self.createBoardSetDeleteFormView(info, arg, e.data.self.eventHandler));
                form = document.getElementById("boardSetDeleteForm");
            }

            form.dbpath.value = arg.dbpath;
            form.code.value = info.code;
            form.bctype.value = info.bctype;
            form.uid.value = info.uid;
            form.groupid.value = info.groupid;
            form.brdid.value = info.brdid;
            form.type.value = type;
            //arg2.rendertype = arg.rendertype;
            arg.path = str;
            arg.form = form;
            var formData = $(form).serializeArray();
            arg.formData = formData;

            //console.log(`eventhandle type= ${type} form.dbpath.value= ${form.dbpath.value} info.did= ${info.did} info.fid= ${info.fid}`);
            arg.self.postAjax(arg);
        } else if (type == 'return') {
            //console.log(`arg.self.tostring=${arg.self.tostring}arg.code=${arg.code}arg.brdid= ${arg.brdid}arg.rendertype= ${arg.rendertype}`);
            arg.renderinfo.$parent.getReturnValue('grouplist', arg.dbpath, arg.code, '', arg.rendertype);
            //console.log('return');
            __modal.hide();
           
        } else if (type == 'returngroup') {
            console.log('e.data.groupid=', e.data.groupid);
            arg.renderinfo.$parent.getReturnValue('grouplist', arg.dbpath, arg.code, e.data.groupid, arg.rendertype);
            __modal.hide();
        } else if (type == 'returnboard') {
            //console.log('info.brdid=', info.brdid);
            arg.renderinfo.$parent.getReturnValue('boardlist', arg.dbpath, arg.code, info.brdid, arg.rendertype);
            __modal.hide();
        }

    }

    createBoardSetDeleteFormView(info2, arg, eventHandler) {
        var mo = `<form class="form-horizontal" name="boardSetDeleteForm" id="boardSetDeleteForm" >
                        <input type="hidden" name="code" />
                        <input type="hidden" name="bctype" value="board" />
                        <input type="hidden" name="dbpath" />
                        <input type="hidden" name="type" /><!-- brdadd, groupupdate, brdupdate, groupdel, brddel-->
                        <input type="hidden" name="groupid" />
                        <input type="hidden" name="brdid" />
                        <input type="hidden" name="uid" />
                        <input type="hidden" name="fid" />
                        <input type="hidden" name="did" />
                    </form>`;
        return mo;
    }

    createBoardSetFormView(info2, arg, eventHandler) {
        var mo = `<form name="boardSetForm" id="boardSetForm" onsubmit="return callAjaxBoardCfg(this)">

                                <input type="hidden" name="bctype" value="board" />
                                <input type="hidden" name="dbpath" />
                                <input type="hidden" name="type" /><!-- brdadd, groupupdate, brdupdate, groupdel, brddel-->
                                <input type="hidden" name="groupid" id="groupid" />
                                <input type="hidden" name="brdid" />
                                <input type="hidden" name="listpt" />
                                <input type="hidden" name="viewpt" />
                                <input type="hidden" name="datpt" />
                                <input type="hidden" name="writept" />

                                <div class="messages"></div>

                                <div class="controls" id="groupMakeShow">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="levelchk" class="control-label">테이블:</label>
                                                <div>
                                                    <input type="text" class="form-control" name="code" id="code" value="" placeholder="테이블..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="clearfix"></div>

                                <div class="controls" id="groupMakeShow">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="levelchk" class="control-label">그룹이름:</label>
                                                <div>
                                                    <input type="text" class="form-control" name="groupname" id="groupname" value="" placeholder="그룹이름..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="clearfix"></div>

                                <div class="controls">
                                    <div class="row">


                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="subject" class="control-label">게시판이름:</label>
                                                <div>
                                                    <input type="text" class="form-control" name="brdname" id="brdname" value="" placeholder="게시판이름..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label class="control-label" for="inputSuccess1">아이콘</label>
                                                <div>
                                                    <input id="iconchange_input" type="text" class="form-control" name="icon" value="" placeholder="아이콘....." required />
                                                    <a onclick="JavaScript: openNewWindow('/app/aMvc/html/edit/selectIcon.html?target=iconchange&1234')" data-toggle="modal" type="button" class="btn btn-primary">아이콘</a>
                                                    <a id="iconchange"></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>

                                <div class="controls">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="subject" class="control-label">레코드수:</label>
                                                <div>
                                                    <input type="number" class="form-control" name="pagerecordnum" value="10" placeholder="페이지당 레코드수..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="subject" class="control-label">페이지블록:</label>
                                                <div>
                                                    <input type="number" class="form-control" name="pageblocknum" value="10" placeholder="페이지블록수..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="clearfix"></div>

                                <div class="controls">
                                    <label class="form-check-label" for="inlineCheckbox1">로그인 접근허가 설정</label>
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" name="listpt_chk">
                                                <label class="form-check-label" for="inlineCheckbox1">리스트 보기</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" name="viewpt_chk">
                                                <label class="form-check-label" for="inlineCheckbox1">뷰 보기</label>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div class="clearfix"></div>

                                <div class="controls">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" name="writept_chk">
                                                <label class="form-check-label" for="inlineCheckbox1">글 쓰기</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" name="datpt_chk">
                                                <label class="form-check-label" for="inlineCheckbox1">댓글쓰기</label>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div class="clearfix"></div>

                                <div class="controls">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="subject" class="control-label">게시판뷰클래스:(기본 boardView)</label>
                                                <div>
                                                    <input id="viewtype" type="text" class="form-control" name="bctype" value="" placeholder="boardview....." required />
                                                    
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label class="control-label" for="inputSuccess1">게시판타입:(기본 table)</label>
                                                <div>
                                                    <input id="viewtype" type="text" class="form-control" name="style" value="" placeholder="table....." required />
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>

                                </div>
                                <div class="clearfix"></div>

                                <label for="permittype" class="control-label"></label>


                                <div class="row">

                                    <div class="col-md-12">
                                        <input type="button" id="boardaddBtn"  class="btn btn-warning btn-send" value="전송">
                                        <input type="reset" class="btn btn-warning btn-send" value="리셋">
                                    </div>
                                </div>

                            </form>`;
        
        return mo;
    }

    createBoardGroupSetFormView(info2, arg, eventHandler) {
        var mo = `<form class="form-horizontal" name="groupSetForm" id="groupSetForm" onsubmit="return callAjaxBoardGroup(this)">
                        <input type="hidden" name="code" />
                        <input type="hidden" name="bctype" value="board" />
                        <input type="hidden" name="dbpath" />
                        <input type="hidden" name="type" /><!-- brdadd, groupupdate, brdupdate, groupdel, brddel-->
                        <input type="hidden" name="groupid" />
                        <input type="hidden" name="brdid" />
                        <div class="controls">

                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">

                                        <label for="permittype" class="control-label">그룹</label>
                                        <div class="clearfix"></div>
                                        <div class="form-check form-check-inline ">
                                            <input class="form-check-input" type="radio" name="groupTypeCheck" id="groupTypeCheck11">
                                            <label class="form-check-label" for="inlineCheckbox1">선택한그룹삭제</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="groupTypeCheck" id="groupTypeCheck22">
                                            <label class="form-check-label" for="inlineCheckbox1">선택한그룹 수정</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="clearfix"></div>

                        <div class="controls" id="groupSelShow11">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="permittype" class="control-label">그룹선택:</label>
                                        <div>
                                            <select name="groupsel22" id="groupsel22">
                                                <option value="none">------</option>
                                            </select>
                                            <input type="submit" id="groupDelBtn" class="btn btn-danger btn-send" onclick="callAjaxBoardGroup(this.form)" value="그룹제거">
                                        </div>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="clearfix"></div>

                        <div class="controls" id="groupMakeShow22">

                            <div class="row">

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="levelchk" class="control-label">선택한그룹 수정:</label>
                                        <div>
                                            <input type="text" class="form-control" name="groupname" id="groupname" value="" placeholder="수정할 그룹이름..." required />
                                        </div>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="clearfix"></div>

                        <div class="row">

                            <div class="col-md-12">

                                <input type="button" id="groupaddBtn" class="btn btn-info submit-btns" value="그룹수정">
                            </div>
                        </div>
                    </form>`;
        return mo;
    }

    insertBoardItem(info, arg, eventHandler) {

        var $box = $('<div class="card">');  //ex: box-default box-danger box-warning box-success box-solid
        var $boxHeader = $('<div class="card-header with-border">');
        var $headTitle = $('<h5 class="box-title">').append(info.brdname + "(게시판)");

        var $headRightTool = $('<div class="pull-right form-inline">');

        var $buttonE = $("<button class='btn btn-success btn-sm'>").attr("type", "button").css("float", "right").attr("title", "수정");
        $buttonE.append('<i class="fa fa-fw fa-edit"></i>');
        $buttonE.bind("click", { type: 'boardadd', self: this, brdid: info.brdid, info: info, arg: arg }, this.eventHandler);
        $headRightTool.append($buttonE);
        $buttonE = $("<button class='btn btn-danger btn-sm'>").attr("type", "button").css("float", "right").attr("title", "삭제");
        $buttonE.append('<i class="fa fa-fw fa-trash-o"></i>');
        $buttonE.bind("click", { type: 'brddel', self: this, brdid: info.brdid, info: info, arg: arg }, this.eventHandler);
        $headRightTool.append($buttonE);
        if (arg.renderinfo && arg.renderinfo.returntype === "return") {
            var $buttonE = $("<button type='button' class='btn btn-info'>게시판리턴</button>");
            $buttonE.bind("click", { type: 'returnboard', self: this, info: info, arg: arg }, this.eventHandler);
            $headRightTool.append($buttonE);
        }

        $headTitle.append($headRightTool);
        $boxHeader.append($headTitle);

        var $boxBody = $('<div class="card-body" style="overflow:auto">');

        $box.append($boxHeader).append($boxBody);
        
        var $row = $('<div class="row border mt-1">');

        $boxBody.append($row);

        var $col1 = $('<div class="col-3">');
        var $col2 = $('<div class="col-3">');
        var $col3 = $('<div class="col-3">');
        var $col4 = $('<div class="col-3">');

        var tdE1 = $("<div>").text("테이블:" + info.code);
        var tdE2 = $("<div>").text("그룹:" + info.groupname);
        var tdE3 = $("<div>").text("게시판이름:" + info.brdname);
        var tdE13 = $("<div>").text("게시판아이디:" + info.brdid);
        $col1.append(tdE1).append(tdE2).append(tdE3).append(tdE13);

        var tdE4 = $("<div>").text("페이지수:" + info.pagerecordnum);
        var tdE9 = $("<div>").text("페이지블록수:" + info.pageblocknum);
        $col2.append(tdE4).append(tdE9);

        var tdE5 = $("<div>");
        if (info.listpt > 0)
            $(tdE5).append($("<div>list(o)</div>"));
        else
            $(tdE5).append($("<div>list(x)</div>"));
        if (info.viewpt > 0)
            $(tdE5).append($("<div>view(o)</div>"));
        else
            $(tdE5).append($("<div>view(x)</div>"));
        if (info.writept > 0)
            $(tdE5).append($("<div>write(o)</div>"));
        else
            $(tdE5).append($("<div>write(x)</div>"));
        if (info.datpt > 0)
            $(tdE5).append($("<div>dat(o)</div>"));
        else
            $(tdE5).append($("<div>dat(x)</div>"));

        $col3.append(tdE5);

        var rendertype = $("<div>").text("렌더타입");
        var E9 = $("<div>").text(info.bctype);
        $col4.append(rendertype).append(E9);
        //console.log(`info.bctype=${info.bctype}`);
        
        /** 
        $buttonE = $("<button class='btn btn-info btn-sm' type='button'>리턴</button>").attr("title", "리턴");
        $buttonE.bind("click", { type: 'boardreturn', self: this, brdid: info.brdid, info: info, arg: arg }, this.eventHandler);
        $col5.append($buttonE);
        **/
        $row.append($col1).append($col2).append($col3).append($col4);
        return $box;
    }

    createList(info, arg, eventHandler) {
        
        var loginfo = info.loginfo;
        var codearr = info.codearr;
        var arrarr = info.arrarr;
        var grouparr = info.grouparr;
        this.arg = arg;

        $(arg.elem).empty();

        var $codeE = $('<select name="codesel" id="codesel">');
        $codeE.append(`<option value='...'>.........</option>`);
        var $divE = $('<div class="alert">');
        $divE.append($codeE);
        var $optionE1;
        if (arg.renderinfo && arg.renderinfo.returntype === "return") {
            var $buttonE = $("<button type='button' class='btn btn-info'>전체리턴</button>");
            $buttonE.bind("click", { type: 'return', self: this, info: info, arg: arg }, this.eventHandler);
            $divE.append($buttonE);
        }

        $(arg.elem).append($divE);

        if (!this.codeSelValue)
            this.codeSelValue = arg.code;
        var tempcode = null;
        if (codearr != null && codearr.length >= 0) {
            for (var i = 0; i < codearr.length; i++) {
                //console.log(`this.codeSelValue=' ${this.codeSelValue} this.codearr[i]=' ${codearr[i]}`);
                if (this.codeSelValue == null)
                    $codeE.append(`<option value='${codearr[i]}'>${codearr[i]}</option>`);
                else {
                    if (this.codeSelValue == codearr[i]) {
                        $codeE.append(`<option value='${codearr[i]}' selected>${codearr[i]}</option>`);
                    }
                    else
                        $codeE.append(`<option value='${codearr[i]}'>${codearr[i]}</option>`);
                }

                //$optionE1 = $(`<option value='${codearr[i]}' selected>${codearr[i]}</option>`);
                //$codeE.append($optionE1);
            }

            //if (tempcode == null)
                //$codeE.append(`<option value='${this.codeSelValue}' selected>${this.codeSelValue}</option>`);
        }

        if (grouparr && grouparr.length >= 0) {
            for (var i = 0; i < grouparr.length; i++) {
                grouparr[i].arr = [];
            }
        }
        //console.log(`arrarr.length=${arrarr.length}`);
        if (grouparr && grouparr.length >= 0) {
            for (var i = 0; i < grouparr.length; i++) {
                var item = grouparr[i];
                var b = false;
                for (var j = 0; j < arrarr.length; j++) {

                    if (this.codeSelValue != arrarr[j].code)
                        continue;

                    if (item.groupid == arrarr[j].groupid) {
                        //console.log(`j=${j}`);
                        grouparr[i].arr.push(arrarr[j]);
                    }
                }

            }
        }

        var $temp = $('<div>');

        //console.log(`grouparr.length=${grouparr.length}`);
        if (grouparr && grouparr.length >= 0) {
            for (var k = 0; k < grouparr.length; k++) {
                //cnt++;
                var info2 = grouparr[k];
                var arr = grouparr[k].arr;
                //console.log(`info2.code=${info2.code} this.codeSelValue=${this.codeSelValue}`);
                

                var $img = null;
                if (info2.img) {
                    $img = info2.img;
                } else {
                    //console.log(info.imgsrc);
                    if (info2.imgsrc) {
                        $img = $(`<img src="${info2.imgsrc}" onerror="onImgError(this);" class="mr-3" imgtype="media" width="50" height="50" >`);
                    } else if (info2.iconclass) {
                        $img = $(`<i class="${info2.iconclass}">`);
                    } else {
                        $img = $(` `);
                    }
                }
                //console.log(`arr.length=${arr.length}`);
                var $item = $('<li class="nav-item active">');
                var $treeItem = null;
                if (arr && arr.length > 1) {

                    var $box = $('<div class="card">');  //ex: box-default box-danger box-warning box-success box-solid
                    var $boxHeader = $('<div class="card-header with-border">');
                    var $headTitle = $('<h5 class="box-title">').append(arr[0].groupname + "(그룹)");

                    var $headRightTool = $('<div class="pull-right form-inline">');

                    var $btn = $('<button class="btn btn-outline-info home-make-btns" type="submit">게시판추가</button>');
                    $btn.bind("click", { type: 'boardadd', self: this, info: info2, arg: arg }, this.eventHandler);
                    $headRightTool.append($btn);
                    $btn = $('<button class="btn btn-outline-info home-make-btns" id="boxdel">x</button>');
                    $btn.bind("click", { type: 'groupdel', self: this, groupid: arr[0].groupid, info: info2, arg: arg }, this.eventHandler);
                    $headRightTool.append($btn);

                    if (arg.renderinfo && arg.renderinfo.returntype === "return") {
                        var $buttonE = $("<button type='button' class='btn btn-info'>그룹리턴</button>");
                        $buttonE.bind("click", { type: 'returngroup', self: this, groupid: arr[0].groupid, info: info, arg: arg }, this.eventHandler);
                        $headRightTool.append($buttonE);
                    }

                    $headTitle.append($headRightTool);
                    $boxHeader.append($headTitle);

                    var $boxBody = $('<div class="card-body" style="overflow:auto">');

                    //$boxBody.append(this.insertBoardItem(arr[0]));


                    $box.append($boxHeader).append($boxBody);


                    var $mainul = $('<ul class="dropdown-menu">');
                    for (var i = 0; i < arr.length; i++) {
                        var info3 = arr[i];
                        var arr2 = arr[i].arr;

                        var $img = null;
                        if (info3.img) {
                            $img = info3.img;
                        } else {
                            //console.log(info.imgsrc);
                            if (info3.imgsrc) {
                                $img = $(`<img src="${info3.imgsrc}" onerror="onImgError(this);" class="mr-1" imgtype="menu" width="20" height="20" >`);
                            } else if (info3.iconclass) {
                                $img = $(`<i class="${info3.iconclass}">`);
                            } else {
                                $img = $(` `);
                            }
                        }

                        var strinfo = info3.strinfo;

                        $boxBody.append(this.insertBoardItem(info3, arg, eventHandler));
                    }
                    $temp.append($box);
                    //this.arrTopMenu($item, arr, arg, eventHandler);

                } else if (arr && arr.length == 1) {
                    //console.log(`arrarr.length=${arrarr.length} info2.brdname=${info2.brdname}`);
                    
                    var $box = $('<div class="card">');  //ex: box-default box-danger box-warning box-success box-solid
                    
                    var $boxHeader = $('<div class="card-header with-border">');
                    var $headTitle = $('<h5 class="box-title">').append(arr[0].groupname);

                    var $headRightTool = $('<div class="pull-right form-inline">');
                    
                    var $btn = $('<button class="btn btn-outline-info home-make-btns" type="submit">게시판추가</button>');
                    $btn.bind("click", { type: 'boardadd', self: this, info: info2, arg: arg }, this.eventHandler);
                    $headRightTool.append($btn);
                    $btn = $('<button class="btn btn-outline-info home-make-btns" id="boxdel">x</button>');
                    $btn.bind("click", { type: 'groupdel', self: this, groupid: arr[0].groupid, info: info2, arg: arg }, this.eventHandler);
                    $headRightTool.append($btn);
                    if (arg.renderinfo && arg.renderinfo.returntype === "return") {
                        var $buttonE = $("<button type='button' class='btn btn-info'>그룹리턴</button>");
                        $buttonE.bind("click", { type: 'return', self: this, groupid: arr[0].groupid, info: info2, arg: arg }, this.eventHandler);
                        $headRightTool.append($buttonE);
                    }

                    $headTitle.append($headRightTool);
                    $boxHeader.append($headTitle);

                    var $boxBody = $('<div class="card-body" style="overflow:auto">');
                    
                    $boxBody.append(this.insertBoardItem(arr[0], arg, eventHandler));

                    
                    $box.append($boxHeader).append($boxBody);

                    $temp.append($box);
                }
                
                
            }
        }
       
        $(arg.elem).append($temp);

        var $divE = $('<div class="alert">');

        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("그룹추가");
        $buttonE.bind("click", { type: 'groupadd', self: this, info: info, arg: arg }, this.eventHandler);

        $divE.append($buttonE);

        $(arg.elem).append($divE);
        //console.log(`$(arg.elem)=${$(arg.elem)}`);
        return $temp;
    }
}

class SummerNoteSet {
    constructor(id) {
        this.summernoteSetting(id)
    }

    insertNode() {
        var HTMLstring = '<div><p>Hello, world</p><p>Summernote can insert HTML string</p></div>';
        $('.summernote').summernote('pasteHTML', HTMLstring);
        retrn;
        //***
        var tinfo = {};
        tinfo.dragok = "ok";
        tinfo.boxtype = "box-default box-solid";
        tinfo.rendertype = "general";
        erpSelValue = $("#erpSelect option:selected").val();
        erpSelValue = $("#erpSelect option:selected").val();
        //tinfo.remove_btn = "ok";
        tinfo.collapse_btn = "ok";
        var node = createBox(tinfo);
        alert("node");
        ///***/
        $('.summernote').summernote('insertNode', node[0]);
        // invoke insertText method with 'hello' on editor module.
        context.invoke('editor.insertText', 'hello');

        $('.summernote').summernote('insertNode', $('<div>abchhhhhhhhhhhhhhhdefg</div>')[0]);
    }

    summernoteSetting(id) {
        var YoutubeButton = function (context) {
            var ui = $.summernote.ui;

            // create button
            var button = ui.button({
                contents: '<i class="fa fa-youtube"></i> 유튜브',
                tooltip: '유튜브',
                click: function () {
                    //alert("node");
                    //var node = document.createElement('div');
                    //node.appendChild(document.createTextNode("abc"));
                    //var node = $('<div>');
                    //node.text('abcdefghijk');
                    //***
                    

                    var inputString = prompt('유튜브 영상아이디입력', '유튜브 동영상 아이디');
                    if (!inputString)
                        return;
                    var ytag = $(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${inputString}?autoplay=1&mute=1&controls=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
                    
                    $('#summernote').summernote('insertNode', ytag[0]);
                    // invoke insertText method with 'hello' on editor module.
                    //context.invoke('editor.insertText', 'hello');

                    //$('#summernote').summernote('insertNode', $('<div>abchhhhhhhhhhhhhhhdefg</div>')[0]);
                    //return;
                }
            });

            return button.render();   // return button as jquery object
        };
        var PdfButton = function (context) {
            var ui = $.summernote.ui;

            // create button
            var button = ui.button({
                contents: '<i class="fa fa-youtube"></i> pdf',
                tooltip: 'PDF',
                click: function () {
                    //alert("node");
                    //var node = document.createElement('div');
                    //node.appendChild(document.createTextNode("abc"));
                    //var node = $('<div>');
                    //node.text('abcdefghijk');
                    //***


                    var inputString = prompt('pdf 경로 입력', 'pdf 경로');
                    if (!inputString)
                        return;
                    var str = `<p>브라우저가 pdf 를 지원하지않거나 pdf 파일을 찿을수없습니다</p>`;
                    var pdftag = $(`<object type="application/pdf" data="${inputString}" width="560" height="315" >${str}</object>`);

                    $('#summernote').summernote('insertNode', pdftag[0]);
                    // invoke insertText method with 'hello' on editor module.
                    //context.invoke('editor.insertText', 'hello');

                    //$('#summernote').summernote('insertNode', $('<div>abchhhhhhhhhhhhhhhdefg</div>')[0]);
                    //return;
                }
            });

            return button.render();   // return button as jquery object
        };
        var self = this;
        id = '#' + id;
        $(id).summernote({
            toolbar: [
                ['mybutton', ['youtube', 'pdf']],
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
                youtube: YoutubeButton,
                pdf: PdfButton
            },
            height: 300,
            minHeight: null,
            maxHeight: null,
            focus: true/**,
            callbacks: {
                onImageUpload: function (files, editor, welEditable) {
                    for (var i = files.length - 1; i >= 0; i--) {
                        self.summernoteSendFile(files[i], this);
                    }
                }
            }**/
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
}

class CodeMirrorSet {
    constructor(id) {
        this.codemirrorEditor;
        this.codemirrorSetting(id)
    }

    insertCodeMirrorText(data) {
        this.codemirrorEditor.setValue("");
        this.codemirrorEditor.clearHistory();
        //var cm = $("#codemirror")[0].CodeMirror;
        var doc = this.codemirrorEditor.getDoc();

        var cursor = doc.getCursor(); // gets the line number in the cursor position
        var line = doc.getLine(cursor.line); // get the line contents
        var pos = {
            line: cursor.line
        };
        if (line.length === 0) {
            // check if the line is empty
            // add the data
            doc.replaceRange(data, pos);
        } else {
            // add a new line and the data
            doc.replaceRange("\n" + data, pos);
        }
    }

    appendCodeMirrorText(data) {
        var doc = this.codemirrorEditor.getDoc();

        var cursor = doc.getCursor(); // gets the line number in the cursor position
        var line = doc.getLine(cursor.line); // get the line contents
        var pos = {
            line: cursor.line
        };
        if (line.length === 0) {
            // check if the line is empty
            // add the data
            doc.replaceRange(data, pos);
        } else {
            // add a new line and the data
            doc.replaceRange("\n" + data, pos);
        }
    }

    codemirrorSetting(id) {
        var te = document.getElementById(id);

        this.codemirrorEditor = CodeMirror.fromTextArea(te, {
            mode: {
                name: "text/javascript", //python css 
                version: 3,
                singleLineStringErrors: false
            },
            lineNumbers: true,
            indentUnit: 4,
            extraKeys: { //Ctrl-Space 키를누르면 CodeMirror.commands.autocomplete 실행한다
                "Ctrl-Space": "autocomplete"
            },
            matchBrackets: true
        });

        this.codemirrorEditor.on('inputRead', function onChange(editor, input) {
            console.log(input.text[0]);
            if (input.text[0] === ';' || input.text[0] === ' ' || input.text[0] === ":") {
                return;
            }
            //editor.showHint({
            //hint: CodeMirror.pythonHint
            //});
        });

        CodeMirror.commands.autocomplete = function (cm) {
            console.log(cm);
            var doc = cm.getDoc();
            var pos = doc.getCursor();
            var mode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(pos).state).mode.name;
            console.log(mode);
            if (mode == "xml") {
                CodeMirror.showHint(cm, CodeMirror.hint.html);
            } else if (mode == "javascript") {
                CodeMirror.showHint(cm, CodeMirror.hint.javascript);
            } else if (mode == "css") {
                CodeMirror.showHint(cm, CodeMirror.hint.css);
            }
            //CodeMirror.simpleHint(cm, CodeMirror.pythonHint);
        }
    };

}

class BoardTableView extends ViewBase {
    constructor() {
        super();
        var el = document.getElementById('boardContextMenu');
        if (!el) {
            var ul = $('<ul id="boardContextMenu" class="dropdown- menu" role="menu" style="display:none">');
            var li1 = $('<li style="list-style:none"><a tabindex="-1" href="#">쪽지보내기</a></li>');
            var li2 = $('<li style="list-style:none"><a tabindex="-1" href="#">지난글보기</a></li>');
            var li3 = $('<li style="list-style:none"><a tabindex="-1" href="#">rtc요청</a></li>');
            var li4 = $('<li style="list-style:none"><a tabindex="-1" href="#">폴더생성</a></li>');
            var li5 = $('<li style="list-style:none"><a tabindex="-1" href="#">삭제</a></li>');
            ul.append(li1).append(li2).append(li3).append(li4).append(li5);
            $('body').append(ul);
        }
        
    }

    eventHandler(e) {
        var type = e.data.type;
        var self = e.data.self;
        if (type == 'jjocjyformSubmit') {
            alert('jjocjyformSubmit');
            var form = document.getElementById("jjocjyForm");
            form.sendid.value = e.data.sendid;
            form.receiveid.value = e.data.receiveid;

            //console.log('form^********************************=' + form);
            var arg2 = { type: "jjocjylist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, rendertype: arg.rendertype, self: arg.self };

            arg2.form = form;
            var formData = $(form).serializeArray();

            arg2.formData = formData;
            var str = "/jjocjy.member?jjocjytype=add&code=" + e.data.code + "&dbpath=" + e.data.dbpath + "&utf8=ok&";
            arg2.path = str;
            console.log('jjocjyformSubmit arg2.path=' + arg2.path);
            arg.self.postAjax(arg2);
        }
    }

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
        var b = new CardItem();
        var $box = b.createCardItem(writeinfo);

        //this.summernoteSetting(arg.comment);
        return $writebox;
        //return $box;
    };

    createList(info2, arg, eventHandler) {
        //console.log(`createTableBoardView^arg********arg.code=${arg.code}*****************arg=*******=${arg}`);
        var loginfo = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 60%'>").text("제 목");
        var thE3 = $("<th style='width: 10%'>").text("아이디");
        var thE4 = $("<th style='width: 10%'>").text("작성일");
        var thE5 = $("<th style='width: 5%'>").text("조회");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글쓰기");
        $buttonE.bind("click", { type: 'boardwrite', self: this, info: info, arg: arg }, eventHandler);
        $(tdE).append($buttonE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "5");
        $(trE).append(tdE);
        $(tFootE).append(trE);

        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new BoardFindView();
        f.createFindView(info2, arg, eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                if (arr != null && arr.length > 0) {

                } else {
                    var trE = $("<tr>");
                    var tdE1 = $("<td>").text(info.uid);
                    var tdE2 = $("<td>");
                    //tdE2.text(retext + info.subject).css("text-overflow", "ellipsis");
                    tdE2.text(info.subject).css("text-overflow", "ellipsis");
                    //alert("createBoardList tdE2.html() " + tdE2.html());
                    var tdE3 = $("<td>").text(info.id);
                    {
                        tdE3.attr('code', arg.code);
                        tdE3.attr('id', info.id);
                        tdE3.attr('loginid', loginfo.sid);
                        tdE3.attr('path', arg.dbpath);
                        tdE3.addClass('board_context_menu');
                        //console.log('tdE3.addClass^this.setBoardContextMenu*******************************=');
                    }
                    
                    var tdE4 = $("<td>").text(info.signdate);
                    var tdE5 = $("<td>").text(info.ref);

                    $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);
                    $(tBodyE).append(trE);
                    //console.log(`createTableBoardView^arg********arg.code=${arg.code}*****************arg=*******=${arg}`);
                    $(tdE2).bind("click", { type: 'boardrecord', info: info, loginfo: loginfo, self: this, arg: arg }, eventHandler);
                    $(tdE2).attr('style', 'cursor:pointer;cursor: hand;');

                    //this.setBoardContextMenu('.board_context_menu');
                }
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($tableE);
        //console.log('createTableBoardView^this.setBoardContextMenu*******************************=' );
        this.setBoardContextMenu('.board_context_menu');
        return $tableE;
    }

    createJjocjyFormView() {
        var mo = `<form id="jjocjyForm" method="post" class="form-horizontal">
                            <input type="hidden" name="code">
                            <input type="hidden" name="dbpath">
                            <input type="hidden" name="uid">
                            <input type="hidden" name="getid">
                            <input type="hidden" name="jjocjytype" value="add">
                            <div class="form-group">
                                <input type="text" name="subject" id="sendid" class="form-control" readonly>
                            </div>
                            <div class="form-group">
                                <input type="text" name="subject" id="subject" class="form-control" placeholder="제목">
                            </div>
                            <div class="form-group">
                                <textarea cols="40" rows="7" name="memo1" id="summernote" class="form-control jqte-edit" placeholder="내 용..." required="" autofocus="" type="text"></textarea>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-info brdupdate" id="jjocjyformSubmit">쪽지전송</button>
                            </div>
                        </form>`;
        return mo;
    }

    setBoardContextMenu(id) {
        //console.log('setBoardContextMenu id=4444447777777777' + id);
        var self = this;
        $(id).contextMenu({
            selector: '.left',
            trigger: 'left',
            menuSelector: "#boardContextMenu",
            menuSelected: function (invokedOn, selectedMenu) {
                //alert("invokedOn.text()" + invokedOn.text());
                var ip = invokedOn.attr('ip');
                var loginid = invokedOn.attr('loginid');
                //var id = invokedOn.attr('id');
                var id = invokedOn.text();

                if (selectedMenu.text() == "쪽지보내기") {
                    if (loginid == null || loginid == undefined)
                        return alert('회원전용기능입니다');
                    var formview = self.createJjocjyFormView();
                    __modal.show('쪽지보내기', formview);
                    $('#jjocjyformSubmit').bind("click", { type: 'jjocjyformSubmit', dbpath: invokedOn.attr('path'), sendid: loginid, receiveid: id }, self.eventHandler);
                } else if (selectedMenu.text() == "지난글보기") {
                    this.sendExile(id);
                }
                else if (selectedMenu.text() == "rtc요청") {

                }
                else if (selectedMenu.text() == "폴더생성") {

                }

            }
        });

    }
}

class BoardView extends ViewBase {
    constructor() {
        super();
        var el = document.getElementById('boardContextMenu');
        if (!el) {
            var ul = $('<ul id="boardContextMenu" class="dropdown- menu" role="menu" style="display:none">');
            var li1 = $('<li style="list-style:none"><a tabindex="-1" href="#">쪽지보내기</a></li>');
            var li2 = $('<li style="list-style:none"><a tabindex="-1" href="#">지난글보기</a></li>');
            var li3 = $('<li style="list-style:none"><a tabindex="-1" href="#">rtc요청</a></li>');
            var li4 = $('<li style="list-style:none"><a tabindex="-1" href="#">폴더생성</a></li>');
            var li5 = $('<li style="list-style:none"><a tabindex="-1" href="#">삭제</a></li>');
            ul.append(li1).append(li2).append(li3).append(li4).append(li5);
            $('body').append(ul);
        }

    }

    getReturnValue() {
        var type, value;
        var arg = Array.prototype.slice.call(arguments);
        if (arg && arg[0])
            type = arg[0];
        else
            return;
        if (arg && arg[1])
            value = arg[1];
        console.log(`getReturnValue type==${type}`);
        //_tempCount++;
        var info = {};
        if (type == 'icon' || type == 'image') {
            var form = document.getElementById("boardpostform");
            //console.log('form^********************************=' + form);
            form.path.value = 'image=' + value;
            form.imageinput.value = 'image=' + value;
            $('#btnimg').attr('src', value);
            //$('#iconchange_input').val(type + ':' + value);
            __modal.hide();
        } else if (type == 'audio') {
            $('#playerA').attr('src', value);
            var player = document.getElementById('playerA');
            player.play();
            __modal.hide();
        } else if (type == 'video') {
            $('#playerV').attr('src', value);
            var player = document.getElementById('playerV');
            player.play();
            __modal.hide();
            //console.log(value);
        }
    }

    eventHandler(e) {
        //console.log("eventHandler(e) type =33333333333= ");
        var info = e.data.info;
        var arg = e.data.arg;
        var self = e.data.self;
        var type = e.data.type;
        
        //console.log('type*****=' + type);
        if (type == 'boardrecord') {
            //console.log("eventHandler(e)============= str == " + str);
            //__fullscreenView.setContent(arg.elem);
            //__fullscreenView.fullscreen('fullscreenwin');
            var str = "/view.board?code=" + arg.code + "&page=" + arg.page + "&uid=" + info.uid + "&fid=" + info.fid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&utf8=ok&";
            //console.log("eventHandler(e) boardlist ============= str == " + str);
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
        } else if (type == 'imgselBtn') {
            var targetChild = e.target.querySelector('#btnimg');
            console.log(self);
            var c = new FileController({ type: 'filelist', code: 'root', filetype: 'file', path: '/files/media/images/icons/', filter: 'image', returntype: 'return', $parent: self });
            var elem = document.createElement('div');
            c.renderController(elem);
            __modal.show(`보기`, elem);

        } else if (type == 'boardpost') {
            var form = document.getElementById(e.data.formid);
            
            //console.log('arg.renderinfo.tabthread*************=' + arg.renderinfo.tabthread);
            //console.log('info.key**=' + info.key);
            if (arg.renderinfo.thread) {
                form.thread.value = arg.renderinfo.thread;
            }
            arg.type = 'boardlist';
            arg.form = form;
            //form.path.value = 'image=' + form.imageinput.value;
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
            if (arg.renderinfo.viewtype == 'paintthumbnail') {
                location.href = `/html/admin/edit/da-paintForm.html?dbpath=${arg.dbpath}&code=${arg.code}&brdid=${arg.brdid}&utf8=ok`;
                return;
            } else if (arg.renderinfo.viewtype == 'homemake') {
                location.href = `/html/admin/edit/homemakeForm.html?dbpath=${arg.dbpath}&code=${arg.code}&brdid=${arg.brdid}&utf8=ok`;
                return;
            } else {
                window._fullscreen = new FullScreenView();
                window._fullscreen.setContent(`글쓰기`, e.data.self.createBoardFormView(info, arg, e.data.self.eventHandler));
                //__modal.show('글쓰기', e.data.self.createBoardFormView(info, arg, e.data.self.eventHandler));
                new SummerNoteSet('summernote');
            }
            console.log('글쓰기**=');
            
        } else if (type == 'webmakeboardwrite') {
            location.href = `/html/admin/edit/homebmakeForm.html?dbpath=${arg.dbpath}&code=${arg.code}&brdid=${arg.brdid}&utf8=ok`;
            return;
            var f = new FullScreenView();
            f.setContent(`보기`, e.data.self.createPaintBoardFormView(info, arg, e.data.self.eventHandler));

            var elem = document.getElementById('fabricElem');
            //elem.style.width = '100%';
            //elem.style.height = 777;
            console.log(elem);
            var fb = new FabricBase({ elem: elem });
        } else if (type == 'addpoint' || type == "minuspoint") {
            var str = "/view.board?posttype=addpoint&code=" + arg.code + "&point=" + e.data.point + "&uid=" + e.data.uid + "&fid=" + e.data.fid + "&dbpath=" + arg.dbpath + "&brdid=" + e.data.brdid + "&";
            console.log(` handle addpoint str=${str}********=`);
            //var arg2 = { path: str, type: "viewbody", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.path = str;
            arg.type = 'viewbody';
            arg.self.listAjax(arg);
        } else if (type == 'adddatpoint' || type == "minusdatpoint") {
            var str = "/view.board?posttype=addpoint&addtype=dat&code=" + arg.code + "&point=" + e.data.point + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&fid=" + e.data.fid + "&dbpath=" + arg.dbpath + "&brdid=" + e.data.brdid + "&";
            console.log(` handle addpoint str=${str}********=`);
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
            //form.path.value = 'image=' + form.image.value;
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
            console.log(` handle datpost arg.path=${arg.path}**** arg.type=${arg.type}****************************=`);
            arg.self.postAjax(arg);
        } else if (type == 'boardfind') {
            var keyfield = $("#findform option:selected").val();
            var key = $("#findform input[name=key]").val();
            //if (keyfield == "subject" || keyfield == "comment")
                //key = Base64.encode(key);

            var str = "/list.board?code=" + arg.code + "&page=1&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&keyfield=" + keyfield + "&key=" + key + "&";
            console.log(' handle find str********************************=' + str);
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
            
            var str = "/jjocjy.member?jjocjytype=add&posttype=post&code=jjocjy&dbpath=config.dadb&utf8=ok&";

            var formdata = $(form).serializeArray();
            console.log("str=======" + str);
            //var b64 = Base64.encode(form.info.value);
            //formData = self.selectedLenderCon.changeSerialize(formData, 'info', b64);
            // arg.formData = formData;
            __modal.hide();
            __saveFileData({ path: str, formdata: formdata });
        } else if (type == 'jjocjyviewbody') {
        } else if (type == 'pollwrite') {
            __modal.show('설문만들기', e.data.self.createPollMakeView(info, arg, arg.self.eventHandler));
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
        $writeForm.append('<input type="hidden" name="path" />');

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
        var $writeInput = $('<input type="datetime-local" name="time" class="form-control" placeholder="subject">').val(arg.subject);
        var $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);

        var $writeLabel = $('<label for="subject" class="col-sm-2 control-label">간편설문</label>');
        var $writeInput = $('<input type="text" name="com" class="form-control" placeholder="subject">').val(arg.subject);
        var btn1 = $('<button type="button" class="btn btn-light brdupdate" >설문작성</button>');
        $(btn1).bind("click", { type: 'pollwrite', formid: 'boardpostform', self: this, info: info, arg: arg }, this.eventHandler);
        var $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput).append(btn1);
        $writeForm.append($formGroup);

        var $writeInput = $('<input type="text" name="imageinput" id="imageinput" class="form-control" placeholder="아이콘 이미지 썸네일 경로 ...">').val(arg.subject);
        var btn1 = $('<button type = "button" class="btn" id="ImgselBtn" ><img id="btnimg" src="" alt="">이미지선택</button >');
        $(btn1).bind("click", { type: 'imgselBtn', self: this, info: info, arg: arg }, this.eventHandler);
        var $formGroup = $('<div class="form-group form-inline">').append($writeInput).append(btn1);
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

    createPaintBoardFormView(info, arg, eventHandler) {

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

        var $writeLabel = $('<label for="subject" class="col-sm-2 control-label">제목</label>');
        var $writeInput = $('<input type="text" name="subject" class="form-control" placeholder="subject">').val(arg.subject);
        var $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);

        $writeLabel = $('<label for="subject" class="col-sm-2 control-label">요약</label>');
        $writeInput = $('<textarea type="text" name="summary" class="form-control" placeholder="summary">').val(arg.summary);
        $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);

        $writeLabel = $('<label for="comment" class="col-sm-4 control-label"></label>').text('내용');
        $writeInput = $('<div id="fabricElem" style="border: 2px solid black; width:100%; height: 100%; "></div>');
        $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
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

    createGroupList(info7, arg, eventHandler) {

        var loginfo = info7.loginfo;
        var arrarr = info7.arrarr;
        var grouparr = info7.grouparr;
        //console.log(`info2grouparr=${info7.grouparr}`);
        var $temp = $('<div>');
        var head = `<div class="alert alert-dark" role="alert">
                      ${info7.title ?? "title"}
                    </div>`;
        $temp.append(head);
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                //console.log('createGroupBoardView info.bctype====' + info.bctype);
                if (info.bctype && info.bctype == 'table2') {
                    this.createTableList(info2, arg, eventHandler);
                } else if (info.bctype && info.bctype == 'thumbnail') {

                } else if (info.bctype && info.bctype == 'media') {

                } else if (info.bctype && info.bctype == 'timeline') {

                } else if (info.bctype && info.bctype == 'carousel') {

                } else {
                    var tableE = $('<table class="table table-hover table-striped">');
                    if (arg.cls) {
                        var cls = 'table-' + arg.cls;
                        tableE.addClass(cls);
                    }

                    //var tHeadE = $("<thead>");

                    var tBodyE = $("<tbody>");
                    var tFootE = $("<tfoot>");

                    //$(tableE).append(tHeadE);
                    $(tableE).append(tFootE);
                    $(tableE).append(tBodyE);

                    var trE = $("<tr>");
                    var tdE = $("<td>").attr("colspan", "5");
                    $(trE).append(tdE);
                    $(tFootE).append(trE);

                    if (arr != null && arr.length > 0) {

                        for (var j = 0; j < arr.length; j++) {

                            var info2 = arr[j];

                            var trE = $("<tr>");

                            var tdE1 = $("<td>").text(info2.subject);
                            //var tdE2 = $("<td>").text(subject).css("text-overflow", "ellipsis");
                            //var tdE3 = $("<td>").text(id);
                            //var tdE4 = $("<td>").text(signdate);
                            //var tdE5 = $("<td>").text(ref);

                            $(trE).append(tdE1);  //.append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                            $(tBodyE).append(trE);
                            $(trE).bind("click", { type: 'boardrecord', info: info2, loginfo: loginfo, self: this, arg: arg }, this.eventHandler);
                            $(trE).attr('style', 'cursor:pointer;cursor: hand;');
                        }

                    } else {
                        var trE = $("<tr>");

                        var tdE1 = $("<td>").text('레코드가 없습니다');
                        //var tdE2 = $("<td>").text(subject).css("text-overflow", "ellipsis");
                        //var tdE3 = $("<td>").text(id);
                        //var tdE4 = $("<td>").text(signdate);
                        //var tdE5 = $("<td>").text(ref);
                        //alert('ggg �ѱ��׽�Ʈ');
                        $(trE).append(tdE1);  //.append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                        $(tBodyE).append(trE);

                    }

                    var info5 = {};
                    info5.coltype = "col-sm-6";  //box-default box-danger box-warning box-success box-solid
                    //info.boxtype = "col";
                    info5.rendertype = "general";
                    info5.collapse_btn = "ok";
                    info5.title = info.brdname;
                    var btn = $('<button type="button" class="btn btn-default" >더보기...</button>');
                    info5.customer_btn1 = btn;
                    //console.log('info.brdid====' + info.brdid);
                    arg.brdid = info.brdid;
                    $(btn).bind("click", { type: 'more', info: info, loginfo: loginfo, self: this, arg: arg }, this.eventHandler);
                    $(btn).attr('style', 'cursor:pointer;cursor: hand;');
                    info5.comment = tableE;

                    var card = new CardItem();
                    //alert("info.brdname:" + info.brdname);
                    $temp.append(card.createCardItem(info5));
                }
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        if (!this.topmenu) {
            if (grouparr && grouparr.length == 1) {
                var $tabelem = $('<div>');
                $(arg.elem).before($tabelem);
                arg.$tabelem = $tabelem;
                this.topmenu = new TabMenuView();
                this.topmenu.createGroupBoardTabMenu(info7, arg, eventHandler);
            } else if (grouparr && grouparr.length >= 1) {
                this.topmenu = new TopMenuView();
                arg.topelem = el;
                this.topmenu.createBoardTopMenu(info7, arg, eventHandler);
            }
            //console.log('createList $(arg.elem).parent().html()==' + $(arg.elem).parent().html());
        }

        var el = document.getElementById("main_side_board_menu");
        //console.log(`$(arg.elem).html()=${$(arg.elem).html()} `);
        if (el) {
            //$(el).empty();
            //console.log(`info7.grouparr=${info7.grouparr}`);
            if (this.sidemenu == null)
                this.sidemenu = new SideMenuView();
            arg.sideelem = el;
            this.sidemenu.createBoardSideMenu(info7, arg, eventHandler);
        }


        //alert($temp.html());
        return $temp;
    }

    createCarouselList(info2, arg, eventHandler) {
        var info = info2;
        var loginfo = info.loginfo;
        var arrarr = info.arrarr;
        var grouparr = info.grouparr;

        var carousel = $(`<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel"></div>`);
        //console.log($(arg.elem).html());
        var carousel_indicator = $(`<ol class="carousel-indicators"></ol>`);
        var carouselItem = $(`<div class="carousel-inner"></div>`);
        var btn1 = $(`<button class="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </button>`);
        var btn2 = $(`<button class="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </button>`);

        carousel.append(carousel_indicator, carouselItem, btn1, btn2);
        console.log(`arrarr.length=${arrarr.length}`);
        if (arrarr && arrarr.length >= 0) {
            for (var k = 0; k < arrarr.length; k++) {

                var info = arrarr[k];
                if (info.did == -7)
                    continue;

                var indiitem = $(`<li data-target="#carouselExampleCaptions" data-slide-to="${k}" class=""></li>`);
                carousel_indicator.append(indiitem);

                var item = $(`<div class="carousel-item">
                        </div>`);

                if (k == 0) {
                    indiitem.addClass("active");
                    item.addClass("active");
                }
                //console.log(`k=${k}`);
                var $img = null;
                if (info.img) {
                    $img = info.img;
                } else {
                    //console.log(info.imgsrc);
                    if (info.imgsrc) {
                        $img = $(`<img src="${info.imgsrc}" onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel">`);
                    } else if (info.iconclass) {
                        $img = $(`<i class="${info.iconclass}">`);
                    } else {
                        $img = $(`<img src="..." onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel" >`);
                    }
                }
                item.append($img);
                //console.log(`$img=${$img.parent().html()}`);
                var cap = null;
                if (info.caption) {
                    cap = $(`<div class="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>`);
                    item.append(cap);
                }
                carouselItem.append(item);
            }
        }


        $(arg.elem).empty();
        $(arg.elem).append($(carousel));

        var $buttonE = $("<input type='button' class='btn btn-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글쓰기");
        $buttonE.bind("click", { type: 'boardwrite', self: this, info: info, arg: arg }, eventHandler);
        var $writeDiv = $('<div>');
        $($writeDiv).append($buttonE);
        $(arg.elem).append($writeDiv);

        //console.log($(arg.elem).html());
        return $(carousel);
    }

    createPaintThumbnailItem(info, arg, eventHandler) {
        var strTag;
        var $boxcol = $('<div class="col mb-8">');
        var $box = $('<div class="card">');  //ex: box-default box-danger box-warning box-success box-solid
        $boxcol.append($box);
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
        if (info.thumbnail) {
            $img = $('<div style="width:100%; height:100%;">');
            info.fabelem = $img;
        } 

        //alert("icon" + $boxHeader.html());
        $boxBody = $('<div class="card-body" style="overflow:auto">').css("display", info.display).attr("id", info.boxbodyid);

        if (info.subject) {
            var $bodySubject = $('<h4 class="card-title">').append(info.subject);
            $boxBody.append($bodySubject);
        }
        
        if (info.append) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.append);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $box.append($img).append($boxBody);

        //alert("$box.html()" + $box.html());
        return $boxcol;
    }

    createThumbnailItem(info, arg, eventHandler) {
        var strTag;
        var $boxcol = $('<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">');
        var $box = $('<div class="card">');  //ex: box-default box-danger box-warning box-success box-solid
        $boxcol.append($box);
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
        var value = __keyvalueSplitString(info.path);
        console.log(`info.path=${info.path}`);
        if (value && value.image) {
            //value.image = value.image.replace('//', '/');
            var $img = $(`<img src="${value.image}" onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel">`);
            
        } else
            $img = $(`<img src="..." onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel">`);

        if (value && value.icon) {
            var $img = $(`<i class="${value.icon}">`);
            //item.append($img);
            //item.append($img);
        }

        //alert("icon" + $boxHeader.html());
        $boxBody = $('<div class="card-body" style="overflow:auto">').css("display", info.display).attr("id", info.boxbodyid);

        if (info.subject) {
            var $bodySubject = $('<h4 class="card-title">').append(info.subject);
            $boxBody.append($bodySubject);
        }

        if (info.append) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.append);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $box.append($img).append($boxBody);

        //alert("$box.html()" + $box.html());
        return $boxcol;
    }

    createThumbnailItemR = function (info, arg, eventHandler) {
        var strTag;
        var $boxcol = $('<div class="col mb-8">');

        var $imageflip = $('<div class="drag image-flip" ontouchstart="this.classList.toggle(\'hover\');">');
        $boxcol.append($imageflip);

        var $mainflip = $('<div class="mainflip">');
        var $frontside = $('<div class="frontside">');
        var $backside = $('<div class="backside">');

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
        var value = __keyvalueSplitString(info.path);
        console.log(`info.path=${info.path}`);
        if (value && value.image) {
            //value.image = value.image.replace('//', '/');
            $img = $(`<img src="${value.image}" onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel">`);
            
        } else 
            $img = $(`<img src="..." onerror="onImgError(this);" class="card-img-top mr-3" imgtype="carousel">`);

        if (value && value.icon) {
            $img = $(`<i class="${value.icon}">`);
        }
        //alert("icon" + $boxHeader.html());
        $boxBody = $('<div class="card-body" style="overflow:auto">').css("display", info.display).attr("id", info.boxbodyid);

        if (info.subject) {
            var $bodySubject = $('<h4 class="card-title">').append(info.subject);
            $boxBody.append($bodySubject);
        }

        if (info.append) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.append);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $box.append($img).append($boxBody);
        $frontside.append($box);


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
        
        //alert("icon" + $boxHeader.html());
        $boxBody = $('<div class="card-body" style="overflow:auto">');

        if (info.subject) {
            var $bodySubject = $('<h4 class="card-title">').append(info.subject);
            $boxBody.append($bodySubject);
        }

        if (info.summary) {
            var $bodysummary = $('<h4 class="card-title">').append(info.summary);
            $boxBody.append($bodysummary);
        }

        if (info.append) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.append);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $box.append($boxBody);
        $backside.append($box);

        $mainflip.append($frontside).append($backside);
        $imageflip.append($mainflip);
        //alert("$box.html()" + $box.html());
        return $boxcol;
    }

    createThumbnailList(info2, arg, eventHandler) {

        var loginfo = info2.loginfo;
        var arrarr = info2.arrarr;
        var grouparr = info2.grouparr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        var thumbnailE = $(`<div class="row ">
                        </div>`);
        $temp.append(thumbnailE);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];
                var ele = null;
                if (arg.renderinfo.rendertype == 'thumbnail')
                    ele = this.createThumbnailItem(info, arg, eventHandler);
                else
                    ele = this.createThumbnailItemR(info, arg, eventHandler);
                $(thumbnailE).append(ele);

                $(ele).bind("click", { type: 'boardrecord', info: info, loginfo: loginfo, self: this, arg: arg }, this.eventHandler);
                $(ele).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        var $buttonE = $("<input type='button' class='btn btn-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글쓰기");
        $buttonE.bind("click", { type: 'boardwrite', self: this, info: info, arg: arg }, this.eventHandler);
        var $writeDiv = $('<div>');
        $writeDiv.append($buttonE);
        $temp.append($writeDiv);

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
        return $(thumbnailE);
    }

    createPaintThumbnailList(info2, arg, eventHandler) {

        var loginfo = info2.loginfo;
        var arrarr = info2.arrarr;
        var grouparr = info2.grouparr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        var thumbnailE = $(`<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        </div>`);
        $temp.append(thumbnailE);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];
                var ele = null;
                if (arg.renderinfo.rendertype == 'paintthumbnail')
                    ele = this.createPaintThumbnailItem(info, arg, eventHandler);

                $(thumbnailE).append(ele);

                $(ele).bind("click", { type: 'boardrecord', info: info, loginfo: loginfo, self: this, arg: arg }, this.eventHandler);
                $(ele).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];
                
                var fb = new FabricLoader({ type: 'data', elem: info.fabelem, width: info.fabelem[0].offsetWidth, height: info.fabelem[0].offsetWidth });
                //fb.renderController(elem);
                fb.setFabData(info.thumbnail, info.fabelem);
            }
        }

        var $buttonE = $("<input type='button' class='btn btn-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글쓰기");
        $buttonE.bind("click", { type: 'boardwrite', self: this, info: info, arg: arg }, this.eventHandler);
        var $writeDiv = $('<div>');
        $writeDiv.append($buttonE);
        $temp.append($writeDiv);

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
        return $(thumbnailE);
    }

    createTimelineList(info2, arg, eventHandler) {

        var loginfo = info2.loginfo;
        var arrarr = info2.arrarr;
        var grouparr = info2.grouparr;

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
            // name 기준으로 정렬
            arrarr.sort(function (a, b) {
                var nameA = a.time.toUpperCase(); // ignore upper and lowercase
                var nameB = b.time.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // 이름이 같을 경우
                return 0;
            });
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];

                var num = i % 2 === 0 ? 1 : 2;

                var itemE = $(`<div class="row row-${num}">`);
                
                var sectionItemE = $('<section>');
                var iconE = $('<i class="icon fa fa-fw  fa-home">');
                var timeDetailE = $('<div class="t-details ribbon">');
                var detailE = $('<div class="t-details">');
                var bottomE = $('<div class="bottom">');
                var idE = $('<i>').append(info.id);
                bottomE.append('<a href="#">더보기</a>').append(idE);
                
                if (info.iconclass) {
                    $img = $(`<i class="${info.iconclass}">`);
                }


                var timeE = $('<h5 class="title">').append(info.time);
                var subjectE = $('<h5 class="title">').append(info.subject);
                var appendE = $('<span>').append('  ' + info.id + ' ( ' + info.signdate + ' ) ');
                var summaryE = $('<p>').append(info.summary);

                timeDetailE.append(timeE);
                detailE.append(subjectE).append(appendE);
                sectionItemE.append(iconE).append(timeDetailE).append(detailE).append(summaryE).append(bottomE);
                itemE.append(sectionItemE);

                itemE.bind("click", { type: 'boardrecord', info: info, loginfo: loginfo, self: this, arg: arg }, eventHandler);
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

    createMediaItem(info, arg, eventHandler) {
        var strTag;

        var $media_box = $('<div class="list-group-item list-group-item-action ">');
        var $media_box_item = $('<div class="d-flex w-100 justify-content-between">');
        $media_box.append($media_box_item);
        var $img = null;
        var value = __keyvalueSplitString(info.path);
        console.log(`info.path=${info.path}`);
        if (value && value.image) {
            //value.image = value.image.replace('//', '/');
            $img = $(`<img src="${value.image}" onerror="onImgError(this);" width="50" height="50" imgtype="carousel">`);
            
        } else
            $img = $(`<img src="..." onerror="onImgError(this);" width="50" height="50" imgtype="carousel">`);


        if (value && value.icon) {
            $img = $(`<i class="${value.icon}">`);
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
        if (info.summary) {
            var $bodyComment = $('<p>').append(info.summary);
            $boxBody.append($bodyComment);
        }
        if (info.bodyappend) {
            var $bodyAppend = $('<p>');
            var $bodyAppendSmall = $('<small>').append(info.bodyappend);
            $bodyAppend.append($bodyAppendSmall);
            $boxBody.append($bodyAppend);
        }

        $media_box_item.append($img).append($boxBody);

        return $media_box;
    }

    createMediaList(info2, arg, eventHandler) {
        var loginfo = info2.loginfo;
        var arrarr = info2.arrarr;
        var grouparr = info2.grouparr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        var mediaE = $(`<div class="list-group">
                        </div>`);

        $temp.append(mediaE);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];
                var meItem = this.createMediaItem(info, arg, eventHandler);

                $(meItem).bind("click", { type: 'boardrecord', info: info, loginfo: loginfo, self: this, arg: arg }, this.eventHandler);
                $(meItem).attr('style', 'cursor:pointer;cursor: hand;');

                mediaE.append(meItem);
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
        return $temp;
    }

    createSelectList(info2, arg, eventHandler) {
        var loginfo = info2.loginfo;
        var arrarr = info2.arrarr;
        var grouparr = info2.grouparr;
        //console.log('arg.renderinfo.rendertype====' + arg.renderinfo.rendertype);
        var $temp = $('<div>');
        var $tempChild = $('<div>');
        

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        $temp.append($tempChild);

        var divElem;
        var divElem2;
        $tempChild.append(divElem).append(divElem2);
        if (arg.renderinfo.rendertype == 'selectlist_h') {
            
            $tempChild.addClass("row");
            divElem = $(`<div>`).addClass(`col-md-4`);
            divElem2 = $(`<div>`).addClass(`col-md-8`);
            $tempChild.append(divElem).append(divElem2);
            
        } else if (arg.renderinfo.rendertype == 'selectlist_v') {
            divElem = $(`<div>`);
            divElem2 = $(`<div>`);
            $tempChild.append(divElem2).append(divElem);
            
        }
        arg.viewelem = divElem2;
        /** 
        var $card = $('<div class="card card-primary">');
        var $cardHead = $('<div class="card-header">');
        var $cardBody = $('<div class="card-body">');
        var $cardFooter = $('<div class="card-footer clearfix no-border">');
        $card.append($cardHead).append($cardBody).append($cardFooter);
        divElem.append($card);
        
        var $cardHeadLeft = $('<div >');
        var $cardHeadRight = $('<div class="card-tools pull-right">');

        var $cardFooterDiv = $('<div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">');
        var $cardFooterLeft = $('<div class="btn-group" role="group" aria-label="First group">');
        var $cardFooterRight = $('<div class="btn-group" role="group" aria-label="First group">');
        $cardFooterDiv.append($cardFooterLeft).append($cardFooterRight);
        $cardFooter.append($cardFooterDiv);

        $cardHead.append($cardHeadLeft).append($cardHeadRight);
        **/
        var listE = $('<div class="list-group" role="tablist">');
        divElem.append(listE);
        //$(arg.boardid).append(thumbnailE);
        //$cardBody.append(listE);

        //console.log('arrarr====' + arrarr);
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];
                
                var itemE = $('<div class="list-group-item list-group-item-action" data-toggle="list">');
                var flexItemE = $('<div class="d-flex justify-content-between">');
                var wItemE = $('<div class=" w-100">');

                var $img = null;
                var value = __keyvalueSplitString(info.path);
                console.log(`info.path=${info.path}`);
                if (value && value.image) {
                    //value.image = value.image.replace('//', '/');
                    $img = $(`<img src="${value.image}" onerror="onImgError(this);" width="50" height="50" imgtype="carousel">`);

                } else
                    $img = $(`<img src="..." onerror="onImgError(this);" width="50" height="50" imgtype="carousel">`);


                if (value && value.icon) {
                    $img = $(`<i class="${value.icon}">`);
                }

                
                var subjectE = $('<h5 class="mb-1">').append(info.subject);
                var summaryE = $('<p class="mb-1">').append(info.summary);
                var appendE = $('<small class="text-muted">').append('  ' + info.id + ' ( ' + info.signdate + ' ) ');
                wItemE.append(subjectE).append(summaryE).append(appendE);

                flexItemE.append($img).append(wItemE);
                itemE.append(flexItemE);

                itemE.bind("click", { type: 'boardrecord', info: info, loginfo: loginfo, self: this, arg: arg }, this.eventHandler);
                itemE.attr('style', 'cursor:pointer;cursor: hand;');

                var $icon = $('<i class="fa fa-fw  fa-file-text-o"></i>');
                
                //console.log(`test 222777777722`);
                //$(arg.boardid).append(thumbnailE);
                listE.append(itemE);
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        var $buttonE = $("<input type='button' class='btn btn-outline-info '>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글쓰기");
        $buttonE.bind("click", { type: 'boardwrite', self: this, info: info2, arg: arg }, this.eventHandler);
        var $writeDiv = $('<div>');
        $($writeDiv).append($buttonE);
        divElem.append($writeDiv);

        var $page = $("<div>");
        divElem.append($page);
        var p = new PageNavView();
        arg.pageelem = $page;
        p.createPageNavView(info2, arg, this.eventHandler);

        var $find = $("<div>");
        divElem.append($find);
        arg.findelem = $find;
        var f = new BoardFindView();
        f.createFindView(info2, arg, this.eventHandler);

        //console.log($(arg.elem).html());
        return $($temp);
    }

    createMediaView(info, arg, eventHandler) {
        var strTag;

        var $media_box = $('<div class="d-flex border p-3">');
        var $img = null;
        if (info.img) {
            $img = info.img;
        } else {
            console.log(info.imgsrc);
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

    createTableList(info2, arg, eventHandler) {
        //console.log(`createTableBoardViewarg.code=${arg.code}***arg.brdid=${arg.brdid} arg.title=${arg.title}`);
        var loginfo = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var head = `<div class="alert alert-dark" role="alert">
                      ${arg.renderinfo.title ?? 'title'}
                    </div>`;
        $temp.append(head);

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 60%'>").text("제 목");
        var thE3 = $("<th style='width: 10%'>").text("아이디");
        var thE4 = $("<th style='width: 10%'>").text("작성일");
        var thE5 = $("<th style='width: 5%'>").text("조회");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        if (loginfo && loginfo.ok) {
            var trE = $("<tr>");
            var tdE = $("<td>").attr("colspan", "6");
            $(trE).append(tdE);
            $(tFootE).append(trE);
            var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
            $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
            $buttonE.val("글쓰기");
            $buttonE.bind("click", { type: 'boardwrite', self: this, info: info2, arg: arg }, this.eventHandler);
            $(tdE).append($buttonE);
        }
        
        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "5");
        $(trE).append(tdE);
        $(tFootE).append(trE);

        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new BoardFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                if (arr != null && arr.length > 0) {

                } else {
                    var trE = $("<tr>");
                    var tdE1 = $("<td>").text(info.uid);
                    var tdE2 = $("<td>");
                    //tdE2.text(retext + info.subject).css("text-overflow", "ellipsis");
                    tdE2.text(info.subject).css("text-overflow", "ellipsis");
                    //alert("createBoardList tdE2.html() " + tdE2.html());
                    var tdE3 = $("<td>").text(info.id);
                    {
                        tdE3.attr('code', arg.code);
                        tdE3.attr('id', info.id);
                        tdE3.attr('loginid', loginfo.sid);
                        tdE3.attr('dbpath', arg.dbpath);
                        tdE3.addClass('board_context_menu');
                        //console.log('tdE3.addClass^this.setBoardContextMenu*******************************=');
                    }

                    var tdE4 = $("<td>").text(info.signdate);
                    var tdE5 = $("<td>").text(info.ref);

                    $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);
                    $(tBodyE).append(trE);
                    //console.log(`createTableBoardView^arg********arg.code=${arg.code}*****************arg=*******=${arg}`);
                    $(tdE2).bind("click", { type: 'boardrecord', info: info, loginfo: loginfo, self: this, arg: arg }, this.eventHandler);
                    $(tdE2).attr('style', 'cursor:pointer;cursor: hand;');

                    //this.setBoardContextMenu('.board_context_menu');
                }
            }
        }

        //$(arg.elem).empty();
        $(arg.elem).append($temp);
        //console.log('createTableBoardView^********************=$(arg.elem).parent().parent().html()' + $(arg.elem).parent().parent().html() );
        this.setBoardContextMenu('.board_context_menu');
        return $temp;
    }

    createList(info, arg, eventHandler) {
        $(arg.elem).empty();
        
        //console.log('arg.renderinfo.rendertype3332====' + arg.renderinfo.rendertype);
        if (arg && arg.renderinfo) {
            //console.log('arg.renderinfo.rendertype3332====' + arg.renderinfo.rendertype);
            if (arg.renderinfo.rendertype == 'table') {
                this.createTableList(info, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'homemake') {
                this.createHomemakeList(info, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'paintthumbnail') {
                this.createPaintThumbnailList(info, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'thumbnail' || arg.renderinfo.rendertype == 'thumbnailR') {
                this.createThumbnailList(info, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'media') {
                this.createMediaList(info, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'carousel') {
                this.createTableList(info, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'selectlist_h' || arg.renderinfo.rendertype == 'selectlist_v') {
                this.createSelectList(info, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'timeline') {
                this.createTimelineList(info, arg, eventHandler);
            } else if (arg.renderinfo.rendertype == 'list') {
                //this.createSelectList(info, arg, eventHandler);
            } else {
                this.createTableList(info, arg, eventHandler);
            }
        }

        if (!this.topmenu) {
            if (arg && arg.renderinfo.tabthread) {
                var $tabelem = $('<div>');

                if (arg.viewelem) {
                    $(arg.viewelem).before($tabelem);
                } else {
                    $(arg.elem).before($tabelem);
                }

                
                arg.$tabelem = $tabelem;
                this.topmenu = new TabMenuView();
                this.topmenu.createThreadTabMenu(info, arg, eventHandler);
                //console.log('createList $(arg.elem).parent().html()==' + $(arg.elem).parent().html());
            }
        }
    }

    createViewbody(info, arg, eventHandler) {
        console.log('createList arg.viewbody====' + arg.viewbody);
        if (!this.boardViewBody)
            this.boardViewBody = new BoardViewBody();

        this.boardViewBody.createViewBody(info, arg, eventHandler);
    }

    createJjocjyFormView() {
        var mo = `<form id="jjocjyForm" method="post" class="form-horizontal">
                            <input type="hidden" name="code" value="jjocjy">
                            <input type="hidden" name="dbpath" value="config.dadb">
                            <input type="hidden" name="uid">
                            <input type="hidden" name="getid">
                            <input type="hidden" name="jjocjytype" value="add">
                            <div class="form-group">
                                <input type="text" name="sendid" id="sendid" class="form-control" readonly>
                            </div>
                            <div class="form-group">
                                <input type="text" name="subject" id="subject" class="form-control" placeholder="제목">
                            </div>
                            <div class="form-group">
                                <textarea cols="40" rows="7" name="memo1" id="summernote" class="form-control jqte-edit" placeholder="내 용..." required="" autofocus="" type="text"></textarea>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-info brdupdate" id="jjocjyformSubmit">쪽지전송</button>
                            </div>
                        </form>`;
        return mo;
    }

    createJjocjyList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 40%'>").text("제 목");
        var thE3 = $("<th style='width: 20%'>").text("보낸사람");
        var thE4 = $("<th style='width: 20%'>").text("보낸시간");
        var thE5 = $("<th style='width: 15%'>").text("삭제");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'jjocjywrite', self: this, info: info, arg: arg }, eventHandler);
        $(tdE).append($buttonE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);

        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new ErpFindView();
        f.createFindView(info2, arg, eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var trE = $("<tr>");

                var tdE1 = $("<td>").text(article_num);
                var tdE2 = $("<td>").text(subject).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(sendid);
                if (sid) {
                    tdE3.attr('code', code);
                    tdE3.attr('id', sid);
                    tdE3.attr('path', dbpath);
                    tdE3.addClass('idpopupmenu');
                }

                var tdE4 = $("<td>").text(signdate);
                var tdE5 = $("<td>");
                var btn1 = $('<button type="button" class="btn btn-default brddel" >삭제</button>');
                $(btn1).bind("click", { type: 'jjocjydel', info: info, arg: arg }, eventHandler);
                tdE5.append(btn1);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);
                $(tBodyE).append(trE);

                $(tdE2).bind("click", { type: 'jjocjyrecord', info: info, arg: arg }, eventHandler);
                $(tdE2).attr('style', 'cursor:pointer;cursor: hand;');

            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }

    setBoardContextMenu(id) {
        //console.log('setBoardContextMenu id=4444447777777777' + id);
        var self = this;
        $(id).contextMenu({
            selector: '.left',
            trigger: 'left',
            menuSelector: "#boardContextMenu",
            menuSelected: function (invokedOn, selectedMenu) {
                //alert("invokedOn.text()" + invokedOn.text());
                var ip = invokedOn.attr('ip');
                var loginid = invokedOn.attr('loginid');
                //var id = invokedOn.attr('id');
                var id = invokedOn.text();

                if (selectedMenu.text() == "쪽지보내기") {
                    if (loginid == null || loginid == undefined)
                        return alert('회원전용기능입니다');
                    var formview = self.createJjocjyFormView();
                    
                    __modal.show('쪽지보내기', formview);

                    var form = document.getElementById("jjocjyForm");
                    console.log('self.createJjocjyFormView', self.createJjocjyFormView);
                    form.sendid.value = loginid;
                    form.getid.value = id;
                    $('#jjocjyformSubmit').bind("click", { type: 'jjocjyformSubmit', dbpath: invokedOn.attr('dbpath'), code: invokedOn.attr('code'), self: self, sendid: loginid, receiveid: id }, self.eventHandler);
                } else if (selectedMenu.text() == "지난글보기") {
                    this.sendExile(id);
                }
                else if (selectedMenu.text() == "rtc요청") {

                }
                else if (selectedMenu.text() == "폴더생성") {

                }

            }
        });

    }

    insertItem(title, boxnum) {
        this.itemcount++;

        var $row = $('<div class="row">');
        var $col1 = $('<label class="col-2">').append("설문항목:");
        var $col2 = $('<input type="text" name="q" tip="q" class="col-8">').attr("box-num", boxnum);

        var $col6 = $('<button class="col-1 btn btn-outline-info home-make-btns" id="itemdel" class="col-1" >x</button>').attr("box-num", boxnum);
        $row.append($col1).append($col2).append($col6);
        return $row;
    }

    boxCalculate(boxnum) {
        var qsize = 0;
        $('#pollmake-body').children().each(function () {
            $(this).find('[tip=q]').attr('name', 'q' + qsize);
            //$("#pollForm input[name=q_num]").val(qsize);
            //console.log($(this).html());

            qsize++;
        });
        //alert("boxSum = " + boxSum);
        $("#pollmakeForm input[name=q_size]").val(qsize);
        //$('#box-input-sum-' + boxnum).val(boxSum);
    }

    createPollMakeEvent(info2, arg, eventHandler) {
        var self = this;

        $(document).on("click", ".home-make-btns", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var btnid = $(this).attr("id");
            if (btnid == "addItem") {
                var tit = $(this).prev().val();
                $('#pollmake-body').append(self.insertItem(tit, 1));
                //$(this).prev().val("");
            } else if (btnid == "boxdel") {
                $(this).parent().parent().parent().parent().remove();
                //self.allCalculate();
            } else if (btnid == "itemdel") {
                $(this).parent().remove();
                var box_num = $(this).attr("box-num");
                self.boxCalculate(box_num);
                //self.allCalculate();
            } else if (btnid == "pollmakesubmit") {
                console.log("pollmakesubmit");
                self.boxCalculate(box_num);
                var form = document.getElementById("pollmakeForm");
                var v='', q='';
                var qsize = form.q_size.value;
                for (var i = 0; i < qsize; i++)
                {
                    var text = $('#pollmakeForm').find(`input[name="q${i}"]`).val();
                    v = v + '0:';
                    q = q + text + ';';
                }

                var form2 = document.getElementById("boardpostform");
                console.log('q=' ,q);
                form2.com.value = v + ';subject:' + form.subject.value + ';' + q;

                __modal.hide();
            } else {
                var box_num = $(this).attr("box-num");
                var tit = $(this).prev().val();
                $('#boxbody-' + box_num).append(self.insertItem(tit, box_num));
                $(this).prev().val("");
            }

        });

    }

    createPollMakeView(info2, arg, eventHandler) {
        this.boxcount = 0, this.itemcount = 0;

        var pv = `<form id="pollmakeForm" method="post" onsubmit="return OnSubmit(this)">
                    <input type="hidden" name="code" id="code" value="poll" />
                    <input type="hidden" name="dbpath" id="dbpath" />
                    <input type="hidden" name="brdid" id="brdid" value="1" />
                    <input type="hidden" name="posttype" id="posttype" value="post" />
                    <input type="hidden" name="q_size" id="q_size" />

                    <div class="card-header">
                        설문만들기
                        <div class="pull-right form-inline">
                            <button class="btn btn-outline-info home-make-btns" id="addItem">설문항목추가</button>
                        </div>
                    </div>
                    <div class="card-body" id="pollmake-body">

                    </div>
                    <div class="card-footer">
                        
                        <label for="sum" class="control-label">제목</label>
                        <input type="text" class="form-control mb-auto" name="subject" value="" placeholder="설문제목..." required />
                        <div class="pull-right">
                            <input class="home-make-btns" type="submit" id="pollmakesubmit" placeholder="설문전송" value="전송">
                        </div>
                    </div>
                </form>`;

        this.createPollMakeEvent(info2, arg, eventHandler);

        return pv;
    }
}

class BoardViewBody extends ViewBase {
    constructor() {
        super();

        this.selectedImageFormId = null;
    }

    getReturnValue() {
        var type, value;
        var arg = Array.prototype.slice.call(arguments);
        if (arg && arg[0])
            type = arg[0];
        else
            return;
        if (arg && arg[1])
            value = arg[1];
        console.log(`getReturnValue type==${type}`);
        //_tempCount++;
        var info = {};
        if (type == 'icon' || type == 'image') {
            var form = document.getElementById(this.selectedImageFormId);
            console.log('this.selectedImageFormId**=' + this.selectedImageFormId);
            form.path.value = 'image=' + value;
            //form.imageinput.value = 'image=' + value;
            if (this.selectedImageFormId == "datForm")
                $('#btnimg').attr('src', value);
            else
                $('#subbtnimg').attr('src', value);
            //$('#iconchange_input').val(type + ':' + value);
            __modal.hide();
        } else if (type == 'audio') {
            $('#playerA').attr('src', value);
            var player = document.getElementById('playerA');
            player.play();
            __modal.hide();
        } else if (type == 'video') {
            $('#playerV').attr('src', value);
            var player = document.getElementById('playerV');
            player.play();
            __modal.hide();
            //console.log(value);
        } 
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;
        console.log(type);
        if (type == 'datform') {
            //__modal.show('입 력', self.createDatForm(info, arg, self.eventHandler));
            $('.collapse').children().remove();
            $('#datform' + e.data.datuid).append(self.createSubDatForm(info, arg, self.eventHandler));
            $('#datform' + e.data.datuid).collapse('show');
            var form = document.getElementById("datForm");

            form.dbpath.value = arg.dbpath;
            $('#subdatformSubmit').bind("click", { type: 'subdatformSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'datImgselBtnClick') {
            self.selectedImageFormId = "datForm";
            var c = new FileController({ type: 'filelist', code: 'root', filetype: 'file', path: '/files/media/images/icons/', filter: 'image' , returntype: 'return', $parent: self });
            var elem = document.createElement('div');
            c.renderController(elem);
            __modal.show(`보기`, elem);
            console.log(self);
            var form = document.getElementById("datForm");
            form.code.value = arg.code;
            form.dbpath.value = arg.dbpath;
            form.uid.value = info.uid;

        } else if (type == 'subdatImgselBtn') {

            self.selectedImageFormId = "datSubForm";
            var c = new FileController({ type: 'filelist', code: 'root', filetype: 'file', path: '/files/media/images/icons/', filter: 'image', returntype: 'return', $parent: self });
            var elem = document.createElement('div');
            c.renderController(elem);
            __modal.show(`보기`, elem);
            console.log(self);
            var form = document.getElementById("datSubForm");
            form.code.value = arg.code;
            form.dbpath.value = arg.dbpath;
            form.uid.value = info.uid;

        } else if (type == 'subdatformSubmit') {

            var form = document.getElementById("datSubForm");
            form.code.value = arg.code;
            form.dbpath.value = arg.dbpath;
            form.uid.value = info.uid;
            form.did.value = info.did;
            form.fid.value = info.fid;
            form.datuid.value = info.datuid;

            arg.type = 'viewbody';
            arg.form = form;
            var formData = $(form).serializeArray();
            //var b64 = Base64.encode(form.comment.value);
            //alert("Base64.encode formid==222222" + formid);
            //formData = arg.self.changeSerialize(formData, 'comment', b64);
            //console.log("form.subject.value=======" + form.subject.value);
            //b64 = Base64.encode(form.subject.value);
            //formData = arg.self.changeSerialize(formData, 'subject', b64);
            arg.formData = formData;

            arg.path = "/view.board?posttype=datpost&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + info.uid + "&fid=" + info.fid + "&datuid=" + arg.datuid + "&utf8=ok&";
            console.log(` handle datpost arg.path=${arg.path}**** arg.type=${arg.type}****************************=`);
            
            arg.self.postAjax(arg);
        } else if (type == 'datformSubmit') {

            var form = document.getElementById("datForm");
            form.code.value = arg.code;
            form.dbpath.value = arg.dbpath;
            form.uid.value = info.uid;
            form.did.value = info.did;
            form.fid.value = info.fid;

            arg.type = 'viewbody';
            arg.form = form;
            var formData = $(form).serializeArray();
            //var b64 = Base64.encode(form.comment.value);
            //console.log(` arg.self=${arg.self}**** info.uid=${info.uid}**** info.did=${info.did}******** info.fid=${info.fid}****************=`);
            //formData = arg.self.changeSerialize(formData, 'comment', b64);
            
            //b64 = Base64.encode(form.subject.value);
            //formData = arg.self.changeSerialize(formData, 'subject', b64);
            arg.formData = formData;

            arg.path = "/view.board?posttype=datpost&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + info.uid + "&fid=" + info.fid + "&datuid=" + arg.datuid + "&utf8=ok&";
            console.log(` handle datpost arg.path=${arg.path}**** arg.type=${arg.type}****************************=`);

            arg.self.postAjax(arg);
        } else if (type == 'boardlist') {
            console.log("eventHandler type  == " + type);
            var str = "/list.board?code=" + arg.code + "&brdid=" + info.brdid + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            //console.log("morelist str info.brdid == " + info.brdid);
            var arg2 = { path: str, type: "boardlist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.self.listAjax(arg2);
        } else if (type == 'boardwrite') {
            if (arg.renderinfo.viewtype == 'paintthumbnail') {
                location.href = `/html/admin/edit/da-paintForm.html?dbpath=${arg.dbpath}&code=${arg.code}&brdid=${arg.brdid}&utf8=ok`;
                return;
            } else if (arg.renderinfo.viewtype == 'homemake') {
                location.href = `/html/admin/edit/homemakeForm.html?dbpath=${arg.dbpath}&code=${arg.code}&brdid=${arg.brdid}&utf8=ok`;
                return;
            } else {
                //var f = new FullScreenView();
                //f.setContent(`글쓰기`, e.data.self.createBoardFormView(info, arg, e.data.self.eventHandler));
                __modal.show('글쓰기', e.data.self.createBoardFormView(info, arg, e.data.self.eventHandler));
                new SummerNoteSet('summernote');
            }

        } else if (type == 'boardmodify') {
            //var form = new BoardFormAndModal();
            //__fullscreenView.setContent(form.createBoardFormView(info, arg, self.eventHandler));
            //__fullscreenView.fullscreen('fullscreenwin');
            //form.summernoteSetting('');

            __modal.show('글수정', e.data.self.createBoardFormView(info, arg, self.eventHandler));
            new SummerNoteSet('summernote');

            var form = document.getElementById('boardpostform');
            form.subject.value = info.subject;
            form.comment.value = info.comment;
            $("#summernote").summernote('editor.insertText', info.comment);
            console.log('$("#summernote").val()==' + $("#summernote").val());
        } else if (type == 'boardpost') {
            var form = document.getElementById(e.data.formid);
            form.uid.value = info.uid;
            //console.log('form^********************************=' + form);
            arg.type = 'viewbody';
            arg.form = form;
            var formData = $(form).serializeArray();
            //var b64 = Base64.encode($("#summernote").val());
            //alert("Base64.encode formid==222222" + formid);
            //formData = arg.self.changeSerialize(formData, 'comment', b64);
            //console.log("form.subject.value=======" + form.subject.value);
            //b64 = Base64.encode(form.subject.value);
            //formData = arg.self.changeSerialize(formData, 'subject', b64);
            arg.formData = formData;
            arg.path = "/view.board?posttype=modify&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + info.uid + "&fid=" + info.fid + "&datuid=" + arg.datuid + "&utf8=ok&";
            //arg.path = "/list.board?posttype=modify&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + arg.uid + "&datuid=" + arg.datuid + "&utf8=ok&";
            arg.self.postAjax(arg);
            //console.log("eventHandler(e) type33 == " + type);
        } else if (type == 'boarddelete') {
            if (!confirm("글을 삭제합니다 ")) {
                return;
            }
            str = "/list.board?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&utf8=ok&";
            arg.path = str;
            arg.type = 'boardlist';
            arg.self.postAjax(arg);
        } else if (type == 'pollupdate') {
            var form = document.getElementById("pollForm");
            var q_num = $("input[name='q_num']:checked").val();
            if (!q_num)
                return alert('선택한후에 투표하세요');
            var str = `/view.board?posttype=addpollpoint&code=${arg.code}&dbpath=${arg.dbpath}&q_num=${q_num}&uid=${info.uid}&fid=${info.fid}&brdid=${e.data.brdid}&utf8=ok&`;
            console.log(` handle addpoint str=${str}********=`);
            arg.path = str;
            arg.self.postAjax(arg);
        } else if (type == 'addpoint' || type == "minuspoint") {
            var str = "/view.board?posttype=addpoint&code=" + arg.code + "&point=" + e.data.point + "&uid=" + e.data.uid + "&fid=" + e.data.fid + "&dbpath=" + arg.dbpath + "&brdid=" + e.data.brdid + "&";
            console.log(` handle addpoint str=${str}********=`);
            arg.path = str;
            arg.self.postAjax(arg);
        } else if (type == 'adddatpoint' || type == "minusdatpoint") {
            var str = "/view.board?posttype=addpoint&addtype=dat&code=" + arg.code + "&point=" + e.data.point + "&uid=" + e.data.uid + "&datuid=" + e.data.datuid + "&fid=" + e.data.fid + "&dbpath=" + arg.dbpath + "&brdid=" + e.data.brdid + "&";
            console.log(` handle addpoint str=${str}**333=`);
            arg.path = str;
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
            console.log(` handle datpost arg.path=${arg.path}**** arg.type=${arg.type}****************************=`);
            arg.self.postAjax(arg);
        }
    }

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

    createDatMediaBox(info, arg, eventHandler) {

        var $dat_media_box = $('<div class="d-flex p-3" style="border:2px solid gold;border-round: 50x">');
        var $img = null;
        var value = __keyvalueSplitString(info.path);
        console.log(`info.path=${info.path}`);
        if (value && value.image) {
            console.log(`value=${value.image}`);
            $img = $(`<img src="${value.image}" onerror="onImgError(this);"  height="50" width="50" imgtype="carousel">`);
            //item.append($img);
        }

        if (value && value.icon) {
            $img = $(`<i class="${value.icon}">`);
            //item.append($img);
            //item.append($img);
        }

        var $datbody = $('<div class="media-body">');

        var $bodyhead = $('<div class="row justify-content-between">');
        var str = info.id + " (" + info.signdate + ")";
        var $head_left = $('<h5 class="mt-0 col-8"></h5>').text(info.subject);
        var $head_right = $('<div class="mt-0">');
        $bodyhead.append($head_left).append($head_right);

        var $bodybody = $('<p>').html(info.comment);

        $datbody.append($bodyhead);
        $datbody.append($bodybody);

        $dat_media_box.append($img).append($datbody);
        //console.log(info.okp);
        const okp = info.okp ? info.okp : '';
        const nop = info.nop ? info.nop : '';
        var btn1 = $(`<button type="button" class="btn " >👍 ${okp}</button>`);
        var btn2 = $(`<button type="button" class="btn " >👎 ${nop}</button>`);

        //datinfo.customer_btn1 = btn1;
        $(btn1).bind("click", { type: "adddatpoint", point: 1, uid: info.uid, fid: info.fid, datuid: info.datuid, elem: arg.elem, arg: arg, info: info }, this.eventHandler);
        $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
        $(btn2).bind("click", { type: "minusdatpoint", point: -1, uid: info.uid, fid: info.fid, datuid: info.datuid, elem: arg.elem, arg: arg, info: info }, this.eventHandler);
        $(btn2).attr('style', 'cursor:pointer;cursor: hand;');

        $head_right.append(btn1).append(btn2);
        //}

        var $dat_toolbar = $('<div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">');
        var $dat_btngroup = $('<div class="btn-group" role="group" aria-label="First group">');
        var $dat_btngroup_right = $('<div class="btn-group" role="group" aria-label="First group">');
        $dat_toolbar.append($dat_btngroup).append($dat_btngroup_right);
        $datbody.append($dat_toolbar);

        var $btn = $('<button type="button" class="btn btn-sm">');
        /***
        $btn.bind("click", { type: "datlist", formid: "datform", code: info.code, dbpath: info.dbpath, uid: info.uid, datuid: info.datuid, fid: info.fid, rendertype: info.rendertype}, eventHandler);
        $btn.text("답글(" + info.datcount + ")");
        $dat_btngroup.append($btn);
        ***/
        var $btn1 = $('<button type="button" class="btn btn-sm"><i class="fa fa-fw fa-pencil"></i></button>');
        $btn1.bind("click", { type: "datform", formid: "datform", uid: info.uid, datuid: info.datuid, elem: arg.elem, arg: arg, info: info, self: this }, this.eventHandler);
        $btn1.attr('style', 'cursor:pointer;cursor: hand;');

        var $btn2 = $('<button type="button" class="btn btn-sm"><i class="fa fa-fw fa-trash-o"></i></button>');
        $btn2.bind("click", { type: "datdelete", formid: "datform", uid: info.uid, datuid: info.datuid, fid: info.fid, elem: arg.elem, arg: arg, info: info }, this.eventHandler);
        $btn2.attr('style', 'cursor:pointer;cursor: hand;');

        $dat_btngroup_right.append($btn1).append($btn2);

        var $collapse = $('<div class="collapse" id="dat' + info.datuid + '">');
        $datbody.append($collapse);

        $collapse = $('<div class="collapse" id="datform' + info.datuid + '">');
        $datbody.append($collapse);

        var $collapse2 = $('<div class="collapse" id="reply' + info.datuid + '">');
        $datbody.append($collapse2);

        return $dat_media_box;
    };

    createSubDatForm(info, arg, eventHandler) {

        var $dat_media_box = $('<div class="d-flex w-100 justify-content-between">');
        var $datimg = $('<button type = "button" class="btn" ><img id="subbtnimg" src="" alt="">이미지선택</button >');
        $($datimg).bind("click", { type: 'subdatImgselBtn', self: this, info: info, arg: arg }, this.eventHandler);
        var $datbody = $('<div class="media-body">');

        var $bodyform = $('<form id="datSubForm" method="post" class="form-horizontal">');
        $bodyform.append('<input type="hidden" name="code" />');
        $bodyform.append('<input type="hidden" name="dbpath"/>');
        $bodyform.append('<input type="hidden" name="posttype" value="datpost"  />');
        $bodyform.append('<input type="hidden" name="dattype" value="sub">');
        $bodyform.append('<input type="hidden" name="uid"/>');
        $bodyform.append('<input type="hidden" name="did"/>');
        $bodyform.append('<input type="hidden" name="fid"/>');
        $bodyform.append('<input type="hidden" name="datuid"/>');
        $bodyform.append('<input type="hidden" name="path"/>');

        var $writeInput = $('<input type="text" name="subject" id="dat_subject" class="form-control" placeholder="제목">');
        var $formGroup = $('<div class="form-group">').append($writeInput);
        $bodyform.append($formGroup);
        $writeInput = $('<textarea cols="40" rows="7" name="comment" id="summernote" class="form-control jqte-edit" placeholder="내 용..." required="" autofocus="" type="text"></textarea>');
        $formGroup = $('<div class="form-group">').append($writeInput);
        $bodyform.append($formGroup);


        var btn1 = $('<button type="button" class="btn btn-info brdupdate" >전송</button>');
        $(btn1).bind("click", { type: 'subdatformSubmit', self: this, info: info, arg: arg }, this.eventHandler);
        var $formitem = $('<div class="form-group">').append($(btn1));
        $bodyform.append($formitem);

        $datbody.append($bodyform);
        
        $dat_media_box.append($datimg).append($datbody);

        //this.summernoteSetting(arg.comment);
        return $dat_media_box;

        var mo = `<div class="d-flex w-100 justify-content-between">
                    <button type = "button" class="btn" id="subdatImgselBtn" ><img id="btnimg" src="" alt="">이미지선택</button >
                    <div class="media-body">
                        <form id="datSubForm" method="post" class="form-horizontal">
                            <input type="hidden" name="code">
                            <input type="hidden" name="dbpath">
                            <input type="hidden" name="posttype" value="datpost">
                            <input type="hidden" name="dattype" value="sub">
                            <input type="hidden" name="uid">
                            <input type="hidden" name="did">
                            <input type="hidden" name="fid">
                            <input type="hidden" name="datuid">
                            <input type="hidden" name="path">
                            <div class="form-group">
                                <input type="text" name="subject" id="dat_subject" class="form-control" placeholder="제목">
                            </div>
                            <div class="form-group">
                                <textarea cols="40" rows="7" name="comment" id="summernote" class="form-control jqte-edit" placeholder="내 용..." required="" autofocus="" type="text"></textarea>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-info brdupdate" id="subdatformSubmit">댓글전송</button>
                            </div>
                        </form>
                    </div>
                </div>`;
        return mo;

    };

    createDatForm() {
        var mo = `<div class="d-flex w-100 justify-content-between">
                    <button type = "button" class="btn" id="datImgselBtn" ><img id="btnimg" src="" alt="">이미지선택</button >
                    <div class="media-body">
                        <form id="datForm" method="post" class="form-horizontal">
                            <input type="hidden" name="code">
                            <input type="hidden" name="dbpath" value="add">
                            <input type="hidden" name="posttype" value="datpost">
                            <input type="hidden" name="dattype">
                            <input type="hidden" name="uid">
                            <input type="hidden" name="did">
                            <input type="hidden" name="fid">
                            <input type="hidden" name="datuid">
                            <input type="hidden" name="path">
                            <div class="form-group">
                                <input type="text" name="subject" id="dat_subject" class="form-control" placeholder="제목">
                            </div>
                            <div class="form-group">
                                <textarea cols="40" rows="7" name="comment" id="summernote" class="form-control jqte-edit" placeholder="내 용..." required="" autofocus="" type="text"></textarea>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-info brdupdate" id="datformSubmit">댓글전송</button>
                            </div>
                        </form>
                    </div>
                </div>`;
        return mo;

    };

    arrDatListTree($parent, arr, arg, eventHandler) {
        var $treeDropdown = $('<ul>');
        console.log(`arrListTree arr.length==${arr.length}`);
        for (var i = 0; i < arr.length; i++) {
            var info = arr[i];
            var arr2 = arr[i].arr;
            //console.log(`arrListTree arr2.length==${arr2.length}`);
            if (arr2.length > 0) {
                var $listItem = $('<li class="list-group-item">');
                $listItem.append(this.createDatMediaBox(info, arg, eventHandler));
                $listItem.bind("click", { type: 'record', info: info, arg: arg }, this.eventHandler);
                $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                $treeDropdown.append($listItem);

                this.arrDatListTree($listItem, arr2, arg, eventHandler);
            } else {

                var $listItem = $('<li class="list-group-item">');
                $listItem.append(this.createDatMediaBox(info, arg, eventHandler));
                $listItem.bind("click", { type: 'record', info: info, arg: arg }, this.eventHandler);
                $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                $treeDropdown.append($listItem);
            }
        }
        $parent.append($treeDropdown);
    }

    createViewBody(info2, arg, eventHandler) {
        console.log(`createBoardViewBody(info2, arg, eventHandler) arg.self = ${arg.self} = info2== ${info2}`);
        var loginfo = info2.loginfo;
        //var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;
        var datarr = info2.datarr;

        var $tempBox = $('<div>');
        var divElem;
        var divElem2;
        if (arg.renderinfo.viewbodytype == 'full') {
            divElem = $(`<div>`);
            divElem2 = $(`<div>`);
            $tempBox.append(divElem).append(divElem2);
            var f = new FullScreenView();
            f.setContent(`뷰 보기255`, $tempBox);
            
        } else if (arg.renderinfo.viewbodytype == 'h') {

            $tempBox.addClass("row");
            divElem = $(`<div>`).addClass(`col-md-4`);
            divElem2 = $(`<div>`).addClass(`col-md-8`);
            $tempBox.append(divElem).append(divElem2);

        } else {
            divElem = $(`<div>`);
            divElem2 = $(`<div>`);
            $tempBox.append(divElem).append(divElem2);

        }

        var $boardalert = $('<div class="alert alert-dark" role="alert">').text('뷰');
        divElem.append($boardalert);
        //$('.main-board-view').append($tempBox);
        //$(arg.boardid).append($tempBox);
        var $head = $('<div>');
        var $body = $('<div>');
        var $foot = $('<div>');
        var $alert = $('<div class="alert alert-dark" role="alert">').text('댓글');

        var $datbox = $('<div>');
        //alert("da-board-script viewbody arg.renderstyle" + arg.renderstyle);

        divElem.append($head).append($body).append($foot);
        divElem2.append($alert).append($datbox);

        var info;

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                info = arrarr[i];
                var arr = arrarr[i].arr;

                if (arr != null && arr.length > 0) {

                } else {

                    //console.log("viewbody info.subject===" + info.subject);
                    //console.log("viewbody info.comment===" + info.comment);
                    //alert("viewbody comment===jjj" + comment);

                    var $headTitle = $('<h5 class="card-title">').append(info.subject);
                    var $boxHeader = $('<div class="card-header">').append($headTitle);
                    $head.append($boxHeader);

                    var $headSpan = $('<span>').append("글쓴이: " + info.id);
                    var $headRight = $('<div class="pull-right">').append(info.signdate);
                    var btn1 = $(`<button type="button" class="btn btn-outline-dark" >👍 ${info.okp}</button>`);
                    var btn2 = $(`<button type="button" class="btn btn-outline-dark" >👎 ${info.nop}</button>`);

                    //datinfo.customer_btn1 = btn1;
                    $(btn1).bind("click", { type: "addpoint", point: 1, uid: info.uid, fid: info.fid, elem: arg.elem, arg: arg, info: info, self: this }, this.eventHandler);
                    $(btn1).attr('style', 'cursor:pointer;cursor: hand;');
                    $(btn2).bind("click", { type: "minuspoint", point: -1, uid: info.uid, fid: info.fid, elem: arg.elem, arg: arg, info: info, self: this }, this.eventHandler);
                    $(btn2).attr('style', 'cursor:pointer;cursor: hand;');
                    $headRight.append(btn1).append(btn2);

                    $boxHeader = $('<div class="card-header">').append($headSpan).append($headRight);
                    $head.append($boxHeader);

                    var fabelem = $('<div>');
                    info.fabelem = fabelem;

                    var $boxBody = $('<div class="card-body" style="overflow:auto">').append(fabelem).append(info.comment);

                    if (info.com) {
                        
                        var pollelem = this.createPollView(info, arg, this.eventHandler);
                        $boxBody.append(pollelem);
                    }

                    $body.append($boxBody);
                }
            }
        }

        var $boxfooter = $('<div class="card-footer">');
        var btn1 = $('<button type="button" class="btn btn-outline-dark brdupdate" >목록</button>');
        $(btn1).bind("click", { type: "boardlist", elem: arg.elem, arg: arg, info: info }, this.eventHandler);
        //$(btn1).attr('style', 'cursor:pointer;cursor: hand;');
        
        if (loginfo && loginfo.ok) {
            $boxfooter.append(btn1);
            btn1 = $('<button type="button" class="btn btn-outline-dark brdupdate" >수정</button>');
            $(btn1).bind("click", { type: "boardmodify", uid: info.uid, elem: arg.elem, arg: arg, info: info, self: this }, this.eventHandler);
            $boxfooter.append(btn1);
            btn1 = $('<button type="button" class="btn btn-outline-dark brdupdate" >삭제</button>');
            $(btn1).bind("click", { type: "boarddelete", uid: info.uid, elem: arg.elem, arg: arg, info: info, self: this }, this.eventHandler);
            $boxfooter.append(btn1);

            //btn1 = $('<button type="button" class="btn btn-info pull-right" >답글달기</button>');
            //$(btn1).bind("click", { type: "reply", formid: "#datform", code: info.code, dbpath: info.dbpath, boardid: arg.boardid, rendertype: arg.rendertype, brdid: info.brdid, uid: uid, did: did, fid: fid, subject: subject, comment: comment, thread: info.thread }, postBoardHandler);
            //$boxfooter.append(btn1);

            btn1 = $('<button type="button" class="btn btn-outline-dark pull-right" >글쓰기</button>');
            $(btn1).bind("click", { type: "boardwrite", elem: arg.elem, arg: arg, info: info, self: this }, this.eventHandler);
            $boxfooter.append(btn1);

            
        }
        $foot.append($boxfooter);

        
        var $list = $('<ul class="tree list-group">');
        $datbox.append($list);
        if (datarr && datarr.length >= 0) {
            for (var i = 0; i < datarr.length; i++) {
                //cnt++;
                
                var datinfo = datarr[i];
                var arr = datarr[i].arr;

                if (arr && arr.length > 0) {

                    var $listItem = $('<li class="list-group-item">');
                    $listItem.append(this.createDatMediaBox(datinfo, arg, eventHandler));
                    $listItem.bind("click", { type: 'record', info: datinfo, arg: arg }, this.eventHandler);
                    $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $list.append($listItem);

                    this.arrDatListTree($listItem, arr, arg, eventHandler);
                } else {
                    
                    var $listItem = $('<li class="list-group-item">');
                    $listItem.append(this.createDatMediaBox(datinfo, arg, eventHandler));
                    $listItem.bind("click", { type: 'record', info: datinfo, arg: arg }, this.eventHandler);
                    $listItem.attr('style', 'cursor:pointer;cursor: hand;');

                    $list.append($listItem);
                }
            }
        }
        //console.log(`createBoardViewBody(info2, arg, eventHandler) datarr = ${datarr}`);
        if (!datarr || (datarr && datarr.length <= 0)) {
            var noinfo = {};
            noinfo.subject = "댓글";
            noinfo.comment = "등록된 댓글이 없습니다";
            noinfo.okp = 0;
            noinfo.nop = 0;
            $datbox.append(this.createDatMediaBox(noinfo, arg, eventHandler));
        }

        divElem2.append($datbox);
        divElem2.append(this.createDatForm());

        if (arg.viewelem) {
            $(arg.viewelem).empty();
            $(arg.viewelem).append($tempBox);
        } else if (arg.renderinfo.linktype == "full") {
            window._fullscreen = new FullScreenView();
            window._fullscreen.setContent(`글쓰기`, $tempBox);
        } else {
            $(arg.elem).empty();
            $(arg.elem).append($tempBox);
        }

        //console.log(info.thumbnail);
        if (arg.renderinfo.viewtype == "paintthumbnail" && info.thumbnail) {
            var fb = new FabricLoader({ type: 'data', elem: info.fabelem });
            //fb.renderController(elem);
            fb.setFabData(info.thumbnail, info.fabelem);
        }

        $('#datformSubmit').bind("click", { type: 'datformSubmit', self: this, info: info, arg: arg }, this.eventHandler);
        $('#datImgselBtn').bind("click", { type: 'datImgselBtnClick', self: this, info: info, arg: arg }, this.eventHandler);
        return $tempBox;
    }

    createPollView(info, arg, eventHandler) {
        var arrarr = info.com.split(';');
        var v = arrarr[0].split(':');
        var subjects = arrarr[1].split(':');
        var pollelem = $('<div>');
        var totalv = 0;
        for (var i = 0; i < v.length; i++) {
           
            var p = v[i] ? v[i] : 0;
            totalv = totalv + parseInt(p);
            console.log('v[i]=', v[i]);
            console.log('totalv=', totalv);
        }

        //console.log(`createPollView arg.self.startBoardRequest==${arg.self.startBoardRequest}`);
        var $temp = $("<div>");
        var $title = $("<h4>");
        var $formE = $('<form id="pollForm" method="post" onsubmit="return OnPollUpdateSubmit(this)">');

        $formE.append('<input type="hidden" name="code" id="code" value=' + arg.code + ' />');
        $formE.append('<input type="hidden" name="dbpath" id="dbpath" value=' + arg.dbpath + ' />');
        $formE.append('<input type="hidden" name="fid" value=' + arg.fid + ' />');

        //$(arg.boardid).append(tableE);
        $temp.append($title).append($formE);

        var $listE = $('<ul class="list-group">');
        $formE.append($listE);

        var count = 0;
        if (arrarr && arrarr.length >= 0) {

            for (var i = 0; i < arrarr.length - 2; i++) {
                //cnt++;
                
                    var $listItemE = $('<li class="list-group-item">');

                    var $radioE = $('<div class="radio">');
                    var $radioLabelE = $('<label>');
                    var $radioInputE = $('<input type="radio" name="q_num">').attr('value', i);
                    //console.log(`info.q_num=${info.q_num}`);
                    var intv = parseInt(v[i] = v[i] ? v[i] : 0);
                console.log(`totalv=${totalv}`);
                    
                    $radioLabelE.append($radioInputE).append(arrarr[i + 2] + ' (' + intv + '명)');
                    $radioE.append($radioLabelE);

                var pecent = intv === 0 && totalv === 0 ? "0" : (intv / totalv * 100).toFixed(2);
                console.log(`pecent=${pecent}`);
                    var $progressDivE = $('<div class="progress">');
                    var $progressE = $('<div class="progress-bar" role="progressbar" style="width: ' + pecent + '%;" aria-valuenow="' + pecent + '" aria-valuemin="0" aria-valuemax="100">').text(pecent + "%");
                    $progressDivE.append($progressE);

                    $listItemE.append($radioE).append($progressDivE);

                    $listE.append($listItemE);


            }
        }

        var $submitBtnE = $('<button type="button" class="btn btn-info brdupdate" >투표</button>');
        $submitBtnE.bind("click", { type: 'pollupdate', info: info, self: this, arg: arg }, this.eventHandler);
        $formE.append($submitBtnE);

        $title.text(subjects[1]);
        console.log(`subjects[1]=${subjects}`);
        return $temp;
    };
}

class GroupBoardView extends ViewBase {
    constructor() {
        super();

        this.tabMenu = null;
        this.sidemenu = null;
        this.topmenu = null;
    }

    createList (info7, arg, eventHandler) {

        var loginfo = info7.loginfo;
        var arrarr = info7.arrarr;
        var grouparr = info7.grouparr;
        //console.log(`info2grouparr=${info7.grouparr}`);
        var $temp = $('<div>');

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                console.log('createGroupBoardView info.bctype====' + info.bctype);
                if (info.bctype && info.bctype == 'thumbnail') {

                } else if (info.bctype && info.bctype == 'media') {

                } else if (info.bctype && info.bctype == 'timeline') {

                } else if (info.bctype && info.bctype == 'carousel') {

                } else {
                    var tableE = $('<table class="table table-hover table-striped">');
                    if (arg.cls) {
                        var cls = 'table-' + arg.cls;
                        tableE.addClass(cls);
                    }

                    //var tHeadE = $("<thead>");

                    var tBodyE = $("<tbody>");
                    var tFootE = $("<tfoot>");

                    //$(tableE).append(tHeadE);
                    $(tableE).append(tFootE);
                    $(tableE).append(tBodyE);

                    var trE = $("<tr>");
                    var tdE = $("<td>").attr("colspan", "5");
                    $(trE).append(tdE);
                    $(tFootE).append(trE);

                    if (arr != null && arr.length > 0) {

                        for (var j = 0; j < arr.length; j++) {

                            var info2 = arr[j];

                            var trE = $("<tr>");

                            var tdE1 = $("<td>").text(info2.subject);
                            //var tdE2 = $("<td>").text(subject).css("text-overflow", "ellipsis");
                            //var tdE3 = $("<td>").text(id);
                            //var tdE4 = $("<td>").text(signdate);
                            //var tdE5 = $("<td>").text(ref);

                            $(trE).append(tdE1);  //.append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                            $(tBodyE).append(trE);
                            $(trE).bind("click", { type: 'boardrecord', info: info2, loginfo: loginfo, self: this, arg: arg }, eventHandler);
                            $(trE).attr('style', 'cursor:pointer;cursor: hand;');
                        }

                    } else {
                        var trE = $("<tr>");

                        var tdE1 = $("<td>").text('레코드가 없습니다');
                        //var tdE2 = $("<td>").text(subject).css("text-overflow", "ellipsis");
                        //var tdE3 = $("<td>").text(id);
                        //var tdE4 = $("<td>").text(signdate);
                        //var tdE5 = $("<td>").text(ref);
                        //alert('ggg �ѱ��׽�Ʈ');
                        $(trE).append(tdE1);  //.append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                        $(tBodyE).append(trE);

                    }

                    var info5 = {};
                    info5.coltype = "col-sm-6";  //box-default box-danger box-warning box-success box-solid
                    //info.boxtype = "col";
                    info5.rendertype = "general";
                    info5.collapse_btn = "ok";
                    info5.title = info.brdname;
                    var btn = $('<button type="button" class="btn btn-default" >더보기...</button>');
                    info5.customer_btn1 = btn;
                    //console.log('info.brdid====' + info.brdid);
                    arg.brdid = info.brdid;
                    $(btn).bind("click", { type: 'more', info: info, loginfo: loginfo, self: this, arg: arg }, eventHandler);
                    $(btn).attr('style', 'cursor:pointer;cursor: hand;');
                    info5.comment = tableE;

                    var card = new CardItem();
                    //alert("info.brdname:" + info.brdname);
                    $temp.append(card.createCardItem(info5));
                }
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);
        //console.log(`info2grouparr=${info7.grouparr}`);
        if (grouparr && grouparr.length == 1) {
            var $tabelem = $('<div>');
            $(arg.elem).before($tabelem);
            arg.$tabelem = $tabelem;
            if (this.tabMenu == null)
                this.tabMenu = new TabMenuView();
            this.tabMenu.createGroupBoardTabMenu(arrarr, arg, eventHandler);
        }

        var el = document.getElementById("main_top_board_menu");
        if (el) {
            //$(el).empty();
            if (this.topmenu == null)
                this.topmenu = new TopMenuView();
            arg.topelem = el;
            this.topmenu.createBoardTopMenu(info7, arg, eventHandler);
        }

        var el = document.getElementById("main_side_board_menu");
        //console.log(`grouparr.length=${grouparr.length} this.sidemenu=${this.sidemenu}`);
        if (el) {
            //$(el).empty();
            //console.log(`info7.grouparr=${info7.grouparr}`);
            if (this.sidemenu == null)
                this.sidemenu = new SideMenuView();
            arg.sideelem = el;
            this.sidemenu.createBoardSideMenu(info7, arg, eventHandler);
        }

        
        //alert($temp.html());
        return $temp;
    }
}

class ShopView {
    constructor() {
        
    }
}

class PollView extends ViewBase {
    constructor() {
        super();
        this.boxcount = 0, this.itemcount = 0;
    }

    eventHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        var info = e.data.info;
        var arg = e.data.arg;
        var self = e.data.self;
        var type = e.data.type;
        //console.log(`eventHandler(e) arg.self.startBoardRequest==${arg.self.startBoardRequest}`);
        if (type == 'pollrecord') {
            var str = `/pollview.poll?code=${arg.code}&dbpath=${arg.dbpath}&uid=${info.uid}&fid=${info.fid}&utf8=ok&`;
            //console.log("eventHandler(e) str == " + str);
            //var arg2 = { path: str, type: "pollview", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, rendertype: arg.rendertype, self: this };
            arg.path = str;
            arg.type = "pollview";
            arg.self.pollList(arg);
        } else if (type == 'pollupdate') {
            var form = document.getElementById("pollForm");
            var q_num = $("input[name='q_num']:checked").val();
            var str = `/pollupdate.poll?code=${arg.code}&dbpath=${arg.dbpath}&q_num=${q_num}&uid=${info.uid}&fid=${info.fid}&utf8=ok&`;
            //console.log(`pollupdate str==${str}`);
            //var arg2 = { path: str, type: "pollview", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, rendertype: arg.rendertype, self: this };
            arg.path = str;
            arg.type = "pollview";
            arg.self.pollList(arg);
        } else if (type == 'pollmake' || type == 'pollwrite') {
            //console.log(`pollmake eventhandle`);
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
            arg.self.pollList(arg);
        } else if (type == 'pollpage') {

            var str = "/polllist.poll?code=" + arg.code + "&page=" + e.data.page + "&uid=" + arg.uid + "&dbpath=" + arg.dbpath + "&brdid=" + arg.brdid + "&";
            //var arg = { path: str, type: "polllist", dbpath: arg.dbpath, code: arg.code, brdid: arg.brdid, elem: arg.elem, rendertype: arg.rendertype, self: arg.self };
            arg.path = str;
            arg.type = "polllist";
            //console.log("eventHandler(e) str == " + str);
            arg.self.pollList(arg);
        } else if (type == 'return') {
            //console.log('info.uid=', info.uid, ' info.fid=', info.fid);
            arg.renderinfo.$parent.getReturnValue('poll', arg.dbpath, info.uid, info.fid);
        }
    }

    createList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var $tableE = $(`<table class="table table-hover table-striped ${arg.cls}">`);

        var tHeadE = $("<thead>");
        var tFootE = $("<tfoot>");
        var tBodyE = $("<tbody>");

        $tableE.append(tHeadE);
        $tableE.append(tBodyE);
        $tableE.append(tFootE);
        //$(tableE).attr("data-roll", "table");
        //$(tableE).addClass("table no-margin");
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 40%'>").text("제 목");
        var thE3 = $("<th style='width: 20%'>").text("시작일");
        var thE4 = $("<th style='width: 20%'>").text("종료일");
        var thE5 = $("<th style='width: 15%'>").text("아이디");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "5");
        $(trE).append(tdE);
        $(tFootE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("설문작성");
        $buttonE.bind("click", { type: 'pollwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);

        var p = new PageNavView();
        arg.pageelem = tdE;
        p.createPageNavView(info2, arg, this.eventHandler);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        arg.findelem = tdE;
        var f = new BoardFindView();
        f.createFindView(info2, arg, this.eventHandler);

        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                //console.log("arrarr.length fid== " + info.fid + 'uid==' + info.uid);
                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.fid);
                var tdE2 = $("<td>").text(info.subject).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.starttime);

                var tdE4 = $("<td>").text(info.endtime);
                var tdE5 = $("<td>").text(info.id);;

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);
                $(tBodyE).append(trE);

                //article_num--;

                $(tdE2).bind("click", { type: 'pollrecord', info: info, self: this, arg: arg }, this.eventHandler);
                $(tdE2).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    };

    createPollView(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;
        //console.log(`createPollView arg.self.startBoardRequest==${arg.self.startBoardRequest}`);
        var $temp = $("<div>");
        var $title = $("<h4>");
        var $formE = $('<form id="pollForm" method="post" onsubmit="return OnPollUpdateSubmit(this)">');

        $formE.append('<input type="hidden" name="code" id="code" value=' + arg.code + ' />');
        $formE.append('<input type="hidden" name="dbpath" id="dbpath" value=' + arg.dbpath + ' />');
        $formE.append('<input type="hidden" name="fid" value=' + arg.fid + ' />');

        //$(arg.boardid).append(tableE);
        $temp.append($title).append($formE);

        var $listE = $('<ul class="list-group">');
        $formE.append($listE);

        var count = 0, totalv = 0;
        var info = null;
        if (arrarr && arrarr.length >= 0) {

            for (var i = 0; i < arrarr.length; i++) {
                var info = arrarr[i];
                var v = info.v ? info.v : 0;
                totalv = totalv + parseInt(v);
            };
            var subject;
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;
                subject = info.subject;
                if (arr != null && arr.length > 0) {

                } else {
                    var $listItemE = $('<li class="list-group-item">');

                    var $radioE = $('<div class="radio">');
                    var $radioLabelE = $('<label>');
                    var $radioInputE = $('<input type="radio" name="q_num">').attr('value', info.q_num);
                    //console.log(`info.q_num=${info.q_num}`);
                    var intv = parseInt(info.v = info.v ? info.v : 0);
                    //console.log(`info.v=${info.v}`);
                    //console.log(`intv=${intv}`);
                    $radioLabelE.append($radioInputE).append(info.q + ' (' + intv + '명)');
                    $radioE.append($radioLabelE);

                    var pecent = parseInt((intv / totalv) * 100);
                    var $progressDivE = $('<div class="progress">');
                    var $progressE = $('<div class="progress-bar" role="progressbar" style="width: ' + pecent + '%;" aria-valuenow="' + pecent + '" aria-valuemin="0" aria-valuemax="100">').text(pecent + "%");
                    $progressDivE.append($progressE);

                    $listItemE.append($radioE).append($progressDivE);

                    $listE.append($listItemE);


                    //article_num--;
                }
            }
        }

        var $submitBtnE = $('<button type="button" class="btn btn-info brdupdate" >투표</button>');
        $submitBtnE.bind("click", { type: 'pollupdate', info: info, self: this, arg: arg }, this.eventHandler);
        $formE.append($submitBtnE);

        $title.text(subject);

        var btn1 = $('<button type="button" class="btn btn-info brdupdate" >설문작성</button>');
        $(btn1).bind("click", { type: 'pollmake', info: info, self: this, arg: arg }, this.eventHandler);
        //$(btn1).attr('style', 'cursor:pointer;cursor: hand;');
        $temp.append(btn1);

        if (arg.renderinfo && arg.renderinfo.returntype === "return") {
            var $divE = $('<div class="alert">');

            var $buttonE = $("<button type='button' class='btn btn-info'>리턴</button>");
            $buttonE.bind("click", { type: "return", self: this, arg: arg, info: info }, this.eventHandler);
            $divE.append($buttonE);

            $temp.append($divE);
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    };

    insertItem(title, boxnum) {
        this.itemcount++;

        var $row = $('<div class="row">');
        var $col1 = $('<label class="col-2">').append("설문항목:");
        var $col2 = $('<input type="text" name="q" tip="q" class="col-8">').attr("box-num", boxnum);

        var $col6 = $('<button class="col-1 btn btn-outline-info home-make-btns" id="itemdel" class="col-1" >x</button>').attr("box-num", boxnum);
        $row.append($col1).append($col2).append($col6);
        return $row;
    }

    boxCalculate(boxnum) {
        var qsize = 0;
        $('#pollmake-body').children().each(function () {
            $(this).find('[tip=q]').attr('name', 'q' + qsize);
            //$("#pollForm input[name=q_num]").val(qsize);
            console.log($(this).html());

            qsize++;
        });
        //alert("boxSum = " + boxSum);
        $("#pollmakeForm input[name=q_size]").val(qsize);
        //$('#box-input-sum-' + boxnum).val(boxSum);
    }

    createPollMakeEvent(info2, arg, eventHandler) {
        var self = this;
        
        $(document).on("click", ".home-make-btns", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var btnid = $(this).attr("id");
            if (btnid == "addItem") {
                var tit = $(this).prev().val();
                $('#pollmake-body').append(self.insertItem(tit, 1));
                //$(this).prev().val("");
            } else if (btnid == "boxdel") {
                $(this).parent().parent().parent().parent().remove();
                //self.allCalculate();
            } else if (btnid == "itemdel") {
                $(this).parent().remove();
                var box_num = $(this).attr("box-num");
                self.boxCalculate(box_num);
                //self.allCalculate();
            } else if (btnid == "pollmakesubmit") {
                console.log("pollmakesubmit");
                self.boxCalculate(box_num);
                var form = document.getElementById("pollmakeForm");
                form.dbpath.value = arg.dbpath;
                arg.type = "polllist";
                arg.form = form;
                var formData = $(form).serializeArray();

                arg.formData = formData;
                var str = "/pollmake.poll?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
                arg.path = str;
                console.log(' arg.path=' + arg.path);
                arg.self.postAjax(arg);
            } else {
                var box_num = $(this).attr("box-num");
                var tit = $(this).prev().val();
                $('#boxbody-' + box_num).append(self.insertItem(tit, box_num));
                $(this).prev().val("");
            }

        });

    }

    createPollMakeView(info2, arg, eventHandler) {
        this.boxcount = 0, this.itemcount = 0;

        var pv = `<form id="pollmakeForm" method="post" onsubmit="return OnSubmit(this)">
                    <input type="hidden" name="code" id="code" value="poll" />
                    <input type="hidden" name="dbpath" id="dbpath" />
                    <input type="hidden" name="brdid" id="brdid" value="1" />
                    <input type="hidden" name="posttype" id="posttype" value="post" />
                    <input type="hidden" name="q_size" id="q_size" />

                    <div class="card-header">
                        설문만들기
                        <div class="pull-right form-inline">
                            <button class="btn btn-outline-info home-make-btns" id="addItem">설문항목추가</button>
                        </div>
                    </div>
                    <div class="card-body" id="pollmake-body">

                    </div>
                    <div class="card-footer">
                        <div class="d-flex">
                            <label>시작일:</label>
                            <input class="form-control mr-sm-2" type="date" name="starttime" placeholder="시작일" aria-label="시작일">
                            <label>종료일:</label>
                            <input class="form-control mr-sm-2" type="date" name="endtime" placeholder="종료일" aria-label="종료일">
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="optionsRadios">
                                Good
                            </label>
                        </div>
                        <label for="sum" class="control-label">제목</label>
                        <input type="text" class="form-control mb-auto" name="subject" value="" placeholder="설문제목..." required />
                        <div class="pull-right">
                            <input class="home-make-btns" type="submit" id="pollmakesubmit" placeholder="설문전송" value="전송">
                        </div>
                    </div>
                </form>`;

        this.createPollMakeEvent(info2, arg, eventHandler);

        return pv;
    }
}

class PageNavView {
    constructor() {

    }

    createPageNavView(info2, arg, eventHandler) {
        var info = info2;
        var pageinfo = info2.pageinfo;
        //alert('createPageNavView pageinfo=' + pageinfo);
        if (pageinfo == null || pageinfo == undefined)
            return;
        var pagetype = pageinfo.pagetype;
        var page = pageinfo.page;
        var page_block = pageinfo.page_block;  
        var total_record = pageinfo.total_record;
        var recordnum = pageinfo.recordnum;
        var page_num = pageinfo.page_num;

        var totalpage = Math.ceil(total_record / page_num);
        var totalblock = Math.ceil(totalpage / page_block);
        var block = Math.ceil(page / page_block);  

        var firstpage = (block - 1) * page_block;
        var lastpage = block * page_block;
        if (totalblock <= block)
            lastpage = totalpage;

        //var len = parseInt(block) + 2;
        var len = parseInt(lastpage - firstpage) + 2;

        //console.log("totalpage==" + totalpage + "page_block==" + page_block + "block ==" + block + "total_record==" + total_record + "page==" + page);
        var $temp = $('<div>');
        for (var i = 0; i < len; i++) {
            var $buttonE = $("<input type='button' class='btn  btn-default'>");
            $buttonE.attr("id", "p" + i).attr("float", "left");
            var tnum = firstpage + i;
            //console.log(`page tnum=${tnum} len=${len} i=${i} firstpage=${firstpage} lastpage=${lastpage}`);
            if (i === 0) {
                $buttonE.val('<');
                if (block > 1) {
                    $buttonE.removeAttr('disabled');
                }
                else {
                    $buttonE.attr('disabled', 'disabled');
                }
            }
            else if (i === len - 1) {
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

            if (page === tnum) {
                // this["p"+dirNum].visible = true;
                $buttonE.attr('disabled', 'disabled');
            }
            //arg.page = tnum;
            //console.log(`createPageNavView pagetype=${pagetype}`);
            $buttonE.bind("click", { type: pagetype, page: tnum, info: info, arg: arg }, eventHandler);
            //$buttonE.attr('style', 'cursor:pointer;cursor: hand;');
            $($temp).append($buttonE);
            
        }

        $(arg.pageelem).append($temp);
        
        return $temp;
    }
}

class ErpFindView {
    constructor() {

    }

    createFindView(info2, arg, eventHandler) {
        var info = info2;

        var dbpath = arg.dbpath;
        var code = arg.code;
        var brdid = arg.brdid;
        var page = arg.page;

        var $temp = $('<div>');

        var $form = $("<form id='findform' class='form-inline'>");

        //var $selE = $("<select name='keyfield'>");
        var $keyfieldE = $('<select name="keyfield" id="keyfieldsel">');
        $form.append($keyfieldE);
        //$("#keyfieldsel option").remove();
        var $optionE1, $optionE2, $optionE3;
        //console.log('createFindView( code=' + code);
        if (code === "employee") {
            $optionE1 = $("<option value='empname' selected>이름</option>");
            $optionE2 = $("<option value='buse'>부서</option>");
            $optionE3 = $("<option value='id'>아이디</option>");
            $keyfieldE.append($optionE1).append($optionE2).append($optionE3);
        } else if (code === "company") {
            $optionE1 = $("<option value='companyname' selected>회사명</option>");
            $optionE2 = $("<option value='uptae'>업태</option>");
            $optionE3 = $("<option value='jongmok'>종목</option>");
            $keyfieldE.append($optionE1).append($optionE2).append($optionE3);
        } else if (code === "maeib_chul") {
            $optionE1 = $("<option value='companyname' selected>회사명</option>");
            $optionE2 = $("<option value='mtype'>타입</option>");
            $optionE3 = $("<option value='id'>아이디</option>");
            $keyfieldE.append($optionE1).append($optionE2).append($optionE3);
        } else if (code === "rental") {
            $optionE1 = $("<option value='subject' selected>제목</option>");
            $optionE2 = $("<option value='comment'>내용</option>");
            $optionE3 = $("<option value='id'>아이디</option>");
            $keyfieldE.append($optionE1).append($optionE2).append($optionE3);
        } else if (code === "workday") {
            $optionE1 = $("<option value='subject' selected>제목</option>");
            $optionE2 = $("<option value='comment'>내용</option>");
            $optionE3 = $("<option value='id'>아이디</option>");
            $keyfieldE.append($optionE1).append($optionE2).append($optionE3);
        } else if (code === "customer") {
            $optionE1 = $("<option value='subject' selected>제목</option>");
            $optionE2 = $("<option value='comment'>내용</option>");
            $optionE3 = $("<option value='id'>아이디</option>");
            $keyfieldE.append($optionE1).append($optionE2).append($optionE3);
        } else if (code === "empmanager") {
            $optionE1 = $("<option value='subject' selected>제목</option>");
            $optionE2 = $("<option value='comment'>내용</option>");
            $optionE3 = $("<option value='id'>아이디</option>");
            $keyfieldE.append($optionE1).append($optionE2).append($optionE3);
        }

        var $keyE = $("<input type='text' name='key' value=''>");
        $form.append($keyE);

        $temp.append($form);

        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button");
        $buttonE.attr("id", "find");
        $buttonE.attr("name", "radio");
        $buttonE.css("float", "right");
        $buttonE.val("검색");
        $buttonE.bind("click", { type: 'erpfind', info: info, arg: arg }, eventHandler);
        $buttonE.attr('style', 'cursor:pointer;cursor: hand;');
        $form.append($buttonE);

        $(arg.findelem).append($temp);
        return $temp;
    }
}

class BoardFindView {
    constructor() {

    }

    createFindView(info2, arg, eventHandler) {
        var info = info2;
        var pageinfo = info2.pageinfo;
        var dbpath = arg.dbpath;
        var code = arg.code;
        var brdid = arg.brdid;
        console.log(`createFindView pageinfo=${pageinfo}`);
        var page = pageinfo.page;
        

        var $temp = $('<div>');

        var $form = $("<form id='findform' class='form-inline'>");

        //var $selE = $("<select name='keyfield'>");
        var $keyfieldE = $('<select name="keyfield" id="keyfieldsel">');
        $form.append($keyfieldE);
        //$("#keyfieldsel option").remove();
        var $optionE1, $optionE2, $optionE3;

        $optionE1 = $("<option value='subject' selected>제 목</option>");
        $optionE2 = $("<option value='comment'>내 용</option>");
        $optionE3 = $("<option value='id'>아이디</option>");
        $keyfieldE.append($optionE1).append($optionE2).append($optionE3);

        /*** 
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
        ***/
        var $keyE = $("<input type='text' name='key' value=''>");
        $form.append($keyE);


        //$selE.append($optionE1).append($optionE2).append($optionE3);
        //$form.append($selE);
        $temp.append($form);

        //$(tFootE).append($temp);

        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button");
        $buttonE.attr("id", "find");
        $buttonE.attr("name", "radio");
        $buttonE.css("float", "right");
        $buttonE.val("검색");
        $buttonE.bind("click", { type: 'boardfind', page: page, info: info, arg: arg }, eventHandler);
        $buttonE.attr('style', 'cursor:pointer;cursor: hand;');
        $form.append($buttonE);

        $(arg.findelem).append($temp);
        return $temp;
    }
}