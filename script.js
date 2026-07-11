const programs = [
  {
    name: "YsSystemMonitor",
    platform: "mac",
    version: "v1.0",
    image: "assets/YsSystemMonitor-icon.svg",
    summary: "CPU・熱負荷・メモリ使用率をメニューバーで確認できる軽量システムモニターです。",
    tags: ["macOS", "システム監視", "CPU", "メモリ"],
    appStore: "https://apps.apple.com/jp/app/yssystemmonitor/id6779603096"
  },
  {
    name: "YsCL",
    platform: "mac",
    version: "v1.0",
    image: "assets/YsCL-icon.svg",
    summary: "コピーしたテキストを蓄積し、呼び出しキーから素早く選択・ペーストできるクリップボード履歴アプリです。",
    tags: ["macOS", "クリップボード", "履歴", "常駐"],
    availability: "無料公開中"
  },
  {
    name: "YsRadio",
    platform: "mac",
    version: "v1.0",
    image: "assets/YsRadio-icon.png",
    summary: "Macのメニューバーからラジオを再生・停止し、放送局を素早く切り替えられる軽量プレイヤーです。",
    tags: ["macOS", "ラジオ", "メニューバー", "音楽"],
    download: "https://raw.githubusercontent.com/yshinada/macOS/main/downloads/YsRadio-mac.dmg"
  },
  {
    name: "YsPhotoRunner",
    platform: "mac",
    version: "v1.1",
    image: "assets/YsPhotoRunner-icon.png",
    summary: "JPGとRAWデータをEXIF撮影日時で年月フォルダへ整理する写真コピーアプリです。",
    tags: ["macOS", "写真整理", "RAW", "EXIF"],
    appStore: "https://apps.apple.com/jp/app/ysphotorunner/id6778758760"
  },
  {
    name: "YsClock",
    platform: "mac",
    version: "v1.0.0",
    image: "assets/YsClock-icon.svg",
    summary: "デスクトップに置きやすい、シンプルなアナログ時計アプリです。",
    tags: ["macOS", "時計", "ユーティリティ"],
    download: "https://raw.githubusercontent.com/yshinada/macOS/main/downloads/YsClock-1.0.dmg"
  },
  {
    name: "YsBatteryMonitor",
    platform: "mac",
    version: "v1.0.0",
    image: "assets/YsBatteryMonitor-icon.svg",
    summary: "バッテリー状態を見やすく確認するための軽量モニターです。",
    tags: ["macOS", "バッテリー", "常駐"],
    download: "https://github.com/yshinada/web/releases/download/ysbatterymonitor-v1.0.0/YsBatteryMonitor-mac.dmg"
  },
  {
    name: "YsMP3Player",
    platform: "mac",
    version: "v1.0.0",
    image: "assets/YsMP3Player-icon.svg",
    summary: "MP3ファイルやフォルダを開いて、曲名一覧から再生できる軽量プレイヤーです。",
    tags: ["macOS", "MP3", "音楽"],
    download: "https://raw.githubusercontent.com/yshinada/macOS/main/downloads/YsMP3Player-mac.dmg"
  },
  {
    name: "YsCPULoader",
    platform: "mac",
    version: "v1.5",
    image: "assets/YsCPULoader-icon.svg",
    summary: "CPU負荷を調整しながら動作確認できる、テスト用ユーティリティです。",
    tags: ["macOS", "CPU", "テスト"],
    download: "https://raw.githubusercontent.com/yshinada/macOS/main/downloads/YsCPULoader-mac.dmg"
  },
  {
    name: "YsDiskMonitor",
    platform: "mac",
    version: "v1.0.0",
    image: "assets/YsDiskMonitor-icon-v2.svg",
    summary: "ディスク使用率と空き容量をメニューバーで確認できる軽量モニターです。",
    tags: ["macOS", "ディスク", "常駐"],
    appStore: "https://apps.apple.com/jp/app/ysdiskmonitor/id6779870517"
  }
];

const list = document.querySelector("#program-list");
const year = document.querySelector("#year");
const aiDialogue = document.querySelector("#ai-dialogue-content, .ai-raw");
const visitCount = document.querySelector("#visit-count");
const programIntro = document.querySelector(".program-intro");
const counterEndpoint = "https://api.counterapi.dev/v1/yshinada-macos/home-page-views/up";

function createProgramCard(program) {
  const action = program.appStore
    ? `<a class="button primary" href="${program.appStore}" target="_blank" rel="noopener" aria-label="${program.name} ${program.version} をMac App Storeで開く">Mac App Storeで見る</a>`
    : program.download
    ? `<a class="button primary" href="${program.download}" download="${program.download.split("/").pop()}" aria-label="${program.name} ${program.version} をダウンロード">ダウンロード</a>`
    : `<span class="button coming-soon" style="cursor:default;border-color:rgba(33,199,217,.3);color:#b8e9ed;background:rgba(33,199,217,.1)" aria-label="${program.name} ${program.availability}">${program.availability}</span>`;
  const card = document.createElement("article");
  card.className = "program-card";
  card.dataset.platform = program.platform;
  card.innerHTML = `
    <img class="program-icon program-icon-image" src="${program.image}" alt="${program.name} アイコン">
    <div class="program-meta"><span class="pill">Mac</span><span class="pill">${program.version}</span></div>
    <h3>${program.name}</h3>
    <p>${program.summary}</p>
    <div class="tag-row">${program.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}</div>
    <div class="card-actions">${action}</div>`;
  return card;
}

function renderPrograms() {
  list.replaceChildren();
  programs.forEach((program) => list.appendChild(createProgramCard(program)));
}

year.textContent = new Date().getFullYear();
programIntro.textContent = "CPU・熱負荷・メモリを確認できる YsSystemMonitor、写真・RAWデータを撮影日で整理する YsPhotoRunner、ディスク使用率を確認できる YsDiskMonitor はMac App Storeで公開中です。YsCLとYsRadioは無料公開中です。YsClock、YsMP3Player、YsCPULoader などのMac向けフリーソフトも配布しています。";
renderPrograms();

if (visitCount) {
  fetch(counterEndpoint, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Visit counter could not be loaded.");
      return response.json();
    })
    .then((data) => { visitCount.textContent = Number(data.count).toLocaleString("ja-JP"); })
    .catch(() => { visitCount.textContent = "集計中"; });
}

if (aiDialogue) {
  fetch("ai-dialogue.txt", { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) throw new Error("AI dialogue content could not be loaded.");
      return response.text();
    })
    .then((text) => { aiDialogue.textContent = text; })
    .catch(() => { aiDialogue.textContent = "AIとの会話を読み込めませんでした。"; });
}
