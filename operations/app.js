const gold = "#f3c66d";
const bronze = "#a98243";
const cyan = "#64f1df";
const green = "#6ee08c";
const orange = "#f5ad45";
const red = "#e95d45";
const gridText = "#b08a4a";

const charts = [];
const chartMap = {};

const mock = {
  assetCategories: [
    { name: "给排水", value: 286 },
    { name: "空调", value: 428 },
    { name: "消防", value: 512 },
    { name: "配电", value: 306 },
    { name: "电梯", value: 48 },
    { name: "照明", value: 734 },
    { name: "安防", value: 532 }
  ],
  alarmTrend: [16, 23, 19, 28, 18, 25, 22],
  alarmRows: [
    ["紧急", "遗迹馆烟感异常", "消防-03F-112", "待处理", "14:18"],
    ["严重", "恒温空调回风温度偏高", "空调-AHU-07", "处理中", "13:42"],
    ["一般", "南门照明回路离线", "照明-LP-18", "已处理", "12:55"],
    ["提醒", "库房门禁连续开闭", "门禁-AR-26", "已处理", "11:36"],
    ["严重", "配电柜电流波动", "配电-PD-05", "处理中", "10:24"],
    ["一般", "给排水液位传感器离线", "给排水-WP-09", "已处理", "09:58"]
  ],
  maintenanceRows: [
    ["恒温空调 AHU-07", "维保到期", "遗迹馆", "2026-07-12", "待派单"],
    ["消防泵 FP-02", "年检到期", "设备间", "2026-07-15", "计划中"],
    ["门禁 AR-26", "维保到期", "库房", "2026-07-18", "待确认"],
    ["配电柜 PD-05", "年检到期", "陈列馆", "2026-07-21", "已预约"],
    ["电梯 EL-02", "维保到期", "游客中心", "2026-07-24", "计划中"]
  ],
  alarmRanges: {
    今日: { total: 126, pending: 9, running: 8, done: 109 },
    本周: { total: 684, pending: 31, running: 24, done: 629 },
    本月: { total: 2680, pending: 86, running: 73, done: 2521 }
  },
  securityAlarmRanges: {
    近7日: {
      total: 53,
      categories: [
        { name: "视频故障", value: 18 },
        { name: "入侵报警", value: 7 },
        { name: "消防烟感", value: 5 },
        { name: "非法开门", value: 9 },
        { name: "设备故障", value: 11 },
        { name: "人工求助", value: 3 }
      ],
      timely: [87, 9, 4]
    },
    近30日: {
      total: 216,
      categories: [
        { name: "视频故障", value: 64 },
        { name: "入侵报警", value: 31 },
        { name: "消防烟感", value: 18 },
        { name: "非法开门", value: 42 },
        { name: "设备故障", value: 49 },
        { name: "人工求助", value: 12 }
      ],
      timely: [82, 13, 5]
    },
    近半年: {
      total: 1248,
      categories: [
        { name: "视频故障", value: 328 },
        { name: "入侵报警", value: 196 },
        { name: "消防烟感", value: 86 },
        { name: "非法开门", value: 214 },
        { name: "设备故障", value: 356 },
        { name: "人工求助", value: 68 }
      ],
      timely: [79, 15, 6]
    }
  }
};

function updateClock() {
  const now = new Date();
  const dateText = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
  const timeText = now.toLocaleTimeString("zh-CN", { hour12: false });
  document.getElementById("dateText").textContent = dateText;
  document.getElementById("timeText").textContent = timeText;
}

function chart(id, option) {
  const el = document.getElementById(id);
  if (!el || !window.echarts) return null;
  const instance = echarts.init(el);
  instance.setOption(option);
  charts.push(instance);
  chartMap[id] = instance;
  return instance;
}

function baseText(size = 10) {
  return {
    color: gridText,
    fontSize: size,
    fontFamily: "Microsoft YaHei, PingFang SC, Arial"
  };
}

function linearGradient(x0, y0, x1, y1, stops, fallback) {
  if (!window.echarts) return fallback;
  return new echarts.graphic.LinearGradient(x0, y0, x1, y1, stops);
}

