class CanvasIconBase {
    constructor() {
        
    }

    splitCanvasString(str) {
        if (!str)
            return "splitCanvasString() error";
        var info = {};
        var params = str.split(';');
        for (var i = 0; i < params.length; i++) {
            var param = params[i].split(':');
            if (param && param[1]) {
                if (param[0] == "type")
                    info.type = param[1];
                else if (param[0] == "src")
                    info.src = param[1];
                else if (param[0] == "angle")
                    info.angle = param[1];
                else if (param[0] == "rotateangle")
                    info.rotateangle = param[1];
                else if (param[0] == "direction")
                    info.direction = param[1];
                else if (param[0] == "mouth")
                    info.mouth = param[1];
                else if (param[0] == "color")
                    info.color = param[1];
                else if (param[0] == "blur")
                    info.blur = param[1];
                else if (param[0] == "offsetx")
                    info.offsetx = param[1];
                else if (param[0] == "offsety")
                    info.offsety = param[1];
                else if (param[0] == "spikes")
                    info.spikes = param[1];
                else if (param[0] == "outerradius")
                    info.outerradius = param[1];
                else if (param[0] == "innerradius")
                    info.innerradius = param[1];
                else if (param[0] == "radius")
                    info.radius = param[1];
                else if (param[0] == "sides")
                    info.sides = param[1];
                else if (param[0] == "rotateangle")
                    info.rotateangle = param[1];
                else if (param[0] == "teath")
                    info.teath = param[1];
                else if (param[0] == "segmentlen")
                    info.segmentlen = param[1];
                else if (param[0] == "curve")
                    info.curve = param[1];
                else if (param[0] == "pitch")
                    info.pitch = param[1];
                else if (param[0] == "centerarc")
                    info.centerarc = param[1];
                else if (param[0] == "start")
                    info.start = param[1];
                else if (param[0] == "end")
                    info.end = param[1];
                else if (param[0] == "linewidth")
                    info.linewidth = param[1];
                else if (param[0] == "imgpattern")
                    info.imgpattern = param[1];
                else if (param[0] == "canvaspattern")
                    info.canvaspattern = param[1];
                else if (param[0] == "lineargradient")
                    info.imgpattern = param[1];
                else if (param[0] == "radialgradient")
                    info.radialgradient = param[1];
                else if (param[0] == "patterntype")
                    info.patterntype = param[1];
            }
        }
        return info;
    }

    setFillstyle(context, info) {
        if (info.strokestyle) {
            var strinfo = this.splitCanvasString(info.strokestyle);
            if (strinfo.color)
                context.strokeStyle = strinfo.color;
            else if (strinfo.lineargradient) {
                const grd = context.createLinearGradient(startX, startY, endX, endY);
                grd.addColorStop(0, "color");
                grd.addColorStop(1, "color");
                context.strokeStyle = grd;
            } else if (strinfo.radialgradient) {
                const grd = context.createRadialGradient(x1, y1, r1, x2, y2, r2);
                grd.addColorStop(0, "color");
                grd.addColorStop(1, "color");
                context.strokeStyle = grd;
            } else if (strinfo.imgpattern) {
                var img = new Image();
                img.src = info.imgpattern;
                img.onload = function () {
                    // create pattern
                    var ptrn = context.createPattern(img, 'repeat');
                    context.strokeStyle = ptrn;
                    if (info.include == 'text') {
                        context.strokeText(info.text, 0, 0);

                        context.beginPath();
                        context.globalCompositeOperation = "source-in";
                        context.drawImage(img, 0, 0);
                    } else if (info.include == 'awesomeicon') {
                        context.strokeText(String.fromCharCode(parseInt(info.icontext, 16)), 0, 0);

                        context.beginPath();
                        context.globalCompositeOperation = "source-in";
                        context.drawImage(img, 0, 0);
                    } else {
                        context.stroke();
                    }
                }
            } else if (strinfo.canvaspattern) {
                var offcanvas = document.createElement("canvas");
                offcanvas.width = 10;
                offcanvas.height = 10;
                var offctx = offcanvas.getContext("2d");
                var brush = offctx.createLinearGradient(0, 0, 100, 100);
                brush.addColorStop(0, "red");
                brush.addColorStop(0.5, "yellow");
                brush.addColorStop(1, "blue");
                offctx.fillStyle = brush;
                offctx.fillRect(0, 0, 100, 100);

                context.strokeStyle = context.createPattern(offcanvas, "repeat");
            }

            if (info.include == 'text') {
                context.strokeText(info.text, 0, 0);
            } else if (info.include == 'awesomeicon') {
                context.strokeText(String.fromCharCode(parseInt(info.icontext, 16)), 0, 0);
            } else {
                context.stroke();
            }
        }
        if (info.fillstyle) {
            var strinfo = this.splitCanvasString(info.fillstyle);
            if (strinfo.type && strinfo.type == 'color')
                context.fillStyle = strinfo.color;
            else if (strinfo.type && strinfo.type == 'lineargradient') {
                const grd = context.createLinearGradient(startX, startY, endX, endY);
                grd.addColorStop(0, "color");
                grd.addColorStop(1, "color");
                context.fillStyle = grd;
            } else if (strinfo.radialgradient) {
                const grd = context.createRadialGradient(x1, y1, r1, x2, y2, r2);
                grd.addColorStop(0, "color");
                grd.addColorStop(1, "color");
                context.fillStyle = grd;
            } else if (strinfo.type && strinfo.type == 'imgpattern') {
                var img = new Image();
                img.src = strinfo.src;

                img.onload = function () {

                    var ptrn = context.createPattern(img, 'repeat');
                    context.fillStyle = ptrn;
                    if (info.include == 'text') {
                        context.fillText(info.text, 0, 0);

                        context.beginPath();
                        context.globalCompositeOperation = "source-in";
                        context.drawImage(img, 0, 0);
                    } else if (info.include == 'awesomeicon') {
                        //console.log(' setFillstyle context.fillStyle=' + context.fillStyle);
                        context.fillText(String.fromCharCode(parseInt(info.icontext, 16)), 0, 0);

                        context.beginPath();
                        context.globalCompositeOperation = "source-in";
                        context.drawImage(img, 0, 0);
                    } else {
                        context.fill();

                        context.beginPath();
                        context.globalCompositeOperation = "source-in";
                        context.drawImage(img, 0, 0);
                    }


                }
            } else if (strinfo.type && strinfo.type == 'canvaspattern') {
                var offcanvas = document.createElement("canvas");
                offcanvas.width = 50;
                offcanvas.height = 50;
                var offctx = offcanvas.getContext("2d");
                //console.log('strinfo.patterntype=' + strinfo.patterntype);

                this.setCanvasPattern(offctx, 0, 0, 50, 50, strinfo, info);

                context.fillStyle = context.createPattern(offcanvas, "repeat");
            }

            if (info.include == 'text') {
                context.fillText(info.text, 0, 0);
            } else if (info.include == 'awesomeicon') {
                context.fillText(String.fromCharCode(parseInt(info.icontext, 16)), 0, 0);
            } else {
                context.fill();
            }
        }

        if (!info.strokestyle && !info.fillstyle) {
            context.fill();
        }
    }

