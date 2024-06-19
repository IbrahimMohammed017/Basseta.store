/********** Products Card Filter **********/
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".navbar-collapse .nav-link");
  const items = document.querySelectorAll(".product .item");

  buttons.forEach((li) => {
    li.addEventListener("click", removeActive);
    li.addEventListener("click", chosseCards);
  });

  function removeActive() {
    buttons.forEach((li) => {
      li.classList.remove("active");
      this.classList.add("active");
    });
  }

  function chosseCards() {
    items.forEach((card) => {
      card.style.display = "none";
    });
    document.querySelectorAll(this.dataset.cat).forEach((pr) => {
      pr.style.display = "block";
    });
  }
});

/********** Shuffle Products Cards **********/
document.addEventListener("DOMContentLoaded", () => {
  let crdsContainer = document.querySelector(".pro-row");
  let cardsBlocks = Array.from(crdsContainer.children);
  let orderRange = Array.from(Array(cardsBlocks.length).keys());

  Shuffle(orderRange);

  cardsBlocks.forEach((cardsBlock, index) => {
    cardsBlock.style.order = orderRange[index];
  });

  function Shuffle(array) {
    let current = array.length,
      temp,
      randome;
    while (current > 0) {
      randome = Math.floor(Math.random() * current);
      current--;
      temp = array[current];
      array[current] = array[randome];
      array[randome] = temp;
    }
    return array;
  }
});

/********** Search Bar **********/
document.addEventListener("DOMContentLoaded", () => {
  let search = document.getElementById("searchInput");
  search.addEventListener("keyup", () => {
    let searchValue = search.value.trim().toUpperCase();
    let keySearch = document.querySelectorAll(".card-link");
    for (let i = 0; i < keySearch.length; i++) {
      let div = keySearch[i];
      if (div.textContent.trim().toUpperCase().indexOf(searchValue) == -1) {
        div.parentElement.style.display = "none";
      } else {
        div.parentElement.style.display = "block";
      }
    }
  });
});

/********** Add Collapse To Nav Item **********/
document.addEventListener("DOMContentLoaded", () => {
  function updateButtonAttributes() {
    var buttons = document.querySelectorAll(".nav-link");
    var isSmallScreen = window.innerWidth < 992;

    buttons.forEach(function (button) {
      if (isSmallScreen) {
        button.setAttribute("data-bs-toggle", "collapse");
        button.setAttribute("data-bs-target", "#navbarSupportedContent");
      } else {
        button.removeAttribute("data-bs-toggle");
        button.removeAttribute("data-bs-target");
      }
    });
  }

  // Check attributes on page load
  updateButtonAttributes();

  // Check attributes when window is resized
  window.addEventListener("resize", updateButtonAttributes);
});

/********** Form **********/
// 1- Show And Hide Form:
document.addEventListener("DOMContentLoaded", function () {
  // تحديد الأزرار التي تعرض النموذج
  let open = document.querySelectorAll(".open-form");
  // تحديد الأزرار التي تخفي النموذج
  let close = document.querySelectorAll(".cancel");
  // إضافة مستمع للنقر لكل زر من الأزرار التي تعرض النموذج
  open.forEach((el) => {
    el.addEventListener("click", showPopup);
  });
  // إضافة مستمع للنقر لكل زر من الأزرار التي تخفي النموذج
  close.forEach((button) => {
    button.addEventListener("click", closePopup);
  });
  // إضافة مستمع للضغط على أي زر في الكيبورد
  document.addEventListener("keydown", function (event) {
    // التحقق من أن الزر المضغوط هو زر "Esc"
    if (event.key === "Escape") {
      closePopup();
    }
  });
  // إضافة مستمع لتغيير علامة الهاش في الرابط
  window.addEventListener("hashchange", function () {
    if (location.hash === "") {
      closePopup();
    }
  });
  // دالة لعرض النموذج
  function showPopup() {
    document.querySelectorAll(".form").forEach((popup) => {
      popup.style.display = "block";
    });

    // إضافة علامة الهاش للرابط
    location.hash = "popup";
  }
  // دالة لإخفاء النموذج
  function closePopup() {
    document.querySelectorAll(".form").forEach((popup) => {
      popup.style.display = "none";
    });

    // إزالة علامة الهاش من الرابط
    history.replaceState(
      {},
      document.title,
      location.pathname + location.search
    );
  }
});

// 2- Determine The Product Price Value:
document.addEventListener("DOMContentLoaded", function () {
  // Get all elements with class 'pro-price'
  var proPriceElements = document.querySelectorAll(".pro-price");

  // Loop through each element
  proPriceElements.forEach(function (proPriceElement) {
    // Find the corresponding current-price element in the document
    var currentPriceElement = document.querySelector(".current-price");

    if (currentPriceElement) {
      // Get the current_price value
      var currentPriceValue = currentPriceElement.innerText;

      // Set the pro-price value to current_price value
      proPriceElement.value = currentPriceValue;
    } else {
      console.error(
        "No element with class 'current-price' found in the document"
      );
    }
  });
});

// 3- Mathematical Calculations:
document.addEventListener("DOMContentLoaded", function () {
  // تحديد جميع الفورمات بواسطة الكلاس "form"
  var forms = document.querySelectorAll(".data-form");

  // إضافة مستمع لكل فورم
  forms.forEach(function (form) {
    // تغيير الكمية
    form.querySelector(".quantity").addEventListener("input", function () {
      updateTotalPrice(form);
    });

    // اختيار المحافظة
    form.querySelector(".select").addEventListener("change", function () {
      updateTransPrice(form);
      updateTotalPrice(form);
    });
  });

  function updateTotalPrice(form) {
    // حساب حاصل الضرب بين الكمية وسعر المنتج
    var quantity = parseInt(form.querySelector(".quantity").value) || 0;
    var productPrice = parseInt(form.querySelector(".pro-price").value) || 0;
    var netPrice = quantity * productPrice;

    // تحديث قيمة الحقل net-price
    form.querySelector(".net-price").value = netPrice;

    // تحديث قيمة الحقل total-price
    updateTransPrice(form);
    var transPrice = parseInt(form.querySelector(".trans-price").value) || 0;
    var totalPrice = netPrice + transPrice;
    form.querySelector(".total-price").value = totalPrice;
  }

  function updateTransPrice(form) {
    // تحديث قيمة الحقل trans-price بناءً على اختيار المحافظة
    var selectedZone = form.querySelector(".select").value;
    var transPrice = 0;

    switch (selectedZone) {
      case "zone1":
        transPrice = 40;
        break;
      case "zone2":
        transPrice = 45;
        break;
      case "zone3":
        transPrice = 50;
        break;
      default:
        transPrice = 0;
    }

    form.querySelector(".trans-price").value = transPrice;
  }
});
