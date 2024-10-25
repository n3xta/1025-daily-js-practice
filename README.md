This is harder than I thought. Work time total: 2.25 hours

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt4.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt6.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt7.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt8.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt9.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt10.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt11.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt12.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt13.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt14.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt15.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt16.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt17.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt18.png" width="50px"/>
  <img src="https://raw.githubusercontent.com/n3xta/image-hosting/main/img/attempt19.png" width="50px"/>
</div>

**Table of Contents**

- [Inspiration](#inspiration)
- [Logic](#logic)
   * [Deconstructing the Layout](#deconstructing-the-layout)
   * [Deconstructing Shapes](#deconstructing-shapes)
   * [Perspective](#perspective)
   * [Clipping Path](#clipping-path)
   * [Line Drawing](#line-drawing)
      + [Vertical Lines](#vertical-lines)
      + [Horizontal Lines](#horizontal-lines)


**Or Read Chinese Version here**
- [思路：](#)
   * [拆解画面](#-1)
   * [拆解图形](#-2)
   * [透视](#-3)
   * [剪切路径](#-4)
   * [线条](#-5)
      + [垂直线](#-6)
      + [水平线](#-7)

---

# Inspiration

Inspired by Tim Maxwell's art.

![](https://raw.githubusercontent.com/n3xta/image-hosting/main/img/202410251701092.png)

https://x.com/maxwellived/status/1849872705199227075

# Logic

## Deconstructing the Layout

- The left and right halves of the image are symmetrical.
- The composition contains three regions:
  - **Blank Area**:  
    - Excluded from my coding logic.
  - **Vertical Stripes**:  
    - Composed of **four trapezoidal regions** stitched together.
  - **Horizontal Stripes**:  
    - Intersection between the **lower half of the canvas** and the **non-trapezoidal region**.

![Layout Breakdown](https://raw.githubusercontent.com/n3xta/image-hosting/main/img/202410251924687.png)

## Deconstructing Shapes

For simplicity, perspective (where the vanishing point lies lower on the canvas) is initially ignored.  
Quad A and Quad B are **isosceles trapezoids** (parallel left and right sides as the upper and lower bases, with the top and bottom edges forming the legs), and their heights equal half the canvas width.

See the sketches below:  
![Shape Deconstruction 1](https://raw.githubusercontent.com/n3xta/image-hosting/main/img/202410251923062.png)  
![Shape Deconstruction 2](https://raw.githubusercontent.com/n3xta/image-hosting/main/img/202410251923893.png)

## Perspective

The essence of persP variable is **scaling down the y2 coordinate** (the bottom-right vertex of the trapezoid, controlling the second leg).  
By assigning a variable to reduce the amount subtracted from y2 (initially equal to y1), its coordinate shifts lower (since y-values increase downwards).

![Perspective Illustration](https://raw.githubusercontent.com/n3xta/image-hosting/main/img/202410251932861.png)

## Clipping Path

To manage the drawing of shapes, create a new function `mask` that defines the clipping area.  
Within the main `draw` function, use `clip(mask)` to constrain the vertical stripes to the area formed by the four trapezoids.

Reference: [p5.js clip()](https://p5js.org/reference/p5/clip/)

## Line Drawing

### Vertical Lines

Spacing dynamically adjusts using the `map()` function depending on the x-coordinate region:

- **Region 1**: Left quarter of the canvas; spacing decreases from **10 to 5.45**.
- **Region 2**: Middle half; spacing decreases from **10 to 5.1**.
- **Region 3**: Right quarter; spacing decreases from **10 to 5**.

This approach prevents irregular breaks along the edges of the clipping region.

### Horizontal Lines

As the y-coordinate increases from the bottom, the line spacing transitions **from 3 to 10**.

---

# 思路：

## 拆解画面

- 画面的左半边和右半边完全一致
- 构图中有三个区域：
  - 空白区域
    - 不考虑进代码思路
  - 竖纹
    - 为**四个梯形区域**拼接形成
  - 横纹
    - **画布下半部分**与**非梯形区域**的交集
![](https://raw.githubusercontent.com/n3xta/image-hosting/main/img/202410251924687.png)

## 拆解图形

暂时不考虑透视（消失点在画面偏下的位置），Quad A 和 Quad B是等腰梯形（左右两条边平行，为上底下底，上下两条边是腰），且高都为画布width的一半
详见草图
![](https://raw.githubusercontent.com/n3xta/image-hosting/main/img/202410251923062.png)
![](https://raw.githubusercontent.com/n3xta/image-hosting/main/img/202410251923893.png)

## 透视

透视的原理就是缩放y2（梯形的右下角，也就是决定第二条腰的顶点）。给到一个变量，让y2比原先的值高（减去的部分（原本是=y1）少一些），由于y值是从上到下计算的，那么它的坐标就更低了
![](https://raw.githubusercontent.com/n3xta/image-hosting/main/img/202410251932861.png)

## 剪切路径

把画图形的部分建立为新的函数mask，即可在draw主函数中，使用clip（mask），为竖条纹框出一个范围，这个范围就是之前画出的四个梯形。
见：https://p5js.org/reference/p5/clip/

## 线条

### 垂直线
根据 x 所在区域的不同，用map对spacing进行动态调整
- 第一区域：从左侧开始（占1/4），spacing 从 10 逐渐减小到 5.45
- 第二区域：中间部分（占1/2），spacing 从 10 减小到 5.1
- 第三区域：右侧部分（占1/4），spacing 从 10 减小到 5
为了避免线条与剪切区域的边缘产生不规则的断裂

### 水平线

随着 y 坐标从底部向上递增，spacing从3到10之间变化