    setShadow(context, info) {
        if (info.shadow) {
            var strinfo = this.splitCanvasString(info.shadow);
            context.shadowColor = strinfo.color;
            context.shadowBlur = strinfo.blur;
            context.shadowOffsetX = strinfo.offsetx;
            context.shadowOffsetY = strinfo.offsety;
        }
    }

    setMask(context, x, y, width, height, info) {
        if (info.mask) {
            var strinfo = this.splitCanvasString(info.mask);
            if (strinfo.type == "star") {
                this.drawStar(context, x, y, strinfo.spikes, strinfo.outerradius, strinfo.innerradius, info);
            } else if (strinfo.type == "heart") {
                this.drawHeart(context, x, y, width, height, info);
            } else if (strinfo.type == "ellipse") {
                this.drawEllipse(context, x, y, width, height, info);
            } else if (strinfo.type == "polygon") {
                this.drawPolygon(context, x, y, strinfo.radius, strinfo.sides, strinfo.rotateangle, info);
            } else if (strinfo.type == "gear") {
                this.drawGear(context, x, y, strinfo.teath, strinfo.segmentlen, strinfo.curve, strinfo.pitch, strinfo.centerarc, info);
            } else if (strinfo.type == "diamond") {
                this.drawDiamond(context, x, y, width, height, info);
            } else if (strinfo.type == "club") {
                this.drawClub(context, x, y, width, height, info);
            } else if (strinfo.type == "spade") {
                this.drawSpade(context, x, y, width, height, info);
            }

            context.clip();
        }
    }

    setCanvasPattern(patternContext, x, y, width, height, strinfo, info) {
        if (strinfo.patterntype) {
            if (strinfo.patterntype == "star") {
                //drawStar(context, x, y, strinfo.spikes, strinfo.outerradius, strinfo.innerradius, info);
            } else if (strinfo.patterntype == "line") {
                var color1 = "#F2EEB3", color2 = "#FF4C65";
                var numberOfStripes = 100;
                for (var i = 0; i < numberOfStripes * 2; i++) {
                    var thickness = 300 / numberOfStripes;
                    patternContext.beginPath();
                    patternContext.strokeStyle = i % 2 ? color1 : color2;
                    patternContext.lineWidth = thickness;
                    patternContext.lineCap = 'round';

                    patternContext.moveTo(i * thickness + thickness / 2 - 300, 0);
                    patternContext.lineTo(0 + i * thickness + thickness / 2, 300);
                    patternContext.stroke();
                }

            } else if (strinfo.patterntype == "line2") {
                var color1 = "#D0C91F", color2 = "#FF4C65";
                var numberOfStripes = 50;
                for (var i = 0; i < numberOfStripes; i++) {
                    var thickness = 300 / numberOfStripes;
                    patternContext.beginPath();
                    patternContext.strokeStyle = i % 2 ? color1 : color2;
                    patternContext.lineWidth = thickness;

                    patternContext.moveTo(i * thickness + thickness / 2, 0);
                    patternContext.lineTo(i * thickness + thickness / 2, 300);
                    patternContext.stroke();
                }

            } else if (strinfo.patterntype == "line3") {
                var color1 = "#24A8AC", color2 = "#0087CB";
                var numberOfStripes = 30;
                for (var i = 0; i < numberOfStripes; i++) {
                    var thickness = 300 / numberOfStripes;
                    patternContext.beginPath();
                    patternContext.strokeStyle = i % 2 ? color1 : color2;
                    patternContext.lineWidth = thickness;

                    patternContext.moveTo(0, i * thickness + thickness / 2);
                    patternContext.lineTo(300, i * thickness + thickness / 2);
                    patternContext.stroke();
                }
            } else {

                patternContext.fillStyle = '#fec';
                patternContext.fillRect(0, 0, 50, 50);
                patternContext.arc(0, 0, 50, 0, .5 * Math.PI);
                patternContext.stroke();
            }
        }
    }

    drawCircle(context, x, y, radius, start, end, direction, info) {
        context.save();
        context.beginPath();
        if (info.lineWidth)
            context.lineWidth = info.lineWidth;
        else
            context.lineWidth = 1;
        context.arc(x, y, radius, start, end, direction);

        this.setShadow(context, info);
        this.setFillstyle(context, info);

        context.restore();
    }

    drawRotatedRect(context, x, y, width, height, degrees, info) {

        // first save the untranslated/unrotated context
        context.save();

        context.beginPath();
        // move the rotation point to the center of the rect
        context.translate(x + width / 2, y + height / 2);
        // rotate the rect
        context.rotate(degrees * Math.PI / 180);

        // draw the rect on the transformed context
        // Note: after transforming [0,0] is visually [x,y]
        //       so the rect needs to be offset accordingly when drawn
        context.rect(-width / 2, -height / 2, width, height);

        this.setShadow(context, info);
        this.setFillstyle(context, info);
        // restore the context to its untranslated/unrotated state
        context.restore();

    }
    
    distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
    }

    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    degreesToRadians(degrees) {
        var radians = (degrees * Math.PI) / 180;
        return radians;
    }
}

class ClubIconView extends CanvasIconBase {
    constructor(elem) {
        super();

        var context = elem.getContext("2d");

        var info = {};
        info.elem = elem;

        var parentWidth = $(elem).parent().width();
        var parentHeight = $(elem).parent().height();
        //console.log('includeCanvas parentWidth==' + parentWidth + 'parentHeight' + parentHeight);
        var width = elem.width;
        var height = elem.height;

        if (!elem.getAttribute("width") || !elem.getAttribute("height")) {
            info.selfsize = 0;
            if (parentWidth > 0 && parentHeight > 0) {
                //$(elmnt).width(parentWidth);
                //$(elmnt).height(parentHeight);
                width = elem.width = parentWidth;
                height = elem.height = parentHeight;
                //console.log('width=' + width + 'height=' + height);
                //console.log('$(elmnt).width()=' + $(elmnt).width() + '$(elmnt).height()=' + $(elmnt).height());
                //width = $(elmnt).width();
                //height = $(elmnt).height();
            }

        }
        info.fillstyle = elem.getAttribute("fillstyle");
        info.strokestyle = elem.getAttribute("strokestyle");

        info.shadow = elem.getAttribute("shadow");
        //console.log('includeCanvas width==' + width + 'height=' + height);
        //var centerX = width / 2;
        //var centerY = height / 2;
        var tx = width / 2;
        var ty = height / 2;

        this.drawClub(context, tx, ty, width, height, info)
    }

