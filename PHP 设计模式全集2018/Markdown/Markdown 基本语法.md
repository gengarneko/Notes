# Markdown 基本语法

markdown 是一种纯文本格式的标记语言。通过简单的标记语法，它可以使普通文本内容具有一定的格式。

相比 WYSIWYG （富文本编辑器）有如下**优点**：

- 纯文本，兼容性强，可以用所有文本编辑器打开；
- 使人专注于文本而不是排版；
- 格式转换方便，Markdown 的文本可以轻松转换为 html、电子书等；
- Markdown 的标记语法有极好的可读性。

## 一、标题

在想要设置为标题的文字前面加上 # 来表示。

一个 # 是一级标题， 二个 # 是二级标题，依次类推到六级标题。

**示例：**

```
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题
```



## 二、字体

- **加粗**

  要加粗的文字左右分别用两个 * 号包起来。

- **斜体**

  要倾斜的文字左右分别用一个 * 号包起来。

- **斜体加粗**

  要倾斜的文字左右分别用三个 * 号包起来。

- **删除线**

  要倾斜的文字左右分别用两个 ~ 号包起来。

**示例：**

```
**这是加粗的文字**
*这是倾斜的文字*`
***这是斜体加粗的文字***
~~这是加删除线的文字~~
```



## 三、引用

在引用的文字前面加 > 即可。引用也可以嵌套， 如加两个 >> 三个 >>> ......

**示例：**

```
>这是引用的内容
>>这是引用的内容
>>>>>>>>>>这是引用的内容
```



## 四、分割线

三个或三个以上的 - / * 都可以。

**示例：**

```
---
----
***
*****
```



## 五、图片

**语法：**

```
![图片alt](图片地址 ''图片title'')

