# Edit-Your-Interest — Project Page

论文 **Edit-Your-Interest: Efficient Video Editing via Feature Most-Similar Propagation** 的静态项目主页。使用 HTML、CSS 和原生 JavaScript，无需安装依赖或构建。

## 本地查看

直接在浏览器中打开 `index.html`，或在仓库目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 填写编辑 prompt

编辑 `results.js`，将对应 case 的 `prompt: ""` 替换为你的文字：

```javascript
{ id: "01", prompt: "在这里填写实际的英文编辑 prompt", /* 保留其余视频路径 */ }
```

每个 prompt 显示在对应的原视频/编辑视频对上方。空字符串显示预留文字 `Your editing prompt here.`。这是源码配置，修改、保存并刷新后生效；页面不会将输入保存到服务器。

使用 `原 prompt → 编辑后的 prompt` 格式时，页面会自动比较两侧词语：原词显示为橘色，修改后的词显示为红色，共同的开头和结尾保持普通文字。例如 `a white flamingo → a red flamingo` 会将 `white` 标橘色、`red` 标红色。没有箭头的 prompt 按普通文字显示。

新增视频对时，在 `results.js` 复制一项并修改 `id`、`prompt`、视频路径和封面路径。同一原视频的多个编辑结果也可以各添加一项。

## 文件位置

- `index.html`：论文标题、作者、方法简介和引用。
- `styles.css`：页面样式和手机布局。
- `app.js`：视频对播放控制和引用复制。
- `results.js`：6 组视频的路径与编辑 prompt。
- `demos/demo.mp4`：主视频。
- `demos/Piplines.png`：框架图，保留原始文件名及大小写。
- `demos/more_results/1` 至 `6`：各组 `raw.mp4` / `edit.mp4`。
- `assets/posters/`：从原视频提取的封面，避免首次访问下载所有视频。
- `assets/paper.pdf`：从提供的论文目录复制的 `r5_manuscript.pdf`，保留为本地副本；页面中的论文链接指向 https://arxiv.org/abs/2510.13084。

“Play pair” 同时播放、同步并循环该组视频；“Restart” 从头播放。每个视频也有独立的原生播放控件。Case 02 的原视频为 5 秒，编辑视频为 3.2 秒，因此成对播放会按较短视频的 3.2 秒循环；独立播放可查看完整原视频。切换到其他 case、离开当前视频组或隐藏页面时，会暂停播放。

主页的 arxiv 按钮指向 https://arxiv.org/abs/2510.13084，Pattern Recognition 按钮指向 https://www.sciencedirect.com/science/article/pii/S0031320326020777，Code 按钮指向 https://github.com/yiiizuo/Edit-Your-Interest。BibTeX 仅保留提供的 Pattern Recognition 期刊 `@article` 引用，引用键为 `ZUO2027115113`，年份为 2027；需要更新时请编辑 `index.html`。

## GitHub Pages

页面文件已放在仓库根目录，适合此 `edit-your-interest.github.io` 仓库。推送这些文件后，在仓库的 **Settings → Pages** 选择 **Deploy from a branch**，并选择包含页面的分支和 **/ (root)**。

无需 npm、打包步骤或额外后端。本次创建仅修改本地文件，没有自动提交、推送或发布。