    drawClub(context, tx, ty, width, height, info) {
        var width = width * 0.8;
        var height = height;
        var x = tx; // width * 0.5;
        var y = ty - height * 0.5;  //0;
        //alert('width' + width);

        var circleRadius = width * 0.3;
        var bottomWidth = width * 0.5;
        var bottomHeight = height * 0.35;
        context.save();
        // top circle
        context.beginPath();
        context.arc(
            x, y + circleRadius + (height * 0.05),
            circleRadius, 0, 2 * Math.PI, false
        );
        context.fill();

        // bottom right circle
        context.beginPath();
        context.arc(
            x + circleRadius, y + (height * 0.6),
            circleRadius, 0, 2 * Math.PI, false
        );
        context.fill();

        // bottom left circle
        context.beginPath();
        context.arc(
            x - circleRadius, y + (height * 0.6),
            circleRadius, 0, 2 * Math.PI, false
        );
        context.fill();

        // center filler circle
        context.beginPath();
        context.arc(
            x, y + (height * 0.5),
            circleRadius / 2, 0, 2 * Math.PI, false
        );
        context.fill();

        // bottom of club
        context.moveTo(x, y + (height * 0.6));
        context.quadraticCurveTo(
            x, y + height,
            x - bottomWidth / 2, y + height
        );
        context.lineTo(x + bottomWidth / 2, y + height);
        context.quadraticCurveTo(
            x, y + height,
            x, y + (height * 0.6)
        );
        context.closePath();

        if (info.strokestyle)
            context.strokeStyle = info.strokestyle;
        if (info.fillstyle) {
            context.fillStyle = info.fillstyle;
            //console.log('info.fillstyle circle222=' + info.fillstyle)
        }
        if (info.shadow) {
            strinfo = this.splitCanvasString(info.shadow);
            context.shadowColor = strinfo.color;
            context.shadowBlur = strinfo.blur;
            context.shadowOffsetX = strinfo.offsetx;
            context.shadowOffsetY = strinfo.offsety;
        }
        context.fill();
        context.restore();
    }
}

class HeartIconView extends CanvasIconBase {
    constructor(elem) {
        super();

        var context = elem.getContext("2d");

        var info = {};
        info.elem = elem;

        var parentWidth = $(elem).parent().width();
        var parentHeight = $(elem).parent().height();
        //console.log('includeCanvas parentWidth==' + parentWidth + 'parentHeight' + parentHeight);
        var width = elem.width;
        var height = elem.height;

        if (!elem.getAttribute("width") || !elem.getAttribute("height")) {
            info.selfsize = 0;
            if (parentWidth > 0 && parentHeight > 0) {
                //$(elmnt).width(parentWidth);
                //$(elmnt).height(parentHeight);
                width = elem.width = parentWidth;
                height = elem.height = parentHeight;
                //console.log('width=' + width + 'height=' + height);
                //console.log('$(elmnt).width()=' + $(elmnt).width() + '$(elmnt).height()=' + $(elmnt).height());
                //width = $(elmnt).width();
                //height = $(elmnt).height();
            }

        }
        info.fillstyle = elem.getAttribute("fillstyle");
        info.strokestyle = elem.getAttribute("strokestyle");

        info.shadow = elem.getAttribute("shadow");
        //console.log('includeCanvas width==' + width + 'height=' + height);
        //var centerX = width / 2;
        //var centerY = height / 2;
        var tx = width / 2;
        var ty = height / 2;

        this.drawHeart(context, tx, ty, width, height, info)
    }

    drawHeart(context, tx, ty, width, height, info) {
        context.save();
        var width = width;
        var height = height;
        var x = tx; // width * 0.5;
        var y = ty - height * 0.5;  //0;
        //alert('width' + width);
        var bottomWidth = width * 0.7;
        var topHeight = height * 0.7;
        var bottomHeight = height * 0.3;

        context.beginPath();
        context.moveTo(x, y);

        // top left of spade          
        context.bezierCurveTo(
            x, y + topHeight / 2, // control point 1
            x - width / 2, y + topHeight / 2, // control point 2
            x - width / 2, y + topHeight // end point
        );

        // bottom left of spade
        context.bezierCurveTo(
            x - width / 2, y + topHeight * 1.3, // control point 1
            x, y + topHeight * 1.3, // control point 2
            x, y + topHeight // end point
        );

        // bottom right of spade
        context.bezierCurveTo(
            x, y + topHeight * 1.3, // control point 1
            x + width / 2, y + topHeight * 1.3, // control point 2
            x + width / 2, y + topHeight // end point
        );

        // top right of spade
        context.bezierCurveTo(
            x + width / 2, y + topHeight / 2, // control point 1
            x, y + topHeight / 2, // control point 2
            x, y // end point
        );

        context.closePath();
        context.fill();

        // bottom of spade
        context.beginPath();
        context.moveTo(x, y + topHeight);
        context.quadraticCurveTo(
            x, y + topHeight + bottomHeight, // control point
            x - bottomWidth / 2, y + topHeight + bottomHeight // end point
        );
        context.lineTo(x + bottomWidth / 2, y + topHeight + bottomHeight);
        context.quadraticCurveTo(
            x, y + topHeight + bottomHeight, // control point
            x, y + topHeight // end point
        );
        context.closePath();

        this.setShadow(context, info);
        this.setFillstyle(context, info);

        context.restore();
    }
}

class DiamondIconView extends CanvasIconBase {
    constructor(elem) {
        super();

        var context = elem.getContext("2d");

        var info = {};
        info.elem = elem;

        var parentWidth = $(elem).parent().width();
        var parentHeight = $(elem).parent().height();
        //console.log('includeCanvas parentWidth==' + parentWidth + 'parentHeight' + parentHeight);
        var width = elem.width;
        var height = elem.height;

        if (!elem.getAttribute("width") || !elem.getAttribute("height")) {
            info.selfsize = 0;
            if (parentWidth > 0 && parentHeight > 0) {
                //$(elmnt).width(parentWidth);
                //$(elmnt).height(parentHeight);
                width = elem.width = parentWidth;
                height = elem.height = parentHeight;
                //console.log('width=' + width + 'height=' + height);
                //console.log('$(elmnt).width()=' + $(elmnt).width() + '$(elmnt).height()=' + $(elmnt).height());
                //width = $(elmnt).width();
                //height = $(elmnt).height();
            }

        }

        info.fillstyle = elem.getAttribute("fillstyle");
        info.strokestyle = elem.getAttribute("strokestyle");

        info.shadow = elem.getAttribute("shadow");
        //console.log('includeCanvas width==' + width + 'height=' + height);
        //var centerX = width / 2;
        //var centerY = height / 2;
        var tx = width / 2;
        var ty = height / 2;

        this.drawDiamond2(context, tx, ty, width, height, info)
    }

    drawDiamond(context, tx, ty, width, height, info) {

        var width = width;
        var height = height;
        var x = tx; // width * 0.5;
        var y = ty - height * 0.5;  //0;
        //alert('width' + width);
        context.save();
        context.beginPath();
        context.moveTo(x, y);

        // top left edge
        context.lineTo(x - width / 2, y + height / 2);

        // bottom left edge
        context.lineTo(x, y + height);

        // bottom right edge
        context.lineTo(x + width / 2, y + height / 2);

        // closing the path automatically creates
        // the top right edge
        context.closePath();

        if (info.strokestyle)
            context.strokeStyle = info.strokestyle;
        if (info.fillstyle) {
            context.fillStyle = info.fillstyle;
            //console.log('info.fillstyle circle222=' + info.fillstyle)
        }
        if (info.shadow) {
            strinfo = this.splitCanvasString(info.shadow);
            context.shadowColor = strinfo.color;
            context.shadowBlur = strinfo.blur;
            context.shadowOffsetX = strinfo.offsetx;
            context.shadowOffsetY = strinfo.offsety;
        }
        context.fill();
        context.restore();
    }

