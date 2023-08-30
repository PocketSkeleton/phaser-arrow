var config = {
  type: Phaser.AUTO,
  width: 1700,
  height: 1000,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const points = [];

var game = new Phaser.Game(config);

function preload() {
  this.load.image("arrow", "right-arrow-white.png");
}

function create() {
  this.input.on("pointerdown", (pointer) => {
    //console.log(game.input.mousePointer.x, game.input.mousePointer.y);
    points.push({ x: game.input.mousePointer.x, y: game.input.mousePointer.y });
    makeRectAndLine(this);
  });
  setInterval(() => {
    if (points.length > 1) {
      let arrow = this.add
        .sprite(points[0].x, points[0].y, "arrow")
        .setScale(0.2);
      let count = 1;
      makeTween(this, count, arrow);
    }
  }, 200);
}

const makeTween = (scene, count, arrow) => {
  const angle = Phaser.Math.Angle.Between(
    points[count - 1].x,
    points[count - 1].y,
    points[count].x,
    points[count].y
  );
  arrow.rotation = angle;
  var tween = scene.tweens.add({
    targets: arrow,
    x: points[count].x,
    y: points[count].y,
    duration:
      Phaser.Math.Distance.Between(
        points[count - 1].x,
        points[count - 1].y,
        points[count].x,
        points[count].y
      ) / 2,
  });
  tween.once("complete", () => {
    if (points[count + 1]) {
      count++;
      makeTween(scene, count, arrow);
    } else {
      arrow.destroy();
    }
  });
};

const makeRectAndLine = (scene) => {
  for (let i = 0; i < points.length; i++) {
    scene.add.rectangle(points[i].x, points[i].y, 50, 50, 0x66ff00);
    if (points[i + 1]) {
      scene.add
        .line(
          0,
          0,
          points[i].x,
          points[i].y,
          points[i + 1].x,
          points[i + 1].y,
          0xff0000
        )
        .setOrigin(0);
    }
  }
};

function update() {}
