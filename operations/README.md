# 金沙遗址博物馆综合运营平台大屏

32:9 静态可视化大屏原型，基于 `运维指标.xlsx` 中的指标层级制作，图表使用 ECharts，数据为 mock 数据。

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

- `index.html`: 大屏结构和面板层级
- `styles.css`: 32:9 画布、黑金视觉、面板样式
- `app.js`: mock 数据、列表渲染、ECharts 配置
- `assets/prototype-reference.png`: 原型参考图
- `assets/ruins-panorama.png`: 从原型图裁切出的中央数字孪生背景
