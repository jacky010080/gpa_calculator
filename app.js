let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();

//參數1是要控制的對象
//參數2是duration
//參數3是控制對象的原始狀態
//參數4是控制對象的動畫結束後的狀態
//參數5是提早幾秒開始跑
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(hero, 1.2, { width: "80%" }, { width: "100%", ease: Power2.easeInOut })
  .fromTo(slider, 1, { x: "-100%" }, { x: "0%", ease: Power2.easeInOut }, "-=1.2")
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

//讓animation整個消失 
setTimeout(() => {
  animation.style.pointerEvents = "none";
},2500);

// 無法使用整個網站的ENTER KEY
window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

//防止form內部button交出表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//改變credit後也要更新GPA
let credits = document.querySelectorAll(".class-credit");
credits.forEach(credit => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

//改變select的option顏色，並計算GPA
let allSelects = document.querySelectorAll("select");
allSelects.forEach(select => {
  select.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });
});

function changeColor(target) {
  if (target.value === "A" || target.value === "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (target.value === "B+" || target.value === "B" || target.value === "B-") {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (target.value === "C+" || target.value === "C" || target.value === "C-") {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (target.value === "D+" || target.value === "D" || target.value === "D-") {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else if (target.value === "F") {
    target.style.backgroundColor = "grey";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "white";
  }
}

//把等第轉成GPA
function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0.0;
  }
}
function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let sum = 0; //GPA分子
  let creditSum = 0; //GPA分母
  let result = 0;

  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }
  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }

  if (creditSum !== 0) {
    result = sum / creditSum;
  }
  document.querySelector("#result-gpa").innerHTML = result.toFixed(2);
}

//增加新form
let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");
  //製作5個tag
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("placeholder", "class category");
  newInput1.classList.add("class-type");
  newInput1.setAttribute("list", "opt");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.setAttribute("placeholder", "class number");
  newInput2.classList.add("class-number");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.setAttribute("placeholder", "credits");
  newInput3.classList.add("class-credit");
  newInput3.addEventListener("change", () => {
    setGPA();
  });
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  let option1 = document.createElement("option");
  option1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  option1.appendChild(textNode1);
  let option2 = document.createElement("option");
  option2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  option2.appendChild(textNode2);
  let option3 = document.createElement("option");
  option3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  option3.appendChild(textNode3);
  let option4 = document.createElement("option");
  option4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  option4.appendChild(textNode4);
  let option5 = document.createElement("option");
  option5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  option5.appendChild(textNode5);
  let option6 = document.createElement("option");
  option6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  option6.appendChild(textNode6);
  let option7 = document.createElement("option");
  option7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  option7.appendChild(textNode7);
  let option8 = document.createElement("option");
  option8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  option8.appendChild(textNode8);
  let option9 = document.createElement("option");
  option9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  option9.appendChild(textNode9);
  let option10 = document.createElement("option");
  option10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  option10.appendChild(textNode10);
  let option11 = document.createElement("option");
  option11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  option11.appendChild(textNode11);
  let option12 = document.createElement("option");
  option12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  option12.appendChild(textNode12);
  let option13 = document.createElement("option");
  option13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  option13.appendChild(textNode13);
  newSelect.appendChild(option1);
  newSelect.appendChild(option2);
  newSelect.appendChild(option3);
  newSelect.appendChild(option4);
  newSelect.appendChild(option5);
  newSelect.appendChild(option6);
  newSelect.appendChild(option7);
  newSelect.appendChild(option8);
  newSelect.appendChild(option9);
  newSelect.appendChild(option10);
  newSelect.appendChild(option11);
  newSelect.appendChild(option12);
  newSelect.appendChild(option13);
  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });
  // 垃圾桶
  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newI = document.createElement("i");
  newI.classList.add("fas");
  newI.classList.add("fa-trash");
  newButton.appendChild(newI);
  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation = "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener("animationend", (e) => {
      e.target.remove();
      setGPA();
    });
  });

  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);
  newForm.appendChild(newDiv);
  document.querySelector(".all-inputs").appendChild(newForm);
  newForm.style.animation = "scaleUp 0.5s ease forwards";

});

let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach(trash => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.add("remove");
  });
});
allTrash.forEach(trash => {
  let form = trash.parentElement.parentElement;
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGPA();
  });
});

// 排序演算法
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");
btn1.addEventListener("click", () => {
  handleSorting("descending");
});
btn2.addEventListener("click", () => {
  handleSorting("ascending");
});

function handleSorting(direction) {
  let graders = document.querySelectorAll(".grader");
  let objectArray = [];

  for (let i = 0; i < graders.length; i++) {
    let class_category = graders[i].children[0].value;
    let class_number = graders[i].children[1].value;
    let class_credits = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;
    if (class_category !== "" || class_number !== "" || class_credits !== "" || class_grade !== "") {
      let class_object = {
        class_category,
        class_number,
        class_credits,
        class_grade,
      }
      objectArray.push(class_object);
    }
  }

  // 取得objectArray後把成績string轉成數字
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
  }

  objectArray = mergeSort(objectArray);
  if (direction === "descending") {
    objectArray = objectArray.reverse();
  }
  // 更新網頁
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";
  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
    <div class="grader">
      <input type="text" placeholder="class category" class="class-type" list="opt" value=${objectArray[i].class_category}><!-- 
      --><input type="text" placeholder="class number" class="class-number" value=${objectArray[i].class_number}><!-- 
      --><input type="number" placeholder="credits" class="class-credit" min="0" max="6" value=${objectArray[i].class_credits}><!-- 
      --><select name="select" class="select">
        <option value=""></option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option>
      </select><!-- 
      --><button class="trash-button">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </form>`;
  }
  // select另外改
  allInputs = document.querySelector(".all-inputs");
  graders = document.querySelectorAll(".grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  // 新的select添加顏色轉換、事件監聽
  allSelects = document.querySelectorAll("select");
  allSelects.forEach(select => {
    changeColor(select);
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });
  });

  // credit添加事件監聽
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach(credit => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  // trash添加事件監聽
  let allTrashs = document.querySelectorAll(".trash-button");
  allTrashs.forEach(trash => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation = "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener("animationend", (e) => {
        e.target.remove();
        setGPA();
      });
    });
  });
}

function merge(a1, a2) {
  let result = [];
  let i = 0, j = 0;
  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}
function mergeSort(arr) {
  if (arr.length === 0) {
    return;
  } else if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}