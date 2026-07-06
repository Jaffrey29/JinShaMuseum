# 金沙遗址博物馆大屏预览

这个分支用于同时预览多张 32:9 大屏页面。每张表仍保留独立开发分支；预览分支把已完成页面汇总到不同 URL 分段。

## 本地预览

```bash
python3 -m http.server 4173
```

- 入口页: `http://localhost:4173/`
- 运维页: `http://localhost:4173/operations/`
- 研究页: `http://localhost:4173/research/`

## 分支约定

- `运维`: 运维指标页面独立分支
- `研究`: 研究页面独立分支
- `预览`: 多页面聚合预览分支
