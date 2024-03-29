
# 图片

## URL

URL是uniform resource locator的缩写，在web中的每一个可访问资源都有一个URL地址，例如图片，HTML文件，js文件以及style sheet文件，我们可以通过这个地址去download这个资源。

## dataURI

<https://segmentfault.com/a/1190000009692722>

Data URI是由RFC 2397定义的一种把小文件直接嵌入文档的方案。格式如下：

```
data:[<MIME type>][;charset=<charset>][;base64],<encoded data>
```

## png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过 webp

（1）BMP，是无损的、既支持索引色也支持直接色的、点阵图。这种图片格式几乎没有对数据进行压缩，所以BMP格式的图片通常具有较大的文件大小。

（2）GIF是无损的、采用索引色的、点阵图。采用LZW压缩算法进行编码。文件小，是GIF格式的优点，同时，GIF格式还具有支持动画以及透明的优点。但，GIF格式仅支持8bit的索引色，所以GIF格式适用于对色彩要求不高同时需要文件体积较小的场景。

（3）JPEG是有损的、采用直接色的、点阵图。JPEG的图片的优点，是采用了直接色，得益于更丰富的色彩，JPEG非常适合用来存储照片，与GIF相比，JPEG不适合用来存储企业Logo、线框类的图。因为有损压缩会导致图片模糊，而直接色的选用，又会导致图片文件较GIF更大。

（4）PNG-8是无损的、使用索引色的、点阵图。PNG是一种比较新的图片格式，PNG-8是非常好的GIF格式替代者，在可能的情况下，应该尽可能的使用PNG-8而不是GIF，因为在相同的图片效果下，PNG-8具有更小的文件体积。除此之外，PNG-8还支持透明度的调节，而GIF并不支持。现在，除非需要动画的支持，否则我们没有理由使用GIF而不是PNG-8。

（5）PNG-24是无损的、使用直接色的、点阵图。PNG-24的优点在于，它压缩了图片的数据，使得同样效果的图片，PNG-24格式的文件大小要比BMP小得多。当然，PNG24的图片还是要比JPEG、GIF、PNG-8大得多。

（6）SVG是无损的、矢量图。SVG是矢量图。这意味着SVG图片由直线和曲线以及绘制它们的方法组成。当你放大一个SVG图片的时候，你看到的还是线和曲线，而不会出现像素点。这意味着SVG图片在放大时，不会失真，所以它非常适合用来绘制企业Logo、Icon等。

（7）WebP是谷歌开发的一种新图片格式，WebP是同时支持有损和无损压缩的、使用直接色的、点阵图。从名字就可以看出来它是为Web而生的，什么叫为Web而生呢？就是说相同质量的图片，WebP具有更小的文件体积。现在网站上充满了大量的图片，如果能够降低每一个图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量，进而降低访问延迟，提升访问体验。

•在无损压缩的情况下，相同质量的WebP图片，文件大小要比PNG小26%；

•在有损压缩的情况下，具有相同图片精度的WebP图片，文件大小要比JPEG小25%~34%；

•WebP图片格式支持图片透明度，一个无损压缩的WebP图片，如果要支持透明度只需要22%的格外文件大小。

但是目前只有Chrome浏览器和Opera浏览器支持WebP格式，兼容性不太好。

## 图片操作库

html2canvas: 28k

sharp 库: 压缩图片，修改图片滤镜等等

AlloyImage： 图像处理开源引擎 3k

cropperjs: 图片裁剪  12k

PhotoSwipe: 图片查看 23k

## pdf操作库

pdfmake: 读写编辑 10k

jsPDF: 27k

## html2canvas

[揭秘 html2Canvas：打印高清 PDF 的原理解析](https://juejin.cn/post/7256306281538748477?searchId=20230720104942D37FB8E0ADBD5FE02929)

```
const element = document.getElementById('testprint');
      console.log(element.scrollHeight);
      html2canvas(element, {
        // windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        windowWidth: 1700,
        // windowHeight: 800,
      }).then((canvas) => {
        document.body.appendChild(canvas);
      });
```
