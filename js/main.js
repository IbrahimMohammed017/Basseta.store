/********** Products Card Filter **********/
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(
    ".navbar-collapse .nav-link"
  );
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
    let keySearch = document.querySelectorAll(".card");
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
