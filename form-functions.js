document.addEventListener("DOMContentLoaded", function () {
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const nextButton = document.getElementById("next-button");
  const backButton = document.getElementById("back-button");
  const addSiteButton = document.getElementById("add-site-button");
  const submitButton = document.getElementById("submit-button");
  const countySelect = document.getElementById("county");
  const districtSelect = document.getElementById("district");
  const siteSelect = document.getElementById("site");
  const selectedSitesContainer = document.getElementById("selected-sites");

  let selectedSites = [];
  const maxSites = 5;

  // County, District, and Site Data (this can be updated from a spreadsheet)
  const siteData = {
    "台北市": {
      "士林區": [
        "台北兒童新樂園",
        "士林戲曲中心"
      ],
      "松山區": [
        "台北體育館",
        "台北網球場"
      ]
    },
    "新北市": {
      "新莊區": [
        "新北產業園",
        "新莊民安國小"
      ],
      "板橋區": [
        "板橋忠孝國中",
        "板橋五權公園",
        "板橋民生"
      ]
    },
    "桃園市": {
      "桃園區": [
        "桃園花市",
        "桃園藝文南"
      ],
      "中壢區": [
        "中壢中央"
      ]
    }
  };

  // Populate county options
  for (const county in siteData) {
    const option = document.createElement("option");
    option.value = county;
    option.textContent = county;
    countySelect.appendChild(option);
  }

  // Handle county change
  countySelect.addEventListener("change", function () {
    districtSelect.disabled = true;
    siteSelect.disabled = true;
    districtSelect.innerHTML = '<option value="">請先選擇縣市</option>';
    siteSelect.innerHTML = '<option value="">請先選擇區域</option>';

    if (countySelect.value) {
      const districts = siteData[countySelect.value];
      for (const district in districts) {
        const option = document.createElement("option");
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
      }
      districtSelect.disabled = false;
    }
  });

  // Handle district change
  districtSelect.addEventListener("change", function () {
    siteSelect.disabled = true;
    siteSelect.innerHTML = '<option value="">請先選擇區域</option>';

    if (districtSelect.value) {
      const sites = siteData[countySelect.value][districtSelect.value];
      sites.forEach(site => {
        const option = document.createElement("option");
        option.value = site;
        option.textContent = site;
        siteSelect.appendChild(option);
      });
      siteSelect.disabled = false;
    }
  });

  // Handle add site button
  addSiteButton.addEventListener("click", function () {
    if (siteSelect.value && selectedSites.length < maxSites && !selectedSites.includes(siteSelect.value)) {
      selectedSites.push(siteSelect.value);
      renderSelectedSites();
    } else if (selectedSites.length >= maxSites) {
      alert("已選滿五個站點");
    }
  });

  // Render selected sites
  function renderSelectedSites() {
    selectedSitesContainer.innerHTML = "";
    selectedSites.forEach((site, index) => {
      const siteDiv = document.createElement("div");
      siteDiv.textContent = site;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "刪除";
      deleteButton.addEventListener("click", function () {
        selectedSites.splice(index, 1);
        renderSelectedSites();
      });

      siteDiv.appendChild(deleteButton);
      selectedSitesContainer.appendChild(siteDiv);
    });
  }

  // Handle next button
  nextButton.addEventListener("click", function () {
    if (validateStep1()) {
      step1.classList.add("hidden");
      step2.classList.remove("hidden");
    }
  });

  // Handle back button
  backButton.addEventListener("click", function () {
    step2.classList.add("hidden");
    step1.classList.remove("hidden");
  });

  // Handle submit button
  submitButton.addEventListener("click", function () {
    if (selectedSites.length > 0) {
      submitForm();
    } else {
      alert("請選擇至少一個站點");
    }
  });

  // Validate Step 1
  function validateStep1() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !phone.match(/^09[0-9]{8}$/) || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("請正確填寫所有必填資料");
      return false;
    }
    return true;
  }

  // Submit form to Google Sheets
  function submitForm() {
    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      sites: selectedSites
    };

    // Replace with actual Google Apps Script URL
    const scriptURL = "YOUR_GOOGLE_APPS_SCRIPT_URL";

    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          window.location.href = "https://derek.bvshop.tw/carts?rstrk=1month";
        } else {
          alert("送出失敗，請重試");
        }
      })
      .catch(() => {
        alert("連線失敗，請重試");
      });
  }
});
