class CustomerView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'erpwrite') {
            __modal.show('입 력', self.createCustomerFormView());

            var form = document.getElementById("customerViewForm");

            form.dbpath.value = arg.dbpath;
            $('#customerdelSubmit').remove();
            $('#customerymodifySubmit').remove();
            $('#customeraddSubmit').bind("click", { type: 'customeraddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'customeraddSubmit') {

            var form = document.getElementById("customerViewForm");
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
        } else if (type == 'customerdelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("customerViewForm");
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

        } else if (type == 'customermodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("customerViewForm");
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

        } else if (type == 'customerviewbody') {

            //__fullscreenView.setContent(`보기`, self.createCustomerFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createCustomerFormView());

            var form = document.getElementById("customerViewForm");

            form.uid.value = info.uid;
            console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);

            //form.customcode.value = info.customcode;
            form.dealtype.value = info.dealtype;
            form.tel.value = info.tel;
            form.tel2.value = info.tel2;
            form.addr.value = info.addr;
            form.postnum.value = info.postnum;
            form.email.value = info.email;
            form.memo.value = info.memo;
            form.register.value = info.register;

            //form.register.value = info.register;
            $('#customeraddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#customerdelSubmit').bind("click", { type: 'customerdelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#customermodifySubmit').bind("click", { type: 'customermodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


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

    createCustomerFormView() {
        var mo = `<form id="customerViewForm" method="post">

                            <input type="hidden" name="type" value="add" />
                            <input type="hidden" name="code" value="customer" />
                            <input type="hidden" name="addtype" value="add" />
                            <input type="hidden" name="dbpath"/>
                            <input type="hidden" name="uid" />

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
                                            <label for="subject" class="control-label">이름</label>
                                            <div>
                                                <input type="text" class="form-control" name="name" placeholder="이름..." required />
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
                                            <label for="postnum" class="control-label">이메일</label>
                                            <div>
                                                <input type="text" class="form-control" name="email" placeholder="이메일..." required />
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
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <input type="reset" value="리 셋" class="btn">
                                            <input type="button" id="customeraddSubmit" value="전송" class="btn btn-info">
                                            <input type="button" id="customerdelSubmit" value="삭제" class="btn btn-info">
                                            <input type="button" id="customermodifySubmit" value="수정" class="btn btn-info">
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="clearfix"></div>

                        </form>`;

        return mo;
    }

    createList(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

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
        //console.log('img');
        //$(arg.boardid).append(tableE);
        $temp.append($tableE);

        var trE = $("<tr>");

        var thE1 = $("<th style='width: 5%'>").text("번호");
        var thE2 = $("<th style='width: 10%'>").text("이름");
        var thE3 = $("<th style='width: 10%'>").text("타입");
        var thE4 = $("<th style='width: 10%'>").text("전화");
        var thE5 = $("<th style='width: 35%'>").text("이메일");
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
                var tdE2 = $("<td>").text(info.name);
                var tdE3 = $("<td>").text(info.dealtype);
                var tdE4 = $("<td>").text(info.tel);
                var tdE5 = $("<td>").text(info.email);
                var tdE6 = $("<td>").text(info.addr);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5).append(tdE6);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'customerviewbody', info: info, self: this, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class EmpmanagerView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'erpwrite') {
            __modal.show('입 력', self.createEmpFormView());

            var form = document.getElementById("empViewForm");

            form.dbpath.value = arg.dbpath;
            $('#empdelSubmit').remove();
            $('#empmodifySubmit').remove();
            $('#empaddSubmit').bind("click", { type: 'empaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'empaddSubmit') {

            var form = document.getElementById("empViewForm");
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
        } else if (type == 'empdelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("empViewForm");
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

            //__fullscreenView.setContent(`보기`, self.createEmpFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createEmpFormView());

            var form = document.getElementById("empViewForm");

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
        var mo = ``;

        return mo;
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

        var thE1 = $("<th style='width: 5%'>").text("��ȣ");
        var thE2 = $("<th style='width: 10%'>").text("�μ�");
        var thE3 = $("<th style='width: 10%'>").text("��å");
        var thE4 = $("<th style='width: 10%'>").text("�̸�");
        var thE5 = $("<th style='width: 35%'>").text("�̸���");
        var thE6 = $("<th style='width: 30%'>").text("�ּ�");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5).append(thE6);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'erpwrite', self: this, info: info, arg: arg }, eventHandler);
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
                var tdE2 = $("<td>").text(info.busu).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.jicchak);
                var tdE4 = $("<td>").text(info.empname);
                var tdE5 = $("<td>").text(info.email);
                var tdE6 = $("<td>").text(info.addr);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5).append(tdE6);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'erplist', info: info, arg: arg }, eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class WorkdayView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'erpwrite') {
            __modal.show('입 력', self.createErpFormView());

            var form = document.getElementById("workDayViewForm");

            form.dbpath.value = arg.dbpath;
            $('#workdaydelSubmit').remove();
            $('#workdaymodifySubmit').remove();
            $('#workdayaddSubmit').bind("click", { type: 'workdayaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'workdayaddSubmit') {

            var form = document.getElementById("workDayViewForm");
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
        } else if (type == 'workdaydelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("workDayViewForm");
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

        } else if (type == 'workdaymodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("workDayViewForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'workdayviewbody') {

            //__fullscreenView.setContent(`보기`, self.createErpFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createErpFormView());

            var form = document.getElementById("workDayViewForm");

            form.uid.value = info.uid;
            console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.empcode.value = info.empcode;
            form.empname.value = info.empname;
            form.date.value = info.date;
            form.chulgntime.value = info.chulgntime;
            form.toygntime.value = info.toygntime;
            form.jigak.value = info.jigak;
            form.yagn.value = info.yagn;
            form.yagntime.value = info.yagntime;

            form.jotyo.value = info.jotyo;
            form.bigo.value = info.bigo;
            //form.register.value = info.register;

            
            //form.history.value = info.history;
            //form.register.value = info.register;
            $('#workdayaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#workdaydelSubmit').bind("click", { type: 'workdaydelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#workdaymodifySubmit').bind("click", { type: 'workdaymodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


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
        var mo = `<form id="workDayViewForm" method="post" class="form-horizontal white-bg-gradient">

                                <input type="hidden" name="type" value="add" />
                                <input type="hidden" name="code" value="workday" />
                                <input type="hidden" name="addtype" value="add" />
                                <input type="hidden" name="boardtype" value="base" />
                                <input type="hidden" name="dbpath"/>
                                <input type="hidden" name="uid"/>

                                <div class="controls">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="xycode" class="control-label">출석아이디</label>
                                                <div>
                                                    <input type="text" class="form-control" name="id" placeholder="아이디..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="goodscode" class="control-label">패스워드</label>
                                                <div>
                                                    <input type="password" class="form-control" name="passwd" placeholder="패스워드..." required />
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
                                                <label for="summary" class="control-label">상품요약</label>
                                                <div>
                                                    <input type="text" class="form-control" name="summary" placeholder="상품요약..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="clearfix"></div>

                                <div class="form-group">
                                    <div class="col-sm-4">
                                        <input type="button" id="workdayaddSubmit" value="전송">
                                        <input type="button" id="workdaydelSubmit" value="전송">
                                        <input type="button" id="workdaymodifySubmit" value="전송">
                                        <input type="reset" value="리 셋">
                                    </div>
                                </div>
                            </form>`;

        return mo;
    }

    createList(info2, arg, eventHandler) {
        //console.log(`createWorkdayView=*******info2******=${info2}`);
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
        var thE2 = $("<th style='width: 15%'>").text("이름");
        var thE3 = $("<th style='width: 20%'>").text("날짜");
        var thE4 = $("<th style='width: 15%'>").text("출근시간");
        var thE5 = $("<th style='width: 15%'>").text("퇴근시간");
        var thE6 = $("<th style='width: 15%'>").text("조퇴");
        var thE7 = $("<th style='width: 15%'>").text("야근");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5).append(thE6).append(thE7);

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

        console.log(`createWorkdayView=`);
        if (arrarr && arrarr.length >= 0) {
            
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var trE = $("<tr>");

                var tdE1 = $("<td>").text(info.uid);
                var tdE2 = $("<td>").text(info.empname).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.date);
                var tdE4 = $("<td>").text(info.chulgntime);
                var tdE5 = $("<td>").text(info.toygntime);
                var tdE6 = $("<td>").text(info.jotyo);
                var tdE7 = $("<td>").text(info.yagn);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5).append(tdE6).append(tdE7);

                $(tBodyE).append(trE);
                console.log(`createWorkdayView=**info.uid*=${info.uid}`);
                $(trE).bind("click", { type: 'workdayviewBody', info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class RentalView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'erpwrite') {
            __modal.show('입 력', self.createErpFormView());

            var form = document.getElementById("rentalViewForm");

            form.dbpath.value = arg.dbpath;
            $('#rentaldelSubmit').remove();
            $('#rentalmodifySubmit').remove();
            $('#rentaladdSubmit').bind("click", { type: 'rentaladdSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'rentaladdSubmit') {

            var form = document.getElementById("rentalViewForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'rentaldelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("rentalViewForm");
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

        } else if (type == 'rentalmodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("rentalViewForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'rentalviewbody') {

            //__fullscreenView.setContent(`보기`, self.createErpFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            
            var f = new FullScreenView();
            f.setContent(`보기`, self.createErpFormView());

            var form = document.getElementById("rentalViewForm");

            form.uid.value = info.uid;
            console.log(`info.uid 7777777**form.dbpath=${form.dbpath.value}  form.goodsname.value=${form.goodsname.value} info.rentaldate=${info.rentaldate}`);
            form.id.value = info.id;
            //form.name.value = info.name;
            form.goodscode.value = info.goodscode;
            form.goodsname.value = info.goodsname;
            form.rentaldate.value = info.rentaldate;
            form.receivedate.value = info.receivedate;
            form.rentalmoney.value = info.rentalmoney;
            form.rentalstate.value = info.rentalstate;
            form.magam.value = info.magam;
            //form.register.value = info.register;
            
            //form.register.value = info.register;
            $('#rentaladdSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#rentaldelSubmit').bind("click", { type: 'rentaldelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#rentalmodifySubmit').bind("click", { type: 'rentalmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


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
        var mo = ` <form id="rentalViewForm" method="post" class="form-horizontal white-bg-gradient">

                                        <input type="hidden" name="type" value="add" />
                                        <input type="hidden" name="code" value="rental" />
                                        <input type="hidden" name="addtype" value="add" />
                                        <input type="hidden" name="dbpath" />
                                        <input type="hidden" name="uid" />

                                        <div class="controls">
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label for="id" class="control-label">아이디</label>
                                                        <div>
                                                            <input type="text" class="form-control" name="id" placeholder="아이디..." required />
                                                        </div>
                                                        <div class="help-block with-errors"></div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label for="name" class="control-label">상품이름</label>
                                                        <div>
                                                            <input type="text" class="form-control" name="goodsname" placeholder="상품이름..." required />
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
                                                        <label for="goodscode" class="control-label">상품코드</label>
                                                        <div>
                                                            <input type="text" class="form-control" name="goodscode" placeholder="상품코드..." required />
                                                        </div>
                                                        <div class="help-block with-errors"></div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label for="rentaldate" class="control-label">대여일</label>
                                                        <div>
                                                            <input type="text" class="form-control" name="rentaldate" placeholder="대여일..." required />
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
                                                        <label for="receivedate" class="control-label">상품회수일</label>
                                                        <div>
                                                            <input type="text" class="form-control" name="receivedate" placeholder="상품회수일..." required />
                                                        </div>
                                                        <div class="help-block with-errors"></div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label for="rentalmoney" class="control-label">대여금액</label>
                                                        <div>
                                                            <input type="text" class="form-control" name="rentalmoney" placeholder="대여금액..." required />
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
                                                        <label for="rentalstate" class="control-label">대여상태</label>
                                                        <div>
                                                            <input type="text" class="form-control" name="rentalstate" placeholder="대여상태..." required />
                                                        </div>
                                                        <div class="help-block with-errors"></div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4">
                                                    <div class="form-group">
                                                        <label for="magam" class="control-label">마감</label>
                                                        <div>
                                                            <input type="text" class="form-control" name="magam" placeholder="마감..." required />
                                                        </div>
                                                        <div class="help-block with-errors"></div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="clearfix"></div>

                                        <div class="form-group">
                                            <div class="col-sm-4">
                                                <input type="reset" value="리 셋" class="btn">
                                                <input type="button" id="rentaladdSubmit" value="전송" class="btn btn-info">
                                                <input type="button" id="rentaldelSubmit" value="삭제" class="btn btn-info">
                                                <input type="button" id="rentalmodifySubmit" value="수정" class="btn btn-info">
                                            </div>
                                        </div>
                                    </form>`;

        return mo;
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
        var thE2 = $("<th style='width: 10%'>").text("아이디");
        var thE3 = $("<th style='width: 10%'>").text("상품");
        var thE4 = $("<th style='width: 10%'>").text("대여일");
        var thE5 = $("<th style='width: 35%'>").text("회수일");
        var thE6 = $("<th style='width: 30%'>").text("금액");
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
                var tdE2 = $("<td>").text(info.id).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.goodsname);
                var tdE4 = $("<td>").text(info.rentaldate);
                var tdE5 = $("<td>").text(info.receivedate);
                var tdE6 = $("<td>").text(info.rentalmoney);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5).append(tdE6);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'rentalviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class Maeib_chulView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'inwrite' || type == 'outwrite') {
            __modal.show('입 력', self.createErpFormView());

            var form = document.getElementById("maeib_chulViewForm");

            form.dbpath.value = arg.dbpath;
            if(type == 'inwrite')
                form.mtype.value = 'in';
            else if (type == 'outwrite')
                form.mtype.value = 'out';

            $('#maeib_chuldelSubmit').remove();
            $('#maeib_chulmodifySubmit').remove();
            $('#maeib_chuladdSubmit').bind("click", { type: 'maeib_chuladdSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'maeib_chuladdSubmit') {

            var form = document.getElementById("maeib_chulViewForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'maeib_chuldelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("maeib_chulViewForm");
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

        } else if (type == 'maeib_chulmodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("maeib_chulViewForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'maeib_chulviewbody') {

            //__fullscreenView.setContent(`보기`, self.createErpFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createErpFormView());

            var form = document.getElementById("maeib_chulViewForm");

            form.uid.value = info.uid;
            //console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.companycode.value = info.companycode;
            form.companyname.value = info.companyname;
            form.goodscode.value = info.goodscode;
            form.goodsname.value = info.goodsname;
            form.state.value = info.state;
            form.date.value = info.date;
            form.gyugeyg.value = info.gyugeyg;
            form.unit.value = info.unit;
            form.money.value = info.money;
            form.count.value = info.count;
            form.mcode.value = info.mcode;
            form.name.value = info.name;
            form.magam.value = info.magam;

            //form.register.value = info.register;
            $('#maeib_chuladdSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#maeib_chuldelSubmit').bind("click", { type: 'maeib_chuldelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#maeib_chulmodifySubmit').bind("click", { type: 'maeib_chulmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


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
                            
                            <form id="maeib_chulViewForm" method="post" class="form-horizontal white-bg-gradient">
                                <h2 class="maeib_chul">매출정보</h2>

                                <input type="hidden" name="type" value="add" />
                                <input type="hidden" name="code" value="maeib_chul" />
                                <input type="hidden" name="addtype" value="add" />
                                <input type="hidden" name="mtype" value="in" />
                                <input type="hidden" name="dbpath"/>
                                <input type="hidden" name="uid"/>

                                <div class="controls">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="goodscode" class="control-label">업체코드</label>
                                                <div>
                                                    <input type="text" class="form-control" name="companycode" placeholder="상품코드..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="goodsname" class="control-label">업체이름</label>
                                                <div>
                                                    <input type="text" class="form-control" name="companyname" placeholder="상품이름..." required />
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
                                                <label for="goodscode" class="control-label">상품코드</label>
                                                <div>
                                                    <input type="text" class="form-control" name="goodscode" placeholder="상품코드..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="goodsname" class="control-label">상품이름</label>
                                                <div>
                                                    <input type="text" class="form-control" name="goodsname" placeholder="상품이름..." required />
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
                                                <label for="state" class="control-label">상태</label>
                                                <div>
                                                    <input type="text" class="form-control" name="state" placeholder="상태..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="date" class="control-label">날짜</label>
                                                <div>
                                                    <input type="text" class="form-control" name="date" placeholder="날짜..." required />
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
                                                <label for="gyugeyg" class="control-label">규격</label>
                                                <div>
                                                    <input type="text" class="form-control" name="gyugeyg" placeholder="규격..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="unit" class="control-label">단위</label>
                                                <div>
                                                    <input type="text" class="form-control" name="unit" placeholder="단위..." required />
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
                                                <label for="money" class="control-label">금액</label>
                                                <div>
                                                    <input type="text" class="form-control" name="money" placeholder="금액..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="count" class="control-label">갯수</label>
                                                <div>
                                                    <input type="text" class="form-control" name="count" placeholder="갯수..." required />
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
                                                <label for="mcode" class="control-label">코드</label>
                                                <div>
                                                    <input type="text" class="form-control" name="mcode" placeholder="코드..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="name" class="control-label">이름</label>
                                                <div>
                                                    <input type="text" class="form-control" name="name" placeholder="이름..." required />
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
                                                <label for="magam" class="control-label">마감</label>
                                                <div>
                                                    <input type="text" class="form-control" name="magam" placeholder="마감..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="clearfix"></div>

                                <div class="form-group">
                                    <div class="col-sm-4">
                                        <input type="button" id="maeib_chuladdSubmit" value="전송">
                                        <input type="button" id="maeib_chuldelSubmit" value="삭제">
                                        <input type="button" id="maeib_chulmodifySubmit" value="수정">
                                        <input type="reset" value="리 셋">
                                    </div>
                                </div>
                            </form>
                        </div>`;

        return mo;
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
        var thE2 = $("<th style='width: 10%'>").text("거래처");
        var thE3 = $("<th style='width: 10%'>").text("상품");
        var thE4 = $("<th style='width: 10%'>").text("구분");
        var thE5 = $("<th style='width: 35%'>").text("갯수");
        var thE6 = $("<th style='width: 30%'>").text("금액");
        var thE7 = $("<th style='width: 30%'>").text("날짜");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5).append(thE6).append(thE7);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("매입글");
        $buttonE.bind("click", { type: 'inwrite', self: this, info: info, arg: arg }, this.eventHandler);
        $(tdE).append($buttonE);

        $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("매출글");
        $buttonE.bind("click", { type: 'outwrite', self: this, info: info, arg: arg }, this.eventHandler);
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
                var tdE3 = $("<td>").text(info.goodsname);
                var tdE4 = $("<td>").text(info.mtype);
                var tdE5 = $("<td>").text(info.count);
                var tdE6 = $("<td>").text(info.money);
                var tdE7 = $("<td>").text(info.register);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5).append(tdE6).append(tdE7);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'maeib_chulviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class GoodsView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'erpwrite') {
            __modal.show('입 력', self.createErpFormView());

            var form = document.getElementById("goodsViewForm");

            form.dbpath.value = arg.dbpath;

            $('#goodsdelSubmit').remove();
            $('#goodsmodifySubmit').remove();
            $('#goodsaddSubmit').bind("click", { type: 'goodsaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'goodsaddSubmit') {

            var form = document.getElementById("goodsViewForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'goodsdelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("goodsViewForm");
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

        } else if (type == 'goodsmodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("goodsViewForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'goodsviewbody') {

            //__fullscreenView.setContent(`보기`, self.createErpFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createErpFormView());

            var form = document.getElementById("goodsViewForm");

            form.uid.value = info.uid;
            console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.xycode.value = info.xycode;
            form.goodscode.value = info.goodscode;
            form.goodsname.value = info.goodsname;
            form.defaultprice.value = info.defaultprice;
            form.sellprice.value = info.sellprice;
            form.production.value = info.production;
            form.thumbnail.value = info.thumbnail;
            form.imagename.value = info.imagename;
            form.content.value = info.content;
            form.count.value = info.count;
            form.spcode.value = info.spcode;
            form.special.value = info.special;
            form.summary.value = info.summary;
            form.keyword.value = info.keyword;
            
            //form.history.value = info.history;
            //form.register.value = info.register;
            $('#goodsaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#goodsdelSubmit').bind("click", { type: 'goodsdelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#goodsmodifySubmit').bind("click", { type: 'goodsmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


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

    createErpFormView(info2, arg, eventHandler) {
        var mo = `<form id="goodsViewForm" method="post" class="form-horizontal white-bg-gradient">

                                <input type="hidden" name="type" value="add" />
                                <input type="hidden" name="code" value="goods" />
                                <input type="hidden" name="addtype" value="add" />
                                <input type="hidden" name="boardtype" value="base" />
                                <input type="hidden" name="dbpath" />
                                <input type="hidden" name="uid" />

                                <div class="controls">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="xycode" class="control-label">상품xy코드</label>
                                                <div>
                                                    <input type="text" class="form-control" name="xycode" placeholder="상품xy코드..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="goodscode" class="control-label">상품코드</label>
                                                <div>
                                                    <input type="text" class="form-control" name="goodscode" placeholder="상품코드..." required />
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
                                                <label for="goodsname" class="control-label">상품이름</label>
                                                <div>
                                                    <input type="text" class="form-control" name="goodsname" placeholder="상품이름..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="defaultprice" class="control-label">상품가격</label>
                                                <div>
                                                    <input type="text" class="form-control" name="defaultprice" placeholder="상품가격..." required />
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
                                                <label for="sellprice" class="control-label">판매가격</label>
                                                <div>
                                                    <input type="text" class="form-control" name="sellprice" placeholder="판매가격..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="production" class="control-label">메이커</label>
                                                <div>
                                                    <input type="text" class="form-control" name="production" placeholder="메이커..." required />
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
                                                <label for="keyword" class="control-label">키워드</label>
                                                <div>
                                                    <input type="text" class="form-control" name="keyword" placeholder="키워드..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="imagename" class="control-label">상품사진</label>
                                                <div>
                                                    <input type="text" class="form-control" name="imagename" placeholder="상품사진..." required />
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
                                                <label for="content" class="control-label">상품정보</label>
                                                <div>
                                                    <input type="text" class="form-control" name="content" placeholder="상품정보..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="count" class="control-label">상품갯수</label>
                                                <div>
                                                    <input type="text" class="form-control" name="count" placeholder="상품갯수..." required />
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
                                                <label for="spcode" class="control-label">상품구분</label>
                                                <div>
                                                    <input type="text" class="form-control" name="spcode" placeholder="상품구분..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="special" class="control-label">특별코드</label>
                                                <div>
                                                    <input type="text" class="form-control" name="special" placeholder="특별코드..." required />
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
                                                <label for="summary" class="control-label">상품요약</label>
                                                <div>
                                                    <input type="text" class="form-control" name="summary" placeholder="상품요약..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="clearfix"></div>

                                <div class="form-group">
                                    <div class="col-sm-4">
                                        <input type="button" id="goodsaddSubmit" value="전송">
                                        <input type="button" id="goodsdelSubmit" value="삭제">
                                        <input type="button" id="goodsmodifySubmit" value="수정">
                                        <input type="reset" value="리 셋">
                                    </div>
                                </div>
                            </form>`;

        return mo;
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
        var thE2 = $("<th style='width: 20%'>").text("상품명");
        var thE3 = $("<th style='width: 20%'>").text("가격");
        var thE4 = $("<th style='width: 30%'>").text("업체");
        var thE5 = $("<th style='width: 35%'>").text("기록");
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
                var tdE2 = $("<td>").text(info.thumbnail);
                var tdE3 = $("<td>").text(info.goodsname);
                var tdE4 = $("<td>").text(info.sellprice);
                var tdE5 = $("<td>").text(info.production);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'goodsviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class EmppayView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'erpwrite') {
            __modal.show('입 력', self.createErpFormView());

            var form = document.getElementById("emppayViewForm");

            form.dbpath.value = arg.dbpath;
            $('#emppayaddSubmit').bind("click", { type: 'emppayaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'emppayaddSubmit') {

            var form = document.getElementById("emppayViewForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'emppaydelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("emppayViewForm");
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

        } else if (type == 'emppaymodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("emppayViewForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "erplist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "erplist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.erp?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'emppayviewbody') {

            //__fullscreenView.setContent(`보기`, self.createErpFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createErpFormView());

            var form = document.getElementById("emppayViewForm");

            form.uid.value = info.uid;
            console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.empcode.value = info.empcode;
            //form.empname.value = info.empname;
            form.date.value = info.date;
            form.basicpay.value = info.basicpay;
            form.bonus.value = info.bonus;
            form.sangyugm.value = info.sangyugm;
            form.sudang1.value = info.sudang1;
            form.sudang2.value = info.sudang2;
            form.sudang3.value = info.sudang3;
            form.sudang4.value = info.sudang4;
            form.sudang5.value = info.sudang5;
            form.sudang6.value = info.sudang6;
            form.sudang7.value = info.sudang7;
            form.sudang8.value = info.sudang8;
            form.sudang9.value = info.sudang9;
            form.sudang10.value = info.sudang10;
            form.duty1.value = info.duty1;
            form.duty2.value = info.duty2;
            form.duty3.value = info.duty3;
            form.duty4.value = info.duty4;
            form.duty5.value = info.duty5;
            form.duty6.value = info.duty6;
            form.duty7.value = info.duty7;
            form.duty8.value = info.duty8;
            form.etc1.value = info.etc1;
            form.etc2.value = info.etc2;
            form.etc3.value = info.etc3;
            //form.register.value = info.register;

            //form.history.value = info.history;
            //form.register.value = info.register;
            $('#emppayaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#emppaydelSubmit').bind("click", { type: 'emppaydelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#emppaymodifySubmit').bind("click", { type: 'emppaymodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


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
        var mo = `<form id="emppayViewForm" method="post" class="form-horizontal white-bg-gradient">
                <h2>사원 급여정보</h2>
                <p>급여정보 급여정보입력</p>
                <input type="hidden" name="type" value="add" />
                <input type="hidden" name="code" value="emppay" />
                <input type="hidden" name="addtype" value="add" />
                <input type="hidden" name="dbpath"/>
                <input type="hidden" name="uid"/>

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
                                <label for="date" class="control-label">날짜</label>
                                <div>
                                    <input type="text" class="form-control" name="date" placeholder="날짜..." required />
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
                                <label for="basicpay" class="control-label">기본급</label>
                                <div>
                                    <input type="text" class="form-control" name="basicpay" placeholder="기본급..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="bonus" class="control-label">보너스</label>
                                <div>
                                    <input type="text" class="form-control" name="bonus" placeholder="보너스..." required />
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
                                <label for="sangyugm" class="control-label">상여금</label>
                                <div>
                                    <input type="text" class="form-control" name="sangyugm" placeholder="상여금..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="sudang1" class="control-label">수당1</label>
                                <div>
                                    <input type="text" class="form-control" name="sudang1" placeholder="수당1..." required />
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
                                <label for="sudang2" class="control-label">수당2</label>
                                <div>
                                    <input type="text" class="form-control" name="sudang2" placeholder="수당2..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="sudang3" class="control-label">수당3</label>
                                <div>
                                    <input type="text" class="form-control" name="sudang3" placeholder="수당3..." required />
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
                                <label for="sudang4" class="control-label">수당4</label>
                                <div>
                                    <input type="text" class="form-control" name="sudang4" placeholder="수당4..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="sudang5" class="control-label">수당5</label>
                                <div>
                                    <input type="text" class="form-control" name="sudang5" placeholder="수당5..." required />
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
                                <label for="sudang6" class="control-label">수당6</label>
                                <div>
                                    <input type="text" class="form-control" name="sudang6" placeholder="수당6..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="sudang7" class="control-label">수당7</label>
                                <div>
                                    <input type="text" class="form-control" name="sudang7" placeholder="수당7..." required />
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
                                <label for="sudang8" class="control-label">수당8</label>
                                <div>
                                    <input type="text" class="form-control" name="sudang8" placeholder="수당8..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="sudang9" class="control-label">수당9</label>
                                <div>
                                    <input type="text" class="form-control" name="sudang9" placeholder="수당9..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="sudang10" class="control-label">수당10</label>
                                <div>
                                    <input type="text" class="form-control" name="sudang10" placeholder="수당10..." required />
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
                                <label for="duty1" class="control-label">세금1</label>
                                <div>
                                    <input type="text" class="form-control" name="duty1" placeholder="세금1..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="duty2" class="control-label">세금2</label>
                                <div>
                                    <input type="text" class="form-control" name="duty2" placeholder="세금2..." required />
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
                                <label for="duty3" class="control-label">세금3</label>
                                <div>
                                    <input type="text" class="form-control" name="duty3" placeholder="세금3..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="duty4" class="control-label">세금4</label>
                                <div>
                                    <input type="text" class="form-control" name="duty4" placeholder="세금4..." required />
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
                                <label for="duty5" class="control-label">세금5</label>
                                <div>
                                    <input type="text" class="form-control" name="duty5" placeholder="세금5..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="duty6" class="control-label">세금6</label>
                                <div>
                                    <input type="text" class="form-control" name="duty6" placeholder="세금6..." required />
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
                                <label for="duty7" class="control-label">세금7</label>
                                <div>
                                    <input type="text" class="form-control" name="duty7" placeholder="세금7..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="duty8" class="control-label">세금8</label>
                                <div>
                                    <input type="text" class="form-control" name="duty8" placeholder="세금8..." required />
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
                                <label for="etc1" class="control-label">기타1</label>
                                <div>
                                    <input type="text" class="form-control" name="etc1" placeholder="기타1..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="etc2" class="control-label">기타2</label>
                                <div>
                                    <input type="text" class="form-control" name="etc2" placeholder="기타2..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="etc3" class="control-label">기타3</label>
                                <div>
                                    <input type="text" class="form-control" name="etc3" placeholder="기타3..." required />
                                </div>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>

                <div class="form-group">
                    <div class="col-sm-4">
                        <input type="button" id="emppaySubmit" value="전송">
                        <input id="reset" type="reset" value="리 셋">
                    </div>
                </div>
            </form>`;

        this.createErpFormEvent(info2, arg, eventHandler, 'emppayForm', '#emppaySubmit');

        return mo;
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
        var thE2 = $("<th style='width: 20%'>").text("이름");
        var thE3 = $("<th style='width: 20%'>").text("기본급");
        var thE4 = $("<th style='width: 30%'>").text("지급일");
        var thE5 = $("<th style='width: 35%'>").text("기록");
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

                var tdE1 = $("<td>").text(this.article_num);
                var tdE2 = $("<td>").text(this.empname);
                var tdE3 = $("<td>").text(this.basicpay);
                var tdE4 = $("<td>").text(this.date);
                var tdE5 = $("<td>").text(this.register);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'emppayviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class ScheduleView extends ViewBase {
    constructor() {
        super();
        this.today = moment();
    }

    addDate(ev) {

    }

    createElement(tagName, className, innerText) {
        var ele = document.createElement(tagName);
        if (className) {
            ele.className = className;
        }
        if (innerText) {
            ele.innderText = ele.textContent = innerText;
        }
        return ele;
    }

    Calendar(info, arg, events) {
        this.info = info;
        this.arg = arg;
        this.el = arg.elem;
        this.events = events;
        this.current = moment().date(1);
        this.draw();
        var current = document.querySelector('.today');
        if (current) {
            var self = this;
            window.setTimeout(function () {
                self.openDay(current);
            }, 500);
        }
        console.log(`this.current=${this.current}`);
    }

    draw() {
        //Create Header
        this.drawHeader();

        //Draw Month
        this.drawMonth();

        //this.drawLegend();
    }

    drawHeader() {
        var self = this;
        if (!this.header) {
            //Create the header elements
            this.header = this.createElement('div', 'header');
            this.header.className = 'header';

            this.title = this.createElement('h1');

            var right = this.createElement('div', 'calendar_right');
            right.addEventListener('click', function () { self.nextMonth(); });

            var left = this.createElement('div', 'calendar_left');
            left.addEventListener('click', function () { self.prevMonth(); });
            
            //Append the Elements
            this.header.appendChild(this.title);
            this.header.appendChild(right);
            this.header.appendChild(left);
            this.el.appendChild(this.header);
        }

        this.title.innerHTML = this.current.format('MMMM YYYY');
    }

    drawMonth() {
        var self = this;
        /**
        this.events.forEach(function (ev) {
            ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
        });
        ***/
        if (this.month) {
            this.oldMonth = this.month;
            this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
            this.oldMonth.addEventListener('webkitAnimationEnd', function () {
                self.oldMonth.parentNode.removeChild(self.oldMonth);
                self.month = self.createElement('div', 'month');
                self.backFill();
                self.currentMonth();
                self.fowardFill();
                self.el.appendChild(self.month);
                window.setTimeout(function () {
                    self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
                }, 16);
            });
        } else {

            this.month = this.createElement('div', 'month');
            this.el.appendChild(this.month);
            this.backFill();
            this.currentMonth();
            this.fowardFill();
            this.month.className = 'month new';
        }
    }

    backFill() {
        var clone = this.current.clone();
        var dayOfWeek = clone.day();

        if (!dayOfWeek) { return; }

        clone.subtract('days', dayOfWeek + 1);

        for (var i = dayOfWeek; i > 0; i--) {
            this.drawDay(clone.add('days', 1));
        }
    }

    fowardFill() {
        var clone = this.current.clone().add('months', 1).subtract('days', 1);
        var dayOfWeek = clone.day();

        if (dayOfWeek === 6) { return; }

        for (var i = dayOfWeek; i < 6; i++) {
            this.drawDay(clone.add('days', 1));
        }
    }

    currentMonth() {
        var clone = this.current.clone();

        while (clone.month() === this.current.month()) {
            //console.log(`clone=${clone} clone.month()==${clone.month()} this.week==${this.week} `);
            this.drawDay(clone);
            clone.add('days', 1);
        }
    }

    getWeek(day) {
        if (!this.week || day.day() === 0) {
            this.week = this.createElement('div', 'week');
            this.month.appendChild(this.week);
        }
    }

    drawDay(day) {
        var self = this;
        this.getWeek(day);

        //Outer Day
        var outer = this.createElement('div', this.getDayClass(day));
        outer.addEventListener('click', function () {
            self.openDay(this);
        });

        //Day Name
        var name = this.createElement('div', 'day-name', day.format('ddd'));

        //Day Number
        var number = this.createElement('div', 'day-number', day.format('DD'));


        //Events
        var events = this.createElement('div', 'day-events');
        this.drawEvents(day, events);

        outer.appendChild(name);
        outer.appendChild(number);
        outer.appendChild(events);
        this.week.appendChild(outer);
    }

    drawEvents(day, element) {
        if (day.month() === this.current.month()) {
            var todaysEvents = this.events.reduce(function (memo, ev) {
                if (ev.date.isSame(day, 'day')) {
                    memo.push(ev);
                }
                //console.log(`ev.date=${ev.date} memo=${memo}`);
                return memo;
            }, []);

            var self = this;
            todaysEvents.forEach(function (ev) {
                var evSpan = self.createElement('span', ev.color);
                element.appendChild(evSpan);
            });
        }
    }

    getDayClass(day) {
        //console.log(`getDayClass this.today =${this.today}`)
        this.classes = ['day'];
        if (day.month() !== this.current.month()) {
            this.classes.push('other');
        } else if (this.today.isSame(day, 'day')) {
            this.classes.push('today');
        }
        return this.classes.join(' ');
    }

    openDay(el) {
        var details, arrow;
        var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
        var day = this.current.clone().date(dayNumber);
        
        var currentOpened = document.querySelector('.details');

        //Check to see if there is an open detais box on the current row
        if (currentOpened && currentOpened.parentNode === el.parentNode) {
            details = currentOpened;
            arrow = document.querySelector('.arrow');
        } else {
            //Close the open events on differnt week row
            //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
            if (currentOpened) {
                currentOpened.addEventListener('webkitAnimationEnd', function () {
                    currentOpened.parentNode.removeChild(currentOpened);
                });
                currentOpened.addEventListener('oanimationend', function () {
                    currentOpened.parentNode.removeChild(currentOpened);
                });
                currentOpened.addEventListener('msAnimationEnd', function () {
                    currentOpened.parentNode.removeChild(currentOpened);
                });
                currentOpened.addEventListener('animationend', function () {
                    currentOpened.parentNode.removeChild(currentOpened);
                });
                currentOpened.className = 'details out';
            }

            //Create the Details Container
            details = this.createElement('div', 'details in');

            //Create the arrow
            var arrow = this.createElement('div', 'arrow');

            //Create the event wrapper

            details.appendChild(arrow);
            el.parentNode.appendChild(details);
        }

        var todaysEvents = this.events.reduce(function (memo, ev) {
            
            if (ev.date.isSame(day, 'day')) {
                memo.push(ev);
            }
            return memo;
        }, []);

        $(details).bind("click", { type: 'selfwrite', self: this, events: todaysEvents, day: day, info: this.info, arg: this.arg }, this.eventHandler);
        this.renderEvents(todaysEvents, details);

        arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
    }

    renderEvents (events, ele) {
        //Remove any events in the current details element
        var currentWrapper = ele.querySelector('.events');
        var wrapper = this.createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

        var ele = ele;
        var self = this;
        events.forEach(function (ev) {
            var div = self.createElement('div', 'event');
            var square = self.createElement('div', 'event-category ' + ev.color);
            var span = self.createElement('span', '', ev.eventName);

            div.appendChild(square);
            div.appendChild(span);
            wrapper.appendChild(div);
        });

        if (!events.length) {
            var div = this.createElement('div', 'event empty');
            var span = this.createElement('span', '', 'No Events');

            div.appendChild(span);
            wrapper.appendChild(div);
        }

        if (currentWrapper) {
            currentWrapper.className = 'events out';
            currentWrapper.addEventListener('webkitAnimationEnd', function () {
                currentWrapper.parentNode.removeChild(currentWrapper);
                ele.appendChild(wrapper);
            });
            currentWrapper.addEventListener('oanimationend', function () {
                currentWrapper.parentNode.removeChild(currentWrapper);
                ele.appendChild(wrapper);
            });
            currentWrapper.addEventListener('msAnimationEnd', function () {
                currentWrapper.parentNode.removeChild(currentWrapper);
                ele.appendChild(wrapper);
            });
            currentWrapper.addEventListener('animationend', function () {
                currentWrapper.parentNode.removeChild(currentWrapper);
                ele.appendChild(wrapper);
            });
        } else {
            ele.appendChild(wrapper);
        }
    }

    drawLegend() {
        var self = this;
        var legend = this.createElement('div', 'legend');
        var calendars = this.events.map(function (e) {
            return e.calendar + '|' + e.color;
        }).reduce(function (memo, e) {
            if (memo.indexOf(e) === -1) {
                memo.push(e);
            }
            return memo;
        }, []).forEach(function (e) {
            var parts = e.split('|');
            var entry = self.createElement('span', 'entry ' + parts[1], parts[0]);
            legend.appendChild(entry);
        });
        this.el.appendChild(legend);
    }

    nextMonth() {
        this.current.add('months', 1);
        this.next = true;
        this.draw();
    }

    prevMonth = function () {
        this.current.subtract('months', 1);
        this.next = false;
        this.draw();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'selfwrite') {
            __modal.show('입 력', self.createScheduleFormView());
            var day = e.data.day;
            var events = e.data.events;
            var event = null;
            events.forEach(function (ev) {
                //var square = self.createElement('div', 'event-category ' + ev.color);
                //var span = self.createElement('span', '', ev.eventName);
                //console.log(`ev.eventName=${ev.eventName}`);
                day = ev.date;
                event = ev;
            });

            var form = document.getElementById("scheduleForm");

            day = day.format(`YYYY-MM-DD`) + 'T10:00';
            //console.log(`ev=${event}`);
            form.starttime.value = day;
            form.endtime.value = day;
            if (event != null) {
                form.comment.value = event.comment;
                form.subject.value = event.subject;
                form.place.value = event.place;
            }
            
            form.dbpath.value = arg.dbpath;
            $('#scheduledelSubmit').remove();
            $('#schedulemodifySubmit').remove();
            $('#scheduleaddSubmit').bind("click", { type: 'scheduleaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'scheduleaddSubmit') {

            var form = document.getElementById("scheduleForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'scheduledelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("scheduleForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'schedulemodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("scheduleForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            //console.log('EmployeeView arg2.path=' + arg2.path);
            arg.self.postAjax(arg);

        } else if (type == 'scheduleviewbody') {

            //__fullscreenView.setContent(`보기`, self.createScheduleFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createScheduleFormView());

            var form = document.getElementById("scheduleForm");

            form.uid.value = info.uid;
            //console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.name.value = info.name;
            //form.name.value = info.name;
            form.starttime.value = info.starttime;
            form.endtime.value = info.endtime;
            form.subject.value = info.subject;
            form.comment.value = info.comment;
            form.place.value = info.place;
            //form.register.value = info.register;
            $('#scheduleaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#scheduledelSubmit').bind("click", { type: 'scheduledelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#schedulemodifySubmit').bind("click", { type: 'schedulemodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


        }
    }

    createScheduleFormView() {
        var mo = `<div class="">
                            <form id="scheduleForm" method="post" class="form-horizontal white-bg-gradient  text-left">
                                <input type="hidden" name="type" value="add" />
                                <input type="hidden" name="code" value="schedule" />
                                <input type="hidden" name="addtype" value="add" />
                                <input type="hidden" name="boardtype" value="base" />
                                <input type="hidden" name="dbpath" value="erp.dadb" />
                                <input type="hidden" name="uid" value="uid" />

                                <div class="controls" id="radioCheck">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="addschedule" id=del" value="del" onclick="radioScheduleType(this)" checked>
                                                <label class="form-check-label" for="exampleRadios1">
                                                    삭제
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="addschedule" id="modify" value="modify" onclick="radioScheduleType(this)">
                                                <label class="form-check-label" for="exampleRadios2">
                                                    수정
                                                </label>
                                            </div>
                                        </div>
                                        
                                    </div>

                                </div>
                                <div class="clearfix"></div>
                                <script>
                                    function radioScheduleType(obj) {
                                        var imageBox = document.getElementById("selected-image");
                                        //console.log(obj.id);
                                        switch (obj.id) {
                                            case "del":
                                                
                                                break;
                                            case "modify":
                                                
                                                break;
                                            
                                        }
                                    }
                                </script>

                                <div class="controls" id="addform">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="empname" class="control-label">시작시간</label>
                                                <div>
                                                    <input type="datetime-local" class="form-control" name="starttime" placeholder="시간..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="empname" class="control-label">마감시간</label>
                                                <div>
                                                    <input type="datetime-local" class="form-control" name="endtime" placeholder="시간..."/
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="clearfix"></div>

                                <div class="controls" id="addcomment">
                                    <div class="row">
                                        
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="empcode" class="control-label">제 목</label>
                                                <div>
                                                    <input type="text" class="form-control" name="subject" placeholder="제 목..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="date" class="control-label">메 모</label>
                                                <div>
                                                    <textarea class="form-control" name="comment" placeholder="메 모..." ></textarea>
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="clearfix"></div>

                                <div class="controls" id="addcomment">
                                    <div class="row">

                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="place" class="control-label">현장</label>
                                                <div>
                                                    <input type="text" class="form-control" name="place" placeholder="제 목..." required />
                                                </div>
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        
                                    </div>

                                </div>
                                <div class="clearfix"></div>

                                <div class="controls" id="addcomment">
                                    <div class="row">

                                        <div class="col-sm-12">
                                            <div class="form-group text-right">
                                                <input type="reset" value="리 셋" class="btn">
                                                <input type="button" id="scheduleaddSubmit" value="전송" class="btn btn-info">
                                                <input type="button" id="scheduledelSubmit" value="삭제" class="btn btn-info">
                                                <input type="button" id="schedulemodifySubmit" value="수정" class="btn btn-info">
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div class="clearfix"></div>
                                
                            </form>
                        </div>`;

        return mo;
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
        var thE2 = $("<th style='width: 20%'>").text("시작날짜");
        var thE3 = $("<th style='width: 20%'>").text("종료날짜");
        var thE4 = $("<th style='width: 35%'>").text("제목");
        var thE5 = $("<th style='width: 20%'>").text("현장");

        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'selfwrite', self: this, info: info, arg: arg }, this.eventHandler);
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
                var tdE2 = $("<td>").text(info.starttime).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.endtime);
                var tdE4 = $("<td>").text(info.subject);
                var tdE5 = $("<td>").text(info.place);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'scheduleviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }

    createScheduleCalendarView(info2, arg, eventHandler) {
        var info = info2.loginfo;
        var pageinfo = info2.pageinfo;
        var arrarr = info2.arrarr;

        var $temp = $("<div>");

        var data = [];
        if (arrarr && arrarr.length >= 0) {
            for (var i = 0; i < arrarr.length; i++) {
                //cnt++;
                var info = arrarr[i];
                var arr = arrarr[i].arr;

                var eventinfo = {};
                eventinfo.date = moment(info.starttime);
                eventinfo.calendar = 'work';
                eventinfo.eventName = info.subject;
                eventinfo.color = 'orange';
                eventinfo.endtime = info.endtime;
                eventinfo.place = info.place;
                eventinfo.subject = info.subject;
                eventinfo.comment = info.comment;

                data.push(eventinfo);

            }
        }

        var eventinfo = {};
        eventinfo.date = moment('2022.10.26');
        eventinfo.calendar = 'work';
        eventinfo.eventName = 'info.subject';
        eventinfo.color = 'orange';
        data.push(eventinfo);
        
        //this.Calendar(arg.elem, []);
        this.Calendar(info, arg, data);

        return $temp;
    }
}

class CardpayView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'selfwrite') {
            __modal.show('입 력', self.createCardpayFormView());

            var form = document.getElementById("cardpayForm");

            form.dbpath.value = arg.dbpath;
            $('#cardpaydelSubmit').remove();
            $('#cardpaymodifySubmit').remove();
            $('#cardpayaddSubmit').bind("click", { type: 'cardpayaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'cardpayaddSubmit') {

            var form = document.getElementById("cardpayForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=add&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'cardpaydelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("cardpayForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'cardpaymodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("cardpayForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=modify&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'cardpayviewbody') {

            //__fullscreenView.setContent(`보기`, self.createCardpayFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createCardpayFormView());

            var form = document.getElementById("cardpayForm");

            form.uid.value = info.uid;
            //console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.id.value = info.id;
            //form.name.value = info.name;
            form.cardname.value = info.cardname;
            form.paytype.value = info.paytype;
            form.paymonth.value = info.paymonth;
            form.paystart.value = info.paystart;
            form.money.value = info.money;
            form.payinfo.value = info.payinfo;
            form.paydate.value = info.paydate;
            //form.register.value = info.register;

            //form.register.value = info.register;
            $('#cardpayaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#cardpaydelSubmit').bind("click", { type: 'cardpaydelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#cardpaymodifySubmit').bind("click", { type: 'cardpaymodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


        }
    }

    createCardpayFormView() {
        var mo = `<form id="cardpayForm" method="post" class="form-horizontal white-bg-gradient">
                        <h2>결제 정보입력</h2>
                        <input type="hidden" name="type" id="type" value="add" />
                        <input type="hidden" name="code" id="code" value="cardpay" />
                        <input type="hidden" name="addtype" id="addtype" value="add" />
                        <input type="hidden" name="boardtype" id="boardtype" value="base" />
                        <input type="hidden" name="dbpath" id="dbpath" value="self.dadb" />

                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="cardname">카드명:</label>
                            <div class="col-sm-4">
                                <input type="text" name="cardname" id="cardname" placeholder="카드이름..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="paytype">항목:</label>
                            <div class="col-sm-4">
                                <input type="text" name="paytype" id="paytype" placeholder="항목 (1-현금서비스 / 2 - 물품구입)..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="paymonth">결제기간:</label>
                            <div class="col-sm-4">
                                <input type="text" name="paymonth" id="paymonth" placeholder="결제기간..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="paystart">결제시작월:</label>
                            <div class="col-sm-4">
                                <input type="text" name="paystart" id="paystart" placeholder="결제시작월..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="money">금액:</label>
                            <div class="col-sm-4">
                                <input type="number" name="money" id="money" placeholder="금액..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="paydate">결제날짜:</label>
                            <div class="col-sm-4">
                                <input type="text" name="paydate" id="paydate" placeholder="결제날짜..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="payinfo">지불내용:</label>
                            <div class="col-sm-4">
                                <textarea cols="40" rows="18" name="payinfo" id="payinfo" placeholder="내 용..." required="" autofocus="" type="text"></textarea>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-4">
                                    <input type="reset" value="리 셋" class="btn">
                                    <input type="button" id="cardpayaddSubmit" value="전송" class="btn btn-info">
                                    <input type="button" id="cardpaydelSubmit" value="삭제" class="btn btn-info">
                                    <input type="button" id="cardpaymodifySubmit" value="수정" class="btn btn-info">
                                </div>
                            </div>
                    </form>`;

        return mo;
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
        var thE2 = $("<th style='width: 10%'>").text("카드");
        var thE3 = $("<th style='width: 10%'>").text("타입");
        var thE4 = $("<th style='width: 10%'>").text("할부기간");
        var thE5 = $("<th style='width: 35%'>").text("금액");
        var thE6 = $("<th style='width: 35%'>").text("결제일");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5).append(thE6);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'selfwrite', self: this, info: info, arg: arg }, this.eventHandler);
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
                var tdE2 = $("<td>").text(info.cardname);
                var tdE3 = $("<td>").text(info.paytype);
                var tdE4 = $("<td>").text(info.paymonth);
                var tdE5 = $("<td>").text(info.money);
                var tdE6 = $("<td>").text(info.paystart);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5).append(tdE6);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'cardpayviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class CreditcardView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'selfwrite') {
            __modal.show('입 력', self.createCreditcardFormView());

            var form = document.getElementById("creditcardForm");

            form.dbpath.value = arg.dbpath;
            $('#creditcarddelSubmit').remove();
            $('#creditcardmodifySubmit').remove();
            $('#creditcardaddSubmit').bind("click", { type: 'creditcardaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'creditcardaddSubmit') {

            var form = document.getElementById("creditcardForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=add&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'creditcarddelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("creditcardForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'creditcardmodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("creditcardForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=modify&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'creditcardviewbody') {

            //__fullscreenView.setContent(`보기`, self.createCreditcardFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createCreditcardFormView());

            var form = document.getElementById("creditcardForm");

            form.uid.value = info.uid;
            //console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.id.value = info.id;
            //form.name.value = info.name;
            form.goodscode.value = info.goodscode;
            form.goodsname.value = info.goodsname;
            form.rentaldate.value = info.rentaldate;
            form.receivedate.value = info.receivedate;
            form.rentalmoney.value = info.rentalmoney;
            form.rentalstate.value = info.rentalstate;
            form.magam.value = info.magam;
            //form.register.value = info.register;

            //form.register.value = info.register;
            $('#creditcardaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#creditcarddelSubmit').bind("click", { type: 'creditcarddelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#creditcardmodifySubmit').bind("click", { type: 'creditcardmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


        }
    }

    createCreditcardFormView() {
        var mo = ` <form id="creditcardForm"  method="post" class="form-horizontal white-bg-gradient">
                <h2>크레디트카드 정보입력</h2>
                <p>크레디트카드 정보입력폼.</p>
                <input type="hidden" name="type" id="type" value="add" />
                <input type="hidden" name="code" id="code" value="creditcard" />
                <input type="hidden" name="addtype" id="addtype" value="add" />
                <input type="hidden" name="boardtype" id="boardtype" value="base" />
                <input type="hidden" name="dbpath" id="dbpath" value="self.dadb" />

                <div class="form-group">
                    <label class="col-sm-2 control-label" for="id">아이디:</label>
                    <div class="col-sm-4">
                        <input type="text" name="id" id="id" value="" placeholder="아이디..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="cardname">카드명:</label>
                    <div class="col-sm-4">
                        <input type="text" name="cardname" id="cardname" placeholder="카드이름..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="settleday">결제일:</label>
                    <div class="col-sm-4">
                        <input type="number" name="settleday" id="settleday" placeholder="결제일..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="bankkey">결제은행:</label>
                    <div class="col-sm-4">
                        <input type="number" name="bankkey" id="bankkey" placeholder="결제은행..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="checks">체크:</label>
                    <div class="col-sm-4">
                        <input type="text" name="checks" id="checks" placeholder="체크..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-4">
                        <input type="reset" value="리 셋" class="btn">
                        <input type="button" id="creditcardaddSubmit" value="전송" class="btn btn-info">
                        <input type="button" id="creditcarddelSubmit" value="삭제" class="btn btn-info">
                        <input type="button" id="creditcardmodifySubmit" value="수정" class="btn btn-info">
                    </div>
                </div>
            </form>`;

        return mo;
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
        var thE2 = $("<th style='width: 10%'>").text("카드");
        var thE3 = $("<th style='width: 10%'>").text("결제일");
        var thE4 = $("<th style='width: 10%'>").text("결제은행");
        var thE5 = $("<th style='width: 35%'>").text("체크");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'selfwrite', self: this, info: info, arg: arg }, this.eventHandler);
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
                var tdE2 = $("<td>").text(info.cardname);
                var tdE3 = $("<td>").text(info.settleday);
                var tdE4 = $("<td>").text(info.bankkey);
                var tdE5 = $("<td>").text(info.checks);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'creditcardviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class Cardpay_setView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'selfwrite') {
            __modal.show('입 력', self.createCardpayFormView());

            var form = document.getElementById("cardpay_setForm");

            form.dbpath.value = arg.dbpath;
            $('#cardpay_setdelSubmit').remove();
            $('#cardpay_setmodifySubmit').remove();
            $('#cardpay_setaddSubmit').bind("click", { type: 'cardpay_setaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'cardpay_setaddSubmit') {

            var form = document.getElementById("cardpay_setForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=add&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'cardpay_setdelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("cardpay_setForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'rental_setmodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("cardpay_setForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=modify&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'cardpay_setviewbody') {

            //__fullscreenView.setContent(`보기`, self.createCardpayFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createCardpayFormView());

            var form = document.getElementById("cardpayForm");

            form.uid.value = info.uid;
            //console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.id.value = info.id;
            //form.name.value = info.name;
            form.goodscode.value = info.goodscode;
            form.goodsname.value = info.goodsname;
            form.rentaldate.value = info.rentaldate;
            form.receivedate.value = info.receivedate;
            form.rentalmoney.value = info.rentalmoney;
            form.rentalstate.value = info.rentalstate;
            form.magam.value = info.magam;
            //form.register.value = info.register;

            //form.register.value = info.register;
            $('#cardpay_setaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#cardpay_setdelSubmit').bind("click", { type: 'cardpay_setdelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#cardpay_setmodifySubmit').bind("click", { type: 'cardpay_setmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


        }
    }

    createCardpay_setFormView() {
        var mo = `<form id="cardpay_setForm" method="post" class="form-horizontal white-bg-gradient">
                        <h2>결제 정보입력</h2>
                        <p>결저정보 지불내역 정보입력폼.</p>
                        <input type="hidden" name="type" id="type" value="add" />
                        <input type="hidden" name="code" id="code" value="cardpay_dtl" />
                        <input type="hidden" name="addtype" id="addtype" value="add" />
                        <input type="hidden" name="boardtype" id="boardtype" value="base" />
                        <input type="hidden" name="dbpath" id="dbpath" value="self.dadb" />

                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="cardname">카드명:</label>
                            <div class="col-sm-4">
                                <input type="text" name="cardname" id="cardname" placeholder="카드이름..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="paytype">연체금액:</label>
                            <div class="col-sm-4">
                                <input type="text" name="delay_money" id="paytype" placeholder="연체금액..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="paymonth">결제금액:</label>
                            <div class="col-sm-4">
                                <input type="text" name="total_money" placeholder="결제금액..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="paystart">결제시작월:</label>
                            <div class="col-sm-4">
                                <input type="text" name="setstart" id="setstart" placeholder="결제시작월..." required="" autofocus="" />
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="paydate">결제날짜:</label>
                            <div class="col-sm-4">
                                <input type="text" name="setdate" id="paydate" placeholder="결제날짜..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            
                            <div class="form-group">
                                <div class="col-sm-4">
                                    <input type="reset" value="리 셋" class="btn">
                                    <input type="button" id="cardpay_setaddSubmit" value="전송" class="btn btn-info">
                                    <input type="button" id="cardpay_setdelSubmit" value="삭제" class="btn btn-info">
                                    <input type="button" id="cardpay_setmodifySubmit" value="수정" class="btn btn-info">
                                </div>
                            </div>
                    </form>`;

        return mo;
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
        var thE2 = $("<th style='width: 10%'>").text("카드");
        var thE3 = $("<th style='width: 10%'>").text("연체금액");
        var thE4 = $("<th style='width: 10%'>").text("결제금액");
        var thE5 = $("<th style='width: 35%'>").text("결제월");
        var thE6 = $("<th style='width: 35%'>").text("결제일");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5).append(thE6);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'selfwrite', self: this, info: info, arg: arg }, this.eventHandler);
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
                var tdE2 = $("<td>").text(info.cardname);
                var tdE3 = $("<td>").text(info.delay_money);
                var tdE4 = $("<td>").text(info.total_money);
                var tdE5 = $("<td>").text(info.setstart);
                var tdE6 = $("<td>").text(info.setdate);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5).append(tdE6);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'cardpayviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class Cardpay_dtlView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'selfwrite') {
            __modal.show('입 력', self.createCardpayFormView());

            var form = document.getElementById("cardpay_dtlForm");

            form.dbpath.value = arg.dbpath;
            $('#cardpay_dtldelSubmit').remove();
            $('#cardpay_dtlmodifySubmit').remove();
            $('#cardpay_dtladdSubmit').bind("click", { type: 'cardpay_dtladdSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'cardpay_dtladdSubmit') {

            var form = document.getElementById("cardpay_dtlForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=add&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'cardpay_dtldelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("cardpay_dtlForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'cardpay_dtlmodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("cardpay_dtlForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=modify&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'cardpay_dtlviewbody') {

            //__fullscreenView.setContent(`보기`, self.createCardpayFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createCardpay_setFormView());

            var form = document.getElementById("cardpay_dtlForm");

            form.uid.value = info.uid;
            //console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.id.value = info.id;
            //form.name.value = info.name;
            form.goodscode.value = info.goodscode;
            form.goodsname.value = info.goodsname;
            form.rentaldate.value = info.rentaldate;
            form.receivedate.value = info.receivedate;
            form.rentalmoney.value = info.rentalmoney;
            form.rentalstate.value = info.rentalstate;
            form.magam.value = info.magam;
            //form.register.value = info.register;

            //form.register.value = info.register;
            $('#cardpay_dtladdSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#cardpay_dtldelSubmit').bind("click", { type: 'cardpay_dtldelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#cardpay_dtlmodifySubmit').bind("click", { type: 'cardpay_dtlmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


        }
    }

    createCardpay_dtlFormView() {
        var mo = `<form id="cardpay_dtlForm" method="post" class="form-horizontal white-bg-gradient">
                        <h2>결제 정보입력</h2>
                        <p>결저정보 지불내역 정보입력폼.</p>
                        <input type="hidden" name="type" id="type" value="add" />
                        <input type="hidden" name="code" id="code" value="cardpay_dtl" />
                        <input type="hidden" name="addtype" id="addtype" value="add" />
                        <input type="hidden" name="boardtype" id="boardtype" value="base" />
                        <input type="hidden" name="dbpath" id="dbpath" value="self.dadb" />

                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="cardname">카드명:</label>
                            <div class="col-sm-4">
                                <input type="text" name="cardname" id="cardname" placeholder="카드이름..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="paytype">항목:</label>
                            <div class="col-sm-4">
                                <input type="text" name="paynum" id="paytype" placeholder="핣부회차..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="paymonth">할부월:</label>
                            <div class="col-sm-4">
                                <input type="text" name="paymonth" id="paymonth" placeholder="할부월..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="paystart">결제시작월:</label>
                            <div class="col-sm-4">
                                <input type="text" name="paystart" id="paystart" placeholder="결제시작월..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="money">금액:</label>
                            <div class="col-sm-4">
                                <input type="number" name="money" id="money" placeholder="금액..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="paydate">결제날짜:</label>
                            <div class="col-sm-4">
                                <input type="text" name="paydate" id="paydate" placeholder="결제날짜..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="payinfo">지불내용:</label>
                            <div class="col-sm-4">
                                <textarea cols="40" rows="18" name="payinfo" id="payinfo" placeholder="내 용..." required="" autofocus="" type="text"></textarea>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-4">
                                    <input type="reset" value="리 셋" class="btn">
                                    <input type="button" id="cardpay_dtladdSubmit" value="전송" class="btn btn-info">
                                    <input type="button" id="cardpay_dtldelSubmit" value="삭제" class="btn btn-info">
                                    <input type="button" id="cardpay_dtlmodifySubmit" value="수정" class="btn btn-info">
                                </div>
                            </div>
                    </form>`;

        return mo;
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
        var thE2 = $("<th style='width: 10%'>").text("카드");
        var thE3 = $("<th style='width: 10%'>").text("할부회차");
        var thE4 = $("<th style='width: 10%'>").text("할부개월");
        var thE5 = $("<th style='width: 35%'>").text("금액");
        var thE6 = $("<th style='width: 35%'>").text("결제일");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5).append(thE6);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'selfwrite', self: this, info: info, arg: arg }, this.eventHandler);
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
                var tdE2 = $("<td>").text(info.cardname);
                var tdE3 = $("<td>").text(info.paynum);
                var tdE4 = $("<td>").text(info.paymonth);
                var tdE5 = $("<td>").text(info.money);
                var tdE6 = $("<td>").text(info.paystart);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5).append(tdE6);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'cardpayviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class Bank_bookView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'selfwrite') {
            __modal.show('입 력', self.createBank_bookFormView());

            var form = document.getElementById("bank_bookForm");

            form.dbpath.value = arg.dbpath;
            $('#bank_bookdelSubmit').remove();
            $('#bank_bookmodifySubmit').remove();
            $('#bank_bookaddSubmit').bind("click", { type: 'bank_bookaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'bank_bookaddSubmit') {

            var form = document.getElementById("bank_bookForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=add&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'bank_bookdelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("bank_bookForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'bank_bookmodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("bank_bookForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=modify&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'bank_bookviewbody') {

            //__fullscreenView.setContent(`보기`, self.createBank_bookFormView());
            //__fullscreenView.fullscreen('fullscreenwin');
            var f = new FullScreenView();
            f.setContent(`보기`, self.createBank_bookFormView());

            var form = document.getElementById("bank_bookForm");

            form.uid.value = info.uid;
            //console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.id.value = info.id;
            //form.name.value = info.name;
            form.bookname.value = info.bookname;
            form.bankname.value = info.bankname;
            form.banknum.value = info.banknum;
            form.money.value = info.money;
            //form.register.value = info.register;

            //form.register.value = info.register;
            $('#bank_bookaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#bank_bookdelSubmit').bind("click", { type: 'bank_bookdelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#bank_bookmodifySubmit').bind("click", { type: 'bank_bookmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


        }
    }

    createBank_bookFormView() {
        var mo = `<form id="bank_bookForm" method="post" class="form-horizontal white-bg-gradient">
                <h2>은행 정보입력</h2>
                <input type="hidden" name="type" id="type" value="add" />
                <input type="hidden" name="code" id="code" value="bank_book" />
                <input type="hidden" name="addtype" id="addtype" value="add" />
                <input type="hidden" name="boardtype" id="boardtype" value="base" />
                <input type="hidden" name="dbpath" id="dbpath" value="self.dadb" />

                <div class="form-group">
                    <label class="col-sm-2 control-label" for="id">아이디:</label>
                    <div class="col-sm-4">
                        <input type="text" name="id" id="id" value="" placeholder="아이디..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="bookname">통장이름:</label>
                    <div class="col-sm-4">
                        <input type="text" name="bookname" id="bookname" placeholder="통장이름..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="bankname">은행이름:</label>
                    <div class="col-sm-4">
                        <input type="text" name="bankname" id="bankname" placeholder="은행이름..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="banknum">계좌번호:</label>
                    <div class="col-sm-4">
                        <input type="text" name="banknum" id="banknum" placeholder="계좌번호..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="money">잔액:</label>
                    <div class="col-sm-4">
                        <input type="number" name="money" id="money" placeholder="잔액..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="check">체크:</label>
                    <div class="col-sm-4">
                        <select name="check" id="check" data-role="slider">
                            <option value="off">Off</option>
                            <option value="on">On</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-4">
                        <input type="reset" value="리 셋" class="btn">
                        <input type="button" id="bank_bookaddSubmit" value="전송" class="btn btn-info">
                        <input type="button" id="bank_bookdelSubmit" value="삭제" class="btn btn-info">
                        <input type="button" id="bank_bookmodifySubmit" value="수정" class="btn btn-info">
                    </div>
                </div>
            </form>`;

        return mo;
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
        var thE2 = $("<th style='width: 10%'>").text("통장이름");
        var thE3 = $("<th style='width: 10%'>").text("은행이름");
        var thE4 = $("<th style='width: 10%'>").text("계좌번호");
        var thE5 = $("<th style='width: 35%'>").text("잔액");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'selfwrite', self: this, info: info, arg: arg }, this.eventHandler);
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
                var tdE2 = $("<td>").text(info.bookname);
                var tdE3 = $("<td>").text(info.bankname);
                var tdE4 = $("<td>").text(info.banknum);
                var tdE5 = $("<td>").text(info.money);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'bank_bookviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class PayView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'selfwrite') {
            __modal.show('입 력', self.createPayFormView());

            var form = document.getElementById("payForm");

            form.dbpath.value = arg.dbpath;
            $('#paydelSubmit').remove();
            $('#paymodifySubmit').remove();
            $('#payaddSubmit').bind("click", { type: 'payaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'payaddSubmit') {

            var form = document.getElementById("payForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=add&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'paydelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("payForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'paymodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("payForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=modify&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'payviewbody') {

            __fullscreenView.setContent(`보기`, self.createPayFormView());
            __fullscreenView.fullscreen('fullscreenwin');

            var form = document.getElementById("payForm");

            form.uid.value = info.uid;
            //console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.id.value = info.id;
            //form.name.value = info.name;
            form.payfrom.value = info.payfrom;
            form.payclass.value = info.payclass;
            form.payinfo.value = info.payinfo;
            form.money.value = info.money;
            form.date.value = info.date;
            //form.register.value = info.register;

            //form.register.value = info.register;
            $('#payaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#paydelSubmit').bind("click", { type: 'paydelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#paymodifySubmit').bind("click", { type: 'paymodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


        }
    }

    createPayFormView() {
        var mo = `<form id="payForm" method="post" class="form-horizontal white-bg-gradient">
                <h2>지출 정보입력</h2>
                <input type="hidden" name="type" id="type" value="add" />
                <input type="hidden" name="code" id="typecode" value="pay" />
                <input type="hidden" name="addtype" id="addtype" value="add" />
                <input type="hidden" name="boardtype" id="boardtype" value="base" />
                <input type="hidden" name="dbpath" id="dbpath" value="self.dadb" />

                <div class="form-group">
                    <label class="col-sm-2 control-label" for="id">아이디:</label>
                    <div class="col-sm-4">
                        <input type="text" name="id" id="id" value="" placeholder="아이디..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="payfrom">지출원:</label>
                    <div class="col-sm-4">
                        <input type="text" name="payfrom" id="payfrom" placeholder="지출원..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="payclass">지출항목:</label>
                    <div class="col-sm-4">
                        <input type="text" name="payclass" id="payclass" placeholder="지출항목..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="payinfo">지출정보:</label>
                    <div class="col-sm-4">
                        <input type="text" name="payinfo" id="payinfo" placeholder="지출정보..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="money">금액:</label>
                    <div class="col-sm-4">
                        <input type="number" name="money" id="money" placeholder="금액..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="date">지출날짜:</label>
                    <div class="col-sm-4">
                        <input type="text" name="date" id="date" placeholder="지출날짜..." required="" autofocus="" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-4">
                        <input type="reset" value="리 셋" class="btn">
                        <input type="button" id="payaddSubmit" value="전송" class="btn btn-info">
                        <input type="button" id="paydelSubmit" value="삭제" class="btn btn-info">
                        <input type="button" id="paymodifySubmit" value="수정" class="btn btn-info">
                    </div>
                </div>
            </form>`;

        return mo;
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
        var thE2 = $("<th style='width: 10%'>").text("지출원");
        var thE3 = $("<th style='width: 10%'>").text("지출항목");
        var thE4 = $("<th style='width: 10%'>").text("금액");
        var thE5 = $("<th style='width: 35%'>").text("날짜");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'selfwrite', self: this, info: info, arg: arg }, this.eventHandler);
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
                var tdE2 = $("<td>").text(info.payfrom);
                var tdE3 = $("<td>").text(info.payclass);
                var tdE4 = $("<td>").text(info.money);
                var tdE5 = $("<td>").text(info.date);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'payviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class PayclassView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'selfwrite') {
            __modal.show('입 력', self.createPayclassFormView());

            var form = document.getElementById("payclassForm");

            form.dbpath.value = arg.dbpath;
            $('#payclassdelSubmit').remove();
            $('#payclassmodifySubmit').remove();
            $('#payclassaddSubmit').bind("click", { type: 'payclassaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'payclassaddSubmit') {

            var form = document.getElementById("payForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=add&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'payclassdelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("payclassForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'payclassmodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("payclassForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=modify&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'payclassviewbody') {

            __fullscreenView.setContent(`보기`, self.createPayclassFormView());
            __fullscreenView.fullscreen('fullscreenwin');

            var form = document.getElementById("payclassForm");

            form.uid.value = info.uid;
            //console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.id.value = info.id;
            //form.name.value = info.name;
            form.payfrom.value = info.cinfo;
            //form.register.value = info.register;

            //form.register.value = info.register;
            $('#payclassaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#payclassdelSubmit').bind("click", { type: 'payclassdelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#payclassmodifySubmit').bind("click", { type: 'payclassmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


        }
    }

    createPayclassFormView() {
        var mo = `<form id="payclassForm" method="post" class="form-horizontal white-bg-gradient">
                <h2>지출 정보입력</h2>
                <input type="hidden" name="type" id="type" value="add" />
                <input type="hidden" name="code" id="typecode" value="payclass" />
                <input type="hidden" name="addtype" id="addtype" value="add" />
                <input type="hidden" name="boardtype" id="boardtype" value="base" />
                <input type="hidden" name="dbpath" id="dbpath" value="self.dadb" />

                <div class="form-group">
                    <label class="col-sm-2 control-label" for="id">아이디:</label>
                    <div class="col-sm-4">
                        <input type="text" name="id" id="id" value="" placeholder="아이디..." required="" autofocus="" />
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="payclass">지출항목:</label>
                    <div class="col-sm-4">
                        <input type="text" name="payclass" id="cinfo" placeholder="지출항목..." required="" autofocus="" />
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="col-sm-4">
                        <input type="reset" value="리 셋" class="btn">
                        <input type="button" id="payclassaddSubmit" value="전송" class="btn btn-info">
                        <input type="button" id="payclassdelSubmit" value="삭제" class="btn btn-info">
                        <input type="button" id="payclassmodifySubmit" value="수정" class="btn btn-info">
                    </div>
                </div>
            </form>`;

        return mo;
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
        var thE2 = $("<th style='width: 10%'>").text("지출항목");
        var thE3 = $("<th style='width: 10%'>").text("첵");
        $(trE).append(thE1).append(thE2).append(thE3);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'selfwrite', self: this, info: info, arg: arg }, this.eventHandler);
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
                var tdE2 = $("<td>").text(info.cinfo);
                var tdE3 = $("<td>").text(info.checks);
                $(trE).append(tdE1).append(tdE2).append(tdE3);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'payclassviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

class In_outputView extends ViewBase {
    constructor() {
        super();
    }

    eventHandler(e) {
        var info = e.data.info;
        var arg = e.data.arg;
        var type = e.data.type;
        var self = e.data.self;

        if (type == 'selfwrite') {
            __modal.show('입 력', self.createIn_outputFormView());

            var form = document.getElementById("in_outputForm");

            form.dbpath.value = arg.dbpath;
            $('#in_outputdelSubmit').remove();
            $('#in_outputmodifySubmit').remove();
            $('#in_outputaddSubmit').bind("click", { type: 'in_outputaddSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            //console.log(`form.fid.value==${form.fid.value} codeval=${codeval}`);
        } else if (type == 'in_outputaddSubmit') {

            var form = document.getElementById("in_outputForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=add&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);
        } else if (type == 'in_outputdelSubmit') {

            if (!confirm(`내용을 삭제합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("in_outputForm");
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=delete&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'in_outputmodifySubmit') {

            if (!confirm(`내용을 수정합니다`)) {
                // 취소(아니오) 버튼 클릭 시 이벤트
                return;
            }

            var form = document.getElementById("in_outputForm");
            form.addtype.value = 'modify';
            //console.log('form^********************************=' + form);
            //var arg2 = { type: "selflist", dbpath: arg.dbpath, code: arg.code, elem: arg.elem, renderinfo: arg.renderinfo, self: arg.self };
            arg.type = "selflist";
            arg.form = form;
            var formData = $(form).serializeArray();

            arg.formData = formData;
            var str = "/list.self?posttype=post&addtype=modify&code=" + arg.code + "&dbpath=" + arg.dbpath + "&utf8=ok&";
            arg.path = str;
            console.log('EmployeeView arg2.path=' + arg.path);
            arg.self.postAjax(arg);

        } else if (type == 'in_outputviewbody') {

            __fullscreenView.setContent(`보기`, self.createIn_outputFormView());
            __fullscreenView.fullscreen('fullscreenwin');

            var form = document.getElementById("in_outputForm");

            form.uid.value = info.uid;
            //console.log(`info.uid 7777777**info.buse=${info.buse}  info.englishname=${info.englishname} info.email=${info.email}`);
            form.id.value = info.id;
            //form.name.value = info.name;
            form.goodscode.value = info.goodscode;
            form.goodsname.value = info.goodsname;
            form.rentaldate.value = info.rentaldate;
            form.receivedate.value = info.receivedate;
            form.rentalmoney.value = info.rentalmoney;
            form.rentalstate.value = info.rentalstate;
            form.magam.value = info.magam;
            //form.register.value = info.register;

            //form.register.value = info.register;
            $('#in_outputaddSubmit').remove();
            form.dbpath.value = arg.dbpath;
            $('#in_outputdelSubmit').bind("click", { type: 'in_outputdelSubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);
            form.dbpath.value = arg.dbpath;
            $('#in_outputmodifySubmit').bind("click", { type: 'in_outputmodifySubmit', self: this, info: info, arg: arg }, e.data.self.eventHandler);


        }
    }

    createIn_outputFormView() {
        var mo = `<form id="in_outputForm" method="post" class="form-horizontal white-bg-gradient">
                        <h2>입출금</h2>
                        <input type="hidden" name="type" id="type" value="add" />
                        <input type="hidden" name="code" id="code" value="in_output" />
                        <input type="hidden" name="addtype" id="addtype" value="add" />
                        <input type="hidden" name="boardtype" id="boardtype" value="base" />
                        <input type="hidden" name="dbpath" id="dbpath" value="self.dadb" />

                        <div class="form-group">
                            <label class="col control-label" for="outputbank">출금계좌:</label>
                            <div class="col">
                                <input type="text" name="outputbank" id="outputbank" placeholder="출금계좌..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col control-label" for="inputbank">입금계좌:</label>
                            <div class="col">
                                <input type="text" name="inputbank" id="inputbank" placeholder="입금계좌..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col control-label" for="inouttype">입출금타입:</label>
                            <div class="col">
                                <input type="text" name="inouttype" id="inouttype" placeholder="입출금타입..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col control-label" for="money">금액:</label>
                            <div class="col">
                                <input type="number" name="money" id="money" placeholder="금액..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col control-label" for="date">날짜:</label>
                            <div class="col">
                                <input type="text" name="date" id="date" placeholder="날짜..." required="" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-4">
                                <input type="reset" value="리 셋" class="btn">
                                <input type="button" id="in_outputaddSubmit" value="전송" class="btn btn-info">
                                <input type="button" id="in_outputdelSubmit" value="삭제" class="btn btn-info">
                                <input type="button" id="in_outputmodifySubmit" value="수정" class="btn btn-info">
                            </div>
                        </div>
                    </form>`;

        return mo;
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
        var thE2 = $("<th style='width: 10%'>").text("아이디");
        var thE3 = $("<th style='width: 10%'>").text("타입");
        var thE4 = $("<th style='width: 10%'>").text("금액");
        var thE5 = $("<th style='width: 35%'>").text("날짜");
        $(trE).append(thE1).append(thE2).append(thE3).append(thE4).append(thE5);

        $(tHeadE).append(trE);

        var trE = $("<tr>");
        var tdE = $("<td>").attr("colspan", "6");
        $(trE).append(tdE);
        $(tFootE).append(trE);
        var $buttonE = $("<input type='button' class='btn btn-outline-info'>");
        $buttonE.attr("type", "button").attr("id", "write").attr("name", "radio").attr('style', 'cursor:pointer;cursor: hand;').css("float", "right");
        $buttonE.val("글작성");
        $buttonE.bind("click", { type: 'selfwrite', self: this, info: info, arg: arg }, this.eventHandler);
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
                var tdE2 = $("<td>").text(info.id).css("text-overflow", "ellipsis");
                var tdE3 = $("<td>").text(info.inouttype);
                var tdE4 = $("<td>").text(info.money);
                var tdE5 = $("<td>").text(info.date);

                $(trE).append(tdE1).append(tdE2).append(tdE3).append(tdE4).append(tdE5);

                $(tBodyE).append(trE);

                $(trE).bind("click", { type: 'in_outputviewbody', self: this, info: info, arg: arg }, this.eventHandler);
                $(trE).attr('style', 'cursor:pointer;cursor: hand;');
            }
        }

        $(arg.elem).empty();
        $(arg.elem).append($temp);

        return $temp;
    }
}