    drawDiamond2(context, tx, ty, width, height, info) {

        var c_width = width;
        var c_height = height;

        var x = tx - width * 0.5;;  //0;
        var y = ty - c_height / 5;
        var w = c_width;
        var h = c_height;
        var colors;
        if (info && info.colortype && info.colortype == 1)
            colors = ['#E3170D', '#9D1309', '#F22C1E'];
        else if (info && info.colortype && info.colortype == 2)
            colors = ['#4BB74C', '#517B58', '#5B9C64'];
        else
            colors = ['#3366CC', '#003399', '#333399'];
        context.save();
        context.fillStyle = colors[0];
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + w / 2, y + 0.7 * h);
        context.lineTo(x + w / 2, y);
        context.fill();

        context.fillStyle = colors[1];
        context.beginPath();
        context.moveTo(x + w / 2, y);
        context.lineTo(x + w / 2, y + 0.7 * h);
        context.lineTo(x + w, y);
        context.fill();

        // Upper left triangle
        context.beginPath();
        context.moveTo(x + w / 4, y - 0.3 * h);
        context.lineTo(x, y);
        context.lineTo(x + w / 2, y);
        context.fill();

        // centre inverted triangle
        context.fillStyle = colors[2];
        context.beginPath();
        context.moveTo(x + w / 4, y - 0.3 * h);
        context.lineTo(x + w / 2, y);
        context.lineTo(x + 0.75 * w, y - 0.3 * h);
        context.fill();

        //Upper left triangle.
        context.fillStyle = colors[0];
        context.beginPath();
        context.moveTo(x + 0.75 * w, y - 0.3 * h);
        context.lineTo(x + w / 2, y);
        context.lineTo(x + w, y);

        if (info.shadow) {
            strinfo = this.splitCanvasString(info.shadow);
            context.shadowColor = strinfo.color;
            context.shadowBlur = strinfo.blur;
            context.shadowOffsetX = strinfo.offsetx;
            context.shadowOffsetY = strinfo.offsety;
        }
        context.fill();

    }
}

class MoonIconView extends CanvasIconBase {
    constructor(elem) {
        super();

        var context = elem.getContext("2d");

        var info = {};
        info.elem = elem;

        var parentWidth = $(elem).parent().width();
        var parentHeight = $(elem).parent().height();
        //console.log('includeCanvas parentWidth==' + parentWidth + 'parentHeight' + parentHeight);
        var width = elem.width;
        var height = elem.height;

        if (!elem.getAttribute("width") || !elem.getAttribute("height")) {
            info.selfsize = 0;
            if (parentWidth > 0 && parentHeight > 0) {
                //$(elmnt).width(parentWidth);
                //$(elmnt).height(parentHeight);
                width = elem.width = parentWidth;
                height = elem.height = parentHeight;
                //console.log('width=' + width + 'height=' + height);
                //console.log('$(elmnt).width()=' + $(elmnt).width() + '$(elmnt).height()=' + $(elmnt).height());
                //width = $(elmnt).width();
                //height = $(elmnt).height();
            }

        }

        info.fillstyle = elem.getAttribute("fillstyle");
        info.strokestyle = elem.getAttribute("strokestyle");

        info.shadow = elem.getAttribute("shadow");
        //console.log('includeCanvas width==' + width + 'height=' + height);
        //var centerX = width / 2;
        //var centerY = height / 2;
        var tx = width / 2;
        var ty = height / 2;

        this.drawMoon(context, 2, tx, ty, width / 3, 270, info);
    }

    //d = 0 는반달 초생달정도  R = 크기 rot = 회전각
    drawMoon(context, d, x, y, R, rot, info) {
        context.save();
        context.translate(x, y);
        context.scale(R, R);
        context.rotate(Math.PI / 180 * rot);

        context.beginPath();
        context.arc(0, 0, 1, Math.PI * 0.5, Math.PI * 1.5, true); // draw the outer arc
        context.arcTo(d, 0, 0, 1, this.distance(0, - 1, d, 0) / d); // draw the inner arc

        //console.log(info.fillstyle);

        this.setShadow(context, info);
        this.setFillstyle(context, info);

        context.restore();
    }
}

class StarIconView extends CanvasIconBase {
    constructor(elem) {
        super();

        var context = elem.getContext("2d");

        var info = {};
        info.elem = elem;

        var parentWidth = $(elem).parent().width();
        var parentHeight = $(elem).parent().height();
        //console.log('includeCanvas parentWidth==' + parentWidth + 'parentHeight' + parentHeight);
        var width = elem.width;
        var height = elem.height;

        if (!elem.getAttribute("width") || !elem.getAttribute("height")) {
            info.selfsize = 0;
            if (parentWidth > 0 && parentHeight > 0) {
                //$(elmnt).width(parentWidth);
                //$(elmnt).height(parentHeight);
                width = elem.width = parentWidth;
                height = elem.height = parentHeight;
                //console.log('width=' + width + 'height=' + height);
                //console.log('$(elmnt).width()=' + $(elmnt).width() + '$(elmnt).height()=' + $(elmnt).height());
                //width = $(elmnt).width();
                //height = $(elmnt).height();
            }

        }

        info.fillstyle = elem.getAttribute("fillstyle");
        info.strokestyle = elem.getAttribute("strokestyle");

        info.shadow = elem.getAttribute("shadow");
        //console.log('includeCanvas width==' + width + 'height=' + height);
        //var centerX = width / 2;
        //var centerY = height / 2;
        var tx = width / 2;
        var ty = height / 2;

        var attr = elem.getAttribute("attr");
        if (attr) {
            var strinfo = this.splitCanvasString(attr);
            this.drawStar(context, tx, ty, strinfo.spikes, strinfo.outerradius, strinfo.innerradius, info);
        }
    }

    //drawStar(context2, 73, 122, 7, 133, 25, s);
    drawStar(context, cx, cy, spikes, outerRadius, innerRadius, info) {
        var rot = Math.PI / 2 * 3;
        var x = cx;
        var y = cy;
        var step = Math.PI / spikes;
        context.save();
        context.beginPath();
        context.moveTo(cx, cy - outerRadius)
        for (var i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            context.lineTo(x, y)
            rot += step

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            context.lineTo(x, y)
            rot += step
        }
        context.lineTo(cx, cy - outerRadius)
        context.closePath();
        context.lineWidth = info.linewidth;

        this.setShadow(context, info);
        this.setFillstyle(context, info);

        context.restore();
    }
}

class SmileIconView extends CanvasIconBase {
    constructor(elem) {
        super();

        var context = elem.getContext("2d");

        var info = {};
        info.elem = elem;

        var parentWidth = $(elem).parent().width();
        var parentHeight = $(elem).parent().height();
        //console.log('includeCanvas parentWidth==' + parentWidth + 'parentHeight' + parentHeight);
        var width = elem.width;
        var height = elem.height;

        if (!elem.getAttribute("width") || !elem.getAttribute("height")) {
            info.selfsize = 0;
            if (parentWidth > 0 && parentHeight > 0) {
                //$(elmnt).width(parentWidth);
                //$(elmnt).height(parentHeight);
                width = elem.width = parentWidth;
                height = elem.height = parentHeight;
                //console.log('width=' + width + 'height=' + height);
                //console.log('$(elmnt).width()=' + $(elmnt).width() + '$(elmnt).height()=' + $(elmnt).height());
                //width = $(elmnt).width();
                //height = $(elmnt).height();
            }

        }

        info.fillstyle = elem.getAttribute("fillstyle");
        info.strokestyle = elem.getAttribute("strokestyle");

        info.shadow = elem.getAttribute("shadow");
        //console.log('includeCanvas width==' + width + 'height=' + height);
        //var centerX = width / 2;
        //var centerY = height / 2;
        var tx = width / 2;
        var ty = height / 2;

        this.initSmile(elem, info);
    }

