/**
 *
 * @brief: These function to interact with main-menu
 *
 */
function toggleOpenClass(element) {
  // Toggle the "open" class on the clicked <li> element
  element.classList.toggle("open");
}

function home() {
  window.location.href = "index.html";
}

function main_menu_toggle() {
  document.body.classList.toggle("mmc");
  document.body.classList.toggle("mme");
  const collapse = document.getElementById("main-navbar-collapse");
  collapse.classList.toggle("in");
}

/**
 *
 * @param {*} pwEye: password eye entity
 * @param {*} inputField: which input field to show or hide when click
 */
function hide_show_pw(pwEye, inputField) {
  if (pwEye.classList.contains("hidepw")) {
    // gonna hide
    inputField.type = "text";

    pwEye.classList.add("showpw");
    pwEye.classList.remove("hidepw");
  } else {
    // gonna show
    inputField.type = "password";

    pwEye.classList.add("hidepw");
    pwEye.classList.remove("showpw");
  }
}

/**
 * @brief: handle delete dialog interact, delete dialog in "deleteDialogTemplate" ./template.js
 *
 * @param {*} remove_element: the entiry want to remove
 * @param {*} h3_content: h3 tag content
 * @param {*} p_content: p tag content
 */
function deleteDialogHandle(remove_element, h3_content, p_content) {
  return new Promise((resolve, reject) => {
    const deleteDialog = document.createElement("div");
    deleteDialog.innerHTML = deleteDialogTemplate;

    const cancelBtn = deleteDialog.querySelector("#Cancel");
    const okBtn = deleteDialog.querySelector("#OK");
    deleteDialog.querySelector(
      "#deletedialog .ngdialog-message h3"
    ).textContent = h3_content;
    deleteDialog.querySelector(
      "#deletedialog .ngdialog-message p"
    ).textContent = p_content;

    const deleteElem = deleteDialog.querySelector("#deletedialog");
    deleteElem.classList.remove("hide");

    okBtn.addEventListener("click", () => {
      remove_element.remove(); // remove just on FE
      deleteElem.classList.add("hide");
      resolve();
    });

    cancelBtn.addEventListener("click", () => {
      deleteElem.classList.add("hide");
      reject();
    });

    document.body.appendChild(deleteDialog.firstChild);
  });
}

/**
 * @brief: handle alert dialog interact, alert dialog in "alertDialogTemplate" ./template.js
 *
 * @param {*} p_content: p tag content
 */
function alertDialogHandle(p_content) {
  const alertDialog = document.createElement("div");
  alertDialog.innerHTML = alertDialogTemplate;

  const closeBtn = alertDialog.querySelector("#Close");

  alertDialog.querySelector("#alertDialog_msg").textContent = p_content;

  const alertElem = alertDialog.querySelector("#alertDialog");
  alertElem.classList.remove("hide");

  closeBtn.addEventListener("click", () => {
    alertElem.classList.add("hide");
  });

  document.getElementById("alertDialogMark").appendChild(alertDialog);
}

/**
 *
 * @param {*} input: input field entity
 * @param {*} empty_error: empty error message entity
 * @param {*} exceed_error: exceed character message entity
 * @returns false: no error
 *          true: field is value, no error
 */
function checkError_inputField(input, empty_error, exceed_error) {
  if (input.value.length === 0) {
    empty_error.classList.remove("ng-hide");
    exceed_error.classList.add("ng-hide");
    return false;
  } else if (input.value.length > parseInt(input.getAttribute("maxlength"))) {
    exceed_error.classList.remove("ng-hide");
    empty_error.classList.add("ng-hide");
    return false;
  } else {
    exceed_error.classList.add("ng-hide");
    empty_error.classList.add("ng-hide");
    return true;
  }
}

/**
 *
 * @brief: Just like check error input field but just for empty
 * @param {*} input
 * @param {*} empty_error
 * @returns: false: error
 *           true: field is valid, no error
 */
function checkEmpty_inputField(input, empty_error) {
  if (input.value === "") {
    empty_error.classList.remove("ng-hide");
    return false;
  } else {
    empty_error.classList.add("ng-hide");
    return true;
  }
}

/**
 *
 * @param {*} input
 * @param {*} range_error
 * @param {*} emptty_error
 * @returns: false: error
 *          true: field is valid, no error
 */
function checkRange_inputField(input, range_error, empty_error) {
  if (input.value === "") {
    // empty
    empty_error.classList.remove("ng-hide");
    range_error.classList.add("ng-hide");
    return false;
  } else if (
    // value --> check number range
    parseInt(input.value) > parseInt(input.getAttribute("max")) ||
    parseInt(input.value) < parseInt(input.getAttribute("min"))
  ) {
    range_error.classList.remove("ng-hide");
    empty_error.classList.add("ng-hide");
    return false;
  } else {
    range_error.classList.add("ng-hide");
    empty_error.classList.add("ng-hide");
    return true;
  }
}

/**
 * @brief: show error when select field.value got unexspected value
 * @param {*} select: select field entity
 * @param {*} error: error message show
 * @returns
 */
function checkError_selectField(select, error) {
  if (select.value == 0 || select.value == "") {
    error.classList.remove("ng-hide");
    return false;
  } else {
    error.classList.add("ng-hide");
    return true;
  }
}

/**
 *
 * @param {*} value
 * @param {*} pattern
 * @param {*} pattern_error
 * @param {*} empty_error
 * @returns
 */
function checkPattern_inputField(input, pattern, pattern_error, empty_error) {
  if (input.value.length === 0) {
    empty_error.classList.remove("ng-hide");
    pattern_error.classList.add("ng-hide");
    return false;
  }
  if (!pattern.test(input.value)) {
    pattern_error.classList.remove("ng-hide");
    empty_error.classList.add("ng-hide");
    return false;
  } else {
    pattern_error.classList.add("ng-hide");
    empty_error.classList.add("ng-hide");
    return true;
  }
}

/** Check local Storage function */
var localStorageSpace = function () {
  var data = "";
  var log;
  console.log("\n");

  log = "Current local storage:\n";

  for (var key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      data += window.localStorage[key];
      log += `\n\t${key} = ${(
        (window.localStorage[key].length * 16) /
        (8 * 1024)
      ).toFixed(2)} KB`;
    }
  }

  log += `${
    data
      ? "\n==> Total space used: " +
        ((data.length * 16) / (8 * 1024)).toFixed(2) +
        " KB"
      : "Empty (0 KB)"
  }`;

  log += `${
    data
      ? "\n==> Approx. space remaining: " +
        (5120 - ((data.length * 16) / (8 * 1024)).toFixed(2)) +
        " KB"
      : "5 MB"
  }`;
  console.log(log);
};

/**
 * Accept Array or multiple input error object
 */
function hideError() {
  for (const elem of arguments) {
    if (elem instanceof Array) {
      for (const e of elem) {
        e.classList.add("ng-hide");
      }
    } else {
      elem.classList.add("ng-hide");
    }
  }
}

/**
 *
 * @returns false if any input errorentity not contain ng-hide
 */
function checkError_show() {
  console.log("Check error tag:");
  for (const elem of arguments) {
    console.log(elem);
    if (elem instanceof NodeList) {
      for (const e of elem) {
        if (!e.classList.contains("ng-hide")) {
          console.log(`Error make fail Apply: ${e}`);
          return false;
        }
      }
    } else {
      if (!elem.classList.contains("ng-hide")) {
        console.log(`Error make fail Apply: ${elem}`);
        return false;
      }
    }
  }
  return true;
}