function ringOption(data, centerText, colors = [cyan, gold, orange, green, red]) {
  return {
    color: colors,
    tooltip: { trigger: "item" },
    title: {
      text: centerText,
      left: "center",
      top: "42%",
      textStyle: { color: "#fff0bd", fontSize: 14, fontWeight: 700 },
      subtextStyle: { color: bronze, fontSize: 10 }
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

function barOption(labels, values, color = cyan, horizontal = false) {
  const axisLabel = baseText(9);
  const axisLine = { lineStyle: { color: "rgba(207,158,70,.25)" } };
  const splitLine = { lineStyle: { color: "rgba(207,158,70,.12)", type: "dashed" } };
  return {
    grid: { left: horizontal ? 54 : 28, right: 8, top: 18, bottom: horizontal ? 10 : 28 },
    tooltip: { trigger: "axis" },
    xAxis: horizontal
      ? { type: "value", axisLabel, axisLine, splitLine }
      : { type: "category", data: labels, axisLabel: { ...axisLabel, interval: 0 }, axisLine, axisTick: { show: false } },
    yAxis: horizontal
      ? { type: "category", data: labels, axisLabel, axisLine, axisTick: { show: false } }
      : { type: "value", axisLabel, axisLine, splitLine },
    series: [
      {
        type: "bar",
        data: values,
        barWidth: horizontal ? 8 : 10,
        itemStyle: {
          color: linearGradient(
            horizontal ? 1 : 0,
            horizontal ? 0 : 1,
            0,
            0,
            [
              { offset: 0, color },
              { offset: 1, color: "rgba(255,255,255,.16)" }
            ],
            color
          ),
          borderRadius: horizontal ? [0, 8, 8, 0] : [8, 8, 0, 0]
        }
      }
    ]
  };
}

function lineOption(labels, values, color = gold) {
  return {
    grid: { left: 28, right: 10, top: 16, bottom: 22 },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: labels,
      boundaryGap: false,
      axisLabel: baseText(9),
      axisLine: { lineStyle: { color: "rgba(207,158,70,.25)" } },
      axisTick: { show: false }
    },
    yAxis: {
      type: "value",
      axisLabel: baseText(9),
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "rgba(207,158,70,.12)", type: "dashed" } }
    },
    series: [
      {
        type: "line",
        smooth: true,
        data: values,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { width: 2, color },
        itemStyle: { color: "#fff2be", borderColor: color, borderWidth: 2 },
        areaStyle: {
          color: linearGradient(
            0,
            0,
            0,
            1,
            [
              { offset: 0, color: "rgba(243,198,109,.38)" },
              { offset: 1, color: "rgba(243,198,109,0)" }
            ],
            "rgba(243,198,109,.18)"
          )
        }
      }
    ]
  };
}

function renderAlarmTable(category = "全部") {
  const alarmHead = ["级别", "告警信息", "告警设备", "状态", "时间"];
  const levelClass = { 紧急: "urgent", 严重: "serious", 一般: "normal", 提醒: "normal" };
  const categoryMatch = {
    全部: () => true,
    空调: (row) => row.join("").includes("空调"),
    消防: (row) => row.join("").includes("消防"),
    配电: (row) => row.join("").includes("配电"),
    安防: (row) => row.join("").includes("门禁") || row.join("").includes("安防")
  };
  const rows = mock.alarmRows.filter(categoryMatch[category] || categoryMatch["全部"]);
  document.getElementById("alarmTable").innerHTML = [
    `<div class="table-head">${alarmHead.map((item) => `<span>${item}</span>`).join("")}</div>`,
    ...rows.map((row) => {
      const first = `<span><i class="level ${levelClass[row[0]]}">${row[0]}</i></span>`;
      return `<div class="table-row">${first}${row.slice(1).map((item) => `<span>${item}</span>`).join("")}</div>`;
    }),
    rows.length ? "" : `<div class="table-row empty-row"><span>暂无 ${category} 告警</span></div>`
  ].join("");
}

function renderMaintenanceTable() {
  const maintenanceHead = ["设备", "类型", "位置", "到期日", "状态"];
  document.getElementById("maintenanceTable").innerHTML = [
    `<div class="table-head">${maintenanceHead.map((item) => `<span>${item}</span>`).join("")}</div>`,
    ...mock.maintenanceRows.map((row) => `<div class="table-row">${row.map((item) => `<span>${item}</span>`).join("")}</div>`)
  ].join("");
}