图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加
```

**示例：**

```
![blockchain](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=702257389,1274025419&fm=27&gp=0.jpg "区块链")
```

**内链式：**

```
![](./01.png '描述')
```

引用式：

```
![name][01]
[01]: ./01.png '描述'
```



## 六、超链接

**语法：**

```
[超链接名](超链接地址 "超链接title")
title可加可不加
```

**示例：**

```
[简书](http://jianshu.com)
[百度](http://baidu.com)
```

> 注：markdown 语法本身不支持链接在新页面中打开，如果想在新页面中打开可以用 a 标签。

**内链式：**

```
[百度1](http://www.baidu.com" 百度一下"){:target="_blank"}   
```

**引用式：**

```
[百度2][2]{:target="_blank"}
[2]: http://www.baidu.com   "百度二下"
```



## 七、列表

- 无序列表

  **语法：**无序列表用 - + * 任何一种都可以

  ```
  - 列表内容
  + 列表内容
  * 列表内容
  
  注意：- + * 跟内容之间都要有一个空格
  ```

- 有序列表

  **语法：**数字加点

  ```
  1.列表内容
  2.列表内容
  3.列表内容
  
  注意：序号跟内容之间要有空格
  ```

- 嵌套列表  

  上一级和下一级之间敲三个空格即可。



## 八、表格

**语法：**

```
表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

第二行分割表头和内容。
- 有一个就行，为了对齐，多加了几个
文字默认居左
-两边加：表示文字居中
-右边加：表示文字居右
注：原生的语法两边都要用 | 包起来。此处省略
```

| 姓名 | 班级 |
| :--- | ---- |
| 张三 | 151  |
| 李四 | 152  |



## 九、代码

> 注：与上一行距离空一行



**单行代码：**代码之间分别用一个 · 号包起来

```
    `代码内容`
```

**代码块1：** 代码之间分别用三个反引号包起来，且两边的反引号单独占一行

```
​```
<div>   
    <div></div>
    <div></div>
    <div></div>
</div>
​```
```

**代码块2：**自定义语法

```
​```javascript
var num = 0;
for (var i = 0; i < 5; i++) {
    num+=i;
}
console.log(num);
​```
```

```javascript
var num = 0;
for (var i = 0; i < 5; i++) {
    num+=i;
}
console.log(num);
```



## 十、流程图

```
​```flow                     // 流程
st=>start: 开始|past:> http://www.baidu.com // 开始
e=>end: 结束              // 结束
c1=>condition: 条件1:>http://www.baidu.com[_parent]   // 判断条件
c2=>condition: 条件2      // 判断条件
c3=>condition: 条件3      // 判断条件
io=>inputoutput: 输出     // 输出
//----------------以上为定义参数-------------------------

//----------------以下为连接参数-------------------------
// 开始->判断条件1为no->判断条件2为no->判断条件3为no->输出->结束
st->c1(yes,right)->c2(yes,right)->c3(yes,right)->io->e
c1(no)->e                   // 条件1不满足->结束
c2(no)->e                   // 条件2不满足->结束
c3(no)->e                   // 条件3不满足->结束
​```
```

**定义示例：**

```
tag=>type: content:>url         // 形参格式 
st=>start: 开始:>http://www.baidu.com[blank]  //实参格式
```

| 形参    | 实参                          | 含义                          |
| ------- | ----------------------------- | ----------------------------- |
| tag     | st                            | 标签 (可以自定义)             |
| =>      | =>                            | 赋值                          |
| type    | start                         | 类型 (6种类型)                |
| content | 开始                          | 描述内容 (可以自定义)         |
| :>url   | `http://www.baidu.com[blank]` | 链接与跳转方式 **兼容性很差** |

| 6种类型     | 含义   |
| ----------- | ------ |
| start       | 启动   |
| end         | 结束   |
| operation   | 程序   |
| subroutine  | 子程序 |
| condition   | 条件   |
| inputoutput | 输出   |

**连接示例：**

```
st->c1(yes,right)->c2(yes,right)->c3(yes,right)->io->e
开始->判断条件1为no->判断条件2为no->判断条件3为no->输出->结束
```

| 形参          | 实参        | 含义                                                         |
| ------------- | ----------- | ------------------------------------------------------------ |
| ->            | ->          | 连接                                                         |
| condition     | c1          | 条件                                                         |
| (布尔值,方向) | (yes,right) | 如果满足向右连接，4种方向：right ，left，up ，down 默认为：down |

> 注：operation (程序); subroutine (子程序) ;condition (条件)，都可以在括号里加入连接方向。

```
operation(right) 
subroutine(left)
condition(yes,right)    // 只有条件 才能加布尔值
```

代码2

> 注：添加样式和url跳转 需要添加第三方的脚本
> 实际效果很差，使用起来麻烦，意义不大

```
​```flow                             // 流程
st=>start: 启动|past:>http://www.baidu.com[blank] // 开始
e=>end: 结束                      // 结束
op1=>operation: 方案一             // 运算1
sub2=>subroutine: 方案二|approved:>http://www.baidu.com[_parent]  // 运算2
sub3=>subroutine: 重新制定方案        // 运算2
cond1=>condition: 行不行？|request  // 判断条件1
cond2=>condition: 行不行？          // 判断条件2
io=>inputoutput: 结果满意           // 输出

// 开始->方案1->判断条件->
st->op1->cond1
// 判断条件1为no->方案2->判断条件2为no->重新制定方案->方案1
cond1(no,right)->sub2->cond2(no,right)->sub3(right)->op1
cond1(yes)->io->e       // 判断条件满足->输出->结束
cond2(yes)->io->e       // 判断条件满足->输出->结束
​```
```





示例：

```
​```flow
st=>start: 开始
op=>operation: My Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
&```
```

```flow
st=>start: 啦啦啦
op=>operation: My Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
```



## 十一、视频插入

> markdown 语法是不支持直接插入视频的。

第一种：普遍的做法是插入 HTML 的 iframe 框架，通过网站自带的分享功能获取。

> 注：多数第三方平台不支持插入 <iframe> 视频。

```
<iframe height=498 width=510 src='http://player.youku.com/embed/XMjgzNzM0NTYxNg==' frameborder=0 'allowfullscreen'></iframe>
```



第二种：伪造播放界面，实质是插入视频图片，然后通过点击跳转到先关页面。

```
[![](./youku2.png)](http://v.youku.com/v_show/id_XMjgzNzM0NTYxNg==.html?spm=a2htv.20009910.contentHolderUnit2.A&from=y1.3-tv-grid-1007-9910.86804.1-2#paction){:target="_blank"}
```



## 十二、任务列表

> 兼容性一般，要隔开一行。

代码：

```
这是文字……

- [x] 选项一
- [ ] 选项二  
- [ ]  [选项3]
```

- [x] 选项一
- [ ] 选项二  
- [ ] [选项3]



## 十三、表情

> 注：兼容性一般。

[表情代码地址](https://www.webpagefx.com/tools/emoji-cheat-sheet/'GitHub' "表情地址")



## 十四、支持内嵌 CSS 样式

代码：

```css
<p style="color: #AD5D0F;font-size: 30px; font-family: '宋体';">内联样式</p>
```



## 十五、语义标记

| 描述      | 效果          | 代码              |
| --------- | ------------- | ----------------- |
| 斜体      | *斜体*        | `*斜体*`          |
| 斜体      | *斜体*        | `_斜体_`          |
| 加粗      | **加粗**      | `**加粗**`        |
| 加粗+斜体 | **加粗+斜体** | `***加粗+斜体***` |
| 加粗+斜体 | **加粗+斜体** | `**_加粗+斜体_**` |
| 删除线    | ~~删除线~~    | `~~删除线~~`      |



## 十六、语义标签

| 描述     | 效果                                                         | 代码              |
| -------- | ------------------------------------------------------------ | ----------------- |
| 斜体     | <i>斜体</i>                                                  | `<i>斜体</i>`     |
| 加粗     | <b>加粗</b>                                                  | `<b>加粗</b>`     |
| 强调     | <em>强调</em>                                                | `<em>强调</em>`   |
| 上标     | Za                                                           | `Z<sup>a</sup>`   |
| 下标     | Za                                                           | `Z<sub>a</sub>`   |
| 键盘文本 | ![img](https:////upload-images.jianshu.io/upload_images/6912209-9f4177c5bfb69ab0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/47/format/webp) | `<kbd>Ctrl</kbd>` |
| 换行     |                                                              | ``                |



## 十七、格式化文本

保持输入排版格式不变。

> 注：对内含标签需要破坏结构才能显示。

代码：

```
<pre>
hello world 
         hi
  hello world 
</pre>
```

演示：

```
<pre>
    < div>   
        < div>< /div>
        < div>< /div>
        < div>< /div>
    < /div>
</pre>
```

<pre>
    < div>   
        < div>< /div>
        < div>< /div>
        < div>< /div>
    < /div>
</pre>



## 十八、公式

> 注：1 个 $ 左对齐，2 个居中。

代码：

```
$$ x \href{why-equal.html}{=} y^2 + 1 $$
$ x = {-b \pm \sqrt{b^2-4ac} \over 2a}. $
```

$$
x \href{why-equal.html}{=} y^2 + 1
$$


$$
x = {-b \pm \sqrt{b^2-4ac} \over 2a}.
$$


## 十九、脚注 

代码：

```
Markdown[^1]
[^1]: Markdown是一种纯文本标记语言        // 在文章最后面显示脚注
```

Markdown[^1]



## 二十、锚点

> 注：只有标题支持锚点，跳转目录方括号后 保持空格。

代码：

```
[公式标题锚点](#1)

### [需要跳转的目录] {#1}    // 方括号后保持空格
```



## 二十一、定义型列表

> 注：解释型定义

代码：

```
Markdown 
:   轻量级文本标记语言，可以转换成html，pdf等格式  //  开头一个`:` + `Tab` 或 四个空格

代码块定义
:   代码块定义……

        var a = 10;         // 保持空一行与 递进缩进
```



## 二十二、自动邮箱链接

代码：

```
<xxx@outlook.com>
```

<xxx@outlook.com>



## 二十三、时序图

代码1：

```
​```sequence
A->>B: 你好
Note left of A: 我在左边     // 注释方向，只有左右，没有上下
Note right of B: 我在右边
B-->A: 很高兴认识你
​```
```

```sequence
A->>B: 你好
Note left of A: 我在左边     // 注释方向，只有左右，没有上下
Note right of B: 我在右边
B-->A: 很高兴认识你
```

> 注：`A->>B: 你好` 后面可以不写文字，但是一定要在最后加上`：`。

| 符号 | 含义     |
| ---- | -------- |
| `-`  | 实线     |
| `>`  | 实心箭头 |
| `--` | 虚线     |
| `>>` | 空心箭头 |



代码2：

```
​```sequence
起床->吃饭: 稀饭油条
吃饭->上班: 不要迟到了
上班->午餐: 吃撑了
上班->下班:
Note right of 下班: 下班了
下班->回家:
Note right of 回家: 到家了
回家-->>起床:
Note left of 起床: 新的一天
​```
```

```sequence
起床->吃饭: 稀饭油条
吃饭->上班: 不要迟到了
上班->午餐: 吃撑了
上班->下班:
Note right of 下班: 下班了
下班->回家:
Note right of 回家: 到家了
回家-->>起床:
Note left of 起床: 新的一天
```



## 二十四、TOC

> 注：根据标题生成目录，兼容性一般。

代码：`[TOC]`

[TOC]

















## 