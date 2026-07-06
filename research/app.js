const gold = "#f3c66d";
const bronze = "#a98243";
const cyan = "#64f1df";
const green = "#6ee08c";
const orange = "#f5ad45";
const red = "#e95d45";

const charts = [];

const mock = {
  publications: [
    ["金沙遗址祭祀区再研究", "陈明 / 赵岚", "2026", "文物出版社"],
    ["古蜀文明玉器工艺谱系", "李婧", "2026", "考古学报"],
    ["成都平原青铜礼制观察", "王川 / 周宁", "2026", "四川文物"]
  ],
  projects: [
    ["古蜀文明比较研究", "周宁", "2025-2027", "国家级"],
    ["金沙遗址环境考古", "陈明", "2026-2028", "省部级"],
    ["馆藏玉器数字建模", "李婧", "2026-2026", "馆级"]
  ],
  education: [
    ["博士", 18],
    ["硕士", 36],
    ["本科", 27],
    ["其他", 5]
  ],
  ages: [
    ["30岁以下", 16],
    ["31-40岁", 31],
    ["41-50岁", 25],
    ["50岁以上", 14]
  ],
  conferences: [
    ["古蜀文明与长江上游考古论坛", "主办", "06-18"],
    ["文化遗产数字保护研讨会", "承办", "06-26"],
    ["东亚青铜时代学术圆桌", "参与", "07-03"],
    ["公众考古与博物馆教育讲座", "讲座", "07-12"]
  ],
  awards: [
    ["古蜀文明研究系列成果", "国家级优秀成果奖"],
    ["金沙遗址数字档案平台", "省部级二等奖"],
    ["公众考古课程体系", "市级优秀案例"]
  ],
  resources: [
    ["考古报告", 4820],
    ["文物保护", 3560],
    ["古蜀研究", 3180],
    ["博物馆学", 2860],
    ["数字人文", 2240],
    ["地方文献", 1960]
  ],
  partners: [
    ["四川大学", "古蜀文明联合研究、研究生实践基地"],
    ["中国社科院考古所", "遗址发掘资料整理与课题共建"],
    ["成都文物考古研究院", "区域考古资料共享与联合发表"],
    ["东京国立博物馆", "东亚青铜礼制比较研究"],
    ["电子科技大学", "文物三维建模与数字孪生实验"]
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

function ringOption(data, centerText, colors = [cyan, gold, orange, green, red]) {
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
        avoidLabelOverlap: true,
        label: { show: false },
        itemStyle: {
          borderWidth: 2,
          borderColor: "rgba(0,0,0,.82)"
        },
        data
      }
    ]
  };
}

function item(title, metaLeft, metaRight, extraClass = "") {
  return `
    <div class="item ${extraClass}">
      <strong>${title}</strong>
      <div class="meta-row"><span>${metaLeft}</span><em>${metaRight}</em></div>
    </div>
  `;
}

function renderPublications() {
  document.getElementById("publicationList").innerHTML = mock.publications
    .map(([title, author, year, publisher]) => item(title, author, `${year} · ${publisher}`))
    .join("");
}

function renderProjects() {
  document.getElementById("projectStrip").innerHTML = mock.projects
    .map(
      ([name, owner, period, category]) => `
        <div class="project-card">
          <span class="pill">${category}</span>
          <strong>${name}</strong>
          <div class="meta-row"><span>${owner}</span><em>${period}</em></div>
        </div>
      `
    )
    .join("");
}

function renderBars(targetId, rows) {
  const max = Math.max(...rows.map(([, value]) => value));
  document.getElementById(targetId).innerHTML = rows
    .map(([label, value]) => {
      const percent = Math.round((value / max) * 100);
      return `
        <div class="bar-line">
          <span>${label}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${percent}%"></div></div>
          <em>${value}</em>
        </div>
      `;
    })
    .join("");
}

function renderActivity() {
  document.getElementById("conferenceList").innerHTML = mock.conferences
    .map(([name, type, date]) => item(name, type, date))
    .join("");

  document.getElementById("awardList").innerHTML = mock.awards
    .map(([name, level]) => item(name, "获奖成果", level, "award-level"))
    .join("");
}

function renderResources() {
  const total = mock.resources.reduce((sum, [, value]) => sum + value, 0);
  document.getElementById("resourceBars").innerHTML = mock.resources
    .map(([label, value]) => {
      const percent = Math.round((value / total) * 100);
      return `
        <div class="bar-line">
          <span>${label}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${percent * 2.4}%"></div></div>
          <em>${percent}%</em>
        </div>
      `;
    })
    .join("");
}

function renderPartners() {
  document.getElementById("partnerList").innerHTML = mock.partners
    .map(
      ([name, content]) => `
        <div class="item">
          <span>${name}</span>
          <strong>${content}</strong>
        </div>
      `
    )
    .join("");
}

function initCharts() {
  chart(
    "outcomePie",
    ringOption(
      [
        { name: "出版物", value: 76 },
        { name: "论文", value: 252 }
      ],
      "328",
      [gold, cyan]
    )
  );

  chart(
    "titlePie",
    ringOption(
      [
        { name: "正高", value: 9 },
        { name: "副高", value: 18 },
        { name: "中级", value: 34 },
        { name: "初级", value: 25 }
      ],
      "职称",
      [gold, cyan, green, orange]
    )
  );
}

function boot() {
  updateClock();
  setInterval(updateClock, 1000);
  renderPublications();
  renderProjects();
  renderBars("educationBars", mock.education);
  renderBars("ageBars", mock.ages);
  renderActivity();
  renderResources();
  renderPartners();
  initCharts();
}

window.addEventListener("resize", () => charts.forEach((item) => item.resize()));

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
