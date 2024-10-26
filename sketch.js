let ay2;
let debugColor = color(0, 47, 167); 

function setup() {
  createCanvas(600, 800);
}

function draw() {
  //background(220);
  noStroke(); 
  
  push();
  clip(mask);
  vertical();
  pop();
  
  push();
  clip(mask, { invert: true });
  horizontal();
  pop();
  
  noLoop();
}

function vertical(){
  let x = 0;
  
  while (x <= width) {
    // 确定当前 x 属于哪个区域
    let region;
    if (x < width / 4) {
      region = 'first';
    } else if (x < 3 * width / 4) {
      region = 'second';
    } else {
      region = 'third';
    }
    
    let spacing;
    switch(region) {
      case 'first':
        spacing = map(x, 0, width / 4, 10, 5.45); // 从10到5.45递减，如果设置成5，会出现线条从中间被剪切区域切开的问题，这个值是试出来的
        break;
      case 'second':
        spacing = map(x, width / 4, 3 * width / 4, 10, 5.1);
        break;
      case 'third':
        spacing = map(x, 3 * width / 4, width, 10, 5);
        break;
    }

    strokeWeight(3);
    stroke(0);
    
    line(x, 0, x, height);

    x += spacing;
  }
}

function horizontal(){

  let initialSpacing = 10;
  let minSpacing = 3;
  
  for (let y = height; y >= ay2 ; ){
    strokeWeight(2);
    stroke(0);
    
    line(0, y, width, y);
    
    let spacing = map(y, ay2, height, minSpacing, initialSpacing);
    y -= spacing;
  }
}

function mask(){
  
  let persP = 0.7; // 透视参数
  
  // 左边(quad A)
  
  fill(0, 0, 0);
  
  let ay1 = 400;
  ay2 = height - ay1 * persP;
  let ax1 = width/4;
  quad(
    0, 0,
    ax1, ay1,
    ax1, ay2,
    0, height
  );
  
  // 右边(quad B)
  
  let by1 = 150;
  let by2 = height - by1 * persP;
  let bx1 = width/4;
  quad(
    bx1, by1,
    width/2, 0,
    width/2, height,
    bx1, by2,
  );
  
  // 画布右边
  
  // fill(debugColor);
  
  quad(
    width/2, 0,
    ax1 + width/2, ay1,
    ax1 + width/2, ay2,
    width/2, height
  );

  quad(
    bx1 + width/2, by1,
    width, 0,
    width, height,
    bx1 + width/2, by2,
  );
  
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('attempt', 'png');
  }
}