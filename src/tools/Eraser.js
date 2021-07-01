import Tool from "./Tool";
export default class Brush extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDowndHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
  }

  mouseDowndHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
  }

  mouseMoveHandler(e) {
    if (this.mouseDown)
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
  }

  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 20;
    this.ctx.stroke();
    console.log("draw");
  }
}
