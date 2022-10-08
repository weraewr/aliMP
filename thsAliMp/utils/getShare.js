const getShareImg = ({
  ctx,
  from,
  cont,
  success
}) => {
  let pointImg = "/static/symbol.png";
  ctx.setTextAlign('left');
  ctx.setTextBaseline('normal');
  ctx.setFillStyle('#888');
  ctx.setFontSize(24);
  ctx.fillText(from, 0, 24); // ctx.setFillStyle('#ccc')

  ctx.setFillStyle('#FFFEF6');
  ctx.fillRect(0, 48, 420, 288);
  ctx.drawImage(pointImg, 24, 98, 28, 28);
  wrapText(ctx, '        ' + cont, 24, 110, 372, 36, 5);
  ctx.draw();
  setTimeout(() => {
    uni.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 420,
      height: 336,
      destWidth: 420,
      destHeight: 336,
      canvasId: ctx.canvasId,
      fileType: "/static/utils/jpg",

      success(res) {
        success(res.tempFilePath);
      },

      fail(err) {
        console.error(err);
      }

    });
  }, 500);
};

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLine) {
  if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
    return;
  }

  let context = ctx; // 字符分隔为数组

  let arrText = text.split('');
  let line = '';
  let lineNumber = 1;

  for (let n = 0; n < arrText.length; n++) {
    let testLine = line + arrText[n];
    let metrics = context.measureText(testLine);
    let testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lineNumber++;

      if (lineNumber > maxLine) {
        break;
      }

      ctx.setTextAlign('left');
      ctx.setFillStyle('#000');
      ctx.setFontSize(24);
      ctx.setTextBaseline('top');
      context.fillText(line, x, y);
      line = arrText[n];
      y += lineHeight;
    } else {
      if (lineNumber === maxLine && testLine.length > 6) {
        testLine += '...';
        line = testLine;
        ctx.setFillStyle('#000');
        context.fillText(line, x, y);
        break;
      }

      line = testLine;
    }
  } // context.fillText(line, x, y)

}

module.exports = {
  getShareImg
};