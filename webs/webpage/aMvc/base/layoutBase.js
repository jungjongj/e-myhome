class MainLayoutEx extends MainLayout {

    constructor() {
        super();
        //console.log(`this.controls.length==${this.controls.length}`);
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

    deSerializeMakebox(homepageMaker, parentBox, eventHandler, info) {

        //console.log(`info.renderinfo=`, info.renderinfo);
        if (info.controls) {
            for (var i = 0; i < info.controls.length; i++) {

                var ininfo = info.controls[i];

                var cls = null;
                if (!ininfo.controls) {
                    if (ininfo.renderinfo) {
                        var config = ininfo.renderinfo;
                        var cls = eval(`new ${ininfo.classname}(config);`);

                        var boxinfo = { ltype: ininfo.ltype, title: ininfo.classname };
                        boxinfo.parentltype = $(`#boxbody${parentBox.attr('boxnum')}`).attr('ltype');
                        boxinfo.renderinfo = ininfo.renderinfo;
                        var box = homepageMaker.createItemBox(boxinfo, eventHandler);
                        $(`#boxbody${parentBox.attr('boxnum')}`).append(box);
                        //console.log(`ininfo.renderinfo=`, ininfo.renderinfo);
                        cls.renderController($(`#boxbody${box.attr('boxnum')}`));
                    } else {
                        cls = eval(`new ${ininfo.classname}();`);
                        var boxinfo = { ltype: ininfo.ltype, title: ininfo.classname };
                        boxinfo.parentltype = $(`#boxbody${parentBox.attr('boxnum')}`).attr('ltype');
                        var box = homepageMaker.createItemBox(boxinfo, eventHandler);
                        $(`#boxbody${parentBox.attr('boxnum')}`).append(box);
                        cls.renderController($(`#boxbody${box.attr('boxnum')}`));
                    }
                } else {
                    cls = eval(`new ${ininfo.classname}();`);
                    var boxinfo = { ltype: ininfo.ltype, title: ininfo.classname };
                    boxinfo.parentltype = $(`#boxbody${parentBox.attr('boxnum')}`).attr('ltype');
                    var box = homepageMaker.createItemBox(boxinfo, eventHandler);
                    //console.log(`ininfo.ltype=`, ininfo.ltype);
                    //console.log(`ininfo.classname=`, ininfo.classname);
                    $(`#boxbody${parentBox.attr('boxnum')}`).append(box);
                    cls.deSerializeMakebox(homepageMaker, box, eventHandler, ininfo);
                }
                
            }
        } else {
            
            var boxinfo = { ltype: info.ltype, title: info.classname };
            boxinfo.parentltype = $(`#boxbody${parentBox.attr('boxnum')}`).attr('ltype');
            boxinfo.renderinfo = info.renderinfo;
            var box = homepageMaker.createItemBox(boxinfo, eventHandler);
            $(`#boxbody${parentBox.attr('boxnum')}`).append(box);

            var config = info.renderinfo;
            if (info.classname && info.renderinfo) {

                var cls = eval(`new ${info.classname}(config);`);
                //console.log(`info.renderinfo=`, info.renderinfo);
                cls.renderController($(`#boxbody${box.attr('boxnum')}`));
            }
        }

    }
}

class HorizontalLayoutEx extends HorizontalLayout {

    constructor() {
        super();
    }

    renderController(elem) {
        //console.log(`HorizontalLayoutEx this.controls.length==${this.controls.length}`);
        var $temp = $(`<div class="row">`);
        $(elem).append($temp);
        for (var i = 0; i < this.controls.length; i++) {
            var c = this.controls[i];
            //console.log(`c[0]==${c[0]}`);
            //console.log(`c[1]==${c[1]}`);
            var divElem = $(`<div>`);
            var divElem2 = $(`<div>`).addClass(`col-md-${c[1]}`);
            divElem2.append(divElem);
            $temp.append(divElem2);
            //console.log(`c[0].renderController==${c[0].renderController}`);
            if (c[0].renderController) {
                c[0].renderController(divElem2);
            }
            else {
                $(divElem2).append(c[0]);
            }
                
        }
        //console.log(`HorizontalLayoutEx $temp.html()=${$temp.parent().html()}`);
    }

    setControl() {
        this.controls = Array.prototype.slice.call(arguments);
        //console.log(this.columns);
    }

    addControl(controlArr) {
        
        this.controls.push(controlArr);
    }

    deSerializeMakebox(homepageMaker, parentBox, eventHandler, info) {

        if (info.controls) {
            for (var i = 0; i < info.controls.length; i++) {

                var arr = info.controls[i];
                var ininfo = arr[0];
                var col = arr[1];
                //console.log(`info.controls.length=`, info.controls.length);
                //console.log(`col=`, col);
                
                var cls = null;
                if (!ininfo.controls) {
                    if (ininfo.renderinfo) {
                        var config = ininfo.renderinfo;
                        var cls = eval(`new ${ininfo.classname}(config);`);

                        var boxinfo = { ltype: ininfo.ltype, title: ininfo.classname };
                        boxinfo.parentltype = $(`#boxbody${parentBox.attr('boxnum')}`).attr('ltype');
                        boxinfo.renderinfo = ininfo.renderinfo;
                        boxinfo.parentcol = col;
                        var box = homepageMaker.createItemBox(boxinfo, eventHandler);
                        $(`#boxbody${parentBox.attr('boxnum')}`).append(box);
                        //console.log(`info.renderinfo=`, info.renderinfo);
                        cls.renderController($(`#boxbody${box.attr('boxnum')}`));
                    } else {
                        cls = eval(`new ${ininfo.classname}();`);
                        var boxinfo = { ltype: ininfo.ltype, title: ininfo.classname };
                        boxinfo.parentltype = $(`#boxbody${parentBox.attr('boxnum')}`).attr('ltype');
                        boxinfo.parentcol = col;
                        var box = homepageMaker.createItemBox(boxinfo, eventHandler);
                        $(`#boxbody${parentBox.attr('boxnum')}`).append(box);
                        cls.renderController($(`#boxbody${box.attr('boxnum')}`));
                    }
                } else {
                    cls = eval(`new ${ininfo.classname}();`);

                    var boxinfo = { ltype: ininfo.ltype, title: ininfo.classname };
                    boxinfo.parentltype = $(`#boxbody${parentBox.attr('boxnum')}`).attr('ltype');
                    boxinfo.parentcol = col;
                    var box = homepageMaker.createItemBox(boxinfo, eventHandler);
                    //console.log(`ininfo.ltype=`, ininfo.ltype);
                    //console.log(`ininfo.classname=`, ininfo.classname);
                    $(`#boxbody${parentBox.attr('boxnum')}`).append(box);
                    cls.deSerializeMakebox(homepageMaker, box, eventHandler, ininfo);
                }
                //this.controls[i] = [cls, col];

            }
        } else {
            var boxinfo = { ltype: info.ltype, title: info.classname };
            boxinfo.parentltype = $(`#boxbody${parentBox.attr('boxnum')}`).attr('ltype');
            boxinfo.renderinfo = info.renderinfo;
            var box = homepageMaker.createItemBox(boxinfo, eventHandler);
            $(`#boxbody${parentBox.attr('boxnum')}`).append(box);
            var config = info.renderinfo;
            if (info.classname && info.renderinfo) {
                var cls = eval(`new ${info.classname}(config);`);
                //console.log(`info.renderinfo=`, info.renderinfo);
                cls.renderController($(`#boxbody${box.attr('boxnum')}`));
                //this.controls[i] = [cls, col];
            }
        }

    }
}

class VerticalLayoutEx extends VerticalLayout {

    constructor() {
        super();
        
    }

    renderController(elem) {
       // console.log('VerticalLayoutEx this.controls.length=' + this.controls.length);
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

    deSerializeMakebox(homepageMaker, parentBox, eventHandler, info) {
        //console.log(`info.controls=`, info.controls);
        
        if (info.controls) {
            for (var i = 0; i < info.controls.length; i++) {
                //console.log(`info.controls.length=`, info.controls.length);
                var ininfo = info.controls[i];
                //console.log(`ininfo=`, ininfo);
                //console.log(`ininfo.controls=`, ininfo.controls);
                var cls = null;
                if (!ininfo.controls) {
                    console.log(`ininfo.renderinfo=`, ininfo.renderinfo);
                    console.log(`ininfo.classname=`, ininfo.classname);
                    if (ininfo.renderinfo) {
                        var config = ininfo.renderinfo;
                        cls = eval(`new ${ininfo.classname}(config);`);

                        var boxinfo = { ltype: ininfo.ltype, title: ininfo.classname };
                        boxinfo.parentltype = $(`#boxbody${parentBox.attr('boxnum')}`).attr('ltype');
                        boxinfo.renderinfo = ininfo.renderinfo;
                        var box = homepageMaker.createItemBox(boxinfo, eventHandler);
                        $(`#boxbody${parentBox.attr('boxnum')}`).append(box);

                        cls.renderController($(`#boxbody${box.attr('boxnum')}`));
                    } else {
                        cls = eval(`new ${ininfo.classname}();`);
                        var boxinfo = { ltype: ininfo.ltype, title: ininfo.classname };
                        boxinfo.parentltype = $(`#boxbody${parentBox.attr('boxnum')}`).attr('ltype');
                        var box = homepageMaker.createItemBox(boxinfo, eventHandler);
                        $(`#boxbody${parentBox.attr('boxnum')}`).append(box);
                        cls.renderController($(`#boxbody${box.attr('boxnum')}`));
                    }
                } else {
                    //console.log(`ininfo.classname=`, ininfo.classname);
                    cls = eval(`new ${ininfo.classname}();`);
                    var boxinfo = { ltype: ininfo.ltype, title: ininfo.classname };
                    boxinfo.parentltype = $(`#boxbody${parentBox.attr('boxnum')}`).attr('ltype');
                    var box = homepageMaker.createItemBox(boxinfo, eventHandler);
                    //console.log(`ininfo.ltype=`, ininfo.ltype);
                   
                    $(`#boxbody${parentBox.attr('boxnum')}`).append(box);
                    cls.deSerializeMakebox(homepageMaker, box, eventHandler, ininfo);
                }

            }
        } else {

            var boxinfo = { ltype: info.ltype, title: info.classname };
            boxinfo.parentltype = $(`#boxbody${parentBox.attr('boxnum')}`).attr('ltype');
            boxinfo.renderinfo = info.renderinfo;
            var box = homepageMaker.createItemBox(boxinfo, eventHandler);
            $(`#boxbody${parentBox.attr('boxnum')}`).append(box);

            var config = info.renderinfo;
            if (info.classname && info.renderinfo) {

                var cls = eval(`new ${info.classname}(config);`);
                console.log(`info.renderinfo=`, info.renderinfo);
                cls.renderController($(`#boxbody${box.attr('boxnum')}`));
            }
        }

    }
}

class HomepageMaker {
    constructor(renderinfo) {
        
        this.arg = {};
        this.arg.renderinfo = renderinfo;
        if (renderinfo.elem)
            this.arg.elem = renderinfo.elem;
        else
            this.arg.elem = document.body;

        this._dbpath = renderinfo.dbpath ? renderinfo.dbpath : null;
        this._code = renderinfo.code ? renderinfo.code : null;
        if (this._dbpath)
            $('#select-db-btn').text(this._dbpath + "(" + this._code + ")");

        console.log('this._dbpath=', this._dbpath);
        console.log('this._code=', this._code);
        this.mainLayout = new MainLayoutEx();
        this.$selectedItemBox = null;
        this.boxcount = 0;
        this.itemcount = 0;
        this.codeSelValue = null;
        
        var info = { ltype: 'MainLayoutEx', title: 'Main' };
        $(this.arg.elem).append(this.createItemBox(info, this.eventHandler));

    }

    createFormView(info, eventHandler) {

        console.log('info.key' + info.key);

        var writeinfo = {};
        //writeinfo.rendertype = "general";
        writeinfo.boxtype = "box-success box-solid";
        writeinfo.titleicon = "";
        writeinfo.title = '';
        writeinfo.collapse_btn = "ok";

        var $writebox = $('<div>');

        var $writeForm = $('<form id="codemoduleform" action="post.board" method="post" class="form-horizontal">');

        $writeForm.append('<input type="hidden" name="code" value=""  />');
        $writeForm.append('<input type="hidden" name="dbpath" value=""  />');
        $writeForm.append('<input type="hidden" name="posttype" value="post"  />');
        $writeForm.append('<input type="hidden" name="brdid" value=""  />');
        $writeForm.append('<input type="hidden" name="uid" value=""  />');
        $writeForm.append('<input type="hidden" name="fid" value=""  />');
        $writeForm.append('<input type="hidden" name="thread" />');

        var $writeLabel = $('<label for="subject" class="col-sm-2 control-label"></label>');
        var $writeInput = $('<input type="text" name="subject" class="form-control" placeholder="subject">').val('');
        var $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);
        $writeLabel = $('<label for="comment" class="col-sm-4 control-label"></label>').text('내용');
        $writeInput = $('<textarea cols="40" rows="18" name="comment" id="summernote" class="form-control summernote" placeholder="내 용..." required="" autofocus="" type="text">').val('');
        $formGroup = $('<div class="form-group">').append($writeLabel).append($writeInput);
        $writeForm.append($formGroup);


        var btn1 = $('<button type="button" class="btn btn-info brdupdate" >전송</button>');
        $(btn1).bind("click", { type: 'boardpost', formid: 'boardpostform', info: info }, this.eventHandler);
        var $formitem = $('<div class="form-group">').append($(btn1));
        $writeForm.append($formitem);

        var btn1 = $('<button type="button" class="btn btn-info brdupdate" >리턴</button>');
        $(btn1).bind("click", { type: 'returncodemodule', formid: "codemoduleform", self: this, info: info }, this.eventHandler);
        var $formitem = $('<div class="form-group">').append($(btn1));
        $writeForm.append($formitem);

        $writebox.append($writeForm);

        writeinfo.comment = $writebox;
        var b = new CardItem();
        var $box = b.createCardItem(writeinfo);

        //this.summernoteSetting(arg.comment);
        return $writebox;
    };

    getReturnValue() {
        var self = this;
        var type, value;
        var arg = Array.prototype.slice.call(arguments);
        if (arg && arg[0])
            type = arg[0];
        else
            return;
        console.log(`getReturnValue () arg==${arg}`);
        //_tempCount++;
        var info = {};
        if (type == 'dbset') {
           
            this._dbpath = arg[1];
            this._code = arg[2];
            __modal.hide();
            $('#select-db-btn').text(this._dbpath + "(" + this._code + ")");
            //__fullscreenView.fullscreen('fullscreenwin');
        } else if (type == 'grouplist' || type == 'boardlist') {
            var dbpath = arg[1];
            var code = arg[2];
            var brdid = '', groupid = '';
            if(type == 'grouplist')
                groupid = arg[3];
            else
                brdid = arg[3];
            var rendertype = arg[4];
            this.$selectedItemBox.attr('type', type);
            this.$selectedItemBox.attr('dbpath', dbpath);
            this.$selectedItemBox.attr('code', code);
            this.$selectedItemBox.attr('groupid', groupid);
            this.$selectedItemBox.attr('brdid', brdid);
            this.$selectedItemBox.attr('rendertype', rendertype);
            this.$selectedItemBox.attr('ltype', type);

            var config = {
                type: type,
                dbpath: dbpath,
                code: code,
                groupid: groupid,
                brdid: brdid,
                rendertype: rendertype,
                renderview: 'BoardView'
            }
            console.log(`getReturnValue () rendertype==${rendertype}`);
            var boardElem = new BoardController(config);
            //console.log(`getReturnValue ()this.$selectedItemBox==${this.$selectedItemBox}`); console.log(`getReturnValue () code==${code}`);
            boardElem.renderController(this.$selectedItemBox);
            
            __modal.hide();
            //__fullscreenView.fullscreen('fullscreenwin');
        } else if (type == 'poll') {
            var dbpath = arg[1];
            var uid = arg[2];
            var fid = arg[3];
            var rendertype = arg[4];
            this.$selectedItemBox.attr('dbpath', dbpath);
            this.$selectedItemBox.attr('uid', uid);
            this.$selectedItemBox.attr('fid', fid);
            this.$selectedItemBox.attr('rendertype', rendertype);
            this.$selectedItemBox.attr('ltype', 'Poll');

            var config = {
                type: 'pollview',
                dbpath: dbpath,
                uid: uid,
                fid: fid,
                rendertype: rendertype,
                renderview: 'PollView'
            }
            var boardElem = new PollController(config);
            console.log(`getReturnValue uid==${uid}`); console.log(`getReturnValue () fid==${fid}`);
            boardElem.renderController(this.$selectedItemBox);
            __modal.hide();
            //__fullscreenView.fullscreen('fullscreenwin');
        } else if (type == 'keyvalue') {
            var dbpath = arg[1];
            var kcode = arg[2];
            var kname = arg[3];
            var rendertype = arg[4];
            this.$selectedItemBox.attr('dbpath', dbpath);
            this.$selectedItemBox.attr('kcode', kcode);
            this.$selectedItemBox.attr('kname', kname);
            this.$selectedItemBox.attr('rendertype', rendertype);

            if (kcode == '_fab') {
                var config = {};
                config.type = 'dbfab';
                config.dbpath = dbpath;
                config.kcode = kcode;
                config.kname = kname;
                config.path = `/mankeyvalue.adm?dbpath=${dbpath}&kcode=_fab&kname=${kname}&type=keyvalue&utf8=ok&`;
                config.width = 500;
                config.height = 500;
                var fabElem = new FabricLoader(config);
                console.log(`this.$selectedItemBox==${this.$selectedItemBox}`);
                console.log(`kcode==${kcode} kname=${kname}`);
                fabElem.renderController(this.$selectedItemBox);
                __modal.hide();
                return;
            }
            var config = {
                dbpath: dbpath,
                kcode: kcode,
                kname: kname,
                rendertype: kcode,
                $parent: self
            }
            if (kcode == '_list') {
                config.renderview = 'ListTreeView';
            } else if (kcode == '_ztree') {
                config.renderview = 'ZTreeView';
            } else if (kcode == '_topmenu') {
                config.renderview = 'TopMenuView';
            } else if (kcode == '_sidemenu') {
                config.renderview = 'SideMenuView';
            } else if (kcode == '_tabmenu') {
                config.renderview = 'TabMenuView';
            } else if (kcode == '_orgcharttree') {
                config.renderview = 'OrgChartTreeView';
            } else if (kcode == '_dynamictree') {
                config.renderview = 'DynamicTreeview';
            } else if (kcode == '_carousel') {
                config.renderview = 'CarouselView';
            } else if (kcode == '_fab') {
                config.renderview = 'FabricLoader';
            } else if (kcode == '_home') {
                config.renderview = 'HomepageMakerLoader';
            }
            var boardElem = new KeyvalueController(config);
            //console.log(`dbpath==${dbpath}`); console.log(`kcode==${kcode} kname=${kname}`);
            boardElem.renderController(this.$selectedItemBox);
            __modal.hide();
            //__fullscreenView.fullscreen('fullscreenwin');
        } else if (type == 'chat') {

        } else if (type == 'dbpath') {
            _dbpath = value;
            document.getElementById('dbInput').value = _dbpath;
        } else if (type == 'tablename') {
            _code = value;
            document.getElementById('tableInput').value = _code;
        } else if (type == 'filepath') {
            var arr = value.split('/');
            var str = "/filelist.file?code=" + arr[2] + "&filetype=open&filename=" + arr[1] + "&filepath=" + arr[0] + "&utf8=ok&";
            //alert(arr + str);
            FileAjax('fileopen', str);

        } else if (type == 'dbopen') {
            __modal.hide();
            this.LoadData(arg[1].info);
            //console.log('arg[1].info223333=', arg[1].info);
        } else if (type == 'icon') {

            alert(value);
        }
    }

    eventHandler(e) {
        e.stopPropagation();
        var info = e.data.info;
        //var arg = e.data.arg;
        var self = e.data.self;
        var type = e.data.type;
        var boxnum = e.data.boxnum;

        //console.log(`eventhandle type + 'set'= ${type + 'set'}`);
        if (type == 'dbselect') {
            var elem = document.createElement('div');
            var cls = new DbFileAjaxBase({ type: 'filelist', filetype: 'db', path: '', rendertype: 'ta', returntype: 'return', $parent: self });
            cls.fileList('', elem);
            //$('#dbsetModal').modal('show');
            __modal.show('디비셋팅', elem);
            //console.log('$(elem).html()==' + $(elem).html());
        } else if (type == 'itemadd') {
            var selvalue = info.ltype = $(`#elemsel${boxnum} option:selected`).val();
            info.title = $(`#elemsel${boxnum} option:selected`).text();
            info.parentltype = $(`#boxbody${boxnum}`).attr('ltype');
            //console.log(`info.title=${info.title}`)
            $(`#boxbody${boxnum}`).append(self.createItemBox(info, self.eventHandler));
        } else if (type == 'itemdel') {
            //console.log($(this).parent().html());
            $(this).parent().parent().parent().remove();
        } else if (type == 'Boardset') {
            self.$selectedItemBox = $(`#boxbody${boxnum}`);
            var renderview = self.$selectedItemBox.attr('renderview');
            var viewbody = self.$selectedItemBox.attr('viewbody');
            //console.log(`self.$selectedItemBox=${self.$selectedItemBox}`);
            //console.log(`renderview=${renderview}`);

            var config = {
                type: 'boardconfig',
                dbpath: self._dbpath,
                code: self._code,
                brdid: ' ',
                rendertype: e.data.ltype,
                renderview: 'BoardConfigView',
                returntype: 'return',
                $parent: self
            }

            var elem = document.createElement('div');
            var c = new BoardConfigController(config);
            c.renderController(elem);
            __modal.show('boardset', elem);
            
            //var f = new FullScreenView();
            //f.setContent(`뷰 보기`, elem);

        } else if (type == 'Pollset') {
            self.$selectedItemBox = $(`#boxbody${boxnum}`);
            var renderview = self.$selectedItemBox.attr('renderview');
            var viewbody = self.$selectedItemBox.attr('viewbody');
            //console.log(`self.$selectedItemBox=${self.$selectedItemBox}`);
            console.log(`renderview=${renderview}`);

            var config = {
                type: 'polllist',
                dbpath: self._dbpath,
                code: self._code,
                rendertype: e.data.ltype,
                renderview: 'PollView',
                returntype: 'return',
                $parent: self
            }

            var elem = document.createElement('div');
            var c = new PollController(config);
            c.renderController(elem);
            __modal.show('pollset', elem);

            //var f = new FullScreenView();
            //f.setContent(`뷰 보기`, elem);

        } else if (type == 'Employeeset' || type == 'Companyset' || type == 'Maeib_chulset') {
            var code = ''; var renderview = '';
            if (type == 'Employeeset') {
                code = 'employee';
                renderview = 'EmployeeView';
            }
            if (type == 'Companyset') {
                code = 'company';
                renderview = 'CompanyView';
            }
            if (type == 'Maeib_chulset') {
                code = 'maeib_chul';
                renderview = 'Maeib_chulView';
            }
            self.$selectedItemBox = $(`#boxbody${boxnum}`);
            self.$selectedItemBox.attr('dbpath', self._dbpath);
            self.$selectedItemBox.attr('code', code);
            self.$selectedItemBox.attr('renderview', renderview);
            self.$selectedItemBox.attr('viewbody', '');
            
            var config = {
                type: 'erplist',
                dbpath: self._dbpath,
                code: code,
                rendertype: '',
                renderview: renderview
            }
            var boardElem = new ErpController(config);
            console.log(`getReturnValue uid==${'ab'}`);
            boardElem.renderController(self.$selectedItemBox);

        } else if (type == 'Login') {
            self.$selectedItemBox = $(`#boxbody${boxnum}`);
            var renderview = self.$selectedItemBox.attr('renderview');
            var viewbody = self.$selectedItemBox.attr('viewbody');
            //console.log(`self.$selectedItemBox=${self.$selectedItemBox}`);
            //console.log(`renderview=${renderview}`);
            var c = new LoginView();
            c.renderController(self.$selectedItemBox);
            //var f = new FullScreenView();
            //f.setContent(`뷰 보기`, elem);

        } else if ( type == 'Chat') {
            self.$selectedItemBox = $(`#boxbody${boxnum}`);
            var renderview = self.$selectedItemBox.attr('renderview');
            var viewbody = self.$selectedItemBox.attr('viewbody');
            console.log(`self.$selectedItemBox=${self.$selectedItemBox}`);
            //console.log(`renderview=${renderview}`);

            var c = new ChatView();
            c.renderController(self.$selectedItemBox);
            //var f = new FullScreenView();
            //f.setContent(`뷰 보기`, elem);

        } else if (type == 'RtcChat') {
            self.$selectedItemBox = $(`#boxbody${boxnum}`);
            var renderview = self.$selectedItemBox.attr('renderview');
            var viewbody = self.$selectedItemBox.attr('viewbody');
            //console.log(`self.$selectedItemBox=${self.$selectedItemBox}`);
            //console.log(`renderview=${renderview}`);
            var c = new RtcSignalingChat();
            c.renderController(self.$selectedItemBox);
            //var f = new FullScreenView();
            //f.setContent(`뷰 보기`, elem);

        } else if (type == '_codemoduleset') {
            self.$selectedItemBox = $(`#boxbody${boxnum}`);
            var renderview = self.$selectedItemBox.attr('renderview');
            var viewbody = self.$selectedItemBox.attr('viewbody');
            console.log(`self.$selectedItemBox=${self.$selectedItemBox}`);
            //console.log(`renderview=${renderview}`);
            
            __modal.show('글쓰기', self.createFormView(info, self.eventHandler));
            new SummerNoteSet('summernote');
        } else if (type == 'returncodemodule') {
            console.log(`self.$selectedItemBox=${self.$selectedItemBox}`);
            var form = document.getElementById(e.data.formid);
            self.$selectedItemBox.append(form.comment.value);
            __modal.hide();
        } else if (type == e.data.ltype + 'set') {
            var config = {
                dbpath: self._dbpath,
                kcode: e.data.ltype,
                kname: ' ',
                rendertype: e.data.ltype,
                editmode: 'ok',
                returntype:'return',
                $parent: self
            }
            self.$selectedItemBox = $(`#boxbody${boxnum}`);
            var renderview = self.$selectedItemBox.attr('renderview');
            var viewbody = self.$selectedItemBox.attr('viewbody');
            //console.log(`_dbpath=${self._dbpath}`);
            //console.log(`renderview=${renderview}`);
            var elem = document.createElement('div');
            var selectedLenderCon = null;
            if (e.data.ltype == '_list') {
                config.renderview = 'ListTreeView';
            } else if (e.data.ltype == '_ztree') {
                config.renderview = 'ZTreeView';
            } else if (e.data.ltype == '_topmenu') {
                config.renderview = 'TopMenuView';
            } else if (e.data.ltype == '_sidemenu') {
                config.renderview = 'SideMenuView';
            } else if (e.data.ltype == '_tabmenu') {
                config.renderview = 'TabMenuView';
            } else if (e.data.ltype == '_orgcharttree') {
                config.renderview = 'OrgChartTreeView';
            } else if (e.data.ltype == '_dynamictree') {
                config.renderview = 'DynamicTreeview';
            } else if (e.data.ltype == '_carousel') {
                config.renderview = 'CarouselView';
            } else if (e.data.ltype == '_fab') {
                config.renderview = 'ListTreeView';
            } else if (e.data.ltype == '_home') {
                config.renderview = 'ListTreeView';
            } else if (e.data.ltype == '_login') {
                config.renderview = 'LoginView';
            } else if (e.data.ltype == '_chat') {
                config.renderview = 'ChatView';
            } else if (e.data.ltype == '_chat') {
                config.renderview = 'ChatView';
            } else if (e.data.ltype == '_rtcchat') {
                config.renderview = 'RtcSignalingChat';
            }
            //console.log(`config.renderview=${config.renderview}`);
            selectedLenderCon = new KeyvalueController(config);
            //var c = new KeyvalueController('modal', _dbpath, e.data.ltype, 'aaa', 'list');
            //var c = new KeyvalueController('modal', _dbpath, e.data.ltype, '', e.data.ltype, self);
            selectedLenderCon.renderController(elem);
            __modal.show(e.data.ltype + ' set', elem);
            
            //var f = new FullScreenView();
            //f.setContent(e.data.ltype + ' set', elem);
        } else if (type == 'colchange') {
            //console.log($(this).val());
            $(this).parent().parent().parent().removeClass('col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12')
            $(this).parent().parent().parent().addClass('col-' + $(this).val());
        }
        else if (type == 'preview') {
            //console.log($(this).val());
            self.preview();
        }
    }

    allLayoutRenderer() {

        var self = this;
        self.mainLayout.controls = [];
        var num = $('._mainbody').children().length;

        $('._mainbody').children().each(function (idx, el) {

            //var $control = self.getRenderItem($(this));

            var boxnum = $(this).attr('boxnum');
            var ltype = $(el).attr('ltype');
            var $child = $(this).find(`#boxbody${boxnum}`);

            var $control = self.getRenderItem($child);
            //console.log(`boxnum=${boxnum}`);
            if ($control.constructor.name == 'HorizontalLayoutEx') {
                //console.log(` layoutBoxRenderer $(this).find()=${$(this).find('input').val()}`);
                self.mainLayout.addControl($control);
                self.layoutBoxRenderer($control, $child);
            } else if ($control.constructor.name == 'VerticalLayoutEx' || $control.constructor.name == 'MainLayoutEx') {
                self.mainLayout.addControl($control);
                self.layoutBoxRenderer($control, $child);
            } else {
                self.mainLayout.addControl($control);
            }

        });

    }

    layoutBoxRenderer($parent, $elem) {
        var self = this;
        //console.log(`$parent.constructor.name=`, $parent.constructor.name);
        if ($parent.constructor.name == 'HorizontalLayoutEx') {

            $elem.children().each(function (idx, el) {
                var boxnum = $(this).attr('boxnum');
                var $child = $(this).find(`#boxbody${boxnum}`);
                var $control = self.getRenderItem($child);
                
                if ($control.constructor.name == 'HorizontalLayoutEx') {
                    var col = $(this).find('input').val();
                    $parent.addControl([$control, col]);
                    self.layoutBoxRenderer($control, $child);
                } else if ($control.constructor.name == 'VerticalLayoutEx') {
                    var col = $(this).find('input').val();
                    $parent.addControl([$control, col]);
                    self.layoutBoxRenderer($control, $child);
                } else {
                    var col = $(this).find('input').val();
                    console.log(`$control.constructor.name=`, $control.constructor.name);
                    console.log(`$parent.constructor.name=`, $parent.constructor.name);
                    console.log(`col=`, col);
                    console.log(`$control.arg.renderinfo.renderview=`, $control.arg.renderinfo.renderview);
                    console.log(` layoutBoxRenderer $(this).find()=${$(this).find('input').val()}`);
                    $parent.addControl([$control, col]);
                }
            });
        } else {
            $elem.children().each(function (idx, el) {

                //var $control = self.getRenderItem($(this));

                var boxnum = $(this).attr('boxnum');
                var $child = $(this).find(`#boxbody${boxnum}`);
                var $control = self.getRenderItem($child);

                if ($control.constructor.name == 'HorizontalLayoutEx') {
                    
                    $parent.addControl($control);
                    self.layoutBoxRenderer($control, $child);
                } else if ($control.constructor.name == 'VerticalLayoutEx') {
                    $parent.addControl($control);
                    self.layoutBoxRenderer($control, $child);
                } else {
                    console.log(`$control.constructor.name=`, $control.constructor.name);
                    console.log(`$control=`, $control);
                    $parent.addControl($control);
                }


            });
        }
        
    }

    getRenderItem($elem) {
        var returnElem;
        var type = $elem.attr('ltype');
        var boxnum = $elem.attr('boxnum');
        var $child = $elem.find(`#boxbody${boxnum}`);
        console.log(`type=`, type);
        if (type == 'VerticalLayoutEx') {
            returnElem = new VerticalLayoutEx();
        } else if (type == 'HorizontalLayoutEx') {
            returnElem = new HorizontalLayoutEx();
        } else if (type == 'grouplist' || type == 'boardlist' || type == 'Board') {
            var dbpath = $elem.attr('dbpath');
            var type = $elem.attr('type');
            var code = $elem.attr('code');
            var brdid = $elem.attr('brdid');
            var groupid = $elem.attr('groupid');
            var rendertype = $elem.attr('rendertype');
            var config = {
                type: type,
                dbpath: dbpath,
                code: code,
                groupid: groupid,
                brdid: brdid,
                rendertype: rendertype,
                renderview: 'BoardView'
            }
            console.log(`config=`, config);
            returnElem = new BoardController(config);
        } else if (type == 'Poll') {
            var dbpath = $elem.attr('dbpath');
            var code = $elem.attr('code');
            var uid = $elem.attr('uid');
            var fid = $elem.attr('fid');
            var rendertype = $elem.attr('rendertype');
            var config = {
                type: 'pollview',
                dbpath: dbpath,
                code: code,
                uid: uid,
                fid: fid,
                rendertype: rendertype,
                renderview: 'PollView'
            }
            console.log(`type=`, type);
            console.log(`config.fid=`, config.fid);
            returnElem = new PollController(config);
        } else if (type == 'Employee' || type == 'Company' || type == 'employee' || type == 'company' || type == 'Maeib_chul' || type == 'maeib_chul') {
            var dbpath = $elem.attr('dbpath');
            var code = $elem.attr('code');
            var brdid = $elem.attr('brdid');
            var rendertype = $elem.attr('rendertype');
            var renderview = $elem.attr('renderview');
            var config = {
                type: 'erplist',
                dbpath: this._dbpath,
                code: code,
                renderview: renderview
            }
            console.log(`type=`, type);
            console.log(`config.renderview=`, config.renderview);
            returnElem = new ErpController(config);
        } else if (type == 'Chat') {
            returnElem = new ChatView();
        } else if (type == 'RtcChat') {
            returnElem = new RtcSignalingChat();
        } else if (type == '_module' || type == '_codemodule') {
            console.log(`$elem.html()=`, $elem.html());
            returnElem = new ModuleLoader({ data: $elem.html()});
        } else if (type == '_topmenu' || type == '_sidemenu' || type == '_tapmenu' || type == 'FabricLoader' ||
            type == '_list' || type == '_ztree' || type == '_orgcharttree' || type == '_dynamictree' || type == '_carousel' || type == '_fab') {
            var dbpath = $elem.attr('dbpath');
            var kcode = $elem.attr('kcode');
            var kname = $elem.attr('kname');
            var rendertype = $elem.attr('rendertype');
            console.log(`type=`, type);
            console.log(`dbpath==${dbpath} kname=${kname}`);
            if (kcode == '_fab' || type == 'FabricLoader') {
                var config = {};
                config.type = 'dbfab';
                config.dbpath = dbpath;
                config.kcode = kcode;
                config.kname = kname;
                config.path = `/mankeyvalue.adm?dbpath=${dbpath}&kcode=_fab&kname=${kname}&type=keyvalue&utf8=ok&`;
                config.width = 500;
                config.height = 500;
                var returnElem = new FabricLoader(config);
                console.log(`kcode==${kcode} kname=${kname}`);
                return returnElem;
            }

            var config = {
                dbpath: dbpath,
                kcode: kcode,
                kname: kname,
                rendertype: rendertype
            }
            if (type == '_list') {
                config.renderview = 'ListTreeView';
            } else if (type == '_ztree') {
                config.renderview = 'ZTreeView';
            } else if (type == '_topmenu') {
                config.renderview = 'TopMenuView';
            } else if (type == '_sidemenu') {
                config.renderview = 'SideMenuView';
            } else if (type == '_tabmenu') {
                config.renderview = 'TabMenuView';
            } else if (type == '_orgcharttree') {
                config.renderview = 'OrgChartTreeView';
            } else if (type == '_dynamictree') {
                config.renderview = 'DynamicTreeview';
            } else if (type == '_carousel') {
                config.renderview = 'CarouselView';
            } else if (type == '_fab') {
                config.renderview = 'FabricLoader';
            } else if (type == '_home') {
                config.renderview = 'HomepageMakerLoader';
            }
            console.log(`type=`, type);
            
            returnElem = new KeyvalueController(config);
        }
        //console.log(`type==`, type);
        //console.log(`returnElem.constructor.name==`, returnElem.constructor.name);
        return returnElem;
    }

    createItemBox(info, eventHandler) {
        //console.log(`this.mainLayout=${this.mainLayout}`);
        var type = info.ltype;
        this.boxcount++;

        var $box = $(`<div class="card" boxnum="${this.boxcount}" ltype="${type}">`);
        var $boxHeader = $('<div class="card-header list-inline">');
        var $headTitle = $('<h5 class="box-title list-inline-item">').append(type);
        var $headRightTool = $('<div class="pull-right list-inline-item">');
        var $boxBody = $(`<div class="card-body" style="overflow:auto" ltype="${type}" id="boxbody${this.boxcount}">`);
        var $boxFoot = $('<div class="card-footer">');
        var $footRight = $('<div class="pull-right">');

        if (info.parentltype == 'HorizontalLayoutEx') {
            var col = 3;
            if (info.parentcol)
                col = info.parentcol;
            $box.addClass('col-' + col);
            var $ninput = $(`<input type="number" max="12" min="1" value=${col} step="1" />`);
            $ninput.bind("change", { type: 'colchange', self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
            $headRightTool.append($ninput);
        }
        console.log(`type=${type}`);
        //console.log(`info.parentltype=${info.parentltype}`);
        if (type == 'MainLayoutEx' || type == 'VerticalLayoutEx' || type == 'HorizontalLayoutEx' ) {
            
            var $itemSelE = $(`<select class="mr-1" name="elemsel${this.boxcount}" id="elemsel${this.boxcount}">`);
            //$itemSelE.append(`<option value='...'>.........</option>`);
            $itemSelE.append(`<option value="VerticalLayoutEx">세로배열</option>`);
            $itemSelE.append(`<option value="HorizontalLayoutEx">가로배열</option>`);
            $itemSelE.append(`<option value="Board" renderview="Board" viewbody="a">게시판</option>`);
            $itemSelE.append(`<option value="Poll" renderview="Poll" viewbody="a">설문조사</option>`);
            $itemSelE.append(`<option value="Employee" renderview="EmployeeView" viewbody="a">인물리스트</option>`);
            $itemSelE.append(`<option value="Company" renderview="CompanyView" viewbody="a">회사리스트</option>`);
            $itemSelE.append(`<option value="Maeib_chul" renderview="Maeib_chulView" viewbody="a">매입매출</option>`);
           
            $itemSelE.append(`<option value="Login" renderview="LoginView">Login</option>`);
            $itemSelE.append(`<option value="Chat" >채팅</option>`);
            $itemSelE.append(`<option value="RtcChat" >Rtc채팅</option>`);
            $itemSelE.append(`<option value="_list">_list</option>`);
            $itemSelE.append(`<option value="_ztree">_ztree</option>`);
            $itemSelE.append(`<option value="_topmenu">_topmenu</option>`);
            $itemSelE.append(`<option value="_sidemenu">_sidemenu</option>`);
            $itemSelE.append(`<option value="_tabmenu">_tabmenu</option>`);
            $itemSelE.append(`<option value="_orgcharttree">_orgcharttree</option>`);
            $itemSelE.append(`<option value="_dynamictree">_dynamictree</option>`);
            $itemSelE.append(`<option value="_carousel">_carousel</option>`);
            $itemSelE.append(`<option value="_fab">_fab</option>`);
            $itemSelE.append(`<option value="_codemodule">코드모듈</option>`);
            $headRightTool.append($itemSelE);

            var $btn = $(`<button class="btn btn-outline-info home-make-btns mr-2" type="button">항목추가</button>`);
            $btn.bind("click", { type: 'itemadd', self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
            $headRightTool.append($btn);
            $btn = $(`<button class="btn btn-outline-info home-make-btns" id="boxdel">x</button>`);
            $btn.bind("click", { type: 'itemdel', self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
            $headRightTool.append($btn);

            $boxHeader.append($headTitle).append($headRightTool);
            //console.log(`type=${type}`);
            if (type == 'MainLayoutEx') {
                $boxBody.addClass('_mainbody');

                $boxFoot.append(this.createJsonOption());
                
                $btn = $(`<button class="btn btn-outline-success" id="preview-btn" type="button">미리보기</button>`);
                $btn.bind("click", { type: 'preview', self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
                $footRight.append($btn);

                $boxFoot.append($footRight);
                
            } else if (type == 'VerticalLayoutEx') {

            } else if (type == 'HorizontalLayoutEx') {
                $boxBody.addClass('row');
            }
        } else if (type == 'Chat') {
            $btn = $(`<button class="btn btn-outline-info home-make-btns">셋팅</button>`);
            $btn.bind("click", { type: type, ltype: info.ltype, self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
            $headRightTool.append($btn);
            $btn = $(`<button class="btn btn-outline-info home-make-btns" id="boxdel">x</button>`);
            $btn.bind("click", { type: 'itemdel', self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
            $headRightTool.append($btn);
            $boxHeader.append($headTitle).append($headRightTool);
        } else if (type == 'RtcChat') {
            
            $btn = $(`<button class="btn btn-outline-info home-make-btns">셋팅</button>`);
            $btn.bind("click", { type: type, ltype: info.ltype, self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
            $headRightTool.append($btn);
            $btn = $(`<button class="btn btn-outline-info home-make-btns" id="boxdel">x</button>`);
            $btn.bind("click", { type: 'itemdel', self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
            $headRightTool.append($btn);
            $boxHeader.append($headTitle).append($headRightTool);
        } else if (type == 'LoginView') {
            $btn = $(`<button class="btn btn-outline-info home-make-btns">셋팅</button>`);
            $btn.bind("click", { type: type, ltype: info.ltype, self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
            $headRightTool.append($btn);
            $btn = $(`<button class="btn btn-outline-info home-make-btns" id="boxdel">x</button>`);
            $btn.bind("click", { type: 'itemdel', self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
            $headRightTool.append($btn);
            $boxHeader.append($headTitle).append($headRightTool);
        } else {
            if (info.renderinfo) {
                $boxBody.attr('dbpath', info.renderinfo.dbpath);
                $boxBody.attr('ltype', info.ltype);
                $boxBody.attr('type', info.renderinfo.type);
                $boxBody.attr('code', info.renderinfo.code);
                $boxBody.attr('kcode', info.renderinfo.kcode);
                $boxBody.attr('kname', info.renderinfo.kname);
                $boxBody.attr('uid', info.renderinfo.uid);
                $boxBody.attr('fid', info.renderinfo.fid);
                $boxBody.attr('brdid', info.renderinfo.brdid);
                $boxBody.attr('groupid', info.renderinfo.groupid);
                $boxBody.attr('renderview', info.renderinfo.renderview);
                console.log(`info=${info}`);
                console.log(`info.type=${info.type}`);
                console.log(`info.ltype=${info.ltype}`);
                console.log(`info.renderinfo.type=${info.renderinfo.type}`);
                console.log(`info.renderinfo.code=${info.renderinfo.code}`);
                console.log(`info.renderinfo=${info.renderinfo}`);
            }
            
            $btn = $(`<button class="btn btn-outline-info home-make-btns">셋팅</button>`);
            $btn.bind("click", { type: type + 'set', ltype: info.ltype, self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
            $headRightTool.append($btn);
            $btn = $(`<button class="btn btn-outline-info home-make-btns" id="boxdel">x</button>`);
            $btn.bind("click", { type: 'itemdel', self: this, boxnum: this.boxcount, info: info }, this.eventHandler);
            $headRightTool.append($btn);
            $boxHeader.append($headTitle).append($headRightTool);
        }

        $box.append($boxHeader).append($boxBody).append($boxFoot);

        //document.body.appendChild($box.get(0));
        //alert("$box.html()" + $box.html());
        return $box;
    }

    ReturnJsonData() {
        this.allLayoutRenderer();
        var json = this.mainLayout.serializeLay();
        var serialize_json = JSON.stringify(json);
        return serialize_json;
    }

    saveJson() {
        this.allLayoutRenderer();
        var json = this.mainLayout.serializeLay();
        var serialize_json = JSON.stringify(json);
        return serialize_json;
    }

    openJson(serialize_json) {
        var deserialzie_object = JSON.parse(serialize_json);
        if (!deserialzie_object)
            return;

        var cls = eval(`new ${deserialzie_object.classname}();`);
        cls.deSerializeLay();
    }

    createJsonOption() {
        var elem = `<div class="container alert alert-primary collapse" id="jsonoption">
            
            <form id="uploaddataform">
                <input type="hidden" name="fid" />
                <input type="hidden" name="dbcode" />
                <input type="hidden" name="dbpath" />
                <input type="hidden" name="type" value="nameadd2" />
                <input type="hidden" name="kcode" value="_home" />
                <input type="hidden" name="kname" value="" />
                <input type="hidden" name="key" value="homepage" type="text">
                <input type="hidden" name="value" value="make home data" type="text">
                <input type="hidden" name="info" type="text">
              </form>

        </div>`;

        const div = document.createElement('div');
        div.innerHTML = elem;
        return div;
    }

    LoadData(data, arg) {

        //__openFileData 파일열기에서 리턴되는 파일데이타
        console.log('LoadData data=', data);
        
        var json = JSON.parse(data);
        
        //this.mainLayout.deSerializeLay(json);
       // self.mainLayout.renderController(ele);
       // return;
        var boxinfo = { ltype: 'MainLayoutEx', title: 'Main' };
        var box = this.createItemBox(boxinfo, this.eventHandler);
        $(this.arg.elem).empty();
        $(this.arg.elem).append(box);
        //console.log(`box.attr('boxnum')=`, box.attr('boxnum'));
        this.mainLayout.deSerializeMakebox(this, box, this.eventHandler, json);
        
    }

    RenderData(data) {
        //__openFileData 파일열기에서 리턴되는 파일데이타
        //console.log('LoadData data=', data);

        var json = JSON.parse(data);
        console.log('json=', json);

        this.mainLayout.deSerializeLay(json);
        self.mainLayout.renderController(ele);

        var ele = document.createElement('div');
        //document.body.appendChild(ele);
        self.mainLayout.renderController(ele);

        var f = new FullScreenView();
        f.setContent('preview', ele);
        console.log(ele.innerHTML);
        //this.mainLayout.deSerializeLay(json);
        // self.mainLayout.renderController(ele);
        // return;
        
    }

    selectDb() {
        var self = this;
        console.log(`select-db-btn`);
        var elem = document.createElement('div');
        var cls = new DbFileAjaxBase({ type: 'filelist', filetype: 'db', path: '', filter: 'fab', rendertype: 'ta', returntype: 'return', $parent: self });
        cls.fileList('', elem);
        //$('#dbsetModal').modal('show');
        __modal.show('디비셋팅', elem);
        console.log('$(elem).html()==' + $(elem).html());
    }

    saveFile() {
        var self = this;
        self.allLayoutRenderer();
        var json = self.mainLayout.serializeLay();
        console.log('json==' + json);
        var serialize_json = JSON.stringify(json);
        //alert(cstr);
        const url = URL.createObjectURL(new Blob([serialize_json]));

        const form = document.getElementById('uploaddataform');
        form.info.value = serialize_json;

        var elem = document.createElement('div');
        var cls = new DbFileAjaxBase({ type: 'filelist', filetype: 'file', path: '', filter: 'daweb', rendertype: 'ta', returntype: 'filesave', $parent: self });
        cls.fileList('', elem);
        //$('#dbsetModal').modal('show');
        __modal.show('디비셋팅', elem);
    }

    saveDb() {
        var self = this;

        if (!self._dbpath)
            return alert('디비를 선택해야됩니다');

        const input = document.getElementById('updbname');
        if (input.value == '')
            return alert('이름을 입력해야됩니다');

        self.allLayoutRenderer();
        var json = self.mainLayout.serializeLay();
        var serialize_json = JSON.stringify(json);
        //alert(cstr);
        const url = URL.createObjectURL(new Blob([serialize_json]));

        const form = document.getElementById('uploaddataform');
        form.info.value = serialize_json;
        form.type.value = 'nameadd2';
        form.kname.value = input.value;
        form.key.value = input.value;
        form.dbpath.value = self._dbpath;
        form.fid.value = self._fid;
        console.log('self._fid==' + self._fid);
        var str = "/mankeyvalue.adm?&utf8=ok&";

        var formdata = $(form).serializeArray();
        //console.log("form.subject.value=======" + form.subject.value);
        //var b64 = Base64.encode(form.info.value);
        //formData = self.selectedLenderCon.changeSerialize(formData, 'info', b64);
        // arg.formData = formData;

        __saveFileData({ path: str, formdata: formdata });
    }

    openFile() {
        var self = this;

        var elem = document.createElement('div');
        var cls = new DbFileAjaxBase({ type: 'filelist', filetype: 'file', path: '', filter: 'daweb', rendertype: 'return', returntype: 'fileopen', $parent: self });
        cls.fileList('', elem);
        //$('#dbsetModal').modal('show');
        __modal.show('파일열기', elem);
    }

    openDb() {
        var self = this;

        if (!self._dbpath)
            return alert('디비를 선택해야됩니다');

        var config = {
            settype: 'setting',
            dbpath: self._dbpath,
            kcode: '_home',
            kname: ' ',
            rendertype: 'list',
            renderview: 'ListTreeView',
            editmode: 'ok',
            returntype: 'dbopen',
            $parent: self
        }
        var elem = document.createElement('div');

        var cls = new KeyvalueController(config);
        //var cls = new DbFileAjaxBase({ type: 'filelist', filetype: 'db', path: '', filter: 'fab', rendertype: 'ta', returntype: 'dbsave', $parent: self });
        cls.renderController(elem);

        //$('#dbsetModal').modal('show');
        __modal.show('디비셋팅', elem);
    }

    preview() {
        var self = this;

        self.allLayoutRenderer();

        var ele = document.createElement('div');
        //document.body.appendChild(ele);
        self.mainLayout.renderController(ele);

        var f = new FullScreenView();
        f.setContent('preview', ele);
    }
}

