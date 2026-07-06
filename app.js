const gold = "#f3c66d";
const cyan = "#64f1df";
const green = "#6ee08c";
const orange = "#f5ad45";
const red = "#e95d45";
const muted = "#a98243";

const charts = [];

const mock = {
  platforms: [
    { name: "官网", follow: 18, browse: 42, like: 6, collect: 4, comment: 2, forward: 3 },
    { name: "微信公众号", follow: 36, browse: 86, like: 21, collect: 14, comment: 8, forward: 12 },
    { name: "小红书", follow: 22, browse: 74, like: 24, collect: 18, comment: 11, forward: 9 },
    { name: "微博", follow: 28, browse: 96, like: 31, collect: 9, comment: 16, forward: 22 },
    { name: "抖音", follow: 25, browse: 128, like: 48, collect: 20, comment: 17, forward: 26 },
    { name: "视频号", follow: 19, browse: 60, like: 18, collect: 8, comment: 7, forward: 10 }
  ],
  topics: [
    ["太阳神鸟数字展", 98],
    ["金沙夜游开放", 91],
    ["古蜀文明上新", 86],
    ["考古盲盒体验", 78],
    ["文创联名发布", 72]
  ],
  reports: [
    ["央视新闻", "金沙夜游开放", "阅读 86万"],
    ["新华社", "古蜀文明专题报道", "转发 1.8万"],
    ["四川日报", "文博融合新实践", "阅读 42万"],
    ["成都发布", "暑期研学路线", "收藏 3.1万"]
  ],
  regions: [
    ["成都", 36],
    ["四川省内", 24],
    ["华东", 16],
    ["华北", 12],
    ["海外", 5]
  ],
  interests: ["古蜀文明", "考古", "亲子研学", "文创", "历史", "博物馆", "摄影", "夜游", "非遗", "城市文化"],
  risks: [
    ["低", "门票预约咨询集中", "已回应"],
    ["中", "夜游排队时长讨论", "跟进中"],
    ["低", "文创补货反馈", "已分派"],
    ["高", "冒名票务链接传播", "预警"]
  ],
  campaigns: [
    ["03-21", "金沙太阳节春季传播", "微信 / 微博", "阅读 126万 / 转发 2.6万"],
    ["04-18", "国际博物馆日联动", "官网 / 视频号", "浏览 88万 / 收藏 8.4万"],
    ["05-30", "儿童节考古体验营", "小红书 / 抖音", "点赞 21万 / 评论 1.3万"],
    ["06-12", "文创联名新品发布", "微博 / 抖音", "转发 3.2万 / 成交线索 9千"],
    ["07-01", "暑期研学季专题", "全平台", "阅读 168万 / 预约 4.6万"]
  ]
};

function updateClock() {
  const now = new Date();
  document.getElementById("dateText").textContent = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
  document.getElementById("timeText").textContent = now.toLocaleTimeString("zh-CN", { hour12: false });
}

function chart(id, option) {
  const el = document.getElementById(id);
  if (!el || !window.echarts) return null;
  const instance = echarts.init(el);
  instance.setOption(option);
  charts.push(instance);
  return instance;
}

function baseAxis() {
  return {
    axisLabel: { color: muted, fontSize: 9 },
    axisLine: { lineStyle: { color: "rgba(207,158,70,.25)" } },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: "rgba(207,158,70,.12)", type: "dashed" } }
  };
}

function ringOption(data, centerText, colors) {
  return {
    color: colors,
    tooltip: { trigger: "item" },
    title: {
      text: centerText,
      left: "center",
      top: "40%",
      textStyle: { color: "#fff0bd", fontSize: 14, fontWeight: 700 }
    },
    series: [
      {
        type: "pie",
        radius: ["54%", "74%"],
        center: ["50%", "52%"],
        label: { show: false },
        itemStyle: { borderWidth: 2, borderColor: "rgba(0,0,0,.82)" },
        data
      }
    ]
  };
}

