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
        getReturnValue(self.arg.renderinfo.filter, self.selectedPath);
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