function updateAlarmRange(range) {
  const next = mock.alarmRanges[range];
  if (!next) return;
  const labels = [
    ["总数", next.total],
    ["待处理", next.pending],
    ["处理中", next.running],
    ["已处理", next.done]
  ];
  document.querySelector(".alarm-list-panel .status-strip").innerHTML = labels
    .map(([label, value]) => `<span>${label} <b>${value}</b></span>`)
    .join("");
}

function updateSecurityAlarmRange(range) {
  const next = mock.securityAlarmRanges[range];
  if (!next) return;
  chartMap.securityAlarmPie?.setOption(ringOption(next.categories, String(next.total), [cyan, red, orange, gold, green, "#8ab6ff"]), true);
  chartMap.timelyRateBar?.setOption(barOption(["按时完成", "超时完成", "严重超时"], next.timely, cyan, true), true);
}

function initCharts() {
  chart("assetPie", ringOption(mock.assetCategories, "2,846"));
  chart(
    "assetBar",
    barOption(
      mock.assetCategories.map((item) => item.name),
      mock.assetCategories.map((item) => item.value),
      gold
    )
  );

  chart("alarmTrend", lineOption(["08", "10", "12", "14", "16", "18", "20"], mock.alarmTrend));

  chart(
    "securityStatusPie",
    ringOption(
      [
        { name: "在线", value: 639 },
        { name: "离线", value: 13 },
        { name: "告警", value: 9 }
      ],
      "96.7%",
      [cyan, bronze, red]
    )
  );

  chart(
    "energySpaceBar",
    barOption(["遗迹馆", "陈列馆", "库房", "南门", "东门"], [4680, 3920, 2160, 1120, 960], cyan)
  );

  chart(
    "energyFunctionPie",
    ringOption(
      [
        { name: "恒温空调", value: 42 },
        { name: "照明", value: 21 },
        { name: "安防弱电", value: 18 },
        { name: "办公", value: 9 },
        { name: "动力", value: 10 }
      ],
      "功能",
      [gold, cyan, green, orange, red]
    )
  );

  chart("waterBar", barOption(["生活", "消防", "空调", "园林"], [486, 162, 238, 400], green));
  chart("energyCompareLine", lineOption(["2月", "3月", "4月", "5月", "6月", "7月"], [19.6, 18.9, 18.4, 18.1, 17.8, 18.42], cyan));

  chart(
    "accessPie",
    ringOption(
      [
        { name: "在线", value: 124 },
        { name: "离线", value: 4 }
      ],
      "96.9%",
      [cyan, red]
    )
  );

  chart(
    "maintenancePie",
    ringOption(
      [
        { name: "维保到期", value: 22 },
        { name: "年检到期", value: 14 },
        { name: "巡检异常", value: 5 }
      ],
      "36",
      [gold, cyan, red]
    )
  );

  chart(
    "securityAlarmPie",
    ringOption(
      mock.securityAlarmRanges["近7日"].categories,
      String(mock.securityAlarmRanges["近7日"].total),
      [cyan, red, orange, gold, green, "#8ab6ff"]
    )
  );

  chart(
    "timelyRateBar",
    barOption(["按时完成", "超时完成", "严重超时"], [87, 9, 4], cyan, true)
  );
}

function activateButton(group, button) {
  group.querySelectorAll("button").forEach((item) => {
    item.classList.toggle("active", item === button);
    item.setAttribute("aria-pressed", item === button ? "true" : "false");
  });
}

function wireMockControls() {
  document.querySelectorAll(".switch-row button, .tabs button").forEach((button) => {
    button.setAttribute("type", "button");
    button.setAttribute("aria-pressed", button.classList.contains("active") ? "true" : "false");
  });

  document.querySelector(".alarm-list-panel .switch-row")?.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    activateButton(event.currentTarget, button);
    updateAlarmRange(button.textContent.trim());
  });

  document.querySelector(".alarm-list-panel .tabs")?.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    activateButton(event.currentTarget, button);
    renderAlarmTable(button.textContent.trim());
  });

  document.querySelector(".security-alarm-panel .switch-row")?.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    activateButton(event.currentTarget, button);
    updateSecurityAlarmRange(button.textContent.trim());
  });
}

function boot() {
  updateClock();
  setInterval(updateClock, 1000);
  renderAlarmTable();
  renderMaintenanceTable();
  initCharts();
  wireMockControls();
}

window.addEventListener("resize", () => charts.forEach((item) => item.resize()));

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