    initSmile(elmnt, info) {

        var context = elmnt.getContext("2d");

        info.lefteye = elmnt.getAttribute("lefteye");
        info.righteye = elmnt.getAttribute("righteye");
        info.nose = elmnt.getAttribute("nose");
        info.mouth = elmnt.getAttribute("mouth");

        //c_width = elmnt.offsetWidth;
        //c_height = elmnt.offsetHeight;
        info.c_width = elmnt.width;
        info.c_height = elmnt.height;

        info.centerX = info.c_width / 2;
        info.centerY = info.c_height / 2;

        if (info.c_width > info.c_height) {
            info.arcRadius = info.c_height * 2 / 5;
        } else {
            info.arcRadius = info.c_width * 2 / 5;
        }

        info.leftEyeCenterX = info.centerX - info.arcRadius / 2;
        info.leftEyeCenterY = info.centerY - info.arcRadius / 3;
        info.rightEyeCenterX = info.centerX + info.arcRadius / 2;
        info.rightEyeCenterY = info.centerY - info.arcRadius / 3;
        info.mouthCenterX = info.centerX;
        info.mouthCenterY = info.centerY + info.arcRadius / 3;

        //draw the face
        this.drawSmileyFace(context, info);
    }

    drawSmileyFace(context, info) {
        this.drawFace(context, info);
        this.drawLeftEye(context, info);
        this.drawRightEye(context, info);
        this.drawNose(context, info);
        this.drawMouth(context, info);
    }

    drawFace(context, info) {
        // face
        context.save();
        context.beginPath();
        context.arc(info.c_width / 2,   // x   x,y is at the center
            info.c_height / 2,   // y
            info.arcRadius,      // arc radius
            0,         // starting angle
            this.degreesToRadians(360), // ending angle
            true);        // counter-clockwise

        var x = 0;
        var y = 0;
        var x2 = info.c_width;
        var y2 = info.c_height;
        var grd = context.createLinearGradient(x, y, x2, y2);
        grd.addColorStop(0, '#F9FF00');
        grd.addColorStop(1, '#E0C000');

        context.fillStyle = grd;
        if (info.shadow) {
            strinfo = this.splitCanvasString(info.shadow);
            context.shadowColor = strinfo.color;
            context.shadowBlur = strinfo.blur;
            context.shadowOffsetX = strinfo.offsetx;
            context.shadowOffsetY = strinfo.offsety;
        }
        context.fill();
        context.stroke();
        context.restore();
    }

    drawLeftEye(context, info) {

        var lefteyeInfo = this.splitCanvasString(info.lefteye);
        if (lefteyeInfo && lefteyeInfo.type == 'arc') {
            var direction;
            if (lefteyeInfo && lefteyeInfo.direction == 'top') {
                direction = true;
            } else {
                direction = false;
            }
            info.fillstyle = null;
            var start, end;
            if (info.start && info.end) {
                start = this.degreesToRadians(info.start);
                end = this.degreesToRadians(info.end);
            } else {
                start = this.degreesToRadians(0);
                end = this.degreesToRadians(360);
            }
            this.drawCircle(context, info.leftEyeCenterX, info.leftEyeCenterY, info.arcRadius / 7, start, end, direction, info);
        } else if (lefteyeInfo && lefteyeInfo.type == 'x') {
            this.drawCheck(context, info.leftEyeCenterX, info.leftEyeCenterY, info.arcRadius / 8);
        } else if (lefteyeInfo && lefteyeInfo.type == 'line') {
            //drawEllipse(context, info.leftEyeCenterX, info.leftEyeCenterY, info.arcRadius / 8);
        } else {
            // left eye
            //info.fillstyle = "#FFFFFF";
            info.strokestyle = '#000000';
            this.drawCircle(context, info.leftEyeCenterX, info.leftEyeCenterY, info.arcRadius / 7, 0, this.degreesToRadians(180), direction, info);
            //inner left eye
            //info.fillstyle = "#000000";
            info.strokestyle = '#000000';
            this.drawCircle(context, info.leftEyeCenterX, info.leftEyeCenterY, info.arcRadius / 15, 0, this.degreesToRadians(360), direction, info);
        }

    }

    drawRightEye(context, info) {

        var righteyeInfo = this.splitCanvasString(info.righteye);
        if (righteyeInfo && righteyeInfo.type == 'arc') {
            var direction;
            if (righteyeInfo && righteyeInfo.direction == 'top') {
                direction = true;
            } else {
                direction = false;
            }
            info.fillstyle = null;
            info.strokestyle = null;
            var start, end;
            if (info.start && info.end) {
                start = this.degreesToRadians(info.start);
                end = this.degreesToRadians(info.end);
            } else {
                start = this.degreesToRadians(0);
                end = this.degreesToRadians(360);
            }

            this.drawCircle(context, info.rightEyeCenterX, info.rightEyeCenterY, info.arcRadius / 7, start, end, direction, info);
        } else if (righteyeInfo && righteyeInfo.type == 'x') {
            this.drawX(context, info.rightEyeCenterX, info.rightEyeCenterY, info.arcRadius / 8);
        } else if (righteyeInfo && righteyeInfo.type == 'line') {
            this.drawEllipse(context, info.rightEyeCenterX, info.rightEyeCenterY, info.arcRadius / 8);
        } else {
            // right eye
            info.fillstyle = "#ffffff";
            info.strokestyle = '#ffffff';
            this.drawCircle(context, info.rightEyeCenterX, info.rightEyeCenterY, info.arcRadius / 7, 0, this.degreesToRadians(360), direction, info);
            //inner right eye
            info.fillstyle = "#000000";
            info.strokestyle = '#000000';
            this.drawCircle(context, info.rightEyeCenterX, info.rightEyeCenterY, info.arcRadius / 10, 0, this.degreesToRadians(360), direction, info);
        }
    }

    drawNose(context, info) {
        // nose
        var degrees = 45;
        this.drawRotatedRect(context, info.centerX - info.arcRadius / 11, info.centerY - info.arcRadius / 11, info.arcRadius / 5, info.arcRadius / 5, degrees, info);
    }

