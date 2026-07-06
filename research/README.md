# 金沙遗址博物馆研究专题平台

32:9 静态可视化大屏原型，基于“研究”表格中的指标层级制作。页面固定为 `2560 x 720` 逻辑画布，内容使用 mock 数据；图表只在成果分类、职称分布等比例关系明确的区域使用 ECharts，其余信息使用数字卡片、列表和进度条展示。

## 运行

当前目录启动静态服务：

```bash
python3 -m http.server 4173
```

浏览器打开：

```text
http://localhost:4173/
```

## 文件

- `index.html`: 研究专题大屏结构
- `styles.css`: 32:9 固定画布、黑金学术视觉、面板样式
- `app.js`: mock 数据、列表渲染、ECharts 配置
- `assets/ruins-panorama.png`: 中央数字孪生研究区背景
