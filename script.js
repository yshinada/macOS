const programs = [
  {
    name: "YsClock",
    platform: "mac",
    version: "v1.0.0",
    icon: "YC",
    color: "#0d6f8f",
    summary: "デスクトップに置きやすい、シンプルなアナログ時計アプリです。",
    tags: ["macOS", "時計", "ユーティリティ"],
    download: "https://raw.githubusercontent.com/yshinada/macOS/main/downloads/YsClock-1.0.dmg"
  },
  {
    name: "YsBatteryMonitor",
    platform: "mac",
    version: "v1.0.0",
    icon: "YB",
    color: "#4f7f63",
    summary: "バッテリー状態を見やすく確認するための軽量モニターです。",
    tags: ["macOS", "バッテリー", "常駐"],
    download: "https://github.com/yshinada/web/releases/download/ysbatterymonitor-v1.0.0/YsBatteryMonitor-mac.dmg"
  },
  {
    name: "YsMP3Player",
    platform: "mac",
    version: "v1.0.0",
    icon: "YM",
    color: "#c06a3d",
    summary: "MP3ファイルやフォルダを開いて、曲名一覧から再生できる軽量プレイヤーです。",
    tags: ["macOS", "MP3", "音楽"],
    download: "https://raw.githubusercontent.com/yshinada/macOS/main/downloads/YsMP3Player-mac.dmg"
  },
  {
    name: "YsCPULoader",
    platform: "mac",
    version: "v1.5",
    icon: "YCL",
    color: "#8f5fd7",
    summary: "CPU負荷を調整しながら動作確認できる、テスト用ユーティリティです。",
    tags: ["macOS", "CPU", "テスト"],
    download: "https://raw.githubusercontent.com/yshinada/macOS/main/downloads/YsCPULoader-mac.dmg"
  },
  {
    name: "YsDiskMonitor",
    platform: "mac",
    version: "v1.0.0",
    icon: "YD",
    color: "#2f8d7e",
    summary: "ディスク使用率と空き容量をメニューバーで確認できる軽量モニターです。",
    tags: ["macOS", "ディスク", "常駐"],
    download: "https://raw.githubusercontent.com/yshinada/macOS/main/downloads/YsDiskMonitor-mac.dmg"
  }
];

const list = document.querySelector("#program-list");
const year = document.querySelector("#year");
const aiDialogue = document.querySelector("#ai-dialogue-content, .ai-raw");

function createProgramCard(program) {
  const card = document.createElement("article");
  card.className = "program-card";
  card.dataset.platform = program.platform;
  card.innerHTML = `
    <div class="program-icon" style="--icon-bg: ${program.color}">${program.icon}</div>
    <div class="program-meta">
      <span class="pill">${program.platform === "mac" ? "Mac" : "Windows"}</span>
      <span class="pill">${program.version}</span>
    </div>
    <h3>${program.name}</h3>
    <p>${program.summary}</p>
    <div class="tag-row">
      ${program.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}
    </div>
    <div class="card-actions">
      <a class="button primary" href="${program.download}">ダウンロード</a>
    </div>
  `;
  return card;
}

function renderPrograms() {
  list.replaceChildren();
  programs.forEach((program) => list.appendChild(createProgramCard(program)));
}

year.textContent = new Date().getFullYear();
renderPrograms();

if (aiDialogue) {
  fetch("ai-dialogue.txt", { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("AI dialogue content could not be loaded.");
      }
      return response.text();
    })
    .then((text) => {
      aiDialogue.textContent = text;
    })
    .catch(() => {
      aiDialogue.textContent = "AIとの会話を読み込めませんでした。";
    });
}