    drawMouth(context, info) {
        // start angle is to the right of the center point. So to draw a
        // semi-circle that's open at the top, like for the mouth in a
        // smile, you need to draw in a clockwise direction.
        // angle is the number of degrees we take off the edges of the
        // semi circle to give a more realistic mouth look.

        var mouthInfo = this.splitCanvasString(info.mouth);
        if (mouthInfo && mouthInfo.type == 'arc') {
            var direction;
            if (mouthInfo && mouthInfo.direction == 'top') {
                direction = true;
            } else {
                direction = false;
            }

            context.beginPath();
            context.arc(info.centerX, info.centerY + info.arcRadius / 5, info.arcRadius / 3, this.degreesToRadians(0), this.degreesToRadians(180), direction);
            context.stroke();
        } else if (mouthInfo && mouthInfo.type == 'moon') {
            //console.log('drawMouth info.fillstyle=' + info.fillstyle);
            this.drawMoon(context, 2, info.mouthCenterX, info.mouthCenterY, info.arcRadius / 3, 270, info);
        } else if (mouthInfo && mouthInfo.type == 'line') {

        } else {
            var direction;
            if (mouthInfo && mouthInfo.direction == 'top') {
                direction = true;
            } else {
                direction = false;
            }
            context.save();
            context.beginPath();
            context.arc(info.centerX, info.centerY + info.arcRadius / 5, info.arcRadius / 3, this.degreesToRadians(0), this.degreesToRadians(180), direction);
            context.stroke();
            context.restore();
        }

    }

    drawCheck(context, x, y, len) {
        var canvas = document.getElementById('canvas');
        //circle  
        var centerX = x;
        var centerY = y;
        var radius = len;
        //draw circle
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#fff';
        context.stroke();

        //draw tick
        context.beginPath();
        context.moveTo(125, 150);
        context.lineTo(150, 175);
        context.lineTo(200, 125);
        context.lineWidth = 20;
        context.strokeStyle = '#fff';
        context.stroke();
    }

    drawX(context, x, y, len) {
        context.save();
        context.lineWidth = 1;
        context.strokeStyle = "#000";
        context.moveTo(x - len, y - len);
        context.lineTo(x + len, y + len);
        context.stroke();

        context.moveTo(x + len, y - len);
        context.lineTo(x - len, y + len);
        context.stroke();
        context.restore();
    }

    //d = 0 는반달 초생달정도  R = 크기 rot = 회전각
    drawMoon(context, d, x, y, R, rot, info) {
        context.save();
        context.translate(x, y);
        context.scale(R, R);
        context.rotate(Math.PI / 180 * rot);

        context.beginPath();
        context.arc(0, 0, 1, Math.PI * 0.5, Math.PI * 1.5, true); // draw the outer arc
        context.arcTo(d, 0, 0, 1, this.distance(0, - 1, d, 0) / d); // draw the inner arc

        //console.log(info.fillstyle);

        this.setShadow(context, info);
        this.setFillstyle(context, info);

        context.restore();
    }
}

class ImageIconView extends CanvasIconBase {
    constructor(elem) {
        super();

        var context = elem.getContext("2d");

        var info = {};
        info.elem = elem;

        var parentWidth = $(elem).parent().width();
        var parentHeight = $(elem).parent().height();
        //console.log('includeCanvas parentWidth==' + parentWidth + 'parentHeight' + parentHeight);
        var width = elem.width;
        var height = elem.height;

        if (!elem.getAttribute("width") || !elem.getAttribute("height")) {
            info.selfsize = 0;
            if (parentWidth > 0 && parentHeight > 0) {
                //$(elmnt).width(parentWidth);
                //$(elmnt).height(parentHeight);
                width = elem.width = parentWidth;
                height = elem.height = parentHeight;
                //console.log('width=' + width + 'height=' + height);
                //console.log('$(elmnt).width()=' + $(elmnt).width() + '$(elmnt).height()=' + $(elmnt).height());
                //width = $(elmnt).width();
                //height = $(elmnt).height();
            }

        }

        info.fillstyle = elem.getAttribute("fillstyle");
        info.strokestyle = elem.getAttribute("strokestyle");

        info.shadow = elem.getAttribute("shadow");
        //console.log('includeCanvas width==' + width + 'height=' + height);
        //var centerX = width / 2;
        //var centerY = height / 2;
        var tx = width / 2;
        var ty = height / 2;

        info.src = elem.getAttribute("src");
        info.imgtype = elem.getAttribute("imgtype");
        info.mask = elem.getAttribute("mask");
        this.drawImage(context, tx, ty, width, height, info);
    }

    drawImage(context, x, y, width, height, info) {
        // Create an image element
        var img = document.createElement('IMG');
        const self = this;
        // When the image is loaded, draw it
        img.onload = function () {

            // Save the state, so we can undo the clipping
            context.save();

            if (info.selfsize == 0) {
                var elmnt = info.elem;
                height = width * (img.height / img.width) * 0.9;
                //$(elmnt).height(height);
                elmnt.height = height;
            }

            var ratioW = width / img.width;
            var ratioH = height / img.height;
            var ratio = ratioW < ratioH ? ratioW : ratioH;
            var insideWidth = img.width * ratio;
            var insideHeight = img.height * ratio;
            //console.log('info.mask=' + info.mask);
            //self.setMask(context, x, y, width, height, info);
            self.setShadow(context, info);
            self.setFillstyle(context, info);

            var x1 = (width / 2) - (insideWidth / 2);
            var y1 = (height / 2) - (insideHeight / 2);
            context.drawImage(img, x1, y1, insideWidth, insideHeight);
            //console.log('drawImage img.width=' + img.width + 'img.height=' + img.height);
            //console.log('drawImage .$(info.elmnt).width()=' + $(info.elmnt).width() + '$(info.elmnt).height()=' + $(info.elmnt).height());
            //console.log('drawImage x1=' + x1 + 'y1=' + y1);
            //console.log('drawImage insideWidth=' + insideWidth + 'insideHeight=' + insideHeight);
            context.restore();
        }

        img.onerror = function () {
            this.drawHeart(context, x, y, width, height, info)
        }

        // Specify the src to load the image
        if (info.imgtype && info.imgtype == 'db') {
            $.ajax({ url: info.src }).
                done(function (data) {
                    //console.log('img $.ajax.src data' + data);
                    img.src = data;
                });
        } else {
            img.src = info.src;
        }

    }
}

class TextIconView extends CanvasIconBase {
    constructor(elem) {
        super();

        var context = elem.getContext("2d");

        var info = {};
        info.elem = elem;
        info.include = elem.getAttribute("include");
        var parentWidth = $(elem).parent().width();
        var parentHeight = $(elem).parent().height();
        //console.log('includeCanvas parentWidth==' + parentWidth + 'parentHeight' + parentHeight);
        var width = elem.width;
        var height = elem.height;

        if (!elem.getAttribute("width") || !elem.getAttribute("height")) {
            info.selfsize = 0;
            if (parentWidth > 0 && parentHeight > 0) {
                //$(elmnt).width(parentWidth);
                //$(elmnt).height(parentHeight);
                width = elem.width = parentWidth;
                height = elem.height = parentHeight;
                //console.log('width=' + width + 'height=' + height);
                //console.log('$(elmnt).width()=' + $(elmnt).width() + '$(elmnt).height()=' + $(elmnt).height());
                //width = $(elmnt).width();
                //height = $(elmnt).height();
            }

        }
        //console.log('includeCanvas width==' + width + 'height=' + height);
        //var centerX = width / 2;
        //var centerY = height / 2;
        var tx = width / 2;
        var ty = height / 2;

        info.fillstyle = elem.getAttribute("fillstyle");
        info.strokestyle = elem.getAttribute("strokestyle");

        info.shadow = elem.getAttribute("shadow");

        info.text = elem.getAttribute("text");
        info.icontext = elem.getAttribute("icontext");
        this.drawText(context, tx, ty, width, height, info);
    }