function renderPlatformList() {
  document.getElementById("platformList").innerHTML = mock.platforms
    .slice(1, 5)
    .map(
      (item) => `
        <div class="item">
          <strong>${item.name}</strong>
          <div class="meta-row"><span>关注 ${item.follow}.0万</span><em>互动 ${item.like + item.collect + item.comment + item.forward}.0万</em></div>
        </div>
      `
    )
    .join("");
}

function renderTopics() {
  document.getElementById("topicList").innerHTML = mock.topics
    .map(
      ([name, heat], index) => `
        <div class="item">
          <span class="rank">${index + 1}</span>
          <strong>${name}</strong>
          <em>${heat}</em>
        </div>
      `
    )
    .join("");
}

function renderReports() {
  document.getElementById("reportList").innerHTML = mock.reports
    .map(
      ([media, event, effect]) => `
        <div class="item">
          <strong>${event}</strong>
          <div class="meta-row"><span>${media}</span><em>${effect}</em></div>
        </div>
      `
    )
    .join("");
}

function renderBars(id, rows) {
  const max = Math.max(...rows.map(([, value]) => value));
  document.getElementById(id).innerHTML = rows
    .map(([label, value]) => {
      const width = Math.round((value / max) * 100);
      return `
        <div class="bar-line">
          <span>${label}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
          <em>${value}%</em>
        </div>
      `;
    })
    .join("");
}

function renderTags() {
  document.getElementById("interestTags").innerHTML = mock.interests.map((tag) => `<span>${tag}</span>`).join("");
}

function renderRisks() {
  const levelClass = { 高: "risk-high", 中: "risk-mid", 低: "risk-low" };
  document.getElementById("riskList").innerHTML = mock.risks
    .map(
      ([level, title, status]) => `
        <div class="item">
          <span class="risk-level ${levelClass[level]}">${level}</span>
          <strong>${title}</strong>
          <em>${status}</em>
        </div>
      `
    )
    .join("");
}

function renderCampaigns() {
  document.getElementById("campaignList").innerHTML = mock.campaigns
    .map(
      ([time, event, channel, effect]) => `
        <div class="item">
          <span>${time}</span>
          <strong>${event}<br><em>${channel}</em></strong>
          <em>${effect}</em>
        </div>
      `
    )
    .join("");
}

function initCharts() {
  const axis = baseAxis();
  chart("platformBar", {
    color: [cyan, gold, green, orange, red],
    tooltip: { trigger: "axis" },
    legend: {
      top: 0,
      right: 0,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: muted, fontSize: 9 }
    },
    grid: { left: 28, right: 8, top: 34, bottom: 24 },
    xAxis: { type: "category", data: mock.platforms.map((item) => item.name), ...axis, axisLabel: { color: muted, fontSize: 9, interval: 0 } },
    yAxis: { type: "value", ...axis },
    series: [
      ["关注", "follow"],
      ["浏览", "browse"],
      ["点赞", "like"],
      ["收藏", "collect"],
      ["评论转发", "comment"]
    ].map(([name, key]) => ({
      name,
      type: "bar",
      barWidth: 8,
      data: mock.platforms.map((item) => item[key]),
      itemStyle: { borderRadius: [6, 6, 0, 0] }
    }))
  });

  chart(
    "agePie",
    ringOption(
      [
        { name: "18-24岁", value: 24 },
        { name: "25-34岁", value: 42 },
        { name: "35-44岁", value: 23 },
        { name: "45岁以上", value: 11 }
      ],
      "年龄",
      [cyan, gold, green, orange]
    )
  );

  chart(
    "sentimentPie",
    ringOption(
      [
        { name: "正向", value: 72 },
        { name: "中性", value: 25.6 },
        { name: "负面", value: 2.4 }
      ],
      "2.4%",
      [green, gold, red]
    )
  );
}

function boot() {
  updateClock();
  setInterval(updateClock, 1000);
  renderPlatformList();
  renderTopics();
  renderReports();
  renderBars("regionBars", mock.regions);
  renderTags();
  renderRisks();
  renderCampaigns();
  initCharts();
}

window.addEventListener("resize", () => charts.forEach((item) => item.resize()));

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
