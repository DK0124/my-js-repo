const stationsData = {
    "台北市": {
        "士林區": ["台北兒童新樂園", "士林戲曲中心"],
        "松山區": ["台北體育館", "台北網球場"]
    },
    "新北市": {
        "新莊區": ["新北產業園", "新莊民安國小"],
        "板橋區": ["板橋忠孝國中", "板橋五權公園", "板橋民生"]
    },
    "桃園市": {
        "桃園區": ["桃園花市", "桃園藝文南"],
        "中壢區": ["中壢中央"]
    },
    "台中市": {
        "北區": ["台中體大羽球館", "北區中賓"],
        "西屯區": ["西屯仕康家", "台中國家歌劇院"]
    },
    "高雄市": {
        "鼓山區": ["鼓山站"],
        "左營區": ["高雄龍江公園"]
    }
};

function nextStep() {
    document.getElementById("step-1").classList.remove("active");
    document.getElementById("step-2").classList.add("active");
    document.getElementById("step-title").innerText = "請選擇五個以內的站點";
}

function prevStep() {
    document.getElementById("step-2").classList.remove("active");
    document.getElementById("step-1").classList.add("active");
    document.getElementById("step-title").innerText = "留下您的聯絡資料";
}

function updateRegions() {
    const city = document.getElementById("city").value;
    const regionSelect = document.getElementById("region");
    regionSelect.innerHTML = '<option value="">選擇區域</option>';
    if (stationsData[city]) {
        for (let region in stationsData[city]) {
            regionSelect.innerHTML += `<option value="${region}">${region}</option>`;
        }
    }
    updateStations();
}

function updateStations() {
    const city = document.getElementById("city").value;
    const region = document.getElementById("region").value;
    const stationSelect = document.getElementById("station");
    stationSelect.innerHTML = '<option value="">選擇站點</option>';
    if (stationsData[city] && stationsData[city][region]) {
        stationsData[city][region].forEach(station => {
            stationSelect.innerHTML += `<option value="${station}">${station}</option>`;
        });
    }
}

function addStation() {
    const station = document.getElementById("station").value;
    if (document.getElementById("selected-stations").childElementCount >= 5) {
        alert("已選滿五個站點");
        return;
    }
    if (station && !document.getElementById(`selected-${station}`)) {
        const div = document.createElement("div");
        div.className = "selected-station";
        div.id = `selected-${station}`;
        div.innerHTML = `${station} <button onclick="removeStation('${station}')">刪除</button>`;
        document.getElementById("selected-stations").appendChild(div);
    }
}

function removeStation(station) {
    const div = document.getElementById(`selected-${station}`);
    if (div) {
        div.remove();
    }
}

function submitForm() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const stations = Array.from(document.getElementById("selected-stations").children).map(stationDiv => stationDiv.id.replace("selected-", ""));
    if (!name || !phone || !email) {
        alert("請填寫所有必填欄位");
        return;
    }
    if (stations.length === 0) {
        alert("請選擇至少一個站點");
        return;
    }
    alert("表單已提交！");
    // Here you would add the code to send the form data to Google Forms or another backend
}

document.addEventListener("DOMContentLoaded", () => {
    const citySelect = document.getElementById("city");
    for (let city in stationsData) {
        citySelect.innerHTML += `<option value="${city}">${city}</option>`;
    }
});