    drawText(context, x, y, width, height, info) {
        context.save();
        context.clearRect(x, y, width, height);
        var t = width - height;
        if (t > 0) {
            context.font = height - 2 + 'px FontAwesome';
        } else {
            context.font = width - 2 + 'px FontAwesome';
        }

        context.textBaseline = "top";
        this.setShadow(context, info);
        this.setFillstyle(context, info);

        context.restore();
    }
}

class WorkboardIconView extends CanvasIconBase {
    constructor(elem) {
        super();

        var context = elem.getContext("2d");

        var info = {};
        info.elem = elem;

        var parentWidth = $(elem).parent().width();
        var parentHeight = $(elem).parent().height();
        //console.log('includeCanvas parentWidth==' + parentWidth + 'parentHeight' + parentHeight);
        var width = elem.width;
        var height = elem.height;

        if (!elem.getAttribute("width") || !elem.getAttribute("height")) {
            info.selfsize = 0;
            if (parentWidth > 0 && parentHeight > 0) {
                //$(elmnt).width(parentWidth);
                //$(elmnt).height(parentHeight);
                width = elem.width = parentWidth;
                height = elem.height = parentHeight;
                //console.log('width=' + width + 'height=' + height);
                //console.log('$(elmnt).width()=' + $(elmnt).width() + '$(elmnt).height()=' + $(elmnt).height());
                //width = $(elmnt).width();
                //height = $(elmnt).height();
            }

        }

        info.fillstyle = elem.getAttribute("fillstyle");
        info.strokestyle = elem.getAttribute("strokestyle");

        info.shadow = elem.getAttribute("shadow");
        //console.log('includeCanvas width==' + width + 'height=' + height);
        //var centerX = width / 2;
        //var centerY = height / 2;
        var tx = width / 2;
        var ty = height / 2;

        info.text = elem.getAttribute("text");
        info.icontext = elem.getAttribute("icontext");
        var attr = elem.getAttribute("attr");
        if (attr) {
            var strinfo = this.splitCanvasString(attr);
            this.drawWorkboard(context, tx, ty, strinfo.radius, strinfo.sides, strinfo.rotateangle, info);
        }
    }

    drawWorkboard(context, x, y, radius, sides, rotateAngle, info) {

        context.save();
        if (sides < 3) return;

        var lineWidth = 8;
        var primaryColor = "#ffc821";
        var secondaryColor = "#faf100";
        var tertiaryColor = "#dcaa09";

        var padding = 20;

        var a = (Math.PI * 2) / sides;
        context.beginPath();
        context.translate(x, y);
        context.rotate(rotateAngle);
        context.moveTo(radius, 0);
        for (var i = 1; i < sides; i++) {
            context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
        }
        context.closePath();

        // Create fill gradient
        var gradient = context.createLinearGradient(0, 0, 0, radius);
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, secondaryColor);

        // Add a shadow around the object
        context.shadowBlur = 10;
        context.shadowColor = "black";

        // Stroke the outer outline
        context.lineWidth = lineWidth * 2;
        context.lineJoin = "round";
        context.strokeStyle = gradient;
        context.stroke();

        // Turn off the shadow, or all future fills will have shadows
        context.shadowColor = "transparent";

        // Fill the path
        context.fillStyle = gradient;
        context.fill();

        // Add a horizon reflection with a gradient to transparent
        gradient = context.createLinearGradient(0, -50, 0, radius);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.05, "transparent");
        gradient.addColorStop(0.05, tertiaryColor);
        gradient.addColorStop(1, secondaryColor);

        context.fillStyle = gradient;
        context.fill();

        // Stroke the inner outline
        context.lineWidth = lineWidth;
        context.lineJoin = "round";
        context.strokeStyle = "#333";
        context.stroke();
        context.resetTransform();

        // Draw the text exclamation point
        context.textAlign = "center";
        context.textBaseline = "top";
        context.font = "bold 60px 'Times New Roman', Times, serif";
        context.fillStyle = "#333";

        try {
            if (info.icontext)
                context.fillText(String.fromCharCode(parseInt(info.icontext, 16)), x, y);
            //context.fillText(info.icontext, padding + width / 2, padding + height / 1.5);
            else if (info.text)
                context.fillText(info.text, x, y);

            //alert(info.text);
        } catch (ex) { }

        // context.resetTransform();
        context.restore();
    }
}

class GearIconView extends CanvasIconBase {
    constructor(elem) {
        super();

        var context = elem.getContext("2d");

        var info = {};
        info.elem = elem;

        var parentWidth = $(elem).parent().width();
        var parentHeight = $(elem).parent().height();
        //console.log('includeCanvas parentWidth==' + parentWidth + 'parentHeight' + parentHeight);
        var width = elem.width;
        var height = elem.height;

        if (!elem.getAttribute("width") || !elem.getAttribute("height")) {
            info.selfsize = 0;
            if (parentWidth > 0 && parentHeight > 0) {
                //$(elmnt).width(parentWidth);
                //$(elmnt).height(parentHeight);
                width = elem.width = parentWidth;
                height = elem.height = parentHeight;
                //console.log('width=' + width + 'height=' + height);
                //console.log('$(elmnt).width()=' + $(elmnt).width() + '$(elmnt).height()=' + $(elmnt).height());
                //width = $(elmnt).width();
                //height = $(elmnt).height();
            }

        }

        info.fillstyle = elem.getAttribute("fillstyle");
        info.strokestyle = elem.getAttribute("strokestyle");

        info.shadow = elem.getAttribute("shadow");
        //console.log('includeCanvas width==' + width + 'height=' + height);
        //var centerX = width / 2;
        //var centerY = height / 2;
        var tx = width / 2;
        var ty = height / 2;

        var attr = elem.getAttribute("attr");
        if (attr) {
            var strinfo = this.splitCanvasString(attr);
            this.drawGear(context, tx, ty, strinfo.teath, strinfo.segmentlen, strinfo.curve, strinfo.pitch, strinfo.centerarc, info);
        }
    }

    drawGear(context, x, y, numberofTeath, segmentLenght, curve, pitch, centerArc, info) {
        context.save();
        var centerX = x;
        var centerY = y;
        var numberofTeath = numberofTeath;  //이빨수
        var segmentLenght = segmentLenght;  //중심에서 기어끝 길이
        var curve = curve;   //6
        var pitch = pitch;  //이빨의깊이
        var centerArc = centerArc;  //중심원 지름
        var enddeg = 0, deg = 0;
        var angle = 180 / numberofTeath;
        var radius = numberofTeath * segmentLenght * 2 / Math.PI;
        var rad2deg = 180 / Math.PI;
        context.beginPath();
        context.arc(centerX, centerY, centerArc, 0, 2 * Math.PI, false);
        context.lineWidth = info.linewidth;
        context.strokeStyle = '#003300';
        context.stroke();

        context.beginPath();
        for (var i = 0; i <= numberofTeath; ++i) {
            var sdeg = i * angle * 2;
            var senddeg = angle - (angle / curve);
            enddeg = (sdeg + senddeg) / rad2deg;
            deg = sdeg / rad2deg;
            context.arc(centerX, centerY, radius, deg, enddeg, false);
            sdeg = sdeg + angle;
            enddeg = (sdeg + senddeg) / rad2deg;
            deg = sdeg / rad2deg;
            context.arc(centerX, centerY, radius - pitch, deg, enddeg, false);
        }
        context.lineWidth = info.linewidth;

        this.setShadow(context, info);
        this.setFillstyle(context, info);

        context.closePath();
        context.restore();
    }
}

