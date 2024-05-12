class FabricBase {

    getRandomInt = fabric.util.getRandomInt;
    supportsSlider = this.supportsInputOfType('range');
    supportsColorpicker = this.supportsInputOfType('color');

    shape = null;
    canvas;
    canvasLayer;
    canvasContainer;
    dragLayerCanvas;
    dragLayerContext;
    $scope = {};
    handleRChange;
    isShapeDraw = false;

    viewportLeft = 0;
    viewportTop = 0;
    mouseLeft;
    mouseTop;
    dragWidth;
    dragHeight;
    _drawSelection;
    isDown = false;
    iDrawType = -1;
    // line vars
    nearest;
    lines = [];
    isMouseDownMove = false;
    starLeft = 0;
    starTop = 0;
    iDrawStarWidth = 0;

    _objectId = 0;
    _eventObject = { type: 'event', downs: [], ups:[], overs: [] };
    _selectedObject;
    _selectedObjectStyle;

    getFreeDrawingMode() {
        return this.canvas.isDrawMode;
    };
    setFreeDrawingMode (value) {
        this.canvas.isDrawMode = value;
    }
    constructor(arg) {
        self = this;
        this.arg = arg;
        this.init();

        this.addTexts();

        //$('#paintTab button[id="drawtab"]').trigger('click');
        this.canvas.isDrawingMode = true;
        this.isShapeDraw = false;
    }

    init() {
        //console.log('this.canvas2223333 =');
        this.createCanvasContainer();
        this.createCanvasEventHandle();
       // console.log('this.canvas222222222222 =');
    }

    optionWindowSet(type) {
        this.drawWin.hide();
        this.textWin.hide();
        this.shapeWin.hide();
        this.mediaWin.hide();
        this.filterWin.hide();
        this.eventWin.hide();
        this.jsonWin.hide();
        
        if (type == 'drawoption')
            this.drawWin.show();
        else if (type == 'textoption')
            this.textWin.show();
        else if (type == 'shapeoption')
            this.shapeWin.show();
        else if (type == 'mediaoption')
            this.mediaWin.show();
        else if (type == 'filteroption')
            this.filterWin.show();
        else if (type == 'eventoption')
            this.eventWin.show();
        else if (type == 'jsonoption')
            this.jsonWin.show();
    }

    createCanvasContainer() {
        this.canvasContainer = document.createElement('div');
        this.canvasContainer.setAttribute('id', 'canvasContainer');
        this.canvasContainer.style.position = 'absolute';
        this.canvasContainer.style.width = '100%';
        this.canvasContainer.style.height = '100%';

        this.canvasContainer.appendChild(this.createToolbar());
        
        var elem = document.createElement('canvas');
        elem.setAttribute('id', 'fabcanvas');
        // 캔버스 요소의 기본 스타일을 변경
        elem.setAttribute('style', 'border: 2px solid black');
        elem.style.position = 'absolute';
        elem.style.margin = 0;
        elem.style.padding = 0;
        elem.style.top = '0';
        elem.style.left = '0';
        elem.height = '100%';
        elem.width = '100%';
        elem.style.zIndex = 10;

        this.canvasContainer.appendChild(elem);

        //elem.width = elem.parentElement.offsetWidth;
        //elem.height = elem.parentElement.offsetHeight;


        //this.arg.elem.appendChild(this.createToolbar());

        //this.arg.optionElem.appendChild(this.createDrawOption());
        //this.arg.optionElem.appendChild(this.createTextOption());
        //this.arg.optionElem.appendChild(this.createShapeOption());
        //this.arg.optionElem.appendChild(this.createMediaOption());
        //this.arg.optionElem.appendChild(this.createFilterOption());
        //this.arg.optionElem.appendChild(this.createAnimationOption());
        //this.arg.optionElem.appendChild(this.createEventOption());
        //this.arg.optionElem.appendChild(this.createJsonOption());
        elem.style.width = 777;// canvasContainer.offsetWidth;
        elem.style.height = 777;// canvasContainer.offsetHeight;
        elem.width = 777;// canvasContainer.offsetWidth;
        elem.height = 777;// canvasContainer.offsetHeight;
        
        this.arg.elem.appendChild(this.createScaleSetModal());
        
        this.arg.elem.appendChild(this.canvasContainer);
        console.log('this.canvasContainer.offsetHeight=', this.canvasContainer.offsetHeight);
        this.arg.elem.style.height = this.canvasContainer.offsetHeight + 'px'; // 높이값을 문자열로 설정
        console.log('this.arg.elem.offsetHeight=', this.arg.elem.offsetHeight);
        
        var velem = document.createElement('video');
        velem.setAttribute('id', 'video');
        //velem.setAttribute('src', 'chrome.mp4');
        velem.style.display = 'none';
        this.arg.elem.appendChild(velem);

        this.arg.elem.style.width = 777;
        this.arg.elem.style.height = 777;

        this.drawWin = __insertWindow(this.createDrawOption(), '그리기옵션', 22, 22, 400, 700, 'aqua', true);
        this.textWin = __insertWindow(this.createTextOption(), '텍스트옵션', 22, 22, 400, 900, 'aqua', true);
        this.shapeWin = __insertWindow(this.createShapeOption(), '도형옵션', 22, 22, 500, 500, 'aqua', true);
        this.mediaWin = __insertWindow(this.createMediaOption(), '미디어옵션', 22, 22, 500, 500, 'aqua', true);
        this.filterWin = __insertWindow(this.createFilterOption(), '필터옵션', 22, 22, 500, 500, 'aqua', true);
        this.eventWin = __insertWindow(this.createEventOption(), '이벤트옵션', 22, 22, 500, 500, 'aqua', true);
        this.jsonWin = __insertWindow(this.createJsonOption(), '제이슨옵션', 22, 22, 500, 500, 'aqua', true);
        //this.drawToolWin = __insertWindow(this.createToolbar(), '그림도구', 22, 22, 500, 500, 'aqua', true);
        
        //__gridWindows();
        __stairWindows2();
        this.optionWindowSet('drawoption');

        this.createTextOptionEvent();
        this.createDrawOptionEvent();
        this.createMediaOptionEvent();
        this.createShapeOptionEvent();
        //this.createAnimationOptionEvent();
        this.createFilterOptionEvent();
        this.createEventOptionEvent();
        this.createJsonOptionEvent();
        this.createToolbarEvent();

        console.log('this.canvasContainer.offsetWidth=', this.canvasContainer.offsetWidth);
        console.log('this.canvasContainer.offsetHeight=', this.canvasContainer.offsetHeight);
        console.log('this.arg.elem.offsetHeight=', this.arg.elem.offsetHeight);
    }

    selectionFilterSetting() {
        fabric.util.toArray(document.getElementsByTagName('input'))
            .forEach(function (el) { el.disabled = false; })

        var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
            'brightness', 'contrast', 'saturation', 'noise', 'vintage',
            'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
            'polaroid', 'blend-color', 'gamma', 'kodachrome',
            'blackwhite', 'blend-image', 'hue', 'resize'];

        for (var i = 0; i < filters.length; i++) {
            //console.log('i==' + i + 'canvas.getActiveObject()==' + canvas.getActiveObject().filters);
            if (!self.canvas.getActiveObject().filters) {
                //alert('no filter');
                return;
            }
            $$(filters[i]) && (
                $$(filters[i]).checked = !!self.canvas.getActiveObject().filters[i]);

        }
    }

    setSelectionHandle() {
        self._selectedObject = self.canvas.getActiveObject();
        self._selectedObjectStyle = self.getSelectionEventStyle(self._selectedObject);
        self.selectionFilterSetting();
        //console.log('self._selectedObject=', self._selectedObject);
        if (self._selectedObject && self._selectedObject.down) {
            console.log('self._selectedObject.down222=', self._selectedObject.down);
            var down = self._selectedObject.down;
            $$('eventDown').value = JSON.stringify(down);
        } else 
            $$('eventDown').value = '';
        if (self._selectedObject && self._selectedObject.over) {
            console.log('self._selectedObject.over=', self._selectedObject.over);
            var over = self._selectedObject.over;
            
            console.log('over=', over);
            $$('eventOver').value = JSON.stringify(over);
        } else
            $$('eventOver').value = '';
        
        if (self._selectedObject && self._selectedObject.link) {
            $$('eventLink').value = self._selectedObject.link;
            var action = self._selectedObject.action;
            $$('radio_' + action).checked = true;
            console.log('self._selectedObject.link =', self._selectedObject.link);
            console.log('self._selectedObject.action =', self._selectedObject.action);
        } else
            $$('eventLink').value = '';
        
    }

    createCanvasEventHandle() {
        var self = this;
        this.canvas = this.__canvas = new fabric.Canvas('fabcanvas', {
            centeredRotation: false,
            centeredScaling: false,
            isDrawingMode: true
        });
        
        //console.log('this.canvas222222222222 =', this.canvas);
        //$$('canvas').style.zIndex = 1;
        fabric.Object.prototype.originX = "left";
        fabric.Object.prototype.originY = "top";
        fabric.Object.prototype.transparentCorners = false;

        this.createPatternBrush();

        $$('drawing-mode-selector').value = "Pencil";
        var event = new Event('change', { bubbles: true });
        $$('drawing-mode-selector').dispatchEvent(event);

        this.canvas.on({
            'selection:created': function () {
                self.setSelectionHandle();
            },
            'selection:updated': function () {
                //console.log('selection:updated');
                self.setSelectionHandle();
            },
            'selection:cleared': function () {
                //console.log('selection:cleared');
                
                //alert('selection:cleared');
                self._selectedObject = null;
                self._selectedObjectStyle = null;
                //fabric.util.toArray(document.getElementsByTagName('input'))
                //.forEach(function (el) { el.disabled = true; })
            }
        });
        this.canvas.on('mouse:wheel', function (opt) {
            var e = opt.e;
            if (!e.ctrlKey) {
                return;
            }
            var newZoom = self.canvas.getZoom() + e.deltaY / 300;
            self.canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, newZoom);

            self.renderVieportBorders();
            e.preventDefault();
            return false;
        });

        this.shape = new Shape(this);

        this.canvas.on('mouse:over', (options) => {
            //console.log('mouse:over');
            if (options.target && options.target.over) {
                options.target.set(options.target.over);
                self.canvas.renderAll();
            }
                
        });

        this.canvas.on('mouse:out', (options) => {
            if (options.target && options.target.out) {
                options.target.set(options.target.out);
                self.canvas.renderAll();
            }
                
            //console.log('mouse:out');
        });

        this.canvas.on('mouse:down', (options) => {
            //console.log('mouse:down');
            if (options.target && options.target.down) {
                options.target.set(options.target.down);
                self.canvas.renderAll();
            }
                
            if (self.shape.shapeMode)
                self.shape.drawShape(options) // 객체 그리기 시작
        })

        this.canvas.on('mouse:up', (options) => {
            //console.log('mouse:up');
            if (options.target && options.target.up) {
                options.target.set(options.target.up);
                self.canvas.renderAll();
                if (options.target.link) {
                    if (options.target.action) {
                        if (options.target.action == 'link') {
                            if (options.target.link.startsWith('http://') || options.target.link.startsWith('https://'))
                                location.href = options.target.link;
                            else
                                location.href = 'http://' + options.target.link;
                        } else if (options.target.action == 'self') {
                            var f = new FullScreenView();
                            f.setContent(`보기`, '<div>test</div>');
                        } else if (options.target.action == 'board') {
                            var elem = document.createElement('div');
                            var config = {
                                type: type,
                                dbpath: dbpath,
                                code: code,
                                groupid: groupid,
                                brdid: brdid,
                                rendertype: rendertype,
                                renderview: 'BoardView'
                            }
                            var c = new BoardController(config);
                            c.renderController(elem);
                            var f = new FullScreenView();
                            f.setContent(`보기`, elem);
                        }
                    }
                     else {
                        if (options.target.link.startsWith('http://') || options.target.link.startsWith('https://'))
                            location.href = options.target.link;
                        else
                            location.href = 'http://' + options.target.link;
                    }
                }
            }
                
            if (self.shape.shapeMode) {
                self.shape.reset(); // 객체그리기 종료후 리셋
            }
        })

        this.canvas.on('mouse:move', (options) => {
            //console.log('mouse:move');
            if (self.shape.drawing) self.shape.updateShape(options) // 객체 그리기 시작
        })

        document.addEventListener("keydown", function (event) {
            //console.log(' event.which  ' + event.which);
            if (event.which == 27) {
                var r = self.getShapeStyle();
                r.lines = self.lines;
                self.addLine(r);
                self.lines = [];
                //self.dragLayerContext.clearRect(0, 0, self.canvas.width, self.canvas.height);
            } else if (event.which == 46) {
                var object = self.canvas.getActiveObject();
                if (!object) return;

                self.canvas.remove(object);
            }
        })
        //console.log('this.canvas.style.zIndex =', this.canvas.style.zIndex);
       
        this.selectedITabValue = 'drawtab';
        this.iDrawType = 1;
        this.canvas.isDrawingMode = true;


        this.canvas.forEachObject(function (obj) {
            //obj.selectable = false;
        });

        //$("#drawing-mode-selector").val("Pencil").trigger("change");
    }

    createToolbar() {
        var elem = ` <div id="navbar">
        <nav class="navbar navbar-expand-sm" style="background-color: #e3f2fd; border: 1px solid">

            <div class="container-fluid">
                <button class="navbar-toggler btn-sm" type="button" data-toggle="collapse" data-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarScroll">
                    <ul class="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">

                        <li class="nav-item">
                            <button class="nav-item nav-link btn-primary btn-sm" id="drawoptionBtn" onclick="onTabBtnClick(this)">그리기</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-item nav-link btn-success btn-sm" id="shapeoptionBtn" onclick="onTabBtnClick(this)">도형</button>
                        </li>

                        <li class="nav-item">
                            <button class="nav-item nav-link btn-info btn-sm" id="textoptionBtn" onclick="onTabBtnClick(this)">텍스트</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-item nav-link btn-warning btn-sm" id="mediaoptionBtn" onclick="onTabBtnClick(this)">미디어</button>
                        </li>

                        <li class="nav-item">
                            <button class="nav-item nav-link btn-secondary btn-sm" id="filteroptionBtn" onclick="onTabBtnClick(this)">필터</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-item nav-link btn-secondary btn-sm" id="animationoptionBtn" onclick="onTabBtnClick(this)">Animation</button>
                        </li>

                        <li class="nav-item">
                            <button class="nav-item nav-link btn-dark btn-sm" id="eventoptionBtn" onclick="onTabBtnClick(this)">이벤트</button>
                        </li>
                        
                    </ul>
                    <ul class="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
                        <li class="nav-item" data-toggle="collapse" href="#collapseExample">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>

                    </ul>
                    <div class="d-flex pull-right">
                        <button class="btn btn-secondary btn-sm" type="button" id="popupmenuBtn"> 메뉴 </button>
                    </div>
                </div>
            </div>

        </nav>
        <div class="btn-group-vertical" id="paintpopupmenu" style="width:18rem; z-index:1111113; position:absolute">
            <button type="button" class="btn btn-primary" id="open-file-btn">파일열기</button>
            <button type="button" class="btn btn-primary" id="save-file-btn">파일저장</button>
            <button type="button" class="btn btn-primary" id="select-db-btn">디비선택</button>
            <button type="button" class="btn btn-primary" id="open-db-btn">디비열기</button>
            <button type="button" class="btn btn-primary" id="save-db-btn">디비저장</button>
            <button type="button" class="btn btn-primary" id="fabLoader">Fab로더</button>
            <button type="button" class="btn btn-primary" id="saveObjectImageBtn" >선택영역이미지로저장</button>
            <button type="button" class="btn btn-primary" id="saveImageBtn" >이미지로저장</button>
            <button type="button" class="btn btn-primary" id="canvasScaleSetBtn" >캔바스스케일설정</button>
            
            <button type="button" class="btn btn-primary" id="backgroundSetBtn" ">백그라운드설정</button>
        </div>
    </div>`;

        const div = document.createElement('div');
        div.innerHTML = elem;
        return div;
    }

    createToolbarEvent() {
        $(document.body).click(function (e) {
            //console.log('$(document.body).click=');
            if ($('#paintpopupmenu').is(':visible')) {
                $("#paintpopupmenu").css('display', 'none');
            }
            return;
        })

        $("#paintpopupmenu").css('display', 'none');
        $$('popupmenuBtn').onclick = function (e) {
            e.stopPropagation();
            if ($('#paintpopupmenu').is(':visible'))
                return $("#paintpopupmenu").css('display', 'none');
            var p = __setPopupMenuPostion(e, $("#paintpopupmenu"));
            //$("#popup-menu").animate({ left: p.x, top: p.y });
            $("#paintpopupmenu").css({ left: p.x, top: p.y, display: 'block' });
        };
        $$('drawoptionBtn').onclick = function () {
            self.canvas.isDrawingMode = true;
            //self.shape.reset();
            self.optionWindowSet('drawoption');
            self.shape.setShape('');
        };
        $$('shapeoptionBtn').onclick = function () {
            self.canvas.isDrawingMode = false;

            self.optionWindowSet('shapeoption');

            self.isDown = false;
            self.shape.setShape('rect');
            //self.dragLayerCanvas.style.zIndex = 111;
           // console.log('self.canvasContainer=', self.canvasContainer);
        };
        $$('textoptionBtn').onclick = function () {
            self.canvas.isDrawingMode = false;
            //self.shape.reset();
            //self.dragLayerCanvas.style.zIndex = 1;
            if ($('#pathtextradio').is(':checked'))
                self.canvas.isDrawingMode = true;
            self.optionWindowSet('textoption');
            self.shape.setShape('');
        };
        $$('mediaoptionBtn').onclick = function () {
            self.canvas.isDrawingMode = false;
            //self.shape.reset();
            //self.dragLayerCanvas.style.zIndex = 1;
            self.optionWindowSet('mediaoption');
            self.shape.setShape('');
        };
        $$('filteroptionBtn').onclick = function () {
            self.canvas.isDrawingMode = false;
            //self.shape.reset();
            //self.dragLayerCanvas.style.zIndex = 1;
            self.optionWindowSet('filteroption');
            self.shape.setShape('');
        };
        $$('animationoptionBtn').onclick = function () {
            self.canvas.isDrawingMode = false;
            self.isShapeDraw = false;
            //self.shape.reset();
            //self.dragLayerCanvas.style.zIndex = 1;
            self.optionWindowSet('animationoption');
            self.shape.setShape('');
        };
        $$('eventoptionBtn').onclick = function () {
            self.canvas.isDrawingMode = false;
            //self.shape.reset();
            //self.dragLayerCanvas.style.zIndex = 1;
            self.optionWindowSet('eventoption');
            self.shape.setShape('');
        };
       
        $$('saveObjectImageBtn').onclick = function () {
            $("#paintpopupmenu").css('display', 'none');
            var obj = self.canvas.getActiveObject();
            if (!obj) { return; }
            //obj.exportPNG();
            let dataURL = obj.toDataURL({
                format: 'png',
                multiplier: 2,
            })
            self.downloadDataUrl(dataURL, 'image.png');
        };
        $$('saveImageBtn').onclick = function () {
            $("#paintpopupmenu").css('display', 'none');
            self.canvas.setBackgroundImage(null);
            self.canvas.renderAll();
            let dataURL = self.canvas.toDataURL({
                format: 'png',
                multiplier: 2,
            })
            self.downloadDataUrl(dataURL, 'image.png');
            self.canvas.setBackgroundImage(bg)
            self.canvas.renderAll()
        };
        
        $$('scaleSetOkBtn').onclick = function () {

            self.canvas.setDimensions({ width: $('#widthInput').val(), height: $('#heightInput').val() });
            $('#canvasScaleSetModal').modal('hide');
        };
        $$('canvasScaleSetBtn').onclick = function () {
            $("#paintpopupmenu").css('display', 'none');
            $('#canvasScaleSetModal').modal('show');
        };

        $$('backgroundSetBtn').onclick = function () {
            var obj = self.canvas.getActiveObject();
            if (!obj) { return; }
            console.log('obj');
            //self.canvas.setBackgroundImage({ source: obj, repeat: 'repeat' });
            self.canvas.setBackgroundImage(obj, self.canvas.renderAll.bind(self.canvas), {
                fixed: true,
                selectable: false,
                top: 0,
                left: 0,
                originX: 'left',
                originY: 'top',
                scaleX: self.canvas.width / obj.width,
                scaleY: self.canvas.height / obj.height,
                moveCursor: 'default', // 이동커서를 기본커서로 설정
                repeat: 'repeat' //'repeat-x' // 가로 방향으로만 반복
            });
            self.canvas.renderAll();
        };
    }

    createDrawOption() {
        var elem = `<div class="container alert alert-primary " id="drawoption">
            <strong class="alert-heading">그리기</strong>
            <div href="#" class="pull-right">
                <button type="button" class="close" onclick="$('#drawoption').collapse('toggle');">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div>
            <button id="clear-canvas" class="btn btn-info btn-sm">Clear</button>
            </div>
            <div class="ro" id="drawing-mode-options">
                <div class="col">
                    <label for="drawing-mode-selector">Mode:</label>
                    <select id="drawing-mode-selector">
                        <option>Pencil</option>
                        <option>Circle</option>
                        <option>Spray</option>
                        <option>Pattern</option>

                        <option>hline</option>
                        <option>vline</option>
                        <option>square</option>
                        <option>diamond</option>
                        <option>texture</option>
                    </select><br>
                </div>
                <div class="col">
                    <label for="drawing-line-width">Line width:</label>
                    <span class="info">2</span><input type="range" value="2" min="0" max="150" id="drawing-line-width"><br>

                </div>
                
                <div class="col">
                    <label for="drawing-color">Line color:</label>
                    <input type="color" value="#005E7A" id="drawing-color"><br>

                </div>

                <div class="col">
                    <label for="text-shadow-blur">Shadow blur:</label>
                    <span class="info">0</span><input type="range" value="0" min="0" max="50" id="drawing-shadow-blur"><br>
                </div>

                <div class="col">
                    <label for="drawing-shadow-color">Shadow color:</label>
                    <input type="color" value="#005E7A" id="drawing-shadow-color"><br>

                </div>

                <div class="col">
                    <label for="drawing-shadow-width">Shadow width:</label>
                    <span class="info">0</span><input type="range" value="0" min="0" max="50" id="drawing-shadow-width"><br>

                </div>

                <div class="col">
                    <label for="drawing-shadow-offset">Shadow offset:</label>
                    <span class="info">0</span><input type="range" value="0" min="0" max="50" id="drawing-shadow-offset"><br>
                </div>

            </div>
        </div>`;
        const div = document.createElement('div');
        div.innerHTML = elem;
        return div;
    }

    createPatternBrush() {
        //console.log('fabric.PatternBrush=', fabric.PatternBrush);
        if (fabric.PatternBrush) {
            this.vLinePatternBrush = new fabric.PatternBrush(this.canvas);
            this.vLinePatternBrush.getPatternSrc = function () {

                var patternCanvas = fabric.document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 10;
                var ctx = patternCanvas.getContext('2d');

                ctx.strokeStyle = this.color;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(0, 5);
                ctx.lineTo(10, 5);
                ctx.closePath();
                ctx.stroke();

                return patternCanvas;
            };

            this.hLinePatternBrush = new fabric.PatternBrush(this.canvas);
            this.hLinePatternBrush.getPatternSrc = function () {

                var patternCanvas = fabric.document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 10;
                var ctx = patternCanvas.getContext('2d');

                ctx.strokeStyle = this.color;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(5, 0);
                ctx.lineTo(5, 10);
                ctx.closePath();
                ctx.stroke();

                return patternCanvas;
            };

            this.squarePatternBrush = new fabric.PatternBrush(this.canvas);
            this.squarePatternBrush.getPatternSrc = function () {

                var squareWidth = 10, squareDistance = 2;

                var patternCanvas = fabric.document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
                var ctx = patternCanvas.getContext('2d');

                ctx.fillStyle = this.color;
                ctx.fillRect(0, 0, squareWidth, squareWidth);

                return patternCanvas;
            };

            this.diamondPatternBrush = new fabric.PatternBrush(this.canvas);
            this.diamondPatternBrush.getPatternSrc = function () {

                var squareWidth = 10, squareDistance = 5;
                var patternCanvas = fabric.document.createElement('canvas');
                var rect = new fabric.Rect({
                    width: squareWidth,
                    height: squareWidth,
                    angle: 45,
                    fill: this.color
                });

                var canvasWidth = rect.getBoundingRect().width;

                patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
                rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

                var ctx = patternCanvas.getContext('2d');
                rect.render(ctx);

                return patternCanvas;
            };

            var img = new Image();
            img.src = '../assets/honey_im_subtle.png';

            this.texturePatternBrush = new fabric.PatternBrush(this.canvas);
            this.texturePatternBrush.source = img;
        }

    }

    createDrawOptionEvent() {
        
        $$('drawing-mode-selector').onchange = function () {


            if (this.value === 'hline') {
                self.canvas.freeDrawingBrush = self.vLinePatternBrush;
            }
            else if (this.value === 'vline') {
                self.canvas.freeDrawingBrush = self.hLinePatternBrush;
            }
            else if (this.value === 'square') {
                self.canvas.freeDrawingBrush = self.squarePatternBrush;
            }
            else if (this.value === 'diamond') {
                self.canvas.freeDrawingBrush = self.diamondPatternBrush;
            }
            else if (this.value === 'texture') {
                self.canvas.freeDrawingBrush = self.texturePatternBrush;
            }
            else {
                //console.log(this.canvas);
                //console.log(self.canvas);
                self.canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](self.canvas);
            }

            if (self.canvas.freeDrawingBrush) {
                var brush = self.canvas.freeDrawingBrush;
                brush.color = $$('drawing-color').value;
                if (brush.getPatternSrc) {
                    brush.source = brush.getPatternSrc.call(brush);
                }
                brush.width = parseInt($$('drawing-line-width').value, 10) || 1;
                brush.shadow = new fabric.Shadow({
                    blur: parseInt($$('drawing-shadow-blur').value, 10) || 0,
                    offsetX: 3, // $$('drawing-shadow-offset').value,
                    offsetY: $$('drawing-shadow-offset').value,
                    affectStroke: true,
                    color: $$('drawing-shadow-color').value,
                });
                //console.log('brush.shadow.blur=', brush.shadow.blur);
                //console.log('brush.offsetX=', $$('drawing-shadow-offset').value);
                //console.log('brush.offsetX=', brush.shadow.offsetX);
                //console.log('brush.offsetY=', brush.shadow.offsetY);
                //console.log('brush.shadow.color=', brush.shadow.color);
            }
        };

        $$('drawing-color').onchange = function () {
            var brush = self.canvas.freeDrawingBrush;
            brush.color = this.value;
            if (brush.getPatternSrc) {
                brush.source = brush.getPatternSrc.call(brush);
            }
            var object = self.canvas.getActiveObject();
            if (!object) return;
            if (object.setSelectionStyles && object.isEditing) {
                var style = {};
                style['strokeColor'] = this.value;
                object.setSelectionStyles(style);
                object.setCoords();
            }
            else {
                object.set('strokeColor', this.value);
            }
            console.log('this.value=', this.value);
            object.setCoords();
            self.canvas.renderAll();
        };
        $$('drawing-shadow-color').onchange = function () {
            console.log('drawing-shadow-color value=', this.value);
            self.canvas.freeDrawingBrush.shadowColor = this.value;

            $$('drawing-mode-selector').value = $$('drawing-mode-selector').value;
            var event = new Event('change', { bubbles: true });
            $$('drawing-mode-selector').dispatchEvent(event);
        };
        $$('drawing-line-width').onchange = function () {
            self.canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
            this.previousSibling.innerHTML = this.value;
            var object = self.canvas.getActiveObject();
            if (!object) return;
            if (object.setSelectionStyles && object.isEditing) {
                var style = {};
                style['width'] = this.value;
                object.setSelectionStyles(style);
                object.setCoords();
            }
            else {
                object.set('width', this.value);
            }
            console.log('this.value=', this.value);
            object.setCoords();
            self.canvas.renderAll();
        };
        $$('drawing-shadow-blur').onchange = function () {
            console.log('drawing-shadow-width value=', this.value);
            self.canvas.freeDrawingBrush.shadowBlur = parseInt(this.value, 10) || 0;
            this.previousSibling.innerHTML = this.value;

            $$('drawing-mode-selector').value = $$('drawing-mode-selector').value;
            var event = new Event('change', { bubbles: true });
            $$('drawing-mode-selector').dispatchEvent(event);
        };
        $$('drawing-shadow-width').onchange = function () {
            console.log('drawing-shadow-width value=', this.value);
            self.canvas.freeDrawingBrush.shadowBlur = parseInt(this.value, 10) || 0;
            this.previousSibling.innerHTML = this.value;

            $$('drawing-mode-selector').value = $$('drawing-mode-selector').value;
            var event = new Event('change', { bubbles: true });
            $$('drawing-mode-selector').dispatchEvent(event);
        };
        $$('drawing-shadow-offset').onchange = function () {

            self.canvas.freeDrawingBrush.shadowOffsetX = parseInt(this.value, 10) || 0;
            self.canvas.freeDrawingBrush.shadowOffsetY = parseInt(this.value, 10) || 0;

            this.previousSibling.innerHTML = this.value;
            //alert('shadowoffset');
            $$('drawing-mode-selector').value = $$('drawing-mode-selector').value;
            var event = new Event('change', { bubbles: true });
            $$('drawing-mode-selector').dispatchEvent(event);
        };

        $$('clear-canvas').onclick = function () {
            console.log('self.canvas', self.canvas);
            self.canvas.clear()
        };

    }

    createShapeOption() {
        var elem = `<div class="container alert alert-success " id="shapeoption" style="overflow:auto">
            <strong class="alert-heading">도형</strong>
            <div href="#" class="pull-right">
                <button type="button" class="close" onclick="$('#shapeoption').collapse('toggle');">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <p>
                <div id="box">
                    <label><input type="radio" name="shaperadio" id="drawtype-rect" value="rect" checked>Rect</label>
                    <label><input type="radio" name="shaperadio" id="drawtype-ellipse" value="ellipse">Ellipse</label>
                    <label><input type="radio" name="shaperadio" id="drawtype-triangle" value="triangle">Triangle</label>
                    <label><input type="radio" name="shaperadio" id="drawtype-line" value="line">Line</label>
                    <label><input type="radio" name="shaperadio" id="drawtype-polygon" value="polygon">Polygon</label>
                    <label><input type="radio" name="shaperadio" id="drawtype-star" value="star">Star</label>
                    <label><input type="radio" name="shaperadio" id="drawtype-arrow" value="arrow">Arrow</label>
                    <label><input type="radio" name="shaperadio" id="text" value="text">text</label>
                </div>

            </p>
            <p>
            <div id="text-input-div">
                    <label for="text-outline-color">Text:</label>
                    <input type="text" value="" id="text-input" size="10" class="btn-object-action">
                </div>
                <div>
                    <label for="text-outline-color">Outline color:</label>
                    <input type="color" value="" id="shape-stroke-color" size="10" class="btn-object-action">
                </div>
                <div>
                    <label for="shape-fill-color">Fill color:</label>
                    <input type="color" value="" id="shape-fill-color" size="10" class="btn-object-action">
                </div>

                <div>
                    <label for="shape-stroke-size">stroke size:</label>
                    <input type="range" value="5" min="1" max="10" step="1" id="shape-stroke-size" class="btn-object-action">
                </div>
                <div>
                    <label> Sides Num : </label>
                    <input type="number" value="5" min="3" max="15" id="shape-sides">
                </div>
                <div>
                    <label for="opacity">Opacity:</label>
                    <input value="10" min="1" max="10" type="range" bind-value-to="opacity" id="shape-opacity" class="btn-object-action"><br />
                </div>

                <div class="col">
                    <label for="text-shadow-blur">Shadow blur:</label>
                    <span class="info">0</span><input type="range" value="0" min="0" max="50" id="shape-shadow-blur"><br>
                </div>

                <div class="col">
                    <label for="drawing-shadow-color">Shadow color:</label>
                    <input type="color" value="#005E7A" id="shape-shadow-color"><br>

                </div>

                <div class="col">
                    <label for="drawing-shadow-offset">Shadow offset x:</label>
                    <span class="info">0</span><input type="range" value="0" min="0" max="50" id="shape-shadow-offset-x"><br>
                </div>

                <div class="col">
                    <label for="drawing-shadow-offset">Shadow offset y:</label>
                    <span class="info">0</span><input type="range" value="0" min="0" max="50" id="shape-shadow-offset-y"><br>
                </div>
            </p>

            <p>Add <strong>gradient-based shapes</strong> to canvas:</p>

            <p>
                <button class="btn shape" id="shape74">Gradient 1</button>
                <button class="btn shape" id="shape66">Gradient 2</button>
                <button class="btn shape" id="shape75">Gradient 3</button>
                <button class="btn shape" id="shape148">Gradient 4</button>
            </p>

        </div>`;

        const div = document.createElement('div');
        div.innerHTML = elem;
        return div;
    }

    createShapeOptionEvent() {

        const radioButtons = document.querySelectorAll("input[name=shaperadio]");
        radioButtons.forEach((radioButton) => {

            radioButton.addEventListener("change", (event) => {
                console.log("event.target.value= " + event.target.value);
                self.iDrawType = event.target.value;
                self.shape.setShape(event.target.value);
            });
        });

        $$('shape-stroke-color').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setActiveStyle('strokeColor', this.value);
            var object = self.canvas.getActiveObject();
            if (!object) return;
            if (object.setSelectionStyles && object.isEditing) {
                var style = {};
                style['stroke'] = this.value;
                object.setSelectionStyles(style);
                object.setCoords();
            }
            else {
                object.set('stroke', this.value);
            }
            console.log('this.value=', this.value);
            object.setCoords();
            self.canvas.renderAll();
        };
        $$('shape-fill-color').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setActiveStyle('strokeColor', this.value);
            var object = self.canvas.getActiveObject();
            if (!object) return;
            if (object.setSelectionStyles && object.isEditing) {
                var style = {};
                style['fill'] = this.value;
                object.setSelectionStyles(style);
                object.setCoords();
            }
            else {
                object.set('fill', this.value);
            }
            console.log('this.value=', this.value);
            object.setCoords();
            self.canvas.renderAll();
        };
        $$('shape-shadow-color').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            var object = self.canvas.getActiveObject();
            if (!object) return;
            var shadow = new fabric.Shadow({
                color: $$('shape-shadow-color').value,
                blur: $$('shape-shadow-blur').value,
                offsetX: $$('shape-shadow-offset-x').value,
                offsetY: $$('shape-shadow-offset-y').value
            });
            // 쉐도우의 색상을 파란색으로 변경
            self.setActiveStyle('shadow', shadow);
            //object.setShadow("1px 1px 15px yellow");
            //self.canvas.renderAll();
        };
        $$('shape-stroke-size').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setActiveStyle('strokeColor', this.value);
            
        };
        $$('shape-shadow-blur').onchange = function () {
            
            this.previousSibling.innerHTML = this.value;
            var object = self.canvas.getActiveObject();
            if (!object) return;
            var shadow = new fabric.Shadow({
                color: $$('shape-shadow-color').value,
                blur: $$('shape-shadow-blur').value,
                offsetX: $$('shape-shadow-offset-x').value,
                offsetY: $$('shape-shadow-offset-y').value
            });
            // 쉐도우의 색상을 파란색으로 변경
            self.setActiveStyle('shadow', shadow);
        };
        
        $$('shape-shadow-offset-x').onchange = function () {

            this.previousSibling.innerHTML = this.value;
            var object = self.canvas.getActiveObject();
            if (!object) return;
            var shadow = new fabric.Shadow({
                color: $$('shape-shadow-color').value,
                blur: $$('shape-shadow-blur').value,
                offsetX: $$('shape-shadow-offset-x').value,
                offsetY: $$('shape-shadow-offset-y').value
            });
            // 쉐도우의 색상을 파란색으로 변경
            self.setActiveStyle('shadow', shadow);
        };
        $$('shape-shadow-offset-y').onchange = function () {

            this.previousSibling.innerHTML = this.value;
            var object = self.canvas.getActiveObject();
            if (!object) return;
            var shadow = new fabric.Shadow({
                color: $$('shape-shadow-color').value,
                blur: $$('shape-shadow-blur').value,
                offsetX: $$('shape-shadow-offset-x').value,
                offsetY: $$('shape-shadow-offset-y').value
            });
            // 쉐도우의 색상을 파란색으로 변경
            self.setActiveStyle('shadow', shadow);
        };
    }

    createMediaOption() {
        var elem = `<div class="container alert alert-warning " id="mediaoption">
            <strong class="alert-heading">미디어</strong>
            <div href="#" class="pull-right">
                <button type="button" class="close" onclick="$('#mediaoption').collapse('toggle');">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="d-flex">
                <label for="image" class="control-label">Image</label>
                <div>
                    <input type="text" class="form-control" name="imageInput" id="imageInput" placeholder="Image src..." required />
                </div>

                <button class="btn btn-outline-info home-make-btns" id="image-src-btn">Ok</button>
            </div>
            <div class="d-flex">
                <label for="image" class="control-label">image file open</label>
                <div>
                    <input type="file" id="imageLoader" name="imageLoader" />
                </div>

            </div>
            <div class="d-flex">
                <label for="video" class="control-label">Video</label>
                <div>
                    <input type="text" class="form-control" name="videoInput" id="videoInput" placeholder="video src..." required />
                </div>
                <button class="btn btn-outline-info home-make-btns" id="video-load-btn">load</button>
                <button class="btn btn-outline-info home-make-btns" id="video-play-btn">play</button>
                <button class="btn btn-outline-info home-make-btns" id="video-stop-btn">stop</button>
                <button class="btn btn-outline-info home-make-btns" id="video-pause-btn">pause</button>
                <button class="btn btn-outline-info home-make-btns" id="video-back-btn">back</button>
                <button class="btn btn-outline-info home-make-btns" id="video-forward-btn">forward</button>
            </div>
            <div class="d-flex">
                <label for="image" class="control-label">video file open</label>
                <div>
                    <input type="file" id="videoLoader" name="videoLoader" />
                </div>

            </div>

        </div>`;

        const div = document.createElement('div');
        div.innerHTML = elem;
        return div;
    }

    createMediaOptionEvent() {

        $$('imageLoader').onchange = function () {
            var reader = new FileReader();
            reader.onload = function (event) {

                var img = new Image();
                img.onload = function () {
                    var imgInstance = new fabric.Image(img, {
                        selectable: 1
                    })
                    self.canvas.add(imgInstance);
                    self.canvas.deactivateAll().renderAll();
                }
                img.src = event.target.result;

            }
            reader.readAsDataURL(event.target.files[0]);
        }
        $$('video-load-btn').onclick = function () {

            var video1El = document.getElementById('video'); //document.createElement('video', { "controls autoplay loop" });
            video1El.crossOrigin = 'anonymous';
            //var canPlay = video1El.canPlayType(type);
            //if (canPlay === '') canPlay = 'no';
            //var message = 'Can play type "' + type + '": ' + canPlay;
           // var isError = canPlay === 'no';

            //if (isError) {
              //  return;
           // }

            //var fileURL = URL.createObjectURL($$('video-load-btn').value);
            console.log($$('videoInput').value);
            //video1El.src = fileURL;
            //video1El.src = $$('videoInput').value;
           
            fabric.util.loadImage($$('videoInput').value, function (img) {
                video1El.width = video1El.videoWidth;
                video1El.height = video1El.videoHeight;
                var scalex = 300 / video1El.width;
                var scaley = 200 / video1El.height;
                console.log('video1El.videoWidth', video1El.videoWidth, 'video1El.videoHeight', video1El.videoHeight);

                var object = new fabric.Image(img);
                object.set({
                    id: 'video',
                    left: 11,
                    top: 11,
                    width: video1El.videoWidth,
                    height: video1El.videoHeight,
                    scaleX: scalex,
                    scaleY: scaley
                });
                self.canvas.add(object);
            }, null, {
                crossOrigin: 'anonymous'
            });

            fabric.util.requestAnimFrame(function render() {
                self.canvas.renderAll();
                fabric.util.requestAnimFrame(render);
            });
        }
        $$('videoLoader').onchange = function () {

            //var src = $$('videoLoader').value;
            var file = this.files[0];
            var type = file.type;

            var video1El = document.getElementById('video'); //document.createElement('video', { "controls autoplay loop" });
            video1El.crossOrigin = 'anonymous';
            var canPlay = video1El.canPlayType(type);
            if (canPlay === '') canPlay = 'no';
            var message = 'Can play type "' + type + '": ' + canPlay;
            var isError = canPlay === 'no';

            if (isError) {
                return;
            }

            var fileURL = URL.createObjectURL(file);
            console.log(fileURL);
            video1El.src = fileURL;

            video1El.addEventListener('loadeddata', function () {
                video1El.width = video1El.videoWidth;
                video1El.height = video1El.videoHeight;
                var scalex = 300 / video1El.width;
                var scaley = 200 / video1El.height;
                console.log('video1El.videoWidth', video1El.videoWidth,  'video1El.videoHeight', video1El.videoHeight); 
                var videoRect;
                // Video is loaded and can be played
                var coord = self.getRandomLeftTop();
                console.log(coord);
                var video = new fabric.Image(video1El, {
                    id: 'video',
                    left: 11,
                    top: 11,
                    width: video1El.videoWidth,
                    height: video1El.videoHeight,
                    scaleX: scalex,
                    scaleY: scaley
                    // angle: getRandomInt(minScale, maxScale)
                });
                video1El.currentTime = 1;
                //canvasLayer.add(video);
                self.canvas.add(video);
                videoRect = video.getBoundingRect();

                video.on('rotating', function (e) {
                    videoRect = this.getBoundingRect();
                    //if (this.id == 'video')
                    //videoRect = this.getBoundingRect();
                    //console.log('this.id--' + this.id);
                });
                video.on('moving', function (e) {
                    videoRect = self.getBoundingRect();
                });
                video.on('scaling', function (e) {
                    videoRect = self.getBoundingRect();
                });
            }, false);
            //video1El.width = 300;
            //video1El.height = 200;
            //video1El.style.display = 'none';
            //this.arg.elem.appendChild(video1El);
            video1El.load();
           
            fabric.util.requestAnimFrame(function render() {
                self.canvas.renderAll();
                fabric.util.requestAnimFrame(render);
            });
        };
        //media elements
        $$('image-src-btn').onclick = function () {

            var src = $$('imageInput').value;
            self.addImage(src);
        };

        $$('video-play-btn').onclick = function () {
            var video1El = document.getElementById('video');
            video1El.play();
        };

        $$('video-stop-btn').onclick = function () {
            var video1El = document.getElementById('video');
            video1El.currentTime = 0;
            video1El.pause();
        };
        $$('video-pause-btn').onclick = function () {
            var video1El = document.getElementById('video');
            video1El.pause();
        };

        $$('video-back-btn').onclick = function () {
            var video1El = document.getElementById('video');
            video1El.currentTime -= 7;
        };
        $$('video-forward-btn').onclick = function () {
            var video1El = document.getElementById('video');
            video1El.currentTime += 7;
        };
    }

    applyFilter(index, filter) {
        var obj = this.canvas.getActiveObject();
        obj.filters[index] = filter;
        var timeStart = +new Date();
        obj.applyFilters();
        var timeEnd = +new Date();
        var dimString = this.canvas.getActiveObject().width + ' x ' +
            this.canvas.getActiveObject().height;
        $$('bench').innerHTML = dimString + 'px ' +
            parseFloat(timeEnd - timeStart) + 'ms';
        this.canvas.renderAll();
    }

    getFilter(index) {
        var obj = this.canvas.getActiveObject();
        return obj.filters[index];
    }

    applyFilterValue(index, prop, value) {
        var obj = this.canvas.getActiveObject();
        if (obj.filters[index]) {
            obj.filters[index][prop] = value;
            var timeStart = +new Date();
            obj.applyFilters();
            var timeEnd = +new Date();
            var dimString = this.canvas.getActiveObject().width + ' x ' +
                this.canvas.getActiveObject().height;
            $$('bench').innerHTML = dimString + 'px ' +
                parseFloat(timeEnd - timeStart) + 'ms';
            this.canvas.renderAll();
        }
    }

    createFilterOption() {
        var elem = `<div class="container alert alert-secondary " id="filteroption" style="overflow:auto;">
            <strong class="alert-heading">필터</strong>
            <div href="#" class="pull-right">
                <button type="button" class="close" onclick="$('#filteroption').collapse('toggle');">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <label>Use WebGl<input type="checkbox" id="webgl" checked></label>
            <div id="bench"></div>
            <p>
                <label><span>Grayscale:</span> <input type="checkbox" id="grayscale" disabled></label><br />
                <label><span>Avg.</span> <input type="radio" id="average" name="grayscale"></label>
                <label><span>Lum.</span> <input type="radio" id="lightness" name="grayscale"></label>
                <label><span>Light.</span> <input type="radio" id="luminosity" name="grayscale"></label>
            </p>
            <p>
                <label><span>Invert:</span> <input type="checkbox" id="invert" disabled></label>
            </p>
            <p>
                <label>Colormatrix filters:</label>
            </p>
            <p>
                <label><span>Sepia:</span> <input type="checkbox" id="sepia" disabled></label>
            </p>
            <p>
                <label><span>Black/White:</span> <input type="checkbox" id="blackwhite" disabled></label>
            </p>
            <p>
                <label><span>Brownie:</span> <input type="checkbox" id="brownie" disabled></label>
            </p>
            <p>
                <label><span>Vintage:</span> <input type="checkbox" id="vintage" disabled></label>
            </p>
            <p>
                <label><span>Kodachrome:</span> <input type="checkbox" id="kodachrome" disabled></label>
            </p>
            <p>
                <label><span>Technicolor:</span> <input type="checkbox" id="technicolor" disabled></label>
            </p>
            <p>
                <label><span>Polaroid:</span> <input type="checkbox" id="polaroid" disabled></label>
            </p>
            <p>
                <label><span>Remove color:</span> <input type="checkbox" id="remove-color" disabled></label><br>
                <label>Color: <input type="color" id="remove-color-color" value="#00f900"></label><br>
                <br />
                <label>Distance: <input type="range" id="remove-color-distance" value="0.02" min="0" max="1" step="0.01" disabled></label>
            </p>
            <p>
                <label><span>Brightness:</span> <input type="checkbox" id="brightness" disabled></label>
                <br>
                <label>Value: <input type="range" id="brightness-value" value="0.1" min="-1" max="1" step="0.003921" disabled></label>
            </p>
            <p>
                <label><span>Gamma:</span> <input type="checkbox" id="gamma" disabled></label>
                <br>
                <label>Red: <input type="range" id="gamma-red" value="1" min="0.2" max="2.2" step="0.003921" disabled></label>
                <br>
                <label>Green: <input type="range" id="gamma-green" value="1" min="0.2" max="2.2" step="0.003921" disabled></label>
                <br>
                <label>Blue: <input type="range" id="gamma-blue" value="1" min="0.2" max="2.2" step="0.003921" disabled></label>

            </p>
            <p>
                <label><span>Contrast:</span> <input type="checkbox" id="contrast" disabled></label>
                <br>
                <label>Value: <input type="range" id="contrast-value" value="0" min="-1" max="1" step="0.003921" disabled></label>
            </p>
            <p>
                <label><span>Saturation:</span> <input type="checkbox" id="saturation" disabled></label>
                <br>
                <label>Value: <input type="range" id="saturation-value" value="0" min="-1" max="1" step="0.003921" disabled></label>
            </p>
            <p>
                <label><span>Hue:</span> <input type="checkbox" id="hue" disabled></label>
                <br>
                <label>Value: <input type="range" id="hue-value" value="0" min="-2" max="2" step="0.002" disabled></label>
            </p>
            <p>
                <label><span>Noise:</span> <input type="checkbox" id="noise" disabled></label>
                <br>
                <label>Value: <input type="range" id="noise-value" value="100" min="0" max="1000" disabled></label>
            </p>
            <p>
                <label><span>Pixelate</span> <input type="checkbox" id="pixelate" disabled></label>
                <br>
                <label>Value: <input type="range" id="pixelate-value" value="4" min="2" max="20" disabled></label>
            </p>
            <p>
                <label><span>Blur:</span> <input type="checkbox" id="blur" disabled></label>
                <br>
                <label>Value: <input type="range" id="blur-value" value="0.1" min="0" max="1" step="0.01" disabled></label>
            </p>
            <p>
                <label><span>Sharpen:</span> <input type="checkbox" id="sharpen" disabled></label>
            </p>
            <p>
                <label><span>Emboss:</span> <input type="checkbox" id="emboss" disabled></label>
            </p>
            <p>
                <label><span>Blend Color:</span> <input type="checkbox" id="blend" disabled></label>
                <br>
                <label>Mode:</label>
                <select id="blend-mode" name="blend-mode">
                    <option selected value="add">Add</option>
                    <option value="diff">Diff</option>
                    <option value="subtract">Subtract</option>
                    <option value="multiply">Multiply</option>
                    <option value="screen">Screen</option>
                    <option value="lighten">Lighten</option>
                    <option value="darken">Darken</option>
                    <option value="overlay">Overlay</option>
                    <option value="exclusion">Exclusion</option>
                    <option value="tint">Tint</option>
                </select>
                <br>
                <label>Color: <input type="color" id="blend-color" value="#00f900"></label><br>
                <label>Alpha: <input type="range" id="blend-alpha" min="0" max="1" value="1" step="0.01"></label><br>
            </p>
            <label><span>Blend Image:</span> <input type="checkbox" id="blend-image" disabled></label>
            <br>
            <label>Mode:</label>
            <select id="blend-image-mode" name="blend-image-mode">
                <option selected value="multiply">Multiply</option>
                <option value="mask">Mask</option>
            </select>
            <br>
            <label>Alpha: <input type="range" id="blend-image-alpha" min="0" max="1" value="1" step="0.01" /></label><br />

        </div>`;

        const div = document.createElement('div');
        div.innerHTML = elem;
        return div;
    }

    createFilterOptionEvent() {
        // manually initialize 2 filter backend to give ability to switch:
        this.webglBackend;
        try {
            this.webglBackend = new fabric.WebglFilterBackend();
        } catch (e) {
            console.log(e)
        }
        this.canvas2dBackend = new fabric.Canvas2dFilterBackend()

        fabric.filterBackend = fabric.initFilterBackend();
        fabric.Object.prototype.transparentCorners = false;

        fabric.Object.prototype.padding = 5;
        //var canvas = this.__canvas = new fabric.Canvas('c'),
        this.f = fabric.Image.filters;


        var indexF;
        $$('webgl').onclick = function () {
            if (this.checked) {
                fabric.filterBackend = self.webglBackend;
            } else {
                fabric.filterBackend = self.canvas2dBackend;
            }
        };
        $$('brownie').onclick = function () {
            self.applyFilter(4, this.checked && new self.f.Brownie());
        };
        $$('vintage').onclick = function () {
            self.applyFilter(9, this.checked && new self.f.Vintage());
        };
        $$('technicolor').onclick = function () {
            self.applyFilter(14, this.checked && new self.f.Technicolor());
        };
        $$('polaroid').onclick = function () {
            self.applyFilter(15, this.checked && new self.f.Polaroid());
        };
        $$('kodachrome').onclick = function () {
            self.applyFilter(18, this.checked && new self.f.Kodachrome());
        };
        $$('blackwhite').onclick = function () {
            self.applyFilter(19, this.checked && new self.f.BlackWhite());
        };
        $$('grayscale').onclick = function () {
            self.applyFilter(0, this.checked && new self.f.Grayscale());
        };
        $$('average').onclick = function () {
            self.applyFilterValue(0, 'mode', 'average');
        };
        $$('luminosity').onclick = function () {
            self.applyFilterValue(0, 'mode', 'luminosity');
        };
        $$('lightness').onclick = function () {
            self.applyFilterValue(0, 'mode', 'lightness');
        };
        $$('invert').onclick = function () {
            self.applyFilter(1, this.checked && new f.Invert());
        };
        $$('remove-color').onclick = function () {
            self.applyFilter(2, this.checked && new self.f.RemoveColor({
                distance: $$('remove-color-distance').value,
                color: $$('remove-color-color').value,
            }));
        };
        $$('remove-color-color').onchange = function () {
            self.applyFilterValue(2, 'color', this.value);
        };
        $$('remove-color-distance').oninput = function () {
            self.applyFilterValue(2, 'distance', this.value);
        };
        $$('sepia').onclick = function () {
            self.applyFilter(3, this.checked && new self.f.Sepia());
        };
        $$('brightness').onclick = function () {
            self.applyFilter(5, this.checked && new self.f.Brightness({
                brightness: parseFloat($$('brightness-value').value)
            }));
        };
        $$('brightness-value').oninput = function () {
            self.applyFilterValue(5, 'brightness', parseFloat(this.value));
        };
        $$('gamma').onclick = function () {
            var v1 = parseFloat($$('gamma-red').value);
            var v2 = parseFloat($$('gamma-green').value);
            var v3 = parseFloat($$('gamma-blue').value);
            self.applyFilter(17, this.checked && new self.f.Gamma({
                gamma: [v1, v2, v3]
            }));
        };
        $$('gamma-red').oninput = function () {
            var current = self.getFilter(17).gamma;
            current[0] = parseFloat(this.value);
            self.applyFilterValue(17, 'gamma', current);
        };
        $$('gamma-green').oninput = function () {
            var current = self.getFilter(17).gamma;
            current[1] = parseFloat(this.value);
            self.applyFilterValue(17, 'gamma', current);
        };
        $$('gamma-blue').oninput = function () {
            var current = self.getFilter(17).gamma;
            current[2] = parseFloat(this.value);
            self.applyFilterValue(17, 'gamma', current);
        };
        $$('contrast').onclick = function () {
            self.applyFilter(6, this.checked && new self.f.Contrast({
                contrast: parseFloat($$('contrast-value').value)
            }));
        };
        $$('contrast-value').oninput = function () {
            self.applyFilterValue(6, 'contrast', parseFloat(this.value));
        };
        $$('saturation').onclick = function () {
            self.applyFilter(7, this.checked && new self.f.Saturation({
                saturation: parseFloat($$('saturation-value').value)
            }));
        };
        $$('saturation-value').oninput = function () {
            self.applyFilterValue(7, 'saturation', parseFloat(this.value));
        };
        $$('noise').onclick = function () {
            self.applyFilter(8, this.checked && new self.f.Noise({
                noise: parseInt($$('noise-value').value, 10)
            }));
        };
        $$('noise-value').oninput = function () {
            self.applyFilterValue(8, 'noise', parseInt(this.value, 10));
        };
        $$('pixelate').onclick = function () {
            self.applyFilter(10, this.checked && new self.f.Pixelate({
                blocksize: parseInt($$('pixelate-value').value, 10)
            }));
        };
        $$('pixelate-value').oninput = function () {
            self.applyFilterValue(10, 'blocksize', parseInt(this.value, 10));
        };
        $$('blur').onclick = function () {
            self.applyFilter(11, this.checked && new self.f.Blur({
                value: parseFloat($$('blur-value').value)
            }));
        };
        $$('blur-value').oninput = function () {
            self.applyFilterValue(11, 'blur', parseFloat(this.value, 10));
        };
        $$('sharpen').onclick = function () {
            self.applyFilter(12, this.checked && new self.f.Convolute({
                matrix: [0, -1, 0,
                    -1, 5, -1,
                    0, -1, 0]
            }));
        };
        $$('emboss').onclick = function () {
            self.applyFilter(13, this.checked && new self.f.Convolute({
                matrix: [1, 1, 1,
                    1, 0.7, -1,
                    -1, -1, -1]
            }));
        };
        $$('blend').onclick = function () {
            self.applyFilter(16, this.checked && new self.f.BlendColor({
                color: document.getElementById('blend-color').value,
                mode: document.getElementById('blend-mode').value,
                alpha: document.getElementById('blend-alpha').value
            }));
        };

        $$('blend-mode').onchange = function () {
            self.applyFilterValue(16, 'mode', this.value);
        };

        $$('blend-color').onchange = function () {
            self.applyFilterValue(16, 'color', this.value);
        };

        $$('blend-alpha').oninput = function () {
            self.applyFilterValue(16, 'alpha', this.value);
        };

        $$('hue').onclick = function () {
            self.applyFilter(21, this.checked && new self.f.HueRotation({
                rotation: document.getElementById('hue-value').value,
            }));
        };

        $$('hue-value').oninput = function () {
            self.applyFilterValue(21, 'rotation', this.value);
        };

        $$('blend-image').onclick = function () {
            self.applyFilter(20, this.checked && new self.f.BlendImage({
                image: fImage,
            }));
        };

        $$('blend-image-mode').onchange = function () {
            self.applyFilterValue(20, 'mode', this.value);
        };
        var imageElement = document.createElement('img');
        imageElement.src = '../assets/printio.png';
        var fImage = new fabric.Image(imageElement);
        fImage.scaleX = 1;
        fImage.scaleY = 1;
        fImage.top = 15;
        fImage.left = 15;
    }

    createAnimationOption() {
        var elem = `<div class="container alert alert-light collapse" id="animationoption">
            <strong class="alert-heading">애니메이션</strong>
            <div href="#" class="pull-right">
                <button type="button" class="close" onclick="$('#animationoption').collapse('toggle');">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="d-flex">
                
                <button class="btn btn-outline-info home-make-btns" id="animation_setting-btn">Ok</button>
            </div>
            <div class="d-flex">
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="btnradio" id="playBtn" autocomplete="off" checked>
                    <label class="btn btn-outline-primary" for="playBtn">play</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio2">Radio 2</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio3">Radio 3</label>
                </div>
            </div>
            <div class="d-flex">
                <div class="btn-group me-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-outline-secondary">1</button>
                    <button type="button" class="btn btn-outline-secondary">2</button>
                    <button type="button" class="btn btn-outline-secondary">3</button>
                    <button type="button" class="btn btn-outline-secondary">4</button>
                </div>
            </div>

        </div>`;

        const div = document.createElement('div');
        div.innerHTML = elem;
        return div;
    }

    playAnimation() {
        // 사각형 객체 생성
        var rect = new fabric.Rect({
            width: 50,
            height: 50,
            left: 100,
            top: 100,
            fill: 'red'
        });

        // 원형 객체 생성
        var circle = new fabric.Circle({
            radius: 25,
            left: 300,
            top: 100,
            fill: 'blue'
        });

        // 캔버스에 객체 추가
        self.canvas.add(rect);
        self.canvas.add(circle);

        // 사각형 객체가 왼쪽으로 200 픽셀 이동하는 애니메이션 실행
        rect.animate({ 'left': 300, 'scale': 2}, {
            duration: 1000,
            easing: fabric.util.ease['easeOutCubic'],
            onChange: self.canvas.renderAll.bind(self.canvas),
            onComplete: function () {
                // 이동이 완료되면, 원형 객체가 90도 회전하는 애니메이션 실행
                circle.animate('angle', 90, {
                    duration: 1000,
                    easing: fabric.util.ease['easeOutCubic'],
                    onChange: self.canvas.renderAll.bind(self.canvas),
                    onComplete: function () {
                        // 회전이 완료되면, 사각형 객체가 높이를 100 픽셀로 변경하는 애니메이션 실행
                        rect.animate('height', 100, {
                            duration: 1000,
                            easing: fabric.util.ease['easeOutCubic'],
                            onChange: self.canvas.renderAll.bind(self.canvas)
                        });
                    }
                });
            }
        });
    }

    playAnimation2() {
        self._selectedObject.animate({ // 애니메이션 적용
            fill: 'red',
            x: self._selectedObject.x + 10, // x 좌표를 10 픽셀 증가
            y: self._selectedObject.y + 10, // y 좌표를 10 픽셀 증가
            scaleX: 1.1, // 가로 길이를 10% 증가
            scaleY: 1.1, // 세로 길이를 10% 증가
            angle: 10 // 시계 방향으로 10도 회전
        }, {
            duration: 1000, // 애니메이션 지속 시간 (밀리초)
            onChange: self.canvas.renderAll.bind(self.canvas), // 애니메이션 진행 중 캔버스 다시 그리기
            onComplete: function () { // 애니메이션 완료 후 실행할 함수
                console.log('Animation finished');
            },
            easing: fabric.util.ease.easeOutBounce // 애니메이션 이징 함수 설정
        });
        
    }

    createAnimationOptionEvent() {

        $$('animation_setting-btn').onclick = function () {

            var main = new MainLayout();
            var ver = new VerticalLayout();
            var hor = new HorizontalLayout();

            main.addControl(ver);
            main.addControl(hor);

            var canvas2 = document.getElementById("canvas");
            var c = canvas2.getContext("2d");

            ver.addControl(canvas2);

            var $page = $("<div>test</div>");

            main.renderController($page);

            var f = new FullScreenView();
            f.setContent(`뷰 보기2`, $page);

            var rect = {
                x: 50,
                y: 50,
                opacity: 1,
                width: 40,
                height: 40,
                rotation: 0
            };

            var rect2 = {
                x: 150,
                y: 50,
                width: 40,
                height: 40,
                rotation: 0,
                opacity: 1
            };

            //var timeline = Timeline.getGlobalInstance();
            var timeline = TimelineGui.getGlobalGuiInstance();
            timeline.loop(-1);

            new Anim("rect", rect, timeline).to({ "x": 20 }, 0).to({ "x": 110 }, 1, Timeline.Easing.Bounce.EaseOut).to({ "x": 20 }, 1, Timeline.Easing.Cubic.EaseOut);
            new Anim("rect", rect, timeline).to({ "rotation": 0 }, 0).to({ "rotation": 3.14 }, 0.99);
            new Anim("rect", rect, timeline).to(1.69, { "opacity": 1 }, 0).to({ "opacity": 0 }, 0.3799999999999999, Timeline.Easing.Bounce.EaseOut).to({ "opacity": 1 }, 0.20000000000000018, Timeline.Easing.Cubic.EaseOut);
            new Anim("rect", rect, timeline).to({ "y": 50 }, 0).to({ "y": 50 }, 0.98).to({ "y": 100 }, 1.02, Timeline.Easing.Cubic.EaseOut).to({ "y": 50 }, 0.27, Timeline.Easing.Cubic.EaseOut);
            new Anim("rect2", rect2, timeline).to({ "x": 150 }, 0).to({ "x": 150 }, 0.34).to({ "x": 300 }, 1.2, Timeline.Easing.Cubic.EaseOut);
            new Anim("rect2", rect2, timeline).to({ "y": 50 }, 0).to({ "y": 50 }, 0.33).to({ "y": 100 }, 1.19);
            new Anim("rect2", rect2, timeline).to({ "width": 40 }, 0).to({ "width": 40 }, 0.34).to({ "width": 300 }, 1.2);
            new Anim("rect2", rect2, timeline).to({ "height": 40 }, 0).to({ "height": 40 }, 0.34).to({ "height": 300 }, 1.2);
            new Anim("rect2", rect2, timeline).to({ "rotation": 0 }, 0).to({ "rotation": 0 }, 0.31).to({ "rotation": 6.28 }, 1.22, Timeline.Easing.Cubic.EaseOut);
            new Anim("rect2", rect2, timeline).to({ "opacity": 1 }, 0).to({ "opacity": 1 }, 0.3).to({ "opacity": 0 }, 1.22, Timeline.Easing.Cubic.EaseOut).to({ "opacity": 0 }, 0.52);



            function draw() {
                var w = canvas2.width;
                var h = canvas2.height;

                c.fillStyle = "#FFFFFF";
                c.fillRect(0, 0, w, h);

                c.globalAlpha = rect.opacity;
                c.save();
                c.translate(rect.x, rect.y);
                c.rotate(rect.rotation);
                c.fillStyle = "#FF0000";
                c.fillRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
                c.restore();

                c.globalAlpha = rect2.opacity;
                c.save();
                c.translate(rect2.x, rect2.y);
                c.rotate(rect2.rotation);
                c.fillStyle = "#FFFF00";
                c.fillRect(-rect2.width / 2, -rect2.height / 2, rect2.width, rect2.height);
                c.restore();
                c.globalAlpha = 1;

                requestAnimationFrame(draw, canvas2);
            }

            draw();
        };

        $$('playBtn').onclick = function () {
            var isPlaying = false;
            //console.log(self._selectedObject.angle);
            if (isPlaying == false) {
                isPlaying = true;
                var speed = 1000;
                //var intervalId = setInterval(self.playAnimation, speed / 2);
                self.playAnimation2();
            }
        };
    }

    createEventOption() {
        var elem = `<div class="container alert alert-primary " id="eventoption">
            <strong class="alert-heading">이벤트</strong>
            <div href="#" class="pull-right">
                <button type="button" class="close" onclick="$('#eventoption').collapse('toggle');">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="d-flex">
                <label for="image" class="control-label">Down</label>
                <div>
                    <input type="text" class="form-control" name="eventInput" id="eventDown" placeholder="event down..." required />
                </div>
                <button class="btn btn-outline-info home-make-btns" id="event-down-ok-btn">설정</button>
            </div>
            
            <div class="d-flex">
                <label for="image" class="control-label">Over</label>
                <div>
                    <input type="text" class="form-control" name="eventInput" id="eventOver" placeholder="event over..." required />
                </div>
                <button class="btn btn-outline-info home-make-btns" id="event-over-ok-btn">설정</button>
            </div>
            
            <div class="form-group">
                <label for="permittype" class="control-label">링크타입</label>
                <div class="clearfix"></div>
                <div class="form-check form-check-inline ">
                    <input class="form-check-input" type="radio" name="linkTypeRadio" value="link" id="radio_link" checked>
                    <label class="form-check-label" for="inlineCheckbox1">링크</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="linkTypeRadio" value="board" id="radio_board">
                    <label class="form-check-label" for="inlineCheckbox1">게시판</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="linkTypeRadio" value="self" id="radio_self">
                    <label class="form-check-label" for="inlineCheckbox1">셀프</label>
                </div>
            </div>
            <div class="d-flex">
                <label for="image" class="control-label">Link</label>
                <div>
                    <input type="text" class="form-control" name="eventInput" id="eventLink" placeholder="event link..." required />
                </div>

            </div>
            <div class="d-flex">
                
                <button class="btn btn-outline-info home-make-btns" id="event-save-btn">저장</button>
            </div>
        </div>`;

        const div = document.createElement('div');
        div.innerHTML = elem;
        return div;
    }

    getSelectionEventStyle(object) {
        object = object || self.canvas.getActiveObject();
        //console.log('object=', object);
        if (!object) return '';

        if (!$$('eventDown').value) {
            (object.down) ? $$('eventDown').value = JSON.stringify(object.down) : $$('eventDown').value = "";
        } 
        
        if (!$$('eventOver').value) {
            (object.over) ? $$('eventOver').value = JSON.stringify(object.over) : $$('eventOver').value = "";
        }

        if (!$$('eventLink').value) {
            (object.link) ? $$('eventLink').value = JSON.stringify(object.link) : $$('eventLink').value = "";
        }

        var style = {};
        var selJson = object.toJSON();

        style.left = selJson.left;
        style.top = selJson.top;
        style.scaleX = selJson.scaleX;
        style.scaleY = selJson.scaleY;
        style.width = selJson.width;
        style.angle = selJson.angle;
        style.fill = selJson.fill;
        style.strokeColor = selJson.strokecolor;
        style.opacity = selJson.opacity;
       // console.log('selJson=', selJson);
        //console.log('style.angle=', style.angle);
       
            //selectAniObj(canvas.getActiveObject());
        return style;
    }

    setSelectionObjectEvent(type, event) {

        if (type == 'mousedown') {
            if (event.target.down) {
                //console.log('event.target.type=', event.target.type);
                var options = {
                    easing: fabric.util.ease.easeOutCubic,
                    onChange: self.canvas.renderAndResetBound,
                    onComplete: function () {
                        //animateBtn.disabled = false;
                    },
                    duration: 100
                };

                event.target.animate(event.target.down, options);
            }
            
        } else if (type == 'mouseup') {
            if (event.target.out) {
                event.target.set(event.target.out);
                self.canvas.renderAll();
            }

            if (event.target.link) {
                if (event.target.out) {
                    event.target.set(event.target.out);
                    self.canvas.renderAll();
                }
                var action = event.target.link.action;
                var link = event.target.link.link;
                console.log('link=', link);
                console.log('action=', action);
                if (action == 'link') {
                    if (link.startsWith('http://') || link.startsWith('https://'))
                        location.href = link;
                    else
                        location.href = 'http://' + link;
                } else if (action == 'self') {
                    var f = new FullScreenView();
                    f.setContent(`보기`, '<div>test</div>');
                } else if (action == 'board') {
                    var f = new FullScreenView();
                    f.setContent(`보기`, '<div>test</div>');
                }
            }
        } else if (type == 'mouseover') {
            console.log('event.target.over=', event.target.over);
            if (event.target.over) {
                console.log('event.target.over=', event.target.over);
                var options = {
                    easing: fabric.util.ease.easeOutCubic,
                    onChange: self.canvas.renderAndResetBound,
                    onComplete: function () {
                        //animateBtn.disabled = false;
                    },
                    duration: 100
                };

                event.target.animate(event.target.over, options);
            }
        } else if (type == 'mouseout') {
            if (event.target.out) {
                console.log('event.target.out=', event.target.out);
                
                //event.target.animate(event.target.out, options);
                event.target.set(event.target.out);
                self.canvas.renderAll();
            }
        }
        
    }

    selectionMouseUpHandle(event) {
        self.setSelectionObjectEvent('mouseup', event);
    }

    createEventOptionEvent() {

        $$('event-down-ok-btn').onclick = function () {
            var d = JSON.stringify(self.getSelectionEventStyle(self._selectedObject));
            
            self._selectedObject.set(self._selectedObjectStyle);
            self.canvas.renderAll();
            $$('eventDown').value = d;
        };
        
        $$('event-over-ok-btn').onclick = function () {
            var d = JSON.stringify(self.getSelectionEventStyle(self._selectedObject));
            
            self._selectedObject.set(self._selectedObjectStyle);
            self.canvas.renderAll();
            $$('eventOver').value = d;
            console.log('event-over-ok-btn=');
        };

        $$('event-save-btn').onclick = function () {
            //console.log('self._selectedObject=' + self._selectedObject);
            if ($$('eventDown').value) {
                self._selectedObject.set('hoverCursor', 'pointe');
                self._selectedObject.down = JSON.parse($$('eventDown').value);
                
                if (!self._selectedObject.up) {
                    
                    self._selectedObject.up = self._selectedObjectStyle;
                    
                }

            }
                
            if ($$('eventOver').value)
            {
                self._selectedObject.set('hoverCursor', 'pointe');
                self._selectedObject.over = JSON.parse($$('eventOver').value);
                console.log('self._selectedObject.over=' + self._selectedObject.over);
                
                if (!self._selectedObject.out) {
                    self._selectedObject.out = self._selectedObjectStyle;
                    
                }
            }
            
            //console.log('self._selectedObject.out=' + self._selectedObject.out);
            if ($$('eventLink').value) {
                const radioButtonsValue = document.querySelector('input[name="linkTypeRadio"]:checked').value;
                //console.log('$$(eventLink).value=', $$('eventLink').value);
                //console.log('radioButtonsValue=', radioButtonsValue);
                
                self._selectedObject.link = $$('eventLink').value;
                self._selectedObject.action = radioButtonsValue

            }
        };
    }

    createJsonOption() {
        var elem = `
            <input type="file" id="fabLoader" name="fabLoader" style="display: none" />
            <form id="uploaddataform">
                <input type="hidden" name="fid" />
                <input type="hidden" name="dbcode" />
                <input type="hidden" name="dbpath" />
                <input type="hidden" name="type" />
                <input type="hidden" name="kcode" value="_fab" />
                <input type="hidden" name="kname" value="" />
                <input type="hidden" name="key" type="text">
                <input type="hidden" name="value" value="fabric.js data" >
                <input type="hidden" name="info" >
              </form>`;

        const div = document.createElement('div');
        div.innerHTML = elem;
        return div;
    }

    ReturnJsonData() {
        // 캔버스에 그린 그래픽을 JSON 형식으로 변환합니다.
        var json = self.canvas.toJSON(['width', 'height', 'down', 'over', 'up', 'out', 'link', 'action']); // id 속성 포함 옵션

        var cstr = JSON.stringify(json);
        //alert(cstr);
        const url = URL.createObjectURL(new Blob([cstr]));

        return cstr;
    }

    LoadData(data, arg) {
        var self = this;
        //console.log('LoadData data=', data);
        this.canvas.clear();

        var json = JSON.parse(data);
        console.log('json=', json);
        var objects = json.objects;
        
        this.canvas.loadFromJSON(json, function () {
            self.canvas.renderAll();
        });

        this.canvas.on('mouse:wheel', function (opt) {
            var e = opt.e;
            if (!e.ctrlKey) {
                return;
            }
            var newZoom = self.canvas.getZoom() + e.deltaY / 300;
            self.canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, newZoom);

            self.renderVieportBorders();
            e.preventDefault();
            return false;
        });
        this.canvas.on('mouse:over', (options) => {
            //console.log('mouse:over');
            if (options.target && options.target.over) {
                options.target.set(options.target.over);
                self.canvas.renderAll();
            }
        });

        this.canvas.on('mouse:out', (options) => {
            if (options.target && options.target.out) {
                options.target.set(options.target.out);
                self.canvas.renderAll();
            }
            //console.log('mouse:out');
        });
        this.canvas.on('mouse:down', (options) => {
            //console.log('mouse:down');
            if (options.target && options.target.down) {
                options.target.set(options.target.down);
                self.canvas.renderAll();
            }

        })
        this.canvas.on('mouse:up', (options) => {
            //console.log('mouse:up');
            if (options.target && options.target.up) {
                options.target.set(options.target.up);
                self.canvas.renderAll();
                if (options.target.link) {
                    if (options.target.action == 'link') {
                        if (options.target.link.startsWith('http://') || options.target.link.startsWith('https://'))
                            location.href = options.target.link;
                        else
                            location.href = 'http://' + options.target.link;
                    } else if (options.target.action == 'self') {
                        var f = new FullScreenView();
                        f.setContent(`보기`, '<div>test</div>');
                    } else if (options.target.action == 'board') {
                        var f = new FullScreenView();
                        f.setContent(`보기`, '<div>test</div>');
                    } else {
                        if (options.target.link.startsWith('http://') || options.target.link.startsWith('https://'))
                            location.href = options.target.link;
                        else
                            location.href = 'http://' + options.target.link;
                    }
                }
            }

        })
        this.canvas.on('mouse:move', (options) => {

        })
        this.canvas.forEachObject(function (obj) {
            //console.log('obj.selectable');
            if (obj.isType('image') && obj.hasOwnProperty('background')) {
                if (!obj.background == true) {
                    //alert("true");
                    return false;
                }
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
        //console.log(`getReturnValue ()arg==${arg}`);
        //_tempCount++;
        var info = {};
        if (type == 'dbset') {
            self._dbpath = arg[1];
            self._kcode = arg[2];
            self._kname = arg[2];
            __modal.hide();
            $('#select-db-btn').text(self._dbpath + "(" + self._code + ")");

        } else if (type == 'tablename') {
            _code = value;
            document.getElementById('tableInput').value = _code;
        } else if (type == 'keyvalue') {
            var dbpath = arg[1];
            var kcode = arg[2];
            var kname = arg[3];
            __modal.hide();
            console.log('dbpath=', dbpath);
            console.log('kcode=', kcode);
            console.log('kname=', kname);
            var config = {
                dbpath: dbpath,
                kcode: kcode,
                kname: kname,
                rendertype: kcode
            };
            config.renderview = 'FabricLoader';
            //var boardElem = new KeyvalueController(config);
            //console.log(`dbpath==${dbpath}`); console.log(`kcode==${kcode} kname=${kname}`);
            //boardElem.renderController(this.$selectedItemBox);
            //return;
            fetch(`/mankeyvalue.adm?dbpath=${dbpath}&type=a&kcode=_fab&kname=${kname}&utf8=ok&`)
                .then((response) => response.text())
                .then(data => {
                    console.log('data=', data);
                    var xmlDoc = $.parseXML(data);
                    
                    $(xmlDoc).find('Records').each(function (index) {
                        var did = $(this).find('did').text();
                        if (did != -7) {
                            var info = $(this).find('info').text();

                            self.canvas.clear();

                            var json = JSON.parse(info);
                            console.log('json=', json);
                            var objects = json.objects;
                            var eventObject = null;
                            // 배열을 순회하면서 텍스트 객체를 찾습니다.
                            for (var i = 0; i < objects.length; i++) {
                                // 객체의 타입이 "text"이고, text 속성이 "Hello, fabric.js!"인 경우
                                if (objects[i].type === "event") {
                                    // 객체를 변수에 저장합니다.
                                    eventObject = objects[i];
                                    objects.splice(i, 1);
                                    // 반복문을 종료합니다.
                                    break;
                                }
                            }
                            // 변수에 저장된 텍스트 객체를 확인합니다.
                            console.log(eventObject);
                            self._eventObject = eventObject;
                            self.canvas.loadFromJSON(json, function () {
                                self.canvas.renderAll();
                            });
                            console.log('self.canvas.loadFromJSON=');
                            self.canvas.forEachObject(function (obj) {
                                //alert(obj.type);
                                if (obj.isType('image') && obj.hasOwnProperty('background')) {
                                    if (!obj.background == true) {
                                        //alert("true");
                                        return false;
                                    }
                                }
                            });
                        }

                        
                    });
                    console.log(`in self.fid==${self._fid}`);
                    //arg.arg.$parent.LoadData(data);
                })// 에러처리
                .catch(() => {
                    console.log('에러')
                });
        } else if (type == 'dbopen') {
            var info = arg[1];

            this.LoadData(info.info);
            
        } else if (type == 'filepath') {
            var arr = value.split('/');
            var str = "/filelist.file?code=" + arr[2] + "&filetype=open&filename=" + arr[1] + "&filepath=" + arr[0] + "&utf8=ok&";
            //alert(arr + str);
           // FileAjax('fileopen', str);

        } else if (type == 'icon' || type == 'img') {
            $('#iconchange_input').val(type + ':' + value);
            //alert(value);
        }
    }

    createJsonOptionEvent() {
        var self = this;
        $$('select-db-btn').onclick = function () {
            console.log(`select-db-btn`);
            var elem = document.createElement('div');
            var cls = new DbFileAjaxBase({ type: 'filelist', filetype: 'db', path: '', filter: 'fab', rendertype: 'ta', returntype: 'return', $parent: self });
            cls.fileList('', elem);
            //$('#dbsetModal').modal('show');
            __modal.show('디비셋팅', elem);
            console.log('$(elem).html()==' + $(elem).html());

        };

        $$('save-file-btn').onclick = function () {

            // 캔버스에 그린 그래픽을 JSON 형식으로 변환합니다.
            var json = self.canvas.toJSON(['width', 'height', 'down', 'over', 'up', 'out', 'link', 'action']); // id 속성 포함 옵션
            
            var cstr = JSON.stringify(json);
            //alert(cstr);
            const url = URL.createObjectURL(new Blob([cstr]));

            const form = document.getElementById('uploaddataform');
            form.info.value = cstr;

            var elem = document.createElement('div');
            var cls = new DbFileAjaxBase({ type: 'filelist', filetype: 'file', path: '', filter: 'fab', rendertype: 'ta', returntype: 'filesave', $parent: self });
            cls.fileList('', elem);
            //$('#dbsetModal').modal('show');
            __modal.show('디비셋팅', elem);
            console.log('$(elem).html()==' + $(elem).html());
        };

        $$('save-db-btn').onclick = function () {
            if (!self._dbpath)
                return alert('디비를 선택해야됩니다');

            // 캔버스에 그린 그래픽을 JSON 형식으로 변환합니다.
            var json = self.canvas.toJSON(['width', 'height', 'down', 'over', 'up', 'out', 'link', 'action']); // id 속성 포함 옵션
            /** 
            // JSON 데이터에 텍스트 객체의 정보를 추가합니다.
            json.objects.push({
                type: "event",
                text: "Hello, fabric.js!",
                info: { a: 'a', b: 'b' },
                top: 100,
                fill: "black",
                fontSize: 20
            });
            */
            var cstr = JSON.stringify(json);
            //alert(cstr);
            const url = URL.createObjectURL(new Blob([cstr]));

            if (!self._dbpath)
                return alert('디비를 선택해야됩니다');

            var elem = document.createElement('div');
            var config = {
                settype: 'setting',
                dbpath: self._dbpath,
                kcode: '_fab',
                kname: ' ',
                data: cstr,
                fid: self.fid,
                rendertype: 'list',
                renderview: 'ListTreeView',
                editmode: 'ok',
                returntype: 'dbsave',
                $parent: self
            }
            var cls = new KeyvalueController(config);
            //var cls = new DbFileAjaxBase({ type: 'filelist', filetype: 'db', path: '', filter: 'fab', rendertype: 'ta', returntype: 'dbsave', $parent: self });
            cls.renderController(elem);

            //$('#dbsetModal').modal('show');
            __modal.show('fab 리스트', elem);
            
            /** 
            const form = document.getElementById('uploaddataform');
            form.info.value = cstr;
            form.type.value = 'nameadd2';
            
            form.kname.value = input.value;
            form.key.value = '_fab';
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
            **/
        };

        $$('open-file-btn').onclick = function () {

            var elem = document.createElement('div');
            var cls = new DbFileAjaxBase({ type: 'filelist', filetype: 'file', path: '', filter: 'fab', rendertype: 'ta', returntype: 'fileopen', $parent: self });
            cls.fileList('', elem);
            //$('#dbsetModal').modal('show');
            __modal.show('디비셋팅', elem);
            console.log('$(elem).html()==' + $(elem).html());
        };

        $$('open-db-btn').onclick = function () {

            if (!self._dbpath)
                return alert('디비를 선택해야됩니다');

            var elem = document.createElement('div');
            var config = {
                settype: 'setting',
                dbpath: self._dbpath,
                kcode: '_fab',
                kname: ' ',
                rendertype: 'list',
                renderview: 'ListTreeView',
                editmode: 'ok',
                returntype: 'dbopen',
                $parent: self
            }
            var cls = new KeyvalueController(config);
            //var cls = new DbFileAjaxBase({ type: 'filelist', filetype: 'db', path: '', filter: 'fab', rendertype: 'ta', returntype: 'dbsave', $parent: self });
            cls.renderController(elem);
            
            //$('#dbsetModal').modal('show');
            __modal.show('fab 리스트', elem);
            console.log('$(elem).html()==' + $(elem).html());
        };

        $$('fabLoader').onchange = function (e) {
            var reader = new FileReader();
            reader.onload = function (event) {
                self.canvas.clear();

                var json = JSON.parse(event.target.result);
                
                self.canvas.loadFromJSON(json, function () {
                    self.canvas.renderAll();
                });
                //console.log('self.canvas.loadFromJSON=');
                
                self.canvas.forEachObject(function (obj) {
                    //alert(obj.type);
                    if (obj.isType('image') && obj.hasOwnProperty('background')) {
                        if (!obj.background == true) {
                            //alert("true");
                            return false;
                        }
                    }
                });
            }
            //reader.readAsDataURL(e.target.files[0]);
            reader.readAsText(e.target.files[0], /* optional */ "UTF-8");
        };
    }

    createTextOption() {
        var elem = `<div class="container alert alert-info " id="textoption" style="overflow:auto;">
            <strong class="alert-heading">텍스트</strong>
            <div href="#" class="pull-right">
                <button type="button" class="close" onclick="$('#textoption').collapse('toggle');">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="object-controls" style="overflow:auto;">

                <div id="text-wrapper" ng-show="getText()" style="overflow:auto;">
                    <div id="text-controls" style="overflow:auto;">
                        <p>Text specific controls</p>
                        <p>
                            <label><input type="checkbox" name="pathtextradio" id="pathtextradio" onchange="handleRChange(this);" value="pathtext">Path Draw Text</label>
                        </p>
                        <textarea bind-value-to="text" id="pathTextarea" rows="3" columns="80"></textarea><br />
                        <p>
                            <button type="button" class="btn btn-dark" id="text-add-btn">
                                addText
                            </button>
                        </p>
                        <label for="font-family" style="display:inline-block">Font family:</label>
                        <select id="font-family" class="btn-object-action" bind-value-to="fontFamily">
                            <option value="arial">Arial</option>
                            <option value="helvetica" selected>Helvetica</option>
                            <option value="myriad pro">Myriad Pro</option>
                            <option value="delicious">Delicious</option>
                            <option value="verdana">Verdana</option>
                            <option value="georgia">Georgia</option>
                            <option value="courier">Courier</option>
                            <option value="comic sans ms">Comic Sans MS</option>
                            <option value="impact">Impact</option>
                            <option value="monaco">Monaco</option>
                            <option value="optima">Optima</option>
                            <option value="hoefler text">Hoefler Text</option>
                            <option value="plaster">Plaster</option>
                            <option value="engagement">Engagement</option>
                        </select>
                        <br>
                        <label for="text-align" style="display:inline-block">Text align:</label>
                        <select id="text-align" class="btn-object-action" bind-value-to="textAlign">
                            <option>Left</option>
                            <option>Center</option>
                            <option>Right</option>
                            <option>Justify</option>
                            <option>Justify-left</option>
                            <option>Justify-right</option>
                            <option>Justify-center</option>
                        </select>
                        <div>
                            <label for="text-outline-color">Text Outline color:</label>
                            <input type="color" value="" id="text-outline-color" size="10" class="btn-object-action"
                                   bind-value-to="textBgColor">
                        </div>
                        <div>
                            <label for="text-fill-color">Text Fill color:</label>
                            <input type="color" value="" id="text-fill-color" size="10" class="btn-object-action"
                                   bind-value-to="textBgColor">
                        </div>
                        <div>
                            <label for="text-lines-bg-color">Background text color:</label>
                            <input type="color" value="" id="text-lines-bg-color" size="10" class="btn-object-action"
                                   bind-value-to="textBgColor">
                        </div>
                        <div>
                            <label for="text-font-size">Text Outline Width:</label>
                            <input type="range" value="1" min="1" max="10" step="1" id="text-outline-width" class="btn-object-action"
                                   bind-value-to="fontSize">
                        </div>
                        <div>
                            <label for="text-font-size">Font size:</label>
                            <input type="range" value="" min="1" max="120" step="1" value="15" id="text-font-size" class="btn-object-action"
                                   bind-value-to="fontSize">
                        </div>

                        <div>
                            <label for="text-shadow-color">Shadow color:</label>
                            <input type="color" value="#005E7A" id="text-shadow-color"><br>
                        </div>

                        <div>
                            <label for="text-shadow-blur">Shadow blur:</label>
                            <span class="info">0</span><input type="range" value="0" min="0" max="50" id="text-shadow-blur"><br>
                        </div>

                        <div>
                            <label for="text-shadow-offset-x">Shadow offset X:</label>
                            <span class="info">0</span><input type="range" value="0" min="0" max="50" id="text-shadow-offset-x"><br>
                        </div>
                        <div>
                            <label for="text-shadow-offset-y">Shadow offset Y:</label>
                            <span class="info">0</span><input type="range" value="0" min="0" max="50" id="text-shadow-offset-y"><br>
                        </div>

                        <div>
                            <label for="text-line-height">Line height:</label>
                            <input type="range" value="1" min="0" max="10" step="0.1" id="text-line-height" class="btn-object-action"
                                   bind-value-to="lineHeight">
                        </div>
                        <div>
                            <label for="text-char-spacing">Char spacing:</label>
                            <input type="range" value="" min="-200" max="800" step="10" id="text-char-spacing" class="btn-object-action" bind-value-to="charSpacing">
                        </div>

                        <label>
                            <input type="checkbox" id="text-cmd-bold">
                            Bold
                        </label>
                        <label>
                            <input type="checkbox" id="text-cmd-italic">
                            Italic
                        </label>
                        <label>
                            <input type="checkbox" id="text-cmd-underline">
                            Underline
                        </label>

                        <button type="button" class="btn btn-object-action" id="text-cmd-linethrough"
                                ng-click="toggleLinethrough()"
                                ng-class="{'btn-inverse': isLinethrough()}">
                            Linethrough
                        </button>
                        <button type="button" class="btn btn-object-action" id="text-cmd-overline"
                                ng-click="toggleOverline()"
                                ng-class="{'btn-inverse': isOverline()}">
                            Overline
                        </button>
                        <br />
                        <button type="button" class="btn btn-object-action" id="text-cmd-superscript"
                                ng-click="setSuperScript()">
                            Superscript
                        </button>
                        <button type="button" class="btn btn-object-action" id="text-cmd-subscript"
                                ng-click="setSubScript()">
                            Subscript
                        </button>
                    </div>
                </div>

            </div>
        </div>`;

        const div = document.createElement('div');
        div.innerHTML = elem;
        return div;
    }

    event_Handle_PathTextBefore(opt) {
        var path = opt.path;
        var pathInfo = fabric.util.getPathSegmentsInfo(path.path);
        path.segmentsInfo = pathInfo;
        var pathLength = pathInfo[pathInfo.length - 1].length;
        var text = $$('pathTextarea').value;
        var fontSize = 2.5 * pathLength / text.length;
        var text = new fabric.Text(text, {
            fontFamily: $$('font-family').value,
            fontSize: $$('text-font-size').value,
            strokeWidth: $$('text-outline-width').value,
            stroke: $$('text-outline-color').value,
            fill: $$('text-fill-color').value,
            shadow: self.getTextShadowValue(),
            path: path,
            top: path.top,
            left: path.left
        });
        self.canvas.add(text);
    };

    event_Handle_PathText(opt) {
        self.canvas.remove(opt.path);
    };

    removePathTextEvent() {
        self.canvas.off('before:path:created', self.event_Handle_PathTextBefore);
        self.canvas.off('path:created', self.event_Handle_PathText);
    }

    addPathTextEvent() {
        self.canvas.on('before:path:created', self.event_Handle_PathTextBefore);
        self.canvas.on('path:created', self.event_Handle_PathText);
    }
    isUnderline () {
        return self.getActiveStyle('textDecoration').indexOf('underline') > -1 || self.getActiveStyle('underline');
    };

    createTextOptionEvent() {
        $$('pathtextradio').onchange = function () {
            console.log('pathtextradio this.checked=', this.checked);
            if (this.checked) {

                self.addPathTextEvent();
                self.canvas.isDrawingMode = true;
            } else {
                self.removePathTextEvent();
                self.canvas.isDrawingMode = false;
            }
        }
        $$('font-family').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setActiveProp('fontFamily', this.value.toLowerCase());
        }
        $$('text-cmd-bold').onchange = function () {
            self.setActiveStyle('fontWeight',
                self.getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
        }
        $$('text-cmd-italic').onchange = function () {
            self.setActiveStyle('fontStyle',
                self.getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
        }
        $$('text-cmd-underline').onchange = function () {
            var value = self.isUnderline()
                ? self.getActiveStyle('textDecoration').replace('underline', '')
                : (self.getActiveStyle('textDecoration') + ' underline');

            self.setActiveStyle('textDecoration', value);
            self.setActiveStyle('underline', !self.getActiveStyle('underline'));
        }
        $$('text-align').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setActiveProp('textAlign', this.value.toLowerCase());
        }
        $$('text-outline-color').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setActiveStyle('stroke', this.value);
        }
        $$('text-fill-color').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setActiveStyle('fill', this.value);
        }
        $$('text-lines-bg-color').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setActiveProp('textBackgroundColor', this.value);
        }
        $$('text-font-size').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setActiveStyle('fontSize', parseInt(this.value, 10));
        }
        $$('text-outline-width').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setActiveStyle('strokeWidth', parseFloat(this.value, 10));
        }
        $$('text-line-height').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setActiveStyle('lineHeight', parseFloat(this.value, 10));
        }
        $$('text-char-spacing').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setActiveStyle('charSpacing', this.value);
        }

        $$('text-cmd-linethrough').onclick = function () {

            var value = self.getActiveStyle('textDecoration').indexOf('line-through') > -1 || self.getActiveStyle('linethrough')
                ? self.getActiveStyle('textDecoration').replace('line-through', '')
                : (self.getActiveStyle('textDecoration') + ' line-through');

            self.setActiveStyle('textDecoration', value);
            self.setActiveStyle('linethrough', !self.getActiveStyle('linethrough'));
        };
        $$('text-cmd-overline').onclick = function () {

            var value = self.getActiveStyle('textDecoration').indexOf('overline') > -1 || self.getActiveStyle('overline')
                ? self.getActiveStyle('textDecoration').replace('overline', '')
                : (self.getActiveStyle('textDecoration') + ' overline');

            self.setActiveStyle('textDecoration', value);
            self.setActiveStyle('overline', !self.getActiveStyle('overline'));
        };
        $$('text-cmd-superscript').onclick = function () {

            var obj = self.canvas.getActiveObject();
            obj.setSuperScript();
        };
        $$('text-cmd-subscript').onclick = function () {

            var obj = self.canvas.getActiveObject();
            obj.setSubScript();
        };

        $$('text-shadow-color').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setTextShadow(self.getTextShadowValue());
        }
        $$('text-shadow-blur').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setTextShadow(self.getTextShadowValue());
        }
        $$('text-shadow-offset-x').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setTextShadow(self.getTextShadowValue());
        }
        $$('text-shadow-offset-y').onchange = function () {
            this.previousSibling.innerHTML = this.value;
            self.setTextShadow(self.getTextShadowValue());
        }

        $$('text-add-btn').onclick = function () {
            var text = $$('pathTextarea').value;

            var shadow = new fabric.Shadow({
                color: $$('text-shadow-color').value,
                blur: $$('text-shadow-blur').value,
                offsetX: $$('text-shadow-offset-x').value,
                offsetY: $$('text-shadow-offset-y').value
                //opacity: $$('text-outline-color').value
            });
            //var text = new fabric.Textbox(text, {
            var ctext = new fabric.IText(text, {
                fontFamily: $$('font-family').value,
                fontSize: $$('text-font-size').value,
                strokeWidth: $$('text-outline-width').value,
                stroke: $$('text-outline-color').value,
                fill: $$('text-fill-color').value,
                textAlign: 'center',
                shadow: shadow
            });
            //ctext.top = self.canvas.height - ctext.height; //텍스트를 하단으로 정렬
            //ctext.left = (self.canvas.width - ctext.width) / 2;  //텍스트를 좌우의 중앙정렬
            // 텍스트의 top 속성을 canvas의 height의 절반에서 텍스트의 height의 절반을 뺀 값으로 설정
            ctext.top = (self.canvas.height - ctext.height) / 2;
            // 텍스트의 left 속성을 canvas의 width의 절반에서 텍스트의 width의 절반을 뺀 값으로 설정
            ctext.left = (self.canvas.width - ctext.width) / 2;
            console.log('ctext.left=', ctext.left);
            self.canvas.add(ctext);
            self.canvas.renderAll();

            self.canvas.setActiveObject(text);

            if ($$('text-cmd-bold').checked) {

                self.setActiveStyle('fontWeight',
                    self.getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
            }
            if ($$('text-cmd-italic').checked) {

                self.setActiveStyle('fontStyle',
                    self.getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
            }
            if ($$('text-cmd-underline').checked) {

                var value = self.getActiveStyle('textDecoration').indexOf('underline') > -1 || self.getActiveStyle('underline')
                    ? self.getActiveStyle('textDecoration').replace('underline', '')
                    : (self.getActiveStyle('textDecoration') + ' underline');

                self.setActiveStyle('textDecoration', value);
                self.setActiveStyle('underline', !self.getActiveStyle('underline'));
            }

        };
    }

    createScaleSetModal() {
        var elem = `<div class="modal fade" id="canvasScaleSetModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">캔바스 넚이설정</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="">
                        <div class="input-group">
                            <input type="number" id="widthInput" class="form-control" placeholder="width">
                            <input type="number" id="heightInput" class="form-control" placeholder="height">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" id="scaleSetOkBtn">설정</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>`;

        const div = document.createElement('div');
        div.innerHTML = elem;
        return div;
    }

    downloadDataUrl(dataURL, filename) {
        //dataURL 변수에 base64 인코딩된 문자열이 저장되어있음
        console.log(filename);
        //var binaryData = atob(dataURL.split(',')[1]);  //binaryData 변수에 바이너리 데이터가 저장됩니다.
        //var blob = new Blob([binaryData], { type: 'image/png' }); //blob 변수에 Blob 객체가 저장됩니다.
        //var file = new File([blob], 'image.png', { type: 'image/png' }); //file 변수에 File 객체가 저장됩니다.
        //var link = document.createElement('a');
        //link.href = URL.createObjectURL(file);
        //link.href = file;
        //link.download = 'image.png';
        //link.click();
        //link.remove();
        
        const a = document.createElement('a');
        a.download = filename;
        a.href = dataURL;
        a.click();
        a.remove();
        //console.log(dataURL);
        //console.log(blob);
        //console.log(file);
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    pad(str, length) {
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }

    getRandomColor() {
        return (
            pad(this.getRandomInt(0, 255).toString(16), 2) +
            pad(this.getRandomInt(0, 255).toString(16), 2) +
            pad(this.getRandomInt(0, 255).toString(16), 2)
        );
    }

    getRandomNum(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomLeftTop() {
        var offset = 50;
        return {
            left: fabric.util.getRandomInt(0 + offset, 700 - offset),
            top: fabric.util.getRandomInt(0 + offset, 500 - offset)
        };
    }

    supportsInputOfType (type) {
        return function () {
            var el = document.createElement('input');
            try {
                el.type = type;
            }
            catch (err) { }
            return el.type === type;
        };
    };

    getActiveStyle(styleName, object) {
        object = object || self.canvas.getActiveObject();
        if (!object) return '';

        return (object.getSelectionStyles && object.isEditing)
            ? (object.getSelectionStyles()[styleName] || '')
            : (object[styleName] || '');
    };

    setActiveStyle(styleName, value, object) {
        object = object || this.canvas.getActiveObject();
        if (!object) return;

        if (object.setSelectionStyles && object.isEditing) {
            var style = {};
            style[styleName] = value;
            object.setSelectionStyles(style);
            object.setCoords();
        }
        else {
            object.set(styleName, value);
        }

        object.setCoords();
        this.canvas.requestRenderAll();
    };

    getActiveProp(name) {
        var object = this.canvas.getActiveObject();
        if (!object) return '';

        return object[name] || '';
    }

    setActiveProp(name, value) {
        var object = this.canvas.getActiveObject();
        if (!object) return;
        object.set(name, value).setCoords();
        this.canvas.renderAll();
    }

    getTextShadowValue() {
        var shadow = {
            color: $$('text-shadow-color').value,
            blur: $$('text-shadow-blur').value,
            offsetX: $$('text-shadow-offset-x').value,
            offsetY: $$('text-shadow-offset-y').value
            //opacity: $$('text-outline-color').value
        };

        return shadow;
    }

    setTextShadow (value) {
        this.setActiveProp('shadow', value);
    };


    //
    renderVieportBorders() {

        var ctx = canvas.getContext();
        //console.log('da-paint.html canvas.getZoom() = ' + canvas.getZoom());
        ctx.save();

        ctx.fillStyle = 'rgba(0,0,0,0.1)';

        ctx.fillRect(
            this.canvas.viewportTransform[4],
            this.canvas.viewportTransform[5],
            this.canvas.getWidth() * this.canvas.getZoom(),
            this.canvas.getHeight() * this.canvas.getZoom());

        ctx.setLineDash([5, 5]);

        ctx.strokeRect(
            this.canvas.viewportTransform[4],
            this.canvas.viewportTransform[5],
            this.canvas.getWidth() * this.canvas.getZoom(),
            this.canvas.getHeight() * this.canvas.getZoom());

        ctx.restore();

    }

    getShapeStyle() {
        var s = {
            fillcolor: $$('shape-fill-color').value,
            linecolor: $$('shape-stroke-color').value,
            linewidth: $$('shape-stroke-size').value,
            shadowColor: $$('shape-shadow-color').value,
            shadowBlur: $$('shape-shadow-blur').value,
            shadowOffersetX: $$('shape-shadow-offset-x').value,
            shadowOffersetY: $$('shape-shadow-offset-y').value,
            sides: $$('shape-sides').value,
            opacity: Number($$('shape-opacity').value) / 10
        }
        return s;
    }

    addArrow(s) {
        var shadow = new fabric.Shadow({
            color: s.shadowColor,
            blur: s.shadowBlur,
            offsetX: s.shadowOffersetX,
            offsetY: s.shadowOffersetY
        });
        var p0 = { x: s.x, y: s.y };
        var p1 = { x: s.x2, y: s.y2 };
        var headLength = 22; // s.headLength;
        // 두 점 사이의 거리와 각도를 계산한다
        var dx = p1.x - p0.x;
        var dy = p1.y - p0.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var angle = Math.atan2(dy, dx);

        // 각도에 따라 화살표의 꼭지점을 계산한다
        var PI = Math.PI;
        var degreesInRadians225 = 225 * PI / 180;
        var degreesInRadians135 = 135 * PI / 180;
        var x225 = p1.x + headLength * Math.cos(angle + degreesInRadians225);
        var y225 = p1.y + headLength * Math.sin(angle + degreesInRadians225);
        var x135 = p1.x + headLength * Math.cos(angle + degreesInRadians135);
        var y135 = p1.y + headLength * Math.sin(angle + degreesInRadians135);

        // Line 클래스를 사용하여 선을 생성한다
        var line = new fabric.Line([p0.x, p0.y, p1.x, p1.y], {
            fill: s.fillcolor,  //'#' + getRandomColor(),
            stroke: s.linecolor,
            strokeWidth: Number(s.linewidth),
            radius: s.width, //50,
            opacity: Number(s.opacity),
            shadow: shadow // 쉐도우 속성에 할당
        });

        // Path 클래스를 사용하여 화살표를 생성한다
        var arrow = new fabric.Path(
            `M ${p1.x} ${p1.y} L ${x225} ${y225} L ${x135} ${y135} z`, // 화살표의 경로
            {
                fill: "black" // 화살표의 색상
            }
        );

        // Group 클래스를 사용하여 선과 화살표를 묶는다
        var group = new fabric.Group([line, arrow], {
            left: p0.x, // 그룹의 왼쪽 위치
            top: p0.y // 그룹의 위쪽 위치
        });

        // 캔버스에 그룹을 추가한다
        this.canvas.add(group);
    }

    addText() {
        var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' +
            'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';
        //alert('text');
        var textSample = new fabric.Text(text.slice(0, getRandomInt(0, text.length)), {
            left: getRandomInt(350, 400),
            top: getRandomInt(350, 400),
            fontFamily: 'helvetica',
            angle: getRandomInt(-10, 10),
            fill: '#' + getRandomColor(),
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: '',
            originX: 'left',
            hasRotatingPoint: true,
            centerTransform: true
        });
        //alert(text);
        this.canvas.add(textSample);
    };

    addTextbox() {
        var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' +
            'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';

        var textSample = new fabric.Textbox(text.slice(0, getRandomInt(0, text.length)), {
            fontSize: 20,
            left: getRandomInt(350, 400),
            top: getRandomInt(350, 400),
            fontFamily: 'helvetica',
            angle: getRandomInt(-10, 10),
            fill: '#' + getRandomColor(),
            fontWeight: '',
            originX: 'left',
            width: 300,
            hasRotatingPoint: true,
            centerTransform: true
        });

        this.canvas.add(textSample);
    };

    addIText() {
        var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' +
            'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';

        var textSample = new fabric.IText(text.slice(0, getRandomInt(0, text.length)), {
            left: getRandomInt(350, 400),
            top: getRandomInt(350, 400),
            fontFamily: 'helvetica',
            angle: getRandomInt(-10, 10),
            fill: '#' + getRandomColor(),
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: '',
            originX: 'left',
            hasRotatingPoint: true,
            centerTransform: true
        });

        this.canvas.add(textSample);
    };

    addTexts() {
        var iText = new fabric.IText('lorem ipsum\ndolor\nsit Amet\nconsectetur222', {
            left: 100,
            top: 150,
            fontFamily: 'Helvetica',
            fill: '#333',
            styles: {
                0: {
                    0: { fill: 'red', fontSize: 20 },
                    1: { fill: 'red', fontSize: 30 },
                    2: { fill: 'red', fontSize: 40 },
                    3: { fill: 'red', fontSize: 50 },
                    4: { fill: 'red', fontSize: 60 },

                    6: { textBackgroundColor: 'yellow' },
                    7: { textBackgroundColor: 'yellow' },
                    8: { textBackgroundColor: 'yellow' },
                    9: { textBackgroundColor: 'yellow' }
                },
                1: {
                    0: { textDecoration: 'underline' },
                    1: { textDecoration: 'underline' },
                    2: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' },
                    3: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' },
                    4: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' }
                },
                2: {
                    0: { fill: 'blue', fontWeight: 'bold' },
                    1: { fill: 'blue', fontWeight: 'bold' },
                    2: { fill: 'blue', fontWeight: 'bold' },

                    4: { fontFamily: 'Courier', textDecoration: 'line-through' },
                    5: { fontFamily: 'Courier', textDecoration: 'line-through' },
                    6: { fontFamily: 'Courier', textDecoration: 'line-through' },
                    7: { fontFamily: 'Courier', textDecoration: 'line-through' }
                },
                3: {
                    0: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
                    1: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
                    2: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
                    3: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
                    4: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' }
                }
            }
        });

        var iText2 = new fabric.IText('foo bar\nbaz\nquux', {
            left: 400,
            top: 150,
            fontFamily: 'Helvetica',
            fill: '#333',
            styles: {
                0: {
                    0: { fill: 'red' },
                    1: { fill: 'red' },
                    2: { fill: 'red' }
                },
                2: {
                    0: { fill: 'blue' },
                    1: { fill: 'blue' },
                    2: { fill: 'blue' },
                    3: { fill: 'blue' }
                }
            }
        });

        this.canvas.add(iText, iText2);
    }

    addShape(shapeName) {

        console.log('adding shape', shapeName);

        var coord = getRandomLeftTop();

        fabric.loadSVGFromURL('../assets/' + shapeName + '.svg', function (objects, options) {

            var loadedObject = fabric.util.groupSVGElements(objects, options);

            loadedObject.set({
                left: coord.left,
                top: coord.top,
                angle: getRandomInt(-10, 10)
            })
                .setCoords();

            this.canvas.add(loadedObject);
        });
    };

    addPatternRect() {

        var coord = getRandomLeftTop();
        var rect = new fabric.Rect({
            width: 300,
            height: 300,
            left: coord.left,
            top: coord.top,
            angle: getRandomInt(-10, 10),
            fill: pattern,
        });
        this.canvas.add(rect);
    };

    maybeLoadShape(e) {
        var $el = $(e.target).closest('button.shape');
        if (!$el[0]) return;

        var id = $el.prop('id'), match;
        if (match = /\d+$/.exec(id)) {
            addShape(match[0]);
        }
    };

    addImage(imageName/**, minScale, maxScale***/) {
        var coord = getRandomLeftTop();

        fabric.Image.fromURL(imageName, function (image) {

            image.set({
                left: coord.left,
                top: coord.top,
                angle: getRandomInt(-10, 10)
            })
                //.scale(getRandomNum(minScale, maxScale))
                .setCoords();

            this.canvas.add(image);
        });
    };

    addImage1(src) {
        addImage(src, 0.1, 0.25);
    };

    addImage2() {
        addImage('logo.png', 0.1, 1);
    };

    addVideo(src, minScale, maxScale) {
        alert(src);
        //var src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
        var video1El = document.createElement('video');
        video1El.crossOrigin = 'anonymous';
        video1El.src = src;
        video1El.addEventListener('loadeddata', function () {
            // Video is loaded and can be played
            var coord = getRandomLeftTop();
            var video = new fabric.Image(video1El, {
                left: coord.left,
                top: coord.top,
                angle: getRandomInt(minScale, maxScale)
            });
            this.canvas.add(video);
        }, false);
        video1El.width = 384;
        video1El.height = 206;
        //video1El.style.display = 'none';
        this.arg.elem.appendChild(video1El);
        video1El.load();
    };

    addVideo2(src) {
        addVideo(src, -10, 10);
    };

}

class Shape {
    self = this;
    fabricBase = null;
    canvas = null; // 캔버스
    shapeTarget = null; // 그리기대상
    shapeMode = false; // 그리기모드 여부
    drawing = false; // 그리기중인지
    startX = 0; // 시작좌표 x
    startY = 0; // 시작좌표 y

    strokeWidth = 1 // 선굵기
    color = { // 색상 object
        fill: '#ffffff',
        stroke: '#000000'
    }

    polygonPointArray = { // shape 폴리곤 배열
        star: [{ x: 80, y: 14 }, { x: 67, y: 52 }, { x: 27, y: 52 }, { x: 60, y: 76 }, { x: 47, y: 114 }, { x: 80, y: 91 }, { x: 112, y: 114 }, { x: 100, y: 76 }, { x: 132, y: 52 }, { x: 92, y: 52 }]
    }

    currentTargetName = null;
    target = null // 그려질 객체 대상

    //polygon drawmode
    activeLine;
    activeShape;
    lineArray = [];
    pointArray = [];
    polygonDrawMode = false;
    polygonDrawType = 1;  //1:polygon 2: line 3: arrow

    constructor(fabricBase) {
        this.fabricBase = fabricBase;
        this.canvas = fabricBase.canvas
    }

    objectLock(isLock) {
        this.canvas.discardActiveObject()
        this.canvas.forEachObject((o) => {
            o.hasBorders = o.hasControls = o.selectable = !isLock
            o.hoverCursor = isLock ? 'default' : 'move';
            //console.log('objectLock isLock=', isLock);
        })
        this.canvas.requestRenderAll()
    }

    reset() {  //mouse up
        
        if (this.polygonDrawMode) {
            this.isDragging = false;
            this.selection = true;
            return;
        }
        this.shapeMode = false
        this.shapeTarget = null
        this.drawing = false
        this.startX = 0
        this.startY = 0
        //this.objectLock(false)
        if (this.target) {
            // 타겟이 있는경우 모든객체 active 해제
            const result = this.canvas.getObjects().find(x => x == this.target)
            if (result) this.canvas.setActiveObject(result)
            this.canvas.requestRenderAll()
        }
        this.target = null
        //this.canvas.selection = true;
        if (this.currentTargetName)
            this.setShape(this.currentTargetName);
    }

    setShape(name) {  //type select
        if (this.polygonDrawMode) {
            this.isDragging = false;
            this.selection = true;
            return;
        }
        //: ShapeTarget
        this.currentTargetName = name;
        this.shapeMode = true
        this.canvas.selection = false
        this.shapeTarget = name
        const options = {
            strokeWidth: this.strokeWidth,
            stroke: this.color.stroke,
            fill: this.color.fill,
        }
        console.log(name);
        if (name == 'rect') this.target = new fabric.Rect(options)
        else if (name == 'ellipse') this.target = new fabric.Ellipse(options)
        else if (name == 'triangle') this.target = new fabric.Triangle(options)
        else if (name == 'star') this.target = new fabric.Polygon(this.polygonPointArray.star, options)
        else if (name == 'text') {
            var txtdiv = document.getElementById('text-input-div');
            txtdiv.style.visibility = true;
            var txt = document.getElementById('text-input');
            var txtvalue = txt.value;
            this.target = new fabric.IText(txt.value, options)
        }
        else if (name == 'polygon') {
            this.polygonDrawType = 1;
            this.toggleDrawPolygon();
        } else if (name == 'line') {
            this.polygonDrawType = 2;
            this.toggleDrawPolygon();
        } else if (name == 'arrow') {
            this.polygonDrawType = 3;
            this.toggleDrawPolygon();
        }
        //this.objectLock(true)
    }
    
    drawShape(options) { //: mouse down
        //console.log('this.polygonDrawMode=', this.polygonDrawMode);
        if (this.polygonDrawMode) {
            console.log('this.pointArray[0]=', this.pointArray[0]);
            if (options.target && options.target.id === this.pointArray[0].id) {
                console.log('options.target.id=', options.target.id);
                console.log('this.pointArray[0].id=', this.pointArray[0].id);
                // when click on the first point
                if (this.polygonDrawType == 1)
                    this.generatePolygon(this.pointArray);
                
            } else if (options.target && options.target.id === this.pointArray[this.pointArray.length-1].id) {
                console.log('options.target.id=', options.target.id);
                console.log('this.pointArray[0].id=', this.pointArray[0].id);
                if (this.polygonDrawType == 2)
                    this.generateLine(this.pointArray);
                
            } else {
                console.log('this.pointArray.length=', this.pointArray.length);
                if (this.polygonDrawType == 1)
                    this.addPolygonPoint(options);
                else if (this.polygonDrawType == 2)
                    this.addLinePoint(options);
                else if (this.polygonDrawType == 3) {
                    if (this.pointArray.length == 1) {
                        this.addLinePoint(options);
                        this.generateArrow(options);
                    }
                    else
                        this.addLinePoint(options);

                }
                    
            }

            var evt = options.e;
            if (evt.altKey === true) {
                this.isDragging = true;
                this.selection = false;
                this.lastPosX = evt.clientX;
                this.lastPosY = evt.clientY;
                console.log('evt.clientX=', evt.clientX);
            }
        } else {
            // 도형 그리기
            //console.log(this.target);
            if (this.target) {
                // 시작점 좌표 설정
                this.target.left = this.startX = options.pointer?.x || 0
                this.target.top = this.startY = options.pointer?.y || 0
                this.canvas.add(this.target)
            }
            
        }
        // 드로잉 켜주기
        this.drawing = true
    }

    updateShape(options) { //: mouse move
        //polygon mode
        console.log('this.isDragging=', this.isDragging);
        
        if (this.polygonDrawMode) {
            if (this.isDragging) {
                var e = options.e;
                console.log('e.clientX=', e.clientX);
                this.viewportTransform[4] += e.clientX - this.lastPosX;
                this.viewportTransform[5] += e.clientY - this.lastPosY;
                this.requestRenderAll();
                this.lastPosX = e.clientX;
                this.lastPosY = e.clientY;
            }

            if (this.activeLine && this.activeLine.class === 'line') {
                const pointer = this.canvas.getPointer(options.e);
                this.activeLine.set({
                    x2: pointer.x,
                    y2: pointer.y
                });
                const points = this.activeShape.get('points');
                points[this.pointArray.length] = {
                    x: pointer.x,
                    y: pointer.y,
                };
                this.activeShape.set({
                    points
                });
            }
            this.canvas.renderAll();
        } else {
            if (this.drawing && this.target) {
                const pointer = this.canvas.getPointer(options.e);

                // 마우스 포인터가 시작점보다 작으면 object 위치보정
                if (this.startX > pointer.x) {
                    this.target.set({ left: Math.abs(pointer.x) });
                }
                if (this.startY > pointer.y) {
                    this.target.set({ top: Math.abs(pointer.y) });
                }

                const width = Math.abs(this.startX - pointer.x);
                const height = Math.abs(this.startY - pointer.y);



                if (this.shapeTarget == 'rect' || this.shapeTarget == 'triangle') {
                    // 사각형이나 삼각형 또는 텍스트인경우
                    this.target.set({
                        width: width,
                        height: height
                    });
                }
                if (this.shapeTarget == 'ellipse') {
                    // 원인경우
                    const ellipse = this.target;// as fabric.Ellipse
                    ellipse.set('rx', width / 2)
                    ellipse.set('ry', height / 2)
                }

                if (this.shapeTarget == 'star' || this.shapeTarget == 'text') {
                    // 커스텀 도형인경우 scale로 조정
                    const scaleX = width / (this.target.width ?? 1)
                    const scaleY = height / (this.target.height ?? 1)
                    this.target.set({
                        scaleX: Math.abs(scaleX),
                        scaleY: Math.abs(scaleY),
                    });
                }

                var s = this.fabricBase.getShapeStyle();
                var shadow = new fabric.Shadow({
                    color: s.shadowColor,
                    blur: s.shadowBlur,
                    offsetX: s.shadowOffersetX,
                    offsetY: s.shadowOffersetY
                });
                var o = {
                    fill: s.fillcolor,  //'#' + getRandomColor(),
                    stroke: s.linecolor,
                    strokeWidth: Number(s.linewidth),
                    opacity: Number(s.opacity),
                    shadow: shadow // 쉐도우 속성에 할당
                }
                this.target.set(o);
            }
            this.canvas.requestRenderAll()
        }
        
    }

    changeStrokeWidth(strokeWidth) {
        this.strokeWidth = Number(strokeWidth) || 1
        this.updateObject({ strokeWidth: this.strokeWidth })
    }

    changeColor(type, color) { //: 'fill' | 'stroke'
        if (type == 'fill') {
            this.color.fill = color
            this.updateObject({ fill: this.color.fill })
        } else {
            this.color.stroke = color
            this.updateObject({ stroke: this.color.stroke })
        }
    }

    updateObject(option) {
        const activeObjects = this.canvas.getActiveObjects()
        if (activeObjects.length > 0) {
            activeObjects.forEach((o) => {
                o.set(option)
            })
            this.canvas.requestRenderAll()
        }
    }



    onObjectMove(option) {
        const object = option.target;
        object._calcDimensions();
        object.setCoords();
        this.canvas.renderAll();
    }

    toggleDrawPolygon(event) {
        if (this.polygonDrawMode) {
            // stop draw mode
            this.activeLine = null;
            this.activeShape = null;
            this.lineArray = [];
            this.pointArray = [];
            this.canvas.selection = true;
            this.polygonDrawMode = false;
        } else {
            // start draw mode
            this.canvas.selection = false;
            this.polygonDrawMode = true;
        }
    }

    addPolygonPoint(options) {
        const pointOption = {
            id: new Date().getTime(),
            radius: 5,
            fill: '#ffffff',
            stroke: '#333333',
            strokeWidth: 0.5,
            //left: options.e.layerX / this.canvas.getZoom(),
            //top: options.e.layerY / this.canvas.getZoom(),
            left: options.pointer.x / this.canvas.getZoom(),
            top: options.pointer.y / this.canvas.getZoom(),
            selectable: false,
            hasBorders: false,
            hasControls: false,
            originX: 'center',
            originY: 'center',
            objectCaching: false,
        };
        const point = new fabric.Circle(pointOption);
        
        if (this.pointArray.length === 0) {
            // fill first point with red color
            point.set({
                fill: 'red'
            });
        }

        const linePoints = [
            options.pointer.x / this.canvas.getZoom(),
            options.pointer.y / this.canvas.getZoom(),
            options.pointer.x / this.canvas.getZoom(),
            options.pointer.y / this.canvas.getZoom(),
        ];
        const lineOption = {
            strokeWidth: 2,
            fill: '#999999',
            stroke: '#999999',
            originX: 'center',
            originY: 'center',
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
            objectCaching: false,
        };
        const line = new fabric.Line(linePoints, lineOption);
        line.class = 'line';

        if (this.activeShape) {
            console.log('this.activeShape=', this.activeShape);
            const pos = this.canvas.getPointer(options.e);
            const points = this.activeShape.get('points');
            points.push({
                x: pos.x,
                y: pos.y
            });
            const polygon = new fabric.Polygon(points, {
                stroke: '#333333',
                strokeWidth: 1,
                fill: '#cccccc',
                opacity: 0.3,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                objectCaching: false,
            });
            this.canvas.remove(this.activeShape);
            this.canvas.add(polygon);
            this.activeShape = polygon;
            this.canvas.renderAll();
        } else {
            console.log('this.activeShape=', this.activeShape);
            const polyPoint = [{
                x: options.pointer.x / this.canvas.getZoom(),
                y: options.pointer.y / this.canvas.getZoom(),
            },];
            const polygon = new fabric.Polygon(polyPoint, {
                stroke: '#333333',
                strokeWidth: 1,
                fill: '#cccccc',
                opacity: 0.3,
                selectable: false,
                hasBorders: false,
                hasControls: false,
                evented: false,
                objectCaching: false,
            });
            this.activeShape = polygon;
            this.canvas.add(polygon);
        }

        this.activeLine = line;
        this.pointArray.push(point);
        this.lineArray.push(line);

        this.canvas.add(line);
        this.canvas.add(point);
       
    }

    addLinePoint(options) {
        const pointOption = {
            id: new Date().getTime(),
            radius: 5,
            fill: '#ffffff',
            stroke: '#333333',
            strokeWidth: 0.5,
            //left: options.e.layerX / this.canvas.getZoom(),
            //top: options.e.layerY / this.canvas.getZoom(),
            left: options.pointer.x / this.canvas.getZoom(),
            top: options.pointer.y / this.canvas.getZoom(),
            selectable: false,
            hasBorders: false,
            hasControls: false,
            originX: 'center',
            originY: 'center',
            objectCaching: false,
        };
        const point = new fabric.Circle(pointOption);
        console.log('this.canvas.getZoom()=', this.canvas.getZoom());
        console.log('options.pointer.y=', options.pointer.y);
        if (this.pointArray.length === 0) {
            // fill first point with red color
            point.set({
                fill: 'red'
            });
        }

        const linePoints = [
            options.pointer.x / this.canvas.getZoom(),
            options.pointer.y / this.canvas.getZoom(),
            options.pointer.x / this.canvas.getZoom(),
            options.pointer.y / this.canvas.getZoom(),
        ];
        const lineOption = {
            strokeWidth: 2,
            fill: '#999999',
            stroke: '#999999',
            originX: 'center',
            originY: 'center',
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
            objectCaching: false,
        };
        const line = new fabric.Line(linePoints, lineOption);
        line.class = 'line';

        if (this.activeShape) {
            console.log('this.activeShape=', this.activeShape);
            const pos = this.canvas.getPointer(options.e);
            const points = this.activeShape.get('points');
            points.push({
                x: pos.x,
                y: pos.y
            });
            
            this.canvas.remove(this.activeShape);
            //this.activeShape = polygon;
            this.activeShape = line;
            this.canvas.renderAll();
        } else {
            
        }

        this.activeLine = line;
        this.pointArray.push(point);
        this.lineArray.push(line);

        var s = this.fabricBase.getShapeStyle();
        var shadow = new fabric.Shadow({
            color: s.shadowColor,
            blur: s.shadowBlur,
            offsetX: s.shadowOffersetX,
            offsetY: s.shadowOffersetY
        });
        var o = {
            fill: s.fillcolor,  //'#' + getRandomColor(),
            stroke: s.linecolor,
            strokeWidth: Number(s.linewidth),
            opacity: Number(s.opacity),
            shadow: shadow // 쉐도우 속성에 할당
        }
        line.set(o);
        this.canvas.add(line);
        this.canvas.add(point);
        
    }

    generatePolygon(pointArray) {
        console.log('generatePolygon');
        const points = [];
        // collect points and remove them from canvas
        for (const point of pointArray) {
            points.push({
                x: point.left,
                y: point.top,
            });
            this.canvas.remove(point);
        }

        // remove lines from canvas
        for (const line of this.lineArray) {
            this.canvas.remove(line);
        }

        // remove selected Shape and Line 
        this.canvas.remove(this.activeShape).remove(this.activeLine);

        // create polygon from collected points
        const polygon = new fabric.Polygon(points, {
            id: new Date().getTime(),
            stroke: '#eee',
            fill: '#f00',
            objectCaching: false,
            moveable: false,
            //selectable: false
        });

        var s = this.fabricBase.getShapeStyle();
        var shadow = new fabric.Shadow({
            color: s.shadowColor,
            blur: s.shadowBlur,
            offsetX: s.shadowOffersetX,
            offsetY: s.shadowOffersetY
        });
        var o = {
            fill: s.fillcolor,  //'#' + getRandomColor(),
            stroke: s.linecolor,
            strokeWidth: Number(s.linewidth),
            opacity: Number(s.opacity),
            shadow: shadow // 쉐도우 속성에 할당
        }
        polygon.set(o);

        this.canvas.add(polygon);

        this.toggleDrawPolygon();
        this.editPolygon();

        console.log('generatePolygon');
    }

    generateLine(pointArray) {
        console.log('generatePolygon');
        const points = [];
        // collect points and remove them from canvas
        for (const point of pointArray) {
            points.push({
                x: point.left,
                y: point.top,
            });
            this.canvas.remove(point);
        }

        this.toggleDrawPolygon();
        this.editPolygon();

        console.log('generatePolygon');
    }

    generateArrow(options) {
        
        const points = [];
        // collect points and remove them from canvas
        for (const point of this.pointArray) {
            points.push({
                x: point.left,
                y: point.top,
            });
            this.canvas.remove(point);
        }

        // 첫번째 점의 좌표를 설정합니다.
        var fromx = points[0].x;
        var fromy = points[0].y;

        // 두번째 점의 좌표를 설정합니다.
        var tox = options.pointer.x;
        var toy = options.pointer.y;
        // 두번째 점에서 화살표의 각도를 구하기 위해 Math.atan2 함수를 사용합니다.
        var angle = Math.atan2(toy - fromy, tox - fromx);

        var headlen = 10;  // arrow head size
        // bring the line end back some to account for arrow head.
        tox = tox - (headlen) * Math.cos(angle);
        toy = toy - (headlen) * Math.sin(angle);

        // calculate the points.
        var linepoints = [
            {
                x: fromx,  // start point
                y: fromy
            }, {
                x: fromx - (headlen / 4) * Math.cos(angle - Math.PI / 2),
                y: fromy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
            }, {
                x: tox - (headlen / 4) * Math.cos(angle - Math.PI / 2),
                y: toy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
            }, {
                x: tox - (headlen) * Math.cos(angle - Math.PI / 2),
                y: toy - (headlen) * Math.sin(angle - Math.PI / 2)
            }, {
                x: tox + (headlen) * Math.cos(angle),  // tip
                y: toy + (headlen) * Math.sin(angle)
            }, {
                x: tox - (headlen) * Math.cos(angle + Math.PI / 2),
                y: toy - (headlen) * Math.sin(angle + Math.PI / 2)
            }, {
                x: tox - (headlen / 4) * Math.cos(angle + Math.PI / 2),
                y: toy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
            }, {
                x: fromx - (headlen / 4) * Math.cos(angle + Math.PI / 2),
                y: fromy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
            }, {
                x: fromx,
                y: fromy
            }
        ];

        var pline = new fabric.Polyline(linepoints, {
            fill: '#999999',
            stroke: '#999999',
            opacity: 1,
            strokeWidth: 1,
            originX: 'left',
            originY: 'top',
            selectable: true
        });
        var s = this.fabricBase.getShapeStyle();
        var shadow = new fabric.Shadow({
            color: s.shadowColor,
            blur: s.shadowBlur,
            offsetX: s.shadowOffersetX,
            offsetY: s.shadowOffersetY
        });
        var o = {
            fill: s.fillcolor,  //'#' + getRandomColor(),
            stroke: s.linecolor,
            strokeWidth: Number(s.linewidth),
            opacity: Number(s.opacity),
            shadow: shadow // 쉐도우 속성에 할당
        }
        pline.set(o);
        this.canvas.add(pline);


        this.toggleDrawPolygon();
        //this.editPolygon();
        console.log('x1=', x1);
        console.log('x2=', x2);
        console.log('x3=', x3);
        console.log('x4=', x4);
        console.log('y1=', y1);
        console.log('y2=', y2);
        console.log('y3=', y3);
        console.log('y4=', y4);
    }

    polygonPositionHandler(dim, finalMatrix, fabricObject) {
        var x = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x),
            y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
        return fabric.util.transformPoint(
            { x: x, y: y },
            fabric.util.multiplyTransformMatrices(
                fabricObject.canvas.viewportTransform,
                fabricObject.calcTransformMatrix()
            )
        );
    }

    actionHandler(eventData, transform, x, y) {
        var polygon = transform.target,
            currentControl = polygon.controls[polygon.__corner],
            mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
            polygonBaseSize = polygon._getNonTransformedDimensions(),
            size = polygon._getTransformedDimensions(0, 0),
            finalPointPosition = {
                x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
                y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
            };
        polygon.points[currentControl.pointIndex] = finalPointPosition;
        return true;
    }

    anchorWrapper(anchorIndex, fn) {
        return function (eventData, transform, x, y) {
            var fabricObject = transform.target,
                absolutePoint = fabric.util.transformPoint({
                    x: (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
                    y: (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y),
                }, fabricObject.calcTransformMatrix()),
                actionPerformed = fn(eventData, transform, x, y),
                newDim = fabricObject._setPositionDimensions({}),
                polygonBaseSize = fabricObject._getNonTransformedDimensions(),
                newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
                newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
            fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
            return actionPerformed;
        }
    }

    toggleSelection(isSelect) {
        this.canvas.forEachObject(function (obj) {
            obj.selectable = isSelect;
        });
    }

    editPolygon() {
        let activeObject = this.canvas.getActiveObject();
        if (!activeObject) {
            activeObject = this.canvas.getObjects()[0];
            this.canvas.setActiveObject(activeObject);
        }

        activeObject.edit = true;
        activeObject.objectCaching = false;
        console.log('activeObject=', activeObject);
        console.log('activeObject.points=', activeObject.points);
        const lastControl = activeObject.points.length - 1;
        activeObject.cornerStyle = 'circle';
        activeObject.controls = activeObject.points.reduce((acc, point, index) => {
            acc['p' + index] = new fabric.Control({
                positionHandler: polygonPositionHandler,
                actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
                actionName: 'modifyPolygon',
                pointIndex: index,
            });
            return acc;
        }, {});

        activeObject.hasBorders = false;

        this.canvas.requestRenderAll();
    }

    resizePolygon() {
        let activeObject = this.canvas.getActiveObject();
        if (!activeObject) {
            activeObject = this.canvas.getObjects()[0];
            this.canvas.setActiveObject(activeObject);
        }

        activeObject.edit = false;
        activeObject.objectCaching = false;
        activeObject.controls = fabric.Object.prototype.controls;
        activeObject.cornerStyle = 'rect';
        activeObject.hasBorders = true;

        this.canvas.requestRenderAll();
    }
}

class FabricLoader {
    constructor(renderinfo) {
        self = this;
        this.arg = {};
        this.arg.renderinfo = renderinfo;
    }
    
    renderController(elem) {
        //console.log('this.arg.renderinfo.type=', this.arg.renderinfo.type);
        this.arg.renderinfo.elem = elem;
        if (this.arg.renderinfo && this.arg.renderinfo.type == 'dbfab')
            this.loadDbFab();
        else
            this.loadFileFab();
        
       // console.log('this.arg.renderinfo.type=');
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
                self.setFabData(info.info);
            }
        }
        return info.info;
    }

    setFabData(data, elem) {

        var json = JSON.parse(data);

        var width = this.arg.renderinfo.width ?? json.width;
        var height = this.arg.renderinfo.height ?? json.height;
        
        if (elem) {
            this.arg.renderinfo.elem = elem;
        }
        var self = this;
        this.canvasid = 'c' + new Date().getTime();
        var c = document.createElement('canvas');
        c.setAttribute('id', this.canvasid);
        c.style.position = 'absolute';
        c.style.margin = 0;
        c.style.padding = 0;
        c.style.top = '0';
        c.style.left = '0';
        c.height = height;
        c.width = width;
        c.style.zIndex = 10;
        $(this.arg.renderinfo.elem).append(c);

        this.canvas = this.__canvas = new fabric.Canvas(this.canvasid, {
            centeredRotation: false,
            centeredScaling: false,
            isDrawingMode: false,
            width: width,
            height: height
        });

        this.canvas.clear();
        
        if (json.width) {
            var jsonWidth = json.width;
            var jsonHeight = json.height;
            var canvasWidth = width;
            var canvasHeight = height;
            var widthRatio = canvasWidth / jsonWidth;
            var heightRatio = canvasHeight / jsonHeight;
            this.canvas.loadFromJSON(json, function () {
                self.canvas.renderAll();
            }, function (o, object) {
                object.scaleX = object.scaleX * widthRatio;
                object.scaleY = object.scaleY * heightRatio;
            });

            var zoomRatio = Math.min(widthRatio, heightRatio);
            
            this.canvas.setZoom(zoomRatio);
            console.log('zoomRatio=', zoomRatio);
        } else {
            this.canvas.loadFromJSON(json, function () {
                self.canvas.renderAll();
            });
        }
        
        this.canvas.forEachObject(function (obj) {
            obj.selectable = false;
        });
        this.canvas.on('mouse:wheel', function (opt) {
            var e = opt.e;
            if (!e.ctrlKey) {
                return;
            }
            var newZoom = self.canvas.getZoom() + e.deltaY / 300;
            self.canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, newZoom);

            self.renderVieportBorders();
            e.preventDefault();
            return false;
        });
        this.canvas.on('mouse:over', (options) => {
            //console.log('mouse:over');
            if (options.target && options.target.over) {
                options.target.set(options.target.over);
                self.canvas.renderAll();
            }
        });

        this.canvas.on('mouse:out', (options) => {
            if (options.target && options.target.out) {
                options.target.set(options.target.out);
                self.canvas.renderAll();
            }
            //console.log('mouse:out');
        });
        this.canvas.on('mouse:down', (options) => {
            //console.log('mouse:down');
            if (options.target && options.target.down) {
                options.target.set(options.target.down);
                self.canvas.renderAll();
            }
                
        })
        this.canvas.on('mouse:up', (options) => {
            //console.log('mouse:up');
            if (options.target && options.target.up) {
                options.target.set(options.target.up);
                self.canvas.renderAll();
                if (options.target.link) {
                    if (options.target.action == 'link') {
                        if (options.target.link.startsWith('http://') || options.target.link.startsWith('https://'))
                            location.href = options.target.link;
                        else
                            location.href = 'http://' + options.target.link;
                    } else if (options.target.action == 'self') {
                        var f = new FullScreenView();
                        f.setContent(`보기`, '<div>test</div>');
                    } else if (options.target.action == 'board') {
                        var f = new FullScreenView();
                        f.setContent(`보기`, '<div>test</div>');
                    } else {
                        if (options.target.link.startsWith('http://') || options.target.link.startsWith('https://'))
                            location.href = options.target.link;
                        else
                            location.href = 'http://' + options.target.link;
                    }
                }
            }

        })
        this.canvas.on('mouse:move', (options) => {
            
        })
        this.canvas.forEachObject(function (obj) {
            //console.log('obj.selectable');
            if (obj.isType('image') && obj.hasOwnProperty('background')) {
                if (!obj.background == true) {
                    //alert("true");
                    return false;
                }
            }
        });
        //console.log('obj.selectable');
    }

    loadDbFab() {
       
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
                        var fabdata = $(this).find('info').text();
                        //console.log('loaddb222');
                        //console.log('self=', self);
                        self.setFabData(fabdata);
                    }

                });
            })// 에러처리
            .catch(() => {
                console.log('에러')
            });

    }

    loadFileFab() {
        
        var self = this;
        //console.log('loadFileFab()');
        fetch(self.arg.renderinfo.path)
            .then((response) => response.text())
            .then(data => {
                //console.log('self=', self);
                //console.log('arg.arg.$parent=', arg.arg.$parent);
                self.setFabData(data);
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
                self.canvas.clear();
                
                var json = JSON.parse(event.target.result);
                
                self.canvas.loadFromJSON(json, function () {
                    self.canvas.renderAll();
                });
                //console.log('self.canvas.loadFromJSON=');
                self.canvas.forEachObject(function (obj) {
                    //alert(obj.type);
                    if (obj.isType('image') && obj.hasOwnProperty('background')) {
                        if (!obj.background == true) {
                            //alert("true");
                            return false;
                        }
                    }
                });

            }
            //reader.readAsDataURL(e.target.files[0]);
            reader.readAsText(e.target.files[0], /* optional */ "UTF-8");
        };

    }

    serializeLay() {
        var info = { classname: this.constructor.name };
        info.renderinfo = this.arg.renderinfo;
        info.ltype = '_fab';

        return info;
    }

    deSerializeLay(info) {

    }
}

