const API_URL = "https://TEN-WORKER-CUA-BAN.workers.dev";

const matches = [
  {
    home:"Germany",
    away:"Curacao",
    date:"14/06/2026",
    group:"Group E",
    score:"-",
    status:"Scheduled"
  },
  {
    home:"Netherlands",
    away:"Japan",
    date:"14/06/2026",
    group:"Group F",
    score:"-",
    status:"Scheduled"
  },
  {
    home:"Ivory Coast",
    away:"Ecuador",
    date:"14/06/2026",
    group:"Group E",
    score:"-",
    status:"Scheduled"
  },
  {
    home:"Sweden",
    away:"Tunisia",
    date:"14/06/2026",
    group:"Group F",
    score:"-",
    status:"Scheduled"
  }
];

function showTab(id){
  document.querySelectorAll(".tab").forEach(tab=>{
    tab.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

function loadMatches(){
  const matchList = document.getElementById("matchList");
  const resultList = document.getElementById("resultList");

  matchList.innerHTML = "";
  resultList.innerHTML = "";

  matches.forEach(match=>{
    const html = `
      <div class="card">
        <h3>${match.home} vs ${match.away}</h3>
        <p><b>Ngày:</b> ${match.date}</p>
        <p><b>Bảng:</b> ${match.group}</p>
        <p><b>Tỷ số:</b> ${match.score}</p>
        <p><b>Trạng thái:</b> ${match.status}</p>
        <button onclick="quickAnalyze('${match.home}','${match.away}')">
          🤖 AI dự đoán
        </button>
      </div>
    `;

    matchList.innerHTML += html;

    if(match.status !== "Scheduled"){
      resultList.innerHTML += html;
    }
  });

  if(resultList.innerHTML === ""){
    resultList.innerHTML = "<p>Chưa có kết quả.</p>";
  }
}

function quickAnalyze(home, away){
  showTab("ai");

  document.getElementById("homeTeam").value = home;
  document.getElementById("awayTeam").value = away;

  analyzeMatch();
}

async function analyzeMatch(){
  const home = document.getElementById("homeTeam").value.trim();
  const away = document.getElementById("awayTeam").value.trim();
  const box = document.getElementById("aiResult");

  if(!home || !away){
    box.innerHTML = "Vui lòng nhập đủ 2 đội.";
    return;
  }

  box.innerHTML = "🤖 AI đang phân tích...";

  try{
    const res = await fetch(API_URL + "/predict", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        home:home,
        away:away
      })
    });

    const data = await res.json();

    box.innerHTML = data.result;

  }catch(error){
    box.innerHTML =
      "Chưa kết nối AI Backend. Bạn cần tạo Cloudflare Worker ở bước tiếp theo.";
  }
}

loadMatches();