class PolygonIconView extends CanvasIconBase {
    constructor(elem) {
        super();

        var context = elem.getContext("2d");

        var info = {};
        info.elem = elem;

        var parentWidth = $(elem).parent().width();
        var parentHeight = $(elem).parent().height();
        //console.log('includeCanvas parentWidth==' + parentWidth + 'parentHeight' + parentHeight);
        var width = elem.width;
        var height = elem.height;

        if (!elem.getAttribute("width") || !elem.getAttribute("height")) {
            info.selfsize = 0;
            if (parentWidth > 0 && parentHeight > 0) {
                //$(elmnt).width(parentWidth);
                //$(elmnt).height(parentHeight);
                width = elem.width = parentWidth;
                height = elem.height = parentHeight;
                //console.log('width=' + width + 'height=' + height);
                //console.log('$(elmnt).width()=' + $(elmnt).width() + '$(elmnt).height()=' + $(elmnt).height());
                //width = $(elmnt).width();
                //height = $(elmnt).height();
            }

        }

        info.fillstyle = elem.getAttribute("fillstyle");
        info.strokestyle = elem.getAttribute("strokestyle");

        info.shadow = elem.getAttribute("shadow");
        //console.log('includeCanvas width==' + width + 'height=' + height);
        //var centerX = width / 2;
        //var centerY = height / 2;
        var tx = width / 2;
        var ty = height / 2;

        var attr = elem.getAttribute("attr");
        if (attr) {
            var strinfo = this.splitCanvasString(attr);
            this.drawPolygon(context, tx, ty, strinfo.radius, strinfo.sides, strinfo.rotateangle, info);
        }
    }

    drawPolygon(context, x, y, radius, sides, rotateAngle, info) {
        context.save();
        if (sides < 3) return;
        var a = (Math.PI * 2) / sides;
        context.beginPath();
        context.translate(x, y);
        context.rotate(rotateAngle);
        context.moveTo(radius, 0);
        for (var i = 1; i < sides; i++) {
            context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
        }
        context.closePath();

        this.setShadow(context, info);
        this.setFillstyle(context, info);

        context.resetTransform();
        context.restore();
    }
}

class EllipseIconView extends CanvasIconBase {
    constructor(elem) {
        super();

        var context = elem.getContext("2d");

        var info = {};
        info.elem = elem;

        var parentWidth = $(elem).parent().width();
        var parentHeight = $(elem).parent().height();
        //console.log('includeCanvas parentWidth==' + parentWidth + 'parentHeight' + parentHeight);
        var width = elem.width;
        var height = elem.height;

        if (!elem.getAttribute("width") || !elem.getAttribute("height")) {
            info.selfsize = 0;
            if (parentWidth > 0 && parentHeight > 0) {
                //$(elmnt).width(parentWidth);
                //$(elmnt).height(parentHeight);
                width = elem.width = parentWidth;
                height = elem.height = parentHeight;
                //console.log('width=' + width + 'height=' + height);
                //console.log('$(elmnt).width()=' + $(elmnt).width() + '$(elmnt).height()=' + $(elmnt).height());
                //width = $(elmnt).width();
                //height = $(elmnt).height();
            }

        }

        info.fillstyle = elem.getAttribute("fillstyle");
        info.strokestyle = elem.getAttribute("strokestyle");

        info.shadow = elem.getAttribute("shadow");
        //console.log('includeCanvas width==' + width + 'height=' + height);
        //var centerX = width / 2;
        //var centerY = height / 2;
        var tx = width / 2;
        var ty = height / 2;

        this.drawEllipse(context, tx, ty, width, height, info);
    }

    drawEllipse(context, x, y, width, height, info) {
        context.save();
        context.beginPath();
        context.strokeStyle = 'blue';
        //context.moveTo(200, 200);
        //context.lineTo(100, 200);
        context.moveTo(x, y - height / 2);
        context.bezierCurveTo(x - width / 4, y - height / 2, x - width / 2, y - height / 4, x - width / 2, y);  //왼쪽위
        context.bezierCurveTo(x - width / 2, y + height / 4, x - width / 4, y + height / 2, x, y + height / 2);  //왼쪽위
        context.bezierCurveTo(x + width / 4, y + height / 2, x + width / 2, y + height / 4, x + width / 2, y);  //왼쪽위
        context.bezierCurveTo(x + width / 2, y - height / 4, x + width / 4, y - height / 2, x, y - height / 2);  //왼쪽위
        context.closePath();

        this.setShadow(context, info);
        this.setFillstyle(context, info);

        context.restore();
    }
}

var includeCanvas = function (ht) {

    var arg = null;
    var z, i, elmnt, include, xhttp;

    z = document.getElementsByTagName("canvas");
    //alert("z.length" + z.length);
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        include = elmnt.getAttribute("include");

        if (include) {
            if (include == "smile") {
                new SmileIconView(elmnt);
                //this.initSmile(elmnt, info);
            } else if (include == "image") {

                new ImageIconView(elmnt);
                //this.drawImage(context, centerX, centerY, width, height, info);
            } else if (include == "awesomeicon") {

                new TextIconView(elmnt);
                //this.drawText(context, centerX, centerY, width, height, info);
            } else if (include == "text") {
                new TextIconView(elmnt);
                //this.drawText(context, centerX, centerY, width, height, info);
            } else if (include == "workboard") {
                new WorkboardIconView(elmnt);
            } else if (include == "ellipse") {
                //drawEllipse(context, x, y, width, height, info)
                new EllipseIconView(elmnt);
                //this.drawEllipse(context, centerX, centerY, width, height, info);
            } else if (include == "moon") {
                //function drawMoon(context, d, x, y, R, rot, fillColor)
                new MoonIconView(elmnt);
                //this.drawMoon(context, 2, centerX, centerY, width / 3, 270, info);
            } else if (include == "spade") {

                //this.drawSpade(context, centerX, centerY, width, height, info);
            } else if (include == "heart") {
                new HeartIconView(elmnt);
                //this.drawHeart(context, centerX, centerY, width, height, info);
            } else if (include == "club") {
                new ClubIconView(elmnt);
                //this.drawClub(context, centerX, centerY, width, height, info);
            } else if (include == "diamond") {
                new DiamondIconView(elmnt);
                //this.drawDiamond(context, centerX, centerY, width, height, info);
            } else if (include == "diamond2") {
                new DiamondIconView(elmnt);
                //this.drawDiamond2(context, centerX, centerY, width, height, info);
            } else if (include == "gear") {
                new GearIconView(elmnt);
            } else if (include == "polygon") {
                new PolygonIconView(elmnt);
            } else if (include == "star") {
                new StarIconView(elmnt);
            }
            elmnt.removeAttribute("include");
        }

        //includeCanvas(ht);
    }
    //if (cb) cb();
};